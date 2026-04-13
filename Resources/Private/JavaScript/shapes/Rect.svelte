<script lang="ts">
    import {focuspoints, computeOverlayStyle, wizardConfigStore} from "../store.svelte";

    const {index} = $props();
    let isHovered = $state(false);
    const overlayStyle = $derived(
        computeOverlayStyle($focuspoints[index], $wizardConfigStore.fields, isHovered)
    )

    export function onDrag(event: InteractjsDragEvent): void {
        $focuspoints[index].__data.x = $focuspoints[index].__data.x + event.dx;
        $focuspoints[index].__data.y = $focuspoints[index].__data.y + event.dy;
    }

    export function onHandleDrag({dx, dy, target}: InteractjsDragEvent): void {
        const handleIndex = parseInt(target.getAttribute("data-index")!);
        let {x, y, width, height} = $focuspoints[index].__data;
        // 0 - left top
        // 1 - right top
        // 2 - right bottom
        // 3 - left bottom
        switch (handleIndex) {
            case 0:
                x += dx;
                y += dy;
                width -= dx;
                height -= dy;
                break;

            case 1:
                y += dy;
                width += dx;
                height -= dy;
                break;

            case 2:
                width += dx;
                height += dy;
                break;

            case 3:
                x += dx;
                width -= dx;
                height += dy;
                break;
        }
        if (width < 1) {
            if (handleIndex === 0 || handleIndex === 3)
                x += width - 1;
            width = 1;
        }
        if (height < 1) {
            if (handleIndex <= 1)
                y += height - 1;
            height = 1;
        }
        $focuspoints[index].__data = {x, y, width, height};
    }

    export function getHandles(): [number, number][] {
        const {x, y, width, height} = $focuspoints[index].__data;
        return [
            [x, y],
            [x + width, y],
            [x + width, y + height],
            [x, y + height],
        ];
    }
</script>

<rect
    class="draggable shape"
    role="presentation"
    x={$focuspoints[index].__data.x}
    y={$focuspoints[index].__data.y}
    width={$focuspoints[index].__data.width}
    height={$focuspoints[index].__data.height}
    data-index={index}
    style={overlayStyle}
    onmouseenter={() => isHovered = true}
    onmouseleave={() => isHovered = false}
/>
