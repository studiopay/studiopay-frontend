import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Wallet,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Minus,
  Check,
  ReceiptText,
} from 'lucide-react'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import PublicSiteShell from '@/components/landing/PublicSiteShell'
import Reveal from '@/components/landing/Reveal'

// ── Data ──────────────────────────────────────────────────────

const heroTxns = [
  { name: 'Sinal — Rafaela',    value: '+R$ 100,00', when: 'hoje',  type: 'in'  },
  { name: 'Sessão — Mateus',    value: '+R$ 280,00', when: 'ontem', type: 'in'  },
  { name: 'Material — Tintas',  value: '-R$ 89,90',  when: 'seg',   type: 'out' },
]

const demoTabs = [
  {
    id: 'pix',
    label: 'Pix',
    title: 'Pix recebido, Pix registrado.',
    text: 'O pagamento entra e já fica claro na rotina do estúdio.',
    delivers: ['Sabe quem pagou', 'Sabe o valor', 'Sinal não se perde'],
    ecosystem: 'Esse pagamento pode alimentar o financeiro, a agenda e os relatórios do Studio Pay.',
  },
  {
    id: 'cobranças',
    label: 'Cobranças',
    title: 'Veja quem pagou e quem está pendente.',
    text: 'Organize cobranças por status sem depender de conversa perdida.',
    delivers: ['Menos cobrança esquecida', 'Status claro', 'Cliente acompanhado'],
    ecosystem: 'As cobranças podem se conectar com agenda, lembretes e atendimento do Elison IA.',
  },
  {
    id: 'extrato',
    label: 'Extrato',
    title: 'Tudo que entrou e saiu, no mesmo lugar.',
    text: 'Acompanhe o movimento do estúdio sem depender de memória ou planilha.',
    delivers: ['Entrada visível', 'Saída registrada', 'Menos mistura com dinheiro pessoal'],
    ecosystem: 'O extrato ajuda o tatuador a entender a rotina financeira junto com agenda, shop e relatórios.',
  },
  {
    id: 'relatorios',
    label: 'Relatórios',
    title: 'Entenda quanto sobrou no mês.',
    text: 'Veja um resumo simples para saber como o estúdio está andando.',
    delivers: ['Visão do mês', 'Mais clareza', 'Menos achismo'],
    ecosystem: 'Os relatórios mostram o resultado da rotina: agenda, cobranças, entradas, saídas e clientes acompanhados.',
  },
]

const beforeItems = [
  'Pix no WhatsApp, sem registro',
  'Sinal anotado de cabeça',
  'Gasto com material esquecido',
  'Fim do mês confuso',
]

const afterItems = [
  'Pagamento registrado',
  'Cobrança com status',
  'Entrada e saída visíveis',
  'Resumo do mês claro',
]

const steps = [
  { n: '01', title: 'Gere a cobrança',   text: 'Para sinal, sessão ou pagamento pendente.' },
  { n: '02', title: 'Cliente paga',       text: 'O pagamento fica registrado.' },
  { n: '03', title: 'Você acompanha',     text: 'Saldo, extrato e resumo mostram o que aconteceu.' },
]

// ── Hero mockup ────────────────────────────────────────────────

