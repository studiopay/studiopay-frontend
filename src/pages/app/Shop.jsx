import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Heart, ShoppingCart, ChevronDown, ArrowRight,
  CheckCheck, Info,
} from 'lucide-react'
import MobileShopPage from '@/components/dashboard/MobileShopPage'

// ─────────────────────────────────────
// CATEGORIAS
// ─────────────────────────────────────

const SHOP_CATS = [
  { label: 'Todos',               value: 'todos' },
  { label: 'Máquinas e Fontes',   value: 'maquinas-fontes',  children: ['Cabos / Pedais', 'Fonte Bateria', 'Máquinas'] },
  { label: 'Cuidados com a Pele', value: 'cuidados-pele',    children: ['Papel Hectográfico / Termal', 'Vaselina / Manteiga / Vasigel', 'Transfer de decalque', 'Selantes / Adesivos curativo', 'Limpeza de Procedimento', 'Pomadas / Aftercare'] },
  { label: 'Biossegurança',       value: 'biosseguranca',    children: ['Grommet / Borrachinha', 'Batoques / Suporte', 'Agulha Americana / Cateter', 'Coletor Perfurocortante', 'Luva / Máscara', 'Tesoura / Pinças'] },
  { label: 'Studio',              value: 'studio',           children: ['Expositores de Piercings', 'Expositores de Máquinas', 'Maca', 'Apoio de Braço'] },
  { label: 'Kits p/ Tattoo',      value: 'kits-tattoo',      children: ['Kits Promocionais', 'Kit para Body Piercings', 'Kits de Tatuagem'] },
  { label: 'Cartuchos',           value: 'cartuchos' },
  { label: 'Tintas',              value: 'tintas',           children: ['Diluentes', 'Easy Glow', 'Intenze', 'Viper', 'Electric Ink', 'Tinta Everlast', 'Tinta Raw Ink', 'Eternal Ink', 'The Ink'] },
  { label: 'Biqueiras',           value: 'biqueiras',        children: ['Aston / Hard Core', 'Formula 47', 'Electric Ink', 'Reilly Tattoo'] },
  { label: 'Acessórios',          value: 'acessorios' },
]

// Mapeia valor de categoria para p.cat do mock
const CAT_MAP = {
  'maquinas-fontes': ['Máquinas'],
  'cuidados-pele':   ['Higiene'],
  'biosseguranca':   ['Higiene'],
  'studio':          ['Acessórios'],
  'kits-tattoo':     ['Acessórios'],
  'cartuchos':       ['Cartuchos'],
  'tintas':          ['Tintas'],
  'biqueiras':       ['Cartuchos'],
  'acessorios':      ['Acessórios'],
}

// ─────────────────────────────────────
// DADOS MOCK
// ─────────────────────────────────────

const SORT_OPTS = [
  'Recomendados', 'Menor preço', 'Maior desconto', 'Mais vendidos', 'Novidades',
]

const PRODUTOS = [
  { id: 1, nome: 'Pen Machine Pro X5',             cat: 'Máquinas',   precoAnt: 749.90, preco: 524.90, precoPro: 479.90, parcelas: 3,    desconto: 30,  cor: '#8B5CF6', destaque: true },
  { id: 2, nome: 'Kit Cartuchos RL — 25 un.',      cat: 'Cartuchos',  precoAnt: null,   preco: 119.90, precoPro: 103.90, parcelas: null, desconto: null, cor: '#3B82F6' },
  { id: 3, nome: 'Tinta Preta Profissional 300ml',  cat: 'Tintas',    precoAnt: 89.90,  preco: 64.90,  precoPro: 56.90,  parcelas: null, desconto: 28,  cor: '#EC4899' },
  { id: 4, nome: 'Kit Descartáveis para Sessão',   cat: 'Higiene',    precoAnt: null,   preco: 89.90,  precoPro: 79.90,  parcelas: null, desconto: null, cor: '#22C55E' },
  { id: 5, nome: 'Fonte Digital Bivolt 2A',         cat: 'Acessórios', precoAnt: 389.90, preco: 289.90, precoPro: 259.90, parcelas: 3,    desconto: 26,  cor: '#F59E0B' },
  { id: 6, nome: 'Suporte Ergonômico Premium',     cat: 'Acessórios', precoAnt: null,   preco: 179.90, precoPro: 159.90, parcelas: 2,    desconto: null, cor: '#F97316' },
  { id: 7, nome: 'Kit Pós-Tattoo para Cliente',    cat: 'Higiene',    precoAnt: null,   preco: 39.90,  precoPro: 32.90,  parcelas: null, desconto: null, cor: '#14B8A6' },
  { id: 8, nome: 'Filme Protetor Rolo 50m',        cat: 'Higiene',    precoAnt: 49.90,  preco: 34.90,  precoPro: 28.90,  parcelas: null, desconto: 30,  cor: '#6366f1' },
]

