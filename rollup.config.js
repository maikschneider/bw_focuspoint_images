// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const typo3Exports = [
    'autosize',
    'bootstrap',
    'broadcastchannel.js',
    'cropperjs',
    'd3-dispatch',
    'd3-drag',
    'd3-selection',
    'ev-emitter',
    'imagesloaded',
    'interactjs',
    'jquery',
    '@lit/reactive-element',
    'lit',
    'lit-element',
    'lit-html',
    'moment',
    'moment-timezone',
    'nprogress',
    'sortablejs',
    'tablesort.dotsep.js',
    'tablesort',
    'taboverride',
];
const typo3Prefixes = [
    '@typo3/',
    '@lit/reactive-element/',
    'lit/',
    'lit-element/',
    'lit-html/',
    'flatpickr/',
    'jquery-ui/'
];

const lowerDashedToUpperCamelCase = (str) => str.replace(/([-\/])([a-z])/g, (_str, sep, letter) => (sep === '/' ? '/' : '') + letter.toUpperCase());

export function typo3Resolve() {
    return {
        name: 'typo3Resolve',
        resolveId(id) {
            const external = true

            for (const exportName of typo3Exports) {
                if (id === exportName) {
                    return {id, external}
                }
            }

            for (const exportPrefix of typo3Prefixes) {
                if (id.startsWith(exportPrefix)) {
                    if (!id.endsWith('.js')) {
                        id += '.js'
                    }
                    return {id, external}
                }
            }
        },
        renderChunk(code, chunk, outputOptions) {
            if (outputOptions.format !== 'amd') {
                return;
            }

            // Resolve "@typo3/ext-name/module-name.js" into "TYPO3/CMS/ExtName/ModuleName" for TYPO3 v11 (AMD) builds
            return code.replaceAll(
                /(["'])@typo3\/([\w\/\.\@\-]+)\.js\1/g,
                (match, quotes, path) => lowerDashedToUpperCamelCase(`${quotes}TYPO3/CMS/${path}${quotes}`)
            )
        }
    }
}


export default {
    input: [
        'Resources/Private/TypeScript/FocuspointWizard.ts',
    ],
    output: [
        {
            dir: 'Resources/Public/ECMAScript6',
            format: 'es',
            plugins: []
        },
        {
            dir: 'Resources/Public/JavaScript',
            entryFileNames: (chunkInfo) => lowerDashedToUpperCamelCase('/' + chunkInfo.name).substring(1) + '.js',
            format: 'amd',
            plugins: []
        },
    ],
    external: ['jquery-ui/draggable.js', 'jquery-ui/resizable.js'],
    plugins: [
        typescript(),
        typo3Resolve(),
        resolve({
            mainFields: ['module', 'main'],
            modulesOnly: true
        }),
    ],
}
