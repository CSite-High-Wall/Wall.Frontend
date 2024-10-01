import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Test from "../views/test.vue";
import Login from "../views/login.vue";
import Register from "../views/register.vue";
import Profile from "../views/profile.vue";

import Expression from "../views/expression.vue";
import Publish from "../views/publish.vue"
import EditExpression from "../views/edit-expression.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/expression",
    name: "Expression",
    component: Expression
  },
  {
    path: '/publish',
    name: 'Publish',
    component: Publish,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/edit-expression",
    name: "EditExpression",
    component: EditExpression
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
