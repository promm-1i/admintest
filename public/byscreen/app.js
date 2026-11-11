// Byscreen page behaviour: each scene's line rises in as it comes into view, and the frame-rate lanes.
// Everything is readable without it.
(() => {
  const ko = document.documentElement.lang === "ko";
  const say = {
    hz: (n) => (ko ? `지금 이 화면은 약 ${n}Hz입니다.` : `This screen runs at about ${n} Hz.`),
    hzLow: (n) => (ko ? `지금 이 화면은 약 ${n}Hz라 90·120 줄은 60과 같아 보입니다. 120Hz 태블릿에서 보면 차이가 납니다.`
      : `This screen runs at about ${n} Hz, so the 90 and 120 rows look like 60 here. A 120 Hz tablet shows the difference.`),
    play: ko ? "움직이기" : "Play",
    pause: ko ? "멈추기" : "Pause",
  };
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- scenes: the line rises in once (the first scene is already there) ---------- */
  const scenes = document.querySelectorAll(".scene:not(.s-hero)");
  if (scenes.length && !still && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -18% 0px" });
    scenes.forEach((s) => io.observe(s));
  }

  /* ---------- frame-rate lanes ---------- */
  const rate = document.querySelector(".rate");
  if (rate) {
    const lanes = [...rate.querySelectorAll(".lane")].map((l) => ({ fps: +l.dataset.fps, puck: l.querySelector(".puck"), track: l.querySelector(".track") }));
    const btn = rate.querySelector(".toggle");
    const note = rate.querySelector(".hz");
    let running = !still, visible = false, t0 = performance.now(), raf = 0;
    const SWEEP = 2.4; // seconds for one pass

    const frame = (now) => {
      const t = (now - t0) / 1000;
      for (const l of lanes) {
        const shown = Math.floor(t * l.fps) / l.fps; // the latest frame this rate would have sent
        const p = (shown % SWEEP) / SWEEP;
        const span = l.track.clientWidth - l.puck.clientWidth;
        l.puck.style.transform = `translateX(${(p < .5 ? p * 2 : 2 - p * 2) * span}px)`;
      }
      raf = requestAnimationFrame(frame);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      if (running && visible) raf = requestAnimationFrame(frame);
      btn.textContent = running ? say.pause : say.play;
      btn.setAttribute("aria-pressed", String(!running));
    };
    btn.addEventListener("click", () => { running = !running; sync(); });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }).observe(rate);
    sync();

    // Measure this screen's refresh rate, so the note can say honestly what the visitor can see here.
    const ts = [];
    const probe = (now) => {
      ts.push(now);
      if (ts.length < 61) return requestAnimationFrame(probe);
      const gaps = ts.slice(1).map((v, i) => v - ts[i]).sort((a, b) => a - b);
      const hz = Math.round(1000 / gaps[gaps.length >> 1] / 10) * 10 || 60;
      note.textContent = hz < 90 ? say.hzLow(hz) : say.hz(hz);
    };
    requestAnimationFrame(probe);
  }
})();
