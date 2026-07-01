import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import {
  LayoutDashboard, Wallet, CalendarDays, Users, FileText,
  Bot, ShoppingBag, GraduationCap, Megaphone,
  Settings, LogOut, X, Plus, ChevronDown, Link2, TrendingUp
} from 'lucide-react'

const navItems = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Início' },
  { to: '/app/banco', icon: Wallet, label: 'Banco' },
  { to: '/app/shop', icon: ShoppingBag, label: 'Studio Shop' },
  { to: '/app/agenda', icon: CalendarDays, label: 'Agenda' },
  { to: '/app/elison', icon: Bot, label: 'Elison IA' },
  { to: '/app/clientes', icon: Users, label: 'Clientes' },
  { to: '/app/cobrancas', icon: FileText, label: 'Cobranças' },
  { to: '/app/ads', icon: Megaphone, label: 'Studio Pró' },
  { to: '/app/learn', icon: GraduationCap, label: 'Aulas' },
  { to: '/app/configuracoes', icon: Settings, label: 'Configurações' },
]

const dropdownItems = [
  {
    to: '/app/cobrancas/criar',
    icon: FileText,
    label: 'Criar cobrança',
    desc: 'Sinal, sessão ou pagamento pendente',
  },
  {
    to: '/app/cobrancas/link',
    icon: Link2,
    label: 'Criar link de pagamento',
    desc: 'Envie um link para o cliente pagar',
  },
  {
    to: '/app/cobrancas/simular',
    icon: TrendingUp,
    label: 'Simular venda',
    desc: 'Veja taxas e valor final antes de cobrar',
  },
]

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  function handleLogout() {
    localStorage.removeItem('studioPayAuth')
    localStorage.removeItem('studiopay_user')
    localStorage.removeItem('studiopay_remember')
    navigate('/login')
  }

  function handleMainCta() {
    navigate('/app/cobrancas/criar')
    onClose()
    setDropdownOpen(false)
  }

  function handleDropdownItem(to) {
    navigate(to)
    onClose()
    setDropdownOpen(false)
  }

  useEffect(() => {
    if (!dropdownOpen) return
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [dropdownOpen])

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img src="/brand/logo-studio-pay-horizontal-white.png" alt="Studio Pay" className="sidebar-logo-img sidebar-logo-dark" />
          <img src="/brand/logo-studio-pay-horizontal.png" alt="Studio Pay" className="sidebar-logo-img sidebar-logo-light" />
          <button className="sidebar-close hide-desktop" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="sidebar-cta" ref={dropdownRef}>
          <div className="split-btn">
            <button className="split-btn-main" onClick={handleMainCta}>
              <Plus size={15} />
              <span>Criar cobrança</span>
            </button>
            <button
              className={`split-btn-arrow ${dropdownOpen ? 'open' : ''}`}
              onClick={() => setDropdownOpen(v => !v)}
              aria-label="Mais opções de cobrança"
            >
              <ChevronDown size={15} />
            </button>
          </div>

          {dropdownOpen && (
            <div className="split-btn-dropdown">
              {dropdownItems.map(({ to, icon: Icon, label, desc }) => (
                <button
                  key={to}
                  className="split-btn-option"
                  onClick={() => handleDropdownItem(to)}
                >
                  <span className="split-btn-option-icon">
                    <Icon size={15} />
                  </span>
                  <span className="split-btn-option-text">
                    <span className="split-btn-option-label">{label}</span>
                    {desc && <span className="split-btn-option-desc">{desc}</span>}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="sidebar-link"
            onClick={handleLogout}
            style={{ border: 'none', background: 'none', width: '100%', cursor: 'pointer' }}
          >
            <LogOut size={18} />
            <span>Sair da conta</span>
          </button>
        </div>
      </aside>
    </>
  )
}