function FinancialMockup() {
  return (
    <div className="core-mockup" aria-hidden="true">
      <div className="core-mockup-header">
        <div className="core-mockup-brand">
          <Wallet size={13} strokeWidth={1.8} />
          Conta Digital
        </div>
        <span className="core-mockup-status">
          <span className="core-mockup-dot" />
          Ativo
        </span>
      </div>

      <div className="core-mockup-balance-wrap">
        <p className="core-mockup-balance-label">Saldo disponível</p>
        <p className="core-mockup-balance">R$ 4.280,00</p>
      </div>

      <div className="core-mockup-stats">
        <div className="core-mockup-stat">
          <p className="core-mockup-stat-label"><ArrowUpRight size={12} />Recebido hoje</p>
          <p className="core-mockup-stat-value">R$ 380,00</p>
        </div>
        <div className="core-mockup-stat-divider" />
        <div className="core-mockup-stat">
          <p className="core-mockup-stat-label"><ReceiptText size={12} />Cobranças</p>
          <p className="core-mockup-stat-value">3 abertas</p>
        </div>
        <div className="core-mockup-stat-divider" />
        <div className="core-mockup-stat">
          <p className="core-mockup-stat-label"><ArrowDownRight size={12} />Saídas do mês</p>
          <p className="core-mockup-stat-value core-mockup-stat-out">R$ 740,00</p>
        </div>
      </div>

      <div className="core-mockup-divider" />
      <p className="core-mockup-txn-title">Últimos movimentos</p>
      <div className="core-mockup-txns">
        {heroTxns.map((t) => (
          <div key={t.name} className="core-mockup-txn">
            {t.type === 'in'
              ? <CheckCircle size={12} className="core-txn-icon" />
              : <Minus size={12} className="core-txn-icon core-txn-icon-out" />
            }
            <span className="core-txn-name">{t.name}</span>
            <span className={t.type === 'in' ? 'core-txn-value' : 'core-txn-value-out'}>{t.value}</span>
            <span className="core-txn-when">{t.when}</span>
          </div>
        ))}
      </div>

      <div className="core-mockup-tabs">
        {['Pix', 'Cobranças', 'Extrato', 'Relatórios'].map((tab, i) => (
          <div key={tab} className={`core-mockup-tab${i === 0 ? ' active' : ''}`}>{tab}</div>
        ))}
      </div>
    </div>
  )
}

// ── Demo tab cards ─────────────────────────────────────────────

