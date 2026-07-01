import { ThemeContext } from './ThemeContext'
import { useTheme } from '@/hooks/useTheme'

export default function PublicSiteShell({ children }) {
  const { theme, isDark, toggleTheme } = useTheme()

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`landing theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
