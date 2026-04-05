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
    import Rte from "./Fields/Rte.svelte";

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
        checkbox: Checkbox,
        rte: Rte
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

    :global(.callout) {
        --typo3-component-border-radius: 4px;
    }

</style>

<div class="modal-panel-sidebar">
    <div class="panel-group" role="tablist" aria-multiselectable="false">
        {#each $focuspoints as focuspoint, index}

            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title" id="cropper-accordion-heading-{index}">
                        <button
                            onclick={(e) => {
                                e.preventDefault()
                                activateFocuspoint(index)
                            }}
                            data-bs-toggle="collapse"
                            data-bs-target="#cropper-collapse-{index}"
                            aria-expanded={focuspoint.active}
                            aria-controls="cropper-collapse-{index}"
                            class:collapsed={!focuspoint.active}
                            class:show={focuspoint.active}
                            class="panel-button">
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
                    class:show={focuspoint.active}
                    class:collapse={!focuspoint.active}
                    role="tabpanel"
                    aria-labelledby="cropper-accordion-heading-{index}">
                    <div class="panel-body">
                        {#each Object.entries($wizardConfigStore.fields) as [key, field]}
                            {#if fieldMeetsCondition(key, focuspoint)}
                                <svelte:component this={components[field.type]} index={index} name={key} config={field ?? {}} />
                            {/if}
                        {/each}

                        <button
                            class="btn btn-danger" name="reset" title="Reset" onclick={(e) => {
                                e.preventDefault()
                                deleteFocuspoint(index)
                            }}>
                            {@html $iconStore['actions-delete']}
                            {$wizardConfigStore?.lang['wizard.single_point.button.delete']}
                        </button>
                    </div>
                </div>
            </div>


        {/each}
    </div>

    <div class="pt-3">
        <button
            class="btn btn-success w-100 " onclick={(e) => {
            e.preventDefault()
            createNewFocuspoint()
        }}>
            {@html $iconStore['actions-add']}
            {$wizardConfigStore?.lang['wizard.single_point.button.addnew']}
        </button>
    </div>

</div>
