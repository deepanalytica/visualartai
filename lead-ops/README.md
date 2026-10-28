# Visual Art AI · Lead Ops — captación y operación comercial

**Estado, 28-10-2026: propuesta de implementación en rama. Sin despliegue ni activación con datos personales.**

## Implementación preparada

- Formulario de diagnóstico disponible como página estática en site/diagnostico-automatico.html.
- Sin backend configurado: conserva la alternativa WhatsApp; el visitante debe enviar el mensaje personalmente.
- Backend Cloudflare Worker con POST /v1/leads y verificación Turnstile en servidor, CORS limitado, honeypot, validación de entrada y límite por IP hasheada.
- Cloudflare D1 con consentimiento, datos mínimos, puntuación heurística, etapas y eventos.
- Deduplicación diaria por correo + negocio, con hash y sal secreta.
- Cron cada 5 minutos que notifica por Resend al operador, prepara una pauta de revisión y envía hasta dos recordatorios INTERNOS de expedientes sin actividad durante 48 horas.
- API de métricas GET /v1/internal/metrics y borrador de propuesta GET /v1/internal/leads/{id}/proposal?tier=sprint (sin envío automático).
- API interna GET /v1/internal/leads, PATCH /v1/internal/leads/{id} y DELETE /v1/internal/leads/{id}, con token secreto. No es una interfaz de administración para navegador.
- Retención por defecto de 90 días (revisar requisitos legales antes de operar).
- CI y pruebas automatizadas para la lógica de negocio, recepción desactivada y restricciones CORS.

## Activación paso a paso

1. Crear base D1: npx wrangler d1 create visualartai-leads
2. Reemplazar REPLACE_WITH_D1_DATABASE_ID en lead-ops/wrangler.toml con el ID generado.
3. Dentro de lead-ops: npx wrangler d1 execute visualartai-leads --remote --file=./schema.sql
4. Crear widget Turnstile para el dominio real y verificar dominio remitente en Resend.
5. Crear secretos en Workers con npx wrangler secret put, individualmente: TURNSTILE_SECRET, IP_HASH_SALT (32 bytes o más), ADMIN_API_TOKEN (32+ caracteres aleatorios), RESEND_API_KEY, OPS_EMAIL y FROM_EMAIL. No pegarlos en el repositorio.
6. Desde lead-ops ejecutar npx wrangler deploy. No cambiar aún ENABLE_PUBLIC_INGEST.
7. Probar GET /health, rechazo de origen ajeno, preflight, acceso interno sin token, API Turnstile, D1 y envío a una casilla propia.
8. Configurar la URL HTTPS del Worker más /v1/leads y la site key pública de Turnstile en site/lead-ops-config.js.
9. Tras pasar todas las pruebas, cambiar ENABLE_PUBLIC_INGEST a true y desplegar el Worker de forma controlada.
10. Enviar una solicitud de prueba real con consentimiento. Verificar un registro en D1, notificación al operador, borrador identificado como no verificado y posibilidad de borrar el registro.

IMPORTANTE: la web pública actual sigue funcionando con WhatsApp; no reemplazar su canal principal hasta comprobar la nueva captación.

## Pipeline

| Etapa | Acción interna | Requisito de salida |
|---|---|---|
| new | Capturar, deduplicar, asignar score, notificar | Operador acepta revisar |
| qualified | Abrir diagnóstico | Revisar sitio y negocio públicamente |
| diagnosis_ready | Comparar Google/Maps/contacto/anuncios | Hallazgos verificados |
| proposal_ready | Preparar oferta de alcance cerrado | Revisar costo y precio |
| proposal_sent | Seguimiento INTERNO | Prospecto acepta |
| won | Acordar proyecto | Pago o contrato verificado |
| delivering | Producir, probar y registrar evidencias | QA aprobado |
| completed | Medir, documentar y ofrecer continuidad | Entrega aceptada |
| lost | Cerrar | No enviar campañas sin consentimiento |

Puntuación determinista: solo señales aportadas por el prospecto. No es predicción validada de probabilidad de compra.

## Arquitectura de componentes

- Visual Art AI: marca pública, página de captura y paquetes vigentes en el sitio ($89.000, $249.000 y desde $690.000 CLP).
- Ad Lab: investigación creativa interna. No confundir la duración de un anuncio con su retorno publicitario.
- Claude Design Skills / Impeccable: producción y auditoría UI; Playwright para pruebas visuales/E2E.
- MSJ: futura integración con canales oficiales de Meta, sin duplicar su stack de mensajería.
- Conv OS: laboratorio experimental; no utilizar la demo para gestionar contactos reales.
- Deep Living/Praxios: orquestación interna de tareas y aprobaciones por eventos. La integración de producción con este Worker aún está pendiente.

## Trabajos siguientes (ordenados por impacto comercial)

P0: captación segura, clasificación y notificación interna (código de esta rama; requiere activar).
P1: dashboard autenticado de oportunidades, métricas de velocidad de respuesta y bitácora.
P2: generador de diagnósticos con comprobación de evidencia, presupuestos basados en el precio publicado y envío solo aprobado.
P3: integración oficial MSJ/WhatsApp, pagos verificados, plantillas web por rubro y QA de entrega.
P4: aprendizaje de campañas basado en datos propios de conversiones y rentabilidad.

## Límites y advertencias

- No hay envío automático masivo de mensajes ni scraping indiscriminado.
- La entrega de emails es al menos una vez; hay posibilidad de duplicados con caídas entre proveedor y confirmación en D1.
- El administrador debe usar API desde entorno seguro; no exponer ADMIN_API_TOKEN en el frontend ni en capturas.
- TURNSTILE_SECRET no debe enviarse desde el navegador. CORS no reemplaza la autenticación.
- Supervisar errores de notificaciones; el formulario no debe declarar "recibido" si D1 no confirma el guardado.
- Mantener política de privacidad, respaldo, control de costos, baja/borrado y aprobación humana para propuestas, cobros y despliegues de clientes.
- La fecha de deploy o el éxito de tests de CI no prueban que el backend real esté correctamente configurado: realizar prueba end-to-end con datos propios antes de habilitar público.
