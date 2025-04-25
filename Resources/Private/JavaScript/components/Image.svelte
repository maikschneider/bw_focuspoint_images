<script>
    import interact from 'interactjs';
    import {focuspoints, focusPointName, getActiveIndex, setActiveIndex} from "../store.svelte";
    import {onDestroy, onMount} from "svelte";
    let {image} = $props();
    let canvasHeight = $state(0)
    let canvasWidth = $state(0)
    let focuspointName = $derived((focuspoint, index) => focusPointName(index))
    let img;
    let initialized = $state(false)

    let isDarkMode = $state(false);
    let width = $state(0);
    let height = $state(0);

    interact('.draggable')
        .resizable({
            edges: {left: true, right: true, bottom: true, top: true},
            modifiers: [
                interact.modifiers.restrictEdges({
                    outer: "parent",
                    endOnly: true
                }),
            ],
            listeners: {
                start: setActiveFocuspoint,
                move(event) {
                    const index = parseInt(event.target.getAttribute('data-index'));
                    $focuspoints[index].__data.x = ($focuspoints[index].__data.x / width * canvasWidth + event.deltaRect.left);
                    $focuspoints[index].__data.y = ($focuspoints[index].__data.y / height * canvasHeight + event.deltaRect.top);
                    $focuspoints[index].__data.width = event.rect.width / canvasWidth * width;
                    $focuspoints[index].__data.height = event.rect.height / canvasHeight * height;
                },
                end: setActiveFocuspoint
            }
        })
        .draggable({
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            autoScroll: true,
            listeners: {
                start: setActiveFocuspoint,
                move(event) {
                    const index = parseInt(event.target.getAttribute('data-index'));
                    $focuspoints[index].__data.x = $focuspoints[index].__data.x + event.dx / canvasWidth * width;
                    $focuspoints[index].__data.y = $focuspoints[index].__data.y + event.dy / canvasHeight * height;
                },
                end: setActiveFocuspoint
            }
        })

    interact('polygon').draggable({
        autoScroll: true,
        listeners: {
            // call this function on every dragmove event
            start: setActiveFocuspoint,
            move(event) {
                const index = parseInt(event.target.getAttribute('data-index'));
                $focuspoints[index].__data.points = $focuspoints[index].__data.points.map(([x, y]) => [x + event.dx, y + event.dy]);
            },
            end: setActiveFocuspoint
        }
    });
    interact("circle").draggable({
        listeners: {
            start: setActiveFocuspoint,
            move(event) {
                const index = parseInt(event.target.getAttribute('data-index'));
                const pointIndex = parseInt(event.target.getAttribute("data-point-index"));
                const [x, y] = $focuspoints[index].__data.points[pointIndex];
                $focuspoints[index].__data.points[pointIndex] = [x + event.dx, y + event.dy];
            },
            end: setActiveFocuspoint
        }
    });

    onMount(() => {
        if (img.complete) {
            setCanvasSizes()
        } else {
            img.addEventListener('load', setCanvasSizes)
        }

        window.addEventListener('resize', updateCanvasSizes)
        const colorScheme = document.querySelector('html').getAttribute('data-color-scheme');
        const theme = document.querySelector('html').getAttribute('data-theme');
        const darkModePrefer = window.matchMedia('(prefers-color-scheme: dark)').matches;
        isDarkMode = colorScheme === 'dark' || (theme === 'auto' && darkModePrefer && colorScheme !== 'light');
    });

    function setActiveFocuspoint(event) {
        const index = parseInt(event.target.getAttribute('data-index'));
        setActiveIndex(index);
    }

    function onload() {
        width = img.naturalWidth;
        height = img.naturalHeight;
    }

    function onSvgDblClick(event) {
        if (!$focuspoints[getActiveIndex()] || !(event.target instanceof SVGSVGElement))
            return;
        const rect = event.target.getBoundingClientRect();
        const viewBox = event.target.viewBox.baseVal;
        const ratio = viewBox.width / rect.width;
        const point = [event.layerX * ratio, event.layerY * ratio];
        const index = findClosestMiddlePointIndex(point);
        const points = $focuspoints[getActiveIndex()].__data.points.slice();
        points.splice(index + 1, 0, point);
        $focuspoints[getActiveIndex()].__data.points = points;
    }

    function onCircleDblClick(event) {
        const index = parseInt(event.target.getAttribute('data-index'));
        const pointIndex = parseInt(event.target.getAttribute("data-point-index"));
        $focuspoints[index].__data.points = $focuspoints[index].__data.points.filter((point, i) => i !== pointIndex);
    }

    function findClosestMiddlePointIndex(point) {
        const points = $focuspoints[getActiveIndex()].__data.points;
        const middlePoints = [...points, points[0]].reduce((acc, cur, i, arr) => [...acc, [cur, arr[i + 1]]], []).slice(0, -1).map(segment => {
            const [[x1, y1], [x2, y2]] = segment;
            return [
                x1 + (x2 - x1) / 2,
                y1 + (y2 - y1) / 2
            ];
        });
        let index = 0;
        let closest = [Infinity, Infinity];
        for (const i in middlePoints) {
            const middlePoint = middlePoints[i];
            if (distance(point, middlePoint) < distance(point, closest)) {
                closest = middlePoint;
                index = i;
            }
        }
        return +index;
    }

    function distance([x1, y1], [x2, y2]) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    onDestroy(() => {
        window.removeEventListener('resize', updateCanvasSizes)
    })

    function setCanvasSizes() {
        setTimeout(() => {
            updateCanvasSizes()
        }, 300)
    }

    export function updateCanvasSizes() {
        canvasHeight = img.parentElement.getBoundingClientRect().height
        canvasWidth = img.parentElement.getBoundingClientRect().width
        initialized = true
    }

