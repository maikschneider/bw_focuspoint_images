<script>
    import interact from 'interactjs';
    import {activateFocuspoint, focuspoints, activeIndex} from "../store.svelte";
    import {onDestroy, onMount} from "svelte";

    let {image} = $props()
    let canvasHeight = $state(0)
    let canvasWidth = $state(0)
    let img
    let initialized = $state(false)
    let isDarkMode = $state(false);
    let viewBox = $state("");

    interact('polygon').draggable({
        autoScroll: true,
        listeners: {
            // call this function on every dragmove event
            start: onDraggableEnd,
            move(event) {
                const index = parseInt(event.target.getAttribute('data-index'));
                $focuspoints[index].points = $focuspoints[index].points.map(([x, y]) => [x + event.dx, y + event.dy]);
                console.log($activeIndex);
            },
            end: onDraggableEnd
        }
    });
    interact("circle").draggable({
        listeners: {
            start: onDraggableEnd,
            move(event) {
                const index = parseInt(event.target.getAttribute('data-index'));
                const pointIndex = parseInt(event.target.getAttribute("data-point-index"));
                const [x, y] = $focuspoints[index].points[pointIndex];
                $focuspoints[index].points[pointIndex] = [x + event.dx, y + event.dy];
            },
            end: onDraggableEnd
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
        if (colorScheme === 'dark' || (theme === 'auto' && darkModePrefer && colorScheme !== 'light')) {
            isDarkMode = true
        }
    });

    onDestroy(() => {
        window.removeEventListener('resize', updateCanvasSizes)
    });

    function onDraggableEnd(event) {
        const index = parseInt(event.target.getAttribute('data-index'));
        activateFocuspoint(index);
    }

    function setCanvasSizes() {
        setTimeout(() => {
            updateCanvasSizes()
        }, 300)
    }

    function onload() {
        viewBox = `0 0 ${img.naturalWidth} ${img.naturalHeight}`;
        $focuspoints.viewBox = viewBox;
    }

    function onSvgClick(event) {
        if (!$focuspoints[$activeIndex] || !(event.target instanceof SVGSVGElement))
            return;
        const rect = event.target.getBoundingClientRect();
        const viewBox = event.target.viewBox.baseVal;
        const ratio = viewBox.width / rect.width;
        $focuspoints[$activeIndex].points = [...$focuspoints[$activeIndex].points, [event.layerX * ratio, event.layerY * ratio]];
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
        <svg {viewBox} onclick={onSvgClick}>
            {#each $focuspoints as focuspoint, index}
                <g>
                    <polygon
                        onclick={() => activateFocuspoint(index)}
                        class={{ active: focuspoint.active }}
                        points={focuspoint.points.map(point => point.join(",")).join(" ")}
                        data-index={index} />
                    {#each focuspoint.points as [x, y], pointIndex}
                        <circle cx={x} cy={y} r="5" data-index={index} data-point-index={pointIndex} />
                    {/each}
                </g>
            {/each}
        </svg>
        <img bind:this={img} src={image} alt="Selected" unselectable="on" {onload} />
    </div>
</div>
