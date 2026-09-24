// 고민별 결과 쪽 10개 — 머리(전면 사진) · 설명 · 수술 간단히 보기 · 진료 과정 · 자주 묻는 질문
import { accordion } from "../parts.mjs";
import { CONCERNS, PROCESS_FIRST, PROCESS_REVISION, FAQ_FIRST, FAQ_REVISION } from "../data.mjs";

const process = (p) => `
<section class="sec process" aria-labelledby="process-title">
  <div class="in-1400">
    <div class="center" data-rv><p class="s-en">${p.en}</p><h2 class="s-title" id="process-title">${p.title}</h2></div>
    <ol class="process__grid${p.cols === 3 ? " g3" : ""}">
      ${p.items.map(([t, d], i) => `<li class="process__item" data-rv><span class="process__num">0${i + 1}</span><h3 class="process__title">${t}</h3><p class="process__desc">${d}</p></li>`).join("")}
    </ol>
  </div>
</section>`;

export default CONCERNS.map((c) => {
  const first = c.group === "first";
  const back = first ? "first.html" : "revision.html";
  return {
    path: `${c.slug}.html`,
    current: back,
    title: `${c.qText} | ${first ? "첫 눈성형" : "눈 재수술"} | 여울성형외과`,
    desc: `‘${c.qText}’ 고민에서 여울성형외과가 먼저 확인하는 것과 함께 검토하는 수술, 진료 과정, 자주 묻는 질문을 정리했습니다.`,
    bodyClass: "page-concern",
    consultDesc: "내 눈에 맞는 설계는 원장과 직접 나누는 대화에서 시작됩니다.<br>고른 고민을 가지고 상담을 예약해 보세요.",
    body: () => `
<section class="r-visual" data-head="light">
  <div class="r-visual__bg" style="background-image:url('./assets/${c.slug}.jpg')" aria-hidden="true"></div>
  <div class="wrap in-1688">
    <p class="p-en">Survey result</p>
    <h1 class="p-title">${c.title}</h1>
    <ul class="tags" aria-label="함께 검토하는 수술">${c.tags.map((t) => `<li class="tag">${t}</li>`).join("")}</ul>
  </div>
  <span class="sbar" aria-hidden="true"></span>
</section>
<section class="sec explain" data-bg="#F5EFE6">
  <div class="explain__wr">
    <img src="./assets/${c.slug}.jpg" alt="${c.qText} 고민을 표현한 눈매 사진" width="2016" height="720" loading="lazy" decoding="async" data-rv>
    <div class="explain__text" data-rv>${c.explain.map((p) => `<p>${p}</p>`).join("")}</div>
  </div>
</section>
<section class="sec acc-sec" aria-labelledby="ov-title">
  <div class="in-1400">
    <div class="center" data-rv><p class="s-en">Surgery Overview</p><h2 class="s-title" id="ov-title">관련 수술 항목 간단히 보기</h2></div>
    ${accordion(c.overview)}
  </div>
</section>
${process(first ? PROCESS_FIRST : PROCESS_REVISION)}
<section class="sec acc-sec faq" aria-labelledby="faq-title">
  <div class="in-1400">
    <div class="center" data-rv><p class="s-en">FAQ</p><h2 class="s-title" id="faq-title">자주 묻는 질문</h2></div>
    ${accordion(first ? FAQ_FIRST : FAQ_REVISION, { faq: true })}
  </div>
</section>`,
  };
});
