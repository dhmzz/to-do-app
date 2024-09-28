import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia } from 'pinia'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app') // Pindahkan ke bagian paling akhir
