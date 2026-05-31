<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="app">
    <AppHeader />
    <main class="main">
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="12" y1="8" x2="12" y2="16"/>
            </svg>
            <span>Skills Zoom</span>
          </div>
          <span class="footer-desc">AI Skill 发现与分享平台</span>
        </div>
        <div class="footer-links">
          <a href="https://github.com/duguBoss/skills-zoom" target="_blank" class="footer-link">GitHub</a>
          <router-link to="/submit-form" class="footer-link">投稿</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--c-bg);
}
.main {
  flex: 1;
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 24px 48px;
}

.footer {
  border-top: 1px solid var(--c-border);
  padding: 20px 24px;
  background: var(--c-surface);
}
.footer-inner {
  max-width: 1160px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--c-text);
}
.footer-logo svg {
  color: var(--c-primary);
}
.footer-desc {
  font-size: 0.75rem;
  color: var(--c-text-muted);
}
.footer-links {
  display: flex;
  gap: 16px;
}
.footer-link {
  font-size: 0.8rem;
  color: var(--c-text-secondary);
  font-weight: 500;
  transition: color var(--transition);
}
.footer-link:hover {
  color: var(--c-primary);
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 768px) {
  .main {
    padding: 12px 14px 32px;
  }
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>