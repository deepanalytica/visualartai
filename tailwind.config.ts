import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "var(--page-gutter)",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: {
          DEFAULT: "var(--color-surface)",
          subtle: "var(--color-surface-subtle)",
          raised: "var(--color-surface-raised)",
          inverse: "var(--color-surface-inverse)",
        },
        ink: {
          DEFAULT: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          inverse: "var(--color-text-inverse)",
        },
        action: {
          DEFAULT: "var(--color-action-primary)",
          hover: "var(--color-action-primary-hover)",
          pressed: "var(--color-action-primary-pressed)",
          soft: "var(--color-action-soft)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          soft: "var(--color-accent-soft)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          strong: "var(--color-success-strong)",
          soft: "var(--color-success-soft)",
        },
        "border-subtle": "var(--color-border-subtle)",
        "border-default": "var(--color-border-default)",
        "border-strong": "var(--color-border-strong)",

        /* Temporary compatibility aliases */
        "bg-void": "var(--bg-void)",
        "bg-surface": "var(--bg-surface)",
        "bg-elevated": "var(--bg-elevated)",
        "neon-cyan": "var(--neon-cyan)",
        "neon-magenta": "var(--neon-magenta)",
        "neon-violet": "var(--neon-violet)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      spacing: {
        "ds-1":"var(--space-1)","ds-2":"var(--space-2)","ds-3":"var(--space-3)","ds-4":"var(--space-4)",
        "ds-5":"var(--space-5)","ds-6":"var(--space-6)","ds-8":"var(--space-8)","ds-10":"var(--space-10)",
        "ds-12":"var(--space-12)","ds-16":"var(--space-16)","ds-20":"var(--space-20)","ds-24":"var(--space-24)",
      },
      fontSize: {
        "display-xl":["var(--type-display-xl)",{lineHeight:"var(--leading-display)",letterSpacing:"var(--tracking-display)"}],
        "display-lg":["var(--type-display-lg)",{lineHeight:"var(--leading-display)",letterSpacing:"var(--tracking-display)"}],
        "display-md":["var(--type-display-md)",{lineHeight:"var(--leading-display)",letterSpacing:"var(--tracking-display)"}],
        "heading-lg":["var(--type-heading-lg)",{lineHeight:"var(--leading-heading)",letterSpacing:"var(--tracking-heading)"}],
        "heading-md":["var(--type-heading-md)",{lineHeight:"var(--leading-heading)",letterSpacing:"var(--tracking-heading)"}],
        "body-lg":["var(--type-body-lg)",{lineHeight:"var(--leading-body)"}],
        body:["var(--type-body)",{lineHeight:"var(--leading-body)"}],
        "body-sm":["var(--type-body-sm)",{lineHeight:"1.6"}],
        caption:["var(--type-caption)",{lineHeight:"1.5"}],
      },
      borderRadius: {
        xs:"var(--radius-xs)",sm:"var(--radius-sm)",md:"var(--radius-md)",lg:"var(--radius-lg)",xl:"var(--radius-xl)","2xl":"var(--radius-2xl)",full:"var(--radius-pill)",
      },
      fontFamily: {
        sans:["var(--font-sans)"],display:["var(--font-sans)"],mono:["var(--font-mono)"],
      },
      boxShadow: {
        xs:"var(--shadow-xs)",sm:"var(--shadow-sm)",md:"var(--shadow-md)",lg:"var(--shadow-lg)",brand:"var(--shadow-brand)",
      },
      transitionTimingFunction: {
        standard:"var(--ease-standard)",emphasized:"var(--ease-emphasized)",
      },
      transitionDuration: {
        instant:"var(--duration-instant)",fast:"var(--duration-fast)",normal:"var(--duration-normal)",slow:"var(--duration-slow)",
      },
      keyframes: {
        "accordion-down":{from:{height:"0"},to:{height:"var(--radix-accordion-content-height)"}},
        "accordion-up":{from:{height:"var(--radix-accordion-content-height)"},to:{height:"0"}},
      },
      animation: {
        "accordion-down":"accordion-down var(--duration-normal) var(--ease-standard)",
        "accordion-up":"accordion-up var(--duration-normal) var(--ease-standard)",
      },
    },
  },
  plugins:[require("tailwindcss-animate")],
}

export default config
