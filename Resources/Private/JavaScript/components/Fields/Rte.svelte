<script>
    import {focuspoints} from '../../store.svelte.js'
    import {onMount} from 'svelte'

    let {config, index, name} = $props()

    onMount(() => {
        import('../../ckeditor-rte.js')
    })

    function handleChange(e) {
        $focuspoints[index][name] = e.target.value ?? ''
    }
</script>

<style>
    :global(.ck-content) {
        background-color: var(--bs-body-bg) !important;
    }
</style>

<div class="form-group">
    <label class="form-label" for="rte-{index}-{name}">
        {config.title}
    </label>
    <typo3-rte-ckeditor-ckeditor5 options={config.editorConfig ?? {}}>
        <textarea
            slot="textarea"
            id="rte-{index}-{name}"
            class="form-control"
            onchange={handleChange}
            rows="5">{$focuspoints[index][name]}</textarea>
    </typo3-rte-ckeditor-ckeditor5>
</div>
