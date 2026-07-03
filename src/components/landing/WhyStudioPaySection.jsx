import { CalendarCheck, BellOff, Gauge } from 'lucide-react'
import Reveal from './Reveal'

const positioningCards = [
  {
    Icon: CalendarCheck,
    title: 'Feito para tatuadores',
    text: 'Pensado para quem agenda, atende, cobra, compra material e ainda precisa cuidar do crescimento do estúdio.',
  },
  {
    Icon: BellOff,
    title: 'Menos improviso',
    text: 'Chega de depender só de conversa perdida, anotação solta e planilha esquecida.',
  },
  {
    Icon: Gauge,
    title: 'Mais controle',
    text: 'Você acompanha clientes, cobranças, agenda e financeiro em uma rotina mais clara.',
  },
]

export default function WhyStudioPaySection() {
  return (
    <section className="why-section">
      <div className="container">
        <Reveal>
          <div className="section-header-center why-header">
            <span className="section-label">Por que o Studio Pay existe</span>
            <h2 className="section-title">
              Criado para a rotina real do <span className="landing-accent">tatuador.</span>
            </h2>
            <p className="section-sub">
              O Studio Pay nasceu para ajudar tatuadores a tratarem o estúdio como um negócio de verdade: com agenda organizada, cobranças no lugar, clientes acompanhados e clareza sobre o dinheiro que entra e sai.
            </p>
          </div>
        </Reveal>

        <div className="why-grid">
          {positioningCards.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="why-card">
                <span className="why-card-icon" aria-hidden="true">
                  <Icon size={17} strokeWidth={1.8} />
                </span>
                <h3 className="why-card-title">{title}</h3>
                <p className="why-card-text">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
