# Visual Art AI — Design System v11

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
- Manrope: UI, navigation, body and controls.
- Instrument Serif: selective editorial emphasis, emotional contrast and high-impact statements.
- IBM Plex Mono: labels, metadata, status and technical microcopy.

Rule: serif is scarce. It is not the default heading face. Scarcity gives it meaning.

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


## 14. Homepage v11 — Senior UX operating model

The homepage is no longer a catalogue of services. It is a seven-scene commercial journey:

1. **Search** — one dominant visual idea: a query becoming understandable context.
2. **Recognize the problem** — the visitor selects the pain that resembles their situation.
3. **Control room** — we reveal only the layers relevant to that pain.
4. **Evidence** — one before/after case with direct manipulation.
5. **Offer** — one free entry point plus three paid levels.
6. **Journal** — three curated readings, not a wall of cards.
7. **Diagnostic** — the final conversion surface.

### Senior rules

Before adding an element, answer:

1. What user problem does it solve?
2. What must the visitor understand here?
3. What is the dominant element in this viewport?
4. What can be removed?

If those answers are weak, the element does not enter production.

### One major idea per viewport

No section may simultaneously introduce:
- a new product metaphor,
- a second interactive demo,
- a second CTA hierarchy,
- and a large content grid.

Every scene has one visual protagonist and one commercial job.

### Progressive disclosure

Do not expose the entire service catalogue on first contact.

The visitor first identifies a problem. The interface then reveals:
- the likely friction;
- the three layers we would inspect;
- the recommended first step.

This is implemented by the v11 Problem Selector.

### Motion grammar

Homepage v11 permits four motion purposes only:

- **Reveal** — new information enters hierarchy.
- **Transform** — query or state changes.
- **Connect** — relationship between signals becomes visible.
- **Respond** — hover, focus, selection or direct manipulation.

No decorative looping animation is allowed unless it communicates system state.

### Premium art direction

Premium is defined as:
- stronger hierarchy;
- controlled contrast;
- asymmetric composition;
- selective glass;
- restrained gradients;
- fewer cards;
- more whitespace;
- visual scenes with different rhythm;
- serif used as editorial tension, not ornament.

Premium is **not** defined as more effects.

### Interaction patterns in v11

- **Search Scene** — rotating demand examples within one stable visual concept.
- **Problem Selector** — user declares the pain; diagnosis is progressively disclosed.
- **Control Room** — three-layer system view that updates from the selected problem.
- **Case Slider** — direct-manipulation before/after comparison.
- **Offer Ladder** — free diagnosis, accessible entry, sprint, full system.
- **Journal Curation** — one lead story plus two secondary readings.

### Accessibility

Homepage v11 additionally requires:
- skip link;
- keyboard-operable tab groups with arrow navigation;
- visible focus;
- reduced-motion support;
- range input for the before/after comparison;
- no information conveyed by color alone;
- core targets ≥44px where applicable.

### Performance constraints

- Three.js remains hero-only and progressive.
- WebGL does not carry essential information.
- All interaction works without GSAP.
- No scroll-jacking.
- No custom cursor.
- No second 3D scene.
- No large decorative media below the fold unless it earns its cost.

### Commercial hierarchy

The homepage must answer these questions in order:

1. Is this relevant to my problem?
2. Do they understand the problem?
3. Do they have a coherent way to solve it?
4. Is there evidence of judgment?
5. What does it cost to start?
6. Can I learn more without talking to someone?
7. How do I begin?

That sequence takes precedence over showing the complete service inventory.
