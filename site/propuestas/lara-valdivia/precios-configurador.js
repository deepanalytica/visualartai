(() => {
  const root = document.querySelector('[data-price-configurator]');
  if (!root) return;
  const projects = {'inicial': ['Presencia Inicial', 99000], 'impulso': ['Impulso Digital', 199000], 'estudio': ['Estudio Profesional', 499000]};
  const options = {'ninguno': ['Sin seguimiento mensual', 0], 'orden': ['Consultas en Orden', 99000], 'captacion': ['Captación y Seguimiento', 199000], 'crecimiento': ['Operación y Crecimiento', 349000]};
  const currency = n => '$' + new Intl.NumberFormat('es-CL').format(n);
  const project = root.querySelector('#project-choice');
  const social = root.querySelector('#social-choice');
  const follow = root.querySelector('#follow-choice');
  const status = root.querySelector('#copy-status');
  const output = root.querySelector('#selection-text');
  function update() {
    const [projectName, once] = projects[project.value];
    const [followName, monthlyFollow] = options[follow.value];
    const monthly = (social.checked ? 99000 : 0) + monthlyFollow;
    root.querySelector('#total-first').textContent = currency(once + monthly);
    root.querySelector('#total-monthly').textContent = currency(monthly);
    root.querySelector('#total-breakdown').textContent = `${currency(once)} del proyecto + ${currency(monthly)} del primer mes opcional`;
    document.querySelectorAll('[name="project-card"]').forEach(el => { el.checked = el.value === project.value; });
    const message = `Hola, quiero conversar sobre esta propuesta para Lara y Valdivia:\nProyecto: ${projectName} — ${currency(once)} pago único\nRedes sociales: ${social.checked ? currency(99000) + '/mes' : 'No incluido'}\nSeguimiento: ${followName}${monthlyFollow ? ' — ' + currency(monthlyFollow) + '/mes' : ''}\nAl comenzar: ${currency(once + monthly)}\nMeses siguientes: ${currency(monthly)}/mes\nValores antes de impuestos y costos externos; condiciones de cobro por confirmar.`;
    output.value = message;
    root.querySelector('#selection-whatsapp').href = 'https://wa.me/56998480281?text=' + encodeURIComponent(message);
    status.textContent = '';
  }
  project.addEventListener('change', update);
  social.addEventListener('change', update);
  follow.addEventListener('change', update);
  document.querySelectorAll('[name="project-card"]').forEach(el => el.addEventListener('change', () => { project.value = el.value; update(); }));
  root.querySelector('#copy-selection').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(output.value); status.textContent = 'Selección copiada.'; }
    catch { output.hidden = false; output.focus(); output.select(); status.textContent = 'Selecciona el texto para copiarlo.'; }
  });
  update();
})();
