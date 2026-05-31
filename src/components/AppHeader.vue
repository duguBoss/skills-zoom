<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import { HomeFilled, Document, Collection, StarFilled, EditPen } from '@element-plus/icons-vue'

const route = useRoute()
const favoritesStore = useFavoritesStore()
const activeIndex = computed(() => route.path)
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="brand">
        <span class="brand-icon">⚡</span>
        <span class="brand-title">Skills Zoom</span>
      </router-link>

      <nav class="nav-links">
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
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--sz-border);
}
.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
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
}
.brand-icon {
  font-size: 24px;
}
.brand-title {
  font-size: 20px;
  font-weight: 700;
  background: var(--sz-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
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
  background: rgba(108, 92, 231, 0.1);
}
.badge {
  background: var(--sz-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 10px;
  line-height: 1.4;
}
</style>
