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
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg">
        <div class="glow glow-1"></div>
        <div class="glow glow-2"></div>
      </div>
      <div class="hero-content">
        <div class="hero-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>全新重构的 AI 能力组装中心</span>
        </div>
        <h1 class="hero-title">
          发现优质 AI Skill
          <span class="hero-highlight">构建超级 AI 助手</span>
        </h1>
        <p class="hero-sub">汇集精选的 Cursor 规则、Agent 指令集、Prompt 模板等纯粹的 Skill 扩展配置，帮助您快速赋能 AI 助手，统一团队规范，打造专业的个人工作流。</p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-num">{{ store.skills?.length || 0 }}</span>
            <span class="stat-label">已验证 Skill</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">{{ bundleStore.bundles?.length || 0 }}</span>
            <span class="stat-label">精选套餐</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">{{ store.allCategories?.length || 0 }}</span>
            <span class="stat-label">覆盖领域</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Global Skill Explanation -->
    <section class="skill-explanation">
      <div class="se-container">
        <div class="se-content">
          <h2 class="se-title">什么是全局 Skill (Global Skill)？</h2>
          <p class="se-desc">
            全局 Skill 是一种在 AI Agent 中跨会话持久生效的核心能力配置（例如 <strong>.cursorrules</strong>、<strong>系统级 Prompt</strong> 或是<strong>底层工作流规范</strong>）。它赋予 AI 稳定的专业角色、行业知识和标准化的处理模式。
            <br/><br/>
            只要配置了全局 Skill，你的 AI 就像加载了专属的“被动技能”，无需每次对话重复设定。在这里，你可以一键发现并组装这些经过开源验证的全局技能。
          </p>
          <div class="se-features">
            <div class="sef-item">
              <div class="sef-icon primary-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
              <span>结构化指令集与规则</span>
            </div>
            <div class="sef-item">
              <div class="sef-icon cyan-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></div>
              <span>轻量级，一键应用</span>
            </div>
            <div class="sef-item">
              <div class="sef-icon amber-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
              <span>开源社区验证的最佳实践</span>
            </div>
          </div>
        </div>
        <div class="se-visual">
          <div class="orbit-container">
            <div class="center-core">
              <span>AI Core</span>
              <div class="core-pulse"></div>
            </div>
            <div class="orbit-ring ring-1"></div>
            <div class="orbit-ring ring-2"></div>
            <div class="satellite sat-1">
              <div class="sat-inner">Rules</div>
            </div>
            <div class="satellite sat-2">
              <div class="sat-inner">Prompt</div>
            </div>
            <div class="satellite sat-3">
              <div class="sat-inner">Config</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bundles Preview -->
    <section class="bundles-section">
      <div class="section-header">
        <div class="section-title-group">
          <h2 class="section-title">热门服务组合</h2>
          <p class="section-desc">围绕真实行业场景精心组装的 Skill 组合，开箱即用，释放无尽可能</p>
        </div>
        <router-link to="/bundles" class="section-link">
          探索全部组合
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </router-link>
      </div>
      <div class="bundle-grid">
        <div
          v-for="bundle in bundleStore.bundles.slice(0, 4)"
          :key="bundle.id"
          class="bundle-card"
          :style="{ '--bcolor': bundle.color }"
          @click="goBundle(bundle.id)"
        >
          <div class="bundle-glow"></div>
          <div class="bundle-top">
            <div class="bundle-icon">{{ bundle.icon }}</div>
            <div class="bundle-count">{{ bundle.skillIds?.length || 0 }} Skills</div>
          </div>
          <h3 class="bundle-name">{{ bundle.name }}</h3>
          <p class="bundle-desc">{{ bundle.description }}</p>
          <div class="bundle-tags">
            <span class="bundle-tag industry">{{ bundle.industry }}</span>
            <span class="bundle-tag difficulty">{{ bundle.difficulty }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters & List -->
    <section class="market-section">
      <div class="market-header">
        <div class="market-title-wrap">
          <h2 class="section-title">Skill 市场</h2>
          <span class="result-count">{{ store.filteredSkills?.length || 0 }} 项结果</span>
        </div>
        
        <div class="toolbar">
          <button class="tb-btn" @click="store.selectAllVisible">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
            {{ (store.filteredSkills || []).every(s => (store.selectedSkillIds || []).includes(s.id)) ? '取消全选' : '全选当前' }}
          </button>
          <button class="tb-btn" @click="handleCopy" :disabled="(store.selectedSkillIds?.length || 0) === 0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            复制配置
          </button>
          <div class="export-dropdown">
            <button class="tb-btn primary-btn" @click="handleExport" :disabled="(store.selectedSkillIds?.length || 0) === 0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              导出构建
            </button>
            <div class="export-menu">
              <div class="em-label">选择目标格式</div>
              <label class="em-option" :class="{ active: exportFormat === 'plain' }">
                <input type="radio" v-model="exportFormat" value="plain" /> 纯文本 (.txt)
              </label>
              <label class="em-option" :class="{ active: exportFormat === 'workbuddy' }">
                <input type="radio" v-model="exportFormat" value="workbuddy" /> Workbuddy (.json)
              </label>
              <label class="em-option" :class="{ active: exportFormat === 'kimi' }">
                <input type="radio" v-model="exportFormat" value="kimi" /> Kimi CLI (.yaml)
              </label>
            </div>
          </div>
          <span v-if="(store.selectedSkillIds?.length || 0) > 0" class="sel-badge">
            已选择 {{ store.selectedSkillIds?.length || 0 }} 项
          </span>
        </div>
      </div>

      <div class="filters-container">
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>
          </svg>
          <input
            v-model="store.searchQuery"
            class="search-input"
            placeholder="搜索 Skill 名称、核心描述、领域标签..."
          />
          <button v-if="store.searchQuery" class="search-clear" @click="store.searchQuery = ''">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="filter-group">
          <div class="fg-label">类别</div>
          <div class="filter-chips">
            <button
              :class="['cat-chip', { on: !store.selectedCategory }]"
              @click="store.selectedCategory = ''"
            >全部</button>
            <button
              v-for="cat in store.allCategories"
              :key="cat"
              :class="['cat-chip', { on: store.selectedCategory === cat }]"
              @click="store.selectedCategory = store.selectedCategory === cat ? '' : cat"
            >{{ cat }}</button>
          </div>
        </div>

        <div class="filter-group">
          <div class="fg-label">标签</div>
          <div class="tag-chips">
            <button
              v-for="tag in (store.allTags || [])"
              :key="tag"
              :class="['tag-chip', { on: store.selectedTags.includes(tag) }]"
              @click="store.toggleTag(tag)"
            >{{ tag }}</button>
          </div>
        </div>

        <div v-if="store.selectedTags.length > 0 || store.searchQuery || store.selectedCategory" class="active-filters">
          <span class="af-label">当前条件：</span>
          <span v-if="store.selectedCategory" class="af-chip" @click="store.selectedCategory = ''">{{ store.selectedCategory }} &times;</span>
          <span v-for="tag in store.selectedTags" :key="tag" class="af-chip" @click="store.toggleTag(tag)">{{ tag }} &times;</span>
          <span v-if="store.searchQuery" class="af-chip" @click="store.searchQuery = ''">搜索: {{ store.searchQuery }} &times;</span>
          <button class="af-clear" @click="store.selectedTags = []; store.searchQuery = ''; store.selectedCategory = ''">清空筛选</button>
        </div>
      </div>

      <div v-if="(store.filteredSkills?.length || 0) === 0" class="empty-state">
        <div class="empty-visual">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        </div>
        <h3 class="empty-title">未找到匹配的 Skill</h3>
        <p class="empty-desc">尝试放宽搜索条件，或者调整标签组合以发现更多内容。</p>
        <button class="empty-btn" @click="store.selectedTags = []; store.searchQuery = ''; store.selectedCategory = ''">重置所有筛选</button>
      </div>

      <div v-else class="skill-grid">
        <SkillCard v-for="skill in (store.filteredSkills || [])" :key="skill.id" :skill="skill" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  padding-bottom: 40px;
}

