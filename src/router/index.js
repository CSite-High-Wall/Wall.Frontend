import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue"
import About from "../pages/About.vue"
import Login from "../pages/Login.vue"
import { useUserStore } from "../stores/userStore.js"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/about",
      name: "About",
      component: About
    }
  ]
});
router.beforeEach((to,from) => {
  const userStore = useUserStore();
  if(!userStore.islogined && to.name!== 'Login')
    return { name: "Login" };
  else return true;
})
export default router;