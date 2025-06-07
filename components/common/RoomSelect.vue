<!-- components/common/RoomSelect.vue -->
<template>
  <div class="mb-4">
    <label class="block mb-1 font-medium">{{ label }}</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', Number($event.target.value))"
      class="w-full border px-3 py-2 rounded"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="room in options" :key="room.id" :value="room.id">
        {{ room.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { Room } from '~/types/IGetRoomsReturn'

const props = defineProps<{
  label: string
  options: Room[]
  placeholder: string
  modelValue: number | ''
}>()

defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>
