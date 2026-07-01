import { Plus, TrendingUp, Users, DollarSign, Target } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { campanhas } from '@/data/mockData'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

const semanaData = [
  { dia: 'Seg', leads: 3 }, { dia: 'Ter', leads: 5 }, { dia: 'Qua', leads: 2 },
  { dia: 'Qui', leads: 7 }, { dia: 'Sex', leads: 9 }, { dia: 'Sáb', leads: 4 }, { dia: 'Dom', leads: 1 },
]

export default function Ads() {
  const totalInvestimento = campanhas.reduce((s, c) => s + c.investimento, 0)
  const totalLeads = campanhas.reduce((s, c) => s + c.leads, 0)
  const totalAgs = campanhas.reduce((s, c) => s + c.agendamentos, 0)

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-16">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Studio Ads</h1>
          <p>Tráfego pago gerenciado para o seu estúdio.</p>
        </div>
        <button className="btn btn-primary btn-sm"><Plus size={15}/> Nova campanha</button>
      </div>

      <div className="stats-grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card"><div className="stat-card-header"><div><p className="stat-card-label">Investimento total</p><p className="stat-card-value">R$ {totalInvestimento}</p></div><div className="stat-card-icon" style={{ background: 'var(--pink-dim)' }}><DollarSign size={20} color="var(--pink)"/></div></div></div>
        <div className="stat-card"><div className="stat-card-header"><div><p className="stat-card-label">Leads gerados</p><p className="stat-card-value">{totalLeads}</p></div><div className="stat-card-icon" style={{ background: 'var(--blue-dim)' }}><Users size={20} color="var(--blue)"/></div></div></div>
        <div className="stat-card"><div className="stat-card-header"><div><p className="stat-card-label">Agendamentos</p><p className="stat-card-value">{totalAgs}</p></div><div className="stat-card-icon" style={{ background: 'var(--green-dim)' }}><Target size={20} color="var(--green)"/></div></div></div>
        <div className="stat-card"><div className="stat-card-header"><div><p className="stat-card-label">CPL médio</p><p className="stat-card-value">R$ {(totalInvestimento/totalLeads).toFixed(2)}</p></div><div className="stat-card-icon" style={{ background: 'var(--yellow-dim)' }}><TrendingUp size={20} color="var(--yellow)"/></div></div></div>
      </div>

      <div className="grid-2col" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="section-header"><h2>Leads por dia — semana</h2></div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={semanaData} barSize={28}>
                <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fill: 'var(--text3)', fontSize: 12 }}/>
                <Tooltip contentStyle={{ background: 'var(--app-surface-soft)', border: 'none', borderRadius: 8, color: 'var(--app-text)' }} formatter={v => [v, 'Leads']}/>
                <Bar dataKey="leads" fill="var(--pink)" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h2 className="mb-16">Sugestão do Elison IA</h2>
          <div className="flex-col gap-8">
            {[
              { ico: '📈', text: 'Sua campanha Fine Line tem CPL de R$12,50. Aumentar o orçamento em R$100 pode gerar +8 leads.' },
              { ico: '⏰', text: 'Melhor horário para anunciar: 19h-22h. Você está investindo fora desse horário.' },
              { ico: '🎯', text: 'Segmentar mulheres de 20-35 anos em SP pode reduzir seu CPL em 22%.' },
            ].map((s, i) => (
              <div key={i} className="alert alert-pink">
                <span>{s.ico}</span>
                <span className="text-sm">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-header"><h2>Campanhas</h2></div>
        <div className="flex-col gap-8 mt-16">
          {campanhas.map(c => (
            <div key={c.id} className="campaign-card">
              <div className="campaign-card-header">
                <div>
                  <p className="font-semibold">{c.nome}</p>
                  <p className="text-sm text-muted">{c.plataforma} · {c.inicio} a {c.fim}</p>
                </div>
                <div className="flex items-center gap-8">
                  <Badge variant={c.status === 'ativa' ? 'green' : 'yellow'}>{c.status}</Badge>
                  <button className="btn btn-ghost btn-sm">{c.status === 'ativa' ? 'Pausar' : 'Ativar'}</button>
                </div>
              </div>
              <div className="campaign-metrics">
                <div className="campaign-metric"><p className="campaign-metric-value">R$ {c.investimento}</p><p className="campaign-metric-label">Investimento</p></div>
                <div className="campaign-metric"><p className="campaign-metric-value">{c.leads}</p><p className="campaign-metric-label">Leads</p></div>
                <div className="campaign-metric"><p className="campaign-metric-value">{c.agendamentos}</p><p className="campaign-metric-label">Agendamentos</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
