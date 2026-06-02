<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBundlesStore } from '@/stores/bundles'
import { useSkillsStore } from '@/stores/skills'
import { useFavoritesStore } from '@/stores/favorites'
import SkillCard from '@/components/SkillCard.vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const bundleStore = useBundlesStore()
const skillsStore = useSkillsStore()
const favStore = useFavoritesStore()

const bundle = computed(() => bundleStore.getBundleById(route.params.id as string))
const skills = computed(() => bundle.value ? bundleStore.getBundleSkills(bundle.value) : [])
const allSelected = computed(() => (skills.value || []).length > 0 && (skills.value || []).every(s => (skillsStore.selectedSkillIds || []).includes(s.id)))

const exportFormat = ref<'plain' | 'workbuddy' | 'kimi'>('plain')

function toggleSelectAll() {
  if (!bundle.value) return
  if (allSelected.value) {
    const ids = skills.value.map(s => s.id)
    skillsStore.selectedSkillIds = skillsStore.selectedSkillIds.filter(id => !ids.includes(id))
  } else {
    skillsStore.selectSkillIds(skills.value.map(s => s.id))
  }
}

function handleExport() {
  const selected = (skills.value || []).filter(s => (skillsStore.selectedSkillIds || []).includes(s.id))
  const toExport = selected.length > 0 ? selected : (skills.value || [])
  const content = skillsStore.exportSkillsAsConfig(toExport, exportFormat.value)
  const ext = exportFormat.value === 'workbuddy' ? 'json' : exportFormat.value === 'kimi' ? 'yaml' : 'txt'
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${bundle.value?.name || 'bundle'}-${exportFormat.value}.${ext}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  ElMessage.success(`已导出 ${toExport.length} 个 Skill`)
}

function handleCopy() {
  const selected = (skills.value || []).filter(s => (skillsStore.selectedSkillIds || []).includes(s.id))
  const toExport = selected.length > 0 ? selected : (skills.value || [])
  const content = skillsStore.exportSkillsAsConfig(toExport, exportFormat.value)
  navigator.clipboard.writeText(content).then(() => {
    ElMessage.success('已复制到剪贴板')
  })
}

function toggleFavBundle() {
  if (!bundle.value) return
  skills.value.forEach(s => {
    if (!favStore.isFavorited(s.id)) {
      favStore.toggleFavorite(s.id)
    }
  })
  ElMessage.success('已将套餐内所有 Skill 加入收藏')
}
</script>

<template>
  <div class="detail">
    <nav class="back-bar">
      <button class="back-link" @click="router.back()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        返回
      </button>
    </nav>

    <div v-if="!bundle" class="empty-state">
      <p>套餐不存在</p>
    </div>

    <template v-else>
      <!-- Bundle Hero -->
      <div class="bundle-hero" :style="{ '--bcolor': bundle.color }">
        <div class="bundle-hero-bg"></div>
        <div class="bundle-hero-content">
          <div class="bundle-hero-icon">{{ bundle.icon }}</div>
          <div class="bundle-hero-info">
            <div class="bundle-hero-badges">
              <span class="bhbadge industry">{{ bundle.industry }}</span>
              <span class="bhbadge difficulty">{{ bundle.difficulty }}</span>
            </div>
            <h1 class="bundle-hero-name">{{ bundle.name }}</h1>
            <p class="bundle-hero-desc">{{ bundle.description }}</p>
            <div class="bundle-hero-highlights">
              <span v-for="h in (bundle.highlights || [])" :key="h" class="bhl-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {{ h }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="tb-btn" @click="toggleSelectAll">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
            {{ allSelected ? '取消全选' : '全选套餐' }}
          </button>
          <button class="tb-btn" @click="handleCopy">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            复制配置
          </button>
          <div class="export-dropdown">
            <button class="tb-btn primary" @click="handleExport">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              导出配置
            </button>
            <div class="export-menu">
              <div class="em-label">导出格式</div>
              <label class="em-option" :class="{ active: exportFormat === 'plain' }"><input type="radio" v-model="exportFormat" value="plain" /> 纯文本 (.txt)</label>
              <label class="em-option" :class="{ active: exportFormat === 'workbuddy' }"><input type="radio" v-model="exportFormat" value="workbuddy" /> Workbuddy (.json)</label>
              <label class="em-option" :class="{ active: exportFormat === 'kimi' }"><input type="radio" v-model="exportFormat" value="kimi" /> Kimi CLI (.yaml)</label>
            </div>
          </div>
          <button class="tb-btn fav" @click="toggleFavBundle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            收藏全部
          </button>
        </div>
        <span class="result-count">共 {{ skills?.length || 0 }} 个 Skill</span>
      </div>

      <!-- Skills Grid -->
      <div class="skill-grid">
        <SkillCard v-for="skill in (skills || [])" :key="skill.id" :skill="skill" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.detail {
  padding-bottom: 40px;
}
.back-bar {
  margin-bottom: 16px;
}
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;
  color: var(--c-text-secondary);
  font-weight: 600;
  padding: 6px 12px;
  border-radius: var(--r-md);
  transition: all var(--t-fast);
}
.back-link:hover {
  color: var(--c-primary);
  background: var(--c-primary-bg-soft);
}

