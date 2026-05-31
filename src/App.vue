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
        <span class="footer-desc">好用的 AI Skill 分享平台 · 关注 <strong>黑曜石科技工坊</strong> 投稿</span>
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
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px;
  box-sizing: border-box;
}
.app-footer {
  border-top: 1px solid var(--sz-border);
  background: var(--sz-bg-surface);
}
.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.footer-brand {
  font-size: 14px;
  font-weight: 600;
  background: var(--sz-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.footer-desc {
  font-size: 13px;
  color: var(--sz-text-secondary);
}
.footer-desc strong {
  color: var(--sz-primary-light);
}
</style>
