import { useState } from 'react'
import { Search, Plus, MessageCircle, X } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { clientes, agendamentos, transacoes } from '@/data/mockData'

const TAG_VARIANT = { VIP: 'pink', Recorrente: 'blue', Novo: 'green', Sumido: 'yellow' }

export default function Clientes() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = clientes.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.whatsapp.includes(search)
  )

  const clienteAgs = selected ? agendamentos.filter(a => a.cliente === selected.nome) : []

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Clientes</h1>
        <p>Gerencie sua base de clientes.</p>
      </div>

      <div className="flex justify-between items-center mb-16">
        <div className="search-bar" style={{ flex: 1, maxWidth: 360 }}>
          <Search size={16} />
          <input placeholder="Buscar cliente..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn btn-primary btn-sm"><Plus size={15} /> Novo cliente</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20 }}>
        <div className="table-wrapper">
          <table className="table">
            <thead><tr><th>Cliente</th><th>WhatsApp</th><th>Última sessão</th><th>Total gasto</th><th>Tags</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} onClick={() => setSelected(c === selected ? null : c)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div className="flex items-center gap-12">
                      <div className="client-avatar">{c.avatar}</div>
                      <span className="font-medium">{c.nome}</span>
                    </div>
                  </td>
                  <td className="text-muted">{c.whatsapp}</td>
                  <td className="text-muted">{new Date(c.ultimaSessao + 'T00:00').toLocaleDateString('pt-BR')}</td>
                  <td className="text-green font-semibold">R$ {c.totalGasto.toLocaleString('pt-BR')}</td>
                  <td><div className="flex gap-4">{c.tags.map(t => <Badge key={t} variant={TAG_VARIANT[t] || 'gray'}>{t}</Badge>)}</div></td>
                  <td><Badge variant={c.status === 'ativo' ? 'green' : 'gray'}>{c.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="card animate-fade-in" style={{ height: 'fit-content' }}>
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-12">
                <div className="client-avatar" style={{ width: 48, height: 48, fontSize: 18 }}>{selected.avatar}</div>
                <div>
                  <p className="font-semibold">{selected.nome}</p>
                  <p className="text-muted text-sm">{selected.email}</p>
                </div>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setSelected(null)}><X size={16} /></button>
            </div>

            <div className="mini-stats-grid">
              {[
                { label: 'Total gasto', value: `R$ ${selected.totalGasto.toLocaleString('pt-BR')}`, color: 'var(--green)' },
                { label: 'Sessões', value: selected.sessoes },
                { label: 'WhatsApp', value: selected.whatsapp },
                { label: 'Última sessão', value: new Date(selected.ultimaSessao + 'T00:00').toLocaleDateString('pt-BR') },
              ].map((item, i) => (
                <div key={i} className="mini-stat">
                  <p className="label">{item.label}</p>
                  <p className="value" style={{ color: item.color || 'var(--app-text)' }}>{item.value}</p>
                </div>
              ))}
            </div>

            {selected.obs && (
              <div className="alert alert-yellow mb-16"><span>📝</span><span>{selected.obs}</span></div>
            )}

            <h4 className="font-semibold mb-8 text-sm text-muted">HISTÓRICO DE AGENDAMENTOS</h4>
            {clienteAgs.length > 0 ? clienteAgs.map(a => (
              <div key={a.id} className="appointment-item mb-8">
                <span className="appointment-time">{a.horario}</span>
                <div className="appointment-info"><p>{a.servico}</p><span>{new Date(a.data+'T00:00').toLocaleDateString('pt-BR')}</span></div>
                <span className="text-green font-semibold text-sm">R$ {a.valor.toLocaleString('pt-BR')}</span>
              </div>
            )) : <p className="text-muted text-sm">Nenhum agendamento encontrado.</p>}

            <button className="btn btn-primary btn-block mt-16"><MessageCircle size={16}/> Enviar mensagem</button>
          </div>
        )}
      </div>
    </div>
  )
}
