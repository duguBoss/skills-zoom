<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import AppHeader from '@/components/AppHeader.vue'

const crashError = ref<string | null>(null)

onErrorCaptured((err: unknown) => {
  if (err instanceof Error) {
    crashError.value = err.message + '\n' + err.stack
  } else {
    crashError.value = String(err)
  }
  return false
})
</script>

<template>
  <div class="app">
    <AppHeader />
    <main class="main">
      <div v-if="crashError" style="padding: 40px; margin: 40px; color: #dc2626; background: #fee2e2; border: 2px solid #ef4444; border-radius: 12px; font-size: 16px; white-space: pre-wrap;">
        <strong>[系统级运行时错误] 页面加载失败！</strong><br/><br/>
        {{ crashError }}
      </div>
      <RouterView v-else v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </main>
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-main">
          <div class="footer-brand">
            <div class="footer-logo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span>SkillsZoom</span>
            </div>
            <p class="footer-desc">经过验证的 AI Skill 应用市场</p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>产品</h4>
              <router-link to="/">Skill 市场</router-link>
              <router-link to="/bundles">服务组合</router-link>
              <router-link to="/submit">Skill 投稿</router-link>
            </div>
            <div class="link-group">
              <h4>资源</h4>
              <a href="https://github.com/duguBoss/skills-zoom" target="_blank">GitHub</a>
              <router-link to="/favorites">我的收藏</router-link>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span> SkillsZoom. All rights reserved.</span>
          <span>Made with precision</span>
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
  max-width: var(--max-w);
  width: 100%;
  margin: 0 auto;
  padding: 24px 24px 64px;
}

.footer {
  border-top: 1px solid var(--c-border-light);
  background: var(--c-bg-elevated);
}
.footer-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 48px 24px 24px;
}
.footer-main {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}
.footer-brand {
  max-width: 280px;
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--c-text);
  margin-bottom: 8px;
}
.footer-logo svg {
  color: var(--c-primary);
}
.footer-desc {
  font-size: 0.8rem;
  color: var(--c-text-muted);
  line-height: 1.5;
}
.footer-links {
  display: flex;
  gap: 64px;
}
.link-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.link-group h4 {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.link-group a {
  font-size: 0.85rem;
  color: var(--c-text-secondary);
  font-weight: 500;
  transition: color var(--t-fast);
}
.link-group a:hover {
  color: var(--c-primary);
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid var(--c-border-light);
  font-size: 0.75rem;
  color: var(--c-text-muted);
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 768px) {
  .main {
    padding: 16px 16px 40px;
  }
  .footer-inner {
    padding: 32px 16px 20px;
  }
  .footer-main {
    flex-direction: column;
    gap: 32px;
    margin-bottom: 28px;
  }
  .footer-links {
    gap: 40px;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 6px;
    align-items: flex-start;
  }
}
</style>
