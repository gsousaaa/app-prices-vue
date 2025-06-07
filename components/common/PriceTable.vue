<!-- components/common/PriceTable.vue -->
<template>
  <div class="bg-white p-4 rounded shadow">
    <h2 class="text-md font-semibold mb-1">{{ title }}</h2>

    <!-- Filtro por nome de quarto -->
    <input
      v-model="roomFilter"
      type="text"
      :placeholder="`Buscar por quarto`"
      class="mb-3 w-full border px-3 py-2 rounded text-sm"
    />

    <!-- Tabela -->
    <div class="max-h-64 overflow-y-auto">
      <table class="w-full text-sm table-auto border border-gray-200 rounded overflow-hidden">
        <thead class="bg-gray-50 sticky top-0">
          <tr class="text-left text-gray-600">
            <th class="py-2 px-3">Quarto</th>
            <th class="py-2 px-3">Data</th>
            <th class="py-2 px-3 text-right">Preço</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredItems"
            :key="item.effective_date + item.room"
            class="border-t hover:bg-gray-50 transition-colors"
          >
            <td class="py-2 px-3">{{ item.room }}</td>
            <td class="py-2 px-3">{{ formatDate(item.effective_date) }}</td>
            <td
              class="py-2 px-3 text-right font-medium"
              :class="title.toLowerCase().includes('previsões') ? 'text-green-600' : 'text-gray-700'"
            >
              R$ {{ item.price }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import type { PriceWithRoom } from '~/types/PriceWithRoom'

const props = defineProps<{
  title: string
  items: PriceWithRoom[]
}>()

// filtro por nome do quarto
const roomFilter = ref('')

const filteredItems = computed(() => {
  if (!roomFilter.value.trim()) {
    return props.items
  }
  return props.items.filter(item =>
    item.room.toLowerCase().includes(roomFilter.value.trim().toLowerCase())
  )
})

</script>
