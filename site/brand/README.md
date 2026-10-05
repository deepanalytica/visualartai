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
