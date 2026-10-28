// Plantillas de cotización. PRECIOS BASE reflejan la web vigente (octubre 2026).
// No enviar por email/WhatsApp sin revisión comercial y aceptación del alcance.
export const TIERS = Object.freeze({
  puesta_a_punto: {
    label: "Puesta a punto",
    startingCLP: 89000,
    targetDuration: "3–5 días hábiles, sujetos a material y accesos",
    scope: ["Definir una única prioridad", "Hasta dos ajustes puntuales de presencia o contacto", "Verificación básica de funcionamiento"],
    excluded: "No incluye web completa, anuncios, nuevos canales ni mensualidad",
  },
  sprint: {
    label: "Sprint de visibilidad",
    startingCLP: 249000,
    targetDuration: "7–10 días hábiles, sujetos al alcance y aprobaciones",
    scope: ["Un problema comercial principal", "Una página o un canal acordado", "Mejora de contacto y prueba funcional", "Informe breve de implementación"],
    excluded: "Campañas pagadas y desarrollos adicionales se cotizan aparte",
  },
  sistema: {
    label: "Sistema de presencia",
    startingCLP: 690000,
    targetDuration: "3–5 semanas estimadas, según alcance",
    scope: ["Diagnóstico inicial y priorización", "Landing o web prioritaria", "Conexión del canal de contacto acordado", "Pruebas y documentación básica"],
    excluded: "Servicios de terceros, integraciones especiales y mantenimiento no incluidos",
  },
});
const clp = amount => "$" + amount.toLocaleString("es-CL");
export function generateProposal(lead, tier = "sprint") {
  const p = TIERS[tier];
  if (!p) throw new Error("Plan desconocido");
  const business = String(lead.business || "Negocio").replace(/[\r\n]/g, " ").slice(0, 120);
  const city = String(lead.city || "").replace(/[\r\n]/g, " ").slice(0, 90);
  const goal = String(lead.goal || "").replace(/[\r\n]/g, " ").slice(0, 240);
  return [
    "# PROPUESTA PRELIMINAR · REVISIÓN Y APROBACIÓN OBLIGATORIA",
    "",
    "Cliente: " + business + (city ? " · " + city : ""),
    "Objetivo declarado por el cliente: " + goal,
    "No se ha constatado todavía ninguna deficiencia digital ni resultado esperado.",
    "",
    "## Plan sugerido: " + p.label,
    "Precio inicial de referencia: desde " + clp(p.startingCLP) + " CLP.",
    "Precio final e impuestos: se confirman tras acordar alcance, tipo de documento tributario y condiciones.",
    "Duración orientativa: " + p.targetDuration + ".",
    "",
    "### Entregables por definir",
    ...p.scope.map(x => "- " + x),
    "",
    "### Exclusiones",
    p.excluded + ".",
    "",
    "### Condiciones",
    "- Propuesta no vinculante, no enviar automáticamente.",
    "- Iniciar solo tras acuerdo escrito y anticipo confirmado por canal de cobro oficial.",
    "- El cliente debe facilitar materiales y acceso mediante mecanismos seguros (nunca contraseñas por mensajería).",
    "- No se garantizan ventas, resultados publicitarios ni posiciones en Google o asistentes IA.",
    "",
    "### Antes de cotizar",
    "- Verificar hallazgos y evidencias; definir línea base y métrica de éxito.",
    "- Precisar alcance final, revisiones, derechos de uso, costo de terceros, IVA y plazos.",
    "- Obtener aprobación comercial y consentimiento para las comunicaciones."
  ].join("\n");
}
