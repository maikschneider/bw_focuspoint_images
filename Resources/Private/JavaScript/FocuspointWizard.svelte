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

<script>
    import {onDestroy, onMount} from "svelte";
    import Image from './components/Image.svelte';
    import Sidebar from "./components/Sidebar.svelte";
    import {initStores} from './store.svelte';
    import {focuspoints} from './store.svelte';
    import interact from 'interactjs';

    let {itemFormElName, wizardConfig, image} = $props()
    let imageComponent
    let sidebarWidth = $state(300)
    const minSidebarWidth = 200

    const hiddenInput = window.parent.frames.list_frame.document.querySelector(`[name="${itemFormElName}"]`)

    onMount(() => {
        initStores(hiddenInput, wizardConfig)
        window.parent.frames.list_frame.document.addEventListener(`${itemFormElName}-save`, handleSave)

        // Restore saved sidebar width if available
        const savedWidth = localStorage.getItem('focuspoint-sidebar-width')
        if (savedWidth && parseInt(savedWidth) >= minSidebarWidth) {
            sidebarWidth = parseInt(savedWidth)
        }

        interact('.resize-handle').draggable({
            axis: 'x',
            listeners: {
                move(event) {
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
        window.parent.frames.list_frame.document.removeEventListener(`${itemFormElName}-save`, handleSave)
        $focuspoints = []
        interact('.resize-handle').unset()
    });

    const handleSave = () => {
        const hiddenInput = window.parent.frames.list_frame.document.querySelector(`[name="${itemFormElName}"]`)
        dispatchSaveEvent()
        hiddenInput.value = JSON.stringify($focuspoints)
    }

    const dispatchSaveEvent = () => {
        window.parent.frames.list_frame.dispatchEvent(new CustomEvent(`${itemFormElName}-save`, {
            detail: {
                name: itemFormElName,
                value: JSON.stringify($focuspoints)
            }
        }))
    }
</script>

<div class="wizard" style="--sidebar-width: {sidebarWidth}px;">
    <Image bind:this={imageComponent} image={image} />
    <div class="resize-handle" aria-label="Resize sidebar"></div>
    <Sidebar />
</div>
