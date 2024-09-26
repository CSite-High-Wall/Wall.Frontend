import { createRouter,createWebHistory } from "vue-router";
import Home from "../views/home.vue"
import userInfo from "../views/userInfo.vue"
import Login from "../views/login.vue"
import myPreview from "../views/myPreview.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            name: "home",
            component: Home
        },
        {
            path: "/userInfo",
            name: "userInfo",
            component: userInfo
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/myPreview",
            name: "myPreview",
            component: myPreview
        }
    ]
});

export default router;