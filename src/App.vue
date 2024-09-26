<script setup>
import { useRouter,RouterView } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div>
    <a-layout-header>
      <a-menu mode="horizontal" :default-selected-keys="['1']">
        <span id="WebTitle">CSite-High-Wall</span>
        <a-menu-item key="1" @click="router.push('/home')">主页</a-menu-item>
        <a-menu-item key="2" @click="router.push('/test')">演示</a-menu-item>
        <a-button type="primary" @click="router.push('/login')" id="login">登录</a-button>
        <a-button type="secondary" @click="router.push('/register')" id="register">注册</a-button>
      </a-menu>
    </a-layout-header>
    <a-layout-content>
      <RouterView></RouterView>
    </a-layout-content>
  </div>
</template>

<style scoped>
#login {
  left: 70%;
}
#register {
  left: 71%;
}
#WebTitle {
  font-size: 20px;
}
</style>
