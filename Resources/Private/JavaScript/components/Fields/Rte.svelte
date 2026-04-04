<script>
    import {focuspoints} from '../../store.svelte.js'
    import '@typo3/rte-ckeditor/ckeditor5.js'
    import {onMount} from 'svelte'

    let {config, index, name} = $props()
    let textareaEl

    onMount(async () => {
        if (textareaEl) {
            textareaEl.value = $focuspoints[index][name] ?? ''
        }
    })

    function handleChange() {
        $focuspoints[index][name] = textareaEl?.value ?? ''
    }
</script>

<div class="form-group">
    <label class="form-label" for="rte-{index}-{name}">
        {config.title}
    </label>
    <typo3-rte-ckeditor-ckeditor5 options={config.editorConfig ?? {}}>
        <textarea
            slot="textarea" id="rte-{index}-{name}" class="form-control" bind:this={textareaEl} onchange={handleChange} rows="5"></textarea>
    </typo3-rte-ckeditor-ckeditor5>
</div>
