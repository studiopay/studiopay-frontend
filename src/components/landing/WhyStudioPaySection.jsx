import { MessageCircle, CreditCard, BarChart3 } from 'lucide-react'
import Reveal from './Reveal'

const positioningCards = [
  {
    Icon: MessageCircle,
    title: 'Não pare de tatuar\npara responder clientes.',
    text: 'O Elisson.IA atende, responde dúvidas,\nenvia orçamentos e agenda horários\nenquanto você foca no que faz de melhor.',
  },
  {
    Icon: CreditCard,
    title: 'Venda mais com\npagamentos profissionais.',
    text: 'Ofereça PIX, boleto e cartão de crédito.\nFacilite o pagamento para o cliente\ne receba com mais segurança.',
  },
  {
    Icon: BarChart3,
    title: 'Controle clientes,\nagenda e financeiro.',
    text: 'Tenha uma visão completa do seu estúdio.\nOrganize sua agenda, acompanhe clientes\ne saiba exatamente o que entra e o que sai.',
  },
]

export default function WhyStudioPaySection() {
  return (
    <section className="why-section">
      <div className="container">
        <Reveal>
          <div className="section-header-center why-header">
            <span className="section-label">TUDO EM UM SÓ LUGAR</span>
            <h2 className="section-title">
              <span className="why-title-line1">Ecossistema completo para</span><br className="why-title-break" />
              <span className="landing-accent">estúdios profissionais.</span>
            </h2>
            <p className="section-sub">
              Venda mais, organize sua rotina e tenha controle total
              do seu estúdio em uma única plataforma.
            </p>
          </div>
        </Reveal>

        <div className="why-grid">
          {positioningCards.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="why-card">
                <span className="why-card-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <h3 className="why-card-title">
                  {title.split('\n').map((line, li, lines) => (
                    <span key={li} className={li === lines.length - 1 ? 'why-card-title-accent' : undefined}>
                      {line}
                      {li < lines.length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <span className="why-card-divider" aria-hidden="true" />
                <p className="why-card-text">
                  {text.split('\n').map((line, li) => (
                    <span key={li}>
                      {line}
                      {li < text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
