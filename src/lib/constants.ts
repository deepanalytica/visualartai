export const SITE_NAME = "Visual Art AI"
export const SITE_DESCRIPTION =
  "No es sobre reemplazar tu creatividad. Es sobre multiplicarla. Cursos, herramientas y workflows de IA para creadores, profesionales y equipos que quieren resultados reales."
export const SITE_URL = process.env.NEXT_PUBLIC_URL ?? "https://visualartai.cl"
export const CONTACT_EMAIL = "hola@visualartai.cl"
export const WHATSAPP_NUMBER = "+56912345678" // Replace with real number
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola, quiero saber más sobre los cursos de Visual Art AI"
)

export const NAV_LINKS = [
  { label: "Studio", href: "/studio" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Academia", href: "/academia" },
  { label: "Empresas", href: "/empresas" },
  { label: "Precios", href: "/precios" },
]

export const FOOTER_LINKS = {
  servicios: [
    { label: "Studio Creativo", href: "/studio" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Proceso", href: "/proceso" },
    { label: "Empresas", href: "/empresas" },
  ],
  academia: [
    { label: "Cursos", href: "/academia/cursos" },
    { label: "Mentorías", href: "/academia/mentorias" },
    { label: "Recursos", href: "/academia/recursos" },
  ],
  empresa: [
    { label: "Precios", href: "/precios" },
    { label: "Contacto", href: "/contacto" },
    { label: "Términos y condiciones", href: "/legal" },
    { label: "Privacidad", href: "/legal#privacidad" },
  ],
}

export const ROUTES = {
  redes: {
    id: "redes",
    label: "IA para Creadores de Contenido",
    description: "Produce 4 semanas de contenido auténtico en un domingo. Sin perder tu voz.",
    icon: "📱",
    color: "cyan",
    href: "/academia/cursos?route=redes",
  },
  productividad: {
    id: "productividad",
    label: "IA para Productividad",
    description: "Recupera 5–10 horas semanales automatizando lo que no requiere tu cerebro.",
    icon: "⚡",
    color: "violet",
    href: "/academia/cursos?route=productividad",
  },
  empresas: {
    id: "empresas",
    label: "IA para Equipos",
    description: "Tu equipo usando IA bien es tu mayor ventaja competitiva. Empieza hoy.",
    icon: "🏢",
    color: "magenta",
    href: "/empresas",
  },
  dev: {
    id: "dev",
    label: "Desarrollo Web con IA",
    description: "Del brief al deploy en un día. El workflow que los mejores devs ya están usando.",
    icon: "💻",
    color: "cyan",
    href: "/academia/cursos?route=dev",
  },
  visual: {
    id: "visual",
    label: "Imagen y Video con IA",
    description: "Genera imágenes fotorrealistas y video profesional. Sin cámara. Sin estudio.",
    icon: "🎨",
    color: "violet",
    href: "/academia/cursos?route=visual",
  },
  musica: {
    id: "musica",
    label: "Música con IA",
    description: "Compone, produce y publica tu música. De idea a EP distribuido en un mes.",
    icon: "🎵",
    color: "amber",
    href: "/academia/cursos?route=musica",
  },
  pro: {
    id: "pro",
    label: "Skills Profesionales con IA",
    description: "Copywriting, storytelling y comunicación que vende. Las habilidades que nadie te puede quitar.",
    icon: "✍️",
    color: "green",
    href: "/academia/cursos?route=pro",
  },
} as const

export const COURSE_LEVELS = {
  principiante: { label: "Principiante", color: "green" },
  intermedio: { label: "Intermedio", color: "yellow" },
  avanzado: { label: "Avanzado", color: "red" },
} as const

export const RESOURCE_TYPES = {
  checklist: { label: "Checklist", icon: "✓" },
  prompt: { label: "Pack de Prompts", icon: "⚡" },
  template: { label: "Plantilla", icon: "📋" },
  guide: { label: "Mini Guía", icon: "📖" },
} as const

export const PAYMENT_PROVIDERS = {
  transbank: {
    name: "Webpay Plus",
    description: "Tarjeta de crédito/débito chilena",
    logo: "/images/webpay.svg",
  },
  mercadopago: {
    name: "MercadoPago",
    description: "Tarjeta, transferencia o efectivo",
    logo: "/images/mercadopago.svg",
  },
} as const
