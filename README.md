A markup language for thoughtlessly writing <a href="https://en.wikipedia.org/wiki/Literate_programming"><i>literate html</i></a>, inspired by [pug-js](https://pugjs.org/api/getting-started.html)

## Examples

plaintext 'WYSIWYG' whitespace is preserved.

```
hello world
and now below

.container.mx-4
  This is inside
  .card.p-2
    Nested content
    with multiple lines
```

fancy html with attributes
```pug
.label[for=email] Email:
.input#email[type=email][required]
.button.primary[type=submit]
   Submit Form
```

inline html is also supported
```pug
oh hello there, <a href="#">world</a>
```

but primarily, the main point is that you can just write plain text, and it will create an intuitive mirror html. 

Anytime you want to drop into any complex HTML, you can.

It was built to be used in static-site generators like NUXT, but it's a standalone library that you can use in any project.

## Installation
```bash
npm install rug-language
```

```js
import parseRug from 'rug-language'
const html = parseRug(input)
console.log(html)
```


### Nuxt Installation
1. Install both packages:
```bash
npm install rug-lang nuxt-rug
```

2. Add to your `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-rug'
  ]
})
```

3. Create a `.rug` file in your project:
```
// content/hello.rug
Hello world!

.container.mx-4
  This is some content
  .card.p-2
    Nested content
```

4. Use in your Vue components:
```vue
<template>
  <!-- Option 1: Inline content -->
  <Rug content="
.container.mx-4
  Hello world!
  " />

  <!-- Option 2: From a variable -->
  <Rug :content="rugContent" />

  <!-- Option 3: From a .rug file -->
  <Rug :content="content" />
</template>

<script setup>
// Option 2: Content in a variable
const rugContent = `
.alert.warning
  This is a warning message
`

// Option 3: Import from a .rug file
import content from '../content/hello.rug?raw'
</script>
```

### Attributes
Use colons to add attributes:
```
.button:type="submit":disabled="true"
  Submit

.input:required="true":type="email"
.label:for="email" Email Address
```

### Form Example
```
.form:method="post"
  .form-group
    .label:for="name" Name:
    .input#name:type="text":required="true"
  
  .form-group
    .label:for="email" Email:
    .input#email:type="email":required="true"
  
  .button.primary:type="submit"
    Submit Form
```

MIT
