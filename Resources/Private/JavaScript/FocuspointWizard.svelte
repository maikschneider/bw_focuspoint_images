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

    let {itemFormElName, itemFormElValue, wizardConfig, image} = $props()

    let config = JSON.parse(wizardConfig)
    let focuspoint = JSON.parse(itemFormElValue)

    onMount(() => {
        console.log('FocuspointWizard mounted', config, focuspoint);
    });


</script>

<div class="wizard">
        <Image image={image} />
    <div>
    </div>
</div>
