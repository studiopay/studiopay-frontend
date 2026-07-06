import { useState } from 'react'
import ModulePageLayout from '@/components/landing/ModulePageLayout'
import Reveal from '@/components/landing/Reveal'
import { modulePages } from '@/data/publicModules'
import { CalendarCheck, CalendarClock, BellRing, LayoutGrid, Calendar } from 'lucide-react'

// Imagem oficial de produção — fica em /public, então sobe junto com o
// deploy independente do que estiver salvo no localStorage do Admin Visual.
// ?v=2 força o navegador/CDN a buscar o arquivo atualizado em vez de servir
// uma cópia antiga em cache com a mesma URL.
const AGENDA_HERO_IMAGE_FALLBACK = '/images/studio-pay/agenda-hero.webp?v=2'

function readAdminAgendaHero() {
  try { return JSON.parse(localStorage.getItem('studioPayAdmin_agendaHero') || 'null') } catch { return null }
}

const agendaHeroCards = [
  { Icon: CalendarCheck, title: 'Horários disponíveis', text: 'Mostre sua disponibilidade sem precisar responder manualmente.' },
  { Icon: CalendarClock, title: 'Confirmação automática', text: 'O Studio Pay envia mensagens para confirmar a sessão antes do horário.' },
  { Icon: BellRing, title: 'Lembretes da sessão', text: 'Reduza esquecimentos e atrasos com avisos automáticos no momento certo.' },
  { Icon: LayoutGrid, title: 'Agenda organizada', text: 'Visualize sessões, bloqueios e atendimentos em um só lugar.' },
]

// Mostra a imagem (admin/localStorage como override local, ou o fallback fixo
// em /public); só cai para o placeholder se nenhuma imagem carregar.
function AgendaHeroImage({ src, alt }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="agenda-hero-placeholder">
        <span className="agenda-hero-placeholder-icon">
          <Calendar size={26} strokeWidth={1.5} />
        </span>
        <p>Imagem da agenda</p>
      </div>
    )
  }

  return <img src={src} alt={alt} className="agenda-hero-visual-img" onError={() => setFailed(true)} />
}

function AgendaHero() {
  const admin = readAdminAgendaHero()
  const heroImage = admin?.image || AGENDA_HERO_IMAGE_FALLBACK

  return (
    <section className="agenda-hero">
      <div className="agenda-hero-glow" />
      <div className="container">
        <div className="agenda-hero-inner">
          <Reveal className="agenda-hero-copy-area">
            <div className="agenda-hero-copy">
              <span className="section-label">Agenda inteligente</span>
              <h1 className="agenda-hero-title">
                Sua agenda trabalha <span className="landing-accent">por você,</span> mesmo quando você está tatuando.
              </h1>
              <p className="agenda-hero-sub">
                O cliente consulta horários disponíveis, agenda com mais facilidade e recebe lembretes automáticos
                quando a sessão estiver chegando.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="agenda-hero-visual-area">
            <div className="agenda-hero-visual">
              <AgendaHeroImage src={heroImage} alt="Studio Agenda" />
            </div>
          </Reveal>

          <Reveal delay={160} className="agenda-hero-cards-area">
            <div className="core-solution-grid agenda-hero-cards">
              {agendaHeroCards.map(({ Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 50}>
                  <div className="core-solution-card">
                    <span className="core-solution-icon"><Icon size={20} strokeWidth={1.8} /></span>
                    <h3 className="core-solution-title">{title}</h3>
                    <p className="core-solution-text">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className="core-pill core-pill-icon agenda-hero-pill">
            <span className="core-pill-icon-mark" aria-hidden="true">
              <Calendar size={16} strokeWidth={2} />
            </span>
            <p>
              Horários disponíveis, confirmações automáticas e lembretes em uma experiência{' '}
              <span className="text-pink">feita para quem vive da tatuagem.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function StudioAgendaPage() {
  return <ModulePageLayout page={modulePages.agenda} heroContent={<AgendaHero />} />
}