function DemoCard({ tabId }) {
  if (tabId === 'pix') {
    return (
      <div className="core-demo-card">
        <div className="core-demo-card-head">
          <CheckCircle size={15} className="core-demo-card-icon-ok" />
          <span className="core-demo-card-head-label">Recebimento confirmado</span>
        </div>
        <div className="core-demo-receipt">
          <div className="core-demo-receipt-row"><span>Cliente</span><strong>Rafaela</strong></div>
          <div className="core-demo-receipt-row"><span>Tipo</span><strong>Sinal</strong></div>
          <div className="core-demo-receipt-row">
            <span>Valor</span><strong className="core-demo-value-in">R$ 100,00</strong>
          </div>
          <div className="core-demo-receipt-row">
            <span>Status</span><span className="core-demo-badge-paid">Pago</span>
          </div>
          <div className="core-demo-receipt-row"><span>Horário</span><strong>Hoje, 14:22</strong></div>
        </div>
      </div>
    )
  }

  if (tabId === 'cobranças') {
    const charges = [
      { name: 'João',   type: 'Sinal',   status: 'Pago',       cls: 'paid',    value: 'R$ 150,00' },
      { name: 'Amanda', type: 'Sessão',  status: 'Pendente',   cls: 'pending', value: 'R$ 400,00' },
      { name: 'Lucas',  type: 'Retoque', status: 'Aguardando', cls: 'waiting', value: 'R$ 120,00' },
    ]
    return (
      <div className="core-demo-card">
        <p className="core-demo-card-label">Cobranças — 3 abertas</p>
        <div className="core-demo-charges">
          {charges.map((c) => (
            <div key={c.name} className="core-demo-charge-row">
              <div className="core-demo-charge-info">
                <span className="core-demo-charge-name">{c.name}</span>
                <span className="core-demo-charge-type">{c.type}</span>
              </div>
              <span className={`core-demo-status core-demo-status-${c.cls}`}>{c.status}</span>
              <span className="core-demo-charge-value">{c.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (tabId === 'extrato') {
    const txns = [
      { name: 'Sessão — Mateus',       value: '+R$ 280,00', type: 'in'  },
      { name: 'Sinal — Rafaela',       value: '+R$ 100,00', type: 'in'  },
      { name: 'Material — Tintas',     value: '-R$ 89,90',  type: 'out' },
      { name: 'Luvas e descartáveis',  value: '-R$ 45,00',  type: 'out' },
    ]
    return (
      <div className="core-demo-card">
        <p className="core-demo-card-label">Extrato — este mês</p>
        <div className="core-demo-txns">
          {txns.map((t) => (
            <div key={t.name} className="core-demo-txn-row">
              <span className={t.type === 'in' ? 'core-demo-txn-dot-in' : 'core-demo-txn-dot-out'} />
              <span className="core-demo-txn-name">{t.name}</span>
              <span className={t.type === 'in' ? 'core-demo-txn-in' : 'core-demo-txn-out'}>{t.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (tabId === 'relatorios') {
    return (
      <div className="core-demo-card">
        <div className="core-demo-report-head">
          <p className="core-demo-card-label" style={{ margin: 0 }}>Resumo do mês</p>
          <span className="core-demo-report-period">Jun 2025</span>
        </div>
        <div className="core-demo-report-rows">
          <div className="core-demo-report-row">
            <span>Entradas</span><strong className="core-demo-value-in">R$ 8.420,00</strong>
          </div>
          <div className="core-demo-report-row">
            <span>Saídas</span><strong className="core-demo-value-out">R$ 2.180,00</strong>
          </div>
          <div className="core-demo-report-row highlight">
            <span>Saldo estimado</span><strong>R$ 6.240,00</strong>
          </div>
          <div className="core-demo-report-row pending">
            <span>Pendências</span><strong>R$ 920,00</strong>
          </div>
        </div>
      </div>
    )
  }

  return null
}

// ── Page ───────────────────────────────────────────────────────

export default function StudioCorePage() {
  const [activeTab, setActiveTab] = useState('pix')
  const tab = demoTabs.find((t) => t.id === activeTab)

  return (
    <PublicSiteShell>
      <Navbar />
      <main className="module-page core-page">

        {/* 1 — Hero */}
        <section className="core-hero">
          <div className="core-hero-glow" />
          <div className="container">
            <div className="core-hero-inner">
              <Reveal>
                <div className="core-hero-copy">
                  <span className="section-label">Conta Digital</span>
                  <h1 className="core-hero-title">
                    Controle o dinheiro do estúdio<br className="core-hero-br" />
                    <span className="text-pink"> sem misturar tudo.</span>
                  </h1>
                  <p className="core-hero-sub">
                    Receba por Pix, organize cobranças, acompanhe entradas e saídas e veja quanto realmente sobrou no fim do mês.
                  </p>
                  <div className="core-hero-actions">
                    <Link to="/cadastro" className="btn btn-primary btn-lg">
                      Começar agora <ArrowRight size={18} />
                    </Link>
                    <a href="/#planos" className="btn btn-outline btn-lg">Ver planos</a>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <FinancialMockup />
              </Reveal>
            </div>
          </div>
        </section>

        {/* 2 — Interactive demo */}
        <section className="core-demo module-section">
          <div className="container">
            <Reveal>
              <div className="section-header-center">
                <span className="section-label">Na prática</span>
                <h2 className="section-title">
                  Veja na prática o que<br />
                  <span className="text-pink">a Conta Digital organiza.</span>
                </h2>
                <p className="section-sub">
                  Clique em uma função e veja como o Studio Pay ajuda a acompanhar pagamentos, cobranças, entradas e saídas.
                </p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="core-demo-tabs" role="tablist">
                {demoTabs.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={activeTab === t.id}
                    className={`core-demo-tab${activeTab === t.id ? ' active' : ''}`}
                    onClick={() => setActiveTab(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="core-demo-body">
              <Reveal key={activeTab}>
                <div className="core-demo-copy">
                  <h3 className="core-demo-feature-title">{tab.title}</h3>
                  <p className="core-demo-feature-text">{tab.text}</p>

                  <p className="core-demo-delivers-label">O que entrega</p>
                  <ul className="core-demo-bullets">
                    {tab.delivers.map((b) => (
                      <li key={b} className="core-demo-bullet">
                        <span className="core-demo-bullet-dot">
                          <Check size={10} strokeWidth={2.5} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="core-demo-ecosystem">
                    <p className="core-demo-ecosystem-label">Conectado ao Studio Pay</p>
                    {tab.ecosystem}
                  </div>
                </div>
              </Reveal>

              <Reveal key={activeTab + '-card'} delay={60}>
                <DemoCard tabId={activeTab} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3 — Before / After */}
        <section className="core-compare module-section">
          <div className="container">
            <Reveal>
              <div className="section-header-center">
                <span className="section-label">Antes e depois</span>
                <h2 className="section-title">
                  Antes era tudo espalhado.<br />
                  <span className="text-pink">Agora fica no fluxo.</span>
                </h2>
              </div>
            </Reveal>

            <div className="core-compare-inner">
              <Reveal>
                <div className="core-compare-side before">
                  <div className="core-compare-side-label">
                    <span className="core-compare-dot-before" />
                    Antes
                  </div>
                  <ul className="core-compare-items">
                    {beforeItems.map((item) => (
                      <li key={item} className="core-compare-item">
                        <span className="core-compare-item-bullet-before" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="core-compare-side after">
                  <div className="core-compare-side-label">
                    <span className="core-compare-dot-after" />
                    Com Studio Pay
                  </div>
                  <ul className="core-compare-items">
                    {afterItems.map((item) => (
                      <li key={item} className="core-compare-item">
                        <span className="core-compare-item-bullet-after">
                          <Check size={8} strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <p className="core-section-note">
                A Conta Digital organiza o financeiro para o resto do Studio Pay trabalhar melhor junto.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 4 — How it works */}
        <section className="core-how module-section">
          <div className="container">
            <Reveal>
              <div className="section-header-center">
                <span className="section-label">Como funciona</span>
                <h2 className="section-title">
                  Da cobrança ao controle<br />
                  <span className="text-pink">em 3 passos.</span>
                </h2>
              </div>
            </Reveal>
            <div className="core-steps">
              {steps.map((step, i) => (
                <Reveal key={step.n} delay={i * 80}>
                  <div className="core-step">
                    <div className="core-step-num">{step.n}</div>
                    <div className="core-step-body">
                      <h3 className="core-step-title">{step.title}</h3>
                      <p className="core-step-text">{step.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <p className="core-section-note">
                A Conta Digital é a base financeira para agenda, relatórios e automações funcionarem com mais clareza.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 5 — Not a bank */}
        <section className="core-legal module-section">
          <div className="container">
            <Reveal>
              <div className="core-legal-inner">
                <ShieldCheck size={32} strokeWidth={1.5} className="core-legal-icon" />
                <div className="core-legal-copy">
                  <h2 className="core-legal-title">Não é banco. É controle para sua rotina.</h2>
                  <p className="core-legal-text">
                    A Conta Digital do Studio Pay ajuda o tatuador a organizar cobranças, Pix, extrato e relatórios em uma experiência prática, conectada à rotina do estúdio.
                  </p>
                  <p className="core-legal-fine">
                    Produtos financeiros podem ser oferecidos por parceiros autorizados, conforme disponibilidade e análise.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6 — CTA final */}
        <section className="module-final-cta">
          <div className="container">
            <Reveal>
              <h2 className="footer-cta-title">
                Organize o dinheiro do estúdio<br />
                <span className="text-pink">antes que ele se perca na rotina.</span>
              </h2>
              <p className="footer-cta-sub">
                Comece pela Conta Digital e acompanhe melhor cobranças, Pix e movimentações.
              </p>
              <div className="core-cta-actions">
                <Link to="/cadastro" className="btn btn-primary btn-lg">
                  Começar agora <ArrowRight size={18} />
                </Link>
                <a href="/#planos" className="btn btn-outline btn-lg">Ver planos</a>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer showCta={false} />
    </PublicSiteShell>
  )
}
