---
name: Visual Art AI public site
description: Action Blue, navy, and white with a focused editorial accent.
colors:
  action-primary: "#2f6bff"
  action-primary-hover: "#2454d8"
  action-primary-pressed: "#1e45ad"
  action-soft: "#f2f6ff"
  accent: "#f24d5d"
  accent-readable: "#b62438"
  success-strong: "#15775d"
  success-soft: "#effcf8"
  canvas: "#f8fafc"
  canvas-warm: "#fbfaf8"
  surface: "#ffffff"
  surface-subtle: "#f1f5f9"
  surface-inverse: "#08111f"
  text-secondary: "#334155"
  text-muted: "#64748b"
  border-subtle: "#e2e8f0"
  border-default: "#cbd5e1"
  focus: "#9fbcff"
typography:
  display:
    fontFamily: 'Manrope, Inter, Arial, system-ui, sans-serif'
    fontSize: 'clamp(4rem, 7.1vw, 7.35rem)'
    fontWeight: 800
    lineHeight: 0.84
    letterSpacing: '-.075em'
  display-accent:
    fontFamily: 'Instrument Serif, Georgia, Times New Roman, serif'
    fontWeight: 400
    letterSpacing: '-.045em'
  headline:
    fontFamily: 'Manrope, Inter, Arial, system-ui, sans-serif'
    fontSize: 'clamp(2rem, 4.2vw, 4rem)'
    fontWeight: 750
    lineHeight: 1.08
    letterSpacing: '-.04em'
  title:
    fontFamily: 'Manrope, Inter, Arial, system-ui, sans-serif'
    fontSize: 'clamp(1.45rem, 2.1vw, 1.9rem)'
    fontWeight: 750
    lineHeight: 1.18
    letterSpacing: '-.03em'
  body:
    fontFamily: 'Manrope, Inter, Arial, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.68
  label:
    fontFamily: 'Manrope, Inter, Arial, system-ui, sans-serif'
    fontSize: '.75rem'
    letterSpacing: '.08em'
  price:
    fontFamily: 'Manrope, Inter, Arial, system-ui, sans-serif'
    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)'
rounded:
  xs: '.375rem'
  sm: '.625rem'
  md: '.875rem'
  lg: '1.25rem'
  xl: '1.75rem'
  2xl: '2.25rem'
  pill: '999px'
spacing:
  1: '.25rem'
  2: '.5rem'
  3: '.75rem'
  4: '1rem'
  5: '1.25rem'
  6: '1.5rem'
  8: '2rem'
  12: '3rem'
  16: '4rem'
components:
  button-primary:
    backgroundColor: '{colors.action-primary}'
    textColor: '{colors.surface}'
    rounded: '{rounded.md}'
    height: '3.25rem'
    padding: '0 1.25rem'
  button-primary-hover:
    backgroundColor: '{colors.action-primary-hover}'
    textColor: '{colors.surface}'
  button-primary-active:
    backgroundColor: '{colors.action-primary-pressed}'
    textColor: '{colors.surface}'
  button-secondary:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.surface-inverse}'
    rounded: '{rounded.md}'
    height: '3.25rem'
    padding: '0 1.25rem'
  button-whatsapp:
    backgroundColor: '{colors.success-strong}'
    textColor: '{colors.surface}'
    rounded: '{rounded.md}'
  input:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.surface-inverse}'
    rounded: '{rounded.md}'
    height: '3.25rem'
    padding: '.8125rem .875rem'
  query-chip-active:
    backgroundColor: '{colors.action-primary}'
    textColor: '{colors.surface}'
    rounded: '{rounded.pill}'
    height: '2.75rem'
    padding: '0 .72rem'
  diagnosis-panel:
    backgroundColor: '#f7f9fc'
    rounded: '{rounded.lg}'
    padding: '2rem'
---

# Design System: Visual Art AI public site

## Overview

**Creative North Star: "Clear Digital Signals"**

This name describes the implemented public site's signal motif and clear hierarchy. Action Blue controls, dark navy sections, white reading surfaces, and spacious rows make the next step visible. Rounded demonstrations illustrate the services alongside direct, readable copy.

