<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  AuthState,
  AvatarUrl,
  ClearUserInfo,
  LastLoginTime,
  useAuthStore,
  NickName,
  UserName,
} from "../stores/auth";
import {
  EditNickName,
  FetchExpressionBlacklist,
  FetchUserBlacklist,
  FetchUserExpression,
  RemoveExpressionFromBlacklist,
  RemoveUserFromBlacklist,
  SignOut,
  UploadUserAvatar,
  Validate,
} from "../api";
import {
  BlacklistUserItem,
  BlacklistExpressionItem,
  Expression,
} from "../types";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";

const authStore = useAuthStore();
const router = useRouter();
const currentLocation = location;

const avatarFile = ref();
const uploadRef = ref();
const editAvatarDialogVisible = ref(false);
const expressionArray = ref<Expression[] | null>(null);
const UserBlacklist = ref<BlacklistUserItem[] | null>(null);
const ExpressionBlacklist = ref<BlacklistExpressionItem[] | null>(null);
const NickNameChangeVisible = ref(false);
const ChangedNickName = ref("");

onMounted(async () => {
  if (!AuthState.value || !(await Validate())) {
    router.push("/login");
  }

  var result = await FetchUserExpression();

  if (result.success) expressionArray.value = result.data as Expression[];
  else Message.info(result.data as string);

  var userBlacklistResult = await FetchUserBlacklist();

  if (userBlacklistResult.success)
    UserBlacklist.value = userBlacklistResult.data as BlacklistUserItem[];
  else Message.info(userBlacklistResult.data as string);

  var expressionBlacklistResult = await FetchExpressionBlacklist();

  if (expressionBlacklistResult.success)
    ExpressionBlacklist.value =
      expressionBlacklistResult.data as BlacklistExpressionItem[];
  else Message.info(expressionBlacklistResult.data as string);
});

