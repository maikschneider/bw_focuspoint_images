<svelte:options customElement={{tag: 'focuspoint-wizard', shadow: 'none'}} />

<style>
    .wizard {
        display: grid;
        grid-template-columns: auto 300px;
    }
</style>

<script>
    import {onMount} from "svelte";
    import Image from './components/Image.svelte';
    import Sidebar from "./components/Sidebar.svelte";
    import {initStores} from './store.svelte';

    let {itemFormElName, itemFormElValue, wizardConfig, image} = $props()

    onMount(() => {
        initStores(itemFormElValue, wizardConfig)
    });


</script>

<div class="wizard">
    <Image image={image} />
    <Sidebar />
</div>

