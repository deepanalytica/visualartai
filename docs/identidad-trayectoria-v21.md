# Visual Art AI — Identidad v21: de la búsqueda al encuentro

**Estado:** propuesta de marca + implementación de revisión en rama separada. **No aprobada para producción.**
**Fecha:** 2026-10-08. **Base técnica:** sitio estático en `site/` (la aplicación Next.js es legado distinto).
**Restricción:** mantener literalmente el hero principal aprobado. Sin gradientes de marca, sin rediseñar textos no solicitados y sin promesas de ranking garantizado.

## 1. Problema de negocio

Un pequeño negocio o profesional ofrece algo valioso, pero puede no resultar identificable ni elegible en las búsquedas relevantes. El problema es secuencial: **existir → ser encontrado → explicar lo que ofrece → inspirar confianza → facilitar el contacto → medir**. Cada etapa puede fallar de forma distinta.

La identidad no debe comunicar solo 'IA' ni solo 'diseño'. Debe transmitir que Visual Art AI **conecta los puntos que separan la búsqueda de la consulta**.

**Audiencia primaria:** profesionales independientes y negocios de servicios de Chile con oferta real, escasa visibilidad o problemas de conversión. Prioridad: servicios de salud (sujetos a publicidad responsable), comercios locales, gastronomía y arriendos.
**Audiencia secundaria:** pymes con sitio existente que requieren SEO local, anuncios, contenido, automatización y medición.

**Frase estratégica interna:** "Hacemos visible el camino entre lo que la gente busca y lo que tu negocio ofrece".
**Promesa comercial responsable:** mejorar encontrabilidad, comprensión y condiciones de contacto. **No** se puede garantizar aparecer en una respuesta particular de ChatGPT ni resultados comerciales futuros.

## 2. Exploración de mercado (fuentes, no validación cuantitativa propia)

- https://skaut.cl/agencia-geo-chile — ofrece metodología de medición GEO en múltiples asistentes; fuente interesada. Diferenciación: expresar el proceso de forma más accesible para pequeños negocios.
- https://lobiksystems.cl/agencia/posicionamiento-en-ia — énfasis en AEO/GEO e identidad semántica. Evitar competir únicamente en tecnicismos.
- https://neoseo.cl/ — posiciona búsqueda Google + asistentes. La promesa general ya no diferencia.
- https://www.posicionamiento.cl/ — presencia en Google + IA. El territorio SEO/GEO está ocupado.
- https://www.hojacero.cl/blog/cuanto-cuesta-seo-aeo-geo-chile — contexto de precios públicos, no referencia para copiar tarifas.
  
**Hallazgo:** la fórmula "aparecer en Google y ChatGPT" es compartida por varios actores; el distintivo de Visual Art AI debe residir en **método visual, claridad de diagnóstico, trazabilidad del trabajo y seguimiento**, no en inventar una capacidad exclusiva.

**Investigación pendiente antes de afirmar posicionamiento de mercado:** entrevistas de 5–8 clientes, pruebas de recuerdo visual, inventario de 20 competidores de la región, evidencia de captación/costes, análisis jurídico de similitud de marca en INAPI.

## 3. Concepto creativo

### Territorio elegido: La trayectoria visible
Analogía principal: una búsqueda comienza con una necesidad y termina (si el recorrido funciona) en una acción de contacto.

**Gramática de tres estaciones:**
- Origen: necesidad/intención.
- Encuentro: entidad identificable, propuesta clara, confianza.
- Acción: llamada, reserva, mensaje o compra.

**Traducción formal:** una línea continua de eje ortogonal con transiciones curvas y tres nodos. Azul = trayecto/acción; coral = punto de tensión/atención; neutros = estructura; verde = señal verificada positiva.

No usar montañas, circuitos aleatorios, halos futuristas o redes complejas como recurso dominante. La figura debe poder construirse de memoria y reproducirse en 1 tinta.

## 4. Sistema visual

### Símbolo
- Retícula maestra: 120×120 unidades.
- Área segura: 14 unidades.
- Contenedor: esquinas 31, fondo `#F2F6FF`.
- Trayectoria: trazo azul `#2F6BFF`, grosor 9, extremos redondeados, camino con giro en dos tramos.
- Nodos: entrada coral, tránsito grafito, salida azul.
- Variantes indispensables: positivo, negativo, un color y microtamaño.
- **Riesgo:** en 16–24 px el nodo central puede ser ilegible; para favicon simplificarlo y probar contraste antes de adoptar.

