import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Authentication from "@/helpers/authentication";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                protected: true,
            }
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
            meta: {
                protected: true,
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Authentication/LoginView.vue'),
        },
    ]
})

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    if (to.meta?.protected === true) {
        const isLoggedIn = Authentication.isAuthenticated();

        if (!isLoggedIn) {
            return '/login';
        }
    }
});

export default router
