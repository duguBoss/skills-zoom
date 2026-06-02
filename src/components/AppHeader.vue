<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()
const showMobile = ref(false)

const navItems = [
  { path: '/', label: 'Skill 市场' },
  { path: '/bundles', label: '服务组合' },
  { path: '/submit', label: 'Skill 投稿' },
  { path: '/favorites', label: '收藏', count: () => favoritesStore.favoritesCount },
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function go(path: string) {
  router.push(path)
  showMobile.value = false
}
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <router-link to="/" class="logo" @click="showMobile = false">
        <div class="logo-mark">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </div>
        <span class="logo-text">Skills<span class="logo-accent">Zoom</span></span>
      </router-link>

      <nav class="nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="['nav-link', { active: isActive(item.path) }]"
        >
          <span class="nav-label">{{ item.label }}</span>
          <span v-if="item.count && item.count() > 0" class="nav-badge">{{ item.count() }}</span>
          <span v-if="isActive(item.path)" class="nav-indicator"></span>
        </router-link>
      </nav>

      <button class="menu-btn" @click="showMobile = !showMobile" :aria-label="showMobile ? '关闭菜单' : '打开菜单'">
        <span :class="['bar', { open: showMobile }]"></span>
        <span :class="['bar', { open: showMobile }]"></span>
        <span :class="['bar', { open: showMobile }]"></span>
      </button>
    </div>

    <transition name="mobile">
      <div v-if="showMobile" class="mobile-nav">
        <div
          v-for="item in navItems"
          :key="item.path"
          :class="['mobile-link', { active: isActive(item.path) }]"
          @click="go(item.path)"
        >
          {{ item.label }}
          <span v-if="item.count && item.count() > 0" class="nav-badge">{{ item.count() }}</span>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--c-border-light);
}
.header-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 24px;
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.logo-mark {
  width: 36px;
  height: 36px;
  border-radius: var(--r-md);
  background: linear-gradient(135deg, var(--c-primary), #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.25);
}
.logo-text {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--c-text);
  letter-spacing: -0.5px;
}
.logo-accent {
  color: var(--c-primary);
}
.nav {
  display: flex;
  align-items: center;
  gap: 2px;
}
.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--r-md);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--c-text-secondary);
  transition: all var(--t-fast);
}
.nav-link:hover {
  color: var(--c-text);
  background: var(--c-primary-bg-soft);
}
.nav-link.active {
  color: var(--c-primary);
  background: var(--c-primary-bg);
}
.nav-indicator {
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 2.5px;
  border-radius: 2px;
  background: var(--c-primary);
}
.nav-badge {
  background: var(--c-primary);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  border-radius: var(--r-sm);
  transition: background var(--t-fast);
}
.menu-btn:hover {
  background: var(--c-primary-bg-soft);
}
.bar {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--c-text-secondary);
  border-radius: 2px;
  transition: all var(--t-base);
}
.bar.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.bar.open:nth-child(2) {
  opacity: 0;
}
.bar.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border-bottom: 1px solid var(--c-border-light);
  padding: 8px 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: var(--shadow-md);
}
.mobile-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 13px 16px;
  border-radius: var(--r-md);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--c-text-secondary);
  cursor: pointer;
  transition: all var(--t-fast);
}
.mobile-link:hover,
.mobile-link.active {
  color: var(--c-primary);
  background: var(--c-primary-bg);
}

.mobile-enter-active,
.mobile-leave-active {
  transition: all 0.22s ease;
}
.mobile-enter-from,
.mobile-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 768px) {
  .header-inner {
    padding: 0 16px;
    height: 56px;
  }
  .nav {
    display: none;
  }
  .menu-btn {
    display: flex;
  }
  .mobile-nav {
    padding: 6px 16px 14px;
  }
}
</style>
