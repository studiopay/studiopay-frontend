import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ModulePageLayout from '@/components/landing/ModulePageLayout'
import Reveal from '@/components/landing/Reveal'
import { modulePages } from '@/data/publicModules'
import {
  Search, Target, Image as ImageIcon, BarChart3, Users, MousePointerClick,
  CalendarCheck2, Wallet, Percent, Check, ArrowRight, Sparkles, KeyRound,
  Settings2, LineChart, ClipboardCheck, Calendar, MessageCircle, Banknote,
  FileBarChart, Handshake,
} from 'lucide-react'

// ── Seção 1 — Hero Studio Ads ─────────────────────────────────

const heroCards = [
  { Icon: Search, title: 'Google Ads', text: 'Campanhas de busca para quem já está procurando um tatuador.' },
  { Icon: Target, title: 'Meta Ads', text: 'Anúncios no Instagram e Facebook para gerar novos contatos.' },
  { Icon: ImageIcon, title: 'Criativos', text: 'Peças e artes pensadas para o universo da tatuagem.' },
  { Icon: BarChart3, title: 'Relatórios', text: 'Acompanhamento de performance das campanhas ativas.' },
]

const panelStats = [
  { Icon: Users, label: 'Leads recebidos', value: '38' },
  { Icon: MousePointerClick, label: 'Custo por contato', value: 'R$ 12,40' },
  { Icon: CalendarCheck2, label: 'Agendamentos gerados', value: '9' },
  { Icon: Wallet, label: 'Investimento em mídia', value: 'R$ 1.000,00' },
  { Icon: Percent, label: 'Taxa de gestão Digital Mix', value: 'R$ 350,00' },
]

