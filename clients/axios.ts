import axios, { AxiosError } from "axios";
import type { IGetRoomsReturn } from "~/types/IGetRoomsReturn";

export const api = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(config => {
    const token = useCookie('accessToken').value
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            navigateTo('/login', { external: true })
        }

        console.error('[Axios Error]', error.response || error.message)
        return Promise.reject(error)
    }
)

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', {
            email: email,
            password: password
        })

        return response.data
    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response?.status === 400) {
                throw new Error('Email e/ou senha incorretos!')
            }
            throw new Error('Erro ao fazer login')
        }

        throw err
    }
}

export const getRooms = async () => {
    try {
        const response = await api.get('/api/rooms')

        return response.data as IGetRoomsReturn
    } catch (err) {
        throw new Error('Erro ao buscar quartos')
    }
}