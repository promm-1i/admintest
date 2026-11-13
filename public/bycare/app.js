// Bycare page behaviour (Byphoto's, public/byphoto/app.js): each scene's line rises
// in as it comes into view. Everything is readable without it.
(() => {
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scenes = document.querySelectorAll(".scene:not(.s-hero)");
  if (scenes.length && !still && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -18% 0px" });
    scenes.forEach((s) => io.observe(s));
  }
})();
