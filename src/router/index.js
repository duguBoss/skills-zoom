import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SubmitView from '../views/SubmitView.vue';
import SubmitFormView from '../views/SubmitFormView.vue';
import SkillDetailView from '../views/SkillDetailView.vue';
import FavoritesView from '../views/FavoritesView.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/skill/:id',
            name: 'skill-detail',
            component: SkillDetailView,
        },
        {
            path: '/submit',
            name: 'submit',
            component: SubmitView,
        },
        {
            path: '/submit-form',
            name: 'submit-form',
            component: SubmitFormView,
        },
        {
            path: '/favorites',
            name: 'favorites',
            component: FavoritesView,
        },
    ],
});
export default router;
