import { Bell, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const PAGE_TITLES = {
  '/app/dashboard':        'Início',
  '/app/banco':            'Banco',
  '/app/financeiro':       'Financeiro',
  '/app/agenda':           'Agenda',
  '/app/clientes':         'Clientes',
  '/app/cobrancas':        'Cobranças',
  '/app/cobrancas/criar':  'Criar Cobrança',
  '/app/cobrancas/link':   'Link de Pagamento',
  '/app/cobrancas/simular':'Simular Venda',
  '/app/elison':           'Elison IA',
  '/app/shop':             'Studio Shop',
  '/app/learn':            'Aulas',
  '/app/ads':              'Studio Pró',
  '/app/relatorios':       'Relatórios',
  '/app/configuracoes':    'Configurações',
}

export default function Topbar({ theme, onToggleTheme, hideOnMobile = false }) {
  const location = useLocation()
  const pageTitle = PAGE_TITLES[location.pathname]
    || (location.pathname.startsWith('/app/shop/') ? 'Studio Shop' : 'Studio Pay')
  const user = JSON.parse(localStorage.getItem('studiopay_user') || 'null') || { nome: 'Usuário', estudio: 'Studio', plano: 'Starter', avatar: 'U' }
  const [showNotif, setShowNotif] = useState(false)

  const notifications = [
    { id: 1, text: 'Ana Beatriz confirmou o agendamento de amanhã', time: '5min atrás' },
    { id: 2, text: 'Nova cobrança vencendo em 2 dias — Carlos Mendes', time: '1h atrás' },
    { id: 3, text: 'Elison IA enviou 3 mensagens automáticas', time: '2h atrás' },
  ]

  return (
    <header className={`topbar${hideOnMobile ? ' topbar-hide-mobile' : ''}`}>
      <div className="topbar-left hide-mobile">
        <p className="topbar-greeting">{pageTitle}</p>
      </div>

      <div className="topbar-right">
        <button
          className="topbar-icon-btn"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="notif-wrapper">
          <button className="topbar-icon-btn" onClick={() => setShowNotif(!showNotif)}>
            <Bell size={18} />
            <span className="notif-dot" />
          </button>
          {showNotif && (
            <div className="notif-dropdown">
              <p className="notif-title">Notificações</p>
              {notifications.map(n => (
                <div key={n.id} className="notif-item">
                  <p>{n.text}</p>
                  <span>{n.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="topbar-user">
          <div className="topbar-user-info hide-mobile">
            <p className="topbar-user-name">{user.nome}</p>
            <p className="topbar-user-studio">{user.estudio} · <span className="text-pink">{user.plano}</span></p>
          </div>
          <div className="topbar-avatar">{user.avatar || user.nome?.charAt(0) || 'U'}</div>
        </div>
      </div>
    </header>
  )
}
