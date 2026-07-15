<script>
    import {activateFocuspoint, focuspoints} from '../../store.svelte.js'

    let {
        focuspoint,
        index,
        initialized,
        canvasWidth,
        canvasHeight
    } = $props()

    function clamp(value) {
        return Math.max(0, Math.min(1, value))
    }

    function getFallbackEndX() {
        return clamp((focuspoint?.x ?? 0) + (focuspoint?.width ?? 0.2))
    }

    function getFallbackEndY() {
        return clamp((focuspoint?.y ?? 0) + (focuspoint?.height ?? 0.2))
    }

    function getStartX() {
        return (focuspoint?.x ?? 0) * canvasWidth
    }

    function getStartY() {
        return (focuspoint?.y ?? 0) * canvasHeight
    }

    function getEndX() {
        return (focuspoint?.x2 ?? getFallbackEndX()) * canvasWidth
    }

    function getEndY() {
        return (focuspoint?.y2 ?? getFallbackEndY()) * canvasHeight
    }

    function ensureLineEndPoint() {
        if (!focuspoint) {
            return
        }

        if (focuspoint.x2 !== undefined && focuspoint.y2 !== undefined) {
            return
        }

        focuspoints.update((items) => items.map((item, currentIndex) => {
            if (currentIndex !== index) {
                return item
            }

            return {
                ...item,
                x2: item.x2 ?? clamp((item.x ?? 0) + (item.width ?? 0.2)),
                y2: item.y2 ?? clamp((item.y ?? 0) + (item.height ?? 0.2)),
            }
        }))
    }

    $effect(() => {
        ensureLineEndPoint()
    })
</script>

<svg
    class="focuspoint-line"
    class:active={focuspoint?.active}
    class:opacity-0={!initialized}
    aria-hidden="true"
>
    <line
        x1={getStartX()}
        y1={getStartY()}
        x2={getEndX()}
        y2={getEndY()}
    />
</svg>

<button
    type="button"
    class="line-handle"
    class:active={focuspoint?.active}
    class:opacity-0={!initialized}
    data-index={index}
    data-handle="start"
    style="transform: translate3d({getStartX()}px, {getStartY()}px, 0) translate(-50%, -50%);"
    onclick={(event) => {
        event.preventDefault()
        activateFocuspoint(index)
    }}
    aria-label="Move line start point"
></button>

<button
    type="button"
    class="line-handle"
    class:active={focuspoint?.active}
    class:opacity-0={!initialized}
    data-index={index}
    data-handle="end"
    style="transform: translate3d({getEndX()}px, {getEndY()}px, 0) translate(-50%, -50%);"
    onclick={(event) => {
        event.preventDefault()
        activateFocuspoint(index)
    }}
    aria-label="Move line end point"
></button>

<style>
    .focuspoint-line {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: visible;
        pointer-events: none;
        transition: opacity 0.15s ease;
    }

    .focuspoint-line line {
        stroke: rgba(255, 255, 255, 0.9);
        stroke-width: 3;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
    }

    .focuspoint-line.active line {
        stroke: #ff8700;
    }

    .line-handle {
        position: absolute;
        z-index: 5;
        width: 14px;
        height: 14px;
        padding: 0;
        border: 2px solid rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.8);
        cursor: grab;
        transition: opacity 0.15s ease, border-color 0.15s ease;
    }

    .line-handle.active {
        border-color: #ff8700;
    }

    .line-handle:active {
        cursor: grabbing;
    }

    .opacity-0 {
        opacity: 0;
    }
</style>
