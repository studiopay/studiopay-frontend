import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({ label, value, icon: Icon, iconBg = 'var(--pink-dim)', iconColor = 'var(--pink)', delta, prefix = '', suffix = '' }) {
  const isPositive = delta >= 0

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div>
          <p className="stat-card-label">{label}</p>
          <p className="stat-card-value">{prefix}{value}{suffix}</p>
        </div>
        {Icon && (
          <div className="stat-card-icon" style={{ background: iconBg }}>
            <Icon size={20} color={iconColor} />
          </div>
        )}
      </div>
      {delta !== undefined && (
        <div className={`stat-card-delta ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {Math.abs(delta)}% vs mês anterior
        </div>
      )}
    </div>
  )
}
