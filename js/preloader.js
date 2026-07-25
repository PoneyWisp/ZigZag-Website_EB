// Loader : le logo se remplit de bas en haut (cache qui se rétracte) tout en
// apparaissant en fondu/zoom, puis monte jusqu'à sa position "masthead" en
// haut de l'écran, puis tout le panneau s'efface en fondu pour révéler la page.
(function () {
  const preloader = document.querySelector(".preloader");
  if (!preloader || typeof gsap === "undefined") return;

  const box = preloader.querySelector(".brand-lockup");
  const mask = preloader.querySelector(".preloader_mask");
  const logo = preloader.querySelector(".brand-lockup_logo");
  const scrollCue = document.querySelector(".home-header_scroll-cue");
  const heroSides = document.querySelectorAll(".home-header_hero-side");
  if (!box || !mask || !logo) return;

  gsap.set(preloader, { display: "flex" });
  gsap.set(box, { y: "60vh" }); // position de départ : bas-centre (le logo atterrit maintenant en haut, façon masthead)
  gsap.set(logo, { opacity: 0, scale: 0.8 });
  // Le scroll-cue a sa propre animation CSS (transform: translate(-50%, ...)
  // pour le centrage + le rebond) : on ne touche ici qu'à l'opacité pour ne
  // pas entrer en conflit avec ce transform.
  if (scrollCue) gsap.set(scrollCue, { opacity: 0 });
  if (heroSides.length) gsap.set(heroSides, { opacity: 0, y: 12 });

  const tl = gsap.timeline({
    onComplete: () => gsap.set(preloader, { display: "none" }),
  });

  // Remplissage (bas -> haut) + fondu/zoom du logo, en simultané
  tl.to(mask, { scaleY: 0, duration: 1.1, ease: "expo.inOut" }, 0);
  tl.to(logo, { opacity: 1, scale: 1, duration: 0.75, ease: "power2.out" }, 0);

  // Montée vers le centre exact de l'écran (s'arrête à y:0) : le lockup du hero,
  // identique et déjà en place, prend le relai sans saut visible
  tl.to(box, { y: "0vh", duration: 1.2, ease: "expo.inOut" }, 1.0);

  // Fondu de sortie : tout le panneau s'efface, chevauche la fin de la montée
  tl.to(preloader, { opacity: 0, duration: 0.5, ease: "power1.in" }, 1.9);

  // Indicateur de scroll + textes gauche/droite : apparaissent juste après le fondu du panneau
  if (scrollCue) {
    tl.to(scrollCue, { opacity: 1, duration: 0.6, ease: "power2.out" }, 2.1);
  }
  if (heroSides.length) {
    tl.to(heroSides, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 2.1);
  }
})();
