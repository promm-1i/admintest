// 수술 후기 — 목록(5개씩 3쪽 · 태그 거르기) + 상세 15쪽. 레퍼런스 게시판(review_page 스킨) 실측 구조.
// 실제 후기가 아닌 사례 설명 형식의 예시라 목록·상세 모두 "사례 예시" 로 표시한다.
import { REVIEWS, REVIEW_CATS } from "../data.mjs";
import { img } from "../parts.mjs";
import { arrow } from "../shell.mjs";

const dot = (d) => d.replaceAll("-", ".");

const list = {
  path: "reviews.html",
  title: "수술 후기 | 여울성형외과",
  desc: "고민과 눈의 조건이 모두 다른 만큼, 수술 전 고민에서 회복까지 한 분 한 분의 기록을 사례로 정리합니다.",
  body: () => `
<section class="board-head" data-head="light">
  <div class="in-1680">
    <p class="p-en">Cases &amp; Reviews</p>
    <h1 class="p-title">여울의 눈성형은,<br>사람마다 다른 설계에서<br>시작됩니다.</h1>
    <p class="p-desc">같은 수술이라도 고민과 눈의 조건은<br class="mo-br"> 모두 다릅니다.<br class="pc-br"> 수술 전 고민에서 회복까지,<br class="mo-br"> 한 분 한 분의 기록을 담았습니다.</p>
  </div>
</section>
<section class="rv-sec" data-bg="#F5EFE6" aria-labelledby="rv-title">
  <div class="in-1400">
    <div class="center"><p class="s-en">Patient Reviews</p><h2 class="s-title rv-sec__title" id="rv-title">사례로 보는 여울의 기록</h2></div>
    <div class="rv-filter" role="toolbar" aria-label="수술 종류로 거르기" data-filter="rv">
      ${[REVIEW_CATS.slice(0, 6), REVIEW_CATS.slice(6)].map((row) => `<div class="rv-filter__row">${row.map((c) => `<button type="button" data-cat="${c}" aria-pressed="${c === "전체"}" class="${c === "전체" ? "on" : ""}">${c}</button>`).join("")}</div>`).join("")}
    </div>
    <ul class="rv-list" data-page="5">
      ${REVIEWS.map((r, i) => `<li class="rv-item" data-cats="${r.cats.join(",")}">
        <a class="rv-item__cover" href="review-${i + 1}.html" aria-label="${r.t}"></a>
        <div class="rv-item__body">
          <div class="rv-item__chips">${r.cats.map((c) => `<span>${c}</span>`).join("")}</div>
          <h3>${r.t}</h3>
          <p class="rv-item__sum">${r.d}</p>
          <p class="rv-item__meta">${r.date} &nbsp;|&nbsp; 사례 예시</p>
        </div>
        <div class="rv-item__img">${img(`case-${(i % 6) + 1}.jpg`, "수술 후 사진 자리", 740, 296)}</div>
      </li>`).join("")}
    </ul>
    <nav class="pager" aria-label="쪽 번호"></nav>
  </div>
</section>`,
};

const views = REVIEWS.map((r, i) => {
  const prev = REVIEWS[i - 1], next = REVIEWS[i + 1];
  const cell = (it, n, label) => it
    ? `<a class="nb" href="review-${n}.html"><span class="nb__lab">${label}</span><span class="nb__tit">${it.t.length > 20 ? `${it.t.slice(0, 20)}…` : it.t}</span></a>`
    : `<div class="nb" aria-disabled="true"><span class="nb__lab">${label}</span><span class="nb__tit">${label}이 없습니다.</span></div>`;
  // 레퍼런스 이야기 칸은 대부분 3줄 — 단계마다 한 문장을 덧붙여 분량을 맞춘다(사례마다 문장을 돌려 쓴다)
  const more = [
    ["상담에서는 지금 눈 상태를 사진과 함께 차근차근 확인했습니다.", "원하는 방향과 피하고 싶은 모습을 먼저 나눠 적어 보았습니다.", "일상에서 가장 불편했던 순간이 언제였는지도 함께 이야기했습니다."],
    ["수술 전에 라인 위치와 폭을 거울로 함께 보며 한 번 더 맞췄습니다.", "필요하지 않은 수술은 계획에서 뺐습니다.", "가능한 범위와 한계를 먼저 설명드린 뒤 방향을 정했습니다."],
    ["정해진 날에 다시 만나 붓기와 절개선 상태를 살폈습니다.", "회복 단계마다 찜질과 생활 습관을 따로 안내했습니다.", "붓기가 빠지는 속도에는 개인차가 있어 경과를 사진으로 남겨 비교했습니다."],
    ["일상 사진에서도 수술한 티가 크게 나지 않는 것을 목표로 했습니다.", "처음 상담에서 정한 방향에서 벗어나지 않았습니다.", "사진은 동의를 받은 경우에만 공개합니다."],
    ["같은 고민이라도 눈 구조에 따라 답은 달라질 수 있어, 직접 보고 판단하는 과정이 중요합니다.", "결과만큼 과정이 편안했는지도 여울이 중요하게 보는 기준입니다.", "필요한 만큼만 하는 것이 오래 편안한 결과로 이어진다고 생각합니다."],
  ];
  const heads = ["01 Concern", "02 Design", "03 Recovery", "04 After", "05 Director"];
  const titles = ["어떤 고민이 있었나요", "여울은 어떻게 설계했나요", "회복은 어떻게 진행되었나요", "그 후의 이야기", "한서율 원장"];
  return {
    path: `review-${i + 1}.html`,
    current: "reviews.html",
    title: `${r.t} | 수술 후기 | 여울성형외과`,
    desc: r.d,
    body: () => `
<div class="rview" data-bg="#F5EFE6">
  <div class="in-1400">
    <header class="rview__head">
      <ul class="rview__tags" aria-label="수술 태그">${r.cats.map((c) => `<li>${c}</li>`).join("")}</ul>
      <h1 class="rview__title">${r.t}</h1>
      <p class="rview__date">${dot(r.date)} · 사례 예시</p>
    </header>
  </div>
  <div class="in-832">
    <div class="rview__imgs">
      <div class="rview__img is-locked"><span class="rview__lab">Before</span><div class="rview__lock"><p>로그인 후 보실 수 있습니다.</p><span>수술 전 사진은 회원에게만 공개됩니다</span></div></div>
      <div class="rview__img"><span class="rview__lab">After</span>${img(`case-${(i % 6) + 1}.jpg`, "수술 후 사진 자리", 740, 296, false)}</div>
    </div>
    <dl class="rview__meta">
      <div><dt>수술명</dt><dd>${r.op}</dd></div>
      <div><dt>추가 시술</dt><dd>${r.extra}</dd></div>
      <div><dt>촬영 시점</dt><dd>${r.when}</dd></div>
      <div><dt>연령 / 성별</dt><dd>${r.who}</dd></div>
    </dl>
    <div class="rview__story">${r.blocks.map((b, k) => `<section class="rview__block"><p class="rview__kicker">${heads[k]}</p><h2 class="rview__btitle">${titles[k]}</h2><p class="rview__body">${b} ${more[k][i % 3]}</p></section>`).join("")}</div>
  </div>
  <div class="in-1400">
    <nav class="rview__nb" aria-label="이전 글 · 다음 글">${cell(prev, i, "이전글")}${cell(next, i + 2, "다음글")}</nav>
    <div class="rview__back"><a href="reviews.html">${arrow("rview__arrow")}<span>전체 목록으로</span></a></div>
  </div>
</div>`,
  };
});

export default [list, ...views];
