<script>
    import {focuspoints, createNewFocuspoint, wizardConfigStore} from '../store.svelte'
    import {onMount} from "svelte";
    import Icons from '@typo3/backend/icons.js'
    import Select from "./Fields/Select.svelte";
    import Text from "./Fields/Text.svelte";
    import Textarea from "./Fields/Textarea.svelte";
    import Link from "./Fields/Link.svelte";

    let chevronIcon = $state('')
    let deleteIcon = $state('')
    let addIcon = $state('')

    onMount(() => {
        Icons.getIcon('actions-chevron-up', Icons.sizes.small).then((html) => {
            chevronIcon = html
        })
        Icons.getIcon('actions-delete', Icons.sizes.small).then((html) => {
            deleteIcon = html
        })
        Icons.getIcon('actions-add', Icons.sizes.small).then((html) => {
            addIcon = html
        })
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
                                data-bs-toggle="collapse"
                                href="#cropper-collapse-{index}"
                                aria-expanded="false"
                                aria-controls="cropper-collapse-1"
                                class="t3js-crop-variant-trigger collapsed"
                                data-crop-variant-id="default"
                                data-crop-variant="">
                            <span>
                                {@html chevronIcon}
                                Focuspoint {index + 1}
                            </span>
                        </a>
                    </h4>
                </div>
                <div
                        id="cropper-collapse-{index}"
                        class="panel-collapse collapse"
                        role="tabpanel"
                        aria-labelledby="cropper-accordion-heading-{index}">
                    <div class="panel-body">
                        {#each Object.entries($wizardConfigStore.fields) as [key, field]}
                            <svelte:component this={components[field.type]} index={index} name={key} config={field ?? {}} />
                        {/each}

                        <button
                                class="btn btn-danger" name="reset" title="Reset" on:click|preventDefault={() => deleteFocuspoint(index)}>
                            {@html deleteIcon}
                            Delete
                        </button>
                    </div>
                </div>
            </div>

        </div>
    {/each}

    <div class="pt-3">
        <button class="btn btn-success w-100 " on:click|preventDefault={createNewFocuspoint}>
            {@html addIcon}
            Add focuspoint
        </button>
    </div>

</div>
