import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Copy, Send } from 'lucide-react'
import { clientes } from '@/data/mockData'

const TIPOS = ['Sinal', 'Total', 'Parcela', 'Retoque', 'Outro']
const ENVIOS = ['WhatsApp', 'Link de pagamento', 'PIX manual']

const MOCK_PIX = '00020126360014BR.GOV.BCB.PIX0114+5511940000000052040000530398654041.005802BR5913StudioPay6008SaoPaulo62070503***6304A1B2'

export default function CriarCobranca() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    cliente: '',
    whatsapp: '',
    tipo: 'Total',
    valor: '',
    vencimento: '',
    descricao: '',
    envio: 'WhatsApp',
  })
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  function handleClienteChange(e) {
    const nome = e.target.value
    const c = clientes.find(c => c.nome === nome)
    setForm(f => ({ ...f, cliente: nome, whatsapp: c ? c.whatsapp : '' }))
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  function handleCopy() {
    navigator.clipboard.writeText(MOCK_PIX).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (sent) {
    return (
      <div className="animate-fade-in">
        <button className="btn btn-ghost btn-sm mb-24" onClick={() => setSent(false)}>
          <ArrowLeft size={15} /> Criar outra
        </button>

        <div className="card" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', padding: '48px 32px' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--green-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle size={32} color="var(--green)" />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Cobrança criada!</h2>
          <p className="text-muted" style={{ marginBottom: 32 }}>
            {form.cliente ? `Cobrança para ${form.cliente} ` : 'Cobrança '}
            de <strong className="text-pink">R$ {Number(form.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> gerada com sucesso.
          </p>

          {form.envio !== 'PIX manual' && (
            <div className="alert alert-green" style={{ marginBottom: 24, textAlign: 'left' }}>
              <Send size={16} />
              <span>
                {form.envio === 'WhatsApp'
                  ? `Link enviado via WhatsApp para ${form.whatsapp || form.cliente}`
                  : 'Link de pagamento gerado e pronto para compartilhar'}
              </span>
            </div>
          )}

          <div style={{ background: 'var(--app-surface-soft)', borderRadius: 10, padding: '16px', marginBottom: 24 }}>
            <p className="text-muted text-xs" style={{ marginBottom: 8, textAlign: 'left', letterSpacing: '0.05em' }}>PIX COPIA E COLA</p>
            <p style={{ fontSize: 11, wordBreak: 'break-all', color: 'var(--app-text)', fontFamily: 'monospace', textAlign: 'left', lineHeight: 1.6 }}>{MOCK_PIX}</p>
            <button className="btn btn-ghost btn-sm btn-block" style={{ marginTop: 12 }} onClick={handleCopy}>
              <Copy size={14} /> {copied ? 'Copiado!' : 'Copiar codigo PIX'}
            </button>
          </div>

          <div className="flex gap-8" style={{ justifyContent: 'center' }}>
            <button className="btn btn-ghost" onClick={() => navigate('/app/cobrancas')}>Ver cobranças</button>
            <button className="btn btn-primary" onClick={() => { setSent(false); setForm({ cliente: '', whatsapp: '', tipo: 'Total', valor: '', vencimento: '', descricao: '', envio: 'WhatsApp' }) }}>
              Nova cobrança
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-12 mb-24">
        <button className="btn btn-ghost btn-icon" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Criar cobrança</h1>
          <p className="text-muted" style={{ fontSize: 13 }}>Gere uma cobrança e envie para o cliente em segundos.</p>
        </div>
      </div>

      <div className="criar-cobranca-grid">
        <form className="card" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="form-group">
            <label>Cliente</label>
            <select className="form-select" name="cliente" value={form.cliente} onChange={handleClienteChange}>
              <option value="">Selecione um cliente...</option>
              {clientes.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>WhatsApp</label>
            <input className="form-input" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="(11) 99999-9999" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label>Tipo</label>
              <select className="form-select" name="tipo" value={form.tipo} onChange={handleChange}>
                {TIPOS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Valor (R$)</label>
              <input className="form-input" name="valor" type="number" min="1" step="0.01" value={form.valor} onChange={handleChange} placeholder="0,00" required />
            </div>
          </div>

          <div className="form-group">
            <label>Vencimento</label>
            <input className="form-input" name="vencimento" type="date" value={form.vencimento} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea className="form-textarea" name="descricao" value={form.descricao} onChange={handleChange} placeholder="Ex: Sessão blackwork - 2a parte, manga esquerda" rows={3} />
          </div>

          <div className="form-group">
            <label>Forma de envio</label>
            <select className="form-select" name="envio" value={form.envio} onChange={handleChange}>
              {ENVIOS.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>

          <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={!form.valor}>
            <Send size={16} /> Gerar e enviar cobrança
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: '20px' }}>
            <p className="text-muted text-xs" style={{ letterSpacing: '0.06em', marginBottom: 16 }}>RESUMO DA COBRANÇA</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Cliente', value: form.cliente || 'Nao selecionado' },
                { label: 'WhatsApp', value: form.whatsapp || '—' },
                { label: 'Tipo', value: form.tipo },
                { label: 'Valor', value: form.valor ? `R$ ${Number(form.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '—', bold: true, color: 'var(--pink)' },
                { label: 'Vencimento', value: form.vencimento ? new Date(form.vencimento + 'T12:00').toLocaleDateString('pt-BR') : '—' },
                { label: 'Envio via', value: form.envio },
              ].map(({ label, value, bold, color }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span className="text-muted text-sm">{label}</span>
                  <span style={{ fontSize: 13, fontWeight: bold ? 700 : 500, color: color || 'var(--app-text)', textAlign: 'right', maxWidth: 180 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: 'var(--pink-dim)', border: '1px solid rgba(255,46,209,0.18)' }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--pink)', marginBottom: 6 }}>Dica do Elison IA</p>
            <p className="text-muted text-sm">Cobranças enviadas via WhatsApp tem taxa de abertura 3x maior do que e-mail. Defina sempre um vencimento para aumentar as conversoes.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
