<script>
    import {
        focuspoints,
        createNewFocuspoint,
        wizardConfigStore,
        getIcon,
        iconStore,
        activateFocuspoint,
        focusPointName, fieldMeetsCondition
    } from '../store.svelte'
    import {onMount} from "svelte";
    import Select from "./Fields/Select.svelte";
    import Text from "./Fields/Text.svelte";
    import Textarea from "./Fields/Textarea.svelte";
    import Link from "./Fields/Link.svelte";
    import Checkbox from "./Fields/Checkbox.svelte";

    onMount(() => {
        getIcon('actions-chevron-up')
        getIcon('actions-delete')
        getIcon('actions-add')
    })

    let focuspointName = $derived((focuspoint, index) => focusPointName(index))

    function deleteFocuspoint(index) {
        $focuspoints = $focuspoints.filter((focuspoint, i) => i !== index)
    }

    const components = {
        text: Text,
        textarea: Textarea,
        select: Select,
        link: Link,
        checkbox: Checkbox
    };
</script>


<style>
    .modal-panel-sidebar {
        padding-top: 0;
        width: 100%;
        --typo3-state-primary-bg: #ff8700;
        --typo3-component-border-radius: 0;
        --panel-border-radius: 0;
    }

    .panel-group {
        margin-top: 0;
        margin-bottom: 0;
    }

    .v12 .panel-button {
        border: 0;
        color: #FFF;
        background: none;
        gap: 10px;
        align-items: center;
        justify-content: start !important;
        width: 100%;
    }

    .v12 .panel-button[aria-expanded="true"] {
        border-left: 2px solid #ff8700;
    }

    .v12 .caret {
        border-top-color: #FFF;
    }

</style>

<div class="modal-panel-sidebar" class:v12={$wizardConfigStore && $wizardConfigStore.typo3Version < 13}>
    <div class="panel-group" role="tablist" aria-multiselectable="false">
    {#each $focuspoints as focuspoint, index}

            <div class="panel panel-default" data-crop-variant-container="default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title" id="cropper-accordion-heading-{index}">
                        <button
                                on:click={() => activateFocuspoint(index)}
                                data-bs-toggle="collapse"
                                aria-expanded={focuspoint.active}
                                aria-controls="cropper-collapse-1"
                                class:collapsed={!focuspoint.active}
                                class="panel-button"
                                data-crop-variant-id="default"
                                data-crop-variant="">
                            <span class="caret"></span>
                            <span class="panel-title">
                                {focuspointName(focuspoint, index)}
                            </span>
                        </button>
                    </h4>
                </div>
                <div
                        id="cropper-collapse-{index}"
                        class="panel-collapse"
                        class:collapse={!focuspoint.active}
                        class:show={focuspoint.active}
                        role="tabpanel"
                        aria-labelledby="cropper-accordion-heading-{index}">
                    <div class="panel-body">
                        {#each Object.entries($wizardConfigStore.fields) as [key, field]}
                            {#if fieldMeetsCondition(key, focuspoint)}
                                <svelte:component this={components[field.type]} index={index} name={key} config={field ?? {}} />
                            {/if}
                        {/each}

                        <button
                                class="btn btn-danger" name="reset" title="Reset" on:click|preventDefault={() => deleteFocuspoint(index)}>
                            {@html $iconStore['actions-delete']}
                            {window.parent.frames.list_frame.TYPO3.lang['wizard.single_point.button.delete']}
                        </button>
                    </div>
                </div>
            </div>


    {/each}
    </div>

    <div class="pt-3">
        <button class="btn btn-success w-100 " on:click|preventDefault={createNewFocuspoint}>
            {@html $iconStore['actions-add']}
            {window.parent.frames.list_frame.TYPO3.lang['wizard.single_point.button.addnew']}
        </button>
    </div>

</div>
