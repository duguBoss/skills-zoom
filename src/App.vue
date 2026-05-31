<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="app">
    <AppHeader />
    <main class="main">
      <RouterView />
    </main>
    <footer class="footer">
      <span class="footer-brand">Skills Zoom</span>
      <span class="footer-desc">关注 <strong>黑曜石科技工坊</strong> 投稿</span>
    </footer>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--sz-bg);
}
.main {
  flex: 1;
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 20px 40px;
}
.footer {
  border-top: 1px solid var(--sz-border);
  padding: 16px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 0.8rem;
  color: var(--sz-text-muted);
}
.footer-brand {
  font-weight: 600;
  color: var(--sz-text-secondary);
}
.footer-desc strong {
  color: var(--sz-primary);
  font-weight: 600;
}

@media (max-width: 768px) {
  .main {
    padding: 16px 14px 32px;
  }
}
</style>