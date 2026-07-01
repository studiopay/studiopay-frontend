import { useState, useRef, useEffect } from 'react'
import {
  Bot, Send, Sparkles, MessageCircle, CheckCircle, X, Check,
  Clock, Zap, Users, MessageSquare, Phone, Eye, CheckCheck,
  RefreshCw, LayoutDashboard, Settings, Wifi, ChevronRight, Bell, Star,
} from 'lucide-react'
import { mensagensElison } from '@/data/mockData'

/* ── Lookup tables ─────────────────────────────────────────────── */

const TIPO_CONFIG = {
  confirmacao: { label: 'Confirmação', color: 'var(--green)',  bg: 'var(--green-dim)' },
  preTattoo:   { label: 'Pré-tattoo',  color: '#FBBF24',      bg: 'rgba(251,191,36,0.12)' },
  posTattoo:   { label: 'Pós-tattoo',  color: '#60A5FA',      bg: 'rgba(96,165,250,0.12)' },
  reativacao:  { label: 'Reativação',  color: 'var(--pink)',  bg: 'var(--pink-dim)' },
}

const STATUS_CFG = {
  enviado:  { label: 'Enviado',  Icon: Check,      color: 'var(--app-text-muted)' },
  entregue: { label: 'Entregue', Icon: CheckCheck, color: '#FBBF24' },
  lido:     { label: 'Lido',     Icon: CheckCheck, color: 'var(--green)' },
}

/* ── Mock data ─────────────────────────────────────────────────── */

const PENDING_INICIAL = [
  {
    id: 1, cliente: 'Ana Beatriz', avatar: 'AB', cor: '#8B5CF6',
    contexto: 'Sessão amanhã às 14h', tipo: 'confirmacao',
    mensagem: 'Oi Ana! 😊 Só passando para confirmar sua sessão amanhã às 14h no Studio Noir. Tudo certo por aí?',
  },
  {
    id: 2, cliente: 'Ricardo Mendes', avatar: 'RM', cor: '#3B82F6',
    contexto: 'Sessão em 2h', tipo: 'preTattoo',
    mensagem: 'Oi Ricardo! Sua sessão começa em 2h. 🎨 Lembrete: venha bem alimentado, use roupa escura e evite bebidas alcoólicas. Até já!',
  },
  {
    id: 3, cliente: 'Larissa Costa', avatar: 'LC', cor: '#EC4899',
    contexto: 'Sessão concluída há 3 dias', tipo: 'posTattoo',
    mensagem: 'Oi Larissa! Como está a cicatrização? 🌿 Lembra de passar o creme hidratante 3x ao dia e evitar sol direto. Qualquer dúvida me chama!',
  },
]

const AUTOMATIONS_INICIAL = [
  { id: 1, Icon: CheckCircle, color: 'var(--green)',  bg: 'var(--green-dim)',              title: 'Confirmação automática',  desc: '24h antes da sessão',          on: true,  count: 12 },
  { id: 2, Icon: Clock,       color: '#FBBF24',       bg: 'rgba(251,191,36,0.12)',          title: 'Lembrete pré-tattoo',      desc: '2h antes da sessão',           on: true,  count: 8  },
  { id: 3, Icon: Sparkles,    color: '#60A5FA',       bg: 'rgba(96,165,250,0.12)',          title: 'Cuidados pós-tattoo',      desc: 'Após conclusão da sessão',     on: true,  count: 6  },
  { id: 4, Icon: Users,       color: 'var(--pink)',   bg: 'var(--pink-dim)',                title: 'Reativação de clientes',   desc: 'Clientes inativos > 60 dias',  on: false, count: 3  },
]

const HISTORICO_INICIAL = [
  { id: 1, tipo: 'confirmacao', cliente: 'Mariana Souza',  desc: 'Confirmação de horário enviada',   hora: '09:14',       status: 'lido'     },
  { id: 2, tipo: 'preTattoo',   cliente: 'Felipe Torres',  desc: 'Lembrete pré-tattoo enviado',      hora: '08:45',       status: 'entregue' },
  { id: 3, tipo: 'reativacao',  cliente: 'Juliana Melo',   desc: 'Mensagem de reativação enviada',   hora: 'Ontem 17:32', status: 'lido'     },
  { id: 4, tipo: 'posTattoo',   cliente: 'Carlos Lima',    desc: 'Cuidados pós-tattoo enviados',     hora: 'Ontem 14:15', status: 'enviado'  },
  { id: 5, tipo: 'confirmacao', cliente: 'Amanda Rocha',   desc: 'Confirmação de horário enviada',   hora: 'Ontem 10:00', status: 'lido'     },
]

