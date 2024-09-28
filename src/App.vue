<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterView } from "vue-router";
import Cookie from "./cookie.ts";

const is_home = ref(false);

const router = useRouter();
router.beforeEach((to) => {
  is_home.value = to.path == "/home";
});

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.body.setAttribute(
  "arco-theme",
  prefersDark.valueOf() ? "dark" : "light"
);

function test() {
  console.log(Cookie.getCookie("userid"));
}
</script>

<template>
  <button @click="test()">test</button>
  <a-layout style="height: 100%" :style="{ background: 'var(--color-fill-2)' }">
    <a-layout-header
      :style="{
        padding: is_home ? '16px 0 0px 0' : '16px 0 16px 0',
        background: 'var(--color-bg-2)',
      }"
    >
      <a-space :size="0" direction="vertical" fill>
        <a-page-header
          @back="router.push('/home')"
          style="height: 100%"
          title="工地高墙"
          subtitle="CSite High Wall"
          :show-back="!is_home"
        >
          <template #extra>
            <a-space class="button-area">
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

        <template v-if="is_home">
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
    <a-layout-footer
      style="padding: 10px 45px"
      :style="{ background: 'var(--color-bg-2)' }"
    >
      <a-space :size="10">
        <a-typography-text style="font-size: small" type="secondary">
          © 2024 CSite High Wall
        </a-typography-text>
        <a-typography-text code>
          https://github.com/CSite-High-Wall/
        </a-typography-text>
      </a-space>
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.arco-page-header {
  padding: 0px 10px 00px 10px;
}

.button-area {
  margin: 10px 0px 0px 0px;
}
@media (min-width: 429px) {
  .button-area {
    margin: 0px 0px 0px 0px;
  }
}
</style>
