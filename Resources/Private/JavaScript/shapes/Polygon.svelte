<script lang="ts">
    import {focuspoints} from "../store.svelte";

    const {index} = $props();

    export function getHandles(): [number, number][] {
        return $focuspoints[index].__data.points;
    }

    export function onDrag(event: InteractjsDragEvent): void {
        $focuspoints[index].__data.points = $focuspoints[index].__data.points.map(([x, y]: [number, number]) => [x + event.dx, y + event.dy]);
    }

    export function onHandleDrag(event: InteractjsDragEvent): void {
        const handleIndex = parseInt(event.target.getAttribute("data-index")!);
        const [x, y] = $focuspoints[index].__data.points[handleIndex];
        $focuspoints[index].__data.points[handleIndex] = [x + event.dx, y + event.dy];
    }

    export function onHandleDoubleClick(event: MouseEvent & {currentTarget: EventTarget & SVGCircleElement}) {
        const handleIndex = parseInt(event.currentTarget.getAttribute("data-index")!);
        $focuspoints[index].__data.points = $focuspoints[index].__data.points.filter((point: [number, number], i: number) => i !== handleIndex);
    }
</script>

<polygon class="shape" points={$focuspoints[index].__data.points.map((point: [number, number]) => point.join(",")).join(" ")} data-index={index} />
