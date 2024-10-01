<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterView } from "vue-router";
import { AuthState, AvatarUrl, UserName } from "./stores/auth.ts";

const router = useRouter();

const showNav = ref(
  location.pathname == "/home" ||
    location.pathname == "/publish" ||
    location.pathname == "/profile"
);
const navigationSelection = ref<string[] | null>();

switch (location.pathname) {
  case "/home":
    navigationSelection.value = ["1"];
    break;
  case "/publish":
    navigationSelection.value = ["2"];
    break;
  case "/profile":
    navigationSelection.value = ["3"];
    break;
}

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.body.setAttribute(
  "arco-theme",
  prefersDark.valueOf() ? "dark" : "light"
);

router.beforeEach((to) => {
  showNav.value =
    to.path == "/home" || to.path == "/publish" || to.path == "/profile";

  switch (to.path) {
    case "/home":
      navigationSelection.value = ["1"];
      break;
    case "/publish":
      navigationSelection.value = ["2"];
      break;
    case "/profile":
      navigationSelection.value = ["3"];
      break;
  }
});
</script>

<template>
  <a-layout style="height: 100%">
    <a-layout-header
      :style="{
        padding: showNav ? '16px 0 0px 0' : '16px 0 16px 0',
        background: 'var(--color-bg-2)',
      }"
    >
      <a-space :size="0" direction="vertical" fill>
        <a-page-header
          @back="router.push('/home')"
          style="height: 100%"
          title="工地高墙"
          subtitle="CSite High Wall"
          :show-back="!showNav"
        >
          <template v-if="!AuthState" #extra>
            <a-space class="button-area">
              <a-button
                style="border-radius: var(--border-radius-medium)"
                type="primary"
                @click="router.push('/login')"
                >登录</a-button
              >
              <a-button
                style="border-radius: var(--border-radius-medium)"
                type="secondary"
                @click="router.push('/register')"
                >注册</a-button
              >
            </a-space>
          </template>

          <template v-if="AuthState" #extra>
            <div
              :style="{
                display: 'flex',
                alignItems: 'center',
                color: '#1D2129',
              }"
            >
              <a-avatar
                :imageUrl="AvatarUrl"
                :size="28"
                :style="{ marginRight: '8px' }"
              >
                <IconUser v-if="AvatarUrl == ''" />
              </a-avatar>
              <a-typography-text
                style="
                  max-width: 90px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  font-weight: 550;
                "
                >{{ UserName }}</a-typography-text
              >
            </div>
          </template>
        </a-page-header>
        <template v-if="showNav">
          <a-menu
            :selected-keys="navigationSelection"
            mode="horizontal"
            :default-selected-keys="['1']"
          >
            <a-menu-item key="1" @click="router.push('/home')"
              >工地墙</a-menu-item
            >
            <a-menu-item
              key="2"
              @click="router.push('/publish')"
              :disabled="!AuthState"
              >贴东西</a-menu-item
            >
            <a-menu-item
              key="3"
              @click="router.push('/profile')"
              :disabled="!AuthState"
              >{{ AuthState ? "个人页面" : "个人页面 (未登录)" }}</a-menu-item
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

.avatar-area {
  margin-top: 0px;
}

@media (min-width: 429px) {
  .avatar-area {
    margin-top: 0px;
  }
}
</style>
