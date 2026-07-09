import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, ShoppingCart, ArrowRight, ChevronRight, X, Percent,
  Package, Minus, Plus, Trash2, Clock,
  Tag, LayoutGrid, TrendingUp, Gift, Wrench, Droplet, ShieldCheck, Layers,
  Sparkles, Star, Store, Palette, Target,
} from 'lucide-react'
import { useShopCart } from '@/hooks/useShopCart'

// Redesenho da tela Studio Shop apenas para mobile, no mesmo padrão
// visual das outras telas mobile do app (Home, Agenda, Cobranças),
// agora com estrutura de marketplace (banners, atalhos, categorias,
// carrosséis horizontais e lista de ofertas) inspirada na lógica
// visual de apps de compras, mantendo 100% a identidade Studio Pay
// (fundo escuro, rosa como destaque, sem laranja). Visível apenas
// abaixo de 768px via classe global "hide-desktop" — a tela desktop
// de Shop.jsx (catálogo com dropdowns/ordenação) continua intocada,
// escondida no mesmo breakpoint via "hide-mobile".
//
// Dados de produto: a prop "products" é a MESMA lista (PRODUTOS_EFETIVOS)
// já usada pelo catálogo desktop, incluindo o override de admin via
// localStorage — não é mock desconectado. Todas as seções novas
// (banners, atalhos, categorias, carrosséis, ofertas) são derivadas
// dessa mesma lista; nenhuma categoria/produto é inventado — se uma
// categoria não existe nos produtos, a seção correspondente não é
// exibida. "Ver detalhes completos" navega para a rota real
// /app/shop/produto/:id, que usa o MESMO carrinho local (hook
// useShopCart, chave "studiopay_shop_cart").
//
// Carrinho: 100% local/frontend — React state + localStorage, sem
// API, sem backend, sem persistência em banco. "Finalizar pedido"
// nunca conclui uma compra — mostra um aviso explícito de que o
// checkout ainda depende do fluxo oficial futuro.

function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const PLAN_BENEFITS = [
  { plan: 'Starter', desc: 'Acesso ao catálogo completo do Studio Shop.' },
  { plan: 'Pro', desc: 'Melhores preços e benefícios em produtos selecionados.' },
  { plan: 'Pro+', desc: 'Condições premium no catálogo, quando disponíveis.' },
]

// Banners promocionais — sem imagem real, só gradiente + ícone + texto,
// nas cores já usadas no app (rosa + roxo/azul dos próprios produtos).
const BANNERS = [
  { title: 'Produtos para tatuadores', sub: 'Com vantagem Studio Pay', icon: Sparkles, tone: 'pink' },
  { title: 'Economize nos insumos', sub: 'Condições especiais para assinantes', icon: Tag, tone: 'purple' },
  { title: 'Studio Pro compra melhor', sub: 'Benefícios por plano dentro da Shop', icon: Star, tone: 'blue' },
]

