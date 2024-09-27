<script setup lang="ts">
import { useRouter, RouterView } from "vue-router";

document.body.setAttribute("arco-theme", "dark");
const router = useRouter();
</script>

<template>
  <a-layout style="height: 100%" :style="{ background: 'var(--color-fill-2)' }">
    <a-layout-header>
      <a-page-header
        style="height: 100%"
        :style="{ background: 'var(--color-bg-2)' }"
        title="工地高墙"
        subtitle="CSite High Wall"
      >
        <template #extra>
          <a-space :size="0">
            <a-space >
              <a-button
                style="border-radius: var(--border-radius-medium)"
                type="primary"
                @click="router.push('/login')"
                id="login"
                >登录</a-button
              >
              <a-button
                style="border-radius: var(--border-radius-medium)"
                type="secondary"
                @click="router.push('/register')"
                id="register"
                >注册</a-button
              >
            </a-space>
            <a-menu
              style="width: 280px; margin-right: -90px"
              mode="horizontal"
              :default-selected-keys="['1']"
            >
              <a-menu-item key="1" @click="router.push('/home')"
                >工地墙</a-menu-item
              >
              <a-menu-item key="2" @click="router.push('/test')" disabled
                >个人页面</a-menu-item
              >
            </a-menu>
          </a-space>
        </template>
      </a-page-header>
    </a-layout-header>
    <a-layout-content>
      <RouterView style="height: 100%"></RouterView>
    </a-layout-content>
    <a-layout-footer>
      <a-row class="grid-demo">
        <a-col :span="8"> </a-col>
        <a-col :span="8"> </a-col>
        <a-col :span="8"> </a-col>
      </a-row>
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.arco-page-header {
  padding: 16px 0 0px 0;
}

@media (min-width: 597.5px) {
  .arco-page-header {
    padding: 0px 0;
  }
}
</style>
