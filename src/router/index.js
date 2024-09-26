import { createRouter,createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import Test from '../views/test.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',    
        component: Register
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;