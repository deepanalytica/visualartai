# Visual Art AI

Plataforma SaaS premium de academia online + servicios creativos IA. Combina marketing web, LMS (cursos + recursos), panel de administración y pagos integrados (Transbank / MercadoPago).

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS + CSS Custom Properties |
| UI | shadcn/ui (New York style) |
| Auth | Supabase Auth (email + password) |
| Base de datos | Supabase Postgres + Drizzle ORM |
| Storage | Supabase Storage |
| Pagos | Transbank Webpay Plus / MercadoPago |
| Email | Resend |
| Deploy | Vercel |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── (marketing)/      # Landing, cursos, precios, estudio, etc.
│   ├── (auth)/           # Login, registro, recuperación
│   ├── (app)/            # Zona autenticada: dashboard, cursos, cuenta
│   ├── (admin)/          # Panel admin (role=admin)
│   └── api/              # API routes (pagos, webhooks, progreso)
├── components/
│   ├── brand/            # NeonCard, NeonButton, BentoGrid, etc.
│   ├── marketing/        # BuyButton, HeroShowcase, etc.
│   ├── app/              # AppSidebar, LessonPlayer, etc.
│   └── admin/            # AdminSidebar, DataTable, etc.
├── db/
│   ├── schema.ts         # Drizzle schema completo
│   ├── relations.ts      # Drizzle relations
│   └── index.ts          # DB client
├── lib/
│   ├── payments/         # Transbank + MercadoPago
│   ├── supabase/         # Client, server, middleware helpers
│   ├── access.ts         # Verificación de acceso a lecciones
│   ├── content.ts        # Lector de MDX con gray-matter
│   └── utils.ts          # Formateo, helpers
└── env.ts                # Validación de env vars (@t3-oss/env-nextjs)

content/
├── courses/
│   ├── sistema-ia-contenido-semanal/
│   │   ├── index.mdx     # Metadatos del curso
│   │   ├── modulo-01/    # Lecciones por módulo
│   │   └── ...
│   └── flujos-ia-productividad/
└── resources/            # Recursos descargables (.mdx)

scripts/
└── seed.ts               # Poblar DB con cursos, módulos, lecciones y recursos
```

---

## Setup local

### 1. Clonar e instalar

```bash
git clone <repo>
cd vaai
npm install
```

### 2. Variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores (ver sección de env vars abajo).

### 3. Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a **Settings → Database** y copia la `DATABASE_URL` (Direct Connection)
3. Ve a **Settings → API** y copia `SUPABASE_URL` y `SUPABASE_ANON_KEY`
4. En el **SQL Editor** de Supabase, ejecuta los scripts de `docs/supabase-setup.sql`

### 4. Migraciones

```bash
# Generar migraciones a partir del schema
npx drizzle-kit generate

# Aplicar migraciones
npx drizzle-kit migrate

# Ver estado
npx drizzle-kit studio
```

### 5. Seed

```bash
# Poblar con cursos, recursos y usuario admin
npx tsx scripts/seed.ts

# Solo crear usuario admin
npx tsx scripts/seed.ts --admin-only

# Reset + reseed (borra enrollments)
npx tsx scripts/seed.ts --reset
```

Credenciales del admin creado:
- Email: `admin@visualartai.cl`
- Password: `Admin123456!` ← cambiar tras el primer login

### 6. Dev server

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Variables de entorno

```env
# ─── Supabase ────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # Solo en server, NUNCA en cliente

# ─── Base de datos (Drizzle) ──────────────────────────────────────────────────
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres

# ─── App ─────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_URL=https://visualartai.cl

# ─── Pagos ───────────────────────────────────────────────────────────────────
PAYMENT_PROVIDER=transbank   # "transbank" | "mercadopago"

# Transbank (integración — cambiar a producción cuando estés listo)
TRANSBANK_COMMERCE_CODE=597055555532
TRANSBANK_API_KEY_SECRET=579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C
TRANSBANK_ENVIRONMENT=integration   # "integration" | "production"

