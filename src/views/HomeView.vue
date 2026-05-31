<script setup lang="ts">
import { ref } from 'vue'
import { useSkillsStore } from '@/stores/skills'
import SkillCard from '@/components/SkillCard.vue'
import { ElMessage } from 'element-plus'

const store = useSkillsStore()

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
  a.download = `skills-${new Date().toISOString().slice(0, 10)}.txt`
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
  })
}
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          AI Skill Marketplace
        </div>
        <h1 class="hero-title">
          发现 &amp; 管理<br/>
          <span class="hero-highlight">优质 AI Skill</span>
        </h1>
        <p class="hero-sub">汇集 MCP 服务器、AI 编程助手、Prompt 模板等能力扩展方案，让 AI 助手发挥无限潜能</p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">{{ store.skills.length }}</span>
            <span class="stat-label">收录 Skill</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">{{ store.allTags.length }}</span>
            <span class="stat-label">分类标签</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">GitHub</span>
            <span class="stat-label">开源仓库</span>
          </div>
        </div>
      </div>
    </section>

    <section class="controls">
      <div class="search-row">
        <div class="search-wrap">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>
          </svg>
          <input
            v-model="store.searchQuery"
            class="search-input"
            placeholder="搜索 Skill 名称、描述或标签..."
          />
          <button v-if="store.searchQuery" class="search-clear" @click="store.searchQuery = ''">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div class="action-row">
        <div class="tag-scroll">
          <button
            v-for="tag in store.allTags"
            :key="tag"
            :class="['tag-chip', { on: store.selectedTags.includes(tag) }]"
            @click="store.toggleTag(tag)"
          >{{ tag }}</button>
        </div>
        <button
          v-if="store.selectedTags.length > 0 || store.searchQuery"
          class="reset-chip"
          @click="store.selectedTags = []; store.searchQuery = ''"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          重置
        </button>
      </div>

      <div class="toolbar">
        <div class="toolbar-left">
          <button class="tb-btn" @click="store.selectAllVisible">
            {{ store.filteredSkills.every(s => store.selectedSkillIds.includes(s.id)) ? '取消全选' : '全选当前' }}
          </button>
          <button class="tb-btn" @click="handleCopy" :disabled="store.selectedSkillIds.length === 0">复制地址</button>
          <button class="tb-btn primary" @click="handleExport" :disabled="store.selectedSkillIds.length === 0">导出文件</button>
          <span v-if="store.selectedSkillIds.length > 0" class="sel-count">
            已选 {{ store.selectedSkillIds.length }} / {{ store.filteredSkills.length }}
          </span>
        </div>
        <span class="result-count">共 {{ store.filteredSkills.length }} 个 Skill</span>
      </div>
    </section>

    <div v-if="store.filteredSkills.length === 0" class="empty">
      <div class="empty-art">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--c-text-muted)">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>
        </svg>
      </div>
      <p class="empty-title">没有匹配的 Skill</p>
      <p class="empty-sub">试试调整筛选条件或搜索关键词</p>
      <button class="empty-btn" @click="store.selectedTags = []; store.searchQuery = ''">清除所有筛选</button>
    </div>

    <div v-else class="grid">
      <SkillCard v-for="skill in store.filteredSkills" :key="skill.id" :skill="skill" />
    </div>
  </div>
</template>

<style scoped>
.home {
  padding-bottom: 20px;
}

.hero {
  background: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 40%, #ecfeff 100%);
  border-radius: var(--radius-xl);
  padding: 44px 40px;
  margin-bottom: 28px;
  position: relative;
  overflow: hidden;
}
.hero::after {
  content: '';
  position: absolute;
  top: -60%;
  right: -20%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
.hero-content {
  position: relative;
  z-index: 1;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  background: var(--c-primary-bg);
  color: var(--c-primary);
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 16px;
}
.hero-title {
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--c-text);
  line-height: 1.2;
  letter-spacing: -1px;
  margin: 0 0 12px;
}
.hero-highlight {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  font-size: 0.95rem;
  color: var(--c-text-secondary);
  max-width: 500px;
  line-height: 1.6;
  margin: 0 0 24px;
}
.hero-stats {
  display: flex;
  align-items: center;
  gap: 20px;
}
.stat {
  display: flex;
  flex-direction: column;
}
.stat-num {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--c-primary);
  letter-spacing: -0.5px;
}
.stat-label {
  font-size: 0.75rem;
  color: var(--c-text-muted);
  margin-top: 2px;
}
.stat-divider {
  width: 1px;
  height: 36px;
  background: var(--c-border);
}

.controls {
  margin-bottom: 18px;
}
.search-row {
  margin-bottom: 14px;
}
.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  left: 15px;
  color: var(--c-text-muted);
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 11px 44px 11px 42px;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius);
  background: var(--c-surface);
  font-size: 0.87rem;
  color: var(--c-text);
  outline: none;
  transition: all var(--transition);
}
.search-input::placeholder {
  color: var(--c-text-muted);
}
.search-input:focus {
  border-color: var(--c-primary);
  box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
}
.search-clear {
  position: absolute;
  right: 12px;
  padding: 4px;
  color: var(--c-text-muted);
  border-radius: 4px;
  transition: color var(--transition);
}
.search-clear:hover {
  color: var(--c-text);
}

.action-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}
.tag-scroll {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
}
.tag-chip {
  padding: 5px 13px;
  border-radius: 20px;
  border: 1.5px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  font-size: 0.76rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
  white-space: nowrap;
}
.tag-chip:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
}
.tag-chip.on {
  background: var(--c-primary);
  color: #fff;
  border-color: var(--c-primary);
}
.reset-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-radius: 20px;
  border: 1.5px dashed var(--c-border);
  color: var(--c-text-muted);
  font-size: 0.76rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all var(--transition);
}
.reset-chip:hover {
  border-color: var(--c-rose);
  color: var(--c-rose);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.toolbar-left {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.tb-btn {
  padding: 6px 13px;
  border-radius: 7px;
  border: 1.5px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  font-size: 0.78rem;
  font-weight: 500;
  transition: all var(--transition);
}
.tb-btn:hover:not(:disabled) {
  border-color: var(--c-primary);
  color: var(--c-primary);
}
.tb-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.tb-btn.primary {
  background: var(--c-primary);
  color: #fff;
  border-color: var(--c-primary);
}
.tb-btn.primary:hover:not(:disabled) {
  background: var(--c-primary-dark);
  border-color: var(--c-primary-dark);
}
.sel-count {
  font-size: 0.78rem;
  color: var(--c-primary);
  font-weight: 600;
  margin-left: 4px;
}
.result-count {
  font-size: 0.78rem;
  color: var(--c-text-muted);
}

.empty {
  text-align: center;
  padding: 60px 20px;
}
.empty-art {
  margin-bottom: 16px;
  opacity: 0.5;
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
  margin: 0 0 16px;
}
.empty-btn {
  padding: 8px 20px;
  border-radius: 8px;
  border: 1.5px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  font-size: 0.83rem;
  font-weight: 500;
  transition: all var(--transition);
}
.empty-btn:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

@media (max-width: 768px) {
  .hero {
    padding: 28px 20px;
    border-radius: var(--radius-lg);
    margin-bottom: 20px;
  }
  .hero-title {
    font-size: 1.6rem;
  }
  .hero-sub {
    font-size: 0.85rem;
  }
  .hero-stats {
    gap: 12px;
  }
  .stat-num {
    font-size: 1.1rem;
  }
  .grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .tag-scroll {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
  }
  .tag-scroll::-webkit-scrollbar {
    display: none;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hero-title {
    font-size: 2rem;
  }
}
</style>