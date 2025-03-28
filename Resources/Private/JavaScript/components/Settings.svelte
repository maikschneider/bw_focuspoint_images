<script>
    import {focuspoints} from '../store.svelte';
    import {onMount} from "svelte";

    onMount(() => {
        console.log($focuspoints);
    });
</script>

<style>
    .settings {
        padding: 2rem;
    }
</style>

<div class="settings">
    <h2>Settings</h2>
    <div>
        <label>Import / Export</label>
        <textarea rows="10" cols="50" >{JSON.stringify($focuspoints)}</textarea>
    </div>
</div>
