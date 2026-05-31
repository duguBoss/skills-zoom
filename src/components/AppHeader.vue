<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import { HomeFilled, StarFilled, EditPen, Document, Close } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()
const activeIndex = computed(() => route.path)
const mobileMenuOpen = ref(false)

function navigate(path: string) {
  router.push(path)
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="brand">
        <span class="brand-icon">⚡</span>
        <span class="brand-title">Skills Zoom</span>
      </router-link>

      <nav class="nav-desktop">
        <router-link to="/" :class="['nav-item', { active: activeIndex === '/' }]">
          <el-icon><HomeFilled /></el-icon>
          <span>发现</span>
        </router-link>
        <router-link to="/favorites" :class="['nav-item', { active: activeIndex === '/favorites' }]">
          <el-icon><StarFilled /></el-icon>
          <span>收藏</span>
          <span v-if="favoritesStore.favoritesCount > 0" class="badge">{{ favoritesStore.favoritesCount }}</span>
        </router-link>
        <router-link to="/submit-form" :class="['nav-item', { active: activeIndex === '/submit-form' }]">
          <el-icon><EditPen /></el-icon>
          <span>投稿</span>
        </router-link>
        <router-link to="/submit" :class="['nav-item', { active: activeIndex === '/submit' }]">
          <el-icon><Document /></el-icon>
          <span>说明</span>
        </router-link>
      </nav>

      <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
        <span :class="['hamburger', { open: mobileMenuOpen }]">
          <span></span><span></span><span></span>
        </span>
      </button>
    </div>

    <Transition name="slide">
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <button class="mobile-close" @click="mobileMenuOpen = false">
          <el-icon :size="20"><Close /></el-icon>
        </button>
        <div
          :class="['mobile-nav-item', { active: activeIndex === '/' }]"
          @click="navigate('/')"
        >
          <el-icon><HomeFilled /></el-icon><span>发现</span>
        </div>
        <div
          :class="['mobile-nav-item', { active: activeIndex === '/favorites' }]"
          @click="navigate('/favorites')"
        >
          <el-icon><StarFilled /></el-icon><span>收藏</span>
          <span v-if="favoritesStore.favoritesCount > 0" class="badge">{{ favoritesStore.favoritesCount }}</span>
        </div>
        <div
          :class="['mobile-nav-item', { active: activeIndex === '/submit-form' }]"
          @click="navigate('/submit-form')"
        >
          <el-icon><EditPen /></el-icon><span>投稿</span>
        </div>
        <div
          :class="['mobile-nav-item', { active: activeIndex === '/submit' }]"
          @click="navigate('/submit')"
        >
          <el-icon><Document /></el-icon><span>说明</span>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(9, 9, 11, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--sz-border);
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--sz-text);
  flex-shrink: 0;
}
.brand-icon {
  font-size: 22px;
}
.brand-title {
  font-size: 18px;
  font-weight: 700;
  background: var(--sz-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.3px;
}
.nav-desktop {
  display: flex;
  align-items: center;
  gap: 2px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: var(--sz-radius-sm);
  color: var(--sz-text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  position: relative;
}
.nav-item:hover {
  color: var(--sz-text);
  background: var(--sz-bg-card);
}
.nav-item.active {
  color: var(--sz-primary-light);
  background: rgba(124, 58, 237, 0.1);
}
.badge {
  background: var(--sz-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 10px;
  line-height: 1.5;
}
.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}
.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 22px;
}
.hamburger span {
  display: block;
  height: 2px;
  background: var(--sz-text-secondary);
  border-radius: 1px;
  transition: all 0.3s;
}
.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}
.mobile-menu {
  padding: 16px 20px 24px;
  border-top: 1px solid var(--sz-border);
  position: relative;
}
.mobile-close {
  position: absolute;
  top: 12px;
  right: 20px;
  background: none;
  border: none;
  color: var(--sz-text-secondary);
  cursor: pointer;
  padding: 4px;
}
.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: var(--sz-radius-sm);
  color: var(--sz-text-secondary);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.mobile-nav-item:hover,
.mobile-nav-item.active {
  color: var(--sz-primary-light);
  background: rgba(124, 58, 237, 0.1);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }
  .mobile-toggle {
    display: block;
  }
  .brand-title {
    font-size: 16px;
  }
}
</style>
