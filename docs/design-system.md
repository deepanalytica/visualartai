# Visual Art AI — Design System v7

## 1. Principle

Visual Art AI is not a collection of colorful sections. It is a system.

The brand idea remains:

**Signal → Discovery → Match**

The interface translates that into a controlled visual language: search queries, signal paths, entities, states, evidence and conversion.

The system is intentionally constrained. **Blue is the primary brand color, coral is the active accent, mint is reserved for positive state, and neutrals carry most of the interface.** Adding a new decorative brand color requires a design-system decision, not a local preference.

## 2. Architecture

```
primitive scales
→ semantic tokens
→ typography + spacing + grid
→ component contracts
→ pattern families
→ templates
→ motion grammar
```

Production is split into:

```
site/styles/tokens.css
site/styles/foundations.css
site/styles/components.css
site/styles/patterns.css
site/styles/motion.css
site/design-system.css
```

`design-system.css` is only the public entry point.

## 3. Color system

### Primitive scales

Brand:
- Blue 50–950
- Coral 50–900

State:
- Mint 50–700

Neutral:
- Neutral 0–950

### Semantic roles

Never use `--blue-600` in a component when `--color-action-primary` expresses the intent.

Core semantic tokens:

```
--color-canvas
--color-surface
--color-surface-subtle
--color-surface-raised
--color-surface-inverse

--color-text-primary
--color-text-secondary
--color-text-muted
--color-text-inverse

--color-border-subtle
--color-border-default
--color-border-strong

--color-action-primary
--color-action-primary-hover
--color-action-primary-pressed
--color-action-soft

--color-accent
--color-accent-hover
--color-accent-soft

--color-success
--color-success-strong
--color-success-soft
```

Usage:
- **Blue** = direction, links, actions, selected state.
- **Coral** = emphasis, interruption, attention, important transitions.
- **Mint** = confirmed / positive / matched state only.
- **Neutrals** = canvas, reading, structure.

## 4. Typography

Family:
- Manrope: all interface and marketing text.
- IBM Plex Mono: labels, metadata, status and technical microcopy.

Scale:

| Role | Token |
|---|---|
| Display XL | `--type-display-xl` |
| Display LG | `--type-display-lg` |
| Display MD | `--type-display-md` |
| Heading LG | `--type-heading-lg` |
| Heading MD | `--type-heading-md` |
| Heading SM | `--type-heading-sm` |
| Body LG | `--type-body-lg` |
| Body | `--type-body` |
| Body SM | `--type-body-sm` |
| Caption | `--type-caption` |
| Micro / label | `--type-micro` |

Do not introduce ad-hoc `17px`, `23px`, etc. New roles must enter the scale first.

## 5. Spacing

4px foundation:

`1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40`

These map to `--space-*` tokens. Components use the scale; sections use `--section-space`.

## 6. Grid

Desktop uses a **12-column grid**.

```
--container-max: 80rem
--grid-columns: 12
--grid-gutter: clamp(1rem, 2vw, 1.75rem)
--page-gutter: clamp(1rem, 4.6vw, 3.5rem)
```

Examples:
- Hero: copy 7 / demo 5.
- What we do: proposition 8 / explanation 4.
- Service Explorer: navigation 4 / live stage 8.
- Case: narrative 5 / comparison 7.
- Diagnostic: context 5 / form 7.

Mobile is a deliberate single-column composition, not a shrunk desktop layout.

## 7. Hierarchy

A section has one dominant idea.

Hierarchy order:
1. eyebrow / context;
2. display headline;
3. supporting argument;
4. interactive or evidence pattern;
5. CTA.

Body copy is never allowed to compete visually with the headline. Metadata never competes with body copy.

## 8. Component contracts

Buttons, form controls, disclosures, navigation, panels and status chips consume semantic tokens.

Minimum interactive target: **44px**.

States that must exist where relevant:
- default;
- hover;
- pressed;
- focus;
- disabled;
- loading.

## 9. Pattern families

- **Search Lab** — query → signals → relevant result.
- **Search Pulse** — rotating demand examples.
- **Opportunity Path** — need → discover → understand → contact.
- **Service Explorer** — problem → intervention → benefit.
- **Case Compare** — qualitative before / after.
- **Audit Scan** — findability / clarity / trust / conversion.
- **Guide Index** — useful questions, not generic SEO filler.
- **FAQ** — plain-language objection handling.

Patterns may look different because their jobs differ, but foundations remain shared.

## 10. Motion grammar

Motion is not decoration.

Use motion for:
- entrance hierarchy;
- state change;
- continuity between steps;
- cause/effect;
- spatial relationship.

Timing:
- instant: 100ms
- fast: 180ms
- normal: 280ms
- slow: 520ms
- scene: 900ms

Easing:
- standard: `cubic-bezier(.2,.8,.2,1)`
- emphasized: `cubic-bezier(.16,1,.3,1)`

### GSAP

GSAP is loaded only on the homepage and only as progressive enhancement. It orchestrates hero hierarchy, scroll reveals and state transitions. The page remains complete without it.

### Three.js

Three.js renders a subtle Search Signal field behind the hero. Rules:
- low opacity;
- blue/coral/neutral only;
- low node count;
- DPR capped at 1.5;
- pauses when the hero is off screen;
- disabled for reduced motion;
- skipped on smaller screens.

No 3D object may interfere with reading or become the focal product message.

## 11. Accessibility and performance

- `prefers-reduced-motion` disables non-essential movement.
- External motion libraries are optional; content cannot depend on them.
- Focus state must remain visible.
- Color never carries meaning alone.
- Core CTA targets are ≥44px.
- WebGL uses low-power mode and a capped pixel ratio.
- Avoid scroll-jacking and custom cursors.

## 12. Content and findability

The design system supports Google and AI discoverability through clear information architecture rather than keyword decoration.

Production includes:
- semantic headings;
- service copy in natural language;
- FAQ;
- JSON-LD;
- canonical + hreflang;
- sitemap;
- robots;
- llms.txt;
- article schema;
- internal links;
- responsible claims.

## 13. Source of truth

- Static tokens: `site/styles/tokens.css`
- Foundations: `site/styles/foundations.css`
- Components: `site/styles/components.css`
- Patterns: `site/styles/patterns.css`
- Motion: `site/styles/motion.css`
- Brand motion: `site/brand/visual-art-ai-design-system.css`
- App tokens: `src/styles/design-tokens.css`
- Tailwind mapping: `tailwind.config.ts`
- TypeScript contracts: `src/lib/design-system.ts`
