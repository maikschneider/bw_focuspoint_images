<script lang="ts">
    import {
        focuspoints,
        createNewFocuspoint,
        wizardConfigStore,
        focusPointName, fieldMeetsCondition,
        activateFocuspoint,
        SHAPES, type Focuspoint,
    } from '../store.svelte'
    import type {ShapeType} from "../store.svelte";
    import Select from "./Fields/Select.svelte";
    import Text from "./Fields/Text.svelte";
    import Textarea from "./Fields/Textarea.svelte";
    import Link from "./Fields/Link.svelte";
    import Checkbox from "./Fields/Checkbox.svelte";
    import Icon from './Icon.svelte';

    let focuspointName = $derived((focuspoint: Focuspoint, index: number) => focusPointName(index))

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

    function getFieldComponent(type ?: string) {
        if (!type) return null;
        return components[type as keyof typeof components] ?? null;
    }

    function toShapeType(key: string) {
        return key as ShapeType;
    }
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
            <div class="panel panel-default" data-crop-variant-container="default">
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
                            {#if fieldMeetsCondition(key, focuspoint) && field.type && field.type in components}
                                {@const FieldComponent = getFieldComponent(field.type)}
                                {#if FieldComponent}
                                    <FieldComponent index={index} name={key} config={field ?? {}} />
                                {/if}
                            {/if}
                        {/each}

                        <button class="btn btn-danger" name="reset" title="Reset" onclick={(e) => {
                                e.preventDefault()
                                deleteFocuspoint(index)
                            }}>
                            <Icon name="actions-delete" />
                            {$wizardConfigStore?.lang['wizard.single_point.button.delete']}
                        </button>
                    </div>
                </div>
            </div>
        {/each}
    </div>

    {#each Object.entries(SHAPES) as [key]}
        <button class="btn btn-success w-100 mt-3" onclick={(e) => {
            e.preventDefault()
            createNewFocuspoint(toShapeType(key))
        }}>
            <Icon name="actions-add" />
            {$wizardConfigStore?.lang[`wizard.single_point.button.new.${key}`]}
        </button>
    {/each}
</div>
