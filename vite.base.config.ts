import { defineConfig, Plugin } from 'vite'
import * as path from 'path'
import { isVue2 } from 'vue-demi'
import DtsPlugin from 'vite-plugin-dts'

const outputName = 'index'
export const getSharedPlugins = (): Plugin[] => [
  DtsPlugin({
    root: '..',
    compilerOptions: {
      skipLibCheck: true
    },
    // only compiler our component source code
    include: ['src/**'],
  })
]

console.log('Vue version:', isVue2 ? 'v2' : 'v3')

// https://vitejs.dev/config/
export const baseBuildConfig = defineConfig({
  build: {
    outDir: path.resolve(__dirname, `./dist/${isVue2 ? 'v2' : 'v3'}`),
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'umd'],
      name: 'VueDemiTemplateComponent',
      fileName: (format) => `${outputName}.${format}.js`
    },
    rollupOptions: {
      external: ['vue', '@vue/composition-api/dist/vue-composition-api.mjs'],
      output: {
        globals: {
          vue: 'Vue',
          '@vue/composition-api/dist/vue-composition-api.mjs':
            'VueCompositionAPI'
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['vue-demi', 'vue', 'vue2', 'vue3']
  },
})
