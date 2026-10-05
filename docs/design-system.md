# Visual Art AI — Search Signal Design System v4

Visual Art AI usa la metodología de un design system, pero **no copia una estética de referencia**. La identidad nace del problema que resolvemos: ayudar a que un negocio sea **encontrado, entendido y elegido** en Google, Maps, la web y los buscadores de IA.

## 1. Arquitectura

```
foundations
→ primitive tokens
→ semantic tokens
→ components
→ pattern families
→ templates
→ art direction
```

Una pantalla nueva no inventa colores, radios o comportamientos. Pero tampoco fuerza todas las secciones a verse iguales.

## 2. Concepto de marca

**Signal → Discovery → Match**

El vocabulario visual propio es:

- consultas;
- señales;
- nodos;
- rutas;
- entidades;
- coincidencias;
- resultados;
- mapas;
- plataformas;
- estados de búsqueda.

Esto reemplaza la estética anterior de terracota/editorial y evita depender de cards genéricas.

## 3. Color

Identidad principal:

```
Signal Blue   #2F6BFF
Deep Blue     #1747D1
Night         #07111F
Paper         #F7F9FC
Ink           #0B1320
Cyan          #51C7E7
Mint          #35CFA8
```

El azul expresa señal y acción. Mint identifica match/estado positivo. Cyan es información secundaria.

**No usar degradados decorativos como identidad.**

## 4. Tipografía

- **Manrope**: titulares, interfaz, marketing y lectura.
- **IBM Plex Mono**: metadata, estados, labels y señales.

No existe un rol serif dominante.

## 5. Componentes

Base compartida:

- Button
- Input / Select / Textarea
- Navigation
- Panel
- Badge / Entity chip
- Status
- Modal / Sheet
- Table / List
- Tooltip

Todos consumen tokens semánticos.

## 6. Patrones propios

### Search Lab
Representa una consulta, las señales que se comparan y un resultado relevante.

### Signal Path
Explica el recorrido: necesidad → descubrimiento → comprensión → contacto.

### Service Lanes
Explica servicios como capas conectadas, no como seis cards idénticas.

### Visibility Trace
Muestra antes/después o cambio de claridad con una nota explícita cuando la visualización es conceptual.

### Audit Scan
Organiza la auditoría en encontrabilidad, comprensión, confianza y conversión.

### Guide Index
Contenido editorial basado en preguntas reales de búsqueda.

## 7. Qué hacemos / propuesta de valor

La oferta debe ser comprensible en lenguaje natural:

> Hacemos que tu negocio sea más fácil de encontrar, entender y elegir.

Servicios:

- Google y Maps;
- SEO y contenido;
- GEO / LLM SEO y visibilidad en buscadores de IA;
- webs y landing pages;
- Google Ads y Meta Ads;
- WhatsApp y automatización;
- marca y contenido visual;
- analítica y optimización.

Diferenciador:

> No tratamos Google, la IA, la web y la conversión como proyectos aislados. Trabajamos esas capas como un sistema conectado de presencia digital.

## 8. Encontrabilidad propia: Google + IA

Visual Art AI debe aplicar a sí misma lo que ofrece a clientes.

Producción incorpora:

- HTML semántico y headings descriptivos;
- copy visible de servicios y beneficios;
- FAQ visible;
- JSON-LD con `Organization`, `WebSite`, `Service` y `FAQPage`;
- canonical y hreflang;
- robots.txt;
- sitemap.xml;
- llms.txt;
- páginas de contenido enlazadas;
- metadata Open Graph;
- promesas responsables: no garantizar recomendaciones de asistentes de IA.

La meta es reducir ambigüedad para personas y sistemas, no rellenar la web con palabras clave.

## 9. Accesibilidad

Mínimos:

- focus visible;
- targets cercanos o superiores a 44px;
- contraste suficiente;
- labels explícitos;
- navegación por teclado;
- no usar color como única señal;
- `prefers-reduced-motion`.

## 10. Source of truth

- Producción: `site/index.html`
- Sistema estático: `site/design-system.css`
- Motion/brand: `site/brand/visual-art-ai-design-system.css`
- Foundations app: `src/app/globals.css`
- Tailwind: `tailwind.config.ts`
- Contratos: `src/lib/design-system.ts`
- SEO/GEO: `site/robots.txt`, `site/sitemap.xml`, `site/llms.txt`
