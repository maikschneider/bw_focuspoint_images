<script>
    let {image, points, itemFormElName} = $props()

    function percentage(number, fallback = 0) {
        const parsedNumber = Number(number)

        return (Number.isFinite(parsedNumber) ? parsedNumber : fallback) * 100 + '%'
    }

    function shapeOf(point) {
        return point.shape ?? 'rectangle'
    }

    function ellipseCx(point) {
        return ((Number(point.x) || 0) + ((Number(point.width) || 0) / 2)) * 100 + '%'
    }

    function ellipseCy(point) {
        return ((Number(point.y) || 0) + ((Number(point.height) || 0) / 2)) * 100 + '%'
    }

    function ellipseRx(point) {
        return ((Number(point.width) || 0) / 2) * 100 + '%'
    }

    function ellipseRy(point) {
        return ((Number(point.height) || 0) / 2) * 100 + '%'
    }

    function lineX2(point) {
        return percentage(point.x2 ?? ((point.x ?? 0) + (point.width ?? 0.2)))
    }

    function lineY2(point) {
        return percentage(point.y2 ?? ((point.y ?? 0) + (point.height ?? 0.2)))
    }

    function crosshairLeft(point) {
        return `calc(${percentage(point.x)} - 5%)`
    }

    function crosshairRight(point) {
        return `calc(${percentage(point.x)} + 5%)`
    }

    function crosshairTop(point) {
        return `calc(${percentage(point.y)} - 5%)`
    }

    function crosshairBottom(point) {
        return `calc(${percentage(point.y)} + 5%)`
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
                    {@const shape = shapeOf(point)}

                    {#if shape === 'ellipse' || shape === 'circle'}
                        <ellipse
                            cx={ellipseCx(point)}
                            cy={ellipseCy(point)}
                            rx={ellipseRx(point)}
                            ry={ellipseRy(point)}
                            fill="#000" />
                    {:else if shape === 'line'}
                        <line
                            x1={percentage(point.x)}
                            y1={percentage(point.y)}
                            x2={lineX2(point)}
                            y2={lineY2(point)}
                            stroke="#000"
                            stroke-width="4"
                            stroke-linecap="round" />
                    {:else if shape === 'crosshair'}
                        <line
                            x1={crosshairLeft(point)}
                            y1={percentage(point.y)}
                            x2={crosshairRight(point)}
                            y2={percentage(point.y)}
                            stroke="#000"
                            stroke-width="4"
                            stroke-linecap="round" />
                        <line
                            x1={percentage(point.x)}
                            y1={crosshairTop(point)}
                            x2={percentage(point.x)}
                            y2={crosshairBottom(point)}
                            stroke="#000"
                            stroke-width="4"
                            stroke-linecap="round" />
                    {:else}
                        <rect
                            x={percentage(point.x)}
                            y={percentage(point.y)}
                            width={percentage(point.width)}
                            height={percentage(point.height)}
                            fill="#000" />
                    {/if}
                {/each}
            </mask>

            <rect x="0" y="0" width="200" height="200" fill="#000" mask="url(#mask{itemFormElName})" />

            {#each points as point}
                {@const shape = shapeOf(point)}

                {#if shape === 'ellipse' || shape === 'circle'}
                    <ellipse
                        cx={ellipseCx(point)}
                        cy={ellipseCy(point)}
                        rx={ellipseRx(point)}
                        ry={ellipseRy(point)}
                        stroke="#ff8700"
                        stroke-width="1.5px"
                        fill="none" />
                {:else if shape === 'line'}
                    <line
                        x1={percentage(point.x)}
                        y1={percentage(point.y)}
                        x2={lineX2(point)}
                        y2={lineY2(point)}
                        stroke="#ff8700"
                        stroke-width="2"
                        stroke-linecap="round"
                        fill="none" />
                {:else if shape === 'crosshair'}
                    <line
                        x1={crosshairLeft(point)}
                        y1={percentage(point.y)}
                        x2={crosshairRight(point)}
                        y2={percentage(point.y)}
                        stroke="#ff8700"
                        stroke-width="2"
                        stroke-linecap="round"
                        fill="none" />
                    <line
                        x1={percentage(point.x)}
                        y1={crosshairTop(point)}
                        x2={percentage(point.x)}
                        y2={crosshairBottom(point)}
                        stroke="#ff8700"
                        stroke-width="2"
                        stroke-linecap="round"
                        fill="none" />
                {:else}
                    <rect
                        x={percentage(point.x)}
                        y={percentage(point.y)}
                        width={percentage(point.width)}
                        height={percentage(point.height)}
                        stroke="#ff8700"
                        stroke-width="1.5px"
                        fill="none" />
                {/if}
            {/each}
        </svg>
    </div>
</div>
