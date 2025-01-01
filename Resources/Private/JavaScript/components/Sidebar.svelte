<script>
    import {focuspoints, createNewFocuspoint, wizardConfigStore, getIcon, iconStore, activateFocuspoint} from '../store.svelte'
    import {onMount} from "svelte";
    import Select from "./Fields/Select.svelte";
    import Text from "./Fields/Text.svelte";
    import Textarea from "./Fields/Textarea.svelte";
    import Link from "./Fields/Link.svelte";

    onMount(() => {
        getIcon('actions-chevron-up')
        getIcon('actions-delete')
        getIcon('actions-add')
    })

    function deleteFocuspoint(index) {
        $focuspoints = $focuspoints.filter((focuspoint, i) => i !== index)
    }

    const components = {
        text: Text,
        textarea: Textarea,
        select: Select,
        link: Link,
    };
</script>


<style>
    .modal-panel-sidebar {
        padding-top: 0;
    }

    .panel-group {
        margin-top: 0;
        margin-bottom: 0;
    }
</style>

<div class="modal-panel-sidebar">

    {#each $focuspoints as focuspoint, index}

        <div class="panel-group" role="tablist" aria-multiselectable="false">

            <div class="panel panel-default" data-crop-variant-container="default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title" id="cropper-accordion-heading-{index}">
                        <a
                                role="button"
                                on:click={() => activateFocuspoint(index)}
                                data-bs-toggle="collapse"
                                href="#cropper-collapse-{index}"
                                aria-expanded={focuspoint.active}
                                aria-controls="cropper-collapse-1"
                                class:collapsed={!focuspoint.active}
                                data-crop-variant-id="default"
                                data-crop-variant="">
                            <span>
                                {@html $iconStore['actions-chevron-up']}
                                Focuspoint {index + 1}
                            </span>
                        </a>
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
                            <svelte:component this={components[field.type]} index={index} name={key} config={field ?? {}} />
                        {/each}

                        <button
                                class="btn btn-danger" name="reset" title="Reset" on:click|preventDefault={() => deleteFocuspoint(index)}>
                            {@html $iconStore['actions-delete']}
                            Delete
                        </button>
                    </div>
                </div>
            </div>

        </div>
    {/each}

    <div class="pt-3">
        <button class="btn btn-success w-100 " on:click|preventDefault={createNewFocuspoint}>
            {@html $iconStore['actions-add']}
            Add focuspoint
        </button>
    </div>

</div>
