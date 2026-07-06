import { useState } from 'react'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import PublicSiteShell from '@/components/landing/PublicSiteShell'
import Reveal from '@/components/landing/Reveal'
import { getAdminContent, ADMIN_KEYS } from '@/utils/adminContent'
import {
  ShoppingBag, Percent, Package, Lightbulb, Star,
  DollarSign, TrendingDown, Layers,
} from 'lucide-react'

// ── Admin-swappable content (opcional — sem UI de edição nesta rodada) ──
// Se no futuro existir uma aba de Admin para o Studio Shop público, ela pode
// gravar em ADMIN_KEYS.studioShopSection; sem isso, cai direto no fallback
// público fixo abaixo. Nunca depende só do localStorage para aparecer.
function readAdminShopSection() {
  return getAdminContent(ADMIN_KEYS.studioShopSection, null)
}

// Imagens oficiais de produção — ficam em /public, então sobem junto com o
// deploy independente do que estiver salvo no localStorage do Admin Visual.
// Mockups demonstrativos da landing (não é o catálogo/produto real do Shop).
const CATALOG_IMAGE_FALLBACK = '/images/studio-pay/shop-hero.webp'
const PRODUCT_IMAGE_FALLBACK = '/images/studio-pay/shop-product.webp'

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

const catalogBenefits = [
  { Icon: Percent, title: 'Até 40% de desconto', text: 'Compre com condições exclusivas em produtos selecionados.' },
  { Icon: Package, title: 'Produtos da rotina real', text: 'Tintas, cartuchos, descartáveis, fontes e acessórios.' },
  { Icon: Lightbulb, title: 'Compra inteligente', text: 'Reduza custo recorrente do estúdio sem depender de pesquisa manual.' },
  { Icon: Star, title: 'Vantagem para assinante', text: 'Quem usa Studio Pay encontra condições melhores dentro do ecossistema.' },
]

const productBenefits = [
  { Icon: DollarSign, title: 'Preço especial para cliente Studio Pay', text: 'O assinante encontra valores mais vantajosos em produtos selecionados.' },
  { Icon: TrendingDown, title: 'Mais economia por compra', text: 'A vantagem aparece no dia a dia, especialmente em itens recorrentes do estúdio.' },
  { Icon: Layers, title: 'Ecossistema que ajuda no lucro', text: 'O Studio Pay organiza a operação e ainda reduz custo na compra dos insumos.' },
]

const productTags = ['Até 40% OFF', 'Condições exclusivas', 'Benefício para assinante']

// ── Seção 1 — Vitrine / Catálogo ─────────────────────────────

function ShopCatalogSection({ image }) {
  return (
    <section className="shop-catalog module-section">
      <div className="shop-catalog-glow" />
      <div className="container">
        <Reveal>
          <div className="section-header-center">
            <span className="section-label">Studio Shop</span>
            <h2 className="section-title shop-catalog-title">
              Seu lucro também começa na compra.<br />
              Produtos com <span className="landing-accent">vantagem</span> para quem usa Studio Pay.
            </h2>
            <p className="section-sub">
              Com o Studio Shop, assinantes Studio Pay acessam produtos, kits e condições pensadas para reduzir
              custos na rotina do estúdio.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="shop-catalog-visual">
            <FallbackImage
              src={image}
              alt="Catálogo do Studio Shop"
              className="shop-catalog-visual-img"
              placeholderIcon={ShoppingBag}
              placeholderLabel="Imagem do catálogo"
            />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="core-solution-grid shop-catalog-cards">
            {catalogBenefits.map(({ Icon, title, text }, i) => (
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

        <Reveal delay={220}>
          <p className="core-pill">
            {highlightWords(
              'Produtos que você já usa, com preços e condições pensadas para quem vive da tatuagem.',
              ['quem vive da tatuagem.']
            )}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── Seção 2 — Produto em destaque / condição exclusiva ───────

function ShopDetailSection({ image }) {
  return (
    <section className="shop-detail module-section">
      <div className="shop-detail-glow" />
      <div className="container">
        <div className="shop-detail-grid">
          <Reveal className="shop-detail-visual-area">
            <div className="shop-detail-visual">
              <FallbackImage
                src={image}
                alt="Produto em destaque do Studio Shop"
                className="shop-detail-visual-img"
                placeholderIcon={Package}
                placeholderLabel="Imagem do produto"
              />
            </div>
            <div className="shop-detail-tags">
              {productTags.map((tag) => (
                <span key={tag} className="shop-detail-tag">{tag}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="shop-detail-text-area">
            <span className="section-label">Condições exclusivas</span>
            <h2 className="section-title shop-detail-title">
              Não é só comprar.<br />
              É <span className="landing-accent">comprar melhor</span> com o Studio Pay.
            </h2>
            <p className="section-sub shop-detail-sub">
              Veja preços especiais, vantagens por plano e benefícios que ajudam o tatuador a economizar em cada
              compra.
            </p>

            <div className="shop-detail-benefits">
              {productBenefits.map(({ Icon, title, text }) => (
                <div key={title} className="shop-detail-benefit-row">
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
          <p className="core-pill">
            {highlightWords(
              'Menos custo por compra, mais margem no estúdio e um ecossistema que trabalha a seu favor.',
              ['trabalha a seu favor.']
            )}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default function StudioShopPage() {
  const admin = readAdminShopSection()
  const catalogImage = admin?.catalogImage || CATALOG_IMAGE_FALLBACK
  const productImage = admin?.productImage || PRODUCT_IMAGE_FALLBACK

  return (
    <PublicSiteShell>
      <Navbar />
      <main className="module-page shop-page">
        <ShopCatalogSection image={catalogImage} />
        <ShopDetailSection image={productImage} />
      </main>
      <Footer />
    </PublicSiteShell>
  )
}
