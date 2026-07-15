<script>
    import {focuspoints} from '../../store.svelte.js'
    import Rectangle from './Rectangle.svelte'
    import Ellipse from './Ellipse.svelte'
    import Line from './Line.svelte'
    import Crosshair from "./Crosshair.svelte";

    let {
        index,
        initialized,
        canvasWidth,
        canvasHeight,
        getPositionX,
        getPositionY,
        getFocuspointWidth,
        getFocuspointHeight
    } = $props()

    const components = {
        rectangle: Rectangle,
        ellipse: Ellipse,
        circle: Ellipse,
        line: Line,
        crosshair: Crosshair,
    }

    let focuspoint = $derived($focuspoints[index])
    let shape = $derived(focuspoint?.shape ?? 'rectangle')
    let Component = $derived(components[shape] ?? Rectangle)
</script>

{#if focuspoint}
    {#key shape}
        <!-- svelte-ignore svelte_component_deprecated -->
        <svelte:component
            this={Component}
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
    {/key}
{/if}
