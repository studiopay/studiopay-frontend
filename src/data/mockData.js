export const metricas = {
  saldo: 8432.50,
  receitaMes: 14760.00,
  saidaMes: 3240.00,
  lucroEstimado: 11520.00,
  agendamentosSemana: 12,
  clientesAtivos: 87,
  cobrancasPendentes: 5,
  taxaComparecimento: 91,
}

export const clientes = [
  { id: 1, nome: 'Ana Beatriz Souza', whatsapp: '(11) 99834-2210', email: 'ana@email.com', ultimaSessao: '2026-06-10', totalGasto: 2800, sessoes: 7, status: 'ativo', tags: ['VIP', 'Recorrente'], avatar: 'AB', obs: 'Prefere horários pela manhã. Alérgica a anestésico.' },
  { id: 2, nome: 'Carlos Mendes', whatsapp: '(11) 97721-5588', email: 'carlos@email.com', ultimaSessao: '2026-05-22', totalGasto: 1200, sessoes: 3, status: 'ativo', tags: ['Recorrente'], avatar: 'CM', obs: 'Trabalha viajando, avisar com 3 dias de antecedência.' },
  { id: 3, nome: 'Fernanda Lima', whatsapp: '(21) 98855-1122', email: 'fernanda@email.com', ultimaSessao: '2026-03-14', totalGasto: 450, sessoes: 1, status: 'sumido', tags: ['Sumido'], avatar: 'FL', obs: '' },
  { id: 4, nome: 'Diego Ramos', whatsapp: '(11) 94412-7700', email: 'diego@email.com', ultimaSessao: '2026-06-18', totalGasto: 3600, sessoes: 9, status: 'ativo', tags: ['VIP'], avatar: 'DR', obs: 'Pele sensível, sempre usar cuidados extras na cicatrização.' },
  { id: 5, nome: 'Julia Torres', whatsapp: '(31) 99230-4411', email: 'julia@email.com', ultimaSessao: '2026-06-05', totalGasto: 920, sessoes: 2, status: 'ativo', tags: ['Novo'], avatar: 'JT', obs: 'Primeira tattoo grande, ficou ansiosa. Conversar bem antes.' },
  { id: 6, nome: 'Marcos Vieira', whatsapp: '(41) 98765-3210', email: 'marcos@email.com', ultimaSessao: '2026-04-01', totalGasto: 750, sessoes: 2, status: 'inativo', tags: ['Sumido'], avatar: 'MV', obs: '' },
  { id: 7, nome: 'Sabrina Alves', whatsapp: '(11) 93399-0055', email: 'sabrina@email.com', ultimaSessao: '2026-06-20', totalGasto: 5100, sessoes: 12, status: 'ativo', tags: ['VIP', 'Recorrente'], avatar: 'SA', obs: 'Coleciona tattoos, manda referências com antecedência.' },
  { id: 8, nome: 'Rafael Nunes', whatsapp: '(21) 97788-1234', email: 'rafael@email.com', ultimaSessao: '2026-05-30', totalGasto: 1800, sessoes: 4, status: 'ativo', tags: ['Recorrente'], avatar: 'RN', obs: '' },
]

export const agendamentos = [
  { id: 1, cliente: 'Ana Beatriz Souza', servico: 'Blackwork Manga', data: '2026-06-23', horario: '10:00', valor: 800, sinal: 200, status: 'confirmado', obs: 'Continuar manga esquerda' },
  { id: 2, cliente: 'Diego Ramos', servico: 'Realismo Colorido', data: '2026-06-23', horario: '14:00', valor: 1200, sinal: 300, status: 'confirmado', obs: 'Costas — segunda sessão' },
  { id: 3, cliente: 'Julia Torres', servico: 'Fine Line', data: '2026-06-24', horario: '09:30', valor: 350, sinal: 100, status: 'pendente', obs: 'Primeira sessão' },
  { id: 4, cliente: 'Sabrina Alves', servico: 'Neotradicional', data: '2026-06-24', horario: '15:00', valor: 900, sinal: 200, status: 'confirmado', obs: '' },
  { id: 5, cliente: 'Carlos Mendes', servico: 'Pontilhismo', data: '2026-06-25', horario: '11:00', valor: 600, sinal: 150, status: 'pendente', obs: '' },
  { id: 6, cliente: 'Rafael Nunes', servico: 'Aquarela', data: '2026-06-26', horario: '13:00', valor: 750, sinal: 200, status: 'confirmado', obs: '' },
  { id: 7, cliente: 'Fernanda Lima', servico: 'Mini Tattoo', data: '2026-06-27', horario: '10:00', valor: 250, sinal: 80, status: 'cancelado', obs: '' },
  { id: 8, cliente: 'Marcos Vieira', servico: 'Blackwork', data: '2026-06-28', horario: '14:30', valor: 550, sinal: 150, status: 'concluido', obs: '' },
]

