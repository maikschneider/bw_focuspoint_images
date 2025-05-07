<script lang="ts">
    import interact from 'interactjs';
    import {focuspoints, getActiveIndex, setActiveIndex, SHAPES} from "../store.svelte";
    import {onDestroy, onMount} from "svelte";

    const {image}: {image: string} = $props();

    let canvasHeight: number = $state(0);
    let canvasWidth: number = $state(0);
    let imageWidth: number = $state(0);
    let imageHeight: number = $state(0);
    let isDarkMode: boolean = $state(false);
    let instanceArray: any[] = $state([]);
    let imgElement: HTMLImageElement;

    interact(".shape").draggable({
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        autoScroll: true,
        listeners: {
            start: setActiveFocuspoint,
            move(event: InteractjsDragEvent) {
                const index = parseInt(event.target.getAttribute('data-index') ?? "-1");
                instanceArray[index]?.onDrag?.(event);
            },
            end: setActiveFocuspoint
        }
    });

    interact(".shape-handle").draggable({
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        autoScroll: true,
        listeners: {
            start: setActiveFocuspoint,
            move(event: InteractjsDragEvent) {
                const shapeIndex = parseInt(event.target.getAttribute('data-shape-index') ?? "-1");
                instanceArray[shapeIndex]?.onHandleDrag?.(event);
            },
            end: setActiveFocuspoint
        }
    });

    onMount(() => {
        if (imgElement.complete) {
            setCanvasSizes()
        } else {
            imgElement.addEventListener('load', setCanvasSizes)
        }

        window.addEventListener('resize', updateCanvasSizes)
        const colorScheme = document.querySelector('html')!.getAttribute('data-color-scheme');
        const theme = document.querySelector('html')!.getAttribute('data-theme');
        const darkModePrefer = window.matchMedia('(prefers-color-scheme: dark)').matches;
        isDarkMode = colorScheme === 'dark' || (theme === 'auto' && darkModePrefer && colorScheme !== 'light');
    });

    function setActiveFocuspoint(event: any) {
        const index = parseInt(event.target.getAttribute("data-shape-index") ?? event.target.getAttribute('data-index'));
        setActiveIndex(index);
    }

    function onload() {
        imageWidth = imgElement.naturalWidth;
        imageHeight = imgElement.naturalHeight;
    }

    function onSvgDblClick(event: MouseEvent) {
        if (!$focuspoints[getActiveIndex()] || !(event.target instanceof SVGSVGElement))
            return;
        const rect = event.target.getBoundingClientRect();
        const viewBox = event.target.viewBox.baseVal;
        const ratio = viewBox.width / rect.width;
        const point = [event.layerX * ratio, event.layerY * ratio] as [number, number];
        const index = findClosestMiddlePointIndex(point);
        const points = $focuspoints[getActiveIndex()].__data.points.slice();
        points.splice(index + 1, 0, point);
        $focuspoints[getActiveIndex()].__data.points = points;
    }

    function findClosestMiddlePointIndex(point: [number, number]) {
        const points = $focuspoints[getActiveIndex()].__data.points;
        const middlePoints = [...points, points[0]].reduce((acc, cur, i, arr) => [...acc, [cur, arr[i + 1]]], []).slice(0, -1).map((segment: [[number, number], [number, number]]) => {
            const [[x1, y1], [x2, y2]] = segment;
            return [
                x1 + (x2 - x1) / 2,
                y1 + (y2 - y1) / 2
            ];
        });
        let index = 0;
        let closest = [Infinity, Infinity] as [number, number];
        for (const i in middlePoints) {
            const middlePoint = middlePoints[i];
            if (distance(point, middlePoint) < distance(point, closest)) {
                closest = middlePoint;
                index = +i;
            }
        }
        return +index;
    }

    function distance([x1, y1]: [number, number], [x2, y2]: [number, number]) {
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
        canvasHeight = imgElement.parentElement!.getBoundingClientRect().height
        canvasWidth = imgElement.parentElement!.getBoundingClientRect().width
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
</style>

<div class="cropper-bg" class:cropper-bg--dark={isDarkMode}>
    <div class="wrapper">
        <svg viewBox="0 0 {imageWidth} {imageHeight}" ondblclick={onSvgDblClick}>
            {#each $focuspoints as focuspoint, index}
                <g class={["shape-group", index === getActiveIndex() && "active"]} onclick={() => setActiveIndex(index)}>
                    <svelte:component bind:this={instanceArray[index]} this={SHAPES[focuspoint.__shape].component as ConstructorOfATypedSvelteComponent} index={index} imageWidth={imageWidth} imageHeight={imageHeight} canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
                    {#each instanceArray[index]?.getHandles?.() as [x, y], handleIndex}
                        <circle cx={x} cy={y} r="3" data-shape-index={index} data-index={handleIndex} ondblclick={instanceArray[index]?.onHandleDoubleClick} class="shape-handle" />
                    {/each}
                </g>
            {/each}
        </svg>
        <img bind:this={imgElement} src={image} alt="Selected" unselectable="on" {onload} />
    </div>
</div>
