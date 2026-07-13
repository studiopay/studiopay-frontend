import { useState } from 'react'
import { Link } from 'react-router-dom'
import ModulePageLayout from '@/components/landing/ModulePageLayout'
import Reveal from '@/components/landing/Reveal'
import { modulePages } from '@/data/publicModules'
import {
  Calendar,
  Bell, MessageCircle,
  CheckCircle2, Users, ArrowRight, Sparkles,
  CalendarX2, ShieldCheck, TrendingUp,
} from 'lucide-react'

// Imagem oficial de produção — fica em /public, então sobe junto com o
// deploy independente do que estiver salvo no localStorage do Admin Visual.
// ?v=2 força o navegador/CDN a buscar o arquivo atualizado em vez de servir
// uma cópia antiga em cache com a mesma URL.
const AGENDA_HERO_IMAGE_FALLBACK = '/images/studio-pay/agenda-hero.webp?v=2'

function readAdminAgendaHero() {
  try { return JSON.parse(localStorage.getItem('studioPayAdmin_agendaHero') || 'null') } catch { return null }
}

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
              <span className="section-label">AGENDA INTELIGENTE</span>
              <h1 className="agenda-hero-title">
                Agenda inteligente<br />
                trabalhando <span className="landing-accent">por você.</span>
              </h1>
              <p className="agenda-hero-sub">
                Organize horários, confirme sessões e envie lembretes automáticos sem depender de controle
                manual.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="agenda-hero-visual-area">
            <div className="agenda-hero-visual">
              <AgendaHeroImage src={heroImage} alt="Studio Agenda" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className="core-pill core-pill-icon agenda-hero-pill">
            <span className="core-pill-icon-mark" aria-hidden="true">
              <Calendar size={16} strokeWidth={2} />
            </span>
            <p>
              Horários disponíveis, confirmações automáticas e lembretes{' '}
              <span className="text-pink">inteligentes.</span>
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
  { Icon: CheckCircle2, title: 'Confirmação de horário', text: 'Lembra o cliente de confirmar o horário agendado.', on: true },
  { Icon: Bell, title: 'Lembrete pré-sessão', text: 'Envia um lembrete antes do horário da sessão.', on: true },
  { Icon: MessageCircle, title: 'Mensagem pós-sessão', text: 'Agradece e mantém o relacionamento ativo.', on: false },
]

