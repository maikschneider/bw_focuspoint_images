// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default [
	{
		input: [
			'Resources/Private/TypeScript/FocuspointWizard.ts',
		],
		output: [
			{
				dir: 'Resources/Public/JavaScript',
				format: 'es',
				plugins: []
			}
		],
		external: ['lit', 'lit/directives/unsafe-html.js', 'interactjs'],
		plugins: [
			typescript(),
			resolve({
				mainFields: ['module', 'main']
			}),
		],
	}
]
