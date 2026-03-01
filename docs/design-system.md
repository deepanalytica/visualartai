# Design System — Visual Art AI

Documentación del sistema de diseño: tokens CSS, componentes, y guías de uso del lenguaje visual neon.

---

## Principios de diseño

**Dark neon, no sci-fi kitsch.** El objetivo es una estética premium y sofisticada que usa el neón con moderación, no como decoración sin propósito.

**Reglas base:**
1. El neón se usa para comunicar jerarquía y foco — nunca decorativamente sin propósito
2. El fondo es siempre oscuro; el texto siempre claro
3. Los glows son sutiles — 15-40% de opacidad, no 100%
4. La tipografía espaciada y limpia hace el trabajo pesado
5. El ruido grain reduce la dureza del diseño digital

---

## CSS Tokens

Todos los valores visuales viven en `src/app/globals.css` como CSS custom properties.

### Fondos (Dark Scale)

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg-void` | `#05060a` | Fondo de body — el negro más profundo |
| `--bg-surface` | `#0a0c12` | Fondo de secciones principales |
| `--bg-elevated` | `#0f1118` | Cards, modales, componentes elevados |
| `--bg-overlay` | `#141720` | Dropdowns, tooltips, overlay |

**Uso:** usa `bg-void` para el body, `bg-surface` para secciones alternas, `bg-elevated` para cards. No uses fondos con colores — todo el color viene de los acentos.

### Acentos Neon

| Token | Valor | Uso |
|-------|-------|-----|
| `--neon-cyan` | `#00e5ff` | Acento primario — CTAs, links, highlights |
| `--neon-cyan-dim` | `#00e5ff33` | Fondos de badges, seleccionados |
| `--neon-magenta` | `#e040fb` | Acento secundario — badges, etiquetas |
| `--neon-magenta-dim` | `#e040fb33` | Versión suave |
| `--neon-violet` | `#7c4dff` | Terciario — decorativo, gradientes |
| `--neon-violet-dim` | `#7c4dff33` | Versión suave |
| `--neon-amber` | `#ffd740` | Solo CTAs críticos y alertas de éxito |

**Cuándo usar cada acento:**
- **Cyan:** botones primarios, links, progress bars, bordes en hover, iconos interactivos
- **Magenta:** badges de "nuevo", etiquetas de ruta "Redes", elementos decorativos secundarios
- **Violet:** gradientes, elementos de fondo, variante de glow en cards especiales
- **Amber:** únicamente en confirmaciones de éxito (pago completado, lección finalizada) y alertas críticas

### Texto

| Token | Valor | Uso |
|-------|-------|-----|
| `--text-primary` | `#f0f4ff` | Texto principal, headings |
| `--text-secondary` | `#8b95b0` | Texto secundario, subtítulos, metadata |
| `--text-muted` | `#4a5270` | Texto terciario, placeholders, disabled |
| `--text-accent` | `var(--neon-cyan)` | Links, elementos interactivos |

### Bordes

| Token | Valor | Uso |
|-------|-------|-----|
| `--border-subtle` | `#1e2235` | Divisores internos, separadores suaves |
| `--border-default` | `#252a3d` | Borde estándar de cards y inputs |
| `--border-accent` | `#00e5ff40` | Borde de cards en estado normal |
| `--border-glow` | `#00e5ff80` | Borde de cards en hover |

### Sombras y Glows

| Token | Descripción |
|-------|-------------|
| `--glow-cyan` | `0 0 20px #00e5ff40, 0 0 60px #00e5ff15` |
| `--glow-magenta` | `0 0 20px #e040fb40, 0 0 60px #e040fb15` |
| `--glow-card` | `0 4px 24px #00000080, 0 0 1px #00e5ff20` |
| `--shadow-deep` | `0 20px 60px #00000090` |

**Nunca uses `--glow-cyan` y `--glow-magenta` en el mismo elemento.** El choque visual se lee como error, no como estilo.

### Glass Effect

- Fondo: `rgba(15, 17, 24, 0.7)`
- Blur: `backdrop-filter: blur(12px)`
- Usar solo cuando hay contenido detrás (imagen, gradiente). En fondos sólidos oscuros no tiene efecto visual.

### Radios de borde

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | `6px` | Badges, chips pequeños |
| `--radius-md` | `10px` | Inputs, botones |
| `--radius-lg` | `16px` | Cards, modales |
| `--radius-xl` | `24px` | Cards grandes, hero elements |

---

## Tipografía

| Función | Fuente |
|---------|--------|
| Display / Headings | Space Grotesk |
| Cuerpo de texto | Inter, system-ui |
| Mono / Código | GeistMono, monospace |

