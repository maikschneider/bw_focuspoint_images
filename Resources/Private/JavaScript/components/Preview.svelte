<script>
    import {onMount, onDestroy} from "svelte";

    let {image, points, itemFormElName} = $props()
    let previewPoints = $state(points)

    onMount(() => {
        bindInputEventListener()
    })

    onDestroy(() => {
        window.removeEventListener(`${itemFormElName}-save`, handleInputEvent)
    })

    function handleInputEvent(e) {
        try {
            previewPoints = JSON.parse(e.detail.value)
        } catch (error) {
            console.error('Failed to parse focus points:', error)
        }
    }

    function bindInputEventListener() {
        window.addEventListener(`${itemFormElName}-save`, handleInputEvent)
    }

    function percentage(number) {
        return number * 100 + '%'
    }

    function size(number) {
        return number * 100
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
        <img alt="Preview" src={image} />
        <svg class="focuspoint__svg" preserveAspectRatio="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask{itemFormElName}">
                <rect fill="#FFF" fill-opacity="0.5" height="200" width="200" x="0" y="0" />
                {#each previewPoints as point}
                    <rect
                        x={percentage(point.x)} y={percentage(point.y)} width={size(point.width)} height={size(point.height)} fill="#000" />
                {/each}
            </mask>
            <rect fill="#000" height="200" mask="url(#mask{itemFormElName})" width="200" x="0" y="0" />
            {#each previewPoints as point}
                <rect
                    x={percentage(point.x)}
                    y={percentage(point.y)}
                    width={size(point.width)}
                    height={size(point.height)}
                    stroke="#ff8700"
                    stroke-width="1.5px"
                    fill="none" />
            {/each}
        </svg>
    </div>
</div>
