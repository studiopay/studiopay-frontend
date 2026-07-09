import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Reveal from './Reveal'

// "primary: true" marca os 4 módulos mostrados por padrão no mobile
// (Studio Shop, Elisson.IA, Agenda, Conta Digital) — no desktop todos
// os 8 continuam sempre visíveis, sem nenhuma alteração (ver CSS
// escopado em @media max-width:640px). Nenhum módulo foi removido.
// "mobileOrder" só reordena visualmente esses 4 cards no mobile (via
// CSS order, escopado no mesmo breakpoint) — a ordem no array/desktop
// não muda.
const modules = [
  {
    id: 'conta-digital',
    name: 'Conta Digital',
    role: 'Receber e controlar',
    text: 'Veja Pix, cobranças, entradas, saídas e quanto sobrou no mês.',
    to: '/studio-core',
    label: 'Ver Conta Digital',
    primary: true,
    mobileOrder: 4,
  },
  {
    name: 'Cobranças',
    role: 'Cobrar sem improviso',
    text: 'Crie cobranças, acompanhe pagamentos e reduza esquecimentos na rotina.',
    to: '/studio-core',
    label: 'Ver Cobranças',
  },
  {
    name: 'Agenda',
    role: 'Organizar horários',
    text: 'Controle compromissos, lembretes e atendimentos em uma rotina mais clara.',
    to: '/studio-agenda',
    label: 'Ver Agenda',
    primary: true,
    mobileOrder: 3,
  },
  {
    name: 'Elisson.IA',
    role: 'Atender no automático',
    text: 'Confirma horários, envia lembretes e acompanha clientes pelo WhatsApp.',
    to: '/elison-ia',
    label: 'Ver Elisson.IA',
    primary: true,
    mobileOrder: 2,
  },
  {
    name: 'Studio Shop',
    role: 'Comprar melhor',
    text: 'Acesse produtos, kits e condições especiais para reduzir custos do estúdio.',
    to: '/studio-shop',
    label: 'Ver Studio Shop',
    primary: true,
    mobileOrder: 1,
  },
  {
    id: 'cursos',
    name: 'Cursos',
    role: 'Evoluir como profissional',
    text: 'Conteúdos para melhorar técnica, venda, gestão e posicionamento.',
    to: '/studio-learn',
    label: 'Ver Cursos',
  },
  {
    id: 'trafego',
    name: 'Tráfego',
    role: 'Atrair mais clientes',
    text: 'Campanhas, criativos e relatórios para transformar agenda vazia em oportunidade.',
    to: '/studio-ads',
    label: 'Ver Tráfego',
  },
  {
    name: 'Relatórios',
    role: 'Decidir com clareza',
    text: 'Acompanhe números importantes da operação e entenda melhor o crescimento do estúdio.',
    to: '/studio-core',
    label: 'Ver Relatórios',
  },
]

const flowSteps = ['Captar', 'Atender', 'Agendar', 'Cobrar', 'Receber', 'Comprar', 'Evoluir']

export default function StudioEcosystemPreview() {
  // Só tem efeito no mobile (ver @media max-width:640px em landing.css) —
  // no desktop a grid sempre mostra os 8 módulos, sem depender deste estado.
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="ecosystem-section" id="ecossistema">
      <div className="container">
        <Reveal>
          <div className="section-header-center ecosystem-header">
            <span className="section-label">ECOSSISTEMA</span>
            <h2 className="section-title">
              <span className="ecosystem-title-line1">Toda a operação do seu estúdio</span><br className="ecosystem-title-break" />
              <span className="landing-accent">em um só lugar.</span>
            </h2>
            <p className="section-sub">
              Da captação de clientes ao pós-tatuagem, o Studio Pay conecta atendimento,{' '}
              <strong>agenda, pagamentos, compras, marketing e gestão</strong> para que você tenha mais
              controle e foque no que realmente importa: <strong>tatuar e crescer.</strong>
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="ecosystem-flow" aria-hidden="true">
            {flowSteps.map((step, i) => (
              <span key={step} className="ecosystem-flow-inner">
                <span className="ecosystem-flow-step">{step}</span>
                {i < flowSteps.length - 1 && (
                  <span className="ecosystem-flow-arrow">→</span>
                )}
              </span>
            ))}
          </div>
        </Reveal>

        <div className={`ecosystem-grid${expanded ? ' ecosystem-grid-expanded' : ''}`}>
          {modules.map((mod, i) => (
            <Reveal
              key={mod.name}
              delay={120 + i * 40}
              className={mod.mobileOrder ? `ecosystem-reveal-order-${mod.mobileOrder}` : undefined}
            >
              <div className={`ecosystem-card${mod.primary ? ' ecosystem-card-primary' : ''}`} id={mod.id}>
                <div className="ecosystem-card-head">
                  <p className="ecosystem-card-name">{mod.name}</p>
                  <p className="ecosystem-card-role">{mod.role}</p>
                </div>
                <p className="ecosystem-card-text">{mod.text}</p>
                <Link to={mod.to} className="ecosystem-card-link">
                  {mod.label} <ArrowRight size={12} strokeWidth={2.2} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Só aparece no mobile (display:none por padrão, mostrado só em
            @media max-width:640px) — no desktop os 8 módulos já ficam
            sempre visíveis na grid acima. */}
        <button
          type="button"
          className="ecosystem-more-btn"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? 'Ver menos' : 'Ver mais recursos'}
          <ChevronDown size={16} className={`ecosystem-more-btn-icon${expanded ? ' open' : ''}`} />
        </button>

        <Reveal delay={380}>
          <p className="ecosystem-footer-note">
            Comece por onde mais pesa hoje. O resto se conecta.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
