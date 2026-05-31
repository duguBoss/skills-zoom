<script setup lang="ts">
import { computed } from 'vue'
import { useSkillsStore } from '@/stores/skills'
import { useFavoritesStore } from '@/stores/favorites'
import SkillCard from '@/components/SkillCard.vue'
import { Delete } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const store = useSkillsStore()
const favoritesStore = useFavoritesStore()

const favoriteSkills = computed(() => {
  return store.skills.filter(skill => favoritesStore.isFavorited(skill.id))
})

async function clearAll() {
  try {
    await ElMessageBox.confirm(
      '确定要清空所有收藏吗？此操作不可恢复。',
      '确认清空',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    favoritesStore.clearFavorites()
    ElMessage.success('收藏已清空')
  } catch {
    // 用户取消
  }
}
</script>

<template>
  <div class="favorites-view">
    <div class="page-header">
      <h1 class="page-title">⭐ 我的收藏</h1>
      <div class="page-actions">
        <span class="count-tag">{{ favoriteSkills.length }} 个 Skill</span>
        <button
          v-if="favoriteSkills.length > 0"
          class="clear-all-btn"
          @click="clearAll"
        >
          <el-icon><Delete /></el-icon> 清空
        </button>
      </div>
    </div>

    <div v-if="favoriteSkills.length === 0" class="empty-state">
      <div class="empty-icon">⭐</div>
      <p>还没有收藏任何 Skill</p>
      <router-link to="/" class="go-btn">去发现</router-link>
    </div>

    <div class="skill-grid" v-else>
      <SkillCard
        v-for="skill in favoriteSkills"
        :key="skill.id"
        :skill="skill"
      />
    </div>
  </div>
</template>

<style scoped>
.favorites-view {
  padding-bottom: 60px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}
.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--sz-text);
}
.page-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.count-tag {
  font-size: 13px;
  color: var(--sz-text-secondary);
  padding: 4px 12px;
  border-radius: 20px;
  background: var(--sz-bg-card);
  border: 1px solid var(--sz-border);
}
.clear-all-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid #e74c3c;
  background: none;
  color: #e74c3c;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.clear-all-btn:hover {
  background: rgba(231, 76, 60, 0.1);
}
.empty-state {
  text-align: center;
  padding: 80px 0;
  color: var(--sz-text-secondary);
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.empty-state p {
  margin: 0 0 20px;
  font-size: 15px;
}
.go-btn {
  display: inline-block;
  padding: 10px 28px;
  border-radius: 8px;
  background: var(--sz-primary);
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.2s;
}
.go-btn:hover {
  background: var(--sz-primary-light);
}
.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
</style>
