<script setup lang="ts">
import { computed } from 'vue'
import { useSkillsStore } from '@/stores/skills'
import { useFavoritesStore } from '@/stores/favorites'
import SkillCard from '@/components/SkillCard.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const store = useSkillsStore()
const favStore = useFavoritesStore()

const list = computed(() => store.skills.filter(s => favStore.isFavorited(s.id)))

async function clearAll() {
  try {
    await ElMessageBox.confirm('确定要清空所有收藏吗？', '确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    favStore.clearFavorites()
    ElMessage.success('已清空')
  } catch {}
}
</script>

<template>
  <div class="page">
    <div class="head">
      <div class="head-left">
        <h1 class="title">我的收藏</h1>
        <span class="sub">{{ list?.length || 0 }} 个 Skill</span>
      </div>
      <button v-if="(list?.length || 0) > 0" class="clear-btn" @click="clearAll">清空全部</button>
    </div>

    <div v-if="(list?.length || 0) === 0" class="empty">
      <div class="empty-art">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--c-amber)">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>
      <p class="empty-title">还没有收藏任何 Skill</p>
      <p class="empty-sub">在 Skill 市场发现喜欢的项目，点击星标即可收藏</p>
      <router-link to="/" class="go-btn">去发现</router-link>
    </div>

    <div v-else class="grid">
      <SkillCard v-for="s in (list || [])" :key="s.id" :skill="s" />
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-bottom: 40px;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
  flex-wrap: wrap;
  gap: 10px;
}
.head-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--c-text);
  margin: 0;
  letter-spacing: -0.4px;
}
.sub {
  font-size: 0.8rem;
  color: var(--c-text-muted);
}
.clear-btn {
  padding: 7px 16px;
  border-radius: 8px;
  border: 1.5px solid var(--c-rose);
  color: var(--c-rose);
  font-size: 0.82rem;
  font-weight: 500;
  background: none;
  transition: all var(--transition);
}
.clear-btn:hover {
  background: var(--c-rose-bg);
}

.empty {
  text-align: center;
  padding: 64px 20px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
}
.empty-art {
  margin-bottom: 16px;
}
.empty-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--c-text-secondary);
  margin: 0 0 4px;
}
.empty-sub {
  font-size: 0.82rem;
  color: var(--c-text-muted);
  margin: 0 0 18px;
}
.go-btn {
  display: inline-block;
  padding: 9px 22px;
  border-radius: 10px;
  background: var(--c-primary);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 500;
  transition: background var(--transition);
}
.go-btn:hover {
  background: var(--c-primary-dark);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.25rem;
  }
  .grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .empty {
    padding: 40px 16px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
