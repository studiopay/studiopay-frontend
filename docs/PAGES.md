# Páginas

Detalhamento por página. Ver [`ROUTES.md`](ROUTES.md) para o mapa de rotas e [`COMPONENTS.md`](COMPONENTS.md) para os componentes citados.

---

## Home

- **Rota:** `/`
- **Arquivo:** `src/pages/LandingPage.jsx`
- **Objetivo:** landing institucional principal, apresentando o ecossistema Studio Pay e direcionando para os módulos e para o cadastro.
- **Principais seções:** `Hero`, `PillsMarquee`, `WhyStudioPaySection`, `StudioEcosystemPreview`, `PainSection`, `ElisonPreviewSection`, `DemoGifSection`, `CoreDigitalPreviewSection`, `PlansSection` (modo `compact`).
- **Componentes usados:** `Navbar`, `Footer`, `PublicSiteShell`, mais os componentes de seção acima (todos de `src/components/landing/`).
- **Assets principais:** `public/media/studiopay-agenda.gif` (via `DemoGifSection`), imagens de `elisson-*.webp` (via `ElisonPreviewSection`), `conta-digital-mobile.png.png` (via `CoreDigitalPreviewSection`), imagens de `shop/*.webp` (via `PainSection`).
- **Comportamento responsivo:** cada seção tem suas próprias media queries em `landing.css`; testada em desktop/tablet/mobile ao longo de múltiplas rodadas de ajuste.
- **Estado visual:** implementado, refinado incrementalmente seção por seção.
- **Estado funcional:** apenas visual — nenhum formulário ou submissão nesta página.
- **Integrações:** nenhuma.
- **Observações:** alguns componentes de `src/components/landing/` (`FAQ`, `FeaturesSection`, `HowItWorks`, `TestimonialsSection`, `BenefitsSection`) não são usados por esta página nem por nenhuma outra — órfãos, precisam de decisão (remover ou reativar).

---

## Conta Digital

- **Rota:** `/studio-core`
- **Arquivo:** `src/pages/public/StudioCorePage.jsx`
- **Objetivo:** vender a proposta da Conta Digital Studio Pay (Pix, boletos, links de pagamento, financeiro do estúdio).
- **Principais seções:** Hero (com mockups de app e cartão), "Cobranças automáticas", "Criar cobrança", "Financeiro do estúdio" (painel estático), CTA final.
- **Componentes usados:** `Navbar`, `Footer`, `PublicSiteShell`, `Reveal`.
- **Assets principais:** `conta-digital-app.webp`, `conta-digital-cartao.webp`, `conta-digital-cobrancas.webp`, `conta-digital-criar-cobranca.webp`.
- **Comportamento responsivo:** implementado com media queries próprias em `landing.css`.
- **Estado visual:** implementado.
- **Estado funcional:** apenas visual.
- **Integrações:** nenhuma. Textos/badges/imagens de algumas seções são sobrescrevíveis via `/admin` (chave `studioPayAdmin_studioCoreSection`).
- **Observações:** o arquivo contém código de duas seções antigas ("Controle do dinheiro" e "Feito para o tatuador") que não são mais renderizadas, mantido no código para facilitar reintrodução futura — candidato a limpeza após confirmação com o time.

---

## Agenda Inteligente

- **Rota:** `/studio-agenda`
- **Arquivo:** `src/pages/public/StudioAgendaPage.jsx`
- **Objetivo:** apresentar a agenda automatizada (confirmações, lembretes, encaixes inteligentes).
- **Principais seções:** Hero, "Lembretes automáticos" (mockup de painel em HTML/CSS), "Encaixes inteligentes" (composição visual com SVG), CTA final "Agenda mais leve".
- **Componentes usados:** `ModulePageLayout`, `Reveal`.
- **Assets principais:** `agenda-hero.webp`.
- **Comportamento responsivo:** revisado especificamente para não empilhar a seção "Encaixes inteligentes" em tablet/mobile (mantém layout de 3 colunas em todas as larguras, por decisão de produto).
- **Estado visual:** implementado e refinado em múltiplas rodadas recentes — é uma das páginas com maior acabamento visual do projeto.
- **Estado funcional:** apenas visual.
- **Integrações:** nenhuma. Hero tem override opcional via `localStorage` (`studioPayAdmin_agendaHero`), mas não há tela de edição correspondente em `/admin` no momento — possível gap a validar com o time.

---

## Elisson.IA

- **Rota:** `/elison-ia`
- **Arquivo:** `src/pages/public/ElisonIAPage.jsx`
- **Objetivo:** apresentar o assistente de atendimento via WhatsApp.
- **Principais seções:** Hero com `WhatsAppMockup` (chat simulado interativo), "Como funciona" (4 passos), "O que o Elison pode responder" (3 categorias), CTA final.
- **Componentes usados:** `ModulePageLayout`, `Reveal`.
- **Assets principais:** nenhum — mockup de chat é construído em HTML/CSS/ícones.
- **Comportamento responsivo:** implementado.
- **Estado visual:** implementado.
- **Estado funcional:** **simulado** — o chat tem um `<form>` funcional que responde a palavras-chave de um dicionário fixo (`quickReplies`), com efeito de "digitando...". O próprio código comenta explicitamente: "Simulação puramente local, sem IA real, sem integração com WhatsApp e sem backend".
- **Integrações:** nenhuma.
- **Observações:** é a única página pública com um elemento verdadeiramente interativo (estado local + delay simulado) — necessita validação com a equipe responsável caso haja expectativa de que isso reflita o comportamento real do produto. Nomenclatura: rota e arquivos usam "Elison" (sem o segundo "s"); copy pública usa "Elisson.IA" — ver [`DECISIONS.md`](DECISIONS.md).

