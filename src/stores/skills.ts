import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import skillsData from '@/data/skills.json'

export interface Skill {
  id: string
  name: string
  repoUrl: string
  description: string
  tags: string[]
  author: string
  addedAt: string
  category: string
  rating: number
  downloads: number
  env: string
  verified: boolean
}

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref<Skill[]>(skillsData as Skill[])
  const selectedTags = ref<string[]>([])
  const selectedCategory = ref<string>('')
  const searchQuery = ref('')
  const selectedSkillIds = ref<string[]>([])

  const allTags = computed(() => {
    const tagSet = new Set<string>()
    skills.value.forEach(skill => skill.tags.forEach(tag => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  })

  const allCategories = computed(() => {
    const catSet = new Set<string>()
    skills.value.forEach(skill => catSet.add(skill.category))
    return Array.from(catSet).sort()
  })

  const filteredSkills = computed(() => {
    return skills.value.filter(skill => {
      const matchesTags = selectedTags.value.length === 0 ||
        selectedTags.value.some(tag => skill.tags.includes(tag))
      const matchesCategory = !selectedCategory.value || skill.category === selectedCategory.value
      const matchesSearch = !searchQuery.value ||
        skill.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        skill.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        skill.category.toLowerCase().includes(searchQuery.value.toLowerCase())
      return matchesTags && matchesCategory && matchesSearch
    })
  })

  const selectedSkills = computed(() => {
    return skills.value.filter(skill => selectedSkillIds.value.includes(skill.id))
  })

  function getSkillById(id: string): Skill | undefined {
    return skills.value.find(s => s.id === id)
  }

  function toggleTag(tag: string) {
    const index = selectedTags.value.indexOf(tag)
    if (index > -1) {
      selectedTags.value.splice(index, 1)
    } else {
      selectedTags.value.push(tag)
    }
  }

  function toggleSkillSelection(id: string) {
    const index = selectedSkillIds.value.indexOf(id)
    if (index > -1) {
      selectedSkillIds.value.splice(index, 1)
    } else {
      selectedSkillIds.value.push(id)
    }
  }

  function selectSkillIds(ids: string[]) {
    selectedSkillIds.value = [...new Set([...selectedSkillIds.value, ...ids])]
  }

  function selectAllVisible() {
    const visibleIds = filteredSkills.value.map(s => s.id)
    const allSelected = visibleIds.every(id => selectedSkillIds.value.includes(id))
    if (allSelected) {
      selectedSkillIds.value = selectedSkillIds.value.filter(id => !visibleIds.includes(id))
    } else {
      visibleIds.forEach(id => {
        if (!selectedSkillIds.value.includes(id)) {
          selectedSkillIds.value.push(id)
        }
      })
    }
  }

  function clearSelection() {
    selectedSkillIds.value = []
  }

  function exportSelected(): string {
    const lines = selectedSkills.value.map(skill =>
      `${skill.name}: ${skill.repoUrl}  // ${skill.description}`
    )
    return lines.join('\n')
  }

  function exportSkillsAsConfig(skillsToExport: Skill[], format: 'workbuddy' | 'kimi' | 'plain' = 'plain'): string {
    if (format === 'workbuddy') {
      return JSON.stringify({
        version: '1.0',
        skills: skillsToExport.map(s => ({
          name: s.name,
          source: s.repoUrl,
          tags: s.tags,
          env: s.env,
        }))
      }, null, 2)
    }
    if (format === 'kimi') {
      return skillsToExport.map(s =>
        `# ${s.name}\nsource: ${s.repoUrl}\ntags: [${s.tags.join(', ')}]\nenv: ${s.env}\n---`
      ).join('\n\n')
    }
    return skillsToExport.map(skill =>
      `${skill.name}: ${skill.repoUrl}  // ${skill.description}`
    ).join('\n')
  }

  return {
    skills,
    selectedTags,
    selectedCategory,
    searchQuery,
    selectedSkillIds,
    allTags,
    allCategories,
    filteredSkills,
    selectedSkills,
    getSkillById,
    toggleTag,
    toggleSkillSelection,
    selectSkillIds,
    selectAllVisible,
    clearSelection,
    exportSelected,
    exportSkillsAsConfig,
  }
})
