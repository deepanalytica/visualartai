# Plan de descubrimiento orgánico — Visual Art AI, octubre de 2026

**Objetivo:** que un cliente en Chile entienda qué hace Visual Art AI cuando busca ayuda para conseguir consultas desde Google, web, WhatsApp, anuncios y asistentes de IA. **No es posible garantizar indexación, rankings, citas ni clientes orgánicos.**

## Estado implementado
- Portada: se conserva el H1 aprobado y las dos rutas de decisión (consulta directa y pruebas para quien compara). Organization + WebSite + Service JSON-LD ya existían; se actualizó la descripción de la entidad para explicar problemas concretos y servicios comprobables.
- Google Maps: el Perfil de Empresa es **gratis** para empresas elegibles. La agencia cobra trabajo y entregables, no un supuesto derecho a aparecer. Atención solo online generalmente **no es elegible**; se revisó la FAQ visible y la FAQ JSON-LD para evitar contradicciones.
- 6 guías **originales** nuevas centradas en: costo de gestionar Google Maps, psicología exclusivamente online y elegibilidad, medición real de consultas, captación inicial de una pyme chilena, Search Console y cómo evaluar precios de agencias.
- Blog: 26 artículos enlazados, categorías, descripción, ItemList JSON-LD, sitemap, RSS y llms.txt complementario actualizados.
- Enlazado interno: desde portada, servicio de Maps y seis artículos preexistentes a las guías que responden preguntas relacionadas.
- Auditoría automatizada: `scripts/check-seo-discovery.mjs` en GitHub Actions valida URLs, títulos, HTML, esquemas, RSS, sitemap y política de Google Maps.

## Documentación externa primaria consultada
- Google Search Central, Google Search e IA: https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central, guía generativa (2026): https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central, marcado Organization: https://developers.google.com/search/docs/appearance/structured-data/organization
- Google Search Central, marcado Article: https://developers.google.com/search/docs/appearance/structured-data/article
- Google Search Central, contenido generado con IA: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- Google Business Profile, elegibilidad: https://support.google.com/business/answer/13763036
- Google Business Profile, reglas de representación: https://support.google.com/business/answer/3038177

## Acciones que requieren una cuenta real (pendientes, no ejecutadas)
1. **Google Search Console**: verificar que `visualartai.cl` figure como propiedad de dominio, enviar o comprobar `https://visualartai.cl/sitemap.xml`, inspeccionar las seis URL nuevas y ver resultados de cobertura y rastreo. No prometer indexación instantánea.
2. **Bing Webmaster Tools**: dar de alta el sitio y su sitemap si conviene. Esto puede contribuir a descubrimiento; no garantiza que ningún asistente cite el sitio.
3. **Analítica**: configurar medición con consentimiento. Separar clic en WhatsApp de mensajes **realmente recibidos**, consultas calificadas y ventas; no enviar contenidos privados del chat a eventos web.
4. **Señales públicas auténticas**: verificar perfiles profesionales, trabajos de cliente autorizados, enlaces públicos, fotos y reseñas voluntarias. No fabricar testimonios, listados en directorios ni falsas oficinas físicas.
5. **Voz del cliente**: contrastar titulares y temas con entrevistas y Search Console; aún no tenemos un reporte real de volúmenes desde AnswerThePublic para Chile.
6. **Revisión editorial periódica**: confirmar que elegibilidad, precios, fuentes y capturas no quedaron obsoletas; medir cuáles guías generan consultas antes de expandir el contenido.

## Lo que NO se hizo ni debe prometerse
- No se usaron volúmenes de búsqueda, posiciones o resultados comerciales imaginarios.
- No se generaron perfiles falsos de Maps ni se enviaron URL a Search Console sin acceso.
- No se implementaron `llms.txt`, `GEO` ni schema ficticios como si fueran llaves de recomendación. El archivo llms.txt que ya existía es opcional y Google Search no lo exige.
- No se atribuyen ventas, pacientes o visitas a los artículos recién publicados.
- No se creó contenido masivo de baja calidad con páginas casi iguales por ciudad.

## Tablero de seguimiento recomendado
Durante 4–8 semanas, comparar por artículo o URL de entrada: impresiones y clics orgánicos de Search Console, sesión orientada a servicio, clics al CTA con consentimiento y **consultas recibidas verificables**. Registrar fecha de modificación y distinguir campañas pagadas, redes sociales y visitas por marca.

La métrica de negocio es la consulta útil recibida y, cuando exista evidencia, su relación con la venta. No las palabras clave que aparece una IA respondiendo una sola vez.
