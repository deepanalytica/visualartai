const root = document.getElementById('brand-tabs-root');
if (root) {
  const devices = root.querySelector('.product-devices')?.outerHTML || '';
  const items = [
    { id: 'web', label: 'Su web', type: '01 / EXPERIENCIA DIGITAL', title: 'Así se vería su web en cada pantalla.', copy: 'La web demostrativa se adapta a escritorio, notebook, tablet y teléfono. Ábranla para recorrer el diseño preparado para su estudio.', mock: devices, url:'https://deepanalytica.github.io/lara-valdivia-propuesta/', cta:'Recorrer la web completa ↗' },
    { id: 'social', label: 'Sus redes', type: '02 / INSTAGRAM Y FACEBOOK', title: 'Así se verían sus redes sociales.', copy: 'Su marca aplicada a un perfil de Instagram con historias destacadas y publicaciones, y a una propuesta de página de Facebook. Abran los modelos para explorar sus detalles.', mock: '<div class="social-showcase"><a class="social-example instagram-example" href="https://deepanalytica.github.io/lara-valdivia-propuesta/marca/mockups.html?view=instagram" target="_blank" rel="noopener noreferrer"><img src="./imagenes/instagram-completo.png" width="395" height="815" alt="Vista conceptual del perfil de Instagram con historias destacadas y seis publicaciones"><span>Explorar Instagram interactivo ↗</span></a><a class="social-example facebook-example" href="https://deepanalytica.github.io/lara-valdivia-propuesta/marca/mockups.html?view=facebook" target="_blank" rel="noopener noreferrer"><img src="./imagenes/facebook.webp" width="1480" height="1544" alt="Vista conceptual de página de Facebook con portada y publicación del estudio"><span>Explorar propuesta para Facebook ↗</span></a></div>', url:'https://deepanalytica.github.io/lara-valdivia-propuesta/marca/mockups.html?view=instagram', cta:'Abrir redes interactivas ↗' },
    { id: 'tarjetas', label: 'Sus tarjetas', type: '03 / IDENTIDAD EN SUS MANOS', title: 'Así se verían sus tarjetas y artículos.', copy: 'Una misma identidad en tarjetas, libreta, carpeta y lápiz. La imagen muestra aplicaciones conceptuales; se entrega el diseño digital de tarjetas. La fabricación de los objetos debe contratarse por separado.', mock: '<a class="premium-artwork" href="https://deepanalytica.github.io/lara-valdivia-propuesta/marca/mockups.html?view=objetos" target="_blank" rel="noopener noreferrer"><img src="./imagenes/oficina.webp" width="1536" height="1024" alt="Mockup profesional de libreta, carpeta, tarjeta y lápiz con la identidad Lara y Valdivia"><span>Ampliar aplicaciones de marca ↗</span></a>', url:'https://deepanalytica.github.io/lara-valdivia-propuesta/marca/mockups.html?view=objetos', cta:'Ver aplicaciones de marca ↗' },
    { id: 'documento', label: 'Sus documentos', type: '04 / PAPELERÍA CORPORATIVA', title: 'Así se verían sus documentos corporativos.', copy: 'Una línea visual para hoja membretada, tarjetas, sobre y carpeta. El plan Estudio Profesional incluye los diseños digitales de la hoja y las tarjetas, y una plantilla de informe o presentación. No incluye impresión ni fabricación.', mock: '<a class="premium-artwork" href="https://deepanalytica.github.io/lara-valdivia-propuesta/marca/mockups.html?view=papeleria" target="_blank" rel="noopener noreferrer"><img src="./imagenes/documentos.webp" width="1536" height="1024" alt="Mockup profesional de hoja membretada, tarjetas y carpeta con la marca Lara y Valdivia"><span>Ampliar papelería corporativa ↗</span></a>', url:'https://deepanalytica.github.io/lara-valdivia-propuesta/marca/mockups.html?view=papeleria', cta:'Ver papelería completa ↗' }
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
    panel.className = `brand-preview brand-preview-web brand-preview-${item.id}`;
    panel.setAttribute('aria-labelledby', `brand-tab-${item.id}`);
    panel.innerHTML = `<div class="preview-info"><span>${item.type}</span><h3>${item.title}</h3><p>${item.copy}</p><a class="button button-primary preview-full-link" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.cta}</a><p class="small-hint">Demostración conceptual; no es una publicación oficial aprobada.</p></div><div class="preview-canvas">${item.mock}</div>`;
  }
  root.replaceChildren(tabs, panel); show(0);
}
const menu = document.getElementById('menu-toggle'), mobile = document.getElementById('nav-mobile');
if (menu && mobile) {
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!open)); menu.setAttribute('aria-label', open ? 'Abrir menú' : 'Cerrar menú'); mobile.hidden = open; });
  mobile.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menú'); mobile.hidden = true; }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobile.hidden) {
      mobile.hidden = true;
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Abrir menú');
      menu.focus();
    }
  });
}
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => { const total = document.documentElement.scrollHeight - innerHeight; progress.style.width = `${total ? scrollY / total * 100 : 0}%`; }, { passive: true });

const offerTabs = [...document.querySelectorAll('[data-offer]')];
function selectOffer(button) {
  offerTabs.forEach(tab => {
    const selected = tab === button;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
  });
}
offerTabs.forEach((button, index) => {
  button.addEventListener('click', () => selectOffer(button));
  button.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? offerTabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + offerTabs.length) % offerTabs.length;
    selectOffer(offerTabs[next]); offerTabs[next].focus();
  });
});
