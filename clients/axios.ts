import axios, { AxiosError } from "axios";

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



