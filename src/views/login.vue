<script setup>
import { ref } from 'vue'
import axios from 'axios'

const form = ref({
    user_name: '',
    password: ''
})
const login = () => {
    console.log(form.value.user_name, form.value.password);
    axios({
        method: 'post',
        url: 'http://127.0.0.1:4523/m1/5195521-4861384-default/api/authserver/authenticate',
        data: {
            user_name: form.value.user_name,
            password: form.value.password
        }
    }).then(res => {
        console.log(res.data);
    })
}
</script>
<template>
    <div>
        <el-form :model="form" label-width="auto" style="max-width: 300px">
            <el-form-item label="用户名">
                <el-input v-model="form.user_name" style="width: 240px" type="text"/>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" style="width: 240px" type="password" show-password/>
            </el-form-item>
            <el-button type="success" style="width: 150px" @click="login">登录</el-button>
        </el-form>
    </div>
</template>
<style scoped>
</style>