---

## Studio Shop

- **Rota:** `/studio-shop`
- **Arquivo:** `src/pages/public/StudioShopPage.jsx`
- **Objetivo:** divulgar o catálogo de produtos/insumos com condições para assinantes.
- **Principais seções:** `ShopCatalogSection` (vitrine + 4 benefícios), `ShopDetailSection` (produto em destaque + tags + 4 benefícios), `ShopFinalSection` (CTA final).
- **Componentes usados:** `Navbar`, `Footer`, `PublicSiteShell`, `Reveal`.
- **Assets principais:** `shop-hero.webp`, `shop-product.webp`.
- **Comportamento responsivo:** implementado.
- **Estado visual:** implementado.
- **Estado funcional:** apenas visual — o catálogo real de produtos vive em `/app/shop`, não aqui.
- **Integrações:** nenhuma. Override opcional via `/admin` (chave `studioPayAdmin_studioShopSection`), mas sem UI de edição implementada ainda para esta chave.

---

## Studio Learn (Cursos)

- **Rota:** `/studio-learn`
- **Arquivo:** `src/pages/public/StudioLearnPage.jsx`
- **Objetivo:** apresentar os cursos disponíveis com condições para assinantes.
- **Principais seções:** Hero (com mockup real de imagem da plataforma de cursos), "Vantagem para assinantes" (mockup de card de curso + comparação de preços).
- **Componentes usados:** `Navbar`, `Footer`, `PublicSiteShell`, `Reveal`.
- **Assets principais:** `cursos-hero.webp`, `cursos-realismo-card.webp`.
- **Comportamento responsivo:** implementado e ajustado explicitamente para corrigir a ordem dos elementos no mobile (texto antes do card).
- **Estado visual:** implementado e refinado em múltiplas rodadas recentes.
- **Estado funcional:** apenas visual.
- **Integrações:** nenhuma. Override opcional via `/admin` (chave `studioPayAdmin_studioLearnSection`), sem UI de edição implementada ainda.

---

## Crescimento (Studio Ads)

- **Rota:** `/studio-ads`
- **Arquivo:** `src/pages/public/StudioAdsPage.jsx`
- **Objetivo:** apresentar a parceria Studio Pay × Digital Mix (agência de tráfego pago) e planos de gestão de anúncios.
- **Principais seções:** Hero com painel de métricas mock, "Como funciona" (4 passos), grade de 3 planos de tráfego, explicação de investimento (taxa + mídia), seção de integrações futuras ("Em evolução"), CTA final.
- **Componentes usados:** `ModulePageLayout`, `Reveal`.
- **Assets principais:** nenhum.
- **Comportamento responsivo:** implementado.
- **Estado visual:** implementado.
- **Estado funcional:** apenas visual — todos os números de campanha/preços são mock fixo.
- **Integrações:** nenhuma real com a Digital Mix identificada no código; necessita validação com a equipe responsável sobre como a contratação de fato acontece.

---

## Planos

- **Rota:** `/planos`
- **Arquivo:** `src/pages/public/PlanosPage.jsx`
- **Objetivo:** comparar os planos Starter, Pro e Pro+ por módulo.
- **Principais seções:** grid de 3 cards de plano, seção sobre o Elisson.IA como add-on, tabela comparativa por módulo (`CompareTable`).
- **Componentes usados:** `Navbar`, `Footer`, `PublicSiteShell`, `Reveal`. **Não** reutiliza `PlansSection` (usado na Home) — é intencionalmente self-contained, conforme comentário no código.
- **Assets principais:** nenhum — página textual/tabular.
- **Comportamento responsivo:** implementado.
- **Estado visual:** implementado.
- **Estado funcional:** apenas visual — sem checkout/pagamento; CTAs levam para `/cadastro`.
- **Integrações:** nenhuma.

---

## Cadastro

