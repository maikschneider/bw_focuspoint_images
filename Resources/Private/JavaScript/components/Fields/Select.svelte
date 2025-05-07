<script lang="ts">
    import {focuspoints} from '../../store.svelte.js'

    let {config, index, name} = $props()
    let options = Object.entries(config.options).map(([value, label]) => ({value, label}))
</script>

<div class="form-group">
    <label class="form-label" for="input-{index}-{name}">
        {config.title}
    </label>
    <select class="form-select" id="input-{index}-{name}" bind:value={$focuspoints[index][name]}>
        {#each options  as {value, label}}
            <option value={value}>{label}</option>
        {/each}
    </select>
</div>
