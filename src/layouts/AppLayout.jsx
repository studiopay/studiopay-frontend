import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import { useTheme } from '@/hooks/useTheme'

export default function AppLayout() {
  const isAuth = localStorage.getItem('studioPayAuth') === 'true' || !!localStorage.getItem('studiopay_user')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  if (!isAuth) return <Navigate to="/login" replace />

  return (
    <div className={`app-shell theme-${theme}`}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Topbar onMenuClick={() => setSidebarOpen(true)} theme={theme} onToggleTheme={toggleTheme} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
