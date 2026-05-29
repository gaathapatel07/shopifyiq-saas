export type Theme = 'dark' | 'light'

export function getTheme(): Theme {
  const stored = localStorage.getItem('iq-theme') as Theme | null
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.classList.toggle('light', theme === 'light')
  localStorage.setItem('iq-theme', theme)
}

export function toggleTheme(): Theme {
  const next = getTheme() === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}
