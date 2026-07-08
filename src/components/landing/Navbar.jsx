import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { useThemeCtx } from './ThemeContext'
import { mainNavLinks, growthNavLinks } from './publicNavLinks'

const GROWTH_ROUTES = growthNavLinks.map((link) => link.to)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mobileFuncoesOpen, setMobileFuncoesOpen] = useState(false)
  const [mobileCrescimentoOpen, setMobileCrescimentoOpen] = useState(false)
  const [desktopGrowthOpen, setDesktopGrowthOpen] = useState(false)
  const growthRef = useRef(null)
  const { isDark, toggleTheme } = useThemeCtx()
  const { pathname } = useLocation()

  const isActive = (to) => pathname === to
  const isGrowthActive = GROWTH_ROUTES.includes(pathname)
  const linkClass = (to) => (isActive(to) ? 'nav-link-active' : undefined)

  useEffect(() => {
    if (!desktopGrowthOpen) return
    function handleClickOutside(e) {
      if (growthRef.current && !growthRef.current.contains(e.target)) {
        setDesktopGrowthOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [desktopGrowthOpen])

  const closeMobileMenu = () => {
    setOpen(false)
    setMobileFuncoesOpen(false)
    setMobileCrescimentoOpen(false)
  }

  const toggleMobileMenu = () => {
    setOpen((v) => {
      const next = !v
      if (!next) {
        setMobileFuncoesOpen(false)
        setMobileCrescimentoOpen(false)
      }
      return next
    })
  }

  return (
    <nav className="landing-nav">
      <div className="landing-nav-inner">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <img
            src={isDark
              ? '/brand/logo-studio-pay-horizontal-white.png'
              : '/brand/logo-studio-pay-horizontal.png'}
            alt="Studio Pay"
            className="header-logo"
          />
        </Link>

        <div className="nav-links">
          <Link to="/" className={linkClass('/')}>Início</Link>
          {mainNavLinks.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass(link.to)}>{link.label}</Link>
          ))}

          <div
            className="nav-dropdown"
            ref={growthRef}
            onMouseEnter={() => setDesktopGrowthOpen(true)}
            onMouseLeave={() => setDesktopGrowthOpen(false)}
          >
            <button
              type="button"
              className={`nav-dropdown-trigger${isGrowthActive ? ' active' : ''}`}
              onClick={() => setDesktopGrowthOpen((v) => !v)}
              aria-expanded={desktopGrowthOpen}
            >
              Crescimento
              <ChevronDown size={14} className={`nav-dropdown-chevron${desktopGrowthOpen ? ' open' : ''}`} />
            </button>
            <div className={`nav-dropdown-menu${desktopGrowthOpen ? ' open' : ''}`}>
              {growthNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={linkClass(link.to)}
                  onClick={() => setDesktopGrowthOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/planos" className={linkClass('/planos')}>Planos</Link>
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
          <Link to="/login" className="btn btn-ghost btn-sm nav-cta-entrar">Entrar</Link>
          <Link to="/cadastro" className="btn btn-primary btn-sm nav-cta-comecar">
            Começar<span className="nav-cta-optional"> agora</span>
          </Link>
        </div>

        <button className="nav-hamburger" onClick={toggleMobileMenu} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`nav-mobile-menu${open ? ' open' : ''}`}>
          <Link to="/" className={linkClass('/')} onClick={closeMobileMenu}>Início</Link>

          <button
            type="button"
            className="nav-mobile-group-trigger"
            onClick={() => setMobileFuncoesOpen((v) => !v)}
            aria-expanded={mobileFuncoesOpen}
          >
            Funções
            <ChevronDown size={16} className={`nav-dropdown-chevron${mobileFuncoesOpen ? ' open' : ''}`} />
          </button>
          {mobileFuncoesOpen && (
            <div className="nav-mobile-submenu">
              {mainNavLinks.map((link) => (
                <Link key={link.to} to={link.to} className={linkClass(link.to)} onClick={closeMobileMenu}>
                  {link.label}
                </Link>
              ))}

              <button
                type="button"
                className={`nav-mobile-group-trigger nested${isGrowthActive ? ' active' : ''}`}
                onClick={() => setMobileCrescimentoOpen((v) => !v)}
                aria-expanded={mobileCrescimentoOpen}
              >
                Crescimento
                <ChevronDown size={16} className={`nav-dropdown-chevron${mobileCrescimentoOpen ? ' open' : ''}`} />
              </button>
              {mobileCrescimentoOpen && (
                <div className="nav-mobile-submenu nav-mobile-submenu-nested">
                  {growthNavLinks.map((link) => (
                    <Link key={link.to} to={link.to} className={linkClass(link.to)} onClick={closeMobileMenu}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          <Link to="/planos" className={linkClass('/planos')} onClick={closeMobileMenu}>Planos</Link>

          <button type="button" className="nav-mobile-theme-btn" onClick={toggleTheme}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? 'Modo claro' : 'Modo escuro'}
          </button>
        </div>
      </div>
    </nav>
  )
}
