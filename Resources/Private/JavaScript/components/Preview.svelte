<script>
    let {image, points, itemFormElName} = $props();

    function percentage(number) {
        return number * 100 + '%'
    }

    let width = $state(0);
    let height = $state(0);

    function onload(e) {
        width = e.target.naturalWidth;
        height = e.target.naturalHeight;
    }
</script>

<style>
    .wrapper {
        display: flex;
        margin-bottom: 1rem;
    }

    .preview {
        display: inline-block;
        position: relative;
    }

    img {
        max-width: 200px;
        max-height: 200px;
    }

    svg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
</style>

<div class="wrapper">
    <div class="preview">
        <img src={image} alt="Preview" {onload} />
        <svg viewBox="0 0 {width} {height}">
            <mask id="mask-{itemFormElName}">
                <rect x="0" y="0" width={width} height={height} fill="white" />
                {#each points as point}
                    {#if point.points}
                        <polygon points={point.points.map(xy => xy.join(",")).join(" ")} fill="black" />
                    {:else}
                        <rect x={percentage(point.x)} y={percentage(point.y)} width={percentage(point.width)} height={percentage(point.height)} />
                    {/if}
                {/each}
            </mask>
            <rect x="0" y="0" width={width} height={height} fill="rgba(0, 0, 0, .7)" mask="url(#mask-{itemFormElName})" />
        </svg>
    </div>
</div>
