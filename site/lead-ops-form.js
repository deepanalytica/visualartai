(()=> {
  "use strict";
  const form = document.getElementById("leadOpsForm");
  if (!form) return;
  const config = window.VAAI_LEAD_OPS || {};
  const enabled = /^https:\/\//.test(config.endpoint || "") && Boolean(config.turnstileSiteKey);
  const button = form.querySelector('[type="submit"]');
  const feedback = document.getElementById("leadOpsFeedback");
  const fallback = document.getElementById("leadOpsFallback");
  const message = value => { feedback.textContent = value; };
  const details = () => ({
    business: form.elements.business.value.trim(),
    city: form.elements.city.value.trim(),
    email: form.elements.email.value.trim(),
    website: form.elements.website.value.trim(),
    goal: form.elements.goal.value.trim(),
    consent: form.elements.consent.checked,
    company_url: form.elements.company_url.value.trim(),
  });
  const waLink = () => {
    const d = details();
    const text = [
      "Hola, solicito un diagnóstico gratuito de Visual Art AI.",
      "Negocio: " + d.business, "Ciudad: " + d.city, "Correo: " + d.email,
      "Web: " + (d.website || "No indicada"), "Objetivo: " + d.goal,
    ].join("\n");
    return "https://wa.me/56958039450?text=" + encodeURIComponent(text);
  };
  const showFallback = text => {
    message(text);
    fallback.href = waLink();
    fallback.hidden = false;
  };
  if (!enabled) {
    button.textContent = "Preparar solicitud por WhatsApp";
    message("Por ahora la solicitud se completa enviando el mensaje en WhatsApp.");
  } else {
    button.disabled = true;
    message("Validando el formulario seguro…");
    const loader = document.createElement("script");
    loader.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    loader.async = true;
    loader.onload = () => {
      try {
        window.turnstile.render("#leadOpsTurnstile", {
          sitekey: config.turnstileSiteKey,
          callback: () => { button.disabled = false; message("Formulario listo para enviar."); },
          "expired-callback": () => { button.disabled = true; message("Vuelve a validar el formulario."); },
          "error-callback": () => showFallback("No se pudo verificar el formulario. Puedes utilizar WhatsApp."),
        });
      } catch { showFallback("Validación no disponible. Puedes utilizar WhatsApp."); }
    };
    loader.onerror = () => showFallback("Validación no disponible. Puedes utilizar WhatsApp.");
    document.head.appendChild(loader);
  }
  form.addEventListener("submit", async event => {
    event.preventDefault();
    fallback.hidden = true;
    if (!form.reportValidity()) return;
    if (!enabled) {
      showFallback("Abre WhatsApp y pulsa Enviar para completar la solicitud.");
      window.open(waLink(), "_blank", "noopener,noreferrer");
      return;
    }
    const token = window.turnstile?.getResponse?.() || "";
    if (!token) { showFallback("Necesitamos validar el formulario. Puedes utilizar WhatsApp."); return; }
    button.disabled = true;
    message("Registrando tu solicitud…");
    try {
      const response = await fetch(config.endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...details(), turnstile: token }),
        signal: AbortSignal.timeout(12000),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || "No se registró la solicitud");
      form.reset();
      message("Solicitud recibida. Revisaremos los datos y responderemos por correo.");
      button.textContent = "Solicitud enviada";
      // No declarar venta ni seguimiento sin confirmación del backend.
    } catch {
      showFallback("No pudimos confirmar el registro. Puedes enviarlo por WhatsApp.");
      button.disabled = false;
      window.turnstile?.reset?.();
    }
  });
})();
