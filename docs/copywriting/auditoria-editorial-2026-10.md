# Auditoría editorial — Visual Art AI, octubre de 2026

## Alcance real
35 archivos HTML públicos: portada, blog, 20 artículos, 6 servicios, catálogo de servicios, nosotros, metodología, dos páginas de casos, página de auditoría y aviso de privacidad. El aviso de privacidad no se reescribió porque es un documento legal, no copy comercial.

## Problemas observados y corrección
| Problema | Cambio |
|---|---|
| Varias páginas de servicios repetían «El problema antes que la herramienta», «Sin humo» y «esta capa» | Titulares y explicaciones adaptados a SEO local, IA, web, anuncios, WhatsApp y contenido. |
| La portada usaba juicios absolutos acerca de la competencia | El mensaje plantea qué encuentra el cliente y si puede pedir una cotización. |
| Casos presentados de forma grandilocuente | Se explica el trabajo observable y sus límites; no se atribuyen cifras no medidas. |
| Veinte artículos repetían el mismo aviso de riesgo | Cada uno tiene introducción y pie de gráfico propios; se evita advertir tres veces el mismo límite. |
| Veinte artículos tenían «escena realista» que narraba un caso ficticio como hecho | Sustituido por una comprobación práctica que el lector puede realizar; sin pacientes ni ventas inventadas. |
| Veinte tarjetas del blog tenían descripciones con jerga | Descripciones con una instrucción o pregunta verificable. |
| Textos cargados mediante JS mantenían abstracciones | Reescritura de ejemplos de búsqueda y diagnósticos interactivos. |
| Página de auditoría decía que el formulario abría correo cuando ya abría WhatsApp | Se aclararon ambas opciones y que el usuario debe pulsar Enviar. |

## Criterios de aceptación
- Un H1 por página, metadatos SEO presentes donde corresponde, URL canónica intacta.
- 20 introducciones diferentes sin historias ficticias ni «marco responsable» clonado.
- «Ejercicios» concretos en lugar de escenas inventadas.
- No cambiar los enlaces a formularios, fuentes, servicios, blog, WhatsApp y correo.
- No tocar precios o plazos establecidos sin aprobación comercial.
- Probar 320, 390, 768, 1024 y 1440 px en navegador automatizado.
- Validar el contenido cargado por JavaScript, no solo el HTML estático.
- No reclamar mejoras de conversión sin mediciones de consultas recibidas y calificadas.

## Método editorial a futuro
Skill en `skills/visual-copy-editor/SKILL.md`. Análisis de copy comercial y referencias: `docs/copywriting/metodo-halbert-9-obras-visual-art-ai.md`. Auditoría automatizada: `scripts/check-public-copy-es.mjs`.

## Limitaciones
No se han realizado entrevistas a compradores ni pruebas A/B de los nuevos titulares. La corrección elimina plantillas evidentes y mejora especificidad, pero no garantiza mejora comercial. El detector de patrones en español es una revisión asistida; no determina quién escribió el contenido.
