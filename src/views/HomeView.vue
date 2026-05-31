<script setup lang="ts">
import { ref } from 'vue'
import { useSkillsStore } from '@/stores/skills'
import SkillCard from '@/components/SkillCard.vue'
import { ElMessage } from 'element-plus'

const store = useSkillsStore()
const mobileFilterOpen = ref(false)

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
      <h1 class="hero-title">发现优质 <em>AI Skill</em></h1>
      <p class="hero-sub">收集、分享、管理最好用的 AI 技能和插件，让 AI 助手能力无限扩展</p>
    </section>

    <section class="controls">
      <div class="search-bar">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>
        </svg>
        <input
          v-model="store.searchQuery"
          class="search-input"
          placeholder="搜索 Skill 名称、描述或标签..."
        />
        <button v-if="store.searchQuery" class="clear-search" @click="store.searchQuery = ''">✕</button>
      </div>

      <div class="action-row">
        <div class="action-left">
          <button class="act-btn" @click="handleExport" :disabled="store.selectedSkillIds.length === 0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            导出
          </button>
          <button class="act-btn" @click="handleCopy" :disabled="store.selectedSkillIds.length === 0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            复制
          </button>
          <button v-if="store.selectedSkillIds.length > 0" class="act-btn danger" @click="store.clearSelection">
            清空
          </button>
          <span v-if="store.selectedSkillIds.length > 0" class="sel-badge">
            已选 {{ store.selectedSkillIds.length }}
          </span>
        </div>
        <div class="action-right">
          <button class="act-btn" @click="store.selectAllVisible">
            {{ store.filteredSkills.every(s => store.selectedSkillIds.includes(s.id)) ? '取消全选' : '全选当前' }}
          </button>
          <span class="count-tag">{{ store.filteredSkills.length }} 个 Skill</span>
        </div>
      </div>
    </section>

    <section class="tag-section">
      <div class="tag-scroll">
        <button
          v-for="tag in store.allTags"
          :key="tag"
          :class="['tag-chip', { on: store.selectedTags.includes(tag) }]"
          @click="store.toggleTag(tag)"
        >{{ tag }}</button>
        <button
          v-if="store.selectedTags.length > 0 || store.searchQuery"
          class="tag-chip reset"
          @click="store.selectedTags = []; store.searchQuery = ''"
        >重置筛选</button>
      </div>
    </section>

    <div v-if="store.filteredSkills.length === 0" class="empty">
      <div class="empty-icon">🔍</div>
      <p>没有匹配的 Skill</p>
      <button class="empty-btn" @click="store.selectedTags = []; store.searchQuery = ''">清除筛选</button>
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
  text-align: center;
  padding: 32px 0 28px;
}
.hero-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--sz-text);
  margin: 0 0 6px;
  letter-spacing: -0.5px;
}
.hero-title em {
  font-style: normal;
  color: var(--sz-primary);
}
.hero-sub {
  font-size: 0.9rem;
  color: var(--sz-text-secondary);
  margin: 0;
  max-width: 480px;
  margin: 0 auto;
}

.controls {
  margin-bottom: 16px;
}
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.search-icon {
  position: absolute;
  left: 12px;
  color: var(--sz-text-muted);
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 10px 36px 10px 38px;
  border: 1.5px solid var(--sz-border);
  border-radius: var(--sz-radius);
  background: var(--sz-bg-card);
  font-size: 0.88rem;
  color: var(--sz-text);
  outline: none;
  transition: border-color var(--sz-transition);
}
.search-input::placeholder {
  color: var(--sz-text-muted);
}
.search-input:focus {
  border-color: var(--sz-primary);
}
.clear-search {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: var(--sz-text-muted);
  font-size: 0.8rem;
  padding: 4px;
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.action-left,
.action-right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.act-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 7px;
  border: 1.5px solid var(--sz-border);
  background: var(--sz-bg-card);
  color: var(--sz-text-secondary);
  font-size: 0.8rem;
  font-weight: 500;
  transition: all var(--sz-transition);
}
.act-btn:hover:not(:disabled) {
  border-color: var(--sz-primary);
  color: var(--sz-primary);
}
.act-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.act-btn.danger:hover {
  border-color: var(--sz-danger);
  color: var(--sz-danger);
}
.sel-badge {
  font-size: 0.78rem;
  color: var(--sz-primary);
  font-weight: 600;
}
.count-tag {
  font-size: 0.78rem;
  color: var(--sz-text-muted);
}

.tag-section {
  margin-bottom: 18px;
}
.tag-scroll {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag-chip {
  padding: 4px 11px;
  border-radius: 20px;
  border: 1.5px solid var(--sz-border);
  background: var(--sz-bg-card);
  color: var(--sz-text-secondary);
  font-size: 0.76rem;
  cursor: pointer;
  transition: all var(--sz-transition);
  white-space: nowrap;
}
.tag-chip:hover {
  border-color: var(--sz-primary);
  color: var(--sz-primary);
}
.tag-chip.on {
  background: var(--sz-primary);
  color: #fff;
  border-color: var(--sz-primary);
}
.tag-chip.reset {
  border-style: dashed;
  color: var(--sz-text-muted);
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
.empty-btn {
  padding: 6px 16px;
  border-radius: 7px;
  border: 1.5px solid var(--sz-border);
  background: var(--sz-bg-card);
  color: var(--sz-text-secondary);
  font-size: 0.82rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
}

@media (max-width: 768px) {
  .hero {
    padding: 20px 0;
  }
  .hero-title {
    font-size: 1.4rem;
  }
  .hero-sub {
    font-size: 0.82rem;
  }
  .grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .tag-scroll {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
  }
  .tag-scroll::-webkit-scrollbar { display: none; }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>