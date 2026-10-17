# Visual Art AI · Web v27 — dirección de arte, propuesta comercial y calidad

**Fecha:** 17-10-2026 · **Producto:** visualartai.cl · **Ruta de despliegue:** GitHub Actions → Cloudflare Pages y GitHub Pages.

## Promesa y público

**Titular aprobado, exactamente:** “Hay personas buscando lo que vendes en Google y ChatGPT. Y mientras tú no apareces, están llamando a tu competencia.”

El usuario es dueño de comercio, profesional independiente o responsable de una pyme chilena que necesita recibir consultas, llenar su agenda, responder mejor o comprender si sus anuncios realmente generan oportunidades. No viene a leer una autobiografía de la agencia.

El contenido de cada sección responde, en este orden, a la duda concreta de esa persona: ¿es relevante para mí?, ¿qué información podrían encontrar de mi negocio?, ¿qué problema resolverían?, ¿puedo comprobar un proyecto?, ¿qué tendría que pagar?, ¿qué riesgo corro?, ¿cómo empiezo?

## Estructura editorial de la portada

1. Héro: titular aprobado, subtítulo que explica el servicio, botón de diagnóstico y respuesta inicial en 24 h hábiles.
2. Servicios entendibles: tres rutas móviles y seis problemas comerciales con enlaces a servicios completos en escritorio. No forzar herramientas.
3. Búsquedas: preguntas posibles de Google y asistentes, **rotuladas como ejemplos ilustrativos, no capturas reales ni volúmenes medidos**.
4. Voces mentales: cinco situaciones ficticias reconocibles, **no testimonios de clientes**.
5. Cuatro beneficios: que te encuentren, que te elijan, que te contacten y que puedas medir.
6. Prueba: un caso auténtico de proyecto y un enlace a la web publicada; comparativa visual identificada como ilustración.
7. Criterio: estrategia, diseño, búsqueda, contenido y atención con una sola pregunta centrada en el comprador.
8. Objeciones: preguntas frecuentes con límites de garantía, precios, elegibilidad y alcance.
9. Precios: tres soluciones basadas en resultados deseados, con valores **desde** y entregables verificables, no tres tamaños idénticos de la misma oferta.
10. Diagnóstico: sin formulario obligatorio (WhatsApp con mensaje preparado que el visitante debe enviar); formulario detallado y correo opcionales; tres pasos de trabajo.
11. Recursos y CTA final para quien hizo toda la lectura.

El orden exacto de los bloques comerciales puede variar en futuras pruebas de conversión, pero cada pregunta debe tener una respuesta y no duplicarse en varias tarjetas.

## Lenguaje

- Priorizar “me llegan pocas consultas”, “nadie me escribe”, “pagué publicidad sin saber si vendí” y “se me acumulan mensajes”.
- Usar SEO, GEO, Google Business Profile, GPT y automatización **solo después** de explicar el efecto para el cliente.
- “Te ayudamos a que sea más fácil encontrarte, entenderte y consultarte”, no “primero en ChatGPT”, “pacientes garantizados” ni “multiplicamos ventas”.
- Ofrecer un diagnóstico inicial y un primer cambio prioritario. No presentar un botón que abre WhatsApp como un mensaje enviado.
- En Google Maps, indicar que la ficha es gratuita para negocios elegibles; atención exclusivamente online no suele cumplir los criterios.
- Sin estadísticas no verificadas ni simulaciones de ranking. Las frases de “voces mentales” **nunca** deben atribuirse a usuarios reales.
- Gary Halbert: deseo existente → pregunta concreta → mecanismo → evidencia verificable → oferta de riesgo reducido → acción. Complementar con Hopkins, Caples, Collier, Schwab, Schwartz, Karbo y Suarez: relevancia, medición y razón para creer, no imitación teatral.

## Arte inspirado por las cuatro referencias compartidas

Las referencias tienen una identidad azul luminosa, tipografía de contraste alto, espacios blancos amplios, trayectorias de búsqueda y tarjetas similares a interfaces. En la web se **traduce** a la marca, no se incrustan afiches completos en una pantalla:
- **Color:** azul semántico Visual Art AI, fondos marfil y azul muy suave; coral para señales puntuales, no saturar.
- **Tipografía:** Manrope para jerarquía; Instrument Serif para acentos editoriales; IBM Plex Mono para rótulos de sistema.
- **Motivo:** búsqueda → visibilidad → contacto. El motivo es conceptual y no se presenta como un resultado comprobado.
- **No ilustraciones de personas fabricadas**, falsas interfaces de resultados reales ni logos usados como respaldo de recomendación.
- **Una idea principal por sección** y una sola acción dominante por contexto.
- **Párrafos cortos, grupos alineados y márgenes consistentes**, sistema de espaciado múltiplo de 4.
- **Animación con propósito:** indicación de estado o transición discreta, respetar reduced motion y ahorro de datos.
- Evitar acumulación de glassmorphism, gradientes, brillos, nubes luminosas, tarjetas flotantes repetidas y texto grandilocuente genérico.

## Criterio de móvil: embudo sin ruido

- Héro aprobado, CTA directo WhatsApp y correo como alternativa discreta.
- Tres rutas de servicio y dos enlaces de investigación; no seis tarjetas completas ni barras duplicadas.
- Ejemplos extensos y voces accesibles bajo `details/summary`, inicialmente cerrados.
- En la sección de método, cuatro resultados breves; ocultar las tres demos grandes en móviles.
- Una sola barra sticky tras salir del héro, ausente durante el diagnóstico y consentimiento.
- Precios agrupados por problemas, desplegables, y formulario opcional.
- Sin desbordamiento horizontal a 320, 390, 768, 1024 y 1440 px.
- Tap targets de 44px o más y contraste/foco perceptible.

## Validación de resultados

El QA técnico prueba presencia de secciones, enlaces, formularios, rutas reales, contenido no ficticio y contraste responsivo. **No prueba que un sitio convierta más**. La operación debe poder responder en el plazo publicado de 24 h hábiles; si no, actualizar la promesa antes de promocionar.

Separar eventos de CTA, mensajes realmente recibidos, oportunidades calificadas y ventas. Un clic a wa.me no es un lead recibido. Medir cada canal con consentimiento.

## Archivos del sitio

- `site/index.html`: mensaje, SEO/JSON-LD, estructura semántica y enlaces.
- `site/styles/experience-v1.css`: última capa de arte v27, solo tokens semánticos, sin colores hex en componentes.
- `site/home-core.css`: base legada, no romper sin revisión.
- `site/styles/tokens.css`: primitivas y semántica compartida.
- `site/home-v11.js`: hero/carrusel desktop, optimizado para reducir trabajo móvil.
- `site/site.js`: navegación, consentimiento, formularios y medición.
- `scripts/check-public-design.mjs`, `scripts/check-public-copy-es.mjs`, `scripts/public-browser-smoke.cjs`: contratos que deben aprobar cada PR.

## Referencias conceptuales

- Cuatro composiciones visuales proporcionadas en esta conversación (Visual Art AI, búsqueda, smartphone, curva azul).
- Gary Halbert y las nueve obras citadas en documentación editorial previa.
- Google Search Central, documentación oficial de Google Business Profile y WCAG 2.2.
- Guía Google/YouTube 2026 compartida anteriormente, con límites de extrapolación a Chile.

No describir el diseño como copia de una marca o app distinta. La web debe comunicar a Visual Art AI con identidad propia.
