import { useState } from 'react'
import { TrendingUp, ArrowLeft, Calculator } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const FORMAS = ['Pix', 'Crédito à vista', 'Crédito 2x', 'Crédito 3x', 'Débito']
const TAXAS = {
  'Pix': 0.99,
  'Crédito à vista': 2.99,
  'Crédito 2x': 3.49,
  'Crédito 3x': 3.99,
  'Débito': 1.99,
}

function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function SimularVenda() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ valor: '', forma: 'Pix' })
  const [resultado, setResultado] = useState(null)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setResultado(null)
  }

  function handleSimular(e) {
    e.preventDefault()
    const valor = parseFloat(form.valor) || 0
    const taxa = TAXAS[form.forma]
    const taxaValor = valor * (taxa / 100)
    const liquido = valor - taxaValor
    setResultado({ valor, taxa, taxaValor, liquido })
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
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, marginBottom: 6
        }}>
          <TrendingUp size={22} style={{ color: 'var(--pink)' }} />
          Simular venda
        </h1>
        <p style={{ color: 'var(--app-text-muted)', fontSize: 14 }}>
          Calcule o valor que o cliente paga e o quanto entra para o estúdio.
        </p>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <form onSubmit={handleSimular} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--app-text-muted)' }}>
              Valor da venda
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
              Forma de pagamento
            </label>
            <select
              className="form-select"
              name="forma"
              value={form.forma}
              onChange={handleChange}
            >
              {FORMAS.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--app-text-muted)' }}>
              Taxa simulada
            </label>
            <div style={{
              background: 'var(--app-surface-soft)',
              borderRadius: 'var(--radius)',
              padding: '11px 14px',
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--pink)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              {TAXAS[form.forma]}% por transação
            </div>
          </div>
          <button
            className="btn btn-primary btn-block"
            type="submit"
            style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <Calculator size={15} />
            Simular
          </button>
        </form>
      </div>

      {resultado && (
        <div className="card animate-fade-in">
          <p style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.08em', color: 'var(--app-text-muted)', marginBottom: 16
          }}>
            Resultado da simulação
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '13px 0', borderBottom: '1px solid var(--app-border)'
            }}>
              <span style={{ fontSize: 14, color: 'var(--app-text-muted)' }}>Valor cobrado do cliente</span>
              <span style={{ fontSize: 16, fontWeight: 600 }}>{fmt(resultado.valor)}</span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '13px 0', borderBottom: '1px solid var(--app-border)'
            }}>
              <span style={{ fontSize: 14, color: 'var(--app-text-muted)' }}>
                Taxa estimada ({resultado.taxa}%)
              </span>
              <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--red)' }}>
                − {fmt(resultado.taxaValor)}
              </span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 0'
            }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>Valor líquido para o estúdio</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--green)' }}>
                {fmt(resultado.liquido)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
