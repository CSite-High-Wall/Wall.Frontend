<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterView } from "vue-router";

const show_page_navigation = ref(false);

const router = useRouter();
router.beforeEach((to) => {
  show_page_navigation.value = !(to.path == "/login" || to.path == "/register");
});

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.body.setAttribute(
  "arco-theme",
  prefersDark.valueOf() ? "dark" : "light"
);

</script>

<template>
  <a-layout style="height: 100%" :style="{ background: 'var(--color-fill-2)' }">
    <a-layout-header
      :style="{
        padding: show_page_navigation ? '16px 0 0px 0' : '16px 0 16px 0',
        background: 'var(--color-bg-2)',
      }"
    >
      <a-space :size="0" direction="vertical" fill>
        <a-page-header
          @back="router.push('/home')"
          style="height: 100%"
          title="工地高墙"
          subtitle="CSite High Wall"
        >
          <template #extra>
            <a-space>
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
          </template>
        </a-page-header>

        <template v-if="show_page_navigation">
          <a-menu mode="horizontal" :default-selected-keys="['1']">
            <a-menu-item key="1" @click="router.push('/home')"
              >工地墙</a-menu-item
            >
            <a-menu-item key="2" @click="router.push('/test')" disabled
              >个人页面 (未登录)</a-menu-item
            >
          </a-menu>
        </template>
      </a-space>
    </a-layout-header>
    <a-layout-content
      :style="{
        background: 'var(--color-fill-1)',
      }"
    >
      <RouterView style="height: 100%"> </RouterView>
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
  padding: 0px 0 0px 0;
}
</style>
