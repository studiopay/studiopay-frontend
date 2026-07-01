import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { receitaMensal, agendamentosPorDia, origemClientes } from '@/data/mockData'

const PIE_COLORS = ['#FF2ED1', '#3B82F6', '#22C55E', '#F59E0B']

const ticketMedio = receitaMensal.map(r => ({ ...r, ticket: Math.round(r.valor / [8,9,7,11,10,12][receitaMensal.indexOf(r)]) }))
const faltas = [
  { mes: 'Jan', taxa: 12 }, { mes: 'Fev', taxa: 8 }, { mes: 'Mar', taxa: 15 },
  { mes: 'Abr', taxa: 9 }, { mes: 'Mai', taxa: 7 }, { mes: 'Jun', taxa: 9 },
]
const servicos = [
  { name: 'Blackwork', total: 18 }, { name: 'Fine Line', total: 12 },
  { name: 'Realismo', total: 9 }, { name: 'Aquarela', total: 6 },
  { name: 'Neotradicional', total: 5 }, { name: 'Pontilhismo', total: 4 },
]

const tooltip = { contentStyle: { background: 'var(--app-surface-soft)', border: 'none', borderRadius: 8, color: 'var(--app-text)' } }

export default function Relatorios() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Relatórios</h1>
        <p>Visão completa da performance do seu estúdio.</p>
      </div>

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {[
          { label: 'Receita total 2026', value: 'R$ 63.460', delta: '+18%', color: 'var(--pink)' },
          { label: 'Ticket médio', value: 'R$ 687', delta: '+12%', color: 'var(--green)' },
          { label: 'Clientes novos', value: '23', delta: '+9%', color: 'var(--blue)' },
          { label: 'Taxa de faltas', value: '9%', delta: '-3%', color: 'var(--yellow)' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <p className="stat-card-label">{s.label}</p>
            <p className="stat-card-value" style={{ color: s.color }}>{s.value}</p>
            <p className="text-sm text-green">{s.delta} vs ano anterior</p>
          </div>
        ))}
      </div>

      <div className="grid-2col" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="section-header"><h2>Receita mensal</h2></div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={receitaMensal}>
                <defs>
                  <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--pink)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--pink)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: 'var(--text3)', fontSize: 12 }}/>
                <YAxis hide/>
                <Tooltip {...tooltip} formatter={v => [`R$ ${v.toLocaleString('pt-BR')}`, 'Receita']}/>
                <Area type="monotone" dataKey="valor" stroke="var(--pink)" fill="url(#pinkGrad)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="section-header"><h2>Ticket médio</h2></div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ticketMedio}>
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: 'var(--text3)', fontSize: 12 }}/>
                <YAxis hide/>
                <Tooltip {...tooltip} formatter={v => [`R$ ${v}`, 'Ticket médio']}/>
                <Line type="monotone" dataKey="ticket" stroke="var(--green)" strokeWidth={2} dot={{ fill: 'var(--green)', r: 4 }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid-3col">
        <div className="card">
          <div className="section-header"><h2>Serviços mais feitos</h2></div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={servicos} layout="vertical" barSize={16}>
                <XAxis type="number" hide/>
                <YAxis type="category" dataKey="name" width={90} tick={{ fill: 'var(--text2)', fontSize: 12 }} axisLine={false} tickLine={false}/>
                <Tooltip {...tooltip} formatter={v => [v, 'Sessões']}/>
                <Bar dataKey="total" fill="var(--pink)" radius={[0,4,4,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="section-header"><h2>Origem dos clientes</h2></div>
          <div className="chart-wrapper" style={{ height: 170 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={origemClientes} cx="50%" cy="50%" outerRadius={70} dataKey="value">
                  {origemClientes.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]}/>)}
                </Pie>
                <Tooltip {...tooltip}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="pie-legend">
            {origemClientes.map((item, i) => (
              <div key={i} className="pie-legend-item">
                <span className="pie-dot" style={{ background: PIE_COLORS[i] }}/>
                <span className="text-sm">{item.name}</span>
                <span className="text-sm text-muted ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="section-header"><h2>Taxa de faltas</h2></div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={faltas}>
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: 'var(--text3)', fontSize: 12 }}/>
                <YAxis hide/>
                <Tooltip {...tooltip} formatter={v => [`${v}%`, 'Faltas']}/>
                <Line type="monotone" dataKey="taxa" stroke="var(--red)" strokeWidth={2} dot={{ fill: 'var(--red)', r: 4 }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
