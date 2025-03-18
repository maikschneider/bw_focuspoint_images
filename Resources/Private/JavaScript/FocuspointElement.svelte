<svelte:options customElement={{tag: 'focuspoint-element', shadow: 'none'}} />

<script>
    import {onMount} from "svelte"
    import Modal from '@typo3/backend/modal.js'
    import Icons from '@typo3/backend/icons.js'
    import {html} from "lit"

    let {itemFormElName, itemFormElValue, wizardConfig, image} = $props()
    let icon = $state('')

    onMount(() => {
        Icons.getIcon('content-target', Icons.sizes.small).then((html) => {
            icon = html
        })
    })

    function onButtonClick(e) {
        e.preventDefault()

        Modal.advanced({
            additionalCssClasses: ['modal-image-manipulation', 'cropper'],
            buttons: [
                {
                    btnClass: 'btn-default',
                    name: 'dismiss',
                    icon: 'actions-close',
                    text: 'buttonDismissText',
                    trigger: () => window.parent.TYPO3.Modal.dismiss(),
                },
                {
                    btnClass: 'btn-primary',
                    name: 'save',
                    icon: 'actions-document-save',
                    text: 'buttonSaveText',
                    trigger: onModalSave,
                },
            ],
            content: html`
                <focuspoint-wizard
                        style="height: 100%; width: 100%;"
                        image="${image}"
                        itemFormElName="${itemFormElName}"
                        itemFormElValue="${itemFormElValue}"
                        wizardConfig="${wizardConfig}"></focuspoint-wizard>    `,
            size: Modal.sizes.full,
            style: Modal.styles.dark,
            title: 'modalTitle',
            staticBackdrop: true
        })
    }

    function onModalSave() {
        window.document.dispatchEvent(new CustomEvent(`${itemFormElName}-save`, {}))
        window.parent.TYPO3.Modal.dismiss();
    }

    function onLinkSelection(e) {
        window.document.dispatchEvent(new CustomEvent(`${itemFormElName}-link-selected`, {
            detail: {link: e.currentTarget.value}
        }))
    }
</script>

<div>
    <input type="hidden" name={itemFormElName} value={itemFormElValue} />
    <button onclick={(e) => onButtonClick(e)} class="btn btn-default">
        {@html icon}
        {TYPO3.lang['wizard.button']}
    </button>

    <form name="editform">
        <input
                type="hidden" onchange={onLinkSelection} data-formengine-input-name="focuspoint-hidden-link-field" />
    </form>
</div>
