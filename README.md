# Studio Pay

**Você cria. O Studio Pay organiza.**

O Studio Pay é um ecossistema operacional criado para tatuadores, reunindo organização, agenda, atendimento, financeiro, compras, cursos e crescimento em uma única plataforma.

## Sobre o projeto

Este repositório contém o frontend público e a aplicação interna do Studio Pay: a landing page institucional, as páginas de cada módulo, o fluxo de cadastro/login e o painel do estúdio (`/app`), construídos como uma SPA em React.

**Entregando este projeto a um novo time?** Comece por [`docs/HANDOFF.md`](docs/HANDOFF.md) — reúne o estado atual de cada módulo, decisões já tomadas e próximos passos.

## Principais módulos

- **Conta Digital** — organização financeira do estúdio.
- **Agenda Inteligente** — horários, confirmações e lembretes automáticos.
- **Elisson.IA** — atendimento e mensagens automatizadas.
- **Studio Shop** — compras com condições para assinantes.
- **Cursos** — formação para tatuadores.
- **Crescimento** — ferramentas de divulgação e captação.
- **Gestão do estúdio** — painel interno (`/app`) com financeiro, clientes, cobranças e relatórios.

## Tecnologias

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- JavaScript
- CSS
- [React Router](https://reactrouter.com/)
- [Lucide React](https://lucide.dev/) (ícones)
- [Recharts](https://recharts.org/) (gráficos)
- [Oxlint](https://oxc.rs/) (lint)
- [Vercel](https://vercel.com/) (deploy)

## Estrutura do projeto

```
src/
  pages/        páginas da aplicação
    public/      páginas públicas de cada módulo (landing pages)
    app/         páginas internas do painel do estúdio (/app)
    admin/       painel administrativo de conteúdo
  components/    componentes reutilizáveis (landing, dashboard, layout, ui)
  layouts/       layouts de rota (público e da aplicação)
  styles/        CSS do projeto (landing, app, admin, globals, variáveis)
  data/          dados estáticos usados pelas páginas
  hooks/         hooks React reutilizáveis
  utils/         funções utilitárias
public/
  images/        imagens usadas no site
  media/         outros arquivos de mídia (gifs, etc.)
  brand/         logos oficiais
```

## Como executar localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

## Visualização do build

```bash
npm run preview
```

## Variáveis de ambiente

Atualmente o projeto não depende de nenhuma variável de ambiente para rodar (não há chamadas a `import.meta.env` ou `process.env` no código-fonte).

Caso variáveis sejam necessárias no futuro, siga estas regras:

- nunca commitar o arquivo `.env`;
- versionar apenas um `.env.example` com os nomes das variáveis, sem valores reais;
- nunca colocar tokens ou segredos diretamente no código.

## Fluxo de trabalho

1. criar uma branch a partir da `main`;
2. implementar a alteração;
3. testar (desktop, tablet e mobile quando houver mudança visual);
4. executar `npm run build`;
5. criar um commit padronizado;
6. abrir um Pull Request;
7. revisar;
8. fazer merge.

Veja mais detalhes em [`CONTRIBUTING.md`](CONTRIBUTING.md) e [`docs/GIT_WORKFLOW.md`](docs/GIT_WORKFLOW.md).

## Padrão de commits

| Prefixo | Uso |
|---|---|
| `feat:` | nova funcionalidade |
| `fix:` | correção |
| `refactor:` | reorganização sem mudança de comportamento |
| `style:` | ajuste visual |
| `docs:` | documentação |
| `chore:` | manutenção |
| `perf:` | melhoria de desempenho |

Detalhes em [`docs/COMMIT_GUIDE.md`](docs/COMMIT_GUIDE.md).

## Deploy

O deploy é feito pela [Vercel](https://vercel.com/), a partir do comando `npm run build` (pasta de saída `dist`), com as rotas reescritas para `index.html` via `vercel.json` (necessário para o roteamento client-side do React Router).

Detalhes em [`docs/DEPLOY.md`](docs/DEPLOY.md).

## Segurança

- arquivos `.env` não devem ser enviados ao repositório;
- tokens e credenciais não devem ser inseridos no código;
- dados sensíveis não devem aparecer em Issues ou Pull Requests.

Veja [`.github/SECURITY.md`](.github/SECURITY.md) para o processo de reporte de vulnerabilidades.

## Documentação completa

| Documento | Conteúdo |
|---|---|
| [`docs/HANDOFF.md`](docs/HANDOFF.md) | Documento principal de handoff — visão do produto, estado de cada módulo, decisões aprovadas, pontos de atenção e próximas etapas |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Arquitetura do frontend (entrada, estrutura, estado, navegação, build) |
| [`docs/ROUTES.md`](docs/ROUTES.md) | Mapa completo de todas as rotas |
| [`docs/PAGES.md`](docs/PAGES.md) | Detalhamento de cada página (objetivo, seções, integrações, estado) |
| [`docs/COMPONENTS.md`](docs/COMPONENTS.md) | Inventário dos componentes principais e cuidados ao alterá-los |
| [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) | Identidade visual: cores, tipografia, componentes visuais, breakpoints |
| [`docs/ASSETS.md`](docs/ASSETS.md) | Inventário de imagens e mídia usadas no site |
| [`docs/INTEGRATIONS.md`](docs/INTEGRATIONS.md) | Integrações reais, interfaces simuladas e dependências futuras |
| [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md) | Variáveis de ambiente (nenhuma em uso atualmente) |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Decisões técnicas já tomadas e decisões pendentes |
| [`docs/TECHNICAL_DEBT.md`](docs/TECHNICAL_DEBT.md) | Débitos técnicos e riscos, por nível de impacto |
| [`docs/GIT_WORKFLOW.md`](docs/GIT_WORKFLOW.md) | Branches e processo de Git |
| [`docs/COMMIT_GUIDE.md`](docs/COMMIT_GUIDE.md) | Padrão de mensagens de commit |
| [`docs/DEPLOY.md`](docs/DEPLOY.md) | Processo de deploy |
