<!-- components/FormForecast.vue -->
<template>
  <div class="bg-white p-4 rounded shadow max-w-md mx-auto mb-8">
    <h2 class="text-lg font-semibold mb-4">Simular Previsão</h2>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <RoomSelect
        label="Quartos"
        placeholder="Selecione..."
        :options="rooms"
        v-model="room"
      />
      <Input
        id="occupancyRate"
        label="Taxa de ocupação"
        v-model="occupancy"
        type="number"
      />
      <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Calcular
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Input from '~/components/common/Input.vue'
import RoomSelect from '~/components/common/RoomSelect.vue'

const props = defineProps<{
  rooms: any[]
  selectedRoom: number | ''
  occupancyRate: number | ''
}>()

const emit = defineEmits<{
  (e: 'update:selectedRoom', value: number | ''): void
  (e: 'update:occupancyRate', value: number | ''): void
  (e: 'submit'): void
}>()

const room = ref(props.selectedRoom)
const occupancy = ref(props.occupancyRate)

watchEffect(() => emit('update:selectedRoom', room.value))
watchEffect(() => emit('update:occupancyRate', occupancy.value))

const onSubmit = () => {
  emit('submit')
}
</script>
