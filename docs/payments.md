# Pagos — Documentación Técnica

## Arquitectura

```
PAYMENT_PROVIDER=transbank | mercadopago  (env var)
```

La lógica de pagos está en `src/lib/payments/`:
- `index.ts` — factory + exports
- `transbank.ts` — Webpay Plus integration
- `mercadopago.ts` — Preferences + webhook verification

---

## Transbank Webpay Plus

### Configuración

| Variable | Integración | Producción |
|---|---|---|
| `TRANSBANK_COMMERCE_CODE` | `597055555532` | Código real |
| `TRANSBANK_API_KEY_SECRET` | Clave de integración | Clave real |
| `TRANSBANK_ENVIRONMENT` | `integration` | `production` |

### Flujo completo

```
Cliente                   Backend                    Transbank
  │                          │                           │
  ├─ POST /api/payments/create ──────────────────────────►│
  │                          │ tx.create(buyOrder, ...)   │
  │                          │◄─────── { url, token } ───│
  │◄── { url, token } ───────│                           │
  │                          │                           │
  ├─ [POST form a url]───────────────────────────────────►│
  │                          │      (usuario paga)        │
  │                          │                           │
  │◄──── redirect ───────────────────────────────────────│
  │                          │                           │
  │     POST /api/payments/transbank/return ─────────────►
  │ (token_ws en body)       │                           │
  │                          ├─ tx.commit(token_ws) ─────►│
  │                          │◄── { responseCode, ... } ─│
  │                          │                           │
  │                          ├─ UPDATE purchase (paid)    │
  │                          ├─ INSERT enrollment          │
  │◄── redirect /pagos/exitoso ──────────────────────────│
```

### Seguridad

- `buyOrder`: máx 26 caracteres alfanuméricos (`vaai` + timestamp36 + random4)
- `provider_ref UNIQUE`: idempotencia — si la misma buyOrder llega 2 veces, solo procesa 1
- Nunca otorgar acceso desde la return URL directamente — siempre desde la verificación del commit

### Casos especiales

| Caso | Cómo se maneja |
|---|---|
| Usuario cancela | Transbank envía TBK_TOKEN sin token_ws → redirect a /pagos/error?reason=cancelado |
| Timeout | Igual que cancelación |
| Banco rechaza | responseCode ≠ 0 → purchase=failed → redirect a /pagos/error?reason=rechazado |
| Return llamado 2x | purchase.status ya es "paid" → redirect directo a éxito (idempotente) |

### Tarjetas de prueba (integración)

| Resultado | Número | Exp | CVV | RUT | Clave |
|---|---|---|---|---|---|
| Aprobada | 4051885600446623 | Cualquiera | 123 | 11.111.111-1 | 123 |
| Rechazada | 4051885600446640 | Cualquiera | 123 | 11.111.111-1 | 123 |

---

## MercadoPago

### Configuración

| Variable | Valor |
|---|---|
| `MERCADOPAGO_ACCESS_TOKEN` | `TEST-xxxx` (sandbox) o real |
| `MERCADOPAGO_WEBHOOK_SECRET` | Clave para HMAC |

### Flujo completo

```
Cliente              Backend                  MercadoPago
  │                     │                         │
  ├─ POST /api/payments/create ──────────────────►│
  │                     │ Preference.create(...)   │
  │                     │◄── { id, init_point } ──│
  │◄── { url: init_point } ─────────────────────  │
  │                     │                         │
  ├─ [redirect a init_point] ───────────────────►│
  │                     │       (usuario paga)     │
  │                     │                         │
  │       POST /api/webhooks/mercadopago ◄─────── │
  │                     │ (IPN notification)       │
  │                     ├─ Verify HMAC signature   │
  │                     ├─ GET /v1/payments/{id} ─►│
  │                     │◄── payment details ──── │
  │                     ├─ if approved:             │
  │                     │   UPDATE purchase (paid)  │
  │                     │   INSERT enrollment        │
  │                     ├─ return 200               │
  │                     │                          │
  ├─ [redirect a back_url.success] ◄──────────── │
```

### Verificación HMAC

El webhook verifica la firma usando:
```
manifest = "id:{paymentId};request-id:{x-request-id};ts:{ts};"
hmac = HMAC-SHA256(manifest, MERCADOPAGO_WEBHOOK_SECRET)
compara con la parte v1= del header x-signature
```

### Idempotencia

1. Si ya existe un purchase con el mismo `provider_ref` (paymentId) en status=paid → skip
2. Si existe purchase por `preference_id` → actualizar a paid + cambiar providerRef a paymentId
3. Si no existe nada → crear nuevo purchase paid

### Configurar webhook en MP

Dashboard MP → Tus integraciones → Webhooks:
- URL: `https://tu-dominio.cl/api/webhooks/mercadopago`
- Eventos: `payment`

### Credenciales de test

Usa credenciales de sandbox de tu cuenta de MercadoPago. Para compras de prueba, usa el usuario comprador de sandbox.

---

## Páginas de resultado

| Ruta | Cuándo se muestra |
|---|---|
| `/pagos/exitoso` | Pago aprobado (Transbank commit OK, o MP back_url.success) |
| `/pagos/error` | Pago rechazado, cancelado o error técnico |
| `/pagos/pendiente` | Pago en proceso (solo MercadoPago) |

Parámetros query:
- `?courseSlug=xxx` — para link directo al curso (enviado por el return handler)
- `?external_reference=userId:courseId` — MercadoPago lo añade automáticamente
- `?reason=cancelado|rechazado|...` — código de error

---

## Rate limiting

El endpoint `/api/payments/create` tiene un límite básico en memoria:
- 5 intentos por IP por minuto

Para producción se recomienda usar Upstash Redis con `@upstash/ratelimit`.

---

## Tabla `purchases` — estados

| Status | Cuándo se asigna |
|---|---|
| `pending` | Al crear la intención de pago |
| `paid` | Al confirmar el pago (commit TB / webhook MP) |
| `failed` | Transacción rechazada o error |
| `refunded` | Reembolso manual por admin |

---

## Checklist antes de pasar a producción

- [ ] Cambiar `TRANSBANK_ENVIRONMENT=production`
- [ ] Usar commerce code y API key de producción
- [ ] Usar `MERCADOPAGO_ACCESS_TOKEN` real (no TEST-)
- [ ] Configurar webhook URL real en dashboard MP
- [ ] Verificar que `NEXT_PUBLIC_URL` apunta al dominio de producción
- [ ] Hacer una compra de prueba end-to-end con cada proveedor
- [ ] Verificar que los enrollments se crean correctamente
- [ ] Verificar los logs de `webhook_logs` en la DB
