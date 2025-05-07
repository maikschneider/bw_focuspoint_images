<script lang="ts">
    import {focuspoints} from "../store.svelte";

    const {index} = $props();

    function onCircleDblClick(event: MouseEvent & {currentTarget: EventTarget & SVGCircleElement}) {
        const index = parseInt(event.currentTarget.getAttribute('data-index')!);
        const pointIndex = parseInt(event.currentTarget.getAttribute("data-point-index")!);
        $focuspoints[index].__data.points = $focuspoints[index].__data.points.filter((point: [number, number], i: number) => i !== pointIndex);
    }

    export function onDrag(event: InteractjsDragEvent): void {
        $focuspoints[index].__data.points = $focuspoints[index].__data.points.map(([x, y]: [number, number]) => [x + event.dx, y + event.dy]);
    }
</script>

<polygon
    class="shape"
    points={$focuspoints[index].__data.points.map((point: [number, number]) => point.join(",")).join(" ")}
    data-index={index} />
{#each $focuspoints[index].__data.points as [x, y], pointIndex}
    <circle cx={x} cy={y} r="3" data-index={index} data-point-index={pointIndex} ondblclick={onCircleDblClick} class="shape-handle" />
{/each}
