# Handoff — Studio Pay Frontend

## Objetivo

Este documento apresenta o estado atual do frontend do Studio Pay e orienta a continuidade do desenvolvimento por uma equipe externa (software house). Ele resume o que existe, o que é real versus simulado, e o que precisa de decisão/trabalho antes de ir para produção com usuários reais.

Para detalhes técnicos mais profundos, veja os documentos complementares linkados ao final.

## Visão do produto

O Studio Pay é um ecossistema operacional para tatuadores e estúdios de tatuagem, reunindo organização, agenda, atendimento, financeiro, compras, cursos e crescimento em uma única plataforma.

Mensagem central do produto:

> **Você cria. O Studio Pay organiza.**

## Escopo deste repositório

Este repositório (`app/`) contém uma SPA (Single Page Application) em React que reúne:

- **Páginas institucionais/comerciais públicas** — Home e páginas de cada módulo (Conta Digital, Agenda, Elisson.IA, Studio Shop, Cursos, Crescimento/Ads), página de comparação de Planos.
- **Cadastro e login** — fluxo de criação de conta e autenticação simulados (sem backend).
- **Interfaces internas** (`/app/*`) — o "produto" em si: dashboard, conta digital, financeiro, agenda, clientes, cobranças, Elison IA, shop, cursos, ads, relatórios e configurações, todos com dados mock.
- **Painel administrativo de conteúdo** (`/admin`) — CMS front-only para editar textos/imagens de algumas seções públicas, persistido em `localStorage`.

Importante: **não há backend real neste repositório.** Todos os dados exibidos são estáticos (arrays hardcoded em `src/data/mockData.js` e nos próprios arquivos de página) ou persistidos apenas no `localStorage` do navegador. Não foi identificada nenhuma chamada de rede (`fetch`/`axios`) nem variável de ambiente em uso em todo o `src/`. Isso deve ser o ponto de partida de qualquer planejamento de continuidade — veja [`INTEGRATIONS.md`](INTEGRATIONS.md).

## Estado atual dos módulos

| Módulo | Estado visual | Estado funcional | Backend/integração | Observações |
|---|---|---|---|---|
| Home (`/`) | Implementado | Apenas visual | Nenhuma | Landing institucional; alguns componentes existentes em `src/components/landing/` não são usados atualmente (ver [`COMPONENTS.md`](COMPONENTS.md)) |
| Conta Digital (`/studio-core`) | Implementado | Apenas visual | Nenhuma | Página institucional; dados financeiros exibidos são mock fixo |
| Agenda (`/studio-agenda`) | Implementado, refinado recentemente | Apenas visual | Nenhuma | Página institucional já passou por múltiplas rodadas de refinamento visual |
| Studio Learn / Cursos (`/studio-learn`) | Implementado, refinado recentemente | Apenas visual | Nenhuma | Idem |
| Studio Shop (`/studio-shop`) | Implementado | Apenas visual | Nenhuma | Página institucional; catálogo real está em `/app/shop` |
| Elisson.IA (`/elison-ia`) | Implementado | Simulado (chat local) | Nenhuma | Chat de demonstração 100% client-side, sem IA real nem integração com WhatsApp — o próprio código comenta isso |
| Crescimento / Studio Ads (`/studio-ads`) | Implementado | Apenas visual | Nenhuma | Parceria com "Digital Mix" mencionada no texto; sem integração real |
| Planos (`/planos`) | Implementado | Apenas visual | Nenhuma | Sem checkout/pagamento real |
| Cadastro (`/cadastro`) | Implementado, redesenhado recentemente | Simulado | Nenhuma | Formulário grava usuário fictício em `localStorage` e navega para onboarding — não cria conta real |
| Login (`/login`) | Implementado | Simulado | Nenhuma | Aceita qualquer e-mail/senha preenchidos; não valida credenciais reais |
| Onboarding (`/onboarding`) | Implementado | Simulado | Nenhuma | Wizard local, sem validação de campos obrigatórios, grava em `localStorage` |
| Dashboard (`/app/dashboard`) | Implementado | Apenas visual | Nenhuma | Dados de saldo/resumo são constantes fixas |
| Conta Digital interna (`/app/banco`) | Implementado | Apenas visual | Nenhuma | "Transferência" e "Cartão" sem ação real |
| Financeiro (`/app/financeiro`) | Implementado | Parcialmente implementado | Nenhuma | Modais de nova cobrança/despesa não persistem dados |
| Agenda interna (`/app/agenda`) | Implementado | Parcialmente implementado | Nenhuma | CRUD funciona em memória (`useState`), some ao recarregar a página |
| Clientes (`/app/clientes`) | Implementado | Apenas visual (somente leitura) | Nenhuma | Sem criação/edição real de cliente |
| Cobranças (`/app/cobrancas` + fluxos de criação) | Implementado | Parcialmente implementado | Nenhuma | Copiar Pix usa clipboard real, mas o código Pix é sempre o mesmo texto fixo |
| Elison IA interno (`/app/elison`) | Implementado | Simulado | Nenhuma | Respostas de chat sorteadas de lista fixa; sem IA/WhatsApp real |
| Studio Shop interno (`/app/shop`, `/app/shop/produto/:id`) | Implementado | Parcialmente implementado | Nenhuma | Carrinho funciona via `localStorage` (hook `useShopCart`); checkout explicitamente marcado como "em breve" no próprio texto da UI |
| Cursos interno (`/app/learn`) | Implementado | Apenas visual | Nenhuma | Progresso de curso é estático |
| Ads interno (`/app/ads`) | Implementado | Apenas visual | Nenhuma | Sem integração com plataformas de anúncio reais |
| Relatórios (`/app/relatorios`) | Implementado | Apenas visual (somente leitura) | Nenhuma | Gráficos com dados mock, sem filtros funcionais |
| Configurações (`/app/configuracoes`) | Implementado | Parcialmente implementado | Nenhuma | Só as abas "Estúdio" e "Dados pessoais" persistem (em `localStorage`); demais campos não salvam. Ver risco de logout em [`TECHNICAL_DEBT.md`](TECHNICAL_DEBT.md) |
| Admin Visual (`/admin`) | Implementado | Funcional (mas front-only) | Nenhuma | CMS client-side sem autenticação/autorização — qualquer pessoa com a URL pode editar conteúdo |