// Estrutura organizada de categorias principais + subcategorias reais
// da Studio Shop. "aliases" mapeia os valores simples de p.cat usados
// no mock atual (Shop.jsx) para a categoria principal correspondente
// — não inventa produto/categoria nova, só organiza melhor o que já
// existe. Categoria sem produto no mock ainda aparece no card (só o
// nome, sem contador) — faz parte da estrutura real da loja, mas sem
// "Em breve" na home para não parecer app incompleto.
const SHOP_CATEGORIES = [
  {
    id: 'maquinas-fontes',
    label: 'Máquinas e Fontes',
    icon: Wrench,
    aliases: ['Máquinas', 'Fontes'],
    subcategories: ['Cabos / Pedais', 'Fonte Bateria', 'Máquinas'],
  },
  {
    id: 'cuidados-pele',
    label: 'Cuidados com a Pele',
    icon: Droplet,
    aliases: [],
    subcategories: [
      'Papel Hectográfico / Termal', 'Vaselina / Manteiga / Vasigel', 'Transfer de decalque',
      'Selantes / Adesivos curativo', 'Limpeza de Procedimento', 'Pomadas / Aftercare',
    ],
  },
  {
    id: 'biosseguranca',
    label: 'Biossegurança',
    icon: ShieldCheck,
    aliases: ['Higiene'],
    subcategories: [
      'Grommet / Borrachinha', 'Batoques / Suporte', 'Agulha Americana / Cateter',
      'Coletor Perfurocortante', 'Luva / Máscara', 'Tesoura / Pinças',
    ],
  },
  {
    id: 'studio',
    label: 'Studio',
    icon: Store,
    aliases: [],
    subcategories: ['Expositores de Piercings', 'Expositores de Máquinas', 'Maca', 'Apoio de Braço'],
  },
  {
    id: 'kits-tattoo',
    label: 'Kits p/ Tattoo',
    icon: Gift,
    aliases: [],
    subcategories: ['Kits Promocionais', 'Kit para Body Piercings', 'Kits de Tatuagem'],
  },
  {
    id: 'cartuchos',
    label: 'Cartuchos',
    icon: Package,
    aliases: ['Cartuchos'],
    subcategories: [],
  },
  {
    id: 'tintas',
    label: 'Tintas',
    icon: Palette,
    aliases: ['Tintas'],
    subcategories: [
      'Diluentes', 'Easy Glow', 'Intenze', 'Viper', 'Electric Ink',
      'Tinta Everlast', 'Tinta Raw Ink', 'Eternal Ink', 'The Ink',
    ],
  },
  {
    id: 'biqueiras',
    label: 'Biqueiras',
    icon: Target,
    aliases: [],
    subcategories: ['Aston / Hard Core', 'Formula 47', 'Electric Ink', 'Reilly Tattoo'],
  },
  {
    id: 'acessorios',
    label: 'Acessórios',
    icon: Layers,
    aliases: ['Acessórios'],
    subcategories: [],
  },
]

// Resolve a categoria principal de um produto a partir do campo
// simples "cat" do mock atual (Máquinas/Cartuchos/Tintas/Higiene/
// Acessórios). Produto sem correspondência não entra em nenhuma
// categoria principal (não é forçado/inventado).
function mainCategoryFor(product) {
  return SHOP_CATEGORIES.find((c) => c.aliases.includes(product.cat)) || null
}

// Busca considera nome, categoria simples (p.cat), subcategoria (campo
// futuro "p.subcat", opcional — produtos atuais não têm e continuam
// funcionando normalmente) e o nome da categoria principal mapeada.
function matchesSearch(product, q) {
  if (!q) return true
  const mainCat = mainCategoryFor(product)
  const haystack = [product.nome, product.cat, product.subcat, mainCat?.label]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return haystack.includes(q)
}

// Atalhos rápidos — categorias principais abrem o mesmo fluxo dos
// cards de categoria (bottom sheet de subcategorias, ou filtro direto
// quando a categoria não tem subcategorias). Os demais rolam até a
// seção correspondente. Nenhuma rota nova.
const SHORTCUTS = [
  { label: 'Ofertas', icon: Tag, scrollId: 'mob-shop-offers' },
  { label: 'Categorias', icon: LayoutGrid, scrollId: 'mob-shop-categories' },
  { label: 'Mais vendidos', icon: TrendingUp, scrollId: 'mob-shop-carousel-paravoce' },
  { label: 'Kits', icon: Gift, catId: 'kits-tattoo' },
  { label: 'Máquinas', icon: Wrench, catId: 'maquinas-fontes' },
  { label: 'Cartuchos', icon: Package, catId: 'cartuchos' },
  { label: 'Biossegurança', icon: ShieldCheck, catId: 'biosseguranca' },
  { label: 'Acessórios', icon: Layers, catId: 'acessorios' },
]

// Placeholder premium para produto sem imagem — ícone + fundo em
// degradê escuro sutil, com legenda discreta só onde há espaço
// suficiente para não poluir cards pequenos (grid/carrossel/lista).
function ProductMedia({ product, className, showLabel }) {
  if (product.imagem) {
    return <img src={product.imagem} alt={product.nome} className={className} />
  }
  return (
    <span className="mob-shop-media-ph">
      <Package size={showLabel ? 30 : 24} strokeWidth={1.5} className="mob-shop-media-icon" />
      {showLabel && <span className="mob-shop-media-ph-text">Imagem em breve</span>}
    </span>
  )
}

