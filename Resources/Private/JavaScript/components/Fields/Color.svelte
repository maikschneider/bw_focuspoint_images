<script lang="ts">
    import '@typo3/backend/color-picker.js';
    import {onMount} from "svelte";
    import {focuspoints} from "../../store.svelte";

    let {config, index, name} = $props();
    let picker: any;
    let color = $state('#ffffff');

    const swatches = ['#fff', '#000'];

    $effect(() => {
       color = $focuspoints[index][name] || '#ffffff';
    });
    onMount(() => {
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

                <typo3-backend-color-picker bind:this={picker}>
                    <input
                        type="text"
                        class="form-control"
                        maxlength="7"
                        onblur={syncFromInput}
                        bind:value={color}
                    />
                </typo3-backend-color-picker>

            </div>
        </div>
    </div>
</div>
