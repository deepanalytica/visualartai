# Visual Art AI — Auditoría UX/UI + respuesta directa (17-10-2026)

**Repositorio:** deepanalytica/visualartai · **Alcance:** portada pública, escritorio y móvil · **Estado:** corrección en GitHub con comprobaciones automatizadas; no se afirman mejoras comerciales sin datos.

## Objetivo del visitante

Una persona que llega a la portada debe resolver estas dudas sin abrir múltiples páginas:

1. ¿Estoy en el sitio adecuado?
2. ¿Qué hace exactamente esta agencia para mi negocio?
3. ¿Hay algo concreto que demuestre su trabajo?
4. ¿Qué cuesta y qué incluye?
5. ¿Qué riesgo tengo al consultar?
6. ¿Cómo empiezo ahora sin rellenar un formulario largo?

**Acción primaria:** iniciar solicitud de diagnóstico inicial gratuito por WhatsApp con mensaje preparado. La persona debe pulsar **Enviar** dentro de WhatsApp; el sitio no recibe ni almacena esa solicitud por sí mismo.

## Inventario por apartado: hallazgo y corrección

| Apartado | Obstáculo detectado | Cambio implementado | Principio |
|---|---|---|---|
| Héro | En móvil ocupaba mucha altura; mantener diferenciación | Titular original **intacto**, subtítulo móvil breve, una acción directa. | Halbert + Caples: captar atención desde la demanda existente. |
| Servicios | Catálogo grande se percibía como lista de tecnologías | 3 caminos visibles en móvil; 6 servicios detallados en escritorio con acceso al catálogo. Lenguaje de beneficio antes que plataforma. | Collier + Schwartz: hablar desde la necesidad consciente. |
| Demostración | Una simulación de buscador puede confundirse con una posición real | Sigue disponible en escritorio, desactivada en móvil, señalizada como ilustración. | Hopkins: no convertir visualizaciones en prueba ficticia. |
| Caso de psicología | CTA «Ver el caso documentado» dirigía a un artículo educativo, no al proyecto; el «Antes/Después» parecía una medición histórica | Enlace directo a la ficha real del caso; visual rotulada como «Mensaje genérico / Mensaje específico», con límites de evidencia. En móvil se muestra el texto y el enlace, sin slider. | Halbert/Schwab: credibilidad y prueba verificable. |
| Objeciones | Dudas sobre rankings, web nueva y alcance aparecían sin explicación de la decisión | Preguntas concretas con respuesta breve y sin garantías de posición o clientes. | Karbo/Schwab: reducir riesgo sin fabricar certezas. |
| Precios | 3 tarjetas largas ralentizaban lectura móvil; etiquetas vagas y ejemplos desproporcionados | Móvil: 3 filas expandibles con «desde» y alcance orientativo; escritorio: tarjetas completas con ejemplos ajustados. | Caples/Hopkins: especificidad. |
| Contacto | El formulario detallado (tres campos obligatorios) era el camino visual principal al llegar al final | CTA principal de WhatsApp con mensaje preparado, formulario detallado plegado y opcional. Selección de plan se conserva al ir al contacto. | Baymard: reducir campos y esfuerzos. |
| Blog | Se intercalaba antes del contacto y podía dispersar a compradores listos | Blog movido **después** de la sección de contacto; sigue accesible desde la navegación. | Halbert: pedir la respuesta antes de introducir otra tarea. |
| Medición | Todos los clics a WhatsApp se contabilizaban igual | Registrar ubicación de CTA (hero, sticky, diagnóstico) solamente con consentimiento analítico; no registrar mensajes privados. | Hopkins/Suarez: medir respuestas y costos reales. |

## Esquema de página actual

- **Escritorio:** Héro → 6 servicios → demo visual → caso real → objeciones → 3 planes → diagnóstico (WhatsApp directo + formulario opcional) → blog.
- **Móvil:** Héro compacto → 3 servicios → caso documentado → objeciones → 3 precios resumidos → WhatsApp directo + formulario opcional → blog.
- Navegación móvil no enlaza a la demo oculta. Barra sticky de **una sola acción**, ausente antes de salir del héro y cuando el diagnóstico está visible.