function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function readAdmin(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback }
}

// ─────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────

export default function Shop() {
  const navigate = useNavigate()

  const adminHero     = readAdmin('studioPayAdmin_shopHero', null)
  const adminProducts = readAdmin('studioPayAdmin_shopProducts', null)
  const PRODUTOS_EFETIVOS = (adminProducts || PRODUTOS).filter(p => p.ativo !== false)

  const [catAtiva, setCatAtiva]   = useState('todos')
  const [sortAtivo, setSortAtivo] = useState('Recomendados')
  const [sortOpen, setSortOpen]   = useState(false)
  const [favs, setFavs]           = useState(new Set())
  const [openDrop, setOpenDrop]   = useState(null)
  const [dropPos, setDropPos]     = useState(0)

  const navRef     = useRef(null)
  const tabsRef    = useRef(null)
  const tabRefs    = useRef({})
  const closeTimer = useRef(null)

  // Fecha dropdown ao clicar fora do nav
  useEffect(() => {
    const handler = e => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDrop(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const openDropdown = catValue => {
    clearTimeout(closeTimer.current)
    const el   = tabRefs.current[catValue]
    const tabs = tabsRef.current
    if (el && tabs) setDropPos(el.offsetLeft - tabs.scrollLeft)
    setOpenDrop(catValue)
  }

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenDrop(null), 140)
  }

  const cancelClose = () => clearTimeout(closeTimer.current)

  const toggleFav = (id, e) => {
    e.stopPropagation()
    setFavs(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // Filtra produtos por categoria ativa (principal ou sub)
  const prodsFiltrados = (() => {
    if (catAtiva === 'todos') return PRODUTOS_EFETIVOS
    const main = SHOP_CATS.find(c => c.value === catAtiva)
    if (main) {
      const cats = CAT_MAP[catAtiva]
      return cats ? PRODUTOS_EFETIVOS.filter(p => cats.includes(p.cat)) : PRODUTOS_EFETIVOS
    }
    const parent = SHOP_CATS.find(c => c.children?.includes(catAtiva))
    if (parent) {
      const cats = CAT_MAP[parent.value]
      return cats ? PRODUTOS_EFETIVOS.filter(p => cats.includes(p.cat)) : PRODUTOS_EFETIVOS
    }
    return PRODUTOS_EFETIVOS
  })()

  // Label do header de catálogo
  const activeCatLabel = (() => {
    if (catAtiva === 'todos') return 'Todos os produtos'
    const main = SHOP_CATS.find(c => c.value === catAtiva)
    if (main) return main.label
    const parent = SHOP_CATS.find(c => c.children?.includes(catAtiva))
    return parent ? `${parent.label} › ${catAtiva}` : catAtiva
  })()

  const openCatDef = SHOP_CATS.find(c => c.value === openDrop)

  return (
    <div className="animate-fade-in">

      {/* ── Shop mobile (estilo app financeiro) ──────
          Visível apenas abaixo de 768px. O bloco desktop/tablet
          abaixo permanece 100% intocado, apenas oculto nesse
          mesmo breakpoint. Reaproveita a mesma lista de produtos
          (incluindo override de admin) já usada pelo catálogo
          desktop — sem mock desconectado. ── */}
      <div className="hide-desktop">
        <MobileShopPage products={PRODUTOS_EFETIVOS} />
      </div>

      {/* ── Shop desktop/tablet (layout atual) ──────── */}
      <div className="shop-page hide-mobile">

      {/* ── 1. HERO ─────────────────────────────────── */}
      <div className="shop2-hero">
        <div className="shop2-hero-glow" />
        <div className="shop2-hero-glow shop2-hero-glow-2" />

        <div className="shop2-hero-content">
          <div className="shop2-hero-text">
            <span className="shop2-hero-label">{adminHero?.label || 'Studio Shop'}</span>
            <h1 className="shop2-hero-title">
              {adminHero?.title || <>Equipamentos e suprimentos<br />com condições exclusivas</>}
            </h1>
            <p className="shop2-hero-sub">
              {adminHero?.sub || 'Tintas, agulhas, cartuchos, higiene e acessórios selecionados para tatuadores.'}
            </p>
            <div className="shop2-hero-ctas">
              <button
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px' }}
                onClick={() => document.querySelector('.shop2-grid')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {adminHero?.btn || 'Ver produtos'} <ArrowRight size={15} />
              </button>
              <div className="shop2-hero-stats">
                <div className="shop2-hero-stat">
                  <span className="shop2-hero-stat-val">200+</span>
                  <span className="shop2-hero-stat-label">Produtos</span>
                </div>
                <div className="shop2-hero-stat-div" />
                <div className="shop2-hero-stat">
                  <span className="shop2-hero-stat-val">Pro</span>
                  <span className="shop2-hero-stat-label">Desconto</span>
                </div>
              </div>
            </div>
          </div>

          {adminHero?.imagem ? (
            <div style={{ width: 360, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={adminHero.imagem}
                alt=""
                style={{
                  width: '100%', maxHeight: 300,
                  objectFit: 'contain', objectPosition: 'center',
                  borderRadius: 14, display: 'block',
                  filter: 'drop-shadow(0 12px 36px rgba(0,0,0,0.5))',
                }}
              />
            </div>
          ) : (
            <div className="shop2-hero-visual" aria-hidden="true">
              <div className="shop2-hero-card">
                <div className="shop2-hero-card-img" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.22), rgba(139,92,246,0.06))' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(139,92,246,0.28)', border: '1.5px solid rgba(139,92,246,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 8, height: 38, background: 'rgba(139,92,246,0.85)', borderRadius: 4 }} />
                  </div>
                </div>
                <div className="shop2-hero-card-body">
                  <div className="shop2-hero-card-line" style={{ width: '68%', background: 'rgba(255,255,255,0.2)' }} />
                  <div className="shop2-hero-card-line" style={{ width: '44%', background: 'rgba(255,255,255,0.1)', marginTop: 2 }} />
                  <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#FF2ED1', fontFamily: 'var(--font-body)' }}>R$ 524,90</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#22C55E', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.28)', borderRadius: 20, padding: '2px 9px' }}>30% OFF</span>
                  </div>
                </div>
              </div>
              <div className="shop2-hero-card shop2-hero-card-sm">
                <div className="shop2-hero-card-img" style={{ height: 52, background: 'linear-gradient(135deg, rgba(59,130,246,0.22), rgba(59,130,246,0.06))' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(59,130,246,0.36)', border: '1px solid rgba(59,130,246,0.48)' }} />
                </div>
                <div className="shop2-hero-card-body" style={{ padding: '10px 13px', gap: 4 }}>
                  <div className="shop2-hero-card-line" style={{ width: '60%', background: 'rgba(255,255,255,0.16)', marginBottom: 6 }} />
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#60A5FA', fontFamily: 'var(--font-body)' }}>R$ 119,90</span>
                </div>
              </div>
              <div className="shop2-hero-badge">⭐ Mais vendido</div>
            </div>
          )}
        </div>
      </div>

      {/* ── 2. NAV / FILTROS ────────────────────────── */}
      <div className="shop2-nav" ref={navRef}>
        {/* Tabs com scroll horizontal */}
        <div className="shop2-nav-tabs" ref={tabsRef}>
          {SHOP_CATS.map(c => {
            const hasChildren = Boolean(c.children?.length)
            const isActive = catAtiva === c.value || c.children?.includes(catAtiva)
            const isOpen   = openDrop === c.value
            return (
              <div
                key={c.value}
                ref={el => { tabRefs.current[c.value] = el }}
                className="shop2-nav-item"
                onMouseEnter={() => { if (hasChildren) openDropdown(c.value) }}
                onMouseLeave={scheduleClose}
              >
                <button
                  className={`shop2-nav-tab${isActive ? ' active' : ''}`}
                  onClick={() => {
                    setCatAtiva(c.value)
                    if (hasChildren) {
                      if (isOpen) { setOpenDrop(null) } else { openDropdown(c.value) }
                    } else {
                      setOpenDrop(null)
                    }
                  }}
                >
                  {c.label}
                  {hasChildren && (
                    <ChevronDown size={10} className={`shop2-nav-chevron${isOpen ? ' open' : ''}`} />
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {/* Dropdown flutuante — posicionado via JS fora do container scrollável */}
        {openDrop && openCatDef?.children && (
          <div
            className="shop2-nav-dropdown"
            style={{ left: dropPos }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            {openCatDef.children.map(sub => (
              <button
                key={sub}
                className={`shop2-nav-drop-item${catAtiva === sub ? ' active' : ''}`}
                onClick={() => { setCatAtiva(sub); setOpenDrop(null) }}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Ordenar */}
        <div className="shop2-nav-sort">
          <button className="shop2-sort-btn" onClick={() => setSortOpen(v => !v)}>
            <span>Ordenar</span> <ChevronDown size={12} style={{ flexShrink: 0 }} />
          </button>
          {sortOpen && (
            <div className="shop2-sort-dropdown">
              {SORT_OPTS.map(s => (
                <button key={s} className={`shop2-sort-opt${sortAtivo === s ? ' active' : ''}`}
                  onClick={() => { setSortAtivo(s); setSortOpen(false) }}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── 3. GRID DE PRODUTOS ─────────────────────── */}
      <div>
        <div className="shop2-catalog-header">
          <p className="shop2-catalog-title">{activeCatLabel}</p>
          <span className="shop2-catalog-count">{prodsFiltrados.length} {prodsFiltrados.length === 1 ? 'item' : 'itens'}</span>
        </div>

        <div className="shop2-grid">
          {prodsFiltrados.map(p => {
            const parcelVal = p.parcelas ? fmt(p.preco / p.parcelas) : null
            const isFav = favs.has(p.id)
            return (
              <div
                key={p.id}
                className={`shop2-card${p.destaque ? ' destaque' : ''}`}
                onClick={() => navigate('/app/shop/produto/' + p.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate('/app/shop/produto/' + p.id)}
              >
                <div className="shop2-card-media">
                  {p.imagem
                    ? <img src={p.imagem} alt={p.nome} className="shop2-card-media-img" />
                    : (
                      <div
                        className="shop2-card-media-ph"
                        style={{
                          background: `linear-gradient(135deg, ${p.cor}22 0%, ${p.cor}0c 100%)`,
                          border: `1px solid ${p.cor}28`,
                        }}
                      >
                        <div className="shop2-card-media-ph-icon" style={{ background: `${p.cor}50` }} />
                      </div>
                    )
                  }
                  {p.desconto && <span className="shop2-card-badge">{p.desconto}% OFF</span>}
                  <button className={`shop2-card-fav${isFav ? ' active' : ''}`} onClick={e => toggleFav(p.id, e)}>
                    <Heart size={11} fill={isFav ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="shop2-card-body">
                  <p className="shop2-card-cat">{p.cat}</p>
                  <p className="shop2-card-nome">{p.nome}</p>

                  <div className="shop2-card-prices">
                    {p.precoAnt && <p className="shop2-card-preco-ant">{fmt(p.precoAnt)}</p>}
                    <p className="shop2-card-preco">{fmt(p.preco)}</p>
                    <p className="shop2-card-pro">Cliente Studio Pay: {fmt(p.precoPro)}</p>
                    {parcelVal && <p className="shop2-card-parcel">{p.parcelas}× de {parcelVal} sem juros</p>}
                  </div>

                  <div className="shop2-card-actions">
                    <button className="shop2-card-buy" onClick={e => { e.stopPropagation(); navigate('/app/shop/produto/' + p.id) }}>
                      Comprar
                    </button>
                    <button className="shop2-card-cart" onClick={e => e.stopPropagation()} title="Adicionar ao carrinho">
                      <ShoppingCart size={13} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 4. STUDIO PRO BLOCK ─────────────────────── */}
      <div className="shop2-pro-block">
        <div className="shop2-pro-glow" />
        <div className="shop2-pro-content">
          <div className="shop2-pro-text">
            <span className="shop2-pro-label">Studio Pro</span>
            <h2 className="shop2-pro-title">Descontos exclusivos em todo o catálogo</h2>
            <p className="shop2-pro-sub">
              Assinantes Studio Pro têm acesso a preços diferenciados e
              parcelamento facilitado em todos os produtos do Studio Shop.
            </p>
            <button className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20 }}>
              Quero ser Pro <ArrowRight size={14} />
            </button>
          </div>
          <div className="shop2-pro-benefits">
            {[
              ['Descontos exclusivos', 'Em todo o catálogo Studio Shop'],
              ['Preço Pro garantido',  'Sempre menor que o preço padrão'],
              ['Parcelamento',         'Sem juros adicionais no plano Pro'],
              ['Acesso antecipado',    'A novidades, lançamentos e ofertas'],
            ].map(([title, desc]) => (
              <div key={title} className="shop2-pro-benefit">
                <CheckCheck size={14} style={{ color: '#FF2ED1', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p className="shop2-pro-benefit-title">{title}</p>
                  <p className="shop2-pro-benefit-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. AVISO ────────────────────────────────── */}
      <div className="shop2-aviso">
        <Info size={13} style={{ flexShrink: 0, marginTop: 1 }} />
        <p>Produtos, preços e condições são demonstrativos neste protótipo e podem variar conforme parceiros, estoque e disponibilidade.</p>
      </div>

      </div>
    </div>
  )
}
