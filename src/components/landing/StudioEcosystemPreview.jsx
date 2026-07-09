import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ChevronDown,
  CreditCard, ReceiptText, CalendarDays, Bot, ShoppingBag, GraduationCap, Megaphone, PieChart,
} from 'lucide-react'
import Reveal from './Reveal'

// Ordem segue a narrativa da landing: Studio Shop, Elisson.IA, Agenda,
// Conta Digital, Cobranças, Cursos, Tráfego, Relatórios — vale tanto
// para o desktop (grid mostra os 8 nessa ordem) quanto para o mobile.
// "primary: true" marca os 4 primeiros módulos, mostrados por padrão
// no mobile (os outros 4 ficam atrás do botão "Ver mais recursos");
// no desktop todos os 8 continuam sempre visíveis. Como esses 4 já são
// os primeiros do array, a ordem visual no mobile sai correta sem
// precisar de nenhum CSS "order" — só display:none nos não-primary.
const modules = [
  {
    name: 'Studio Shop',
    role: 'Compre com inteligência',
    text: 'Com Studio Pro você garante acesso a alguns dos melhores preços do Brasil!',
    to: '/studio-shop',
    label: 'Ver Studio Shop',
    Icon: ShoppingBag,
    primary: true,
  },
  {
    name: 'Elisson.IA',
    role: 'Atenda mesmo enquanto tatua',
    text: 'Tenha um assistente conectado à sua plataforma, controlando atendimentos, agenda e financeiro.',
    to: '/elison-ia',
    label: 'Ver Elisson.IA',
    Icon: Bot,
    primary: true,
  },
  {
    name: 'Agenda',
    role: 'Agenda sempre organizada',
    text: 'Permita que seus clientes agendem horários online e mantenha total controle sobre sua rotina e compromissos.',
    to: '/studio-agenda',
    label: 'Ver Agenda',
    Icon: CalendarDays,
    primary: true,
  },
  {
    id: 'conta-digital',
    name: 'Conta Digital',
    role: 'Receba sem complicação',
    text: 'Receba com PIX, boleto, cartão e outros meios de pagamento. Controle entradas, saídas e acompanhe seu financeiro em um só lugar.',
    to: '/studio-core',
    label: 'Ver Conta Digital',
    Icon: CreditCard,
    primary: true,
  },
  {
    name: 'Cobranças',
    role: 'Cobranças no piloto automático',
    text: 'Crie cobranças automáticas pelo WhatsApp e deixe o Studio Pay lembrar seus clientes por você.',
    to: '/studio-core',
    label: 'Ver Cobranças',
    Icon: ReceiptText,
  },
  {
    id: 'cursos',
    name: 'Cursos',
    role: 'Aprenda com quem vive o mercado',
    text: 'Tenha acesso a conteúdos exclusivos sobre técnica, vendas, gestão e posicionamento para acelerar o crescimento do seu estúdio.',
    to: '/studio-learn',
    label: 'Ver Cursos',
    Icon: GraduationCap,
  },
  {
    id: 'trafego',
    name: 'Tráfego',
    role: 'Mais clientes, com menos custo',
    text: 'Studio Pay subsidia até 50% dos custos com gestão de tráfego durante 3 meses, dentro da plataforma.',
    to: '/studio-ads',
    label: 'Ver Tráfego',
    Icon: Megaphone,
  },
  {
    name: 'Relatórios',
    role: 'Decidir com clareza',
    text: 'Acompanhe números importantes da operação e entenda melhor o crescimento do estúdio.',
    to: '/studio-core',
    label: 'Ver Relatórios',
    Icon: PieChart,
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
            <Reveal key={mod.name} delay={120 + i * 40}>
              <div className={`ecosystem-card${mod.primary ? ' ecosystem-card-primary' : ''}`} id={mod.id}>
                <span className="ecosystem-card-icon" aria-hidden="true">
                  <mod.Icon size={22} strokeWidth={1.8} />
                </span>
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
            Comece por onde mais pesa hoje. <span className="landing-accent">O resto se conecta.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
