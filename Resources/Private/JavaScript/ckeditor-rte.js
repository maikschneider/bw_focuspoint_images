// Lazy-loaded CKEditor bundle — only fetched when an RTE field is present in the wizard.
// Imported as a dynamic import() from Rte.svelte so the ~1 MB CKEditor payload is
// deferred until actually needed. This file is a named esbuild entry point so the
// output keeps a stable filename (ckeditor-rte.js) instead of a hash-based chunk name.
import '@typo3/rte-ckeditor/ckeditor5.js'
