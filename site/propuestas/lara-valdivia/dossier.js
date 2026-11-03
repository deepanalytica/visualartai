const root = document.getElementById('brand-tabs-root');
if (root) {
  const devices = root.querySelector('.product-devices')?.outerHTML || '';
  const items = [
    { id: 'web', label: 'Web en dispositivos', type: 'EXPERIENCIA / WEB', title: 'Una web diseñada para cada pantalla.', copy: 'Las pantallas muestran capturas de la web demostrativa de Lara & Valdivia. Pueden abrir la experiencia completa para recorrerla.', mock: devices },
    { id: 'social', label: 'Redes sociales', type: 'IDENTIDAD / CONTENIDOS', title: 'Una identidad reconocible también en redes.', copy: 'Una muestra para comunicar preguntas y temas de interés con la identidad del estudio. Los contenidos deben ser revisados y autorizados.', mock: '<div class="mock-social"><div class="mock-brand-row"><img class="brand-logo" src="./logo-original.webp" alt="Logotipo facilitado"><small>Lara &amp; Valdivia</small></div><div><small>ORIENTACIÓN JURÍDICA · FAMILIA</small><h4>Divorcio: ¿por dónde empezar?</h4><p>Preguntas para preparar una consulta informada.</p></div><small>CONTENIDO EDUCATIVO / BOCETO</small></div>' },
    { id: 'tarjetas', label: 'Tarjetas', type: 'IDENTIDAD / PAPELERÍA', title: 'La identidad acompañando cada contacto.', copy: 'Propuesta visual de tarjetas utilizando el logotipo facilitado. Los datos personales, canales y ubicación se incorporan luego de su confirmación.', mock: '<div class="mock-card-set"><div class="mock-business dark"><img class="brand-logo" src="./logo-original.webp" alt="Logotipo facilitado"><strong>Lara &amp; Valdivia Abogados</strong></div><div class="mock-business light"><img class="brand-logo" src="./logo-original.webp" alt="Logotipo facilitado"><strong>Asesoría y representación legal</strong><small>Dirección por confirmar</small></div></div>' },
    { id: 'documento', label: 'Documentos', type: 'IDENTIDAD / DOCUMENTOS', title: 'Una presentación coherente en sus documentos.', copy: 'La marca puede extenderse a portadas y plantillas institucionales. Su diseño y entrega final dependen del plan elegido.', mock: '<div class="mock-doc"><div class="mock-brand-row"><img class="brand-logo" src="./logo-original.webp" alt="Logotipo facilitado"><small>Lara &amp; Valdivia</small></div><h4>Informe jurídico ejecutivo</h4><small>Antecedentes · Análisis · Conclusiones</small><div style="margin-top:35px"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div><small>DOCUMENTO INSTITUCIONAL / MUESTRA</small></div>' }
  ];
  const tabs = document.createElement('div');
  tabs.className = 'brand-tabs'; tabs.setAttribute('role', 'tablist'); tabs.setAttribute('aria-label', 'Aplicaciones del estudio');
  const panel = document.createElement('div'); panel.id = 'brand-preview'; panel.setAttribute('role', 'tabpanel');
  const buttons = items.map((item, index) => {
    const button = document.createElement('button'); button.className = 'brand-tab'; button.type = 'button'; button.id = `brand-tab-${item.id}`; button.setAttribute('role', 'tab'); button.setAttribute('aria-controls', panel.id); button.textContent = item.label;
    button.addEventListener('click', () => show(index));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const target = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
      show(target); buttons[target].focus();
    });
    tabs.append(button); return button;
  });
  function show(index) {
    const item = items[index];
    buttons.forEach((button, i) => { button.setAttribute('aria-selected', String(i === index)); button.tabIndex = i === index ? 0 : -1; });
    panel.className = `brand-preview${item.id === 'web' ? ' brand-preview-web' : ''}`;
    panel.setAttribute('aria-labelledby', `brand-tab-${item.id}`);
    panel.innerHTML = `<div class="preview-canvas">${item.mock}</div><div class="preview-info"><span>${item.type}</span><h3>${item.title}</h3><p>${item.copy}</p>${item.id === 'web' ? '<a class="button button-primary preview-full-link" href="https://deepanalytica.github.io/lara-valdivia-propuesta/" target="_blank" rel="noopener noreferrer">Recorrer la web completa ↗</a>' : ''}<p class="small-hint">Demostración conceptual; no es una publicación oficial aprobada.</p></div>`;
  }
  root.replaceChildren(tabs, panel); show(0);
}
const menu = document.getElementById('menu-toggle'), mobile = document.getElementById('nav-mobile');
if (menu && mobile) {
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!open)); menu.setAttribute('aria-label', open ? 'Abrir menú' : 'Cerrar menú'); mobile.hidden = open; });
  mobile.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menú'); mobile.hidden = true; }));
}
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => { const total = document.documentElement.scrollHeight - innerHeight; progress.style.width = `${total ? scrollY / total * 100 : 0}%`; }, { passive: true });
