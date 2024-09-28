// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import AboutPage from '@/views/AboutPage.vue'
import Login from '../pages/auth/Login.vue'
import ToDoApp from '../pages/screen/ToDoApp.vue'

// Definisikan rute-rute aplikasi
const routes: Array<RouteRecordRaw> = [
    {
        path: '/SignIn',
        name: 'SignIn',
        component: Login
    },
    {
        path: '/ToDoApp',
        name: 'ToDoApp',
        component: ToDoApp
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
