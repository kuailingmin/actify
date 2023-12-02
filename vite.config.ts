import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pages from 'vite-plugin-pages'
import react from '@vitejs/plugin-react'
import mdPlugin, { Mode } from 'vite-plugin-markdown'
import { peerDependencies } from './package.json'

import preserveDirectives from 'rollup-plugin-preserve-directives'

const alias = {
  src: fileURLToPath(new URL('./src', import.meta.url)),
  actify: fileURLToPath(new URL('./packages', import.meta.url))
}

const outputOptions = {
  sourcemap: false,
  preserveModules: true,
  preserveModulesRoot: 'packages/',
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
}

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig(({ mode }) => {
  if (mode == 'lib') {
    return {
      resolve: {
        alias
      },
      publicDir: false,
      plugins: [react(), dts({ rollupTypes: true })],
      build: {
        outDir: 'lib',
        rollupOptions: {
          input: './packages/index.ts',
          preserveEntrySignatures: 'exports-only',
          external: [...Object.keys(peerDependencies)],
          output: {
            dir: 'lib',
            format: 'esm',
            exports: 'auto',
            entryFileNames: '[name].js',
            ...outputOptions
          },
          plugins: [preserveDirectives()]
        }
      }
    }
  }
  return {
    resolve: {
      alias
    },
    plugins: [react(), pages(), mdPlugin({ mode: [Mode.MARKDOWN] })]
  }
})