// Carrossel horizontal de produtos reutilizável — usado em "Para
// você", "Ofertas Studio Pay", "Mais economia" e nas categorias com
// produto suficiente. Não renderiza nada se a lista estiver vazia.
function ProductCarousel({ id, title, items, onSelect }) {
  if (!items.length) return null
  return (
    <div className="mob-dash-section" id={id}>
      <h2 className="mob-dash-section-title">{title}</h2>
      <div className="mob-shop-hscroll">
        {items.map((p) => {
          const economia = p.precoPro != null ? p.preco - p.precoPro : null
          return (
            <button
              key={p.id}
              type="button"
              className="mob-shop-hcard"
              onClick={() => onSelect(p)}
              aria-label={`Ver ${p.nome}`}
            >
              <div className="mob-shop-card-media">
                <ProductMedia product={p} className="mob-shop-card-img" />
                {p.desconto && <span className="mob-shop-card-badge">{p.desconto}% OFF</span>}
              </div>
              <div className="mob-shop-card-body">
                <p className="mob-shop-card-cat">{p.cat}</p>
                <p className="mob-shop-card-nome">{p.nome}</p>
                <div className="mob-shop-card-prices">
                  {p.precoAnt && <span className="mob-shop-card-preco-ant">{fmt(p.precoAnt)}</span>}
                  <span className="mob-shop-card-preco">{fmt(p.preco)}</span>
                </div>
                {p.precoPro != null && (
                  <p className="mob-shop-card-pro">Studio Pay: {fmt(p.precoPro)}</p>
                )}
                {economia > 0 && (
                  <span className="mob-shop-card-economia"><Percent size={10} /> Economize {fmt(economia)}</span>
                )}
                <span className="mob-shop-card-cta">Ver produto</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function MobileShopPage({ products = [] }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [activeSubcat, setActiveSubcat] = useState(null)
  const [categorySheet, setCategorySheet] = useState(null)
  const [selected, setSelected] = useState(null)
  const [selectedQty, setSelectedQty] = useState(1)
  const [showCart, setShowCart] = useState(false)
  const [checkoutNotice, setCheckoutNotice] = useState(false)
  const [toast, setToast] = useState('')
  const [bannerIndex, setBannerIndex] = useState(0)
  const bannerRef = useRef(null)

  const {
    items: cartItems,
    addItem,
    increment,
    decrement,
    removeItem,
    totalQuantity,
    subtotal,
    savings,
  } = useShopCart(products)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 1800)
    return () => clearTimeout(t)
  }, [toast])

  useEffect(() => {
    setSelectedQty(1)
  }, [selected])

  const activeCategory = activeCategoryId ? SHOP_CATEGORIES.find((c) => c.id === activeCategoryId) : null

  const q = query.trim().toLowerCase()
  const isFiltering = q.length > 0 || activeCategoryId != null
  const filtered = products.filter((p) => {
    const matchesQuery = matchesSearch(p, q)
    if (!activeCategoryId) return matchesQuery
    const matchesCat = mainCategoryFor(p)?.id === activeCategoryId
    const matchesSub = !activeSubcat || p.subcat === activeSubcat
    return matchesQuery && matchesCat && matchesSub
  })
  const resultsTitle = q ? `Resultados para "${query.trim()}"` : (activeSubcat || activeCategory?.label || '')

  // Seções derivadas dos produtos reais — nenhum dado inventado.
  // Estrutura enxuta: menos vitrines repetindo os mesmos produtos.
  // Carrossel de categoria só aparece com pelo menos 3 itens reais
  // naquela categoria principal; categorias com menos itens ficam
  // disponíveis via busca/seção de resultado (mob-shop-grid) e/ou
  // "Ofertas Studio Pay".
  const paraVoce = [...products].sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0)).slice(0, 8)
  const comEconomia = products
    .filter((p) => p.precoPro != null && p.preco - p.precoPro > 0)
    .sort((a, b) => (b.preco - b.precoPro) - (a.preco - a.precoPro))
  const ofertasStudioPay = comEconomia.slice(0, 8)
  const ofertasVerticais = comEconomia.slice(0, 6)
  const MIN_CATEGORY_CAROUSEL = 3
  const categoryCarousels = SHOP_CATEGORIES
    .map((cat) => ({ cat, items: products.filter((p) => mainCategoryFor(p)?.id === cat.id) }))
    .filter(({ items }) => items.length >= MIN_CATEGORY_CAROUSEL)

  function resetFilters() {
    setQuery('')
    setActiveCategoryId(null)
    setActiveSubcat(null)
  }

  // A seção de resultado (id "mob-shop-grid") só existe no DOM quando
  // há busca/categoria ativa — por isso o scroll até ela acontece em
  // requestAnimationFrame, depois que o React já montou a seção.
  function handleCategoryClick(cat) {
    if (cat.subcategories.length > 0) {
      setCategorySheet(cat)
      return
    }
    setActiveCategoryId(cat.id)
    setActiveSubcat(null)
    requestAnimationFrame(() => scrollToId('mob-shop-grid'))
  }

  function handleSubcategoryClick(cat, sub) {
    setActiveCategoryId(cat.id)
    setActiveSubcat(sub)
    setCategorySheet(null)
    requestAnimationFrame(() => scrollToId('mob-shop-grid'))
  }

  function handleViewAllInCategory(cat) {
    setActiveCategoryId(cat.id)
    setActiveSubcat(null)
    setCategorySheet(null)
    requestAnimationFrame(() => scrollToId('mob-shop-grid'))
  }

  function handleShortcut(s) {
    if (s.catId) {
      const cat = SHOP_CATEGORIES.find((c) => c.id === s.catId)
      if (cat) handleCategoryClick(cat)
      return
    }
    scrollToId(s.scrollId)
  }

  const CategorySheetIcon = categorySheet?.icon

  function handleBannerScroll() {
    const el = bannerRef.current
    if (!el || !el.clientWidth) return
    setBannerIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  function handleAddToCartFromDetail() {
    addItem(selected.id, selectedQty)
    setToast('Adicionado ao carrinho')
    setSelected(null)
  }
  function handleBuyNowFromDetail() {
    addItem(selected.id, selectedQty)
    setSelected(null)
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

  return (
    <div className="mob-shop">
      {/* ── Header ─────────────────────────────────── */}
      <div className="mob-charges-header">
        <div>
          <h1 className="mob-charges-title">Studio Shop</h1>
          <p className="mob-charges-sub">Produtos, kits e vantagens para o seu estúdio.</p>
        </div>
        <button className="mob-dash-icon-btn mob-shop-cart-btn" onClick={openCart} aria-label={`Carrinho: ${totalQuantity} ${totalQuantity === 1 ? 'item' : 'itens'}`}>
          <ShoppingCart size={17} />
          {totalQuantity > 0 && <span className="mob-shop-cart-badge">{totalQuantity}</span>}
        </button>
      </div>

      {/* ── Busca — protagonista, estilo app de compras ────── */}
      <div className="mob-menu-search mob-shop-search mob-shop-search-lg">
        <Search size={18} className="mob-menu-search-icon" />
        <input
          type="text"
          className="mob-menu-search-input"
          placeholder="Buscar produto"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* ── Banners promocionais em carrossel ──────── */}
      <div className="mob-shop-banners-wrap">
        <div className="mob-shop-banners" ref={bannerRef} onScroll={handleBannerScroll}>
          {BANNERS.map((b, i) => {
            const Icon = b.icon
            return (
              <button
                key={i}
                type="button"
                className={`mob-shop-banner tone-${b.tone}`}
                onClick={() => scrollToId('mob-shop-offers')}
              >
                <span className="mob-shop-banner-icon"><Icon size={18} /></span>
                <p className="mob-shop-banner-title">{b.title}</p>
                <p className="mob-shop-banner-sub">{b.sub}</p>
                <span className="mob-shop-banner-cta">Ver ofertas <ArrowRight size={12} /></span>
              </button>
            )
          })}
        </div>
        <div className="mob-shop-banner-dots">
          {BANNERS.map((_, i) => (
            <span key={i} className={`mob-shop-banner-dot${i === bannerIndex ? ' active' : ''}`} />
          ))}
        </div>
      </div>

      {/* ── Atalhos rápidos ─────────────────────────── */}
      <div className="mob-shop-shortcuts">
        {SHORTCUTS.map((s) => {
          const Icon = s.icon
          return (
            <button key={s.label} type="button" className="mob-shop-shortcut" onClick={() => handleShortcut(s)}>
              <span className="mob-shop-shortcut-icon"><Icon size={16} /></span>
              <span className="mob-shop-shortcut-label">{s.label}</span>
            </button>
          )
        })}
      </div>

      {/* ── Categorias — carrossel horizontal de pills largos (não
          mais quadradinhos apertados), com as 9 categorias principais,
          sem listar subcategorias direto na home. Ícone discreto ao
          lado do nome, rosa só como detalhe; categoria sem produto não
          mostra "Em breve" no card — só o nome, sem contador. ── */}
      <div className="mob-dash-section" id="mob-shop-categories">
        <h2 className="mob-dash-section-title">Categorias</h2>
        <div className="mob-shop-cat-track">
          {SHOP_CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const count = products.filter((p) => mainCategoryFor(p)?.id === cat.id).length
            return (
              <button
                key={cat.id}
                type="button"
                className="mob-shop-catpill"
                onClick={() => handleCategoryClick(cat)}
              >
                <Icon size={18} strokeWidth={1.7} className="mob-shop-catpill-icon" />
                <span className="mob-shop-catpill-text">
                  <span className="mob-shop-catpill-name">{cat.label}</span>
                  {count > 0 && (
                    <span className="mob-shop-catpill-count">{count} {count === 1 ? 'item' : 'itens'}</span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Vitrines em carrossel horizontal — estrutura enxuta:
          Ofertas Studio Pay, depois Para você, depois (só quando há
          produto suficiente) carrosséis por categoria. ────────── */}
      <ProductCarousel id="mob-shop-carousel-ofertas" title="Ofertas Studio Pay" items={ofertasStudioPay} onSelect={setSelected} />
      <ProductCarousel id="mob-shop-carousel-paravoce" title="Para você" items={paraVoce} onSelect={setSelected} />
      {categoryCarousels.map(({ cat, items }) => (
        <ProductCarousel key={cat.id} id={`mob-shop-carousel-cat-${cat.id}`} title={cat.label} items={items} onSelect={setSelected} />
      ))}

      {/* ── Ofertas em lista vertical ───────────────── */}
      {ofertasVerticais.length > 0 && (
        <div className="mob-dash-section" id="mob-shop-offers">
          <h2 className="mob-dash-section-title">Ofertas para o estúdio</h2>
          <div className="mob-shop-offer-list">
            {ofertasVerticais.map((p) => {
              const economia = p.preco - p.precoPro
              return (
                <button
                  key={p.id}
                  type="button"
                  className="mob-shop-offer-row"
                  onClick={() => setSelected(p)}
                  aria-label={`Ver ${p.nome}`}
                >
                  <div className="mob-shop-offer-media">
                    <ProductMedia product={p} className="mob-shop-card-img" />
                    {p.desconto && <span className="mob-shop-card-badge">{p.desconto}% OFF</span>}
                  </div>
                  <div className="mob-shop-offer-body">
                    <p className="mob-shop-card-cat">{p.cat}</p>
                    <p className="mob-shop-offer-nome">{p.nome}</p>
                    <div className="mob-shop-card-prices">
                      {p.precoAnt && <span className="mob-shop-card-preco-ant">{fmt(p.precoAnt)}</span>}
                      <span className="mob-shop-card-preco">{fmt(p.preco)}</span>
                    </div>
                    <p className="mob-shop-card-pro">Studio Pay: {fmt(p.precoPro)}</p>
                    <span className="mob-shop-card-economia"><Percent size={10} /> Economize {fmt(economia)}</span>
                  </div>
                  <ChevronRight size={16} className="mob-shop-offer-chevron" />
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Resultado de busca/categoria — substitui o antigo grid
          fixo "Todos os produtos": só aparece quando o usuário busca
          um termo ou seleciona uma categoria (via atalho/card). Sem
          chips fixos, sem título estático — some quando não há busca
          nem categoria ativa, deixando a tela de marketplace enxuta. */}
      {isFiltering && (
        <div className="mob-dash-section" id="mob-shop-grid">
          <div className="mob-shop-results-head">
            <h2 className="mob-dash-section-title">{resultsTitle}</h2>
            <button type="button" className="mob-shop-results-clear" onClick={resetFilters}>
              Limpar
            </button>
          </div>
          {filtered.length > 0 ? (
            <div className="mob-shop-grid">
              {filtered.map((p) => {
                const economia = p.precoPro != null ? p.preco - p.precoPro : null
                return (
                  <button
                    key={p.id}
                    type="button"
                    className="mob-shop-card"
                    onClick={() => setSelected(p)}
                    aria-label={`Ver ${p.nome}`}
                  >
                    <div className="mob-shop-card-media">
                      <ProductMedia product={p} className="mob-shop-card-img" />
                      {p.desconto && <span className="mob-shop-card-badge">{p.desconto}% OFF</span>}
                    </div>
                    <div className="mob-shop-card-body">
                      <p className="mob-shop-card-cat">{p.cat}</p>
                      <p className="mob-shop-card-nome">{p.nome}</p>
                      <div className="mob-shop-card-prices">
                        {p.precoAnt && <span className="mob-shop-card-preco-ant">{fmt(p.precoAnt)}</span>}
                        <span className="mob-shop-card-preco">{fmt(p.preco)}</span>
                      </div>
                      {p.precoPro != null && (
                        <p className="mob-shop-card-pro">Studio Pay: {fmt(p.precoPro)}</p>
                      )}
                      {economia > 0 && (
                        <span className="mob-shop-card-economia"><Percent size={10} /> Economize {fmt(economia)}</span>
                      )}
                      <span className="mob-shop-card-cta">Ver produto</span>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="mob-charges-empty">
              {activeSubcat ? (
                <>
                  <p className="mob-charges-empty-title">Nenhum produto encontrado nesta subcategoria</p>
                  <p className="mob-charges-empty-text">Em breve novos produtos serão adicionados.</p>
                </>
              ) : (
                <>
                  <p className="mob-charges-empty-title">Nenhum produto encontrado</p>
                  <p className="mob-charges-empty-text">Tente buscar outro item ou outra categoria.</p>
                </>
              )}
              <button className="mob-charges-cta" onClick={resetFilters}>Ver todos</button>
            </div>
          )}
        </div>
      )}

      {/* ── Bottom sheet de categoria — lista as subcategorias reais
          da categoria principal clicada, sem poluir a home com todas
          de uma vez. Mesmo padrão visual das outras bottom sheets do
          app (fundo escuro, cantos arredondados). ── */}
      {categorySheet && (
        <div className="mob-charges-detail-overlay" onClick={() => setCategorySheet(null)}>
          <div className="mob-charges-detail-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mob-charges-detail-handle" />
            <div className="mob-charges-detail-head">
              <div className="mob-shop-subcat-head-info">
                <span className="mob-shop-subcat-head-icon">{CategorySheetIcon && <CategorySheetIcon size={18} />}</span>
                <p className="mob-charges-detail-client">{categorySheet.label}</p>
              </div>
              <button className="mob-charges-detail-close" onClick={() => setCategorySheet(null)} aria-label="Fechar">
                <X size={18} />
              </button>
            </div>

            <div className="mob-shop-subcat-list">
              {categorySheet.subcategories.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  className="mob-shop-subcat-row"
                  onClick={() => handleSubcategoryClick(categorySheet, sub)}
                >
                  <span>{sub}</span>
                  <ChevronRight size={16} className="mob-shop-subcat-chevron" />
                </button>
              ))}
            </div>

            <button
              className="mob-charges-cta mob-shop-subcat-viewall"
              onClick={() => handleViewAllInCategory(categorySheet)}
            >
              Ver todos em {categorySheet.label}
            </button>

            <button className="mob-charges-detail-close-btn" onClick={() => setCategorySheet(null)}>Fechar</button>
          </div>
        </div>
      )}

      {/* ── Vantagens por plano ────────────────────── */}
      <div className="mob-dash-section">
        <h2 className="mob-dash-section-title">Vantagens por plano</h2>
        <div className="mob-dash-actions-list">
          {PLAN_BENEFITS.map(({ plan, desc }) => (
            <div key={plan} className="mob-dash-action-row mob-shop-plan-row">
              <span className="mob-charges-status">{plan}</span>
              <span className="mob-shop-plan-desc">{desc}</span>
            </div>
          ))}
        </div>
        <p className="mob-shop-plan-note">Benefícios podem variar por plano.</p>
      </div>

      {/* ── Bottom sheet de detalhe do produto ─────── */}
      {selected && (
        <div className="mob-charges-detail-overlay" onClick={() => setSelected(null)}>
          <div className="mob-charges-detail-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mob-charges-detail-handle" />
            <div className="mob-charges-detail-head">
              <div>
                <p className="mob-charges-detail-client">{selected.nome}</p>
                <p className="mob-charges-detail-desc">{selected.cat}</p>
              </div>
              <button className="mob-charges-detail-close" onClick={() => setSelected(null)} aria-label="Fechar">
                <X size={18} />
              </button>
            </div>

            <div className="mob-shop-detail-media">
              <ProductMedia product={selected} className="mob-shop-detail-img" showLabel />
            </div>

            <p className="mob-shop-detail-desc-text">{selected.cat} selecionado(a) para o seu estúdio.</p>

            {/* Preços — estrutura clara: normal / Studio Pay / economia */}
            <div className="mob-charges-detail-rows">
              <div className="mob-charges-detail-row">
                <span>Preço normal</span>
                <span className="mob-shop-detail-strike">{fmt(selected.precoAnt || selected.preco)}</span>
              </div>
              <div className="mob-charges-detail-row">
                <span>Preço Studio Pay</span>
                <span className="mob-charges-detail-row-value mob-shop-detail-price-pro">
                  {fmt(selected.precoPro ?? selected.preco)}
                </span>
              </div>
              {selected.precoPro != null && selected.preco - selected.precoPro > 0 && (
                <div className="mob-charges-detail-row">
                  <span>Você economiza</span>
                  <span className="mob-charges-status green">{fmt(selected.preco - selected.precoPro)}</span>
                </div>
              )}
            </div>

            <div className="mob-shop-qty-row">
              <span className="mob-shop-qty-label">Quantidade</span>
              <div className="mob-shop-qty-control">
                <button
                  type="button"
                  className="mob-shop-qty-btn"
                  onClick={() => setSelectedQty((v) => Math.max(1, v - 1))}
                  aria-label="Diminuir quantidade"
                >
                  <Minus size={14} />
                </button>
                <span className="mob-shop-qty-value">{selectedQty}</span>
                <button
                  type="button"
                  className="mob-shop-qty-btn"
                  onClick={() => setSelectedQty((v) => v + 1)}
                  aria-label="Aumentar quantidade"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="mob-shop-detail-actions">
              <button className="mob-shop-add-btn" onClick={handleAddToCartFromDetail}>
                Adicionar ao carrinho
              </button>
              <button className="mob-charges-cta mob-shop-detail-cta" onClick={handleBuyNowFromDetail}>
                Comprar agora
              </button>
            </div>

            <button
              className="mob-dash-action-row mob-shop-detail-link"
              onClick={() => navigate(`/app/shop/produto/${selected.id}`)}
            >
              <span className="mob-dash-action-label">Ver detalhes completos</span>
              <ChevronRight size={16} className="mob-dash-action-chevron" />
            </button>

            <button className="mob-charges-detail-close-btn" onClick={() => setSelected(null)}>Fechar</button>
          </div>
        </div>
      )}

      {/* ── Bottom sheet do carrinho — 100% local (React state +
          localStorage via useShopCart), sem API/banco/checkout real. */}
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
                  {cartItems.map(({ id, qty, product }) => (
                    <div key={id} className="mob-shop-cart-item">
                      <div className="mob-shop-cart-item-media">
                        <ProductMedia product={product} className="mob-shop-cart-item-img" />
                      </div>
                      <div className="mob-shop-cart-item-body">
                        <p className="mob-shop-cart-item-nome">{product.nome}</p>
                        <p className="mob-shop-cart-item-preco">{fmt(product.precoPro ?? product.preco)}</p>
                        <div className="mob-shop-cart-item-row">
                          <div className="mob-shop-qty-control mob-shop-qty-control-sm">
                            <button type="button" className="mob-shop-qty-btn" onClick={() => decrement(id)} aria-label="Diminuir quantidade">
                              <Minus size={12} />
                            </button>
                            <span className="mob-shop-qty-value">{qty}</span>
                            <button type="button" className="mob-shop-qty-btn" onClick={() => increment(id)} aria-label="Aumentar quantidade">
                              <Plus size={12} />
                            </button>
                          </div>
                          <button type="button" className="mob-shop-cart-item-remove" onClick={() => removeItem(id)} aria-label={`Remover ${product.nome}`}>
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

      {/* ── Toast simples (só visual, sem persistência) ────────── */}
      {toast && <div className="mob-shop-toast">{toast}</div>}
    </div>
  )
}
