import { Link } from 'react-router-dom'
import { ArrowRight, Scissors, Wallet, ReceiptText, CheckCircle2, QrCode, Link2, Clock } from 'lucide-react'
import Reveal from './Reveal'

// Teaser da Conta Digital na Home — painel largo estilo "central
// financeira do estúdio", com dados fictícios. Apenas apresentação
// visual (sem backend, API, score, crédito ou lógica real).

const sessionFlow = [
  { Icon: Scissors, title: 'Tatuagem fechada', value: 'R$ 1.200,00' },
  { Icon: Wallet, title: 'Sinal recebido', value: 'R$ 300,00' },
  { Icon: ReceiptText, title: 'Cobrança enviada', value: 'Boleto · 12/08' },
  { Icon: CheckCircle2, title: 'Pagamento confirmado', value: 'Pix recebido' },
]

const movements = [
  { Icon: QrCode, title: 'Pix recebido', meta: 'Sessão Marina', value: 'R$ 650,00', status: 'in' },
  { Icon: ReceiptText, title: 'Boleto gerado', meta: 'Fechamento de braço', value: 'R$ 1.200,00', status: 'neutral' },
  { Icon: Link2, title: 'Link enviado', meta: 'Orçamento antebraço', value: 'R$ 420,00', status: 'neutral' },
  { Icon: Clock, title: 'Sinal pendente', meta: 'Cliente Rafael', value: 'R$ 150,00', status: 'pending' },
]

const summary = [
  { label: 'Recebido hoje', value: 'R$ 980,00' },
  { label: 'A receber', value: 'R$ 1.570,00' },
  { label: 'Pendente', value: 'R$ 450,00' },
  { label: 'Receita prevista', value: 'R$ 4.820,00' },
]

export default function CoreDigitalPreviewSection() {
  return (
    <section className="core-preview-section">
      <div className="core-preview-glow" />
      <div className="container">
        <Reveal>
          <div className="section-header-center core-preview-header">
            <span className="section-label">Conta Digital</span>
            <h2 className="section-title core-preview-title">
              Receba, cobre e acompanhe<br />
              o dinheiro do estúdio<br />
              <span className="landing-accent">em um só lugar.</span>
            </h2>
            <p className="section-sub">
              Com a Conta Digital Studio Pay, você organiza Pix, boletos, links de pagamento, sinais e
              recebimentos sem depender de planilhas ou conversas perdidas.
            </p>
            <div className="core-preview-actions">
              <Link to="/studio-core" className="btn btn-primary btn-lg">
                Conhecer Conta Digital <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="core-preview-panel" aria-hidden="true">
            <div className="core-preview-panel-head">
              <p className="core-preview-panel-title">Conta Digital Studio Pay</p>
              <p className="core-preview-panel-subtitle">Visão financeira do estúdio</p>
            </div>

            {/* Área 1 — Fluxo da sessão */}
            <div className="core-preview-flow">
              {sessionFlow.map(({ Icon, title, value }, i) => (
                <div className="core-preview-flow-item" key={title}>
                  <div className="core-preview-flow-card">
                    <span className="core-preview-flow-icon"><Icon size={17} strokeWidth={1.8} /></span>
                    <p className="core-preview-flow-title">{title}</p>
                    <p className="core-preview-flow-value">{value}</p>
                  </div>
                  {i < sessionFlow.length - 1 && (
                    <span className="core-preview-flow-arrow"><ArrowRight size={15} strokeWidth={2} /></span>
                  )}
                </div>
              ))}
            </div>

            {/* Área 2 — Movimentações recentes */}
            <div className="core-preview-block">
              <p className="core-preview-block-label">Movimentações recentes</p>
              <div className="core-preview-rows">
                {movements.map(({ Icon, title, meta, value, status }) => (
                  <div key={title} className="core-preview-row">
                    <span className={`core-preview-row-icon ${status}`}>
                      <Icon size={16} strokeWidth={1.8} />
                    </span>
                    <div className="core-preview-row-copy">
                      <h3 className="core-preview-row-title">{title}</h3>
                      <p className="core-preview-row-meta">{meta}</p>
                    </div>
                    <span className="core-preview-row-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Área 3 — Resumo financeiro */}
            <div className="core-preview-block">
              <p className="core-preview-block-label">Resumo financeiro</p>
              <div className="core-preview-summary">
                {summary.map(({ label, value }) => (
                  <div key={label} className="core-preview-summary-item">
                    <p className="core-preview-summary-label">{label}</p>
                    <p className="core-preview-summary-value">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="core-pill core-preview-pill">
            <span className="text-pink">Mais controle</span> para vender, cobrar e acompanhar cada sessão.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
