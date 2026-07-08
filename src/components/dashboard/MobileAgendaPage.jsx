import { useEffect, useMemo, useState } from 'react'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'

// Redesenho da tela Agenda apenas para mobile — versão "agenda limpa",
// mais próxima da grade desktop (horários, sessões do dia, mês) do
// que de uma home financeira. Visível apenas abaixo de 768px via
// classe global "hide-desktop" — a tela desktop de Agenda.jsx (grade
// semanal/dia/mês) continua intocada, escondida no mesmo breakpoint
// via "hide-mobile".
//
// Todas as visões (Dia/Semana/Mês) usam os mesmos dados reais do
// desktop (prop "agenda") e os mesmos handlers já existentes:
// - onOpenAppt      -> openEdit()             (Drawer de edição)
// - onNewAppointment / onNewAppointmentForDate -> setShowModal()/openNewApptWithDate()
// - onConfigureReminder -> openAutoConfig()   (Modal de config. de lembrete)
// Ou seja: tocar num compromisso, criar um agendamento ou configurar
// um lembrete abre exatamente o mesmo Drawer/Modal que o desktop já
// usa — nenhuma lógica, tela ou backend novos foram criados aqui.

function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const VIEW_TABS = [
  { key: 'dia', label: 'Dia' },
  { key: 'semana', label: 'Semana' },
  { key: 'mes', label: 'Mês' },
]

const WEEK_LABELS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MONTH_HDR_LABELS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const MONTHS_PT = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

