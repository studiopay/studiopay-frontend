import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

const STEPS = ['Seu estúdio', 'Horários', 'Serviços', 'Objetivo', 'Pronto!']

const SERVICOS = ['Blackwork', 'Realismo', 'Fine Line', 'Aquarela', 'Neotradicional', 'Old School', 'Pontilhismo', 'Lettering', 'Geométrico', 'Tribal']
const OBJETIVOS = [
  { id: 'agenda', label: 'Organizar minha agenda', emoji: '📅' },
  { id: 'financeiro', label: 'Controlar meu financeiro', emoji: '💰' },
  { id: 'automacao', label: 'Automatizar atendimento', emoji: '🤖' },
  { id: 'vender', label: 'Vender mais', emoji: '📈' },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('studiopay_user') || '{}')
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    estudio: user.estudio || '',
    cidade: '',
    abertura: '09:00',
    fechamento: '18:00',
    diasFuncionamento: ['Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    servicos: [],
    objetivo: '',
  })

  function toggleDia(dia) {
    const dias = data.diasFuncionamento.includes(dia)
      ? data.diasFuncionamento.filter(d => d !== dia)
      : [...data.diasFuncionamento, dia]
    setData({ ...data, diasFuncionamento: dias })
  }

  function toggleServico(s) {
    const list = data.servicos.includes(s)
      ? data.servicos.filter(x => x !== s)
      : [...data.servicos, s]
    setData({ ...data, servicos: list })
  }

  function finish() {
    localStorage.setItem('studiopay_onboarding', 'true')
    localStorage.setItem('studiopay_config', JSON.stringify(data))
    navigate('/app/dashboard')
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-header">
        <div className="logo">
          <img src="/brand/logo-studio-pay-horizontal-white.png" alt="Studio Pay" className="auth-logo-img" />
        </div>
        <p className="onboarding-welcome">Vamos configurar seu Studio Pay, {user.nome?.split(' ')[0] || 'tatuador'} 🖤</p>
      </div>

      <div className="onboarding-stepper">
        {STEPS.map((s, i) => (
          <div key={i} className="step" style={{ flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <div className={`step-circle ${i < step ? 'done' : i === step ? 'active' : ''}`}>
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            {i < STEPS.length - 1 && <div className={`step-line ${i < step ? 'done' : ''}`} />}
          </div>
        ))}
      </div>

      <div className="onboarding-card">
        {step === 0 && (
          <div className="animate-fade-in">
            <h2>Dados do seu estúdio</h2>
            <p className="text-muted mt-8 mb-24">Essas informações aparecem no seu perfil público.</p>
            <div className="flex-col gap-16">
              <div className="form-group">
                <label>Nome do estúdio</label>
                <input className="form-input" value={data.estudio} onChange={e => setData({ ...data, estudio: e.target.value })} placeholder="Dark Ink Studio" />
              </div>
              <div className="form-group">
                <label>Cidade</label>
                <input className="form-input" value={data.cidade} onChange={e => setData({ ...data, cidade: e.target.value })} placeholder="São Paulo, SP" />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in">
            <h2>Horário de funcionamento</h2>
            <p className="text-muted mt-8 mb-24">Configure quando você atende.</p>
            <div className="flex-col gap-16">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Abertura</label>
                  <input className="form-input" type="time" value={data.abertura} onChange={e => setData({ ...data, abertura: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Fechamento</label>
                  <input className="form-input" type="time" value={data.fechamento} onChange={e => setData({ ...data, fechamento: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Dias de atendimento</label>
                <div className="dias-picker">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(dia => (
                    <button key={dia} type="button"
                      className={`dia-btn ${data.diasFuncionamento.includes(dia) ? 'active' : ''}`}
                      onClick={() => toggleDia(dia)}>{dia}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2>Quais estilos você tatua?</h2>
            <p className="text-muted mt-8 mb-24">Escolha quantos quiser.</p>
            <div className="servicos-picker">
              {SERVICOS.map(s => (
                <button key={s} type="button"
                  className={`servico-btn ${data.servicos.includes(s) ? 'active' : ''}`}
                  onClick={() => toggleServico(s)}>
                  {data.servicos.includes(s) && <Check size={12} />} {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h2>Qual é seu objetivo principal?</h2>
            <p className="text-muted mt-8 mb-24">Vamos personalizar sua experiência.</p>
            <div className="objetivo-picker">
              {OBJETIVOS.map(o => (
                <div key={o.id}
                  className={`objetivo-card ${data.objetivo === o.id ? 'active' : ''}`}
                  onClick={() => setData({ ...data, objetivo: o.id })}>
                  <span className="objetivo-emoji">{o.emoji}</span>
                  <p>{o.label}</p>
                  {data.objetivo === o.id && <div className="objetivo-check"><Check size={14} /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in onboarding-done">
            <div className="done-icon">🖤</div>
            <h2>Tudo pronto!</h2>
            <p className="text-muted">Seu Studio Pay está configurado e pronto pra usar.<br />Bem-vindo ao sistema operacional do seu estúdio.</p>
          </div>
        )}

        <div className="onboarding-actions">
          {step > 0 && step < 4 && (
            <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>Voltar</button>
          )}
          {step < 4 ? (
            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
              Próximo <ArrowRight size={16} />
            </button>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={finish}>
              Ir para o Dashboard <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
