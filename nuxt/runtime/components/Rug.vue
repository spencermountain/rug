<template>
  <div v-html="parsedContent"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import parseRug from '../../src/index.js'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const parsedContent = ref('')

onMounted(() => {
  parsedContent.value = parseRug(props.content)
})
</script>