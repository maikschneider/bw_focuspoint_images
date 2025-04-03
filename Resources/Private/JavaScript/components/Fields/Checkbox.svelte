<script>
    import {focuspoints} from '../../store.svelte.js'

    let {config, index, name} = $props()
</script>

<div class="form-group">
    <label class="form-label" for="input-{index}-{name}">
        {config.title}
    </label>
    <div class="form-check form-switch">
        <input type="checkbox"  class="form-check-input" id="input-{index}-{name}" />
        <label class="form-check-label" for="input-{index}-{name}">
            <span class="visually-hidden">Example label</span>
        </label>
    </div>
    <input type="hidden" bind:value={$focuspoints[index][name]} id="input-{index}-{name}" />
</div>
