# Débitos Técnicos e Riscos

Lista honesta de débitos observados no código, sem nenhuma correção aplicada nesta etapa. Cada item indica risco, impacto e recomendação — a decisão de agir é da equipe responsável.

## Baixo risco

### CSS centralizado e extenso
- **Descrição:** a maior parte do estilo da área pública vive em um único arquivo, `src/styles/landing.css`, que cresceu ao longo de muitas rodadas de trabalho.
- **Risco:** baixo isoladamente, mas aumenta a chance de colisão de nomes de classe e dificulta localizar CSS de uma seção específica.
- **Impacto:** manutenção mais lenta à medida que o arquivo cresce.
- **Recomendação:** considerar dividir por página/módulo em uma refatoração futura, mantendo `variables.css` como fonte única de tokens.
- **Necessidade de testes:** visual, em todas as páginas públicas (alto risco de regressão se feito sem cuidado, apesar do item ser "baixo risco" em intenção).

### Revisão de nomes
- **Descrição:** nomenclatura "Elison" (código) vs. "Elisson.IA" (copy pública); `conta-digital-mobile.png.png` com extensão duplicada.
- **Risco:** baixo — funciona corretamente hoje.
- **Impacto:** confusão para novos desenvolvedores; aparência não profissional em listagens de arquivo.
- **Recomendação:** decidir com o time de produto se "Elison"/"Elisson.IA" é intencional; renomear o asset de imagem numa tarefa dedicada.
- **Necessidade de testes:** build + smoke test visual das páginas afetadas.

### Otimização de imagens
- **Descrição:** `conta-digital-mobile.png.png` (3,69 MB) e `studiopay-agenda.gif` (8,2 MB) não seguem o padrão WebP/otimizado do restante do projeto.
- **Risco:** baixo tecnicamente, mas afeta performance de carregamento real.
- **Impacto:** tempo de carregamento maior na Home e na página de Conta Digital.
- **Recomendação:** reconverter para WebP (imagem) e `.webm`/`.mp4` ou WebP animado (GIF).
- **Necessidade de testes:** comparação visual antes/depois, verificação de tamanho de arquivo.

### Documentação
- **Descrição:** README original era o template genérico do Vite (já corrigido na etapa anterior de organização do repositório).
- **Risco:** nenhum remanescente.
- **Impacto:** já resolvido.
- **Recomendação:** manter esta documentação atualizada a cada mudança relevante de arquitetura.

## Exige testes

### Divisão de CSS
- **Descrição:** qualquer refatoração de `landing.css` (dividir em arquivos por página) precisa garantir que a ordem de cascata CSS seja preservada, já que há classes com a mesma especificidade dependendo da ordem de declaração (ex. o padrão `.auth-page-login`/`.auth-page-cadastro` depende de vir *depois* das classes base no arquivo).
- **Risco:** médio — regressão visual silenciosa se a ordem mudar.
- **Impacto:** páginas públicas e de autenticação.
- **Recomendação:** só dividir com uma suíte de comparação visual (screenshot diff) rodando antes/depois.
- **Necessidade de testes:** obrigatório — visual em todas as páginas, todos os breakpoints.

### Extração de componentes duplicados
- **Descrição:** `FallbackImage` está copiado em 3 arquivos (`StudioCorePage.jsx`, `StudioLearnPage.jsx`, `StudioShopPage.jsx`); lógica de logout duplicada em `Sidebar.jsx` e `MobileMenuPanel.jsx`.
- **Risco:** médio — divergência silenciosa entre as cópias ao longo do tempo (uma é corrigida, a outra não).
- **Impacto:** manutenção; comportamento inconsistente entre desktop/mobile se só uma cópia for atualizada.
- **Recomendação:** extrair para `src/components/ui/FallbackImage.jsx` e uma função `logout()` compartilhada.
- **Necessidade de testes:** funcional (fallback de imagem quebrada) + funcional (logout em desktop e mobile).

### Remoção de código morto
- **Descrição:** componentes órfãos em `src/components/landing/` (`FAQ`, `FeaturesSection`, `HowItWorks`, `TestimonialsSection`, `BenefitsSection`, `StatCard` em `ui/`); código não renderizado em `StudioCorePage.jsx` (seções antigas mantidas no arquivo).
- **Risco:** baixo tecnicamente (não afeta o build hoje), mas remoção requer confirmação de que realmente não serão reativados.
- **Impacto:** tamanho do bundle e clareza do código.
- **Recomendação:** confirmar com o time de produto antes de remover — pode haver planos de reativação não documentados.
- **Necessidade de testes:** build + grep de confirmação de que nada mais importa esses arquivos.

### Renomeação de assets
- **Descrição:** `conta-digital-mobile.png.png` → `conta-digital-mobile.png`; possível remoção de `conta-digital-hero.webp` e `favicon.png` órfãos.
- **Risco:** médio — qualquer rename exige atualizar a referência exata no código (`CoreDigitalPreviewSection.jsx`) na mesma alteração, ou a imagem quebra silenciosamente (cai no fallback de placeholder, sem erro de build).
- **Impacto:** visual, se feito incorretamente.
- **Recomendação:** fazer rename + atualização de referência no mesmo commit, com verificação visual antes/depois.
- **Necessidade de testes:** visual, na página/seção específica.

### Atualização de dependências
- **Descrição:** `package.json` usa versões recentes (React 19, Vite 8, React Router 7) — não há débito de versões desatualizadas identificado hoje, mas deve ser monitorado.
- **Risco:** baixo agora, cresce com o tempo sem manutenção.
- **Impacto:** potencial quebra em atualizações futuras se acumular muitas versões de atraso.
- **Recomendação:** revisar dependências periodicamente (`npm outdated`), sem pressa nesta etapa.
- **Necessidade de testes:** build completo + smoke test após qualquer bump de versão maior.

