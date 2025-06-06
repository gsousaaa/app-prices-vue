import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref<string | null>('')
    const user = ref<any>('')

    function setAccessToken(token: string) {
        accessToken.value = token
        user.value = jwtDecode(token)

        const cookie = useCookie('accessToken')
        cookie.value = token
    }

    function restoreToken() {
        const cookie = useCookie('accessToken')
        const token = cookie.value

        if (token) {
            accessToken.value = token
            user.value = jwtDecode(token)
        }
    }

    function logout() {
        accessToken.value = null
        user.value = null

        const cookie = useCookie('accessToken')
        cookie.value = null
    }


    return { accessToken, user, setAccessToken, restoreToken, logout }
})