<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()
const showMobile = ref(false)

const navItems = [
  { path: '/', label: '发现', icon: '🏠' },
  { path: '/favorites', label: '收藏', icon: '⭐', badge: () => favoritesStore.favoritesCount },
  { path: '/submit-form', label: '投稿', icon: '📝' },
  { path: '/submit', label: '说明', icon: '📋' },
]

function go(path: string) {
  router.push(path)
  showMobile.value = false
}
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <router-link to="/" class="logo">
        <span class="logo-icon">🔍</span>
        <span class="logo-text">Skills Zoom</span>
      </router-link>

      <nav class="nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="['nav-link', { active: route.path === item.path }]"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
          <span v-if="item.badge && item.badge() > 0" class="badge">{{ item.badge() }}</span>
        </router-link>
      </nav>

      <button class="menu-btn" @click="showMobile = !showMobile">
        <span :class="['menu-icon', { open: showMobile }]"></span>
      </button>
    </div>

    <div v-if="showMobile" class="mobile-nav">
      <div
        v-for="item in navItems"
        :key="item.path"
        :class="['mobile-link', { active: route.path === item.path }]"
        @click="go(item.path)"
      >
        <span>{{ item.icon }}</span>
        <span>{{ item.label }}</span>
        <span v-if="item.badge && item.badge() > 0" class="badge">{{ item.badge() }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.85);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--sz-border);
}
.header-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--sz-text);
  flex-shrink: 0;
}
.logo-icon {
  font-size: 1.2rem;
}
.nav {
  display: flex;
  align-items: center;
  gap: 2px;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--sz-text-secondary);
  transition: all var(--sz-transition);
}
.nav-link:hover {
  color: var(--sz-text);
  background: var(--sz-bg-hover);
}
.nav-link.active {
  color: var(--sz-primary);
  background: var(--sz-primary-bg);
}
.nav-icon {
  font-size: 0.9rem;
}
.badge {
  background: var(--sz-primary);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 10px;
  line-height: 1.5;
}
.menu-btn {
  display: none;
  background: none;
  border: none;
  padding: 8px;
}
.menu-icon {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--sz-text-secondary);
  border-radius: 1px;
  position: relative;
  transition: all 0.3s;
}
.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 2px;
  background: var(--sz-text-secondary);
  border-radius: 1px;
  transition: all 0.3s;
}
.menu-icon::before { top: -6px; }
.menu-icon::after { top: 6px; }
.menu-icon.open {
  background: transparent;
}
.menu-icon.open::before {
  top: 0;
  transform: rotate(45deg);
}
.menu-icon.open::after {
  top: 0;
  transform: rotate(-45deg);
}
.mobile-nav {
  border-top: 1px solid var(--sz-border);
  padding: 8px 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.mobile-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 12px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--sz-text-secondary);
  cursor: pointer;
  transition: all var(--sz-transition);
}
.mobile-link:hover,
.mobile-link.active {
  color: var(--sz-primary);
  background: var(--sz-primary-bg);
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }
  .menu-btn {
    display: block;
  }
}
</style>