<script setup lang="ts">
import { computed } from 'vue'
import { useSkillsStore } from '@/stores/skills'
import { useFavoritesStore } from '@/stores/favorites'
import SkillCard from '@/components/SkillCard.vue'
import { StarFilled, Delete } from '@element-plus/icons-vue'
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
    <el-row :gutter="16" class="stats-bar" align="middle">
      <el-col :span="12">
        <el-tag size="large" type="info">
          共收藏 {{ favoriteSkills.length }} 个 Skill
        </el-tag>
      </el-col>
      <el-col :span="12" class="actions">
        <el-button
          v-if="favoriteSkills.length > 0"
          type="danger"
          :icon="Delete"
          link
          @click="clearAll"
        >
          清空收藏
        </el-button>
      </el-col>
    </el-row>

    <el-empty
      v-if="favoriteSkills.length === 0"
      description="还没有收藏任何 Skill，快去首页发现吧！"
    >
      <el-button type="primary" @click="$router.push('/')">
        去首页
      </el-button>
    </el-empty>

    <el-row :gutter="16" v-else>
      <el-col
        v-for="skill in favoriteSkills"
        :key="skill.id"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        class="skill-col"
      >
        <SkillCard :skill="skill" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.favorites-view {
  padding-bottom: 40px;
}
.stats-bar {
  margin-bottom: 16px;
}
.actions {
  display: flex;
  justify-content: flex-end;
}
.skill-col {
  margin-bottom: 16px;
}
</style>
