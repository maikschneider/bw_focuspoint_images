<script>
    import interact from 'interactjs';

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
        var target = event.target
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

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
    .canvas {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .draggable {
        position: absolute;
    }

    img {
        pointer-events: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        max-width: 100%;
    }
</style>

<div class="canvas">
    <img src={image} alt="Image" unselectable="on" />

    <div id="drag-1" class="draggable" style="display: inline-block">
        <span> You can drag one element</span>
    </div>
    <div id="drag-2" class="draggable" style="display: inline-block">
        <span> with each spanointer</span>
    </div>
</div>
