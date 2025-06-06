
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore()

    auth.restoreToken()

    if (!auth.accessToken) {
        return navigateTo('/login', {external: true})
    }
})
