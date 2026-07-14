# Variáveis de Ambiente

Nenhuma variável de ambiente foi identificada no frontend atual.

Uma busca por `import.meta.env` e `process.env` em todo o diretório `src/` não retornou nenhuma ocorrência. Não há arquivo `.env`/`.env.example` no repositório, e `vite.config.js` não define nenhuma variável customizada.

| Variável | Obrigatória | Uso | Arquivo |
|---|---|---|---|
| — | — | nenhuma variável em uso | — |

## Ao introduzir variáveis de ambiente no futuro

Quando o projeto passar a depender de uma API real (backend, gateway de pagamento, etc.), siga estas regras:

- versionar apenas um `.env.example` com os **nomes** das variáveis, nunca com valores reais;
- nunca commitar o arquivo `.env` (já está no `.gitignore`);
- variáveis expostas ao client via Vite precisam do prefixo `VITE_` (ex.: `VITE_API_BASE_URL`) para serem acessíveis via `import.meta.env`;
- nunca colocar segredos (chaves de API privadas, tokens de serviço) em variáveis `VITE_*`, pois elas são embutidas no bundle público no build — segredos de servidor devem viver exclusivamente no backend, nunca no frontend.
- configurar as mesmas variáveis também no painel da Vercel (Project Settings → Environment Variables), separando por ambiente (Production/Preview/Development) quando aplicável.

Atualizar este documento assim que a primeira variável real for introduzida.
