import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/<YOUR_REPO_NAME>/', // TODO: Replace <YOUR_REPO_NAME> with your actual GitHub repository name
})