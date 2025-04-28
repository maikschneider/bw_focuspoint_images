<script>
    import Icons from "@typo3/backend/icons.js";

    const {name} = $props();
    let innerHtml = $state("");

    Icons.getIcon(name, Icons.sizes.small).then((html) => {
        innerHtml = html;
    });
</script>

{@html innerHtml}
