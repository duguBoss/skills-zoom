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
  <el-menu
    :default-active="activeIndex"
    class="app-header"
    mode="horizontal"
    :ellipsis="false"
    router
  >
    <div class="brand">
      <el-icon size="22"><Collection /></el-icon>
      <span class="brand-title">Skills Zoom</span>
    </div>
    <div class="flex-grow" />
    <el-menu-item index="/">
      <el-icon><HomeFilled /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/favorites">
      <el-icon><StarFilled /></el-icon>
      <span>我的收藏</span>
      <el-badge
        v-if="favoritesStore.favoritesCount > 0"
        :value="favoritesStore.favoritesCount"
        class="menu-badge"
      />
    </el-menu-item>
    <el-menu-item index="/submit-form">
      <el-icon><EditPen /></el-icon>
      <span>在线投稿</span>
    </el-menu-item>
    <el-menu-item index="/submit">
      <el-icon><Document /></el-icon>
      <span>投稿说明</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  font-size: 18px;
  font-weight: 600;
  color: var(--el-color-primary);
}
.flex-grow {
  flex-grow: 1;
}
.menu-badge {
  margin-left: 6px;
}
.menu-badge :deep(.el-badge__content) {
  top: 0;
}
</style>
