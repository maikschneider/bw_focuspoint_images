<script>
    let {image, points, itemFormElName} = $props()

    function percentage(number) {
        return number * 100 + '%'
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
        <img src={image} alt="Preview" />
        <svg viewBox="0 0 200 200" preserveAspectRatio="none" class="focuspoint__svg" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask{itemFormElName}">
                <rect x="0" y="0" width="200" height="200" fill="#FFF" fill-opacity="0.5" />
                {#each points as point}
                    <rect
                        x={percentage(point.x)}
                        y={percentage(point.y)}
                        width={percentage(point.width)}
                        height={percentage(point.height)}
                        fill="#000" />
                {/each}
            </mask>
            <rect x="0" y="0" width="200" height="200" fill="#000" mask="url(#mask{itemFormElName})" />
            {#each points as point}
                <rect
                    x={percentage(point.x)}
                    y={percentage(point.y)}
                    width={percentage(point.width)}
                    height={percentage(point.height)}
                    stroke="#ff8700"
                    stroke-width="1.5px"
                    fill="none" />
            {/each}
        </svg>
    </div>
</div>
