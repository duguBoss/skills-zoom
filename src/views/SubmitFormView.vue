<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Promotion, Document, SuccessFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()

const formRef = ref()
const submitting = ref(false)

const form = reactive({
  name: '',
  repoUrl: '',
  description: '',
  tags: '',
  author: '',
})

const rules = {
  name: [
    { required: true, message: '请输入 Skill 名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
  ],
  repoUrl: [
    { required: true, message: '请输入仓库地址', trigger: 'blur' },
    { type: 'url', message: '请输入有效的 URL 地址', trigger: 'blur' },
  ],
  description: [
    { required: true, message: '请输入简介说明', trigger: 'blur' },
    { min: 10, max: 300, message: '长度在 10 到 300 个字符', trigger: 'blur' },
  ],
  tags: [
    { required: true, message: '请输入标签', trigger: 'blur' },
  ],
  author: [
    { required: true, message: '请输入作者/来源', trigger: 'blur' },
  ],
}

async function handleSubmit() {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
    submitting.value = true

    const tags = form.tags
      .split(/[,，]/)
      .map(t => t.trim())
      .filter(t => t.length > 0)

    const payload = {
      name: form.name.trim(),
      repoUrl: form.repoUrl.trim(),
      description: form.description.trim(),
      tags,
      author: form.author.trim(),
    }

    const existing = localStorage.getItem('skills-zoom-submissions')
    const submissions = existing ? JSON.parse(existing) : []
    submissions.push({
      ...payload,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'pending',
    })
    localStorage.setItem('skills-zoom-submissions', JSON.stringify(submissions))

    ElMessage.success('投稿成功！审核通过后将上架展示。')
    router.push('/')
  } catch {
    // 表单校验失败
  } finally {
    submitting.value = false
  }
}

function handleReset() {
  formRef.value?.resetFields()
}
</script>

<template>
  <div class="submit-form-view">
    <el-card class="submit-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-icon size="20"><Promotion /></el-icon>
          <span>在线投稿</span>
        </div>
      </template>

      <el-alert
        title="欢迎投稿分享你的好用 Skill！"
        type="info"
        :closable="false"
        show-icon
        class="welcome-alert"
      />

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        class="submit-form"
      >
        <el-form-item label="Skill 名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="项目的简短名称"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="GitHub 仓库地址" prop="repoUrl">
          <el-input
            v-model="form.repoUrl"
            placeholder="https://github.com/xxx/xxx"
          />
        </el-form-item>

        <el-form-item label="简介说明" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="4"
            placeholder="一句话描述项目用途和亮点"
            maxlength="300"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="标签" prop="tags">
          <el-input
            v-model="form.tags"
            placeholder="用逗号分隔，如：Vue3, AI工具, 效率"
          />
          <div class="form-hint">建议 2-5 个分类标签，用逗号分隔</div>
        </el-form-item>

        <el-form-item label="作者/来源" prop="author">
          <el-input
            v-model="form.author"
            placeholder="项目作者或推荐人信息"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="submitting" @click="handleSubmit">
            提交投稿
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

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
.submit-form-view {
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
.submit-form {
  margin-bottom: 24px;
}
.form-hint {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-top: 4px;
}
.rules h3,
.contact h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: var(--el-text-color-primary);
}
.contact p {
  color: var(--el-text-color-regular);
  margin-bottom: 16px;
}
</style>
