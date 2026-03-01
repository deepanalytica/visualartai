import MercadoPagoConfig, { Preference } from "mercadopago"
import crypto from "crypto"
import { SITE_URL } from "@/lib/constants"

function getClient() {
  return new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    options: { timeout: 5000 },
  })
}

export interface MercadoPagoCreateParams {
  title: string
  amount: number
  currency?: "ARS" | "CLP"
  externalReference: string
  buyerEmail?: string
  notificationUrl?: string
}

export interface MercadoPagoCreateResult {
  preferenceId: string
  initPoint: string
  sandboxInitPoint: string
}

export async function mercadopagoCreate({
  title,
  amount,
  currency = "ARS",
  externalReference,
  buyerEmail,
  notificationUrl,
}: MercadoPagoCreateParams): Promise<MercadoPagoCreateResult> {
  const preference = new Preference(getClient())

  const response = await preference.create({
    body: {
      items: [
        {
          id: externalReference,
          title,
          quantity: 1,
          unit_price: amount,
          currency_id: currency,
        },
      ],
      external_reference: externalReference,
      payer: buyerEmail ? { email: buyerEmail } : undefined,
      back_urls: {
        success: `${SITE_URL}/pagos/exitoso`,
        failure: `${SITE_URL}/pagos/error`,
        pending: `${SITE_URL}/pagos/pendiente`,
      },
      auto_return: "approved",
      notification_url:
        notificationUrl ?? `${SITE_URL}/api/webhooks/mercadopago`,
    },
  })

  return {
    preferenceId: response.id!,
    initPoint: response.init_point!,
    sandboxInitPoint: response.sandbox_init_point ?? response.init_point!,
  }
}

/**
 * Verifica la firma HMAC-SHA256 de un webhook de MercadoPago.
 * Ref: https://www.mercadopago.com.ar/developers/es/docs/notifications/webhooks
 */
export function verifyMercadoPagoSignature(params: {
  xRequestId: string
  xSignature: string
  dataId: string
  secret: string
}): boolean {
  const { xRequestId, xSignature, dataId, secret } = params

  // Extract ts and v1 from x-signature header
  const parts = Object.fromEntries(
    xSignature.split(",").map((p) => {
      const [k, v] = p.split("=")
      return [k.trim(), v.trim()]
    })
  )

  const ts = parts["ts"]
  const v1 = parts["v1"]
  if (!ts || !v1) return false

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`
  const hmac = crypto.createHmac("sha256", secret).update(manifest).digest("hex")

  return hmac === v1
}