Veja o detalhamento de cada página em [`PAGES.md`](PAGES.md).

## Decisões já aprovadas

Observáveis diretamente no código e no histórico do projeto:

- Identidade visual escura como padrão, com tema claro alternativo (`.theme-light`) já implementado via CSS custom properties.
- Rosa (`#FF2ED1`) como cor de destaque/marca em toda a aplicação.
- Estética premium: glows sutis, pills arredondadas, cards com bordas finas e sombras suaves — ver [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md).
- Responsividade obrigatória em desktop, tablet e mobile — confirmada em praticamente todas as seções via media queries dedicadas.
- Uso de mockups de imagem reais (assets em `/public/images`) em vez de recriações em HTML/CSS, quando disponíveis — padrão reforçado explicitamente em rodadas recentes de revisão.
- Nomenclatura oficial do módulo de atendimento é **Elisson.IA** (grafado assim na navegação/copy pública), embora o código interno (rotas, arquivos, variáveis) use consistentemente **Elison** sem o segundo "s" — ver nota em [`DECISIONS.md`](DECISIONS.md).
- Páginas **Agenda** (`/studio-agenda`) e **Studio Learn** (`/studio-learn`) já passaram por múltiplas rodadas de refinamento visual e copy e representam o padrão de qualidade/acabamento mais recente do projeto — bom ponto de referência para replicar em outras páginas.
- Uso de componentes compartilhados onde aplicável: `ModulePageLayout` para páginas de módulo com estrutura similar, `Navbar`/`Footer`/`PublicSiteShell` para toda a área pública, `Reveal` como padrão único de animação ao rolar.

## Pontos de atenção

Documentados aqui sem correção nesta etapa — ver [`TECHNICAL_DEBT.md`](TECHNICAL_DEBT.md) para o detalhamento com risco/recomendação:

