import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, FileText, ShoppingBag, Menu } from 'lucide-react'

// Bottom navigation fixa, visível apenas no mobile (classe global
// "hide-desktop", mesmo breakpoint de 768px já usado no restante do
// app-shell). No desktop, a navegação continua pela Sidebar/Topbar
// atuais, sem nenhuma alteração.

const navItems = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Início' },
  { to: '/app/agenda', icon: CalendarDays, label: 'Agenda' },
  { to: '/app/cobrancas', icon: FileText, label: 'Cobranças' },
  { to: '/app/shop', icon: ShoppingBag, label: 'Shop' },
]

export default function BottomNav({ onMenuClick, menuActive = false, onNavigate }) {
  return (
    <nav className="bottom-nav hide-desktop">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          // Fecha o Menu mobile sempre que um link fixo da BottomNav é
          // tocado — inclusive quando a rota tocada já é a rota atual
          // (o painel fica sobreposto pela BottomNav enquanto aberto, então
          // sem isso o menu continuava aberto atrás dela).
          onClick={() => onNavigate?.()}
          // Enquanto o Menu mobile está aberto, nenhum item de rota deve
          // ficar em destaque junto com "Menu" — só o Menu fica ativo.
          className={({ isActive }) => `bottom-nav-link ${isActive && !menuActive ? 'active' : ''}`}
        >
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
      <button
        type="button"
        className={`bottom-nav-link bottom-nav-menu-btn${menuActive ? ' active' : ''}`}
        onClick={onMenuClick}
      >
        <Menu size={20} />
        <span>Menu</span>
      </button>
    </nav>
  )
}
