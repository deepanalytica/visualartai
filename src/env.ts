import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /**
   * Server-side environment variables (not exposed to the browser).
   */
  server: {
    DATABASE_URL: z.string().url(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

    // Payments
    PAYMENT_PROVIDER: z.enum(["transbank", "mercadopago"]).default("transbank"),

    // Transbank
    TRANSBANK_COMMERCE_CODE: z.string().optional(),
    TRANSBANK_API_KEY_SECRET: z.string().optional(),
    TRANSBANK_ENVIRONMENT: z.enum(["integration", "production"]).default("integration"),

    // MercadoPago
    MERCADOPAGO_ACCESS_TOKEN: z.string().optional(),
    MERCADOPAGO_WEBHOOK_SECRET: z.string().optional(),

    // Email (Resend)
    RESEND_API_KEY: z.string().optional(),
    RESEND_FROM_EMAIL: z.string().email().optional(),

    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },

  /**
   * Client-side environment variables (prefixed with NEXT_PUBLIC_).
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_URL: z.string().url().optional(),
  },

  /**
   * Destructure all variables to ensure they're exposed to the env object.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,

    PAYMENT_PROVIDER: process.env.PAYMENT_PROVIDER,
    TRANSBANK_COMMERCE_CODE: process.env.TRANSBANK_COMMERCE_CODE,
    TRANSBANK_API_KEY_SECRET: process.env.TRANSBANK_API_KEY_SECRET,
    TRANSBANK_ENVIRONMENT: process.env.TRANSBANK_ENVIRONMENT,
    MERCADOPAGO_ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN,
    MERCADOPAGO_WEBHOOK_SECRET: process.env.MERCADOPAGO_WEBHOOK_SECRET,

    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,

    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },

  /**
   * Skip validation in CI where env vars may not all be present.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Treat empty strings as undefined (common in Docker/CI).
   */
  emptyStringAsUndefined: true,
})
