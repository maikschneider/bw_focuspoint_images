<script>
    import {focuspoints, wizardConfigStore} from '../../store.svelte.js'
    import AjaxRequest from "@typo3/core/ajax/ajax-request.js";
    import Modal from "@typo3/backend/modal.js";

    let {config, index, name} = $props()

    const handleLinkSelection = (event) => {
        $focuspoints[index][name] = event.detail.link
    }

    async function getLinkBrowserInfo() {
        let url = TYPO3.settings.ajaxUrls['wizard_focuspoint_linkbrowserurl'];
        url += '&pid=' + $wizardConfigStore.pid;
        url += '&fieldName=' + name;
        url += '&inputName=focuspoint-hidden-link-field';
        if ($focuspoints[index][name]) {
            url += '&inputValue=' + $focuspoints[index][name]
        }

        return (new AjaxRequest(url)).get().then(async (response) => {
            return await response.resolve();
        })
    }

    async function openModal() {

        (await getLinkBrowserInfo().then(data => {
            const modal = Modal.advanced({
                type: Modal.types.iframe,
                content: data.url,
                size: Modal.sizes.large,
            })

            // listen for the link selection event (from FocuspointElement.svelte)
            window.parent.frames.list_frame.document.addEventListener(`${$wizardConfigStore.itemFormElName}-link-selected`, handleLinkSelection)

            // remove the event listener when the modal is closed
            modal.addEventListener('typo3-modal-hidden', function () {
                window.parent.frames.list_frame.document.removeEventListener(`${$wizardConfigStore.itemFormElName}-link-selected`, handleLinkSelection)
            });
        }))
    }
</script>

<div class="form-group">
    <label class="form-label" for="input-{index}-{name}">
        {config.title}
    </label>
    <div>
        <form name="form-{index}-{name}">
            <input bind:value={$focuspoints[index][name]} type="text" class="form-control" data-formengine-input-name="input-{index}-{name}" id="input-{index}-{name}" />
        </form>
        <button class="btn btn-default" on:click={openModal}>
            Öffnen
        </button>
    </div>
</div>
