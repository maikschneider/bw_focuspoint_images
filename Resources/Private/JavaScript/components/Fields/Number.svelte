<script lang="ts">
    import {focuspoints} from "../../store.svelte";
    import Icon from "../Icon.svelte";

    let {config, index, name} = $props();
</script>

<style>
    .form-range-input {
        min-width: 120px;
    }
</style>

<div class="form-group">
    <label class="form-label t3js-fomrengine-label" for="input-{index}-{name}">
        {config.title}
    </label>

    <div class="form-control-wrap">
        <div class="form-wizards-wrap">
            <div class="form-wizards-item-element">
                <div class="form-control-clearable-wrapper">
                    <input
                        type="number"
                        class="form-control"
                        id="input-{index}-{name}"
                        bind:value={$focuspoints[index][name]}
                        min={config?.range?.lower ? Number(config.range.lower) : undefined}
                        max={config?.range?.upper ? Number(config.range.upper) : undefined}
                        step={config?.slider?.step ?? 1}
                    />

                    <button
                        type="button"
                        class="close"
                        onclick={() => $focuspoints[index][name] = '0'}
                    >
                        <Icon name="actions-close" />
                    </button>
                </div>
            </div>

            {#if config?.slider}
                <div class="form-wizards-item-aside form-wizards-item-aside--field-control">
                    <div class="form-range">
                        <input
                            type="range"
                            class="form-range-input"
                            min={config?.range?.lower ?? -90}
                            max={config?.range?.upper ?? 90}
                            step={config?.slider?.step ?? 1}
                            bind:value={$focuspoints[index][name]}
                            title={$focuspoints[index][name]}
                        />
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
