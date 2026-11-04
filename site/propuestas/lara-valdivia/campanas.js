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
  slider.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    show(index + (event.key === 'ArrowRight' ? 1 : -1));
  });
  let startX = null;
  slider.addEventListener('touchstart', event => { startX = event.touches[0]?.clientX ?? null; }, { passive: true });
  slider.addEventListener('touchend', event => {
    if (startX === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? startX) - startX;
    startX = null;
    if (Math.abs(delta) > 55) show(index + (delta < 0 ? 1 : -1));
  }, { passive: true });
});
