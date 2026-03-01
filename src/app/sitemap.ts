import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/constants"

const staticRoutes = [
  { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { url: "/studio", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/portfolio", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/proceso", priority: 0.6, changeFrequency: "monthly" as const },
  { url: "/precios", priority: 0.9, changeFrequency: "weekly" as const },
  { url: "/academia", priority: 0.9, changeFrequency: "weekly" as const },
  { url: "/academia/cursos", priority: 0.9, changeFrequency: "weekly" as const },
  { url: "/academia/mentorias", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/academia/recursos", priority: 0.7, changeFrequency: "weekly" as const },
  { url: "/empresas", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/contacto", priority: 0.7, changeFrequency: "monthly" as const },
]

// In production, fetch course slugs from the DB
const courseSlugs = ["sistema-ia-contenido-semanal", "flujos-ia-productividad"]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const courseEntries: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${SITE_URL}/academia/cursos/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }))

  return [...staticEntries, ...courseEntries]
}
