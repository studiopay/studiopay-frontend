# Arquitetura

## Entrada da aplicação

- **Arquivo de entrada:** `src/main.jsx` — monta `<App />` no DOM (`#root`, definido em `index.html`).
- **Componente principal:** `src/App.jsx` — define o roteador e a árvore de rotas.
- **Roteador:** `react-router-dom` (`BrowserRouter`), com um componente utilitário `ScrollToTop` montado uma única vez dentro do `BrowserRouter` (rola a página ao topo a cada troca de rota, ou até uma âncora `#hash` quando presente na URL).
- **Providers:** não há um Provider de estado global (Redux/Zustand/Context de app inteiro). Existem dois contextos locais, cada um escopado à sua área:
  - `ThemeContext` (`src/components/landing/ThemeContext.jsx`) — tema claro/escuro da área pública, fornecido por `PublicSiteShell`.
  - O tema da área interna (`/app/*`) é gerenciado separadamente dentro de `AppLayout.jsx` e repassado às páginas filhas via `Outlet context` do React Router (não é um Context do React) — ver "Estado" abaixo.
- **Layouts:** `src/layouts/PublicLayout.jsx` (rotas públicas) e `src/layouts/AppLayout.jsx` (rotas internas `/app/*`), ambos usados como `element` de rotas pai no `App.jsx`.

## Estrutura de pastas

```
src/
  pages/
    public/        páginas públicas de cada módulo (landing pages de produto)
    app/            páginas internas do painel do estúdio (/app/*)
    admin/          painel administrativo de conteúdo (/admin)
    *.jsx           páginas de topo (Home, Login, Cadastro, Onboarding)
  components/
    landing/        componentes da área pública (Navbar, Footer, seções da Home, layout de módulo)
    dashboard/       variantes mobile de telas internas (Dashboard, Agenda, Cobranças, Shop)
    layout/          navegação da área interna (Sidebar, Topbar, BottomNav, menu mobile)
    ui/              componentes de UI genéricos (Badge, Modal, StatCard)
    ScrollToTop.jsx  utilitário de scroll ao trocar de rota
  layouts/           PublicLayout e AppLayout (wrappers de rota)
  styles/            CSS do projeto (ver "Estilos" abaixo)
  data/              dados estáticos (mockData.js, publicModules.js)
  hooks/             hooks customizados (useTheme, useShopCart)
  utils/             utilitários (adminContent.js — camada de CMS via localStorage)
public/
  images/            imagens usadas no site (subpasta studio-pay/ concentra a maioria)
  media/              outras mídias (gif de demonstração da Agenda)
  brand/              logos oficiais
```

## Páginas

As páginas são organizadas por área:

- **`src/pages/public/`** — uma página por módulo comercial público (Studio Core, Studio Agenda, Elisson.IA, Studio Shop, Studio Learn, Studio Ads). A maioria monta sua própria composição de `Navbar`/`Footer`/`PublicSiteShell`; três delas (Elisson.IA, Studio Ads, Studio Agenda) usam o wrapper compartilhado `ModulePageLayout` para reduzir duplicação de estrutura.
- **`src/pages/` (raiz)** — páginas que não pertencem a um módulo específico: `LandingPage.jsx` (Home), `LoginPage.jsx`, `CadastroPage.jsx`, `OnboardingPage.jsx`.
- **`src/pages/app/`** — uma página por rota interna (`/app/*`): Dashboard, Banco, Financeiro, Agenda, Clientes, Cobrancas (+ CriarCobranca, CriarLink, SimularVenda), Elison, Shop (+ ShopProduto), Learn, Ads, Relatorios, Configuracoes. Várias delas têm uma "versão mobile" dedicada, importada de `src/components/dashboard/`, alternada via CSS (`hide-desktop`/`hide-mobile`) dentro do mesmo componente de página — não são rotas separadas.
- **`src/pages/admin/AdminPage.jsx`** — painel único (`/admin`) com navegação interna por abas (não por rota), cobrindo edição de conteúdo do Dashboard, Landing, Conta Digital, Studio Shop e Produtos.

Ver detalhamento completo em [`PAGES.md`](PAGES.md).

## Componentes

Ver inventário completo em [`COMPONENTS.md`](COMPONENTS.md). Resumo por categoria:

- **Globais:** `ScrollToTop`, componentes de `src/components/ui/` (Badge, Modal, StatCard).
- **Públicos/Landing:** `Navbar`, `Footer`, `PublicSiteShell`, `Reveal`, `ModulePageLayout`, seções da Home (`Hero`, `PillsMarquee`, `WhyStudioPaySection`, `StudioEcosystemPreview`, `PainSection`, `ElisonPreviewSection`, `DemoGifSection`, `CoreDigitalPreviewSection`, `PlansSection`) — algumas seções existentes (`FAQ`, `FeaturesSection`, `HowItWorks`, `TestimonialsSection`, `BenefitsSection`) não estão atualmente em uso por nenhuma página.
- **Autenticação:** não há componentes dedicados — `LoginPage.jsx` e `CadastroPage.jsx` reaproveitam as classes CSS `.auth-*` compartilhadas, mas cada um monta seu próprio JSX.
- **Dashboard (interno):** `MobileDashboardHome`, `MobileAgendaPage`, `MobileChargesPage`, `MobileShopPage` — variantes mobile de telas internas.
- **Layout interno:** `Sidebar`, `Topbar`, `BottomNav`, `MobileMenuPanel`.

