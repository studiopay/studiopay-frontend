import { useState, useMemo, useEffect, useCallback } from 'react'
import {
  Plus, Bell, MessageCircle, CheckCircle, Check, Calendar,
  Clock, ChevronLeft, ChevronRight, X,
} from 'lucide-react'
import Modal from '@/components/ui/Modal'

// ── Dados iniciais ────────────────────────────────────────────────────────────
const AGENDA_INICIAL = [
  { id: 1, cliente: 'Ana Beatriz Souza', servico: 'Blackwork Manga',   data: '2026-06-30', horario: '10:00', duracao: 3,   valor: 800,  status: 'confirmado', cor: '#8B5CF6', avatar: 'AB', obs: '' },
  { id: 2, cliente: 'Diego Ramos',       servico: 'Realismo Colorido', data: '2026-07-01', horario: '09:00', duracao: 4,   valor: 1200, status: 'confirmado', cor: '#EC4899', avatar: 'DR', obs: 'Costas — segunda sessão' },
  { id: 3, cliente: 'Julia Torres',      servico: 'Fine Line',         data: '2026-07-01', horario: '14:00', duracao: 1.5, valor: 350,  status: 'pendente',   cor: '#3B82F6', avatar: 'JT', obs: 'Primeira sessão' },
  { id: 4, cliente: 'Sabrina Alves',     servico: 'Neotradicional',    data: '2026-07-02', horario: '11:00', duracao: 2.5, valor: 900,  status: 'confirmado', cor: '#F59E0B', avatar: 'SA', obs: '' },
  { id: 5, cliente: 'Carlos Mendes',     servico: 'Pontilhismo',       data: '2026-07-02', horario: '15:00', duracao: 2,   valor: 600,  status: 'pendente',   cor: '#14B8A6', avatar: 'CM', obs: '' },
  { id: 6, cliente: 'Rafael Nunes',      servico: 'Aquarela',          data: '2026-07-03', horario: '10:00', duracao: 3,   valor: 750,  status: 'confirmado', cor: '#F97316', avatar: 'RN', obs: '' },
  { id: 7, cliente: 'Thais Pereira',     servico: 'Tribal Maori',      data: '2026-07-03', horario: '14:00', duracao: 2,   valor: 480,  status: 'confirmado', cor: '#6366f1', avatar: 'TP', obs: '' },
  { id: 8, cliente: 'Fernanda Lima',     servico: 'Mini Tattoo',       data: '2026-07-04', horario: '10:00', duracao: 1,   valor: 250,  status: 'confirmado', cor: '#22C55E', avatar: 'FL', obs: '' },
  { id: 9, cliente: 'Marcos Vieira',     servico: 'Blackwork',         data: '2026-07-05', horario: '14:00', duracao: 2.5, valor: 550,  status: 'confirmado', cor: '#8B5CF6', avatar: 'MV', obs: '' },
]

const AUTOMATIONS_INICIAL = [
  {
    icon: Bell, color: 'var(--pink)', bg: 'var(--pink-dim)',
    title: 'Confirmação automática', desc: 'Elison confirma 24h antes',
    quando: '24h antes da sessão',
    on: true, usarPadrao: true, mensagemCustom: '',
    mensagemPadrao: `Olá, {{cliente}}! Tudo certo? 😊

Seu horário no {{estudio}} está confirmado:

📅 Data: {{data}}
⏰ Horário: {{horario}}
🎨 Serviço: {{servico}}

Qualquer dúvida, é só chamar por aqui! 🎨`,
  },
  {
    icon: MessageCircle, color: 'var(--blue)', bg: 'var(--blue-dim)',
    title: 'Robô pré-tattoo', desc: 'Cuidados enviados 2h antes',
    quando: '2h antes da sessão',
    on: true, usarPadrao: true, mensagemCustom: '',
    mensagemPadrao: `Oi, {{cliente}}! Sua sessão é hoje! 🙌

📅 {{data}} às {{horario}}
🎨 {{servico}}

Lembretinhos rápidos:
• Chegue hidratado(a) e bem alimentado(a)
• Use roupa que dê acesso fácil ao local da tattoo
• Se precisar remarcar, me avisa o quanto antes!

Até mais tarde! 💉`,
  },
  {
    icon: CheckCircle, color: 'var(--green)', bg: 'var(--green-dim)',
    title: 'Robô pós-tattoo', desc: 'Cicatrização enviada após sessão',
    quando: 'Após o término da sessão',
    on: true, usarPadrao: true, mensagemCustom: '',
    mensagemPadrao: `Olá, {{cliente}}! Que sessão incrível! 💜

Aqui estão os cuidados essenciais para a sua {{servico}}:

✅ Lave 2-3x ao dia com sabão neutro
✅ Aplique pomada cicatrizante em camada fina
✅ Evite sol direto, piscina e coçar

Qualquer dúvida pode me chamar. Até a próxima! 🖤`,
  },
  {
    icon: Bell, color: 'var(--yellow)', bg: 'var(--yellow-dim)',
    title: 'Lembretes ativos', desc: '3 lembretes configurados',
    quando: '3 dias antes da sessão',
    on: false, usarPadrao: true, mensagemCustom: '',
    mensagemPadrao: `Oi, {{cliente}}! 👋

Só passando pra lembrar que seu agendamento tá chegando:

📅 Data: {{data}}
⏰ Horário: {{horario}}
📍 Local: {{estudio}}
🎨 Serviço: {{servico}}

Qualquer dúvida ou precisar remarcar, é só chamar! 😊`,
  },
]

