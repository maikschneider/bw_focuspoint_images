<script lang="ts">
    import interact from 'interactjs';
    import {
        focuspoints,
        getActiveIndex,
        setActiveIndex,
        SHAPES,
        imageMeta,
        focusPointName,
        activateFocuspoint,
        detectionMode,
        createFocuspointFromDetection
    } from "../store.svelte";
    import {onDestroy, onMount} from "svelte";
    import {fade} from "svelte/transition";
    import {detectRegion} from "../segmentation/detectRegion";

    const {image}: {image: string} = $props();

    let canvasHeight: number = $state(0);
    let canvasWidth: number = $state(0);
    let imageWidth: number = $state(0);
    let imageHeight: number = $state(0);
    let isDarkMode: boolean = $state(false);
    let instanceArray: any[] = $state([]);
    let imgElement: HTMLImageElement;
    let svgRoot: SVGSVGElement | null = null;

    // convert pixel -> svg coordinates
    function clientToSvg(svg: SVGSVGElement, clientX: number, clientY: number): [number, number] {
        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const ctm = svg.getScreenCTM();
        if (!ctm) return [0, 0];
        const inv = ctm.inverse();
        const p = pt.matrixTransform(inv);
        return [p.x, p.y];
    }

    function getSvgScale(svg: SVGSVGElement) {
        const rect = svg.getBoundingClientRect();
        const vb = svg.viewBox.baseVal;
        return {
            ratioX: vb.width / rect.width,
            ratioY: vb.height / rect.height
        };
    }

    function normalizePositions(event: InteractjsDragEvent): any {
        const target = event.target as Element | null;
        const svg = (target instanceof SVGElement ? (target.ownerSVGElement ?? (target instanceof SVGSVGElement ? target : null)) : null) ?? svgRoot;
        if (!svg) return;

        const { ratioX, ratioY } = getSvgScale(svg);
        const [sx, sy] = clientToSvg(svg, event.clientX, event.clientY);

        return {
            ...event,
            dx: event.dx * ratioX,
            dy: event.dy * ratioY,
            clientX: sx,
            clientY: sy
        };
    }

    function onShapedown(event: KeyboardEvent, index: number) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setActiveIndex(index);
        }
    }

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
                const adjEvent = normalizePositions(event);
                instanceArray[index]?.onDrag?.(adjEvent);
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
                const adjEvent = normalizePositions(event);
                instanceArray[shapeIndex]?.onHandleDrag?.(adjEvent);
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

        imageMeta.set({ w: imageWidth, h: imageHeight });
    }

    function onSvgDblClick(event: MouseEvent) {
        if (!$focuspoints[getActiveIndex()] || !(event.target instanceof SVGSVGElement))
            return;
        const active = $focuspoints[getActiveIndex()];
        if (!active || active.__shape !== 'polygon' || !(event.target instanceof SVGSVGElement)) {
            return;
        }

        const [sx, sy] = clientToSvg(event.target, event.clientX, event.clientY);
        const point = [sx, sy] as [number, number];
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

    function getShapeComponent(shape: string) {
        return SHAPES[shape as keyof typeof SHAPES].component;
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

    function autoCreatePolygon(clickEvent: MouseEvent) {
        if (!$detectionMode) {
            return;
        }

        // Convert browser viewport coordinates → image-native pixel coordinates
        // We use a temporary SVG-based conversion since the image may be scaled
        const imageNaturalWidth = imgElement.naturalWidth;
        const imageNaturalHeight = imgElement.naturalHeight;
        const imageDisplayRect = imgElement.getBoundingClientRect();

        const displayToNaturalScaleX = imageNaturalWidth / imageDisplayRect.width;
        const displayToNaturalScaleY = imageNaturalHeight / imageDisplayRect.height;

        const clickXRelativeToImage = clickEvent.clientX - imageDisplayRect.left;
        const clickYRelativeToImage = clickEvent.clientY - imageDisplayRect.top;

        const clickXInImagePixels = Math.round(clickXRelativeToImage * displayToNaturalScaleX);
        const clickYInImagePixels = Math.round(clickYRelativeToImage * displayToNaturalScaleY);

        const detectionResult = detectRegion(
            imgElement,
            clickXInImagePixels,
            clickYInImagePixels
        );

        if (detectionResult) {
            createFocuspointFromDetection(detectionResult);
            detectionMode.set(false);
        }
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

    .shape-group:focus,
    .shape-handle:focus {
        outline: none;
    }

    .shape-handle:focus-visible {
        outline: 2px solid #0d6efd;
        outline-offset: 2px;
    }

    .detection-cursor {
        pointer-events: auto !important;
        cursor: crosshair !important;
    }

</style>

<div class="cropper-bg" class:cropper-bg--dark={isDarkMode}>
    <div class="wrapper">
        {#if !$detectionMode}
            <svg
                bind:this={svgRoot}
                viewBox="0 0 {imageWidth} {imageHeight}"
                ondblclick={onSvgDblClick}
                role="application"
                aria-label="editor"
                in:fade={{duration: 260}}
                out:fade={{duration: 180}}
            >
                {#each $focuspoints as focuspoint, index}
                    {@const ShapeComponent = getShapeComponent(focuspoint.__shape)}

                    <g class={["shape-group", index === getActiveIndex() && "active"]} onclick={() => activateFocuspoint(index)} role="button" aria-label={`select ${focusPointName(index)}`} aria-pressed={index === getActiveIndex()} tabindex="0" onkeydown={(event) => onShapedown(event, index)}>
                        <ShapeComponent
                            bind:this={instanceArray[index]}
                            index={index}
                            imageWidth={imageWidth}
                            imageHeight={imageHeight}
                            canvasWidth={canvasWidth}
                            canvasHeight={canvasHeight}
                        />

                        {#each instanceArray[index]?.getHandles?.() as [x, y], handleIndex}
                            <circle cx={x} cy={y} r="3" data-shape-index={index} data-index={handleIndex} ondblclick={instanceArray[index]?.onHandleDoubleClick} class="shape-handle" role="button" tabindex="0" aria-label={`Handle point of ${focusPointName(index)}`} />
                        {/each}
                    </g>
                {/each}
            </svg>
        {/if}
        <img bind:this={imgElement}
             src={image}
             alt="Selected"
             unselectable="on"
             {onload}
             onclick={autoCreatePolygon}
             class:detection-cursor={$detectionMode}
        />
    </div>
</div>
