<script>
    import interact from 'interactjs';
    import {activateFocuspoint, focusPointName, focuspoints} from "../store.svelte";
    import {onDestroy, onMount} from "svelte";

    let {image} = $props()
    let canvasHeight = $state(0)
    let canvasWidth = $state(0)
    let focuspointName = $derived((focuspoint, index) => focusPointName(index))
    let img
    let initialized = $state(false)
    let isDarkMode = $state(false)

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

    onMount(() => {
        if (img.complete) {
            setCanvasSizes()
        } else {
            img.addEventListener('load', setCanvasSizes)
        }

        window.addEventListener('resize', updateCanvasSizes, {once: true})

        const colorScheme = document.querySelector('html').getAttribute('data-color-scheme');
        const theme = document.querySelector('html').getAttribute('data-theme');
        const darkModePrefer = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (colorScheme === 'dark' || (theme === 'auto' && darkModePrefer && colorScheme !== 'light')) {
            isDarkMode = true
        }
    })

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
</style>

<div class="cropper-bg" class:cropper-bg--dark={isDarkMode} touch-action="none">
    <div class="wrapper">
        {#each $focuspoints as focuspoint, index}
            <div
                onclick={() => activateFocuspoint(index)}
                class:active={focuspoint.active}
                class:opacity-0={!initialized}
                data-index={index}
                class="draggable style1 resizable"
                style="transform:translate3d({getPositionX(index)}px, {getPositionY(index)}px, 0); width: {getFocuspointWidth(index)}px; height: {getFocuspointHeight(index)}px;"
                data-x="{getPositionX(index)}"
                data-y="{getPositionY(index)}">
                <span class="text-break">{focuspointName(focuspoint, index)}</span>
                <span class="ui-resizable-handle ui-resizable-nw"></span>
                <span class="ui-resizable-handle ui-resizable-ne"></span>
                <span class="ui-resizable-handle ui-resizable-sw"></span>
                <span class="ui-resizable-handle ui-resizable-se"></span>
            </div>
        {/each}
        <img bind:this={img} src={image} alt="Selected" unselectable="on" />
    </div>
</div>
