import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
  Eye, EyeOff, RefreshCw,
  ChevronLeft, ChevronRight, Plus, QrCode,
  CalendarDays, Users, FileText, Bot,
  Wallet, ArrowRight, ShoppingBag,
} from 'lucide-react'
import Badge from '@/components/ui/Badge'
import MobileDashboardHome from '@/components/dashboard/MobileDashboardHome'
import { cobracas, agendamentos } from '@/data/mockData'

// ── Mock data ──────────────────────────────────────
const SALDO = 9067.94

const BANNERS = [
  {
    id: 0,
    tag: 'Conta Digital',
    title: 'Sua conta Studio Pay está pronta para organizar o estúdio',
    text: 'Receba Pix, acompanhe cobranças e veja o que entrou sem depender de planilha.',
    btn: 'Ver conta',
    to: '/app/financeiro',
    bg: 'linear-gradient(135deg, #0e0518 0%, #1e0830 55%, #110420 100%)',
    accent: 'rgba(255,46,209,0.22)',
    accentPos: 'top right',
    Deco: BancoMockup,
  },
  {
    id: 1,
    tag: 'Studio Shop',
    title: 'Produtos para o estúdio com condições especiais',
    text: 'Tintas, descartáveis e acessórios para quem usa Studio Pay.',
    btn: 'Ver ofertas',
    to: '/app/shop',
    bg: 'linear-gradient(135deg, #080f28 0%, #0f1e42 55%, #091530 100%)',
    accent: 'rgba(59,130,246,0.2)',
    accentPos: 'bottom left',
    Deco: ShopMockup,
  },
  {
    id: 2,
    tag: 'Elison IA',
    title: 'O Elison acompanha seus clientes por você',
    text: 'Confirma horários, envia lembretes e ajuda no pós-atendimento.',
    btn: 'Abrir Elison IA',
    to: '/app/elison',
    bg: 'linear-gradient(135deg, #071210 0%, #0d1e14 55%, #091410 100%)',
    accent: 'rgba(34,197,94,0.18)',
    accentPos: 'top right',
    Deco: ElisonMockup,
  },
]

const QUICK_ACTIONS = [
  { label: 'Criar cobrança', icon: Plus, to: '/app/cobrancas/criar', primary: true },
  { label: 'Pix', icon: QrCode, to: '/app/financeiro' },
  { label: 'Agenda', icon: CalendarDays, to: '/app/agenda' },
  { label: 'Clientes', icon: Users, to: '/app/clientes' },
  { label: 'Extrato', icon: FileText, to: '/app/financeiro' },
]

const PROXIMOS = [
  { horario: '09:00', cliente: 'Lucas Martins', status: 'confirmado' },
  { horario: '11:30', cliente: 'Juliana Costa', status: 'confirmado' },
  { horario: '14:00', cliente: 'Henrique Silva', status: 'pendente' },
]

// ── Números do dashboard mobile — derivados da mesma fonte mock
// compartilhada usada por Cobranças e Clientes (@/data/mockData),
// em vez de números soltos. Não é backend/API, só evita valores
// hardcoded desconectados da lista real. ──
const cobrancasAbertas = cobracas.filter((c) => c.status === 'aberto')
const cobrancasPagas = cobracas.filter((c) => c.status === 'pago')
const cobrancasVencidas = cobracas.filter((c) => c.status === 'vencido')
const agendamentosPendentes = agendamentos.filter((a) => a.status === 'pendente')

const RECEBIDO_TOTAL = cobrancasPagas.reduce((s, c) => s + c.valor, 0)
const A_RECEBER_TOTAL = [...cobrancasAbertas, ...cobrancasVencidas].reduce((s, c) => s + c.valor, 0)
const COBRANCAS_ABERTAS_COUNT = cobrancasAbertas.length
const SINAIS_PENDENTES_COUNT = agendamentosPendentes.length
const CLIENTES_PARA_CONFIRMAR_COUNT = new Set(agendamentosPendentes.map((a) => a.cliente)).size

// ── Helpers ────────────────────────────────────────
function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function hora() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