const CONTACTS_INICIAL = [
  { id: 1, nome: 'Tiago Martins',   avatar: 'TM', cor: '#F59E0B', dias: 73, enviado: false },
  { id: 2, nome: 'Beatriz Alves',   avatar: 'BA', cor: '#14B8A6', dias: 61, enviado: false },
  { id: 3, nome: 'Paulo Neto',      avatar: 'PN', cor: '#F97316', dias: 45, enviado: false },
  { id: 4, nome: 'Camila Ferreira', avatar: 'CF', cor: '#8B5CF6', dias: 38, enviado: false },
  { id: 5, nome: 'Rafael Silva',    avatar: 'RS', cor: '#3B82F6', dias: 32, enviado: false },
]

const AGENTS_INICIAL = [
  {
    id: 1, name: 'Elison Atendimento', role: 'Assistente de Atendimento',
    desc: 'Responde dúvidas dos clientes e sugere respostas personalizadas com base no histórico de sessões.',
    on: true, count: 12, countLabel: 'respostas', color: 'var(--pink)', bg: 'var(--pink-dim)',
  },
  {
    id: 2, name: 'Elison Agenda', role: 'Gerenciador de Agendamentos',
    desc: 'Confirma sessões, envia lembretes automáticos e notifica clientes sobre cancelamentos e remarcações.',
    on: true, count: 20, countLabel: 'mensagens', color: 'var(--green)', bg: 'var(--green-dim)',
  },
  {
    id: 3, name: 'Elison Reativação', role: 'Especialista em Retenção',
    desc: 'Identifica clientes inativos e envia mensagens de reativação personalizadas no tempo certo.',
    on: false, count: 3, countLabel: 'reativações', color: '#FBBF24', bg: 'rgba(251,191,36,0.12)',
  },
]

const RESPOSTAS_IA = [
  'Entendido! Posso verificar os agendamentos de hoje e organizar as confirmações pendentes.',
  'Detectei 3 clientes sem agendar há mais de 60 dias. Quer que eu prepare mensagens de reativação?',
  'Aqui está o resumo da semana:\n📅 14 agendamentos confirmados\n📨 47 mensagens enviadas\n✅ 94% de taxa de leitura',
  'Feito! Configuração atualizada. As automações continuam funcionando normalmente.',
  'O Ricardo Mendes costuma agendar a cada 30 dias — faz 28 dias desde a última sessão. Quer que eu envie um lembrete?',
]

/* ── Component ─────────────────────────────────────────────────── */