/* ==========================================================================
   Typography & Shared
   ========================================================================== */
.section-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--c-text);
  margin: 0;
  letter-spacing: -0.5px;
}
.section-desc {
  font-size: 0.95rem;
  color: var(--c-text-muted);
  margin: 0;
}
.section-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.95rem;
  color: var(--c-primary);
  font-weight: 700;
  transition: all var(--t-fast);
  padding: 8px 16px;
  border-radius: var(--r-full);
  background: var(--c-primary-bg-soft);
}
.section-link:hover {
  gap: 10px;
  background: var(--c-primary-bg);
  color: var(--c-primary-dark);
}

/* ==========================================================================
   Hero Section
   ========================================================================== */
.hero {
  position: relative;
  border-radius: var(--r-2xl);
  padding: 80px 60px;
  margin-bottom: 60px;
  overflow: hidden;
  background: var(--c-surface);
  border: 1px solid var(--c-border-light);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background-color: #fafcff;
}
.glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
  animation: float 10s ease-in-out infinite alternate;
}
.glow-1 {
  top: -200px;
  left: -100px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.4), rgba(124, 58, 237, 0.2));
}
.glow-2 {
  bottom: -200px;
  right: -100px;
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(56, 189, 248, 0.2));
  animation-delay: -5s;
}

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 50px) scale(1.1); }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: var(--r-full);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(79, 70, 229, 0.2);
  color: var(--c-primary-dark);
  font-size: 0.85rem;
  font-weight: 800;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.08);
}
.hero-badge svg {
  color: var(--c-primary);
}
.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--c-text-primary);
  line-height: 1.1;
  letter-spacing: -2px;
  margin: 0 0 24px;
}
.hero-highlight {
  display: block;
  background: linear-gradient(135deg, var(--c-primary), #0ea5e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 8px;
}
.hero-sub {
  font-size: 1.15rem;
  color: var(--c-text-secondary);
  max-width: 680px;
  line-height: 1.7;
  margin: 0 0 40px;
}
.hero-stats {
  display: flex;
  align-items: center;
  gap: 40px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  padding: 20px 48px;
  border-radius: var(--r-2xl);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: var(--shadow-md);
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.stat-num {
  font-size: 2rem;
  font-weight: 900;
  color: var(--c-primary-dark);
  letter-spacing: -1px;
  line-height: 1;
}
.stat-label {
  font-size: 0.85rem;
  color: var(--c-text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.stat-divider {
  width: 1px;
  height: 48px;
  background: var(--c-border);
}

/* ==========================================================================
   Global Skill Explanation Section
   ========================================================================== */
.skill-explanation {
  background: var(--c-surface);
  border-radius: var(--r-2xl);
  border: 1px solid var(--c-border-light);
  box-shadow: var(--shadow-sm);
  margin-bottom: 60px;
  overflow: hidden;
}
.se-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}
.se-content {
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.se-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--c-text-primary);
  margin-bottom: 24px;
  letter-spacing: -0.5px;
}
.se-desc {
  font-size: 1.05rem;
  color: var(--c-text-secondary);
  line-height: 1.8;
  margin-bottom: 32px;
}
.se-desc strong {
  color: var(--c-text-primary);
  font-weight: 700;
  background: var(--c-primary-bg-soft);
  padding: 2px 6px;
  border-radius: var(--r-sm);
}
.se-features {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.sef-item {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--c-text-primary);
}
.sef-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--r-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
}
.primary-icon { background: var(--c-primary-bg); color: var(--c-primary); }
.cyan-icon { background: var(--c-cyan-bg); color: var(--c-cyan); }
.amber-icon { background: var(--c-amber-bg); color: var(--c-amber); }

.se-visual {
  background: linear-gradient(135deg, var(--c-primary-dark), var(--c-primary));
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.orbit-container {
  position: relative;
  width: 300px;
  height: 300px;
}
.center-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 1.1rem;
  z-index: 10;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
}
.core-pulse {
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  animation: pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
}
@keyframes pulse {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}
.orbit-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.2);
}
.ring-1 { width: 180px; height: 180px; animation: spin 20s linear infinite; }
.ring-2 { width: 280px; height: 280px; animation: spin 30s linear infinite reverse; }

