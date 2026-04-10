<script lang="ts">
    import {
        focuspoints,
        createNewFocuspoint,
        wizardConfigStore,
        focusPointName, fieldMeetsCondition,
        activateFocuspoint,
        SHAPES, type Focuspoint,
        detectionMode, detectionColorTolerance, deactivateAllFocuspoints
    } from '../store.svelte'
    import type {ShapeType} from "../store.svelte";
    import Select from "./Fields/Select.svelte";
    import Text from "./Fields/Text.svelte";
    import Textarea from "./Fields/Textarea.svelte";
    import Link from "./Fields/Link.svelte";
    import Checkbox from "./Fields/Checkbox.svelte";
    import Color from "./Fields/Color.svelte";
    import Icon from './Icon.svelte';
    import {fade} from "svelte/transition";
    import Number from "./Fields/Number.svelte";

    let focuspointName = $derived((focuspoint: Focuspoint, index: number) => focusPointName(index))
    let panelGroup: HTMLDivElement
    const showDetectionIcon = $derived(($wizardConfigStore?.typo3Version ?? 0) > 13);
    function deleteFocuspoint(index: number) {
        $focuspoints = $focuspoints.filter((focuspoint, i) => i !== index)
    }

    const components = {
        text: Text,
        textarea: Textarea,
        select: Select,
        link: Link,
        checkbox: Checkbox,
        color: Color,
        number: Number
    };

    function getFieldComponent(type ?: string) {
        if (!type) return null;
        return components[type as keyof typeof components] ?? null;
    }

    function toShapeType(key: string) {
        return key as ShapeType;
    }

    const toggleDetectionMode = () => {
        detectionMode.update((value) => !value);
        if ($detectionMode) {
            deactivateAllFocuspoints();
        }
    }

    const detectionButtonClass = $derived($detectionMode ? 'btn-warning' : 'btn-success');
    const detectionButtonIcon = $derived($detectionMode ? 'actions-ban' : 'actions-wand-sparkles');
    const detectionButtonText = $derived(
        $detectionMode
            ? $wizardConfigStore?.lang['wizard.single_point.button.detection_mode.stop']
            : $wizardConfigStore?.lang['wizard.single_point.button.detection_mode.start']
    )

    $effect(() => {
        if (panelGroup) {
            const handler = (event: Event) => {
                const button = (event.target as Element).closest('.panel-button');
                if (button) {
                    const panel = button.closest('.panel');
                    if (panel) {
                        setTimeout(() => {
                            panel.scrollIntoView({behavior: 'smooth', block: 'end'})
                        }, 100)
                    }
                }
            }

            panelGroup.addEventListener('click', handler);
            return () => panelGroup.removeEventListener('click', handler);
        }
    })

    $effect(() => {
        if ($focuspoints.length > 0 && panelGroup) {
            const lasPanel = panelGroup.querySelector('[data-crop-variant-container]:last-of-type');
            if (lasPanel) {
                setTimeout(() => {
                    lasPanel.scrollIntoView({behavior: 'smooth', block: 'end'});
                }, 100)
            }
        }
    })
</script>


<style>
    .modal-panel-sidebar {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding-top: 0;
        min-height: 0;
        overflow: hidden;
        --typo3-state-primary-bg: #ff8700;
        --typo3-component-border-radius: 0;
        --panel-border-radius: 0;
    }

    .panel-group {
        margin-top: 0;
        margin-bottom: 0;
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        min-height: 0;
    }

    .button-group {
        flex-shrink: 0;
        margin-top: auto;
        padding: 12px;
        border-top: 1px solid var(--typo3-state-primary-bg, #ff8700);
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;
    }

    .button-group button:not(.rest-color-tolerance) {
        flex: 1 1 auto;
        min-width: 120px;
    }

    .detection-settings-panel {
        flex-basis: 100%;

        .form-label {
            display: inline;
            margin-bottom: 0;
        }
    }

    .rest-color-tolerance {
        min-width: fit-content;
    }

    :global(.callout) {
        --typo3-component-border-radius: 4px;
    }
</style>

<div class="modal-panel-sidebar">
    <div class="panel-group" role="tablist" aria-multiselectable="false" bind:this={panelGroup}>
        {#each $focuspoints as focuspoint, index}
            <div class="panel panel-default" data-crop-variant-container="default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title" id="cropper-accordion-heading-{index}">
                        <button
                            disabled={$detectionMode}
                            onclick={(e) => {
                                e.preventDefault()
                                if ($detectionMode) return
                                activateFocuspoint(index)
                            }}
                            data-bs-toggle="collapse"
                            data-bs-target="#cropper-collapse-{index}"
                            aria-expanded={focuspoint.active}
                            aria-controls="cropper-collapse-{index}"
                            class:collapsed={!focuspoint.active}
                            class:show={focuspoint.active}
                            class:disabled={$detectionMode}
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
                                    <FieldComponent index={index} name={key} config={field ?? {}}/>
                                {/if}
                            {/if}
                        {/each}

                        <button class="btn btn-danger" name="reset" title="Reset" onclick={(e) => {
                                e.preventDefault()
                                deleteFocuspoint(index)
                            }}>
                            <Icon name="actions-delete"/>
                            {$wizardConfigStore?.lang['wizard.single_point.button.delete']}
                        </button>
                    </div>
                </div>
            </div>
        {/each}
    </div>

    <div class="button-group">
        {#if $detectionMode}
            <div class="detection-settings-panel"
                 in:fade={{duration: 200, delay: 200}}
                 out:fade={{duration: 200}}
            >
                <div class="d-flex justify-content-between">
                    <span>
                        <label for="color-tolerance" class="form-label">
                            {$wizardConfigStore?.lang['wizard.detection_mode.color_tolerance'] ?? 'Color Tolerance'}:
                        </label>
                        <span class="tolerance-display">{$detectionColorTolerance}</span>
                    </span>
                    <button class="btn btn-link rest-color-tolerance text-decoration-none"
                            tabindex="0"
                            aria-label="Reset color tolerance"
                          onclick={(e) => {
                              e.preventDefault();
                              detectionColorTolerance.set(32);
                          }}
                    >
                        <small>{$wizardConfigStore?.lang['wizard.detection_mode.color_tolerance.reset'] ?? 'Reset'}</small>
                    </button>
                </div>



                <input
                    id="color-tolerance"
                    class="form-range"
                    type="range"
                    min="5"
                    max="80"
                    step="1"
                    bind:value={$detectionColorTolerance}
                />
            </div>
        {:else}
            {#each Object.entries(SHAPES) as [key]}
                <button class="btn btn-success mt-3"
                        in:fade={{duration: 200, delay: 400}}
                        out:fade={{duration: 200}}
                        class:disabled={$detectionMode}
                        onclick={(e) => {
                        e.preventDefault()
                        createNewFocuspoint(toShapeType(key))
            }}>
                    <Icon name="actions-add"/>
                    {$wizardConfigStore?.lang[`wizard.single_point.button.new.${key}`]}
                </button>
            {/each}
        {/if}
        <button
            class="btn mt-3 {detectionButtonClass}"
            onclick={(e) => {
                e.preventDefault();
                toggleDetectionMode();
        }}>
            {#if showDetectionIcon}
                <Icon name={detectionButtonIcon}/>
            {/if}
            {detectionButtonText}
        </button>
    </div>
</div>
