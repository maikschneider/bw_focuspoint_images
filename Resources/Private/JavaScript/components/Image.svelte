<script>
    import interact from 'interactjs';
    import {activateFocuspoint, focusPointName, focuspoints} from "../store.svelte";
    import {onDestroy, onMount} from "svelte";
    import FocuspointShape from "./Shapes/FocuspointShape.svelte";

    import {initFocuspointInteractions} from "../interactions/focuspointInteractions";

    let {image} = $props()
    let canvasHeight = $state(0)
    let canvasWidth = $state(0)
    let focuspointName = $derived((focuspoint, index) => focusPointName(index))
    let img
    let initialized = $state(false)
    let isDarkMode = $state(false)

    let cleanupFocuspointInteractions

    // Handle keyboard navigation
    function handleKeyDown(event) {
        // Ignore moving by arrow key when typing in a text field / editable element
        const el = event.target;
        if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable)) {
            return;
        }

        // Find the active focuspoint
        const activeIndex = $focuspoints.findIndex(point => point.active);
        if (activeIndex === -1) return;

        // Set step size - larger with shift key
        const step = event.shiftKey ? 10 : 1;

        // Move based on arrow key
        switch(event.key) {
            case 'ArrowUp':
                event.preventDefault();
                movePoint(activeIndex, 0, -step);
                break;
            case 'ArrowDown':
                event.preventDefault();
                movePoint(activeIndex, 0, step);
                break;
            case 'ArrowLeft':
                event.preventDefault();
                movePoint(activeIndex, -step, 0);
                break;
            case 'ArrowRight':
                event.preventDefault();
                movePoint(activeIndex, step, 0);
                break;
        }
    }

    // Helper function to clamps a value to the normalized range between 0 and 1.
    function clamp(value) {
        return Math.max(0, Math.min(1, value))
    }

    // Helper function to move a point by x,y pixels
    function movePoint(index, deltaX, deltaY) {
        // Calculate the new positions in pixels
        const newX = ($focuspoints[index].x * canvasWidth) + deltaX;
        const newY = ($focuspoints[index].y * canvasHeight) + deltaY;

        // Convert back to relative coordinates (0-1 range)
        $focuspoints[index].x = Math.max(0, Math.min(1, newX / canvasWidth));
        $focuspoints[index].y = Math.max(0, Math.min(1, newY / canvasHeight));
    }

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
                move(event) {
                    const index = parseInt(event.target.getAttribute('data-index'))

                    $focuspoints[index].width = event.rect.width / canvasWidth
                    $focuspoints[index].height = event.rect.height / canvasHeight

                    const x = ($focuspoints[index].x * canvasWidth) + event.deltaRect.left
                    const y = ($focuspoints[index].y * canvasHeight) + event.deltaRect.top

                    $focuspoints[index].x = (x / canvasWidth)
                    $focuspoints[index].y = (y / canvasHeight)
                },
                end(event) {
                    const index = parseInt(event.target.getAttribute('data-index'))
                    if ($focuspoints[index].active) {
                        activateFocuspoint(index)
                    }
                }
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
                // call this function on every dragmove event
                move(event) {
                    const index = parseInt(event.target.getAttribute('data-index'))

                    const x = ($focuspoints[index].x * canvasWidth) + event.dx;
                    const y = ($focuspoints[index].y * canvasHeight) + event.dy;

                    $focuspoints[index].x = (x / canvasWidth)
                    $focuspoints[index].y = (y / canvasHeight)
                },
                end(event) {
                    const index = parseInt(event.target.getAttribute('data-index'))
                    if ($focuspoints[index].active) {
                        activateFocuspoint(index)
                    }
                }
            }
        })
    interact('.line-handle')
        .draggable({
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: false,
                }),
            ],
            listeners: {
                start(event) {
                    const index = parseInt(event.target.getAttribute('data-index'), 10)

                    if (Number.isNaN(index)) {
                        return
                    }

                    activateFocuspoint(index)
                },
                move(event) {
                    const index = parseInt(event.target.getAttribute('data-index'), 10)
                    const handle = event.target.getAttribute('data-handle')

                    if (Number.isNaN(index) || !handle || canvasWidth <= 0 || canvasHeight <= 0) {
                        return
                    }

                    focuspoints.update((items) => items.map((point, currentIndex) => {
                        if (currentIndex !== index) {
                            return point
                        }

                        const fallbackX2 = clamp((point.x ?? 0) + (point.width ?? 0.2))
                        const fallbackY2 = clamp((point.y ?? 0) + (point.height ?? 0.2))

                        const currentX = handle === 'start'
                            ? (point.x ?? 0) * canvasWidth
                            : (point.x2 ?? fallbackX2) * canvasWidth

                        const currentY = handle === 'start'
                            ? (point.y ?? 0) * canvasHeight
                            : (point.y2 ?? fallbackY2) * canvasHeight

                        const nextX = clamp((currentX + event.dx) / canvasWidth)
                        const nextY = clamp((currentY + event.dy) / canvasHeight)

                        if (handle === 'start') {
                            return {
                                ...point,
                                x: nextX,
                                y: nextY,
                            }
                        }

                        return {
                            ...point,
                            x2: nextX,
                            y2: nextY,
                        }
                    }))
                },
            },
        })
    interact('.crosshair-handle')
        .draggable({
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: false,
                }),
            ],
            listeners: {
                start(event) {
                    const index = parseInt(event.target.getAttribute('data-index'), 10)

                    if (Number.isNaN(index)) {
                        return
                    }

                    activateFocuspoint(index)
                },
                move(event) {
                    const index = parseInt(event.target.getAttribute('data-index'), 10)

                    if (Number.isNaN(index) || canvasWidth <= 0 || canvasHeight <= 0) {
                        return
                    }

                    focuspoints.update((items) => items.map((point, currentIndex) => {
                        if (currentIndex !== index) {
                            return point
                        }

                        const currentX = (point.x ?? 0) * canvasWidth
                        const currentY = (point.y ?? 0) * canvasHeight

                        return {
                            ...point,
                            x: clamp((currentX + event.dx) / canvasWidth),
                            y: clamp((currentY + event.dy) / canvasHeight),
                        }
                    }))
                },
            },
        })

    onMount(() => {
        if (img.complete) {
            setCanvasSizes()
        } else {
            img.addEventListener('load', setCanvasSizes)
        }
        cleanupFocuspointInteractions = initFocuspointInteractions({
            focuspoints,
            activateFocuspoint,
            getCanvasDimensions: () => ({
                canvasWidth,
                canvasHeight,
            }),
        })

        window.addEventListener('resize', updateCanvasSizes)
        window.addEventListener('keydown', handleKeyDown)

        const colorScheme = document.querySelector('html').getAttribute('data-color-scheme');
        const theme = document.querySelector('html').getAttribute('data-theme');
        const darkModePrefer = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (colorScheme === 'dark' || (theme === 'auto' && darkModePrefer && colorScheme !== 'light')) {
            isDarkMode = true
        }
    })

    onDestroy(() => {
        window.removeEventListener('resize', updateCanvasSizes)
        window.removeEventListener('keydown', handleKeyDown)
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

    const getPositionX = $derived((index) => {
        return $focuspoints[index].x * canvasWidth
    })

    const getPositionY = $derived((index) => {
        return $focuspoints[index].y * canvasHeight
    })

    const getFocuspointWidth = $derived((index) => {
        return $focuspoints[index].width * canvasWidth
    })

    const getFocuspointHeight = $derived((index) => {
        return $focuspoints[index].height * canvasHeight
    })

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


</style>

<div class="cropper-bg" class:cropper-bg--dark={isDarkMode} touch-action="none">
    <div class="wrapper">
        {#each $focuspoints as focuspoint, index}
            <FocuspointShape
                {focuspoint}
                {index}
                {initialized}
                {canvasWidth}
                {canvasHeight}
                {getPositionX}
                {getPositionY}
                {getFocuspointWidth}
                {getFocuspointHeight}
            />
        {/each}
        <img bind:this={img} src={image} alt="Selected" unselectable="on" />
    </div>
</div>
