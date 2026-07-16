import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import Reveal from './Reveal'

// Imagens reais (screenshots) da conversa do Elisson.IA, uma por aba —
// substituem o mockup fake em HTML/CSS que existia antes. Ficam em
// /public, então sobem junto com o deploy.
const elisonSteps = [
  { label: 'Atendimento', title: 'Atendimento automático', image: '/images/studio-pay/home-elisson-atendimento.webp' },
  { label: 'Vendas', title: 'Vendas e negociação', image: '/images/studio-pay/home-elisson-vendas.webp' },
  { label: 'Pós-atendimento', title: 'Pós-atendimento', image: '/images/studio-pay/home-elisson-pos-atendimento.webp' },
]

const elisonBlocks = [
  { title: 'ATENDIMENTO', text: 'Atende clientes pelo WhatsApp, apresenta seu portfólio e tira dúvidas automaticamente.' },
  { title: 'VENDAS', text: 'Passa orçamentos, responde objeções e conduz o cliente até o fechamento.' },
  { title: 'PÓS-ATENDIMENTO', text: 'Acompanha o cliente após a sessão, tira dúvidas e reforça os cuidados definidos anteriormente.' },
]

export default function ElisonPreviewSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [imgFailed, setImgFailed] = useState(false)
  const currentStep = elisonSteps[activeStep]

  // Reseta o estado de falha ao trocar de aba, para não travar as
  // demais imagens no fallback se só uma delas tiver falhado antes.
  useEffect(() => {
    setImgFailed(false)
  }, [activeStep])

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
              <div className="elison-phone-shot">
                {imgFailed ? (
                  <div className="elison-phone-shot-fallback">
                    <span className="elison-phone-shot-fallback-mark" aria-hidden="true">
                      <MessageCircle size={26} strokeWidth={1.6} />
                    </span>
                    <p>Demonstração em breve</p>
                  </div>
                ) : (
                  <img
                    key={currentStep.image}
                    src={currentStep.image}
                    alt={`Demonstração do Elisson.IA — ${currentStep.title}`}
                    className="elison-phone-shot-img"
                    loading="lazy"
                    onError={() => setImgFailed(true)}
                  />
                )}
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
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}



