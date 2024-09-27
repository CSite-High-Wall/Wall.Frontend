<script setup lang="ts">
import {  Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";

const dataArray = [
  {
    title: "Lorem ipsum dolor sit amet.",
    content:
      "Lorem ipsum dolor sit amet. Nam quasi earum ut quisquam fugit et quidem minima et incidunt maiores quo rerum sunt. Et dolorem dolorem ea quam rerum et accusantium fugiat non voluptatem cupiditate quo quae ipsa.",
  },
  {
    title: "Lorem ipsum dolor sit amet.",
    content:
      "Cum explicabo iusto sed reiciendis nesciunt eum voluptatem sint ut sint blanditiis in error exercitationem. Qui nemo sequi sit nisi quia non corrupti rerum qui velit omnis. Est nisi quasi aut error autem et sint adipisci. Est cumque obcaecati id sequi iure ad neque obcaecati qui alias reiciendis non maiores commodi ad inventore nihil!",
  },
  {
    title: "Lorem ipsum dolor sit amet.",
    content:
      "Ea illo dolor vel quasi dolores aut placeat velit ut voluptatem maxime vel incidunt sunt ut itaque labore. Ut quaerat omnis ut assumenda molestiae qui quia voluptate ut odio dolores. Id magni expedita quo nulla rerum vel commodi laudantium est omnis ipsa sed sunt mollitia ut temporibus tempore et fugiat aliquid. Est doloremque assumenda est suscipit dolores est accusantium commodi.",
  },
  {
    title: "Lorem ipsum dolor sit amet.",
    content:
      "LSed doloribus omnis et iusto molestias ab itaque odit aut libero molestiae ut tempora odit non harum neque. Et dolores veniam qui fuga laborum sed reiciendis numquam. Et enim fugit et porro impedit et voluptate consequuntur sit sint delectus ea alias veniam aut nulla blanditiis 33 tenetur voluptatum.",
  },
  {
    title: "Lorem ipsum dolor sit amet.",
    content:
      "Ab galisum ullam cum autem suscipit qui commodi facere aut voluptatem praesentium! Qui eaque vitae sed sunt quidem ab tenetur culpa ut totam dolor ut totam dolor ea ducimus laboriosam. Et eligendi voluptas eum enim dolorem ut facilis dolores eos voluptas eligendi sed harum amet sit quibusdam recusandae ut nesciunt molestias.",
  },

  {
    title: "Lorem ipsum dolor sit amet.",
    content:
      "Lorem ipsum dolor sit amet. Nam quasi earum ut quisquam fugit et quidem minima et incidunt maiores quo rerum sunt. Et dolorem dolorem ea quam rerum et accusantium fugiat non voluptatem cupiditate quo quae ipsa.",
  },
  {
    title: "Lorem ipsum dolor sit amet.",
    content:
      "Lorem ipsum dolor sit amet. Ut quod enim et pariatur deserunt vel nobis provident. Qui nobis galisum ut magni iste et veritatis quos.",
  },
  {
    title: "Lorem ipsum dolor sit amet.",
    content:
      "Rem voluptas nulla non beatae maxime aut optio voluptate et architecto dolor qui obcaecati veritatis ut iste atque sed temporibus odit. Qui libero laudantium id dolor internos sit dolores quos aut delectus quae et molestias molestiae? Non tempora sequi qui perspiciatis quasi vel vero blanditiis est voluptatum consectetur quo voluptas velit in excepturi rerum qui voluptas magnam.",
  },
  {
    title: "Lorem ipsum dolor sit amet.",
    content:
      "Et quidem labore qui voluptatem temporibus hic velit vitae et quam illum quo deleniti esse aut iusto deserunt. At quasi ratione in dolore fugiat nam galisum nesciunt eum quia libero est iure fugit ad rerum vitae.",
  },
  {
    title: "Lorem ipsum dolor sit amet.",
    content:
      "Lorem ipsum dolor sit amet. Et voluptas facere quo optio alias ad internos voluptas aut sint odit a nostrum ducimus qui quibusdam reprehenderit in quia distinctio. Id eaque sequi 33 dolorum consectetur vel enim nihil? In ullam suscipit nam blanditiis ipsum sit dolor libero. Et perferendis sapiente nam quia beatae in dolore dolor et optio harum vel tempora eligendi ut debitis vitae et magni totam.",
  },
  {
    title: "Lorem ipsum dolor sit amet.",
    content:
      "Eum voluptas quia sit natus inventore ea voluptatibus reiciendis. Ea dolorum sint et iste praesentium qui debitis inventore. Aut necessitatibus nihil eum odio galisum ad dolore necessitatibus qui reiciendis magni hic aperiam eligendi ut quas iusto.",
  },
];
</script>

<template>
  <main>
    <Waterfall
      style="background-color: transparent"
      :animationDuration="0.1"
      :list="dataArray"
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
            <span class="action"> <IconShareInternal /> 分享</span>
            <span class="action"> <IconMessage /> 回复</span>
            <span class="action"> <icon-stop /> 不看此人</span>
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
              <a-link style="font-weight: 600; font-size: large" href="link">{{
                item.title
              }}</a-link>
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
                <a-typography-text style="max-width: 90px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-weight: 550;">username</a-typography-text>
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
