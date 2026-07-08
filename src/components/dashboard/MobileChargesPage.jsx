import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell, Plus, Link2, Barcode, HandCoins,
  ArrowRight, FileClock,
} from 'lucide-react'

// Redesenho da tela Cobranças apenas para mobile, no mesmo padrão
// visual do MobileDashboardHome (app financeiro). Visível apenas
// abaixo de 768px via classe global "hide-desktop" — a tela desktop
// de Cobrancas.jsx continua intocada, escondida no mesmo breakpoint
// via "hide-mobile". Dados 100% mock/local, sem backend/API.

function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const QUICK_ACTIONS = [
  { label: 'Nova cobrança', icon: Plus, to: '/app/cobrancas/criar' },
  { label: 'Enviar link', icon: Link2, to: '/app/cobrancas/link' },
  { label: 'Gerar boleto', icon: Barcode, to: '/app/cobrancas/criar' },
  { label: 'Cobrar sinal', icon: HandCoins, to: '/app/cobrancas/criar' },
]

const FILTERS = ['Todas', 'Pendentes', 'Pagas', 'Vencendo', 'Vencidas']

const MOCK_COBRANCAS = [
  { id: 1, cliente: 'Marina Souza', descricao: 'Sessão fechamento de braço', valor: 650, status: 'Pago', metodo: 'Pix recebido', data: 'Hoje, 10:42' },
  { id: 2, cliente: 'Diego Ramos', descricao: 'Blackwork antebraço', valor: 1950, status: 'Enviado', metodo: 'Link enviado', data: 'Vence em 2 dias' },
  { id: 3, cliente: 'Rafael Nunes', descricao: 'Sinal realismo', valor: 150, status: 'Pendente', metodo: 'Sinal', data: 'Hoje' },
  { id: 4, cliente: 'Thais Pereira', descricao: 'Cobrança sessão', valor: 420, status: 'Vencendo', metodo: 'Boleto', data: 'Amanhã' },
]

const STATUS_STYLE = {
  Pago: 'green',
  Enviado: 'blue',
  Pendente: 'yellow',
  Vencendo: 'yellow',
  Vencida: 'red',
}

const FILTER_MAP = {
  Todas: null,
  Pendentes: 'Pendente',
  Pagas: 'Pago',
  Vencendo: 'Vencendo',
  Vencidas: 'Vencida',
}

export default function MobileChargesPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('Todas')

  const statusFilter = FILTER_MAP[filter]
  const filtradas = statusFilter ? MOCK_COBRANCAS.filter((c) => c.status === statusFilter) : MOCK_COBRANCAS

  return (
    <div className="mob-charges">
      {/* ── Header ─────────────────────────────────── */}
      <div className="mob-charges-header">
        <div>
          <h1 className="mob-charges-title">Cobranças</h1>
          <p className="mob-charges-sub">Crie, envie e acompanhe pagamentos do seu estúdio.</p>
        </div>
        <button className="mob-dash-icon-btn" aria-label="Notificações"><Bell size={17} /></button>
      </div>

      {/* ── Card principal financeiro ─────────────── */}
      <div className="mob-dash-balance-card">
        <div className="mob-dash-balance-top">
          <span className="mob-dash-balance-label">A receber</span>
        </div>

        <p className="mob-dash-balance-value">{fmt(2980)}</p>

        <button className="mob-charges-cta" onClick={() => navigate('/app/cobrancas/criar')}>
          Criar cobrança <ArrowRight size={14} />
        </button>

        <div className="mob-dash-balance-mini">
          <div className="mob-dash-balance-mini-item">
            <span className="mob-dash-balance-mini-label">Recebido hoje</span>
            <span className="mob-dash-balance-mini-value">{fmt(1450)}</span>
          </div>
          <div className="mob-dash-balance-mini-item">
            <span className="mob-dash-balance-mini-label">Pendente</span>
            <span className="mob-dash-balance-mini-value">{fmt(450)}</span>
          </div>
          <div className="mob-dash-balance-mini-item">
            <span className="mob-dash-balance-mini-label">Vencendo</span>
            <span className="mob-dash-balance-mini-value">3</span>
          </div>
        </div>
      </div>

      {/* ── Ações rápidas ──────────────────────────── */}
      <div className="mob-dash-shortcuts mob-charges-shortcuts">
        {QUICK_ACTIONS.map(({ label, icon: Icon, to }) => (
          <button key={label} className="mob-dash-shortcut" onClick={() => navigate(to)}>
            <span className="mob-dash-shortcut-icon"><Icon size={20} /></span>
            <span className="mob-dash-shortcut-label">{label}</span>
          </button>
        ))}
      </div>

      {/* ── Filtros ────────────────────────────────── */}
      <div className="mob-charges-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`mob-charges-filter-chip${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Lista de cobranças ─────────────────────── */}
      {filtradas.length > 0 ? (
        <div className="mob-charges-list">
          {filtradas.map((c) => (
            <div key={c.id} className="mob-charges-item">
              <span className={`mob-charges-item-icon ${STATUS_STYLE[c.status]}`}>
                <FileClock size={16} />
              </span>
              <div className="mob-charges-item-body">
                <p className="mob-charges-item-client">{c.cliente}</p>
                <p className="mob-charges-item-desc">{c.descricao}</p>
                <p className="mob-charges-item-meta">{c.metodo} · {c.data}</p>
              </div>
              <div className="mob-charges-item-right">
                <span className="mob-charges-item-value">{fmt(c.valor)}</span>
                <span className={`mob-charges-status ${STATUS_STYLE[c.status]}`}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mob-charges-empty">
          <p className="mob-charges-empty-title">Nenhuma cobrança por enquanto</p>
          <p className="mob-charges-empty-text">Crie sua primeira cobrança para acompanhar pagamentos pelo Studio Pay.</p>
          <button className="mob-charges-cta" onClick={() => navigate('/app/cobrancas/criar')}>
            Criar cobrança <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
