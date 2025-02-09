import { defineNuxtModule, addVitePlugin, createResolver, addComponent } from '@nuxt/kit'
import { parse } from 'node:path'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-rug',
    configKey: 'rug'
  },
  defaults: {
    // Module defaults
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Register the Rug component globally
    addComponent({
      name: 'Rug',
      filePath: resolver.resolve('./runtime/components/Rug.vue')
    })

    // Add Vite plugin to process .rug files
    addVitePlugin({
      name: 'vite-plugin-rug',
      transform(code, id) {
        const { ext } = parse(id)
        if (ext !== '.rug') return

        // Import our parser
        const parseRug = require('../src/index.js')

        try {
          const html = parseRug(code)
          return {
            code: `export default ${JSON.stringify(html)}`,
            map: null
          }
        } catch (error) {
          this.error(`Error processing ${id}: ${error.message}`)
        }
      }
    })
  }
}) 