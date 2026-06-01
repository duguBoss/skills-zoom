<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBundlesStore } from '@/stores/bundles'

const router = useRouter()
const bundleStore = useBundlesStore()

const industries = computed(() => bundleStore.allIndustries)

function goBundle(id: string) {
  router.push(`/bundle/${id}`)
}
</script>

<template>
  <div class="bundles">
    <section class="hero">
      <div class="hero-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        行业场景化套餐引擎
      </div>
      <h1 class="hero-title">
        像选购软件套装一样<br/>
        <span class="hero-highlight">一键导入工作流</span>
      </h1>
      <p class="hero-sub">每个套餐都是围绕真实行业场景精心组装的 Skill 组合，开箱即用，直接导入你的 Agent 平台</p>
    </section>

    <section class="filter-bar">
      <div class="filter-label">按行业筛选：</div>
      <div class="filter-chips">
        <button
          :class="['filter-chip', { on: !bundleStore.selectedIndustry }]"
          @click="bundleStore.selectedIndustry = ''"
        >全部</button>
        <button
          v-for="ind in industries"
          :key="ind"
          :class="['filter-chip', { on: bundleStore.selectedIndustry === ind }]"
          @click="bundleStore.selectedIndustry = bundleStore.selectedIndustry === ind ? '' : ind"
        >{{ ind }}</button>
      </div>
    </section>

    <div class="bundle-list">
      <div
        v-for="bundle in bundleStore.filteredBundles"
        :key="bundle.id"
        class="bundle-row"
        :style="{ '--bcolor': bundle.color }"
        @click="goBundle(bundle.id)"
      >
        <div class="bundle-left">
          <div class="bundle-icon-large">{{ bundle.icon }}</div>
          <div class="bundle-main">
            <div class="bundle-header">
              <h3 class="bundle-name">{{ bundle.name }}</h3>
              <div class="bundle-badges">
                <span class="bbadge industry">{{ bundle.industry }}</span>
                <span class="bbadge difficulty">{{ bundle.difficulty }}</span>
              </div>
            </div>
            <p class="bundle-desc">{{ bundle.description }}</p>
            <div class="bundle-highlights">
              <span v-for="h in bundle.highlights" :key="h" class="hl-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {{ h }}
              </span>
            </div>
          </div>
        </div>
        <div class="bundle-right">
          <div class="bundle-count">
            <span class="count-num">{{ bundle.skillIds.length }}</span>
            <span class="count-label">个 Skill</span>
          </div>
          <button class="bundle-action">查看详情 &rarr;</button>
        </div>
      </div>
    </div>

    <div v-if="bundleStore.filteredBundles.length === 0" class="empty">
      <p>暂无该行业的套餐组合</p>
    </div>
  </div>
</template>

<style scoped>
.bundles {
  padding-bottom: 40px;
}
.hero {
  background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 40%, #ecfdf5 100%);
  border-radius: var(--radius-xl);
  padding: 44px 40px;
  margin-bottom: 28px;
  position: relative;
  overflow: hidden;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  background: #fff;
  color: var(--c-amber);
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 16px;
}
.hero-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--c-text);
  line-height: 1.2;
  letter-spacing: -1px;
  margin: 0 0 12px;
}
.hero-highlight {
  background: linear-gradient(135deg, #f59e0b, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  font-size: 0.95rem;
  color: var(--c-text-secondary);
  max-width: 520px;
  line-height: 1.6;
  margin: 0;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.filter-label {
  font-size: 0.8rem;
  color: var(--c-text-muted);
  font-weight: 500;
}
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.filter-chip {
  padding: 5px 13px;
  border-radius: 20px;
  border: 1.5px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  font-size: 0.76rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}
.filter-chip:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
}
.filter-chip.on {
  background: var(--c-primary);
  color: #fff;
  border-color: var(--c-primary);
}

.bundle-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.bundle-row {
  background: var(--c-surface);
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.bundle-row:hover {
  border-color: var(--bcolor);
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  transform: translateY(-1px);
}
.bundle-left {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  flex: 1;
  min-width: 0;
}
.bundle-icon-large {
  font-size: 2.4rem;
  line-height: 1;
  flex-shrink: 0;
}
.bundle-main {
  flex: 1;
  min-width: 0;
}
.bundle-header {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}
.bundle-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0;
}
.bundle-badges {
  display: flex;
  gap: 5px;
}
.bbadge {
  font-size: 0.68rem;
  padding: 3px 9px;
  border-radius: 6px;
  font-weight: 600;
}
.bbadge.industry {
  background: var(--c-primary-bg);
  color: var(--c-primary);
}
.bbadge.difficulty {
  background: var(--c-amber-bg);
  color: var(--c-amber);
}
.bundle-desc {
  font-size: 0.82rem;
  color: var(--c-text-secondary);
  line-height: 1.55;
  margin: 0 0 10px;
}
.bundle-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.hl-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: var(--c-emerald);
  font-weight: 500;
}
.hl-item svg {
  color: var(--c-emerald);
}
.bundle-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  flex-shrink: 0;
}
.bundle-count {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.count-num {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--bcolor);
  line-height: 1;
}
.count-label {
  font-size: 0.72rem;
  color: var(--c-text-muted);
  margin-top: 2px;
}
.bundle-action {
  padding: 7px 16px;
  border-radius: 8px;
  background: var(--bcolor);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  transition: opacity var(--transition);
}
.bundle-action:hover {
  opacity: 0.9;
}

.empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--c-text-muted);
  font-size: 1rem;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
}

@media (max-width: 768px) {
  .hero {
    padding: 28px 20px;
    border-radius: var(--radius-lg);
  }
  .hero-title {
    font-size: 1.5rem;
  }
  .bundle-row {
    flex-direction: column;
    align-items: flex-start;
    padding: 18px;
  }
  .bundle-right {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .bundle-left {
    gap: 12px;
  }
  .bundle-icon-large {
    font-size: 2rem;
  }
}
</style>
