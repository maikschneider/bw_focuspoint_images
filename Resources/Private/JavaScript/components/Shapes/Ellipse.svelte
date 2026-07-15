<script>
    import Rectangle from './Rectangle.svelte'

    let {
        focuspoint,
        index,
        initialized,
        getPositionX,
        getPositionY,
        getFocuspointWidth,
        getFocuspointHeight
    } = $props()
</script>

<Rectangle
    {focuspoint}
    {index}
    {initialized}
    {getPositionX}
    {getPositionY}
    {getFocuspointWidth}
    {getFocuspointHeight}
/>
