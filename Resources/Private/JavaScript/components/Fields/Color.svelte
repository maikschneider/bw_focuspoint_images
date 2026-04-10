<script lang="ts">
    import '@typo3/backend/color-picker.js';
    import {onMount} from "svelte";
    import {focuspoints, wizardConfigStore} from "../../store.svelte";

    let {config, index, name} = $props();
    let picker: any;
    let color = $state('#ffffff');

    const useNativeColorPicker = $derived(($wizardConfigStore?.typo3Version ?? 14) <= 13);

    const swatches = ['#fff', '#000'];

    $effect(() => {
       color = $focuspoints[index][name] || '#ffffff';
    });
    onMount(() => {
        if (useNativeColorPicker || !picker) {
            return;
        }

        picker.swatches = swatches;
        picker.opacity = false;
        picker.color = color;
    });

    function syncFromInput(e: Event) {
        color = (e.target as HTMLInputElement).value;
        $focuspoints[index][name] = color;
    }
</script>

<style>

    .form-control-wrap {
        overflow: visible;
    }
</style>

<div class="form-group">
    <label class="form-label t3js-fomrengine-label" for="input-{index}-{name}">
        {config.title}
    </label>

    <div class="form-control-wrap">
        <div class="form-wizards-wrap">
            <div class="form-wizards-item-element">
                {#if useNativeColorPicker}
                    <input
                        type="color"
                        value={color}
                        oninput={syncFromInput}
                    />
                    <input
                        type="text"
                        class="form-control"
                        maxlength="7"
                        bind:value={color}
                        onblur={syncFromInput}
                    />
                {:else}
                    <typo3-backend-color-picker bind:this={picker}>
                        <input
                            type="text"
                            class="form-control"
                            maxlength="7"
                            onblur={syncFromInput}
                            bind:value={color}
                        />
                    </typo3-backend-color-picker>
                {/if}
            </div>
        </div>
    </div>
</div>
