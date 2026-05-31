<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSkillsStore } from '@/stores/skills'
import { useFavoritesStore } from '@/stores/favorites'
import { ArrowLeft, Link, User, Calendar, Star, StarFilled, CollectionTag } from '@element-plus/icons-vue'
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
    <el-button
      link
      type="primary"
      :icon="ArrowLeft"
      @click="goBack"
      class="back-btn"
    >
      返回列表
    </el-button>

    <el-empty v-if="!skill" description="Skill 不存在" />

    <template v-else>
      <el-card class="detail-card" shadow="never">
        <div class="detail-header">
          <div class="title-section">
            <h1 class="skill-title">{{ skill.name }}</h1>
            <div class="actions">
              <el-button
                :type="isFavorited ? 'warning' : 'default'"
                :icon="isFavorited ? StarFilled : Star"
                @click="toggleFavorite"
              >
                {{ isFavorited ? '已收藏' : '收藏' }}
              </el-button>
              <el-button type="primary" :icon="Link" @click="openRepo">
                访问仓库
              </el-button>
            </div>
          </div>

          <p class="detail-description">{{ skill.description }}</p>

          <div class="detail-meta">
            <el-tag size="large" effect="plain">
              <el-icon><User /></el-icon>
              {{ skill.author }}
            </el-tag>
            <el-tag size="large" effect="plain">
              <el-icon><Calendar /></el-icon>
              添加于 {{ skill.addedAt }}
            </el-tag>
          </div>
        </div>

        <el-divider />

        <div class="detail-section">
          <h3>
            <el-icon><CollectionTag /></el-icon>
            标签分类
          </h3>
          <div class="tags-row">
            <el-tag
              v-for="tag in skill.tags"
              :key="tag"
              size="large"
              type="primary"
              effect="plain"
              class="detail-tag"
              @click="handleTagClick(tag)"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>

        <el-divider />

        <div class="detail-section">
          <h3>项目链接</h3>
          <el-link
            type="primary"
            :href="skill.repoUrl"
            target="_blank"
            :icon="Link"
            class="repo-link"
          >
            {{ skill.repoUrl }}
          </el-link>
        </div>
      </el-card>
    </template>
  </div>
</template>

<style scoped>
.detail-view {
  padding-bottom: 40px;
}
.back-btn {
  margin-bottom: 16px;
}
.detail-card {
  margin-top: 8px;
}
.detail-header {
  margin-bottom: 8px;
}
.title-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}
.skill-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--el-text-color-primary);
}
.actions {
  display: flex;
  gap: 10px;
}
.detail-description {
  margin: 0 0 20px 0;
  font-size: 16px;
  color: var(--el-text-color-regular);
  line-height: 1.7;
}
.detail-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.detail-section h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px 0;
  font-size: 16px;
  color: var(--el-text-color-primary);
}
.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.detail-tag {
  cursor: pointer;
  transition: all 0.2s;
}
.detail-tag:hover {
  transform: translateY(-1px);
}
.repo-link {
  font-size: 15px;
  word-break: break-all;
}
</style>