This record covers the static site in `site/`, including its home and editorial styles. It does not specify the separate Next application. It is a scan of the built interface, not a product specification; no PRODUCT.md exists. The source tokens are in `site/styles/tokens.css`; component and page overrides remain authoritative for exact selectors. Homepage CSS is assembled into `site/home-core.css`.

**Key Characteristics:**

- Bold Manrope hierarchy with an italic Instrument Serif hero accent.
- Blue actions, navy section backgrounds, and restrained coral markers.
- Spacious sections, readable content rows, and rounded illustrative surfaces.
- Visible hover, focus, selection, and disclosure states.

## Colors

The palette pairs bright Action Blue with very dark navy and cool white surfaces. Frontmatter values are resolved from the site's semantic tokens; use semantic CSS variables in implementation.

### Primary

- **Action Blue:** primary actions, active search chips, hero emphasis, and signal diagrams.
- **Action Blue Hover / Pressed:** darker interaction states and blue links.
- **Action Soft:** selected rows and quiet blue surfaces.

### Secondary

- **Signal Coral:** small signal dots and decorative accents. **Readable Coral** is the darker treatment for small tier labels and light-surface metadata.
- **Deep Mint:** WhatsApp actions and affirmative checkmarks. **Soft Mint** supports positive example surfaces.

### Neutral

- **Navy Ink:** main text, dark service sections, and footer surfaces.
- **White / Cool Canvas / Warm Canvas:** reading surfaces and subtle scene changes.
- **Slate Secondary / Muted:** supporting copy and secondary metadata.
- **Subtle / Default Border:** dividing rules and control edges. **Focus Blue:** keyboard focus tint.

**The Readable Accent Rule.** Use Readable Coral for small coral text on light surfaces; bright Signal Coral remains a decorative accent.

## Typography

**Display and Body Font:** Manrope, with Inter, Arial, and system sans fallbacks.

**Editorial Accent:** Instrument Serif, with Georgia and Times New Roman fallbacks. The homepage hero uses italic; existing case illustration text and editorial pull quotes retain serif treatments.

**Character:** Bold, tightly spaced sans headings establish hierarchy. The hero's italic serif line gives the identity a distinct voice. UI labels, price numerals, and article headings use the shared sans family. IBM Plex Mono remains in legacy editorial metadata; the homepage aliases its mono token to Manrope.

### Hierarchy

- **Display:** compact, heavy hero title; the accent is a separate block in blue. Responsive overrides reduce the title on mobile.
- **Headline:** section titles use the frontmatter role. At widths below (600px), the refined section headings are (2.25rem). The navy service introduction has its own larger scale, `clamp(2.5rem, 5.5vw, 5rem)`.
- **Title:** plan and story titles are bold sans with tight tracking. Service row titles use `clamp(1.8rem, 3vw, 2.75rem)`.
- **Body:** home copy commonly uses (1rem) with line heights (1.6–1.7) and widths up to (60ch). Article paragraphs use (1.08rem / 1.82), then (1rem / 1.72) below (45rem).
- **Label:** supporting labels are smaller than body text; refined navigation, links, and buttons are (.875rem).
- **Price:** large sans numerals with tabular number alignment; keep currency and qualifying labels subordinate.

**The Shared Sans Rule.** Use Manrope for interface labels, section headings, article headings, and prices. Preserve the implemented serif accent and quotation treatments without spreading them into additional UI roles.

## Layout

A centered shell has a maximum width of (80rem), a narrow reading container of (58rem), and fluid side gutters `clamp(1rem, 4.6vw, 3.5rem)`. Foundation mobile gutters become (.875rem) below (45rem). Spacing follows the existing four pixel base; page sections use `clamp(5rem, 8vw, 8rem)` and reduce to (4.6rem) below (48rem).

