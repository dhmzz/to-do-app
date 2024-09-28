<template>
    <el-card style="max-width: 480px">
        <template #header>
            <div class="card-header">
                <span>Login</span>
            </div>
        </template>
        <el-input type="string" placeholder="Username" v-model="authStore.account.username"/>
        <el-input type="password" placeholder="Password" v-model="authStore.account.pass"/>
        <el-button type="primary" class="mt-3" @click="handleLogin">Login</el-button>
    </el-card>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useAuth } from '../../stores/Auth';
    import { setToken } from '../../stores/Global';
    import { ElMessage } from 'element-plus';

    const authStore = useAuth();

    const handleLogin = async () => {
        if(authStore.account.username == "") 
            ElMessage({
                message: "Pastikan username terisi!",
                type: 'info',
            });
        else if (authStore.account.pass == "")
            ElMessage({
                message: "Pastikan username terisi!",
                type: 'info',
            });
        else
            await authStore.handleLogin();
    };
</script>
