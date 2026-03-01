import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
})

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .max(100, "Máximo 100 caracteres"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Debe incluir al menos una mayúscula")
    .regex(/[0-9]/, "Debe incluir al menos un número"),
})

export const contactSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre"),
  email: z.string().email("Email inválido"),
  company: z.string().optional(),
  message: z
    .string()
    .min(20, "El mensaje debe tener al menos 20 caracteres")
    .max(1000, "Máximo 1000 caracteres"),
  type: z.enum(["studio", "academia", "empresa", "otro"]).default("otro"),
})

export const courseSchema = z.object({
  title: z.string().min(5).max(200),
  slug: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Solo letras minúsculas, números y guiones"),
  shortDescription: z.string().min(20).max(300),
  longDescription: z.string().optional(),
  route: z.enum(["redes", "productividad", "empresas"]),
  level: z.enum(["principiante", "intermedio", "avanzado"]),
  priceClp: z.number().min(0),
  priceArs: z.number().min(0),
  isFree: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type CourseInput = z.infer<typeof courseSchema>