// ── Mockup: Cartão (Slide 1 — Conta Digital) ──────
function BancoMockup() {
  return (
    <div style={{ position: 'relative', width: 200, paddingBottom: 30, flexShrink: 0 }}>
      <div style={{
        width: 188, height: 114,
        borderRadius: 14,
        background: 'linear-gradient(135deg, rgba(255,46,209,0.18) 0%, rgba(16,6,26,0.96) 100%)',
        border: '1px solid rgba(255,46,209,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,46,209,0.1)',
        padding: '13px 16px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.14em' }}>STUDIO PAY</span>
          <div style={{ display: 'flex' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,46,209,0.65)' }} />
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,46,209,0.35)', marginLeft: -7 }} />
          </div>
        </div>
        <div style={{ width: 30, height: 22, borderRadius: 5, background: 'linear-gradient(135deg,rgba(255,215,0,0.45),rgba(255,215,0,0.2))', border: '1px solid rgba(255,215,0,0.3)' }} />
        <div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.32)', marginBottom: 3, letterSpacing: '0.1em' }}>SALDO DISPONÍVEL</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>R$ 9.067,94</div>
        </div>
      </div>
      <div style={{
        position: 'absolute', bottom: 0, right: -8,
        background: 'rgba(5,12,5,0.85)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(34,197,94,0.32)', borderRadius: 10,
        padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: '0 4px 16px rgba(0,0,0,0.45)',
      }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>Pix recebido</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#22C55E', lineHeight: 1.2 }}>+ R$ 350,00</div>
        </div>
      </div>
    </div>
  )
}

