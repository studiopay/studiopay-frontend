import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, ChevronRight, Heart, ShoppingCart,
  Shield, Truck, Check, Star, Minus, Plus,
  Package, Trash2, Clock, X,
} from 'lucide-react'
import { useShopCart } from '@/hooks/useShopCart'

// ─────────────────────────────────────
// DADOS MOCK
// ─────────────────────────────────────

const PRODUTOS_MAP = {
  1: { nome: 'Pen Machine Pro X5',            cat: 'Máquinas',   marca: 'Studio Pro Series', precoAnt: 749.90, preco: 524.90, precoPro: 479.90, parcelas: 3,    desconto: 30, cor: '#8B5CF6', cashback: 2, rating: 4.8, reviews: 124, coresNome: ['Preto', 'Grafite', 'Vinho'],       desc: 'Pen machine profissional para traço e pintura. Motor rotativo de alta precisão, grip ergonômico e tensão ajustável. Compatível com cartuchos padrão RCA e Clip Cord.', features: ['Motor rotativo silencioso de alta precisão', 'Tensão regulável de 5 a 12V', 'Compatível com cartuchos RCA e Clip Cord', 'Peso: 130g com grip', 'Acabamento em alumínio anodizado', 'Garantia de 12 meses'] },
  2: { nome: 'Kit Cartuchos RL — 25 un.',     cat: 'Cartuchos',  marca: 'CartPro',            precoAnt: null,   preco: 119.90, precoPro: 103.90, parcelas: null, desconto: null, cor: '#3B82F6', cashback: 2, rating: 4.6, reviews: 89,  coresNome: ['Padrão'],                         desc: 'Kit com 25 cartuchos RL (Round Liner) de alta qualidade para trabalhos de traço e contorno. Ponta membranada que evita refluxo de tinta.', features: ['Ponta membranada anti-refluxo', 'Aço cirúrgico AISI 316L', 'Embalagem individual estéril', 'Compatível com a maioria das pen machines', 'Calibre 0.35mm'] },
  3: { nome: 'Tinta Preta Profissional 300ml', cat: 'Tintas',    marca: 'InkMaster',          precoAnt: 89.90,  preco: 64.90,  precoPro: 56.90,  parcelas: null, desconto: 28, cor: '#EC4899', cashback: 2, rating: 4.9, reviews: 211, coresNome: ['Preta Densa'],                     desc: 'Tinta preta profissional de alta densidade para linhas fortes e sólidas. Fórmula vegana, dermatologicamente testada e aprovada.', features: ['Fórmula vegana e cruelty-free', 'Alta densidade de pigmento', 'Dermatologicamente testada', 'Não contém metais pesados', 'Aprovada para uso profissional'] },
  4: { nome: 'Kit Descartáveis para Sessão',  cat: 'Higiene',    marca: 'SafeInk',            precoAnt: null,   preco: 89.90,  precoPro: 79.90,  parcelas: null, desconto: null, cor: '#22C55E', cashback: 2, rating: 4.7, reviews: 156, coresNome: ['Kit completo'],                    desc: 'Kit completo com todos os descartáveis essenciais para uma sessão profissional segura. Inclui luvas, batoques, plástico filme e mais.', features: ['Luvas de nitrilo tamanho M/G', 'Batoques coloridos 50un', 'Plástico filme para maca', 'Caixinhas de tinta 100un', 'Sacos para maquina 10un'] },
  5: { nome: 'Fonte Digital Bivolt 2A',        cat: 'Acessórios', marca: 'PowerPro',           precoAnt: 389.90, preco: 289.90, precoPro: 259.90, parcelas: 3,    desconto: 26, cor: '#F59E0B', cashback: 3, rating: 4.5, reviews: 67,  coresNome: ['Preto'],                          desc: 'Fonte digital bivolt para máquinas de tatuar com display LCD e ajuste preciso de voltagem. Saídas Clip Cord e RCA.', features: ['Display LCD digital', 'Tensão 1,5 a 18V ajustável', 'Bivolt automático 110/220V', 'Saídas RCA e Clip Cord', 'Proteção contra sobretensão', 'Cabo de pedal incluso'] },
  6: { nome: 'Suporte Ergonômico Premium',    cat: 'Acessórios', marca: 'StudioGear',         precoAnt: null,   preco: 179.90, precoPro: 159.90, parcelas: 2,    desconto: null, cor: '#F97316', cashback: 2, rating: 4.4, reviews: 43,  coresNome: ['Preto', 'Branco'],               desc: 'Apoio de braço ergonômico ajustável em altura e ângulo para sessões prolongadas. Encosto em espuma de alta densidade.', features: ['Altura ajustável de 20 a 35cm', 'Encosto em espuma D28', 'Base em aço reforçado', 'Suporta até 50kg', 'Fácil de higienizar'] },
  7: { nome: 'Kit Pós-Tattoo para Cliente',   cat: 'Higiene',    marca: 'AfterInk',           precoAnt: null,   preco: 39.90,  precoPro: 32.90,  parcelas: null, desconto: null, cor: '#14B8A6', cashback: 2, rating: 4.8, reviews: 198, coresNome: ['Kit padrão'],                     desc: 'Kit completo de cuidados pós-tattoo para entregar ao cliente ao final da sessão. Ajuda na cicatrização e agrega valor ao atendimento.', features: ['Pomada cicatrizante 30g', 'Filme protetor transparente', 'Orientações impressas em cartão', 'Embalagem personalizada', 'Fórmula sem parabenos'] },
  8: { nome: 'Filme Protetor Rolo 50m',       cat: 'Higiene',    marca: 'ProtectPro',         precoAnt: 49.90,  preco: 34.90,  precoPro: 28.90,  parcelas: null, desconto: 30, cor: '#6366f1', cashback: 2, rating: 4.6, reviews: 312, coresNome: ['Transparente'],                   desc: 'Rolo de filme protetor transparente para maca e superfícies de trabalho. Fácil aplicação e remoção, sem resíduo de cola.', features: ['50 metros por rolo', 'Largura de 50cm', 'Transparente e atóxico', 'Sem resíduo de cola', 'Corte fácil sem ferramenta'] },
}

