(() => {
  const voices = {
    kinesio: {
      sector: "KINESIOLOGÍA",
      image: "images/voices/kinesiologo.webp",
      imageAlt: "Kinesiólogo revisando su agenda en consulta",
      quote: "Soy kinesiólogo, tengo experiencia… y sigo con la agenda vacía.",
      sub: "Mientras me buscan, Google y la IA muestran a otros.",
      query: "kinesiólogo cerca de mí",
      question: "¿Qué kinesiólogos recomiendas en mi ciudad?",
      results: ["Kiné Activa", "FisioSalud", "KinezLife"],
      pain: "Le pregunté a la IA por negocios como el mío. Recomendó a otros. A mí, ni me nombró.",
      diagnosis: "El problema no es tu experiencia. Es que no estás entrando en la decisión.",
      solution: "Haz que te encuentren cuando ya te están buscando.",
      text: "Trabajamos tu presencia para que Google, Maps y los buscadores de IA entiendan qué haces, dónde atiendes y cómo contactarte.",
      tags: ["Google Maps", "SEO local", "Visibilidad IA"],
      interest: "Kinesiología · visibilidad local",
      goal: "No aparezco cuando buscan mis servicios"
    },
    restaurante: {
      sector: "RESTAURANTE / COMIDA CASERA",
      image: "images/voices/restaurante.webp",
      imageAlt: "Dueña de un negocio de comida casera revisando su presencia digital",
      quote: "Tengo comida casera que la gente recomienda… pero nadie me encuentra en Google.",
      sub: "Hay personas buscando dónde almorzar. Eligen entre los negocios que sí ven.",
      query: "almuerzos caseros cerca de mí",
      question: "¿Dónde puedo comer comida casera cerca?",
      results: ["El Rincón del Sabor", "Sabor de Casa", "La Cocina de Mariela"],
      pain: "Mi cocina puede estar llena de sabor. Si no aparezco cuando buscan, para ese cliente no existo.",
      diagnosis: "La gente ya tiene hambre. Tu negocio necesita aparecer antes de que elija dónde comer.",
      solution: "Convierte búsquedas locales en personas entrando, llamando o escribiendo.",
      text: "Ordenamos tu ficha, menú, ubicación, contenido y señales locales para que sea fácil encontrarte y elegirte.",
      tags: ["Google Maps", "Menú y reseñas", "Búsqueda local"],
      interest: "Restaurante · visibilidad local",
      goal: "No aparezco cuando buscan mis servicios"
    },
    ferreteria: {
      sector: "FERRETERÍA / COMERCIO LOCAL",
      image: "images/voices/ferreteria.webp",
      imageAlt: "Dueño de ferretería revisando su negocio desde el mostrador",
      quote: "Mi negocio está abierto y tengo stock… pero en Google Maps parezco invisible.",
      sub: "El cliente necesita algo ahora. Si ve otra ferretería primero, va donde ella.",
      query: "ferretería cerca de mí",
      question: "¿Dónde compro herramientas cerca de aquí?",
      results: ["Ferretería El Maestro", "Todo Herramientas", "Ferretería Central"],
      pain: "Estoy aquí, tengo lo que buscan y aun así el mapa manda clientes a otros negocios.",
      diagnosis: "No basta con tener el producto. Tienes que aparecer en el momento exacto de la necesidad.",
      solution: "Haz visible tu negocio donde la compra local empieza.",
      text: "Mejoramos la presencia de tu local, categorías, productos, ubicación, reseñas y páginas para búsquedas con intención de compra.",
      tags: ["Google Maps", "Perfil local", "Productos"],
      interest: "Ferretería · Google Maps",
      goal: "No aparezco cuando buscan mis servicios"
    },
    arriendos: {
      sector: "ARRIENDOS AMOBLADOS",
      image: "images/voices/arriendos.webp",
      imageAlt: "Propietaria de departamentos amoblados revisando reservas desde su teléfono",
      quote: "Tengo departamentos disponibles… y las reservas terminan llegando a otros.",
      sub: "Disponibilidad sin visibilidad son noches vacías que no se recuperan.",
      query: "departamento amoblado por mes",
      question: "¿Dónde me puedo quedar un mes en esta zona?",
      results: ["Apart Hotel Centro", "Deptos Capital", "Residencial Los Leones"],
      pain: "Tengo disponibilidad, respondo y preparo todo. Pero cuando buscan alojamiento, aparecen otros.",
      diagnosis: "Cada día vacío caduca. La oportunidad está en aparecer antes de que la persona reserve.",
      solution: "Haz que disponibilidad, ubicación y contacto trabajen juntos.",
      text: "Conectamos páginas de arriendo, búsqueda local y contacto directo para reducir la distancia entre una búsqueda y una reserva.",
      tags: ["Búsqueda local", "Landing de arriendo", "WhatsApp"],
      interest: "Arriendos amoblados · captación",
      goal: "Aparezco, pero recibo pocas consultas"
    }
  };

  const $ = id => document.getElementById(id);
  const buttons = [...document.querySelectorAll("[data-voice]")];
  const panel = document.querySelector(".v21-voice-panel");
  if (!buttons.length || !panel) return;

  const setText = (id, value) => { const el = $(id); if (el) el.textContent = value; };
  let timer;

  function render(key) {
    const v = voices[key];
    if (!v) return;

    buttons.forEach(btn => {
      const active = btn.dataset.voice === key;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    panel.classList.remove("is-switching");
    void panel.offsetWidth;
    panel.classList.add("is-switching");
    clearTimeout(timer);
    timer = setTimeout(() => panel.classList.remove("is-switching"), 450);

    const img = $("v21VoiceImage");
    if (img) {
      img.src = v.image;
      img.alt = v.imageAlt;
    }

    setText("v21Sector", v.sector);
    setText("v21PhotoQuote", v.quote);
    setText("v21Query", v.query);
    setText("v21Question", v.question);
    setText("v21Pain", v.pain);
    setText("v21Diagnosis", v.diagnosis);
    setText("v21Solution", v.solution);
    setText("v21SolutionText", v.text);

    const results = $("v21Results");
    if (results) results.innerHTML = v.results.map(name => '<div class="v21-result"><i aria-hidden="true"></i><span>' + name + '</span></div>').join("");

    const tags = $("v21Tags");
    if (tags) tags.innerHTML = v.tags.map(tag => "<span>" + tag + "</span>").join("");

    const cta = $("v21Cta");
    if (cta) cta.dataset.interest = v.interest;

    const interest = $("interest");
    if (interest) interest.value = v.interest;

    const goal = $("goal");
    if (goal && [...goal.options].some(o => o.value === v.goal)) goal.value = v.goal;
  }

  buttons.forEach(btn => btn.addEventListener("click", () => render(btn.dataset.voice)));
  Object.values(voices).forEach(v => { const img = new Image(); img.src = v.image; });
})();