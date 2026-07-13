import { Link } from 'react-router-dom'
import { ArrowRight, Wallet } from 'lucide-react'
import Reveal from './Reveal'

// Teaser da Conta Digital na Home — composição vertical e centralizada
// com o mockup real do celular (asset em /public), sem painel/dados
// fictícios recriados em HTML.

const MOCKUP_IMAGE = '/images/studio-pay/conta-digital-mobile.png.png'

export default function CoreDigitalPreviewSection() {
  return (
    <section className="core-preview-section">
      <div className="core-preview-glow" />
      <div className="container">
        <Reveal>
          <div className="core-preview-inner">
            <span className="section-label core-preview-badge">CONTA DIGITAL</span>
            <h2 className="section-title core-preview-title">
              A Conta PJ que<br />
              seu estúdio precisa.
            </h2>

            <div className="core-preview-mockup-wrap">
              <div className="core-preview-mockup-glow" aria-hidden="true" />
              <img
                src={MOCKUP_IMAGE}
                alt="Conta Digital Studio Pay no celular"
                className="core-preview-mockup-img"
              />
            </div>

            <Link to="/studio-core" className="btn btn-primary btn-lg core-preview-cta">
              Conhecer Conta Digital <ArrowRight size={18} />
            </Link>

            <p className="core-pill core-pill-icon core-preview-pill">
              <span className="core-preview-pill-icon" aria-hidden="true">
                <Wallet size={14} strokeWidth={2.2} />
              </span>
              Cobre, receba e acompanhe cada sessão sem perder o controle.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