The desktop hero and case comparison use a twelve column grid. They stack below (70rem). Pricing moves from three columns to two below (70rem), then one below (48rem). The problem selector pairs three clear rows with a response panel and stacks below (900px). Service rows pair copy with a visual example using (1fr / 1.15fr), a (4rem) gap, and dividing rules; below (600px), each row stacks with a (1.5rem) gap.

The current homepage presents six services through three visual rows. Each demonstration retains its illustrative label. This is a documented page pattern, not a requirement for every future page. Section titles carry the hierarchy directly; redundant introductory eyebrows were removed from the refined sections.

## Elevation & Depth

White and softly tinted panels sit against flat reading surfaces; navy sections provide stronger tonal contrast. Soft shadows raise the hero illustration, case comparison, pricing cards, and translucent form. The diagnosis panel is deliberately flat. Subtle radial blue and coral light appears in the existing hero and dark sections.

The sidecar records exact shadows and motion values. Standard button hover lifts by (2px); pricing cards lift by (5px). Reduced motion rules suppress animated decorative treatments and selected transitions. Preserve the supplied reduced motion behavior when extending components.

## Shapes

Controls use gently rounded corners through the medium radius. Larger demonstrations and panels have broader curves, commonly (1.25rem–2rem); pricing cards use (1.6rem). Search controls and selected badges are pill shaped. Thin slate borders and horizontal rules define groups. Chat examples use asymmetric bubble corners to distinguish sender and reply.

## Components

### Buttons

Confident filled actions paired with quiet outlined alternatives. Primary controls use Action Blue and white text; secondary controls use white, Navy Ink, and a Default Border. The shared control minimum height is (3.25rem), with (1.25rem) horizontal padding. Hover changes primary blue and lifts the control; pressed state uses the darker primary tone. Keyboard focus uses the existing focus ring. WhatsApp controls use Deep Mint. Some homepage buttons retain uppercase styling; plan and WhatsApp actions use sentence case.

### Chips

The hero's query selector uses rounded bordered controls with an active blue fill and white text. Active state is explicit. Preserve readable labels and the minimum height of (2.75rem).

### Cards / Containers

Pricing uses three comparable cards with prominent sans prices, subdued qualifying text, an expandable scope detail, and a bottom action. The middle card has a soft blue background and recommendation badge. Tier labels use Readable Coral. Existing price content is $89.000, $249.000, and $690.000 CLP; these amounts are page content, not design tokens.

### Inputs / Fields

The diagnostic form contains a select, textarea, and email field. Fields have a white surface, Default Border, medium radius, and (.8125rem .875rem) padding. Focus switches the border to Action Blue and adds the blue focus ring. The textarea has a (7.5rem) minimum height and vertical resize. Inside the dark form panel, white fields retain a slightly translucent background. No custom error or disabled visual state is established here.

### Navigation

The sticky white translucent top bar has a thin bottom rule. Desktop links receive a pale blue background and darker blue text on hover. Below (64rem), the desktop links give way to a menu button. At narrow widths the menu becomes an inset rounded sheet with large separated links. The brand uses a circular signal symbol with blue arc and coral dot; reduced motion freezes its animation.

### Problem Selector and Illustrations

Three full row buttons pair a numbered cue, plain language problem, and short service context. The selected row has a pale blue wash and blue text; the adjacent panel updates its heading, explanation, checked deliverables, and action. Keep the existing pressed-state attributes and live announcement semantics.

Service demonstrations show search, a service page, and a WhatsApp conversation. Case comparison uses a range control and clipped before/after surfaces. They are illustrative UI, not evidence of measured business outcomes.

## Do's and Don'ts

### Do:

- **Do** use semantic CSS tokens for color, spacing, radius, and interaction states.
- **Do** use Manrope for clear headings, interface text, and price numerals.
- **Do** preserve visible focus, active states, and reduced motion behavior.
- **Do** keep illustrative examples labeled and their text readable at mobile widths.

### Don't:

- **Don't** use bright Signal Coral for small text on light surfaces; use Readable Coral.
- **Don't** add serif styling to every heading or UI label.
- **Don't** add redundant eyebrows to sections whose titles already provide context.
- **Don't** present illustrative diagrams or interface examples as measured client results.