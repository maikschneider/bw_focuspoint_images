<script>
    import interact from 'interactjs';
    import {focuspoints} from "../store.svelte";

    let {image} = $props()

    interact('.draggable')
            .draggable({
                // keep the element within the area of it's parent
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true
                    })
                ],
                // enable autoScroll
                autoScroll: true,

                listeners: {
                    // call this function on every dragmove event
                    move: dragMoveListener,

                    // call this function on every dragend event
                    end(event) {
                        var textEl = event.target.querySelector('p')

                        textEl && (textEl.textContent =
                                'moved a distance of ' +
                                (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                                        Math.pow(event.pageY - event.y0, 2) | 0))
                                        .toFixed(2) + 'px')
                    }
                }
            })

    function dragMoveListener(event) {
        const target = event.target;
        // keep the dragged position in the data-x/data-y attributes
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    }

    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener
</script>

<style>
    .draggable {
        position: absolute;
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
    }
</style>

<div class="cropper-bg" touch-action="none">

    {#each $focuspoints as focuspoint}
        <div class="draggable" data-x="{focuspoint.x}" data-y="{focuspoint.y}">
            <span>Focuspoint</span>
        </div>
    {/each}

    <img src={image} alt="Image" unselectable="on" />

</div>
