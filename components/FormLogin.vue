<!-- components/FormLogin.vue -->
<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <form @submit.prevent="onSubmit" class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-xl font-bold text-center mb-6">Login</h2>

      <Input id="email" label="Email" v-model="emailValue" type="email" />
      <Input id="password" label="Password" v-model="passwordValue" type="password" />

      <Button type="submit">Log In</Button>

    </form>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Input from '~/components/common/Input.vue'
import Button from '~/components/common/Button.vue'

const props = defineProps<{
  email: string
  password: string
  onSubmit: () => void
}>()

const emit = defineEmits(['update:email', 'update:password'])

const emailValue = computed({
  get: () => props.email,
  set: (val) => emit('update:email', val)
})

const passwordValue = computed({
  get: () => props.password,
  set: (val) => emit('update:password', val)
})
</script>