export default function Elison() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [pendentes,     setPendentes]     = useState(PENDING_INICIAL)
  const [automacoes,    setAutomacoes]    = useState(AUTOMATIONS_INICIAL)
  const historico                         = HISTORICO_INICIAL
  const [contacts,      setContacts]      = useState(CONTACTS_INICIAL)
  const [agents,        setAgents]        = useState(AGENTS_INICIAL)
  const [editandoId,    setEditandoId]    = useState(null)
  const [editText,      setEditText]      = useState('')
  const [chatMsgs,      setChatMsgs]      = useState(mensagensElison)
  const [chatInput,     setChatInput]     = useState('')
  const [toast,         setToast]         = useState(null)
  const [config,        setConfig]        = useState({
    aprovarManual: true, modoAutomatico: false, alertasApp: true, resumoEmail: false,
    silencioInicio: '22:00', silencioFim: '08:00',
  })
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMsgs])

  const navItems = [
    { id: 'inicio',        Icon: LayoutDashboard, label: 'Início' },
    { id: 'mensagens',     Icon: MessageCircle,   label: 'Mensagens',     badge: pendentes.length || null },
    { id: 'agentes',       Icon: Bot,             label: 'Agentes' },
    { id: 'automacoes',    Icon: Zap,             label: 'Automações' },
    { id: 'canais',        Icon: Wifi,            label: 'Canais' },
    { id: 'contatos',      Icon: Users,           label: 'Contatos' },
    { id: 'configuracoes', Icon: Settings,        label: 'Configurações' },
  ]

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  function aprovar(id)  { setPendentes(p => p.filter(m => m.id !== id)); showToast('Mensagem enviada via WhatsApp') }
  function ignorar(id)  { setPendentes(p => p.filter(m => m.id !== id)); showToast('Mensagem removida da fila') }
  function startEdit(item) { setEditandoId(item.id); setEditText(item.mensagem) }
  function saveEdit(id) { setPendentes(p => p.map(m => m.id === id ? { ...m, mensagem: editText } : m)); setEditandoId(null) }
  function cancelEdit() { setEditandoId(null); setEditText('') }

  function toggleAuto(id)  { setAutomacoes(a => a.map(m => m.id === id ? { ...m, on: !m.on } : m)) }
  function toggleAgent(id) { setAgents(a => a.map(m => m.id === id ? { ...m, on: !m.on } : m)) }

  function sendChat() {
    if (!chatInput.trim()) return
    const userMsg = { id: Date.now(),     tipo: 'user', texto: chatInput }
    const aiResp  = { id: Date.now() + 1, tipo: 'ai',   texto: RESPOSTAS_IA[Math.floor(Math.random() * RESPOSTAS_IA.length)] }
    setChatMsgs(m => [...m, userMsg, aiResp])
    setChatInput('')
  }

  function sendReativacao(id) {
    setContacts(c => c.map(m => m.id === id ? { ...m, enviado: true } : m))
    showToast('Mensagem de reativação enviada')
  }

  /* ── Shared sub-renders ── */

  function histItem(item) {
    const tc = TIPO_CONFIG[item.tipo] || TIPO_CONFIG.confirmacao
    const sc = STATUS_CFG[item.status] || STATUS_CFG.enviado
    const { Icon: StatusIcon } = sc
    return (
      <div key={item.id} className="el-hist-item">
        <div className="el-hist-icon" style={{ color: tc.color, background: tc.bg }}>
          <MessageSquare size={14} />
        </div>
        <div className="el-hist-info">
          <p className="el-hist-nome">{item.cliente}</p>
          <p className="el-hist-desc">{item.desc}</p>
        </div>
        <div className="el-hist-right">
          <p className="el-hist-hora">{item.hora}</p>
          <span className="el-hist-status" style={{ color: sc.color }}>
            <StatusIcon size={12} /> {sc.label}
          </span>
        </div>
      </div>
    )
  }

  function pendingCard(item) {
    const tc        = TIPO_CONFIG[item.tipo] || TIPO_CONFIG.confirmacao
    const isEditing = editandoId === item.id
    return (
      <div key={item.id} className="el-pending-card">
        <div className="el-pending-header">
          <div className="el-pending-av" style={{ background: item.cor }}>{item.avatar}</div>
          <div className="el-pending-meta">
            <p className="el-pending-nome">{item.cliente}</p>
            <p className="el-pending-ctx">{item.contexto}</p>
          </div>
          <span className="el-pending-tipo" style={{ color: tc.color, background: tc.bg }}>{tc.label}</span>
        </div>
        <div className="el-pending-body">
          {isEditing
            ? <textarea className="el-pending-textarea" value={editText} onChange={e => setEditText(e.target.value)} rows={3} />
            : <p className="el-pending-msg">"{item.mensagem}"</p>
          }
        </div>
        <div className="el-pending-footer">
          {isEditing ? (
            <>
              <button className="el-action-btn" onClick={cancelEdit}>Cancelar</button>
              <div className="el-spacer" />
              <button className="btn btn-primary el-btn-sm" onClick={() => saveEdit(item.id)}>Salvar</button>
            </>
          ) : (
            <>
              <button className="el-action-btn" onClick={() => startEdit(item)}>Editar</button>
              <button className="el-action-btn el-action-ignore" onClick={() => ignorar(item.id)}>
                <X size={12} /> Ignorar
              </button>
              <div className="el-spacer" />
              <button className="el-send-btn" onClick={() => aprovar(item.id)}>
                <Check size={13} /> Enviar agora
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  /* ── Section: Início ── */

  function renderInicio() {
    return (
      <div className="el-content-pad">
        <div className="el-hdr">
          <div>
            <h2 className="el-hdr-title">Visão geral</h2>
            <p className="el-hdr-sub">Resumo de hoje e da semana</p>
          </div>
          <div className="el-hdr-right">
            <span className="el-badge el-badge-ws"><span className="el-badge-dot" /> WhatsApp conectado</span>
            <span className="el-badge el-badge-ia"><Sparkles size={11} /> IA ativa</span>
          </div>
        </div>

        <div className="el-stats">
          {[
            { label: 'Mensagens enviadas',      value: 47,               sub: 'esta semana',   Icon: MessageCircle, color: 'var(--pink)',  bg: 'var(--pink-dim)',              urgent: false },
            { label: 'Taxa de leitura',          value: '94%',            sub: 'das mensagens', Icon: Eye,           color: 'var(--green)', bg: 'var(--green-dim)',             urgent: false },
            { label: 'Confirmações automáticas', value: 12,               sub: 'esta semana',   Icon: CheckCircle,   color: '#60A5FA',      bg: 'rgba(96,165,250,0.12)',        urgent: false },
            { label: 'Aguardando aprovação',     value: pendentes.length, sub: pendentes.length === 1 ? 'mensagem' : 'mensagens', Icon: Clock, color: '#FBBF24', bg: 'rgba(251,191,36,0.12)', urgent: pendentes.length > 0 },
          ].map(({ label, value, sub, Icon, color, bg, urgent }) => (
            <div key={label} className={`el-stat-card${urgent ? ' el-stat-card-urgent' : ''}`}>
              <div className="el-stat-icon" style={{ color, background: bg }}><Icon size={18} /></div>
              <div>
                <p className="el-stat-value">{value}</p>
                <p className="el-stat-label">{label}</p>
                <p className="el-stat-sub">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="el-inicio-body">
          <div className="el-inicio-main">
            <div className="el-card">
              <p className="el-card-title">Atividade recente</p>
              <div className="el-hist-list">{historico.map(histItem)}</div>
            </div>
          </div>
          <div className="el-inicio-side">
            {pendentes.length > 0 && (
              <div className="el-card el-callout">
                <div className="el-callout-top">
                  <div className="el-callout-count">{pendentes.length}</div>
                  <div>
                    <p className="el-callout-title">Mensagens aguardando</p>
                    <p className="el-callout-sub">Revise e envie pelo WhatsApp</p>
                  </div>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: 14 }} onClick={() => setActiveSection('mensagens')}>
                  Revisar mensagens
                </button>
              </div>
            )}
            <div className="el-card">
              <p className="el-card-title">Ações rápidas</p>
              <div className="el-qa-list">
                {[
                  { Icon: MessageCircle, label: 'Revisar mensagens pendentes', action: () => setActiveSection('mensagens'),  color: 'var(--pink)',  bg: 'var(--pink-dim)' },
                  { Icon: Users,         label: 'Clientes para reativar',      action: () => setActiveSection('contatos'),   color: '#FBBF24',      bg: 'rgba(251,191,36,0.12)' },
                  { Icon: Zap,           label: 'Configurar automações',       action: () => setActiveSection('automacoes'), color: '#60A5FA',      bg: 'rgba(96,165,250,0.12)' },
                  { Icon: Bell,          label: 'Relatório semanal',           action: () => showToast('Relatório disponível em breve'), color: 'var(--green)', bg: 'var(--green-dim)' },
                ].map(({ Icon, label, action, color, bg }) => (
                  <button key={label} className="el-qa-item" onClick={action}>
                    <div className="el-qa-icon" style={{ color, background: bg }}><Icon size={15} /></div>
                    <span className="el-qa-label">{label}</span>
                    <ChevronRight size={14} color="var(--app-text-muted)" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── Section: Mensagens ── */

  function renderMensagens() {
    return (
      <div className="el-content-pad">
        <div className="el-hdr">
          <div>
            <h2 className="el-hdr-title">Mensagens</h2>
            <p className="el-hdr-sub">Aprovação de mensagens e chat direto com o Elison</p>
          </div>
          {pendentes.length > 0 && <span className="el-inbox-badge">{pendentes.length} pendentes</span>}
        </div>

        <div className="el-msgs-wrap">
          <div className="el-msgs-left">
            {pendentes.length === 0 ? (
              <div className="el-empty">
                <CheckCircle size={36} color="var(--green)" />
                <p className="el-empty-title">Tudo enviado!</p>
                <p className="el-empty-sub">Nenhuma mensagem aguardando aprovação.</p>
                <button className="el-empty-reset" onClick={() => setPendentes(PENDING_INICIAL)}>
                  <RefreshCw size={13} /> Simular novas mensagens
                </button>
              </div>
            ) : (
              <div className="el-inbox-list">{pendentes.map(pendingCard)}</div>
            )}
          </div>

          <div className="el-msgs-right">
            <div className="el-chat-panel">
              <div className="el-chat-top">
                <div className="el-chat-top-av"><Bot size={16} color="var(--pink)" /></div>
                <div>
                  <p className="el-chat-top-name">Elison</p>
                  <p className="el-chat-top-sub">● Online agora</p>
                </div>
              </div>
              <div className="el-chat-msgs">
                {chatMsgs.map(m => {
                  const lines = m.texto.split('\n')
                  return (
                    <div key={m.id} className={`el-chat-msg${m.tipo === 'ai' ? ' from-ai' : ' from-user'}`}>
                      {lines.map((line, i) => (
                        <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
                      ))}
                    </div>
                  )
                })}
                <div ref={chatEndRef} />
              </div>
              <div className="el-chat-input-row">
                <input
                  placeholder="Pergunte algo ao Elison..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendChat()}
                />
                <button className="el-chat-send" onClick={sendChat} aria-label="Enviar">
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── Section: Agentes ── */

  function renderAgentes() {
    return (
      <div className="el-content-pad">
        <div className="el-hdr">
          <div>
            <h2 className="el-hdr-title">Agentes de IA</h2>
            <p className="el-hdr-sub">Gerencie os agentes automáticos do Elison</p>
          </div>
        </div>
        <div className="el-agents-grid">
          {agents.map(({ id, name, role, desc, on, count, countLabel, color, bg }) => (
            <div key={id} className="el-agent-card">
              <div className="el-agent-top">
                <div className="el-agent-av" style={{ background: bg, color }}><Bot size={22} /></div>
                <label className="toggle">
                  <input type="checkbox" checked={on} onChange={() => toggleAgent(id)} />
                  <span className="toggle-slider" />
                </label>
              </div>
              <p className="el-agent-name">{name}</p>
              <p className="el-agent-role">{role}</p>
              <p className="el-agent-desc">{desc}</p>
              <div className="el-agent-footer">
                <div>
                  <p className="el-agent-stat-val" style={{ color }}>{count}</p>
                  <p className="el-agent-stat-lbl">{countLabel} esta semana</p>
                </div>
                <div className="el-agent-status">
                  <div className="el-agent-dot" style={{ background: on ? 'var(--green)' : '#FBBF24' }} />
                  <span>{on ? 'Ativo' : 'Pausado'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="el-card">
          <p className="el-card-title">Como funcionam os agentes</p>
          {[
            { label: 'Atendimento',  desc: 'Responde dúvidas e sugere mensagens com base no contexto do cliente.' },
            { label: 'Agenda',       desc: 'Gerencia confirmações, lembretes e notificações de agendamento.' },
            { label: 'Reativação',   desc: 'Contata clientes inativos com mensagens personalizadas.' },
          ].map(({ label, desc }) => (
            <div key={label} className="el-agent-info-row">
              <div className="el-agent-info-dot" />
              <p className="el-agent-info-text"><strong>{label}</strong> — {desc}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  /* ── Section: Automações ── */

  function renderAutomacoes() {
    return (
      <div className="el-content-pad">
        <div className="el-hdr">
          <div>
            <h2 className="el-hdr-title">Automações</h2>
            <p className="el-hdr-sub">Ações que o Elison executa automaticamente durante o fluxo de atendimento</p>
          </div>
        </div>
        <div className="el-auto-grid">
          {automacoes.map(({ id, Icon, color, bg, title, desc, on, count }) => (
            <div key={id} className={`el-auto-card${on ? '' : ' el-auto-card-off'}`}>
              <div className="el-auto-card-top">
                <div className="el-auto-icon" style={{ color, background: bg }}><Icon size={18} /></div>
                <label className="toggle">
                  <input type="checkbox" checked={on} onChange={() => toggleAuto(id)} />
                  <span className="toggle-slider" />
                </label>
              </div>
              <p className="el-auto-title">{title}</p>
              <p className="el-auto-desc">{desc}</p>
              <p className="el-auto-count"><Zap size={11} /> {count} executadas esta semana</p>
            </div>
          ))}
        </div>
        <div className="el-card">
          <p className="el-card-title">Histórico de execuções</p>
          <div className="el-hist-list">{historico.map(histItem)}</div>
        </div>
      </div>
    )
  }

  /* ── Section: Canais ── */

  function renderCanais() {
    return (
      <div className="el-content-pad">
        <div className="el-hdr">
          <div>
            <h2 className="el-hdr-title">Canais</h2>
            <p className="el-hdr-sub">Conexões ativas para envio de mensagens automáticas</p>
          </div>
        </div>
        <div className="el-canais-grid">
          <div className="el-canal-card">
            <div className="el-canal-card-top">
              <div className="el-canal-icon-wrap" style={{ background: 'rgba(37,211,102,0.12)' }}>
                <Phone size={22} color="#25D366" />
              </div>
              <span className="el-canal-status-badge el-canal-connected">● Conectado</span>
            </div>
            <div>
              <p className="el-canal-name">WhatsApp Business</p>
              <p className="el-canal-desc">Canal principal de atendimento automático</p>
              <p className="el-canal-number">+55 (11) 99999-0001</p>
            </div>
            <div className="el-canal-stats">
              <div className="el-canal-stat"><p className="el-canal-stat-val">47</p><p className="el-canal-stat-lbl">Enviadas</p></div>
              <div className="el-canal-stat"><p className="el-canal-stat-val">44</p><p className="el-canal-stat-lbl">Entregues</p></div>
              <div className="el-canal-stat"><p className="el-canal-stat-val">38</p><p className="el-canal-stat-lbl">Lidas</p></div>
            </div>
          </div>

          <div className="el-canal-card el-canal-soon">
            <div className="el-canal-card-top">
              <div className="el-canal-icon-wrap" style={{ background: 'rgba(139,92,246,0.12)' }}>
                <Star size={22} color="#8B5CF6" />
              </div>
              <span className="el-canal-soon-badge">Em breve</span>
            </div>
            <div>
              <p className="el-canal-name">Instagram Direct</p>
              <p className="el-canal-desc">Atendimento via mensagens do Instagram</p>
            </div>
            <div style={{ flex: 1 }} />
            <button className="btn btn-ghost" style={{ width: '100%', fontSize: 12 }} disabled>Conectar</button>
          </div>

          <div className="el-canal-card el-canal-soon">
            <div className="el-canal-card-top">
              <div className="el-canal-icon-wrap" style={{ background: 'rgba(59,130,246,0.12)' }}>
                <MessageSquare size={22} color="#3B82F6" />
              </div>
              <span className="el-canal-soon-badge">Em breve</span>
            </div>
            <div>
              <p className="el-canal-name">Email</p>
              <p className="el-canal-desc">Resumos, relatórios e notificações por email</p>
            </div>
            <div style={{ flex: 1 }} />
            <button className="btn btn-ghost" style={{ width: '100%', fontSize: 12 }} disabled>Conectar</button>
          </div>
        </div>
      </div>
    )
  }

  /* ── Section: Contatos ── */

  function renderContatos() {
    return (
      <div className="el-content-pad">
        <div className="el-hdr">
          <div>
            <h2 className="el-hdr-title">Contatos</h2>
            <p className="el-hdr-sub">Clientes sem agendar há mais de 30 dias</p>
          </div>
        </div>
        <div className="el-contacts-list">
          {contacts.map(c => (
            <div key={c.id} className="el-contact-item">
              <div className="el-contact-av" style={{ background: c.cor }}>{c.avatar}</div>
              <div className="el-contact-info">
                <p className="el-contact-nome">{c.nome}</p>
                <p className={`el-contact-dias${c.dias >= 60 ? ' el-contact-urgente' : ''}`}>
                  {c.dias} dias sem agendar{c.dias >= 60 ? ' · reativação urgente' : ''}
                </p>
              </div>
              {c.enviado ? (
                <span className="el-contact-sent"><CheckCircle size={13} /> Enviado</span>
              ) : (
                <button className="el-contact-btn" onClick={() => sendReativacao(c.id)}>Reativar</button>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  /* ── Section: Configurações ── */

  function renderConfiguracoes() {
    function configRow(label, desc, field) {
      return (
        <div key={field} className="el-config-item">
          <div className="el-config-info">
            <p className="el-config-label">{label}</p>
            {desc && <p className="el-config-desc">{desc}</p>}
          </div>
          <label className="toggle">
            <input type="checkbox" checked={config[field]} onChange={() => setConfig(c => ({ ...c, [field]: !c[field] }))} />
            <span className="toggle-slider" />
          </label>
        </div>
      )
    }

    return (
      <div className="el-content-pad">
        <div className="el-hdr">
          <div>
            <h2 className="el-hdr-title">Configurações</h2>
            <p className="el-hdr-sub">Ajuste o comportamento do Elison IA</p>
          </div>
        </div>
        <div className="el-card">
          <div className="el-config-section">
            <p className="el-config-section-title">Comportamento</p>
            {configRow('Aprovar mensagens manualmente', 'Revise cada mensagem antes do envio automático', 'aprovarManual')}
            {configRow('Modo automático completo', 'Elison envia mensagens sem aprovação prévia', 'modoAutomatico')}
          </div>
          <div className="el-config-section">
            <p className="el-config-section-title">Notificações</p>
            {configRow('Alertas no app', 'Notificações quando mensagens forem enviadas ou entregues', 'alertasApp')}
            {configRow('Resumo diário por email', 'Receba um resumo das atividades do dia por email', 'resumoEmail')}
          </div>
          <div className="el-config-section" style={{ marginBottom: 0 }}>
            <p className="el-config-section-title">Horário de silêncio</p>
            <div className="el-config-item">
              <div className="el-config-info">
                <p className="el-config-label">Início do silêncio</p>
                <p className="el-config-desc">Elison não envia mensagens após este horário</p>
              </div>
              <input type="time" className="el-time-input" value={config.silencioInicio} onChange={e => setConfig(c => ({ ...c, silencioInicio: e.target.value }))} />
            </div>
            <div className="el-config-item" style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <div className="el-config-info">
                <p className="el-config-label">Fim do silêncio</p>
                <p className="el-config-desc">Elison volta a funcionar normalmente</p>
              </div>
              <input type="time" className="el-time-input" value={config.silencioFim} onChange={e => setConfig(c => ({ ...c, silencioFim: e.target.value }))} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── Render map ── */

  const sectionRender = {
    inicio: renderInicio, mensagens: renderMensagens, agentes: renderAgentes,
    automacoes: renderAutomacoes, canais: renderCanais, contatos: renderContatos,
    configuracoes: renderConfiguracoes,
  }

  return (
    <div className="el-panel animate-fade-in">

      {/* Internal sidebar */}
      <nav className="el-sidenav">
        <div className="el-sidenav-top">
          <div className="el-sn-logo"><Bot size={18} color="var(--pink)" /></div>
          <p className="el-sn-name">Elison IA</p>
          <p className="el-sn-sub">Atendimento inteligente</p>
          <div className="el-sn-ws"><span className="el-sn-dot" /> WhatsApp ativo</div>
        </div>
        <div className="el-sidenav-nav">
          {navItems.map(({ id, Icon, label, badge }) => (
            <button
              key={id}
              className={`el-nav-item${activeSection === id ? ' active' : ''}`}
              onClick={() => setActiveSection(id)}
            >
              <Icon size={16} />
              <span className="el-nav-label">{label}</span>
              {badge && <span className="el-nav-badge">{badge}</span>}
            </button>
          ))}
        </div>
        <div className="el-sidenav-foot">
          <p className="el-sn-version">Elison v2.1 · Studio Pay</p>
        </div>
      </nav>

      {/* Content */}
      <main className="el-content">
        {(sectionRender[activeSection] || renderInicio)()}
      </main>

      {toast && <div className="el-toast">{toast}</div>}
    </div>
  )
}
