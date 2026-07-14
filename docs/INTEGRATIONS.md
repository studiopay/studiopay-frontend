# Integrações

## Integrações reais

**Nenhuma foi identificada.** Uma busca por `fetch(`, `axios`, `XMLHttpRequest`, `import.meta.env` e `process.env` em todo o diretório `src/` não retornou nenhuma ocorrência. O projeto inteiro (rotas públicas, `/app/*` e `/admin`) é 100% frontend estático: sem chamadas de rede, sem variáveis de ambiente, sem SDK de terceiros (pagamento, analytics, autenticação, etc.).

O único "serviço externo" envolvido é a própria **Vercel**, usada apenas para hospedagem/deploy estático (ver [`DEPLOY.md`](DEPLOY.md)) — não é uma integração de dados.

## Interfaces simuladas

Áreas que aparentam ter integração real mas usam dados estáticos, `localStorage` ou lógica puramente client-side:

| Área | O que parece | O que realmente é |
|---|---|---|
| Cadastro (`/cadastro`) | Criação de conta | Grava usuário fictício em `localStorage`, sem chamada ao servidor |
| Login (`/login`) | Autenticação | Aceita qualquer e-mail/senha preenchidos, sem verificação real |
| Conta Digital (`/app/banco`) | Conta bancária real (Pix, chave, saldo) | Todos os valores são mock hardcoded no arquivo |
| Cobranças (`/app/cobrancas/*`) | Geração de cobrança Pix / link de pagamento | Pix exibido é sempre o mesmo texto fixo (`MOCK_PIX`); link é gerado com `Math.random()` e não resolve para nada real |
| Agenda (`/app/agenda`) | Agendamentos reais do estúdio | CRUD funciona, mas só em memória (`useState`) — não persiste entre recarregamentos |
| Elison IA (`/app/elison`, `/elison-ia`) | Assistente de IA via WhatsApp | Respostas sorteadas/casadas por palavra-chave de uma lista fixa; sem modelo de IA nem integração com WhatsApp Business API |
| Studio Shop (`/app/shop`, `/app/shop/produto/:id`) | E-commerce com carrinho e checkout | Carrinho é real (via `localStorage`, hook `useShopCart`), mas o checkout está explicitamente marcado como "em breve" no próprio texto da interface |
| Studio Ads (`/studio-ads`, `/app/ads`) | Gestão de campanhas de anúncio | Métricas e campanhas são mock; sem integração com Meta Ads/Google Ads |
| Relatórios (`/app/relatorios`) | Analytics do estúdio | Gráficos renderizam dados mock fixos (`recharts`), sem cálculo real |
| Admin Visual (`/admin`) | CMS de conteúdo | Funciona de fato, mas grava tudo em `localStorage` do navegador — não sincroniza entre usuários/dispositivos, sem backend |

## Persistência local (`localStorage`)

Como não há backend, `localStorage` funciona como a única forma de "persistência" e de "sessão" do projeto. Chaves identificadas em todo o `src/`:

