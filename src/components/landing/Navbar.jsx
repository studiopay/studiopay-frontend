import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useThemeCtx } from './ThemeContext'
import { moduleNavLinks } from './publicNavLinks'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { isDark, toggleTheme } = useThemeCtx()
  const plansHref = pathname === '/' ? '#planos' : '/#planos'

  return (
    <nav className="landing-nav">
      <div className="landing-nav-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img
            src={isDark
              ? '/brand/logo-studio-pay-horizontal-white.png'
              : '/brand/logo-studio-pay-horizontal.png'}
            alt="Studio Pay"
            className="header-logo"
          />
        </Link>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          {moduleNavLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={pathname === link.href ? 'nav-link-active' : ''}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a href={plansHref} onClick={() => setOpen(false)}>Planos</a>
        </div>

        <div className="nav-actions">
          <button
            className="nav-theme-btn"
            onClick={toggleTheme}
            aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            title={isDark ? 'Modo claro' : 'Modo escuro'}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link to="/login" className="btn btn-ghost btn-sm">Entrar</Link>
          <Link to="/cadastro" className="btn btn-primary btn-sm">Começar agora</Link>
        </div>

        <button className="nav-hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  )
}
