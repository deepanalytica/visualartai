(() => {
  function openDestination(hash, shouldScroll) {
    if (!hash || hash === '#') return;
    const destination = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!destination) return;
    if (destination instanceof HTMLDetailsElement) destination.open = true;
    let parent = destination.parentElement;
    while (parent) {
      if (parent instanceof HTMLDetailsElement) parent.open = true;
      parent = parent.parentElement;
    }
    if (shouldScroll) requestAnimationFrame(() => destination.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'}));
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    openDestination(link.getAttribute('href'), true);
  });
  window.addEventListener('hashchange', () => openDestination(location.hash, false));
  openDestination(location.hash, true);
})();
