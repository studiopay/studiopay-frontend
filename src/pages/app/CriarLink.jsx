import { useState } from 'react'
import { Link2, CheckCircle, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CriarLink() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ cliente: '', whatsapp: '', valor: '', descricao: '', vencimento: '' })
  const [success, setSuccess] = useState(false)
  const [mockLink] = useState(() => 'https://studiopay.app/pagar/' + Math.random().toString(36).slice(2, 10))

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSuccess(true)
  }

  if (success) {
    return (
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(34,197,94,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <CheckCircle size={32} style={{ color: 'var(--green)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 22, marginBottom: 8 }}>
            Link gerado com sucesso!
          </h2>
          <p style={{ color: 'var(--app-text-muted)', fontSize: 14, marginBottom: 24 }}>
            O link de pagamento está pronto para ser enviado ao cliente.
          </p>
          <div className="pix-box" style={{ marginBottom: 24, wordBreak: 'break-all' }}>
            {mockLink}
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-ghost" onClick={() => navigate('/app/cobrancas')}>
              Ver cobranças
            </button>
            <button className="btn btn-primary" onClick={() => {
              setForm({ cliente: '', whatsapp: '', valor: '', descricao: '', vencimento: '' })
              setSuccess(false)
            }}>
              Novo link
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => navigate(-1)}
          style={{ marginBottom: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <ArrowLeft size={14} /> Voltar
        </button>
        <h1 style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 24, marginBottom: 6
        }}>
          <Link2 size={22} style={{ color: 'var(--pink)' }} />
          Criar link de pagamento
        </h1>
        <p style={{ color: 'var(--app-text-muted)', fontSize: 14 }}>
          Gere um link para enviar ao cliente por WhatsApp ou redes sociais.
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--app-text-muted)' }}>
              Cliente
            </label>
            <input
              className="form-input"
              name="cliente"
              placeholder="Nome do cliente"
              value={form.cliente}
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--app-text-muted)' }}>
              WhatsApp
            </label>
            <input
              className="form-input"
              name="whatsapp"
              placeholder="(00) 00000-0000"
              value={form.whatsapp}
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--app-text-muted)' }}>
              Valor
            </label>
            <input
              className="form-input"
              name="valor"
              type="number"
              step="0.01"
              min="0"
              placeholder="R$ 0,00"
              value={form.valor}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--app-text-muted)' }}>
              Descrição
            </label>
            <input
              className="form-input"
              name="descricao"
              placeholder="Ex: Sessão de fotos — outubro"
              value={form.descricao}
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--app-text-muted)' }}>
              Vencimento
            </label>
            <input
              className="form-input"
              name="vencimento"
              type="date"
              value={form.vencimento}
              onChange={handleChange}
            />
          </div>
          <button
            className="btn btn-primary btn-block"
            type="submit"
            style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <Link2 size={15} />
            Gerar link
          </button>
        </form>
      </div>
    </div>
  )
}
