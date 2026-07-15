<script>
    import {focuspoints} from '../../store.svelte.js'

    let {config, index, name} = $props()
    let options = Object.entries(config.options).map(([value, label]) => ({value, label}))

    function clamp(value) {
        return Math.max(0, Math.min(1, value))
    }

    function selectShape(value) {
        focuspoints.update((items) => items.map((focuspoint, currentIndex) => {
            if (currentIndex !== index) {
                return focuspoint
            }

            if (value === 'crosshair' && focuspoint.shape !== 'crosshair') {
                return {
                    ...focuspoint,
                    [name]: value,
                    x: clamp((focuspoint.x ?? 0) + ((focuspoint.width ?? 0) / 2)),
                    y: clamp((focuspoint.y ?? 0) + ((focuspoint.height ?? 0) / 2)),
                }
            }

            return {
                ...focuspoint,
                [name]: value,
            }
        }))
    }
</script>

<div class="form-group">
    <label class="form-label" id="input-{index}-{name}-label">
        {config.title}
    </label>

    <div
        class="shape-select"
        role="radiogroup"
        aria-labelledby="input-{index}-{name}-label"
    >
        {#each options as {value, label}}
            <button
                type="button"
                class="shape-select__button"
                class:shape-select__button--active={$focuspoints[index][name] === value}
                aria-pressed={$focuspoints[index][name] === value}
                title={label}
                onclick={(event) => {
                    event.preventDefault()
                    selectShape(value)
                }}
            >
                <span class="shape-select__icon" aria-hidden="true">
                    {#if value === 'rectangle'}
                        <svg viewBox="0 0 24 24">
                            <rect x="4" y="6" width="16" height="12" />
                        </svg>
                    {:else if value === 'circle' || value === 'ellipse'}
                        <svg viewBox="0 0 24 24">
                            <ellipse cx="12" cy="12" rx="8" ry="6" />
                        </svg>
                    {:else if value === 'line'}
                        <svg viewBox="0 0 24 24">
                            <line x1="5" y1="19" x2="19" y2="5" />
                        </svg>
                    {:else if value === 'crosshair'}
                        <svg viewBox="0 0 24 24">
                            <line x1="12" y1="4" x2="12" y2="20" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                        </svg>
                    {:else}
                        {label}
                    {/if}
                </span>

                <span class="shape-select__label">
                    {label}
                </span>
            </button>
        {/each}
    </div>
</div>

<style>
    .shape-select {
        display: flex;
        gap: 0.5rem;
    }

    .shape-select__button {
        display: flex;
        flex: 1 1 0;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        min-height: 4rem;
        padding: 0.5rem;
        border: 1px solid var(--typo3-component-border-color);
        border-radius: var(--typo3-component-border-radius);
        background: var(--typo3-component-bg);
        color: inherit;
        cursor: pointer;
    }

    .shape-select__button:hover,
    .shape-select__button--active {
        border-color: var(--typo3-state-primary-bg);
        box-shadow: inset 0 0 0 1px var(--typo3-state-primary-bg);
    }

    .shape-select__icon svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
    }

    .shape-select__label {
        font-size: 0.75rem;
    }
</style>
