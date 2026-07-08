import { Link } from 'react-router-dom'
import { Wallet, CalendarDays, Bot, ShoppingBag, GraduationCap, Megaphone, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

const features = [
  {
    Icon: Wallet,
    color: '#FF2ED1',
    title: 'Conta Digital',
    desc: 'Controle Pix, cobranças, saldo e relatórios.',
    to: '/studio-core',
    action: 'Conhecer Conta Digital',
  },
  {
    Icon: CalendarDays,
    color: '#3B82F6',
    title: 'Agenda',
    desc: 'Organize horários, lembretes e confirmações.',
    to: '/studio-agenda',
    action: 'Ver Agenda',
  },
  {
    Icon: Bot,
    color: '#A78BFA',
    title: 'Elisson.IA',
    desc: 'Automatize mensagens, confirmações e recuperação de clientes.',
    to: '/elison-ia',
    action: 'Conhecer Elisson.IA',
  },
  {
    Icon: ShoppingBag,
    color: '#F59E0B',
    title: 'Shop',
    desc: 'Acesse produtos, benefícios e vantagens para o estúdio.',
    to: '/studio-shop',
    action: 'Ver Shop',
  },
  {
    Icon: GraduationCap,
    color: '#22C55E',
    title: 'Cursos',
    desc: 'Aprenda gestão, vendas, atendimento e crescimento.',
    to: '/studio-learn',
    action: 'Ver Cursos',
  },
  {
    Icon: Megaphone,
    color: '#EF4444',
    title: 'Tráfego',
    desc: 'Atraia mais clientes com campanhas e criativos.',
    to: '/studio-ads',
    action: 'Ver Tráfego',
  },
]

export default function FeaturesSection() {
  return (
    <section className="features-section" id="funcionalidades">
      <div className="container">
        <Reveal>
          <div className="section-header-center">
            <span className="section-label">Mapa do Studio Pay</span>
            <h2 className="section-title">Escolha o que organizar primeiro.</h2>
            <p className="section-sub">
              Cada função resolve uma parte da rotina. Você entende o geral aqui e aprofunda na página de cada módulo.
            </p>
          </div>
        </Reveal>

        <div className="features-grid features-grid-map">
          {features.map(({ Icon, color, title, desc, to, action }, i) => (
            <Reveal key={title} delay={i * 55}>
              <Link to={to} className="feature-row">
                <span className="feature-icon-mark" style={{ color }} aria-hidden>
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <div className="feature-row-main">
                  <h3 className="feature-title">{title}</h3>
                  <p className="feature-desc">{desc}</p>
                </div>
                <span className="feature-link">
                  {action} <ArrowRight size={14} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
