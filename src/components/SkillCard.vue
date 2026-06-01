<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSkillsStore } from '@/stores/skills'
import { useFavoritesStore } from '@/stores/favorites'
import type { Skill } from '@/stores/skills'

const props = defineProps<{ skill: Skill }>()

const router = useRouter()
const store = useSkillsStore()
const favStore = useFavoritesStore()

const isSelected = computed(() => store.selectedSkillIds.includes(props.skill.id))
const isFav = computed(() => favStore.isFavorited(props.skill.id))

const accentColor = computed(() => {
  const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#3b82f6', '#ec4899']
  const idx = props.skill.tags.reduce((a, t) => a + t.charCodeAt(0), 0) % colors.length
  return colors[idx]
})

function goDetail() {
  router.push(`/skill/${props.skill.id}`)
}
function toggleFav(e: Event) {
  e.stopPropagation()
  favStore.toggleFavorite(props.skill.id)
}
function openRepo(e: Event) {
  e.stopPropagation()
  window.open(props.skill.repoUrl, '_blank')
}
function toggleSelect(e: Event) {
  e.stopPropagation()
  store.toggleSkillSelection(props.skill.id)
}

function formatNumber(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return String(n)
}
</script>

<template>
  <div :class="['card', { selected: isSelected }]" :style="{ '--accent': accentColor }">
    <div class="card-accent"></div>
    <div class="card-body">
      <div class="card-top">
        <div class="card-avatar" :style="{ background: accentColor + '18', color: accentColor }">
          {{ skill.name.charAt(0) }}
        </div>
        <div class="card-title-group">
          <div class="card-title-row">
            <h3 class="card-title" @click="goDetail">{{ skill.name }}</h3>
            <span v-if="skill.verified" class="verified-badge" title="已验证">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
          </div>
          <span class="card-author">{{ skill.author }} &middot; {{ skill.category }}</span>
        </div>
        <button :class="['fav-btn', { on: isFav }]" @click="toggleFav" :title="isFav ? '取消收藏' : '收藏'">
          <svg width="16" height="16" viewBox="0 0 24 24" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
      </div>

      <p class="card-desc" @click="goDetail">{{ skill.description }}</p>

      <div class="card-meta">
        <span class="meta-item" title="评分">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style="color: var(--c-amber)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          {{ skill.rating }}
        </span>
        <span class="meta-item" title="使用次数">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          {{ formatNumber(skill.downloads) }}
        </span>
        <span class="meta-item" title="环境要求">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
          {{ skill.env }}
        </span>
      </div>

      <div class="card-tags">
        <span
          v-for="tag in skill.tags"
          :key="tag"
          :class="['tag', { on: store.selectedTags.includes(tag) }]"
          @click.stop="store.toggleTag(tag)"
        >{{ tag }}</span>
      </div>

      <div class="card-foot">
        <button :class="['select-btn', { on: isSelected }]" @click.stop="toggleSelect">
          <svg v-if="isSelected" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
          {{ isSelected ? '已选' : '勾选' }}
        </button>
        <button class="repo-link" @click="openRepo">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span>仓库</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  display: flex;
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition);
}
.card:hover {
  border-color: var(--accent);
  box-shadow: var(--c-shadow-md);
  transform: translateY(-2px);
}
.card:hover .card-accent {
  width: 5px;
}
.card.selected {
  border-color: var(--c-primary);
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
}
.card-accent {
  width: 3px;
  min-width: 3px;
  flex-shrink: 0;
  background: var(--accent);
  transition: all var(--transition);
  border-radius: 0;
}
.card-body {
  flex: 1;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}
.card-top {
  display: flex;
  align-items: flex-start;
  gap: 11px;
}
.card-avatar {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  flex-shrink: 0;
}
.card-title-group {
  flex: 1;
  min-width: 0;
}
.card-title-row {
  display: flex;
  align-items: center;
  gap: 5px;
}
.card-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--c-text);
  line-height: 1.35;
  cursor: pointer;
  transition: color var(--transition);
}
.card-title:hover {
  color: var(--c-primary);
}
.verified-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--c-emerald);
  color: #fff;
  flex-shrink: 0;
}
.card-author {
  font-size: 0.72rem;
  color: var(--c-text-muted);
  display: block;
  margin-top: 2px;
}
.fav-btn {
  flex-shrink: 0;
  padding: 4px;
  color: var(--c-text-muted);
  border-radius: 6px;
  transition: all var(--transition);
}
.fav-btn:hover {
  color: var(--c-amber);
  background: var(--c-amber-bg);
}
.fav-btn.on {
  color: var(--c-amber);
}
.card-desc {
  font-size: 0.8rem;
  color: var(--c-text-secondary);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
}
.card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.72rem;
  color: var(--c-text-muted);
  font-weight: 500;
}
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.tag {
  font-size: 0.7rem;
  padding: 3px 9px;
  border-radius: 6px;
  background: var(--c-border-light);
  color: var(--c-text-secondary);
  font-weight: 500;
  transition: all var(--transition);
  cursor: pointer;
}
.tag:hover {
  background: var(--c-primary-bg);
  color: var(--c-primary);
}
.tag.on {
  background: var(--c-primary);
  color: #fff;
}
.card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid var(--c-border-light);
  gap: 8px;
}
.select-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 11px;
  border-radius: 7px;
  border: 1.5px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  font-size: 0.76rem;
  font-weight: 500;
  transition: all var(--transition);
}
.select-btn:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
}
.select-btn.on {
  background: var(--c-primary);
  color: #fff;
  border-color: var(--c-primary);
}
.repo-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.76rem;
  color: var(--c-text-secondary);
  font-weight: 500;
  padding: 5px 11px;
  border-radius: 7px;
  transition: all var(--transition);
}
.repo-link:hover {
  background: var(--c-border-light);
  color: var(--c-text);
}

@media (max-width: 768px) {
  .card-body {
    padding: 14px;
  }
  .card-meta {
    gap: 8px;
  }
}
</style>
