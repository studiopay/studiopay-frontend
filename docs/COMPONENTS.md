# Componentes

Inventário dos componentes de `src/components/`, `src/layouts/`, `src/hooks/` e `src/utils/adminContent.js` (tratado aqui por ser o padrão de "componente de dados" mais relevante do projeto). Ver [`ARCHITECTURE.md`](ARCHITECTURE.md) para a visão geral e [`PAGES.md`](PAGES.md) para onde cada um é usado em contexto.

## Componentes a destacar (leitura prioritária)

Estes são os componentes que uma equipe externa precisa entender primeiro, por serem compartilhados por múltiplas páginas ou por terem comportamento não óbvio:

### `src/layouts/AppLayout.jsx`
Wrapper de toda a área logada `/app/*`. Sem props (é `element` de rota); expõe `{ theme, toggleTheme }` via `Outlet context` para as páginas filhas. Contém o guard de autenticação (`localStorage.studioPayAuth`/`studiopay_user`, sem token/expiração real) e a lista `MOBILE_OWN_HEADER_ROUTES` (rotas que escondem a Topbar no mobile por já terem cabeçalho próprio).
**Cuidado ao alterar:** ponto único de entrada de todas as 15 páginas internas — mudar o guard de rota ou o `Outlet context` afeta o app inteiro.

### `src/components/landing/PublicSiteShell.jsx`
Wrapper de tema para toda a área pública. Props: `children`. Fornece `ThemeContext` (`isDark`/`toggleTheme`) via `useTheme()`.
**Cuidado ao alterar:** usado em 5+ páginas públicas e dentro de `ModulePageLayout`; remover o Provider quebra o toggle de tema em toda a área pública.

### `src/components/landing/Navbar.jsx`
Navbar pública fixa. Sem props (lê `useThemeCtx`, `useLocation`, e as constantes de `publicNavLinks.js`).
**Cuidado ao alterar:** presente em toda página pública, direta ou via `ModulePageLayout`; depende de estar dentro do `ThemeContext.Provider` fornecido por `PublicSiteShell`.

### `src/components/landing/Footer.jsx`
Rodapé público. Props: `showCta` (default `true`).
**Cuidado ao alterar:** usado em 5+ páginas diretamente e mais 3 via `ModulePageLayout`; contém o texto regulatório da parceria com a PINBANK — alterações nesse bloco têm implicação de compliance, não é só copy.

### `src/components/landing/ModulePageLayout.jsx`
Layout genérico para páginas de módulo público. Props: `page` (objeto de `src/data/publicModules.js`) + slots opcionais que sobrescrevem as seções default: `heroContent`, `sectionTwoContent`, `sectionThreeContent`, `solutionContent`, `practicalContent`, `benefitsContent`, `finalCtaContent`. Cada slot, quando fornecido (mesmo como `<></>` vazio), substitui totalmente o fallback correspondente — é assim que `ElisonIAPage`/`StudioAdsPage` "desligam" seções genéricas.
**Cuidado ao alterar:** usado por 3 páginas simultaneamente (Elisson.IA, Studio Ads, Studio Agenda); o conteúdo default vem de `page.problem`/`page.solution`/`page.benefits` etc. — alterar o shape esperado sem atualizar `src/data/publicModules.js` quebra silenciosamente (seção some sem erro, pois usa `||` para fallback).

### `src/components/landing/Reveal.jsx`
Wrapper de animação "reveal ao rolar" via `IntersectionObserver`. Props: `children`, `delay`, `as` (tag customizável), `className`.
**Cuidado ao alterar:** é o padrão único de animação-ao-rolar de todo o projeto, usado dezenas de vezes; mudar o `threshold`/`rootMargin` do observer ou a classe CSS `reveal-in` afeta a UX de scroll de toda a área pública de uma vez.

