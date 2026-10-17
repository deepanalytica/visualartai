# Visual Art AI · Sistema de diseño web público (v1)

**Estado:** candidato a revisión · **Responsable:** Visual Art AI · **Ámbito:** `site/` (GitHub Pages) · **Fecha:** 2026-10-16

## 0. Decisión arquitectónica

El repositorio contiene **dos aplicaciones diferentes**:
- `site/`: sitio público **HTML/CSS/JavaScript**, publicado por `.github/workflows/pages.yml`.
- `src/`: aplicación Next.js con academia, administración y pagos; **no** es la fuente del despliegue de GitHub Pages.

Para mejorar la web comercial no migramos de framework, no mezclamos código React con una web estática ni añadimos animaciones remotas. Este paquete es **incremental y reversible**.

## 1. Fundamentos / Foundations

Fuente canónica: `site/styles/tokens.css`; los estilos de la portada se compilan en `site/home-core.css` mediante `scripts/build-home-css.mjs`. La capa de mejora es `site/styles/experience-v1.css` y se carga después del CSS compilado.

| Dimensión | Regla |
|---|---|
| Color | Azul de acción; coral como señal acotada; mint solo para estados positivos; superficies neutras. |
| Tipografía | Manrope para interfaz y títulos; Instrument Serif para énfasis editorial; IBM Plex Mono para metadatos. |
| Retícula | 12 columnas; anchura máxima `--container-max`; espaciado de 4 px. |
| Radio | `--radius-xs/sm/md/lg/xl/2xl/pill`. |
| Elevación | `--shadow-xs/sm/md/lg/brand`. |
| Movimiento | `--duration-fast/normal/slow`; `--ease-standard/emphasized`; respetar `prefers-reduced-motion`. |

**Prohibido:** valores hexadecimales locales en componentes nuevos, agregar color decorativo por conveniencia, utilizar animación si no comunica jerarquía/estado/progreso.

## 2. Design tokens: tres capas

1. **Primitivos:** `--blue-600`, `--neutral-950`, `--space-4`. Solo los define el sistema.
2. **Semánticos:** `--color-action-primary`, `--color-text-primary`, `--color-border-default`. Los usan las páginas y los componentes.
3. **Componentes:** `--button-primary-bg`, `--control-height-lg`, `--panel-border`, `--focus-ring`. Permiten cambiar una categoría sin reescribir los componentes.

**Ejemplo:** un botón primario usa `var(--button-primary-bg)`, no `#2f6bff`.

## 3. Componentes principales

| Componente | Contrato | Estados obligatorios |
|---|---|---|
| `.vaa-brand` | Logotipo tipográfico con **Visual** protagonista y ART AI subordinado | normal, hover, foco |
| `.button` | Acción; un CTA principal por grupo relevante | normal, hover, active, focus-visible, disabled |
| `.v11-query-tabs button` | Cambio explícito de ejemplo ilustrativo | `aria-pressed`, normal, foco |
| `.v11-pricing article` | Comparación de paquetes | normal, hover en puntero fino, foco dentro |
| `.diagnostic-form` | Captación comercial sin backend | campo vacío, válido/inválido, foco, estado informativo |
| `.mobile-menu` | Navegación móvil | abierto/cerrado, Escape, devolución y trampa de foco |

No presentar como reseñas ni resultados medidos los ejemplos de Google/ChatGPT. La web explica claramente que son **simulaciones**.

## 4. Variantes y accesibilidad

- Las acciones primarias son azul sobre blanco; alternativa secundaria delineada y opción de correo como acción de texto.
- Objetivo táctil mínimo de **44 × 44 px** para controles interactivos.
- Teclado: tabulación lógica, foco visible, navegación de menú con Escape.
- Tipografía: escalado fluido sin cortes a 320–390 px; no depender solo de color.
- Contraste objetivo: **WCAG AA** (4,5:1 texto normal; 3:1 texto grande y elementos gráficos indispensables). Requiere medición automatizada y visual antes de liberar.
- Reducir movimiento si el usuario lo solicita; no ocultar contenido sin alternativa.

## 5. Movimiento y librerías

**GSAP:** útil cuando exista una coreografía de varias etapas que no pueda expresarse bien mediante CSS/WAAPI. **Lenis:** no se introduce por defecto; el scroll nativo es predecible y compatible con accesibilidad. **React Bits:** **no** se carga en la web pública estática porque requiere React. Podría reutilizarse en el proyecto Next.js, con revisión de licencia y de bundle.

Implementación actual:
- Canvas de partículas: desactivado en pantallas de menos de 768 px, `prefers-reduced-motion` y conexiones con `saveData`; se detiene fuera del viewport o al ocultar la pestaña.
- Ejemplos de búsqueda: el visitante elige los sectores y puede activar la reproducción. No hay rotación automática al abrir la página.
- Interacciones de botones/tarjetas: duración y aceleración derivadas de tokens.

## 6. Captación y honestidad del flujo

El hosting GitHub Pages no ofrece backend de formularios. Por eso:
1. El visitante completa objetivo, contexto y email.
2. Elige **continuar en WhatsApp** o **preparar correo**.
3. El sitio abre la aplicación elegida con el mensaje precargado.
4. El mensaje **no se considera enviado** hasta que el visitante pulse Enviar en esa aplicación.

Las rutas usan el contacto comercial ya establecido. No se envían respuestas automáticamente al servidor ni se presenta el intento como una conversión confirmada.

Instrumentación existente: `form_start`, `lead_intent`, `whatsapp_click`. Verificar consentimiento de analítica y medir por separado solicitud real recibida versus clic.

## 7. Entrega, QA y criterios de aceptación

**Pruebas automatizadas:** `node scripts/check-public-design.mjs`, `node --check site/site.js`, `node --check site/home-v11.js`. El workflow de revisión ejecuta esas comprobaciones en PR.

**Matriz de revisión manual:**

| Área | Verificar |
|---|---|
| Desktop 1440 / 1024 | Marca, barra, hero, tarjetas de búsqueda, precios y diagnóstico sin solapamientos. |
| Tablet 768 | Menú, ejemplo de búsqueda, cuadrícula y barras sin desplazamiento horizontal. |
| Móvil 390 / 360 / 320 | Tipografía de marca, CTA visible, controles táctiles, formulario completo. |
| Teclado | Tab, Shift+Tab, Enter, Escape, foco, selector de categorías y apertura/cierre de menú. |
| Accesibilidad | Contrastes WCAG AA, `prefers-reduced-motion`, 200 % zoom, lector de pantalla. |
| Rendimiento | Sin canvas móvil; canvas detenido al salir del hero; sin nuevas peticiones de JS/CSS de terceros. |
| Conversión | WhatsApp y correo se abren con los datos correctos; no se anuncia “solicitud enviada”. |
| SEO | Title, canonical, JSON-LD, H1 y rutas de artículos intactos. |

**Gate de publicación:** revisar visualmente en móvil/desktop y confirmar que los formularios abren WhatsApp y el cliente de correo correctamente. No fusionar si hay regresiones.

## 8. Gobierno del sistema

Toda variante nueva debe explicar propósito, estados, tokens usados y accesibilidad. Versionar el contrato, crear notas de cambio y tener un responsable de aprobación. Evitar “40 componentes el primer día”: consolidar primero estos componentes visibles, después ampliar donde exista demanda de producto.

### Registro de cambios

- **v1 (2026-10-16):** marca tipográfica, estados semánticos, tratamiento de acciones, rendimiento de hero y envío comercial explícito sin backend.
