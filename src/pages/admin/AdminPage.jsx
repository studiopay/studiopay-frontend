import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingBag, Globe, Settings, Wallet,
  Save, Trash2, Plus, Copy, Check, RotateCcw,
  Upload, X, Package, Image as ImageIcon, ExternalLink,
} from 'lucide-react'
import { getAdminContent, setAdminContent, resetAllAdminContent, ADMIN_KEYS } from '@/utils/adminContent'
import '@/styles/admin.css'

// ─────────────────────────────────────
// DEFAULT DATA
// ─────────────────────────────────────

const DEFAULT_DASH_BANNERS = [
  { tag: 'Conta Digital', title: 'Sua conta Studio Pay está pronta para organizar o estúdio', text: 'Receba Pix, acompanhe cobranças e veja o que entrou sem depender de planilha.', btn: 'Ver conta', imagem: null },
  { tag: 'Studio Shop',   title: 'Produtos para o estúdio com condições especiais',           text: 'Tintas, descartáveis e acessórios para quem usa Studio Pay.',              btn: 'Ver ofertas', imagem: null },
  { tag: 'Elison IA',     title: 'O Elison acompanha seus clientes por você',                 text: 'Confirma horários, envia lembretes e ajuda no pós-atendimento.',           btn: 'Abrir Elison IA', imagem: null },
]

const DEFAULT_SHOP_HERO = {
  label: 'Studio Shop',
  title: 'Equipamentos e suprimentos com condições exclusivas',
  sub: 'Tintas, agulhas, máquinas e descartáveis selecionados para tatuadores.',
  btn: 'Ver produtos',
  imagem: null,
}

const DEFAULT_LANDING = {
  heroTitle: 'A conta digital criada para tatuadores',
  heroSub: 'Cobre seus clientes, controla sua agenda e organiza o estúdio num só lugar.',
  heroBtnPrimario: 'Começar grátis',
  heroBtnSecundario: 'Ver planos',
  heroImagem: null,
  bloco1: { titulo: 'Cobranças sem burocracia', desc: 'Link de pagamento, Pix e boleto num clique.', imagem: null, badge: 'Novo' },
  bloco2: { titulo: 'Agenda inteligente',        desc: 'Confirmações automáticas pelo Elison IA.',   imagem: null, badge: 'IA' },
  bloco3: { titulo: 'Studio Shop',               desc: 'Insumos e equipamentos com condições especiais.', imagem: null, badge: 'Em breve' },
}

const DEFAULT_LANDING_SHOP = {
  label:          'Studio Shop',
  title:          'Produtos que você já compra.',
  highlightTitle: 'Com vantagem pra quem usa Studio Pay.',
  subtitle:       'O Studio Shop conecta assinantes a produtos, kits e benefícios pensados para a rotina real do tatuador.',
  cards: [
    { id: 1, title: 'Tintas selecionadas',  badge: 'Condição exclusiva',  normalPrice: 'R$ 89,90',  proPrice: 'R$ 79,90',  savingText: 'R$ 10,00', image: null, active: true },
    { id: 2, title: 'Cartuchos',            badge: 'Benefício Pro',        normalPrice: 'R$ 120,00', proPrice: 'R$ 105,00', savingText: 'R$ 15,00', image: null, active: true },
    { id: 3, title: 'Luvas e descartáveis', badge: 'Benefício por plano',  normalPrice: 'R$ 44,90',  proPrice: 'R$ 39,90',  savingText: 'R$ 5,00',  image: null, active: true },
  ],
}

const DEFAULT_STUDIO_CORE = {
  heroLabel: 'Conta digital Studio Pay',
  heroTitle: 'Pague, receba e acompanhe seu dinheiro em um só lugar.',
  heroSub: 'Receba no Pix, gere boletos, envie links de pagamento e acompanhe a evolução financeira do seu estúdio sem depender de planilhas.',
  heroBtnPrimario: 'Começar agora',
  heroBtnSecundario: 'Ver planos',
  heroImage: null,
  heroImageMobile: null,
  autoChargeBadge: 'Cobranças automáticas',
  autoChargeTitle: 'Configure uma vez.\nO Studio Pay cobra por você.',
  autoChargeSubtitle: 'Automatize lembretes e cobranças pelo WhatsApp e tenha mais tempo para o que realmente importa.',
  autoChargeImage: null,
  autoChargeImageMobile: null,
  autoChargePillText: 'Automatize cobranças e mensagens no WhatsApp com lembretes enviados no momento certo.',
  createChargeBadge: 'Criar cobrança',
  createChargeTitle: 'Receba sem precisar cobrar seus clientes manualmente.',
  createChargeSubtitle: 'Crie uma cobrança em poucos segundos, defina vencimento, valor e forma de envio. O Studio Pay organiza o resto.',
  createChargeImage: null,
  createChargeImageMobile: null,
  createChargePillText: 'Automatize cobranças no WhatsApp com lembretes enviados no momento certo.',
}

