<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSkillsStore } from '@/stores/skills'
import { useFavoritesStore } from '@/stores/favorites'
import type { Skill } from '@/stores/skills'

const props = defineProps<{ skill: Skill }>()

const router = useRouter()
const store = useSkillsStore()
const favoritesStore = useFavoritesStore()

const isSelected = computed(() => store.selectedSkillIds.includes(props.skill.id))
const isFavorited = computed(() => favoritesStore.isFavorited(props.skill.id))

function toggleSelect() {
  store.toggleSkillSelection(props.skill.id)
}
function openRepo(e: Event) {
  e.stopPropagation()
  window.open(props.skill.repoUrl, '_blank')
}
function goDetail(e: Event) {
  e.stopPropagation()
  router.push(`/skill/${props.skill.id}`)
}
function toggleFav(e: Event) {
  e.stopPropagation()
  favoritesStore.toggleFavorite(props.skill.id)
}
</script>

<template>
  <div :class="['card', { selected: isSelected }]" @click="toggleSelect">
    <div class="card-head">
      <h3 class="card-title" @click="goDetail">{{ skill.name }}</h3>
      <button :class="['fav', { on: isFavorited }]" @click="toggleFav" :title="isFavorited ? '取消收藏' : '收藏'">
        {{ isFavorited ? '★' : '☆' }}
      </button>
    </div>

    <p class="card-desc" @click="goDetail">{{ skill.description }}</p>

    <div class="card-tags">
      <span
        v-for="tag in skill.tags"
        :key="tag"
        :class="['tag', { highlight: store.selectedTags.includes(tag) }]"
        @click.stop="store.toggleTag(tag)"
      >{{ tag }}</span>
    </div>

    <div class="card-foot">
      <span class="author">{{ skill.author }}</span>
      <span class="date">{{ skill.addedAt }}</span>
      <button class="repo-btn" @click="openRepo">GitHub ↗</button>
    </div>

    <span v-if="isSelected" class="check">✓</span>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  background: var(--sz-bg-card);
  border: 1.5px solid var(--sz-border);
  border-radius: var(--sz-radius-lg);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition: all var(--sz-transition);
}
.card:hover {
  border-color: var(--sz-primary);
  box-shadow: var(--sz-shadow-md);
  transform: translateY(-1px);
}
.card.selected {
  border-color: var(--sz-primary);
  background: var(--sz-primary-bg);
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}
.card-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--sz-primary);
  line-height: 1.4;
  flex: 1;
  cursor: pointer;
}
.card-title:hover {
  text-decoration: underline;
}
.fav {
  flex-shrink: 0;
  background: none;
  border: none;
  font-size: 1.1rem;
  color: var(--sz-text-muted);
  padding: 2px;
  transition: color 0.15s;
}
.fav:hover,
.fav.on {
  color: var(--sz-warning);
}
.card-desc {
  font-size: 0.83rem;
  color: var(--sz-text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
  cursor: pointer;
}
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.tag {
  font-size: 0.72rem;
  padding: 2px 8px;
  border-radius: 5px;
  background: var(--sz-bg-muted);
  color: var(--sz-text-secondary);
  transition: all 0.15s;
  cursor: pointer;
}
.tag:hover {
  background: var(--sz-primary-bg);
  color: var(--sz-primary);
}
.tag.highlight {
  background: var(--sz-primary);
  color: #fff;
}
.card-foot {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 10px;
  border-top: 1px solid var(--sz-border-light);
}
.author {
  font-size: 0.75rem;
  color: var(--sz-text-muted);
  flex: 1;
}
.date {
  font-size: 0.72rem;
  color: var(--sz-text-muted);
}
.repo-btn {
  background: none;
  border: none;
  font-size: 0.78rem;
  color: var(--sz-primary);
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
}
.repo-btn:hover {
  text-decoration: underline;
}
.check {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--sz-primary);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>