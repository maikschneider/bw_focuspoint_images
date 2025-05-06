<svelte:options customElement={{tag: 'focuspoint-element', shadow: 'none'}} />

<script lang="ts">
    import {onDestroy, onMount} from "svelte"
    import Modal from '@typo3/backend/modal.js'
    import Icons from '@typo3/backend/icons.js'
    import {html} from "lit"
    import Preview from "./components/Preview.svelte";

    let {itemFormElName, itemFormElValue, wizardConfig, image} = $props()
    let icon = $state('')
    let previewPoints = $derived(itemFormElValue ? JSON.parse(itemFormElValue) : [])

    onMount(() => {
        Icons.getIcon('content-target', Icons.sizes.small).then((html) => {
            icon = html
        })
        window.document.addEventListener(`${itemFormElName}-wizard-update`, onWizardUpdate)
    })

    onDestroy(() => {
        window.document.removeEventListener(`${itemFormElName}-wizard-update`, onWizardUpdate)
    })

    function onButtonClick(e: MouseEvent & {currentTarget: EventTarget & HTMLButtonElement}) {
        e.preventDefault()

        const typo3Version = JSON.parse(wizardConfig).typo3Version

        Modal.advanced({
            additionalCssClasses: ['modal-image-manipulation', 'cropper'],
            buttons: [
                {
                    btnClass: 'btn-default btn--left',
                    name: 'settings',
                    icon: 'actions-cog',
                    text: TYPO3.lang['wizard.button.settings'],
                    trigger: onModalSettings,
                },
                {
                    btnClass: 'btn-default',
                    name: 'dismiss',
                    icon: 'actions-close',
                    text: TYPO3.lang['wizard.button.cancel'],
                    trigger: () => window.parent.TYPO3.Modal.dismiss(),
                },
                {
                    btnClass: 'btn-primary',
                    name: 'save',
                    icon: 'actions-document-save',
                    text: TYPO3.lang['wizard.button.save'],
                    trigger: onModalSave,
                },
            ],
            content: html`
                <focuspoint-wizard
                    style="height: 100%; width: 100%; display: grid;"
                    image="${image}"
                    itemFormElName="${itemFormElName}"
                    wizardConfig="${wizardConfig}"></focuspoint-wizard>`,
            size: Modal.sizes.full,
            title: TYPO3.lang['wizard.focuspoints.title'],
            style: typo3Version < 13 ? Modal.styles.dark : null,
            staticBackdrop: true
        })
    }

    function onModalSave() {
        window.document.dispatchEvent(new CustomEvent(`${itemFormElName}-modal-save`, {}))
        window.parent.TYPO3.Modal.dismiss();
    }

    function onModalSettings() {
        document.dispatchEvent(new CustomEvent(`${itemFormElName}-settings`, {}))
    }

    function onWizardUpdate(e: FocuspointWizardUpdateEvent) {
        itemFormElValue = JSON.stringify(e.detail.focuspoints)
    }

    function onLinkSelection(e: Event & {currentTarget: EventTarget & HTMLInputElement}) {
        window.document.dispatchEvent(new CustomEvent(`${itemFormElName}-link-selected`, {
            detail: {link: e.currentTarget.value}
        }))
    }
</script>

<div>
    <input type="hidden" name={itemFormElName} bind:value={itemFormElValue} />
    <Preview image={image} points={previewPoints} itemFormElName={itemFormElName} />
    <button onclick={(e) => onButtonClick(e)} class="btn btn-default">
        {@html icon}
        {TYPO3.lang['wizard.button']}
    </button>

    <form name="editform">
        <input type="hidden" onchange={onLinkSelection} data-formengine-input-name={`${itemFormElName}-hidden-link-field`} />
    </form>
</div>
