import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import Reveal from './Reveal'

const plans = [
  {
    name: 'Starter',
    tagline: 'Pra sair do improviso.',
    currency: 'R$',
    amount: '37,90',
    period: '/mês',
    consult: false,
    description: 'Ideal para tatuadores que querem começar a organizar agenda, cobranças e financeiro.',
    tag: null,
    highlighted: false,
    premium: false,
    ctaLabel: 'Começar com Starter',
    ctaTo: '/cadastro',
    items: [
      'Conta digital e Pix',
      'Cobranças manuais',
      'Agenda básica',
      'Relatórios básicos',
      'Elison IA limitado',
    ],
  },
  {
    name: 'Pro',
    tagline: 'Pra crescer com automação.',
    currency: 'R$',
    amount: '97,90',
    period: '/mês',
    consult: false,
    description: 'Para quem quer automatizar cobranças, atendimento e acompanhar melhor a rotina do estúdio.',
    tag: 'Mais escolhido',
    highlighted: true,
    premium: false,
    ctaLabel: 'Começar com Pro',
    ctaTo: '/cadastro',
    items: [
      'Tudo do Starter',
      'Cobranças automáticas',
      'Elison IA completo',
      'Agenda avançada',
      'Relatórios avançados',
      'Benefícios no Studio Shop',
    ],
  },
  {
    name: 'Pro+',
    tagline: 'Para operações maiores.',
    currency: null,
    amount: null,
    period: null,
    consult: true,
    description: 'Para estúdios que precisam de uma configuração mais completa, suporte próximo e soluções ajustadas à operação.',
    tag: null,
    highlighted: false,
    premium: true,
    ctaLabel: 'Falar com especialista',
    ctaTo: '/cadastro',
    items: [
      'Tudo do Pro',
      'Configuração assistida',
      'Prioridade no atendimento',
      'Condições comerciais personalizadas',
      'Recursos avançados sob análise',
    ],
  },
]

export default function PlansSection({ compact = false }) {
  return (
    <section className={`plans-section${compact ? ' plans-section-compact' : ''}`} id="planos">
      <div className="container">
        <Reveal>
          <div className="section-header-center">
            <span className="section-label">Planos</span>
            <h2 className="section-title">
              Comece simples.<br />
              Cresça com <span className="landing-accent">automação.</span>
            </h2>
            <p className="section-sub">
              Do básico ao automatizado, escolha o plano que combina com a fase do seu estúdio.
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
                  {p.consult ? (
                    <span className="plan-price-consult">Sob consulta</span>
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
                    p.highlighted
                      ? ' btn-primary'
                      : p.premium
                      ? ' btn-outline-premium'
                      : ' btn-outline'
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
  )
}
