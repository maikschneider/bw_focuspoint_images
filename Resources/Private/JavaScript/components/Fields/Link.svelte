<script lang="ts">
    import {onMount} from "svelte";
    import {focuspoints, wizardConfigStore} from '../../store.svelte.js';
    import AjaxRequest from "@typo3/core/ajax/ajax-request.js";
    import Modal from "@typo3/backend/modal.js";
    import Icon from '../Icon.svelte';

    type LinkBrowserData = {
        url: string;
        preview: {
            text?: string;
            icon?: string;
        } | null;
    };

    let {config, index, name} = $props()
    let linkBrowserData: LinkBrowserData | null = $state(null)
    let readOnly = $state(true)
    // @ts-ignore
    let previewText = $derived(linkBrowserData?.preview?.text ?? '')
    // @ts-ignore
    let previewIcon = $derived(linkBrowserData?.preview?.icon ?? '')

    onMount(() => updateLinkBrowserInfo());

    const handleLinkSelection = (event: FocuspointLinkSelectedEvent) => {
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
            content: linkBrowserData!.url,
            size: Modal.sizes.large,
        })

        // listen for the link selection event (from FocuspointElement.svelte)
        window.parent.frames.list_frame.document.addEventListener(`${$wizardConfigStore.itemFormElName}-link-selected`, handleLinkSelection)

        // remove the event listener when the modal is closed
        modal.addEventListener('typo3-modal-hidden', function () {
            window.parent.frames.list_frame.document.removeEventListener(`${$wizardConfigStore.itemFormElName}-link-selected`, handleLinkSelection)
        });
    }

    function onInputClear() {
        $focuspoints[index][name] = ''
        linkBrowserData!.preview = null
    }
</script>

<style>
    .v12 .form-wizards-wrap {
        display: flex;
        gap: 5px;
    }

    .v12 .form-wizards-element {
        width: 100%;
    }

    .v12 .input-group-text {
        min-width: 42px;
    }

    .v12 .btn-default {
        height: 32px;
    }

    .v12 .form-control {
        border-radius: 0;
    }
</style>

<div class="form-group" class:v12={$wizardConfigStore && $wizardConfigStore.typo3Version! < 13}>
    <label class="form-label" for="input-{index}-{name}">
        {config.title}
    </label>
    <div class="form-wizards-wrap">
        <div class="form-wizards-element">
            <div class="input-group t3js-form-field-link">
                <span class="t3js-form-field-link-icon input-group-text">{@html previewIcon}</span>
                <input class="form-control" title="" value="" readonly hidden="">
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
                        <Icon name="actions-close" />
                    </button>
                </div>
                <button class="btn btn-default" on:click|preventDefault={() => readOnly = !readOnly}>
                    <Icon name="actions-version-workspaces-preview-link" />
                </button>
            </div>
        </div>
        <div class="form-wizards-item-aside formwizards-item-aside--field-control">
            <div class="btn-group">
                <button
                        on:click|preventDefault={openModal} aria-label="Open link wizard" class="btn btn-default">
                    <Icon name="actions-wizard-link" />
                </button>
            </div>
        </div>
    </div>
</div>
