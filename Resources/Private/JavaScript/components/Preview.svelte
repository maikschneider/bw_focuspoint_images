<script lang="ts">
    let {image, points, itemFormElName} = $props();

    let width = $state(0);
    let height = $state(0);

    function onload(e: Event) {
        if (!(e.target instanceof HTMLImageElement))
            return;
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
                    {#if point.__shape === "polygon"}
                        <polygon points={point.__data.points.map((xy: [number, number]) => xy.join(",")).join(" ")} fill="black" />
                    {:else if point.__shape === "rect"}
                        <rect x={point.__data.x} y={point.__data.y} width={point.__data.width} height={point.__data.height} />
                    {/if}
                {/each}
            </mask>
            <rect x="0" y="0" width={width} height={height} fill="rgba(0, 0, 0, .7)" mask="url(#mask-{itemFormElName})" />
        </svg>
    </div>
</div>
