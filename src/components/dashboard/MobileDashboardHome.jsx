import { useNavigate } from 'react-router-dom'
import {
  Eye, EyeOff, Sun, Moon, Bell, ArrowRight,
  QrCode, FileText, CalendarDays, Users, ShoppingBag, Bot,
  Plus, ShoppingCart, ChevronRight, Hourglass, AlertCircle, UserCheck2, Clock3,
} from 'lucide-react'

// Redesenho do dashboard apenas para mobile, no estilo de app bancário
// (PicPay/Nubank como referência de experiência, sem copiar marca ou
// layout exato). Visível apenas abaixo de 768px via classe global
// "hide-desktop" — o dash4-root existente (desktop/tablet) continua
// intocado, escondido no mesmo breakpoint via "hide-mobile".

function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const SHORTCUTS = [
  { label: 'Pix', icon: QrCode, to: '/app/financeiro' },
  { label: 'Cobrança', icon: FileText, to: '/app/cobrancas/criar' },
  { label: 'Agenda', icon: CalendarDays, to: '/app/agenda' },
  { label: 'Clientes', icon: Users, to: '/app/clientes' },
  { label: 'Shop', icon: ShoppingBag, to: '/app/shop' },
  { label: 'Elisson.IA', icon: Bot, to: '/app/elison' },
]

const QUICK_ACTIONS = [
  { label: 'Criar cobrança', icon: Plus, to: '/app/cobrancas/criar' },
  { label: 'Novo agendamento', icon: CalendarDays, to: '/app/agenda' },
  { label: 'Ver clientes', icon: Users, to: '/app/clientes' },
  { label: 'Abrir Shop', icon: ShoppingCart, to: '/app/shop' },
]

export default function MobileDashboardHome({
  estudio,
  plano,
  avatarLetter,
  theme,
  onToggleTheme,
  saldo,
  showSaldo,
  onToggleSaldo,
  recebidoHoje,
  aReceber,
  pendente,
  sessoesHoje,
  cobrancasVencendo,
  sinaisPendentes,
  clientesParaConfirmar,
}) {
  const navigate = useNavigate()

  const todayCards = [
    { Icon: Clock3, label: 'Sessões hoje', value: sessoesHoje },
    { Icon: AlertCircle, label: 'Cobranças vencendo', value: cobrancasVencendo },
    { Icon: Hourglass, label: 'Sinais pendentes', value: sinaisPendentes },
    { Icon: UserCheck2, label: 'Clientes p/ confirmar', value: clientesParaConfirmar },
  ]

  return (
    <div className="mob-dash">
      {/* ── Topo: perfil/saudação ─────────────────── */}
      <div className="mob-dash-header">
        <div className="mob-dash-header-user">
          <span className="mob-dash-avatar">{avatarLetter}</span>
          <div className="mob-dash-header-text">
            <p className="mob-dash-greeting">Olá, {estudio}</p>
            <p className="mob-dash-plan">Studio Pay {plano}</p>
          </div>
        </div>
        <div className="mob-dash-header-icons">
          <button
            className="mob-dash-icon-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="mob-dash-icon-btn" aria-label="Notificações"><Bell size={17} /></button>
        </div>
      </div>

      {/* ── Card principal financeiro ─────────────── */}
      <div className="mob-dash-balance-card">
        <div className="mob-dash-balance-top">
          <span className="mob-dash-balance-label">Saldo disponível</span>
          <button
            className="mob-dash-balance-toggle"
            onClick={onToggleSaldo}
            aria-label={showSaldo ? 'Ocultar saldo' : 'Exibir saldo'}
          >
            {showSaldo ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <p className="mob-dash-balance-value">{showSaldo ? fmt(saldo) : '•••••••'}</p>

        <button className="mob-dash-balance-cta" onClick={() => navigate('/app/financeiro')}>
          Ver extrato <ArrowRight size={13} />
        </button>

        <div className="mob-dash-balance-mini">
          <div className="mob-dash-balance-mini-item">
            <span className="mob-dash-balance-mini-label">Recebido hoje</span>
            <span className="mob-dash-balance-mini-value">{showSaldo ? fmt(recebidoHoje) : '•••••'}</span>
          </div>
          <div className="mob-dash-balance-mini-item">
            <span className="mob-dash-balance-mini-label">A receber</span>
            <span className="mob-dash-balance-mini-value">{showSaldo ? fmt(aReceber) : '•••••'}</span>
          </div>
          <div className="mob-dash-balance-mini-item">
            <span className="mob-dash-balance-mini-label">Pendente</span>
            <span className="mob-dash-balance-mini-value">{pendente}</span>
          </div>
        </div>
      </div>

      {/* ── Atalhos rápidos ────────────────────────── */}
      <div className="mob-dash-shortcuts">
        {SHORTCUTS.map(({ label, icon: Icon, to }) => (
          <button key={label} className="mob-dash-shortcut" onClick={() => navigate(to)}>
            <span className="mob-dash-shortcut-icon"><Icon size={20} /></span>
            <span className="mob-dash-shortcut-label">{label}</span>
          </button>
        ))}
      </div>

      {/* ── Hoje no estúdio ────────────────────────── */}
      <div className="mob-dash-section">
        <h2 className="mob-dash-section-title">Hoje no estúdio</h2>
        <div className="mob-dash-today-grid">
          {todayCards.map(({ Icon, label, value }) => (
            <div key={label} className="mob-dash-today-card">
              <span className="mob-dash-today-icon"><Icon size={16} /></span>
              <span className="mob-dash-today-value">{value}</span>
              <span className="mob-dash-today-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Ações rápidas ──────────────────────────── */}
      <div className="mob-dash-section">
        <h2 className="mob-dash-section-title">Ações rápidas</h2>
        <div className="mob-dash-actions-list">
          {QUICK_ACTIONS.map(({ label, icon: Icon, to }) => (
            <button key={label} className="mob-dash-action-row" onClick={() => navigate(to)}>
              <span className="mob-dash-action-icon"><Icon size={16} /></span>
              <span className="mob-dash-action-label">{label}</span>
              <ChevronRight size={16} className="mob-dash-action-chevron" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
