"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NeonButton } from "@/components/brand/NeonButton"
import { Loader2 } from "lucide-react"

interface BuyButtonProps {
  courseSlug: string
  label?: string
  className?: string
}

export function BuyButton({ courseSlug, label = "Comprar ahora", className }: BuyButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleBuy() {
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug }),
      })

      const data = await res.json()

      // Not authenticated → redirect to login
      if (res.status === 401) {
        router.push(`/auth/login?next=/academia/cursos/${courseSlug}`)
        return
      }

      if (!res.ok) {
        setError(data.error ?? "Error al iniciar el pago. Intenta de nuevo.")
        setLoading(false)
        return
      }

      // Already enrolled
      if (data.alreadyEnrolled || data.free) {
        router.push(data.redirectUrl)
        return
      }

      if (data.method === "POST") {
        // Transbank: POST form to their URL
        const form = document.createElement("form")
        form.method = "POST"
        form.action = data.url

        const input = document.createElement("input")
        input.type = "hidden"
        input.name = "token_ws"
        input.value = data.token
        form.appendChild(input)

        document.body.appendChild(form)
        form.submit()
        // Keep loading=true since page navigates away
      } else {
        // MercadoPago or GET redirect
        window.location.href = data.url
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.")
      setLoading(false)
    }
  }

  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      {error && (
        <p className="text-sm text-red-400 text-center">{error}</p>
      )}
      <NeonButton
        variant="neon"
        className="w-full"
        disabled={loading}
        onClick={handleBuy}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            Procesando…
          </span>
        ) : (
          label
        )}
      </NeonButton>
    </div>
  )
}
