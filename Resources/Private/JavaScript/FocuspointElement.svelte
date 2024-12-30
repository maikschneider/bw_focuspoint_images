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

    function openModal(e) {
        Modal.advanced({
            additionalCssClasses: ['modal-image-manipulation', 'cropper'],
            buttons: [
                {
                    btnClass: 'btn-default float-start',
                    name: 'preview',
                    icon: 'actions-view',
                    text: 'buttonPreviewText',
                },
                {
                    btnClass: 'btn-default',
                    name: 'dismiss',
                    icon: 'actions-close',
                    text: 'buttonDismissText',
                },
                {
                    btnClass: 'btn-primary',
                    name: 'save',
                    icon: 'actions-document-save',
                    text: 'buttonSaveText',
                },
            ],
            content: html`
                <div>
                    <focuspoint-wizard
                            image="${image}"
                            itemFormElName="${itemFormElName}"
                            itemFormElValue="${itemFormElValue}"
                            wizardConfig="${wizardConfig}"></focuspoint-wizard>
                </div>`,
            size: Modal.sizes.full,
            style: Modal.styles.dark,
            title: 'modalTitle',
            staticBackdrop: true
        })
    }
</script>

<div>
    <input type="hidden" name={itemFormElName} />
    <button on:click|preventDefault={() => openModal()} class="btn btn-default">
        {@html icon}
        {TYPO3.lang['wizard.button']}
    </button>
</div>
