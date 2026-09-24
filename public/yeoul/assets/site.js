/* clinic-h 여울성형외과 — 공통 스크립트
   모션 길이·이징·지연은 레퍼런스 main.js(GSAP) 실측값을 그대로 옮기고, 라이브러리 없이 rAF 로 돌린다.
   power1=quad · power2=cubic · power3=quart (GSAP 정의) */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const body = document.body;

  const pow = (n) => ({
    in: (t) => t ** n,
    out: (t) => 1 - (1 - t) ** n,
    inOut: (t) => (t < 0.5 ? 2 ** (n - 1) * t ** n : 1 - (-2 * t + 2) ** n / 2),
  });
  const EASE = { none: (t) => t, p1: pow(2), p2: pow(3), p3: pow(4) };

  // 작은 트윈: apply(0→1 진행값)를 dur 초 동안 부른다. kill() 로 멈춘다.
  function anim(dur, ease, apply, { delay = 0, done } = {}) {
    let raf = 0, t0 = 0, dead = false;
    const step = (now) => {
      if (dead) return;
      if (!t0) t0 = now + delay * 1000;
      const k = dur ? clamp((now - t0) / (dur * 1000)) : 1;
      if (now >= t0) apply(ease(k));
      if (k < 1 || now < t0) raf = requestAnimationFrame(step);
      else if (done) done();
    };
    raf = requestAnimationFrame(step);
    return { kill() { dead = true; cancelAnimationFrame(raf); } };
  }

  /* ── 헤더 아이콘 색: 헤더 바로 아래 섹션의 data-head 로 ───────────── */
  const head = $(".site-head");
  let headHook = null; // 서브 쪽이 본문 톤을 덧씌우는 자리
  function probeHead() {
    if (!head) return;
    const y = Math.min(head.getBoundingClientRect().height + 8, innerHeight - 4);
    const x = innerWidth / 2;
    let sec = null;
    for (const el of document.elementsFromPoint(x, y)) {
      if (el.closest && (sec = el.closest("[data-head]"))) break;
    }
    let dark = sec && sec.dataset.head === "dark";
    if (dark) { // 가로 패널 전환 중엔 섹션이 화면 가로를 56% 이상 덮을 때만
      const r = sec.getBoundingClientRect();
      dark = (Math.min(innerWidth, r.right) - Math.max(0, r.left)) / innerWidth >= 0.56;
    }
    root.classList.toggle("head-dark", !!dark);
    if (headHook) headHook();
  }
  let headQueued = false;
  const queueHead = () => { if (!headQueued) { headQueued = true; requestAnimationFrame(() => { headQueued = false; probeHead(); }); } };
  addEventListener("scroll", queueHead, { passive: true });
  addEventListener("resize", queueHead);

  /* ── 전체 메뉴 ─────────────────────────────────────────────── */
  const menu = $("#menu"), ham = $(".ham");
  if (menu && ham) {
    const close = $(".menu__close", menu);
    const syncClose = () => { // X 를 햄버거 자리에 겹친다
      const r = ham.getBoundingClientRect();
      close.style.top = `${r.top}px`; close.style.left = `${r.left}px`; close.style.right = "auto";
    };
    const open = () => {
      menu.classList.add("on"); menu.setAttribute("aria-hidden", "false"); ham.setAttribute("aria-expanded", "true");
      body.classList.add("menu-lock"); syncClose();
      setTimeout(() => $(".menu__nav a", menu)?.focus(), 60);
    };
    const shut = () => {
      if (!menu.classList.contains("on")) return;
      menu.classList.remove("on"); menu.setAttribute("aria-hidden", "true"); ham.setAttribute("aria-expanded", "false");
      body.classList.remove("menu-lock"); ham.focus();
    };
    ham.addEventListener("click", open);
    close.addEventListener("click", shut);
    $(".menu__dim", menu).addEventListener("click", shut);
    addEventListener("keydown", (e) => {
      if (!menu.classList.contains("on")) return;
      if (e.key === "Escape") shut();
      if (e.key === "Tab") { // 패널 안에서만 돈다
        const f = $$("a,button:not(.menu__dim)", menu);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    addEventListener("resize", () => menu.classList.contains("on") && syncClose());
  }

  /* ── 맨 위로 ──────────────────────────────────────────────── */
  const top = $(".to-top");
  if (top) {
    const upd = () => top.classList.toggle("show", scrollY > 4);
    addEventListener("scroll", upd, { passive: true }); upd();
    top.addEventListener("click", () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
  }

  /* ── 상담 띠: 배경 패럴럭스(-20%→20%) · 글자 순차 등장(871px 이상, 호버) ── */
  const band = $(".consult-band");
  if (band) {
    const bg = $(".consult-band__bg", band);
    const par = () => {
      const r = band.getBoundingClientRect();
      const k = clamp((innerHeight - r.top) / (innerHeight + r.height));
      bg.style.transform = `translate3d(0,${lerp(-20, 20, k)}%,0)`;
    };
    if (!reduce) { addEventListener("scroll", par, { passive: true }); addEventListener("resize", par); par(); }
    const link = $(".consult-band__title a", band);
    const parts = $$(".consult-band__letters > *", band);
    let playing = false;
    const play = () => {
      if (playing || reduce || innerWidth < 871) return;
      playing = true;
      parts.forEach((el, i) => anim(0.4, EASE.p1.inOut, (k) => {
        el.style.opacity = k; el.style.transform = `translateX(${lerp(-0.5, 0, k)}em)`;
      }, { delay: i * 0.05, done: i === parts.length - 1 ? () => { playing = false; } : undefined }));
      parts.forEach((el) => { el.style.opacity = 0; });
    };
    link.addEventListener("mouseenter", play);
    link.addEventListener("focus", play);
  }

  /* ── 서브 쪽 스크롤 등장 [data-rv] (레퍼런스 AOS: 600ms · ease-out-cubic · offset 80 · 되감기 있음) ── */
  const rvs = $$("[data-rv]");
  if (rvs.length) {
    if (reduce || !("IntersectionObserver" in window)) rvs.forEach((el) => el.classList.add("rv-on"));
    else {
      const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("rv-on", e.isIntersecting)), { rootMargin: "0px 0px -80px 0px" });
      rvs.forEach((el) => io.observe(el));
    }
  }

  /* ── 서브: 쪽 배경색 전환 [data-bg] — 구간 윗선이 화면 55% 를 지나면 그 색으로 ── */
  const subMain = body.classList.contains("page-sub") ? $("main") : null;
  if (subMain) {
    const zones = $$("[data-bg]", subMain);
    const base = getComputedStyle(subMain).backgroundColor;
    const lum = (c) => {
      const m = c.startsWith("#") ? [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)) : (c.match(/\d+(\.\d+)?/g) || [0, 0, 0]).map(Number);
      return (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255;
    };
    let curBg = null;
    const tone = () => {
      let c = base;
      for (const z of zones) if (z.getBoundingClientRect().top <= innerHeight * 0.55) c = z.dataset.bg;
      if (c === curBg) return;
      curBg = c;
      subMain.style.backgroundColor = c;
      subMain.classList.toggle("tone-light", lum(c) >= 0.66);
      queueHead();
    };
    addEventListener("scroll", tone, { passive: true }); tone();
  }
  // 헤더 아래가 서브 본문이면 본문 톤을 따른다
  if (subMain && head) headHook = () => {
    const y = head.getBoundingClientRect().height + 8;
    const under = document.elementFromPoint(innerWidth / 2, y);
    if (under && !under.closest("[data-head]") && subMain.contains(under)) root.classList.toggle("head-dark", subMain.classList.contains("tone-light"));
  };

  /* ── 서브 머리 사진: 화면 85% 에 닿으면 52% → 100% (2초 · power3.out) ── */
  $$(".s-visual__img.pre").forEach((el) => {
    if (reduce || !("IntersectionObserver" in window)) { el.classList.remove("pre"); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const W = el.parentElement.clientWidth;
      anim(2, EASE.p3.out, (k) => { el.style.width = `${lerp(W * 0.52, W, k)}px`; }, { done: () => { el.classList.remove("pre"); el.style.width = ""; } });
    }, { rootMargin: "0px 0px -15% 0px" });
    io.observe(el);
  });

  /* ── 접이식: 하나만 열린다. 높이 0.5초 ── */
  $$(".acc").forEach((list) => {
    const items = $$(".acc__item", list);
    const set = (it, open, instant) => {
      const a = $(".acc__a", it);
      const was = it.classList.contains("open") && a.style.height === "auto";
      it.classList.toggle("open", open);
      $(".acc__btn", it).setAttribute("aria-expanded", String(open));
      if (instant) { a.style.height = open ? "auto" : "0px"; return; }
      if (open) {
        a.style.height = `${a.scrollHeight}px`;
        a.addEventListener("transitionend", function end(e) { if (e.propertyName === "height" && it.classList.contains("open")) a.style.height = "auto"; a.removeEventListener("transitionend", end); });
      } else if (was || a.style.height !== "0px") {
        a.style.height = `${a.scrollHeight}px`; void a.offsetHeight; a.style.height = "0px"; // auto → 픽셀 → 0 으로 접는다
      }
    };
    items.forEach((it) => set(it, it.classList.contains("open"), true));
    items.forEach((it) => $(".acc__btn", it).addEventListener("click", () => {
      const willOpen = !it.classList.contains("open");
      items.forEach((o) => o !== it && o.classList.contains("open") && set(o, false));
      set(it, willOpen);
    }));
  });

  /* ── 가로 슬라이드 [data-slider]: 네 가지 기준(카드 폭 + 24 간격) · 공간 사진(한 장씩) ── */
  $$("[data-slider]").forEach((wr) => {
    const track = $(".standard__track, .space__track", wr);
    const slides = Array.from(track.children);
    const prev = $(".prev", wr), next = $(".next", wr);
    let i = 0;
    const go = (n) => {
      i = clamp(n, 0, slides.length - 1);
      const x = slides[i].offsetLeft - slides[0].offsetLeft;
      track.style.transform = `translate3d(${-x}px,0,0)`;
      slides.forEach((s, k) => s.classList.toggle("on", k === i));
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === slides.length - 1;
    };
    prev?.addEventListener("click", () => go(i - 1));
    next?.addEventListener("click", () => go(i + 1));
    let sx = null; // 터치로 넘기기
    track.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", (e) => { if (sx === null) return; const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 40) go(i + (d < 0 ? 1 : -1)); sx = null; });
    addEventListener("resize", () => go(i));
    wr.goTo = go;
    go(0);
  });

  /* ── 고민 고르기(1200 이하): 번호 줄 ↔ 가로 스냅 카드 ── */
  $$(".pick").forEach((sec) => {
    const row = $(".pick__row", sec), dots = $$(".pick__dots button", sec), cards = $$(".pick__item", sec);
    if (!dots.length) return;
    const mark = (k) => {
      dots.forEach((d, j) => d.setAttribute("aria-selected", String(j === k)));
      cards.forEach((c, j) => c.classList.toggle("on", j === k));
    };
    dots.forEach((d, k) => d.addEventListener("click", () => {
      row.scrollTo({ left: cards[k].offsetLeft - row.offsetLeft, behavior: reduce ? "auto" : "smooth" }); mark(k);
    }));
    let t; row.addEventListener("scroll", () => { clearTimeout(t); t = setTimeout(() => mark(Math.round(row.scrollLeft / row.clientWidth)), 60); }, { passive: true });
    mark(0);
  });

  /* ── 공간 탭 ── */
  const tablist = $(".space [role=tablist]");
  if (tablist) {
    const tabs = $$("[role=tab]", tablist);
    const pick = (t) => {
      tabs.forEach((x) => {
        const on = x === t;
        x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1;
        const p = $(`#${x.getAttribute("aria-controls")}`); p.hidden = !on;
        if (on && p.goTo) p.goTo(0);
      });
    };
    tabs.forEach((t, k) => {
      t.addEventListener("click", () => pick(t));
      t.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (d) { const n = tabs[(k + d + tabs.length) % tabs.length]; pick(n); n.focus(); }
      });
    });
  }

  /* ── 목록 거르기 (후기 · 칼럼) + 후기 쪽 넘김(5개씩) ── */
  $$("[data-filter]").forEach((bar) => {
    const scope = bar.closest("section, .think-list") || document;
    const items = $$("[data-cats]", scope);
    const listEl = $("[data-page]", scope);
    const per = listEl ? +listEl.dataset.page : 0;
    const pager = $(".pager", scope);
    let cat = "전체", page = 1;
    const render = () => {
      const hit = items.filter((it) => cat === "전체" || it.dataset.cats.split(",").includes(cat));
      const pages = per ? Math.max(1, Math.ceil(hit.length / per)) : 1;
      page = Math.min(page, pages);
      items.forEach((it) => { it.hidden = true; });
      hit.forEach((it, k) => { it.hidden = per ? Math.floor(k / per) + 1 !== page : false; });
      if (!pager) return;
      pager.innerHTML = "";
      for (let n = 1; n <= pages; n++) {
        const b = document.createElement("button");
        b.type = "button"; b.textContent = n; b.setAttribute("aria-label", `${n}쪽`);
        if (n === page) b.setAttribute("aria-current", "page");
        b.addEventListener("click", () => { page = n; render(); scope.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); });
        pager.appendChild(b);
      }
      const nx = document.createElement("button");
      nx.type = "button"; nx.textContent = "›"; nx.setAttribute("aria-label", "다음 쪽"); nx.disabled = page >= pages;
      nx.addEventListener("click", () => { page += 1; render(); });
      pager.appendChild(nx);
    };
    $$("button", bar).forEach((b) => b.addEventListener("click", () => {
      $$("button", bar).forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", String(x === b)); });
      cat = b.dataset.cat; page = 1; render();
    }));
    render();
  });

  /* ── 상담 신청서: 입력 확인만 하고 전송하지 않는다(포트폴리오 데모) ── */
  const form = $("#consult-form");
  if (form) {
    const msg = $(".cform__msg", form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = form.elements;
      const name = f.name.value.trim(), tel = f.tel.value.trim(), text = f.msg.value.trim();
      const picked = $$("input[name=concern]:checked", form).length;
      let err = "";
      if (!name) err = "이름을 입력해 주세요.";
      else if (!/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(tel)) err = "연락처를 010-1234-5678 형식으로 입력해 주세요.";
      else if (!picked) err = "현재 고민을 하나 이상 골라 주세요.";
      else if (text.length < 5) err = "상담 내용을 조금 더 적어 주세요.";
      else if (!f.agree.checked) err = "개인정보 수집 및 이용에 동의해 주세요.";
      msg.classList.toggle("err", !!err);
      if (err) { msg.textContent = err; return; }
      msg.textContent = "데모 페이지라 실제로 전송되지는 않습니다. 운영 시에는 이 자리에서 병원으로 상담 신청이 접수됩니다.";
      form.reset();
    });
  }
  $$("[data-modal]").forEach((b) => {
    const m = $(`#${b.dataset.modal}`);
    const close = () => { m.classList.remove("open"); m.hidden = true; b.focus(); };
    b.addEventListener("click", () => { m.hidden = false; m.classList.add("open"); $(".modal__x", m).focus(); });
    $$("[data-close]", m).forEach((x) => x.addEventListener("click", close));
    m.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  });

  /* ════════════════════ 메인 ════════════════════ */
  const intro = $("#intro");
  if (!intro) { probeHead(); return; }

  const pin = $("#panel-pin"), main = $("main", pin), inner = $(".panel-inner", pin);
  const cards = $$(".v-card"), vSub = $(".visual__sub");

  // 인트로 마퀴: 한 세트 폭만큼 이동, 화면보다 길게 복제. 초당 68px, 최소 18초
  (function marquee() {
    const wr = $(".intro__mq", intro), track = $(".intro__mq-track", intro), first = $(".intro__mq-set", intro);
    const apply = () => {
      $$("[data-clone]", track).forEach((n) => n.remove());
      const w = first.getBoundingClientRect().width;
      if (w < 2) return;
      let g = 0;
      while ((track.children.length < 2 || track.scrollWidth < wr.clientWidth + w) && g++ < 12) {
        const c = first.cloneNode(true); c.dataset.clone = "1"; c.setAttribute("aria-hidden", "true"); track.appendChild(c);
      }
      track.style.setProperty("--mq-shift", `-${Math.round(w)}px`);
      track.style.setProperty("--mq-dur", `${Math.max(18, w / 68).toFixed(2)}s`);
    };
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(apply));
    let t; addEventListener("resize", () => { clearTimeout(t); t = setTimeout(apply, 120); });
  })();

  // 가로 패널: 스크롤 500px 동안 main 이 고정되고, 인트로는 왼쪽으로 빠지고 본문이 오른쪽에서 들어온다.
  // 레퍼런스 코드는 end:'+=500vh' 지만 ScrollTrigger 가 단위를 버려 실제로는 500px 이다(라이브 문서높이 3679→4179 실측).
  const PANEL = 500;
  let panelOn = false;
  const setPanel = (p) => {
    inner.style.transform = p >= 1 ? "" : `translate3d(${(1 - p) * 100}%,0,0)`;
    intro.style.transform = `translate3d(${-p * 100}%,0,0)`;
    cards.forEach((c) => c.style.setProperty("--bg-scale", lerp(1.35, 1, p)));
    vSub?.style.setProperty("--sub-off", `${lerp(120, 0, p)}px`);
    const gone = p >= 1;
    intro.style.visibility = gone ? "hidden" : "visible";
    intro.style.pointerEvents = gone ? "none" : "auto";
  };
  const sizePin = () => { pin.style.height = `${main.offsetHeight + PANEL}px`; };
  const onPanelScroll = () => setPanel(clamp(scrollY / PANEL));
  function enablePanel() {
    if (panelOn) return;
    panelOn = true;
    root.classList.remove("intro-lock"); body.classList.remove("intro-lock");
    body.classList.add("head-ready");
    sizePin(); onPanelScroll();
    addEventListener("scroll", onPanelScroll, { passive: true });
    addEventListener("resize", () => { sizePin(); onPanelScroll(); });
    ring.arm();
    queueHead();
  }
  // 공지 팝업: 인트로가 끝나면 0.6초에 나타난다. "오늘 하루 열지 않기" 는 24시간 숨김
  const pop = $("#pop");
  let popShown = false;
  function showPop() {
    if (!pop || popShown) return;
    popShown = true;
    try { if (+localStorage.getItem("yeoul-pop-hide") > Date.now()) return; } catch { /* 저장 불가면 매번 보인다 */ }
    pop.hidden = false;
    requestAnimationFrame(() => pop.classList.add("show"));
    $(".pop__close", pop).focus({ preventScroll: true });
  }
  if (pop) {
    const hide = () => { pop.hidden = true; pop.classList.remove("show"); };
    $(".pop__close", pop).addEventListener("click", hide);
    $(".pop__today", pop).addEventListener("click", () => { try { localStorage.setItem("yeoul-pop-hide", String(Date.now() + 864e5)); } catch { /* 무시 */ } hide(); });
    pop.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
  }

  function skipIntro() {
    intro.style.display = "none";
    body.classList.add("head-ready");
    setPanel(1);
    ring.arm();
    probeHead();
    showPop();
  }

  // 인트로 타임라인 (초): 점 0.5–2.5 · 물결 2–5 · 로고 흰색 3–4 · 얼굴 면 3.5–8.5 → 첫 휠/터치에 마퀴 등장 → 패널
  function runIntro() {
    root.classList.add("intro-lock"); body.classList.add("intro-lock");
    const [d1, d2] = $$(".intro__dots span", intro);
    d1.innerHTML = "<i></i>".repeat(15); d2.innerHTML = "<i></i>".repeat(12);
    const dots = $$(".intro__dots i", intro);
    const topS = $(".intro__shape.top", intro), botS = $(".intro__shape.bottom", intro);
    const logoEl = $(".intro__logo", intro), stage = $(".intro__stage", intro), face = $(".intro__face", intro);
    const copy = $$(".intro__copy > *", intro);
    const mq = $(".intro__mq", intro);
    mq.style.transform = "translateY(100%)"; mq.style.opacity = 0;
    inner.style.transform = "translate3d(100%,0,0)";
    const side = Math.max(1500, innerWidth / 2);
    face.style.clipPath = `inset(0px ${side}px 0px ${side}px)`;

    anim(2, EASE.p1.out, (k) => dots.forEach((d) => { d.style.transform = `scale(${1 - k})`; }), { delay: 0.5, done: () => { $(".intro__dots", intro).style.display = "none"; } });
    anim(3, EASE.p3.inOut, (k) => {
      topS.style.transform = `translateY(${-100 * k}%) scaleY(${lerp(1, 0.12, k)})`;
      botS.style.transform = `translateY(${100 * k}%) scaleY(${lerp(1, 0.12, k)})`;
    }, { delay: 2 });
    anim(1, EASE.p3.inOut, (k) => { // 갈색 → 흰색
      logoEl.style.color = `rgb(${Math.round(lerp(82, 255, k))},${Math.round(lerp(70, 255, k))},${Math.round(lerp(58, 255, k))})`;
    }, { delay: 3 });
    anim(5, EASE.p3.inOut, (k) => {
      stage.style.transform = `translateY(${lerp(200, 0, k)}%)`;
      const s = lerp(side, 0, k);
      face.style.clipPath = `inset(0px ${s}px 0px ${s}px)`;
      copy.forEach((c) => { c.style.opacity = k; c.style.paddingTop = `${lerp(500, 0, k)}px`; });
    }, { delay: 3.5, done: () => {
      showPop();
      let popped = false;
      const pop = (e) => {
        if (popped) return;
        if (e && e.type === "keydown" && !["ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) return;
        popped = true;
        removeEventListener("wheel", pop); removeEventListener("touchstart", pop); removeEventListener("keydown", pop);
        anim(0.7, EASE.p2.out, (k) => { mq.style.transform = `translateY(${lerp(100, 0, k)}%)`; mq.style.opacity = k; }, { done: enablePanel });
      };
      addEventListener("wheel", pop, { passive: true });
      addEventListener("touchstart", pop, { passive: true });
      addEventListener("keydown", pop);
    } });
  }

  // 모바일(터치)에서는 카드가 화면 가운데 들어오면 호버 상태로
  if (cards.length && matchMedia("(hover: none) and (pointer: coarse)").matches && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("is-on", e.isIntersecting)), { rootMargin: "-20% 0px -20% 0px", threshold: 0.15 });
    cards.forEach((c) => io.observe(c));
  }

  /* ── 원형 네 단계 ── 단계 5초 · 전환 1.5초 · 링 리셋 0.55초 ───────────── */
  const ring = (() => {
    const sec = $(".ring"), pinWrap = $(".ring-pin");
    if (!sec) return { arm() {} };
    const data = JSON.parse($("#ring-data").textContent);
    const btns = $$(".ring__nums button", sec), prog = $(".ring__prog", sec);
    const imgs = $$(".ring__img img", sec), backs = $$(".ring__back p", sec), fade = $(".ring__fade", sec);
    const tEn = $(".ring__en", sec), tTitle = $(".ring__title", sec), tDesc = $(".ring__desc", sec);
    const rot = $(".ring__rot", sec), imgWr = $(".ring__img", sec), backWr = $(".ring__back", sec);
    const texts = [tEn, tTitle, tDesc];
    const src = (i) => new URL(`assets/ring-${i}.jpg`, location.href).href;
    const bgOf = (i) => `url("${src(i)}")`;
    const L = 2 * Math.PI * 508;
    prog.style.strokeDasharray = L;
    prog.style.strokeDashoffset = L;
    let cur = 1, running = false, paused = false, progT, resetT, textT = [], imgT, bgT;
    let pausedAt = 0; // 멈춘 시점의 링 진행(0~1, 현재 단계 안)

    const ratio = (r) => { prog.style.strokeDashoffset = L * (1 - clamp(r)); };
    const setT = (el, y, a) => { el.style.transform = `translateY(${y}px)`; el.style.opacity = a; };
    const mv = []; // 등장/퇴장 트윈
    function enterState(on) {
      mv.forEach((t) => t.kill()); mv.length = 0;
      if (on) {
        mv.push(anim(0.85, EASE.p2.out, (k) => { rot.style.transform = `translateY(${lerp(100, 0, k)}px) rotate(${lerp(90, 0, k)}deg)`; rot.style.opacity = k; }));
        mv.push(anim(0.8, EASE.p2.out, (k) => { imgWr.style.transform = `translate(-50%,-50%) translateY(${lerp(100, 0, k)}px)`; }));
        mv.push(anim(0.8, EASE.p2.out, (k) => setT(backWr, lerp(36, 0, k), k)));
        mv.push(anim(0.7, EASE.p2.out, (k) => { setT(tEn, lerp(32, 0, k), k); setT(tTitle, lerp(32, 0, k), k); }, { delay: 0.12 }));
        mv.push(anim(0.75, EASE.p2.out, (k) => setT(tDesc, lerp(48, 0, k), k), { delay: 0.28 }));
      } else {
        mv.push(anim(0.45, EASE.p1.in, (k) => { rot.style.transform = `translateY(${lerp(0, 150, k)}px) rotate(${lerp(0, 90, k)}deg)`; rot.style.opacity = 1 - k; }));
        mv.push(anim(0.8, EASE.p2.out, (k) => { imgWr.style.transform = `translate(-50%,-50%) translateY(${lerp(0, 150, k)}px)`; }));
        mv.push(anim(0.35, EASE.p1.in, (k) => setT(backWr, lerp(0, 36, k), 1 - k)));
        mv.push(anim(0.28, EASE.p1.in, (k) => { setT(tEn, lerp(0, 24, k), 1 - k); setT(tTitle, lerp(0, 24, k), 1 - k); }));
        mv.push(anim(0.22, EASE.p1.in, (k) => setT(tDesc, lerp(0, 32, k), 1 - k)));
      }
    }
    function hidden() {
      rot.style.transform = "translateY(100px) rotate(90deg)"; rot.style.opacity = 0;
      imgWr.style.transform = "translate(-50%,-50%) translateY(100px)";
      setT(backWr, 36, 0); setT(tEn, 32, 0); setT(tTitle, 32, 0); setT(tDesc, 48, 0);
    }

    function setStep(n, first) {
      btns.forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.step === n)));
      backs.forEach((p, i) => p.classList.toggle("on", i === n - 1));
      const d = data[n - 1];
      textT.forEach((t) => t.kill()); textT = [];
      if (first || reduce) { tEn.textContent = d.en; tTitle.innerHTML = d.title; tDesc.innerHTML = d.desc; }
      else {
        texts.forEach((el, i) => textT.push(anim(0.45, EASE.p1.out, (k) => { el.style.opacity = 1 - k; }, { delay: i * 0.03, done: () => {
          if (i === 0) tEn.textContent = d.en; if (i === 1) tTitle.innerHTML = d.title; if (i === 2) tDesc.innerHTML = d.desc;
          textT.push(anim(1.05, EASE.p2.out, (k) => { el.style.opacity = k; }, { delay: i * 0.04 }));
        } })));
      }
      // 사진: 새 장이 원형으로 번지고(0→75%) 이전 장은 0.6초에 사라진다
      const next = imgs[n - 1], prev = imgs.find((im) => im.classList.contains("on") && im !== next);
      imgT?.kill();
      imgs.forEach((im) => { if (im !== next && im !== prev) { im.classList.remove("on"); im.style.cssText = ""; } });
      if (first || reduce || !prev) {
        imgs.forEach((im) => { im.classList.toggle("on", im === next); im.style.cssText = ""; });
      } else {
        next.classList.add("on"); next.style.zIndex = 2; prev.style.zIndex = 1;
        next.style.clipPath = "circle(0% at 50% 50%)";
        imgT = anim(1.5, EASE.p2.out, (k) => {
          next.style.clipPath = `circle(${75 * k}% at 50% 50%)`;
          prev.style.opacity = 1 - clamp(k * 2.5);
        }, { done: () => { prev.classList.remove("on"); prev.style.cssText = ""; next.style.cssText = ""; } });
      }
      // 배경: 새 사진 층이 1.08 배에서 1 로 줄며 나타난다
      bgT?.kill();
      if (first || reduce) sec.style.setProperty("--bg", bgOf(n));
      else {
        fade.style.backgroundImage = `linear-gradient(rgb(149 149 149/62%),rgb(0 0 0/62%)),${bgOf(n)}`;
        bgT = anim(1.5, EASE.p2.out, (k) => { fade.style.opacity = k; fade.style.transform = `scale(${lerp(1.08, 1, k)})`; }, { done: () => {
          sec.style.setProperty("--bg", bgOf(n)); fade.style.opacity = 0; fade.style.transform = "";
        } });
      }
    }

    function stopProg() { progT?.kill(); resetT?.kill(); }
    function runProg(from = 0) {
      stopProg();
      if (reduce) { ratio(cur / 4); return; }
      const a = (cur - 1) / 4, b = cur / 4;
      const left = 5 * (1 - from);
      let last = from;
      progT = anim(left, EASE.none, (k) => { last = lerp(from, 1, k); ratio(lerp(a, b, last)); pausedAt = last; }, { done: () => {
        pausedAt = 0;
        if (cur === 4) {
          resetT = anim(0.55, EASE.p1.out, (k) => { prog.style.opacity = 1 - k; }, { done: () => {
            prog.style.opacity = 1; ratio(0); cur = 1; setStep(cur); runProg();
          } });
          return;
        }
        cur += 1; setStep(cur); runProg();
      } });
    }
    function start() {
      if (running) return;
      running = true;
      enterState(true);
      setStep(cur, true);
      if (!paused) runProg();
    }
    function stop() {
      if (!running) return;
      running = false; stopProg(); enterState(false);
    }
    btns.forEach((b) => b.addEventListener("click", () => {
      const n = +b.dataset.step;
      if (n === cur) return;
      cur = n; setStep(cur); ratio((cur - 1) / 4); pausedAt = 0;
      if (running && !paused) runProg();
    }));
    // 마우스를 올리거나 키보드로 들어오면 자동 넘김을 멈춘다
    const hold = (on) => { paused = on; if (!running) return; if (on) stopProg(); else runProg(pausedAt); };
    sec.addEventListener("mouseenter", () => hold(true));
    sec.addEventListener("mouseleave", () => hold(false));
    sec.addEventListener("focusin", () => hold(true));
    sec.addEventListener("focusout", (e) => { if (!sec.contains(e.relatedTarget)) hold(false); });

    // 섹션 가운데가 화면 아래에 닿으면 시작, 되감아 올라가면 퇴장
    const check = () => {
      const t = pinWrap.getBoundingClientRect().top;
      if (t <= innerHeight / 2) start(); else stop();
    };
    return {
      arm() {
        if (reduce) { root.classList.remove("js"); setStep(1, true); ratio(1 / 4); running = true; return; }
        hidden(); setStep(1, true);
        addEventListener("scroll", check, { passive: true }); check();
      },
    };
  })();

  // 인트로는 탭당 한 번. 두 번째 방문부터는 바로 본문
  let seen = false;
  try { seen = sessionStorage.getItem("yeoul-intro") === "seen"; sessionStorage.setItem("yeoul-intro", "seen"); } catch { /* 저장 불가 환경은 매번 인트로 */ }
  const skip = reduce || seen || new URLSearchParams(location.search).get("introSkip") === "true";
  if (skip) skipIntro(); else runIntro();
})();