// ── Helpers de data (mesma lógica do desktop, versão local e
// simplificada — não exportada de Agenda.jsx para não alterar a
// experiência desktop). ──
function toISO(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
function getWeekDates(anchor = new Date()) {
  const dow = anchor.getDay() // 0 = Dom
  const monday = new Date(anchor)
  monday.setDate(anchor.getDate() - (dow === 0 ? 6 : dow - 1))
  monday.setHours(0, 0, 0, 0)
  return WEEK_LABELS.map((label, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return { label, day: d.getDate(), iso: toISO(d) }
  })
}
function getMonthBase(offset) {
  const d = new Date()
  d.setDate(1)
  d.setMonth(d.getMonth() + offset)
  d.setHours(0, 0, 0, 0)
  return d
}
function getMonthGrid(base) {
  const year = base.getFullYear()
  const month = base.getMonth()
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const dow = first.getDay()
  const pad = dow === 0 ? 6 : dow - 1

  const cells = []
  for (let i = pad - 1; i >= 0; i--) cells.push({ date: new Date(year, month, -i), current: false })
  for (let n = 1; n <= last.getDate(); n++) cells.push({ date: new Date(year, month, n), current: true })
  const tail = cells.length % 7
  if (tail > 0) for (let n = 1; n <= 7 - tail; n++) cells.push({ date: new Date(year, month + 1, n), current: false })
  return cells
}
function fmtDayPanelDate(iso) {
  const d = new Date(iso + 'T00:00')
  const weekday = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')
  const weekdayCap = weekday.charAt(0).toUpperCase() + weekday.slice(1)
  return `${weekdayCap}, ${d.getDate()} de ${MONTHS_PT[d.getMonth()]}`
}
function dayGroupLabel(iso, todayISO) {
  if (iso === todayISO) return 'Hoje'
  const tomorrow = new Date(todayISO + 'T00:00')
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (iso === toISO(tomorrow)) return 'Amanhã'
  const d = new Date(iso + 'T00:00')
  const wd = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')
  const wdCap = wd.charAt(0).toUpperCase() + wd.slice(1)
  return `${wdCap}, ${d.getDate()}`
}
function groupAgendaByDay(items, todayISO) {
  const byDate = {}
  for (const a of items) {
    if (!byDate[a.data]) byDate[a.data] = []
    byDate[a.data].push(a)
  }
  return Object.keys(byDate)
    .sort()
    .map((iso) => ({
      iso,
      label: dayGroupLabel(iso, todayISO),
      items: [...byDate[iso]].sort((a, b) => a.horario.localeCompare(b.horario)),
    }))
}

const AG_STATUS_STYLE = { confirmado: 'green', pendente: 'yellow', cancelado: 'red', concluido: 'blue' }
const AG_STATUS_LABEL = { confirmado: 'Confirmado', pendente: 'Pendente', cancelado: 'Cancelado', concluido: 'Concluído' }

function TimelineGroups({ groups, onOpenAppt }) {
  return (
    <div className="mob-agenda-timeline">
      {groups.map((g) => (
        <div key={g.iso} className="mob-agenda-day-group">
          <p className="mob-agenda-day-label">{g.label}</p>
          <div className="mob-agenda-day-items">
            {g.items.map((a, i) => (
              <div
                key={a.id}
                className="mob-agenda-tl-row mob-agenda-tl-row-clickable"
                onClick={() => onOpenAppt?.(a)}
                role="button"
                tabIndex={0}
              >
                <div className="mob-agenda-tl-time-col">
                  <span className="mob-agenda-tl-time">{a.horario}</span>
                  <span className="mob-agenda-tl-dot" style={{ background: a.cor }} />
                  {i < g.items.length - 1 && <span className="mob-agenda-tl-line" />}
                </div>
                <div className="mob-agenda-tl-content">
                  <div className="mob-agenda-tl-head">
                    <p className="mob-agenda-tl-client">{a.cliente}</p>
                    <span className={`mob-charges-status ${AG_STATUS_STYLE[a.status]}`}>{AG_STATUS_LABEL[a.status]}</span>
                  </div>
                  <p className="mob-agenda-tl-desc">{a.servico}</p>
                  <p className="mob-agenda-tl-meta">{fmt(a.valor)} · {a.duracao}h</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function MobileAgendaPage({
  agenda = [],
  todayISO,
  automations = [],
  onOpenAppt,
  onNewAppointment,
  onNewAppointmentForDate,
  onConfigureReminder,
}) {
  // Abre em "Mês" por padrão — com os dados mock fixos em julho/2026,
  // é a visão que garante algo visível na demonstração mesmo quando a
  // data real do dispositivo está fora do intervalo de Dia/Semana.
  const [viewMode, setViewMode] = useState('mes')
  const [monthOffset, setMonthOffset] = useState(0)
  const [selectedDateISO, setSelectedDateISO] = useState(null)

  // Dia/Semana devem mostrar o dia selecionado no modo Mês (se
  // existir) para a demo nunca parecer vazia enquanto houver dados —
  // com fallback para o primeiro dia com agendamento em toda a
  // agenda e, por último, para a data real de hoje.
  const firstAgendaISO = useMemo(() => {
    const dates = agenda.filter((a) => a.status !== 'cancelado').map((a) => a.data).sort()
    return dates[0] || null
  }, [agenda])
  const effectiveDayISO = selectedDateISO || firstAgendaISO || todayISO

  // Semana usa a semana (Seg–Sáb) que contém esse mesmo dia efetivo,
  // em vez de sempre a semana real atual.
  const weekDates = useMemo(
    () => getWeekDates(new Date(effectiveDayISO + 'T00:00')),
    [effectiveDayISO]
  )
  const weekStrip = useMemo(
    () => weekDates.map((d) => ({
      ...d,
      isToday: d.iso === todayISO,
      hasSession: agenda.some((a) => a.data === d.iso && a.status !== 'cancelado'),
    })),
    [weekDates, agenda, todayISO]
  )

  const grupos = useMemo(() => {
    const ativas = agenda.filter((a) => a.status !== 'cancelado')
    if (viewMode === 'dia') {
      return groupAgendaByDay(ativas.filter((a) => a.data === effectiveDayISO), todayISO)
    }
    if (viewMode === 'semana') {
      const weekISOs = weekDates.map((d) => d.iso)
      return groupAgendaByDay(ativas.filter((a) => weekISOs.includes(a.data)), todayISO)
    }
    return []
  }, [viewMode, agenda, todayISO, effectiveDayISO, weekDates])

  const monthBase = useMemo(() => getMonthBase(monthOffset), [monthOffset])
  const monthGrid = useMemo(() => getMonthGrid(monthBase), [monthBase])
  const monthLabel = `${MONTHS_PT[monthBase.getMonth()]} de ${monthBase.getFullYear()}`
  const monthLabelCap = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)

  // Ao abrir/trocar de mês, seleciona automaticamente o primeiro dia
  // desse mês que já tenha algum agendamento, para o painel "Agenda
  // do dia" já aparecer preenchido (em vez de exigir um toque antes
  // de mostrar qualquer coisa). Uma seleção manual do usuário dentro
  // do mesmo mês continua funcionando normalmente — este efeito só
  // roda de novo quando o mês visível muda.
  useEffect(() => {
    const firstWithAppt = monthGrid
      .filter((c) => c.current)
      .map((c) => toISO(c.date))
      .find((iso) => agenda.some((a) => a.data === iso && a.status !== 'cancelado'))
    setSelectedDateISO(firstWithAppt || null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthGrid, agenda])

  function handleNewClick() {
    if (viewMode === 'mes' && selectedDateISO) onNewAppointmentForDate?.(selectedDateISO)
    else onNewAppointment?.()
  }

  // Dia/Semana/Mês só trocam a visualização — nunca abrem edição/criação.
  function handleViewTabClick(key) {
    setViewMode(key)
  }

  function selectDay(iso) {
    setSelectedDateISO((prev) => (prev === iso ? null : iso))
  }

  const selectedDayAppts = selectedDateISO
    ? agenda.filter((a) => a.data === selectedDateISO && a.status !== 'cancelado')
    : []

  return (
    <div className="mob-agenda">
      {/* ── Header compacto ────────────────────────── */}
      <div className="mob-agenda-header">
        <div>
          <h1 className="mob-agenda-title">Agenda</h1>
          <p className="mob-agenda-sub">Sessões, horários e lembretes do seu estúdio.</p>
        </div>
        <button className="mob-agenda-new-btn" onClick={handleNewClick}>
          <Plus size={14} /> Novo
        </button>
      </div>

      {/* ── Resumo compacto ────────────────────────── */}
      <div className="mob-agenda-summary">
        <div className="mob-agenda-summary-item">
          <span className="mob-agenda-summary-value">3</span>
          <span className="mob-agenda-summary-label">Sessões hoje</span>
        </div>
        <div className="mob-agenda-summary-divider" />
        <div className="mob-agenda-summary-item">
          <span className="mob-agenda-summary-value">{fmt(1070)}</span>
          <span className="mob-agenda-summary-label">Receita prevista</span>
        </div>
        <div className="mob-agenda-summary-divider" />
        <div className="mob-agenda-summary-item">
          <span className="mob-agenda-summary-value">2</span>
          <span className="mob-agenda-summary-label">Sinais pendentes</span>
        </div>
      </div>

      {/* ── Visualizações: Dia / Semana / Mês (só trocam a
          visualização — não abrem nenhuma edição) ─────── */}
      <div className="mob-charges-filters">
        {VIEW_TABS.map(({ key, label }) => (
          <button
            key={key}
            className={`mob-charges-filter-chip${viewMode === key ? ' active' : ''}`}
            onClick={() => handleViewTabClick(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {viewMode !== 'mes' ? (
        <>
          {/* ── Calendário semanal compacto — tocar num dia aqui
              seleciona esse dia de verdade (mesmo estado usado
              pelo Mês), e a timeline abaixo atualiza na hora. ── */}
          <div className="mob-agenda-week">
            <p className="mob-agenda-week-title">Esta semana</p>
            <div className="mob-agenda-week-strip">
              {weekStrip.map((d) => (
                <button
                  key={d.iso}
                  className={`mob-agenda-week-day${effectiveDayISO === d.iso ? ' active' : ''}`}
                  onClick={() => setSelectedDateISO(d.iso)}
                >
                  <span className="mob-agenda-week-day-label">{d.label}</span>
                  <span className="mob-agenda-week-day-num">{d.day}</span>
                  {d.hasSession && <span className="mob-agenda-week-day-dot" />}
                </button>
              ))}
            </div>
          </div>

          {/* ── Timeline de sessões — cada item abre o mesmo
              Drawer de edição do desktop ─────────────────── */}
          {grupos.length > 0 ? (
            <TimelineGroups groups={grupos} onOpenAppt={onOpenAppt} />
          ) : (
            <div className="mob-charges-empty">
              <p className="mob-charges-empty-title">Nenhuma sessão por enquanto</p>
              <p className="mob-charges-empty-text">Crie seu primeiro agendamento para organizar a rotina do estúdio.</p>
              <button className="mob-charges-cta" onClick={() => onNewAppointment?.()}>
                Novo agendamento
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          {/* ── Mês — cabeçalho e navegação ────────────── */}
          <div className="mob-agenda-month-toolbar">
            <button className="mob-agenda-month-nav" onClick={() => setMonthOffset((o) => o - 1)} aria-label="Mês anterior">
              <ChevronLeft size={16} />
            </button>
            <div className="mob-agenda-month-label-wrap">
              <p className="mob-agenda-month-label">{monthLabelCap}</p>
              <button className="mob-agenda-month-today" onClick={() => setMonthOffset(0)}>Hoje</button>
            </div>
            <button className="mob-agenda-month-nav" onClick={() => setMonthOffset((o) => o + 1)} aria-label="Próximo mês">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* ── Mês — grade (reaproveita classes ag-month-* do
              desktop, só visíveis aqui pois a página desktop
              fica oculta no mesmo breakpoint) ────────────── */}
          <div className="ag-month-wrap mob-agenda-month-wrap">
            <div className="ag-month-hdr-row mob-agenda-month-hdr">
              {MONTH_HDR_LABELS.map((d) => <div key={d} className="ag-month-hdr-cell">{d}</div>)}
            </div>
            <div className="ag-month-grid mob-agenda-month-grid">
              {monthGrid.map(({ date, current }, i) => {
                const iso = toISO(date)
                const isToday = iso === todayISO
                const isSelected = iso === selectedDateISO
                const dayAppts = agenda.filter((a) => a.data === iso && a.status !== 'cancelado')
                return (
                  <div
                    key={i}
                    className={`ag-month-cell${current ? '' : ' outside'}${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}`}
                    onClick={() => selectDay(iso)}
                  >
                    <span className={`ag-month-cell-num${isToday ? ' today' : ''}`}>{date.getDate()}</span>
                    <div className="ag-month-appts">
                      {dayAppts.slice(0, 1).map((appt) => (
                        <div
                          key={appt.id}
                          className="ag-month-appt"
                          style={{ background: `${appt.cor}1a`, borderLeft: `2px solid ${appt.cor}`, color: appt.cor }}
                          onClick={(e) => { e.stopPropagation(); onOpenAppt?.(appt) }}
                        >
                          <span className="ag-month-appt-time">{appt.horario}</span>
                          <span className="ag-month-appt-nome">{appt.cliente.split(' ')[0]}</span>
                        </div>
                      ))}
                      {dayAppts.length > 1 && (
                        <div className="ag-month-more mob-agenda-month-more">+{dayAppts.length - 1}</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Mês — painel do dia selecionado ────────── */}
          {selectedDateISO && (
            <div className="mob-agenda-day-panel">
              <p className="mob-agenda-day-panel-title">Agenda do dia</p>
              <p className="mob-agenda-day-panel-date">{fmtDayPanelDate(selectedDateISO)}</p>
              {selectedDayAppts.length > 0 ? (
                <div className="mob-agenda-day-items">
                  {selectedDayAppts.map((a, i) => (
                    <div
                      key={a.id}
                      className="mob-agenda-tl-row mob-agenda-tl-row-clickable"
                      onClick={() => onOpenAppt?.(a)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="mob-agenda-tl-time-col">
                        <span className="mob-agenda-tl-time">{a.horario}</span>
                        <span className="mob-agenda-tl-dot" style={{ background: a.cor }} />
                        {i < selectedDayAppts.length - 1 && <span className="mob-agenda-tl-line" />}
                      </div>
                      <div className="mob-agenda-tl-content">
                        <div className="mob-agenda-tl-head">
                          <p className="mob-agenda-tl-client">{a.cliente}</p>
                          <span className={`mob-charges-status ${AG_STATUS_STYLE[a.status]}`}>{AG_STATUS_LABEL[a.status]}</span>
                        </div>
                        <p className="mob-agenda-tl-desc">{a.servico}</p>
                        <p className="mob-agenda-tl-meta">{fmt(a.valor)} · {a.duracao}h</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mob-agenda-day-panel-empty">
                  <p>Nenhum agendamento neste dia.</p>
                  <button className="mob-charges-cta" onClick={() => onNewAppointmentForDate?.(selectedDateISO)}>
                    Novo agendamento
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ── Lembretes automáticos (bloco discreto) — cada
          item abre o mesmo Modal de configuração já usado
          pelo desktop (openAutoConfig) ─────────────────── */}
      <div className="mob-agenda-reminders-block">
        <p className="mob-agenda-reminders-title">Lembretes automáticos</p>
        <div className="mob-dash-actions-list">
          {automations.map((item, i) => {
            const Icon = item.icon
            return (
              <button
                key={item.title}
                type="button"
                className="mob-dash-action-row mob-agenda-reminder-row mob-agenda-reminder-row-clickable"
                onClick={() => onConfigureReminder?.(i)}
              >
                <span className="mob-dash-action-icon" style={{ background: item.bg, color: item.color }}>
                  {Icon && <Icon size={15} />}
                </span>
                <span className="mob-dash-action-label">{item.title}</span>
                <span className={`mob-charges-status ${item.on ? 'green' : 'yellow'}`}>{item.on ? 'Ativo' : 'Configurar'}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
