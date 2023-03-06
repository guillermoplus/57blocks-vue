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
            path: '/favorites',
            name: 'favorites',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/FavoritesView.vue'),
            meta: {
                protected: true,
            }
        },
        {
            path: '/detail/:name',
            name: 'detail',
            component: () => import('../views/DetailView.vue'),
            meta: {
                protected: true,
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Authentication/LoginView.vue'),
            meta: {
                isLoginPage: true
            }
        },
    ]
})

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const isLoggedIn = Authentication.isAuthenticated();
    if (to.meta?.isLoginPage === true && isLoggedIn) {
        return '/';
    }
    if (to.meta?.protected === true) {
        if (!isLoggedIn) {
            return '/login';
        }
    }
});

export default router
