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

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const response = await login(email.value, password.value) as { accessToken: string }

  auth.setAccessToken(response.accessToken)

  router.push('/dashboard')
}
</script>
