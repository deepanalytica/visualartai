// Decorative scene: progressive enhancement only; content remains available without WebGL.
const hero = document.querySelector('.brief-hero');
const motionAllowed = matchMedia('(prefers-reduced-motion: no-preference)');
const wideScreen = matchMedia('(min-width: 801px)');

if (hero && motionAllowed.matches && wideScreen.matches && !navigator.connection?.saveData) {
  const observer = new IntersectionObserver(async entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    try {
      const THREE = await import('./vendor/three.module.min.js');
      const layer = document.createElement('div');
      layer.className = 'hero-signal';
      layer.setAttribute('aria-hidden', 'true');
      hero.prepend(layer);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      layer.append(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, .1, 100);
      camera.position.z = 8;
      const group = new THREE.Group();
      group.position.set(2.25, .1, 0);
      scene.add(group);
      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x719cff, transparent: true, opacity: .24, wireframe: true });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.2, .012, 5, 100), ringMaterial);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.75, .009, 5, 100), ringMaterial);
      ring.rotation.x = 1.05;
      ring2.rotation.y = .8;
      group.add(ring, ring2);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(.045, 12, 8), new THREE.MeshBasicMaterial({ color: 0xff847c }));
      dot.position.set(2.1, .3, .1);
      group.add(dot);
      const resize = () => {
        const { width, height } = hero.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(hero);
      resize();
      let visible = true;
      const visibility = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; });
      visibility.observe(hero);
      renderer.setAnimationLoop(() => {
        if (!visible || document.hidden || !motionAllowed.matches || !wideScreen.matches) return;
        group.rotation.y += .0015;
        group.rotation.z += .0006;
        renderer.render(scene, camera);
      });
      window.addEventListener('pagehide', () => {
        renderer.setAnimationLoop(null);
        resizeObserver.disconnect(); visibility.disconnect();
        ring.geometry.dispose(); ring2.geometry.dispose(); dot.geometry.dispose();
        ringMaterial.dispose(); dot.material.dispose(); renderer.dispose();
      }, { once: true });
    } catch (_) {
      // A static background remains in place if the browser cannot render the scene.
    }
  }, { rootMargin: '160px' });
  observer.observe(hero);
}
