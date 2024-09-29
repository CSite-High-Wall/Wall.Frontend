<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { PublishExpression } from "../api";
import { Message } from "@arco-design/web-vue";
const router = useRouter();
const form = ref({
  title: "",
  content: "",
  anonymity: false,
});

const handleSubmit = async () => {
  var result = await PublishExpression(
    form.value.title,
    form.value.content,
    form.value.anonymity
  );

  Message.info(result.message);
  if (result.success) router.push("/home");
};
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
      贴上你想发表的内容
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
        v-model="form.content"
        placeholder="正文内容"
        show-word-limit
        :auto-size="{
          minRows: 10,
        }"
      />
    </a-space>

    <a-checkbox v-model="form.anonymity">
      <a-typography-text> 匿名发表 </a-typography-text>
    </a-checkbox>
    <a-divider></a-divider>

    <a-button
      style="border-radius: var(--border-radius-medium); font-size: medium"
      size="large"
      type="primary"
      @click="handleSubmit"
    >
      发表
    </a-button>
  </a-space>
</template>

<style></style>
