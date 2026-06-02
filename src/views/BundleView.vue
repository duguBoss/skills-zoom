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
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span>行业场景化套餐引擎</span>
        </div>
        <h1 class="hero-title">
          像选购软件套装一样
          <span class="hero-highlight">一键导入工作流</span>
        </h1>
        <p class="hero-sub">每个套餐都是围绕真实行业场景精心组装的 Skill 组合，开箱即用，直接导入你的 Agent 平台</p>
      </div>
    </section>

    <!-- Filters -->
    <div class="filter-bar">
      <span class="filter-label">按行业筛选</span>
      <div class="filter-chips">
        <button
          :class="['filter-chip', { on: !bundleStore.selectedIndustry }]"
          @click="bundleStore.selectedIndustry = ''"
        >全部套餐</button>
        <button
          v-for="ind in (industries || [])"
          :key="ind"
          :class="['filter-chip', { on: bundleStore.selectedIndustry === ind }]"
          @click="bundleStore.selectedIndustry = bundleStore.selectedIndustry === ind ? '' : ind"
        >{{ ind }}</button>
      </div>
    </div>

    <!-- Bundle Grid -->
    <div class="bundle-list">
      <div
        v-for="bundle in (bundleStore.filteredBundles || [])"
        :key="bundle.id"
        class="bundle-card"
        :style="{ '--bcolor': bundle.color }"
        @click="goBundle(bundle.id)"
      >
        <div class="bundle-accent"></div>
        <div class="bundle-body">
          <div class="bundle-header">
            <div class="bundle-icon">{{ bundle.icon }}</div>
            <div class="bundle-meta-badges">
              <span class="bmb industry">{{ bundle.industry }}</span>
              <span class="bmb difficulty">{{ bundle.difficulty }}</span>
            </div>
          </div>
          <h3 class="bundle-name">{{ bundle.name }}</h3>
          <p class="bundle-desc">{{ bundle.description }}</p>
          <div class="bundle-highlights">
            <span v-for="h in (bundle.highlights || [])" :key="h" class="hl-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {{ h }}
            </span>
          </div>
          <div class="bundle-footer">
            <div class="bundle-count">
              <span class="count-num">{{ bundle.skillIds?.length || 0 }}</span>
              <span class="count-label">个 Skill</span>
            </div>
            <button class="bundle-action">
              查看详情
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="(bundleStore.filteredBundles || []).length === 0" class="empty-state">
      <div class="empty-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
      </div>
      <p class="empty-title">暂无该行业的套餐</p>
      <p class="empty-desc">尝试选择其他行业分类</p>
    </div>
  </div>
</template>

<style scoped>
.bundles {
  padding-bottom: 40px;
}

.hero {
  position: relative;
  border-radius: var(--r-2xl);
  padding: 56px 48px;
  margin-bottom: 32px;
  overflow: hidden;
  background: linear-gradient(135deg, #fefce8 0%, #fff7ed 50%, #fdf2f8 100%);
  border: 1px solid rgba(245, 158, 11, 0.08);
}
.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 20% 30%, rgba(245, 158, 11, 0.06), transparent),
    radial-gradient(ellipse 50% 40% at 80% 70%, rgba(16, 185, 129, 0.05), transparent);
  pointer-events: none;
}
.hero-content {
  position: relative;
  z-index: 1;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 14px;
  border-radius: var(--r-full);
  background: #fff;
  border: 1px solid var(--c-border);
  color: var(--c-amber);
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 20px;
  box-shadow: var(--shadow-xs);
}
.hero-title {
  font-size: 2.6rem;
  font-weight: 900;
  color: var(--c-text);
  line-height: 1.15;
  letter-spacing: -1.5px;
  margin: 0 0 16px;
}
.hero-highlight {
  display: block;
  background: linear-gradient(135deg, #f59e0b, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  font-size: 1rem;
  color: var(--c-text-secondary);
  max-width: 520px;
  line-height: 1.65;
  margin: 0;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.filter-label {
  font-size: 0.8rem;
  color: var(--c-text-muted);
  font-weight: 700;
}
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filter-chip {
  padding: 6px 14px;
  border-radius: var(--r-full);
  border: 1.5px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--t-fast);
}
.filter-chip:hover {
  border-color: var(--c-border-hover);
  color: var(--c-text);
}
.filter-chip.on {
  background: var(--c-text);
  color: #fff;
  border-color: var(--c-text);
}

.bundle-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.bundle-card {
  position: relative;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--r-xl);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--t-base);
  display: flex;
}
.bundle-card:hover {
  border-color: var(--bcolor);
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
}
.bundle-accent {
  width: 4px;
  min-width: 4px;
  background: var(--bcolor);
}
.bundle-body {
  flex: 1;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}
.bundle-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.bundle-icon {
  font-size: 2.4rem;
  line-height: 1;
}
.bundle-meta-badges {
  display: flex;
  gap: 6px;
}
.bmb {
  font-size: 0.68rem;
  padding: 3px 10px;
  border-radius: var(--r-sm);
  font-weight: 700;
}
.bmb.industry {
  background: var(--c-primary-bg);
  color: var(--c-primary);
}
.bmb.difficulty {
  background: var(--c-amber-bg);
  color: var(--c-amber);
}
.bundle-name {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--c-text);
  margin: 0;
  letter-spacing: -0.3px;
}
.bundle-desc {
  font-size: 0.85rem;
  color: var(--c-text-secondary);
  line-height: 1.6;
  margin: 0;
}
.bundle-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.hl-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: var(--c-emerald);
  font-weight: 600;
  padding: 4px 10px;
  border-radius: var(--r-sm);
  background: var(--c-emerald-bg);
}
.bundle-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--c-border-light);
  margin-top: 4px;
}
.bundle-count {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.count-num {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--bcolor);
  line-height: 1;
}
.count-label {
  font-size: 0.78rem;
  color: var(--c-text-muted);
  font-weight: 500;
}
.bundle-action {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  border-radius: var(--r-md);
  background: var(--c-text);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  transition: all var(--t-fast);
}
.bundle-action:hover {
  background: var(--c-text-primary);
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--r-xl);
}
.empty-icon {
  margin-bottom: 16px;
  color: var(--c-text-placeholder);
}
.empty-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--c-text-secondary);
  margin: 0 0 4px;
}
.empty-desc {
  font-size: 0.82rem;
  color: var(--c-text-muted);
  margin: 0;
}

@media (max-width: 768px) {
  .hero {
    padding: 32px 24px;
    border-radius: var(--r-xl);
  }
  .hero-title {
    font-size: 1.7rem;
  }
  .bundle-list {
    grid-template-columns: 1fr;
  }
  .bundle-body {
    padding: 20px;
  }
  .filter-chips {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
  }
  .filter-chips::-webkit-scrollbar {
    display: none;
  }
}
</style>
