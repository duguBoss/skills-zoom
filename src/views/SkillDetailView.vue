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
  <div class="detail">
    <button class="back-btn" @click="goBack">
      <el-icon><ArrowLeft /></el-icon> 返回
    </button>

    <div v-if="!skill" class="empty">
      <div class="empty-icon">😕</div>
      <p>Skill 不存在</p>
    </div>

    <template v-else>
      <div class="detail-card">
        <div class="detail-top">
          <h1 class="detail-title">{{ skill.name }}</h1>
          <div class="detail-actions">
            <button :class="['fav-btn', { on: isFavorited }]" @click="toggleFavorite">
              <el-icon><component :is="isFavorited ? StarFilled : Star" /></el-icon>
              {{ isFavorited ? '已收藏' : '收藏' }}
            </button>
            <button class="repo-btn" @click="openRepo">
              <el-icon><Link /></el-icon> 访问仓库
            </button>
          </div>
        </div>

        <p class="detail-desc">{{ skill.description }}</p>

        <div class="detail-meta">
          <span class="meta">👤 {{ skill.author }}</span>
          <span class="meta">📅 {{ skill.addedAt }}</span>
        </div>

        <div class="divider"></div>

        <div class="section">
          <h3 class="section-title">标签分类</h3>
          <div class="tags">
            <span v-for="tag in skill.tags" :key="tag" class="tag" @click="handleTagClick(tag)">{{ tag }}</span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="section">
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
.detail {
  padding-bottom: 60px;
}
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid var(--sz-border);
  color: var(--sz-text-secondary);
  padding: 8px 16px;
  border-radius: var(--sz-radius-sm);
  cursor: pointer;
  font-size: 13px;
  margin-bottom: 20px;
  transition: all 0.2s;
}
.back-btn:hover {
  color: var(--sz-primary-light);
  border-color: var(--sz-primary);
}
.empty {
  text-align: center;
  padding: 60px 0;
  color: var(--sz-text-muted);
}
.empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
}
.detail-card {
  background: var(--sz-bg-card);
  border: 1px solid var(--sz-border);
  border-radius: var(--sz-radius-lg);
  padding: 28px;
}
.detail-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}
.detail-title {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  color: var(--sz-text);
  line-height: 1.3;
  flex: 1;
}
.detail-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.fav-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--sz-radius-sm);
  border: 1px solid var(--sz-border);
  background: var(--sz-bg-card);
  color: var(--sz-text-secondary);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.fav-btn:hover {
  border-color: #fbbf24;
  color: #fbbf24;
}
.fav-btn.on {
  border-color: #fbbf24;
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.08);
}
.repo-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--sz-radius-sm);
  border: none;
  background: var(--sz-primary);
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.repo-btn:hover {
  background: var(--sz-primary-light);
}
.detail-desc {
  margin: 0 0 16px;
  font-size: 15px;
  color: var(--sz-text-secondary);
  line-height: 1.7;
}
.detail-meta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.meta {
  font-size: 13px;
  color: var(--sz-text-muted);
}
.divider {
  height: 1px;
  background: var(--sz-border);
  margin: 20px 0;
}
.section-title {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--sz-text);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  padding: 5px 14px;
  border-radius: 20px;
  background: rgba(124, 58, 237, 0.08);
  color: var(--sz-primary-light);
  border: 1px solid rgba(124, 58, 237, 0.15);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.tag:hover {
  background: var(--sz-primary);
  color: #fff;
  border-color: var(--sz-primary);
}
.repo-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--sz-primary-light);
  font-size: 14px;
  word-break: break-all;
  transition: color 0.2s;
}
.repo-link:hover {
  color: var(--sz-accent);
}

@media (max-width: 768px) {
  .detail-card {
    padding: 18px;
    border-radius: var(--sz-radius-md);
  }
  .detail-title {
    font-size: 20px;
  }
  .detail-top {
    flex-direction: column;
  }
  .detail-actions {
    width: 100%;
  }
  .fav-btn, .repo-btn {
    flex: 1;
    justify-content: center;
  }
}
</style>
