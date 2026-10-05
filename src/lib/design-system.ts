/**
 * Visual Art AI Design System v7
 * Semantic contracts shared by app code. Primitive values live in CSS.
 */

export const tokens = {
  color: {
    canvas: "var(--color-canvas)",
    canvasWarm: "var(--color-canvas-warm)",
    surface: "var(--color-surface)",
    surfaceSubtle: "var(--color-surface-subtle)",
    surfaceRaised: "var(--color-surface-raised)",
    surfaceInverse: "var(--color-surface-inverse)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    textMuted: "var(--color-text-muted)",
    textInverse: "var(--color-text-inverse)",
    borderSubtle: "var(--color-border-subtle)",
    borderDefault: "var(--color-border-default)",
    borderStrong: "var(--color-border-strong)",
    actionPrimary: "var(--color-action-primary)",
    actionHover: "var(--color-action-primary-hover)",
    actionPressed: "var(--color-action-primary-pressed)",
    actionSoft: "var(--color-action-soft)",
    accent: "var(--color-accent)",
    accentHover: "var(--color-accent-hover)",
    accentSoft: "var(--color-accent-soft)",
    success: "var(--color-success)",
    successStrong: "var(--color-success-strong)",
    successSoft: "var(--color-success-soft)",
    focus: "var(--color-focus)",
  },
  type: {
    displayXL: "var(--type-display-xl)",
    displayLG: "var(--type-display-lg)",
    displayMD: "var(--type-display-md)",
    headingLG: "var(--type-heading-lg)",
    headingMD: "var(--type-heading-md)",
    headingSM: "var(--type-heading-sm)",
    bodyLG: "var(--type-body-lg)",
    body: "var(--type-body)",
    bodySM: "var(--type-body-sm)",
    caption: "var(--type-caption)",
    micro: "var(--type-micro)",
  },
  space: {
    1:"var(--space-1)",2:"var(--space-2)",3:"var(--space-3)",4:"var(--space-4)",5:"var(--space-5)",6:"var(--space-6)",
    8:"var(--space-8)",10:"var(--space-10)",12:"var(--space-12)",16:"var(--space-16)",20:"var(--space-20)",24:"var(--space-24)",32:"var(--space-32)",40:"var(--space-40)",
  },
  layout: {
    columns: 12,
    containerMax: "var(--container-max)",
    containerNarrow: "var(--container-narrow)",
    gutter: "var(--grid-gutter)",
    pageGutter: "var(--page-gutter)",
    sectionSpace: "var(--section-space)",
  },
  radius: {
    xs:"var(--radius-xs)",sm:"var(--radius-sm)",md:"var(--radius-md)",lg:"var(--radius-lg)",xl:"var(--radius-xl)",xxl:"var(--radius-2xl)",full:"var(--radius-pill)",
  },
  elevation: {
    xs:"var(--shadow-xs)",sm:"var(--shadow-sm)",md:"var(--shadow-md)",lg:"var(--shadow-lg)",brand:"var(--shadow-brand)",
  },
  motion: {
    instant:"var(--duration-instant)",fast:"var(--duration-fast)",normal:"var(--duration-normal)",slow:"var(--duration-slow)",scene:"var(--duration-scene)",
    standard:"var(--ease-standard)",emphasized:"var(--ease-emphasized)",
  },
} as const

export const componentContracts = {
  button: {
    variants:["primary","secondary","ghost","destructive"],
    sizes:["sm","md","lg"],
    states:["default","hover","pressed","focus","disabled","loading"],
    minimumInteractiveHeight:44,
  },
  input: {
    states:["default","hover","focus","error","disabled"],
    minimumInteractiveHeight:44,
  },
  disclosure: {
    states:["closed","open","focus"],
    animationPurpose:"reveal scope without navigation",
  },
  panel: {
    surface:tokens.color.surface,
    border:tokens.color.borderSubtle,
    radius:tokens.radius.xl,
    elevation:tokens.elevation.sm,
  },
} as const

export const patternContracts = {
  searchLab:["query","signalTrack","criteria","entityResult"],
  searchPulse:["query","platform","findabilityPrompt"],
  opportunityPath:["need","discover","understand","contact"],
  serviceExplorer:["problem","query","actions","benefit","responsibleNote"],
  caseCompare:["before","after","qualitativeNote"],
  auditScan:["findability","clarity","trust","conversion"],
  guideIndex:["topic","question","answerIntent"],
  faq:["question","plainLanguageAnswer"],
} as const

export const designRules = {
  palette:"Blue is primary. Coral is emphasis. Mint is reserved for positive state. Neutrals carry most surfaces.",
  grid:"Desktop compositions resolve to a 12-column grid. Mobile collapses intentionally, never by arbitrary widths.",
  typography:"Every text style maps to the type scale. Do not introduce one-off font sizes in product code.",
  motion:"Animation must explain state, relation or progress. Three.js and GSAP are progressive enhancements only.",
  accessibility:"Core meaning and actions must remain available with reduced motion or failed external motion libraries.",
} as const

export type ButtonVariant=(typeof componentContracts.button.variants)[number]
export type ButtonSize=(typeof componentContracts.button.sizes)[number]
export type ButtonState=(typeof componentContracts.button.states)[number]
export type PatternName=keyof typeof patternContracts
