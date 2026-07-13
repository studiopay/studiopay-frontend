import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Check, ArrowRight, Building2, ShieldCheck } from 'lucide-react'

const PLANOS = [
  { id: 'starter', name: 'Starter', price: 'R$ 37,90/mês', desc: 'Organização essencial.' },
  { id: 'pro', name: 'Pro', price: 'R$ 97,90/mês', desc: 'Para crescer organizado.' },
]
const PLANO_IDS = new Set(PLANOS.map(p => p.id))

function formatWhatsapp(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export default function CadastroPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const planoInicial = PLANO_IDS.has(params.get('plano')) ? params.get('plano') : 'pro'

  const [form, setForm] = useState({
    nome: '', estudio: '', cnpj: '', email: '', whatsapp: '',
    senha: '', confirmar: '', plano: planoInicial,
  })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(field) {
    return e => setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.nome.trim()) return setError('Informe seu nome completo.')
    if (!form.email.trim() || !form.email.includes('@')) return setError('Informe um e-mail válido.')
    if (!form.senha || form.senha.length < 8) return setError('A senha deve ter pelo menos 8 caracteres.')
    if (form.senha !== form.confirmar) return setError('As senhas não coincidem. Verifique e tente novamente.')

    setLoading(true)
    setTimeout(() => {
      const user = {
        nome: form.nome.trim(),
        estudio: form.estudio.trim() || 'Meu Estúdio',
        email: form.email.trim(),
        plano: form.plano === 'pro' ? 'Pro' : 'Starter',
        avatar: form.nome.trim().charAt(0).toUpperCase() + (form.nome.trim().split(' ')[1]?.charAt(0) || ''),
      }
      localStorage.setItem('studioPayAuth', 'true')
      localStorage.setItem('studiopay_user', JSON.stringify(user))
      navigate('/onboarding')
    }, 1000)
  }

  return (
    <div className="auth-page auth-page-cadastro">

      {/* ── LADO ESQUERDO — logo + headline ── */}
      <div className="auth-left">
        <Link to="/" className="logo auth-logo">
          <img src="/brand/logo-studio-pay-horizontal-white.png" alt="Studio Pay" className="auth-logo-img" />
        </Link>

        <div className="auth-cadastro-hero">
          <h1 className="auth-cadastro-title">
            Studio Pay.<br />
            <span className="text-pink">Seu estúdio<br />merece.</span>
          </h1>
        </div>

        <div className="auth-glow" />
      </div>

      {/* ── LADO DIREITO — card de cadastro ── */}
      <div className="auth-right">
        <div className="auth-form-wrapper auth-cadastro-card">
          <div className="auth-cadastro-card-head">
            <div>
              <h1 className="auth-cadastro-card-title">Abra sua conta</h1>
              <p className="auth-cadastro-card-sub">Em poucos minutos</p>
            </div>
            <span className="auth-cadastro-step-pill">Etapa 1 de 2</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-grid-2">
              <div className="form-group">
                <label>Nome completo</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="João Silva"
                  value={form.nome}
                  onChange={set('nome')}
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label className="auth-cadastro-label-row">
                  Nome do estúdio <span className="auth-cadastro-optional">Opcional</span>
                </label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Ex.: Black House"
                  value={form.estudio}
                  onChange={set('estudio')}
                />
              </div>
            </div>

            <div className="auth-grid-2">
              <div className="form-group">
                <label>E-mail</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={set('email')}
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label>WhatsApp</label>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="(47) 99999-9999"
                  value={form.whatsapp}
                  onChange={e => setForm(prev => ({ ...prev, whatsapp: formatWhatsapp(e.target.value) }))}
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Tipo de conta</label>
              <div className="auth-cadastro-type-option selected">
                <span className="auth-cadastro-type-icon"><Building2 size={18} strokeWidth={1.8} /></span>
                <span className="auth-cadastro-type-label">Empresa</span>
                <span className="auth-cadastro-type-check"><Check size={12} /></span>
              </div>
            </div>

            <div className="form-group">
              <label>CNPJ</label>
              <input
                className="form-input"
                type="text"
                placeholder="00.000.000/0000-00"
                value={form.cnpj}
                onChange={set('cnpj')}
              />
            </div>

            <div className="auth-grid-2">
              <div className="form-group">
                <label>Senha</label>
                <div className="input-with-icon">
                  <input
                    className="form-input"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Use pelo menos 8 caracteres"
                    value={form.senha}
                    onChange={set('senha')}
                    autoComplete="new-password"
                  />
                  <button type="button" className="input-icon-btn" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Confirmar senha</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Repita a senha"
                  value={form.confirmar}
                  onChange={set('confirmar')}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="auth-cadastro-divider" />

            <div className="form-group">
              <label>Escolha seu plano</label>
              <div className="plan-picker">
                {PLANOS.map(p => (
                  <div
                    key={p.id}
                    className={`plan-pick-card ${form.plano === p.id ? 'selected' : ''}`}
                    onClick={() => setForm(prev => ({ ...prev, plano: p.id }))}
                  >
                    {p.id === 'pro' && <span className="plan-pick-highlight">+ MAIS ESCOLHIDO</span>}
                    {form.plano === p.id && <div className="plan-pick-check"><Check size={12} /></div>}
                    <p className="plan-pick-name">{p.name}</p>
                    <p className="plan-pick-price">{p.price}</p>
                    <p className="plan-pick-desc">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="btn btn-primary btn-block btn-lg auth-cadastro-submit" disabled={loading}>
              {loading ? 'Enviando solicitação...' : <>Continuar cadastro <ArrowRight size={18} /></>}
            </button>

            <div className="auth-cadastro-compliance">
              <span className="auth-cadastro-compliance-icon"><ShieldCheck size={16} strokeWidth={1.8} /></span>
              <p>
                Seus dados são protegidos e utilizados apenas para criação e validação da conta.
                Alguns recursos podem exigir validação cadastral.
              </p>
            </div>
          </form>

          <p className="auth-switch">
            Já tem conta? <Link to="/login" className="text-pink">Entrar</Link>
          </p>
        </div>
      </div>

    </div>
  )
}
