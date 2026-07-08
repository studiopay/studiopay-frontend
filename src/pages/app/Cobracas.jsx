import { useState } from 'react'
import { Plus, Copy, Check } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { cobracas } from '@/data/mockData'
import MobileChargesPage from '@/components/dashboard/MobileChargesPage'

const STATUS_VARIANT = { aberto: 'yellow', pago: 'green', vencido: 'red', cancelado: 'gray' }

export default function Cobracas() {
  const [filter, setFilter] = useState('todos')
  const [showModal, setShowModal] = useState(false)
  const [pixCopiado, setPixCopiado] = useState(null)
  const [form, setForm] = useState({ cliente: '', valor: '', desc: '', venc: '' })

  const filtradas = filter === 'todos' ? cobracas : cobracas.filter(c => c.status === filter)

  function copiarPix(id, pix) {
    navigator.clipboard.writeText(pix).catch(() => {})
    setPixCopiado(id)
    setTimeout(() => setPixCopiado(null), 2000)
  }

  const resumo = {
    aberto: cobracas.filter(c => c.status === 'aberto').reduce((s, c) => s + c.valor, 0),
    pago: cobracas.filter(c => c.status === 'pago').reduce((s, c) => s + c.valor, 0),
    vencido: cobracas.filter(c => c.status === 'vencido').reduce((s, c) => s + c.valor, 0),
  }

  return (
    <div className="animate-fade-in">

      {/* ── Cobranças mobile (estilo app financeiro) ─
          Visível apenas abaixo de 768px. O bloco desktop/tablet
          abaixo permanece 100% intocado, apenas oculto nesse
          mesmo breakpoint. ── */}
      <div className="hide-desktop">
        <MobileChargesPage />
      </div>

      {/* ── Cobranças desktop/tablet (layout atual) ── */}
      <div className="hide-mobile">
      <div className="page-header">
        <h1>Cobranças</h1>
        <p>Controle de pagamentos e recebimentos do estúdio.</p>
      </div>

      <div className="stats-grid-3" style={{ marginBottom: 24 }}>
        {[
          { label: 'Em aberto', value: resumo.aberto, color: 'var(--yellow)', bg: 'var(--yellow-dim)' },
          { label: 'Recebidas', value: resumo.pago, color: 'var(--green)', bg: 'var(--green-dim)' },
          { label: 'Vencidas', value: resumo.vencido, color: 'var(--red)', bg: 'var(--red-dim)' },
        ].map((item, i) => (
          <div key={i} className="card" style={{ borderLeft: `3px solid ${item.color}` }}>
            <p className="text-muted text-sm">{item.label}</p>
            <p className="stat-card-value" style={{ color: item.color }}>R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="section-header">
          <div className="tabs" style={{ background: 'none', padding: 0 }}>
            {['todos', 'aberto', 'pago', 'vencido'].map(f => (
              <button key={f} className={`tab-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'todos' ? 'Todas' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}><Plus size={15}/> Nova cobrança</button>
        </div>

        <div className="flex-col gap-8 mt-16">
          {filtradas.map(c => (
            <div key={c.id} className="cobranca-card">
              <div className="cobranca-card-info">
                <p>{c.cliente}</p>
                <span>{c.descricao} · Vence em {new Date(c.vencimento + 'T00:00').toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-12">
                <span className={`cobranca-card-value ${c.status === 'pago' ? 'text-green' : c.status === 'vencido' ? 'text-red' : ''}`}>
                  R$ {c.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <Badge variant={STATUS_VARIANT[c.status]}>{c.status}</Badge>
                {c.pixCopiaECola && (
                  <button className="btn btn-ghost btn-icon btn-sm" onClick={() => copiarPix(c.id, c.pixCopiaECola)}
                    title="Copiar Pix">
                    {pixCopiado === c.id ? <Check size={14} className="text-green"/> : <Copy size={14}/>}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtradas.length > 0 && filtradas[0].pixCopiaECola && (
          <div className="mt-16">
            <p className="text-sm text-muted mb-8">Pix copia e cola — {filtradas[0].cliente}</p>
            <div className="pix-box">{filtradas[0].pixCopiaECola}</div>
          </div>
        )}
      </div>
      </div>

      <Modal title="Nova cobrança" open={showModal} onClose={() => setShowModal(false)}
        footer={<><button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancelar</button><button className="btn btn-primary">Gerar cobrança</button></>}>
        <div className="flex-col gap-16">
          <div className="form-group"><label>Cliente</label><input className="form-input" placeholder="Nome do cliente" value={form.cliente} onChange={e => setForm({...form, cliente: e.target.value})} /></div>
          <div className="form-group"><label>Valor (R$)</label><input className="form-input" type="number" placeholder="0,00" value={form.valor} onChange={e => setForm({...form, valor: e.target.value})} /></div>
          <div className="form-group"><label>Descrição</label><input className="form-input" placeholder="Ex: Sessão blackwork" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} /></div>
          <div className="form-group"><label>Vencimento</label><input className="form-input" type="date" value={form.venc} onChange={e => setForm({...form, venc: e.target.value})} /></div>
          <div className="alert alert-green"><Check size={16}/><span>Um link de pagamento por Pix será gerado e pode ser compartilhado com o cliente.</span></div>
        </div>
      </Modal>
    </div>
  )
}
