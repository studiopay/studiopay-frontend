import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Wallet,
  QrCode,
  ReceiptText,
  Link2,
  CreditCard,
  CheckCircle,
  Minus,
  Sparkles,
  Calendar,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  BarChart3,
  PiggyBank,
  Clock,
} from 'lucide-react'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import PublicSiteShell from '@/components/landing/PublicSiteShell'
import Reveal from '@/components/landing/Reveal'
import { getAdminContent, ADMIN_KEYS } from '@/utils/adminContent'

// ── Admin-swappable content (via /admin → Conta Digital) ────────
// O hero (label, título, subtítulo, botões e imagem) é editável pelo
// Admin Visual. Sem edição, os textos e o placeholder padrão abaixo
// são usados.

function readAdminCoreSection() {
  return getAdminContent(ADMIN_KEYS.studioCoreSection, null)
}

// Imagens oficiais de produção — ficam em /public, então sobem junto com o
// deploy independente do que estiver salvo no localStorage do Admin Visual.
// Prioridade: imagem do admin (teste local) > imagem fixa em /public > placeholder.
const HERO_IMAGE_FALLBACK = '/images/studio-pay/conta-digital-hero.webp'
const AUTO_CHARGE_IMAGE_FALLBACK = '/images/studio-pay/conta-digital-cobrancas.webp'
const CREATE_CHARGE_IMAGE_FALLBACK = '/images/studio-pay/conta-digital-criar-cobranca.webp'

// Exibe a imagem (admin ou fallback fixo); só cai para o placeholder se
// nenhuma imagem existir ou se a imagem informada falhar ao carregar.
function FallbackImage({ src, mobileSrc, alt, className, placeholderIcon: PlaceholderIcon, placeholderLabel }) {
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

  return (
    <picture>
      {mobileSrc && mobileSrc !== src && (
        <source media="(max-width: 640px)" srcSet={mobileSrc} />
      )}
      <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
    </picture>
  )
}

// Destaca uma palavra específica do título (ex.: "acompanhe") em rosa,
// mesmo quando o título vem editado pelo admin.
function highlightWord(text, word) {
  if (!text) return text
  const idx = text.toLowerCase().indexOf(word.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <span className="landing-accent">{text.slice(idx, idx + word.length)}</span>
      {text.slice(idx + word.length)}
    </>
  )
}

// Destaca várias palavras/expressões dentro de um texto, preservando o
// restante. Usado quando mais de uma palavra precisa ficar em rosa.
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

const heroCards = [
  { Icon: QrCode, title: 'Pix', text: 'Receba pagamentos instantâneos.' },
  { Icon: ReceiptText, title: 'Boletos', text: 'Gere cobranças profissionais.' },
  { Icon: Link2, title: 'Link de pagamento', text: 'Envie um link e facilite o pagamento.' },
  { Icon: BarChart3, title: 'Financeiro', text: 'Acompanhe sua evolução financeira.' },
]

const bankTxns = [
  { name: 'Sessão — Camila',   value: '+R$ 420,00', when: 'hoje',  type: 'in'  },
  { name: 'Pix — Fernando',    value: '+R$ 150,00', when: 'hoje',  type: 'in'  },
  { name: 'Agulhas e tintas',  value: '-R$ 210,00',  when: 'ontem', type: 'out' },
  { name: 'Aluguel do estúdio', value: '-R$ 900,00', when: '3 dias', type: 'out' },
]

const bankChartValues = [38, 52, 44, 61, 58, 70, 66]

const chargeToggles = [
  { Icon: RefreshCw, title: 'Cobrança automática', text: 'Lembrete enviado no vencimento' },
  { Icon: Sparkles, title: 'Robô pré-tattoo', text: 'Cuidados enviados antes da sessão' },
  { Icon: ShieldCheck, title: 'Robô pós-tattoo', text: 'Cuidados enviados após a sessão' },
]

const flowSteps = ['Agenda', 'Cobrança', 'WhatsApp', 'Pagamento', 'Relatório']