const onChange = (_: any, currentFile: any) => {
  if (currentFile.file.size > 131072) {
    Message.info("不接受的文件大小，图片大小应小于 128 KB");
    return;
  }

  avatarFile.value = {
    ...currentFile,
  };
};
const ChangeNickNameClick = () => {
  NickNameChangeVisible.value = true;
  ChangedNickName.value = "";
};
const ChangeNickNameOk = async () => {
  if (ChangedNickName.value === "") {
    NickNameChangeVisible.value = false;
    Message.info("昵称不能为空");
    return;
  }

  var result = await EditNickName(ChangedNickName.value);
  Message.info(result.message);

  NickNameChangeVisible.value = false;

  if (result.success) {
    NickName.value = ChangedNickName.value;
    currentLocation.reload();
  }
};
const ChangeNickNameCancel = () => {
  NickNameChangeVisible.value = false;
};
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
          <div style="flex-direction: column; display: inline-flex">
            <a-typography-text
              style="
                font-size: large;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-weight: 550;
              "
              >{{ NickName }}</a-typography-text
            >
            <a-typography-text
              type="secondary"
              style="
                margin-top: -3px;
                font-size: smaller;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-weight: 550;
              "
              >{{ UserName }}</a-typography-text
            >
          </div>

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
      <a-space wrap>
        <a-button
          style="border-radius: var(--border-radius-medium)"
          type="primary"
          @click="ChangeNickNameClick"
          >修改用户昵称</a-button
        >
        <a-button
          style="border-radius: var(--border-radius-medium)"
          type="primary"
          @click="
            () => {
              editAvatarDialogVisible = true;
            }
          "
          >上传头像图片</a-button
        >
        <a-button
          style="border-radius: var(--border-radius-medium)"
          type="primary"
          @click="router.push('/change-password')"
          >修改账号密码</a-button
        >
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
          v-for="item in UserBlacklist"
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
                  var result = await RemoveUserFromBlacklist(
                    item.blocked_user_id
                  );
                  Message.info(result.message);

                  if (result.success) {
                    currentLocation.reload();
                  }
                }
              "
              >移除 <template #icon> <IconDelete /> </template
            ></a-link>
          </div>
        </a-card>
        <template v-if="UserBlacklist == null || UserBlacklist.length == 0">
          <a-empty> 还没有屏蔽过任何人 </a-empty>
        </template>
      </a-space>
      <a-typography-title
        :heading="3"
        style="font-weight: 550; margin-top: 20px"
      >
        已屏蔽帖子
      </a-typography-title>
      <a-space style="width: 100%" direction="vertical" fill>
        <a-card
          v-for="item in ExpressionBlacklist"
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
                  >{{ item.blocked_expression_title }}</a-typography-text
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
                async () => {
                  var result = await RemoveExpressionFromBlacklist(
                    item.blocked_expression_id
                  );
                  Message.info(result.message);

                  if (result.success) {
                    currentLocation.reload();
                  }
                }
              "
              >移除 <template #icon> <IconDelete /> </template
            ></a-link>
          </div>
        </a-card>
        <template
          v-if="ExpressionBlacklist == null || ExpressionBlacklist.length == 0"
        >
          <a-empty> 还没有屏蔽过任何帖子 </a-empty>
        </template>
      </a-space>
    </a-space>
  </a-space>
  <a-modal
    width="auto"
    v-model:visible="editAvatarDialogVisible"
    title="上传头像图片"
    @ok="
      async () => {
        var result = await UploadUserAvatar(avatarFile.file);
        Message.info(result.message);

        editAvatarDialogVisible = false;

        if (result.success) {
          currentLocation.reload();
        }
      }
    "
    @cancel="
      () => {
        editAvatarDialogVisible = false;
        avatarFile = undefined;
      }
    "
    :ok-button-props="{
      disabled: avatarFile == null || avatarFile.status != 'init',
    }"
  >
    <a-space direction="vertical" fill>
      <a-upload
        ref="uploadRef"
        action="http://localhost:8000/api/profile/avatar/upload"
        :auto-upload="false"
        :fileList="avatarFile ? [avatarFile] : []"
        :show-file-list="false"
        :show-remove-button="true"
        @change="onChange"
        style="width: 100%"
      >
        <template #upload-button>
          <div
            :class="`arco-upload-list-item${
              avatarFile && avatarFile.status === 'error'
                ? ' arco-upload-list-item-error'
                : ''
            }`"
            style="display: block; margin-top: 0"
          >
            <div
              class="arco-upload-list-picture custom-upload-avatar"
              v-if="avatarFile && avatarFile.url"
            >
              <img :src="avatarFile.url" />
              <div class="arco-upload-list-picture-mask">
                <IconEdit />
              </div>
              <a-progress
                v-if="
                  avatarFile.status === 'uploading' && avatarFile.percent < 100
                "
                :percent="avatarFile.percent"
                type="circle"
                size="large"
                :style="{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translateX(-50%) translateY(-50%)',
                }"
              />
            </div>
            <div class="arco-upload-picture-card" v-else>
              <div class="arco-upload-picture-card-text">
                <IconPlus />
                <div style="margin: 10px 10px 0px 10px; font-weight: 600">
                  上传图片文件<br />（文件小于 128 KB）
                </div>
              </div>
            </div>
          </div>
        </template>
      </a-upload>
      <a-button
        type="primary"
        v-if="avatarFile != null && avatarFile.status == 'init'"
        style="border-radius: var(--border-radius-medium)"
        @click="avatarFile = undefined"
      >
        <template #icon>
          <icon-delete />
        </template>
        <!-- Use the default slot to avoid extra spaces -->
        <template #default>移除已上传的文件</template>
      </a-button>
    </a-space>
  </a-modal>
  <a-modal
    width="auto"
    title="修改用户昵称"
    v-model:visible="NickNameChangeVisible"
    @ok="ChangeNickNameOk"
    @cancel="ChangeNickNameCancel"
    :ok-button-props="{
      disabled: ChangedNickName == '',
    }"
  >
    <a-input
      v-model="ChangedNickName"
      placeholder="请输入昵称"
      show-word-limit
      :max-length="30"
    />
  </a-modal>
</template>
