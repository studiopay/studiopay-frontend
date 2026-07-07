import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/* Altere aqui para trocar o vídeo do hero */
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/YuBdxqRPylY?start=9'

export default function Hero() {
  return (
    <section className="hero-wrapper" id="inicio">
      <div className="hero-bg-glow" aria-hidden />
      <div className="hero-bg-glow-secondary" aria-hidden />
      <div className="hero-particles" aria-hidden />

      <div className="container">
        <div className="hero-content">
          <p className="hero-eyebrow">Feito pra quem vive da tatuagem.</p>

          <h1 className="hero-title">
            Tatuador, seu estúdio<br className="hero-title-break" />{' '}
            também é uma <span className="landing-accent">empresa.</span>
          </h1>

          <p className="hero-subtitle">
            Com o Studio Pay, você organiza agenda, cobranças, clientes e financeiro em um só lugar — para vender mais e perder menos tempo.
          </p>

          <div className="hero-actions">
            <Link to="/cadastro" className="btn btn-primary btn-lg">
              Começar agora <ArrowRight size={18} />
            </Link>
            <Link to="/planos" className="btn btn-ghost btn-lg">
              Ver planos
            </Link>
          </div>
        </div>

        <div className="hero-video-wrap">
          <div className="hero-video-frame">
            <div className="hero-video-fallback" aria-hidden>
              <div className="hero-video-fallback-icon">▶</div>
              <span>Vídeo Studio Pay</span>
            </div>

            <iframe
              src={YOUTUBE_EMBED}
              title="Vídeo Studio Pay"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
