import ModulePageLayout from '@/components/landing/ModulePageLayout'
import Reveal from '@/components/landing/Reveal'
import { modulePages } from '@/data/publicModules'
import { Check } from 'lucide-react'

// ── Seção 1 — Hero Studio Ads ─────────────────────────────────
// Hero centralizada e enxuta: headline + subheadline + 1 CTA + bloco
// de identificação da agência parceira (Digital Mix). Sem painel
// lateral, sem cards explicativos — essas informações vivem nas
// seções seguintes da página.

function AdsHero() {
  return (
    <section className="ads-hero">
      <div className="ads-hero-glow" />
      <div className="ads-hero-glow-side ads-hero-glow-left" aria-hidden="true" />
      <div className="ads-hero-glow-side ads-hero-glow-right" aria-hidden="true" />
      <div className="container">
        <Reveal className="ads-hero-inner">
          <h1 className="ads-hero-title">
            Agenda vazia<br />
            <span className="landing-accent">custa caro.</span>
          </h1>
          <p className="ads-hero-sub">
            Atraia mais clientes para o seu estúdio com condições exclusivas nos planos de{' '}
            <strong>gestão de tráfego pago</strong>.
          </p>

          <div className="ads-hero-actions">
            <a href="#trafego-planos" className="btn btn-primary btn-lg">
              Consultar planos
            </a>
          </div>

          <div className="ads-hero-partner">
            <p className="ads-hero-partner-label">
              <span className="ads-hero-partner-line" aria-hidden="true" />
              AGÊNCIA PARCEIRA
              <span className="ads-hero-partner-line" aria-hidden="true" />
            </p>
            <p className="ads-hero-partner-brand">DIGITAL<span className="ads-hero-partner-brand-accent">MIX</span></p>
            <p className="ads-hero-partner-note">
              Gestão realizada pela Digital Mix. Serviço contratado separadamente.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção 2 — O que é tráfego pago? ─────────────────────────────
// Bloco institucional e explicativo, centralizado, sem cards, sem
// ícones, sem botão — só texto e glow sutil, seguindo a referência.

function AdsExplainSection() {
  return (
    <section className="ads-explain-section">
      <div className="ads-explain-glow ads-explain-glow-left" aria-hidden="true" />
      <div className="ads-explain-glow ads-explain-glow-right" aria-hidden="true" />
      <div className="container">
        <Reveal className="ads-explain-inner">
          <p className="ads-explain-label">
            <span className="ads-explain-label-line" aria-hidden="true" />
            ENTENDA O SERVIÇO
            <span className="ads-explain-label-line" aria-hidden="true" />
          </p>
          <h2 className="ads-explain-title">O que é tráfego pago?</h2>
          <p className="ads-explain-lead">
            É a estratégia de anunciar seu estúdio em plataformas como Instagram, Facebook e Google para alcançar
            pessoas com interesse em tatuagem.
          </p>
          <p className="ads-explain-body">
            Na prática, são criadas campanhas segmentadas por região, perfil de público e objetivo. Com um
            investimento em anúncios, seu estúdio passa a aparecer para as pessoas certas, enquanto a gestão
            acompanha métricas como alcance, cliques e contatos gerados para otimizar os resultados.
          </p>
          <p className="ads-explain-footnote">
            Mais visibilidade, mais contatos qualificados e mais chances de preencher a agenda.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção 3 — Quem é a Digital Mix? ─────────────────────────────
// Bloco institucional e textual, centralizado, sem cards, sem preços,
// sem botões.

function AdsPartnerSection() {
  return (
    <section className="ads-partner-section">
      <div className="ads-partner-glow ads-partner-glow--left" aria-hidden="true" />
      <div className="ads-partner-glow ads-partner-glow--right" aria-hidden="true" />
      <div className="container">
        <Reveal className="ads-partner-inner">
          <h2 className="ads-partner-title">Quem é a Digital Mix?</h2>
          <p className="ads-partner-lead">
            A Digital Mix é a agência parceira responsável por planejar, gerenciar e otimizar as campanhas de
            tráfego pago dos estúdios conectados ao Studio Pay.
          </p>
          <p className="ads-partner-body">
            Da configuração inicial ao acompanhamento dos resultados, sua equipe cuida da operação no Google e
            nas redes sociais para que cada campanha alcance as pessoas certas.
          </p>
          <p className="ads-partner-closing">
            Estratégia profissional para transformar investimento em novas oportunidades.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção 4 — Planos de gestão de tráfego ───────────────────────
// Cards institucionais (sem preço, sem botão) — recebe o id âncora
// usado pelo CTA "Consultar planos" da Seção 1.

const plans = [
  {
    name: 'Básico',
    tag: 'COMECE COM CONFIANÇA',
    recommended: false,
    benefits: [
      'Configuração inicial de campanhas',
      'Acesso à árvore de links (Google) OU variações criativas (Meta)',
      'Monitoramento e relatórios mensais',
      'Suporte técnico básico',
    ],
    footnote: [
      'Com teto de investimento em mídia',
      'Ideal para começar com controle',
    ],
  },
  {
    name: 'Profissional',
    tag: 'ESCALE SEU NEGÓCIO',
    recommended: true,
    benefits: [
      'Configuração Avançada de Campanhas',
      'Acesso à Árvore de Links ou Criativos',
      'Otimizações Semanais',
      'Relatórios Detalhados de Performance',
      'Suporte Técnico Prioritário',
    ],
    footnote: [
      'Com maior teto de investimento em mídia',
      'Para escalar com mais volume',
    ],
  },
  {
    name: 'Enterprise',
    tag: 'SOLUÇÃO COMPLETA',
    recommended: false,
    benefits: [
      'Estratégia Personalizada',
      'Gestão Total',
      'Criação de Conteúdo',
      'Relatórios Executivos',
      'Suporte Dedicado',
      'Investimento Livre',
    ],
    footnote: [
      'Investimento livre em mídia',
      'Sem teto máximo para escalar',
    ],
  },
]

function AdsPlansSection() {
  return (
    <section className="ads-plans-section module-section" id="trafego-planos">
      <div className="ads-plans-glow ads-plans-glow--left" aria-hidden="true" />
      <div className="ads-plans-glow ads-plans-glow--right" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <div className="ads-plans-header">
            <h2 className="ads-plans-title">
              Escolha o <span className="landing-accent">plano ideal</span>
            </h2>
            <p className="ads-plans-sub">
              Soluções de Marketing Digital exclusivas para parceiros do ecossistema Studio Pay.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="ads-plans-grid">
            {plans.map((p) => (
              <div key={p.name} className={`ads-plan-card${p.recommended ? ' recommended' : ''}`}>
                {p.recommended && <span className="ads-plan-badge">RECOMENDADO</span>}
                <h3 className="ads-plan-name">Plano {p.name}</h3>
                <p className="ads-plan-tag">{p.tag}</p>
                <span className="ads-plan-divider" aria-hidden="true" />

                <ul className="ads-plan-benefits">
                  {p.benefits.map((b) => (
                    <li key={b}>
                      <Check size={15} strokeWidth={2.2} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="ads-plan-footnote">
                  <p>{p.footnote[0]}</p>
                  <p>{p.footnote[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="ads-plans-closing">
            Todo o processo é integrado ao ecossistema <span className="text-pink">Studio Pay</span>, garantindo
            uma experiência fluida e centralizada para o parceiro.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção 5 — Valores dos planos ────────────────────────────────
// Cards comerciais com preço (valores exclusivos para assinantes
// Studio Pro), sem benefícios e sem botões — classes exclusivas.

const pricingPlans = [
  {
    name: 'Básico',
    price: 'R$ 350/mês',
    footnote: 'Taxa de gestão mensal',
  },
  {
    name: 'Profissional',
    price: 'R$ 590/mês',
    footnote: 'Taxa de gestão mensal',
  },
  {
    name: 'Enterprise',
    price: null,
    footnote: 'Taxa de gestão sob análise',
  },
]

function AdsPricingSection() {
  return (
    <section className="ads-pricing-section module-section" id="valores-trafego">
      <div className="ads-pricing-glow ads-pricing-glow--left" aria-hidden="true" />
      <div className="ads-pricing-glow ads-pricing-glow--right" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <div className="ads-pricing-header">
            <p className="ads-pricing-label">
              <span className="ads-pricing-label-line" aria-hidden="true" />
              EM PARCERIA COM A DIGITAL MIX
              <span className="ads-pricing-label-line" aria-hidden="true" />
            </p>
            <h2 className="ads-pricing-title">
              Planos de gestão com condição exclusiva para assinantes Studio Pay.
            </h2>
            <p className="ads-pricing-sub">
              Escolha a estrutura ideal para começar sua gestão de tráfego.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="ads-pricing-grid">
            {pricingPlans.map((p) => (
              <div key={p.name} className="ads-pricing-card">
                <h3 className="ads-pricing-name">Plano {p.name}</h3>
                <p className="ads-pricing-tag">Valor para assinantes do plano Studio Pro</p>
                <span className="ads-pricing-divider" aria-hidden="true" />

                {p.price ? (
                  <div className="ads-pricing-value">
                    <p className="ads-pricing-from">A partir de</p>
                    <p className="ads-pricing-price">
                      {p.price.replace('/mês', '')}<span className="ads-pricing-period">/mês</span>
                    </p>
                    <p className="ads-pricing-plan-note">Com Studio Pro</p>
                  </div>
                ) : (
                  <div className="ads-pricing-value">
                    <p className="ads-pricing-consult">Sob consulta</p>
                  </div>
                )}

                <div className="ads-pricing-footnote">
                  <span className="ads-pricing-bullet" aria-hidden="true" />
                  <p>{p.footnote}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="ads-pricing-closing">
            Valores exclusivos para assinantes Studio Pro.<br />
            Investimento em mídia é contratado separadamente.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção 6 — CTA final ──────────────────────────────────────────
// Fechamento comercial limpo e centralizado: headline + subheadline +
// frase de reforço + 1 botão. Sem cards, ícones, listas ou pills.

function AdsFinalSection() {
  return (
    <section className="ads-final-section module-section">
      <div className="ads-final-glow ads-final-glow--left" aria-hidden="true" />
      <div className="ads-final-glow ads-final-glow--right" aria-hidden="true" />
      <div className="container">
        <Reveal className="ads-final-inner">
          <h2 className="ads-final-title">Escolha o plano ideal para o seu estúdio.</h2>
          <p className="ads-final-sub">
            Decida qual solução de gestão de tráfego faz mais sentido para o momento do seu estúdio e avance com
            estratégia
          </p>
          <p className="ads-final-reinforcement">
            Estratégia, visibilidade e mais clientes para seu estúdio!
          </p>

          <div className="ads-final-actions">
            <a href="#valores-trafego" className="btn btn-primary btn-lg">
              Acessar planos
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function StudioAdsPage() {
  return (
    <ModulePageLayout
      page={modulePages.ads}
      heroContent={<AdsHero />}
      sectionTwoContent={<AdsExplainSection />}
      sectionThreeContent={<AdsPartnerSection />}
      solutionContent={<AdsPlansSection />}
      practicalContent={<AdsPricingSection />}
      benefitsContent={<></>}
      finalCtaContent={<AdsFinalSection />}
    />
  )
}