## Alto impacto

### Ausência total de backend
- **Descrição:** nenhuma chamada de API real existe em todo o projeto (confirmado via busca por `fetch`/`axios`/etc.).
- **Risco:** crítico para o produto — nada é persistido de forma confiável ou compartilhada entre dispositivos/usuários.
- **Impacto:** o produto não pode operar com usuários reais no estado atual.
- **Recomendação:** ver [`INTEGRATIONS.md`](INTEGRATIONS.md) para o mapeamento completo de onde a integração é necessária.
- **Necessidade de testes:** todo o projeto, à medida que cada integração for introduzida.

### Autenticação simulada e insegura
- **Descrição:** login/cadastro aceitam qualquer dado preenchido; "sessão" é apenas uma flag em `localStorage` (`studioPayAuth`), sem token, sem expiração, sem verificação de servidor. Qualquer pessoa pode definir essa chave manualmente no console do navegador e obter acesso a `/app/*`.
- **Risco:** crítico — não há segurança real hoje.
- **Impacto:** toda a área `/app/*`.
- **Recomendação:** implementar autenticação real (backend) antes de qualquer uso com dados reais de clientes.
- **Necessidade de testes:** segurança + funcional, obrigatório antes de produção real.

### Rota `/admin` sem proteção
- **Descrição:** `/admin` está fora dos guards de `PublicLayout` e `AppLayout` — qualquer pessoa com a URL pode acessar e editar conteúdo do site (textos, imagens, produtos).
- **Risco:** crítico — não é uma vulnerabilidade de dados sensíveis (não expõe dados de clientes), mas permite vandalismo/alteração indevida do conteúdo público por qualquer visitante.
- **Impacto:** integridade do conteúdo do site.
- **Recomendação:** adicionar autenticação e autorização a essa rota antes de expor o domínio publicamente com esse código, ou remover a rota do build de produção até que isso exista.
- **Necessidade de testes:** segurança, obrigatório.

### Bug potencial no logout de Configurações
- **Descrição:** em `src/pages/app/Configuracoes.jsx`, a função `logout()` remove apenas a chave `studiopay_user` do `localStorage`, mas **não remove `studioPayAuth`**. Como `AppLayout.jsx` considera o usuário autenticado se `studioPayAuth === 'true'` **ou** se `studiopay_user` existir, é possível que o usuário permaneça "autenticado" após clicar em "Sair" nessa tela específica, dependendo de como a sessão foi originalmente criada (via Login vs. via Cadastro). As implementações de logout em `Sidebar.jsx` e `MobileMenuPanel.jsx` removem as 3 chaves corretamente — a inconsistência está isolada em `Configuracoes.jsx`.
- **Risco:** médio-alto — comportamento de segurança inconsistente e confuso para o usuário.
- **Impacto:** tela de Configurações.
- **Recomendação:** unificar a lógica de logout em uma função compartilhada (ver item "Extração de componentes duplicados" acima) usada pelos 3 pontos de logout.
- **Necessidade de testes:** funcional, obrigatório — testar logout a partir de cada um dos 3 pontos de entrada.

### Cobranças/Pix inteiramente fictícios
- **Descrição:** os fluxos de "gerar cobrança"/"criar link de pagamento" produzem sempre o mesmo código Pix fixo ou um link aleatório que não resolve para nada.
- **Risco:** alto se essa tela chegar a produção sem aviso claro ao usuário de que é uma demonstração.
- **Impacto:** confiança do usuário final; risco reputacional se um tatuador tentar usar um "Pix" que não existe.
- **Recomendação:** manter avisos visíveis de "demonstração" até que a integração de pagamento real exista (alguns já existem no código, ex. em `Shop.jsx` e `ShopProduto.jsx` — replicar esse padrão em Cobranças/Banco).
- **Necessidade de testes:** revisão de produto antes de qualquer deploy voltado a usuários reais.

### Mudanças de rotas
- **Descrição:** não há débito identificado hoje, mas qualquer mudança futura de rota (ex. renomear `/elison-ia` para consistência com "Elison") quebra links já compartilhados externamente (redes sociais, materiais de marketing).
- **Risco:** alto, condicional a decisão futura.
- **Impacto:** SEO, links quebrados.
- **Recomendação:** se uma rota for renomeada, manter um redirect da rota antiga para a nova.
- **Necessidade de testes:** verificação de todos os links internos (Navbar, Footer, CTAs) após qualquer rename de rota.

### Build/Vercel
- **Descrição:** nenhum problema identificado no build atual (`npm run build` passa sem erros). O ponto de atenção é que a configuração real de deploy (branch de produção, variáveis de ambiente futuras) vive no painel da Vercel, fora deste repositório — ver [`DEPLOY.md`](DEPLOY.md).
- **Risco:** baixo hoje, mas é um ponto cego para quem só tem acesso ao código.
- **Recomendação:** garantir que a equipe que assumir o projeto tenha acesso ao painel da Vercel, não só ao repositório Git.

### Permissões
- **Descrição:** não existe nenhum conceito de papel/permissão no projeto (nem entre usuário comum e administrador).
- **Risco:** alto, assim que houver dados reais de múltiplos estúdios/usuários.
- **Recomendação:** desenhar modelo de permissões antes de conectar o backend real — ver [`DECISIONS.md`](DECISIONS.md).
