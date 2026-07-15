<script>
    import {activateFocuspoint} from '../../store.svelte.js'

    let {
        focuspoint,
        index,
        initialized,
        canvasWidth,
        canvasHeight
    } = $props()

    const size = 22

    function getX() {
        return (focuspoint?.x ?? 0) * canvasWidth
    }

    function getY() {
        return (focuspoint?.y ?? 0) * canvasHeight
    }
</script>

<svg
    class="focuspoint-crosshair"
    class:active={focuspoint?.active}
    class:opacity-0={!initialized}
    width={canvasWidth}
    height={canvasHeight}
    aria-hidden="true"
>
    <line
        x1={getX() - size}
        y1={getY()}
        x2={getX() + size}
        y2={getY()}
    />
    <line
        x1={getX()}
        y1={getY() - size}
        x2={getX()}
        y2={getY() + size}
    />
</svg>

<button
    type="button"
    class="crosshair-handle"
    class:active={focuspoint?.active}
    class:opacity-0={!initialized}
    data-index={index}
    style="transform: translate3d({getX()}px, {getY()}px, 0) translate(-50%, -50%);"
    onclick={(event) => {
        event.preventDefault()
        activateFocuspoint(index)
    }}
    aria-label="Move crosshair point"
></button>

<style>
    .focuspoint-crosshair {
        position: absolute;
        inset: 0;
        overflow: visible;
        pointer-events: none;
        transition: opacity 0.15s ease;
    }

    .focuspoint-crosshair line {
        stroke: rgba(255, 255, 255, 0.95);
        stroke-width: 2;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
    }

    .focuspoint-crosshair.active line {
        stroke: #ff8700;
    }

    .crosshair-handle {
        position: absolute;
        z-index: 5;
        width: 14px;
        height: 14px;
        padding: 0;
        border: 2px solid rgba(255, 255, 255, 0.95);
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.8);
        cursor: grab;
        transition: opacity 0.15s ease, border-color 0.15s ease;
    }

    .crosshair-handle.active {
        border-color: #ff8700;
    }

    .crosshair-handle:active {
        cursor: grabbing;
    }

    .opacity-0 {
        opacity: 0;
    }
</style>