const DEFAULT_PRODUCTS = [
  { id: 1, nome: 'Pen Machine Pro X5',            cat: 'Máquinas',   marca: 'Studio Pro Series', precoAnt: 749.90, preco: 524.90, precoPro: 479.90, parcelas: 3, desconto: 30, badge: 'Mais vendido', badgeVariant: 'green', cor: '#8B5CF6', imagem: null, desc: 'Pen machine profissional para traço e pintura.', features: ['Motor rotativo silencioso', 'Tensão regulável 5–12V', 'Compatível com cartuchos RCA e Clip Cord', 'Peso: 130g', 'Garantia 12 meses'], ativo: true },
  { id: 2, nome: 'Kit Cartuchos RL — 25 un.',     cat: 'Cartuchos',  marca: 'CartPro',            precoAnt: null,   preco: 119.90, precoPro: 103.90, parcelas: null, desconto: null, badge: 'Reposição', badgeVariant: 'blue', cor: '#3B82F6', imagem: null, desc: 'Kit com 25 cartuchos RL de alta qualidade.', features: ['Ponta membranada anti-refluxo', 'Aço cirúrgico AISI 316L', 'Embalagem individual estéril'], ativo: true },
  { id: 3, nome: 'Tinta Preta Profissional 300ml', cat: 'Tintas',    marca: 'InkMaster',          precoAnt: 89.90,  preco: 64.90,  precoPro: 56.90,  parcelas: null, desconto: 28, badge: 'Oferta', badgeVariant: 'pink', cor: '#EC4899', imagem: null, desc: 'Tinta preta profissional de alta densidade.', features: ['Fórmula vegana', 'Alta densidade de pigmento', 'Dermatologicamente testada'], ativo: true },
  { id: 4, nome: 'Kit Descartáveis para Sessão',  cat: 'Higiene',    marca: 'SafeInk',            precoAnt: null,   preco: 89.90,  precoPro: 79.90,  parcelas: null, desconto: null, badge: 'Mais vendido', badgeVariant: 'green', cor: '#22C55E', imagem: null, desc: 'Kit completo com descartáveis para uma sessão.', features: ['Luvas de nitrilo', 'Batoques coloridos', 'Plástico filme para maca'], ativo: true },
  { id: 5, nome: 'Fonte Digital Bivolt 2A',        cat: 'Acessórios', marca: 'PowerPro',           precoAnt: 389.90, preco: 289.90, precoPro: 259.90, parcelas: 3, desconto: 26, badge: 'Novo', badgeVariant: 'yellow', cor: '#F59E0B', imagem: null, desc: 'Fonte digital bivolt com display LCD.', features: ['Display LCD digital', 'Bivolt automático 110/220V', 'Saídas RCA e Clip Cord'], ativo: true },
  { id: 6, nome: 'Suporte Ergonômico Premium',    cat: 'Acessórios', marca: 'StudioGear',         precoAnt: null,   preco: 179.90, precoPro: 159.90, parcelas: 2, desconto: null, badge: 'Novo', badgeVariant: 'yellow', cor: '#F97316', imagem: null, desc: 'Apoio de braço ergonômico ajustável.', features: ['Altura ajustável', 'Encosto em espuma D28', 'Base em aço reforçado'], ativo: true },
  { id: 7, nome: 'Kit Pós-Tattoo para Cliente',   cat: 'Higiene',    marca: 'AfterInk',           precoAnt: null,   preco: 39.90,  precoPro: 32.90,  parcelas: null, desconto: null, badge: 'Indicado', badgeVariant: 'green', cor: '#14B8A6', imagem: null, desc: 'Kit de cuidados pós-tattoo para o cliente.', features: ['Pomada cicatrizante', 'Filme protetor', 'Orientações impressas'], ativo: true },
  { id: 8, nome: 'Filme Protetor Rolo 50m',       cat: 'Higiene',    marca: 'ProtectPro',         precoAnt: 49.90,  preco: 34.90,  precoPro: 28.90,  parcelas: null, desconto: 30, badge: 'Oferta', badgeVariant: 'pink', cor: '#6366f1', imagem: null, desc: 'Rolo de filme protetor transparente 50m.', features: ['50 metros por rolo', 'Largura 50cm', 'Sem resíduo de cola'], ativo: true },
]

const DEFAULT_CATEGORIES = [
  { id: 'todos',      nome: 'Todos os produtos', desc: '',                              ativo: true },
  { id: 'Máquinas',   nome: 'Máquinas',          desc: 'Pen machines e equipamentos.',  ativo: true },
  { id: 'Cartuchos',  nome: 'Cartuchos',         desc: 'Cartuchos para todos os estilos.', ativo: true },
  { id: 'Tintas',     nome: 'Tintas',            desc: 'Cores, diluentes e pigmentos.', ativo: true },
  { id: 'Acessórios', nome: 'Acessórios',        desc: 'Fontes, suportes e extras.',    ativo: true },
  { id: 'Higiene',    nome: 'Higiene',           desc: 'Descartáveis e pós-tattoo.',    ativo: true },
]

const CATS = ['Máquinas', 'Cartuchos', 'Tintas', 'Acessórios', 'Higiene', 'Outro']
const BADGE_VARIANTS = ['green', 'blue', 'pink', 'yellow', 'gray', 'red']

const TABS = [
  { id: 'dashboard',  label: 'Dashboard',     icon: LayoutDashboard },
  { id: 'landing',    label: 'Landing Page',  icon: Globe },
  { id: 'studiocore', label: 'Conta Digital', icon: Wallet },
  { id: 'shop',       label: 'Studio Shop',   icon: ShoppingBag },
  { id: 'products',   label: 'Produtos',      icon: Package },
  { id: 'config',     label: 'Configurações', icon: Settings },
]

// ─────────────────────────────────────
// HELPERS
// ─────────────────────────────────────

// Redimensiona e comprime a imagem no navegador (canvas → WebP) antes de
// salvar no localStorage, para caber no limite do protótipo sem exigir
// compressão manual do usuário.
function compressImage(file, { maxWidth = 1800, quality = 0.82 } = {}) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width)
      const w = Math.round(img.width * scale)
      const h = Math.round(img.height * scale)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, w, h)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/webp', quality))
    }
    img.onerror = (err) => { URL.revokeObjectURL(url); reject(err) }
    img.src = url
  })
}

// Tamanho seguro aproximado (base64) para não estourar o localStorage do protótipo.
const MAX_OPTIMIZED_KB = 1500

async function handleImageFile(file, callback, { maxWidth = 1800, onOptimized } = {}) {
  if (!file) return
  try {
    const optimized = await compressImage(file, { maxWidth, quality: 0.82 })
    const approxKB = Math.round((optimized.length * 3) / 4 / 1024)
    if (approxKB > MAX_OPTIMIZED_KB) {
      alert('Mesmo após a otimização automática, essa imagem ainda ficou grande demais para o protótipo. Tente uma imagem menor ou com menos detalhes.')
      return
    }
    callback(optimized)
    onOptimized?.()
  } catch {
    alert('Não foi possível processar esta imagem. Tente novamente ou use outro arquivo.')
  }
}

function newId(list) {
  return list.length === 0 ? 1 : Math.max(...list.map(p => p.id)) + 1
}

// ─────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────

function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200)
    return () => clearTimeout(t)
  }, [onDone])
  return <div className="admin-toast"><Check size={14} /> {msg}</div>
}

