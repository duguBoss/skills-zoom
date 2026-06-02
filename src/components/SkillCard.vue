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
  const colors = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#e11d48', '#7c3aed', '#2563eb', '#db2777']
  const idx = (props.skill.tags || []).reduce((a, t) => a + t.charCodeAt(0), 0) % colors.length
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
    <div class="card-glow" :style="{ background: `linear-gradient(135deg, ${accentColor}15, transparent)` }"></div>
    <div class="card-body">
      <div class="card-top">
        <div class="card-avatar" :style="{ background: accentColor + '12', color: accentColor }">
          {{ skill.name.charAt(0) }}
        </div>
        <div class="card-title-group">
          <div class="card-title-row">
            <h3 class="card-title" @click="goDetail">{{ skill.name }}</h3>
            <span v-if="skill.verified" class="verified-badge" title="已验证运行">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
          </div>
          <span class="card-author">{{ skill.author }} &middot; {{ skill.category }}</span>
        </div>
        <button :class="['fav-btn', { on: isFav }]" @click="toggleFav" :title="isFav ? '取消收藏' : '收藏'">
          <svg width="15" height="15" viewBox="0 0 24 24" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
      </div>

      <p class="card-desc" @click="goDetail">{{ skill.description }}</p>

      <div class="card-meta">
        <span class="meta-chip rating">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          {{ skill.rating }}
        </span>
        <span class="meta-chip">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          {{ formatNumber(skill.downloads) }}
        </span>
        <span class="meta-chip env" :title="skill.env">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
          <span class="env-text">{{ skill.env }}</span>
        </span>
      </div>

      <div class="card-tags">
        <span
          v-for="tag in (skill.tags || [])"
          :key="tag"
          :class="['tag', { on: (store.selectedTags || []).includes(tag) }]"
          @click.stop="store.toggleTag(tag)"
        >{{ tag }}</span>
      </div>

      <div class="card-foot">
        <button :class="['action-btn select', { on: isSelected }]" @click.stop="toggleSelect">
          <svg v-if="isSelected" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
          {{ isSelected ? '已选' : '选择' }}
        </button>
        <button class="action-btn repo" @click="openRepo">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          仓库
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
  border-radius: var(--r-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--t-base);
  display: flex;
}
.card:hover {
  border-color: var(--c-border-hover);
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
}
.card:hover .card-glow {
  opacity: 1;
}
.card.selected {
  border-color: var(--c-primary);
  box-shadow: var(--shadow-glow), var(--shadow-lg);
}
.card-glow {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity var(--t-slow);
  pointer-events: none;
}
.card-body {
  position: relative;
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}
.card-top {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.card-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--r-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  font-weight: 800;
  flex-shrink: 0;
}
.card-title-group {
  flex: 1;
  min-width: 0;
}
.card-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.card-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--c-text);
  line-height: 1.35;
  cursor: pointer;
  transition: color var(--t-fast);
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
  font-size: 0.73rem;
  color: var(--c-text-muted);
  display: block;
  margin-top: 3px;
  font-weight: 500;
}
.fav-btn {
  flex-shrink: 0;
  padding: 5px;
  color: var(--c-text-placeholder);
  border-radius: var(--r-sm);
  transition: all var(--t-fast);
}
.fav-btn:hover {
  color: var(--c-amber);
  background: var(--c-amber-bg);
}
.fav-btn.on {
  color: var(--c-amber);
}
.card-desc {
  font-size: 0.81rem;
  color: var(--c-text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
}
.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7rem;
  color: var(--c-text-muted);
  font-weight: 600;
  padding: 3px 8px;
  border-radius: var(--r-sm);
  background: var(--c-border-light);
}
.meta-chip.rating {
  background: var(--c-amber-bg);
  color: var(--c-amber);
}
.meta-chip.env {
  max-width: 160px;
}
.env-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.tag {
  font-size: 0.7rem;
  padding: 3px 10px;
  border-radius: var(--r-sm);
  background: var(--c-border-light);
  color: var(--c-text-secondary);
  font-weight: 500;
  transition: all var(--t-fast);
  cursor: pointer;
}
.tag:hover {
  background: var(--c-primary-bg-soft);
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
  padding-top: 12px;
  border-top: 1px solid var(--c-border-light);
  gap: 8px;
}
.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: var(--r-sm);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  font-size: 0.75rem;
  font-weight: 600;
  transition: all var(--t-fast);
}
.action-btn:hover {
  border-color: var(--c-border-hover);
  color: var(--c-text);
  background: var(--c-surface-hover);
}
.action-btn.select.on {
  background: var(--c-primary);
  color: #fff;
  border-color: var(--c-primary);
}
.action-btn.repo:hover {
  border-color: var(--c-text);
}

@media (max-width: 768px) {
  .card-body {
    padding: 16px;
  }
  .card-meta {
    gap: 6px;
  }
}
</style>
