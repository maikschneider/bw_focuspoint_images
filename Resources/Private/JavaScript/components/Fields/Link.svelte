<script>
    import {focuspoints, getIcon, wizardConfigStore, iconStore, focuspointChannelName} from '../../store.svelte.js'
    import AjaxRequest from "@typo3/core/ajax/ajax-request.js";
    import Modal from "@typo3/backend/modal.js";
    import {onMount} from "svelte";

    let {config, index, name} = $props()
    let linkBrowserData = $state(null)
    let readOnly = $state(true)
    let previewText = $derived(linkBrowserData?.preview?.text ?? '')
    let previewIcon = $derived(linkBrowserData?.preview?.icon ?? '')
    let previewAdditionalAttributes = $derived(linkBrowserData?.preview?.additionalAttributes ?? '')

    onMount(() => {
        updateLinkBrowserInfo()
        getIcon('actions-close')
        getIcon('actions-wizard-link')
        getIcon('actions-version-workspaces-preview-link')
    })

    const handleLinkSelection = (event) => {
        $focuspoints[index][name] = event.detail.link
        updateLinkBrowserInfo()
    }

    async function updateLinkBrowserInfo() {
        let url = TYPO3.settings.ajaxUrls['wizard_focuspoint_linkbrowserurl'];
        url += `&inputName=${encodeURIComponent($wizardConfigStore.itemFormElName + '-hidden-link-field')}`;
        url += '&inputValue=' + encodeURIComponent($focuspoints[index][name] || '');
        url += '&config=' + encodeURIComponent(JSON.stringify(config || {}));
        url += '&pid=' + encodeURIComponent($wizardConfigStore.pid);

        return (new AjaxRequest(url)).get().then(async (response) => {
            linkBrowserData = await response.resolve();
        })
    }

    function openModal() {
        const modal = Modal.advanced({
            type: Modal.types.iframe,
            content: linkBrowserData.url,
            size: Modal.sizes.large,
        })

        // v14+: adapter fires 'typo3:form-engine:link-browser:set-link' on window.frameElement,
        // which bubbles (composed: true) up to the modal element.
        modal.addEventListener('typo3:form-engine:link-browser:set-link', (e) => {
            handleLinkSelection({detail: {link: e.value}})
            modal.hideModal()
        })

        // v13 fallback: adapter writes to the hidden input in FocuspointElement which relays
        // the value via BroadcastChannel. Mutually exclusive with the v14 path above.
        const linkChannel = new BroadcastChannel(focuspointChannelName($wizardConfigStore.itemFormElName))
        linkChannel.onmessage = (e) => {
            if (e.data.type === 'link-selected') {
                handleLinkSelection({detail: {link: e.data.link}})
                linkChannel.close()
            }
        }

        modal.addEventListener('typo3-modal-hidden', () => {
            linkChannel.close()
        })
    }

    function onInputClear(index) {
        $focuspoints[index][name] = ''
        linkBrowserData.preview = null
    }
</script>

<div class="form-group">
    <label class="form-label" for="input-{index}-{name}">
        {config.title}
    </label>
    <div class="form-wizards-wrap">
        <div class="form-wizards-element">
            <div class="input-group t3js-form-field-link">
                <span class="t3js-form-field-link-icon input-group-text">{@html previewIcon}</span>
                <input class="form-control" title="" value="" readonly="" hidden="">
                <div class="form-control-clearable-wrapper">
                    <input
                        type="text"
                        id="input-{index}-{name}"
                        class="form-control form-control-clearable"
                        readonly
                        value={previewText}
                        class:hidden={!readOnly} />
                    <input
                        bind:value={$focuspoints[index][name]}
                        class:hidden={readOnly}
                        type="text"
                        class="form-control form-control-clearable"
                        id="input-{index}-{name}" />
                    <button
                        onclick={(e) => {e.preventDefault(); onInputClear(index); }}
                        class:hidden={!$focuspoints[index][name] || $focuspoints[index][name] === ''}
                        type="button"
                        tabindex="-1"
                        title="Clear input"
                        aria-label="Clear input"
                        class="close text-black">
                        {@html $iconStore['actions-close']}
                    </button>
                </div>
                <button class="btn btn-default" onclick={(e) => {e.preventDefault(); readOnly = !readOnly}}>
                    {@html $iconStore['actions-version-workspaces-preview-link']}
                </button>
            </div>
        </div>
        <div class="form-wizards-item-aside formwizards-item-aside--field-control">
            <div class="btn-group">
                <button
                    onclick={(e) => {e.preventDefault(); openModal(); }} aria-label="Open link wizard" class="btn btn-default">
                    {@html $iconStore['actions-wizard-link']}
                </button>
            </div>
        </div>
    </div>
    {#if previewAdditionalAttributes}
        <div class="form-wizards-item-bottom">
            <div class="callout callout-info mt-3 mb-0">
                <div class="callout-content">
                    <div class="callout-body">
                        {@html previewAdditionalAttributes}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
