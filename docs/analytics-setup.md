# Medición de Visual Art AI

## Identificadores
- Contenedor Google Tag Manager: `GTM-T84CRBCC`.
- Flujo web Google Analytics 4: `G-25YZJ7FVC2`.
- El ID numérico de la propiedad GA4 aún debe registrarse para la futura API del panel.

## Implementación del sitio
Las páginas estáticas de `site/` cargan `analytics-consent.js`. El visitante puede aceptar o rechazar la analítica, y modificar su elección con el botón «Privacidad». Tag Manager solo se carga después de aceptar. El fragmento `noscript` se omite deliberadamente porque cargaría Google sin una forma de recoger esa elección en navegadores sin JavaScript.

La página `/aviso-de-privacidad.html` es un aviso de medición inicial que debe revisarse antes de producción. No sustituye una política integral para futuros formularios o publicidad.

## Configuración pendiente en Tag Manager
1. En `GTM-T84CRBCC`, crear una sola **Etiqueta de Google** con ID `G-25YZJ7FVC2` y activador **Inicialización — Todas las páginas**.
2. Crear etiquetas de evento GA4 para los eventos `form_start` y `lead_intent`, con activadores de evento personalizado del mismo nombre. `lead_intent` representa intención de enviar un correo, **no un lead recibido**.
3. No insertar `gtag.js` directamente en las páginas. No publicar una segunda etiqueta de configuración GA4.
4. Usar Vista previa de Tag Manager con una elección aceptada y otra rechazada; comprobar que en rechazo no se solicita `gtm.js` y en aceptación se envía una sola vista de página.
5. Publicar el contenedor solo tras esa verificación y tras revisar el aviso de privacidad.

## Próximas conexiones
- Verificar `visualartai.cl` en Search Console y enviar `https://visualartai.cl/sitemap.xml`.
- Guardar el ID numérico de la propiedad GA4 para consultar la Data API.
- Habilitar Cloudflare Web Analytics en el proyecto Pages si aún no está activo.
- Cuando haya un formulario confirmado, registrar `lead_submit_success`; nunca enviar nombre, correo, teléfono o texto libre a GA4.
