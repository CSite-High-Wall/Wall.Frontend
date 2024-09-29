<script setup lang="ts">
import { Waterfall } from "vue-waterfall-plugin-next";
import { useRouter } from "vue-router";
import { FetchAllExpression } from "../api";
import { onMounted, ref } from "vue";

import "vue-waterfall-plugin-next/dist/style.css";

const router = useRouter();

var dataArray = ref();

onMounted(async () => {
  var result = await FetchAllExpression();

  if (result.success) {
    dataArray.value = result.data;
    console.log(result);
  }
});
</script>

<template>
  <main>
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
        <a-card style="border-radius: var(--border-radius-large)">
          <template #actions>
            <span class="action"> <IconShareInternal /></span>
            <span class="action"> <IconMessage /></span>
            <span class="action"> <icon-stop /></span>
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
                <a-avatar :size="24" :style="{ marginRight: '8px' }">
                  A
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