function ImageUpload({ value, onChange, label, preview = true, maxWidth = 1800 }) {
  const [optimized, setOptimized] = useState(false)
  const [processing, setProcessing] = useState(false)

  const notifyOptimized = () => {
    setOptimized(true)
    setTimeout(() => setOptimized(false), 3500)
  }

  const onFileSelected = async (file) => {
    if (!file) return
    setProcessing(true)
    await handleImageFile(file, onChange, { maxWidth, onOptimized: notifyOptimized })
    setProcessing(false)
  }

  return (
    <div className="admin-img-field">
      {label && <p className="admin-label">{label}</p>}
      {value && preview && (
        <div className="admin-img-preview">
          <img src={value} alt="" />
          <button className="admin-img-remove" onClick={() => onChange(null)}><X size={14} /></button>
        </div>
      )}
      {!value && (
        <label className="admin-img-upload">
          <Upload size={18} />
          <span>{processing ? 'Otimizando imagem...' : 'Clique para selecionar imagem'}</span>
          <span className="admin-img-hint">PNG, JPG ou WebP — redimensionada e comprimida automaticamente</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            disabled={processing}
            onChange={e => onFileSelected(e.target.files?.[0])}
            style={{ display: 'none' }}
          />
        </label>
      )}
      <input
        type="text"
        className="admin-input"
        placeholder="Ou cole uma URL de imagem..."
        value={value && !value.startsWith('data:') ? value : ''}
        onChange={e => onChange(e.target.value || null)}
        style={{ marginTop: value ? 8 : 0 }}
      />
      {optimized && <p className="admin-hint admin-hint-success">Imagem otimizada automaticamente para o protótipo.</p>}
      <p className="admin-hint">Imagem salva apenas neste navegador. Para produção será necessário storage real.</p>
    </div>
  )
}

function Toggle({ checked, onChange }) {
  return (
    <label className="admin-toggle">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <div className="admin-toggle-track">
        <div className="admin-toggle-thumb" />
      </div>
    </label>
  )
}

// ─────────────────────────────────────
// DASHBOARD TAB
// ─────────────────────────────────────

function DashboardTab() {
  const init = () => getAdminContent(ADMIN_KEYS.dashboardBanners, DEFAULT_DASH_BANNERS)
  const [banners, setBanners] = useState(init)
  const [activeSlide, setActiveSlide] = useState(0)
  const [toast, setToast] = useState(null)

  const update = (idx, field, val) => {
    setBanners(prev => prev.map((b, i) => i === idx ? { ...b, [field]: val } : b))
  }

  const save = () => {
    if (setAdminContent(ADMIN_KEYS.dashboardBanners, banners)) setToast('Banners salvos!')
  }

  const reset = () => {
    setBanners(DEFAULT_DASH_BANNERS)
    localStorage.removeItem(ADMIN_KEYS.dashboardBanners)
    setToast('Restaurado para o padrão!')
  }

  const b = banners[activeSlide]

  return (
    <>
      <div>
        <p className="admin-page-title">Dashboard — Banners</p>
        <p className="admin-page-sub">Edite os 3 slides do carrossel do app. Se adicionar imagem, ela substitui o mockup CSS.</p>
      </div>

      <div className="admin-section">
        <div className="admin-slide-tabs">
          {banners.map((b, i) => (
            <button key={i} className={`admin-slide-tab${activeSlide === i ? ' active' : ''}`} onClick={() => setActiveSlide(i)}>
              Slide {i + 1} — {b.tag}
            </button>
          ))}
        </div>

        <div className="admin-section-body">
          <div className="admin-field-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="admin-field">
              <p className="admin-label">Label / Tag</p>
              <input className="admin-input" value={b.tag} onChange={e => update(activeSlide, 'tag', e.target.value)} />
            </div>
            <div className="admin-field">
              <p className="admin-label">Texto do botão</p>
              <input className="admin-input" value={b.btn} onChange={e => update(activeSlide, 'btn', e.target.value)} />
            </div>
          </div>
          <div className="admin-field">
            <p className="admin-label">Título</p>
            <input className="admin-input" value={b.title} onChange={e => update(activeSlide, 'title', e.target.value)} />
          </div>
          <div className="admin-field">
            <p className="admin-label">Descrição</p>
            <textarea className="admin-textarea" rows={2} value={b.text} onChange={e => update(activeSlide, 'text', e.target.value)} />
          </div>
          <ImageUpload
            label="Imagem do slide (substitui o mockup CSS quando definida)"
            value={b.imagem}
            onChange={v => update(activeSlide, 'imagem', v)}
          />
          <div className="admin-actions-row">
            <button className="admin-btn-primary" onClick={save}><Save size={14} /> Salvar banners</button>
            <button className="admin-btn-ghost admin-btn-sm" onClick={reset}><RotateCcw size={12} /> Restaurar padrão</button>
          </div>
        </div>
      </div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </>
  )
}

// ─────────────────────────────────────
// SHOP TAB
// ─────────────────────────────────────

