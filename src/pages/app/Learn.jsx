import { useState } from 'react'
import { Play, Award } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { cursos } from '@/data/mockData'

const NIVEL_VARIANT = { Iniciante: 'green', Intermediário: 'yellow', Avançado: 'red' }

export default function Learn() {
  const [filter, setFilter] = useState('Todos')
  const user = JSON.parse(localStorage.getItem('studiopay_user') || '{}')
  const isPro = user.plano === 'Pro' || user.plano === 'Pro+'

  const emAndamento = cursos.filter(c => c.progresso > 0 && c.progresso < 100)
  const concluidos = cursos.filter(c => c.progresso === 100)
  const todos = filter === 'Todos' ? cursos : cursos.filter(c => c.nivel === filter)

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Studio Learn</h1>
        <p>Cursos, workshops e conteúdos para crescer como tatuador e empresário.</p>
      </div>

      {emAndamento.length > 0 && (
        <div className="card mb-24">
          <h2 className="mb-16">Em andamento</h2>
          <div className="grid-auto-cards-lg">
            {emAndamento.map(c => (
              <div key={c.id} style={{ background: 'var(--app-surface-soft)', borderRadius: 12, padding: 16 }}>
                <div className="flex items-center gap-12 mb-12">
                  <span style={{ fontSize: 28 }}>{c.emoji}</span>
                  <div>
                    <p className="font-semibold text-sm">{c.titulo}</p>
                    <p className="text-xs text-muted">{c.instrutor}</p>
                  </div>
                </div>
                <div className="course-progress-label">
                  <span>Progresso</span><span>{c.progresso}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${c.progresso}%` }} />
                </div>
                <button className="btn btn-primary btn-block btn-sm mt-12"><Play size={13}/> Continuar</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {concluidos.length > 0 && (
        <div className="alert alert-green mb-16">
          <Award size={16} color="var(--green)"/>
          <span>Você concluiu <strong>{concluidos.length} curso{concluidos.length > 1 ? 's' : ''}</strong>! Certificado disponível para download.</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-16">
        <h2>Todos os cursos</h2>
        <div className="pill-nav">
          {['Todos', 'Iniciante', 'Intermediário', 'Avançado'].map(f => (
            <button key={f} className={`pill-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grid-auto-cards">
        {todos.map(c => (
          <div key={c.id} className="course-card">
            <div className="course-thumb" style={{ background: c.progresso === 100 ? 'var(--green-dim)' : 'var(--app-premium-dark)' }}>
              {c.progresso === 100 ? '🏆' : c.emoji}
            </div>
            <div className="course-info">
              <div className="flex gap-8 mb-8">
                <Badge variant={NIVEL_VARIANT[c.nivel]}>{c.nivel}</Badge>
                {c.precoPro === 0 && isPro && <Badge variant="pink">Incluso no Pro</Badge>}
              </div>
              <h4>{c.titulo}</h4>
              <p className="course-meta">{c.instrutor} · {c.aulas} aulas · {c.duracao}</p>
              {c.progresso > 0 && (
                <>
                  <div className="course-progress-label"><span>Progresso</span><span>{c.progresso}%</span></div>
                  <div className="progress-bar mb-8"><div className="progress-fill" style={{ width: `${c.progresso}%` }} /></div>
                </>
              )}
              <div className="flex justify-between items-center">
                {isPro && c.precoPro === 0
                  ? <span className="text-green text-sm font-semibold">Incluído no seu plano</span>
                  : <span className="text-sm font-semibold">R$ {isPro && c.precoPro ? c.precoPro : c.preco}</span>
                }
                <button className="btn btn-primary btn-sm">
                  {c.progresso === 100 ? '✓ Concluído' : c.progresso > 0 ? 'Continuar' : 'Acessar'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