// ── Mockup: Shop (Slide 2) ─────────────────────────
function ShopMockup() {
  const items = [
    { label: 'Tintas Premium Intenze', price: 'R$ 89', color: '#6366f1' },
    { label: 'Agulha 3RL Aço Cirúrgico', price: 'R$ 45', color: '#3B82F6', badge: '15% OFF' },
    { label: 'Máquina Pen Ghost V3', price: 'R$ 299', color: '#8B5CF6' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, width: 190, flexShrink: 0 }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 10, padding: '8px 12px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8, flexShrink: 0,
            background: item.color + '1a', border: `1px solid ${item.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: item.color + '99' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.78)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: item.color, lineHeight: 1.3 }}>{item.price}</div>
          </div>
          {item.badge && (
            <div style={{
              background: 'rgba(255,46,209,0.16)', border: '1px solid rgba(255,46,209,0.3)',
              borderRadius: 5, padding: '2px 7px',
              fontSize: 9, fontWeight: 800, color: 'rgba(255,46,209,0.92)',
              flexShrink: 0, letterSpacing: '0.04em', whiteSpace: 'nowrap',
            }}>{item.badge}</div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Mockup: Elison IA (Slide 3) ────────────────────
function ElisonMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, width: 200, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.85)', lineHeight: 1 }}>Elison IA</div>
          <div style={{ fontSize: 9, color: 'rgba(34,197,94,0.85)', marginTop: 2 }}>● ativo agora</div>
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '11px 11px 11px 3px', padding: '8px 11px', fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.45, maxWidth: '90%' }}>
        Confirmei a sessão da Ana para amanhã às 14h ✓
      </div>
      <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '11px 11px 3px 11px', padding: '8px 11px', fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.45, alignSelf: 'flex-end', maxWidth: '88%' }}>
        5 lembretes automáticos enviados 🔔
      </div>
      <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '11px 11px 11px 3px', padding: '8px 11px', fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.45, maxWidth: '90%' }}>
        Lucas M. · sessão hoje às 09:00 📍
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useOutletContext() || {}
  const [showSaldo, setShowSaldo] = useState(true)
  const [slide, setSlide] = useState(0)

  const user = JSON.parse(localStorage.getItem('studiopay_user') || '{}')

  // Admin overrides (front-only, localStorage)
  const adminBanners = (() => {
    try { return JSON.parse(localStorage.getItem('studioPayAdmin_dashboardBanners') || 'null') } catch { return null }
  })()
  const estudio = user.estudio || 'Dark Ink Studio'

  const prevSlide = () => setSlide(s => (s - 1 + BANNERS.length) % BANNERS.length)
  const nextSlide = () => setSlide(s => (s + 1) % BANNERS.length)

  return (
    <div className="animate-fade-in">

      {/* ── Dashboard mobile (estilo app financeiro) ─
          Visível apenas abaixo de 768px. O bloco desktop/tablet
          abaixo permanece 100% intocado, apenas oculto nesse
          mesmo breakpoint. ── */}
      <div className="hide-desktop">
        <MobileDashboardHome
          estudio={estudio}
          plano={user.plano || 'Pro'}
          avatarLetter={user.avatar || estudio?.charAt(0) || 'S'}
          theme={theme}
          onToggleTheme={toggleTheme}
          saldo={SALDO}
          showSaldo={showSaldo}
          onToggleSaldo={() => setShowSaldo(v => !v)}
          recebidoHoje={RECEBIDO_TOTAL}
          aReceber={A_RECEBER_TOTAL}
          pendente={COBRANCAS_ABERTAS_COUNT}
          sessoesHoje={PROXIMOS.length}
          cobrancasVencendo={COBRANCAS_ABERTAS_COUNT}
          sinaisPendentes={SINAIS_PENDENTES_COUNT}
          clientesParaConfirmar={CLIENTES_PARA_CONFIRMAR_COUNT}
        />
      </div>

      {/* ── Dashboard desktop/tablet (layout atual) ── */}
      <div className="dash4-root hide-mobile">

      {/* ── BLOCO 1: SALDO ─────────────────────────── */}
      <div className="dash4-saldo-card">
        {/* Esquerda: saldo principal */}
        <div className="dash4-saldo-left">
          <p className="dash4-saldo-label">Saldo em conta</p>
          <div className="dash4-saldo-row">
            <span className="dash4-saldo-value">
              {showSaldo ? fmt(SALDO) : '•••••••'}
            </span>
            <button
              className="dash4-saldo-toggle"
              onClick={() => setShowSaldo(v => !v)}
              aria-label={showSaldo ? 'Ocultar saldo' : 'Exibir saldo'}
            >
              {showSaldo ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          <p className="dash4-saldo-sub">Disponível para movimentação</p>
        </div>

        {/* Direita: 3 mini indicadores */}
        <div className="dash4-saldo-stats">
          <div className="dash4-saldo-stat">
            <span className="dash4-saldo-stat-label">Entradas hoje</span>
            <span className="dash4-saldo-stat-value" style={{ color: 'var(--green)' }}>
              {showSaldo ? 'R$ 1.450,00' : '•••••'}
            </span>
          </div>
          <div className="dash4-saldo-stat">
            <span className="dash4-saldo-stat-label">Cobranças abertas</span>
            <span className="dash4-saldo-stat-value" style={{ color: 'var(--yellow)' }}>3</span>
          </div>
          <div className="dash4-saldo-stat">
            <span className="dash4-saldo-stat-label">Recebimentos pendentes</span>
            <span className="dash4-saldo-stat-value" style={{ color: 'var(--yellow)' }}>
              {showSaldo ? 'R$ 2.980,00' : '•••••'}
            </span>
          </div>
        </div>
      </div>

      {/* ── BLOCO 2: BOAS-VINDAS ───────────────────── */}
      <div className="dash4-welcome">
        <div>
          <h1 className="dash4-welcome-title">{hora()}, {estudio} 👋</h1>
          <p className="dash4-welcome-sub">Veja o que está acontecendo no seu estúdio hoje.</p>
        </div>
        <div className="dash4-updated">
          <RefreshCw size={12} />
          Atualizado há 5min
        </div>
      </div>

      {/* ── BLOCO 3: CARROSSEL ─────────────────────── */}
      <div className="dash4-carousel">
        <div
          className="dash4-carousel-track"
          style={{ transform: `translateX(-${slide * (100 / BANNERS.length)}%)` }}
        >
          {BANNERS.map((b) => {
            const { Deco } = b
            const adminB  = adminBanners?.[b.id] || {}
            const tag     = adminB.tag   || b.tag
            const title   = adminB.title || b.title
            const text    = adminB.text  || b.text
            const btn     = adminB.btn   || b.btn
            return (
              <div key={b.id} className="dash4-carousel-slide" style={{ background: b.bg }}>
                {/* glow blob */}
                <div style={{
                  position: 'absolute', width: 320, height: 320, borderRadius: '50%',
                  background: `radial-gradient(circle, ${b.accent} 0%, transparent 68%)`,
                  [b.accentPos.includes('top') ? 'top' : 'bottom']: -100,
                  [b.accentPos.includes('right') ? 'right' : 'left']: -80,
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', width: 180, height: 180, borderRadius: '50%',
                  background: `radial-gradient(circle, ${b.accent} 0%, transparent 70%)`,
                  [b.accentPos.includes('top') ? 'bottom' : 'top']: -60,
                  [b.accentPos.includes('right') ? 'left' : 'right']: -40,
                  pointerEvents: 'none', opacity: 0.5,
                }} />

                <div className="dash4-slide-body">
                  <div className="dash4-slide-content">
                    <span className="dash4-slide-tag">{tag}</span>
                    <h2 className="dash4-slide-title">{title}</h2>
                    <p className="dash4-slide-text">{text}</p>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(b.to)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6 }}
                    >
                      {btn} <ArrowRight size={13} />
                    </button>
                  </div>

                  <div className="dash4-slide-deco">
                    {adminB.imagem
                      ? <img src={adminB.imagem} alt={tag} style={{ height: 130, maxWidth: 220, objectFit: 'contain', borderRadius: 10 }} />
                      : <Deco />
                    }
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Setas */}
        <button className="dash4-carousel-arrow dash4-arrow-left" onClick={prevSlide} aria-label="Anterior">
          <ChevronLeft size={20} />
        </button>
        <button className="dash4-carousel-arrow dash4-arrow-right" onClick={nextSlide} aria-label="Próximo">
          <ChevronRight size={20} />
        </button>

        {/* Bolinhas */}
        <div className="dash4-carousel-dots">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              className={`dash4-dot ${i === slide ? 'active' : ''}`}
              onClick={() => setSlide(i)}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── BLOCO 4: AÇÕES RÁPIDAS ─────────────────── */}
      <div className="dash4-quick-wrap">
        <div className="dash4-quick-actions">
          {QUICK_ACTIONS.map(({ label, icon: Icon, to, primary }) => (
            <button
              key={label}
              className={`dash4-quick-btn${primary ? ' primary' : ''}`}
              onClick={() => navigate(to)}
            >
              <span className="dash4-quick-icon">
                <Icon size={primary ? 18 : 16} />
              </span>
              <span className="dash4-quick-label">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── BLOCO 5: CARDS DE RESUMO (2×2) ─────────── */}
      <div className="dash4-summary-grid">

        {/* Card 1 — Próximos atendimentos */}
        <div className="card">
          <div className="section-header" style={{ marginBottom: 14 }}>
            <h2 style={{ fontSize: 15 }}>Próximos atendimentos</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/app/agenda')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              Ver agenda <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PROXIMOS.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 0',
                borderBottom: i < PROXIMOS.length - 1 ? '1px solid var(--app-border)' : 'none',
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--pink)', minWidth: 44, flexShrink: 0 }}>
                  {a.horario}
                </span>
                <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {a.cliente}
                </span>
                <Badge variant={a.status === 'confirmado' ? 'green' : 'yellow'}>
                  {a.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2 — Cobranças */}
        <div className="card">
          <div className="section-header" style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 15 }}>Cobranças</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/app/cobrancas')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              Ver cobranças <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', borderRadius: 'var(--radius)',
              background: 'var(--app-surface-soft)',
            }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>3 em aberto</p>
                <p style={{ fontSize: 11, color: 'var(--app-text-muted)' }}>Aguardando pagamento</p>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--yellow)' }}>{fmt(2980)}</span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', borderRadius: 'var(--radius)',
              background: 'var(--app-surface-soft)',
            }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>2 recebidas hoje</p>
                <p style={{ fontSize: 11, color: 'var(--app-text-muted)' }}>Entradas confirmadas</p>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--green)' }}>{fmt(1450)}</span>
            </div>
          </div>
        </div>

        {/* Card 3 — Elison IA */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--pink-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot size={17} color="var(--pink)" />
            </div>
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>Elison IA</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 5px var(--green)' }} />
                <span style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600 }}>Assistente ativo</span>
              </div>
            </div>
          </div>
          <div style={{
            background: 'var(--app-surface-soft)', borderLeft: '3px solid var(--pink)',
            borderRadius: '0 8px 8px 0', padding: '12px 14px',
            fontSize: 13, lineHeight: 1.6, color: 'var(--app-text)', marginBottom: 16,
          }}>
            2 confirmações enviadas e 5 lembretes programados para hoje.
          </div>
          <button className="btn btn-ghost btn-sm btn-block"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
            onClick={() => navigate('/app/elison')}>
            Abrir Elison IA <ArrowRight size={12} />
          </button>
        </div>

        {/* Card 4 — Resumo financeiro */}
        <div className="card">
          <div className="section-header" style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 15 }}>Resumo financeiro</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/app/financeiro')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              Ver financeiro <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { label: 'Receitas do mês', value: fmt(24680), color: 'var(--green)', icon: '↑' },
              { label: 'Despesas', value: fmt(7322.20), color: 'var(--red)', icon: '↓' },
              { label: 'Lucro', value: fmt(17357.80), color: 'var(--pink)', icon: '=' },
            ].map(({ label, value, color, icon }, i, arr) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '11px 0',
                borderBottom: i < arr.length - 1 ? '1px solid var(--app-border)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Wallet size={14} style={{ color, opacity: 0.8 }} />
                  <span style={{ fontSize: 13, color: 'var(--app-text-muted)' }}>{label}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
      </div>
    </div>
  )
}
