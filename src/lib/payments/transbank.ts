import { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from "transbank-sdk"
import { generateBuyOrder } from "@/lib/utils"
import { SITE_URL } from "@/lib/constants"

function getConfig(): Options {
  const isProduction = process.env.NODE_ENV === "production"

  if (isProduction) {
    return new Options(
      process.env.TRANSBANK_COMMERCE_CODE!,
      process.env.TRANSBANK_API_KEY!,
      Environment.Production
    )
  }

  // Integration/testing environment
  return new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  )
}

export interface TransbankCreateParams {
  amount: number
  sessionId: string
  returnUrl?: string
}

export interface TransbankCreateResult {
  token: string
  url: string
  buyOrder: string
}

export async function transbankCreate({
  amount,
  sessionId,
  returnUrl,
}: TransbankCreateParams): Promise<TransbankCreateResult> {
  const tx = new WebpayPlus.Transaction(getConfig())
  const buyOrder = generateBuyOrder()
  const resolvedReturnUrl = returnUrl ?? `${SITE_URL}/api/payments/transbank/return`

  const response = await tx.create(buyOrder, sessionId, amount, resolvedReturnUrl)

  return {
    token: response.token,
    url: response.url,
    buyOrder,
  }
}

export async function transbankCommit(token: string) {
  const tx = new WebpayPlus.Transaction(getConfig())
  return tx.commit(token)
}
