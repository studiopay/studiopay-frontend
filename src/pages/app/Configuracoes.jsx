import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, LogOut } from 'lucide-react'

const TABS = ['Estúdio', 'Dados pessoais', 'Plano', 'Horários', 'Mensagens', 'Segurança']

export default function Configuracoes() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('Estúdio')
  const user = JSON.parse(localStorage.getItem('studiopay_user') || '{}')
  const [form, setForm] = useState({ ...user })

  function logout() {
    localStorage.removeItem('studiopay_user')
    navigate('/')
  }

  function save() {
    localStorage.setItem('studiopay_user', JSON.stringify(form))
    alert('Configurações salvas!')
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Configurações</h1>
        <p>Gerencie sua conta e seu estúdio.</p>
      </div>

      <div className="config-tabs">
        {TABS.map(t => (
          <button key={t} className={`config-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'Estúdio' && (
        <div className="card animate-fade-in" style={{ maxWidth: 600 }}>
          <h3 className="font-semibold mb-20">Dados do estúdio</h3>
          <div className="flex-col gap-16">
            <div className="form-group"><label>Nome do estúdio</label><input className="form-input" value={form.estudio || ''} onChange={e => setForm({...form, estudio: e.target.value})}/></div>
            <div className="form-group"><label>Cidade</label><input className="form-input" placeholder="São Paulo, SP"/></div>
            <div className="form-group"><label>Instagram</label><input className="form-input" placeholder="@seuestudio"/></div>
            <div className="form-group"><label>Site</label><input className="form-input" placeholder="https://..."/></div>
            <div className="form-group"><label>Sobre o estúdio</label><textarea className="form-textarea" placeholder="Fale um pouco sobre seu trabalho..."/></div>
          </div>
          <button className="btn btn-primary mt-20" onClick={save}><Save size={15}/> Salvar</button>
        </div>
      )}

      {tab === 'Dados pessoais' && (
        <div className="card animate-fade-in" style={{ maxWidth: 600 }}>
          <h3 className="font-semibold mb-20">Seus dados</h3>
          <div className="flex-col gap-16">
            <div className="form-group"><label>Nome completo</label><input className="form-input" value={form.nome || ''} onChange={e => setForm({...form, nome: e.target.value})}/></div>
            <div className="form-group"><label>E-mail</label><input className="form-input" type="email" value={form.email || ''} onChange={e => setForm({...form, email: e.target.value})}/></div>
            <div className="form-group"><label>WhatsApp</label><input className="form-input" value={form.whatsapp || ''} onChange={e => setForm({...form, whatsapp: e.target.value})}/></div>
          </div>
          <button className="btn btn-primary mt-20" onClick={save}><Save size={15}/> Salvar</button>
        </div>
      )}

      {tab === 'Plano' && (
        <div className="card animate-fade-in" style={{ maxWidth: 600 }}>
          <h3 className="font-semibold mb-4">Plano atual</h3>
          <div className="flex items-center gap-12 mb-20">
            <div style={{ background: 'var(--pink-dim)', borderRadius: 8, padding: '6px 14px' }}>
              <span className="text-pink font-semibold">{form.plano || 'Starter'}</span>
            </div>
            <span className="text-muted text-sm">Ativo · Renova em 30 dias</span>
          </div>
          <div className="alert alert-pink mb-20">
            <span>✨</span><span>Faça upgrade para o Pro e desbloqueie automações, relatórios avançados e Elison IA completo.</span>
          </div>
          <button className="btn btn-primary">Fazer upgrade para Pro</button>
          <p className="text-sm text-muted mt-12">Para cancelar, entre em contato com o suporte.</p>
        </div>
      )}

      {tab === 'Horários' && (
        <div className="card animate-fade-in" style={{ maxWidth: 600 }}>
          <h3 className="font-semibold mb-20">Horário de atendimento</h3>
          <div className="flex-col gap-16">
            <div className="form-row-2">
              <div className="form-group"><label>Abertura</label><input className="form-input" type="time" defaultValue="09:00"/></div>
              <div className="form-group"><label>Fechamento</label><input className="form-input" type="time" defaultValue="18:00"/></div>
            </div>
            <div className="form-group">
              <label>Dias de atendimento</label>
              <div className="dias-picker">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia, i) => (
                  <button key={dia} type="button" className={`dia-btn ${i > 0 && i < 7 && i !== 0 ? 'active' : ''}`}>{dia}</button>
                ))}
              </div>
            </div>
          </div>
          <button className="btn btn-primary mt-20" onClick={save}><Save size={15}/> Salvar</button>
        </div>
      )}

      {tab === 'Mensagens' && (
        <div className="card animate-fade-in" style={{ maxWidth: 600 }}>
          <h3 className="font-semibold mb-20">Mensagens automáticas (Elison IA)</h3>
          <div className="flex-col gap-16">
            {[
              { label: 'Confirmação de agendamento', value: 'Oi, {nome}! Passando para confirmar seu horário {dia} às {hora}. Qualquer dúvida me chama! 🖤' },
              { label: 'Cuidados pré-tattoo', value: 'Olá, {nome}! Amanhã é dia de tattoo! Lembra de se alimentar bem antes, hidra a pele e use roupas confortáveis.' },
              { label: 'Cuidados pós-tattoo', value: 'E aí, {nome}! Espero que tenha gostado! Aqui estão os cuidados pra cicatrização...' },
              { label: 'Reativação de cliente', value: 'Saudades, {nome}! Faz um tempo que você não aparece. Temos novos horários disponíveis, quer ver?' },
            ].map((m, i) => (
              <div key={i} className="form-group">
                <label>{m.label}</label>
                <textarea className="form-textarea" defaultValue={m.value} />
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-20" onClick={save}><Save size={15}/> Salvar mensagens</button>
        </div>
      )}

      {tab === 'Segurança' && (
        <div className="card animate-fade-in" style={{ maxWidth: 600 }}>
          <h3 className="font-semibold mb-20">Segurança da conta</h3>
          <div className="flex-col gap-16">
            <div className="form-group"><label>Senha atual</label><input className="form-input" type="password" placeholder="••••••••"/></div>
            <div className="form-group"><label>Nova senha</label><input className="form-input" type="password" placeholder="••••••••"/></div>
            <div className="form-group"><label>Confirmar nova senha</label><input className="form-input" type="password" placeholder="••••••••"/></div>
          </div>
          <button className="btn btn-primary mt-20"><Save size={15}/> Alterar senha</button>
          <hr className="divider" />
          <div>
            <h4 className="font-semibold mb-8">Sair da conta</h4>
            <p className="text-muted text-sm mb-12">Você será redirecionado para a página inicial.</p>
            <button className="btn btn-danger" onClick={logout}><LogOut size={15}/> Sair da conta</button>
          </div>
        </div>
      )}
    </div>
  )
}
