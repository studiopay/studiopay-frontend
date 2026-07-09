import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Search, ChevronRight,
  QrCode, FileText, Wallet, Landmark, Link2, HandCoins,
  CalendarDays, Users, Bell, Bot, BarChart3, Settings,
  ShoppingBag, GraduationCap, Megaphone, Rocket,
  UserRound, Sparkles, SlidersHorizontal, LogOut,
} from 'lucide-react'

// Tela cheia de Menu, apenas para o mobile do app interno (estilo
// app bancário — título, busca, cards em grid por seção). Substitui
// a Sidebar off-canvas estreita quando o item "Menu" da bottom nav é
// tocado no mobile. Não altera a Sidebar em si — ela continua exatamente
// igual e é quem o desktop sempre usa (>1024px, sempre visível via CSS,
// independente deste componente). Todas as rotas abaixo já existem no
// projeto — nenhuma rota nova foi criada.

const SECTIONS = [
  {
    title: 'Conta e pagamentos',
    items: [
      { label: 'Pix', icon: QrCode, to: '/app/financeiro' },
      { label: 'Cobranças', icon: FileText, to: '/app/cobrancas' },
      { label: 'Extrato', icon: Wallet, to: '/app/financeiro' },
      { label: 'Banco', icon: Landmark, to: '/app/banco' },
      { label: 'Links de pagamento', icon: Link2, to: '/app/cobrancas/link' },
      { label: 'Sinais', icon: HandCoins, to: '/app/cobrancas' },
    ],
  },
  {
    title: 'Operação do estúdio',
    items: [
      { label: 'Agenda', icon: CalendarDays, to: '/app/agenda' },
      { label: 'Clientes', icon: Users, to: '/app/clientes' },
      { label: 'Lembretes', icon: Bell, to: '/app/agenda' },
      { label: 'Elisson.IA', icon: Bot, to: '/app/elison' },
      { label: 'Relatórios', icon: BarChart3, to: '/app/relatorios' },
      { label: 'Configurações', icon: Settings, to: '/app/configuracoes' },
    ],
  },
  {
    title: 'Crescimento',
    items: [
      { label: 'Studio Shop', icon: ShoppingBag, to: '/app/shop' },
      { label: 'Aulas', icon: GraduationCap, to: '/app/learn' },
      { label: 'Tráfego pago', icon: Megaphone, to: '/app/ads' },
      { label: 'Studio Pró', icon: Rocket, to: '/app/ads' },
    ],
  },
]

const ACCOUNT_ITEMS = [
  { label: 'Minha conta', icon: UserRound, to: '/app/configuracoes' },
  { label: 'Plano atual', icon: Sparkles, to: '/app/configuracoes' },
  { label: 'Preferências', icon: SlidersHorizontal, to: '/app/configuracoes' },
  { label: 'Sair da conta', icon: LogOut, action: 'logout' },
]

export default function MobileMenuPanel({ open, onClose }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  if (!open) return null

  const q = query.trim().toLowerCase()
  const filteredSections = SECTIONS
    .map((s) => ({ ...s, items: q ? s.items.filter((i) => i.label.toLowerCase().includes(q)) : s.items }))
    .filter((s) => s.items.length > 0)

  function go(to) {
    onClose()
    navigate(to)
  }

  // Mesmo logout real já usado na Sidebar/Home mobile (mesmas chaves
  // de localStorage), reescrito aqui para não precisar tocar em
  // Sidebar.jsx nesta rodada.
  function handleLogout() {
    localStorage.removeItem('studioPayAuth')
    localStorage.removeItem('studiopay_user')
    localStorage.removeItem('studiopay_remember')
    onClose()
    navigate('/login')
  }

  return (
    <div className="mob-menu-panel hide-desktop">
      <div className="mob-menu-header">
        <button className="mob-menu-back" onClick={onClose} aria-label="Fechar menu">
          <ArrowLeft size={20} />
        </button>
        <h1 className="mob-menu-title">Menu</h1>
        <span className="mob-menu-header-spacer" />
      </div>

      <div className="mob-menu-search">
        <Search size={16} className="mob-menu-search-icon" />
        <input
          type="text"
          className="mob-menu-search-input"
          placeholder="Buscar no Studio Pay"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="mob-menu-body">
        {filteredSections.map((s) => (
          <div key={s.title} className="mob-menu-section">
            <h2 className="mob-menu-section-title">{s.title}</h2>
            <div className="mob-menu-grid">
              {s.items.map(({ label, icon: Icon, to }) => (
                <button key={label} type="button" className="mob-menu-card" onClick={() => go(to)}>
                  <span className="mob-menu-card-icon"><Icon size={20} /></span>
                  <span className="mob-menu-card-label">{label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        {q && filteredSections.length === 0 && (
          <p className="mob-menu-empty">Nada encontrado para "{query}".</p>
        )}

        {!q && (
          <div className="mob-menu-section">
            <h2 className="mob-menu-section-title">Conta</h2>
            <div className="mob-dash-actions-list">
              {ACCOUNT_ITEMS.map(({ label, icon: Icon, to, action }) => (
                <button
                  key={label}
                  type="button"
                  className={`mob-dash-action-row${action === 'logout' ? ' mob-dash-action-row-danger' : ''}`}
                  onClick={() => (action === 'logout' ? handleLogout() : go(to))}
                >
                  <span className="mob-dash-action-icon"><Icon size={16} /></span>
                  <span className="mob-dash-action-label">{label}</span>
                  <ChevronRight size={16} className="mob-dash-action-chevron" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
