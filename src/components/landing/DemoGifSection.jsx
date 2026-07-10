import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, CalendarDays, CalendarCheck, MessageCircle, BellRing, Wallet, ShieldCheck } from 'lucide-react'
import Reveal from './Reveal'

const GIF_SRC = '/media/studiopay-agenda.gif'

const demoBullets = [
  { icon: CalendarCheck, label: 'Reserva horários automaticamente após o pagamento do sinal' },
  { icon: MessageCircle, label: 'Confirma atendimentos pelo WhatsApp' },
  { icon: BellRing, label: 'Envia lembretes antes da sessão' },
  { icon: CalendarDays, label: 'Organiza compromissos por dia, semana e mês' },
  { icon: Wallet, label: 'Controla sinais e recebimentos futuros' },
  { icon: ShieldCheck, label: 'Reduz faltas e atrasos' },
]

export default function DemoGifSection() {
  const [gifFailed, setGifFailed] = useState(false)

  return (
    <section className="demo-gif-section" id="agenda">
      <div className="container">
        <div className="demo-gif-layout">
          <Reveal>
            <div className="demo-gif-copy">
              <span className="section-label">AGENDA STUDIO PAY</span>
              <h2 className="section-title">
                Muito mais do que<br />
                uma <span className="landing-accent">agenda.</span>
              </h2>
              <p className="section-sub">
                Transforme sua rotina de atendimentos em uma operação mais organizada, segura e profissional.
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
