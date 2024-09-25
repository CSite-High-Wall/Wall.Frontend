<script setup>
import { useUserStore } from '../stores/userStore';
const userStore = useUserStore();
console.log(userStore);
</script>
<template>
    <div>
        <h1>这是登陆界面</h1>
        <h2>路由守护测试:</h2>
        <el-button @click="userStore.log_in()">按下按钮表示登录成功</el-button>
        <el-button @click="userStore.log_out()">按下按钮清除登录状态</el-button>
    </div>
    <h1>登录状况变量测试:{{ userStore.islogined }}</h1>
</template>
<style></style>