### `src/utils/adminContent.js`
Não é um componente React, mas é o padrão de "conteúdo editável" mais não-óbvio do projeto. Exporta `ADMIN_KEYS` (mapa de chaves de `localStorage` por seção editável), `getAdminContent(key, fallback)`, `setAdminContent(key, value)`, `clearAdminContent(key)`, `resetAllAdminContent()`, e `LANDING_SHOP_COPY_VERSION` (mecanismo de invalidação de copy salva).
**Cuidado ao alterar:** (a) é por-navegador — o que o Admin edita só aparece para quem estiver no mesmo browser/perfil, não é global; (b) `LANDING_SHOP_COPY_VERSION` precisa ser incrementado manualmente toda vez que a copy padrão da seção Shop mudar no código, senão uma copy antiga salva por um Admin anterior "trava" e não é substituída — causa mais provável de "editei o texto mas não aparece".

### `src/layouts/PublicLayout.jsx`
Layout raiz das rotas públicas (`<Outlet />` puro).
**Cuidado ao alterar:** parece trivial, mas é o ponto de montagem de 11 rotas; qualquer lógica adicionada aqui (analytics, auth check) passa a rodar em toda página pública.

### `src/hooks/useTheme.js`
Hook de tema claro/escuro. Estado inicial de `localStorage.studioPayTheme` (default `'dark'`), expõe `{ theme, isDark, toggleTheme }`.
**Cuidado ao alterar:** usado de forma **duplicada e independente** em `PublicSiteShell` (área pública) e `AppLayout` (área interna) — compartilham a mesma chave de `localStorage`, mas têm estado React separado; mudar o tema na área pública não atualiza a área interna em tempo real (só na próxima montagem/reload).

### `src/components/layout/Sidebar.jsx` / `BottomNav.jsx` / `MobileMenuPanel.jsx`
Trio de navegação da área interna, montados em `AppLayout.jsx`.
**Cuidado ao alterar:** a lógica de logout está **duplicada** (mesmas 3 chaves de `localStorage` removidas) em `Sidebar.jsx` e `MobileMenuPanel.jsx` — mudanças na lógica de logout precisam ser replicadas nos dois lugares, pois não há uma função compartilhada.

---

## Componentes globais

- **`src/components/ScrollToTop.jsx`** — sem UI (`return null`); a cada troca de rota rola a página ao topo, ou até um elemento `#hash` se presente na URL. Montado uma vez em `App.jsx`.
- **`src/components/ui/Badge.jsx`** — etiqueta colorida (`variant` controla a cor via classe `badge-${variant}`). Usado em 7 páginas internas (Ads, Banco, Clientes, Cobracas, Dashboard, Financeiro, Learn).
- **`src/components/ui/Modal.jsx`** — modal genérico (overlay + card + header + slot `footer`), fecha com Esc ou clique fora. Props: `title`, `open`, `onClose`, `children`, `footer`. Usado em Agenda, Cobracas, Financeiro.
- **`src/components/ui/StatCard.jsx`** — card de métrica (label, valor, ícone, delta percentual). **Não referenciado em nenhuma página atualmente** — órfão.

## Componentes da Home / públicos (landing)

Em `src/components/landing/`, além dos já destacados acima:

- **`Hero.jsx`** — hero principal da Home (headline + CTA de cadastro).
- **`PillsMarquee.jsx`** — faixa decorativa animada com "pills" dos módulos, puramente visual (`aria-hidden`).
- **`WhyStudioPaySection.jsx`** — seção "por que Studio Pay" (3 cards de posicionamento).
- **`StudioEcosystemPreview.jsx`** — preview dos 8 módulos em cards.
- **`PainSection.jsx`** — seção de "dores" com vitrine de produtos Shop; lê conteúdo do Admin via `getAdminContent`.
- **`ElisonPreviewSection.jsx`** — preview do Elisson.IA com abas e screenshots reais.
- **`DemoGifSection.jsx`** — seção com GIF demonstrativo da Agenda, com fallback se o GIF falhar ao carregar.
- **`CoreDigitalPreviewSection.jsx`** — teaser da Conta Digital com mockup de celular real.
- **`PlansSection.jsx`** — seção de planos/preços, aceita prop `compact`; usada na Home, em `/planos` e em `/studio-ads`.
- **`publicNavLinks.js`** — dados estáticos dos links de navegação (não é componente, é módulo de dados).

