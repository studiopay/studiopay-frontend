import { useEffect, useRef, useState } from 'react'
import ModulePageLayout from '@/components/landing/ModulePageLayout'
import Reveal from '@/components/landing/Reveal'
import { modulePages } from '@/data/publicModules'
import { Bot, MessageCircle, HelpCircle, UserCheck, Sparkles, Send, Check, BookOpen } from 'lucide-react'

// ── Data ──────────────────────────────────────────────────────

const heroBenefits = [
  { Icon: MessageCircle, title: 'Atende leads novos', text: 'Responde interessados mesmo quando você está tatuando.' },
  { Icon: Sparkles, title: 'Fala no seu tom', text: 'O Elison aprende seu jeito de atender e mantém a linguagem do estúdio.' },
  { Icon: HelpCircle, title: 'Tira dúvidas frequentes', text: 'Orçamento, disponibilidade, estilos, cuidados e informações da sessão.' },
  { Icon: UserCheck, title: 'Evita cliente perdido', text: 'Menos demora no WhatsApp e mais conversas acompanhadas.' },
]

const initialConversation = [
  { from: 'client', text: 'Oi, queria fazer um orçamento de tattoo no antebraço.' },
  { from: 'elison', text: 'Oi! Tudo bem? Posso te ajudar sim. Me manda a referência da arte, o tamanho aproximado e a região exata do corpo para eu organizar tudo certinho.' },
  { from: 'client', text: 'Quero algo em realismo preto e cinza.' },
  { from: 'elison', text: 'Perfeito. O estúdio trabalha com realismo preto e cinza. Assim que você me enviar a referência e o tamanho, já deixo tudo separado para seguirmos com o atendimento.' },
  { from: 'client', text: 'Você tem horário essa semana?' },
  { from: 'elison', text: 'Temos alguns horários disponíveis. Se quiser, já posso te passar as opções e adiantar seu atendimento por aqui.' },
]

// Sugestões rápidas com resposta pré-definida — simulação puramente local,
// sem IA real, sem integração com WhatsApp e sem backend.
const quickReplies = [
  {
    label: 'Quero fazer um orçamento',
    reply: 'Claro! Me manda a referência da arte, tamanho aproximado e região do corpo. Assim eu organizo tudo para o tatuador avaliar certinho.',
  },
  {
    label: 'Tem horário essa semana?',
    reply: 'Temos alguns horários disponíveis esta semana. Posso te mostrar as opções e deixar seu atendimento adiantado por aqui.',
  },
  {
    label: 'Quais cuidados antes da tattoo?',
    reply: 'Antes da sessão, venha bem alimentado, evite álcool e hidrate bem a pele. Também posso te enviar as orientações completas do estúdio.',
  },
]

const DEFAULT_REPLY = 'Perfeito! Já vou organizar essas informações para o atendimento do estúdio continuar da melhor forma.'

// Detecção de intenção por palavra-chave — cobre tanto o texto exato dos
// chips quanto qualquer mensagem digitada livremente pelo visitante.
// Simulação puramente local, sem IA real.
const intentReplies = [
  {
    keywords: ['orçamento', 'orcamento', 'preço', 'preco', 'valor', 'quanto custa'],
    reply: quickReplies[0].reply,
  },
  {
    keywords: ['horário', 'horario', 'agenda', 'disponibilidade', 'semana'],
    reply: quickReplies[1].reply,
  },
  {
    keywords: ['cuidado', 'cuidados', 'antes', 'depois', 'cicatrização', 'cicatrizacao', 'pós tattoo', 'pos tattoo'],
    reply: quickReplies[2].reply,
  },
]

// Mantém o mockup com altura controlada: guarda só as últimas mensagens.
const MAX_MESSAGES = 10

function getReplyFor(text) {
  const normalized = text.trim().toLowerCase()
  const intent = intentReplies.find(({ keywords }) => keywords.some((kw) => normalized.includes(kw)))
  return intent ? intent.reply : DEFAULT_REPLY
}

// ── Mockup de conversa (HTML/CSS + estado local, sem IA real, sem
// integração com WhatsApp, sem backend — apenas demonstração visual) ──

function WhatsAppMockup() {
  const [messages, setMessages] = useState(initialConversation)
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    setMessages((prev) => [...prev, { from: 'client', text: trimmed }].slice(-MAX_MESSAGES))
    setDraft('')
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { from: 'elison', text: getReplyFor(trimmed) }].slice(-MAX_MESSAGES))
    }, 1100)
  }

  return (
    <div className="elison-whatsapp-mockup">
      <div className="elison-wa-header">
        <span className="elison-wa-avatar"><Bot size={18} strokeWidth={1.8} /></span>
        <div className="elison-wa-header-text">
          <p className="elison-wa-name">Elison IA</p>
          <p className="elison-wa-status">
            <span className="elison-wa-dot" /> online agora · Atendimento do estúdio
          </p>
        </div>
      </div>

      <div className="elison-wa-body" ref={bodyRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`elison-wa-bubble ${msg.from}`}>{msg.text}</div>
        ))}
        {typing && (
          <div className="elison-wa-bubble elison elison-wa-typing">
            <span className="elison-wa-typing-dot" />
            <span className="elison-wa-typing-dot" />
            <span className="elison-wa-typing-dot" />
          </div>
        )}
      </div>

      <div className="elison-wa-demo">
        <p className="elison-wa-demo-hint">Teste uma mensagem rápida</p>

        <div className="elison-wa-chips">
          {quickReplies.map(({ label }) => (
            <button
              key={label}
              type="button"
              className="elison-wa-chip"
              onClick={() => sendMessage(label)}
              disabled={typing}
            >
              {label}
            </button>
          ))}
        </div>

        <form
          className="elison-wa-input-row"
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage(draft)
          }}
        >
          <input
            type="text"
            className="elison-wa-input"
            placeholder="Digite sua mensagem..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={140}
          />
          <button type="submit" className="elison-wa-send" aria-label="Enviar mensagem" disabled={!draft.trim() || typing}>
            <Send size={16} strokeWidth={2} />
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Seção 1 — Hero Elison IA ──────────────────────────────────

