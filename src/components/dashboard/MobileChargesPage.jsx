import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell, Plus, Link2, Barcode, HandCoins,
  ArrowRight, FileClock, Copy, Check, X,
} from 'lucide-react'

// Redesenho da tela Cobranças apenas para mobile, no mesmo padrão
// visual do MobileDashboardHome (app financeiro). Visível apenas
// abaixo de 768px via classe global "hide-desktop" — a tela desktop
// de Cobrancas.jsx continua intocada, escondida no mesmo breakpoint
// via "hide-mobile".
//
// Diferente da primeira versão, esta página NÃO usa mais mock local
// desconectado: os dados (prop "cobrancas") e a ação de copiar Pix
// (props "onCopyPix"/"pixCopiado") vêm de Cobracas.jsx — a mesma
// lista e o mesmo handler já usados pela tela desktop. Não existe
// modal de detalhe/edição de cobrança pronto no desktop, então o
// painel de detalhe abaixo é um bottom sheet visual local (só
// frontend, sem backend/API/persistência).

function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
function fmtDate(iso) {
  return new Date(iso + 'T00:00').toLocaleDateString('pt-BR')
}
function diasParaVencer(vencimento) {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const venc = new Date(vencimento + 'T00:00')
  return Math.round((venc - hoje) / 86400000)
}

const QUICK_ACTIONS = [
  { label: 'Nova cobrança', icon: Plus, to: '/app/cobrancas/criar' },
  { label: 'Enviar link', icon: Link2, to: '/app/cobrancas/link' },
  { label: 'Gerar boleto', icon: Barcode, to: '/app/cobrancas/criar' },
  { label: 'Cobrar sinal', icon: HandCoins, to: '/app/cobrancas/criar' },
]

const FILTERS = ['Todas', 'Pendentes', 'Pagas', 'Vencendo', 'Vencidas']

const STATUS_STYLE = { aberto: 'yellow', pago: 'green', vencido: 'red', cancelado: '' }
const STATUS_LABEL = { aberto: 'Em aberto', pago: 'Pago', vencido: 'Vencido', cancelado: 'Cancelado' }

