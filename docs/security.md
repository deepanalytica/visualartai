# Seguridad — Documentación Técnica

## Arquitectura de Auth

```
Browser → Supabase Auth → JWT → Middleware → Ruta protegida
                              ↓
                         Supabase SSR (cookies)
```

La autenticación usa **Supabase Auth con email/password**. El JWT se almacena en cookies HttpOnly gestionadas por `@supabase/ssr`.

---

## Middleware (`middleware.ts`)

```typescript
// Rutas protegidas
matcher: ["/app/:path*", "/admin/:path*"]

// Flujo:
// 1. Refresca la sesión Supabase en cada request (cookie rotation)
// 2. Si no autenticado → redirect /auth/login?next={ruta}
// 3. Si autenticado en /auth/* → redirect /app
// 4. Para /admin/* → verifica role='admin' en tabla profiles
//    Si role ≠ admin → 403 Not Found
```

### Roles

| Rol | Acceso |
|---|---|
| `student` | `/app/*` — cursos inscritos, perfil |
| `mentor` | `/app/*` + `/admin/cursos` (solo lectura) |
| `admin` | Todo — incluyendo panel de admin completo |

El rol se almacena en `profiles.role` y se verifica en el middleware via query a la DB para rutas `/admin/*`.

---

## Row Level Security (RLS)

### Habilitar RLS en todas las tablas

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE changelog ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;
```

### Policies — Profiles

```sql
-- Usuario ve y edita su propio perfil
CREATE POLICY "profiles_self_read" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_self_update" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admin puede leer todos los perfiles
CREATE POLICY "profiles_admin_all" ON profiles
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

### Policies — Courses

```sql
-- Cualquiera puede leer cursos publicados (incluso sin login)
CREATE POLICY "courses_public_read" ON courses
  FOR SELECT USING (status = 'published');

-- Admin y mentor pueden hacer todo
CREATE POLICY "courses_admin_all" ON courses
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'mentor')
  );
```

### Policies — Modules

```sql
-- Lectura si el curso está publicado
CREATE POLICY "modules_public_read" ON modules
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses c
      WHERE c.id = modules.course_id AND c.status = 'published'
    )
  );

CREATE POLICY "modules_admin_all" ON modules
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'mentor')
  );
```

### Policies — Lessons

```sql
-- Acceso si está inscrito Y el curso está activo, O si es lección preview gratuita
CREATE POLICY "lessons_enrolled_or_preview" ON lessons
  FOR SELECT USING (
    -- Preview gratuita: cualquiera puede ver
    (is_free_preview = true AND status = 'published')
    OR
    -- Inscrito activo
    EXISTS (
      SELECT 1 FROM enrollments e
      JOIN modules m ON m.id = lessons.module_id
      WHERE e.user_id = auth.uid()
        AND e.course_id = m.course_id
        AND e.status = 'active'
    )
    OR
    -- Curso gratuito
    EXISTS (
      SELECT 1 FROM modules m
      JOIN courses c ON c.id = m.course_id
      WHERE m.id = lessons.module_id
        AND c.is_free = true
        AND c.status = 'published'
    )
  );

CREATE POLICY "lessons_admin_all" ON lessons
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'mentor')
  );
```

### Policies — Resources

```sql
-- Recursos gratuitos: acceso público
CREATE POLICY "resources_free_public" ON resources
  FOR SELECT USING (is_free = true AND status = 'published');

-- Recursos premium: solo usuarios con algún enrollment activo
CREATE POLICY "resources_enrolled_users" ON resources
  FOR SELECT USING (
    is_free = false
    AND status = 'published'
    AND EXISTS (
      SELECT 1 FROM enrollments
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "resources_admin_all" ON resources
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'mentor')
  );
```

### Policies — Purchases

```sql
-- Usuario ve sus propias compras
CREATE POLICY "purchases_self_read" ON purchases
  FOR SELECT USING (user_id = auth.uid());

-- Admin ve y gestiona todas
CREATE POLICY "purchases_admin_all" ON purchases
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- IMPORTANTE: Los inserts de compras se hacen desde el backend (service_role_key)
-- por lo que no necesitan policy de INSERT para usuarios normales
```

### Policies — Enrollments

```sql
-- Usuario ve sus propias inscripciones
CREATE POLICY "enrollments_self_read" ON enrollments
  FOR SELECT USING (user_id = auth.uid());

-- Admin gestiona todo
CREATE POLICY "enrollments_admin_all" ON enrollments
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

### Policies — Progress

```sql
-- Usuario gestiona su propio progreso
CREATE POLICY "progress_self" ON progress
  FOR ALL USING (user_id = auth.uid());
```

### Policies — Changelog

```sql
-- Cualquiera puede leer el changelog
CREATE POLICY "changelog_public_read" ON changelog
  FOR SELECT USING (true);

-- Admin gestiona
CREATE POLICY "changelog_admin_all" ON changelog
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

### Policies — Webhook Logs

```sql
-- Solo admin puede ver logs de webhooks
CREATE POLICY "webhook_logs_admin_only" ON webhook_logs
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

---

## Trigger: Auto-crear perfil en registro

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    'student',
    true
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
```

**Por qué `SECURITY DEFINER`:** La función corre con los permisos del owner (postgres/service_role), no del usuario que hace el insert. Esto le permite escribir en `public.profiles` desde el contexto de `auth.users`.

