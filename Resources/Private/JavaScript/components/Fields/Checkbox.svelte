<script>
    import {onMount} from "svelte";
    import {focuspoints, getIcon, iconStore} from '../../store.svelte.js'

    let {config, index, name} = $props()

    onMount(() => {
        getIcon('actions-check')
        getIcon('empty-empty')
    })
</script>

<div class="form-group">
    <label class="form-label" for="input-{index}-{name}">
        {config?.title ?? config.title}
    </label>
    <div class="form-check form-check-type-icon-toggle">
        <input
            type="checkbox"
            class="form-check-input"
            bind:checked={$focuspoints[index][name]}
            aria-labelledby="label-{index}-{name}" />
        <label class="form-check-label" for="input-{index}-{name}">
            <span class="form-check-label-icon">
                <span class="form-check-label-icon-checked">
                    {@html $iconStore['actions-check']}
                </span>
                <span class="form-check-label-icon-unchecked">
                    {@html $iconStore['empty-empty']}
                </span>
            </span>
            {config?.label ?? ''}
        </label>
    </div>
</div>
