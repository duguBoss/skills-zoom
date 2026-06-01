import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BundleView from '../views/BundleView.vue'
import BundleDetailView from '../views/BundleDetailView.vue'
import SubmitFormView from '../views/SubmitFormView.vue'
import SkillDetailView from '../views/SkillDetailView.vue'
import FavoritesView from '../views/FavoritesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Skill 市场' }
    },
    {
      path: '/skill/:id',
      name: 'skill-detail',
      component: SkillDetailView,
      meta: { title: 'Skill 详情' }
    },
    {
      path: '/bundles',
      name: 'bundles',
      component: BundleView,
      meta: { title: 'Skill 套餐' }
    },
    {
      path: '/bundle/:id',
      name: 'bundle-detail',
      component: BundleDetailView,
      meta: { title: '套餐详情' }
    },
    {
      path: '/submit',
      name: 'submit',
      component: SubmitFormView,
      meta: { title: 'Skill 投稿' }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
      meta: { title: '我的收藏' }
    },
  ],
})

export default router
