// Header : masqué par défaut, apparaît en scrollant vers le haut, se
// remasque automatiquement après quelques secondes d'inactivité.
// Toujours en style "verre" (is-scrolled) — plus de barre plate.
// Ne se révèle jamais tant qu'on est encore dans le hero (le logo y tient
// déjà lieu d'en-tête) : évite qu'elle passe par-dessus le lockup de marque.
// S'appuie sur l'instance Lenis déjà initialisée sur la page (repli sur le scroll natif si absente).
(function () {
  const nav = document.querySelector(".navbar");
  if (!nav) return;

  const hero = document.querySelector(".section_home-header");
  const autoHideDelay = 4000; // ms d'inactivité avant masquage auto
  let hideTimer = null;

  function heroHeight() {
    return hero ? hero.offsetHeight : window.innerHeight;
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => nav.classList.add("u-nav-hidden"), autoHideDelay);
  }

  function update(scrollY, direction) {
    if (scrollY < heroHeight()) {
      clearTimeout(hideTimer);
      nav.classList.add("u-nav-hidden");
      return;
    }

    if (direction < 0) {
      nav.classList.remove("u-nav-hidden");
      scheduleHide();
    } else if (direction > 0) {
      clearTimeout(hideTimer);
      nav.classList.add("u-nav-hidden");
    }
  }

  if (typeof lenis !== "undefined" && lenis && typeof lenis.on === "function") {
    lenis.on("scroll", (e) => update(e.scroll, e.direction));
  } else {
    let lastY = window.scrollY;
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        update(y, y > lastY ? 1 : -1);
        lastY = y;
      },
      { passive: true },
    );
  }
})();
