<svelte:options customElement={{tag: 'focuspoint-wizard', shadow: 'none'}} />

<style>
    .wizard {
        display: grid;
        grid-template-columns: auto 300px;
    }
</style>

<script>
    import {onDestroy, onMount} from "svelte";
    import Image from './components/Image.svelte';
    import Sidebar from "./components/Sidebar.svelte";
    import {initStores} from './store.svelte';
    import {focuspoints} from './store.svelte';

    let {itemFormElName, itemFormElValue, wizardConfig, image} = $props()

    onMount(() => {
        initStores(itemFormElValue, wizardConfig)
        window.parent.frames.list_frame.document.addEventListener(`${itemFormElName}-save`, handleSave)
    });

    onDestroy(() => {
        window.parent.frames.list_frame.document.removeEventListener(`${itemFormElName}-save`, handleSave)
    });

    const handleSave = () => {
        const hiddenInput = window.parent.frames.list_frame.document.querySelector(`[name="${itemFormElName}"]`)
        hiddenInput.value = JSON.stringify($focuspoints)
    }


</script>

<div class="wizard">
    <Image image={image} />
    <Sidebar />
</div>

