import { useState } from 'react'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import PublicSiteShell from '@/components/landing/PublicSiteShell'
import Reveal from '@/components/landing/Reveal'
import { getAdminContent, ADMIN_KEYS } from '@/utils/adminContent'
import {
  GraduationCap, Award, Percent, TrendingUp, Sparkles,
  Play, Star, Clock,
} from 'lucide-react'

// ── Admin-swappable content (opcional — sem UI de edição nesta rodada) ──
// Se no futuro existir uma aba de Admin para Cursos público, ela pode gravar
// em ADMIN_KEYS.studioLearnSection; sem isso, cai direto no fallback público
// fixo abaixo. Nunca depende só do localStorage para aparecer.
function readAdminLearnSection() {
  return getAdminContent(ADMIN_KEYS.studioLearnSection, null)
}

// Imagens oficiais de produção — ficam em /public, então sobem junto com o
// deploy independente do que estiver salvo no localStorage do Admin Visual.
const HERO_IMAGE_FALLBACK = '/images/studio-pay/cursos-hero.webp'
const CARD_IMAGE_FALLBACK = '/images/studio-pay/cursos-realismo-card.webp'

// Exibe a imagem (admin ou fallback fixo); só cai para o placeholder se
// nenhuma imagem existir ou se a imagem informada falhar ao carregar.
function FallbackImage({ src, alt, className, placeholderIcon: PlaceholderIcon, placeholderLabel }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="core-image-placeholder">
        <span className="core-image-placeholder-icon">
          <PlaceholderIcon size={26} strokeWidth={1.5} />
        </span>
        <p>{placeholderLabel}</p>
      </div>
    )
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
}

// Destaca uma ou mais palavras/expressões específicas dentro de um texto.
function highlightWords(text, words) {
  if (!text || !words?.length) return text
  const pattern = new RegExp(`(${words.join('|')})`, 'gi')
  return text.split(pattern).map((part, i) =>
    words.some((w) => w.toLowerCase() === part.toLowerCase())
      ? <span key={i} className="landing-accent">{part}</span>
      : part
  )
}

// ── Data ──────────────────────────────────────────────────────

const heroBenefits = [
  { Icon: Award, title: 'Grandes tatuadores', text: 'Aulas com profissionais reconhecidos no mercado.' },
  { Icon: Percent, title: 'Preço de assinante', text: 'Condições melhores do que comprar o curso fora da plataforma.' },
  { Icon: TrendingUp, title: 'Técnica e negócio', text: 'Conteúdos para evoluir a arte, o atendimento e a gestão.' },
  { Icon: Sparkles, title: 'Crescimento contínuo', text: 'Aprenda, aplique e cresça dentro do ecossistema Studio Pay.' },
]

const valueBenefits = [
  { Icon: Percent, title: 'Menor custo para aprender', text: 'O assinante acessa cursos com condições especiais dentro do Studio Pay.' },
  { Icon: GraduationCap, title: 'Conteúdo de alto nível', text: 'Técnica, estilo, gestão e posicionamento com profissionais experientes.' },
  { Icon: TrendingUp, title: 'Evolução que gera retorno', text: 'Quanto mais o tatuador evolui, melhor atende, vende e valoriza o próprio trabalho.' },
]

// ── Mockup do card de curso ───────────────────────────────────
// Topo com foto real de tatuador trabalhando (fallback público fixo);
// se a imagem não carregar, mantém o gradiente escuro com o ícone de
// play, sem quebrar o card.

function CourseCardThumb({ image }) {
  const [failed, setFailed] = useState(false)
  const showImage = image && !failed

  return (
    <div className={`courses-mockup-thumb${showImage ? ' has-image' : ''}`}>
      {showImage && (
        <img
          src={image}
          alt="Sessão de tatuagem realista em andamento"
          className="courses-mockup-thumb-img"
          onError={() => setFailed(true)}
        />
      )}
      <span className="courses-mockup-thumb-icon"><Play size={22} strokeWidth={1.8} /></span>
    </div>
  )
}