function ShopTab() {
  const [hero, setHero]   = useState(() => getAdminContent(ADMIN_KEYS.shopHero, DEFAULT_SHOP_HERO))
  const [cats, setCats]   = useState(() => getAdminContent(ADMIN_KEYS.shopCategories, DEFAULT_CATEGORIES))
  const [toast, setToast] = useState(null)

  const saveHero = () => {
    if (setAdminContent(ADMIN_KEYS.shopHero, hero)) setToast('Hero do Shop salvo!')
  }

  const saveCats = () => {
    if (setAdminContent(ADMIN_KEYS.shopCategories, cats)) setToast('Categorias salvas!')
  }

  const updateCat = (idx, field, val) => {
    setCats(prev => prev.map((c, i) => i === idx ? { ...c, [field]: val } : c))
  }

  const reset = () => {
    setHero(DEFAULT_SHOP_HERO)
    setCats(DEFAULT_CATEGORIES)
    localStorage.removeItem(ADMIN_KEYS.shopHero)
    localStorage.removeItem(ADMIN_KEYS.shopCategories)
    setToast('Restaurado para o padrão!')
  }

  return (
    <>
      <div>
        <p className="admin-page-title">Studio Shop</p>
        <p className="admin-page-sub">Edite o hero e as categorias da página /app/shop.</p>
      </div>

      {/* Hero */}
      <div className="admin-section">
        <div className="admin-section-header">
          <div>
            <p className="admin-section-title">Hero principal</p>
            <p className="admin-section-sub">Banner de destaque no topo da página</p>
          </div>
        </div>
        <div className="admin-section-body">
          <div className="admin-field-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="admin-field">
              <p className="admin-label">Label</p>
              <input className="admin-input" value={hero.label} onChange={e => setHero(h => ({ ...h, label: e.target.value }))} />
            </div>
            <div className="admin-field">
              <p className="admin-label">Texto do botão</p>
              <input className="admin-input" value={hero.btn} onChange={e => setHero(h => ({ ...h, btn: e.target.value }))} />
            </div>
          </div>
          <div className="admin-field">
            <p className="admin-label">Título</p>
            <input className="admin-input" value={hero.title} onChange={e => setHero(h => ({ ...h, title: e.target.value }))} />
          </div>
          <div className="admin-field">
            <p className="admin-label">Subtítulo</p>
            <textarea className="admin-textarea" rows={2} value={hero.sub} onChange={e => setHero(h => ({ ...h, sub: e.target.value }))} />
          </div>
          <ImageUpload
            label="Imagem do hero (substitui os cards flutuantes CSS)"
            value={hero.imagem}
            onChange={v => setHero(h => ({ ...h, imagem: v }))}
          />
          <div className="admin-actions-row">
            <button className="admin-btn-primary" onClick={saveHero}><Save size={14} /> Salvar hero</button>
            <button className="admin-btn-ghost admin-btn-sm" onClick={reset}><RotateCcw size={12} /> Restaurar padrão</button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="admin-section">
        <div className="admin-section-header">
          <p className="admin-section-title">Categorias</p>
        </div>
        <div className="admin-section-body">
          <div className="admin-cat-list">
            {cats.map((c, i) => (
              <div key={c.id} className="admin-cat-row">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <input
                    className="admin-input"
                    value={c.nome}
                    onChange={e => updateCat(i, 'nome', e.target.value)}
                    style={{ marginBottom: 6 }}
                  />
                  <input
                    className="admin-input"
                    value={c.desc}
                    placeholder="Descrição curta..."
                    onChange={e => updateCat(i, 'desc', e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <p className="admin-label" style={{ fontSize: 10 }}>Ativo</p>
                  <Toggle checked={c.ativo} onChange={v => updateCat(i, 'ativo', v)} />
                </div>
              </div>
            ))}
          </div>
          <div className="admin-actions-row">
            <button className="admin-btn-primary" onClick={saveCats}><Save size={14} /> Salvar categorias</button>
          </div>
        </div>
      </div>

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </>
  )
}

// ─────────────────────────────────────
// PRODUCTS TAB
// ─────────────────────────────────────

const EMPTY_FORM = {
  nome: '', cat: 'Máquinas', marca: '',
  precoAnt: '', preco: '', precoPro: '', parcelas: '', desconto: '',
  badge: '', badgeVariant: 'green', cor: '#8B5CF6',
  imagem: null,
  desc: '', features: '', ativo: true,
}

function ProductsTab() {
  const [products, setProducts] = useState(() => getAdminContent(ADMIN_KEYS.shopProducts, DEFAULT_PRODUCTS))
  const [editing, setEditing]   = useState(null) // product object being edited
  const [toast, setToast]       = useState(null)

  const startAdd = () => setEditing({ ...EMPTY_FORM, id: newId(products) })

  const startEdit = p => setEditing({
    ...p,
    precoAnt:  p.precoAnt  ?? '',
    parcelas:  p.parcelas  ?? '',
    desconto:  p.desconto  ?? '',
    features:  Array.isArray(p.features) ? p.features.join('\n') : (p.features || ''),
  })

  const duplicate = p => {
    const dup = { ...p, id: newId(products), nome: p.nome + ' (cópia)' }
    const updated = [...products, dup]
    setProducts(updated)
    setAdminContent(ADMIN_KEYS.shopProducts, updated)
    setToast('Produto duplicado!')
  }

  const remove = id => {
    if (!confirm('Remover este produto?')) return
    const updated = products.filter(p => p.id !== id)
    setProducts(updated)
    setAdminContent(ADMIN_KEYS.shopProducts, updated)
    setToast('Produto removido!')
  }

  const saveForm = () => {
    const p = {
      ...editing,
      precoAnt:  editing.precoAnt  ? parseFloat(editing.precoAnt)  : null,
      preco:     parseFloat(editing.preco) || 0,
      precoPro:  editing.precoPro  ? parseFloat(editing.precoPro)  : null,
      parcelas:  editing.parcelas  ? parseInt(editing.parcelas)    : null,
      desconto:  editing.desconto  ? parseInt(editing.desconto)    : null,
      features:  editing.features.split('\n').map(s => s.trim()).filter(Boolean),
    }
    const exists = products.some(x => x.id === p.id)
    const updated = exists ? products.map(x => x.id === p.id ? p : x) : [...products, p]
    setProducts(updated)
    setAdminContent(ADMIN_KEYS.shopProducts, updated)
    setEditing(null)
    setToast('Produto salvo!')
  }

  const resetProducts = () => {
    if (!confirm('Restaurar produtos padrão?')) return
    setProducts(DEFAULT_PRODUCTS)
    localStorage.removeItem(ADMIN_KEYS.shopProducts)
    setEditing(null)
    setToast('Produtos restaurados!')
  }

  if (editing) {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="admin-btn-ghost admin-btn-sm" onClick={() => setEditing(null)}>← Voltar</button>
          <p className="admin-page-title">{editing.id && products.some(p => p.id === editing.id) ? 'Editar produto' : 'Novo produto'}</p>
        </div>

        <div className="admin-section">
          <div className="admin-section-body">
            {/* Info básica */}
            <div className="admin-field">
              <p className="admin-label">Nome do produto</p>
              <input className="admin-input" value={editing.nome} onChange={e => setEditing(v => ({ ...v, nome: e.target.value }))} />
            </div>
            <div className="admin-field-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="admin-field">
                <p className="admin-label">Categoria</p>
                <select className="admin-select" value={editing.cat} onChange={e => setEditing(v => ({ ...v, cat: e.target.value }))}>
                  {CATS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="admin-field">
                <p className="admin-label">Marca</p>
                <input className="admin-input" value={editing.marca} onChange={e => setEditing(v => ({ ...v, marca: e.target.value }))} />
              </div>
            </div>

            {/* Preços */}
            <div className="admin-field-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div className="admin-field">
                <p className="admin-label">Preço antigo (opcional)</p>
                <input className="admin-input" type="number" min="0" step="0.01" value={editing.precoAnt} onChange={e => setEditing(v => ({ ...v, precoAnt: e.target.value }))} placeholder="0.00" />
              </div>
              <div className="admin-field">
                <p className="admin-label">Preço atual</p>
                <input className="admin-input" type="number" min="0" step="0.01" value={editing.preco} onChange={e => setEditing(v => ({ ...v, preco: e.target.value }))} placeholder="0.00" />
              </div>
              <div className="admin-field">
                <p className="admin-label">Preço Studio Pro</p>
                <input className="admin-input" type="number" min="0" step="0.01" value={editing.precoPro} onChange={e => setEditing(v => ({ ...v, precoPro: e.target.value }))} placeholder="0.00" />
              </div>
            </div>

            <div className="admin-field-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="admin-field">
                <p className="admin-label">Parcelas</p>
                <input className="admin-input" type="number" min="0" max="24" value={editing.parcelas} onChange={e => setEditing(v => ({ ...v, parcelas: e.target.value }))} placeholder="0" />
              </div>
              <div className="admin-field">
                <p className="admin-label">Desconto %</p>
                <input className="admin-input" type="number" min="0" max="100" value={editing.desconto} onChange={e => setEditing(v => ({ ...v, desconto: e.target.value }))} placeholder="0" />
              </div>
              <div className="admin-field">
                <p className="admin-label">Cor (CSS)</p>
                <div className="admin-color-row">
                  <input type="color" className="admin-color-input" value={editing.cor} onChange={e => setEditing(v => ({ ...v, cor: e.target.value }))} />
                  <input className="admin-input" value={editing.cor} onChange={e => setEditing(v => ({ ...v, cor: e.target.value }))} style={{ flex: 1 }} />
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="admin-field-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="admin-field">
                <p className="admin-label">Badge (texto)</p>
                <input className="admin-input" value={editing.badge} onChange={e => setEditing(v => ({ ...v, badge: e.target.value }))} placeholder="Ex: 30% OFF, Mais vendido..." />
              </div>
              <div className="admin-field">
                <p className="admin-label">Badge (cor)</p>
                <select className="admin-select" value={editing.badgeVariant} onChange={e => setEditing(v => ({ ...v, badgeVariant: e.target.value }))}>
                  {BADGE_VARIANTS.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>

            {/* Imagem */}
            <ImageUpload
              label="Imagem principal"
              value={editing.imagem}
              onChange={v => setEditing(ev => ({ ...ev, imagem: v }))}
            />

            {/* Conteúdo */}
            <div className="admin-field">
              <p className="admin-label">Descrição</p>
              <textarea className="admin-textarea" rows={3} value={editing.desc} onChange={e => setEditing(v => ({ ...v, desc: e.target.value }))} />
            </div>
            <div className="admin-field">
              <p className="admin-label">Características (uma por linha)</p>
              <textarea className="admin-textarea" rows={4} value={editing.features} onChange={e => setEditing(v => ({ ...v, features: e.target.value }))} placeholder={'Motor rotativo silencioso\nTensão 5–12V\nGarantia 12 meses'} />
            </div>

            {/* Status */}
            <div className="admin-toggle-row">
              <div>
                <p className="admin-toggle-label">Produto ativo</p>
                <p className="admin-toggle-sub">Produtos inativos não aparecem na listagem</p>
              </div>
              <Toggle checked={editing.ativo} onChange={v => setEditing(ev => ({ ...ev, ativo: v }))} />
            </div>

            <div className="admin-actions-row">
              <button className="admin-btn-primary" onClick={saveForm}><Save size={14} /> Salvar produto</button>
              <button className="admin-btn-ghost admin-btn-sm" onClick={() => setEditing(null)}>Cancelar</button>
            </div>
          </div>
        </div>
        {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      </>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <p className="admin-page-title">Produtos</p>
          <p className="admin-page-sub">{products.length} produto{products.length !== 1 ? 's' : ''} · Clique em Editar para modificar</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="admin-btn-ghost admin-btn-sm" onClick={resetProducts}><RotateCcw size={12} /> Restaurar padrão</button>
          <button className="admin-btn-primary" onClick={startAdd}><Plus size={14} /> Adicionar produto</button>
        </div>
      </div>

      <div className="admin-section">
        <div className="admin-section-body">
          <div className="admin-products-list">
            {products.map(p => (
              <div key={p.id} className="admin-product-row">
                <div className="admin-product-img" style={{ background: `${p.cor}18`, border: `1px solid ${p.cor}33` }}>
                  {p.imagem
                    ? <img src={p.imagem} alt={p.nome} />
                    : <div style={{ width: 20, height: 20, borderRadius: 5, background: `${p.cor}80` }} />
                  }
                </div>
                <div className="admin-product-info">
                  <p className="admin-product-name">{p.nome}</p>
                  <p className="admin-product-cat">{p.cat} · {p.marca || '—'}</p>
                </div>
                <p className="admin-product-price">
                  {p.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 6, background: p.ativo ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)', color: p.ativo ? '#22C55E' : 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                  {p.ativo ? 'Ativo' : 'Inativo'}
                </div>
                <div className="admin-product-btns">
                  <button className="admin-btn-ghost admin-btn-sm" onClick={() => startEdit(p)}>Editar</button>
                  <button className="admin-btn-ghost admin-btn-sm" onClick={() => duplicate(p)} title="Duplicar"><Copy size={12} /></button>
                  <button className="admin-btn-danger admin-btn-sm" onClick={() => remove(p.id)} title="Remover"><Trash2 size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </>
  )
}

// ─────────────────────────────────────
// LANDING TAB
// ─────────────────────────────────────

function LandingTab() {
  const [data, setData] = useState(() => getAdminContent(ADMIN_KEYS.landing, DEFAULT_LANDING))
  const [shopSec, setShopSec] = useState(() => getAdminContent(ADMIN_KEYS.landingShopSection, DEFAULT_LANDING_SHOP))
  const [activeCard, setActiveCard] = useState(0)
  const [toast, setToast] = useState(null)

  const upd = (field, val) => setData(d => ({ ...d, [field]: val }))
  const updBlock = (block, field, val) => setData(d => ({ ...d, [block]: { ...d[block], [field]: val } }))
  const updCard = (idx, field, val) => setShopSec(s => ({ ...s, cards: s.cards.map((c, i) => i === idx ? { ...c, [field]: val } : c) }))

  const save = () => {
    if (setAdminContent(ADMIN_KEYS.landing, data)) setToast('Landing Page salva!')
  }

  const reset = () => {
    setData(DEFAULT_LANDING)
    localStorage.removeItem(ADMIN_KEYS.landing)
    setToast('Restaurado para o padrão!')
  }

  const saveShopSection = () => {
    if (setAdminContent(ADMIN_KEYS.landingShopSection, shopSec)) setToast('Seção de produtos salva!')
  }

  const resetShopSection = () => {
    setShopSec(DEFAULT_LANDING_SHOP)
    localStorage.removeItem(ADMIN_KEYS.landingShopSection)
    setToast('Seção restaurada para o padrão!')
  }

  return (
    <>
      <div>
        <p className="admin-page-title">Landing Page</p>
        <p className="admin-page-sub">Edite o hero e os blocos principais da página pública.</p>
      </div>

      <div className="admin-section">
        <div className="admin-section-header">
          <div>
            <p className="admin-section-title">Hero principal</p>
            <p className="admin-section-sub">Primeira seção visível ao acessar o site</p>
          </div>
        </div>
        <div className="admin-section-body">
          <div className="admin-field">
            <p className="admin-label">Título</p>
            <input className="admin-input" value={data.heroTitle} onChange={e => upd('heroTitle', e.target.value)} />
          </div>
          <div className="admin-field">
            <p className="admin-label">Subtítulo</p>
            <textarea className="admin-textarea" rows={2} value={data.heroSub} onChange={e => upd('heroSub', e.target.value)} />
          </div>
          <div className="admin-field-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="admin-field">
              <p className="admin-label">Botão primário</p>
              <input className="admin-input" value={data.heroBtnPrimario} onChange={e => upd('heroBtnPrimario', e.target.value)} />
            </div>
            <div className="admin-field">
              <p className="admin-label">Botão secundário</p>
              <input className="admin-input" value={data.heroBtnSecundario} onChange={e => upd('heroBtnSecundario', e.target.value)} />
            </div>
          </div>
          <ImageUpload
            label="Imagem do hero"
            value={data.heroImagem}
            onChange={v => upd('heroImagem', v)}
          />
        </div>
      </div>

      {['bloco1', 'bloco2', 'bloco3'].map((blk, i) => (
        <div key={blk} className="admin-section">
          <div className="admin-section-header">
            <p className="admin-section-title">Bloco {i + 1}</p>
          </div>
          <div className="admin-section-body">
            <div className="admin-field-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="admin-field">
                <p className="admin-label">Título</p>
                <input className="admin-input" value={data[blk].titulo} onChange={e => updBlock(blk, 'titulo', e.target.value)} />
              </div>
              <div className="admin-field">
                <p className="admin-label">Badge</p>
                <input className="admin-input" value={data[blk].badge} onChange={e => updBlock(blk, 'badge', e.target.value)} />
              </div>
            </div>
            <div className="admin-field">
              <p className="admin-label">Descrição</p>
              <textarea className="admin-textarea" rows={2} value={data[blk].desc} onChange={e => updBlock(blk, 'desc', e.target.value)} />
            </div>
            <ImageUpload
              label="Imagem"
              value={data[blk].imagem}
              onChange={v => updBlock(blk, 'imagem', v)}
            />
          </div>
        </div>
      ))}

      <div className="admin-actions-row" style={{ borderTop: 'none', paddingTop: 0 }}>
        <button className="admin-btn-primary" onClick={save}><Save size={14} /> Salvar Landing Page</button>
        <button className="admin-btn-ghost admin-btn-sm" onClick={reset}><RotateCcw size={12} /> Restaurar padrão</button>
      </div>

      {/* ── Seção: Produtos com vantagem Studio Pay ── */}
      <div className="admin-section" style={{ marginTop: 28 }}>
        <div className="admin-section-header">
          <div>
            <p className="admin-section-title">Produtos com vantagem Studio Pay</p>
            <p className="admin-section-sub">Seção de showcase de produtos na landing page pública</p>
          </div>
        </div>
        <div className="admin-section-body">
          <div className="admin-field-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="admin-field">
              <p className="admin-label">Label da seção</p>
              <input className="admin-input" value={shopSec.label} onChange={e => setShopSec(s => ({ ...s, label: e.target.value }))} />
            </div>
            <div className="admin-field">
              <p className="admin-label">Título principal</p>
              <input className="admin-input" value={shopSec.title} onChange={e => setShopSec(s => ({ ...s, title: e.target.value }))} />
            </div>
          </div>
          <div className="admin-field">
            <p className="admin-label">Título em destaque (linha rosa)</p>
            <input className="admin-input" value={shopSec.highlightTitle} onChange={e => setShopSec(s => ({ ...s, highlightTitle: e.target.value }))} />
          </div>
          <div className="admin-field">
            <p className="admin-label">Subtítulo</p>
            <textarea className="admin-textarea" rows={2} value={shopSec.subtitle} onChange={e => setShopSec(s => ({ ...s, subtitle: e.target.value }))} />
          </div>

          <div style={{ marginTop: 20, marginBottom: 8 }}>
            <p className="admin-label" style={{ marginBottom: 6 }}>Cards de produto</p>
            <div className="admin-slide-tabs">
              {shopSec.cards.map((c, i) => (
                <button
                  key={c.id}
                  className={`admin-slide-tab${activeCard === i ? ' active' : ''}${c.active === false ? ' admin-slide-tab-inactive' : ''}`}
                  onClick={() => setActiveCard(i)}
                >
                  Card {i + 1} {c.active === false && '(oculto)'}
                </button>
              ))}
            </div>
          </div>

          {shopSec.cards[activeCard] && (() => {
            const card = shopSec.cards[activeCard]
            const ci = activeCard
            return (
              <div key={card.id}>
                <div className="admin-toggle-row" style={{ marginBottom: 16 }}>
                  <div>
                    <p className="admin-toggle-label">Card visível na landing</p>
                    <p className="admin-toggle-sub">Quando desativado este card não aparece na seção</p>
                  </div>
                  <Toggle checked={card.active !== false} onChange={v => updCard(ci, 'active', v)} />
                </div>
                <div className="admin-field-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div className="admin-field">
                    <p className="admin-label">Título do produto</p>
                    <input className="admin-input" value={card.title} onChange={e => updCard(ci, 'title', e.target.value)} />
                  </div>
                  <div className="admin-field">
                    <p className="admin-label">Badge / tag</p>
                    <input className="admin-input" value={card.badge} onChange={e => updCard(ci, 'badge', e.target.value)} />
                  </div>
                </div>
                <div className="admin-field-row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  <div className="admin-field">
                    <p className="admin-label">Preço normal</p>
                    <input className="admin-input" placeholder="R$ 89,90" value={card.normalPrice} onChange={e => updCard(ci, 'normalPrice', e.target.value)} />
                  </div>
                  <div className="admin-field">
                    <p className="admin-label">Preço Studio Pay</p>
                    <input className="admin-input" placeholder="R$ 79,90" value={card.proPrice} onChange={e => updCard(ci, 'proPrice', e.target.value)} />
                  </div>
                  <div className="admin-field">
                    <p className="admin-label">Economia</p>
                    <input className="admin-input" placeholder="R$ 10,00" value={card.savingText} onChange={e => updCard(ci, 'savingText', e.target.value)} />
                  </div>
                </div>
                <ImageUpload
                  label="Imagem do produto (substitui o placeholder quando definida)"
                  value={card.image}
                  onChange={v => updCard(ci, 'image', v)}
                />
              </div>
            )
          })()}

          <div className="admin-actions-row">
            <button className="admin-btn-primary" onClick={saveShopSection}><Save size={14} /> Salvar seção de produtos</button>
            <button className="admin-btn-ghost admin-btn-sm" onClick={resetShopSection}><RotateCcw size={12} /> Restaurar padrão</button>
          </div>
        </div>
      </div>

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </>
  )
}

// ─────────────────────────────────────
// STUDIO CORE (CONTA DIGITAL) TAB
// ─────────────────────────────────────

function StudioCoreTab() {
  const [hero, setHero] = useState(() => getAdminContent(ADMIN_KEYS.studioCoreSection, DEFAULT_STUDIO_CORE))
  const [toast, setToast] = useState(null)

  const upd = (field, val) => setHero(h => ({ ...h, [field]: val }))

  const save = () => {
    if (setAdminContent(ADMIN_KEYS.studioCoreSection, hero)) setToast('Conta Digital salva!')
  }

  const reset = () => {
    setHero(DEFAULT_STUDIO_CORE)
    localStorage.removeItem(ADMIN_KEYS.studioCoreSection)
    setToast('Restaurado para o padrão!')
  }

  return (
    <>
      <div>
        <p className="admin-page-title">Conta Digital / Studio Core</p>
        <p className="admin-page-sub">Edite o hero principal da página pública /studio-core.</p>
      </div>

      <div className="admin-section">
        <div className="admin-section-header">
          <div>
            <p className="admin-section-title">Hero principal</p>
            <p className="admin-section-sub">Primeira seção visível ao acessar /studio-core</p>
          </div>
        </div>
        <div className="admin-section-body">
          <div className="admin-field">
            <p className="admin-label">Label da seção</p>
            <input className="admin-input" value={hero.heroLabel} onChange={e => upd('heroLabel', e.target.value)} />
          </div>
          <div className="admin-field">
            <p className="admin-label">Título</p>
            <textarea className="admin-textarea" rows={2} value={hero.heroTitle} onChange={e => upd('heroTitle', e.target.value)} />
            <p className="admin-hint">A palavra "acompanhe" (se presente no título) aparece destacada em rosa automaticamente.</p>
          </div>
          <div className="admin-field">
            <p className="admin-label">Subtítulo</p>
            <textarea className="admin-textarea" rows={2} value={hero.heroSub} onChange={e => upd('heroSub', e.target.value)} />
          </div>
          <div className="admin-field-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="admin-field">
              <p className="admin-label">Botão primário</p>
              <input className="admin-input" value={hero.heroBtnPrimario} onChange={e => upd('heroBtnPrimario', e.target.value)} />
            </div>
            <div className="admin-field">
              <p className="admin-label">Botão secundário</p>
              <input className="admin-input" value={hero.heroBtnSecundario} onChange={e => upd('heroBtnSecundario', e.target.value)} />
            </div>
          </div>
          <ImageUpload
            label="Imagem principal desktop (substitui o placeholder do painel quando definida)"
            value={hero.heroImage}
            onChange={v => upd('heroImage', v)}
          />
          <ImageUpload
            label="Imagem mobile (opcional — usada apenas em telas ≤640px; se vazio, a imagem desktop é reaproveitada)"
            value={hero.heroImageMobile}
            onChange={v => upd('heroImageMobile', v)}
            maxWidth={1080}
          />
          <div className="admin-actions-row">
            <button className="admin-btn-primary" onClick={save}><Save size={14} /> Salvar Conta Digital</button>
            <button className="admin-btn-ghost admin-btn-sm" onClick={reset}><RotateCcw size={12} /> Restaurar padrão</button>
          </div>
        </div>
      </div>

      <div className="admin-section" style={{ marginTop: 28 }}>
        <div className="admin-section-header">
          <div>
            <p className="admin-section-title">Cobranças automáticas</p>
            <p className="admin-section-sub">Segunda seção de /studio-core — mockup de WhatsApp e cards de automação</p>
          </div>
        </div>
        <div className="admin-section-body">
          <div className="admin-field">
            <p className="admin-label">Badge</p>
            <input className="admin-input" value={hero.autoChargeBadge} onChange={e => upd('autoChargeBadge', e.target.value)} />
          </div>
          <div className="admin-field">
            <p className="admin-label">Título</p>
            <textarea className="admin-textarea" rows={2} value={hero.autoChargeTitle} onChange={e => upd('autoChargeTitle', e.target.value)} />
            <p className="admin-hint">Use uma quebra de linha para separar as duas linhas do título. As palavras "Configure" e "cobra" aparecem destacadas em rosa automaticamente.</p>
          </div>
          <div className="admin-field">
            <p className="admin-label">Subtítulo</p>
            <textarea className="admin-textarea" rows={2} value={hero.autoChargeSubtitle} onChange={e => upd('autoChargeSubtitle', e.target.value)} />
          </div>
          <ImageUpload
            label="Imagem desktop (substitui o placeholder quando definida)"
            value={hero.autoChargeImage}
            onChange={v => upd('autoChargeImage', v)}
          />
          <ImageUpload
            label="Imagem mobile opcional (usada em telas ≤640px)"
            value={hero.autoChargeImageMobile}
            onChange={v => upd('autoChargeImageMobile', v)}
            maxWidth={1080}
          />
          <p className="admin-hint">Se apenas uma imagem for enviada, ela será reutilizada nas demais versões.</p>
          <div className="admin-field">
            <p className="admin-label">Texto da pill/faixa inferior</p>
            <textarea className="admin-textarea" rows={2} value={hero.autoChargePillText} onChange={e => upd('autoChargePillText', e.target.value)} />
            <p className="admin-hint">A palavra "lembretes" (se presente) aparece destacada em rosa automaticamente.</p>
          </div>
          <div className="admin-actions-row">
            <button className="admin-btn-primary" onClick={save}><Save size={14} /> Salvar Conta Digital</button>
            <button className="admin-btn-ghost admin-btn-sm" onClick={reset}><RotateCcw size={12} /> Restaurar padrão</button>
          </div>
        </div>
      </div>

      <div className="admin-section" style={{ marginTop: 28 }}>
        <div className="admin-section-header">
          <div>
            <p className="admin-section-title">Criar cobrança</p>
            <p className="admin-section-sub">Terceira seção de /studio-core — imagem grande da tela de criação de cobrança</p>
          </div>
        </div>
        <div className="admin-section-body">
          <div className="admin-field">
            <p className="admin-label">Badge</p>
            <input className="admin-input" value={hero.createChargeBadge} onChange={e => upd('createChargeBadge', e.target.value)} />
          </div>
          <div className="admin-field">
            <p className="admin-label">Título</p>
            <textarea className="admin-textarea" rows={2} value={hero.createChargeTitle} onChange={e => upd('createChargeTitle', e.target.value)} />
            <p className="admin-hint">O trecho "seus clientes manualmente." (se presente) aparece destacado em rosa automaticamente.</p>
          </div>
          <div className="admin-field">
            <p className="admin-label">Subtítulo</p>
            <textarea className="admin-textarea" rows={2} value={hero.createChargeSubtitle} onChange={e => upd('createChargeSubtitle', e.target.value)} />
          </div>
          <ImageUpload
            label="Imagem desktop (substitui o placeholder quando definida)"
            value={hero.createChargeImage}
            onChange={v => upd('createChargeImage', v)}
          />
          <ImageUpload
            label="Imagem mobile opcional (usada em telas ≤640px)"
            value={hero.createChargeImageMobile}
            onChange={v => upd('createChargeImageMobile', v)}
            maxWidth={1080}
          />
          <p className="admin-hint">Se apenas uma imagem for enviada, ela será reutilizada nas demais versões.</p>
          <div className="admin-field">
            <p className="admin-label">Texto da pill/faixa inferior</p>
            <textarea className="admin-textarea" rows={2} value={hero.createChargePillText} onChange={e => upd('createChargePillText', e.target.value)} />
            <p className="admin-hint">A palavra "lembretes" (se presente) aparece destacada em rosa automaticamente.</p>
          </div>
          <div className="admin-actions-row">
            <button className="admin-btn-primary" onClick={save}><Save size={14} /> Salvar Conta Digital</button>
            <button className="admin-btn-ghost admin-btn-sm" onClick={reset}><RotateCcw size={12} /> Restaurar padrão</button>
          </div>
        </div>
      </div>

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </>
  )
}

// ─────────────────────────────────────
// CONFIG TAB
// ─────────────────────────────────────

function ConfigTab() {
  const [cfg, setCfg] = useState(() => getAdminContent(ADMIN_KEYS.settings, { studioName: 'Dark Ink Studio', userName: 'Admin', useCustomImages: true }))
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  const save = () => {
    if (setAdminContent(ADMIN_KEYS.settings, cfg)) setToast('Configurações salvas!')
  }

  const clearAll = () => {
    if (!confirm('Limpar todos os dados do Admin Visual? Esta ação não pode ser desfeita.')) return
    resetAllAdminContent()
    setToast('localStorage limpo!')
    setTimeout(() => window.location.reload(), 1200)
  }

  return (
    <>
      <div>
        <p className="admin-page-title">Configurações</p>
        <p className="admin-page-sub">Ajustes gerais do ambiente de protótipo.</p>
      </div>

      <div className="admin-section">
        <div className="admin-section-header">
          <p className="admin-section-title">Dados demo</p>
        </div>
        <div className="admin-section-body">
          <div className="admin-field-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="admin-field">
              <p className="admin-label">Nome do estúdio (demo)</p>
              <input className="admin-input" value={cfg.studioName} onChange={e => setCfg(c => ({ ...c, studioName: e.target.value }))} />
            </div>
            <div className="admin-field">
              <p className="admin-label">Nome do usuário (demo)</p>
              <input className="admin-input" value={cfg.userName} onChange={e => setCfg(c => ({ ...c, userName: e.target.value }))} />
            </div>
          </div>

          <div className="admin-toggle-row">
            <div>
              <p className="admin-toggle-label">Usar imagens customizadas</p>
              <p className="admin-toggle-sub">Quando desativado, o app usa apenas os mockups CSS padrão</p>
            </div>
            <Toggle checked={cfg.useCustomImages} onChange={v => setCfg(c => ({ ...c, useCustomImages: v }))} />
          </div>

          <div className="admin-actions-row">
            <button className="admin-btn-primary" onClick={save}><Save size={14} /> Salvar configurações</button>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <div className="admin-section-header">
          <p className="admin-section-title" style={{ color: '#EF4444' }}>Links rápidos</p>
        </div>
        <div className="admin-section-body">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[['/', 'Ver site'], ['/studio-core', 'Ver Conta Digital'], ['/app/dashboard', 'Ver dashboard'], ['/app/shop', 'Ver Shop'], ['/app/shop/produto/1', 'Ver produto']].map(([to, label]) => (
              <button key={to} className="admin-btn-ghost" onClick={() => navigate(to)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <ExternalLink size={12} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-danger-zone">
        <p style={{ fontSize: 14, fontWeight: 700, color: '#EF4444', marginBottom: 8 }}>Zona de perigo</p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 16, lineHeight: 1.55 }}>
          As ações abaixo são irreversíveis e apagam todos os dados customizados salvos no localStorage.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="admin-btn-danger" onClick={clearAll}><Trash2 size={14} /> Limpar localStorage do Admin</button>
          <button className="admin-btn-danger" onClick={() => { resetAllAdminContent(); setToast('Demo restaurado!'); setTimeout(() => window.location.reload(), 1200) }}>
            <RotateCcw size={14} /> Restaurar conteúdo demo
          </button>
        </div>
      </div>

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </>
  )
}

// ─────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────

export default function AdminPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('dashboard')

  const handleReset = () => {
    if (!confirm('Restaurar todo o conteúdo demo? Todas as alterações no Admin serão perdidas.')) return
    resetAllAdminContent()
    window.location.reload()
  }

  return (
    <div className="admin-root">
      <header className="admin-header">
        <div className="admin-header-logo">
          <div className="admin-logo-mark">SP</div>
          <span className="admin-logo-text">Admin Visual</span>
          <span className="admin-logo-sub">— protótipo</span>
        </div>
        <div className="admin-header-actions">
          <button className="admin-btn-ghost admin-btn-sm" onClick={() => navigate('/')}>
            <ExternalLink size={12} /> Ver site
          </button>
          <button className="admin-btn-ghost admin-btn-sm" onClick={() => navigate('/app/dashboard')}>
            <ExternalLink size={12} /> Ver app
          </button>
          <button className="admin-btn-danger admin-btn-sm" onClick={handleReset}>
            <RotateCcw size={12} /> Restaurar demo
          </button>
        </div>
      </header>

      <div className="admin-notice">
        ⚠️ Ambiente de protótipo — alterações salvas apenas neste navegador via localStorage.
      </div>

      <div className="admin-layout">
        <nav className="admin-sidebar">
          <p className="admin-sidebar-title">Seções</p>
          {TABS.map(t => (
            <button
              key={t.id}
              className={`admin-tab-btn${tab === t.id ? ' active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </nav>

        <main className="admin-content">
          {tab === 'dashboard'  && <DashboardTab />}
          {tab === 'landing'    && <LandingTab />}
          {tab === 'studiocore' && <StudioCoreTab />}
          {tab === 'shop'       && <ShopTab />}
          {tab === 'products'   && <ProductsTab />}
          {tab === 'config'     && <ConfigTab />}
        </main>
      </div>
    </div>
  )
}