.satellite {
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: var(--r-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--c-primary-dark);
  font-size: 0.85rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 20;
}
.sat-inner {
  transform: rotate(0deg); /* Counter-rotate logic would go here if needed */
}
.sat-1 { top: -30px; left: 50%; transform: translateX(-50%); }
.sat-2 { bottom: -30px; right: 20%; transform: translateX(-50%); }
.sat-3 { top: 50%; left: -30px; transform: translateY(-50%); }

@keyframes spin {
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}


/* ==========================================================================
   Bundles Section
   ========================================================================== */
.bundles-section {
  margin-bottom: 60px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}
.bundle-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.bundle-card {
  position: relative;
  background: var(--c-surface);
  border: 1px solid var(--c-border-light);
  border-radius: var(--r-2xl);
  padding: 32px 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.bundle-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--bcolor, var(--c-primary));
  opacity: 0.8;
  transition: height 0.3s ease;
}
.bundle-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: transparent;
}
.bundle-card:hover .bundle-glow {
  height: 6px;
}
.bundle-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bundle-icon {
  font-size: 2.5rem;
  line-height: 1;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
}
.bundle-count {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--c-primary-dark);
  padding: 6px 12px;
  border-radius: var(--r-full);
  background: var(--c-primary-bg);
  border: 1px solid rgba(79, 70, 229, 0.1);
}
.bundle-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--c-text-primary);
  margin: 0;
  line-height: 1.4;
}
.bundle-desc {
  font-size: 0.85rem;
  color: var(--c-text-secondary);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.bundle-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
}
.bundle-tag {
  font-size: 0.7rem;
  padding: 4px 12px;
  border-radius: var(--r-full);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.bundle-tag.industry {
  background: var(--c-surface-hover);
  color: var(--c-text-secondary);
  border: 1px solid var(--c-border);
}
.bundle-tag.difficulty {
  background: var(--c-amber-bg);
  color: var(--c-amber);
  border: 1px solid rgba(245, 158, 11, 0.2);
}

/* ==========================================================================
   Market Section & Filters
   ========================================================================== */
.market-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 20px;
}
.market-title-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
}
.result-count {
  font-size: 0.85rem;
  color: var(--c-text-muted);
  font-weight: 600;
  background: var(--c-surface-hover);
  padding: 4px 12px;
  border-radius: var(--r-full);
  border: 1px solid var(--c-border-light);
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.tb-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: var(--r-lg);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  font-size: 0.9rem;
  font-weight: 700;
  transition: all var(--t-fast);
  box-shadow: var(--shadow-xs);
}
.tb-btn:hover:not(:disabled) {
  border-color: var(--c-border-hover);
  color: var(--c-text-primary);
  background: var(--c-surface-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}
.tb-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}
.primary-btn {
  background: var(--c-primary);
  color: #fff;
  border-color: var(--c-primary);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}