function ElisonHero() {
  return (
    <section className="elison-hero">
      <div className="elison-hero-glow" />
      <div className="container">
        <div className="elison-hero-inner">
          <Reveal className="elison-hero-copy-area">
            <div className="elison-hero-copy">
              <span className="section-label">Elison IA</span>
              <h1 className="elison-hero-title">
                Enquanto você tatua, o Elison atende{' '}
                <span className="landing-accent">como se fosse você.</span>
              </h1>
              <p className="elison-hero-sub">
                Uma IA treinada com o jeito do seu estúdio para responder leads, tirar dúvidas e acompanhar
                clientes pelo WhatsApp sem deixar conversa parada.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="elison-hero-visual-area">
            <WhatsAppMockup />
          </Reveal>

          <Reveal delay={160} className="elison-hero-cards-area">
            <div className="core-solution-grid elison-benefits">
              {heroBenefits.map(({ Icon, title, text }, i) => (
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
          <div className="core-pill core-pill-icon elison-pill">
            <span className="core-pill-icon-mark" aria-hidden="true">
              <MessageCircle size={16} strokeWidth={2} />
            </span>
            <p>
              Mais atendimento, <span className="text-pink">menos conversa perdida</span> e um estúdio presente
              mesmo durante a sessão.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção 2 — Como funciona ───────────────────────────────────

const howSteps = [
  {
    title: 'Treine o Elison',
    text: 'Você adiciona respostas, linguagem, horários, regras do estúdio, cuidados e informações importantes.',
  },
  {
    title: 'Cliente chama no WhatsApp',
    text: 'O lead entra em contato, tira dúvidas, pede orçamento ou pergunta sobre horários.',
  },
  {
    title: 'Elison atende no seu tom',
    text: 'Ele responde com base no que aprendeu, mantendo a conversa ativa e organizada.',
  },
  {
    title: 'Você assume quando quiser',
    text: 'Quando tiver tempo, você pega a conversa com contexto, dúvidas e próximos passos já encaminhados.',
  },
]

const studioBaseItems = [
  'Tom de voz',
  'Respostas frequentes',
  'Cuidados pré-tattoo',
  'Cuidados pós-tattoo',
  'Horários disponíveis',
  'Regras de sinal',
  'Estilos atendidos',
  'Política de orçamento',
]

const howChips = ['Orçamento', 'Cuidados', 'Agenda', 'Sinal', 'Pós-tattoo', 'Referências', 'Horários', 'Atendimento']

function ElisonHowSection() {
  return (
    <section className="elison-how module-section">
      <div className="elison-how-glow" />
      <div className="container">
        <Reveal>
          <div className="section-header-center elison-how-header">
            <span className="section-label">Como funciona</span>
            <h2 className="section-title elison-how-title">
              Você ensina. O Elison responde. O cliente continua sendo cuidado.
            </h2>
            <p className="section-sub elison-how-sub">
              Cadastre o jeito do seu estúdio, suas respostas frequentes e suas orientações. O Elison usa essas
              informações para conduzir conversas com naturalidade até você poder assumir.
            </p>
          </div>
        </Reveal>

        <div className="elison-how-grid">
          <Reveal delay={80} className="elison-how-flow-area">
            <div className="elison-how-flow">
              {howSteps.map(({ title, text }, i) => (
                <div key={title} className="elison-how-step">
                  <span className="elison-how-step-marker">{i + 1}</span>
                  <div className="elison-how-step-body">
                    <h3 className="elison-how-step-title">{title}</h3>
                    <p className="elison-how-step-text">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140} className="elison-how-panel-area">
            <div className="elison-how-panel">
              <p className="elison-how-panel-title">
                <BookOpen size={15} strokeWidth={1.8} /> Base do estúdio
              </p>
              <ul className="elison-how-panel-list">
                {studioBaseItems.map((item) => (
                  <li key={item}>
                    <Check size={13} strokeWidth={2.4} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="elison-how-chips">
            {howChips.map((chip) => (
              <span key={chip} className="elison-how-chip">{chip}</span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={240}>
          <div className="core-pill core-pill-icon elison-pill elison-how-pill">
            <span className="core-pill-icon-mark" aria-hidden="true">
              <Sparkles size={16} strokeWidth={2} />
            </span>
            <p>
              Menos conversa perdida, <span className="text-pink">mais contexto organizado</span> e um atendimento
              que continua mesmo quando você está tatuando.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function ElisonIAPage() {
  return (
    <ModulePageLayout
      page={modulePages.elison}
      heroContent={<ElisonHero />}
      sectionTwoContent={<ElisonHowSection />}
    />
  )
}
