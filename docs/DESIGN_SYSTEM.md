# Design System

Identidade visual extraída diretamente do código-fonte (`src/styles/variables.css` e uso real em `src/styles/*.css`). Não inclui nada que não esteja implementado.

## Marca

- **Nome:** Studio Pay.
- **Estética:** premium, escura por padrão, com tema claro alternativo já implementado.
- **Cor de identidade:** preto/grafite como base, rosa como cor de destaque em praticamente toda interação (CTAs, links, ícones ativos, glows).

## Cores

Definidas como CSS custom properties em `src/styles/variables.css`.

### Cores de marca (fixas, independem do tema)

| Token | Valor | Uso |
|---|---|---|
| `--pink` | `#FF2ED1` | Cor principal de marca — CTAs, links, destaques, ícones ativos |
| `--pink-dark` | `#CC1FAA` | Hover/estado ativo do rosa |
| `--pink-dim` | `rgba(255,46,209,0.12)` | Fundo suave para badges/pills/hover |
| `--pink-glow` | `rgba(255,46,209,0.25)` | Efeitos de brilho/glow |
| `--black` | `#0B0B0E` | Base do tema escuro |

### Estados

| Token | Valor | Uso |
|---|---|---|
| `--green` / `--green-dim` | `#22C55E` / `rgba(34,197,94,0.12)` | Sucesso |
| `--red` / `--red-dim` | `#EF4444` / `rgba(239,68,68,0.12)` | Erro/perigo |
| `--yellow` / `--yellow-dim` | `#F59E0B` / `rgba(245,158,11,0.12)` | Alerta |
| `--blue` / `--blue-dim` | `#3B82F6` / `rgba(59,130,246,0.12)` | Informativo |

### Tema escuro (padrão — `:root, .theme-dark`)

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0B0B0E` | Fundo geral da área pública |
| `--bg-card` / `--bg-card2` | `#191a1b` / `#222628` | Fundo de cards / hover |
| `--text-primary` / `--text-secondary` | `#F8F9FB` / `rgba(248,249,251,0.72)` | Texto |
| `--border` / `--border-hover` | `rgba(255,255,255,0.06)` / `rgba(255,255,255,0.12)` | Bordas |
| `--footer-bg` | `#0a0a0d` | Rodapé |
| `--app-bg` | `#08090b` | Fundo da área interna |
| `--app-surface` / `--app-surface-soft` / `--app-surface-softer` | `#191a1b` / `#222628` / `#2d3035` | Superfícies da área interna, em níveis |

### Tema claro (`.theme-light`) — mesmos tokens sobrescritos

| Token | Valor |
|---|---|
| `--bg` | `#F4F5F8` |
| `--bg-card` | `#FFFFFF` |
| `--text-primary` | `#0B0B0E` |
| `--text-secondary` | `rgba(11,11,14,0.65)` |
| `--footer-bg` | `#0B0B0E` (rodapé permanece escuro mesmo no tema claro, por contraste proposital) |
| `--app-bg` | `#faf8fc` |
| `--app-surface` | `#ffffff` |

## Tipografia

- **Fonte de corpo (`--font-body`):** `'Inter', sans-serif` — dominante em praticamente todo o projeto (títulos, corpo de texto, botões, inputs).
- **Fonte de destaque (`--font-display`):** `'Syne', sans-serif` — planejada como fonte de destaque, mas em uso mínimo (só 2 ocorrências em `landing.css`); na prática, quase todos os títulos usam Inter.
- **Pesos usados:** 400, 500, 600, 700, 800 como padrão. Também existem valores "quebrados" (650, 750, 850) usados pontualmente em ajustes finos de hero — sinal de falta de uma escala tipográfica formal (ver [`TECHNICAL_DEBT.md`](TECHNICAL_DEBT.md)).
- **Inconsistência identificada:** algumas declarações usam `'Inter', system-ui, sans-serif` hardcoded em vez de `var(--font-body)` (em `admin.css` e `app.css`).

## Componentes visuais

