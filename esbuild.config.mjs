import esbuild from "esbuild";
import sveltePlugin from "esbuild-svelte";
import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ckeditorContribBase = path.resolve(__dirname, 'vendor/typo3/cms-rte-ckeditor/Resources/Public/Contrib/@ckeditor');
const ckeditorJsBase = path.resolve(__dirname, 'vendor/typo3/cms-rte-ckeditor/Resources/Public/JavaScript');

const bundleCkeditorPlugin = {
    name: 'bundle-ckeditor',
    setup(build) {
        build.onResolve({filter: /^@typo3\/rte-ckeditor\/ckeditor5(\.js)?$/}, () => ({
            path: path.join(ckeditorJsBase, 'ckeditor5.js'),
        }));
        build.onResolve({filter: /^@typo3\/rte-ckeditor\/css-prefixer(\.js)?$/}, () => ({
            path: path.join(ckeditorJsBase, 'css-prefixer.js'),
        }));
        build.onResolve({filter: /^@ckeditor\//}, (args) => ({
            path: path.join(ckeditorContribBase, args.path.replace(/^@ckeditor\//, '') + '.js'),
        }));
        build.onResolve({filter: /^@typo3\/rte-ckeditor\/plugin\//}, (args) => ({
            path: path.join(ckeditorJsBase, args.path.replace(/^@typo3\/rte-ckeditor\/plugin\//, 'Plugin/')),
        }));
        // Transform ckeditor5.js: replace dynamic import(n.module) with a static registry
        // using static namespace imports that esbuild can bundle.
        build.onLoad({filter: /ckeditor5\.js$/, namespace: 'file'}, async (args) => {
            if (!args.path.includes('cms-rte-ckeditor')) return;
            let source = await fs.promises.readFile(args.path, 'utf8');
            // Extract all @ckeditor module specifiers — minified source uses unquoted keys: module:"@ckeditor/..."
            const modules = [...source.matchAll(/module:"(@ckeditor\/[^"]+)"/g)].map(m => m[1]);
            // Also include the known @typo3/rte-ckeditor/plugin/* files
            const pluginDir = path.join(ckeditorJsBase, 'Plugin');
            const pluginFiles = await fs.promises.readdir(pluginDir).catch(() => []);
            const pluginModules = pluginFiles.filter(f => f.endsWith('.js')).map(f => `@typo3/rte-ckeditor/plugin/${f}`);
            const unique = [...new Set([...modules, ...pluginModules])];
            // Build static namespace imports + a registry map
            const importLines = unique.map((m, i) => `import * as __ck${i} from "${m}";`).join('\n');
            const registryEntries = unique.map((m, i) => `"${m}":__ck${i}`).join(',');
            const preamble = `${importLines}\nconst __ckRegistry={${registryEntries}};\n`;
            // Replace the single dynamic import(n.module) with a synchronous registry lookup + fallback
            source = source.replace('await import(n.module)', '(__ckRegistry[n.module]??await import(n.module))');
            return {contents: preamble + source, loader: 'js'};
        });
    }
};

let devMode = true;

const ignoreWarnings = new Set([
    "'TYPO3' is not defined"
])

const outDir = path.join(__dirname, 'Resources/Public/JavaScript');

function cleanOutputDir() {
    fs.rmSync(outDir, {recursive: true, force: true});
    fs.mkdirSync(outDir, {recursive: true});
}

const buildConfig = {
    entryPoints: [
        "Resources/Private/JavaScript/FocuspointElement.svelte",
        "Resources/Private/JavaScript/FocuspointWizard.svelte",
        "Resources/Private/JavaScript/ckeditor-rte.js",
    ],
    mainFields: ["svelte", "browser", "module", "main"],
    conditions: ["svelte", "browser"],
    bundle: true,
    splitting: true,
    outdir: "Resources/Public/JavaScript/",
    format: "esm",
    chunkNames: "[name]-[hash]",
    plugins: [
        bundleCkeditorPlugin,
        sveltePlugin({
            compilerOptions: {
                dev: devMode,
                customElement: true
            },
            filterWarnings(warning) {
                if (ignoreWarnings.has(warning.code)) {
                    return false
                }
            }
        })],
    logLevel: "info",
    sourcemap: true,
    external: ["@typo3/*", "interactjs", "lit", "lit/decorators.js", "css-tree"],
};

if (process.argv.includes('--build')) {
    await build()
} else {
    await watch()
}

async function build() {
    devMode = false;
    buildConfig.sourcemap = false
    buildConfig.minify = true
    cleanOutputDir()
    await esbuild.build(buildConfig)
}

async function watch() {
    cleanOutputDir()
    let ctx = await esbuild.context(buildConfig)
    await ctx.watch()
}
