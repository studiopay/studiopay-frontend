# Decisões Técnicas

## Decisões já tomadas (observáveis no projeto)

- **React** como biblioteca de UI (v19, via `package.json`).
- **Vite** como bundler/dev server, com o plugin oficial `@vitejs/plugin-react`.
- **JavaScript** (não TypeScript) — nenhum arquivo `.ts`/`.tsx` no projeto; há apenas `@types/react`/`@types/react-dom` como dependências de desenvolvimento, sem uso de tipagem estática real.
- **CSS puro** (sem CSS-in-JS, sem CSS Modules, sem Tailwind) — classes globais organizadas por convenção de nome por seção/página.
- **React Router** (v7, `react-router-dom`) para roteamento client-side, com rotas declarativas centralizadas em `src/App.jsx`.
- **Assets estáticos em `public/`** — imagens, GIF e logos servidos diretamente, sem CDN de imagem ou pipeline de otimização automatizado no build.
- **Deploy na Vercel** — confirmado por `vercel.json` (rewrite de rotas para SPA).
- **SPA (Single Page Application)** — toda a navegação é client-side; não há SSR (Server-Side Rendering) nem SSG (Static Site Generation).
- **Media queries por componente** — responsividade implementada com breakpoints ad-hoc por seção, sem um sistema formal de grid/breakpoints (ver [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)).
- **Componentes públicos separados por módulo** — cada módulo comercial (`/studio-core`, `/studio-agenda` etc.) tem sua própria página em `src/pages/public/`, com composição própria, em vez de um único template genérico para todos (exceto os 3 módulos que usam `ModulePageLayout`).
- **`localStorage` como camada de persistência provisória** — usado para sessão simulada, tema, conteúdo do Admin e carrinho do Shop, na ausência de um backend (ver [`INTEGRATIONS.md`](INTEGRATIONS.md)).
- **Lint com Oxlint** (`npm run lint`), configurado em `.oxlintrc.json`.

## Decisões pendentes

Estas decisões são de responsabilidade da equipe que assumir a continuidade do projeto — este documento não decide por ela, apenas registra que precisam ser tomadas:

- **Arquitetura de backend** — linguagem/framework, monolito vs. serviços, hospedagem.
- **Autenticação** — provedor (Auth0, Firebase Auth, Cognito, solução própria), estratégia de sessão (JWT, cookies httpOnly, etc.), fluxo de recuperação de senha real.
- **Estado global** — se e quando introduzir um gerenciador de estado (Context API mais estruturado, Zustand, Redux Toolkit, React Query/TanStack Query para cache de dados de servidor) à medida que chamadas de API real forem introduzidas.
- **Contratos de API** — formato de payloads, versionamento, tratamento de erros padronizado entre frontend e backend.
- **Testes** — não há nenhum teste automatizado no projeto atualmente (sem Jest, Vitest, Testing Library, Playwright, Cypress configurados); decidir estratégia de cobertura (unitário, integração, E2E) antes de crescer a base de código.
- **Analytics** — nenhuma ferramenta de analytics/tracking foi identificada; decidir se e como instrumentar (Google Analytics, Plausible, Amplitude, etc.), respeitando LGPD.
- **Monitoramento/observabilidade** — nenhuma ferramenta de error tracking (Sentry, etc.) identificada; decidir estratégia antes de operar com usuários reais.
- **Ambientes** — hoje só existe implicitamente "produção" (deploy via Vercel a partir da `main`); decidir se serão necessários ambientes de staging/homologação separados.
- **Tratamento de permissões/papéis (RBAC)** — não existe hoje nenhum conceito de papel/permissão (nem mesmo entre usuário comum e admin — a rota `/admin` é acessível por qualquer pessoa); decidir modelo de permissões antes de expor `/admin` publicamente.
- **Cache** — sem estratégia de cache de dados definida (relevante assim que houver API real).
- **Estratégia de tratamento de erros** — hoje, praticamente nenhuma tela trata erro de rede (porque não há rede); definir padrão de UI de erro/retry para quando integrações reais existirem.
- **Nomenclatura "Elison" vs. "Elisson.IA"** — o código (rotas, nomes de arquivo, variáveis, chaves de `localStorage`) usa consistentemente "Elison" (uma única letra "s"), enquanto a copy pública usa "Elisson.IA" (duas letras "s"). Não está claro se isso é intencional (nome de marca vs. nome técnico) ou uma inconsistência a corrigir — precisa de confirmação do time de produto antes de qualquer renomeação em massa (que teria impacto em rotas, portanto em SEO/links já compartilhados).
