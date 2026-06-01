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
const allSelected = computed(() => skills.value.length > 0 && skills.value.every(s => skillsStore.selectedSkillIds.includes(s.id)))

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
  const selected = skills.value.filter(s => skillsStore.selectedSkillIds.includes(s.id))
  const toExport = selected.length > 0 ? selected : skills.value
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
  const selected = skills.value.filter(s => skillsStore.selectedSkillIds.includes(s.id))
  const toExport = selected.length > 0 ? selected : skills.value
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

    <div v-if="!bundle" class="empty">
      <p>套餐不存在</p>
    </div>

    <template v-else>
      <div class="bundle-hero" :style="{ '--bcolor': bundle.color }">
        <div class="bundle-hero-icon">{{ bundle.icon }}</div>
        <div class="bundle-hero-info">
          <div class="bundle-hero-badges">
            <span class="bhbadge industry">{{ bundle.industry }}</span>
            <span class="bhbadge difficulty">{{ bundle.difficulty }}</span>
          </div>
          <h1 class="bundle-hero-name">{{ bundle.name }}</h1>
          <p class="bundle-hero-desc">{{ bundle.description }}</p>
          <div class="bundle-hero-highlights">
            <span v-for="h in bundle.highlights" :key="h" class="bhl-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {{ h }}
            </span>
          </div>
        </div>
      </div>

      <div class="bundle-toolbar">
        <div class="toolbar-left">
          <button class="tb-btn" @click="toggleSelectAll">
            {{ allSelected ? '取消全选' : '全选套餐' }}
          </button>
          <button class="tb-btn" @click="handleCopy">复制配置</button>
          <div class="export-wrap">
            <button class="tb-btn primary" @click="handleExport">
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
          <button class="tb-btn fav" @click="toggleFavBundle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            收藏全部
          </button>
        </div>
        <span class="result-count">共 {{ skills.length }} 个 Skill</span>
      </div>

      <div class="grid">
        <SkillCard v-for="skill in skills" :key="skill.id" :skill="skill" />
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
  gap: 4px;
  font-size: 0.85rem;
  color: var(--c-text-secondary);
  font-weight: 500;
  transition: color var(--transition);
}
.back-link:hover {
  color: var(--c-primary);
}

.bundle-hero {
  background: linear-gradient(135deg, #fff 0%, #f8f7ff 100%);
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-xl);
  padding: 32px;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  gap: 22px;
  position: relative;
  overflow: hidden;
}
.bundle-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: var(--bcolor);
}
.bundle-hero-icon {
  font-size: 3rem;
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
  margin-bottom: 8px;
}
.bhbadge {
  font-size: 0.7rem;
  padding: 3px 10px;
  border-radius: 6px;
  font-weight: 600;
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
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--c-text);
  margin: 0 0 8px;
  letter-spacing: -0.3px;
}
.bundle-hero-desc {
  font-size: 0.9rem;
  color: var(--c-text-secondary);
  line-height: 1.6;
  margin: 0 0 14px;
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
  font-size: 0.8rem;
  color: var(--c-emerald);
  font-weight: 600;
}

.bundle-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
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
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.tb-btn:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
}
.tb-btn.primary {
  background: var(--c-primary);
  color: #fff;
  border-color: var(--c-primary);
}
.tb-btn.primary:hover {
  background: var(--c-primary-dark);
  border-color: var(--c-primary-dark);
}
.tb-btn.fav:hover {
  border-color: var(--c-amber);
  color: var(--c-amber);
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
.result-count {
  font-size: 0.78rem;
  color: var(--c-text-muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.empty {
  text-align: center;
  padding: 60px 0;
  color: var(--c-text-muted);
  font-size: 1rem;
}

@media (max-width: 768px) {
  .bundle-hero {
    padding: 22px;
    flex-direction: column;
    gap: 14px;
  }
  .bundle-hero-name {
    font-size: 1.2rem;
  }
  .grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .bundle-toolbar {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
