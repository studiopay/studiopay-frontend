# Deploy

Este documento descreve o processo de deploy identificado a partir dos arquivos do repositório.

## Serviço usado

O deploy é feito pela [Vercel](https://vercel.com/). O arquivo [`vercel.json`](../vercel.json) na raiz do projeto configura o rewrite de todas as rotas para `index.html`, necessário para o roteamento client-side do React Router funcionar corretamente em produção.

A configuração do projeto na Vercel (branch de produção, domínio, variáveis de ambiente, etc.) vive no painel da Vercel, não neste repositório — a pasta `.vercel/` é local e está no `.gitignore`. Este documento não tem acesso a essa configuração; as informações abaixo refletem a convenção observada no histórico do Git.

## Branch que dispara produção

Pelo histórico de commits e pushes deste repositório, `main` é a branch usada como base de produção. Confirme no painel da Vercel qual branch está de fato configurada como "Production Branch" do projeto.

## Comando de build

```bash
npm run build
```

Executa `vite build`.

## Pasta de saída

```
dist/
```

(padrão do Vite, usado pela Vercel para publicar os arquivos estáticos gerados)

## Como validar o deploy

1. Após o push para a branch de produção, acompanhar o build no painel da Vercel.
2. Abrir a URL de produção (ou o preview gerado) e verificar:
   - a Home e as páginas de módulos carregam sem erro;
   - a navegação entre rotas funciona (sem 404 ao recarregar uma rota interna);
   - não há erros no console do navegador.

## Como agir em caso de falha

1. Verificar o log de build no painel da Vercel para identificar o erro.
2. Rodar `npm run build` localmente para reproduzir o problema.
3. Corrigir em uma branch própria, seguindo o [fluxo de trabalho](GIT_WORKFLOW.md), e abrir um novo Pull Request.

## Como reverter usando um commit anterior

Sem reescrever o histórico:

```bash
git revert <hash-do-commit-com-problema>
git push origin main
```

Isso cria um novo commit que desfaz as alterações do commit indicado e dispara um novo deploy com o código revertido, mantendo o histórico intacto (nenhum uso de `reset --hard` ou push forçado).

Alternativamente, no painel da Vercel é possível promover manualmente um deploy anterior (de um commit já publicado) de volta para produção, sem alterar o repositório.
