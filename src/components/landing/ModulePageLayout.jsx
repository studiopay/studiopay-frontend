import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Reveal from './Reveal'
import PublicSiteShell from './PublicSiteShell'

function LineList({ items }) {
  return (
    <div className="module-line-list">
      {items.map((item, index) => (
        <Reveal key={item} delay={index * 45}>
          <div className="module-line-item">{item}</div>
        </Reveal>
      ))}
    </div>
  )
}

export default function ModulePageLayout({
  page,
  heroContent,
  sectionTwoContent,
  sectionThreeContent,
  solutionContent,
  practicalContent,
  benefitsContent,
  finalCtaContent,
}) {
  return (
    <PublicSiteShell>
      <Navbar />
      <main className="module-page">
        {heroContent || (
          <section className="module-hero">
            <div className="container module-hero-inner">
              <Reveal>
                <span className="section-label">{page.eyebrow}</span>
                <h1 className="module-title">{page.headline}</h1>
                <p className="module-subtitle">{page.subheadline}</p>
                <Link to="/cadastro" className="btn btn-primary btn-lg">
                  {page.cta}
                </Link>
              </Reveal>
            </div>
          </section>
        )}

        {sectionTwoContent || (
          <section className="module-section">
            <div className="container module-two-col">
              <Reveal>
                <div>
                  <span className="section-label">O problema</span>
                  <h2 className="section-title">O caos parece pequeno, até virar rotina.</h2>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <p className="module-large-text">{page.problem}</p>
              </Reveal>
            </div>
          </section>
        )}

        {sectionThreeContent}

        {solutionContent || (
          <section className="module-section">
            <div className="container">
              <Reveal>
                <div className="section-header-center">
                  <span className="section-label">O que resolve</span>
                  <h2 className="section-title">A função certa para tirar isso da cabeça.</h2>
                </div>
              </Reveal>
              <LineList items={page.solution} />
            </div>
          </section>
        )}

        {practicalContent || ((page.examples || page.servicePlans || page.note || page.practical) && (
          <section className="module-section module-practical-section">
            <div className="container module-two-col">
              <Reveal>
                <div>
                  <span className="section-label">Exemplo prático</span>
                  <h2 className="section-title">Como isso aparece no dia a dia.</h2>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="module-practical">
                  {page.practical && <p>{page.practical}</p>}
                  {page.note && <p>{page.note}</p>}
                  {page.examples && page.examples.map((item) => <p key={item}>“{item}”</p>)}
                  {page.servicePlans && page.servicePlans.map((item) => <p key={item}>{item}</p>)}
                </div>
              </Reveal>
            </div>
          </section>
        ))}

        {benefitsContent || (
          <section className="module-section">
            <div className="container">
              <Reveal>
                <div className="section-header-center">
                  <span className="section-label">Benefícios</span>
                  <h2 className="section-title">Menos improviso. Mais operação.</h2>
                </div>
              </Reveal>
              <LineList items={page.benefits} />
            </div>
          </section>
        )}

        {finalCtaContent || (
          <section className="module-final-cta">
            <div className="container">
              <Reveal>
                <h2 className="footer-cta-title">Você cria. <span className="text-pink">A gente organiza.</span></h2>
                <p className="footer-cta-sub">Comece pela parte da rotina que mais pesa hoje.</p>
                <Link to="/cadastro" className="btn btn-primary btn-lg">{page.cta}</Link>
              </Reveal>
            </div>
          </section>
        )}
      </main>
      <Footer showCta={false} />
    </PublicSiteShell>
  )
}
