import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', senha: '', remember: false })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.email.trim() || !form.senha.trim()) {
      setError('Preencha e-mail e senha para continuar.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const user = {
        nome: 'Tatuador Demo',
        estudio: 'Dark Ink Studio',
        email: form.email.trim(),
        plano: 'Pro',
        avatar: form.email.trim().charAt(0).toUpperCase(),
      }
      localStorage.setItem('studioPayAuth', 'true')
      localStorage.setItem('studiopay_user', JSON.stringify(user))
      if (form.remember) localStorage.setItem('studiopay_remember', 'true')
      navigate('/app/dashboard')
    }, 800)
  }

  return (
    <div className="auth-page auth-page-login">

      {/* ── ESQUERDO: formulário ── */}
      <div className="auth-left">
        {/* Logo + form agrupados como bloco único centralizado */}
        <div className="auth-login-center">
        <Link to="/" className="auth-logo-link">
          <img
            src="/brand/logo-studio-pay-horizontal-white.png"
            alt="Studio Pay"
            className="auth-logo-img"
          />
        </Link>

        <div className="auth-login-body">
          <div className="auth-form-header">
            <h1>
              Acesse sua<br />
              conta
            </h1>
            <p>
              Entre para acompanhar agenda, financeiro, cobranças e clientes em um só lugar.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>E-mail, CPF ou CNPJ</label>
              <input
                className="form-input"
                type="text"
                placeholder="seu@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <div className="input-with-icon">
                <input
                  className="form-input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.senha}
                  onChange={e => setForm({ ...form, senha: e.target.value })}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-icon-btn"
                  onClick={() => setShowPass(p => !p)}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={e => setForm({ ...form, remember: e.target.checked })}
                />
                Lembrar de mim
              </label>
              <button
                type="button"
                className="auth-forgot text-pink"
                onClick={() =>
                  setError('Recuperação de senha será disponibilizada em breve.')
                }
              >
                Esqueci minha senha
              </button>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
            >
              {loading ? 'Acessando...' : 'Acessar'}
            </button>
          </form>

          <p className="auth-switch">
            Ainda não tem conta?{' '}
            <Link to="/cadastro" className="text-pink">
              Solicitar abertura
            </Link>
          </p>
        </div>
        </div>{/* fim auth-login-center */}
      </div>

      {/* ── DIREITO: visual ── */}
      <div className="auth-right auth-login-right">
        <div className="auth-visual-glow" />

        <div className="auth-login-visual">
          {/* Stack de cartões */}
          <div className="auth-card-stack">
            {/* Cartão de trás — profundidade */}
            <div className="auth-studio-card auth-studio-card-back" />

            {/* Cartão principal — protagonista */}
            <div className="auth-studio-card auth-studio-card-front">
              {/* Anéis decorativos (clipped pelo overflow:hidden) */}
              <div className="auth-card-ring auth-card-ring-sm" />
              <div className="auth-card-ring auth-card-ring-lg" />
              {/* Reflexo de luz no topo */}
              <div className="auth-card-shine" />

              {/* Topo: logo + label */}
              <div className="auth-studio-card-head">
                <img
                  src="/brand/logo-studio-pay-horizontal-white.png"
                  alt="Studio Pay"
                  className="auth-studio-card-logo"
                />
                <span className="auth-studio-card-type">Business</span>
              </div>

              {/* Centro: chip EMV */}
              <div className="auth-card-chip" />

              {/* Base: nome + número + círculos */}
              <div className="auth-studio-card-foot">
                <div className="auth-studio-card-info">
                  <p className="auth-studio-card-name">BILLA SANTOS</p>
                  <p className="auth-card-number">•••• •••• •••• 4820</p>
                </div>
                <div className="auth-studio-card-circles">
                  <span className="auth-studio-card-circle" />
                  <span className="auth-studio-card-circle auth-studio-card-circle-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="auth-visual-tagline">
            <p>Menos caos.<br />Mais controle.</p>
            <span className="auth-visual-tagline-sub">
              O sistema operacional do seu estúdio.
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}