function CampaignPanel() {
  return (
    <div className="ads-panel" aria-hidden="true">
      <div className="ads-panel-head">
        <span className="ads-panel-status">
          <span className="ads-panel-dot" /> Campanha ativa
        </span>
        <span className="ads-panel-managed">Gestão por Digital Mix</span>
      </div>
      <div className="ads-panel-stats">
        {panelStats.map(({ Icon, label, value }) => (
          <div key={label} className="ads-panel-stat">
            <span className="ads-panel-stat-icon"><Icon size={16} strokeWidth={1.8} /></span>
            <div>
              <p className="ads-panel-stat-label">{label}</p>
              <p className="ads-panel-stat-value">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdsHero() {
  return (
    <section className="ads-hero">
      <div className="ads-hero-glow" />
      <div className="container">
        <div className="ads-hero-inner">
          <Reveal className="ads-hero-copy-area">
            <div className="ads-hero-copy">
              <span className="section-label">Studio Ads</span>
              <span className="ads-hero-badge-sub">Marketing com Digital Mix</span>
              <h1 className="ads-hero-title">
                Mais <span className="landing-accent">clientes para sua agenda</span><br />
                com tráfego pago profissional.
              </h1>
              <p className="ads-hero-sub">
                O Studio Pay conecta seu estúdio à Digital Mix, uma operação parceira especializada em campanhas
                para atrair clientes, divulgar horários disponíveis e acompanhar resultados com mais clareza.
              </p>

              <div className="ads-hero-actions">
                <Link to="/cadastro" className="btn btn-primary btn-lg">
                  Quero atrair mais clientes
                </Link>
                <a href="#trafego-planos" className="btn btn-ghost btn-lg">
                  Ver planos de tráfego
                </a>
              </div>

              <p className="ads-hero-note">
                A gestão das campanhas é realizada pela Digital Mix. O Studio Pay conecta o tatuador à solução,
                organiza a jornada e facilita o acesso às condições para assinantes.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="ads-hero-visual-area">
            <CampaignPanel />
          </Reveal>

          <Reveal delay={160} className="ads-hero-cards-area">
            <div className="core-solution-grid ads-hero-cards">
              {heroCards.map(({ Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 50}>
                  <div className="core-solution-card">
                    <span className="core-solution-icon"><Icon size={20} strokeWidth={1.8} /></span>
                    <h3 className="core-solution-title">{title}</h3>
                    <p className="core-solution-text">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── Seção 2 — Como funciona ────────────────────────────────────

const howSteps = [
  { Icon: ClipboardCheck, title: 'Escolha o plano', text: 'Compare Básico, Profissional e Enterprise.' },
  { Icon: KeyRound, title: 'Configure os acessos', text: 'Google Ads, Meta Business, páginas e dados do estúdio.' },
  { Icon: Settings2, title: 'Digital Mix gerencia', text: 'A agência configura, acompanha e otimiza as campanhas.' },
  { Icon: LineChart, title: 'Você acompanha', text: 'Relatórios mostram investimento, contatos, campanhas e evolução.' },
]

function AdsHowSection() {
  return (
    <section className="ads-how module-section">
      <div className="ads-how-glow" />
      <div className="container">
        <Reveal>
          <div className="section-header-center">
            <span className="section-label">Como funciona</span>
            <h2 className="section-title ads-how-title">
              Você escolhe o plano. <span className="landing-accent">A Digital Mix cuida das campanhas.</span>
            </h2>
            <p className="section-sub ads-how-sub">
              Dentro do Studio Pay, o tatuador entende as opções de tráfego, escolhe o melhor plano e segue para a
              contratação com a equipe parceira.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="ads-how-steps">
            {howSteps.map(({ Icon, title, text }, i) => (
              <div key={title} className="ads-how-step">
                <span className="ads-how-step-marker">{i + 1}</span>
                <span className="ads-how-step-icon"><Icon size={18} strokeWidth={1.8} /></span>
                <div className="ads-how-step-body">
                  <h3 className="ads-how-step-title">{title}</h3>
                  <p className="ads-how-step-text">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="core-pill core-pill-icon ads-how-pill">
            <span className="core-pill-icon-mark" aria-hidden="true">
              <Sparkles size={16} strokeWidth={2} />
            </span>
            <p>
              Você tatua. <span className="text-pink">A Digital Mix atrai.</span> O Studio Pay conecta.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção 3 — Planos de tráfego (Digital Mix) ──────────────────

const trafficPlans = [
  {
    name: 'Básico',
    tag: 'Comece com confiança',
    highlighted: false,
    premium: false,
    description: 'Para estúdios iniciando em publicidade digital com investimento controlado.',
    items: ['Google ou Meta', 'Relatório mensal', 'Suporte básico', 'Até R$ 1.000/mês em mídia'],
    priceRows: [
      { label: '1 mídia', value: 'R$ 350/mês' },
      { label: 'Combo', value: 'R$ 450/mês' },
    ],
    note: '50% off na 1ª mensalidade',
  },
  {
    name: 'Profissional',
    tag: 'Recomendado',
    highlighted: true,
    premium: false,
    description: 'Para estúdios que querem escalar campanhas com otimizações semanais e relatórios mais detalhados.',
    items: ['Google + Meta opcional', 'Otimizações semanais', 'Relatórios detalhados', 'Suporte prioritário', 'Até R$ 5.000/mês em mídia'],
    priceRows: [
      { label: '1 mídia', value: 'R$ 590/mês' },
      { label: 'Combo', value: 'R$ 690/mês' },
    ],
    note: null,
  },
  {
    name: 'Enterprise',
    tag: 'Sob consulta',
    highlighted: false,
    premium: true,
    description: 'Para estúdios maiores ou redes que precisam de estratégia personalizada e acompanhamento dedicado.',
    items: ['Estratégia 360º', 'Gestão completa', 'Relatórios executivos', 'Suporte dedicado', 'Investimento livre'],
    priceRows: null,
    note: 'Contrato mínimo de 12 meses',
  },
]

function AdsPlansSection() {
  return (
    <section className="ads-plans module-section" id="trafego-planos">
      <div className="container">
        <Reveal>
          <div className="section-header-center">
            <span className="section-label">Planos Digital Mix</span>
            <h2 className="section-title">
              Escolha o nível de tráfego para <span className="landing-accent">o momento do seu estúdio.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="plans-grid ads-plans-grid">
            {trafficPlans.map((p) => (
              <div
                key={p.name}
                className={`plan-card${p.highlighted ? ' highlighted' : ''}${p.premium ? ' premium' : ''}`}
              >
                {p.tag && <div className="plan-tag">{p.tag}</div>}

                <div className="plan-card-head">
                  <h3 className="plan-name">{p.name}</h3>
                </div>

                {p.priceRows ? (
                  <div className="ads-plan-price-rows">
                    {p.priceRows.map((row, i) => (
                      <Fragment key={row.label}>
                        {i > 0 && <span className="ads-plan-price-or">ou</span>}
                        <div className="ads-plan-price-row">
                          <span className="ads-plan-price-label">{row.label}</span>
                          <span className="ads-plan-price-value">{row.value}</span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                ) : (
                  <div className="plan-price">
                    <span className="plan-price-consult">Sob consulta</span>
                  </div>
                )}

                <p className="plan-description">{p.description}</p>

                <ul className="plan-features">
                  {p.items.map((item) => (
                    <li key={item}>
                      <Check
                        size={14}
                        color={p.highlighted ? 'var(--pink)' : p.premium ? 'rgba(255,46,209,0.65)' : 'var(--green)'}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {p.note && <p className="ads-plan-note">{p.note}</p>}

                <Link
                  to="/cadastro"
                  className={`btn btn-block btn-lg${
                    p.highlighted ? ' btn-primary' : p.premium ? ' btn-outline-premium' : ' btn-outline'
                  }`}
                >
                  Falar com a Digital Mix
                </Link>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="ads-plans-footer-note">
            Valores referentes à taxa de gestão da Digital Mix. O investimento em mídia é separado e pago às
            plataformas, como Google e Meta.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção 4 — Investimento vs taxa de gestão ───────────────────

const investExamples = [
  { plan: 'Básico', management: 'R$ 350 gestão', media: 'até R$ 1.000 mídia', total: 'até R$ 1.350/mês' },
  { plan: 'Profissional Combo', management: 'R$ 690 gestão', media: 'até R$ 5.000 mídia', total: 'até R$ 5.690/mês' },
]

function AdsInvestmentSection() {
  return (
    <section className="ads-invest module-section">
      <div className="ads-invest-glow" />
      <div className="container">
        <Reveal>
          <div className="section-header-center">
            <span className="section-label">Transparência</span>
            <h2 className="section-title ads-invest-title">
              Entenda a diferença entre <span className="landing-accent">taxa de gestão</span> e investimento em
              mídia.
            </h2>
            <p className="section-sub ads-invest-sub">
              A taxa de gestão remunera o trabalho estratégico da Digital Mix. O investimento em mídia é o valor
              usado nas plataformas para exibir os anúncios.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="ads-invest-formula">
            <div className="ads-invest-formula-item">
              <span className="ads-invest-formula-icon"><Percent size={18} strokeWidth={1.8} /></span>
              <p>Taxa de gestão</p>
            </div>
            <span className="ads-invest-formula-op">+</span>
            <div className="ads-invest-formula-item">
              <span className="ads-invest-formula-icon"><Wallet size={18} strokeWidth={1.8} /></span>
              <p>Investimento em mídia</p>
            </div>
            <span className="ads-invest-formula-op">=</span>
            <div className="ads-invest-formula-item ads-invest-formula-total">
              <span className="ads-invest-formula-icon"><Banknote size={18} strokeWidth={1.8} /></span>
              <p>Total mensal estimado</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="ads-invest-examples">
            {investExamples.map((ex) => (
              <div key={ex.plan} className="ads-invest-example">
                <p className="ads-invest-example-plan">{ex.plan}</p>
                <p className="ads-invest-example-calc">
                  {ex.management} + {ex.media} = <span className="text-pink">{ex.total}</span>
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção 5 — Integração futura com o ecossistema ──────────────

const ecosystemCards = [
  { Icon: Calendar, title: 'Marketing + Agenda', text: 'Campanhas para ajudar a preencher horários livres.' },
  { Icon: MessageCircle, title: 'Marketing + Elisson.IA', text: 'Leads das campanhas podem cair no atendimento automático.' },
  { Icon: Wallet, title: 'Marketing + Financeiro', text: 'Taxa de gestão, investimento e retorno mais claros.' },
  { Icon: FileBarChart, title: 'Marketing + Relatórios', text: 'Custo por lead, custo por agendamento e evolução das campanhas.' },
]

function AdsEcosystemSection() {
  return (
    <section className="ads-ecosystem module-section">
      <div className="container">
        <Reveal>
          <div className="section-header-center">
            <span className="section-label">Ecossistema</span>
            <h2 className="section-title ads-ecosystem-title">
              Hoje a Digital Mix executa. <span className="landing-accent">O Studio Pay conecta</span> a jornada.
            </h2>
            <p className="section-sub ads-ecosystem-sub">
              A parceria começa com redirecionamento para contratação e pode evoluir para relatórios, leads,
              agenda e financeiro conectados dentro do ecossistema.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="core-solution-grid ads-ecosystem-grid">
            {ecosystemCards.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 50}>
                <div className="core-solution-card ads-ecosystem-card">
                  <span className="core-solution-icon"><Icon size={20} strokeWidth={1.8} /></span>
                  <h3 className="core-solution-title">{title}</h3>
                  <p className="core-solution-text">{text}</p>
                  <span className="ads-ecosystem-badge">Em evolução</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção final — CTA de impacto ────────────────────────────────

function AdsFinalSection() {
  return (
    <section className="ads-final module-section">
      <div className="ads-final-glow" />
      <div className="container">
        <Reveal>
          <div className="ads-final-panel">
            <span className="section-label">Studio Pay x Digital Mix</span>
            <h2 className="section-title ads-final-title">
              Você cria. <span className="landing-accent">A Digital Mix atrai.</span> O Studio Pay conecta.
            </h2>
            <p className="section-sub ads-final-sub">
              Leve seu estúdio para uma operação de marketing mais profissional, com planos pensados para quem vive
              da tatuagem.
            </p>

            <div className="ads-final-actions">
              <Link to="/cadastro" className="btn btn-primary btn-lg">
                Quero falar com a Digital Mix <ArrowRight size={18} />
              </Link>
              <Link to="/planos" className="btn btn-ghost btn-lg">Ver planos</Link>
            </div>

            <div className="core-pill core-pill-icon ads-final-pill">
              <span className="core-pill-icon-mark" aria-hidden="true">
                <Handshake size={16} strokeWidth={2} />
              </span>
              <p>
                Resultados dependem de investimento, região, oferta e execução —{' '}
                <span className="text-pink">a Digital Mix acompanha cada campanha</span> de perto.
              </p>
            </div>
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
      sectionTwoContent={<AdsHowSection />}
      sectionThreeContent={<AdsPlansSection />}
      solutionContent={<AdsInvestmentSection />}
      practicalContent={<AdsEcosystemSection />}
      benefitsContent={<></>}
      finalCtaContent={<AdsFinalSection />}
    />
  )
}
