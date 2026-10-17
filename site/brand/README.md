# Visual Art AI — Brand / Motion Layer v7

The public design language is governed by semantic tokens and pattern contracts in `site/styles/`.

## Palette discipline

Visible brand colors are intentionally limited:
- **Action Blue**: navigation, selected state, direction and CTA.
- **Coral Accent**: emphasis, interruption and meaningful transition.
- **Mint**: positive / matched state only.
- **Neutral scale**: the majority of surfaces, text and structure.

Do not introduce yellow, violet, pink, orange or other decorative brand colors locally.

## Motion discipline

The logo arc/dot, GSAP choreography and Three.js hero field all consume the same semantic system. Motion must explain hierarchy, state, relation or progress.

The Three.js field is progressive enhancement: sparse, low-opacity, low-power, DPR-capped, paused outside the viewport, disabled for reduced motion and skipped on smaller screens.

## Manual oficial 2026 — logotipo en producción

El isotipo circular animado de la versión anterior fue sustituido por la **V inclinada y punto azul** de la lámina oficial proporcionada por la marca. El logotipo es una reconstrucción vectorial trazada de esa imagen (no disponemos del archivo maestro editable de la tipografía personalizada).

- `site/brands/visual-art-ai-official-light.svg`: logotipo principal oscuro sobre blanco con lema «VISIBILIDAD / QUE GENERA / CLIENTES».
- `site/brands/visual-art-ai-official-dark.svg`: variante blanca para fondos grafito.
- `site/brands/visual-art-ai-official-compact.svg`: composición apilada sin el lema para cabeceras estrechas.
- `site/brands/visual-art-ai-official-symbol.svg`: isotipo vectorial.
- `site/brands/visual-art-ai-logo.svg`: isotipo en placa grafito para favicon/metadata.
- `site/brands/visual-art-ai-brand.svg`: alias del logotipo principal usado por las páginas de servicios y empresa.

**Importante:** para aplicaciones de impresión de gran formato se recomienda sustituir este trazado a partir de imagen por el SVG/AI/PDF vectorial original, si se facilita. No introducir nuevas interpretaciones de la V ni volver a usar el icono circular.

La interfaz conserva el subtítulo editorial «Visibilidad en la nueva búsqueda» por razones comerciales; la firma gráfica del manual usa «Visibilidad que genera clientes».
