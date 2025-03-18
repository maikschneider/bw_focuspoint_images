<script>
    import interact from 'interactjs';
    import {activateFocuspoint, focusPointName, focuspoints} from "../store.svelte";
    import {onDestroy, onMount} from "svelte";

    let {image} = $props()
    let canvasHeight = $state(0)
    let canvasWidth = $state(0)
    let focuspointName = $derived((focuspoint, index) => focusPointName(index))
    let img

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

        window.addEventListener('resize', setCanvasSizes)
    })

    onDestroy(() => {
        window.removeEventListener('resize', setCanvasSizes)
    })

    function setCanvasSizes() {
        setTimeout(() => {
            canvasHeight = img.parentElement.getBoundingClientRect().height
            canvasWidth = img.parentElement.getBoundingClientRect().width
        }, 300)
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
    }

    .style1 {
        display: inline-grid;
        background-color: rgba(0, 0, 0, 0.6);
        border: 1px dashed rgba(255, 255, 255, 0.8);
        color: white;
        padding: 10px;
    }

    .style1.active {
        border-color: #ff8700;
        border-style: solid;
        background-color: rgba(0, 0, 0, 0.8);
    }

    img {
        pointer-events: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        max-width: 100%;
        max-height: 100%;
    }

    .cropper-bg {
        padding: 20px;
        display: flex;
        justify-content: center;
    }
</style>

<div class="cropper-bg" touch-action="none">
    <div>
        {#each $focuspoints as focuspoint, index}
            <div
                    onclick={() => activateFocuspoint(index)}
                    class:active={focuspoint.active}
                    data-index={index}
                    class="draggable style1 resizable"
                    style="transform:translate3d({getPositionX(index)}px, {getPositionY(index)}px, 0); width: {getFocuspointWidth(index)}px; height: {getFocuspointHeight(index)}px;"
                    data-x="{getPositionX(index)}"
                    data-y="{getPositionY(index)}">
                <span>{focuspointName(focuspoint, index)}</span>
            </div>
        {/each}
        <img bind:this={img} src={image} alt="Selected" unselectable="on" />
    </div>
</div>
