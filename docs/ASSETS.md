# Assets

Inventário de imagens e mídia em `public/`. Nenhum arquivo foi renomeado, movido ou excluído para produzir este documento — observações são apenas registro para decisão futura do time.

## Ícones e manifesto (raiz de `public/`)

| Arquivo | Tipo | Usado em | Observação |
|---|---|---|---|
| `favicon.ico` | ícone | `index.html` | |
| `favicon-16x16.png` | ícone | `index.html` | |
| `favicon-32x32.png` | ícone | `index.html` | |
| `favicon.png` | ícone | não referenciado em nenhum arquivo `.jsx`/`.html` encontrado | possível resquício de geração de favicons |
| `apple-touch-icon.png` | ícone | `index.html` | |
| `android-chrome-192x192.png` | ícone | `site.webmanifest` | |
| `android-chrome-512x512.png` | ícone | `site.webmanifest` | |
| `site.webmanifest` | manifesto | `index.html` | |

## Marca (`public/brand/`)

| Arquivo | Tipo | Usado em | Observação |
|---|---|---|---|
| `logo-studio-pay-horizontal.png` | logo | `Navbar.jsx`, `Sidebar.jsx` | versão para tema claro |
| `logo-studio-pay-horizontal-white.png` | logo | `Footer.jsx`, `Navbar.jsx`, `Sidebar.jsx`, `CadastroPage.jsx`, `LoginPage.jsx`, `OnboardingPage.jsx` | versão para tema escuro/fundos escuros |

## Mídia (`public/media/`)

| Arquivo | Tipo | Tamanho | Usado em | Observação |
|---|---|---|---|---|
| `studiopay-agenda.gif` | GIF | **8,2 MB** | `DemoGifSection.jsx` (Home) | arquivo muito grande para web; candidato a conversão para `.webm`/`.mp4` ou WebP animado |

## Imagens de produto (`public/images/studio-pay/`)

| Arquivo | Componente/Página | Observação |
|---|---|---|
| `agenda-hero.webp` | `StudioAgendaPage.jsx` | |
| `conta-digital-app.webp` | `StudioCorePage.jsx` | |
| `conta-digital-cartao.webp` | `StudioCorePage.jsx` | |
| `conta-digital-cobrancas.webp` | `StudioCorePage.jsx` | |
| `conta-digital-criar-cobranca.webp` | `StudioCorePage.jsx` | |
| `conta-digital-hero.webp` | não referenciado em nenhum arquivo `.jsx` encontrado | possível órfão — substituído por `conta-digital-app.webp`? Validar com o time antes de remover |
| `conta-digital-mobile.png.png` | `CoreDigitalPreviewSection.jsx` (Home) | **extensão duplicada** (`.png.png`) no nome do arquivo; funciona normalmente pois o código referencia o nome exato, mas deveria ser normalizado para `conta-digital-mobile.png` numa limpeza futura. Também é, de longe, o maior asset estático do projeto (**3,69 MB**, PNG sem compressão) — não passou pelo mesmo pipeline de otimização das demais imagens (todas `.webp`, <135 KB) |
| `cursos-hero.webp` | `StudioLearnPage.jsx` | |
| `cursos-realismo-card.webp` | `StudioLearnPage.jsx` | |
| `elisson-confirmacao.webp` | `ElisonPreviewSection.jsx` (Home) | |
| `elisson-lembrete.webp` | `ElisonPreviewSection.jsx` (Home) | |
| `elisson-pos-atendimento.webp` | `ElisonPreviewSection.jsx` (Home) | |
| `shop-hero.webp` | `StudioShopPage.jsx` | |
| `shop-product.webp` | `StudioShopPage.jsx` | |
| `shop/shop-cartuchos.webp` | `PainSection.jsx` (Home) | |
| `shop/shop-luvas.webp` | `PainSection.jsx` (Home) | |
| `shop/shop-tintas.webp` | `PainSection.jsx` (Home) | |

## Observações gerais (apenas registro — nada foi alterado)

1. **Extensão duplicada:** `conta-digital-mobile.png.png` — nome tecnicamente incorreto, mas funcional. Correção segura: renomear o arquivo E atualizar a única referência em `CoreDigitalPreviewSection.jsx` (`MOCKUP_IMAGE`), em uma tarefa dedicada e testada — não fazer via automação cega, pois exige atualizar código junto.

2. **Possíveis duplicidades/redundância:**
   - `conta-digital-hero.webp` (órfão) vs. `conta-digital-app.webp` (em uso como hero real) — sugere substituição anterior sem remoção do arquivo antigo.
   - Assets de "shop" divididos entre a raiz de `studio-pay/` (`shop-hero.webp`, `shop-product.webp`) e a subpasta `studio-pay/shop/` (`shop-cartuchos.webp`, `shop-luvas.webp`, `shop-tintas.webp`) — convenção de organização inconsistente.
   - `favicon.png` (mesmo tamanho de `android-chrome-512x512.png`) não é referenciado em lugar nenhum — possível resquício de geração automática de favicons.

3. **Arquivos incomumente grandes (>500 KB):**
   - `public/media/studiopay-agenda.gif` — 8,2 MB.
   - `public/images/studio-pay/conta-digital-mobile.png.png` — 3,69 MB.
   
   Ambos são fortes candidatos a otimização antes de qualquer trabalho de performance/Core Web Vitals.

4. **Assets em `public/` sem referência encontrada em `src/`:**
   - `public/favicon.png`
   - `public/images/studio-pay/conta-digital-hero.webp`

   (Os ícones `android-chrome-*.png` não aparecem em `.jsx`, mas são referenciados via `site.webmanifest` — não são considerados órfãos.)

## Recomendação

Nenhuma ação foi tomada sobre os itens acima nesta etapa (documentação apenas). Ver [`TECHNICAL_DEBT.md`](TECHNICAL_DEBT.md) para risco/prioridade de cada item antes de agir.
