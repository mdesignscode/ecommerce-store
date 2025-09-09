import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
        // Consult https://svelte.dev/docs/kit/integrations
        // for more information about preprocessors
        preprocess: vitePreprocess(),
        kit: {
                adapter: adapter(),

                // my aliases
                alias: {
                        currentUser: 'src/utils/currentUser.ts',
                        components: 'src/routes/components/index.ts',
                        skeletons: 'src/routes/components/Skeletons/index.ts',
                        models: 'src/models/index.ts',
                        store: 'src/utils/store.svelte.ts',
                        utils: 'src/utils/',
                }
        }
};

export default config;

