import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			components: 'src/routes/components/index.ts',
			models: 'src/models/index.ts',
			store: 'src/utils/store.svelte.ts',
			utils: 'src/utils/',
			addToUserList: 'src/routes/addToUserList/',
			admin: 'src/routes/admin/'
		}
	}
};

export default config;
