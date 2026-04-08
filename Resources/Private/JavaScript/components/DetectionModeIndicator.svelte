<script lang="ts">
    import {wizardConfigStore} from "../store.svelte";

     let langDetectionMode = $derived($wizardConfigStore?.lang['wizard.detection_mode'] ?? 'Detection Mode');
</script>

<style>
    .detection-mode-indicator {
        --indicator-font-size: .75rem;
        --indicator-color: white;
        --indicator-bg: #6E00B3;
        --indicator-height: calc(var(--indicator-badge-height) * 0.75);
        --indicator-badge-padding-x: .75rem;
        --indicator-badge-padding-y: .05rem;
        --indicator-badge-height:
            calc(var(--indicator-font-size) + var(--indicator-badge-padding-y) * 2);
        --indicator-z-index: 10001;

        display: block;
        position: relative;
        color: var(--indicator-color);
        height: var(--indicator-height);
        background-color: var(--indicator-bg);
        font-size: var(--indicator-font-size);
        line-height: 1;
        z-index: var(--indicator-z-index);
        user-select: none;
        transition: margin-top .25s ease-out, background-color .25s ease-out, color .25s ease-out, display allow-discrete .25s ease-out;
    }

    .detection-mode-indicator-inner {
        position: absolute;
        top: 0;
        left: var(--indicator-badge-padding-x);
        right: var(--indicator-badge-padding-x);
        width: fit-content;
        max-width: calc(100% - var(--indicator-badge-padding-x) * 2);
        margin-inline: auto;
        box-sizing: border-box;
        padding:  var(--indicator-badge-padding-y)  var(--indicator-badge-padding-x);
        border-radius: 0 0 0.5rem 0.5rem;
        background-color: inherit;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        transition: background-color .25s ease-out;
    }
</style>

<div class="detection-mode-indicator">
    <span class="detection-mode-indicator-inner">
        {langDetectionMode}
    </span>
</div>

