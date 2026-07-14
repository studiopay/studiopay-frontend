# Rotas

Mapa completo das rotas definidas em `src/App.jsx`. Todas as rotas são declaradas de forma estática (sem lazy loading/code splitting por rota).

## Rota inicial e coringa

| Rota | Comportamento |
|---|---|
| `/` | Renderiza `LandingPage` (Home) |
| `*` (qualquer rota não mapeada) | Redireciona para `/` via `<Navigate to="/" replace />` |

## Rotas públicas

Todas sob `<Route element={<PublicLayout />}>`.

| Rota | Componente | Arquivo | Tipo | Estado | Observações |
|---|---|---|---|---|---|
| `/` | `LandingPage` | `src/pages/LandingPage.jsx` | pública | implementada | Home institucional |
| `/studio-core` | `StudioCorePage` | `src/pages/public/StudioCorePage.jsx` | pública | implementada | Módulo Conta Digital |
| `/studio-agenda` | `StudioAgendaPage` | `src/pages/public/StudioAgendaPage.jsx` | pública | implementada | Módulo Agenda Inteligente |
| `/elison-ia` | `ElisonIAPage` | `src/pages/public/ElisonIAPage.jsx` | pública | implementada | Módulo Elisson.IA (nota: rota usa "elison", copy pública usa "Elisson.IA") |
| `/studio-shop` | `StudioShopPage` | `src/pages/public/StudioShopPage.jsx` | pública | implementada | Módulo Studio Shop |
| `/studio-learn` | `StudioLearnPage` | `src/pages/public/StudioLearnPage.jsx` | pública | implementada | Módulo Cursos |
| `/studio-ads` | `StudioAdsPage` | `src/pages/public/StudioAdsPage.jsx` | pública | implementada | Módulo Crescimento/Ads |
| `/planos` | `PlanosPage` | `src/pages/public/PlanosPage.jsx` | pública | implementada | Comparação de planos |
| `/login` | `LoginPage` | `src/pages/LoginPage.jsx` | autenticação | simulada | Sem validação real de credenciais |
| `/cadastro` | `CadastroPage` | `src/pages/CadastroPage.jsx` | cadastro | simulada | Aceita query param `?plano=starter\|pro` |
| `/onboarding` | `OnboardingPage` | `src/pages/OnboardingPage.jsx` | demonstração | simulada | Wizard pós-cadastro, sem validação obrigatória |

## Rotas internas (`/app/*`)

Todas sob `<Route path="/app" element={<AppLayout />}>`. `AppLayout` faz um guard de autenticação simplificado (redireciona para `/login` se não houver sessão simulada em `localStorage`).

| Rota | Componente | Arquivo | Tipo | Estado | Observações |
|---|---|---|---|---|---|
| `/app` | — | — | redirecionamento | — | `<Navigate to="dashboard" replace />` |
| `/app/dashboard` | `Dashboard` | `src/pages/app/Dashboard.jsx` | interna/dashboard | apenas visual | Tem variante mobile embutida (`MobileDashboardHome`) |
| `/app/banco` | `Banco` | `src/pages/app/Banco.jsx` | interna | apenas visual | Conta digital simulada |
| `/app/financeiro` | `Financeiro` | `src/pages/app/Financeiro.jsx` | interna | parcial | Modais não persistem |
| `/app/agenda` | `Agenda` | `src/pages/app/Agenda.jsx` | interna | parcial | CRUD em memória; tem variante mobile (`MobileAgendaPage`) |
| `/app/clientes` | `Clientes` | `src/pages/app/Clientes.jsx` | interna | apenas visual | Somente leitura |
| `/app/cobrancas` | `Cobracas` | `src/pages/app/Cobracas.jsx` | interna | parcial | Tem variante mobile (`MobileChargesPage`) |
| `/app/cobrancas/criar` | `CriarCobranca` | `src/pages/app/CriarCobranca.jsx` | interna | simulada | Pix exibido é sempre o mesmo texto fixo |
| `/app/cobrancas/link` | `CriarLink` | `src/pages/app/CriarLink.jsx` | interna | simulada | Link gerado via `Math.random()`, não resolve para nada |
| `/app/cobrancas/simular` | `SimularVenda` | `src/pages/app/SimularVenda.jsx` | interna | funcional (client-side) | Calculadora de taxas com tabela fixa |
| `/app/elison` | `Elison` | `src/pages/app/Elison.jsx` | interna | simulada | Chat/respostas de lista fixa, sem IA real |
| `/app/shop` | `Shop` | `src/pages/app/Shop.jsx` | interna | parcial | Tem variante mobile (`MobileShopPage`) |
| `/app/shop/produto/:id` | `ShopProduto` | `src/pages/app/ShopProduto.jsx` | interna | parcial | Parâmetro `:id`; carrinho real via `localStorage`, checkout marcado como "em breve" |
| `/app/learn` | `Learn` | `src/pages/app/Learn.jsx` | interna | apenas visual | Progresso estático |
| `/app/ads` | `Ads` | `src/pages/app/Ads.jsx` | interna | apenas visual | Sem integração de ads real |
| `/app/relatorios` | `Relatorios` | `src/pages/app/Relatorios.jsx` | interna | apenas visual | Somente leitura |
| `/app/configuracoes` | `Configuracoes` | `src/pages/app/Configuracoes.jsx` | interna | parcial | Ver observação de logout em [`TECHNICAL_DEBT.md`](TECHNICAL_DEBT.md) |

## Rota administrativa

Fora de `PublicLayout` e `AppLayout` — sem navbar/sidebar do site, sem guard de autenticação.

| Rota | Componente | Arquivo | Tipo | Estado | Observações |
|---|---|---|---|---|---|
| `/admin` | `AdminPage` | `src/pages/admin/AdminPage.jsx` | interna/CMS | funcional (front-only) | **Sem autenticação nem autorização** — qualquer pessoa com a URL acessa e edita |

## Rotas protegidas

Apenas `/app/*` tem um guard, implementado em `src/layouts/AppLayout.jsx`: verifica `localStorage.getItem('studioPayAuth') === 'true'` ou a existência de `studiopay_user`; caso contrário, redireciona para `/login`. **Não é uma proteção real** (não há token, expiração, nem verificação de servidor) — qualquer pessoa pode definir essas chaves manualmente no `localStorage` do navegador e obter acesso. `/admin` não tem proteção alguma.

## Links externos

Não foram identificados links para domínios externos na navegação principal (`Navbar`, `Footer`, menus). O rodapé (`Footer.jsx`) contém texto regulatório sobre a parceria com a PINBANK, mas isso é texto, não um link de navegação — deve ser revisado quanto a necessidade de link real para termos/políticas.

## Navegação principal

Definida em `src/components/landing/publicNavLinks.js`:
- `mainNavLinks` — Conta Digital, Studio Shop, Elisson.IA, Agenda (exibidos diretamente na navbar).
- `growthNavLinks` — itens do dropdown "Crescimento" (inclui Studio Ads/Studio Learn, conforme configurado no arquivo).

Mais o item fixo "Início" (`/`) e "Planos" (`/planos`), com CTAs "Entrar" (`/login`) e "Começar agora" (`/cadastro`).
