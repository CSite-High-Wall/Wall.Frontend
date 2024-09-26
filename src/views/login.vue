<script setup>
import { ref } from "vue";

const form = ref({
  username: "",
  password: "",
});
const handleSubmit = () => {
  console.log(form.value);
};
</script>

<template>
  <div style="display: table; margin: 0 auto">
    <a-layout>
      <a-layout-header>
        <a-typography-title style="padding-bottom: 10px; font-weight: 550">
          登录账户
        </a-typography-title>
      </a-layout-header>
      <a-layout-content>
        <a-space style="min-width: 360px" :size="15" direction="vertical">
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
          />
        </a-space>
      </a-layout-content>
      <a-layout-footer style="padding-top: 30px">
        <a-space direction="horizontal" :size="15">
          <a-button
            @click="handleSubmit"
            style="border-radius: var(--border-radius-medium)"
            size="large"
            type="primary"
          >
            <a-typography-text style="font-size: medium">
              登录
            </a-typography-text>
          </a-button>
          <a-link
            size="large"
            style="
              font-size: medium;
              border-radius: var(--border-radius-medium);
              padding: 3px 10px 3px 10px;
            "
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

#register {
  border: 2px solid black;
  padding-top: 1px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 40px;
  display: inline-block;
}
</style>
