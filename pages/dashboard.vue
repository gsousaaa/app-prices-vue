<!-- pages/dashboard.vue -->
<template>

    <div class="p-8 bg-gray-100 min-h-screen">

        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold">Dashboard - {{ authStore.user.company_name }}</h1>
            <button type="button" @click="handleLogout"
                class="w-50 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Logout
            </button>
        </div>

        <!-- Historico e previsoes -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <PriceTable title="Histórico de Preços" :items="historic" />
            <PriceTable title="Previsões de Preço" :items="previsions" />
        </div>

        <!--Form de previsao-->
        <FormForecast :rooms="roomsList" :selectedRoom="selectedRoom" :occupancyRate="occupancyRate"
            @update:selectedRoom="val => selectedRoom = val" @update:occupancyRate="val => occupancyRate = val"
            @submit="handleCalculate" />
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { calculatePrice, getRooms } from '~/clients/axios'
import PriceTable from '~/components/common/PriceTable.vue'
import { useAuthStore } from '~/stores/auth'
import type { Price, Room } from '~/types/IGetRoomsReturn'
import type { PriceWithRoom } from '~/types/PriceWithRoom'
import { navigateTo } from 'nuxt/app'
import FormForecast from '~/components/FormForecast.vue'
import { useToast } from 'vue-toastification'

definePageMeta({ middleware: 'auth' })

const toast = useToast()
const historic = ref<PriceWithRoom[]>([])
const previsions = ref<PriceWithRoom[]>([])
const roomsList = ref<Room[]>([])
const selectedRoom = ref<number | ''>('')
const authStore = useAuthStore()

const occupancyRate = ref<number | ''>('')

const handleLogout = async () => {
    authStore.logout()
    return navigateTo('/login', { external: true })
}

onMounted(async () => {
    try {
        const historicTemp: PriceWithRoom[] = []
        const previsionsTemp: PriceWithRoom[] = []

        const rooms = await getRooms()

        roomsList.value = rooms

        rooms.forEach((room: Room) => {
            room.prices.forEach((price: Price) => {
                const item: PriceWithRoom = {
                    ...price,
                    room: room.name
                }

                const date = new Date(price.effective_date)
                const today = new Date()

                if (date <= today) {
                    historicTemp.push(item)
                } else {
                    previsionsTemp.push(item)
                }
            })
        })

        historic.value = historicTemp
        previsions.value = previsionsTemp
    } catch (err) {
        console.error('Erro ao carregar dados do dashboard', err)
    }
})

const handleCalculate = async () => {
    try {
        const response = await calculatePrice(selectedRoom.value as number, occupancyRate.value as number)
        console.log(response?.created_at)
        const prev: any = {
            price: response?.price.toFixed(2),
            created_at: response?.created_at,
            room_id: selectedRoom.value,
            effective_date: response?.effectiveDate,
            room: roomsList.value.find(r => r.id === selectedRoom.value)?.name || ''
        }
        previsions.value.push(prev)


        previsions.value.sort((a, b) => {
            if (a.room_id !== b.room_id) {
                return a.room_id - b.room_id
            }

            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })
    } catch (err: any) {
        toast.error(err.message || 'Erro ao calcular previsao')
    }
}
</script>
