import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

const modules = [
  {
    id: 'conta-digital',
    name: 'Conta Digital',
    role: 'Receber e controlar',
    text: 'Veja Pix, cobranças, entradas, saídas e quanto sobrou no mês.',
    to: '/studio-core',
    label: 'Ver Conta Digital',
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
  },
  {
    name: 'Elison IA',
    role: 'Atender no automático',
    text: 'Confirma horários, envia lembretes e acompanha clientes pelo WhatsApp.',
    to: '/elison-ia',
    label: 'Ver Elison IA',
  },
  {
    name: 'Studio Shop',
    role: 'Comprar melhor',
    text: 'Acesse produtos, kits e condições especiais para reduzir custos do estúdio.',
    to: '/studio-shop',
    label: 'Ver Studio Shop',
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

const flowSteps = ['Receber', 'Organizar', 'Atender', 'Comprar', 'Crescer']

export default function StudioEcosystemPreview() {
  return (
    <section className="ecosystem-section" id="ecossistema">
      <div className="container">
        <Reveal>
          <div className="section-header-center ecosystem-header">
            <span className="section-label">Ecossistema</span>
            <h2 className="section-title">
              Uma operação inteira para o seu estúdio.
            </h2>
            <p className="section-sub">
              Do financeiro ao crescimento, cada módulo do Studio Pay cuida de uma parte da rotina.
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

        <div className="ecosystem-grid">
          {modules.map((mod, i) => (
            <Reveal key={mod.name} delay={120 + i * 40}>
              <div className="ecosystem-card" id={mod.id}>
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

        <Reveal delay={380}>
          <p className="ecosystem-footer-note">
            Comece por onde mais pesa hoje. O resto se conecta.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