function RemindersPanel() {
  return (
    <div className="agenda-reminders-panel" aria-hidden="true">
      <p className="agenda-reminders-panel-title">
        <span className="agenda-reminders-panel-icon"><Calendar size={16} strokeWidth={1.8} /></span>
        Agenda inteligente
      </p>
      <div className="agenda-reminders-list">
        {reminderItems.map(({ Icon, title, text, on }) => (
          <div key={title} className="agenda-reminder-row">
            <span className="agenda-reminder-icon"><Icon size={17} strokeWidth={1.8} /></span>
            <div className="agenda-reminder-copy">
              <h3 className="agenda-reminder-title">{title}</h3>
              <p className="agenda-reminder-text">{text}</p>
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
            <span className="section-label">AGENDA INTELIGENTE</span>
            <h2 className="section-title agenda-reminders-title">
              Lembretes automáticos,<br />
              <span className="landing-accent">na hora certa.</span>
            </h2>
            <p className="section-sub agenda-reminders-sub">
              A agenda confirma horários e lembra seus clientes antes da sessão, ajudando na rotina do estúdio.
            </p>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className="core-pill core-pill-icon agenda-reminders-pill">
            <span className="core-pill-icon-mark" aria-hidden="true">
              <Bell size={16} strokeWidth={2} />
            </span>
            <p>Horários confirmados, clientes lembrados e uma rotina mais organizada.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção 3 — Encaixes inteligentes ──────────────────────────────
// Composição em HTML/CSS (dados fictícios) mostrando horário livre
// virando cliente chamado: coluna de horários à esquerda, coluna de
// clientes em espera à direita, conectadas por um elemento central.

const freeSlots = [
  { day: 'Quinta', time: '15:00' },
  { day: 'Sexta', time: '10:30' },
  { day: 'Sábado', time: '16:00' },
]

const waitlistClients = [
  'Cliente com desejo de antecipar a sessão para quinta',
  'Cliente aguardando encaixe para flash',
  'Cliente deseja um horário para sábado',
]

function AgendaMoneySection() {
  return (
    <section className="agenda-money module-section">
      <div className="agenda-money-glow" />
      <div className="container">
        <Reveal>
          <div className="section-header-center">
            <span className="section-label agenda-money-badge">
              <Sparkles size={14} strokeWidth={2.2} /> ENCAIXES INTELIGENTES
            </span>
            <h2 className="section-title agenda-money-title">
              Seu horário vago<br />
              pode virar <span className="landing-accent">cliente fechado.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="agenda-money-flow" aria-hidden="true">
            <div className="agenda-money-col">
              <p className="agenda-money-col-title">
                <Calendar size={14} strokeWidth={2} /> HORÁRIOS LIVRES
              </p>
              <div className="agenda-money-cards">
                {freeSlots.map(({ day, time }) => (
                  <div key={day} className="agenda-money-slot-card">
                    <span className="agenda-money-slot-icon"><Calendar size={16} strokeWidth={1.8} /></span>
                    <span className="agenda-money-slot-text">
                      {day}, <span className="agenda-money-slot-time">{time}</span>
                    </span>
                    <span className="agenda-money-slot-badge">LIVRE</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="agenda-money-center">
              <p className="agenda-money-col-title agenda-money-center-spacer">&nbsp;</p>
              <div className="agenda-money-center-inner">
                <svg
                  className="agenda-money-connections"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M0,16.5 C 26,16.5 26,50 50,50" vectorEffect="non-scaling-stroke" />
                  <path d="M0,50 L 50,50" vectorEffect="non-scaling-stroke" />
                  <path d="M0,83.5 C 26,83.5 26,50 50,50" vectorEffect="non-scaling-stroke" />
                  <path d="M50,50 C 74,50 74,16.5 100,16.5" vectorEffect="non-scaling-stroke" />
                  <path d="M50,50 L 100,50" vectorEffect="non-scaling-stroke" />
                  <path d="M50,50 C 74,50 74,83.5 100,83.5" vectorEffect="non-scaling-stroke" />
                  <path className="agenda-money-connection-arrow" d="M95,13.5 L100,16.5 L95,19.5" vectorEffect="non-scaling-stroke" />
                  <path className="agenda-money-connection-arrow" d="M95,47 L100,50 L95,53" vectorEffect="non-scaling-stroke" />
                  <path className="agenda-money-connection-arrow" d="M95,80.5 L100,83.5 L95,86.5" vectorEffect="non-scaling-stroke" />
                </svg>
                <span className="agenda-money-center-circle">
                  <ArrowRight size={26} strokeWidth={2} />
                </span>
              </div>
            </div>

            <div className="agenda-money-col">
              <p className="agenda-money-col-title">
                <Users size={14} strokeWidth={2} /> CLIENTES PARA CHAMAR
              </p>
              <div className="agenda-money-cards">
                {waitlistClients.map((text) => (
                  <div key={text} className="agenda-money-client-card">
                    <span className="agenda-money-client-icon"><Users size={16} strokeWidth={1.8} /></span>
                    <span className="agenda-money-client-text">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="core-pill core-pill-icon agenda-money-pill">
            <span className="core-pill-icon-mark" aria-hidden="true">
              <Calendar size={16} strokeWidth={2} />
            </span>
            <p>Horário vazio vira oportunidade de encaixe.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção final — CTA de impacto, no mesmo padrão do Elison IA ───

const agendaFinalBenefits = [
  { Icon: CalendarX2, label: 'Menos faltas' },
  { Icon: ShieldCheck, label: 'Mais controle' },
  { Icon: TrendingUp, label: 'Mais previsibilidade' },
]

function AgendaFinalSection() {
  return (
    <section className="agenda-final module-section">
      <div className="agenda-final-glow" />
      <div className="container">
        <Reveal>
          <div className="agenda-final-panel">
            <span className="section-label">AGENDA MAIS LEVE</span>
            <h2 className="section-title agenda-final-title">
              Menos horários perdidos.<br />
              <span className="landing-accent">Mais sessões confirmadas.</span>
            </h2>
            <p className="section-sub agenda-final-sub">
              Organize sua agenda, confirme clientes e mantenha sua rotina mais previsível.
            </p>

            <div className="agenda-final-benefits">
              {agendaFinalBenefits.map(({ Icon, label }) => (
                <span key={label} className="agenda-final-benefit">
                  <Icon size={14} strokeWidth={2} /> {label}
                </span>
              ))}
            </div>

            <div className="agenda-final-actions">
              <Link to="/cadastro" className="btn btn-primary btn-lg">
                Começar agora <ArrowRight size={18} />
              </Link>
              <Link to="/planos" className="btn btn-ghost btn-lg">Ver planos</Link>
            </div>
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
      sectionThreeContent={<AgendaMoneySection />}
      solutionContent={<></>}
      practicalContent={<></>}
      benefitsContent={<></>}
      finalCtaContent={<AgendaFinalSection />}
    />
  )
}
