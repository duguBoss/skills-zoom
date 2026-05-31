<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="app-wrapper">
    <AppHeader />
    <main class="main-content">
      <RouterView />
    </main>
    <footer class="app-footer">
      <div class="footer-inner">
        <span class="footer-brand">⚡ Skills Zoom</span>
        <span class="footer-desc">好用的 AI Skill 分享平台 · <strong>黑曜石科技工坊</strong></span>
      </div>
    </footer>
  </div>
</template>

<style>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--sz-bg);
}
.main-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 28px 20px;
}
.app-footer {
  border-top: 1px solid var(--sz-border);
  background: var(--sz-bg-surface);
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}
.footer-brand {
  font-size: 13px;
  font-weight: 600;
  background: var(--sz-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.footer-desc {
  font-size: 12px;
  color: var(--sz-text-muted);
}
.footer-desc strong {
  color: var(--sz-primary-light);
}

@media (max-width: 768px) {
  .main-content {
    padding: 16px 12px;
  }
  .footer-inner {
    flex-direction: column;
    text-align: center;
    gap: 4px;
  }
}
</style>
