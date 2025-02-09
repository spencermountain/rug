<script setup lang="ts">
import { ref, onMounted } from 'vue'
import parseRug from 'rug-lang'
import type { RugComponentProps } from '../module'

const props = defineProps<RugComponentProps>()

const parsedContent = ref('')

onMounted(() => {
  parsedContent.value = parseRug(props.content)
})
</script>

<template>
  <div v-html="parsedContent"></div>
</template>