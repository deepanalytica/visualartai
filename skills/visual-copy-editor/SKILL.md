---
name: visual-copy-editor
description: Edita copy comercial en español de Chile para Visual Art AI. Audita problemas reales, detecta clichés y textos genéricos, reescribe sin inventar pruebas y valida HTML/SEO antes de publicar.
---
# Visual Copy Editor — Visual Art AI

**Objetivo:** que cada página responda una pregunta concreta del comprador, use lenguaje natural y tenga una acción real que se pueda completar.

## Titular aprobado: no modificar sin instrucción expresa
El H1 de la portada debe leerse **exactamente**:
> Hay personas buscando lo que vendes en Google y ChatGPT. Y mientras tú no apareces, están llamando a tu competencia.

No sustituir este titular por versiones más suaves o preguntas genéricas durante una auditoría de «AI slop». El control `scripts/check-public-copy-es.mjs` comprueba la cadena visible exacta.

## Escritura de respuesta directa inspirada en Gary Halbert
- **Mercado antes que vocabulario:** investigar qué busca el comprador y qué ha probado, no empezar con «servicios SEO/GEO».
- **Idea central de venta:** si tu cliente no encuentra, entiende o contacta al negocio, una parte de la demanda puede perderse antes de consultar. No inventar volumen ni asumir que esto ocurre en todos los casos.
- **Beneficio antes que herramienta:** más posibilidades de consultas reales, con mecanismo visible: información pública, página de servicio y contacto.
- **Prueba antes que exageración:** enlazar trabajos verificables y distinguir ejemplos ilustrativos de resultados medidos.
- **Oferta específica y riesgo reducido:** diagnóstico inicial gratuito, una primera recomendación y plazo orientativo de respuesta en 24–48 h. No urgencias falsas ni cupos inventados.
- **Llamado a actuar:** «Solicitar mi diagnóstico gratuito» debe llevar al formulario, nunca fingir que la solicitud se envió automáticamente.
- **Sin imitaciones teatrales:** evitar gritos, promesas absolutas, historias ficticias y tono de vendedor insistente. Persuadir con claridad y consecuencias plausibles.

## Antes de escribir
1. **Define quién lee:** rubro, ciudad, situación, qué ha intentado, objeción que realmente tiene. No atribuyas frases a compradores si no existen entrevistas o datos.
2. **Declara la oferta:** qué hacemos, qué entregamos, qué no hacemos, plazo, precio y siguiente paso. Busca evidencia propia antes de escribir una promesa.
3. **Una idea principal:** evita titular, subtítulo y tres párrafos que dicen la misma idea con sinónimos.
4. **Copia solo hechos verificables del proyecto:** fuentes dentro del repositorio, páginas en producción, resultados medidos o enlaces públicos. No inventes clientes, cifras, testimonios ni posiciones de Google/ChatGPT.
5. **Redacta como una persona en Chile, pero sin caricaturas:** claridad y sencillez, sin localismos forzados ni diminutivos para «sonar humano».

## Lista de expresiones para cuestionar, no prohibir ciegamente
- «soluciones integrales», «lleva tu negocio al siguiente nivel», «transformamos tu presencia», «potenciamos», «sin fricción», «experiencia premium», «ecosistema», «revolucionario», «innovador», «sin humo».
- «capa», «recorrido», «sistema», «prioridad», «embudo», «conversión», «señales»: son útiles en documentos técnicos, pero no se debe asumir que el comprador comprende su significado.
- «no es solo X, es Y», «la pregunta incómoda», «esto no va de X, va de Y», series repetidas de tres conceptos abstractos.
- Preguntas retóricas encadenadas, metáforas tecnológicas, frases de autoridad no sustentadas.
- «te garantizamos X clientes», «ChatGPT te recomendará», «primera posición», «clientes felices» sin pruebas reales.
- Casos narrados en pasado sin fuente: convertirlos en **ejercicio explícito**, no testimonio encubierto.

## Reescritura por componente
- **Hero**: necesidad observable + servicio concreto + una acción. El título debe entenderse sin el resto de la web.
- **Servicios**: cuándo contratar, cómo funciona, ejemplos de trabajo, límites, precio/alcance cuando exista.
- **Precios**: evitar ambigüedad del «desde»; aclarar qué no incluye y qué se confirma tras diagnóstico.
- **Casos**: solo trabajos identificables; separar qué se construyó de cualquier efecto comercial comprobado.
- **Artículos**: introducción propia (no plantilla), respuestas específicas, un ejemplo aplicable y enlace pertinente sin insistencia.
- **Metadatos**: título y descripción deben reflejar el contenido visible; cuidar FAQPage, BreadcrumbList, fecha publicada y fecha modificada.
- **WhatsApp/formularios**: el botón abre una app con mensaje preparado; nunca afirmar que el mensaje ya fue enviado.

## Segunda revisión
Lee párrafos consecutivos, no frases sueltas. Si dos no añaden información diferente, deja uno. Relee en voz alta; no fuerces listas de tres, fragmentos o opiniones inventadas. Una advertencia técnica debe conservarse si evita una expectativa falsa.

### Control de versiones
- Sitio público real: `site/`, desplegado mediante Cloudflare Pages al actualizar `main`.
- No sobrescribir `site/home-core.css` porque se genera desde estilos fuente.
- Ejecuta `node scripts/check-public-copy-es.mjs`, `node scripts/check-public-design.mjs` y los tests de navegador con GitHub Actions.
- Fusionar únicamente si pasan CI y pruebas de móvil. No reutilizar descripciones genéricas entre artículos.
- No usar el 5/5 de SlopMonster como prueba: su detector automático opera en **inglés**, no en español.

## Criterio final
¿El dueño de una pyme podría explicar en sus propias palabras qué ofrecemos, si lo necesita, qué recibe y cómo contactarnos? Si no, el copy necesita otra revisión.