.primary-btn:hover:not(:disabled) {
  background: var(--c-primary-dark);
  border-color: var(--c-primary-dark);
  color: #fff;
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
}
.sel-badge {
  font-size: 0.85rem;
  color: var(--c-primary-dark);
  font-weight: 800;
  padding: 6px 16px;
  border-radius: var(--r-full);
  background: var(--c-primary-bg);
  border: 1px solid rgba(79, 70, 229, 0.15);
}

/* Filters */
.filters-container {
  background: var(--c-surface);
  border: 1px solid var(--c-border-light);
  border-radius: var(--r-2xl);
  padding: 24px 32px;
  margin-bottom: 32px;
  box-shadow: var(--shadow-sm);
}
.search-box {
  position: relative;
  margin-bottom: 24px;
}
.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--c-text-placeholder);
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 16px 56px 16px 52px;
  border: 2px solid var(--c-border-light);
  border-radius: var(--r-xl);
  background: var(--c-bg);
  font-size: 1rem;
  color: var(--c-text-primary);
  transition: all var(--t-fast);
  font-weight: 600;
}
.search-input::placeholder {
  color: var(--c-text-muted);
  font-weight: 500;
}
.search-input:focus {
  border-color: var(--c-primary-light);
  background: var(--c-surface);
  box-shadow: var(--shadow-glow);
}
.search-clear {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  padding: 6px;
  color: var(--c-text-placeholder);
  border-radius: var(--r-sm);
  transition: all var(--t-fast);
}
.search-clear:hover {
  color: var(--c-text-secondary);
  background: var(--c-border-light);
}

