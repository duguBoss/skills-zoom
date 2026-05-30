<script setup lang="ts">
import { computed } from 'vue'
import { useSkillsStore } from '@/stores/skills'
import type { Skill } from '@/stores/skills'
import { Link, Calendar, User, Check } from '@element-plus/icons-vue'

const props = defineProps<{
  skill: Skill
}>()

const store = useSkillsStore()

const isSelected = computed(() => store.selectedSkillIds.includes(props.skill.id))

function toggleSelect() {
  store.toggleSkillSelection(props.skill.id)
}

function openRepo() {
  window.open(props.skill.repoUrl, '_blank')
}
</script>

<template>
  <el-card
    :class="['skill-card', { 'is-selected': isSelected }]"
    shadow="hover"
    @click="toggleSelect"
  >
    <div class="card-header">
      <div class="title-row">
        <h3 class="skill-name">{{ skill.name }}</h3>
        <el-tag
          v-if="isSelected"
          type="success"
          size="small"
          effect="dark"
        >
          <el-icon><Check /></el-icon> 已选
        </el-tag>
      </div>
      <el-button
        link
        type="primary"
        size="small"
        @click.stop="openRepo"
      >
        <el-icon><Link /></el-icon> 仓库地址
      </el-button>
    </div>

    <p class="description">{{ skill.description }}</p>

    <div class="meta">
      <span>
        <el-icon><User /></el-icon> {{ skill.author }}
      </span>
      <span>
        <el-icon><Calendar /></el-icon> {{ skill.addedAt }}
      </span>
    </div>

    <div class="tags">
      <el-tag
        v-for="tag in skill.tags"
        :key="tag"
        size="small"
        :type="store.selectedTags.includes(tag) ? 'primary' : 'info'"
        effect="plain"
        class="tag-item"
      >
        {{ tag }}
      </el-tag>
    </div>
  </el-card>
</template>

<style scoped>
.skill-card {
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}
.skill-card:hover {
  transform: translateY(-2px);
}
.skill-card.is-selected {
  border-color: var(--el-color-success);
  background-color: var(--el-color-success-light-9);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}
.title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.skill-name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}
.description {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
.meta span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag-item {
  cursor: default;
}
</style>