const AUTO_VARS = [
  { tag: '{{cliente}}',  label: 'Nome do cliente'   },
  { tag: '{{estudio}}',  label: 'Nome do estúdio'   },
  { tag: '{{data}}',     label: 'Data da sessão'    },
  { tag: '{{horario}}',  label: 'Horário da sessão' },
  { tag: '{{servico}}',  label: 'Serviço agendado'  },
  { tag: '{{valor}}',    label: 'Valor da sessão'   },
  { tag: '{{endereco}}', label: 'Endereço do estúdio' },
]

const AVATAR_COLORS  = ['#8B5CF6','#EC4899','#3B82F6','#F59E0B','#14B8A6','#F97316','#22C55E','#6366f1']
const FORM_DEFAULT   = {
  cliente: '', servico: '', data: '', horario: '', duracao: 1, valor: '', obs: '',
  reminders: { confirmacao: true, preTattoo: true, posTattoo: true },
}
const DAYS_SEMANA   = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const DAYS_MES      = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const MONTHS_PT     = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']
const MONTHS_SHORT  = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
const HOURS         = [9,10,11,12,13,14,15,16,17,18]
const HOUR_H        = 48

const CARD_STYLE = {
  confirmado: { bg: 'rgba(255,46,209,0.13)', border: '#FF2ED1' },
  pendente:   { bg: 'rgba(139,92,246,0.16)', border: '#8B5CF6' },
  cancelado:  { bg: 'rgba(120,120,140,0.10)', border: 'rgba(150,150,170,0.45)' },
  concluido:  { bg: 'rgba(34,197,94,0.10)',  border: '#22C55E' },
}
const STATUS_DOT = {
  confirmado: 'var(--green)',
  pendente:   'var(--yellow)',
  cancelado:  '#EF4444',
  concluido:  'var(--app-text-muted)',
}
const STATUS_LABEL = {
  confirmado: 'Confirmado',
  pendente:   'Pendente',
  cancelado:  'Cancelado',
  concluido:  'Concluído',
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function toISO(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`
}
function getWeekDates(offset) {
  const today = new Date()
  const dow   = today.getDay()
  const mon   = new Date(today)
  mon.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1) + offset * 7)
  mon.setHours(0, 0, 0, 0)
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(mon)
    d.setDate(mon.getDate() + i)
    return d
  })
}
function getDayDate(offset) {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  d.setHours(0, 0, 0, 0)
  return d
}
function getMonthBase(offset) {
  const d = new Date()
  d.setDate(1)
  d.setMonth(d.getMonth() + offset)
  d.setHours(0, 0, 0, 0)
  return d
}
function getMonthGrid(base) {
  const year  = base.getFullYear()
  const month = base.getMonth()
  const first = new Date(year, month, 1)
  const last  = new Date(year, month + 1, 0)
  const dow   = first.getDay() // 0 = Dom
  const pad   = dow === 0 ? 6 : dow - 1 // Monday-based offset

  const cells = []
  for (let i = pad - 1; i >= 0; i--) {
    const d = new Date(year, month, -i)
    cells.push({ date: d, current: false })
  }
  for (let n = 1; n <= last.getDate(); n++) {
    cells.push({ date: new Date(year, month, n), current: true })
  }
  const tail = cells.length % 7
  if (tail > 0) {
    for (let n = 1; n <= 7 - tail; n++) {
      cells.push({ date: new Date(year, month + 1, n), current: false })
    }
  }
  return cells
}
function weekLabel(dates) {
  const s = dates[0], e = dates[5]
  if (s.getMonth() === e.getMonth())
    return `${s.getDate()} – ${e.getDate()} de ${MONTHS_SHORT[s.getMonth()]} de ${s.getFullYear()}`
  return `${s.getDate()} de ${MONTHS_SHORT[s.getMonth()]} – ${e.getDate()} de ${MONTHS_SHORT[e.getMonth()]} de ${s.getFullYear()}`
}
function fmtBRL(v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
function fmtShort(dateStr) {
  return new Date(dateStr + 'T00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })
}
function padZ(n) { return String(n).padStart(2, '0') }
function makeAvatar(nome) {
  return nome.split(' ').map(w => w[0]?.toUpperCase() || '').slice(0, 2).join('')
}

// ── Bloco de compromisso ──────────────────────────────────────────────────────
function ApptBlock({ appt, onOpen, fullName }) {
  const [ah, am] = appt.horario.split(':').map(Number)
  const top    = (ah - HOURS[0]) * HOUR_H + (am / 60) * HOUR_H
  const height = Math.max(appt.duracao * HOUR_H - 4, 28)
  const cs     = CARD_STYLE[appt.status] || CARD_STYLE.confirmado
  return (
    <div
      className={`ag-appt ag-appt-${appt.status}`}
      style={{ top, height, background: cs.bg, borderLeftColor: cs.border }}
      onClick={() => onOpen(appt)}
      title={`${appt.cliente} — ${appt.servico}`}
    >
      <p className="ag-appt-time">{appt.horario} · {appt.duracao}h</p>
      <p className="ag-appt-nome">{fullName ? appt.cliente : appt.cliente.split(' ')[0]}</p>
      {height > 50 && <p className="ag-appt-serv">{appt.servico}</p>}
    </div>
  )
}

// ── Component principal ───────────────────────────────────────────────────────
export default function Agenda() {
  const now = new Date()

  const [agenda,          setAgenda]          = useState(AGENDA_INICIAL)
  const [viewMode,        setViewMode]        = useState('semana')
  const [weekOffset,      setWeekOffset]      = useState(0)
  const [dayOffset,       setDayOffset]       = useState(0)
  const [monthOffset,     setMonthOffset]     = useState(0)
  const [showModal,       setShowModal]       = useState(false)
  const [selectedAppt,    setSelectedAppt]    = useState(null)
  const [editForm,        setEditForm]        = useState({})
  const [lembreteEnviado, setLembreteEnviado] = useState(false)
  const [toast,           setToast]           = useState(null)
  const [automations,     setAutomations]     = useState(AUTOMATIONS_INICIAL)
  const [editingAuto,     setEditingAuto]     = useState(null)
  const [autoForm,        setAutoForm]        = useState({})

  const [form, setForm] = useState(FORM_DEFAULT)

  // Datas derivadas
  const todayISO    = toISO(now)
  const weekDates   = useMemo(() => getWeekDates(weekOffset), [weekOffset])
  const selectedDay = useMemo(() => getDayDate(dayOffset),    [dayOffset])
  const monthBase   = useMemo(() => getMonthBase(monthOffset), [monthOffset])
  const monthGrid   = useMemo(() => getMonthGrid(monthBase),   [monthBase])

  const todayColIdx    = weekDates.findIndex(d => toISO(d) === todayISO)
  const selectedDayISO = toISO(selectedDay)
  const isDayToday     = selectedDayISO === todayISO

  const todayAppts = agenda.filter(a => a.data === todayISO)
  const weekISOs   = weekDates.map(toISO)
  const weekAppts  = agenda.filter(a => weekISOs.includes(a.data))
  const receitaSem = weekAppts.filter(a => a.status !== 'cancelado').reduce((s, a) => s + a.valor, 0)

  const upcoming = agenda
    .filter(a => a.data >= todayISO && a.status !== 'cancelado')
    .sort((a, b) => a.data.localeCompare(b.data) || a.horario.localeCompare(b.horario))
    .slice(0, 5)

  const nowTopSemana = weekOffset === 0 && todayColIdx >= 0
    ? (now.getHours() - HOURS[0] + now.getMinutes() / 60) * HOUR_H : null
  const nowTopDia = isDayToday
    ? (now.getHours() - HOURS[0] + now.getMinutes() / 60) * HOUR_H : null

  // Navegação dinâmica por view
  function goBack()    {
    if (viewMode === 'semana') setWeekOffset(o => o - 1)
    else if (viewMode === 'dia') setDayOffset(o => o - 1)
    else setMonthOffset(o => o - 1)
  }
  function goForward() {
    if (viewMode === 'semana') setWeekOffset(o => o + 1)
    else if (viewMode === 'dia') setDayOffset(o => o + 1)
    else setMonthOffset(o => o + 1)
  }
  function goToday() { setWeekOffset(0); setDayOffset(0); setMonthOffset(0) }

  function getPeriodLabel() {
    if (viewMode === 'semana') return weekLabel(weekDates)
    if (viewMode === 'dia') {
      return selectedDay.toLocaleDateString('pt-BR', {
        weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
      })
    }
    return `${MONTHS_PT[monthBase.getMonth()]} de ${monthBase.getFullYear()}`
  }

  // Toast
  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  // Config de automação
  function openAutoConfig(idx) {
    setEditingAuto(idx)
    setAutoForm({ ...automations[idx] })
  }
  function closeAutoConfig() { setEditingAuto(null); setAutoForm({}) }
  function saveAutoConfig() {
    setAutomations(prev => prev.map((a, i) => i === editingAuto ? { ...a, ...autoForm } : a))
    closeAutoConfig()
    showToast('Lembrete atualizado')
  }
  function toggleAuto(idx) {
    setAutomations(prev => prev.map((a, i) => i === idx ? { ...a, on: !a.on } : a))
  }
  function previewMsg(msg) {
    return msg
      .replace(/\{\{cliente\}\}/g, 'Ana Beatriz')
      .replace(/\{\{servico\}\}/g, 'Blackwork Manga')
      .replace(/\{\{data\}\}/g, '01/07/2026')
      .replace(/\{\{horario\}\}/g, '10:00')
      .replace(/\{\{estudio\}\}/g, 'Studio Pay')
      .replace(/\{\{valor\}\}/g, 'R$ 800,00')
      .replace(/\{\{endereco\}\}/g, 'Rua das Flores, 123 – Centro')
  }
  function insertVar(tag) {
    setAutoForm(f => ({ ...f, mensagemCustom: (f.mensagemCustom || '') + tag }))
  }

  // Drawer
  function openEdit(appt) {
    setSelectedAppt(appt)
    setEditForm({ ...appt })
    setLembreteEnviado(false)
  }
  const closeEdit = useCallback(() => {
    setSelectedAppt(null)
    setLembreteEnviado(false)
  }, [])

  function saveEdit() {
    const updated = {
      ...selectedAppt,
      ...editForm,
      duracao: parseFloat(editForm.duracao) || selectedAppt.duracao,
      valor:   parseFloat(editForm.valor)   || selectedAppt.valor,
    }
    setAgenda(prev => prev.map(a => a.id === selectedAppt.id ? updated : a))
    closeEdit()
    showToast('Agendamento atualizado')
  }

  function deleteAppt() {
    setAgenda(prev => prev.filter(a => a.id !== selectedAppt.id))
    closeEdit()
    showToast('Agendamento excluído')
  }

  function updateStatus(newStatus) {
    setAgenda(prev => prev.map(a => a.id === selectedAppt.id ? { ...a, status: newStatus } : a))
    setEditForm(prev => ({ ...prev, status: newStatus }))
  }

  // Modal novo agendamento
  function openNewApptWithDate(dateISO) {
    setForm(f => ({ ...f, data: dateISO }))
    setShowModal(true)
  }

  function saveNewAppt() {
    const newAppt = {
      id:        Date.now(),
      cliente:   form.cliente || 'Novo cliente',
      servico:   form.servico || 'Serviço',
      data:      form.data    || todayISO,
      horario:   form.horario || '10:00',
      duracao:   parseFloat(form.duracao) || 1,
      valor:     parseFloat(form.valor)   || 0,
      status:    'pendente',
      cor:       AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      avatar:    makeAvatar(form.cliente || 'N C'),
      obs:       form.obs || '',
      reminders: { ...form.reminders },
    }
    setAgenda(prev => [...prev, newAppt])
    setShowModal(false)
    setForm(FORM_DEFAULT)
    showToast('Agendamento criado')
  }

  // ESC fecha drawer / modais
  useEffect(() => {
    const fn = e => {
      if (e.key !== 'Escape') return
      if (editingAuto !== null) { closeAutoConfig(); return }
      if (showModal) { setShowModal(false); return }
      closeEdit()
    }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [closeEdit, editingAuto, showModal])

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="ag-page animate-fade-in">

      {/* Header */}
      <div className="ag-header">
        <div>
          <h1 className="ag-title">Agenda</h1>
          <p className="ag-subtitle">Grade de atendimentos do estúdio</p>
        </div>
      </div>

      {/* Stats */}
      <div className="ag-stats">
        <div className="ag-stat">
          <p className="ag-stat-label">Sessões hoje</p>
          <p className="ag-stat-value">{todayAppts.length}</p>
          <p className="ag-stat-sub">{todayAppts.filter(a => a.status === 'confirmado').length} confirmadas</p>
        </div>
        <div className="ag-stat">
          <p className="ag-stat-label">Sessões na semana</p>
          <p className="ag-stat-value">{weekAppts.length}</p>
          <p className="ag-stat-sub">{weekAppts.filter(a => a.status === 'confirmado').length} confirmadas</p>
        </div>
        <div className="ag-stat">
          <p className="ag-stat-label">Receita prevista</p>
          <p className="ag-stat-value ag-stat-green">{fmtBRL(receitaSem)}</p>
          <p className="ag-stat-sub">esta semana</p>
        </div>
        <div className="ag-stat">
          <p className="ag-stat-label">Comparecimento</p>
          <p className="ag-stat-value">91%</p>
          <p className="ag-stat-sub">último mês</p>
        </div>
      </div>

      {/* Body */}
      <div className="ag-body">
        <div className="ag-main">

          {/* Toolbar */}
          <div className="ag-toolbar">
            <div className="ag-toolbar-left">
              <button className="ag-tb-today" onClick={goToday}>Hoje</button>
              <div className="ag-tb-arrows">
                <button className="ag-tb-arrow" onClick={goBack}><ChevronLeft size={15} /></button>
                <button className="ag-tb-arrow" onClick={goForward}><ChevronRight size={15} /></button>
              </div>
              <span className="ag-tb-period">{getPeriodLabel()}</span>
            </div>
            <div className="ag-toolbar-mid">
              {[
                { label: 'Dia',    key: 'dia'    },
                { label: 'Semana', key: 'semana' },
                { label: 'Mês',    key: 'mes'    },
              ].map(({ label, key }) => (
                <button
                  key={key}
                  className={`ag-tb-tab${viewMode === key ? ' active' : ''}`}
                  onClick={() => setViewMode(key)}
                >{label}</button>
              ))}
            </div>
            <button className="ag-btn-new" onClick={() => setShowModal(true)}>
              <Plus size={15} /> Novo agendamento
            </button>
          </div>

          {/* ══ SEMANA ══════════════════════════════════════════════════════════ */}
          {viewMode === 'semana' && (
            <div className="ag-grid-wrap">
              <div className="ag-grid-header">
                <div className="ag-gutter-h" />
                {weekDates.map((date, i) => {
                  const isT = toISO(date) === todayISO
                  return (
                    <div key={i} className={`ag-day-hdr${isT ? ' today' : ''}`}>
                      <span className="ag-day-name">{DAYS_SEMANA[i]}</span>
                      <span className={`ag-day-num${isT ? ' today' : ''}`}>{date.getDate()}</span>
                    </div>
                  )
                })}
              </div>
              <div className="ag-grid-scroll">
                <div className="ag-grid">
                  <div className="ag-hours">
                    {HOURS.map(h => <div key={h} className="ag-hour-lbl">{padZ(h)}:00</div>)}
                  </div>
                  <div className="ag-cols">
                    {weekDates.map((date, dayIdx) => {
                      const dateISO  = toISO(date)
                      const isT      = dateISO === todayISO
                      const dayAppts = agenda.filter(a => a.data === dateISO)
                      return (
                        <div key={dayIdx} className={`ag-day-col${isT ? ' today' : ''}`}>
                          {HOURS.slice(0, -1).map(h => <div key={h} className="ag-hslot" />)}
                          {dayAppts.map(a => (
                            <ApptBlock key={a.id} appt={a} onOpen={openEdit} />
                          ))}
                          {isT && nowTopSemana !== null && nowTopSemana >= 0 && nowTopSemana <= (HOURS.length - 1) * HOUR_H && (
                            <div className="ag-now-line" style={{ top: nowTopSemana }} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ DIA ══════════════════════════════════════════════════════════════ */}
          {viewMode === 'dia' && (() => {
            const dayAppts = agenda.filter(a => a.data === selectedDayISO)
            return (
              <div className="ag-grid-wrap">
                <div className="ag-grid-header">
                  <div className="ag-gutter-h" />
                  <div className={`ag-day-hdr ag-day-hdr-single${isDayToday ? ' today' : ''}`}>
                    <span className="ag-day-name">
                      {selectedDay.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}
                    </span>
                    <span className={`ag-day-num${isDayToday ? ' today' : ''}`}>
                      {selectedDay.getDate()}
                    </span>
                    {isDayToday && <span className="ag-day-today-tag">Hoje</span>}
                  </div>
                </div>
                <div className="ag-grid-scroll">
                  <div className="ag-grid ag-grid-dia">
                    <div className="ag-hours">
                      {HOURS.map(h => <div key={h} className="ag-hour-lbl">{padZ(h)}:00</div>)}
                    </div>
                    <div className="ag-cols">
                      <div className={`ag-day-col ag-day-col-single${isDayToday ? ' today' : ''}`}>
                        {HOURS.slice(0, -1).map(h => <div key={h} className="ag-hslot" />)}
                        {dayAppts.map(a => (
                          <ApptBlock key={a.id} appt={a} onOpen={openEdit} fullName />
                        ))}
                        {nowTopDia !== null && nowTopDia >= 0 && nowTopDia <= (HOURS.length - 1) * HOUR_H && (
                          <div className="ag-now-line" style={{ top: nowTopDia }} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {dayAppts.length === 0 && (
                  <div className="ag-dia-empty">
                    <Calendar size={28} strokeWidth={1.5} />
                    <p>Nenhum agendamento neste dia</p>
                    <button
                      className="btn btn-primary"
                      style={{ fontSize: 13, padding: '8px 16px' }}
                      onClick={() => setShowModal(true)}
                    >
                      <Plus size={13} /> Novo agendamento
                    </button>
                  </div>
                )}
              </div>
            )
          })()}

          {/* ══ MÊS ══════════════════════════════════════════════════════════════ */}
          {viewMode === 'mes' && (
            <div className="ag-month-wrap">
              <div className="ag-month-hdr-row">
                {DAYS_MES.map(d => <div key={d} className="ag-month-hdr-cell">{d}</div>)}
              </div>
              <div className="ag-month-grid">
                {monthGrid.map(({ date, current }, i) => {
                  const iso      = toISO(date)
                  const isT      = iso === todayISO
                  const dayAppts = agenda.filter(a => a.data === iso && a.status !== 'cancelado')
                  return (
                    <div
                      key={i}
                      className={`ag-month-cell${current ? '' : ' outside'}${isT ? ' today' : ''}`}
                      onClick={() => openNewApptWithDate(iso)}
                      title="Clique para agendar neste dia"
                    >
                      <span className={`ag-month-cell-num${isT ? ' today' : ''}`}>
                        {date.getDate()}
                      </span>
                      <div className="ag-month-appts">
                        {dayAppts.slice(0, 3).map(appt => (
                          <div
                            key={appt.id}
                            className="ag-month-appt"
                            style={{
                              background: `${appt.cor}1a`,
                              borderLeft: `2px solid ${appt.cor}`,
                              color:      appt.cor,
                            }}
                            onClick={e => { e.stopPropagation(); openEdit(appt) }}
                          >
                            <span className="ag-month-appt-time">{appt.horario}</span>
                            <span className="ag-month-appt-nome">{appt.cliente.split(' ')[0]}</span>
                          </div>
                        ))}
                        {dayAppts.length > 3 && (
                          <div
                            className="ag-month-more"
                            onClick={e => e.stopPropagation()}
                          >
                            +{dayAppts.length - 3} mais
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Legenda de status */}
          <div className="ag-legend">
            {[
              { color: 'var(--green)',           label: 'Confirmado' },
              { color: 'var(--yellow)',           label: 'Pendente'   },
              { color: '#EF4444',                label: 'Cancelado'  },
              { color: 'var(--app-text-muted)',  label: 'Concluído'  },
            ].map(({ color, label }) => (
              <span key={label} className="ag-legend-item">
                <span className="ag-legend-dot" style={{ background: color }} />
                {label}
              </span>
            ))}
          </div>

        </div>{/* /ag-main */}

        {/* Sidebar */}
        <div className="ag-aside">
          <div className="ag-card">
            <h3 className="ag-card-title">Próximos agendamentos</h3>
            {upcoming.length === 0
              ? <p className="ag-empty">Nenhum agendamento.</p>
              : upcoming.map(a => (
                <div
                  key={a.id}
                  className="ag-upcoming-item"
                  onClick={() => openEdit(a)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="ag-upcoming-av" style={{ background: `${a.cor}28`, color: a.cor }}>{a.avatar}</div>
                  <div className="ag-upcoming-info">
                    <p className="ag-upcoming-nome">{a.cliente.split(' ')[0]} {a.cliente.split(' ').slice(-1)[0]}</p>
                    <p className="ag-upcoming-serv">{a.servico}</p>
                    <p className="ag-upcoming-when"><Clock size={9} />{fmtShort(a.data)} · {a.horario}</p>
                  </div>
                  <div className="ag-upcoming-dot" style={{ background: STATUS_DOT[a.status] }} />
                </div>
              ))
            }
          </div>

          <div className="ag-card">
            <h3 className="ag-card-title">Lembretes automáticos</h3>
            {automations.map((item, i) => (
              <div key={i} className="ag-auto-item">
                <div className="ag-auto-icon" style={{ background: item.bg }}>
                  <item.icon size={14} color={item.color} />
                </div>
                <div className="ag-auto-info">
                  <p className="ag-auto-title">{item.title}</p>
                  <p className="ag-auto-desc">{item.desc}</p>
                  <button className="ag-auto-cfg-btn" onClick={() => openAutoConfig(i)}>
                    Configurar
                  </button>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={item.on} onChange={() => toggleAuto(i)} />
                  <span className="toggle-slider" />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>{/* /ag-body */}

      {/* ── Edit Drawer ──────────────────────────────────────────────────────── */}
      {selectedAppt && (
        <>
          <div className="ag-overlay" onClick={closeEdit} />
          <div className="ag-drawer" role="dialog" aria-modal="true">

            <div className="ag-drawer-header">
              <h2 className="ag-drawer-title">Editar agendamento</h2>
              <button className="ag-drawer-close" onClick={closeEdit} aria-label="Fechar">
                <X size={18} />
              </button>
            </div>

            <div className="ag-drawer-body">
              <div className="ag-drawer-meta">
                <div className="ag-drawer-meta-dot" style={{ background: STATUS_DOT[editForm.status] }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: STATUS_DOT[editForm.status] }}>
                  {STATUS_LABEL[editForm.status]}
                </span>
                <span style={{ fontSize: 12, color: 'var(--app-text-muted)', marginLeft: 'auto' }}>
                  {fmtShort(selectedAppt.data)} · {selectedAppt.horario} · {selectedAppt.duracao}h
                </span>
              </div>

              <div className="ag-drawer-actions">
                <p className="ag-drawer-actions-label">Ações rápidas</p>
                <div className="ag-drawer-actions-grid">
                  <button className="ag-qbtn ag-qbtn-confirm" onClick={() => updateStatus('confirmado')}>
                    <Check size={12} /> Confirmar
                  </button>
                  <button className="ag-qbtn" onClick={() => showToast('Modo de remarcação em breve')}>
                    <Calendar size={12} /> Remarcar
                  </button>
                  <button className="ag-qbtn ag-qbtn-msg" onClick={() => setLembreteEnviado(true)}>
                    <MessageCircle size={12} /> Enviar lembrete
                  </button>
                  <button className="ag-qbtn ag-qbtn-done" onClick={() => updateStatus('concluido')}>
                    <CheckCircle size={12} /> Concluir
                  </button>
                </div>
                {lembreteEnviado && (
                  <p className="ag-lembrete-sent">✓ Lembrete enviado via Elison</p>
                )}
              </div>

              <div className="form-group">
                <label>Cliente</label>
                <input className="form-input" value={editForm.cliente || ''}
                  onChange={e => setEditForm(f => ({...f, cliente: e.target.value}))} />
              </div>
              <div className="form-group">
                <label>Serviço</label>
                <input className="form-input" value={editForm.servico || ''}
                  onChange={e => setEditForm(f => ({...f, servico: e.target.value}))} />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Data</label>
                  <input className="form-input" type="date" value={editForm.data || ''}
                    onChange={e => setEditForm(f => ({...f, data: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label>Horário</label>
                  <input className="form-input" type="time" value={editForm.horario || ''}
                    onChange={e => setEditForm(f => ({...f, horario: e.target.value}))} />
                </div>
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Duração (h)</label>
                  <input className="form-input" type="number" step="0.5" min="0.5"
                    value={editForm.duracao || ''}
                    onChange={e => setEditForm(f => ({...f, duracao: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label>Valor (R$)</label>
                  <input className="form-input" type="number"
                    value={editForm.valor || ''}
                    onChange={e => setEditForm(f => ({...f, valor: e.target.value}))} />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select className="form-input" value={editForm.status || 'confirmado'}
                  onChange={e => setEditForm(f => ({...f, status: e.target.value}))}>
                  <option value="confirmado">Confirmado</option>
                  <option value="pendente">Pendente</option>
                  <option value="cancelado">Cancelado</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>
              <div className="form-group">
                <label>Observações</label>
                <textarea className="form-textarea" placeholder="Detalhes, referências..."
                  value={editForm.obs || ''}
                  onChange={e => setEditForm(f => ({...f, obs: e.target.value}))} />
              </div>
            </div>

            <div className="ag-drawer-footer">
              <button className="ag-drawer-delete" onClick={deleteAppt}>Excluir</button>
              <div className="ag-drawer-footer-right">
                <button className="btn btn-ghost" onClick={closeEdit}>Cancelar</button>
                <button className="btn btn-primary" onClick={saveEdit}>Salvar alterações</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Modal: novo agendamento ─────────────────────────────────────────── */}
      <Modal
        title="Novo agendamento"
        open={showModal}
        onClose={() => setShowModal(false)}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancelar</button>
            <button className="btn btn-primary" onClick={saveNewAppt}>Salvar agendamento</button>
          </>
        }
      >
        <div className="flex-col gap-16">
          <div className="form-group">
            <label>Cliente</label>
            <input className="form-input" placeholder="Nome do cliente"
              value={form.cliente} onChange={e => setForm(f => ({...f, cliente: e.target.value}))} />
          </div>
          <div className="form-group">
            <label>Serviço</label>
            <input className="form-input" placeholder="Ex: Blackwork manga"
              value={form.servico} onChange={e => setForm(f => ({...f, servico: e.target.value}))} />
          </div>
          <div className="form-row-2">
            <div className="form-group">
              <label>Data</label>
              <input className="form-input" type="date"
                value={form.data} onChange={e => setForm(f => ({...f, data: e.target.value}))} />
            </div>
            <div className="form-group">
              <label>Horário</label>
              <input className="form-input" type="time"
                value={form.horario} onChange={e => setForm(f => ({...f, horario: e.target.value}))} />
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-group">
              <label>Duração (horas)</label>
              <input className="form-input" type="number" step="0.5" min="0.5" placeholder="2"
                value={form.duracao} onChange={e => setForm(f => ({...f, duracao: e.target.value}))} />
            </div>
            <div className="form-group">
              <label>Valor total (R$)</label>
              <input className="form-input" type="number" placeholder="0,00"
                value={form.valor} onChange={e => setForm(f => ({...f, valor: e.target.value}))} />
            </div>
          </div>
          <div className="form-group">
            <label>Observações</label>
            <textarea className="form-textarea" placeholder="Referências, detalhes da sessão..."
              value={form.obs} onChange={e => setForm(f => ({...f, obs: e.target.value}))} />
          </div>

          {/* Lembretes automáticos */}
          <div className="ag-modal-reminders">
            <p className="ag-modal-reminders-title">Lembretes automáticos</p>
            {[
              { key: 'confirmacao', label: 'Enviar confirmação automática', icon: '✓' },
              { key: 'preTattoo',   label: 'Lembrete pré-tatuagem (2h antes)', icon: '⏰' },
              { key: 'posTattoo',   label: 'Cuidados pós-tatuagem (após sessão)', icon: '💬' },
            ].map(({ key, label }) => (
              <label key={key} className="ag-modal-reminder-row">
                <input
                  type="checkbox"
                  checked={form.reminders[key]}
                  onChange={e => setForm(f => ({
                    ...f,
                    reminders: { ...f.reminders, [key]: e.target.checked },
                  }))}
                />
                <span className="ag-modal-reminder-label">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </Modal>

      {/* ── Config de lembrete automático ──────────────────────────────────── */}
      {editingAuto !== null && (() => {
        const item = automations[editingAuto]
        const msg  = autoForm.usarPadrao ? autoForm.mensagemPadrao : (autoForm.mensagemCustom || '')
        return (
          <Modal
            title={`Configurar — ${item.title}`}
            open
            onClose={closeAutoConfig}
            footer={
              <>
                <button className="btn btn-ghost" onClick={closeAutoConfig}>Cancelar</button>
                <button className="btn btn-primary" onClick={saveAutoConfig}>Salvar mensagem</button>
              </>
            }
          >
            {/* Status + quando */}
            <div className="ag-auto-cfg-meta">
              <div className="ag-auto-icon" style={{ background: item.bg, width: 32, height: 32 }}>
                <item.icon size={15} color={item.color} />
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600 }}>{item.quando}</p>
                <p style={{ fontSize: 11, color: 'var(--app-text-muted)' }}>Quando a automação dispara</p>
              </div>
              <label className="toggle" style={{ marginLeft: 'auto' }}>
                <input
                  type="checkbox"
                  checked={autoForm.on ?? item.on}
                  onChange={() => setAutoForm(f => ({ ...f, on: !f.on }))}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            {/* Tabs: Padrão / Personalizar */}
            <div className="ag-auto-cfg-tabs">
              <button
                className={`ag-auto-cfg-tab${autoForm.usarPadrao ? ' active' : ''}`}
                onClick={() => setAutoForm(f => ({ ...f, usarPadrao: true }))}
              >
                Mensagem padrão
              </button>
              <button
                className={`ag-auto-cfg-tab${!autoForm.usarPadrao ? ' active' : ''}`}
                onClick={() => setAutoForm(f => ({
                  ...f,
                  usarPadrao: false,
                  mensagemCustom: f.mensagemCustom || f.mensagemPadrao,
                }))}
              >
                Personalizar
              </button>
            </div>

            {/* Área da mensagem */}
            {autoForm.usarPadrao ? (
              <div className="form-group">
                <label>Mensagem padrão Studio Pay</label>
                <textarea
                  className="form-textarea ag-auto-cfg-readonly"
                  readOnly
                  value={autoForm.mensagemPadrao}
                  rows={5}
                />
              </div>
            ) : (
              <div className="form-group">
                <label>Sua mensagem personalizada</label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  placeholder="Escreva aqui usando as variáveis abaixo..."
                  value={autoForm.mensagemCustom || ''}
                  onChange={e => setAutoForm(f => ({ ...f, mensagemCustom: e.target.value }))}
                />
              </div>
            )}

            {/* Variáveis — sempre visíveis */}
            <div className="ag-auto-cfg-vars-wrap">
              <p className="ag-auto-cfg-vars-label">Variáveis disponíveis</p>
              <div className="ag-auto-cfg-vars">
                {AUTO_VARS.map(v => (
                  <button
                    key={v.tag}
                    className="ag-auto-cfg-var"
                    title={v.label}
                    onClick={() => {
                      if (autoForm.usarPadrao) {
                        setAutoForm(f => ({
                          ...f,
                          usarPadrao: false,
                          mensagemCustom: (f.mensagemCustom || f.mensagemPadrao) + v.tag,
                        }))
                      } else {
                        insertVar(v.tag)
                      }
                    }}
                  >
                    {v.tag}
                  </button>
                ))}
              </div>
              <p className="ag-auto-cfg-vars-hint">
                As variáveis são preenchidas automaticamente antes do envio.
              </p>
            </div>

            {/* Preview */}
            <div className="ag-auto-cfg-preview">
              <p className="ag-auto-cfg-preview-label">Prévia — como o cliente vai receber</p>
              <div className="ag-auto-cfg-bubble">
                {previewMsg(msg) || <span style={{ opacity: 0.4 }}>Nenhuma mensagem</span>}
              </div>
            </div>
          </Modal>
        )
      })()}

      {/* Toast */}
      {toast && <div className="ag-toast">{toast}</div>}
    </div>
  )
}
