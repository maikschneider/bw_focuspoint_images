<svelte:options customElement={{tag: 'focuspoint-wizard', shadow: 'none'}} />

<style>
    .wizard-wrapper {
        position: relative;
        height: 100%;
        min-height: 0;
    }

    .wizard {
        display: grid;
        max-height: 100%;
        min-height: 0;
        grid-template-columns: 1fr 1px var(--sidebar-width, 300px);
        grid-template-rows: minmax(0, 1fr);
    }

    .detection-mode-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10001;
        pointer-events: none;
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
    import {cubicIn, cubicOut} from "svelte/easing";
    import {fly} from 'svelte/transition';
    import Image from './components/Image.svelte';
    import Sidebar from "./components/Sidebar.svelte";
    import {detectionMode, focuspointChannelName, initStores, activateFocuspoint, deactivateAllFocuspoints} from './store.svelte';
    import {focuspoints} from './store.svelte';
    import interact from 'interactjs';
    import Settings from "./components/Settings.svelte";
    import DetectionModeIndicator from "./components/DetectionModeIndicator.svelte";

    let {itemFormElName, wizardConfig, image, itemFormElValue} = $props()
    let isSettingsOpen = $state(false)
    let imageComponent = $state(<{updateCanvasSizes: () => void} | null>(null))
    let sidebarWidth = $state(300)
    const minSidebarWidth = 200
    let channel: BroadcastChannel|null = null


    onMount(() => {
        initStores(itemFormElValue, wizardConfig)

        if ($focuspoints.length > 0) {
            deactivateAllFocuspoints()
            setTimeout(() => {
                activateFocuspoint(0)
            }, 300)
        }

        channel = new BroadcastChannel(focuspointChannelName(itemFormElName))
        channel.onmessage = (e) => {
            if (e.data.type === 'modal-save') onModalSave()
            if (e.data.type === 'settings') handleSettings()
        }

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
                        imageComponent?.updateCanvasSizes()
                    }
                }
            }
        })
    });

    onDestroy(() => {
        channel?.close()
        $focuspoints = []
        interact('.resize-handle').unset()
    });

    const onModalSave = () => {
        channel?.postMessage({type: 'wizard-update', focuspoints: $focuspoints})
    }

    const handleSettings = () => {
        isSettingsOpen = !isSettingsOpen
    }
</script>

<div class="wizard-wrapper">
    {#if $detectionMode}
        <div
            class="detection-mode-overlay"
            in:fly={{ y: -24, duration: 260, easing: cubicOut }}
            out:fly={{ y: -16, duration: 180, easing: cubicIn }}
        >
            <DetectionModeIndicator />
        </div>
    {/if}

    <div class="wizard" style="--sidebar-width: {sidebarWidth}px;">
        {#if isSettingsOpen}
            <Settings itemFormElName={itemFormElName} bind:isSettingsOpenValue={isSettingsOpen} />
        {:else}
            <Image bind:this={imageComponent} image={image} />
            <div class="resize-handle" aria-label="Resize sidebar"></div>
            <Sidebar />
        {/if}
    </div>

</div>
