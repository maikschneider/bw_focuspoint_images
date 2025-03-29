<script>
    import {focuspoints, getIcon, iconStore} from '../store.svelte';
    import Notification from "@typo3/backend/notification.js";
    import {onMount} from "svelte";

    let {itemFormElName} = $props()
    let focuspointArea;
    let jsonPoints = $state(JSON.stringify($focuspoints));
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

    onMount(() => {
        getIcon('actions-clipboard')
        getIcon('actions-clipboard-paste')
        getIcon('actions-check')
        getIcon('actions-undo')
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
</style>

<div class="d-flex justify-content-center align-items-center wrapper">

    <fieldset class="form-section">
        <h3 class="form-section-headline">{window.parent.frames.list_frame.TYPO3.lang['wizard.button.settings']}</h3>
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
                            {@html $iconStore['actions-clipboard']} {window.parent.frames.list_frame.TYPO3.lang['wizard.button.copy']}
                        </button>
                        <button class="btn btn-default" onclick={onPasteButtonClick}>
                            {@html $iconStore['actions-clipboard-paste']} {window.parent.frames.list_frame.TYPO3.lang['wizard.button.paste']}
                        </button>
                    </div>
                    <div>
                        <button disabled={!hasChange} class="btn btn-default" onclick={onUndoButtonClick}>
                            {@html $iconStore['actions-undo']} {window.parent.frames.list_frame.TYPO3.lang['wizard.button.undo']}
                        </button>
                        <button disabled={!hasChange || hasError} class="btn btn-primary" onclick={onSaveButtonClick}>
                            {@html $iconStore['actions-check']} {window.parent.frames.list_frame.TYPO3.lang['wizard.button.accept']}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </fieldset>
</div>
