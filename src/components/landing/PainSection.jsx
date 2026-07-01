import { Link } from 'react-router-dom'
import { ArrowRight, Tags } from 'lucide-react'
import Reveal from './Reveal'

const FALLBACK_ITEMS = [
  { title: 'Tintas selecionadas', badge: 'Condição exclusiva', regularPrice: 'R$ 89,90', studioPrice: 'R$ 79,90', savings: 'R$ 10,00' },
  { title: 'Cartuchos',           badge: 'Benefício Pro',       regularPrice: 'R$ 120,00', studioPrice: 'R$ 105,00', savings: 'R$ 15,00' },
  { title: 'Luvas e descartáveis', badge: 'Benefício por plano', regularPrice: 'R$ 44,90', studioPrice: 'R$ 39,90', savings: 'R$ 5,00' },
]

function readAdminShopSection() {
  try { return JSON.parse(localStorage.getItem('studioPayAdmin_landingShopSection') || 'null') } catch { return null }
}

function withCurrency(val) {
  if (!val) return val
  const s = String(val).trim()
  return /^R\$/.test(s) ? s : `R$ ${s}`
}

export default function PainSection() {
  const admin = readAdminShopSection()

  const label          = admin?.label          || 'Studio Shop'
  const title          = admin?.title          || 'Produtos que você já compra.'
  const highlightTitle = admin?.highlightTitle || 'Com vantagem pra quem usa Studio Pay.'
  const subtitle       = admin?.subtitle       || 'O Studio Shop conecta assinantes a produtos, kits e benefícios pensados para a rotina real do tatuador.'

  const items = admin?.cards
    ? admin.cards
        .filter(c => c.active !== false)
        .map((c, i) => ({
          title:        c.title  || FALLBACK_ITEMS[i]?.title || '',
          badge:        c.badge  || FALLBACK_ITEMS[i]?.badge || '',
          regularPrice: c.normalPrice ? withCurrency(c.normalPrice) : (FALLBACK_ITEMS[i]?.regularPrice || ''),
          studioPrice:  c.proPrice    ? withCurrency(c.proPrice)    : (FALLBACK_ITEMS[i]?.studioPrice  || ''),
          savings:      c.savingText  ? withCurrency(c.savingText)  : (FALLBACK_ITEMS[i]?.savings      || ''),
          image:        c.image        || null,
        }))
    : FALLBACK_ITEMS

  return (
    <section className="pain-section shop-benefits-section">
      <div className="container">
        <Reveal>
          <div className="shop-benefits-header">
            <span className="section-label">{label}</span>
            <h2 className="section-title">
              {title}<br />
              <span className="text-pink">{highlightTitle}</span>
            </h2>
            <p className="section-sub">{subtitle}</p>
          </div>
        </Reveal>

        <div className="shop-showcase">
          {items.map((item, index) => (
            <Reveal key={item.title + index} delay={index * 55}>
              <article className="shop-showcase-card">
                <div className="shop-product-media" aria-hidden={!item.image}>
                  {item.image
                    ? <img src={item.image} alt={item.title} className="shop-product-img" />
                    : <span className="shop-product-fallback">
                        <span className="shop-product-fallback-mark" />
                      </span>
                  }
                </div>

                <h3>{item.title}</h3>

                <div className="shop-card-topline">
                  <Tags size={15} strokeWidth={1.8} />
                  <span>{item.badge}</span>
                </div>

                <dl className="shop-price-list">
                  <div className="shop-regular-price">
                    <dt>Preço normal</dt>
                    <dd>{item.regularPrice}</dd>
                  </div>
                  <div className="shop-pay-price">
                    <dt>Cliente Studio Pay</dt>
                    <dd>{item.studioPrice}</dd>
                  </div>
                  <div className="shop-savings-price">
                    <dt>Economia demonstrativa</dt>
                    <dd>{item.savings}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={180}>
          <div className="shop-benefits-footer">
            <p>Mais controle no sistema. Mais vantagem na compra dos insumos.</p>
            <div className="shop-benefits-actions">
              <Link to="/studio-shop" className="btn btn-primary btn-lg">
                Ver benefícios do Shop <ArrowRight size={18} />
              </Link>
              <Link to="/studio-shop" className="shop-inline-link">
                Como funciona para assinantes
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
