<script>
    import {onMount} from "svelte";
    import {focuspoints, getIcon, iconStore} from '../../store.svelte.js'

    let {config, index, name} = $props()

    let isCheckbox = config?.renderType === 'check' || !Object.hasOwn(config, 'renderType')
    let isToggle = config?.renderType === 'checkboxToggle'

    onMount(() => {
        getIcon('actions-check')
        getIcon('empty-empty')
    })
</script>

<div class="form-group">
    <label class="form-label" for="input-{index}-{name}" id="label-{index}-{name}">
        {config?.title ?? config.title}
    </label>
    <div
        class="form-check" class:form-check-type-icon-toggle={isCheckbox} class:form-switch={isToggle}>
        <input
            type="checkbox"
            class="form-check-input me-1"
            id="input-{index}-{name}"
            bind:checked={$focuspoints[index][name]}
            aria-labelledby="label-{index}-{name}" />
        <label class="form-check-label" for="input-{index}-{name}">
            {#if isCheckbox}
                <span class="form-check-label-icon">
                    <span class="form-check-label-icon-checked">
                        {@html $iconStore['actions-check']}
                    </span>
                    <span class="form-check-label-icon-unchecked">
                        {@html $iconStore['empty-empty']}
                    </span>
                </span>
            {/if}
            {config?.label ?? ''}
        </label>
    </div>
</div>
