import { defineNuxtModule } from '@nuxt/kit'
import { parseRug } from '../src/index.js'

export default defineNuxtModule({
  meta: {
    name: 'rug-lang',
    configKey: 'rug'
  },
  setup(options, nuxt) {
    // Add webpack loader for .rug files
    nuxt.hook('webpack:config', (config) => {
      config.module.rules.push({
        test: /\.rug$/,
        use: [
          'vue-loader',
          {
            loader: 'string-replace-loader',
            options: {
              multiple: [
                {
                  search: /([\s\S]*)/,
                  replace: (match) => {
                    return parseRug(match);
                  }
                }
              ]
            }
          }
        ]
      })
    })
  }
}) 