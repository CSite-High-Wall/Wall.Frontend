<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import { ChangePassword } from "../api.ts";
import { ClearUserInfo, useAuthStore } from "../stores/auth.ts";

const authStore = useAuthStore();

const form = ref({
  old_password: "",
  new_password: "",
  confirm_password: "",
});

const handleSubmit = async () => {
  var result = await ChangePassword(
    form.value.old_password,
    form.value.new_password
  );
  Message.info(result.message);
  if (result.success) {
    ClearUserInfo();
    authStore.setAuthState(false);
    router.push("/login");
  }
};
const router = useRouter();
</script>

<template>
  <div style="display: table; margin: 0 auto; width: 80%; max-width: 400px">
    <a-layout>
      <a-layout-header>
        <a-typography-title style="padding-bottom: 10px; font-weight: 550">
          修改账号密码
        </a-typography-title>
      </a-layout-header>
      <a-layout-content>
        <a-space style="width: 100%" :size="15" direction="vertical">
          <a-input-password
            size="large"
            v-model="form.old_password"
            placeholder="旧密码"
            allow-clear
          />
          <a-input-password
            size="large"
            v-model="form.new_password"
            placeholder="新密码"
            allow-clear
          />
          <a-input-password
            size="large"
            v-model="form.confirm_password"
            placeholder="确认新密码"
            allow-clear
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
            :disabled="
              form.old_password == '' ||
              form.new_password == '' ||
              form.confirm_password != form.new_password
            "
          >
            修改
          </a-button>
        </a-space>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