## El método de las nueve obras, aplicado con rigor

La carta original de Halbert `Hands On Experience` enumera exactamente nueve obras. Se leyó la carta completa y se usaron materiales originales o muestras disponibles de las obras en un estudio previo (ver `metodo-halbert-9-obras-visual-art-ai.md`). **No declaramos lectura íntegra de los nueve libros cuando no es el caso.**

| Libro / autor | Aplicación comprobable |
|---|---|
| *Scientific Advertising* — Claude Hopkins | Acciones y métricas, información específica; nunca cifras inventadas. |
| *The Robert Collier Letter Book* — Robert Collier | Primero la frase mental del cliente; después el servicio. |
| *Tested Advertising Methods* — John Caples | Título de beneficio, CTA de autointerés; medir antes de llamar «ganadora» a una versión. |
| *How to Write a Good Advertisement* — Victor O. Schwab | Atención → ventaja → razones para creer → prueba → acción. |
| *The Gary Halbert Letter* — Gary Halbert | Una central selling idea; quitar ruido alrededor de la decisión. |
| *The Boron Letters* — Gary Halbert | Trabajar sobre demanda existente y un público concreto. |
| *The Lazy Man's Way to Riches* — Joe Karbo | Inicio sencillo, precio claro y riesgo reducido sin promesas imposibles. |
| *Break-Through Advertising* — Eugene Schwartz | Ajustar el mensaje al nivel de consciencia del visitante y la saturación competitiva. |
| *7 Steps To Freedom* — Ben Suarez | Cohesión de mercado + medio + mensaje + costo y seguimiento. |

## Criterios de calidad externos

- Halbert, carta original: https://www.thegaryhalbertletter.com/newsletters/zfkj_hands_on_experience.htm
- Baymard, principios UX móvil (2026): https://baymard.com/research-articles/mobile-ux-ecommerce
- Baymard, evitar campos innecesarios: https://baymard.com/research-articles/checkout-flow-average-form-fields
- Baymard, etiquetas persistentes: https://baymard.com/research-articles/mobile-forms-avoid-inline-labels
- WCAG 2.2 (W3C), tamaños de objetivo, contraste y foco: https://www.w3.org/TR/WCAG22/

Estos son principios generales, algunos basados en comercio electrónico; **no son prueba específica de que esta portada aumentará conversiones**.

## Plan de validación posterior

- **Usabilidad:** pedir a cinco dueños de negocios que entren desde un móvil y describan en voz alta qué ofrecemos, qué reciben gratis y cómo se inicia el contacto. Registrar tiempo de comprensión y dudas; no inducir respuestas.
- **Instrumentación:** separar clic CTA de WhatsApp, envío real de mensaje, respuesta, lead calificado, cliente ganado. Un clic en `wa.me` no garantiza mensaje enviado.
- **Experimentos:** variante A/B de subtítulo o CTA, uno por vez, con suficiente tráfico y control de origen. No cambiar muchos elementos juntos ni atribuir causalidad sin prueba.
- **Privacidad:** ninguna conversación de WhatsApp debe enviarse como evento de analítica. Cualquier medición respeta consentimiento.
- **Accesibilidad:** probar navegación por teclado, foco, zoom 200 %, lector de pantalla y objetivos táctiles.

## Riesgos pendientes fuera del alcance del frontend

1. El botón de WhatsApp necesita que el usuario confirme el envío; no hay API de recepción de leads del sitio.
2. No hemos verificado desde el CRM cuántas consultas reales llegan ni si el plazo 24–48 horas se cumple.
3. Los precios «desde» requieren confirmación del alcance por negocio.
4. Un caso de diseño no equivale a evidencia de incremento de clientes sin resultados medidos.

**Resultado esperado:** menos decisiones simultáneas, contacto más fácil y argumentos con pruebas y límites visibles. **No afirmamos todavía una tasa de conversión superior.**
