import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    timeout: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    position: 'top-right',
    hideProgressBar: false,
    transition: 'Vue-Toastification__fade'
  })
})