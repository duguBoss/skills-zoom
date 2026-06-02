import type { Skill } from '@/stores/skills'
import type { Bundle } from '@/stores/bundles'

const API_BASE = import.meta.env.VITE_API_BASE || ''
const isDev = import.meta.env.DEV

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`)
  const data = await res.json()
  if (!data.success) throw new Error(data.error || 'Request failed')
  return data.data
}

// ─── Skills ───────────────────────────────────────────

export async function apiGetSkills(): Promise<Skill[]> {
  if (isDev) {
    return fetchApi<Skill[]>('/api/skills')
  }
  // 生产环境：直接 import JSON（GitHub Pages 静态托管）
  const data = await import('@/data/skills.json')
  return data.default as Skill[]
}

export async function apiGetSkillById(id: string): Promise<Skill | undefined> {
  if (isDev) {
    return fetchApi<Skill>(`/api/skills/${id}`)
  }
  const data = await import('@/data/skills.json')
  return (data.default as Skill[]).find(s => s.id === id)
}

// ─── Bundles ──────────────────────────────────────────

export async function apiGetBundles(): Promise<Bundle[]> {
  if (isDev) {
    return fetchApi<Bundle[]>('/api/bundles')
  }
  // 生产环境：直接 import JSON
  const data = await import('@/data/bundles.json')
  return data.default as Bundle[]
}

export async function apiGetBundleById(id: string): Promise<Bundle | undefined> {
  if (isDev) {
    return fetchApi<Bundle>(`/api/bundles/${id}`)
  }
  const data = await import('@/data/bundles.json')
  return (data.default as Bundle[]).find(b => b.id === id)
}

// ─── Mutations (仅后端模式支持) ───────────────────────

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!data.success) throw new Error(data.error || 'Request failed')
  return data
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!data.success) throw new Error(data.error || 'Request failed')
  return data
}

export async function apiDelete<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { method: 'DELETE' })
  const data = await res.json()
  if (!data.success) throw new Error(data.error || 'Request failed')
  return data
}
