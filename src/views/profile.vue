<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  AuthState,
  AvatarUrl,
  ClearUserInfo,
  LastLoginTime,
  useAuthStore,
  UserName,
} from "../stores/auth";
import {
  FetchUserBlacklist,
  FetchUserExpression,
  RemoveUserFromBlacklist,
  SignOut,
  UploadUserAvatarUrl,
  Validate,
} from "../api";
import { BlacklistItem, Expression } from "../types";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";

const authStore = useAuthStore();
const router = useRouter();
const currentLocation = location;

const editAvatarDialogVisible = ref(false);
const expressionArray = ref<Expression[] | null>(null);
const blacklistItemArray = ref<BlacklistItem[] | null>(null);

const dialogForm = ref({
  url: "",
});

onMounted(async () => {
  if (!(await Validate())) router.push("/login");

  var result = await FetchUserExpression();

  if (result.success) expressionArray.value = result.data as Expression[];
  else Message.info(result.data as string);

  var blacklistResult = await FetchUserBlacklist();

  if (blacklistResult.success)
    blacklistItemArray.value = blacklistResult.data as BlacklistItem[];
  else Message.info(blacklistResult.data as string);
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
      <a-space direction="vertical">
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
        <a-button
          style="border-radius: var(--border-radius-medium)"
          type="primary"
          @click="
            async () => {
              var result = await SignOut();
              Message.info(result.message);

              if (result.success) {
                ClearUserInfo();
                authStore.setAuthState(false);
                router.push('/home');
              }
            }
          "
        >
          登出当前账号
        </a-button>
      </a-space>

      <a-typography-title
        :heading="3"
        style="font-weight: 550; margin-top: 20px"
      >
        发过的墙贴
      </a-typography-title>
      <a-space style="width: 100%" direction="vertical" fill>
        <a-card
          v-for="item in expressionArray"
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
        <template v-if="expressionArray == null || expressionArray.length == 0">
          <a-empty> 还没有发表过任何东西 </a-empty>
        </template>
      </a-space>
      <a-typography-title
        :heading="3"
        style="font-weight: 550; margin-top: 20px"
      >
        已屏蔽用户
      </a-typography-title>
      <a-space style="width: 100%" direction="vertical" fill>
        <a-card
          v-for="item in blacklistItemArray"
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
                <div
                  :style="{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#1D2129',
                  }"
                >
                  <a-avatar
                    :imageUrl="item.blocked_user_avatar_url"
                    :size="24"
                    :style="{ marginRight: '8px' }"
                  >
                    <IconUser v-if="item.blocked_user_avatar_url == ''" />
                  </a-avatar>
                  <a-typography-text
                    style="
                      max-width: 90px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      font-weight: 550;
                    "
                    >{{ item.blocked_user_name }}</a-typography-text
                  >
                </div>
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
                  async () => {
                    var result = await RemoveUserFromBlacklist(item.blocked_user_id);
                    Message.info(result.message);
                    
                    if (result.success) {
                      currentLocation.reload();
                    }
                  }
                "
              >移除
              <template #icon>
                <IconDelete /> </template
            ></a-link>
          </div>
        </a-card>
        <template
          v-if="blacklistItemArray == null || blacklistItemArray.length == 0"
        >
          <a-empty> 还没有屏蔽过任何人 </a-empty>
        </template>
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
        <a-input id="input" allowClear v-model="dialogForm.url" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