**Por qué `ON CONFLICT DO NOTHING`:** Evita errores si el trigger se dispara más de una vez para el mismo usuario (edge case con providers OAuth).

---

## Seguridad de Webhooks

### MercadoPago — HMAC-SHA256

```typescript
// Verificación de firma en /api/webhooks/mercadopago
const xSignature = req.headers.get("x-signature") // ts=...,v1=...
const xRequestId = req.headers.get("x-request-id")
const dataId = searchParams.get("data.id")

// Construir manifest exactamente como la doc de MP especifica
const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`
const expected = crypto.createHmac("sha256", MERCADOPAGO_WEBHOOK_SECRET)
  .update(manifest)
  .digest("hex")

if (expected !== v1) {
  // Rechazar — no procesar el pago
  return new Response("Signature invalid", { status: 200 }) // 200 para evitar retries
}
```

**Siempre retornar HTTP 200** desde el webhook de MP aunque falle la verificación — esto evita que MP reintente infinitamente y genere alertas. El rechazo silencioso es el comportamiento correcto.

### Transbank — No hay webhook signature

Transbank no usa firmas en el return URL. La seguridad viene de:
1. El `token_ws` es de un solo uso — un segundo `commit` con el mismo token falla
2. El `buyOrder` es único por transacción (timestamp + random)
3. La verificación real es la llamada a `commit()` que valida con los servidores de Transbank

---

## Rate Limiting

### Implementación actual (in-memory)

```typescript
// En /api/payments/create
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
// 5 intentos por IP por minuto
```

**Limitación:** No persiste entre deployments serverless. Cada instancia tiene su propia memoria.

### Recomendado para producción: Upstash Redis

```typescript
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
})

const { success } = await ratelimit.limit(ip)
if (!success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
```

Variables de entorno adicionales:
```env
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

---

## Idempotencia de Pagos

### Principio

**Nunca otorgar acceso desde URLs de redirección.** Solo desde confirmación server-side (commit de Transbank o webhook de MercadoPago).

### Mecanismo

La columna `purchases.provider_ref` tiene constraint `UNIQUE`. Si el mismo `buyOrder` o `paymentId` llega dos veces, el segundo insert falla silenciosamente (`ON CONFLICT DO NOTHING`) y se detecta que ya existe.

```typescript
// Verificar antes de procesar
const [existing] = await db.select().from(purchases)
  .where(eq(purchases.providerRef, ref))
  .limit(1)

if (existing?.status === "paid") {
  // Ya procesado — redirigir a éxito sin duplicar enrollment
  return redirect("/pagos/exitoso")
}
```

---

## Checklist de Seguridad Pre-Producción

- [ ] **RLS habilitado** en todas las tablas (verificar en Supabase Dashboard > Auth > Policies)
- [ ] **Trigger** `on_auth_user_created` activo
- [ ] `SUPABASE_SERVICE_ROLE_KEY` nunca expuesto al cliente (solo server-side)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` solo tiene permisos de anon (verificar RLS)
- [ ] Variables de pago (`TRANSBANK_API_KEY_SECRET`, `MERCADOPAGO_ACCESS_TOKEN`) en variables de entorno de Vercel, no en el repositorio
- [ ] `.env` en `.gitignore`
- [ ] Rate limiting con Redis en producción
- [ ] HTTPS obligatorio (Vercel lo maneja automáticamente)
- [ ] Headers de seguridad en `next.config.ts`:

```typescript
// next.config.ts
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requiere unsafe-eval en dev
      "style-src 'self' 'unsafe-inline'",
      "img-src * blob: data:",
      "font-src 'self'",
      "connect-src *",
      "media-src 'self'",
      "frame-src https://webpay3gint.transbank.cl https://webpay3g.transbank.cl",
    ].join("; "),
  },
]
```

---

## Gestión de Sesiones

- Supabase maneja el refresh de tokens automáticamente via `@supabase/ssr`
- El middleware llama `supabase.auth.getUser()` en cada request para validar la sesión
- Los cookies son HttpOnly (no accesibles desde JavaScript)
- El token de acceso expira cada 1 hora; el refresh token cada 7 días (por defecto Supabase)

### Logout

```typescript
// En /api/auth/logout o en el client component de logout
await supabase.auth.signOut()
router.push("/")
```

El logout borra los cookies de sesión automáticamente.

---

## Supabase Storage

### Buckets y permisos

| Bucket | Visibilidad | Acceso |
|---|---|---|
| `course-thumbnails` | Público | CDN — cualquiera puede leer |
| `avatars` | Público | CDN — cualquiera puede leer |
| `resources` | Privado | Solo via signed URLs (24h expiry) |

### Signed URLs para recursos privados

```typescript
const { data } = await supabase.storage
  .from("resources")
  .createSignedUrl(filePath, 86400) // 24 horas
```

Solo llamar desde server-side (Server Component o Route Handler) con el service role key.

---

## Notas sobre el Anon Key

El `NEXT_PUBLIC_SUPABASE_ANON_KEY` es público por diseño — es seguro tenerlo en el frontend porque:
1. RLS lo protege: cada operación pasa por las policies de la tabla
2. Solo puede hacer lo que las policies permiten para usuarios no autenticados
3. El `SERVICE_ROLE_KEY` (que bypasea RLS) **jamás** debe ir al cliente
