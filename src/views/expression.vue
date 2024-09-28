<script setup lang="ts">
import { useRouter } from "vue-router";
import { AuthState } from "../stores/auth.ts";

const router = useRouter();
</script>

<template>
  <a-space
    :size="40"
    style="
      display: table;
      margin: 0 auto;
      padding: 40px;
      height: 100%;
      max-width: 800px;
    "
    direction="vertical"
  >
    <a-space direction="vertical" :size="0">
      <a-typography-title style="font-weight: 550; margin-top: 0px">
        Design system
      </a-typography-title>
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          color: '#1D2129',
        }"
      >
        <a-avatar :size="32" :style="{ marginRight: '8px' }"> A </a-avatar>
        <a-typography-text
          style="
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 550;
          "
          >username</a-typography-text
        >
      </div>
    </a-space>

    <a-typography-paragraph>
      A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process, or the result
      of that plan or specification in the form of a prototype, product or
      process. The verb to design expresses the process of developing a design.
      <br />
      <br />
      In some cases, the direct construction of an object without an explicit
      prior plan (such as in craftwork, some engineering, coding, and graphic
      design) may also be considered
    </a-typography-paragraph>

    <a-divider></a-divider>
    <a-comment
      align="right"
      avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
    >
      <template #actions>
        <a-link
        v-if="!AuthState"
          style="
            border-radius: var(--border-radius-medium);
            padding: 3px 10px 3px 10px;
          "
          @click="router.push('/login')"
        >
          回复请先登录
        </a-link>
        <a-button
          style="border-radius: var(--border-radius-medium)"
          type="primary"
          :disabled="!AuthState"
        >
          发表评论
        </a-button>
      </template>
      <template #content>
        <a-input placeholder="留下你的评论" />
      </template>
    </a-comment>
    <a-divider></a-divider>
    <a-typography-title style="font-weight: 550; margin: -10px 0" :heading="3">
      评论
    </a-typography-title>
    <a-comment
      align="right"
      author="Balzac"
      avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      content="A design is a plan or specification for the construction of an object
          or system or for the implementation of an activity or process, or the
          result of that plan or specification in the form of a prototype,
          product or process."
      datetime="1 hour"
    >
      <template #actions>
        <span class="action"> <IconMessage /> Reply </span>
      </template>
    </a-comment>
  </a-space>
</template>

<style>
.action {
  display: inline-block;
  padding: 1px 10px;
  color: var(--color-text-2);
  line-height: 24px;
  font-size: small;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.1s ease;
}
.action:hover {
  background: var(--color-fill-3);
}
</style>