## Estilos

- **`src/styles/variables.css`** — tokens de design (cores, raio de borda, sombras, fontes, transições) como CSS custom properties, com bloco de tema escuro (`:root, .theme-dark`) e tema claro (`.theme-light`) sobrescrevendo as mesmas variáveis.
- **`src/styles/globals.css`** — reset básico, tipografia base, botões (`.btn*`), formulários (`.form-*`) compartilhados entre área pública e interna.
- **`src/styles/landing.css`** — o maior arquivo do projeto; concentra o CSS de toda a área pública (Home, todas as páginas de módulo, autenticação, onboarding). Organizado por seções com comentários delimitando cada bloco.
- **`src/styles/app.css`** — CSS da área interna (`/app/*`): sidebar, topbar, cards, tabelas, gráficos, mobile nav.
- **`src/styles/admin.css`** — CSS específico do painel `/admin`.
- **`src/styles/components.css`** — estilos de componentes de UI genéricos compartilhados.

Não há CSS-in-JS, CSS Modules ou Tailwind — todo o projeto usa CSS puro com classes globais e BEM-like naming por seção (ex. `.core-preview-*`, `.agenda-hero-*`).

Ver detalhamento de tokens, breakpoints e padrões visuais em [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md).

## Estado

Não há gerenciador de estado global (Redux, Zustand, Recoil etc.). Os padrões de estado usados são:

- **`useState`** — padrão dominante; cada página/componente gerencia seu próprio estado local (formulários, toggles, abas, modais).
- **`useEffect`** — usado pontualmente (ex. `IntersectionObserver` em `Reveal.jsx`, sincronização de `localStorage` entre abas em `useShopCart.js`).
- **Contextos React:** apenas `ThemeContext` (tema da área pública).
- **`Outlet context` do React Router:** `AppLayout.jsx` expõe `{ theme, toggleTheme }` para as páginas filhas de `/app/*` via `useOutletContext()`, sem precisar de um Context próprio.
- **`localStorage`:** é o principal mecanismo de "persistência" do projeto — usado para sessão simulada de usuário, tema, conteúdo editável pelo Admin, e carrinho do Shop. Ver lista completa de chaves em [`INTEGRATIONS.md`](INTEGRATIONS.md).
- **Dados estáticos:** `src/data/mockData.js` (dados do app interno) e `src/data/publicModules.js` (conteúdo textual das páginas de módulo público) são importados diretamente — não passam por nenhuma chamada assíncrona.

## Navegação

- **React Router v7** (`react-router-dom`), com `<Routes>`/`<Route>` declarativos em `App.jsx`.
- **Rotas públicas** ficam sob um `<Route element={<PublicLayout />}>` pai (layout "passthrough", só renderiza `<Outlet />`).
- **Rotas internas** ficam sob `<Route path="/app" element={<AppLayout />}>`, que faz um guard de autenticação simplificado (checa `localStorage.studioPayAuth`/`studiopay_user`; redireciona para `/login` se ausente) antes de renderizar a página filha.
- **Redirects:** `/app` → `/app/dashboard` (via `<Navigate to="dashboard" replace />`); rota coringa `*` → `/` (qualquer URL não mapeada volta para a Home).
- **Parâmetros de URL:** apenas um caso — `/app/shop/produto/:id`, lido via `useParams()` em `ShopProduto.jsx`.
- **Query parameters:** `/cadastro?plano=pro` (ou `starter`) pré-seleciona o plano no formulário de cadastro, lido via `useSearchParams()`.
- **Rota `/admin`:** fora de ambos os layouts (`PublicLayout`/`AppLayout`) — não tem navbar/sidebar do site nem guard de autenticação.

Ver mapa completo em [`ROUTES.md`](ROUTES.md).

## Build

- **Bundler:** [Vite](https://vite.dev/) (`vite.config.js`), com o plugin oficial `@vitejs/plugin-react`.
- **Alias configurado:** `@` aponta para `src/` (usado em imports como `@/components/landing/Navbar`).
- **Comando de build:** `npm run build` (executa `vite build`).
- **Saída:** pasta `dist/` na raiz do projeto (padrão do Vite), contendo `index.html` + assets com hash de conteúdo no nome.
- **Comportamento SPA:** o roteamento é 100% client-side (React Router); em produção, o servidor precisa reescrever todas as rotas para `index.html` — isso é feito pela Vercel via `vercel.json` (ver [`DEPLOY.md`](DEPLOY.md)). Sem essa configuração, recarregar uma URL interna (ex. `/studio-agenda`) diretamente resultaria em 404 do servidor.
- **Lint:** `npm run lint` executa [Oxlint](https://oxc.rs/), configurado em `.oxlintrc.json`.
