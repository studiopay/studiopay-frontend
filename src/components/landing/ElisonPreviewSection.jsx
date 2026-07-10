import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, CheckCheck, MoreVertical, Phone, SendHorizontal, Video } from 'lucide-react'
import Reveal from './Reveal'

const elisonSteps = [
  {
    label: 'Confirmação',
    title: 'Confirmação automática',
    messages: [
      { from: 'elison', text: 'Olá, João. Passando para confirmar seu horário amanhã às 14h.', time: '09:41' },
      { from: 'elison', text: 'Está tudo certo para você?', time: '09:41' },
      { from: 'client', text: 'Sim, confirmado.', time: '09:43' },
    ],
  },
  {
    label: 'Lembrete',
    title: 'Lembrete inteligente',
    messages: [
      { from: 'elison', text: 'Oi, João. Seu atendimento é hoje às 14h.', time: '10:02' },
      { from: 'elison', text: 'Se tiver qualquer imprevisto, me avise por aqui.', time: '10:02' },
      { from: 'client', text: 'Perfeito.', time: '10:04' },
    ],
  },
  {
    label: 'Pós-atendimento',
    title: 'Pós-atendimento',
    messages: [
      { from: 'elison', text: 'Oi, João. Passando para saber como você está no pós-atendimento.', time: '18:12' },
      { from: 'elison', text: 'Se quiser, posso te reenviar os cuidados.', time: '18:12' },
      { from: 'client', text: 'Quero sim.', time: '18:15' },
    ],
  },
]

const elisonBlocks = [
  { title: 'ATENDIMENTO', text: 'Atende clientes pelo WhatsApp, apresenta seu portfólio e tira dúvidas automaticamente.' },
  { title: 'VENDAS', text: 'Passa orçamentos, responde objeções e conduz o cliente até o fechamento.' },
  { title: 'GESTÃO', text: 'Organiza sua agenda, controla receitas e despesas e acompanha o pós-atendimento.' },
]

export default function ElisonPreviewSection() {
  const [activeStep, setActiveStep] = useState(0)
  const currentStep = elisonSteps[activeStep]

  return (
    <section className="elison-preview-section" id="elison-ia">
      <div className="container">
        <div className="elison-preview-layout">
          <Reveal>
            <div className="elison-preview-copy">
              <span className="section-label">ELISSON.IA</span>
              <h2 className="section-title">
                Elisson.IA vende,<br />
                atende e organiza <span className="landing-accent" style={{ whiteSpace: 'nowrap' }}>por você.</span>
              </h2>
              <p className="section-sub">
                Seu estúdio continua funcionando mesmo quando você está tatuando.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="elison-preview-demo">
              <div className="elison-phone" aria-label="Demonstração de conversa do Elisson.IA">
                <div className="elison-chat-header">
                  <span className="elison-chat-avatar" aria-hidden="true">J</span>
                  <div className="elison-chat-contact">
                    <strong>João</strong>
                    <span>Atendimento via Elisson.IA</span>
                  </div>
                  <div className="elison-chat-actions" aria-hidden="true">
                    <Video size={15} strokeWidth={1.8} />
                    <Phone size={15} strokeWidth={1.8} />
                    <MoreVertical size={16} strokeWidth={1.8} />
                  </div>
                </div>

                <div className="elison-phone-status">
                  <span>{currentStep.title}</span>
                </div>

                <div className="elison-phone-thread">
                  {currentStep.messages.map((message, index) => (
                    <div
                      className={`elison-chat-bubble ${message.from === 'client' ? 'client' : 'elison'}`}
                      key={`${message.from}-${index}`}
                    >
                      <span>{message.from === 'client' ? 'João' : 'Elisson.IA'}</span>
                      <p>{message.text}</p>
                      <small>
                        {message.time}
                        {message.from === 'elison' && <CheckCheck size={13} strokeWidth={1.8} />}
                      </small>
                    </div>
                  ))}
                </div>

                <div className="elison-chat-input" aria-hidden="true">
                  <span>Mensagem</span>
                  <i><SendHorizontal size={15} strokeWidth={2} /></i>
                </div>
              </div>

              <div className="elison-step-tabs" aria-label="Estados demonstrativos do Elisson.IA">
                {elisonSteps.map((step, index) => (
                  <button
                    type="button"
                    key={step.label}
                    className={`elison-step-tab ${activeStep === index ? 'active' : ''}`}
                    onClick={() => setActiveStep(index)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {step.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <ul className="elison-preview-bullets" aria-label="O que o Elisson.IA faz por você">
              {elisonBlocks.map((block) => (
                <li key={block.title} style={{ alignItems: 'flex-start' }}>
                  <span aria-hidden="true" style={{ marginTop: 2 }}><Check size={15} strokeWidth={2} /></span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ display: 'block', fontSize: 12.5, fontWeight: 800, color: 'var(--pink)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>
                      {block.title}
                    </strong>
                    <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.5 }}>
                      {block.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={180}>
            <div className="elison-preview-footer">
              <p>Menos conversa manual. Mais cliente acompanhado.</p>
              <div className="elison-preview-actions">
                <Link to="/elison-ia" className="btn btn-primary btn-lg">
                  Conhecer benefícios do Elisson.IA <ArrowRight size={18} />
                </Link>
                <Link to="/elison-ia" className="elison-inline-link">
                  Ver como funciona
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}



