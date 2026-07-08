import { useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import BottomNav from '@/components/layout/BottomNav'
import { useTheme } from '@/hooks/useTheme'

// Rotas que já têm seu próprio header mobile (ex.: MobileDashboardHome),
// então a Topbar padrão fica redundante no mobile só nessas telas.
// No desktop a Topbar continua sempre visível, sem exceção.
const MOBILE_OWN_HEADER_ROUTES = ['/app/dashboard', '/app/cobrancas']

export default function AppLayout() {
  const isAuth = localStorage.getItem('studioPayAuth') === 'true' || !!localStorage.getItem('studiopay_user')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  if (!isAuth) return <Navigate to="/login" replace />

  const hideTopbarOnMobile = MOBILE_OWN_HEADER_ROUTES.includes(location.pathname)

  return (
    <div className={`app-shell theme-${theme}`}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Topbar theme={theme} onToggleTheme={toggleTheme} hideOnMobile={hideTopbarOnMobile} />
        <main className="app-content">
          <Outlet context={{ theme, toggleTheme }} />
        </main>
        <BottomNav onMenuClick={() => setSidebarOpen(true)} />
      </div>
    </div>
  )
}
