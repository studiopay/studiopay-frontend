import { useState } from 'react'
import { Plus, TrendingDown, TrendingUp, Wallet, ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import { metricas, transacoes } from '@/data/mockData'

export default function Financeiro() {
  const [showCobranca, setShowCobranca] = useState(false)
  const [showDespesa, setShowDespesa] = useState(false)
  const [filter, setFilter] = useState('todos')
  const [form, setForm] = useState({ cliente: '', valor: '', desc: '', venc: '' })
  const [despForm, setDespForm] = useState({ desc: '', valor: '', cat: 'material' })

  const filtradas = filter === 'todos' ? transacoes : transacoes.filter(t => t.tipo === filter)

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Financeiro</h1>
        <p>Controle completo do dinheiro do seu estúdio.</p>
      </div>

      <div className="stats-grid-4">
        <div className="stat-card">
          <div className="stat-card-header">
            <div><p className="stat-card-label">Saldo disponível</p><p className="stat-card-value">R$ {metricas.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p></div>
            <div className="stat-card-icon" style={{ background: 'var(--pink-dim)' }}><Wallet size={20} color="var(--pink)" /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <div><p className="stat-card-label">Entradas do mês</p><p className="stat-card-value text-green">R$ {metricas.receitaMes.toLocaleString('pt-BR')}</p></div>
            <div className="stat-card-icon" style={{ background: 'var(--green-dim)' }}><ArrowDownLeft size={20} color="var(--green)" /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <div><p className="stat-card-label">Saídas do mês</p><p className="stat-card-value text-red">R$ {metricas.saidaMes.toLocaleString('pt-BR')}</p></div>
            <div className="stat-card-icon" style={{ background: 'var(--red-dim)' }}><ArrowUpRight size={20} color="var(--red)" /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <div><p className="stat-card-label">Lucro estimado</p><p className="stat-card-value text-pink">R$ {metricas.lucroEstimado.toLocaleString('pt-BR')}</p></div>
            <div className="stat-card-icon" style={{ background: 'var(--pink-dim)' }}><TrendingUp size={20} color="var(--pink)" /></div>
          </div>
        </div>
      </div>

      <div className="card mt-24">
        <div className="section-header">
          <h2>Extrato</h2>
          <div className="flex gap-8">
            <button className="btn btn-ghost btn-sm" onClick={() => setShowDespesa(true)}>
              <TrendingDown size={15} /> Despesa
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => setShowCobranca(true)}>
              <Plus size={15} /> Nova cobrança
            </button>
          </div>
        </div>

        <div className="tabs mb-16">
          {['todos', 'entrada', 'saida'].map(f => (
            <button key={f} className={`tab-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'todos' ? 'Todos' : f === 'entrada' ? 'Entradas' : 'Saídas'}
            </button>
          ))}
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr><th>Descrição</th><th>Categoria</th><th>Data</th><th>Valor</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtradas.map(t => (
                <tr key={t.id}>
                  <td>
                    <div className="flex items-center gap-8">
                      <div className="activity-icon" style={{ background: t.tipo === 'entrada' ? 'var(--green-dim)' : 'var(--red-dim)', width: 28, height: 28, borderRadius: 6 }}>
                        <span style={{ fontSize: 12 }}>{t.tipo === 'entrada' ? '↓' : '↑'}</span>
                      </div>
                      {t.descricao}
                    </div>
                  </td>
                  <td><Badge variant="gray">{t.categoria}</Badge></td>
                  <td className="text-muted">{new Date(t.data).toLocaleDateString('pt-BR')}</td>
                  <td className={t.tipo === 'entrada' ? 'amount-pos' : 'amount-neg'}>
                    {t.tipo === 'entrada' ? '+' : '-'}R$ {t.valor.toLocaleString('pt-BR')}
                  </td>
                  <td><Badge variant="green">concluído</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal title="Nova cobrança" open={showCobranca} onClose={() => setShowCobranca(false)}
        footer={<><button className="btn btn-ghost" onClick={() => setShowCobranca(false)}>Cancelar</button><button className="btn btn-primary">Gerar cobrança</button></>}>
        <div className="flex-col gap-16">
          <div className="form-group"><label>Cliente</label><input className="form-input" placeholder="Nome do cliente" value={form.cliente} onChange={e => setForm({ ...form, cliente: e.target.value })} /></div>
          <div className="form-group"><label>Valor (R$)</label><input className="form-input" type="number" placeholder="0,00" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} /></div>
          <div className="form-group"><label>Descrição</label><input className="form-input" placeholder="Ex: Sessão blackwork" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} /></div>
          <div className="form-group"><label>Vencimento</label><input className="form-input" type="date" value={form.venc} onChange={e => setForm({ ...form, venc: e.target.value })} /></div>
          <div className="alert alert-pink"><span>💡</span><span>Após gerar, o cliente recebe um link de pagamento por Pix automaticamente.</span></div>
        </div>
      </Modal>

      <Modal title="Registrar despesa" open={showDespesa} onClose={() => setShowDespesa(false)}
        footer={<><button className="btn btn-ghost" onClick={() => setShowDespesa(false)}>Cancelar</button><button className="btn btn-primary">Registrar</button></>}>
        <div className="flex-col gap-16">
          <div className="form-group"><label>Descrição</label><input className="form-input" placeholder="Ex: Compra de tintas" value={despForm.desc} onChange={e => setDespForm({ ...despForm, desc: e.target.value })} /></div>
          <div className="form-group"><label>Valor (R$)</label><input className="form-input" type="number" placeholder="0,00" value={despForm.valor} onChange={e => setDespForm({ ...despForm, valor: e.target.value })} /></div>
          <div className="form-group"><label>Categoria</label>
            <select className="form-select" value={despForm.cat} onChange={e => setDespForm({ ...despForm, cat: e.target.value })}>
              <option value="material">Material</option><option value="fixo">Custo fixo</option>
              <option value="marketing">Marketing</option><option value="outros">Outros</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
