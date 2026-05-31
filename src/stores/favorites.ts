import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<string[]>([])

  const favoritesCount = computed(() => favorites.value.length)

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem('skills-zoom-favorites')
      if (stored) {
        favorites.value = JSON.parse(stored)
      }
    } catch {
      favorites.value = []
    }
  }

  function saveToStorage() {
    localStorage.setItem('skills-zoom-favorites', JSON.stringify(favorites.value))
  }

  function toggleFavorite(id: string) {
    const index = favorites.value.indexOf(id)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(id)
    }
    saveToStorage()
  }

  function isFavorited(id: string): boolean {
    return favorites.value.includes(id)
  }

  function clearFavorites() {
    favorites.value = []
    saveToStorage()
  }

  loadFromStorage()

  return {
    favorites,
    favoritesCount,
    toggleFavorite,
    isFavorited,
    clearFavorites,
  }
})
