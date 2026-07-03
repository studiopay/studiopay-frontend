import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, CalendarDays, CalendarPlus, Clock3, BellRing } from 'lucide-react'
import Reveal from './Reveal'

const GIF_SRC = '/media/studiopay-agenda.gif'

const demoBullets = [
  { icon: CalendarDays, label: 'Visualize por dia, semana e mês' },
  { icon: CalendarPlus, label: 'Cadastre novos agendamentos' },
  { icon: Clock3, label: 'Acompanhe próximos atendimentos' },
  { icon: BellRing, label: 'Ative lembretes automáticos' },
]

export default function DemoGifSection() {
  const [gifFailed, setGifFailed] = useState(false)

  return (
    <section className="demo-gif-section" id="agenda">
      <div className="container">
        <div className="demo-gif-layout">
          <Reveal>
            <div className="demo-gif-copy">
              <span className="section-label">Agenda Studio Pay</span>
              <h2 className="section-title">
                Veja sua <span className="landing-accent">agenda</span> em ação.
              </h2>
              <p className="section-sub">
                Visualize compromissos por dia, semana e mês, acompanhe os próximos atendimentos e mantenha sua rotina organizada em um só lugar.
              </p>

              <ul className="demo-gif-bullets" aria-label="O que a agenda do Studio Pay faz por você">
                {demoBullets.map(({ icon: Icon, label }) => (
                  <li key={label}>
                    <span aria-hidden="true"><Icon size={15} strokeWidth={1.8} /></span>
                    {label}
                  </li>
                ))}
              </ul>

              <div className="demo-gif-actions">
                <Link to="/studio-agenda" className="btn btn-primary btn-lg">
                  Conhecer a agenda <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="demo-gif-media">
              <div className="demo-gif-frame">
                {gifFailed ? (
                  <div className="demo-gif-fallback">
                    <span className="demo-gif-fallback-mark" aria-hidden="true">
                      <Calendar size={26} strokeWidth={1.6} />
                    </span>
                    <p>Demonstração em breve</p>
                  </div>
                ) : (
                  <img
                    src={GIF_SRC}
                    alt="Demonstração da agenda do Studio Pay"
                    className="demo-gif-img"
                    loading="lazy"
                    onError={() => setGifFailed(true)}
                  />
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
