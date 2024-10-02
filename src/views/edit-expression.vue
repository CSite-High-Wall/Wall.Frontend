<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { EditExpresssion, FetchTargetExpression } from "../api";
import { Message } from "@arco-design/web-vue";
import { Expression } from "../types";
import { AuthState } from "../stores/auth";

const router = useRouter();
const route = useRoute();
var expression: Expression;

const form = ref({
  title: "",
  content: "",
});

const handleSubmit = async () => {
  var result = await EditExpresssion(
    expression.expression_id,
    form.value.title,
    form.value.content
  );
  Message.info(result.message);
  if (result.success) {
    router.push({
      path: "/expression",
      query: {
        expression_id: expression.expression_id,
      },
    });
  }
};

onMounted(async () => {
  if (!AuthState.value) {
    router.push("/login");
    return
  }

  var result = await FetchTargetExpression(Number(route.query?.expression_id));

  if (result.success) {
    expression = result.data as Expression;

    form.value.title = expression.title;
    form.value.content = expression.content;
  } else Message.info(result.data);
});
</script>

<template>
  <a-space
    :size="15"
    style="
      display: table;
      margin: 0 auto;
      padding: 40px;
      height: 100%;
      max-width: 800px;
      width: 100%;
    "
    direction="vertical"
  >
    <a-typography-title
      :heading="3"
      style="margin: auto; font-weight: 550; margin-top: 0px"
    >
      修改帖子
    </a-typography-title>

    <a-row style="margin-top: 30px" class="grid-demo">
      <a-col
        flex="50px"
        style="
          display: flex;
          align-items: center;
          align-content: center;
          justify-content: center;
        "
      >
        <a-typography-title
          :heading="4"
          style="
            display: block;
            margin: 0 auto;
            font-weight: 550;
            margin-left: 0;
            margin-top: 1px;
          "
        >
          标题
        </a-typography-title>
      </a-col>
      <a-col flex="15px"> </a-col>
      <a-col flex="auto">
        <a-layout-content style="display: block; margin: 0 auto">
          <a-input
            v-model="form.title"
            size="large"
            placeholder="标题内容"
            allow-clear
          />
        </a-layout-content>
      </a-col>
    </a-row>

    <a-space direction="vertical" :size="10" fill>
      <a-typography-title
        :heading="4"
        style="
          display: block;
          margin: 0 auto;
          font-weight: 550;
          margin-left: 0;
          margin-top: -4px;
        "
      >
        正文
      </a-typography-title>
      <a-textarea
        :max-length="800"
        v-model="form.content"
        placeholder="正文内容"
        show-word-limit
        :auto-size="{
          minRows: 10,
        }"
      />
    </a-space>
    <a-divider></a-divider>
    <a-space>
      <a-button
        :disabled="form.title == '' || form.content == ''"
        style="border-radius: var(--border-radius-medium); font-size: medium"
        size="large"
        type="primary"
        @click="handleSubmit"
      >
        修改
      </a-button>
      <a-button
        style="border-radius: var(--border-radius-medium); font-size: medium"
        size="large"
        type="secondary"
        @click="
          () => {
            router.push({
              path: '/expression',
              query: {
                expression_id: expression.expression_id,
              },
            });
          }
        "
      >
        取消
      </a-button>
    </a-space>
  </a-space>
</template>