### Pills / badges
- **`.section-label`** — etiqueta pequena (11px, peso 700, uppercase, letter-spacing 1.2px), fundo `var(--pink-dim)`, texto `var(--pink)`, `border-radius: var(--radius-full)`. Usada como "olho" de seção acima de títulos.
- **`.core-pill`** — variante maior (14px+, padding generoso, centralizado, largura até 720px), fundo `rgba(255,46,209,0.05)`, borda `1px solid rgba(255,46,209,0.2)`. Usada como faixa de destaque textual dentro de seções.

### Cards
- Fundo `var(--app-surface)` (área interna) ou gradientes escuros customizados (área pública), `border-radius: var(--radius-lg)` (16px), borda 1px sutil, `box-shadow` leve.
- Variante `.card-glass` com `backdrop-filter: blur(12px)` (glassmorphism).

### Botões
- **`.btn`** (base) — `display: inline-flex`, `border-radius: var(--radius)` (12px), padding 10px/20px, peso 600.
- **`.btn-primary`** — fundo sólido `var(--pink)`, escurece + ganha `box-shadow: var(--shadow-pink)` + `translateY(-1px)` no hover.
- **`.btn-ghost`** — transparente com borda cinza, ganha fundo no hover.
- **`.btn-sm`/`.btn-lg`** — variantes de tamanho; na área pública (`.landing .btn-sm`/`.landing .btn-lg`), o raio é forçado para pill total (`9999px`).

### Inputs
- Fundo grafite escuro (`.form-input`), borda sutil, texto branco, placeholder cinza, foco com borda rosa (`var(--pink)`), sem glow exagerado.

### Mockups
- Padrão predominante: usar imagens reais (`<img>` com fallback de placeholder) em vez de recriar telas em HTML/CSS, quando o asset está disponível — reforçado explicitamente em revisões recentes do projeto.
- Exceções intencionais: mockups totalmente construídos em HTML/CSS existem quando não há screenshot real disponível (ex. `WhatsAppMockup` do Elisson.IA, `CampaignPanel` do Studio Ads, painéis internos da Agenda) — são compostos com ícones `lucide-react` + CSS.

### Glows
- Padrão recorrente: `radial-gradient(circle, rgba(255,46,209,0.05–0.25) 0%, transparent 65–70%)`, sempre em opacidade baixa, atrás de heros/avatares/blocos de destaque. Ocasionalmente combinado com roxo (`rgba(139,92,246,...)`) como cor secundária de glow.

### Bordas e sombras
- Escala de raio de borda formal via tokens: `--radius-sm` (6px, elementos pequenos/ícones) → `--radius` (12px, padrão) → `--radius-lg` (16px, cards/modais) → `--radius-xl` (24px, painéis grandes) → `--radius-full` (9999px, pills/avatares).
- Sombras: `--shadow` (padrão), `--shadow-lg` (elevada, modais/dropdowns), `--shadow-pink` (glow rosa em hover de CTA primário).

## Responsividade

Não há um sistema formal de breakpoints (tipo grid framework) — os valores são definidos por componente/seção, mas convergem consistentemente para um conjunto reduzido de larguras reais:

**Breakpoints mais recorrentes (na prática, o sistema real do projeto):** `920px`, `900px`, `860px`, `768px`, `640px`.

**Todos os valores `max-width` encontrados em uso:** 1200, 1100, 1080, 1050, 1024, 1000, 980, 920, 900, 860, 768, 760, 720, 700, 680, 640, 600, 520, 500, 480, 440, 430, 400, 380, 360px.

Recomenda-se, em qualquer evolução futura, convergir para os 5 breakpoints mais recorrentes acima em vez de introduzir novos valores ad-hoc.

## Regras aprovadas

Reforçadas ao longo de várias rodadas de revisão visual do projeto:

- Preservar contraste em ambos os temas (claro/escuro).
- Evitar glow excessivo — sempre baixa opacidade, nunca cobrindo conteúdo.
- Manter consistência de bordas (usar os tokens `--radius-*`, evitar valores soltos).
- Validar toda mudança visual em desktop, tablet e mobile antes de considerar concluída.
- Utilizar assets/mockups reais aprovados em vez de recriar telas em HTML/CSS, quando o asset existir.
- Manter hierarquia visual clara: selo → headline → subheadline/conteúdo → CTA, como padrão recorrente de seção.
