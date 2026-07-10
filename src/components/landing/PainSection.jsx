import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Tags } from 'lucide-react'
import Reveal from './Reveal'
import { LANDING_SHOP_COPY_VERSION } from '@/utils/adminContent'

// Imagens oficiais de produção — ficam em /public, então sobem junto com o
// deploy independente do que estiver salvo no localStorage do Admin Visual.
const FALLBACK_ITEMS = [
  { title: 'Tintas selecionadas', badge: 'Condição exclusiva', regularPrice: 'R$ 89,90', studioPrice: 'R$ 79,90', savings: 'R$ 10,00', image: '/images/studio-pay/shop/shop-tintas.webp' },
  { title: 'Cartuchos',           badge: 'Benefício Pro',       regularPrice: 'R$ 120,00', studioPrice: 'R$ 105,00', savings: 'R$ 15,00', image: '/images/studio-pay/shop/shop-cartuchos.webp' },
  { title: 'Luvas e descartáveis', badge: 'Benefício por plano', regularPrice: 'R$ 44,90', studioPrice: 'R$ 39,90', savings: 'R$ 5,00', image: '/images/studio-pay/shop/shop-luvas.webp' },
]

// Mostra a imagem do produto (admin ou fallback fixo em /public); só cai
// para o placeholder circular se nenhuma das duas existir/carregar.
function ShopProductImage({ src, alt }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <span className="shop-product-fallback">
        <span className="shop-product-fallback-mark" />
      </span>
    )
  }
  return <img src={src} alt={alt} className="shop-product-img" onError={() => setFailed(true)} />
}

// Ignora qualquer copy salva no localStorage que não tenha a versão
// atual (_v) — isso migra automaticamente navegadores com uma copy
// antiga (salva antes desta atualização de texto) de volta para os
// textos padrão novos, sem precisar de ação manual no Admin.
function readAdminShopSection() {
  try {
    const parsed = JSON.parse(localStorage.getItem('studioPayAdmin_landingShopSection') || 'null')
    return parsed && parsed._v === LANDING_SHOP_COPY_VERSION ? parsed : null
  } catch {
    return null
  }
}

function withCurrency(val) {
  if (!val) return val
  const s = String(val).trim()
  return /^R\$/.test(s) ? s : `R$ ${s}`
}

const HIGHLIGHT_TERMS = ['Studio Pay', 'Studio Pro\\.?']
const HIGHLIGHT_PATTERN = new RegExp(`(${HIGHLIGHT_TERMS.join('|')})`, 'gi')

function highlightText(text) {
  if (!text) return text
  return String(text)
    .split(HIGHLIGHT_PATTERN)
    .map((part, index) =>
      HIGHLIGHT_TERMS.some((term) => term.toLowerCase() === part.toLowerCase())
        ? <strong key={index} className="landing-accent">{part}</strong>
        : part
    )
}

export default function PainSection() {
  const admin = readAdminShopSection()

  const label          = admin?.label          || 'STUDIO SHOP'
  const title          = admin?.title          || 'Seu lucro começa na compra.'
  const highlightTitle = admin?.highlightTitle || 'Conheça as vantagens dos assinantes Studio Pro.'
  const subtitle       = admin?.subtitle       || 'Obtenha acesso aos melhores produtos do Brasil na Shop Studio Pay.'

  const items = admin?.cards
    ? admin.cards
        .filter(c => c.active !== false)
        .map((c, i) => ({
          title:        c.title  || FALLBACK_ITEMS[i]?.title || '',
          badge:        c.badge  || FALLBACK_ITEMS[i]?.badge || '',
          regularPrice: c.normalPrice ? withCurrency(c.normalPrice) : (FALLBACK_ITEMS[i]?.regularPrice || ''),
          studioPrice:  c.proPrice    ? withCurrency(c.proPrice)    : (FALLBACK_ITEMS[i]?.studioPrice  || ''),
          savings:      c.savingText  ? withCurrency(c.savingText)  : (FALLBACK_ITEMS[i]?.savings      || ''),
          image:        c.image        || FALLBACK_ITEMS[i]?.image || null,
        }))
    : FALLBACK_ITEMS

  return (
    <section className="pain-section shop-benefits-section" id="studio-shop">
      <div className="container">
        <Reveal>
          <div className="shop-benefits-header">
            <span className="section-label">{label}</span>
            <h2 className="section-title shop-benefits-title">
              {highlightText(title)}<br />
              {highlightText(highlightTitle)}
            </h2>
            <p className="section-sub">{subtitle}</p>
          </div>
        </Reveal>

        <div className="shop-showcase">
          {items.map((item, index) => (
            <Reveal key={item.title + index} delay={index * 120}>
              <article className="shop-showcase-card">
                <div className="shop-product-media" aria-hidden={!item.image}>
                  <ShopProductImage src={item.image} alt={item.title} />
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
                    <dd>Economize <span className="shop-savings-value">{item.savings}</span></dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={180}>
          <div className="shop-benefits-footer">
            <p>Clique no botão abaixo e comece agora mesmo!</p>
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
