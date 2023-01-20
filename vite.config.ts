import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { crx } from '@crxjs/vite-plugin'
// @ts-ignore
import manifest from './manifest.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), crx({ manifest })],
})
