import { Link } from 'react-router-dom'
import { Check, Bot } from 'lucide-react'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import PublicSiteShell from '@/components/landing/PublicSiteShell'
import Reveal from '@/components/landing/Reveal'

// ── Dados — tabela oficial de funcionalidades por plano ──────────
// Página self-contained (não usa <PlansSection/>, que é compartilhada
// com o teaser de planos da home) para poder trazer o conteúdo
// completo aqui sem alterar nada na home.

const plans = [
  {
    name: 'Starter',
    tagline: 'Pra sair do improviso',
    currency: 'R$',
    amount: '37,90',
    period: '/mês',
    priceLabel: null,
    description: 'Organização essencial para começar a controlar agenda, financeiro e rotina do estúdio.',
    tag: null,
    highlighted: false,
    premium: false,
    ctaLabel: 'Começar com Starter',
    ctaTo: '/cadastro',
    items: [
      'Agenda essencial',
      'Financeiro básico',
      'Cobranças simples',
      'Acesso à Studio Shop',
      'Cursos avulsos',
      'Elisson.IA contratado à parte',
    ],
  },
  {
    name: 'Pro',
    tagline: 'Mais recomendado',
    currency: 'R$',
    amount: '97,90',
    period: '/mês',
    priceLabel: null,
    description: 'Para quem quer automatizar a rotina, economizar nas compras e profissionalizar o atendimento.',
    tag: 'Mais recomendado',
    highlighted: true,
    premium: false,
    ctaLabel: 'Começar com Pro',
    ctaTo: '/cadastro',
    items: [
      'Tudo do Starter',
      'Agenda com automações',
      'Relatórios avançados',
      'Descontos na Studio Shop',
      'Cursos com preço reduzido',
      'Elisson.IA por 3 meses',
      'Suporte prioritário',
    ],
  },
  {
    name: 'Pro+',
    tagline: 'Máximo benefício',
    currency: null,
    amount: null,
    period: null,
    priceLabel: 'Sob consulta',
    description: 'Para estúdios que querem acesso premium, melhores condições e benefícios exclusivos em todo o ecossistema.',
    tag: 'Plano premium',
    highlighted: false,
    premium: true,
    ctaLabel: 'Falar com especialista',
    ctaTo: '/cadastro',
    items: [
      'Tudo do Pro',
      'Cashback e benefícios premium',
      'Melhores condições na Shop',
      'Cursos com melhor preço',
      'Benefício premium no Elisson.IA',
      'Prioridade máxima',
      'Recursos avançados',
    ],
  },
]

const addonSummary = [
  { plan: 'Starter', note: 'Contratação à parte' },
  { plan: 'Pro', note: '3 meses inclusos' },
  { plan: 'Pro+', note: 'Condição premium' },
]

const moduleComparison = [
  { module: 'Agenda', starter: 'Essencial', pro: 'Automação e inteligência', proPlus: 'Operação avançada' },
  { module: 'Studio Shop', starter: 'Acesso com preço normal', pro: 'Melhor preço e ofertas', proPlus: 'Melhor preço, cashback e ofertas premium' },
  { module: 'Banco / Conta Digital', starter: 'Cobranças e conta básica', pro: 'Taxas reduzidas e relatórios', proPlus: 'Melhores taxas e prioridade' },
  { module: 'Cursos', starter: 'Compra avulsa', pro: 'Preço reduzido', proPlus: 'Melhor preço e benefícios premium' },
  { module: 'Marketing / Digital Mix', starter: 'Acesso aos planos', pro: 'Condições melhores futuras', proPlus: 'Prioridade e pacotes premium' },
  { module: 'Elisson.IA', starter: 'Contratado à parte', pro: '3 meses inclusos', proPlus: 'Condição premium' },
  { module: 'Relatórios', starter: 'Básico', pro: 'Avançado', proPlus: 'Premium' },
]

// ── Tabela premium reutilizável (comparação por módulo + preços do
// add-on Elison), com fallback em cards no mobile via data-label ──

function CompareTable({ rows, firstColLabel }) {
  return (
    <div className="planos-compare-table">
      <div className="planos-compare-row planos-compare-head" aria-hidden="true">
        <span className="planos-compare-cell planos-compare-module">{firstColLabel}</span>
        <span className="planos-compare-cell">Starter</span>
        <span className="planos-compare-cell planos-compare-pro-col">Pro</span>
        <span className="planos-compare-cell">Pro+</span>
      </div>
      {rows.map((row) => (
        <div key={row.module} className="planos-compare-row">
          <span className="planos-compare-cell planos-compare-module">{row.module}</span>
          <span className="planos-compare-cell" data-label="Starter">{row.starter}</span>
          <span className="planos-compare-cell planos-compare-pro-col" data-label="Pro">{row.pro}</span>
          <span className="planos-compare-cell" data-label="Pro+">{row.proPlus}</span>
        </div>
      ))}
    </div>
  )
}