export default function MobileChargesPage({ cobrancas = [], onCopyPix, pixCopiado }) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('Todas')
  const [selected, setSelected] = useState(null)

  // "Vencendo" não existe como status próprio nos dados reais — é
  // derivado: cobranças em aberto que vencem nos próximos 3 dias.
  const isVencendo = (c) => c.status === 'aberto' && diasParaVencer(c.vencimento) >= 0 && diasParaVencer(c.vencimento) <= 3

  const filtradas = cobrancas.filter((c) => {
    if (filter === 'Todas') return true
    if (filter === 'Pendentes') return c.status === 'aberto'
    if (filter === 'Pagas') return c.status === 'pago'
    if (filter === 'Vencendo') return isVencendo(c)
    if (filter === 'Vencidas') return c.status === 'vencido'
    return true
  })

  // Card "A receber" — calculado a partir da lista real recebida via
  // props, não hardcoded. "Recebido hoje" usa fallback (soma de todas
  // as pagas), já que os dados não têm um campo de data de pagamento.
  const aReceber = cobrancas.filter((c) => c.status === 'aberto' || c.status === 'vencido').reduce((s, c) => s + c.valor, 0)
  const recebido = cobrancas.filter((c) => c.status === 'pago').reduce((s, c) => s + c.valor, 0)
  const pendentesCount = cobrancas.filter((c) => c.status === 'aberto').length
  const vencendoCount = cobrancas.filter(isVencendo).length

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

      {/* ── Card principal financeiro (calculado) ──── */}
      <div className="mob-dash-balance-card">
        <div className="mob-dash-balance-top">
          <span className="mob-dash-balance-label">A receber</span>
        </div>

        <p className="mob-dash-balance-value">{fmt(aReceber)}</p>

        <button className="mob-charges-cta" onClick={() => navigate('/app/cobrancas/criar')}>
          Criar cobrança <ArrowRight size={14} />
        </button>

        <div className="mob-dash-balance-mini">
          <div className="mob-dash-balance-mini-item">
            <span className="mob-dash-balance-mini-label">Recebido</span>
            <span className="mob-dash-balance-mini-value">{fmt(recebido)}</span>
          </div>
          <div className="mob-dash-balance-mini-item">
            <span className="mob-dash-balance-mini-label">Pendente</span>
            <span className="mob-dash-balance-mini-value">{pendentesCount}</span>
          </div>
          <div className="mob-dash-balance-mini-item">
            <span className="mob-dash-balance-mini-label">Vencendo</span>
            <span className="mob-dash-balance-mini-value">{vencendoCount}</span>
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
      <p className="mob-charges-shortcuts-note">
        "Gerar boleto" e "Cobrar sinal" abrem o formulário de criação — escolha o tipo e a forma de envio na próxima etapa.
      </p>

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

      {/* ── Lista de cobranças (dados reais, clicável) ── */}
      {filtradas.length > 0 ? (
        <div className="mob-charges-list">
          {filtradas.map((c) => (
            <button
              key={c.id}
              type="button"
              className="mob-charges-item mob-charges-item-clickable"
              onClick={() => setSelected(c)}
              aria-label={`Ver detalhes da cobrança de ${c.cliente}`}
            >
              <span className={`mob-charges-item-icon ${STATUS_STYLE[c.status]}`}>
                <FileClock size={16} />
              </span>
              <div className="mob-charges-item-body">
                <p className="mob-charges-item-client">{c.cliente}</p>
                <p className="mob-charges-item-desc">{c.descricao}</p>
                <p className="mob-charges-item-meta">Vence em {fmtDate(c.vencimento)}</p>
              </div>
              <div className="mob-charges-item-right">
                <span className="mob-charges-item-value">{fmt(c.valor)}</span>
                <span className={`mob-charges-status ${STATUS_STYLE[c.status]}`}>{STATUS_LABEL[c.status]}</span>
              </div>
            </button>
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

      {/* ── Bottom sheet de detalhe — UI local/mock, sem
          backend/API. Reaproveita o handler real de copiar Pix
          (onCopyPix/pixCopiado) já usado pelo desktop. ── */}
      {selected && (
        <div className="mob-charges-detail-overlay" onClick={() => setSelected(null)}>
          <div className="mob-charges-detail-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mob-charges-detail-handle" />
            <div className="mob-charges-detail-head">
              <div>
                <p className="mob-charges-detail-client">{selected.cliente}</p>
                <p className="mob-charges-detail-desc">{selected.descricao}</p>
              </div>
              <button className="mob-charges-detail-close" onClick={() => setSelected(null)} aria-label="Fechar">
                <X size={18} />
              </button>
            </div>

            <div className="mob-charges-detail-rows">
              <div className="mob-charges-detail-row">
                <span>Valor</span>
                <span className="mob-charges-detail-row-value">{fmt(selected.valor)}</span>
              </div>
              <div className="mob-charges-detail-row">
                <span>Status</span>
                <span className={`mob-charges-status ${STATUS_STYLE[selected.status]}`}>{STATUS_LABEL[selected.status]}</span>
              </div>
              <div className="mob-charges-detail-row">
                <span>Vencimento</span>
                <span className="mob-charges-detail-row-value">{fmtDate(selected.vencimento)}</span>
              </div>
            </div>

            {selected.pixCopiaECola && (
              <button
                className="mob-charges-cta mob-charges-detail-pix-btn"
                onClick={() => onCopyPix?.(selected.id, selected.pixCopiaECola)}
              >
                {pixCopiado === selected.id ? <Check size={14} /> : <Copy size={14} />}
                {pixCopiado === selected.id ? 'Pix copiado!' : 'Copiar Pix'}
              </button>
            )}

            <button className="mob-charges-detail-close-btn" onClick={() => setSelected(null)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  )
}
