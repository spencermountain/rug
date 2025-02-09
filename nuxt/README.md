# Nuxt Rug

Nuxt module for the Rug templating language.

## Installation 
```bash 
npm install nuxt-rug
```

```js
// nuxt.config.js
export default defineNuxtConfig({
  modules: ['nuxt-rug'],
})
```

### Usage

```vue
<template>
<Rug content="
.container.mx-4
.card.p-2
Hello world!
" />
</template>
```
See [rug-lang](https://github.com/yourusername/rug-lang) for full syntax documentation.
