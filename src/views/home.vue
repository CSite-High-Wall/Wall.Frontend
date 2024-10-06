<script setup lang="ts">
import { Waterfall } from "vue-waterfall-plugin-next";
import { useRouter } from "vue-router";
import {
  AddExpressionIntoBlacklist,
  AddUserIntoBlacklist,
  FetchAllExpression,
} from "../api";
import { Expression } from "../types.ts";
import { onMounted, ref } from "vue";
import { AuthState, UserId } from "../stores/auth.ts";
import { Message } from "@arco-design/web-vue";

import useClipboard from "vue-clipboard3";
import "vue-waterfall-plugin-next/dist/style.css";

const router = useRouter();
const { toClipboard } = useClipboard();

const currentLocation = location;
const loading = ref(true);
const dataArray = ref<Expression[] | null>(null);

onMounted(async () => {
  var result = await FetchAllExpression();

  if (result.success) dataArray.value = result.data as Expression[];
  else Message.info(result.data as string);

  loading.value = false;
});
</script>

<template>
  <main>
    <a-spin
      v-if="loading"
      style="width: 100%"
      :size="32"
      tip="加载中，请稍后"
    />
    <template v-if="dataArray != null">
      <Waterfall
        style="background-color: transparent"
        :animationDuration="0.1"
        v-bind:list="dataArray"
        :width="400"
        :animationDelay="0"
        :breakpoints="{
          1400: {
            rowPerView: 3,
          },
          1200: {
            rowPerView: 2,
          },
          1000: {
            rowPerView: 1,
          },
        }"
      >
        <template #default="{ item }">
          <a-card hoverable style="border-radius: var(--border-radius-large)">
            <template #actions>
              <span
                class="action"
                @click="
                  async () => {
                    await toClipboard(
                      `${currentLocation.host}/expression?expression_id=${item.expression_id}`
                    );
                    Message.info('已复制分享链接');
                  }
                "
              >
                <IconShareInternal /> 分享
              </span>
              <a-popover
                style="padding: 0"
                position="br"
                v-if="AuthState && item.user_id != UserId"
              >
                <span class="action"> <IconStop /> 屏蔽 </span>
                <template #content>
                  <a-space direction="vertical">
                    <span
                      class="action"
                      v-if="
                        item.user_id !=
                          '00000000-0000-0000-0000-000000000000' &&
                        item.user_id != UserId
                      "
                      @click="
                        async () => {
                          var result = await AddUserIntoBlacklist(item.user_id);
                          Message.info(result.message);

                          if (result.success) {
                            currentLocation.reload();
                          }
                        }
                      "
                    >
                      <IconStop /> 屏蔽此人
                    </span>
                    <span
                      class="action"
                      @click="
                        async () => {
                          var result = await AddExpressionIntoBlacklist(
                            item.expression_id
                          );
                          Message.info(result.message);

                          if (result.success) {
                            currentLocation.reload();
                          }
                        }
                      "
                    >
                      <IconStop /> 屏蔽此贴
                    </span>
                  </a-space>
                </template>
              </a-popover>
            </template>
            <a-card-meta :hoverable="true">
              <template #title>
                <a-link
                  style="
                    font-weight: 600;
                    font-size: large;
                    text-wrap: wrap;
                    max-lines: 1;
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
                >
                  {{ item.title }}
                </a-link>
              </template>
              <template #avatar>
                <div
                  :style="{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#1D2129',
                  }"
                >
                  <a-avatar
                    :imageUrl="item.avatar_url"
                    :size="24"
                    :style="{ marginRight: '8px' }"
                  >
                    <IconUser v-if="item.avatar_url == ''" />
                  </a-avatar>
                  <a-typography-text
                    style="
                      max-width: 150px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      font-weight: 550;
                    "
                    >{{ item.user_name }}</a-typography-text
                  >
                </div>
              </template>
              <template #description>
                <a-typography-paragraph
                  :ellipsis="{
                    rows: 4,
                    showTooltip: true,
                  }"
                >
                  {{ item.content }}
                </a-typography-paragraph>
              </template>
            </a-card-meta>
          </a-card>
        </template>
      </Waterfall>
    </template>
    <template v-if="!loading && (dataArray == null || dataArray.length == 0)">
      <a-empty> 墙上还没有东西 </a-empty>
    </template>
  </main>
</template>

<style scoped>
main {
  padding: 20px;
}

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

.animate__animated {
  animation-fill-mode: both;
  animation-duration: 0.1s;
}
</style>
