import { MessageSquareOff, BarChart3, UserCheck, Award, CalendarClock, Paintbrush } from 'lucide-react'
import Reveal from './Reveal'

const benefits = [
  { Icon: MessageSquareOff, title: 'Menos tempo no WhatsApp' },
  { Icon: BarChart3,        title: 'Mais clareza no financeiro' },
  { Icon: UserCheck,        title: 'Menos cliente esquecido' },
  { Icon: Award,            title: 'Mais profissionalismo' },
  { Icon: CalendarClock,    title: 'Mais previsibilidade no mês' },
  { Icon: Paintbrush,       title: 'Mais tempo pra tatuar' },
]

export default function BenefitsSection() {
  return (
    <section className="benefits-section" id="beneficios">
      <div className="container">
        <Reveal>
          <div className="section-header-center">
            <span className="section-label">Benefícios</span>
            <h2 className="section-title">
              Menos manual.<br />
              <span className="text-pink">Mais controle.</span>
            </h2>
            <p className="section-sub">
              O que toma tempo sai do improviso. O que importa fica visível.
            </p>
          </div>
        </Reveal>

        <div className="benefits-grid">
          {benefits.map(({ Icon, title }, i) => (
            <Reveal key={i} delay={i * 45}>
              <div className="benefit-item">
                <span className="benefit-item-icon">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <h3 className="benefit-item-title">{title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
