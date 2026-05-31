<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSkillsStore } from '@/stores/skills'
import { useFavoritesStore } from '@/stores/favorites'
import { ArrowLeft, Link, Star, StarFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const store = useSkillsStore()
const favoritesStore = useFavoritesStore()

const skillId = computed(() => route.params.id as string)
const skill = computed(() => store.skills.find(s => s.id === skillId.value))
const isFavorited = computed(() => favoritesStore.isFavorited(skillId.value))

function goBack() {
  router.back()
}

function openRepo() {
  if (skill.value) {
    window.open(skill.value.repoUrl, '_blank')
  }
}

function toggleFavorite() {
  if (!skill.value) return
  favoritesStore.toggleFavorite(skill.value.id)
  if (isFavorited.value) {
    ElMessage.success('已收藏')
  } else {
    ElMessage.info('已取消收藏')
  }
}

function handleTagClick(tag: string) {
  store.selectedTags = [tag]
  router.push('/')
}
</script>

<template>
  <div class="detail-view">
    <button class="back-btn" @click="goBack">
      <el-icon><ArrowLeft /></el-icon> 返回
    </button>

    <div v-if="!skill" class="empty-state">
      <div class="empty-icon">😕</div>
      <p>Skill 不存在</p>
    </div>

    <template v-else>
      <div class="detail-card">
        <div class="detail-top">
          <h1 class="detail-title">{{ skill.name }}</h1>
          <div class="detail-actions">
            <button
              :class="['fav-action', { active: isFavorited }]"
              @click="toggleFavorite"
            >
              <el-icon><component :is="isFavorited ? StarFilled : Star" /></el-icon>
              {{ isFavorited ? '已收藏' : '收藏' }}
            </button>
            <button class="repo-action" @click="openRepo">
              <el-icon><Link /></el-icon>
              访问仓库
            </button>
          </div>
        </div>

        <p class="detail-desc">{{ skill.description }}</p>

        <div class="detail-meta">
          <span class="meta-item">👤 {{ skill.author }}</span>
          <span class="meta-item">📅 {{ skill.addedAt }}</span>
        </div>

        <div class="divider"></div>

        <div class="detail-section">
          <h3 class="section-title">标签分类</h3>
          <div class="tags-row">
            <span
              v-for="tag in skill.tags"
              :key="tag"
              class="detail-tag"
              @click="handleTagClick(tag)"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="detail-section">
          <h3 class="section-title">项目链接</h3>
          <a :href="skill.repoUrl" target="_blank" class="repo-link">
            <el-icon><Link /></el-icon>
            {{ skill.repoUrl }}
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.detail-view {
  padding-bottom: 60px;
}
.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid var(--sz-border);
  color: var(--sz-text-secondary);
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  margin-bottom: 24px;
  transition: all 0.2s;
}
.back-btn:hover {
  color: var(--sz-primary-light);
  border-color: var(--sz-primary);
}
.empty-state {
  text-align: center;
  padding: 60px 0;
  color: var(--sz-text-secondary);
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.detail-card {
  background: var(--sz-bg-card);
  border: 1px solid var(--sz-border);
  border-radius: 16px;
  padding: 32px;
}
.detail-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
}
.detail-title {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: var(--sz-text);
  line-height: 1.3;
}
.detail-actions {
  display: flex;
  gap: 10px;
}
.fav-action {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 8px;
  border: 1px solid var(--sz-border);
  background: var(--sz-bg-card);
  color: var(--sz-text-secondary);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.fav-action:hover {
  border-color: #f1c40f;
  color: #f1c40f;
}
.fav-action.active {
  border-color: #f1c40f;
  color: #f1c40f;
  background: rgba(241, 196, 15, 0.1);
}
.repo-action {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  background: var(--sz-primary);
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.repo-action:hover {
  background: var(--sz-primary-light);
}
.detail-desc {
  margin: 0 0 20px;
  font-size: 15px;
  color: var(--sz-text-secondary);
  line-height: 1.7;
}
.detail-meta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.meta-item {
  font-size: 13px;
  color: var(--sz-text-secondary);
}
.divider {
  height: 1px;
  background: var(--sz-border);
  margin: 24px 0;
}
.section-title {
  margin: 0 0 16px;
  font-size: 15px;
  font-weight: 600;
  color: var(--sz-text);
}
.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.detail-tag {
  padding: 6px 16px;
  border-radius: 20px;
  background: rgba(108, 92, 231, 0.1);
  color: var(--sz-primary-light);
  border: 1px solid rgba(108, 92, 231, 0.2);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.detail-tag:hover {
  background: var(--sz-primary);
  color: #fff;
  border-color: var(--sz-primary);
}
.repo-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--sz-primary-light);
  font-size: 14px;
  text-decoration: none;
  word-break: break-all;
  transition: color 0.2s;
}
.repo-link:hover {
  color: var(--sz-accent);
}
</style>
