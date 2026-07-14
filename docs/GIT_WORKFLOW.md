# Fluxo de Git

## Branch principal

`main` representa a versão aprovada e pronta para produção. O deploy em produção é disparado a partir dela (veja [`DEPLOY.md`](DEPLOY.md)).

## Branches de trabalho

| Padrão | Uso |
|---|---|
| `feature/*` | novas funcionalidades |
| `fix/*` | correções |
| `style/*` | ajustes visuais |
| `refactor/*` | reorganização sem mudança de comportamento |
| `docs/*` | documentação |
| `chore/*` | manutenção |

## Processo recomendado

1. atualizar `main`;
2. criar uma branch específica para a tarefa;
3. desenvolver;
4. revisar (`git status`, `git diff`);
5. executar `npm run build`;
6. commitar seguindo o [padrão de commits](COMMIT_GUIDE.md);
7. fazer push da branch;
8. abrir um Pull Request;
9. revisar;
10. fazer merge.

## Regras de segurança

- não usar `git push --force`;
- não apagar branches sem confirmar que o merge foi concluído;
- não fazer `amend` em commits já publicados no remoto;
- não colocar tarefas diferentes na mesma branch;
- não alterar histórico compartilhado.
