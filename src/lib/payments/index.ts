export {
  transbankCreate,
  transbankCommit,
  type TransbankCreateParams,
  type TransbankCreateResult,
} from "./transbank"

export {
  mercadopagoCreate,
  verifyMercadoPagoSignature,
  type MercadoPagoCreateParams,
  type MercadoPagoCreateResult,
} from "./mercadopago"

export type PaymentProvider = "transbank" | "mercadopago"

export function getPaymentProvider(): PaymentProvider {
  const p = process.env.PAYMENT_PROVIDER
  return p === "mercadopago" ? "mercadopago" : "transbank"
}