### Marca verbal
- "VISUAL ART AI" en Manrope 800, tracking controlado; **no** adoptar una forma de A ilegible.
- Descriptor: "Visibilidad en la nueva búsqueda".
- Manrope: titulares/UI/cuerpo.
- Instrument Serif: contraste editorial excepcional, preferiblemente una sola frase por pantalla.
- IBM Plex Mono: números, microdatos y etiquetas técnicas. Nunca a tamaños tan pequeños que impidan la lectura.

### Color y proporciones
- Azul 600 `#2F6BFF` — acciones y rutas.
- Azul 800 `#1E45AD` — interacción y contraste.
- Coral 500 `#F24D5D` — atención en puntos clave, no CTA principal.
- Grafito `#08111F` — titulares.
- Papel `#FBFCFE` — superficies grandes.
- Blanco `#FFFFFF` — tarjetas.
- Mint `#23B98E` — solo validación/éxito.
- Proporción operativa propuesta: ~75% neutros / 20% azul / 5% coral.
- **Sin gradientes de marca** ni brillos tipo gaming.

### Layout y componentes
- Retícula 12 columnas, 7/5 en escritorio (solo si la longitud del texto lo admite), 1 en móvil.
- Espaciado base múltiplos de 4 px.
- Titular primero; argumentos segundo; demostración tercera; CTA visible.
- Un protagonista visual por sección, evitar superposición de cinco metáforas.
- Controles tocables >=44×44px, foco visible, reducción de movimiento.
- Los ejemplos de IA se identifican siempre como **simulaciones**.

### Movimiento
- Revelación por scroll solo si aporta jerarquía; velocidad <500 ms.
- La trayectoria puede progresar de estación en estación con interacción del usuario, no como bucle perpetuo.
- `prefers-reduced-motion` desactiva animaciones y no elimina contenido.
- Eliminar lienzo de partículas que consume recursos sin contar algo útil.

## 5. Sistema verbal y jerarquía comercial

**Hero aprobado — conservar literal**:
> Hay personas buscando lo que vendes  
> en Google y ChatGPT.  
> Y mientras tú no apareces,  
> están llamando a tu competencia.

**Secuencia de homepage**: problema → prueba conceptual de búsqueda → diagnóstico interactivo → servicios por fricción → caso real y evidencia cualitativa → ofertas → contenidos → formulario/WhatsApp.
**No inventar métricas** ni testimonios. Los casos requieren autorización y definición de qué indicador fue medido.

**CTA principal:** diagnóstico inicial gratuito. Explicar alcance real, tiempo de respuesta y vía de contacto; la web estática utiliza envío por correo, no un CRM persistente.

## 6. Aplicaciones de identidad a validar

1. Logo principal horizontal y versión monograma.
2. Favicon 32×32, positivo y negativo.
3. Cabecera y hero responsive.
4. Tarjeta de presentación digital / QR.
5. Carrusel editorial (problema → proceso → resultado).
6. Post/spot para Instagram (4:5 / 9:16).
7. Plantilla de informe de diagnóstico: hallazgos, evidencia, prioridad, acción.
8. Propuesta comercial y portada PDF.
9. Iconografía en web, email, WhatsApp y firma.
10. Panel de métricas: información real, fuentes y fechas.

**No confundir mockups con pruebas:** requiere pantallas reales en 360, 390, 768, 1024 y 1440 px; impresión; favicon; accesibilidad WCAG y contrastes reales.

## 7. Decisiones rechazadas

- Redibujar el logotipo como una A sin travesaño: ya se descartó y sacrifica legibilidad.
- Paleta multicolor tipo neón: mezcla promesas y compite con el texto.
- Gradientes llamativos sobre el hero: enturbian la lectura.
- Infografía red de partículas decorativa: coste sin significado.
- "Garantizamos que ChatGPT te recomiende": promesa no verificable.
- Rehacer el embudo de conversión sin medición: riesgo comercial.
- Rehacer todo el sitio por estética: fragilidad y deuda técnica.

## 8. Validación y salida

**Pruebas antes de aprobar:** comprensión de servicio en 5 segundos (n>=5), recuerdo de símbolo (n>=5), contraste, experiencia móvil sin scroll horizontal, teclado, link y formulario, revisión de performance, SEO existente y verificación de que el copy principal es literal. Medir CTA y abandono contra línea base antes de despliegue progresivo.

**Estado de esta rama:** incorpora refinamiento visual de homepage, un símbolo candidato y un laboratorio visual. Sin despliegue automático ni edición de rama `main`.
