<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSkillsStore } from '@/stores/skills'
import { useBundlesStore } from '@/stores/bundles'
import SkillCard from '@/components/SkillCard.vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const store = useSkillsStore()
const bundleStore = useBundlesStore()

const exportFormat = ref<'plain' | 'workbuddy' | 'kimi'>('plain')
const showExportMenu = ref(false)

function handleExport() {
  if (store.selectedSkillIds.length === 0) {
    ElMessage.warning('请先选择至少一个 Skill')
    return
  }
  const skills = store.selectedSkills
  const content = store.exportSkillsAsConfig(skills, exportFormat.value)
  const ext = exportFormat.value === 'workbuddy' ? 'json' : exportFormat.value === 'kimi' ? 'yaml' : 'txt'
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `skills-${exportFormat.value}-${new Date().toISOString().slice(0, 10)}.${ext}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  ElMessage.success(`已导出 ${store.selectedSkillIds.length} 个 Skill (${exportFormat.value})`)
  showExportMenu.value = false
}

function handleCopy() {
  if (store.selectedSkillIds.length === 0) {
    ElMessage.warning('请先选择至少一个 Skill')
    return
  }
  const content = store.exportSkillsAsConfig(store.selectedSkills, exportFormat.value)
  navigator.clipboard.writeText(content).then(() => {
    ElMessage.success('已复制到剪贴板')
  })
}

function goBundle(id: string) {
  router.push(`/bundle/${id}`)
}
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          经过验证的 Skill 应用市场
        </div>
        <h1 class="hero-title">
          发现优质 AI Skill<br/>
          <span class="hero-highlight">一键组装工作流</span>
        </h1>
        <p class="hero-sub">汇集 MCP 服务器、AI 编程助手、Prompt 模板等经过验证的能力扩展，降低从「发现」到「落地」的摩擦成本</p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">{{ store.skills.length }}</span>
            <span class="stat-label">已验证 Skill</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">{{ bundleStore.bundles.length }}</span>
            <span class="stat-label">行业套餐</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">{{ store.allCategories.length }}</span>
            <span class="stat-label">覆盖领域</span>
          </div>
        </div>
      </div>
    </section>

    <section class="bundles-preview">
      <div class="section-head">
        <h2 class="section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          热门服务组合
        </h2>
        <router-link to="/bundles" class="section-more">查看全部 &rarr;</router-link>
      </div>
      <div class="bundle-grid">
        <div
          v-for="bundle in bundleStore.bundles.slice(0, 4)"
          :key="bundle.id"
          class="bundle-card"
          :style="{ '--bcolor': bundle.color }"
          @click="goBundle(bundle.id)"
        >
          <div class="bundle-icon">{{ bundle.icon }}</div>
          <div class="bundle-info">
            <h3 class="bundle-name">{{ bundle.name }}</h3>
            <p class="bundle-desc">{{ bundle.description }}</p>
            <div class="bundle-tags">
              <span class="bundle-tag" :style="{ background: bundle.color + '18', color: bundle.color }">{{ bundle.industry }}</span>
              <span class="bundle-tag" :style="{ background: bundle.color + '18', color: bundle.color }">{{ bundle.difficulty }}</span>
              <span class="bundle-tag" :style="{ background: bundle.color + '18', color: bundle.color }">{{ bundle.skillIds.length }} 个 Skill</span>
            </div>
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
            placeholder="搜索 Skill 名称、描述、标签或行业..."
          />
          <button v-if="store.searchQuery" class="search-clear" @click="store.searchQuery = ''">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div class="filter-row">
        <div class="category-scroll">
          <button
            :class="['cat-chip', { on: !store.selectedCategory }]"
            @click="store.selectedCategory = ''"
          >全部行业</button>
          <button
            v-for="cat in store.allCategories"
            :key="cat"
            :class="['cat-chip', { on: store.selectedCategory === cat }]"
            @click="store.selectedCategory = store.selectedCategory === cat ? '' : cat"
          >{{ cat }}</button>
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
          v-if="store.selectedTags.length > 0 || store.searchQuery || store.selectedCategory"
          class="reset-chip"
          @click="store.selectedTags = []; store.searchQuery = ''; store.selectedCategory = ''"
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
          <button class="tb-btn" @click="handleCopy" :disabled="store.selectedSkillIds.length === 0">复制</button>
          <div class="export-wrap">
            <button class="tb-btn primary" @click="handleExport" :disabled="store.selectedSkillIds.length === 0">
              导出配置
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="export-menu">
              <div class="export-label">导出格式</div>
              <label class="export-option"><input type="radio" v-model="exportFormat" value="plain" /> 纯文本 (.txt)</label>
              <label class="export-option"><input type="radio" v-model="exportFormat" value="workbuddy" /> Workbuddy (.json)</label>
              <label class="export-option"><input type="radio" v-model="exportFormat" value="kimi" /> Kimi CLI (.yaml)</label>
            </div>
          </div>
          <span v-if="store.selectedSkillIds.length > 0" class="sel-count">
            已选 {{ store.selectedSkillIds.length }}
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
      <button class="empty-btn" @click="store.selectedTags = []; store.searchQuery = ''; store.selectedCategory = ''">清除所有筛选</button>
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
  max-width: 540px;
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

.bundles-preview {
  margin-bottom: 28px;
}
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.section-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0;
}
.section-more {
  font-size: 0.8rem;
  color: var(--c-primary);
  font-weight: 500;
  transition: opacity var(--transition);
}
.section-more:hover {
  opacity: 0.7;
}
.bundle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
}
.bundle-card {
  background: var(--c-surface);
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 20px;
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  align-items: flex-start;
  gap: 14px;
}
.bundle-card:hover {
  border-color: var(--bcolor);
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  transform: translateY(-2px);
}
.bundle-icon {
  font-size: 1.8rem;
  line-height: 1;
  flex-shrink: 0;
}
.bundle-info {
  flex: 1;
  min-width: 0;
}
.bundle-name {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 5px;
}
.bundle-desc {
  font-size: 0.78rem;
  color: var(--c-text-secondary);
  line-height: 1.5;
  margin: 0 0 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.bundle-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.bundle-tag {
  font-size: 0.68rem;
  padding: 3px 9px;
  border-radius: 6px;
  font-weight: 600;
}

.controls {
  margin-bottom: 18px;
}
.search-row {
  margin-bottom: 12px;
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

.filter-row {
  margin-bottom: 10px;
}
.category-scroll {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.cat-chip {
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
.cat-chip:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
}
.cat-chip.on {
  background: var(--c-primary);
  color: #fff;
  border-color: var(--c-primary);
}

.action-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
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
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.tb-btn.primary:hover:not(:disabled) {
  background: var(--c-primary-dark);
  border-color: var(--c-primary-dark);
}
.export-wrap {
  position: relative;
  display: inline-block;
}
.export-wrap:hover .export-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.export-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  box-shadow: var(--c-shadow-lg);
  min-width: 180px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: all var(--transition);
  z-index: 50;
}
.export-label {
  font-size: 0.7rem;
  color: var(--c-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}
.export-option {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--c-text-secondary);
  padding: 5px 0;
  cursor: pointer;
  transition: color var(--transition);
}
.export-option:hover {
  color: var(--c-primary);
}
.export-option input {
  accent-color: var(--c-primary);
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
  .bundle-grid {
    grid-template-columns: 1fr;
  }
  .grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .tag-scroll, .category-scroll {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
  }
  .tag-scroll::-webkit-scrollbar, .category-scroll::-webkit-scrollbar {
    display: none;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid, .bundle-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hero-title {
    font-size: 2rem;
  }
}
</style>
