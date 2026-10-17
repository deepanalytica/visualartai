# Google y YouTube 2026 — Adaptación editorial y comercial para Visual Art AI

**Fecha:** 2026-10-17
**Fuente aportada por el usuario:** `es_419_holiday_playbook.pdf` (14 páginas), Google / YouTube, *Potencia tu negocio esta temporada: Guía de marketing para retail: cómo aprovechar la IA en la temporada de fin de año* (2026).

## Límite de la evidencia

El documento estudia sobre todo compras de productos y campañas de temporada. Sus muestras incluyen Estados Unidos, México y grupos internacionales; algunas encuestas incluyen Chile, pero **no se debe concluir que sus porcentajes describen la demanda de servicios profesionales en Chile**. Tampoco es una evaluación causal del funcionamiento de Visual Art AI.

## Qué dice la fuente y cómo lo usamos

| PDF | Dato / recomendación de la guía | Traducción prudente al producto |
|---|---|---|
| p. 4 | Las búsquedas en Modo IA son en promedio 3 veces más largas que las tradicionales, según datos internos de Google de mayo de 2026. | Responder dudas concretas y preguntas conversacionales en páginas indexables. **No prometemos ranking**. |
| p. 5 | En las encuestas citadas, compradores que usan IA tienen 2,8 veces más puntos de contacto en promedio. La menor fricción equivale a encontrar respuestas claras, no necesariamente a reducir visitas. | Dos rutas simultáneas: solicitud rápida para quien decidió, y acceso libre a evidencia, condiciones, FAQ y blog para quien investiga. |
| pp. 6–7 | Las personas valoran la verificación, reseñas, videos y fuentes públicas para decidir. Algunas cifras describen poblaciones mexicanas o muestras globales. | Enlazar un caso **identificable** y una web publicada, explicar reseñas auténticas y videos útiles sin inventar pruebas. |
| p. 9 | Para retail, la información de productos debe estar completa y coherente entre web, feeds, imágenes, variantes, precio, envío y devoluciones. Contenido original y video favorecen el descubrimiento. | Explicación sectorial en artículo sobre preguntas frecuentes: Merchant Center y feeds **solo cuando corresponda a tiendas**, no como requisito para una psicóloga. |
| p. 10 | Datos propios, Tag Manager/Data Manager y medición ayudan a preparar acciones. | Diferenciar clic en WhatsApp, mensaje efectivamente recibido, lead calificado y venta. Mantener consentimiento. |
| pp. 11–12 | La guía presenta soluciones publicitarias de Google y resultados de anunciantes; son afirmaciones de Google y dependen de presupuesto y contexto. | **No** copiar cifras de uplift al sitio ni prometer CPA, ROAS o ganancias específicas. |
| p. 13 | Comercio con agentes: datos legibles por agentes y pagos fluidos para retail. | Área de investigación futura; no afirmar que ya tenemos comercio agentivo o Universal Commerce Protocol integrado. |

## Implementación (scope)
- `site/index.html`: conserva el H1 aprobado y el botón directo; después de los tres servicios en móvil, dos enlaces discretos permiten comprobar el trabajo y resolver dudas.
- `site/index.html`: caso de psicología enlaza a su ficha y a la página realmente publicada. No muestra cifras de captación inventadas.
- `site/index.html`: FAQ incluye el valor de reseñas/videos verificables y los límites de la medición de consultas.
- `site/servicios/contenido-analitica.html`: contenido multimedia solo cuando aclara una decisión y sin reseñas ficticias.
- `site/servicios/visibilidad-ia.html`: consistencia entre los puntos de contacto, no recomendaciones garantizadas.
- `site/articulos/contenido-preguntas-clientes-seo-ia.html`: dos nuevas secciones para investigación multicanal y datos completos de comercio, con atribución y límites de transferencia.

## Principios de UX que deben sobrevivir a la próxima iteración

1. **Comprensión en primera lectura:** nombre del servicio + resultado observable, sin jerga inventada.
2. **Sin barreras para la intención alta:** botón de diagnóstico directo a WhatsApp con texto preparado; visitante debe pulsar Enviar.
3. **Sin castigar a quien investiga:** muestra tarifas orientativas, caso verificable, objeciones, preguntas frecuentes y guías. No esconderlos detrás del formulario.
4. **Divulgación progresiva:** FAQ y precios extensos plegados en móvil; la información se conserva accesible.
5. **Pruebas auténticas:** casos documentados enlazados; no inventar reseñas, videos o porcentajes.
6. **Medición con consentimiento:** eventos de clic no equivalen a mensajes enviados ni pacientes o ventas.
7. **Rendimiento y accesibilidad:** enlaces táctiles de al menos 44px, foco visible, sin efectos que tapen lectura ni widgets pesados en móvil.

## Siguientes experimentos (no ejecutados)
- Entrevistas de comprensión con 5 dueños de negocios chilenos.
- Registrar consultas efectivamente recibidas por canal, sin recopilar el contenido privado en analítica.
- Comparar la proporción de solicitudes calificadas entre quienes llegaron directamente y quienes consultaron caso/FAQ.
- Si existe una tienda real, auditar feed Merchant Center, datos de producto y coherencia de variantes; no extender esto a todo cliente de servicios.

**Ninguna prueba o despliegue demuestra por sí mismo un aumento en las ventas.**
