import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Check } from 'lucide-react'

const PLANOS = [
  { id: 'starter', name: 'Starter', price: 'R$ 37,90/mês', desc: 'Para começar organizado.' },
  { id: 'pro', name: 'Pro', price: 'R$ 97,90/mês', desc: 'Para crescer com automação.' },
]
const PLANO_IDS = new Set(PLANOS.map(p => p.id))

const PROCESS_STEPS = [
  { title: 'Você informa os dados', text: 'Preencha nome, e-mail, CNPJ e escolha o plano.' },
  { title: 'Análise cadastral', text: 'As informações passam por validação interna de segurança.' },
  { title: 'Ativação do acesso', text: 'Você recebe confirmação quando o acesso estiver liberado.' },
  { title: 'Organização da rotina', text: 'Comece pelo módulo que mais pesa hoje e conecte o resto no seu tempo.' },
]

export default function CadastroPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const planoInicial = PLANO_IDS.has(params.get('plano')) ? params.get('plano') : 'starter'

  const [form, setForm] = useState({
    nome: '', estudio: '', cnpj: '', email: '',
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
    if (!form.senha || form.senha.length < 6) return setError('A senha deve ter pelo menos 6 caracteres.')
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
    <div className="auth-page">

      {/* ── LADO ESQUERDO — processo de abertura ── */}
      <div className="auth-left">
        <Link to="/" className="logo auth-logo">
          <img src="/brand/logo-studio-pay-horizontal-white.png" alt="Studio Pay" className="auth-logo-img" />
        </Link>

        <div className="auth-hero-text">
          <h2>Sua conta para organizar o estúdio.</h2>
          <p>Uma operação financeira e de gestão pensada para tatuadores.</p>
        </div>

        <div className="auth-process">
          <p className="auth-process-title">Como funciona a abertura</p>
          <div className="auth-process-steps">
            {PROCESS_STEPS.map((step, i) => (
              <div className="auth-process-step" key={i}>
                <div className="auth-process-step-num">{i + 1}</div>
                <div className="auth-process-step-body">
                  <span className="auth-process-step-label">{step.title}</span>
                  <span className="auth-process-step-text">{step.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-glow" />
      </div>

      {/* ── LADO DIREITO — formulário ── */}
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <h1>Solicite sua conta Studio Pay</h1>
            <p>
              Informe seus dados para iniciar a abertura. A ativação pode passar por análise
              cadastral e validação de segurança.
            </p>
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
                <label>Nome do estúdio</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Opcional"
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
                <label>CNPJ ou CPF</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="00.000.000/0001-00"
                  value={form.cnpj}
                  onChange={set('cnpj')}
                />
              </div>
            </div>

            <div className="auth-grid-2">
              <div className="form-group">
                <label>Senha</label>
                <div className="input-with-icon">
                  <input
                    className="form-input"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Mín. 6 caracteres"
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

            <div className="form-group">
              <label>Plano</label>
              <div className="plan-picker">
                {PLANOS.map(p => (
                  <div
                    key={p.id}
                    className={`plan-pick-card ${form.plano === p.id ? 'selected' : ''}`}
                    onClick={() => setForm(prev => ({ ...prev, plano: p.id }))}
                  >
                    {form.plano === p.id && <div className="plan-pick-check"><Check size={12} /></div>}
                    <p className="plan-pick-name">{p.name}</p>
                    <p className="plan-pick-price">{p.price}</p>
                    <p className="plan-pick-desc">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
              {loading ? 'Enviando solicitação...' : 'Solicitar abertura'}
            </button>

            <p className="auth-compliance">
              A abertura da conta está sujeita à análise cadastral e validação das informações.
            </p>
            <p className="auth-compliance">
              Produtos financeiros podem ser oferecidos por parceiros autorizados, conforme
              disponibilidade e análise.
            </p>
          </form>

          <p className="auth-switch">
            Já tem conta? <Link to="/login" className="text-pink">Acessar</Link>
          </p>
        </div>
      </div>

    </div>
  )
}