</script>

<style>
    .draggable {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.15s ease;
        user-select: none;
    }

    .style1 {
        display: inline-grid;
        background-color: rgba(0, 0, 0, 0.6);
        border: 1px dashed rgba(255, 255, 255, 0.8);
        color: white;
        padding: 10px;
        --typo3-state-primary-bg: rgba(255, 255, 255, 0.8);
    }


    .style1.active {
        border-color: #ff8700;
        --typo3-state-primary-bg: #ff8700;
        border-style: solid;
        background-color: rgba(0, 0, 0, 0.8);
    }
    img {
        pointer-events: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        max-width: 100%;
        max-height: calc(100vh - 200px);
    }

    .cropper-bg {
        padding: 20px;
        display: flex;
        justify-content: center;

        --chess-color: rgba(0, 0, 0, 0.1);
        opacity: 0.8;
        background-image: linear-gradient(45deg, var(--chess-color) 25%, transparent 25%), linear-gradient(-45deg, var(--chess-color) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--chess-color) 75%), linear-gradient(-45deg, transparent 75%, var(--chess-color) 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0;
    }

    .cropper-bg--dark {
        --chess-color: rgba(255, 255, 255, 0.1);
    }

    .wrapper {
        position: relative;
        align-self: center;
    }

    .ui-resizable-handle.ui-resizable-nw, .ui-resizable-handle.ui-resizable-ne {
        top: -3px;
    }

    .ui-resizable-handle.ui-resizable-sw, .ui-resizable-handle.ui-resizable-se {
        bottom: -3px;
    }

    .ui-resizable-handle.ui-resizable-ne, .ui-resizable-handle.ui-resizable-se {
        right: -3px;
    }

    .ui-resizable-handle.ui-resizable-nw, .ui-resizable-handle.ui-resizable-sw {
        left: -3px;
    }

    svg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    polygon {
        stroke-width: 1px;
        fill: rgba(0, 0, 0, .6);
        cursor: move;
        stroke: rgba(255, 255, 255, .8);
        stroke-dasharray: 2;
    }

    polygon.active {
        stroke: #ff8700;
        stroke-dasharray: none;
    }

    circle {
        cursor: pointer;
        stroke-width: 5px;
        stroke: transparent;
        fill: #ff8700;
    }
</style>

<div class="cropper-bg" class:cropper-bg--dark={isDarkMode} touch-action="none">
    <div class="wrapper">
        <svg viewBox="0 0 {width} {height}" ondblclick={onSvgDblClick}>
            {#each $focuspoints as focuspoint, index}
                {#if focuspoint.__shape === "polygon"}
                    <g>
                        <polygon
                            onclick={setActiveFocuspoint}
                            class={{ active: index === getActiveIndex() }}
                            points={focuspoint.__data.points.map(point => point.join(",")).join(" ")}
                            data-index={index} />
                        {#each focuspoint.__data.points as [x, y], pointIndex}
                            <circle cx={x} cy={y} r="3" data-index={index} data-point-index={pointIndex} ondblclick={onCircleDblClick} />
                        {/each}
                    </g>
                {/if}
            {/each}
        </svg>
        {#each $focuspoints as focuspoint, index}
            {#if focuspoint.__shape === "rect"}
                <div
                    onclick={setActiveFocuspoint}
                    class:active={index === getActiveIndex()}
                    class:opacity-0={!initialized}
                    data-index={index}
                    class="draggable style1 resizable"
                    style="left:{focuspoint.__data.x / canvasWidth * 100}%;top:{focuspoint.__data.y / canvasHeight * 100}%;width:{focuspoint.__data.width / width * 100}%;height:{focuspoint.__data.height / height * 100}%;"
                    >
                    <span class="text-break">{focuspointName(focuspoint, index)}</span>
                    <span class="ui-resizable-handle ui-resizable-nw"></span>
                    <span class="ui-resizable-handle ui-resizable-ne"></span>
                    <span class="ui-resizable-handle ui-resizable-sw"></span>
                    <span class="ui-resizable-handle ui-resizable-se"></span>
                </div>
            {/if}
        {/each}
        <img bind:this={img} src={image} alt="Selected" unselectable="on" {onload} />
    </div>
</div>
