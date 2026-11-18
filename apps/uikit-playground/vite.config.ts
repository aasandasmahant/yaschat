import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => ({
	base: './',
	esbuild: {},
	plugins: [react()],
	optimizeDeps: {
		include: ['@yas chat/ui-contexts', '@yas chat/message-parser', '@yas chat/core-typings'],
	},
	build: {
		commonjsOptions: {
			include: [/ui-contexts/, /core-typings/, /message-parser/, /node_modules/],
		},
	},
}));
