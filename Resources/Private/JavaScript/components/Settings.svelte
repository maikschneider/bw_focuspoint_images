<script>
    import {focuspoints, wizardConfigStore} from '../store.svelte';
    import Notification from "@typo3/backend/notification.js";
    import Icon from "./Icon.svelte";

    let {itemFormElName, isSettingsOpenValue = $bindable()} = $props()
    let focuspointArea;
    let jsonPoints = $state(JSON.stringify($focuspoints, null, "\t"));
    let hasError = $state(false)
    let hasChange = $state(false)

    $effect(() => {
        try {
            JSON.parse(jsonPoints)
            hasError = false
        } catch (e) {
            hasError = true
        }

        hasChange = jsonPoints !== JSON.stringify($focuspoints)
    });

    function onCopyButtonClick() {
        navigator.clipboard.writeText(focuspointArea.value);
        Notification.success(
                window.parent.frames.list_frame.TYPO3.lang['wizard.settings.copied'],
                window.parent.frames.list_frame.TYPO3.lang['wizard.settings.copied.message'],
                3
        );
    }

    function onPasteButtonClick() {
        navigator.clipboard.readText().then(text => {
            jsonPoints = text
        });
    }

    function onUndoButtonClick() {
        jsonPoints = JSON.stringify($focuspoints);
    }

    function onSaveButtonClick() {
        try {
            $focuspoints = JSON.parse(jsonPoints);
            window.parent.frames.list_frame.document.dispatchEvent(new CustomEvent(`${itemFormElName}-settings`, {}))
        } catch (e) {
            Notification.error('Error', 'Invalid JSON', 5);
        }
    }
</script>

<style>
    .wrapper {
        grid-column: 1 / 4;
    }

    .btn-close {
        background: transparent;
        border: none;
        height: fit-content;
        padding-top: 0;
        color: var(--icon-color-primary, currentColor)
    }

    .v12 fieldset {
        color: #333;
    }
</style>

<div class="d-flex justify-content-center align-items-center wrapper" class:v12={$wizardConfigStore && $wizardConfigStore.typo3Version < 13}>

    <fieldset class="form-section">
        <div class="d-flex justify-content-between">
            <h3 class="form-section-headline">{window.parent.frames.list_frame.TYPO3.lang['wizard.button.settings']}</h3>
            <button onclick={() => isSettingsOpenValue = false} aria-label="Close settings" class="btn-close">
                <Icon name="actions-close" />
                <span class="visually-hidden">{window.parent.frames.list_frame.TYPO3.lang['wizard.button.cancel']}</span>
            </button>
        </div>
        <div class="row">
            <label class="form-label" class:has-error={hasError} class:has-change={hasChange} for="points">Import / Export</label>
            <div class="form-group">
                    <textarea
                            class="form-control t3js-formengine-textarea formengine-textarea mb-3"
                            bind:this={focuspointArea}
                            bind:value={jsonPoints}
                            class:has-error={hasError}
                            class:has-change={hasChange}
                            id="points"
                            rows="10"
                            cols="50"></textarea>
                <div class="d-flex justify-content-between">
                    <div>
                        <button class="btn btn-default" onclick={onCopyButtonClick}>
                            <Icon name="actions-clipboard" /> {window.parent.frames.list_frame.TYPO3.lang['wizard.button.copy']}
                        </button>
                        <button class="btn btn-default" onclick={onPasteButtonClick}>
                            <Icon name="actions-clipboard-paste" /> {window.parent.frames.list_frame.TYPO3.lang['wizard.button.paste']}
                        </button>
                    </div>
                    <div>
                        <button disabled={!hasChange} class="btn btn-default" onclick={onUndoButtonClick}>
                            <Icon name="actions-undo" /> {window.parent.frames.list_frame.TYPO3.lang['wizard.button.undo']}
                        </button>
                        <button disabled={!hasChange || hasError} class="btn btn-primary" onclick={onSaveButtonClick}>
                            <Icon name="actions-check" /> {window.parent.frames.list_frame.TYPO3.lang['wizard.button.accept']}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </fieldset>
</div>
