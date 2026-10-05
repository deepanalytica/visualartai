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
      padding: "2rem",
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        canvas: "var(--color-bg)",
        surface: {
          DEFAULT: "var(--color-surface)",
          subtle: "var(--color-surface-subtle)",
          elevated: "var(--color-surface-elevated)",
        },
        ink: {
          DEFAULT: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
        },
        brand: {
          300: "var(--blue-300)",
          500: "var(--blue-500)",
          600: "var(--blue-600)",
          700: "var(--blue-700)",
          800: "var(--blue-800)",
          red: "var(--red-500)",
          yellow: "var(--yellow-500)",
          orange: "var(--orange-500)",
          violet: "var(--violet-500)",
          pink: "var(--pink-500)",
          cyan: "var(--cyan-500)",
          mint: "var(--mint-500)",
        },
        signal: {
          positive: "var(--color-signal-positive)",
          info: "var(--color-signal-info)",
          warning: "var(--color-signal-warning)",
        },
        action: {
          DEFAULT: "var(--color-action-primary)",
          hover: "var(--color-action-hover)",
          soft: "var(--color-action-soft)",
        },
        "border-subtle": "var(--color-border-subtle)",
        "border-default": "var(--color-border-default)",
        "border-strong": "var(--color-border-strong)",

        // Deprecated aliases kept until old components are migrated.
        "bg-void": "var(--bg-void)",
        "bg-surface": "var(--bg-surface)",
        "bg-elevated": "var(--bg-elevated)",
        "bg-overlay": "var(--bg-overlay)",
        "neon-cyan": "var(--neon-cyan)",
        "neon-cyan-dim": "var(--neon-cyan-dim)",
        "neon-magenta": "var(--neon-magenta)",
        "neon-magenta-dim": "var(--neon-magenta-dim)",
        "neon-violet": "var(--neon-violet)",
        "neon-violet-dim": "var(--neon-violet-dim)",
        "neon-amber": "var(--neon-amber)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-accent": "var(--text-accent)",

        // shadcn compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      spacing: {
        "ds-1": "var(--space-1)",
        "ds-2": "var(--space-2)",
        "ds-3": "var(--space-3)",
        "ds-4": "var(--space-4)",
        "ds-5": "var(--space-5)",
        "ds-6": "var(--space-6)",
        "ds-7": "var(--space-7)",
        "ds-8": "var(--space-8)",
        "ds-9": "var(--space-9)",
        "ds-10": "var(--space-10)",
      },
      borderRadius: {
        xs: "var(--radius-sm)",
        sm: "var(--radius-md)",
        md: "var(--radius-lg)",
        lg: "var(--radius-xl)",
        full: "var(--radius-pill)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        card: "var(--elevation-1)",
        elevated: "var(--elevation-2)",
        deep: "var(--shadow-deep)",
        "glow-cyan": "var(--glow-cyan)",
        "glow-magenta": "var(--glow-magenta)",
        "glow-violet": "var(--glow-violet)",
        "glow-card": "var(--glow-card)",
      },
      backdropBlur: {
        xs: "2px",
        glass: "var(--glass-blur)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-neon": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "fade-in": "fade-in 0.4s var(--ease-out) both",
        "slide-up": "slide-up 0.5s var(--ease-out) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
