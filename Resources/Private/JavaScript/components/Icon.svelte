<script lang="ts">
    import Icons from "@typo3/backend/icons.js";

    type Props = {
        name: string;
    }

    const {name}: Props = $props();
    let innerHtml: string = $state("");

    Icons.getIcon(name, Icons.sizes.small).then((html: string) => {
        innerHtml = html;
    });
</script>

{@html innerHtml}