function CourseCardMockup({ image }) {
  return (
    <div className="courses-mockup" aria-hidden="true">
      <CourseCardThumb image={image} />
      <div className="courses-mockup-body">
        <h3 className="courses-mockup-title">Realismo Preto e Cinza</h3>
        <p className="courses-mockup-instructor">com Emerson Barros, referência em realismo</p>

        <div className="courses-mockup-meta">
          <span className="courses-mockup-meta-item"><Star size={13} strokeWidth={2} /> 4.9</span>
          <span className="courses-mockup-meta-item"><Clock size={13} strokeWidth={2} /> 12h de conteúdo</span>
        </div>

        <div className="courses-mockup-prices">
          <div className="courses-mockup-price-row">
            <span>Fora da plataforma</span>
            <span className="courses-mockup-price-out">R$ 497,00</span>
          </div>
          <div className="courses-mockup-price-row">
            <span>Cliente Studio Pay</span>
            <span className="courses-mockup-price-in">R$ 297,00</span>
          </div>
        </div>

        <div className="courses-mockup-savings">Economize R$ 200,00</div>

        <span className="courses-mockup-btn">Acessar condição</span>
      </div>
    </div>
  )
}

// ── Seção 1 — Hero Cursos ────────────────────────────────────

function CoursesHeroSection({ image }) {
  return (
    <section className="courses-hero">
      <div className="courses-hero-glow" />
      <div className="container">
        <div className="courses-hero-inner">
          <Reveal className="courses-hero-copy-area">
            <div className="courses-hero-copy">
              <span className="section-label">Cursos Studio Pay</span>
              <h1 className="courses-hero-title">
                Aprenda com referências da tatuagem<br />
                <span className="landing-accent">pagando menos</span> por ser Studio Pay.
              </h1>
              <p className="courses-hero-sub">
                Acesse cursos dos maiores tatuadores do Brasil com condições especiais para evoluir sua técnica,
                melhorar sua gestão e crescer como profissional.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="courses-hero-visual-area">
            <div className="courses-visual">
              <FallbackImage
                src={image}
                alt="Área de cursos do Studio Pay"
                className="courses-visual-img"
                placeholderIcon={GraduationCap}
                placeholderLabel="Imagem da área de cursos"
              />
            </div>
          </Reveal>

          <Reveal delay={160} className="courses-hero-cards-area">
            <div className="core-solution-grid courses-benefits">
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
          <p className="core-pill courses-pill">
            {highlightWords(
              'Conhecimento, técnica e crescimento com vantagem para quem vive da tatuagem.',
              ['vantagem']
            )}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção 2 — Vantagem para assinantes ───────────────────────

function CoursesValueSection({ cardImage }) {
  return (
    <section className="courses-value module-section">
      <div className="courses-value-glow" />
      <div className="container">
        <div className="courses-value-grid">
          <Reveal className="courses-value-visual-area">
            <CourseCardMockup image={cardImage} />
          </Reveal>

          <Reveal delay={100} className="courses-value-text-area">
            <span className="section-label">Vantagem para assinantes</span>
            <h2 className="section-title courses-value-title">
              O mesmo curso, uma{' '}
              {highlightWords('condição melhor', ['condição melhor'])} para quem é Studio Pay.
            </h2>
            <p className="section-sub courses-value-sub">
              Cursos que normalmente custariam mais fora da plataforma chegam ao assinante com valores especiais,
              combos e benefícios exclusivos.
            </p>

            <div className="courses-value-benefits">
              {valueBenefits.map(({ Icon, title, text }) => (
                <div key={title} className="courses-value-benefit-row">
                  <span className="core-solution-icon"><Icon size={19} strokeWidth={1.8} /></span>
                  <div>
                    <h3 className="core-solution-title">{title}</h3>
                    <p className="core-solution-text">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <p className="core-pill courses-pill">
            {highlightWords(
              'Aprenda melhor, cobre melhor e cresça com uma plataforma feita para quem vive da tatuagem.',
              ['cobre melhor']
            )}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default function StudioLearnPage() {
  const admin = readAdminLearnSection()
  const heroImage = admin?.heroImage || HERO_IMAGE_FALLBACK
  const cardImage = admin?.cardImage || CARD_IMAGE_FALLBACK

  return (
    <PublicSiteShell>
      <Navbar />
      <main className="module-page courses-page">
        <CoursesHeroSection image={heroImage} />
        <CoursesValueSection cardImage={cardImage} />
      </main>
      <Footer />
    </PublicSiteShell>
  )
}
