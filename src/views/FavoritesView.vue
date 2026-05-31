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
  <div class="favorites">
    <div class="page-head">
      <h1 class="page-title">⭐ 我的收藏</h1>
      <div class="page-actions">
        <span class="count">{{ favoriteSkills.length }} 个 Skill</span>
        <button v-if="favoriteSkills.length > 0" class="clear-btn" @click="clearAll">
          <el-icon><Delete /></el-icon> 清空
        </button>
      </div>
    </div>

    <div v-if="favoriteSkills.length === 0" class="empty">
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
.favorites {
  padding-bottom: 60px;
}
.page-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}
.page-title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: var(--sz-text);
}
.page-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.count {
  font-size: 13px;
  color: var(--sz-text-muted);
  padding: 4px 12px;
  border-radius: 20px;
  background: var(--sz-bg-card);
  border: 1px solid var(--sz-border);
}
.clear-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: var(--sz-radius-sm);
  border: 1px solid #ef4444;
  background: none;
  color: #ef4444;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.clear-btn:hover {
  background: rgba(239, 68, 68, 0.08);
}
.empty {
  text-align: center;
  padding: 60px 0;
  color: var(--sz-text-muted);
}
.empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
}
.empty p {
  margin: 0 0 16px;
  font-size: 14px;
}
.go-btn {
  display: inline-block;
  padding: 9px 24px;
  border-radius: var(--sz-radius-sm);
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
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 14px;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 18px;
  }
  .skill-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .skill-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
