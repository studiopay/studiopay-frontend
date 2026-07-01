import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Eye, EyeOff, QrCode, Plus, Link2, ArrowLeftRight,
  FileText, CreditCard, ArrowDownLeft, ArrowUpRight,
  Clock, ChevronRight, Info, Check, Copy,
} from 'lucide-react'
import Badge from '@/components/ui/Badge'

// ── Mock data ──────────────────────────────────────
const SALDO       = 9067.94
const ENTRADAS    = 1450.00
const PENDENTES   = 2980.00
const COB_ABERTAS = 3

const DADOS_CONTA = [
  { label: 'Titular',    valor: 'Dark Ink Studio' },
  { label: 'Agência',    valor: '0001' },
  { label: 'Conta',      valor: '12345-6' },
  { label: 'Chave Pix',  valor: 'contato@darkinkstudio.com' },
  { label: 'Instituição',valor: 'Studio Pay' },
]

const EXTRATO = [
  { id: 1, tipo: 'entrada', descricao: 'Pix recebido — Ana Beatriz',   categoria: 'Pix',          data: 'Hoje',       valor: 350,  status: 'concluido' },
  { id: 2, tipo: 'entrada', descricao: 'Cobrança paga — Diego Ramos',  categoria: 'Link',         data: 'Hoje',       valor: 800,  status: 'concluido' },
  { id: 3, tipo: 'saida',   descricao: 'Transferência para fornecedor',categoria: 'Transferência', data: 'Ontem',      valor: 480,  status: 'concluido' },
  { id: 4, tipo: 'entrada', descricao: 'Pagamento via cartão',          categoria: 'Cartão',       data: 'Ontem',      valor: 1200, status: 'pendente'  },
  { id: 5, tipo: 'saida',   descricao: 'Compra de material',            categoria: 'Débito',       data: '18/06/2026', valor: 220,  status: 'concluido' },
]