export default function PlanosPage() {
  return (
    <PublicSiteShell>
      <Navbar />
      <main className="plans-page">
        {/* 1 — Planos principais */}
        <section className="planos-hero module-section">
          <div className="container">
            <Reveal>
              <div className="section-header-center">
                <span className="section-label">Planos</span>
                <h2 className="section-title">
                  Comece simples.<br />
                  Cresça com <span className="landing-accent">automação.</span>
                </h2>
                <p className="section-sub">
                  Do básico ao premium, escolha o plano que combina com o momento do seu estúdio.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="plans-grid">
                {plans.map((p) => (
                  <div
                    key={p.name}
                    className={`plan-card${p.highlighted ? ' highlighted' : ''}${p.premium ? ' premium' : ''}`}
                  >
                    {p.tag && <div className="plan-tag">{p.tag}</div>}

                    <div className="plan-card-head">
                      <h3 className="plan-name">{p.name}</h3>
                      <p className="plan-tagline">{p.tagline}</p>
                    </div>

                    <div className="plan-price">
                      {p.priceLabel ? (
                        <span className="plan-price-consult">{p.priceLabel}</span>
                      ) : (
                        <>
                          <span className="plan-currency">{p.currency}</span>
                          <span className="plan-amount">{p.amount}</span>
                          <span className="plan-period">{p.period}</span>
                        </>
                      )}
                    </div>

                    <p className="plan-description">{p.description}</p>

                    <ul className="plan-features">
                      {p.items.map((item) => (
                        <li key={item}>
                          <Check
                            size={14}
                            color={
                              p.highlighted
                                ? 'var(--pink)'
                                : p.premium
                                ? 'rgba(255,46,209,0.65)'
                                : 'var(--green)'
                            }
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={p.ctaTo}
                      className={`btn btn-block btn-lg${
                        p.highlighted ? ' btn-primary' : p.premium ? ' btn-outline-premium' : ' btn-outline'
                      }`}
                    >
                      {p.ctaLabel}
                    </Link>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={160}>
              <p className="plans-footer-note">
                Você pode começar pelo básico e evoluir conforme sua operação cresce.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 2 — Elisson.IA como add-on, contratado à parte e com aba própria
            dentro do Studio Pay — não é incluso permanentemente em nenhum
            plano; o que muda por plano é a condição de acesso. */}
        <section className="planos-addon module-section">
          <div className="planos-addon-glow" />
          <div className="container">
            <Reveal>
              <div className="planos-addon-panel">
                <span className="planos-addon-icon" aria-hidden="true"><Bot size={20} strokeWidth={1.8} /></span>
                <h2 className="section-title planos-addon-title">
                  Elisson.IA dentro do Studio Pay, contratado conforme o seu plano.
                </h2>
                <p className="section-sub planos-addon-sub">
                  O Elisson.IA terá uma aba própria dentro do Studio Pay. No Starter, ele pode ser contratado à
                  parte. No Pro, você ganha um período de acesso. No Pro+, entram condições especiais para
                  operações maiores.
                </p>

                <div className="planos-addon-summary">
                  {addonSummary.map(({ plan, note }) => (
                    <div key={plan} className="planos-addon-summary-row">
                      <span className="planos-addon-summary-plan">{plan}</span>
                      <span className="planos-addon-summary-note">{note}</span>
                    </div>
                  ))}
                </div>

                <p className="planos-addon-disclaimer">
                  Elisson.IA é vendido separadamente. Benefícios podem variar conforme o plano Studio Pay.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3 — Comparação por módulo */}
        <section className="planos-compare module-section">
          <div className="container">
            <Reveal>
              <div className="section-header-center">
                <span className="section-label">Comparação por módulo</span>
                <h2 className="section-title">O que cada plano libera no ecossistema.</h2>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <CompareTable rows={moduleComparison} firstColLabel="Módulo" />
            </Reveal>

            <Reveal delay={140}>
              <p className="planos-compare-note">
                Quanto mais o Studio Pay participa da sua rotina, mais o seu estúdio economiza, organiza e cresce.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </PublicSiteShell>
  )
}
