# Política de Actualizaciones de Contenido — Visual Art AI

Guía para mantener el contenido de cursos y recursos actualizado, con criterios claros sobre cuándo y cómo actualizar.

---

## Principio base

El contenido de IA envejece rápido. Una lección sobre una herramienta específica puede quedar desactualizada en 3-6 meses. Esta política define cómo responder a eso de forma sistemática.

---

## Tipos de cambio

### Tipo A — Cambio menor (no requiere versión nueva)
Correcciones de texto, erratas, links rotos, clarificaciones que no cambian el contenido.

**Acción:** corregir directamente en el archivo MDX + actualizar `updated_at` en DB.
**Notificación:** ninguna (cambios silenciosos).

---

### Tipo B — Cambio de contenido (requiere nota en changelog)
Actualización de prompts, herramientas o flujos que sigue siendo compatible con el módulo.

Ejemplos:
- Una herramienta cambió su interfaz
- Un prompt se mejoró significativamente
- Se agrega un ejemplo nuevo

**Acción:** actualizar el archivo MDX + crear entrada en tabla `changelog` de la DB.
**Notificación:** email a estudiantes inscritos en el curso afectado (opcional, a criterio).
**Versión:** incrementar la versión menor del curso (v1.0 → v1.1).

---

### Tipo C — Cambio estructural (requiere comunicación activa)
Cambios en la arquitectura del módulo, adición de nuevas lecciones, eliminación de lecciones.

Ejemplos:
- Se agrega un módulo completo nuevo
- Se elimina una lección obsoleta
- Se cambia el orden de los módulos
- Se reemplaza una herramienta por otra completamente diferente

**Acción:** actualizar MDX + DB + crear entrada en changelog + comunicar por email.
**Notificación:** email con asunto "Actualización importante: [nombre del curso]".
**Versión:** incrementar la versión mayor del curso (v1.x → v2.0).

---

## Calendario de revisión

### Revisión mensual (primer lunes del mes)

Revisa los contenidos de mayor riesgo de obsolescencia:
- Lecciones que mencionan herramientas específicas con nombre
- Prompts que dependen de características específicas de un modelo de IA
- Lecciones con precios, planes, o características de servicios de terceros

**Checklist de revisión mensual:**
- [ ] ¿Siguen funcionando los links externos de cada recurso?
- [ ] ¿Los prompts de las lecciones clave siguen generando buenos resultados?
- [ ] ¿Alguna herramienta mencionada cambió significativamente?
- [ ] ¿Hay quejas o preguntas recurrentes en la comunidad sobre algún módulo específico?
- [ ] ¿Salió alguna herramienta o funcionalidad nueva que debería estar en el curso?

---

### Revisión trimestral (primer lunes de cada trimestre)

Revisión más profunda:
- Revisar cada módulo completo de cada curso activo
- Comparar el contenido con el estado actual del mercado de IA
- Evaluar si la secuencia de lecciones sigue siendo la óptima
- Revisar los recursos (plantillas, checklists, prompts) y actualizar si aplica

**Output esperado:** lista priorizada de actualizaciones para el siguiente trimestre.

---

### Revisión anual (enero)

Auditoría completa:
- Evaluar si el posicionamiento de cada curso sigue siendo relevante
- Comparar con oferta de cursos similares en el mercado
- Decidir si algún curso requiere rediseño completo (nueva versión mayor)
- Actualizar los objetivos y descripción de cada curso si el mercado cambió

---

## Proceso de actualización de una lección

1. **Identificar el cambio necesario** (por revisión periódica o feedback de estudiantes)
2. **Evaluar el tipo** (A, B, o C según la tabla anterior)
3. **Actualizar el archivo MDX** en `content/courses/[slug]/[modulo]/[leccion].mdx`
4. **Si es Tipo B o C:** crear entrada en la tabla `changelog` de la DB:
   ```sql
   INSERT INTO changelog (course_id, version, notes)
   VALUES ([course_id], '1.1', 'Actualizado el Módulo 3 — nuevos prompts para Claude 3.5');
   ```
5. **Si es Tipo C:** redactar email de comunicación a estudiantes
6. **Actualizar `version` en el curso** si aplica (tabla `courses`)

---

## Cómo registrar feedback de estudiantes

El feedback que llega por la comunidad, email, o comentarios es la fuente más valiosa para identificar qué actualizar.

**Sistema de captura:**
- Mantener un documento o Notion page con "Pendientes de contenido"
- Cada vez que un estudiante reporta algo confuso, desactualizado, o roto, anotarlo con: qué lección, cuál es el problema, qué solicitaron
- En la revisión mensual, revisar esta lista y decidir qué hacer con cada item

---

## Política de retrocompatibilidad

Cuando se actualiza un curso:
- Las inscripciones existentes acceden a la nueva versión automáticamente
- El progreso previo (lecciones completadas) no se resetea
- Si se eliminan lecciones, el progreso de esa lección se mantiene como "completada" en los registros históricos

**No existe política de reembolso basada en cambios de contenido** — las actualizaciones siempre mejoran el curso, nunca lo reducen en valor.

---

## Plantilla de email de actualización (Tipo C)

```
Asunto: Actualización importante en [Nombre del Curso] — [mes año]

Hola [nombre],

Actualizamos [Nombre del Curso] con mejoras significativas.

Qué cambió:
- [descripción del cambio 1]
- [descripción del cambio 2]

Por qué lo cambiamos:
[explicación breve — nueva herramienta, feedback de estudiantes, etc.]

Tu progreso no se afecta. Puedes continuar desde donde estabas o revisar las lecciones actualizadas.

[Link al curso]

Equipo Visual Art AI
```

---

## Responsabilidades

| Rol | Responsabilidad |
|-----|----------------|
| Admin / Instructor | Identificar necesidades de actualización, ejecutar los cambios |
| Equipo de soporte | Registrar feedback de estudiantes en la lista de pendientes |
| Admin técnico | Actualizar DB changelog, gestionar versiones, enviar emails |

---

## Lecciones de alto riesgo de obsolescencia

Estas lecciones requieren revisión mensual prioritaria por su dependencia en herramientas específicas:

**Curso A (Sistema IA para Contenido):**
- `modulo-04/01-midjourney-dalle.mdx` — herramientas de imagen cambian continuamente
- `modulo-05/01-publicacion-automatica.mdx` — Buffer/Later cambian precios y features

**Curso B (Flujos IA Productividad):**
- `modulo-04/02-slides-automaticos.mdx` — Gamma, Beautiful.ai cambian frecuentemente
- `modulo-03/01-prompt-redaccion.mdx` — prompts específicos a modelos pueden mejorar

**Recursos:**
- `prompts-redes-sociales.mdx` — prompts a revisar trimestralmente
- `prompts-productividad.mdx` — idem
- `prompts-presentaciones.mdx` — idem
