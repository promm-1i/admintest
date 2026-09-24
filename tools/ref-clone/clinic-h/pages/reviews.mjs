// 수술 후기 — 머리 + 태그 거르기 + 목록. 포트폴리오 데모라 실제 후기가 아닌 "사례 예시" 로 표기한다.
import { REVIEWS, REVIEW_CATS } from "../data.mjs";
import { img } from "../parts.mjs";

export default {
  path: "reviews.html",
  title: "수술 후기 | 여울성형외과",
  desc: "고민과 눈 조건이 모두 다른 만큼, 수술 전 고민부터 회복까지의 기록을 사례별로 정리하는 공간입니다.",
  body: () => `
<section class="board-head" data-head="light">
  <div class="in-1688">
    <p class="p-en">Cases &amp; Reviews</p>
    <h1 class="p-title">여울의 눈성형은,<br>사람마다 다른 설계에서<br>시작됩니다.</h1>
    <p class="p-desc">같은 수술이라도 고민과 눈의 조건은<br class="mo-br"> 모두 다릅니다.<br class="pc-br"> 수술 전 고민에서 회복까지,<br class="mo-br"> 한 분 한 분의 기록을 담습니다.</p>
  </div>
</section>
<section class="sec board" data-bg="#F5EFE6" aria-labelledby="rv-title" style="padding-top:0">
  <div class="in-1400">
    <div class="center" data-rv><p class="s-en">Patient Cases</p><h2 class="s-title" id="rv-title">수술 사례 기록</h2></div>
    <div class="tabs" role="toolbar" aria-label="수술 종류로 거르기" data-filter="rv">${REVIEW_CATS.map((c, i) => `<button type="button" data-cat="${c}" aria-pressed="${i === 0}" class="${i === 0 ? "on" : ""}">${c}</button>`).join("")}</div>
    <p class="board-note">아래 게시물은 레이아웃을 보여 주기 위한 사례 예시입니다. 실제 후기와 사진은 병원이 직접 등록합니다.</p>
    <ul class="rv-list">
      ${REVIEWS.map((r, i) => `<li class="rv-item" data-cats="${r.cats.join(",")}">
        <div class="rv-item__body">
          <div class="rv-item__chips">${r.cats.map((c) => `<span class="tag">${c}</span>`).join("")}</div>
          <h3>${r.t}</h3>
          <p>${r.d}</p>
          <p class="rv-item__meta">${r.date} · 사례 예시</p>
        </div>
        <div class="rv-item__img">${img(`case-${i + 1}.jpg`, "수술 사례 비교 사진 자리", 740, 296)}</div>
      </li>`).join("")}
    </ul>
  </div>
</section>`,
};
