<script setup lang="ts">
import { Waterfall } from "vue-waterfall-plugin-next";
import { useRouter } from "vue-router";
import { AddUserIntoBlacklist, FetchAllExpression } from "../api";
import { Expression } from "../types.ts";
import { onMounted, ref } from "vue";

import "vue-waterfall-plugin-next/dist/style.css";
import { UserId } from "../stores/auth.ts";
import { Message } from "@arco-design/web-vue";

const currentLocation = location;
const router = useRouter();
const dataArray = ref<Expression[] | null>(null);

onMounted(async () => {
  var result = await FetchAllExpression();

  if (result.success) {
    dataArray.value = result.data as Expression[];
  }
});
</script>

<template>
  <main>
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
              <span class="action"> <IconShareInternal /> 分享 </span>
              <span
                class="action"
                v-if="item.user_id != UserId"
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
                <IconStop /> 屏蔽
              </span>
            </template>
            <template #cover>
              <!-- <div
              :style="{
                height: '204px',
                overflow: 'hidden',
              }"
            >
              <img
                style="border-radius: 8px"
                :style="{ width: '100%' }"
                alt="dessert"
                src="https://picsum.photos/200"
              />
            </div> -->
            </template>
            <a-card-meta :hoverable="true" :description="item.content">
              <template #title>
                <a-link
                  style="font-weight: 600; font-size: large"
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
                  >{{ item.title }}</a-link
                >
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
                      max-width: 90px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      font-weight: 550;
                    "
                    >{{ item.user_name }}</a-typography-text
                  >
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </template>
      </Waterfall>
    </template>
    <template v-if="dataArray == null || dataArray.length == 0">
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
