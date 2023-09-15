<script setup>
const { roleDetails } = defineProps({
  roleDetails: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div>{{ roleDetails }}</div>
</template>
