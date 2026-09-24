// 여울의 생각 — 목록(주제 탭 · 3열 카드) + 글 쪽. 레퍼런스 bom_think 스킨 실측 구조.
import { COLUMNS, COLUMN_CATS } from "../data.mjs";
import { img } from "../parts.mjs";
import { arrow } from "../shell.mjs";

const list = {
  path: "column.html",
  title: "여울의 생각 | 여울성형외과",
  desc: "상담과 수술, 회복의 과정에서 여울성형외과가 중요하게 생각하는 이야기를 전합니다.",
  bodyClass: "page-column",
  body: () => `
<div class="in-1688" data-bg="#F5EFE6">
  <section class="think-head">
    <p class="p-en">Our Perspective</p>
    <h1 class="p-title">여울의 생각</h1>
    <p class="p-desc">상담과 수술, 회복의 과정 속에서<br>여울이 중요하게 생각하는 이야기를 전합니다.</p>
  </section>
  <div class="think-list">
    <div class="think-tabs" role="toolbar" aria-label="주제로 거르기" data-filter="gall">${COLUMN_CATS.map((c) => `<button type="button" data-cat="${c}" aria-pressed="${c === "전체"}" class="${c === "전체" ? "on" : ""}">${c}</button>`).join("")}</div>
    <ul class="gall">
      ${COLUMNS.map((c) => `<li class="gall__item" data-cats="${c.cat}"><a href="${c.slug}.html">
        <div class="gall__img">${img(`${c.slug}.jpg`, "", 960, 960)}</div>
        <div class="gall__text"><span class="gall__cat">${c.cat}</span><h2 class="gall__tit">${c.t}</h2><p class="gall__cnt">${c.d}</p></div>
      </a></li>`).join("")}
    </ul>
  </div>
</div>`,
};

const posts = COLUMNS.map((c, i) => {
  const prev = COLUMNS[i - 1], next = COLUMNS[i + 1];
  const cell = (it, label) => it
    ? `<a class="nb" href="${it.slug}.html"><span class="nb__lab">${label}</span><span class="nb__tit">${it.t.length > 20 ? `${it.t.slice(0, 20)}…` : it.t}</span></a>`
    : `<div class="nb" aria-disabled="true"><span class="nb__lab">${label}</span><span class="nb__tit">${label}이 없습니다.</span></div>`;
  return {
    path: `${c.slug}.html`,
    current: "column.html",
    title: `${c.t} | 여울의 생각`,
    desc: c.d,
    bodyClass: "page-column",
    body: () => `
<div class="tview" data-bg="#F5EFE6">
  <div class="in-1400">
    <header class="tview__head">
      <span class="tview__cat">${c.cat}</span>
      <h1 class="tview__title">${c.t}</h1>
      <span class="tview__date">${c.date}</span>
    </header>
    <article class="tview__atc">
      <p class="tview__intro">${c.d}</p>
      <div class="tview__con"><p><br></p><p><br></p>${c.body.map((l) => `<p>${l}</p>`).join("<p><br></p>")}<p><br></p><p><br></p><p><br></p><p><br></p><p>${img(`${c.slug}.jpg`, "", 600, 450)}</p><p><br></p><p><br></p></div>
    </article>
    <nav class="rview__nb tview__nb" aria-label="이전 글 · 다음 글">${cell(prev, "이전글")}${cell(next, "다음글")}</nav>
    <div class="rview__back tview__back"><a href="column.html">${arrow("rview__arrow")}<span>전체 목록으로</span></a></div>
  </div>
</div>`,
  };
});

export default [list, ...posts];
