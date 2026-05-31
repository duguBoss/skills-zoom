<script setup lang="ts">
import { useSkillsStore } from '@/stores/skills'
import SkillCard from '@/components/SkillCard.vue'
import { Search, Download, Check, Close } from '@element-plus/icons-vue'
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
    <div class="hero">
      <h1 class="hero-title">发现优质 AI Skill</h1>
      <p class="hero-subtitle">聚合分享最好用的 AI 技能、Agent 工具与开源项目</p>
    </div>

    <div class="toolbar">
      <div class="search-box">
        <el-icon class="search-icon"><Search /></el-icon>
        <input
          v-model="store.searchQuery"
          class="search-input"
          placeholder="搜索 Skill 名称、描述或标签..."
        />
        <button v-if="store.searchQuery" class="search-clear" @click="store.searchQuery = ''">✕</button>
      </div>

      <div class="toolbar-actions">
        <button
          class="tb-btn"
          @click="handleExport"
          :disabled="store.selectedSkillIds.length === 0"
        >
          <el-icon><Download /></el-icon> 导出
        </button>
        <button
          class="tb-btn"
          @click="handleCopy"
          :disabled="store.selectedSkillIds.length === 0"
        >
          <el-icon><Check /></el-icon> 复制
        </button>
        <button
          v-if="store.selectedSkillIds.length > 0"
          class="tb-btn danger"
          @click="store.clearSelection"
        >
          <el-icon><Close /></el-icon> 清空
        </button>
        <span v-if="store.selectedSkillIds.length > 0" class="selected-count">
          已选 {{ store.selectedSkillIds.length }}
        </span>
      </div>
    </div>

    <div class="tag-bar">
      <button
        v-for="tag in store.allTags"
        :key="tag"
        :class="['tag-chip', { active: store.selectedTags.includes(tag) }]"
        @click="handleTagClick(tag)"
      >
        {{ tag }}
      </button>
      <button
        v-if="store.selectedTags.length > 0 || store.searchQuery"
        class="clear-btn"
        @click="clearFilters"
      >
        清除筛选
      </button>
    </div>

    <div class="batch-bar">
      <button class="select-all-btn" @click="store.selectAllVisible">
        {{ store.filteredSkills.every(s => store.selectedSkillIds.includes(s.id)) ? '取消全选' : '全选当前' }}
      </button>
      <span class="total-count">共 {{ store.filteredSkills.length }} 个 Skill</span>
    </div>

    <div v-if="store.filteredSkills.length === 0" class="empty-state">
      <div class="empty-icon">🔍</div>
      <p>没有找到匹配的 Skill</p>
    </div>

    <div class="skill-grid" v-else>
      <SkillCard
        v-for="skill in store.filteredSkills"
        :key="skill.id"
        :skill="skill"
      />
    </div>
  </div>
</template>

<style scoped>
.home-view {
  padding-bottom: 60px;
}
.hero {
  text-align: center;
  padding: 40px 0 32px;
}
.hero-title {
  margin: 0 0 12px;
  font-size: 36px;
  font-weight: 800;
  background: var(--sz-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}
.hero-subtitle {
  margin: 0;
  font-size: 16px;
  color: var(--sz-text-secondary);
}
.toolbar {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.search-box {
  flex: 1;
  min-width: 260px;
  position: relative;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  left: 14px;
  color: var(--sz-text-secondary);
  font-size: 16px;
}
.search-input {
  width: 100%;
  background: var(--sz-bg-card);
  border: 1px solid var(--sz-border);
  border-radius: 10px;
  padding: 10px 40px 10px 40px;
  color: var(--sz-text);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}
.search-input::placeholder {
  color: var(--sz-text-secondary);
}
.search-input:focus {
  border-color: var(--sz-primary);
}
.search-clear {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--sz-text-secondary);
  cursor: pointer;
  font-size: 12px;
  padding: 4px;
}
.toolbar-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.tb-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--sz-border);
  background: var(--sz-bg-card);
  color: var(--sz-text);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.tb-btn:hover:not(:disabled) {
  border-color: var(--sz-primary);
  color: var(--sz-primary-light);
}
.tb-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.tb-btn.danger:hover {
  border-color: #e74c3c;
  color: #e74c3c;
}
.selected-count {
  font-size: 13px;
  color: var(--sz-accent);
  font-weight: 600;
}
.tag-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
.tag-chip {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid var(--sz-border);
  background: var(--sz-bg-card);
  color: var(--sz-text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.tag-chip:hover {
  border-color: var(--sz-primary);
  color: var(--sz-primary-light);
}
.tag-chip.active {
  background: var(--sz-primary);
  color: #fff;
  border-color: var(--sz-primary);
}
.clear-btn {
  padding: 6px 14px;
  border-radius: 20px;
  border: none;
  background: none;
  color: var(--sz-text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: color 0.2s;
}
.clear-btn:hover {
  color: var(--sz-accent);
}
.batch-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}
.select-all-btn {
  background: none;
  border: none;
  color: var(--sz-primary-light);
  font-size: 13px;
  cursor: pointer;
  padding: 0;
}
.select-all-btn:hover {
  text-decoration: underline;
}
.total-count {
  font-size: 13px;
  color: var(--sz-text-secondary);
}
.empty-state {
  text-align: center;
  padding: 60px 0;
  color: var(--sz-text-secondary);
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
</style>
