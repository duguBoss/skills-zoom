<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()
const showMobile = ref(false)

const navItems = [
  { path: '/', label: 'Skill 市场', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' },
  { path: '/bundles', label: '服务组合', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { path: '/submit', label: 'Skill 投稿', icon: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' },
  { path: '/favorites', label: '我的收藏', count: () => favoritesStore.favoritesCount, icon: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' },
]

const isActive = (path: string) => {
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
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
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path :d="item.icon" />
          </svg>
          {{ item.label }}
          <span v-if="item.count && item.count() > 0" class="badge">{{ item.count() }}</span>
        </router-link>
      </nav>

      <button class="menu-btn" @click="showMobile = !showMobile" :aria-label="showMobile ? '关闭菜单' : '打开菜单'">
        <span :class="['bar', { open: showMobile }]"></span>
        <span :class="['bar', { open: showMobile }]"></span>
        <span :class="['bar', { open: showMobile }]"></span>
      </button>
    </div>

    <transition name="slide">
      <div v-if="showMobile" class="mobile-nav">
        <div
          v-for="item in navItems"
          :key="item.path"
          :class="['mobile-link', { active: isActive(item.path) }]"
          @click="go(item.path)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path :d="item.icon" />
          </svg>
          {{ item.label }}
          <span v-if="item.count && item.count() > 0" class="badge">{{ item.count() }}</span>
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
  background: rgba(255,255,255,0.78);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--c-border);
}
.header-inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  display: flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;
}
.logo-mark {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.logo-text {
  font-size: 1.08rem;
  font-weight: 700;
  color: var(--c-text);
  letter-spacing: -0.3px;
}
.logo-accent {
  color: var(--c-primary);
}
.nav {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 13px;
  border-radius: 8px;
  font-size: 0.84rem;
  font-weight: 500;
  color: var(--c-text-secondary);
  transition: all var(--transition);
}
.nav-link:hover {
  color: var(--c-text);
  background: var(--c-primary-bg);
}
.nav-link.active {
  color: var(--c-primary);
  background: var(--c-primary-bg);
}
.badge {
  background: var(--c-primary);
  color: #fff;
  font-size: 0.66rem;
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
}
.bar {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--c-text-secondary);
  border-radius: 2px;
  transition: all var(--transition);
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
  border-top: 1px solid var(--c-border);
  padding: 8px 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: var(--c-surface);
}
.mobile-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 13px 14px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--c-text-secondary);
  cursor: pointer;
  transition: all var(--transition);
}
.mobile-link:hover,
.mobile-link.active {
  color: var(--c-primary);
  background: var(--c-primary-bg);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.22s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 768px) {
  .header-inner {
    padding: 0 14px;
    height: 54px;
  }
  .nav {
    display: none;
  }
  .menu-btn {
    display: flex;
  }
  .mobile-nav {
    padding: 6px 14px 14px;
  }
}
</style>
