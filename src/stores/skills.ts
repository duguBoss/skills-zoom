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
}

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref<Skill[]>(skillsData as Skill[])
  const selectedTags = ref<string[]>([])
  const searchQuery = ref('')
  const selectedSkillIds = ref<string[]>([])

  const allTags = computed(() => {
    const tagSet = new Set<string>()
    skills.value.forEach(skill => skill.tags.forEach(tag => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  })

  const filteredSkills = computed(() => {
    return skills.value.filter(skill => {
      const matchesTags = selectedTags.value.length === 0 ||
        selectedTags.value.some(tag => skill.tags.includes(tag))
      const matchesSearch = !searchQuery.value ||
        skill.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        skill.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
      return matchesTags && matchesSearch
    })
  })

  const selectedSkills = computed(() => {
    return skills.value.filter(skill => selectedSkillIds.value.includes(skill.id))
  })

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

  return {
    skills,
    selectedTags,
    searchQuery,
    selectedSkillIds,
    allTags,
    filteredSkills,
    selectedSkills,
    toggleTag,
    toggleSkillSelection,
    selectAllVisible,
    clearSelection,
    exportSelected,
  }
})
