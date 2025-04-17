<script>
    import interact from 'interactjs';
    import {activateFocuspoint, focuspoints, activeIndex} from "../store.svelte";
    import {onMount} from "svelte";
    let {image} = $props();
    let img;
    let isDarkMode = $state(false);
    let viewBox = $state("");

    interact('polygon').draggable({
        autoScroll: true,
        listeners: {
            // call this function on every dragmove event
            start: setActiveFocuspoint,
            move(event) {
                const index = parseInt(event.target.getAttribute('data-index'));
                $focuspoints[index].points = $focuspoints[index].points.map(([x, y]) => [x + event.dx, y + event.dy]);
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
                const [x, y] = $focuspoints[index].points[pointIndex];
                $focuspoints[index].points[pointIndex] = [x + event.dx, y + event.dy];
            },
            end: setActiveFocuspoint
        }
    });

    onMount(() => {
        const colorScheme = document.querySelector('html').getAttribute('data-color-scheme');
        const theme = document.querySelector('html').getAttribute('data-theme');
        const darkModePrefer = window.matchMedia('(prefers-color-scheme: dark)').matches;
        isDarkMode = colorScheme === 'dark' || (theme === 'auto' && darkModePrefer && colorScheme !== 'light');
    });

    function setActiveFocuspoint(event) {
        const index = parseInt(event.target.getAttribute('data-index'));
        activateFocuspoint(index);
    }

    function onload() {
        viewBox = `0 0 ${img.naturalWidth} ${img.naturalHeight}`;
        $focuspoints.viewBox = viewBox;
    }

    function onSvgDblClick(event) {
        if (!$focuspoints[$activeIndex] || !(event.target instanceof SVGSVGElement))
            return;
        const rect = event.target.getBoundingClientRect();
        const viewBox = event.target.viewBox.baseVal;
        const ratio = viewBox.width / rect.width;
        const point = [event.layerX * ratio, event.layerY * ratio];
        const index = findClosestMiddlePointIndex(point);
        const points = $focuspoints[$activeIndex].points.slice();
        points.splice(index + 1, 0, point);
        $focuspoints[$activeIndex].points = points;
    }

    function onCircleDblClick(event) {
        const index = parseInt(event.target.getAttribute('data-index'));
        const pointIndex = parseInt(event.target.getAttribute("data-point-index"));
        $focuspoints[index].points = $focuspoints[index].points.filter((point, i) => i !== pointIndex);
    }

    function findClosestMiddlePointIndex(point) {
        const points = $focuspoints[$activeIndex].points;
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
</script>

<style>
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

    svg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    polygon {
        stroke-width: 2px;
        fill: rgba(0, 0, 0, .5);
        cursor: move;
        stroke: yellow;
        stroke-dasharray: 5;
    }

    polygon.active {
        stroke: red;
        stroke-dasharray: none;
    }

    circle {
        cursor: pointer;
        stroke-width: 5px;
        stroke: transparent;
        fill: red;
    }
</style>

<div class="cropper-bg" class:cropper-bg--dark={isDarkMode} touch-action="none">
    <div class="wrapper">
        <svg {viewBox} ondblclick={onSvgDblClick}>
            {#each $focuspoints as focuspoint, index}
                <g>
                    <polygon
                        onclick={() => activateFocuspoint(index)}
                        class={{ active: focuspoint.active }}
                        points={focuspoint.points.map(point => point.join(",")).join(" ")}
                        data-index={index} />
                    {#each focuspoint.points as [x, y], pointIndex}
                        <circle cx={x} cy={y} r="5" data-index={index} data-point-index={pointIndex} ondblclick={onCircleDblClick} />
                    {/each}
                </g>
            {/each}
        </svg>
        <img bind:this={img} src={image} alt="Selected" unselectable="on" {onload} />
    </div>
</div>
