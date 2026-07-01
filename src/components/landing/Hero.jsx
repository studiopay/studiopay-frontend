import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/* Altere aqui para trocar o vídeo do hero */
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/YuBdxqRPylY?start=9'

export default function Hero() {
  return (
    <section className="hero-wrapper">
      <div className="hero-bg-glow" aria-hidden />
      <div className="hero-lines-bg" aria-hidden>
        <svg
          className="hero-svg-lines"
          viewBox="0 0 1200 700"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <ellipse cx="600" cy="200" rx="720" ry="560" stroke="rgba(255,46,209,0.035)" strokeWidth="1" />
          <ellipse cx="600" cy="200" rx="500" ry="360" stroke="rgba(255,46,209,0.022)" strokeWidth="1" />
          <path d="M0 380 Q300 160 600 320 T1200 240" stroke="rgba(255,46,209,0.04)" strokeWidth="1" fill="none" />
          <path d="M0 540 Q400 340 700 490 T1200 420" stroke="rgba(255,46,209,0.02)" strokeWidth="1" fill="none" />
          <path d="M-80 80 Q220 320 560 170 T1280 280" stroke="rgba(255,46,209,0.015)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="container">
        <div className="hero-content">
          <p className="hero-eyebrow">Feito pra quem vive da tatuagem.</p>

          <h1 className="hero-title">
            Aumente suas <span className="text-pink">vendas.</span><br />
            Reduza seus custos.
          </h1>

          <p className="hero-subtitle">
            Organize agenda, cobranças, clientes e financeiro em um só lugar.
          </p>

          <div className="hero-actions">
            <Link to="/cadastro" className="btn btn-primary btn-lg">
              Começar agora <ArrowRight size={18} />
            </Link>
            <a href="#funcionalidades" className="btn btn-ghost btn-lg">
              Ver funções
            </a>
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
