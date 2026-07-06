import { useState } from 'react'
import ModulePageLayout from '@/components/landing/ModulePageLayout'
import Reveal from '@/components/landing/Reveal'
import { modulePages } from '@/data/publicModules'
import {
  CalendarCheck, CalendarClock, BellRing, LayoutGrid, Calendar,
  Bell, MessageCircle, ShieldCheck, CalendarX2, MessageCircleOff, HeartHandshake,
} from 'lucide-react'

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

// ── Seção 2 — Lembretes automáticos ─────────────────────────────
// Mockup em HTML/CSS inspirado no bloco "Lembretes automáticos" do
// painel interno da Agenda — sem depender de imagem.

const reminderItems = [
  { Icon: Bell, title: 'Confirmação automática', text: 'Elison confirma 24h antes', on: true },
  { Icon: MessageCircle, title: 'Robô pré-tattoo', text: 'Cuidados enviados 2h antes', on: true },
  { Icon: ShieldCheck, title: 'Robô pós-tattoo', text: 'Cicatrização enviada após sessão', on: true },
  { Icon: CalendarClock, title: 'Lembretes ativos', text: '3 lembretes configurados', on: false },
]

const reminderBenefits = [
  { Icon: CalendarX2, title: 'Menos faltas', text: 'O cliente recebe aviso antes da sessão.' },
  { Icon: MessageCircleOff, title: 'Menos mensagem manual', text: 'O sistema envia os lembretes por você.' },
  { Icon: HeartHandshake, title: 'Mais acompanhamento', text: 'Antes e depois da tattoo, o cliente continua sendo cuidado.' },
]

function RemindersPanel() {
  return (
    <div className="agenda-reminders-panel" aria-hidden="true">
      <p className="agenda-reminders-panel-title">Lembretes automáticos</p>
      <div className="agenda-reminders-list">
        {reminderItems.map(({ Icon, title, text, on }) => (
          <div key={title} className="agenda-reminder-row">
            <span className="agenda-reminder-icon"><Icon size={17} strokeWidth={1.8} /></span>
            <div className="agenda-reminder-copy">
              <h3 className="agenda-reminder-title">{title}</h3>
              <p className="agenda-reminder-text">{text}</p>
              <span className="agenda-reminder-action">Configurar</span>
            </div>
            <span className={`agenda-reminder-toggle${on ? '' : ' off'}`}>
              <span className="agenda-reminder-knob" />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AgendaRemindersSection() {
  return (
    <section className="agenda-reminders module-section">
      <div className="agenda-reminders-glow" />
      <div className="container">
        <div className="agenda-reminders-grid">
          <Reveal className="agenda-reminders-visual-area">
            <RemindersPanel />
          </Reveal>

          <Reveal delay={100} className="agenda-reminders-text-area">
            <span className="section-label">Lembretes automáticos</span>
            <h2 className="section-title agenda-reminders-title">
              Lembretes automáticos<br />
              para o cliente{' '}
              <span className="landing-accent agenda-reminders-accent">
                não{' '}esquecer<br />
                da sessão.
              </span>
            </h2>
            <p className="section-sub agenda-reminders-sub">
              Configure confirmações, avisos pré-tattoo e mensagens pós-sessão para acompanhar o cliente sem
              depender do WhatsApp manual.
            </p>
          </Reveal>

          <Reveal delay={160} className="agenda-reminders-benefits-area">
            <div className="agenda-reminders-benefits">
              {reminderBenefits.map(({ Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 50}>
                  <div className="core-solution-card agenda-reminders-benefit-card">
                    <span className="core-solution-icon"><Icon size={20} strokeWidth={1.8} /></span>
                    <div className="agenda-reminders-benefit-copy">
                      <h3 className="core-solution-title">{title}</h3>
                      <p className="core-solution-text">{text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className="core-pill core-pill-icon agenda-reminders-pill">
            <span className="core-pill-icon-mark" aria-hidden="true">
              <Bell size={16} strokeWidth={2} />
            </span>
            <p>
              Menos esquecimento, menos atraso e{' '}
              <span className="text-pink">mais cliente acompanhado</span> sem depender do WhatsApp manual.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function StudioAgendaPage() {
  return (
    <ModulePageLayout
      page={modulePages.agenda}
      heroContent={<AgendaHero />}
      sectionTwoContent={<AgendaRemindersSection />}
    />
  )
}
