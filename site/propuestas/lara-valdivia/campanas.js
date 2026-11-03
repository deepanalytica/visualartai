document.querySelectorAll('[data-slider]').forEach(slider => {
  const slides = [...slider.querySelectorAll('[data-slide]')];
  const count = slider.querySelector('[data-count]');
  let index = 0;
  function show(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    count.textContent = `${index + 1} / ${slides.length}`;
  }
  slider.querySelector('[data-prev]').addEventListener('click', () => show(index - 1));
  slider.querySelector('[data-next]').addEventListener('click', () => show(index + 1));
});
