import { useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('studioPayTheme') || 'dark'
  )

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('studioPayTheme', next)
  }

  return { theme, isDark: theme === 'dark', toggleTheme }
}
