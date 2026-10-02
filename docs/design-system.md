# Visual Art AI Design System v2

Este documento define el sistema de diseño que gobierna Visual Art AI en producción y en la aplicación Next.js.

La regla central es simple:

> una decisión visual importante debe existir como fundamento, token, componente o patrón. No como un valor aislado inventado para una pantalla.

## 1. Arquitectura

El sistema se construye en cinco capas:

1. **Foundations** — color, tipografía, espaciado, radios, elevación, motion y accesibilidad.
2. **Primitive tokens** — valores crudos de la marca, por ejemplo `--clay-500`.
3. **Semantic tokens** — significado, por ejemplo `--color-action-primary`.
4. **Component tokens/contracts** — cómo se comportan Button, Input, Card, Navigation, Badge, Modal, Tabs y otros.
5. **Patterns** — hero, feature grid, pricing, diagnostic, search proof, CTA, cards de recursos y estados vacíos.

El orden de consumo es:

```
primitive → semantic → component → pattern → screen
```

Una pantalla nueva no debe introducir una nueva lógica visual si la decisión ya existe aguas arriba.

## 2. Identidad Visual Art AI

La identidad vigente deja atrás la antigua dirección dark-neon como lenguaje principal.

### Paleta base

- **Paper**: fondos cálidos y sobrios.
- **Ink**: jerarquía textual.
- **Clay / terracotta**: acción y marca principal.
- **Coral**: apoyo cálido.
- **Cyan** y **green**: acentos funcionales puntuales; nunca compiten con el CTA principal.

El modo oscuro existe como tema, no como identidad separada.

## 3. Tokens

Los tokens canónicos viven en `src/app/globals.css`.

### Primitivos

```css
--paper-50
--paper-100
--ink-950
--ink-700
--ink-500
--clay-700
--clay-500
--clay-300
--coral-500
--cyan-500
--green-500
```

### Semánticos

Código nuevo debe preferir:

```css
--color-bg
--color-surface
--color-surface-subtle
--color-surface-elevated
--color-text-primary
--color-text-secondary
--color-text-tertiary
--color-border-subtle
--color-border-default
--color-border-strong
--color-action-primary
--color-action-hover
--color-action-soft
--color-focus
```

No usar `#D94A2B` dentro de un componente. Usar `var(--color-action-primary)`.

### Espaciado: grid de 4pt

```
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128
```

Los aliases Tailwind son `ds-1` a `ds-10`.

### Radios

```
sm   8px
md  12px
lg  20px
xl  30px
full 999px
```

### Motion

```
fast   150ms
normal 250ms
slow   400ms
ease   cubic-bezier(.22,1,.36,1)
```

Las interfaces respetan `prefers-reduced-motion`.

## 4. Tipografía

Visual Art AI mantiene tres roles:

- **Sans**: interfaz y lectura.
- **Serif**: énfasis editorial y contraste expresivo.
- **Mono**: labels técnicos, metadata y microcopy funcional.

No mezclar familias por decoración. Cada familia representa un rol.

La escala base es:

```
xs     12
sm     14
body   16
lg     18
xl     24
2xl    32
3xl    48
```

Los headlines de marketing pueden usar escalas fluidas con `clamp()`, pero deben mantener la misma lógica de peso, tracking y contraste.

## 5. Componentes base

### Button

Variantes:

```
primary
secondary
ghost
destructive
```

Tamaños:

```
sm 36
md 44
lg 52
```

Estados obligatorios:

```
default
hover
pressed
focus
disabled
loading
```

Regla: una sola acción primaria dominante por bloque visual.

### Input

Estados obligatorios:

```
default
hover
focus
error
disabled
```

El control interactivo debe mantener al menos 44px de altura táctil cuando sea posible.

### Card

Una Card consume:

```
--card-bg
--card-border
--card-radius
--card-shadow
```

No se crea una sombra o radio nuevo para resolver una sola tarjeta.

### Navigation

La navegación comparte tokens de control, focus y motion. En móvil debe conservar el mismo orden semántico y no depender únicamente de hover.

## 6. Patterns

Visual Art AI estandariza al menos:

- Hero
- Platform/search proof
- Diagnostic
- Feature grid
- Sector grid
- Resource card
- Pricing
- FAQ / education block
- CTA
- Mobile conversion bar

Los patterns pueden cambiar de composición, pero no redefinir las foundations.

## 7. Accesibilidad

Mínimos del sistema:

- focus visible persistente;
- targets táctiles cercanos o superiores a 44px;
- contraste suficiente para texto y controles;
- no comunicar estado únicamente mediante color;
- soporte de reduced motion;
- labels explícitos en forms;
- navegación operable con teclado.

## 8. Convención para desarrollo

Nuevo código:

```tsx
className="bg-surface text-ink border-border-subtle rounded-md shadow-card"
```

o CSS:

```css
.component {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--card-radius);
}
```

Evitar:

```css
.component {
  background: #fff;
  color: #171715;
  border-radius: 17px;
  box-shadow: 0 18px 37px rgba(...);
}
```

## 9. Compatibilidad y migración

La aplicación antigua usaba variables con nombres `--neon-*`, `--bg-void` y componentes con nomenclatura neon. Esos nombres se mantienen temporalmente como aliases para no romper pantallas existentes.

**No deben usarse en componentes nuevos.**

La migración correcta es progresiva:

```
legacy alias → semantic token → component contract
```

## 10. Source of truth

- Producción estática: `site/index.html`
- Foundations de aplicación: `src/app/globals.css`
- Mapeo Tailwind: `tailwind.config.ts`
- Contratos tipados: `src/lib/design-system.ts`
- Este documento: `docs/design-system.md`

Si Figma se usa, sus variables deben copiar exactamente esta nomenclatura semántica. Diseño y código deben hablar el mismo idioma.
