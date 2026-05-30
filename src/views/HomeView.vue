<script setup lang="ts">
import { useSkillsStore } from '@/stores/skills'
import SkillCard from '@/components/SkillCard.vue'
import { Search, Filter, Download, Check, Close } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const store = useSkillsStore()

function handleTagClick(tag: string) {
  store.toggleTag(tag)
}

function handleExport() {
  if (store.selectedSkillIds.length === 0) {
    ElMessage.warning('请先选择至少一个 Skill')
    return
  }
  const content = store.exportSelected()
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `skills-export-${new Date().toISOString().slice(0, 10)}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  ElMessage.success(`已导出 ${store.selectedSkillIds.length} 个 Skill 地址`)
}

function handleCopy() {
  if (store.selectedSkillIds.length === 0) {
    ElMessage.warning('请先选择至少一个 Skill')
    return
  }
  const content = store.exportSelected()
  navigator.clipboard.writeText(content).then(() => {
    ElMessage.success('已复制到剪贴板')
  }).catch(() => {
    ElMessage.error('复制失败')
  })
}

function clearFilters() {
  store.selectedTags = []
  store.searchQuery = ''
}
</script>

<template>
  <div class="home-view">
    <!-- 顶部统计和操作栏 -->
    <el-row :gutter="16" class="stats-bar" align="middle">
      <el-col :span="12">
        <div class="stats">
          <el-tag size="large" type="info">
            共 {{ store.skills.length }} 个 Skill
          </el-tag>
          <el-tag v-if="store.selectedSkillIds.length > 0" size="large" type="success">
            已选 {{ store.selectedSkillIds.length }} 个
          </el-tag>
          <el-tag v-if="store.selectedTags.length > 0" size="large" type="warning">
            标签筛选中
          </el-tag>
        </div>
      </el-col>
      <el-col :span="12" class="actions">
        <el-button
          type="primary"
          :icon="Download"
          @click="handleExport"
          :disabled="store.selectedSkillIds.length === 0"
        >
          导出选中
        </el-button>
        <el-button
          type="success"
          :icon="Check"
          @click="handleCopy"
          :disabled="store.selectedSkillIds.length === 0"
        >
          复制地址
        </el-button>
        <el-button
          v-if="store.selectedSkillIds.length > 0"
          :icon="Close"
          @click="store.clearSelection"
        >
          清空选择
        </el-button>
      </el-col>
    </el-row>

    <!-- 搜索和筛选 -->
    <el-card class="filter-card" shadow="never">
      <el-row :gutter="16" align="middle">
        <el-col :xs="24" :sm="12" :md="8">
          <el-input
            v-model="store.searchQuery"
            placeholder="搜索 Skill 名称、描述或标签..."
            :prefix-icon="Search"
            clearable
          />
        </el-col>
        <el-col :xs="24" :sm="12" :md="16">
          <div class="tag-filter">
            <el-icon class="filter-icon"><Filter /></el-icon>
            <el-check-tag
              v-for="tag in store.allTags"
              :key="tag"
              :checked="store.selectedTags.includes(tag)"
              @change="handleTagClick(tag)"
              class="filter-tag"
            >
              {{ tag }}
            </el-check-tag>
            <el-button
              v-if="store.selectedTags.length > 0 || store.searchQuery"
              link
              size="small"
              type="info"
              @click="clearFilters"
            >
              清除筛选
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 批量操作栏 -->
    <div class="batch-bar">
      <el-button
        link
        type="primary"
        @click="store.selectAllVisible"
      >
        {{ store.filteredSkills.every(s => store.selectedSkillIds.includes(s.id)) ? '取消全选' : '全选当前' }}
      </el-button>
      <span class="hint">点击卡片即可勾选/取消</span>
    </div>

    <!-- Skill 列表 -->
    <el-empty v-if="store.filteredSkills.length === 0" description="没有找到匹配的 Skill" />

    <el-row :gutter="16" v-else>
      <el-col
        v-for="skill in store.filteredSkills"
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
.home-view {
  padding-bottom: 40px;
}
.stats-bar {
  margin-bottom: 16px;
}
.stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
}
.filter-card {
  margin-bottom: 16px;
}
.tag-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.filter-icon {
  color: var(--el-text-color-secondary);
  margin-right: 4px;
}
.filter-tag {
  cursor: pointer;
}
.batch-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 0 4px;
}
.hint {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
.skill-col {
  margin-bottom: 16px;
}
</style>
