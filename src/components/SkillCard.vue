<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSkillsStore } from '@/stores/skills'
import { useFavoritesStore } from '@/stores/favorites'
import type { Skill } from '@/stores/skills'
import { Link, Star, StarFilled, View } from '@element-plus/icons-vue'

const props = defineProps<{
  skill: Skill
}>()

const router = useRouter()
const store = useSkillsStore()
const favoritesStore = useFavoritesStore()

const isSelected = computed(() => store.selectedSkillIds.includes(props.skill.id))
const isFavorited = computed(() => favoritesStore.isFavorited(props.skill.id))

function toggleSelect() {
  store.toggleSkillSelection(props.skill.id)
}

function openRepo() {
  window.open(props.skill.repoUrl, '_blank')
}

function goDetail() {
  router.push(`/skill/${props.skill.id}`)
}

function toggleFavorite(e: Event) {
  e.stopPropagation()
  favoritesStore.toggleFavorite(props.skill.id)
}
</script>

<template>
  <div
    :class="['skill-card', { 'is-selected': isSelected }]"
    @click="toggleSelect"
  >
    <div class="card-top">
      <div class="card-name">{{ skill.name }}</div>
      <button
        class="fav-btn"
        :class="{ active: isFavorited }"
        @click.stop="toggleFavorite"
        :title="isFavorited ? '取消收藏' : '收藏'"
      >
        <el-icon :size="16"><component :is="isFavorited ? StarFilled : Star" /></el-icon>
      </button>
    </div>

    <p class="card-desc">{{ skill.description }}</p>

    <div class="card-tags">
      <span
        v-for="tag in skill.tags"
        :key="tag"
        class="tag"
        :class="{ highlight: store.selectedTags.includes(tag) }"
        @click.stop="store.toggleTag(tag)"
      >
        {{ tag }}
      </span>
    </div>

    <div class="card-bottom">
      <span class="card-author">{{ skill.author }}</span>
      <div class="card-actions">
        <button class="action-btn" @click.stop="goDetail" title="查看详情">
          <el-icon :size="14"><View /></el-icon>
        </button>
        <button class="action-btn" @click.stop="openRepo" title="访问仓库">
          <el-icon :size="14"><Link /></el-icon>
        </button>
      </div>
    </div>

    <div v-if="isSelected" class="selected-indicator">
      <span class="check-mark">✓</span>
    </div>
  </div>
</template>

<style scoped>
.skill-card {
  position: relative;
  background: var(--sz-bg-card);
  border: 1px solid var(--sz-border);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: hidden;
}
.skill-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--sz-gradient);
  opacity: 0;
  transition: opacity 0.25s;
}
.skill-card:hover {
  border-color: var(--sz-primary);
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(108, 92, 231, 0.15);
}
.skill-card:hover::before {
  opacity: 1;
}
.skill-card.is-selected {
  border-color: var(--sz-accent);
  background: var(--sz-bg-card-hover);
}
.skill-card.is-selected::before {
  opacity: 1;
  background: var(--sz-accent);
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.card-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--sz-text);
  line-height: 1.4;
  flex: 1;
  margin-right: 8px;
}
.fav-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--sz-text-secondary);
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s;
  flex-shrink: 0;
}
.fav-btn:hover {
  color: #f1c40f;
  background: rgba(241, 196, 15, 0.1);
}
.fav-btn.active {
  color: #f1c40f;
}
.card-desc {
  margin: 0;
  font-size: 13px;
  color: var(--sz-text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 20px;
  background: rgba(108, 92, 231, 0.1);
  color: var(--sz-primary-light);
  border: 1px solid rgba(108, 92, 231, 0.2);
  transition: all 0.2s;
  cursor: pointer;
}
.tag:hover {
  background: rgba(108, 92, 231, 0.2);
}
.tag.highlight {
  background: var(--sz-primary);
  color: #fff;
  border-color: var(--sz-primary);
}
.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid var(--sz-border);
}
.card-author {
  font-size: 12px;
  color: var(--sz-text-secondary);
}
.card-actions {
  display: flex;
  gap: 4px;
}
.action-btn {
  background: none;
  border: 1px solid var(--sz-border);
  color: var(--sz-text-secondary);
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}
.action-btn:hover {
  color: var(--sz-primary-light);
  border-color: var(--sz-primary);
  background: rgba(108, 92, 231, 0.1);
}
.selected-indicator {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--sz-accent);
  display: flex;
  align-items: center;
  justify-content: center;
}
.check-mark {
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}
</style>
