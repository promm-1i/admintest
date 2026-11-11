// Byscreen page behaviour: the display arrangement (drag display 2 around display 1, as in Windows Settings),
// "Identify", the frame-rate lanes, and the nav pane following the scroll. Everything is readable without it.
(() => {
  const ko = document.documentElement.lang === "ko";
  const say = {
    sides: ko ? { right: "오른쪽", left: "왼쪽", top: "위", bottom: "아래" } : { right: "right of", left: "left of", top: "above", bottom: "below" },
    placed: (s) => (ko ? `태블릿이 노트북 ${s}에 붙었습니다.` : `The tablet is now ${s} the laptop.`),
    hz: (n) => (ko ? `지금 이 화면은 약 ${n}Hz입니다.` : `This screen runs at about ${n} Hz.`),
    hzLow: (n) => (ko ? `지금 이 화면은 약 ${n}Hz라 90·120 줄은 60과 같아 보입니다. 120Hz 태블릿에서 보면 차이가 납니다.`
      : `This screen runs at about ${n} Hz, so the 90 and 120 rows look like 60 here. A 120 Hz tablet shows the difference.`),
    play: ko ? "움직이기" : "Play",
    pause: ko ? "멈추기" : "Pause",
  };
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- display arrangement ---------- */
  const canvas = document.querySelector(".canvas");
  if (canvas) {
    canvas.classList.remove("static");
    const m1 = canvas.querySelector('[data-mon="1"]');
    const m2 = canvas.querySelector('[data-mon="2"]');
    const live = document.getElementById("arrange-live");
    const MIN = 0.25; // the share of an edge two displays must keep touching
    let side = "right", along = 0, size = {};

    const measure = () => {
      const W = canvas.clientWidth, H = canvas.clientHeight;
      const s = Math.min(1, W / 760, H / 330);
      size = { W, H, w1: 340 * s, h1: 212 * s, w2: 224 * s, h2: 140 * s };
      for (const [m, w, h] of [[m1, size.w1, size.h1], [m2, size.w2, size.h2]]) {
        m.style.width = `${w}px`; m.style.height = `${h}px`;
      }
    };
    // Position of display 2 relative to display 1's top-left, for a side and an offset along that side.
    const rel = (sd, a) => {
      const { w1, h1, w2, h2 } = size;
      if (sd === "right") return [w1, a];
      if (sd === "left") return [-w2, a];
      if (sd === "top") return [a, -h2];
      return [a, h1];
    };
    const clampAlong = (sd, a) => {
      const { w1, h1, w2, h2 } = size;
      const horiz = sd === "top" || sd === "bottom";
      const lo = horiz ? -w2 + MIN * Math.min(w1, w2) : -h2 + MIN * Math.min(h1, h2);
      const hi = horiz ? w1 - MIN * Math.min(w1, w2) : h1 - MIN * Math.min(h1, h2);
      return Math.max(lo, Math.min(hi, a));
    };
    // Windows recentres the whole arrangement after every move.
    const layout = () => {
      const [x2, y2] = rel(side, along);
      const minX = Math.min(0, x2), minY = Math.min(0, y2);
      const maxX = Math.max(size.w1, x2 + size.w2), maxY = Math.max(size.h1, y2 + size.h2);
      const ox = (size.W - (maxX - minX)) / 2 - minX, oy = (size.H - (maxY - minY)) / 2 - minY;
      m1.style.transform = `translate(${ox}px, ${oy}px)`;
      m2.style.transform = `translate(${ox + x2}px, ${oy + y2}px)`;
      return [ox, oy];
    };
    const announce = () => { live.textContent = say.placed(say.sides[side]); };

    measure();
    along = 0;
    if (!still) {
      // The moment the tablet attaches: it arrives from the right and settles against the laptop.
      const [ox, oy] = layout();
      m2.style.transition = "none";
      m2.style.transform = `translate(${size.W + 20}px, ${oy}px)`;
      m2.style.opacity = "0";
      requestAnimationFrame(() => requestAnimationFrame(() => {
        m2.style.transition = "transform .9s var(--ease), opacity .4s";
        m2.style.opacity = "1";
        layout();
        setTimeout(() => { m2.style.transition = ""; }, 950);
      }));
      void ox;
    } else layout();

    addEventListener("resize", () => { measure(); along = clampAlong(side, along); layout(); });

    let drag = null;
    m2.addEventListener("pointerdown", (e) => {
      m2.setPointerCapture(e.pointerId);
      const [ox, oy] = layout();
      const [x2, y2] = rel(side, along);
      drag = { sx: e.clientX, sy: e.clientY, x: x2, y: y2, ox, oy };
      m2.classList.add("dragging");
    });
    m2.addEventListener("pointermove", (e) => {
      if (!drag) return;
      drag.cx = drag.x + e.clientX - drag.sx;
      drag.cy = drag.y + e.clientY - drag.sy;
      m2.style.transform = `translate(${drag.ox + drag.cx}px, ${drag.oy + drag.cy}px)`;
    });
    const drop = () => {
      if (!drag) return;
      m2.classList.remove("dragging");
      if (drag.cx !== undefined) {
        // Snap to the side display 2's centre is closest to, then slide along that side.
        const { w1, h1, w2, h2 } = size;
        const cx = drag.cx + w2 / 2 - w1 / 2, cy = drag.cy + h2 / 2 - h1 / 2;
        const nx = cx / ((w1 + w2) / 2), ny = cy / ((h1 + h2) / 2);
        side = Math.abs(nx) >= Math.abs(ny) ? (nx > 0 ? "right" : "left") : (ny > 0 ? "bottom" : "top");
        along = clampAlong(side, side === "top" || side === "bottom" ? drag.cx : drag.cy);
        announce();
      }
      drag = null;
      layout();
    };
    m2.addEventListener("pointerup", drop);
    m2.addEventListener("pointercancel", drop);
    m2.addEventListener("keydown", (e) => {
      const to = { ArrowRight: "right", ArrowLeft: "left", ArrowUp: "top", ArrowDown: "bottom" }[e.key];
      if (!to) return;
      e.preventDefault();
      side = to; along = 0; layout(); announce();
    });

    const id = document.getElementById("identify");
    let idTimer;
    id?.addEventListener("click", () => {
      canvas.classList.add("identify");
      clearTimeout(idTimer);
      idTimer = setTimeout(() => canvas.classList.remove("identify"), 2200);
    });
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

  /* ---------- nav pane follows the scroll ---------- */
  const links = new Map([...document.querySelectorAll(".nav a[href^='#']")].map((a) => [a.getAttribute("href").slice(1), a]));
  if (links.size) {
    const seen = new Map();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) seen.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
      let best = null, ratio = 0;
      for (const [id, r] of seen) if (r > ratio) { best = id; ratio = r; }
      if (!best) return;
      for (const [id, a] of links) a.setAttribute("aria-current", String(id === best));
      // On narrow screens the pane is a sideways strip: keep the current item in it.
      const a = links.get(best), strip = a.closest(".nav");
      if (strip.scrollWidth > strip.clientWidth) {
        // Only as far as needed to show the item whole, so the first items stay put near the top.
        const r = a.getBoundingClientRect(), s = strip.getBoundingClientRect();
        if (r.left < s.left + 16) strip.scrollLeft -= s.left + 16 - r.left;
        else if (r.right > s.right - 28) strip.scrollLeft += r.right - (s.right - 28);
      }
    }, { threshold: [0, .15, .3, .5, .75], rootMargin: "-80px 0px -35% 0px" });
    for (const id of links.keys()) { const s = document.getElementById(id); if (s) io.observe(s); }
  }
})();
