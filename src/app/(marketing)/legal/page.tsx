import type { Metadata } from "next"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Términos y Privacidad",
  description: "Términos de uso y política de privacidad de Visual Art AI.",
  robots: { index: false, follow: false },
}

export default function LegalPage() {
  return (
    <>
      <section className="py-20 bg-[var(--bg-elevated)]">
        <div className="container max-w-3xl mx-auto px-4">
          <NeonBadge variant="neutral" className="mb-6">
            Legal
          </NeonBadge>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Términos y Privacidad
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Última actualización: enero 2025
          </p>
        </div>
      </section>

      <GlowDivider color="cyan" />

      <section className="py-16">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="prose-neon">
            <h2>1. Términos de Uso</h2>

            <h3>1.1 Aceptación de términos</h3>
            <p>
              Al acceder y usar la plataforma {SITE_NAME} (visualartai.cl), aceptas estos Términos de Uso en
              su totalidad. Si no estás de acuerdo, no uses el servicio.
            </p>

            <h3>1.2 Descripción del servicio</h3>
            <p>
              {SITE_NAME} ofrece cursos en línea, mentorías y recursos relacionados con el uso de inteligencia
              artificial para creación de contenido. Los servicios se ofrecen tal cual están disponibles.
            </p>

            <h3>1.3 Cuentas de usuario</h3>
            <p>
              Para acceder al contenido pagado debes crear una cuenta. Eres responsable de mantener la
              confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta.
            </p>

            <h3>1.4 Propiedad intelectual</h3>
            <p>
              Todo el contenido de la plataforma (videos, textos, prompts, plantillas) es propiedad de
              {SITE_NAME} o de sus licenciantes. No puedes reproducir, distribuir o crear obras derivadas sin
              autorización escrita.
            </p>

            <h3>1.5 Uso aceptable</h3>
            <p>Te comprometes a no:</p>
            <ul>
              <li>Compartir tu acceso con terceros</li>
              <li>Redistribuir el contenido del curso</li>
              <li>Usar el servicio para fines ilegales</li>
              <li>Intentar acceder a áreas no autorizadas del sistema</li>
            </ul>

            <h3>1.6 Garantía de satisfacción</h3>
            <p>
              Ofrecemos garantía de devolución de 7 días calendario desde la compra. Envía tu solicitud a{" "}
              {CONTACT_EMAIL} indicando el motivo.
            </p>

            <h3>1.7 Limitación de responsabilidad</h3>
            <p>
              {SITE_NAME} no garantiza resultados específicos de ingresos o rendimiento. Los resultados
              dependen del esfuerzo, contexto y aplicación de cada usuario.
            </p>

            <GlowDivider color="magenta" className="my-8" />

            <h2>2. Política de Privacidad</h2>

            <h3>2.1 Datos que recopilamos</h3>
            <ul>
              <li>
                <strong>Datos de cuenta:</strong> nombre, email, contraseña (cifrada)
              </li>
              <li>
                <strong>Datos de pago:</strong> procesados por Transbank o MercadoPago (no almacenamos datos de tarjeta)
              </li>
              <li>
                <strong>Datos de uso:</strong> progreso en cursos, recursos descargados, páginas visitadas
              </li>
              <li>
                <strong>Datos técnicos:</strong> IP, navegador, sistema operativo (para analytics anónimos)
              </li>
            </ul>

            <h3>2.2 Cómo usamos tus datos</h3>
            <ul>
              <li>Gestionar tu cuenta y acceso al contenido</li>
              <li>Procesar pagos y emitir documentos</li>
              <li>Enviarte comunicaciones sobre tu cuenta (no spam)</li>
              <li>Mejorar la plataforma con analytics anónimos</li>
            </ul>

            <h3>2.3 Compartición de datos</h3>
            <p>
              No vendemos ni compartimos tus datos personales con terceros, excepto con proveedores de
              servicios necesarios para operar la plataforma (Supabase, Transbank, MercadoPago, Resend),
              todos bajo acuerdos de confidencialidad.
            </p>

            <h3>2.4 Cookies</h3>
            <p>
              Usamos cookies técnicas necesarias para el funcionamiento de la plataforma (sesión, preferencias)
              y cookies analíticas anónimas para medir el uso de la plataforma. No usamos cookies de
              publicidad o seguimiento de terceros.
            </p>

            <h3>2.5 Tus derechos</h3>
            <p>
              Tienes derecho a acceder, corregir o eliminar tus datos personales. Para ejercer estos derechos,
              escríbenos a {CONTACT_EMAIL}.
            </p>

            <h3>2.6 Retención de datos</h3>
            <p>
              Conservamos tus datos mientras tu cuenta esté activa. Si eliminas tu cuenta, borraremos tus
              datos personales en un plazo de 30 días, excepto los registros contables que debemos conservar
              por obligación legal.
            </p>

            <h3>2.7 Seguridad</h3>
            <p>
              Implementamos medidas técnicas y organizativas para proteger tus datos, incluyendo cifrado en
              tránsito (HTTPS), cifrado en reposo, y controles de acceso estrictos.
            </p>

            <h3>2.8 Contacto</h3>
            <p>
              Para consultas sobre privacidad o ejercer tus derechos, escríbenos a{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--neon-cyan)] hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
