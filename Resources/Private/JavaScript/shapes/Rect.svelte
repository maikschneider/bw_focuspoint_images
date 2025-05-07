<script lang="ts">
    import {focuspoints} from "../store.svelte";

    const {index} = $props();
</script>

<circle cx={$focuspoints[index].__data.x} cy={$focuspoints[index].__data.y} r="3" class="shape-handle" />
<circle cx={$focuspoints[index].__data.x + $focuspoints[index].__data.width} cy={$focuspoints[index].__data.y} r="3" class="shape-handle" />
<circle cx={$focuspoints[index].__data.x + $focuspoints[index].__data.width} cy={$focuspoints[index].__data.y + $focuspoints[index].__data.height} r="3" class="shape-handle" />
<circle cx={$focuspoints[index].__data.x} cy={$focuspoints[index].__data.y + $focuspoints[index].__data.height} r="3" class="shape-handle" />
<rect class="draggable shape" x={$focuspoints[index].__data.x} y={$focuspoints[index].__data.y} width={$focuspoints[index].__data.width} height={$focuspoints[index].__data.height} data-index={index} />
