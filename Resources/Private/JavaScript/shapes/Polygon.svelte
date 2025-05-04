<script>
    import {focuspoints, getActiveIndex} from "../store.svelte";

    const {index} = $props();

    function onCircleDblClick(event) {
        const index = parseInt(event.target.getAttribute('data-index'));
        const pointIndex = parseInt(event.target.getAttribute("data-point-index"));
        $focuspoints[index].__data.points = $focuspoints[index].__data.points.filter((point, i) => i !== pointIndex);
    }
</script>

<polygon
    class={["shape", index === getActiveIndex() && "active"]}
    points={$focuspoints[index].__data.points.map(point => point.join(",")).join(" ")}
    data-index={index} />
{#each $focuspoints[index].__data.points as [x, y], pointIndex}
    <circle cx={x} cy={y} r="3" data-index={index} data-point-index={pointIndex} ondblclick={onCircleDblClick} class="shape-handle" />
{/each}