**Órfãos (existem, mas não são importados por nenhuma página atual):** `FAQ.jsx`, `FeaturesSection.jsx`, `HowItWorks.jsx`, `TestimonialsSection.jsx`, `BenefitsSection.jsx`. Requerem decisão do time: remover ou reativar.

## Componentes de autenticação

Não há componentes dedicados de autenticação em `src/components/`. `LoginPage.jsx` e `CadastroPage.jsx` são self-contained e reaproveitam classes CSS compartilhadas (`.auth-*`, `.form-*`), com o padrão de "modificador de página" (`.auth-page-login` / `.auth-page-cadastro`) para customizar a base sem duplicar CSS nem afetar a outra página.

## Componentes internos (dashboard)

Em `src/components/dashboard/` — variantes mobile de telas internas, alternadas via CSS (`hide-desktop`/`hide-mobile`) dentro da mesma página, não são rotas próprias:

- **`MobileDashboardHome.jsx`** — Home mobile do app (<768px, estilo app bancário). Usado em `Dashboard.jsx`.
- **`MobileAgendaPage.jsx`** — Agenda mobile, reaproveita dados/handlers da versão desktop. Usado em `Agenda.jsx`.
- **`MobileChargesPage.jsx`** — Cobranças mobile, recebe dados/handlers via props de `Cobracas.jsx`.
- **`MobileShopPage.jsx`** — Shop mobile em formato marketplace, usa `useShopCart`. Usado em `Shop.jsx`.

Em `src/components/layout/` — navegação da área interna, todos montados só em `AppLayout.jsx`:

- **`Sidebar.jsx`** — menu lateral desktop, inclui logout.
- **`Topbar.jsx`** — barra superior (título por rota, tema, notificações mock, avatar).
- **`BottomNav.jsx`** — navegação inferior mobile.
- **`MobileMenuPanel.jsx`** — menu mobile em tela cheia, inclui logout.

## Componentes específicos por módulo

Alguns componentes visuais (mockups, painéis) são definidos localmente dentro do próprio arquivo de página em vez de extraídos para `src/components/` — por exemplo, `WhatsAppMockup` (dentro de `ElisonIAPage.jsx`), `CampaignPanel` (dentro de `StudioAdsPage.jsx`), `RemindersPanel`/`AgendaMoneySection` (dentro de `StudioAgendaPage.jsx`), `CourseCardMockup` (dentro de `StudioLearnPage.jsx`). Isso é intencional no padrão atual do projeto (cada página de módulo é bastante self-contained), mas significa que não há reuso entre páginas para esses mockups.

**Nota:** o padrão `FallbackImage` (componente local de `<img>` com fallback para placeholder em caso de erro de carregamento) é repetido de forma independente em `StudioCorePage.jsx`, `StudioLearnPage.jsx` e `StudioShopPage.jsx` — não é compartilhado via `src/components/`. Candidato a extração futura (ver [`TECHNICAL_DEBT.md`](TECHNICAL_DEBT.md)).

## Hooks

- **`src/hooks/useTheme.js`** — ver destaque acima.
- **`src/hooks/useShopCart.js`** — carrinho de compras do Studio Shop, 100% frontend: persiste em `localStorage` (`studiopay_shop_cart`), sincroniza entre abas via evento `storage`. Expõe `items`, `addItem`, `increment`, `decrement`, `removeItem`, `clear`, `totalQuantity`, `subtotal`, `savings`. Usado em `MobileShopPage.jsx` e `ShopProduto.jsx`.

## Dados estáticos

- **`src/data/mockData.js`** — todos os dados mock do app interno (métricas, clientes, agendamentos, transações, cobranças, produtos, cursos, campanhas, gráficos etc.).
- **`src/data/publicModules.js`** — conteúdo textual (`modulePages`) de cada módulo público, consumido por `ModulePageLayout`.
