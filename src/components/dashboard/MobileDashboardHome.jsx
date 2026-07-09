import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Eye, EyeOff, Sun, Moon, Bell, ArrowRight, X,
  QrCode, FileText, CalendarDays, Users, ShoppingBag, Bot,
  Plus, ShoppingCart, ChevronRight, Hourglass, AlertCircle, UserCheck2, Clock3,
  Image as ImageIcon, UserRound, Sparkles, Settings, LogOut,
} from 'lucide-react'

// Chave própria (local/demo) para a foto de avatar escolhida pelo
// usuário — não é backend/API, só um override visual em localStorage,
// no mesmo padrão de outros overrides já usados no app (ex.:
// studioPayAdmin_dashboardBanners no Dashboard.jsx).
const AVATAR_PHOTO_KEY = 'studiopay_user_avatar'

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
  const [showNotif, setShowNotif] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showPlanDetail, setShowPlanDetail] = useState(false)
  const [avatarPhoto, setAvatarPhoto] = useState(() => localStorage.getItem(AVATAR_PHOTO_KEY) || null)
  const fileInputRef = useRef(null)

  // Upload de foto — só frontend/demo: lê o arquivo local, gera um
  // data URL (base64) e guarda em localStorage. Não envia nada para
  // nenhum servidor, não cria API, não cria banco.
  function handlePhotoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      setAvatarPhoto(dataUrl)
      try { localStorage.setItem(AVATAR_PHOTO_KEY, dataUrl) } catch { /* localStorage cheio — mantém só em memória */ }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  // Sair — reutiliza exatamente as mesmas chaves/efeito do logout já
  // usado na Sidebar (studioPayAuth/studiopay_user/studiopay_remember
  // + navegar para /login). Duplicado aqui em vez de importado porque
  // esta rodada não deve tocar em Sidebar.jsx/BottomNav.jsx/AppLayout.jsx.
  function handleLogout() {
    localStorage.removeItem('studioPayAuth')
    localStorage.removeItem('studiopay_user')
    localStorage.removeItem('studiopay_remember')
    navigate('/login')
  }

  const todayCards = [
    { Icon: Clock3, label: 'Sessões hoje', value: sessoesHoje, to: '/app/agenda' },
    { Icon: AlertCircle, label: 'Cobranças vencendo', value: cobrancasVencendo, to: '/app/cobrancas' },
    { Icon: Hourglass, label: 'Sinais pendentes', value: sinaisPendentes, to: '/app/cobrancas' },
    { Icon: UserCheck2, label: 'Clientes p/ confirmar', value: clientesParaConfirmar, to: '/app/agenda' },
  ]

  // Notificações — bottom sheet local/mock (sem backend/API), com
  // texto derivado dos mesmos números reais mostrados nos cards
  // "Hoje no estúdio" acima, em vez de texto solto.
  const notifItems = [
    `Você tem ${cobrancasVencendo} cobrança${cobrancasVencendo === 1 ? '' : 's'} vencendo.`,
    sinaisPendentes === 1
      ? '1 sinal ainda está pendente.'
      : `${sinaisPendentes} sinais ainda estão pendentes.`,
    'Confira os agendamentos de hoje.',
  ]

  return (
    <div className="mob-dash">
      {/* ── Topo: perfil/saudação ─────────────────── */}
      <div className="mob-dash-header">
        <div className="mob-dash-header-user">
          <button
            type="button"
            className="mob-dash-avatar-btn"
            onClick={() => setShowProfile(true)}
            aria-label="Abrir conta"
          >
            {avatarPhoto ? (
              <img src={avatarPhoto} alt="" className="mob-dash-avatar-img" />
            ) : (
              <span className="mob-dash-avatar">{avatarLetter}</span>
            )}
          </button>
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
          <button className="mob-dash-icon-btn" onClick={() => setShowNotif(true)} aria-label="Notificações"><Bell size={17} /></button>
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
          {todayCards.map(({ Icon, label, value, to }) => (
            <button
              key={label}
              type="button"
              className="mob-dash-today-card mob-dash-today-card-clickable"
              onClick={() => navigate(to)}
              aria-label={`${label}: ${value}. Ver mais`}
            >
              <span className="mob-dash-today-icon"><Icon size={16} /></span>
              <span className="mob-dash-today-value">{value}</span>
              <span className="mob-dash-today-label">{label}</span>
            </button>
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

      {/* ── Notificações — bottom sheet local/mock, sem
          backend/API. Reaproveita as classes genéricas de bottom
          sheet já criadas para o detalhe de cobrança mobile. ── */}
      {showNotif && (
        <div className="mob-charges-detail-overlay" onClick={() => setShowNotif(false)}>
          <div className="mob-charges-detail-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mob-charges-detail-handle" />
            <div className="mob-charges-detail-head">
              <p className="mob-charges-detail-client">Notificações</p>
              <button className="mob-charges-detail-close" onClick={() => setShowNotif(false)} aria-label="Fechar">
                <X size={18} />
              </button>
            </div>

            <div className="mob-dash-notif-list">
              {notifItems.map((text, i) => (
                <p key={i} className="mob-dash-notif-item">{text}</p>
              ))}
            </div>

            <button className="mob-charges-detail-close-btn" onClick={() => setShowNotif(false)}>Fechar</button>
          </div>
        </div>
      )}

      {/* Input de foto — escondido, disparado pelo item "Alterar
          foto" do painel de conta. Só local/demo (data URL +
          localStorage), sem upload real para nenhum servidor. */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="mob-dash-avatar-file-input"
        onChange={handlePhotoChange}
      />

      {/* ── Conta — bottom sheet de perfil, mesmo padrão visual do
          bottom sheet de notificações. ── */}
      {showProfile && (
        <div className="mob-charges-detail-overlay" onClick={() => { setShowProfile(false); setShowPlanDetail(false) }}>
          <div className="mob-charges-detail-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mob-charges-detail-handle" />
            <div className="mob-charges-detail-head">
              <div>
                <p className="mob-charges-detail-client">Conta</p>
                <p className="mob-charges-detail-desc">{estudio}<br />Studio Pay {plano}</p>
              </div>
              <button
                className="mob-charges-detail-close"
                onClick={() => { setShowProfile(false); setShowPlanDetail(false) }}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mob-dash-actions-list">
              <button className="mob-dash-action-row" onClick={() => fileInputRef.current?.click()}>
                <span className="mob-dash-action-icon"><ImageIcon size={16} /></span>
                <span className="mob-dash-action-label">Alterar foto</span>
                <ChevronRight size={16} className="mob-dash-action-chevron" />
              </button>
              <button className="mob-dash-action-row" onClick={() => navigate('/app/configuracoes')}>
                <span className="mob-dash-action-icon"><UserRound size={16} /></span>
                <span className="mob-dash-action-label">Dados da conta</span>
                <ChevronRight size={16} className="mob-dash-action-chevron" />
              </button>
              <button className="mob-dash-action-row" onClick={() => setShowPlanDetail((v) => !v)}>
                <span className="mob-dash-action-icon"><Sparkles size={16} /></span>
                <span className="mob-dash-action-label">Plano atual</span>
                <ChevronRight size={16} className="mob-dash-action-chevron" />
              </button>
              {showPlanDetail && (
                <div className="mob-dash-plan-detail">
                  <p className="mob-dash-plan-detail-name">Studio Pay {plano}</p>
                  <p className="mob-dash-plan-detail-note">Para trocar de plano, acesse Configurações.</p>
                </div>
              )}
              <button className="mob-dash-action-row" onClick={() => navigate('/app/configuracoes')}>
                <span className="mob-dash-action-icon"><Settings size={16} /></span>
                <span className="mob-dash-action-label">Configurações</span>
                <ChevronRight size={16} className="mob-dash-action-chevron" />
              </button>
              <button className="mob-dash-action-row mob-dash-action-row-danger" onClick={handleLogout}>
                <span className="mob-dash-action-icon"><LogOut size={16} /></span>
                <span className="mob-dash-action-label">Sair</span>
                <ChevronRight size={16} className="mob-dash-action-chevron" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
