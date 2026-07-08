import { useState } from 'react'
import { Link } from 'react-router-dom'
import ModulePageLayout from '@/components/landing/ModulePageLayout'
import Reveal from '@/components/landing/Reveal'
import { modulePages } from '@/data/publicModules'
import {
  CalendarCheck, CalendarClock, BellRing, LayoutGrid, Calendar,
  Bell, MessageCircle, ShieldCheck, CalendarX2, MessageCircleOff, HeartHandshake,
  Wallet, CheckCircle2, Clock, Users, ArrowRight, Hourglass, ListChecks, Sparkles,
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

// ── Seção 3 — Sinal, confirmação e dinheiro na agenda ────────────
// Painel operacional em HTML/CSS (dados fictícios), mostrando que a
// Agenda também é visão financeira, não só um calendário.

const agendaSessions = [
  { status: 'confirmed', client: 'Marina', time: '14:00', value: 'R$ 650,00', signal: 'Pago' },
  { status: 'pending', client: 'Rafael', time: '17:30', value: 'R$ 420,00', signal: 'Pendente' },
]

function AgendaMoneySection() {
  return (
    <section className="agenda-money module-section">
      <div className="agenda-money-glow" />
      <div className="container">
        <Reveal>
          <div className="section-header-center">
            <span className="section-label">Agenda operacional</span>
            <h2 className="section-title agenda-money-title">
              Sua agenda não mostra só horários. Ela mostra{' '}
              <span className="landing-accent">dinheiro em movimento.</span>
            </h2>
            <p className="section-sub agenda-money-sub">
              Acompanhe sessões confirmadas, sinais pendentes, receita prevista e clientes que ainda precisam
              confirmar presença.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="agenda-money-panel" aria-hidden="true">
            <div className="agenda-money-sessions">
              {agendaSessions.map((s) => (
                <div key={s.client} className="agenda-money-session-row">
                  <span className={`agenda-money-session-icon ${s.status}`}>
                    {s.status === 'confirmed' ? <CheckCircle2 size={18} strokeWidth={1.8} /> : <Clock size={18} strokeWidth={1.8} />}
                  </span>
                  <div className="agenda-money-session-copy">
                    <h3 className="agenda-money-session-title">
                      {s.status === 'confirmed' ? 'Sessão confirmada' : 'Aguardando sinal'}
                    </h3>
                    <p className="agenda-money-session-meta">Cliente: {s.client} · Horário: {s.time}</p>
                  </div>
                  <div className="agenda-money-session-value">
                    <span className="agenda-money-session-amount">{s.value}</span>
                    <span className={`agenda-money-session-signal ${s.status}`}>Sinal: {s.signal}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="agenda-money-stats">
              <div className="agenda-money-stat">
                <span className="agenda-money-stat-icon"><Wallet size={17} strokeWidth={1.8} /></span>
                <div>
                  <p className="agenda-money-stat-label">Receita prevista hoje</p>
                  <p className="agenda-money-stat-value">R$ 1.070,00</p>
                </div>
              </div>
              <div className="agenda-money-stat">
                <span className="agenda-money-stat-icon"><Users size={17} strokeWidth={1.8} /></span>
                <div>
                  <p className="agenda-money-stat-label">Clientes para confirmar</p>
                  <p className="agenda-money-stat-value">2 pendências</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="core-pill agenda-money-pill">
            Menos sessão perdida, <span className="text-pink">mais controle</span> sobre o que entra e sai da
            agenda.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção 4 — Horários livres viram oportunidade ─────────────────

const openSlots = ['Quinta, 15:00', 'Sexta, 10:30', 'Sábado, 16:00']
const waitlist = [
  'Cliente quer realismo no antebraço',
  'Cliente aguardando encaixe para flash',
  'Cliente pediu orçamento e sumiu',
]

function AgendaSlotsSection() {
  return (
    <section className="agenda-slots module-section">
      <div className="container">
        <Reveal>
          <div className="section-header-center">
            <span className="section-label">Encaixes inteligentes</span>
            <h2 className="section-title agenda-slots-title">
              Quando abre um horário, a agenda ajuda você a <span className="landing-accent">preencher.</span>
            </h2>
            <p className="section-sub agenda-slots-sub">
              Veja horários livres, clientes em espera e oportunidades para transformá-los em novas sessões.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="agenda-slots-grid">
            <div className="agenda-slots-col">
              <p className="agenda-slots-col-title">
                <Hourglass size={15} strokeWidth={1.8} /> Horário livre
              </p>
              <div className="agenda-slots-list">
                {openSlots.map((slot) => (
                  <div key={slot} className="agenda-slots-item">{slot}</div>
                ))}
              </div>
            </div>

            <span className="agenda-slots-arrow" aria-hidden="true"><ArrowRight size={18} strokeWidth={2} /></span>

            <div className="agenda-slots-col">
              <p className="agenda-slots-col-title">
                <ListChecks size={15} strokeWidth={1.8} /> Lista de espera
              </p>
              <div className="agenda-slots-list">
                {waitlist.map((item) => (
                  <div key={item} className="agenda-slots-item">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="agenda-slots-note">
            <Sparkles size={15} strokeWidth={1.8} />
            <p>
              Com a agenda organizada, fica mais fácil enxergar encaixes, horários livres e clientes que podem
              ser chamados quando surgir uma vaga.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="core-pill agenda-slots-pill">
            Horário vazio deixa de ser esquecimento e <span className="text-pink">vira oportunidade.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção final — CTA de impacto, no mesmo padrão do Elison IA ───

const agendaFinalBenefits = ['Menos falta', 'Menos esquecimento', 'Mais controle', 'Mais previsibilidade']

function AgendaFinalSection() {
  return (
    <section className="agenda-final module-section">
      <div className="agenda-final-glow" />
      <div className="container">
        <Reveal>
          <div className="agenda-final-panel">
            <span className="section-label">Agenda mais leve</span>
            <h2 className="section-title agenda-final-title">
              Menos agenda solta. <span className="landing-accent">Mais sessão confirmada.</span>
            </h2>
            <p className="section-sub agenda-final-sub">
              Organize horários, confirme clientes, acompanhe sinais e tenha uma visão mais clara da rotina do
              seu estúdio.
            </p>

            <div className="agenda-final-benefits">
              {agendaFinalBenefits.map((label) => (
                <span key={label} className="agenda-final-benefit">{label}</span>
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
      solutionContent={<AgendaSlotsSection />}
      practicalContent={<></>}
      benefitsContent={<></>}
      finalCtaContent={<AgendaFinalSection />}
    />
  )
}
