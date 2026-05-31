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

const accent = computed(() => {
  if (!skill.value) return '#6366f1'
  const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#3b82f6', '#ec4899']
  const idx = skill.value.tags.reduce((a, t) => a + t.charCodeAt(0), 0) % colors.length
  return colors[idx]
})

function toggleFav() {
  if (!skill.value) return
  favStore.toggleFavorite(skill.value.id)
  ElMessage.success(isFav.value ? '已取消收藏' : '已添加到收藏')
}
</script>

<template>
  <div class="detail">
    <nav class="back-bar">
      <button class="back-link" @click="router.back()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        返回
      </button>
    </nav>

    <div v-if="!skill" class="empty">
      <p>😕 Skill 不存在</p>
    </div>

    <template v-else>
      <div class="card">
        <div class="header">
          <div class="avatar" :style="{ background: accent + '18', color: accent }">
            {{ skill.name.charAt(0) }}
          </div>
          <div class="info">
            <h1 class="title">{{ skill.name }}</h1>
            <div class="meta">
              <span class="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="opacity: 0.7">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {{ skill.author }}
              </span>
              <span class="meta-divider">·</span>
              <span class="meta-item">{{ skill.addedAt }}</span>
            </div>
          </div>
          <div class="actions">
            <button :class="['fav-btn', { on: isFav }]" @click="toggleFav">
              <svg width="16" height="16" viewBox="0 0 24 24" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              {{ isFav ? '已收藏' : '收藏' }}
            </button>
            <button class="github-btn" @click="window.open(skill.repoUrl, '_blank')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>
        </div>

        <p class="desc">{{ skill.description }}</p>

        <div class="section">
          <h3 class="section-title">标签</h3>
          <div class="tags">
            <span
              v-for="tag in skill.tags"
              :key="tag"
              class="tag"
              @click="store.selectedTags = [tag]; router.push('/')"
            >{{ tag }}</span>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">仓库地址</h3>
          <a :href="skill.repoUrl" target="_blank" class="link">
            {{ skill.repoUrl }}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.detail {
  padding-bottom: 30px;
}
.back-bar {
  margin-bottom: 16px;
}
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  color: var(--c-text-secondary);
  font-weight: 500;
  transition: color var(--transition);
}
.back-link:hover {
  color: var(--c-primary);
}
.card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 28px;
  box-shadow: var(--c-shadow);
}
.header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 18px;
}
.avatar {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  flex-shrink: 0;
}
.info {
  flex: 1;
  min-width: 0;
}
.title {
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 6px;
  letter-spacing: -0.4px;
}
.meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--c-text-muted);
}
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.meta-divider {
  color: var(--c-border);
}
.actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
  align-self: flex-start;
}
.fav-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  border-radius: 10px;
  border: 1.5px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  transition: all var(--transition);
}
.fav-btn:hover, .fav-btn.on {
  border-color: var(--c-amber);
  color: var(--c-amber);
  background: var(--c-amber-bg);
}
.github-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  border-radius: 10px;
  background: var(--c-primary);
  color: #fff;
  border: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: background var(--transition);
}
.github-btn:hover {
  background: var(--c-primary-dark);
}
.desc {
  font-size: 0.95rem;
  color: var(--c-text-secondary);
  line-height: 1.75;
  margin: 0 0 26px;
}
.section {
  padding-top: 20px;
  border-top: 1px solid var(--c-border-light);
}
.section:first-of-type {
  padding-top: 0;
  border-top: none;
}
.section-title {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--c-text);
  margin: 0 0 12px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  padding: 6px 14px;
  border-radius: 8px;
  background: var(--c-border-light);
  color: var(--c-text-secondary);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}
.tag:hover {
  background: var(--c-primary);
  color: #fff;
}
.link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.88rem;
  color: var(--c-primary);
  word-break: break-all;
}
.link:hover {
  text-decoration: underline;
}
.empty {
  text-align: center;
  padding: 60px 0;
  color: var(--c-text-muted);
  font-size: 1rem;
}

@media (max-width: 768px) {
  .card {
    padding: 20px;
  }
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  .actions {
    width: 100%;
  }
  .fav-btn, .github-btn {
    flex: 1;
    justify-content: center;
  }
  .title {
    font-size: 1.3rem;
  }
  .avatar {
    width: 44px;
    height: 44px;
    font-size: 1.1rem;
  }
}
</style>