- **Rota:** `/cadastro`
- **Arquivo:** `src/pages/CadastroPage.jsx`
- **Objetivo:** formulário de criação de conta (nome, estúdio, e-mail, WhatsApp, CNPJ, senha, plano).
- **Principais seções:** logo + headline (coluna esquerda), card de formulário com indicador de etapa, campos, seletor de plano (Starter/Pro), aviso de proteção de dados, link para login.
- **Componentes usados:** nenhum de `src/components` — página self-contained, reaproveita classes CSS compartilhadas (`.auth-*`, `.form-*`, `.plan-picker`) escopadas via modificador `.auth-page-cadastro` para não afetar `/login`.
- **Assets principais:** `logo-studio-pay-horizontal-white.png`.
- **Comportamento responsivo:** implementado — no mobile, ordem confirmada: logo → headline → card.
- **Estado visual:** implementado, redesenhado recentemente para layout de duas colunas com card grande.
- **Estado funcional:** **simulado** — validação client-side (nome, e-mail, senha ≥ 8 caracteres, confirmação de senha) e, em caso de sucesso, grava um usuário fictício em `localStorage` (`studioPayAuth`, `studiopay_user`) e navega para `/onboarding`. Não cria conta real, não valida CNPJ, não envia e-mail de confirmação.
- **Integrações:** nenhuma.

---

## Login

- **Rota:** `/login`
- **Arquivo:** `src/pages/LoginPage.jsx`
- **Objetivo:** autenticação de acesso ao painel interno.
- **Principais seções:** formulário (e-mail/CPF/CNPJ, senha, "lembrar de mim", "esqueci minha senha"), visual de cartão Studio Pay do lado direito.
- **Componentes usados:** nenhum de `src/components` — self-contained, reaproveita as mesmas classes `.auth-*` da página de Cadastro, mas com o modificador `.auth-page-login` (estrutura invertida: formulário à esquerda, visual à direita).
- **Assets principais:** `logo-studio-pay-horizontal-white.png`.
- **Comportamento responsivo:** implementado — no mobile mostra apenas o formulário (visual de cartão é ocultado).
- **Estado visual:** implementado.
- **Estado funcional:** **simulado** — aceita qualquer e-mail/senha não vazios, grava um usuário fictício (`nome: 'Tatuador Demo'`) em `localStorage` e navega para `/app/dashboard`. Não há verificação de credenciais real.
- **Integrações:** nenhuma.

---

## Onboarding

- **Rota:** `/onboarding`
- **Arquivo:** `src/pages/OnboardingPage.jsx`
- **Objetivo:** wizard de 5 passos pós-cadastro (dados do estúdio, horários, estilos, objetivo, conclusão).
- **Principais seções:** stepper visual + 5 telas de passo.
- **Componentes usados:** nenhum de `src/components` — self-contained.
- **Assets principais:** `logo-studio-pay-horizontal-white.png`.
- **Comportamento responsivo:** implementado.
- **Estado visual:** implementado.
- **Estado funcional:** simulado — não há validação de campos obrigatórios (é possível avançar sem preencher nada); ao final, grava `studiopay_onboarding` e `studiopay_config` em `localStorage` e navega para `/app/dashboard`.
- **Integrações:** nenhuma.

---

## Páginas internas (`/app/*`)

Todas as páginas internas seguem o mesmo padrão: dados mock (de `src/data/mockData.js` ou constantes locais), sem chamadas de rede, com persistência real apenas quando explicitamente usam `localStorage`. Resumo (detalhes completos disponíveis mediante leitura direta dos arquivos, todos em `src/pages/app/`):

| Página | Arquivo | Estado funcional | Observação principal |
|---|---|---|---|
| Dashboard | `Dashboard.jsx` | apenas visual | Tem variante mobile embutida (`MobileDashboardHome`) |
| Conta digital (Banco) | `Banco.jsx` | apenas visual | "Transferência" e "Cartão" sem ação |
| Financeiro | `Financeiro.jsx` | parcial | Modais de nova cobrança/despesa não persistem |
| Agenda | `Agenda.jsx` | parcial | CRUD completo, mas só em memória (`useState`) |
| Clientes | `Clientes.jsx` | apenas visual | Somente leitura, sem criar/editar |
| Cobranças | `Cobracas.jsx` + `CriarCobranca.jsx` + `CriarLink.jsx` + `SimularVenda.jsx` | parcial/simulado | Pix e link gerados são sempre fictícios; calculadora de taxas é funcional (client-side) |
| Elison IA | `Elison.jsx` | simulado | Fila de aprovação, agentes e automações — tudo em memória, sem IA real |
| Studio Shop | `Shop.jsx` + `ShopProduto.jsx` | parcial | Carrinho real via `localStorage` (`useShopCart`); checkout marcado como "em breve" no próprio texto da UI |
| Cursos | `Learn.jsx` | apenas visual | Progresso estático |
| Ads | `Ads.jsx` | apenas visual | Sem integração real com plataformas de anúncio |
| Relatórios | `Relatorios.jsx` | apenas visual | Gráficos com dados mock, sem filtros |
| Configurações | `Configuracoes.jsx` | parcial | Só "Estúdio" e "Dados pessoais" persistem; ver risco de logout em [`TECHNICAL_DEBT.md`](TECHNICAL_DEBT.md) |
| Admin Visual | `src/pages/admin/AdminPage.jsx` | funcional (front-only) | CMS via `localStorage`, sem autenticação — ver [`TECHNICAL_DEBT.md`](TECHNICAL_DEBT.md) |

Veja [`INTEGRATIONS.md`](INTEGRATIONS.md) para a lista completa de chaves de `localStorage` usadas por essas páginas.
