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
    :class="['skill-card', { selected: isSelected }]"
    @click="toggleSelect"
  >
    <div class="card-accent"></div>

    <div class="card-body">
      <div class="card-head">
        <h3 class="card-name">{{ skill.name }}</h3>
        <button
          :class="['star-btn', { on: isFavorited }]"
          @click.stop="toggleFavorite"
        >
          <el-icon :size="15"><component :is="isFavorited ? StarFilled : Star" /></el-icon>
        </button>
      </div>

      <p class="card-desc">{{ skill.description }}</p>

      <div class="card-tags">
        <span
          v-for="tag in skill.tags.slice(0, 3)"
          :key="tag"
          :class="['tag', { active: store.selectedTags.includes(tag) }]"
          @click.stop="store.toggleTag(tag)"
        >{{ tag }}</span>
        <span v-if="skill.tags.length > 3" class="tag more">+{{ skill.tags.length - 3 }}</span>
      </div>

      <div class="card-foot">
        <span class="author">{{ skill.author }}</span>
        <div class="actions">
          <button class="icon-btn" @click.stop="goDetail" title="详情">
            <el-icon :size="13"><View /></el-icon>
          </button>
          <button class="icon-btn" @click.stop="openRepo" title="仓库">
            <el-icon :size="13"><Link /></el-icon>
          </button>
        </div>
      </div>
    </div>

    <Transition name="check">
      <div v-if="isSelected" class="check-badge">✓</div>
    </Transition>
  </div>
</template>

<style scoped>
.skill-card {
  position: relative;
  background: var(--sz-bg-card);
  border: 1px solid var(--sz-border);
  border-radius: var(--sz-radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.skill-card:hover {
  border-color: var(--sz-primary);
  transform: translateY(-3px);
  box-shadow: var(--sz-shadow-glow);
}
.skill-card.selected {
  border-color: var(--sz-accent);
  background: var(--sz-bg-card-hover);
}
.card-accent {
  height: 3px;
  background: var(--sz-gradient);
  opacity: 0;
  transition: opacity 0.3s;
}
.skill-card:hover .card-accent,
.skill-card.selected .card-accent {
  opacity: 1;
}
.card-body {
  padding: 18px 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}
.card-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--sz-text);
  line-height: 1.4;
  margin: 0;
  flex: 1;
}
.star-btn {
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--sz-text-muted);
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}
.star-btn:hover {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.1);
}
.star-btn.on {
  color: #fbbf24;
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
  background: rgba(124, 58, 237, 0.08);
  color: var(--sz-primary-light);
  border: 1px solid rgba(124, 58, 237, 0.15);
  transition: all 0.2s;
  cursor: pointer;
  white-space: nowrap;
}
.tag:hover {
  background: rgba(124, 58, 237, 0.15);
}
.tag.active {
  background: var(--sz-primary);
  color: #fff;
  border-color: var(--sz-primary);
}
.tag.more {
  background: var(--sz-bg-elevated);
  color: var(--sz-text-muted);
  border-color: var(--sz-border);
  cursor: default;
}
.card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid var(--sz-border);
}
.author {
  font-size: 12px;
  color: var(--sz-text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 140px;
}
.actions {
  display: flex;
  gap: 4px;
}
.icon-btn {
  background: none;
  border: 1px solid var(--sz-border);
  color: var(--sz-text-muted);
  cursor: pointer;
  padding: 5px 7px;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}
.icon-btn:hover {
  color: var(--sz-primary-light);
  border-color: var(--sz-primary);
  background: rgba(124, 58, 237, 0.08);
}
.check-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--sz-accent);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.check-enter-active,
.check-leave-active {
  transition: all 0.2s;
}
.check-enter-from,
.check-leave-to {
  transform: scale(0);
  opacity: 0;
}

@media (max-width: 768px) {
  .card-body {
    padding: 14px 14px 12px;
    gap: 10px;
  }
  .card-name {
    font-size: 14px;
  }
  .author {
    max-width: 100px;
  }
}
</style>
