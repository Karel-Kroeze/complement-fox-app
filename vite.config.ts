import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: { watch: { usePolling: true }, fs: { strict: false } }
};

export default config;
