<script setup lang="ts">
import { ref,onMounted } from "vue";
import { useRouter } from "vue-router";
import instance from "../api.ts";
import Cookie from "../cookie.ts";

const form = ref({
  username: "",
  password: "",
});

const router = useRouter();

onMounted(() => {
  if(Cookie.getCookie("token")!='') {
    instance({
      url: "/api/authserver/validate",
      method: "post",
      data: {
        user_id: Cookie.getCookie("userid"),
        access_token: Cookie.getCookie("token")
      }
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  }
})

const handleSubmit = () => {
  console.log(form.value);
  instance({
    url: "/api/authserver/authenticate",
    method: "post",
    data: {
      user_name: form.value.username,
      password: form.value.password,
    }
  }).then(res => {
    alert(res.data.message);
    console.log(res.data);
    Cookie.setCookie("userid", res.data.data.user_id, res.data.data.expire_time);
    Cookie.setCookie("token", res.data.data.access_token, res.data.data.expire_time);
    router.push("/home");
  }).catch(err => {
    alert(err.response.data.message);
  })
};
</script>

<template>
  <div style="display: table; margin: 0 auto; width: 80%; max-width: 400px; ">
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
              padding: 3px 10px 3px 10px;"
              @click="router.push('/register')">
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
