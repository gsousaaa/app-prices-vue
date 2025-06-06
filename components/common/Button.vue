<!-- components/common/BaseButton.vue -->
<template>
  <button
    :type="type"
    class="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 font-semibold"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'submit' | 'button'
}>()
</script>