.filter-group {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 16px;
}
.filter-group:last-of-type {
  margin-bottom: 0;
}
.fg-label {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--c-text-secondary);
  width: 48px;
  padding-top: 8px;
}
.filter-chips, .tag-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1;
}
.cat-chip, .tag-chip {
  padding: 8px 18px;
  border-radius: var(--r-full);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--t-fast);
}
.cat-chip:hover, .tag-chip:hover {
  border-color: var(--c-primary-light);
  color: var(--c-primary-dark);
  background: var(--c-primary-bg-soft);
  transform: translateY(-1px);
}
.cat-chip.on, .tag-chip.on {
  background: var(--c-primary);
  color: #fff;
  border-color: var(--c-primary);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.active-filters {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px dashed var(--c-border);
}
.af-label {
  font-size: 0.8rem;
  color: var(--c-text-muted);
  font-weight: 700;
}
.af-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: var(--r-full);
  background: var(--c-primary-bg);
  border: 1px solid rgba(79, 70, 229, 0.15);
  font-size: 0.8rem;
  color: var(--c-primary-dark);
  font-weight: 700;
  cursor: pointer;
  transition: all var(--t-fast);
}
.af-chip:hover {
  background: var(--c-rose-bg);
  color: var(--c-rose);
  border-color: rgba(244, 63, 94, 0.2);
}
.af-clear {
  font-size: 0.8rem;
  color: var(--c-text-secondary);
  font-weight: 700;
  margin-left: auto;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.af-clear:hover {
  color: var(--c-text-primary);
}

/* ==========================================================================
   Export Dropdown
   ========================================================================== */
.export-dropdown {
  position: relative;
  display: inline-block;
}
.export-dropdown:hover .export-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.export-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--c-surface);
  border: 1px solid var(--c-border-light);
  border-radius: var(--r-xl);
  padding: 16px;
  box-shadow: var(--shadow-xl);
  min-width: 220px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all var(--t-base);
  z-index: 50;
}
.em-label {
  font-size: 0.75rem;
  color: var(--c-text-muted);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--c-border-light);
}
.em-option {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: var(--c-text-secondary);
  padding: 10px 8px;
  border-radius: var(--r-md);
  cursor: pointer;
  transition: all var(--t-fast);
  font-weight: 600;
}
.em-option:hover, .em-option.active {
  color: var(--c-primary-dark);
  background: var(--c-primary-bg-soft);
}
.em-option input {
  accent-color: var(--c-primary);
  width: 16px;
  height: 16px;
}

/* ==========================================================================
   Empty State & Grid
   ========================================================================== */
.empty-state {
  text-align: center;
  padding: 100px 20px;
  background: var(--c-surface);
  border: 1px dashed var(--c-border);
  border-radius: var(--r-2xl);
}
.empty-visual {
  margin-bottom: 24px;
  color: var(--c-border-hover);
  animation: float 6s ease-in-out infinite alternate;
}
.empty-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--c-text-primary);
  margin: 0 0 8px;
}
.empty-desc {
  font-size: 0.95rem;
  color: var(--c-text-muted);
  margin: 0 0 24px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
.empty-btn {
  padding: 12px 28px;
  border-radius: var(--r-full);
  border: 1.5px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-primary);
  font-size: 0.95rem;
  font-weight: 700;
  transition: all var(--t-fast);
  box-shadow: var(--shadow-sm);
}
.empty-btn:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}

/* ==========================================================================
   Responsive
   ========================================================================== */
@media (max-width: 1024px) {
  .bundle-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .skill-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .se-container {
    grid-template-columns: 1fr;
  }
  .se-visual {
    min-height: 300px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 24px;
    margin-bottom: 40px;
  }
  .hero-title {
    font-size: 2.2rem;
  }
  .hero-sub {
    font-size: 1rem;
  }
  .hero-stats {
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding: 24px;
  }
  .stat-divider {
    width: 100%;
    height: 1px;
  }
  .bundle-grid, .skill-grid {
    grid-template-columns: 1fr;
  }
  .filters-container {
    padding: 20px;
  }
  .filter-group {
    flex-direction: column;
    gap: 12px;
  }
  .fg-label {
    padding-top: 0;
  }
  .se-content {
    padding: 40px 24px;
  }
  .se-title {
    font-size: 1.75rem;
  }
}
</style>
