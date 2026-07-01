import { CalendarCheck, Link2, Bell, BarChart3 } from 'lucide-react'
import Reveal from './Reveal'

const items = [
  { Icon: CalendarCheck, label: 'Agenda', text: 'confirma.' },
  { Icon: Link2, label: 'Cobrança', text: 'acompanha.' },
  { Icon: Bell, label: 'Cliente', text: 'recebe lembrete.' },
  { Icon: BarChart3, label: 'Financeiro', text: 'mostra o resultado.' },
]

export default function HowItWorks() {
  return (
    <section className="system-section" id="como-funciona">
      <div className="container">
        <Reveal>
          <div className="section-header-center">
            <span className="section-label">O sistema</span>
            <h2 className="section-title">
              Enquanto você tatua,<br />
              <span className="text-pink">o Studio Pay organiza.</span>
            </h2>
            <p className="section-sub">
              Agenda, cobranças, clientes e financeiro seguem andando sem você
              precisar controlar tudo manualmente.
            </p>
          </div>
        </Reveal>

        <div className="system-list system-list-short">
          {items.map(({ Icon, label, text }, i) => (
            <Reveal key={label} delay={i * 55}>
              <div className="system-item">
                <span className="system-item-icon">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <span className="system-item-copy">
                  <span className="system-item-label">{label}</span>
                  <span className="system-item-text">{text}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
