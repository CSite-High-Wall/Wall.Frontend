<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AvatarUrl, LastLoginTime, UserName } from "../stores/auth";
import { FetchUserExpression, UploadUserAvatarUrl } from "../api";
import { Expression } from "../types";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";

const router = useRouter();
const currentLocation = location;

const editAvatarDialogVisible = ref(false);
const dataArray = ref<Expression[] | null>(null);
const dialogForm = ref({
  url: "",
});

onMounted(async () => {
  var result = await FetchUserExpression();

  if (result.success) {
    dataArray.value = result.data as Expression[];
  }
});
</script>

<template>
  <a-space
    :size="40"
    style="
      display: table;
      margin: 0 auto;
      padding: 40px;
      height: 100%;
      width: 100%;
      max-width: 800px;
    "
    direction="vertical"
    fill
  >
    <a-space style="width: 100%" direction="vertical" :size="20" fill>
      <a-typography-title style="font-weight: 550; margin-top: 0px">
        个人资料
      </a-typography-title>
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          color: '#1D2129',
        }"
      >
        <a-avatar
          :imageUrl="AvatarUrl"
          :size="64"
          :style="{ marginRight: '8px' }"
        >
          <IconUser v-if="AvatarUrl == ''" />
        </a-avatar>
        <a-space style="margin-left: 10px" direction="vertical" :size="0">
          <a-typography-text
            style="
              font-size: large;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-weight: 550;
            "
            >{{ UserName }}</a-typography-text
          >
          <a-typography-text
            type="secondary"
            style="
              font-size: smaller;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            "
            >上次登录: {{ LastLoginTime }}</a-typography-text
          >
        </a-space>
      </div>
      <a-space>
        <a-button
          @click="
            () => {
              editAvatarDialogVisible = true;
            }
          "
          style="border-radius: var(--border-radius-medium)"
          type="primary"
          >上传网络图片头像</a-button
        >
        <a-button style="border-radius: var(--border-radius-medium)" disabled
          >修改用户名</a-button
        >
      </a-space>

      <a-typography-title style="font-weight: 550; margin-top: 20px">
        发过的墙贴
      </a-typography-title>
      <a-space style="width: 100%" direction="vertical" fill>
        <a-card
          v-for="item in dataArray"
          style="width: 100%; border-radius: var(--border-radius-large)"
          hoverable
        >
          <div
            :style="{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }"
          >
            <span
              :style="{
                display: 'flex',
                alignItems: 'center',
                color: '#1D2129',
              }"
            >
              <a-space>
                <a-typography-text
                  style="
                    font-size: smaller;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  "
                  >{{ item.title }}</a-typography-text
                >
                <a-typography-text
                  style="
                    font-size: smaller;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  "
                  type="secondary"
                  >{{ item.time }}</a-typography-text
                >
              </a-space>
            </span>
            <a-link
              style="
                font-size: smaller;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              "
              @click="
                () => {
                  router.push({
                    path: '/expression',
                    query: {
                      expression_id: item.expression_id,
                    },
                  });
                }
              "
              icon
              >转到该贴</a-link
            >
          </div>
        </a-card>
      </a-space>
    </a-space>
  </a-space>
  <a-modal
    width="auto"
    v-model:visible="editAvatarDialogVisible"
    title="上传网络图片"
    @ok="
      async () => {
        var result = await UploadUserAvatarUrl(dialogForm.url);
        Message.info(result.message);

        editAvatarDialogVisible = false;

        if (result.success) {
          AvatarUrl = dialogForm.url;
          currentLocation.reload();
        }
      }
    "
    @cancel="
      () => {
        editAvatarDialogVisible = false;
      }
    "
    :ok-button-props="{
      disabled: dialogForm.url == '',
    }"
  >
    <a-form :model="dialogForm">
      <a-form-item field="url" label="Url">
        <a-input allowClear v-model="dialogForm.url" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
