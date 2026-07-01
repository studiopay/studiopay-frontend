import { createContext, useContext } from 'react'

export const ThemeContext = createContext({ isDark: true, toggleTheme: () => {} })

export const useThemeCtx = () => useContext(ThemeContext)
