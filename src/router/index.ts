import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Login from "../views/login.vue";
import Register from "../views/register.vue";
import Profile from "../views/profile.vue";

import Expression from "../views/expression.vue";
import Publish from "../views/publish.vue"
import EditExpression from "../views/edit-expression.vue";
import ChangePassword from "../views/change-password.vue";
import { AuthState } from "../stores/auth.ts";

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
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    component: ChangePassword
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  if( to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Home' && to.name !== 'Expression' )
  {
    if( !AuthState.value )
      return { name: 'Login' }
  }
});

export default router;
