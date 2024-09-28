import { defineStore } from 'pinia'
import apiClient from '../utils/apiClient'
import { baseApi, setToken } from './Global'
import { ElMessage } from 'element-plus'

export const useAuth = defineStore('auth', {
    state: () => ({
        account: {
            username: "",
            pass: "",
            email: ""
        }
    }),

    actions: {
        async handleRegister() {
            try {
                const param = {
                    username: this.account.username,
                    password: this.account.pass,
                    email: this.account.email
                };

                const res = await apiClient.post("/register", param);

                if (res.status === 200) {
                    ElMessage({
                        message: res.data.message || "Registrasi berhasil!",
                        type: 'success',
                    });
                }
            } catch (error) {
                ElMessage({
                    message: "Gagal saat registrasi",
                    type: 'error',
                });
            }
        },

        async handleLogin() {
            try {
                const param = {
                    username: this.account.username,
                    password: this.account.pass
                };
                const res = await apiClient.post("/login", param);
                if (res.status === 200) {
                    ElMessage({
                        message: res.data.message,
                        type: 'success',
                    });
                    setToken(res.data.data.token)
                }
            } catch (error) {
                ElMessage({
                    message: "Gagal saat login",
                    type: 'error',
                });
            }
        }
    },
});