- CSS centralizado e extenso: a maior parte do estilo da área pública vive em um único arquivo, `src/styles/landing.css`.
- Dados estáticos: praticamente toda a aplicação roda sobre arrays mock (`src/data/mockData.js` e constantes locais nos arquivos de página).
- Componentes grandes: algumas páginas internas (ex. `Agenda.jsx`, `Elison.jsx`, `AdminPage.jsx`) concentram muita lógica e JSX em um único arquivo.
- Assets pesados: um GIF de 8,2 MB (`public/media/studiopay-agenda.gif`) e uma imagem PNG de 3,69 MB (`conta-digital-mobile.png.png`) não seguem o padrão de otimização (WebP) usado no restante do projeto.
- Nomes inconsistentes: arquivo `conta-digital-mobile.png.png` tem extensão duplicada; nomenclatura "Elison" (código) vs. "Elisson.IA" (copy pública).
- Possíveis arquivos duplicados/órfãos: `conta-digital-hero.webp` não é referenciado em nenhum lugar; vários componentes de landing (`FAQ.jsx`, `FeaturesSection.jsx`, `HowItWorks.jsx`, `TestimonialsSection.jsx`, `BenefitsSection.jsx`) existem mas não são importados por nenhuma página atual.
- Telas visuais sem backend: praticamente toda a aplicação — ver tabela de módulos acima.
- Validações apenas no frontend: cadastro, login e onboarding não validam nada no servidor (porque não há servidor).
- Dependência de integrações futuras: pagamentos (Pix/boletos/cartão), autenticação real, WhatsApp Business API, IA de atendimento, plataformas de anúncio — nenhuma dessas integrações existe hoje.

## Próximas etapas

### Prioridade alta
Itens indispensáveis para operação real do produto:
- Definir e construir a camada de backend/API (hoje inexistente).
- Implementar autenticação real (hoje é um `localStorage` sem token, sem expiração, sem verificação de servidor).
- Proteger a rota `/admin` com autenticação e autorização — hoje está totalmente aberta.
- Decidir e implementar a integração de pagamentos (Pix, boletos, cartão) para a Conta Digital e Cobranças.
- Decidir a estratégia de persistência de dados de negócio (clientes, agendamentos, cobranças, transações) — hoje tudo é mock/memória/`localStorage`.

### Prioridade média
Melhorias de arquitetura e manutenção:
- Avaliar divisão do `landing.css` em arquivos menores por seção/página.
- Extrair o padrão `FallbackImage` (repetido em 3 páginas) para um componente compartilhado em `src/components/ui/`.
- Padronizar a escala tipográfica (hoje há pesos de fonte "quebrados" como 650/750/850 misturados com 400–800).
- Consolidar a lógica de logout (hoje duplicada em `Sidebar.jsx` e `MobileMenuPanel.jsx`).
- Revisar componentes órfãos em `src/components/landing/` e decidir remover ou reativar.

### Prioridade baixa
Otimizações e refinamentos:
- Converter `studiopay-agenda.gif` (8,2 MB) para vídeo `.webm`/`.mp4` ou WebP animado.
- Reconverter `conta-digital-mobile.png.png` (3,69 MB) para WebP e corrigir o nome do arquivo.
- Remover `public/favicon.png` e `public/images/studio-pay/conta-digital-hero.webp` caso confirmado que não são necessários.
- Formalizar um sistema de breakpoints (hoje são valores ad-hoc por componente, ainda que consistentes na prática em torno de 920/900/860/768/640px).

## Documentos relacionados

- [`ARCHITECTURE.md`](ARCHITECTURE.md) — arquitetura do frontend.
- [`ROUTES.md`](ROUTES.md) — mapa completo de rotas.
- [`PAGES.md`](PAGES.md) — detalhamento por página.
- [`COMPONENTS.md`](COMPONENTS.md) — inventário de componentes.
- [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) — identidade visual.
- [`ASSETS.md`](ASSETS.md) — inventário de imagens/mídia.
- [`INTEGRATIONS.md`](INTEGRATIONS.md) — integrações reais, simuladas e futuras.
- [`ENVIRONMENT.md`](ENVIRONMENT.md) — variáveis de ambiente.
- [`DECISIONS.md`](DECISIONS.md) — decisões técnicas tomadas e pendentes.
- [`TECHNICAL_DEBT.md`](TECHNICAL_DEBT.md) — débitos técnicos e riscos.
- [`GIT_WORKFLOW.md`](GIT_WORKFLOW.md) / [`COMMIT_GUIDE.md`](COMMIT_GUIDE.md) / [`DEPLOY.md`](DEPLOY.md) — processo de trabalho.
