import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import bundlesData from '@/data/bundles.json'
import { useSkillsStore } from './skills'
import type { Skill } from './skills'

export interface Bundle {
  id: string
  name: string
  icon: string
  description: string
  industry: string
  difficulty: string
  skillIds: string[]
  highlights: string[]
  color: string
}

export const useBundlesStore = defineStore('bundles', () => {
  const bundles = ref<Bundle[]>(bundlesData as Bundle[])
  const selectedIndustry = ref<string>('')

  const allIndustries = computed(() => {
    const set = new Set<string>()
    bundles.value.forEach(b => set.add(b.industry))
    return Array.from(set).sort()
  })

  const filteredBundles = computed(() => {
    if (!selectedIndustry.value) return bundles.value
    return bundles.value.filter(b => b.industry === selectedIndustry.value)
  })

  function getBundleById(id: string): Bundle | undefined {
    return bundles.value.find(b => b.id === id)
  }

  function getBundleSkills(bundle: Bundle): Skill[] {
    const skillsStore = useSkillsStore()
    return bundle.skillIds
      .map(id => skillsStore.getSkillById(id))
      .filter((s): s is Skill => s !== undefined)
  }

  return {
    bundles,
    selectedIndustry,
    allIndustries,
    filteredBundles,
    getBundleById,
    getBundleSkills,
  }
})