function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Array derivado de PRODUTOS_MAP (mesmos ids 1–8 do catálogo em
// Shop.jsx) só para o hook de carrinho conseguir resolver nome/preço
// de qualquer item, mesmo os adicionados a partir da listagem mobile.
const PRODUTOS_ARRAY = Object.entries(PRODUTOS_MAP).map(([pid, p]) => ({ id: Number(pid), ...p }))

// Placeholder premium para item do carrinho sem imagem — ícone +
// fundo escuro/gradiente sutil, sem bloco colorido genérico.
function CartItemMedia({ produto }) {
  return produto.imagem
    ? <img src={produto.imagem} alt={produto.nome} className="mob-shop-cart-item-img" />
    : <Package size={18} strokeWidth={1.6} className="mob-shop-media-icon" />
}

// ─────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────

function readAdmin(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback }
}

export default function ShopProduto() {
  const navigate  = useNavigate()
  const { id }    = useParams()

  // Se houver produtos do admin, usa o admin; caso contrário usa PRODUTOS_MAP
  const adminProducts = readAdmin('studioPayAdmin_shopProducts', null)
  const adminProduto  = adminProducts?.find(p => String(p.id) === String(id))

  // Merge: admin tem campos básicos, PRODUTOS_MAP tem campos extras (rating, cores, desc, features)
  const base    = PRODUTOS_MAP[id] || PRODUTOS_MAP[1]
  const produto = adminProduto
    ? {
        ...base,
        ...adminProduto,
        features: Array.isArray(adminProduto.features) ? adminProduto.features : base.features,
        desc: adminProduto.desc || base.desc,
        marca: adminProduto.marca || base.marca,
        rating: base.rating,
        reviews: base.reviews,
        coresNome: base.coresNome,
      }
    : base

  const precoStarter = produto.precoPro
    ? Math.round((produto.preco + produto.precoPro) / 2 * 100) / 100
    : null

  // Id numérico real do produto exibido (mesmo fallback do "base"
  // acima, para o carrinho sempre corresponder ao que está na tela).
  const produtoId = PRODUTOS_MAP[id] ? Number(id) : 1

  const [fotoAtiva, setFotoAtiva] = useState(0)
  const [corAtiva, setCorAtiva]   = useState(0)
  const [qtd, setQtd]             = useState(1)
  const [fav, setFav]             = useState(false)

  // Carrinho local — MESMO hook/chave (studiopay_shop_cart) usado
  // pela listagem mobile (MobileShopPage.jsx), então um item
  // adicionado aqui aparece lá e vice-versa. Sem backend/checkout real.
  const {
    items: cartItems,
    addItem,
    increment,
    decrement,
    removeItem,
    totalQuantity,
    subtotal,
    savings,
  } = useShopCart(PRODUTOS_ARRAY)
  const [showCart, setShowCart] = useState(false)
  const [checkoutNotice, setCheckoutNotice] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 1800)
    return () => clearTimeout(t)
  }, [toast])

  function handleAddToCart() {
    addItem(produtoId, qtd)
    setToast('Adicionado ao carrinho')
  }
  function handleBuyNow() {
    addItem(produtoId, qtd)
    setCheckoutNotice(false)
    setShowCart(true)
  }
  function openCart() {
    setCheckoutNotice(false)
    setShowCart(true)
  }
  function closeCart() {
    setShowCart(false)
    setCheckoutNotice(false)
  }

  const FOTOS = 4
  const CORES_CSS = ['#1a1a2e', '#2c2c2e', '#4a1942', '#1c3a1c']

  return (
    <div className="animate-fade-in shop2-prod-page">

      {/* ── Carrinho — ícone discreto flutuante (a página não tinha
          nenhum acesso a carrinho antes). Mesmo carrinho local usado
          pela listagem mobile; não altera o layout existente abaixo,
          só sobrepõe um botão pequeno com badge. ── */}
      <button
        type="button"
        className="mob-shop-prod-cart-btn"
        onClick={openCart}
        aria-label={`Carrinho: ${totalQuantity} ${totalQuantity === 1 ? 'item' : 'itens'}`}
      >
        <ShoppingCart size={17} />
        {totalQuantity > 0 && <span className="mob-shop-cart-badge">{totalQuantity}</span>}
      </button>

      {/* ── Breadcrumb ──────────────────────────────── */}
      <nav className="shop2-prod-bc">
        <button className="shop2-prod-bc-btn" onClick={() => navigate('/app/shop')}>
          <ArrowLeft size={13} /> Studio Shop
        </button>
        <ChevronRight size={12} style={{ color: 'var(--app-text-muted)', flexShrink: 0 }} />
        <span style={{ fontSize: 13, color: 'var(--app-text-muted)' }}>{produto.cat}</span>
        <ChevronRight size={12} style={{ color: 'var(--app-text-muted)', flexShrink: 0 }} />
        <span style={{ fontSize: 13, color: 'var(--app-text)', fontWeight: 500 }}>{produto.nome}</span>
      </nav>

      {/* ── Main: gallery + info ────────────────────── */}
      <div className="shop2-prod-main">

        {/* Gallery */}
        <div className="shop2-prod-gallery">
          <div className="shop2-prod-img-main">
            <div style={{
              position: 'absolute', width: 200, height: 200, borderRadius: '50%',
              background: `${produto.cor}18`, filter: 'blur(48px)',
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            }} />
            {produto.desconto && (
              <span className="shop2-prod-badge-img">{produto.desconto}% OFF</span>
            )}
            <button
              className={`shop2-prod-fav-btn${fav ? ' active' : ''}`}
              onClick={() => setFav(v => !v)}
            >
              <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
            </button>
            {produto.imagem
              ? <img src={produto.imagem} alt={produto.nome} style={{ maxHeight: 220, maxWidth: '80%', objectFit: 'contain', position: 'relative', zIndex: 1, borderRadius: 12 }} />
              : (
                <div style={{
                  width: 120, height: 120, borderRadius: 30,
                  background: `${produto.cor}28`, border: `2px solid ${produto.cor}48`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', zIndex: 1,
                }}>
                  <div style={{ width: 10, height: 70, background: `${produto.cor}cc`, borderRadius: 5 }} />
                </div>
              )
            }
          </div>

          {/* Thumbnails */}
          <div className="shop2-prod-thumbs">
            {[...Array(FOTOS)].map((_, i) => (
              <button
                key={i}
                className={`shop2-prod-thumb${fotoAtiva === i ? ' active' : ''}`}
                onClick={() => setFotoAtiva(i)}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, ${produto.cor}${i === 0 ? '28' : '14'} 0%, ${produto.cor}06 100%)`,
                  borderRadius: 'inherit',
                }} />
                <div style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: `${produto.cor}${i === 0 ? '50' : '30'}`,
                  position: 'relative', zIndex: 1,
                }} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="shop2-prod-info">

          {/* Nome e marca */}
          <div className="shop2-prod-header">
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="shop2-prod-marca">{produto.marca}</p>
              <h1 className="shop2-prod-nome">{produto.nome}</h1>
            </div>
          </div>

          {/* Rating */}
          <div className="shop2-prod-rating">
            {[1, 2, 3, 4, 5].map(i => (
              <Star
                key={i}
                size={13}
                fill={i <= Math.floor(produto.rating) ? 'var(--yellow)' : 'none'}
                color="var(--yellow)"
              />
            ))}
            <span className="shop2-prod-rating-val">{produto.rating}</span>
            <span className="shop2-prod-rating-count">({produto.reviews} avaliações)</span>
          </div>

          {/* Preços */}
          <div className="shop2-prod-prices">
            {produto.precoAnt && (
              <p className="shop2-prod-preco-ant">De {fmt(produto.precoAnt)}</p>
            )}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <p className="shop2-prod-preco">{fmt(produto.preco)}</p>
              {produto.desconto && (
                <span className="shop2-prod-off">{produto.desconto}% OFF</span>
              )}
            </div>
            {produto.parcelas && (
              <p className="shop2-prod-parcel">
                {produto.parcelas}× de {fmt(produto.preco / produto.parcelas)} sem juros
              </p>
            )}

            {/* Comparação de planos */}
            {produto.precoPro && (
              <div className="shop2-prod-plans">
                <div className="shop2-prod-plan">
                  <p className="shop2-prod-plan-label">Padrão</p>
                  <p className="shop2-prod-plan-price">{fmt(produto.preco)}</p>
                </div>
                {precoStarter && (
                  <div className="shop2-prod-plan starter">
                    <p className="shop2-prod-plan-label">Studio Starter</p>
                    <p className="shop2-prod-plan-price">{fmt(precoStarter)}</p>
                    <p className="shop2-prod-plan-save">Economize {fmt(produto.preco - precoStarter)}</p>
                  </div>
                )}
                <div className="shop2-prod-plan pro">
                  <p className="shop2-prod-plan-label">Studio Pro</p>
                  <p className="shop2-prod-plan-price">{fmt(produto.precoPro)}</p>
                  <p className="shop2-prod-plan-save">Economize {fmt(produto.preco - produto.precoPro)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Cor */}
          <div className="shop2-prod-section">
            <p className="shop2-prod-section-label">
              Cor: <strong>{produto.coresNome[corAtiva]}</strong>
            </p>
            <div className="shop2-prod-cores">
              {produto.coresNome.map((nome, i) => (
                <button
                  key={i}
                  className={`shop2-prod-cor${corAtiva === i ? ' active' : ''}`}
                  style={{ background: CORES_CSS[i] || '#1a1a2e' }}
                  onClick={() => setCorAtiva(i)}
                  title={nome}
                />
              ))}
            </div>
          </div>

          {/* Quantidade */}
          <div className="shop2-prod-section">
            <p className="shop2-prod-section-label">Quantidade</p>
            <div className="shop2-prod-qty">
              <button className="shop2-prod-qty-btn" onClick={() => setQtd(v => Math.max(1, v - 1))}>
                <Minus size={14} />
              </button>
              <span className="shop2-prod-qty-val">{qtd}</span>
              <button className="shop2-prod-qty-btn" onClick={() => setQtd(v => v + 1)}>
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Ações — mesmo carrinho local (useShopCart) da listagem
              mobile; quantidade selecionada acima (qtd) é respeitada. */}
          <div className="shop2-prod-actions">
            <button className="shop2-prod-buy" onClick={handleBuyNow}>
              <ShoppingCart size={16} /> Comprar agora
            </button>
            <button className="shop2-prod-add" onClick={handleAddToCart}>
              Adicionar ao carrinho
            </button>
          </div>

          {/* Benefícios */}
          <div className="shop2-prod-bens">
            <div className="shop2-prod-ben">
              <Truck size={14} style={{ color: 'var(--app-text-muted)', flexShrink: 0 }} />
              <span>Frete grátis acima de R$ 199,00</span>
            </div>
            <div className="shop2-prod-ben">
              <Shield size={14} style={{ color: 'var(--app-text-muted)', flexShrink: 0 }} />
              <span>Garantia de 12 meses</span>
            </div>
            <div className="shop2-prod-ben">
              <Check size={14} style={{ color: '#6366f1', flexShrink: 0 }} />
              <span className="shop2-prod-ben-starter">Condição especial para Studio Starter</span>
            </div>
            <div className="shop2-prod-ben">
              <Check size={14} style={{ color: 'var(--pink)', flexShrink: 0 }} />
              <span className="shop2-prod-ben-pro">Melhor preço para Studio Pro</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Barra fixa de compra — só mobile (CSS esconde as ações
          inline em .shop2-prod-actions abaixo de 768px e mostra esta
          barra no lugar); no desktop nada muda, .shop2-prod-actions
          continua visível exatamente como antes. Mesmos handlers,
          respeita a quantidade (qtd) selecionada acima. ── */}
      <div className="mob-shop-prod-buybar">
        <button className="mob-shop-add-btn" onClick={handleAddToCart}>
          Adicionar ao carrinho
        </button>
        <button className="mob-charges-cta mob-shop-detail-cta" onClick={handleBuyNow}>
          <ShoppingCart size={15} /> Comprar agora
        </button>
      </div>

      {/* ── Detalhes e features ─────────────────────── */}
      <div className="shop2-prod-details">
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 15 }}>Sobre o produto</h3>
          <p style={{ fontSize: 14, color: 'var(--app-text-muted)', lineHeight: 1.75 }}>{produto.desc}</p>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Características</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {produto.features.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14 }}>
                <Check size={14} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 2 }} />
                <span style={{ color: 'var(--app-text)', lineHeight: 1.4 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom sheet do carrinho — mesmo carrinho local (useShopCart,
          chave "studiopay_shop_cart") da listagem mobile, sem
          API/banco/checkout real. Reaproveita as classes genéricas de
          bottom sheet e de item de carrinho já usadas em
          MobileShopPage.jsx, sem duplicar CSS. ── */}
      {showCart && (
        <div className="mob-charges-detail-overlay" onClick={closeCart}>
          <div className="mob-charges-detail-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mob-charges-detail-handle" />
            <div className="mob-charges-detail-head">
              <p className="mob-charges-detail-client">Carrinho</p>
              <button className="mob-charges-detail-close" onClick={closeCart} aria-label="Fechar">
                <X size={18} />
              </button>
            </div>

            {checkoutNotice ? (
              <div className="mob-shop-checkout-notice">
                <span className="mob-shop-checkout-notice-icon"><Clock size={20} /></span>
                <p className="mob-shop-checkout-notice-title">Finalização em breve</p>
                <p className="mob-shop-checkout-notice-text">
                  O checkout do Studio Shop será conectado ao fluxo oficial de compra.
                </p>
                <button className="mob-charges-cta mob-shop-checkout-back" onClick={closeCart}>
                  Entendi
                </button>
              </div>
            ) : cartItems.length > 0 ? (
              <>
                <div className="mob-shop-cart-items">
                  {cartItems.map(({ id: itemId, qty, product }) => (
                    <div key={itemId} className="mob-shop-cart-item">
                      <div className="mob-shop-cart-item-media">
                        <CartItemMedia produto={product} />
                      </div>
                      <div className="mob-shop-cart-item-body">
                        <p className="mob-shop-cart-item-nome">{product.nome}</p>
                        <p className="mob-shop-cart-item-preco">{fmt(product.precoPro ?? product.preco)}</p>
                        <div className="mob-shop-cart-item-row">
                          <div className="mob-shop-qty-control mob-shop-qty-control-sm">
                            <button type="button" className="mob-shop-qty-btn" onClick={() => decrement(itemId)} aria-label="Diminuir quantidade">
                              <Minus size={12} />
                            </button>
                            <span className="mob-shop-qty-value">{qty}</span>
                            <button type="button" className="mob-shop-qty-btn" onClick={() => increment(itemId)} aria-label="Aumentar quantidade">
                              <Plus size={12} />
                            </button>
                          </div>
                          <button type="button" className="mob-shop-cart-item-remove" onClick={() => removeItem(itemId)} aria-label={`Remover ${product.nome}`}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mob-charges-detail-rows">
                  <div className="mob-charges-detail-row">
                    <span>Itens</span>
                    <span className="mob-charges-detail-row-value">{totalQuantity}</span>
                  </div>
                  {savings > 0 && (
                    <div className="mob-charges-detail-row">
                      <span>Economia total</span>
                      <span className="mob-charges-status green">{fmt(savings)}</span>
                    </div>
                  )}
                  <div className="mob-charges-detail-row">
                    <span>Subtotal</span>
                    <span className="mob-charges-detail-row-value mob-shop-cart-subtotal">{fmt(subtotal)}</span>
                  </div>
                </div>

                <div className="mob-shop-detail-actions">
                  <button className="mob-shop-add-btn" onClick={closeCart}>Continuar comprando</button>
                  <button className="mob-charges-cta mob-shop-detail-cta" onClick={() => setCheckoutNotice(true)}>
                    Finalizar pedido
                  </button>
                </div>
              </>
            ) : (
              <div className="mob-charges-empty mob-shop-cart-empty">
                <p className="mob-charges-empty-title">Seu carrinho está vazio</p>
                <p className="mob-charges-empty-text">Adicione produtos do Studio Shop para continuar.</p>
                <button className="mob-charges-cta" onClick={closeCart}>Ver produtos</button>
              </div>
            )}
          </div>
        </div>
      )}

      {toast && <div className="mob-shop-toast">{toast}</div>}

    </div>
  )
}