**Scale de headings:**
- `text-5xl` / `text-6xl` — Hero headlines (font-display)
- `text-3xl` / `text-4xl` — Section headings (font-display)
- `text-xl` / `text-2xl` — Card titles, subsección headings
- `text-base` / `text-lg` — Cuerpo de texto
- `text-sm` — Metadata, labels, captions

---

## Componentes de Marca

### NeonCard

El componente base del sistema. Usar para cualquier contenedor que necesite el estilo de card.

```tsx
<NeonCard glow="cyan" glass hoverable>
  {/* contenido */}
</NeonCard>
```

**Props:**
- `glow?: 'cyan' | 'magenta' | 'violet'` — Color del glow en hover. Default: `'cyan'`
- `glass?: boolean` — Activa el efecto glass (backdrop-blur). Default: `false`
- `hoverable?: boolean` — Agrega transform y glow en hover. Default: `false`

**Cuándo usar glass:** solo cuando hay contenido detrás (imagen o gradiente). En fondos sólidos no lo uses.

---

### NeonButton

Extensión de shadcn Button con variantes extra:

```tsx
<NeonButton variant="neon">CTA principal</NeonButton>
<NeonButton variant="ghost-neon">Acción secundaria</NeonButton>
```

**Variantes:**
- `neon` — Botón sólido con fondo cyan. Para CTAs primarios.
- `ghost-neon` — Sin fondo, solo borde y texto cyan. Para acciones secundarias.

**Regla:** máximo 1 botón `variant="neon"` por sección visible. Más de uno diluye la jerarquía.

---

### GlitchText

Efecto de glitch CSS puro para headings.

```tsx
<GlitchText text="Visual Art AI" intensity="low" />
```

- `intensity="low"` — Glitch sutil. Recomendado para headings de marketing.
- `intensity="medium"` — Glitch más visible. Solo en elementos muy específicos de hero.

**Regla:** usar solo en headings de primer nivel (h1). Nunca en texto de cuerpo o labels.

---

### BentoGrid

Grid flexible para layouts tipo bento (celdas de diferentes tamaños).

**Props:** `columns?: 2|3|4`, `items: BentoItem[]`

**BentoItem:** `{ title, description, icon?, size?: 'sm'|'md'|'lg', glow?: 'cyan'|'magenta'|'violet' }`

---

### CyberpunkGrid

Fondo decorativo con líneas de grid y gradiente radial. Se usa como background en secciones hero.

```tsx
<div className="relative">
  <CyberpunkGrid />
  {/* contenido sobre el grid */}
</div>
```

No tiene props configurables — es puramente decorativo.

---

## Animaciones

| Clase | Uso |
|-------|-----|
| `animate-pulse-neon` | Pulsación suave del glow — para indicadores de estado activo |
| `animate-fade-in` | Fade de opacidad 0→1 — entrance animation |
| `animate-slide-up` | Slide desde abajo + fade — cards, modales |
| `animate-scan-line` | Línea de escaneo vertical — uso decorativo raro |

**Reglas:**
1. Las animaciones de entrada (`fade-in`, `slide-up`) se usan solo en el primer render
2. `pulse-neon` se reserva para elementos de estado activo (progreso, live indicators)
3. Duración máxima: 400ms. Más tiempo se siente pesado.
4. Siempre respetar `prefers-reduced-motion` (ya configurado globalmente en `globals.css`)

---

## Patrones de layout

### Páginas de marketing

Alternar fondos para crear ritmo visual:

```
Hero (bg-void + CyberpunkGrid)
→ Prueba social (bg-surface)
→ Features BentoGrid (bg-void)
→ Pricing (bg-surface)
→ CTA final (bg-void + glow sutil)
```

### Cards de curso / recurso

- Thumbnail con `next/image` y aspect ratio 16:9
- Badge de ruta en `neon-magenta-dim` background
- Precio en `text-accent` (cyan)
- CTA button en `variant="neon"`
- Hover: `translate-y-[-2px]` + `glow-card`

### Forms e inputs

- Background: `bg-elevated`
- Border reposo: `border-default`
- Border focus: `border-accent`
- Label: `text-secondary`
- Placeholder: `text-muted`
- Error state: rojo estándar de shadcn (no neón)

---

## Lo que NO hacer

- ❌ No uses fondos blancos o muy claros — rompen el sistema oscuro
- ❌ No uses colores neón para texto de cuerpo — solo acentos, links, y badges
- ❌ No uses más de 2 colores neón en la misma sección visible
- ❌ No uses GlitchText en más de 1 elemento por página
- ❌ No uses glass effect en fondos sólidos oscuros — no tiene efecto visual
- ❌ No animes con duración mayor a 400ms
- ❌ No uses `--neon-amber` decorativamente — solo para estados de éxito o alerta crítica
- ❌ No importes datos directamente en componentes visuales — todos deben ser props-driven
