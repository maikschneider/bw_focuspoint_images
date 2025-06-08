<script lang="ts">
    import {
        focuspoints,
        createNewFocuspoint,
        wizardConfigStore,
        setActiveIndex,
        focusPointName, fieldMeetsCondition,
        getActiveIndex,
        SHAPES,
    } from '../store.svelte'
    import type {ShapeType} from "../store.svelte";
    import Select from "./Fields/Select.svelte";
    import Text from "./Fields/Text.svelte";
    import Textarea from "./Fields/Textarea.svelte";
    import Link from "./Fields/Link.svelte";
    import Checkbox from "./Fields/Checkbox.svelte";
    import Icon from './Icon.svelte';

    function deleteFocuspoint(index: number) {
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

<div class="modal-panel-sidebar" class:v12={$wizardConfigStore && $wizardConfigStore.typo3Version! < 13}>
    <div class="panel-group" role="tablist" aria-multiselectable="false">
        {#each $focuspoints as focuspoint, index}
            <div class="panel panel-default" data-crop-variant-container="default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title" id="cropper-accordion-heading-{index}">
                        <button
                            on:click={() => setActiveIndex(index)}
                            data-bs-toggle="collapse"
                            aria-expanded={index === getActiveIndex()}
                            aria-controls="cropper-collapse-1"
                            class:collapsed={index !== getActiveIndex()}
                            class="panel-button"
                            data-crop-variant-id="default"
                            data-crop-variant="">
                            <span class="caret"></span>
                            <span class="panel-title">
                                {focusPointName(index)}
                            </span>
                        </button>
                    </h4>
                </div>
                <div
                    id="cropper-collapse-{index}"
                    class="panel-collapse"
                    class:collapse={index !== getActiveIndex()}
                    class:show={index === getActiveIndex()}
                    role="tabpanel"
                    aria-labelledby="cropper-accordion-heading-{index}">
                    <div class="panel-body">
                        {#each Object.entries($wizardConfigStore.fields) as [key, field]}
                            {#if fieldMeetsCondition(key, focuspoint) && field.type && field.type in components}
                                <svelte:component this={components[field.type as keyof typeof components]} index={index} name={key} config={field ?? {}} />
                            {/if}
                        {/each}

                        <button class="btn btn-danger" name="reset" title="Reset" on:click|preventDefault={() => deleteFocuspoint(index)}>
                            <Icon name="actions-delete" />
                            {window.parent.frames.list_frame.TYPO3.lang['wizard.single_point.button.delete']}
                        </button>
                    </div>
                </div>
            </div>
        {/each}
    </div>

    {#each Object.entries(SHAPES) as [key]}
        <button class="btn btn-success w-100 mt-3" on:click|preventDefault={() => createNewFocuspoint(key as ShapeType)}>
            <Icon name="actions-add" />
            {window.parent.frames.list_frame.TYPO3.lang[`wizard.single_point.button.new.${key}`]}
        </button>
    {/each}
</div>
