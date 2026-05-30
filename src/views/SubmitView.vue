<script setup lang="ts">
import { Document, Connection, Promotion, SuccessFilled } from '@element-plus/icons-vue'
</script>

<template>
  <div class="submit-view">
    <el-card class="submit-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-icon size="20"><Promotion /></el-icon>
          <span>投稿说明</span>
        </div>
      </template>

      <el-alert
        title="欢迎投稿分享你的好用 Skill！"
        type="info"
        :closable="false"
        show-icon
        class="welcome-alert"
      />

      <div class="steps">
        <h3>
          <el-icon><Connection /></el-icon>
          投稿流程
        </h3>
        <el-steps direction="vertical" :active="3">
          <el-step title="关注公众号">
            <template #description>
              关注 <strong>黑曜石科技工坊</strong> 微信公众号，获取投稿渠道和最新动态。
            </template>
          </el-step>
          <el-step title="提交信息">
            <template #description>
              发送以下信息至公众号后台或指定渠道：
              <el-card shadow="never" class="info-card">
                <ul>
                  <li><strong>Skill 名称</strong>：项目的简短名称</li>
                  <li><strong>GitHub 地址</strong>：项目仓库链接</li>
                  <li><strong>简介说明</strong>：一句话描述项目用途和亮点</li>
                  <li><strong>标签</strong>：建议 2-5 个分类标签，如 "Vue3"、"AI工具"、"效率" 等</li>
                  <li><strong>作者/来源</strong>：项目作者或推荐人信息</li>
                </ul>
              </el-card>
            </template>
          </el-step>
          <el-step title="审核上架">
            <template #description>
              维护者审核通过后，会将你的 Skill 添加到本站点数据中，并为其打上标签分类。
              审核通常会在 <strong>3-5 个工作日</strong> 内完成。
            </template>
          </el-step>
        </el-steps>
      </div>

      <el-divider />

      <div class="rules">
        <h3>
          <el-icon><Document /></el-icon>
          投稿规范
        </h3>
        <el-timeline>
          <el-timeline-item type="success">
            <strong>好用优先</strong>：投稿的 Skill 必须是你实际使用过、觉得确实好用的项目
          </el-timeline-item>
          <el-timeline-item type="success">
            <strong>开源项目</strong>：优先推荐开源仓库（GitHub/GitLab 等），方便大家直接使用
          </el-timeline-item>
          <el-timeline-item type="success">
            <strong>信息完整</strong>：请尽量提供完整的项目信息和准确的标签分类
          </el-timeline-item>
          <el-timeline-item type="warning">
            <strong>禁止广告</strong>：纯商业推广、恶意软件、侵权项目将不予通过
          </el-timeline-item>
        </el-timeline>
      </div>

      <el-divider />

      <div class="contact">
        <h3>
          <el-icon><SuccessFilled /></el-icon>
          联系我们
        </h3>
        <p>如有任何问题或建议，欢迎通过以下方式联系：</p>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="公众号">黑曜石科技工坊</el-descriptions-item>
          <el-descriptions-item label="GitHub">
            <el-link type="primary" href="https://github.com/duguBoss/skills-zoom" target="_blank">
              duguBoss/skills-zoom
            </el-link>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.submit-view {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 40px;
}
.submit-card {
  margin-top: 8px;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
}
.welcome-alert {
  margin-bottom: 24px;
}
.steps h3,
.rules h3,
.contact h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: var(--el-text-color-primary);
}
.info-card {
  margin-top: 12px;
  background-color: var(--el-fill-color-light);
}
.info-card ul {
  margin: 0;
  padding-left: 20px;
}
.info-card li {
  margin-bottom: 8px;
  line-height: 1.6;
}
.contact p {
  color: var(--el-text-color-regular);
  margin-bottom: 16px;
}
</style>