export const transacoes = [
  { id: 1, tipo: 'entrada', descricao: 'Sessão Ana Beatriz - Blackwork', valor: 800, data: '2026-06-20', status: 'concluido', categoria: 'tattoo' },
  { id: 2, tipo: 'entrada', descricao: 'Sinal Diego Ramos - Realismo', valor: 300, data: '2026-06-19', status: 'concluido', categoria: 'sinal' },
  { id: 3, tipo: 'saida', descricao: 'Compra tintas Intenze', valor: 480, data: '2026-06-18', status: 'concluido', categoria: 'material' },
  { id: 4, tipo: 'entrada', descricao: 'Sessão Sabrina Alves', valor: 900, data: '2026-06-17', status: 'concluido', categoria: 'tattoo' },
  { id: 5, tipo: 'saida', descricao: 'Aluguel estúdio junho', valor: 1200, data: '2026-06-15', status: 'concluido', categoria: 'fixo' },
  { id: 6, tipo: 'entrada', descricao: 'Sessão Rafael Nunes', valor: 750, data: '2026-06-14', status: 'concluido', categoria: 'tattoo' },
  { id: 7, tipo: 'saida', descricao: 'Agulhas Bishop', valor: 180, data: '2026-06-12', status: 'concluido', categoria: 'material' },
  { id: 8, tipo: 'entrada', descricao: 'Sessão Carlos Mendes', valor: 600, data: '2026-06-10', status: 'concluido', categoria: 'tattoo' },
  { id: 9, tipo: 'saida', descricao: 'Marketing redes sociais', valor: 350, data: '2026-06-08', status: 'concluido', categoria: 'marketing' },
  { id: 10, tipo: 'entrada', descricao: 'Sinal Julia Torres', valor: 100, data: '2026-06-06', status: 'concluido', categoria: 'sinal' },
]

export const cobracas = [
  { id: 1, cliente: 'Carlos Mendes', descricao: 'Sessão Pontilhismo - Restante', valor: 450, vencimento: '2026-06-25', status: 'aberto', pixCopiaECola: '00020126360014BR.GOV.BCB.PIX0114+5511940000000052040000530398654045.005802BR5913StudioPay6008SaoPaulo62070503***6304ABCD' },
  { id: 2, cliente: 'Julia Torres', descricao: 'Fine Line - Sessão completa', valor: 250, vencimento: '2026-06-24', status: 'aberto', pixCopiaECola: '00020126360014BR.GOV.BCB.PIX0114+5511940000000052040000530398654042.505802BR5913StudioPay6008SaoPaulo62070503***6304EFGH' },
  { id: 3, cliente: 'Fernanda Lima', descricao: 'Mini Tattoo cancelada - Reembolso parcial', valor: 80, vencimento: '2026-06-20', status: 'vencido', pixCopiaECola: '' },
  { id: 4, cliente: 'Ana Beatriz Souza', descricao: 'Blackwork Manga - Sessão 6', valor: 600, vencimento: '2026-06-10', status: 'pago', pixCopiaECola: '' },
  { id: 5, cliente: 'Diego Ramos', descricao: 'Realismo Colorido - Sinal', valor: 300, vencimento: '2026-06-05', status: 'pago', pixCopiaECola: '' },
  { id: 6, cliente: 'Sabrina Alves', descricao: 'Neotradicional - Sessão completa', valor: 700, vencimento: '2026-06-30', status: 'aberto', pixCopiaECola: '00020126360014BR.GOV.BCB.PIX0114+5511940000000052040000530398654047.005802BR5913StudioPay6008SaoPaulo62070503***6304IJKL' },
]

export const produtos = [
  { id: 1, nome: 'Tinta Intenze True Black 30ml', categoria: 'Tintas', emoji: '🖤', precoNormal: 45, precoPro: 32, destaque: true },
  { id: 2, nome: 'Kit Agulhas Bishop Rotary', categoria: 'Agulhas', emoji: '⚡', precoNormal: 280, precoPro: 198, destaque: true },
  { id: 3, nome: 'Biqueira Cheyenne 14RS', categoria: 'Biqueiras', emoji: '🔩', precoNormal: 12, precoPro: 8, destaque: false },
  { id: 4, nome: 'Máquina Dragonhawk Mast Tour', categoria: 'Máquinas', emoji: '🔫', precoNormal: 890, precoPro: 649, destaque: true },
  { id: 5, nome: 'Kit Higiene Profissional 50un', categoria: 'Higiene', emoji: '🧤', precoNormal: 38, precoPro: 26, destaque: false },
  { id: 6, nome: 'Tinta World Famous Limitless 30ml', categoria: 'Tintas', emoji: '🎨', precoNormal: 55, precoPro: 39, destaque: false },
  { id: 7, nome: 'Kit Premium Iniciante', categoria: 'Kits', emoji: '📦', precoNormal: 680, precoPro: 480, destaque: true },
  { id: 8, nome: 'Creme Cicatrizante Após Tattoo', categoria: 'Higiene', emoji: '💊', precoNormal: 28, precoPro: 18, destaque: false },
]

