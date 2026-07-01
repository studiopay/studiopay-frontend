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

const elisonBullets = [
  'Confirma antes do horário',
  'Lembra automaticamente',
  'Continua o pós-atendimento',
]

export default function ElisonPreviewSection() {
  const [activeStep, setActiveStep] = useState(0)
  const currentStep = elisonSteps[activeStep]

  return (
    <section className="elison-preview-section">
      <div className="container">
        <div className="elison-preview-layout">
          <Reveal>
            <div className="elison-preview-copy">
              <span className="section-label">Elison IA</span>
              <h2 className="section-title">
                Enquanto você tatua,<br />
                <span className="text-pink">o Elison acompanha seus clientes.</span>
              </h2>
              <p className="section-sub">
                Confirma horários, envia lembretes e continua o atendimento sem depender de você parar o trabalho.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="elison-preview-demo">
              <div className="elison-phone" aria-label="Demonstração de conversa do Elison IA">
                <div className="elison-chat-header">
                  <span className="elison-chat-avatar" aria-hidden="true">J</span>
                  <div className="elison-chat-contact">
                    <strong>João</strong>
                    <span>Atendimento via Elison.IA</span>
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
                      <span>{message.from === 'client' ? 'João' : 'Elison.IA'}</span>
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

              <div className="elison-step-tabs" aria-label="Estados demonstrativos do Elison IA">
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
            <ul className="elison-preview-bullets" aria-label="O que o Elison IA ajuda a organizar">
              {elisonBullets.map((bullet) => (
                <li key={bullet}>
                  <span aria-hidden="true"><Check size={15} strokeWidth={2} /></span>
                  {bullet}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={180}>
            <div className="elison-preview-footer">
              <p>Menos conversa manual. Mais cliente acompanhado.</p>
              <div className="elison-preview-actions">
                <Link to="/elison-ia" className="btn btn-primary btn-lg">
                  Conhecer benefícios do Elison IA <ArrowRight size={18} />
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