function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// ── Mockup do cartão Studio Pay ────────────────────
function CartaoMockup({ estudio }) {
  const nome = (estudio || 'DARK INK STUDIO').toUpperCase().slice(0, 22)
  return (
    <div style={{
      width: 282, height: 170,
      borderRadius: 18,
      background: 'linear-gradient(135deg, rgba(255,46,209,0.22) 0%, rgba(12,5,22,0.97) 55%, rgba(8,9,11,1) 100%)',
      border: '1px solid rgba(255,46,209,0.3)',
      boxShadow: '0 16px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,46,209,0.08), 0 0 60px rgba(255,46,209,0.06)',
      padding: '20px 24px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      position: 'relative', overflow: 'hidden', flexShrink: 0,
    }}>
      {/* glow blob no canto */}
      <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,46,209,0.08)', filter: 'blur(30px)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.16em' }}>STUDIO PAY</span>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,46,209,0.7)' }} />
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,46,209,0.35)', marginLeft: -10 }} />
        </div>
      </div>

      <div style={{ width: 40, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, rgba(255,215,0,0.55), rgba(255,215,0,0.22))', border: '1px solid rgba(255,215,0,0.35)' }} />

      <div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 6, letterSpacing: '0.18em', fontFamily: 'monospace' }}>
          •••• •••• •••• 4820
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.28)', marginBottom: 3, letterSpacing: '0.1em' }}>TITULAR</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>{nome}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.28)', marginBottom: 3, letterSpacing: '0.1em' }}>STATUS</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(245,158,11,0.9)', letterSpacing: '0.05em' }}>ANÁLISE</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────
export default function Banco() {
  const navigate = useNavigate()
  const [showSaldo,    setShowSaldo]    = useState(true)
  const [extratoFiltro, setExtratoFiltro] = useState('todos')
  const [copiado,      setCopiado]      = useState(false)

  const user    = JSON.parse(localStorage.getItem('studiopay_user') || '{}')
  const estudio = user.estudio || 'Dark Ink Studio'

  function handleCopiar() {
    const texto = DADOS_CONTA.map(d => `${d.label}: ${d.valor}`).join('\n')
    navigator.clipboard?.writeText(texto).catch(() => {})
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2500)
  }

  const filtradas =
    extratoFiltro === 'todos'    ? EXTRATO :
    extratoFiltro === 'entradas' ? EXTRATO.filter(t => t.tipo === 'entrada') :
    extratoFiltro === 'saidas'   ? EXTRATO.filter(t => t.tipo === 'saida') :
                                   EXTRATO.filter(t => t.status === 'pendente')

  const ACOES = [
    {
      label: 'Área Pix', icon: QrCode, desc: 'Receba e acompanhe pagamentos Pix', destaque: true,
      onClick: () => document.getElementById('banco-extrato')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      label: 'Criar cobrança', icon: Plus, desc: 'Gere cobrança para sinal ou sessão',
      onClick: () => navigate('/app/cobrancas/criar'),
    },
    {
      label: 'Link de pagamento', icon: Link2, desc: 'Envie um link para o cliente pagar',
      onClick: () => navigate('/app/cobrancas/link'),
    },
    {
      label: 'Transferência', icon: ArrowLeftRight, desc: 'Envie valores para outra conta',
      onClick: () => {},
    },
    {
      label: 'Ver extrato', icon: FileText, desc: 'Acompanhe entradas e saídas',
      onClick: () => document.getElementById('banco-extrato')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      label: 'Cartão Studio Pay', icon: CreditCard, desc: 'Veja status e condições do cartão',
      onClick: () => document.getElementById('banco-cartao')?.scrollIntoView({ behavior: 'smooth' }),
    },
  ]

  const METODOS = [
    { titulo: 'Pix', status: 'Ativo', badgeVariant: 'green', texto: 'Receba Pix dos seus clientes com identificação da cobrança.', info: 'Recebimento imediato', btn: 'Ver Pix', onClick: () => document.getElementById('banco-extrato')?.scrollIntoView({ behavior: 'smooth' }) },
    { titulo: 'Link de pagamento', status: 'Disponível', badgeVariant: 'blue', texto: 'Envie links para sinais, sessões ou pagamentos pendentes.', info: 'Ideal para WhatsApp', btn: 'Criar link', onClick: () => navigate('/app/cobrancas/link') },
    { titulo: 'Cartão', status: 'Sob análise', badgeVariant: 'yellow', texto: 'Receba pagamentos no cartão conforme disponibilidade da operação.', info: 'Disponível conforme análise', btn: 'Ver condições', onClick: () => {} },
    { titulo: 'Boleto', status: 'Em breve', badgeVariant: 'gray', texto: 'Opção para cobranças com vencimento e controle de pagamento.', info: 'Em desenvolvimento', btn: 'Saiba mais', onClick: () => {} },
  ]

  const CONSULTAS = [
    { titulo: 'Consulta de CPF/CNPJ',    texto: 'Venda com mais segurança antes de liberar condições especiais.',                      status: 'Sob análise',    badgeVariant: 'yellow', btn: 'Simular consulta' },
    { titulo: 'Análise de risco',         texto: 'Veja indicadores para reduzir inadimplência em cobranças maiores.',                    status: 'Em breve',       badgeVariant: 'gray',   btn: 'Ver análise'     },
    { titulo: 'Histórico de pagamento',   texto: 'Acompanhe o comportamento de pagamento dos clientes cadastrados.',                     status: 'Em desenvolvimento', badgeVariant: 'gray', btn: 'Ver histórico'  },
  ]

  return (
    <div className="animate-fade-in banco-page">

      {/* ── 1. Cabeçalho ────────────────────────────── */}
      <div className="banco-header">
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Banco</h1>
          <p style={{ fontSize: 14, color: 'var(--app-text-muted)' }}>
            Sua conta digital Studio Pay para receber, pagar e acompanhar movimentações.
          </p>
        </div>
        <span className="badge badge-green" style={{ flexShrink: 0, marginTop: 4 }}>● Conta ativa</span>
      </div>

      {/* ── 2. Card de saldo ─────────────────────────── */}
      <div className="banco-saldo-card">
        <div className="banco-saldo-left">
          <p className="banco-saldo-label">Saldo disponível</p>
          <div className="banco-saldo-row">
            <span className="banco-saldo-value">{showSaldo ? fmt(SALDO) : '••••••'}</span>
            <button
              className="banco-saldo-toggle"
              onClick={() => setShowSaldo(v => !v)}
              aria-label={showSaldo ? 'Ocultar saldo' : 'Exibir saldo'}
            >
              {showSaldo ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          <p className="banco-saldo-sub">Disponível para movimentação</p>
        </div>
        <div className="banco-saldo-stats">
          <div className="banco-saldo-stat">
            <span className="banco-saldo-stat-label">Entradas hoje</span>
            <span className="banco-saldo-stat-value" style={{ color: 'var(--green)' }}>
              {showSaldo ? fmt(ENTRADAS) : '•••••'}
            </span>
          </div>
          <div className="banco-saldo-stat">
            <span className="banco-saldo-stat-label">Recebimentos pendentes</span>
            <span className="banco-saldo-stat-value" style={{ color: 'var(--yellow)' }}>
              {showSaldo ? fmt(PENDENTES) : '•••••'}
            </span>
          </div>
          <div className="banco-saldo-stat">
            <span className="banco-saldo-stat-label">Cobranças abertas</span>
            <span className="banco-saldo-stat-value" style={{ color: 'var(--yellow)' }}>{COB_ABERTAS}</span>
          </div>
          <div className="banco-saldo-stat">
            <span className="banco-saldo-stat-label">Última atualização</span>
            <span className="banco-saldo-stat-value" style={{ color: 'var(--app-text-muted)', fontSize: 13 }}>
              <Clock size={12} /> há 5min
            </span>
          </div>
        </div>
      </div>

      {/* ── 2b. Dados da conta ───────────────────────── */}
      <div className="card banco-dados-card">
        <div className="banco-dados-header">
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Dados da conta</h2>
          {copiado ? (
            <span className="banco-copiado-feedback">
              <Check size={13} /> Dados copiados.
            </span>
          ) : (
            <button className="banco-copiar-btn" onClick={handleCopiar}>
              <Copy size={13} /> Copiar dados
            </button>
          )}
        </div>
        <div className="banco-dados-items">
          {DADOS_CONTA.map(({ label, valor }) => (
            <div key={label} className="banco-dado-item">
              <span className="banco-dado-label">{label}</span>
              <span className="banco-dado-valor">{valor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. Ações bancárias ───────────────────────── */}
      <div>
        <div className="section-header"><h2>Ações bancárias</h2></div>
        <div className="banco-acoes-grid">
          {ACOES.map(({ label, icon: Icon, desc, destaque, onClick }) => (
            <button key={label} className={`banco-acao-card${destaque ? ' destaque' : ''}`} onClick={onClick}>
              <div className="banco-acao-icon"><Icon size={18} /></div>
              <div className="banco-acao-text">
                <span className="banco-acao-label">{label}</span>
                <span className="banco-acao-desc">{desc}</span>
              </div>
              <ChevronRight size={14} style={{ color: 'var(--app-text-muted)', flexShrink: 0 }} />
            </button>
          ))}
        </div>
      </div>

      {/* ── 4. Métodos de pagamento ──────────────────── */}
      <div>
        <div className="section-header"><h2>Métodos de pagamento</h2></div>
        <div className="banco-metodos-grid">
          {METODOS.map(({ titulo, status, badgeVariant, texto, info, btn, onClick }) => (
            <div key={titulo} className="card banco-metodo-card">
              <div className="banco-metodo-header">
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>{titulo}</h3>
                <Badge variant={badgeVariant}>{status}</Badge>
              </div>
              <p className="banco-metodo-texto">{texto}</p>
              <p className="banco-metodo-info">{info}</p>
              <button
                className="btn btn-ghost btn-sm"
                onClick={onClick}
                style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
              >{btn}</button>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. Cartão Studio Pay ────────────────────── */}
      <div className="card" id="banco-cartao">
        <div className="banco-cartao-block">
          <div className="banco-cartao-esquerda">
            <CartaoMockup estudio={estudio} />
            <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
              <Badge variant="yellow">Sob análise</Badge>
              <span style={{ fontSize: 11, color: 'var(--app-text-muted)' }}>Aguardando liberação</span>
            </div>
          </div>
          <div className="banco-cartao-direita">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              Cartão Studio Pay
            </h2>
            <p style={{ fontSize: 14, color: 'var(--app-text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
              Controle gastos do estúdio e acompanhe movimentações em um só lugar.
            </p>

            <div className="banco-cartao-info">
              {[
                { label: 'Limite sugerido', valor: 'Sob análise',         cor: 'var(--yellow)' },
                { label: 'Função',          valor: 'Crédito / Débito',    cor: null },
                { label: 'Status',          valor: 'Aguardando liberação', cor: null },
              ].map(({ label, valor, cor }, i, arr) => (
                <div key={label} className="banco-cartao-info-row" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--app-border)' : 'none' }}>
                  <span style={{ fontSize: 13, color: 'var(--app-text-muted)' }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: cor || 'var(--app-text)' }}>{valor}</span>
                </div>
              ))}
            </div>

            <button
              className="banco-cartao-btn"
              style={{ marginTop: 24 }}
            >
              Consultar cartão <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── 6. Consulta cadastral ───────────────────── */}
      <div>
        <div className="section-header"><h2>Consulta cadastral e risco</h2></div>
        <div className="banco-consulta-grid">
          {CONSULTAS.map(({ titulo, texto, status, badgeVariant, btn }) => (
            <div key={titulo} className="card banco-consulta-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>{titulo}</h3>
                <Badge variant={badgeVariant}>{status}</Badge>
              </div>
              <p style={{ fontSize: 13, color: 'var(--app-text-muted)', lineHeight: 1.55, flex: 1, marginBottom: 16 }}>{texto}</p>
              <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }}>{btn}</button>
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. Extrato ──────────────────────────────── */}
      <div id="banco-extrato">
        <div className="section-header"><h2>Extrato</h2></div>
        <div className="card">
          <div className="banco-extrato-filtros">
            {[
              { key: 'todos',    label: 'Todos'    },
              { key: 'entradas', label: 'Entradas' },
              { key: 'saidas',   label: 'Saídas'   },
              { key: 'pendentes',label: 'Pendentes'},
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`banco-filtro-btn${extratoFiltro === key ? ' active' : ''}`}
                onClick={() => setExtratoFiltro(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="activity-list" style={{ marginTop: 16 }}>
            {filtradas.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--app-text-muted)', fontSize: 13, padding: '28px 0' }}>
                Nenhuma movimentação encontrada.
              </p>
            )}
            {filtradas.map((t) => (
              <div key={t.id} className="activity-item">
                <div className={`banco-extrato-icon ${t.tipo === 'entrada' ? 'entrada' : 'saida'}`}>
                  {t.tipo === 'entrada' ? <ArrowDownLeft size={15} /> : <ArrowUpRight size={15} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 2 }}>{t.descricao}</p>
                  <p style={{ fontSize: 11, color: 'var(--app-text-muted)' }}>{t.categoria} · {t.data}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
                  <span style={{
                    fontSize: 14, fontWeight: 700,
                    color: t.tipo === 'entrada'
                      ? (t.status === 'pendente' ? 'var(--yellow)' : 'var(--green)')
                      : 'var(--red)',
                  }}>
                    {t.tipo === 'entrada' ? '+' : '-'}{fmt(t.valor)}
                  </span>
                  <Badge variant={t.status === 'concluido' ? 'green' : t.status === 'pendente' ? 'yellow' : 'gray'}>
                    {t.status === 'concluido' ? 'Concluído' : t.status === 'pendente' ? 'Pendente' : t.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--app-border)', marginTop: 8, paddingTop: 14, display: 'flex', justifyContent: 'center' }}>
            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--app-text-muted)', fontSize: 12 }}>
              Ver mais movimentações
            </button>
          </div>
        </div>
      </div>

      {/* ── 8. Aviso regulatório ─────────────────────── */}
      <div className="banco-aviso">
        <Info size={14} style={{ flexShrink: 0, marginTop: 1 }} />
        <p>
          Produtos financeiros podem ser oferecidos por parceiros autorizados, conforme disponibilidade,
          análise cadastral e aprovação da operação.
        </p>
      </div>

    </div>
  )
}
