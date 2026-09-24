// 여울 칼럼 — 목록 + 글 쪽
import { COLUMNS, COLUMN_CATS } from "../data.mjs";
import { img } from "../parts.mjs";

const list = {
  path: "column.html",
  title: "여울 칼럼 | 여울성형외과",
  desc: "상담과 수술, 회복의 과정에서 여울성형외과가 중요하게 생각하는 이야기를 전합니다.",
  bodyClass: "page-column",
  body: () => `
<section class="board-head" data-bg="#F5EFE6">
  <div class="in-1688">
    <p class="p-en">Our Perspective</p>
    <h1 class="p-title">여울 칼럼</h1>
    <p class="p-desc">상담과 수술, 회복의 과정에서<br>여울이 중요하게 생각하는 이야기를 전합니다.</p>
  </div>
</section>
<section class="board" aria-label="칼럼 목록" style="padding-bottom:160px">
  <div class="in-1688">
    <div class="tabs" role="toolbar" aria-label="주제로 거르기" data-filter="gall" style="margin-top:0">${COLUMN_CATS.map((c, i) => `<button type="button" data-cat="${c}" aria-pressed="${i === 0}" class="${i === 0 ? "on" : ""}">${c}</button>`).join("")}</div>
    <ul class="gall">
      ${COLUMNS.map((c) => `<li class="gall__item" data-cats="${c.cat}"><a href="${c.slug}.html">
        <div class="gall__img">${img(`${c.slug}.jpg`, "", 960, 960)}</div>
        <span class="gall__cat">${c.cat}</span>
        <h3>${c.t}</h3>
        <p>${c.d}</p>
      </a></li>`).join("")}
    </ul>
  </div>
</section>`,
};

const posts = COLUMNS.map((c) => ({
  path: `${c.slug}.html`,
  current: "column.html",
  title: `${c.t} | 여울 칼럼`,
  desc: c.d,
  bodyClass: "page-column",
  body: () => `
<section class="sec" data-bg="#F5EFE6" style="padding-top:200px">
  <article class="article in-1688">
    <p class="article__cat">${c.cat}</p>
    <h1>${c.t}</h1>
    <div class="article__img">${img(`${c.slug}.jpg`, "", 960, 960, false)}</div>
    <div class="article__body">${c.body.map((p) => `<p>${p}</p>`).join("")}</div>
    <a class="article__back" href="column.html">← 칼럼 목록으로</a>
  </article>
</section>`,
}));

export default [list, ...posts];
