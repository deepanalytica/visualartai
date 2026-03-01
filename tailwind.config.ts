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
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Design system tokens mapped to CSS vars
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
        "border-subtle": "var(--border-subtle)",
        "border-default": "var(--border-default)",
        "border-accent": "var(--border-accent)",
        "border-glow": "var(--border-glow)",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 229, 255, 0.25), 0 0 60px rgba(0, 229, 255, 0.08)",
        "glow-magenta": "0 0 20px rgba(224, 64, 251, 0.25), 0 0 60px rgba(224, 64, 251, 0.08)",
        "glow-violet": "0 0 20px rgba(124, 77, 255, 0.25), 0 0 60px rgba(124, 77, 255, 0.08)",
        "glow-card": "0 4px 24px rgba(0, 0, 0, 0.5), 0 0 1px rgba(0, 229, 255, 0.12)",
        deep: "0 20px 60px rgba(0, 0, 0, 0.56)",
        "neon-sm": "0 0 8px rgba(0, 229, 255, 0.4)",
      },
      backdropBlur: {
        xs: "2px",
        glass: "12px",
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
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 1px)" },
          "40%": { transform: "translate(2px, -1px)" },
          "60%": { transform: "translate(-1px, 2px)" },
          "80%": { transform: "translate(1px, -2px)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(0, 229, 255, 0.3)" },
          "50%": { borderColor: "rgba(0, 229, 255, 0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "fade-in": "fade-in 0.4s var(--ease-out) both",
        "slide-up": "slide-up 0.5s var(--ease-out) both",
        "scan-line": "scan-line 8s linear infinite",
        glitch: "glitch 0.3s steps(2) infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
