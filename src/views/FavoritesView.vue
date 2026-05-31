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
      <div>
        <h1 class="title">⭐ 我的收藏</h1>
        <span class="sub">{{ list.length }} 个 Skill</span>
      </div>
      <button v-if="list.length > 0" class="clear-btn" @click="clearAll">清空全部</button>
    </div>

    <div v-if="list.length === 0" class="empty">
      <div class="empty-icon">⭐</div>
      <p>还没有收藏任何 Skill</p>
      <router-link to="/" class="go-btn">去发现</router-link>
    </div>

    <div v-else class="grid">
      <SkillCard v-for="s in list" :key="s.id" :skill="s" />
    </div>
  </div>
</template>

<style scoped>
.page { padding-bottom: 40px; }
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}
.title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--sz-text);
  margin: 0 0 2px;
}
.sub {
  font-size: 0.8rem;
  color: var(--sz-text-muted);
}
.clear-btn {
  padding: 6px 14px;
  border-radius: 7px;
  border: 1.5px solid var(--sz-danger);
  background: none;
  color: var(--sz-danger);
  font-size: 0.8rem;
  font-weight: 500;
  transition: all var(--sz-transition);
}
.clear-btn:hover {
  background: #fff5f5;
}
.empty {
  text-align: center;
  padding: 48px 0;
}
.empty-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}
.empty p {
  color: var(--sz-text-muted);
  font-size: 0.88rem;
  margin: 0 0 12px;
}
.go-btn {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 8px;
  background: var(--sz-primary);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 500;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
}

@media (max-width: 768px) {
  .title { font-size: 1.15rem; }
  .grid { grid-template-columns: 1fr; gap: 10px; }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
</style>