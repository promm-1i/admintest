// 서브 쪽이 함께 쓰는 섹션 조각
import { face } from "./faces.mjs";
import { CONCERNS } from "./data.mjs";

export const img = (src, alt, w, h, lazy = true) => `<img src="./assets/${src}" alt="${alt}" width="${w}" height="${h}"${lazy ? ' loading="lazy" decoding="async"' : ""}>`;

// 서브 머리: 가운데 제목 + 스크롤 막대 + 펼쳐지는 가로 사진
export const subVisual = ({ en, title, desc, photo, alt }) => `
<section class="s-visual" data-head="light">
  <div class="in-1688 center">
    <p class="p-en">${en}</p>
    <h1 class="p-title">${title}</h1>
    <p class="p-desc">${desc}</p>
    <span class="sbar" aria-hidden="true"></span>
  </div>
  <div class="s-visual__img pre">${img(photo, alt, 1920, 600, false)}</div>
</section>`;

// 가운데 세로 사진을 두고 제목은 왼쪽 위, 글은 오른쪽 아래
export const approach = ({ en, title, texts, photo, alt }) => `
<section class="sec approach">
  <div class="in-1400">
    <div class="approach__img" aria-hidden="true">${img(photo, "", 544, 769)}</div>
    <div class="approach__body">
      <div data-rv><p class="s-en">${en}</p><h2 class="s-title">${title}</h2></div>
      <div class="approach__img m">${img(photo, alt, 544, 769)}</div>
      <div class="approach__text" data-rv>${texts.map((t) => `<p>${t}</p>`).join("")}</div>
    </div>
  </div>
</section>`;

// 고민 고르기 — 다섯 장, 누르면 결과 쪽으로
export const pick = (group, { title, desc }) => `
<section class="sec pick" data-bg="#F5EFE6" aria-labelledby="pick-title">
  <div class="in-1576">
    <div class="center" data-rv>
      <p class="s-en">Find your concern</p>
      <h2 class="s-title" id="pick-title">${title}</h2>
      <p class="s-desc">${desc}</p>
    </div>
    <div class="pick__dots" role="tablist" aria-label="고민 선택">${CONCERNS.filter((c) => c.group === group).map((c, i) => `<button type="button" role="tab" aria-selected="${i === 0}" aria-label="${c.qText}">0${c.n}</button>`).join("")}</div>
    <div class="pick__row">
      ${CONCERNS.filter((c) => c.group === group).map((c) => `
      <a class="pick__item" href="${c.slug}.html" data-rv>
        <span class="pick__num" aria-hidden="true">0${c.n}</span>
        <span class="pick__box">
          ${face(c.face, `${c.qText} — 얼굴 선화`)}
          <span class="pick__q">${c.q}</span>
          <span class="pick__tags">${c.chips.flat().map((t) => `<span class="tag">${t}</span>`).join("")}</span>
        </span>
        <span class="pick__go">선택하기</span>
      </a>`).join("")}
    </div>
  </div>
</section>`;

// 접이식 목록 (간단히 보기 · 자주 묻는 질문)
export const accordion = (items, { faq = false, openFirst = true } = {}) => `
<ul class="acc">
  ${items.map(([q, lines], i) => `
  <li class="acc__item${openFirst && i === 0 ? " open" : ""}">
    <button class="acc__btn" type="button" aria-expanded="${openFirst && i === 0}" aria-controls="acc-${faq ? "f" : "s"}${i}">
      ${faq ? "" : `<span class="acc__num">0${i + 1}</span>`}<span class="acc__q">${q}</span><span class="acc__ico" aria-hidden="true"></span>
    </button>
    <div class="acc__a" id="acc-${faq ? "f" : "s"}${i}" role="region">${lines.map((l) => `<p>${l}</p>`).join("")}</div>
  </li>`).join("")}
</ul>`;