export const cursos = [
  { id: 1, titulo: 'Gestão Financeira para Tatuadores', instrutor: 'Bruno Tattoo', aulas: 18, duracao: '4h30min', progresso: 65, preco: 197, precoPro: 0, nivel: 'Iniciante', emoji: '💰' },
  { id: 2, titulo: 'Como Cobrar Mais pelo Seu Trabalho', instrutor: 'Carla Ink', aulas: 12, duracao: '3h00min', progresso: 100, preco: 147, precoPro: 0, nivel: 'Intermediário', emoji: '💸' },
  { id: 3, titulo: 'Vender pelo Instagram do Zero', instrutor: 'Rafael Sales', aulas: 24, duracao: '6h15min', progresso: 20, preco: 247, precoPro: 0, nivel: 'Iniciante', emoji: '📱' },
  { id: 4, titulo: 'Atendimento Profissional no WhatsApp', instrutor: 'Studio Pay Team', aulas: 8, duracao: '2h00min', progresso: 0, preco: 97, precoPro: 0, nivel: 'Iniciante', emoji: '💬' },
  { id: 5, titulo: 'Tráfego Pago para Tatuadores', instrutor: 'Digital Ink', aulas: 30, duracao: '8h00min', progresso: 0, preco: 347, precoPro: 197, nivel: 'Avançado', emoji: '🎯' },
  { id: 6, titulo: 'Blackwork: Do Básico ao Avançado', instrutor: 'Dark Line Studio', aulas: 40, duracao: '10h30min', progresso: 0, preco: 497, precoPro: 297, nivel: 'Avançado', emoji: '🖤' },
]

export const campanhas = [
  { id: 1, nome: 'Promoção Inverno — Fine Line', status: 'ativa', plataforma: 'Instagram/Facebook', investimento: 350, leads: 28, agendamentos: 8, CPL: 12.5, inicio: '2026-06-10', fim: '2026-06-30' },
  { id: 2, nome: 'Captação Blackwork SP', status: 'pausada', plataforma: 'Instagram', investimento: 180, leads: 14, agendamentos: 3, CPL: 12.9, inicio: '2026-06-01', fim: '2026-06-15' },
  { id: 3, nome: 'Reels Boost — Portfólio', status: 'ativa', plataforma: 'Instagram', investimento: 120, leads: 9, agendamentos: 2, CPL: 13.3, inicio: '2026-06-18', fim: '2026-06-25' },
]

export const receitaMensal = [
  { mes: 'Jan', valor: 8200 }, { mes: 'Fev', valor: 9100 }, { mes: 'Mar', valor: 7800 },
  { mes: 'Abr', valor: 11200 }, { mes: 'Mai', valor: 12400 }, { mes: 'Jun', valor: 14760 },
]

export const agendamentosPorDia = [
  { dia: 'Seg', total: 3 }, { dia: 'Ter', total: 2 }, { dia: 'Qua', total: 4 },
  { dia: 'Qui', total: 1 }, { dia: 'Sex', total: 5 }, { dia: 'Sáb', total: 3 }, { dia: 'Dom', total: 0 },
]

export const origemClientes = [
  { name: 'Instagram', value: 52 }, { name: 'Indicação', value: 30 },
  { name: 'Google', value: 10 }, { name: 'Outros', value: 8 },
]

export const mensagensElison = [
  {
    id: 1, tipo: 'ai', texto: 'Oi! Sou o Elison, sua IA de atendimento. Já confirmei automaticamente os 2 agendamentos de amanhã. Quer revisar as mensagens enviadas?'
  },
  {
    id: 2, tipo: 'user', texto: 'Sim, quero ver as confirmações.'
  },
  {
    id: 3, tipo: 'ai', texto: '✅ Enviei para Ana Beatriz: "Oi Ana! Passando para confirmar sua sessão amanhã às 10h. Qualquer dúvida é só me chamar! 🖤"\n\n✅ Enviei para Diego: "Diego, confirma aí seu horário amanhã às 14h. Te espero no estúdio! 🔥"'
  },
  {
    id: 4, tipo: 'ai', texto: 'Também detectei 1 cliente sem contato há 90 dias (Marcos Vieira). Quer que eu envie uma mensagem de reativação?'
  },
]

export const automacoes = [
  { id: 1, nome: 'Confirmação automática de horário', desc: 'Envia confirmação 24h antes da sessão', ativa: true, icone: '✅' },
  { id: 2, nome: 'Lembrete pré-tattoo', desc: 'Envia cuidados e orientações 2h antes', ativa: true, icone: '⏰' },
  { id: 3, nome: 'Cuidados pós-tattoo', desc: 'Envia orientações de cicatrização após a sessão', ativa: true, icone: '🩹' },
  { id: 4, nome: 'Reativação de clientes', desc: 'Contato automático após 60 dias sem agendar', ativa: false, icone: '💬' },
  { id: 5, nome: 'Resumo semanal', desc: 'Resumo da semana toda segunda-feira', ativa: true, icone: '📊' },
  { id: 6, nome: 'Avaliação pós-sessão', desc: 'Pede avaliação 7 dias após a sessão', ativa: false, icone: '⭐' },
]

export const defaultUser = {
  nome: 'Tatuador Demo',
  estudio: 'Dark Ink Studio',
  plano: 'Pro',
  email: 'demo@studiopay.com',
  whatsapp: '(11) 99999-9999',
  avatar: 'TD',
}