| Chave | Finalidade | Onde é escrita | Onde é lida |
|---|---|---|---|
| `studiopay_user` | Dados do usuário/estúdio logado (nome, e-mail, plano, avatar) | `LoginPage.jsx`, `CadastroPage.jsx`, `Configuracoes.jsx` | `AppLayout.jsx` (guard de auth), `Topbar.jsx`, `Dashboard.jsx`, `Banco.jsx`, `Learn.jsx`, `Configuracoes.jsx`, `OnboardingPage.jsx`, `MobileDashboardHome.jsx` |
| `studioPayAuth` | Flag simples de "está logado" (`'true'`) | `LoginPage.jsx`, `CadastroPage.jsx` | `AppLayout.jsx` (guard de auth) |
| `studiopay_remember` | Flag de "lembrar-me" no login | `LoginPage.jsx` | removida no logout |
| `studiopay_onboarding` | Flag de onboarding concluído | `OnboardingPage.jsx` | sem leitura encontrada em `src/` |
| `studiopay_config` | Dados coletados no wizard de onboarding | `OnboardingPage.jsx` | sem leitura encontrada em `src/` |
| `studioPayTheme` | Preferência de tema (claro/escuro) | `useTheme.js` | `useTheme.js` (compartilhada, mas com estado React independente entre área pública e interna) |
| `studiopay_shop_cart` | Carrinho de compras do Studio Shop | `useShopCart.js` | `useShopCart.js` (sincronizado entre abas via evento `storage`) |
| `studiopay_user_avatar` | Foto de avatar (salva como data URL) | `MobileDashboardHome.jsx` | `MobileDashboardHome.jsx` |
| `studioPayAdmin_landing` | Conteúdo editável da Home | `AdminPage.jsx` | consumida pela Home pública |
| `studioPayAdmin_landingShopSection` | Conteúdo editável da seção Shop da Home | `AdminPage.jsx` | `PainSection.jsx` |
| `studioPayAdmin_dashboardBanners` | Banners do carrossel do Dashboard interno | `AdminPage.jsx` | `Dashboard.jsx` |
| `studioPayAdmin_shopHero` | Hero da página `/app/shop` | `AdminPage.jsx` | `Shop.jsx` |
| `studioPayAdmin_shopCategories` | Categorias do Shop | `AdminPage.jsx` | não confirmado consumo direto em `Shop.jsx` (categorias fixas `SHOP_CATS` no próprio arquivo) — possível divergência a validar com o time |
| `studioPayAdmin_shopProducts` | Produtos do Shop (override do Admin) | `AdminPage.jsx` | `Shop.jsx`, `ShopProduto.jsx` |
| `studioPayAdmin_studioCoreSection` | Conteúdo editável de `/studio-core` | `AdminPage.jsx` | `StudioCorePage.jsx` |
| `studioPayAdmin_studioShopSection` | Reservada em `ADMIN_KEYS`, sem uso de leitura/escrita localizado nas abas atuais do Admin | — | `StudioShopPage.jsx` (lê, mas sem tela de edição correspondente ainda) |
| `studioPayAdmin_studioLearnSection` | Idem — reservada, sem tela de edição no Admin ainda | — | `StudioLearnPage.jsx` |
| `studioPayAdmin_settings` | Configurações gerais do Admin Visual | `AdminPage.jsx` | `AdminPage.jsx` |
| `studioPayAdmin_agendaHero` | Hero da página `/studio-agenda` | não encontrada tela de edição em `AdminPage.jsx` (fora de `ADMIN_KEYS`, portanto não é limpa pelo botão "Restaurar demo") | `StudioAgendaPage.jsx` |

**Nota importante:** `studioPayAdmin_agendaHero` está fora do sistema `ADMIN_KEYS` — isso significa que o botão "Limpar localStorage do Admin" em `/admin` não a remove, e não há UI para editá-la. É um gap entre o CMS e o consumo real, a validar com o time do produto.

## Dependências futuras (linguagem cautelosa — nada disso existe hoje)

Áreas que provavelmente vão precisar de backend/integração real para o produto operar de verdade. Nenhuma decisão de fornecedor foi tomada; isso é responsabilidade da equipe que assumir o projeto:

- **Cadastro/Login/Autenticação** — precisa de um backend de autenticação real (usuário, senha com hash, sessão/token, verificação de e-mail).
- **Conta Digital** — precisa de uma instituição/parceiro de pagamentos real para emissão de Pix, boletos e conta digital de fato (o rodapé do site já menciona uma parceria com "PINBANK" em texto regulatório — precisa validação se essa é de fato a integração planejada).
- **Cobranças/Pix** — precisa de um Provedor de Serviços de Pagamento (PSP) para gerar cobranças Pix/boleto reais.
- **Agenda** — precisa de backend para persistir agendamentos entre sessões/dispositivos, e possivelmente de integração de notificações (SMS/WhatsApp/e-mail) para lembretes.
- **Clientes** — precisa de backend para CRUD real de clientes do estúdio.
- **Cursos** — precisa de uma plataforma de LMS (hospedagem de vídeo, progresso, certificados) ou integração com uma existente.
- **Elisson.IA** — precisa de integração com a API oficial do WhatsApp Business e de um modelo de IA/LLM real para o atendimento automatizado funcionar de fato.
- **Studio Shop** — precisa de backend de e-commerce (catálogo, estoque, checkout, gateway de pagamento) — o carrinho já existe no frontend (`useShopCart`), então a base de UX está pronta para conectar.
- **Planos** — precisa de integração de cobrança recorrente/assinatura (o modelo de negócio já está definido nos textos de Planos e Cadastro).

Cada uma dessas integrações precisa de decisão de arquitetura própria (contratos de API, autenticação, tratamento de erro) — ver [`DECISIONS.md`](DECISIONS.md) para o registro de decisões pendentes.
