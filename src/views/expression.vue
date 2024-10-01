<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { AuthState, AvatarUrl, UserId } from "../stores/auth.ts";
import { onMounted, ref } from "vue";
import {
  DeleteExpression,
  DeleteReview,
  FetchReviewOfExpression,
  FetchTargetExpression,
  PublishReview,
} from "../api.ts";
import { Message } from "@arco-design/web-vue";
import { Expression, Review } from "../types.ts";

const currentLocation = location;

const router = useRouter();
const route = useRoute();
const expression = ref<Expression | null>(null);
const reviewArray = ref<Review[] | null>(null);

onMounted(async () => {
  var result = await FetchTargetExpression(String(route.query?.expression_id));

  if (result.success) expression.value = result.data as Expression;
  else Message.info(result.data);

  var reviewsResult = await FetchReviewOfExpression(
    String(route.query?.expression_id)
  );

  if (result.success) reviewArray.value = reviewsResult.data as Review[];
  else Message.info(result.data as string);
});

const reviewInput = ref("");

const handleSubmit = async () => {
  if (expression.value == null) return;

  var result = await PublishReview(
    expression.value.expression_id,
    reviewInput.value
  );

  Message.info(result.message);

  if (result.success) currentLocation.reload();
};

const deleteExpressionDialogVisible = ref(false);
const deleteReviewDialogVisible = ref(false);
const deleteReviewId = ref(-1);
</script>

<template>
  <a-space
    :size="0"
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
    <a-space direction="vertical" :size="0">
      <a-typography-title style="font-weight: 550; margin-top: 0px">
        {{ expression?.title }}
      </a-typography-title>
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          color: '#1D2129',
        }"
      >
        <a-avatar
          :imageUrl="expression?.avatar_url"
          :size="32"
          :style="{ marginRight: '8px' }"
        >
          <IconUser v-if="expression == null || expression.avatar_url == ''" />
        </a-avatar>
        <a-typography-text
          style="
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 550;
          "
          >{{ expression?.user_name }}</a-typography-text
        >
      </div>
    </a-space>

    <a-typography-paragraph style="margin-top: 20px">
      {{ expression?.content }}
    </a-typography-paragraph>

    <a-typography-paragraph type="secondary" style="margin-top: 40px">
      发表于：{{ expression?.time }}
    </a-typography-paragraph>

    <a-space v-if="expression?.user_id == UserId">
      <span
        class="action"
        @click="
          () => {
            router.push({
              path: '/edit-expression',
              query: {
                expression_id: expression!.expression_id,
              },
            });
          }
        "
      >
        <IconEdit /> 编辑该贴
      </span>
      <span
        class="action"
        @click="
          () => {
            deleteExpressionDialogVisible = true;
          }
        "
      >
        <IconDelete /> 删除该贴
      </span>
    </a-space>
    <a-divider></a-divider>
    <a-comment align="right">
      <template #avatar>
        <a-avatar
          :imageUrl="AvatarUrl"
          :size="32"
          :style="{ marginRight: '8px' }"
        >
          <IconUser v-if="AvatarUrl == ''" />
        </a-avatar>
      </template>
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
          :disabled="!AuthState || reviewInput == ''"
          @click="handleSubmit"
        >
          发表评论
        </a-button>
      </template>
      <template #content>
        <a-input v-model="reviewInput" placeholder="留下你的评论" />
      </template>
    </a-comment>
    <a-divider></a-divider>
    <a-typography-title style="font-weight: 550" :heading="3">
      评论
    </a-typography-title>
    <template v-if="reviewArray != null">
      <a-space :size="0" style="width: 100%" direction="vertical" fill>
        <a-comment
          v-for="item in reviewArray"
          style="margin-top: 20px"
          align="right"
          :author="item.user_name"
          :content="item.content"
          :datetime="item.created_at"
        >
          <template #avatar>
            <a-avatar
              :imageUrl="item.avatar_url"
              :size="32"
              :style="{ marginRight: '8px' }"
            >
              <IconUser v-if="item.avatar_url == ''" />
            </a-avatar>
          </template>
          <template #actions v-if="item.user_id == UserId">
            <span
              class="action"
              @click="
                () => {
                  deleteReviewId = item.review_id;
                  deleteReviewDialogVisible = true;
                }
              "
            >
              <IconDelete /> 删除评论
            </span>
          </template>
        </a-comment>
      </a-space>
    </template>
    <template v-if="reviewArray == null || reviewArray.length == 0">
      <a-empty> 暂无评论 </a-empty>
    </template>
  </a-space>

  <a-modal
    v-if="expression != null"
    width="auto"
    v-model:visible="deleteExpressionDialogVisible"
    @ok="
      async () => {
        var result = await DeleteExpression(expression!.expression_id);
        Message.info(result.message);

        deleteExpressionDialogVisible = false;

        if (result.success) router.push('/home');
      }
    "
    @cancel="
      () => {
        deleteExpressionDialogVisible = false;
      }
    "
  >
    <template #title> 删除该帖子 </template>
    <div>你确定要删除该帖子吗？</div>
  </a-modal>

  <a-modal
    v-if="expression != null"
    width="auto"
    v-model:visible="deleteReviewDialogVisible"
    @ok="
      async () => {
        if (deleteReviewId == -1) return;

        var result = await DeleteReview(deleteReviewId);
        Message.info(result.message);

        deleteReviewDialogVisible = false;
        if (result.success) currentLocation.reload();
      }
    "
    @cancel="
      () => {
        deleteReviewId = -1;
        deleteReviewDialogVisible = false;
      }
    "
  >
    <template #title> 删除该评论 </template>
    <div>你确定要删除该评论吗？</div>
  </a-modal>
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
