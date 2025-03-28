<svelte:options customElement={{tag: 'focuspoint-wizard', shadow: 'none'}} />

<style>
    .wizard {
        display: grid;
        max-height: 100%;
        grid-template-columns: auto 300px;
        grid-template-rows: 100%;
    }
</style>

<script>
    import {onDestroy, onMount} from "svelte";
    import Image from './components/Image.svelte';
    import Sidebar from "./components/Sidebar.svelte";
    import {initStores} from './store.svelte';
    import {focuspoints} from './store.svelte';
    import Settings from "./components/Settings.svelte";

    let {itemFormElName, wizardConfig, image} = $props()
    let isSettingsOpen = $state(false)

    const hiddenInput = window.parent.frames.list_frame.document.querySelector(`[name="${itemFormElName}"]`)

    onMount(() => {
        initStores(hiddenInput, wizardConfig)
        window.parent.frames.list_frame.document.addEventListener(`${itemFormElName}-save`, handleSave)
        window.parent.frames.list_frame.document.addEventListener(`${itemFormElName}-settings`, handleSettings)
    });

    onDestroy(() => {
        window.parent.frames.list_frame.document.removeEventListener(`${itemFormElName}-save`, handleSave)
        window.parent.frames.list_frame.document.removeEventListener(`${itemFormElName}-settings`, handleSettings)
        $focuspoints = []
    });

    const handleSave = () => {
        const hiddenInput = window.parent.frames.list_frame.document.querySelector(`[name="${itemFormElName}"]`)
        hiddenInput.value = JSON.stringify($focuspoints)
    }

    const handleSettings = () => {
        isSettingsOpen = !isSettingsOpen
    }

</script>

<div class="wizard">
    {#if isSettingsOpen}
        <Settings />
        <div></div>
    {:else}
        <Image image={image} />
        <Sidebar />
    {/if}
</div>
