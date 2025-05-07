<script lang="ts">
    import {focuspoints} from '../../store.svelte.js'

    let {config, index, name} = $props()
</script>

<div class="form-group">
    <label class="form-label" for="input-{index}-{name}">
        {config.title}
    </label>
    <input bind:value={$focuspoints[index][name]} type="text" class="form-control" id="input-{index}-{name}" />
</div>
