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
        url += `&inputName=${$wizardConfigStore.itemFormElName}-hidden-link-field`;
        url += '&inputValue=' + $focuspoints[index][name] || '';
        url += '&config=' + JSON.stringify(config ||'{}');

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

        // Receive link-selected from FocuspointElement via BroadcastChannel (frame-agnostic)
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

    function onInputClear() {
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
                            on:click|preventDefault={onInputClear}
                            class:hidden={$focuspoints[index][name] === ''}
                            type="button"
                            tabindex="-1"
                            title="Clear input"
                            aria-label="Clear input"
                            class="close text-black">
                        {@html $iconStore['actions-close']}
                    </button>
                </div>
                <button class="btn btn-default" on:click|preventDefault={() => readOnly = !readOnly}>
                    {@html $iconStore['actions-version-workspaces-preview-link']}
                </button>
            </div>
        </div>
        <div class="form-wizards-item-aside formwizards-item-aside--field-control">
            <div class="btn-group">
                <button
                        on:click|preventDefault={openModal} aria-label="Open link wizard" class="btn btn-default">
                    {@html $iconStore['actions-wizard-link']}
                </button>
            </div>
        </div>
    </div>
</div>
