import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

const modules = [
  {
    name: 'Conta Digital',
    role: 'Receber e controlar',
    text: 'Veja Pix, cobranças, entradas, saídas e quanto sobrou no mês.',
    to: '/studio-core',
    label: 'Ver Conta Digital',
  },
  {
    name: 'Agenda',
    role: 'Organizar horários',
    text: 'Confirmações, lembretes e atendimentos em uma rotina mais clara.',
    to: '/studio-agenda',
    label: 'Ver Agenda',
  },
  {
    name: 'Cursos',
    role: 'Evoluir como profissional',
    text: 'Conteúdos para melhorar técnica, venda, gestão e posicionamento.',
    to: '/studio-learn',
    label: 'Ver Cursos',
  },
  {
    name: 'Tráfego',
    role: 'Atrair mais clientes',
    text: 'Campanhas, criativos e relatórios para transformar agenda vazia em oportunidade.',
    to: '/studio-ads',
    label: 'Ver Tráfego',
  },
]

const flowSteps = ['Receber', 'Organizar', 'Atender', 'Crescer']

export default function StudioEcosystemPreview() {
  return (
    <section className="ecosystem-section">
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
            <Reveal key={mod.name} delay={120 + i * 60}>
              <div className="ecosystem-card">
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
