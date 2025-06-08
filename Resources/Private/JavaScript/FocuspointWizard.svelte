<svelte:options customElement={{tag: 'focuspoint-wizard', shadow: 'none'}} />

<style>
    .wizard {
        display: grid;
        max-height: 100%;
        grid-template-columns: 1fr 1px var(--sidebar-width, 300px);
        grid-template-rows: 100%;
    }

    .resize-handle {
        cursor: ew-resize !important;
        user-select: none;
        position: relative;
    }

    .resize-handle:after {
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        right: -4px;
        width: 4px;
        height: 100%;
        background: rgba(255, 255, 255, 0);
    }

    .resize-handle:hover:after {
        background: var(--scaffold-content-navigation-drag-bg-hover, #bbb);
    }
</style>

<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import Image from './components/Image.svelte';
    import Sidebar from "./components/Sidebar.svelte";
    import {initStores} from './store.svelte';
    import {focuspoints} from './store.svelte';
    import interact from 'interactjs';
    import Settings from "./components/Settings.svelte";

    let {itemFormElName, wizardConfig, image} = $props()
    let isSettingsOpen = $state(false)
    let sidebarWidth = $state(300)
    const minSidebarWidth = 200

    const hiddenInput = window.parent.frames.list_frame.document.querySelector<HTMLInputElement>(`[name="${itemFormElName}"]`)!

    onMount(() => {
        initStores(hiddenInput, wizardConfig)
        window.parent.frames.list_frame.document.addEventListener(`${itemFormElName}-modal-save`, onModalSave)
        window.parent.frames.list_frame.document.addEventListener(`${itemFormElName}-settings`, handleSettings)

        // Restore saved sidebar width if available
        const savedWidth = localStorage.getItem('focuspoint-sidebar-width')
        if (savedWidth && parseInt(savedWidth) >= minSidebarWidth) {
            sidebarWidth = parseInt(savedWidth)
        }

        interact('.resize-handle').draggable({
            axis: 'x',
            listeners: {
                move(event: {dx: number}) {
                    const newWidth = sidebarWidth + event.dx * -1
                    if (newWidth >= minSidebarWidth) {
                        sidebarWidth = newWidth
                        localStorage.setItem('focuspoint-sidebar-width', sidebarWidth.toString())
                    }
                }
            }
        })
    });

    onDestroy(() => {
        window.parent.frames.list_frame.document.removeEventListener(`${itemFormElName}-modal-save`, onModalSave)
        window.parent.frames.list_frame.document.removeEventListener(`${itemFormElName}-settings`, handleSettings)
        $focuspoints = []
        interact('.resize-handle').unset()
    });

    const onModalSave = () => {
        window.parent.frames.list_frame.document.dispatchEvent(new CustomEvent(`${itemFormElName}-wizard-update`, {detail: {focuspoints: $focuspoints}}))
    }

    const handleSettings = () => {
        isSettingsOpen = !isSettingsOpen
    }
</script>

<div class="wizard" style="--sidebar-width: {sidebarWidth}px;">
    {#if isSettingsOpen}
        <Settings itemFormElName={itemFormElName} bind:isSettingsOpenValue={isSettingsOpen} />
    {:else}
        <Image image={image} />
        <div class="resize-handle" aria-label="Resize sidebar"></div>
        <Sidebar />
    {/if}
</div>
