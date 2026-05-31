<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSkillsStore } from '@/stores/skills'
import { useFavoritesStore } from '@/stores/favorites'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const store = useSkillsStore()
const favStore = useFavoritesStore()

const skill = computed(() => store.skills.find(s => s.id === route.params.id as string))
const isFav = computed(() => favStore.isFavorited(route.params.id as string))

function toggleFav() {
  if (!skill.value) return
  favStore.toggleFavorite(skill.value.id)
  ElMessage.success(isFav.value ? '已收藏' : '已取消收藏')
}
</script>

<template>
  <div class="detail">
    <button class="back" @click="router.back()">← 返回</button>

    <div v-if="!skill" class="empty">
      <p>😕 Skill 不存在</p>
    </div>

    <template v-else>
      <div class="panel">
        <div class="top-row">
          <div class="title-col">
            <h1 class="title">{{ skill.name }}</h1>
            <div class="meta">
              <span>{{ skill.author }}</span>
              <span class="dot">·</span>
              <span>{{ skill.addedAt }}</span>
            </div>
          </div>
          <div class="btn-row">
            <button :class="['fav-btn', { on: isFav }]" @click="toggleFav">
              {{ isFav ? '★ 已收藏' : '☆ 收藏' }}
            </button>
            <button class="repo-btn" @click="window.open(skill.repoUrl, '_blank')">
              GitHub ↗
            </button>
          </div>
        </div>

        <p class="desc">{{ skill.description }}</p>

        <div class="divider"></div>

        <div class="block">
          <h3 class="block-title">标签</h3>
          <div class="tags">
            <span
              v-for="tag in skill.tags"
              :key="tag"
              class="tag"
              @click="store.selectedTags = [tag]; router.push('/')"
            >{{ tag }}</span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="block">
          <h3 class="block-title">仓库地址</h3>
          <a :href="skill.repoUrl" target="_blank" class="link">{{ skill.repoUrl }}</a>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.detail { padding-bottom: 40px; }
.back {
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  color: var(--sz-text-secondary);
  font-size: 0.85rem;
  padding: 0;
  margin-bottom: 16px;
  transition: color var(--sz-transition);
}
.back:hover { color: var(--sz-primary); }
.panel {
  background: var(--sz-bg-card);
  border: 1.5px solid var(--sz-border);
  border-radius: var(--sz-radius-lg);
  padding: 28px;
}
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}
.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--sz-text);
  margin: 0 0 6px;
  letter-spacing: -0.3px;
}
.meta {
  font-size: 0.82rem;
  color: var(--sz-text-muted);
  display: flex;
  gap: 6px;
}
.dot { color: var(--sz-border); }
.btn-row {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.fav-btn, .repo-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.83rem;
  font-weight: 500;
  transition: all var(--sz-transition);
}
.fav-btn {
  border: 1.5px solid var(--sz-border);
  background: var(--sz-bg-card);
  color: var(--sz-text-secondary);
}
.fav-btn:hover, .fav-btn.on {
  border-color: var(--sz-warning);
  color: var(--sz-warning);
  background: var(--sz-warning-bg);
}
.repo-btn {
  border: none;
  background: var(--sz-primary);
  color: #fff;
}
.repo-btn:hover {
  background: var(--sz-primary-light);
}
.desc {
  font-size: 0.9rem;
  color: var(--sz-text-secondary);
  line-height: 1.7;
  margin: 0;
}
.divider {
  height: 1px;
  background: var(--sz-border);
  margin: 20px 0;
}
.block-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--sz-text);
  margin: 0 0 10px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag {
  padding: 4px 11px;
  border-radius: 6px;
  background: var(--sz-bg-muted);
  color: var(--sz-text-secondary);
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.15s;
}
.tag:hover {
  background: var(--sz-primary);
  color: #fff;
}
.link {
  font-size: 0.85rem;
  color: var(--sz-primary);
  word-break: break-all;
}
.link:hover { text-decoration: underline; }
.empty { text-align: center; padding: 48px 0; color: var(--sz-text-muted); }

@media (max-width: 768px) {
  .panel { padding: 18px; }
  .title { font-size: 1.2rem; }
  .top-row { flex-direction: column; }
  .btn-row { width: 100%; }
  .fav-btn, .repo-btn { flex: 1; text-align: center; justify-content: center; }
}
</style>