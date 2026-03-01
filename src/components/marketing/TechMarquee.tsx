"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/animations/ScrollReveal"

// ── SVG monocromáticos — paths extraídos de Simple Icons + custom ──────────
const IconAnthropic = () => (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-label="Anthropic / Claude">
        <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
    </svg>
)

const IconOpenAI = () => (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-label="OpenAI / ChatGPT">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
)

const IconGemini = () => (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-label="Google Gemini">
        <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
    </svg>
)

const IconVercel = () => (
    <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-label="Vercel">
        <path d="m12 1.608 12 20.784H0Z" />
    </svg>
)

const IconSupabase = () => (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-label="Supabase">
        <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" />
    </svg>
)

const IconGitHub = () => (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-label="GitHub">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
)

const IconNotion = () => (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-label="Notion">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
    </svg>
)

const IconFigma = () => (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-label="Figma">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
    </svg>
)

// Custom icons para marcas sin Simple Icons públicos
const IconMidjourney = () => (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-label="Midjourney">
        {/* Barco estilizado — marca registrada de Midjourney */}
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
    </svg>
)

const IconSuno = () => (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-label="Suno AI">
        {/* Nota musical estilizada */}
        <path d="M9 3v10.55A4 4 0 1 0 11 17V7h4V3H9zm-2 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    </svg>
)

const IconNanoBanana = () => (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-label="Nano Banana">
        {/* Robot/AI creativo — ojo único estilizado */}
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14.2a7.2 7.2 0 0 1-6-3.22C6.03 14.36 9.26 13.5 12 13.5s5.97.86 6 2.48a7.2 7.2 0 0 1-6 3.22z" />
    </svg>
)

const IconLovart = () => (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-label="Lovart">
        {/* Corazón + pincel — identidad Lovart */}
        <path d="M12 21.593c-.425-.394-8.01-7.143-8.01-11.593C3.99 6.08 6.07 4 8.67 4c1.636 0 3.054.87 3.33 2.11C12.276 4.87 13.694 4 15.33 4 17.93 4 20.01 6.08 20.01 10c0 4.45-7.585 11.199-8.01 11.593z" />
    </svg>
)

const IconRunway = () => (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-label="Runway ML">
        {/* Claqueta / video estilizado */}
        <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4h-4z" />
    </svg>
)

// ── Registro de tecnologías con ícono + nombre ─────────────────────────────
const technologies = [
    { name: "Claude Code", icon: <IconAnthropic /> },
    { name: "ChatGPT", icon: <IconOpenAI /> },
    { name: "Gemini", icon: <IconGemini /> },
    { name: "Nano Banana Pro", icon: <IconNanoBanana /> },
    { name: "Lovart", icon: <IconLovart /> },
    { name: "Vercel", icon: <IconVercel /> },
    { name: "Supabase", icon: <IconSupabase /> },
    { name: "Suno AI", icon: <IconSuno /> },
    { name: "Midjourney", icon: <IconMidjourney /> },
    { name: "GitHub", icon: <IconGitHub /> },
    { name: "Notion", icon: <IconNotion /> },
    { name: "Runway ML", icon: <IconRunway /> },
    { name: "Figma", icon: <IconFigma /> },
]

const duplicatedTech = [...technologies, ...technologies, ...technologies]

export function TechMarquee() {
    return (
        <section className="py-12 border-y border-[var(--border-subtle)] bg-[var(--bg-void)] relative overflow-hidden">
            {/* Soft gradient masks */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg-void)] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg-void)] to-transparent z-10 pointer-events-none" />

            <div className="container max-w-6xl mx-auto px-4 mb-8 text-center">
                <ScrollReveal>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        Potenciamos nuestros sistemas con el stack IA más avanzado del mercado
                    </p>
                </ScrollReveal>
            </div>

            <div className="flex overflow-hidden relative">
                <motion.div
                    className="flex whitespace-nowrap items-center gap-12 sm:gap-20"
                    animate={{ x: ["0%", "-33.333333%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40,
                    }}
                >
                    {duplicatedTech.map((tech, i) => (
                        <div
                            key={`${tech.name}-${i}`}
                            className="flex items-center gap-3 text-[var(--text-muted)] opacity-40 hover:opacity-100 hover:text-[var(--text-primary)] hover:drop-shadow-[0_0_12px_rgba(0,229,255,0.5)] transition-all duration-300 cursor-default group shrink-0"
                        >
                            <span className="group-hover:scale-110 transition-transform duration-300">
                                {tech.icon}
                            </span>
                            <span className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
