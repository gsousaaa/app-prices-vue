<!-- pages/login.vue -->
<template>
  <FormLogin :email="email" , :password="password" @update:email="email = $event" @update:password="password = $event"
    :onSubmit="handleLogin" />
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { login } from '~/clients/axios'
import { useRouter } from 'vue-router'
import FormLogin from '~/components/FormLogin.vue'
import { useAuthStore } from '~/stores/auth'
import { useToast } from 'vue-toastification'

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const toast = useToast()

const handleLogin = async () => {
  try {
    const response = await login(email.value, password.value) as { accessToken: string }
    auth.setAccessToken(response.accessToken)
    toast.success(`Seja bem-vindo, ${auth.user.name}`)
    router.push('/dashboard')
  } catch (err: any) {
    toast.error(err.message || 'Erro ao fazer login')
  }

}
</script>
