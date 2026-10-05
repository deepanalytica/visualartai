/**
 * Visual Art AI Search Signal Design System v4
 * Contracts only. Raw visual values live in CSS primitives.
 */

export const tokens = {
  color: {
    background: "var(--color-bg)",
    surface: "var(--color-surface)",
    surfaceSubtle: "var(--color-surface-subtle)",
    surfaceElevated: "var(--color-surface-elevated)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    textTertiary: "var(--color-text-tertiary)",
    borderSubtle: "var(--color-border-subtle)",
    borderDefault: "var(--color-border-default)",
    borderStrong: "var(--color-border-strong)",
    actionPrimary: "var(--color-action-primary)",
    actionHover: "var(--color-action-hover)",
    actionSoft: "var(--color-action-soft)",
    accent: "var(--color-accent)",
    accentSoft: "var(--color-accent-soft)",
    highlight: "var(--color-highlight)",
    highlightSoft: "var(--color-highlight-soft)",
    signalPositive: "var(--color-signal-positive)",
    signalInfo: "var(--color-signal-info)",
    signalWarning: "var(--color-signal-warning)",
    focus: "var(--color-focus)",
  },
  radius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    full: "var(--radius-pill)",
  },
  elevation: {
    card: "var(--elevation-1)",
    elevated: "var(--elevation-2)",
  },
  motion: {
    fast: "var(--duration-fast)",
    normal: "var(--duration-normal)",
    slow: "var(--duration-slow)",
    easeOut: "var(--ease-out)",
  },
} as const

export const componentContracts = {
  button: {
    variants: ["primary", "secondary", "ghost", "destructive"],
    sizes: ["sm", "md", "lg"],
    states: ["default", "hover", "pressed", "focus", "disabled", "loading"],
    minimumInteractiveHeight: 44,
  },
  input: {
    states: ["default", "hover", "focus", "error", "disabled"],
    minimumInteractiveHeight: 44,
  },
  panel: {
    surface: tokens.color.surface,
    border: tokens.color.borderSubtle,
    radius: tokens.radius.lg,
    elevation: tokens.elevation.card,
  },
} as const

export const patternContracts = {
  searchLab: ["query", "signalTrack", "criteria", "entityResult"],
  signalPath: ["need", "discover", "understand", "contact"],
  serviceLanes: ["category", "benefit", "explanation", "signal"],
  visibilityTrace: ["before", "after", "evidenceNote"],
  auditScan: ["findability", "clarity", "trust", "conversion"],
  guideIndex: ["topic", "question", "answerIntent"],
} as const

export type ButtonVariant = (typeof componentContracts.button.variants)[number]
export type ButtonSize = (typeof componentContracts.button.sizes)[number]
export type ButtonState = (typeof componentContracts.button.states)[number]
export type PatternName = keyof typeof patternContracts
