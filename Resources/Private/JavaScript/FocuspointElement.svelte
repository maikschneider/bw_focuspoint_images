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

    function onLinkSelection(e) {
        window.document.dispatchEvent(new CustomEvent(`${JSON.parse(itemFormElName)}-link-selected`, {
            detail: {link: e.currentTarget.value}
        }))
    }
</script>

<div>
    <input type="hidden" name={itemFormElName} />
    <button on:click|preventDefault={() => openModal()} class="btn btn-default">
        {@html icon}
        {TYPO3.lang['wizard.button']}
    </button>

    <form name="editform">
        <input
                type="hidden" on:change={onLinkSelection} data-formengine-input-name="focuspoint-hidden-link-field" />
    </form>
</div>