# MercadoPago (sandbox)
MERCADOPAGO_ACCESS_TOKEN=TEST-xxxx
MERCADOPAGO_WEBHOOK_SECRET=xxxx

# ─── Email (opcional) ────────────────────────────────────────────────────────
RESEND_API_KEY=re_xxxx
RESEND_FROM_EMAIL=hola@visualartai.cl
```

---

## Flujo de pagos

### Transbank Webpay Plus

```
1. Usuario hace click en "Comprar"
2. POST /api/payments/create → crea purchase(pending) → obtiene token
3. Frontend hace POST form a Transbank con token_ws
4. Usuario paga en Transbank
5. Transbank POST a /api/payments/transbank/return con token_ws
6. Commit → si responseCode=0 → purchase(paid) + enrollment(active)
7. Redirect a /pagos/exitoso
```

**Tarjeta de prueba:**
- Número: `4051885600446623`
- Exp: cualquier fecha futura
- CVV: `123`
- RUT: `11.111.111-1`
- Clave: `123`

### MercadoPago

```
1. POST /api/payments/create → crea purchase(pending) → obtiene preference_id
2. Frontend redirige a init_point
3. Usuario paga en MercadoPago
4. MercadoPago POST a /api/webhooks/mercadopago (IPN)
5. Verificar HMAC → fetch payment → si approved → purchase(paid) + enrollment
6. MercadoPago redirige a /pagos/exitoso
```

**Credenciales de test:** usa las credenciales de sandbox de tu cuenta MP.

---

## Supabase SQL Setup

Ejecuta estos scripts en el SQL Editor de Supabase:

### Trigger: auto-crear perfil

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'student')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### RLS Policies

Ver `docs/security.md` para el SQL completo de RLS.

---

## Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Producción
vercel --prod
```

Configura las mismas variables de entorno en el dashboard de Vercel:
`Project → Settings → Environment Variables`

Actualiza `TRANSBANK_ENVIRONMENT=production` y las credenciales reales de Transbank para producción.

---

## Scripts disponibles

```bash
npm run dev          # Dev server
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # ESLint
npm run type-check   # TypeScript check sin compilar

npx drizzle-kit generate   # Generar migraciones
npx drizzle-kit migrate    # Aplicar migraciones
npx drizzle-kit studio     # Drizzle Studio (UI para DB)

npx tsx scripts/seed.ts    # Seed completo
```

---

## Estructura de rutas

```
/                       Marketing home
/studio                 Servicios creativos
/portfolio              Portafolio
/proceso                Proceso de trabajo
/precios                Precios
/academia               Hub academia
/academia/cursos        Catálogo de cursos
/academia/cursos/[slug] Detalle del curso
/academia/mentorias     Mentorías
/academia/recursos      Recursos gratuitos y premium

/auth/login             Login
/auth/registro          Registro
/auth/recuperar         Recuperar contraseña

/app                    Dashboard (autenticado)
/app/mis-cursos         Mis cursos inscritos
/app/cursos/[slug]      Player del curso
/app/cursos/[slug]/[lesson]  Lección específica
/app/recursos           Biblioteca de recursos
/app/cuenta             Perfil y configuración

/admin                  Dashboard admin
/admin/cursos           Gestión de cursos
/admin/usuarios         Gestión de usuarios
/admin/pagos            Historial de pagos
/admin/webhooks         Log de webhooks
/admin/changelog        Changelog de cursos

/pagos/exitoso          Resultado de pago exitoso
/pagos/error            Resultado de pago fallido
/pagos/pendiente        Pago en procesamiento

/api/payments/create             Crear intención de pago
/api/payments/transbank/return   Return handler Transbank
/api/webhooks/mercadopago        Webhook IPN MercadoPago
/api/webhooks/transbank          Webhook adicional Transbank
/api/progress                    Tracking de progreso
```

---

## Documentación adicional

- `docs/payments.md` — Detalle técnico de los flujos de pago
- `docs/security.md` — RLS policies y seguridad
- `docs/data-model.md` — Schema de base de datos

---

## Licencia

Privado — todos los derechos reservados. Visual Art AI © 2025.
