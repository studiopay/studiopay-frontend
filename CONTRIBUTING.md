# Contribuindo com o Studio Pay

Obrigado por contribuir com o projeto. Este guia resume o fluxo esperado para alterações no repositório.

## Fluxo recomendado

1. atualizar a branch principal (`git pull origin main`);
2. criar uma branch específica para a tarefa;
3. realizar somente as alterações da tarefa;
4. testar desktop, tablet e mobile quando houver mudança visual;
5. executar `npm run build`;
6. revisar o `git diff` antes de commitar;
7. criar um commit padronizado (veja [`docs/COMMIT_GUIDE.md`](docs/COMMIT_GUIDE.md));
8. abrir um Pull Request usando o template disponível.

## Nomes de branches

| Padrão | Uso |
|---|---|
| `feature/nome-da-funcionalidade` | novas funcionalidades |
| `fix/nome-da-correcao` | correções |
| `style/nome-do-ajuste` | ajustes visuais |
| `refactor/nome-da-refatoracao` | reorganização sem mudança de comportamento |
| `docs/nome-da-documentacao` | documentação |
| `chore/nome-da-manutencao` | manutenção |

## Boas práticas

- não trabalhar diretamente na `main` quando a alteração for relevante;
- não usar `git add .` sem revisar o que está sendo incluído;
- não enviar arquivos `.env`;
- não misturar tarefas diferentes no mesmo commit;
- não fazer push forçado;
- não alterar componentes globais sem avaliar os impactos em outras páginas;
- testar antes do commit;
- manter commits pequenos e claros.

## Referências

- [`docs/GIT_WORKFLOW.md`](docs/GIT_WORKFLOW.md) — branches e processo de Git.
- [`docs/COMMIT_GUIDE.md`](docs/COMMIT_GUIDE.md) — padrão de mensagens de commit.
- [`docs/DEPLOY.md`](docs/DEPLOY.md) — processo de deploy.
- [`.github/SECURITY.md`](.github/SECURITY.md) — política de segurança.
