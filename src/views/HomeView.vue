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
  <div class="home">
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1 class="hero-title">发现优质 <span class="gradient-text">AI Skill</span></h1>
        <p class="hero-sub">聚合分享最好用的 AI 技能、Agent 工具与开源项目</p>
      </div>
    </section>

    <section class="toolbar-section">
      <div class="search-wrap">
        <el-icon class="search-icon"><Search /></el-icon>
        <input
          v-model="store.searchQuery"
          class="search-input"
          placeholder="搜索 Skill 名称、描述或标签..."
        />
        <button v-if="store.searchQuery" class="search-clear" @click="store.searchQuery = ''">✕</button>
      </div>

      <div class="action-bar">
        <div class="action-left">
          <button class="tb-btn" @click="handleExport" :disabled="store.selectedSkillIds.length === 0">
            <el-icon><Download /></el-icon><span class="btn-text">导出</span>
          </button>
          <button class="tb-btn" @click="handleCopy" :disabled="store.selectedSkillIds.length === 0">
            <el-icon><Check /></el-icon><span class="btn-text">复制</span>
          </button>
          <button v-if="store.selectedSkillIds.length > 0" class="tb-btn warn" @click="store.clearSelection">
            <el-icon><Close /></el-icon><span class="btn-text">清空</span>
          </button>
          <span v-if="store.selectedSkillIds.length > 0" class="sel-count">
            已选 {{ store.selectedSkillIds.length }}
          </span>
        </div>
        <button class="select-all" @click="store.selectAllVisible">
          {{ store.filteredSkills.every(s => store.selectedSkillIds.includes(s.id)) ? '取消全选' : '全选当前' }}
        </button>
      </div>
    </section>

    <section class="tags-section" v-if="store.allTags.length > 0">
      <div class="tags-scroll">
        <button
          v-for="tag in store.allTags"
          :key="tag"
          :class="['tag-chip', { active: store.selectedTags.includes(tag) }]"
          @click="handleTagClick(tag)"
        >{{ tag }}</button>
        <button
          v-if="store.selectedTags.length > 0 || store.searchQuery"
          class="tag-chip clear"
          @click="clearFilters"
        >清除筛选</button>
      </div>
    </section>

    <div class="result-info">
      <span class="total">共 {{ store.filteredSkills.length }} 个 Skill</span>
    </div>

    <div v-if="store.filteredSkills.length === 0" class="empty">
      <div class="empty-icon">🔍</div>
      <p class="empty-text">没有找到匹配的 Skill</p>
      <button class="empty-btn" @click="clearFilters">清除筛选</button>
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
.home {
  padding-bottom: 60px;
}
.hero {
  position: relative;
  text-align: center;
  padding: 48px 0 36px;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 70%);
  pointer-events: none;
}
.hero-content {
  position: relative;
}
.hero-title {
  margin: 0 0 10px;
  font-size: 32px;
  font-weight: 800;
  color: var(--sz-text);
  letter-spacing: -0.5px;
  line-height: 1.2;
}
.gradient-text {
  background: var(--sz-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  margin: 0;
  font-size: 15px;
  color: var(--sz-text-secondary);
}

.toolbar-section {
  margin-bottom: 16px;
}
.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.search-icon {
  position: absolute;
  left: 14px;
  color: var(--sz-text-muted);
  font-size: 16px;
  pointer-events: none;
}
.search-input {
  width: 100%;
  background: var(--sz-bg-card);
  border: 1px solid var(--sz-border);
  border-radius: var(--sz-radius-md);
  padding: 11px 40px 11px 42px;
  color: var(--sz-text);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}
.search-input::placeholder {
  color: var(--sz-text-muted);
}
.search-input:focus {
  border-color: var(--sz-primary);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}
.search-clear {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--sz-text-muted);
  cursor: pointer;
  font-size: 12px;
  padding: 4px;
}
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.action-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.tb-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 14px;
  border-radius: var(--sz-radius-sm);
  border: 1px solid var(--sz-border);
  background: var(--sz-bg-card);
  color: var(--sz-text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.tb-btn:hover:not(:disabled) {
  border-color: var(--sz-primary);
  color: var(--sz-primary-light);
}
.tb-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.tb-btn.warn:hover {
  border-color: #ef4444;
  color: #ef4444;
}
.sel-count {
  font-size: 13px;
  color: var(--sz-accent);
  font-weight: 600;
}
.select-all {
  background: none;
  border: none;
  color: var(--sz-primary-light);
  font-size: 13px;
  cursor: pointer;
  padding: 0;
}
.select-all:hover {
  text-decoration: underline;
}

.tags-section {
  margin-bottom: 16px;
}
.tags-scroll {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag-chip {
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid var(--sz-border);
  background: var(--sz-bg-card);
  color: var(--sz-text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
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
.tag-chip.clear {
  border-style: dashed;
  color: var(--sz-text-muted);
}
.tag-chip.clear:hover {
  color: var(--sz-accent);
  border-color: var(--sz-accent);
}

.result-info {
  margin-bottom: 16px;
}
.total {
  font-size: 13px;
  color: var(--sz-text-muted);
}

.empty {
  text-align: center;
  padding: 60px 0;
}
.empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
}
.empty-text {
  color: var(--sz-text-muted);
  margin: 0 0 16px;
  font-size: 14px;
}
.empty-btn {
  padding: 8px 20px;
  border-radius: var(--sz-radius-sm);
  border: 1px solid var(--sz-border);
  background: var(--sz-bg-card);
  color: var(--sz-text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.empty-btn:hover {
  border-color: var(--sz-primary);
  color: var(--sz-primary-light);
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 14px;
}

@media (max-width: 768px) {
  .hero {
    padding: 28px 0 20px;
  }
  .hero-title {
    font-size: 24px;
  }
  .hero-sub {
    font-size: 13px;
  }
  .btn-text {
    display: none;
  }
  .tb-btn {
    padding: 7px 10px;
  }
  .skill-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .tags-scroll {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
  }
  .tags-scroll::-webkit-scrollbar {
    display: none;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .skill-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