const flowCards = [
  { Icon: Calendar, title: 'Agenda', text: 'Sessão marcada, cobrança organizada.' },
  { Icon: Sparkles, title: 'Elison IA', text: 'Cliente lembrado sem mensagem manual.' },
  { Icon: Wallet, title: 'Conta Digital', text: 'Pagamento recebido e registrado.' },
  { Icon: BarChart3, title: 'Relatórios', text: 'Você entende o resultado do mês.' },
]

// ── Premium window frame ─────────────────────────────────────
// Mostra a imagem administrável (se existir) ou o mockup em CSS.

function CoreWindow({ label, image, alt, children, size = '' }) {
  return (
    <div className={`core-window ${size}`}>
      <div className="core-window-bar">
        <span className="core-window-dots"><span /><span /><span /></span>
        <span className="core-window-label">{label}</span>
      </div>
      <div className="core-window-body">
        {image ? <img src={image} alt={alt} className="core-window-img" /> : children}
      </div>
    </div>
  )
}

// ── Banco / controle financeiro mockup ──────────────────────────

function BankMockup() {
  return (
    <div className="core-mockup" aria-hidden="true">
      <div className="core-mockup-header">
        <div className="core-mockup-brand">
          <Wallet size={13} strokeWidth={1.8} />
          Banco
        </div>
        <span className="core-mockup-status">
          <span className="core-mockup-dot" />
          Sincronizado
        </span>
      </div>

      <div className="core-mockup-balance-wrap">
        <p className="core-mockup-balance-label">Saldo disponível</p>
        <p className="core-mockup-balance">R$ 6.240,00</p>
      </div>

      <div className="core-bank-actions">
        <div className="core-bank-action"><QrCode size={16} strokeWidth={1.8} />Pix</div>
        <div className="core-bank-action"><ReceiptText size={16} strokeWidth={1.8} />Boleto</div>
        <div className="core-bank-action"><Link2 size={16} strokeWidth={1.8} />Link</div>
        <div className="core-bank-action"><CreditCard size={16} strokeWidth={1.8} />Pagar conta</div>
      </div>

      <div className="core-bank-chart">
        {bankChartValues.map((v, i) => (
          <div key={i} className="core-bank-bar" style={{ height: `${v}%` }} />
        ))}
      </div>

      <div className="core-mockup-divider" />
      <p className="core-mockup-txn-title">Transações recentes</p>
      <div className="core-mockup-txns">
        {bankTxns.map((t) => (
          <div key={t.name} className="core-mockup-txn">
            {t.type === 'in'
              ? <CheckCircle size={12} className="core-txn-icon" />
              : <Minus size={12} className="core-txn-icon core-txn-icon-out" />
            }
            <span className="core-txn-name">{t.name}</span>
            <span className={t.type === 'in' ? 'core-txn-value' : 'core-txn-value-out'}>{t.value}</span>
            <span className="core-txn-when">{t.when}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────

const DEFAULT_HERO_TITLE = 'Pague, receba e acompanhe seu dinheiro em um só lugar.'
const DEFAULT_HERO_SUB = 'Receba no Pix, gere boletos, envie links de pagamento e acompanhe a evolução financeira do seu estúdio sem depender de planilhas.'

const DEFAULT_AUTO_BADGE = 'Cobranças automáticas'
const DEFAULT_AUTO_TITLE = 'Configure uma vez.\nO Studio Pay cobra por você.'
const DEFAULT_AUTO_SUB = 'Automatize lembretes e cobranças pelo WhatsApp e tenha mais tempo para o que realmente importa.'
const DEFAULT_AUTO_PILL = 'Automatize cobranças e mensagens no WhatsApp com lembretes enviados no momento certo.'

const DEFAULT_CREATE_BADGE = 'Criar cobrança'
const DEFAULT_CREATE_TITLE = 'Receba sem precisar cobrar\nseus clientes manualmente.'
const DEFAULT_CREATE_SUB = 'Crie uma cobrança em poucos segundos, defina vencimento, valor e forma de envio. O Studio Pay organiza o resto.'
const DEFAULT_CREATE_PILL = 'Automatize cobranças no WhatsApp com lembretes enviados no momento certo.'

export default function StudioCorePage() {
  const admin = readAdminCoreSection()

  const heroLabel = admin?.heroLabel || 'Conta digital Studio Pay'
  const heroTitle = admin?.heroTitle || DEFAULT_HERO_TITLE
  const heroSub = admin?.heroSub || DEFAULT_HERO_SUB
  const heroBtnPrimario = admin?.heroBtnPrimario || 'Começar agora'
  const heroBtnSecundario = admin?.heroBtnSecundario || 'Ver planos'
  // Prioridade: imagem do admin (teste local) > imagem fixa em /public (oficial
  // de produção) > placeholder. Cada versão (desktop/mobile) cai de volta na
  // outra quando a sua própria não existe, antes de cair no fallback fixo.
  const heroImage = admin?.heroImage || admin?.heroImageMobile || HERO_IMAGE_FALLBACK
  const heroImageMobile = admin?.heroImageMobile || admin?.heroImage || HERO_IMAGE_FALLBACK

  const autoBadge = admin?.autoChargeBadge || DEFAULT_AUTO_BADGE
  const autoTitleLines = (admin?.autoChargeTitle || DEFAULT_AUTO_TITLE).split('\n')
  const autoSub = admin?.autoChargeSubtitle || DEFAULT_AUTO_SUB
  const autoPillText = admin?.autoChargePillText || DEFAULT_AUTO_PILL
  const autoDesktopImage = admin?.autoChargeImage || admin?.autoChargeImageMobile || AUTO_CHARGE_IMAGE_FALLBACK
  const autoMobileImage = admin?.autoChargeImageMobile || admin?.autoChargeImage || AUTO_CHARGE_IMAGE_FALLBACK

  const createBadge = admin?.createChargeBadge || DEFAULT_CREATE_BADGE
  const createTitleLines = (admin?.createChargeTitle || DEFAULT_CREATE_TITLE).split('\n')
  const createSub = admin?.createChargeSubtitle || DEFAULT_CREATE_SUB
  const createPillText = admin?.createChargePillText || DEFAULT_CREATE_PILL
  const createDesktopImage = admin?.createChargeImage || admin?.createChargeImageMobile || CREATE_CHARGE_IMAGE_FALLBACK
  const createMobileImage = admin?.createChargeImageMobile || admin?.createChargeImage || CREATE_CHARGE_IMAGE_FALLBACK

  return (
    <PublicSiteShell>
      <Navbar />
      <main className="module-page core-page">

        {/* 1 — Hero */}
        <section className="core-hero">
          <div className="core-hero-glow" />
          <div className="container">
            <div className="core-hero-inner">
              <Reveal className="core-hero-copy-area">
                <div className="core-hero-copy">
                  <span className="section-label">{heroLabel}</span>
                  <h1 className="core-hero-title">
                    {highlightWord(heroTitle, 'acompanhe')}
                  </h1>
                  <p className="core-hero-sub">{heroSub}</p>
                  <div className="core-hero-actions">
                    <Link to="/cadastro" className="btn btn-primary btn-lg">
                      {heroBtnPrimario} <ArrowRight size={18} />
                    </Link>
                    <Link to="/planos" className="btn btn-outline btn-lg">{heroBtnSecundario}</Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100} className="core-hero-visual-area">
                <div className="core-hero-visual">
                  <FallbackImage
                    src={heroImage}
                    mobileSrc={heroImageMobile}
                    alt="Dashboard da Conta Digital"
                    className="core-hero-visual-img"
                    placeholderIcon={Wallet}
                    placeholderLabel="Preview do painel"
                  />
                </div>
              </Reveal>

              <Reveal delay={160} className="core-hero-cards-area">
                <div className="core-solution-grid core-hero-cards">
                  {heroCards.map(({ Icon, title, text }, i) => (
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

            <Reveal delay={180}>
              <p className="core-pill">
                Pix, boletos, links e visão financeira em uma experiência <span className="text-pink">feita para quem vive da tatuagem.</span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* 2 — Cobranças automáticas */}
        <section className="core-auto core-auto-v2 module-section">
          <div className="core-auto-glow" />
          <div className="container">
            <div className="core-auto-grid">
              <Reveal className="core-auto-text-area">
                <span className="section-label">{autoBadge}</span>
                <h2 className="section-title core-auto-title">
                  {autoTitleLines.map((line, i) => (
                    <Fragment key={i}>
                      {highlightWords(line, ['Configure', 'cobra'])}
                      {i < autoTitleLines.length - 1 && <br />}
                    </Fragment>
                  ))}
                </h2>
                <p className="section-sub core-auto-sub">{autoSub}</p>
              </Reveal>

              <Reveal delay={100} className="core-auto-visual-area">
                <div className="core-auto-visual">
                  <FallbackImage
                    src={autoDesktopImage}
                    mobileSrc={autoMobileImage}
                    alt="Cobrança automática no WhatsApp"
                    className="core-auto-visual-img"
                    placeholderIcon={MessageCircle}
                    placeholderLabel="Adicione a imagem pelo admin"
                  />
                </div>
              </Reveal>

              <Reveal delay={160} className="core-auto-cards-area">
                <div className="core-toggle-list">
                  {chargeToggles.map(({ Icon, title, text }, i) => (
                    <Reveal key={title} delay={i * 60}>
                      <div className="core-toggle-card">
                        <span className="core-toggle-switch" aria-hidden="true">
                          <span className="core-toggle-knob" />
                        </span>
                        <span className="core-solution-icon"><Icon size={19} strokeWidth={1.8} /></span>
                        <h3 className="core-solution-title">{title}</h3>
                        <p className="core-solution-text">{text}</p>
                        <span className="core-toggle-action">
                          Configurar <ArrowRight size={12} strokeWidth={2.2} />
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={220}>
              <div className="core-pill core-pill-icon">
                <span className="core-pill-icon-mark" aria-hidden="true">
                  <MessageCircle size={16} strokeWidth={2} />
                </span>
                <p>{highlightWords(autoPillText, ['lembretes'])}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3 — Criar cobrança */}
        <section className="core-create core-create-v2 module-section">
          <div className="core-create-glow" />
          <div className="container">
            <Reveal>
              <div className="section-header-center">
                <span className="section-label">{createBadge}</span>
                <h2 className="section-title core-create-title">
                  {createTitleLines.map((line, i) => (
                    <Fragment key={i}>
                      {highlightWords(line, ['seus clientes manualmente.'])}
                      {i < createTitleLines.length - 1 && <br />}
                    </Fragment>
                  ))}
                </h2>
                <p className="section-sub">{createSub}</p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="core-create-visual">
                <FallbackImage
                  src={createDesktopImage}
                  mobileSrc={createMobileImage}
                  alt="Tela de criação de cobrança"
                  className="core-create-visual-img"
                  placeholderIcon={MessageCircle}
                  placeholderLabel="Imagem da criação de cobrança"
                />
              </div>
            </Reveal>

            <Reveal delay={160}>
              <p className="core-pill">
                {highlightWords(createPillText, ['lembretes'])}
              </p>
            </Reveal>
          </div>
        </section>

        {/*
          Seções antigas 4 ("Controle do dinheiro") e 5 ("Feito para o
          tatuador") continuam fora da renderização. Os componentes/dados
          que elas usavam (BankMockup, CoreWindow, flowSteps, flowCards,
          bankTxns, bankChartValues) foram mantidos no arquivo, só não são
          mais renderizados, para facilitar reintroduzir depois sem
          precisar recriar tudo.
        */}

        {/* 4 — Financeiro do estúdio (sinal → recebimento) */}
        <section className="core-finance module-section">
          <div className="core-finance-glow" />
          <div className="container">
            <Reveal>
              <div className="section-header-center">
                <span className="section-label">Financeiro do estúdio</span>
                <h2 className="section-title core-finance-title">
                  Do sinal ao recebimento final, <span className="landing-accent">tudo fica mais claro.</span>
                </h2>
                <p className="section-sub core-finance-sub">
                  Organize sinais, cobranças e recebimentos em uma visão financeira pensada para a rotina real do
                  tatuador.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="core-finance-panel" aria-hidden="true">
                <div className="core-finance-rows">
                  <div className="core-finance-row">
                    <span className="core-finance-row-icon pending"><Clock size={18} strokeWidth={1.8} /></span>
                    <div className="core-finance-row-copy">
                      <h3 className="core-finance-row-title">Sinal pendente</h3>
                      <p className="core-finance-row-meta">Rafael · Realismo antebraço</p>
                    </div>
                    <div className="core-finance-row-value">
                      <span className="core-finance-row-amount">R$ 150,00</span>
                      <span className="core-finance-row-status pending">Pendente</span>
                    </div>
                  </div>

                  <div className="core-finance-row">
                    <span className="core-finance-row-icon"><CheckCircle size={18} strokeWidth={1.8} /></span>
                    <div className="core-finance-row-copy">
                      <h3 className="core-finance-row-title">Sinal pago</h3>
                      <p className="core-finance-row-meta">Marina · Fechamento de braço</p>
                    </div>
                    <div className="core-finance-row-value">
                      <span className="core-finance-row-amount">R$ 300,00</span>
                      <span className="core-finance-row-status">Pago</span>
                    </div>
                  </div>
                </div>

                <div className="core-finance-revenue">
                  <span className="core-finance-revenue-icon"><Wallet size={17} strokeWidth={1.8} /></span>
                  <div className="core-finance-revenue-copy">
                    <p className="core-finance-revenue-label">Receita prevista</p>
                    <p className="core-finance-revenue-value">Hoje: R$ 1.070,00 · Semana: R$ 4.820,00</p>
                  </div>
                </div>

                <div className="core-finance-summary">
                  <div className="core-finance-summary-item">
                    <p className="core-finance-summary-label">A receber</p>
                    <p className="core-finance-summary-value">R$ 1.570,00</p>
                  </div>
                  <div className="core-finance-summary-item">
                    <p className="core-finance-summary-label">Recebido</p>
                    <p className="core-finance-summary-value received">R$ 980,00</p>
                  </div>
                  <div className="core-finance-summary-item">
                    <p className="core-finance-summary-label">Pendente</p>
                    <p className="core-finance-summary-value pending">R$ 450,00</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <p className="core-pill core-finance-pill">
                Menos cobrança perdida, <span className="text-pink">mais controle</span> sobre o dinheiro que
                entra no estúdio.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 5 — CTA final específico da Conta Digital */}
        <section className="core-final module-section">
          <div className="core-final-glow" />
          <div className="container">
            <Reveal>
              <div className="core-final-panel">
                <span className="section-label">Conta Digital Studio Pay</span>
                <h2 className="section-title core-final-title">
                  Receba, cobre e acompanhe o dinheiro do seu estúdio<br />
                  <span className="landing-accent">em um só lugar.</span>
                </h2>
                <p className="section-sub core-final-sub">
                  Controle cobranças, sinais e recebimentos sem depender de planilhas ou conversas perdidas.
                </p>

                <div className="core-final-benefits">
                  {['Pix e boleto', 'Sinais organizados', 'Cobranças no lugar', 'Financeiro claro'].map((label) => (
                    <span key={label} className="core-final-benefit">{label}</span>
                  ))}
                </div>

                <div className="core-final-actions">
                  <Link to="/cadastro" className="btn btn-primary btn-lg">
                    Começar agora <ArrowRight size={18} />
                  </Link>
                  <Link to="/planos" className="btn btn-ghost btn-lg">Ver planos</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer showCta={false} />
    </PublicSiteShell>
  )
}
