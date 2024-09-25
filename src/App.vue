<script setup>
import { RouterView } from 'vue-router'
</script>
<template>
  <div>
    <span>This is Header</span> |
    <el-button @click="$router.push('/home')">Home</el-button>
    <el-button @click="$router.push('/about')">About</el-button>
    <el-button @click="$router.push('/login')">Login</el-button>
  </div><hr>
  <RouterView></RouterView>
</template>
<style scoped></style>