<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import { Authenticate } from "../api.ts";
import { RefreshUserInfo, useAuthStore } from "../stores/auth.ts";

const form = ref({
  username: "",
  password: "",
});

const router = useRouter();
const authStore = useAuthStore();

const handleSubmit = async () => {
  var result = await Authenticate(form.value.username, form.value.password);
  Message.info(result.message);

  if (result.success) {
    await RefreshUserInfo()
    authStore.setAuthState(true);
    
    router.push("/home");
  }
};

</script>

<template>
  <div style="display: table; margin: 0 auto; width: 80%; max-width: 400px">
    <a-layout>
      <a-layout-header>
        <a-typography-title style="padding-bottom: 10px; font-weight: 550">
          登录账户
        </a-typography-title>
      </a-layout-header>
      <a-layout-content>
        <a-space style="width: 100%" :size="15" direction="vertical">
          <a-input
            size="large"
            v-model="form.username"
            placeholder="用户名"
            allow-clear
          />
          <a-input-password
            size="large"
            v-model="form.password"
            placeholder="密码"
            allow-clear
            @keyup.enter="handleSubmit"
          />
        </a-space>
      </a-layout-content>
      <a-layout-footer style="padding-top: 30px">
        <a-space direction="horizontal" :size="15">
          <a-button
            @click="handleSubmit"
            style="
              border-radius: var(--border-radius-medium);
              font-size: medium;
            "
            size="large"
            type="primary"
          >
            登录
          </a-button>
          <a-link
            size="large"
            style="
              font-size: medium;
              border-radius: var(--border-radius-medium);
              padding: 3px 10px 3px 10px;
            "
            @click="router.push('/register')"
          >
            没有帐户？转到注册
          </a-link>
        </a-space>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
.row-demo {
  text-align: center;
  height: 100px;
  line-height: 100px;
}
</style>