.bundle-hero {
  position: relative;
  border-radius: var(--r-2xl);
  padding: 40px;
  margin-bottom: 24px;
  overflow: hidden;
  background: linear-gradient(135deg, #faf5ff 0%, #f0f4ff 100%);
  border: 1px solid rgba(79, 70, 229, 0.08);
}
.bundle-hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 50% at 80% 20%, var(--bcolor) + '10', transparent);
  pointer-events: none;
}
.bundle-hero-content {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 24px;
}
.bundle-hero-icon {
  font-size: 3.2rem;
  line-height: 1;
  flex-shrink: 0;
}
.bundle-hero-info {
  flex: 1;
  min-width: 0;
}
.bundle-hero-badges {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}
.bhbadge {
  font-size: 0.72rem;
  padding: 4px 12px;
  border-radius: var(--r-sm);
  font-weight: 700;
}
.bhbadge.industry {
  background: var(--c-primary-bg);
  color: var(--c-primary);
}
.bhbadge.difficulty {
  background: var(--c-amber-bg);
  color: var(--c-amber);
}
.bundle-hero-name {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--c-text);
  margin: 0 0 10px;
  letter-spacing: -0.5px;
}
.bundle-hero-desc {
  font-size: 0.95rem;
  color: var(--c-text-secondary);
  line-height: 1.6;
  margin: 0 0 16px;
  max-width: 600px;
}
.bundle-hero-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.bhl-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.82rem;
  color: var(--c-emerald);
  font-weight: 700;
  padding: 5px 12px;
  border-radius: var(--r-sm);
  background: var(--c-emerald-bg);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
.toolbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.tb-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  font-size: 0.8rem;
  font-weight: 600;
  transition: all var(--t-fast);
}
.tb-btn:hover {
  border-color: var(--c-border-hover);
  color: var(--c-text);
  background: var(--c-surface-hover);
}
.tb-btn.primary {
  background: var(--c-text);
  color: #fff;
  border-color: var(--c-text);
}
.tb-btn.primary:hover {
  background: var(--c-text-primary);
}
.tb-btn.fav:hover {
  border-color: var(--c-amber);
  color: var(--c-amber);
}
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
  top: calc(100% + 6px);
  left: 0;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--r-lg);
  padding: 12px 14px;
  box-shadow: var(--shadow-xl);
  min-width: 190px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: all var(--t-base);
  z-index: 50;
}
.em-label {
  font-size: 0.7rem;
  color: var(--c-text-muted);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}
.em-option {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: var(--c-text-secondary);
  padding: 6px 0;
  cursor: pointer;
  transition: color var(--t-fast);
  font-weight: 500;
}
.em-option:hover, .em-option.active {
  color: var(--c-primary);
}
.result-count {
  font-size: 0.8rem;
  color: var(--c-text-muted);
  font-weight: 500;
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: var(--c-text-muted);
  font-size: 1rem;
}

@media (max-width: 768px) {
  .bundle-hero {
    padding: 24px;
    border-radius: var(--r-xl);
  }
  .bundle-hero-content {
    flex-direction: column;
    gap: 16px;
  }
  .bundle-hero-name {
    font-size: 1.4rem;
  }
  .skill-grid {
    grid-template-columns: 1fr;
  }
  .toolbar {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .skill-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
