// 메인 — 인트로(물결 분할 → 얼굴 면 상승 → 마퀴) · 가로 패널 전환 · 두 갈래 · 원형 네 단계 · 상담 띠
import { logo } from "../shell.mjs";

const RING = [
  { en: "PRESERVE", halves: ["PRES", "ERVE"], title: "조직을<br class=\"mo-br\"> 가능한 한 남깁니다", desc: "눈꺼풀 피부와 지방, 근육은<br>필요한 만큼만 잘라 냅니다.<br><br>조직이 충분히 남아 있어야<br>나중에 교정이 필요할 때 쓸 수 있는 방법이 많습니다." },
  { en: "INCISION", halves: ["INCI", "SION"], title: "절개선은<br class=\"mo-br\"> 접히는 선 안에", desc: "절개가 필요하면<br>눈을 떴을 때 접히는 선 안쪽을 자릅니다.<br><br>봉합은 가는 실로 촘촘하게 하고,<br>실밥을 푼 뒤에도 정해진 날에 흉터를 확인합니다." },
  { en: "ESSENTIAL", halves: ["ESSEN", "TIAL"], title: "필요한 수술만<br class=\"mo-br\"> 권합니다", desc: "상담에서 수술이 필요 없다고 보면<br>그렇게 말씀드립니다.<br><br>여러 수술을 함께 받으실 때는<br>각각 왜 필요한지 따로 설명드립니다." },
  { en: "CONSULT", halves: ["CONS", "ULT"], title: "원하시는 모양을<br class=\"mo-br\"> 먼저 여쭙니다", desc: "원하시는 라인 높이와 모양을<br>사진으로 함께 보며 정합니다.<br><br>눈 구조상 어려운 모양이면<br>그 이유와 다른 방법을 설명드립니다." },
];

const MARQUEE = ["첫 눈성형", "눈 재수술", "눈매교정", "상안검 · 하안검", "눈밑지방재배치", "예약제 1:1 상담"];

export default {
  path: "index.html",
  title: "여울성형외과 | 첫 눈성형 · 눈 재수술",
  desc: "여울성형외과는 서울 강남구 도산대로에 있는 눈성형 중심 성형외과입니다. 첫 눈성형과 눈 재수술을 한 명의 전문의가 상담부터 회복까지 맡습니다.",
  bodyClass: "is-main",
  current: "",
  main: true,
  body: () => `
<div class="pop" id="pop" role="dialog" aria-label="진료 안내" hidden>
  <div class="pop__box">
    <div class="pop__card">
      <div class="pop__logo">${logo()}</div>
      <p class="pop__title">진료 시간 안내</p>
      <p class="pop__rule" aria-hidden="true">✦</p>
      <dl class="pop__rows"><div><dt>평일</dt><dd>10:00 – 19:00</dd></div><div><dt>토요일</dt><dd>10:00 – 16:00</dd></div><div><dt>일 · 공휴일</dt><dd>휴진</dd></div></dl>
      <p class="pop__note">모든 상담은 예약제로 운영합니다.<br>내원 전 예약 일정을 확인해 주세요.</p>
    </div>
    <div class="pop__foot"><button type="button" class="pop__today">오늘 하루 열지 않기</button><button type="button" class="pop__close">닫기</button></div>
  </div>
</div>
<div class="intro" id="intro" aria-hidden="true">
  <div class="intro__split">
    <svg class="intro__shape top" viewBox="0 0 1920 575" preserveAspectRatio="none"><path d="M0 0h1920v566c-58-31-139-72-247-99-121-30-262-43-420-38-199 7-384 42-575 72-211 33-437 58-678 39z"/></svg>
    <svg class="intro__shape bottom" viewBox="0 0 1920 565" preserveAspectRatio="none"><path d="M0 60c121 45 285 83 486 92 226 10 438-18 654-52 188-29 377-58 553-49 88 5 165 22 227 45V565H0z"/></svg>
  </div>
  <div class="intro__logo">${logo()}</div>
  <div class="intro__dots"><span></span><span></span></div>
  <div class="intro__stage">
    <div class="intro__face">
      <div class="intro__copy">
        <p class="intro__sub">EYELID SURGERY CLINIC</p>
        <p class="intro__title">첫 눈성형부터 재수술까지<br><em>한 원장이 봅니다</em></p>
        <p class="intro__desc">상담, 수술, 회복 확인까지<br class="mo-br"> 같은 전문의가 진료합니다.</p>
        <span class="intro__bar"></span>
      </div>
      <div class="intro__mq"><div class="intro__mq-track"><div class="intro__mq-set">${MARQUEE.map((t) => `<p>${t}</p>`).join("")}</div></div></div>
    </div>
  </div>
</div>
<div class="panel-pin" id="panel-pin">
<main id="content">
<div class="panel-inner">
  <h1 class="sr-only">여울성형외과</h1>
  <section class="visual" data-head="dark" aria-labelledby="visual-title">
    <div class="visual__head">
      <p class="visual__sub">FIRST SURGERY,<br class="mo-br"> REVISION SURGERY</p>
      <h2 class="visual__title" id="visual-title">처음 받는 수술과 다시 받는 수술은<br>상담에서 확인하는 내용이 다릅니다.</h2>
      <div class="visual__row">
        <article class="v-card">
          <div class="v-card__text">
            <p class="v-card__en">First Surgery</p>
            <h3 class="v-card__title">처음 받는 눈 수술</h3>
            <p class="v-card__desc">쌍꺼풀, 눈매교정, 트임처럼 처음 받는 눈 수술입니다.<br>눈꺼풀 두께와 눈뜨는 힘을 확인하고 방법을 정합니다.</p>
            <a class="more" href="first.html">자세히 보기<span class="sr-only"> — 첫 눈성형</span></a>
            <span class="v-card__num" aria-hidden="true">01</span>
          </div>
        </article>
        <article class="v-card">
          <div class="v-card__text">
            <p class="v-card__en">Revision Surgery</p>
            <h3 class="v-card__title">다시 받는 눈 수술</h3>
            <p class="v-card__desc">풀림, 비대칭, 높은 라인처럼 이전 수술 후의 불편입니다.<br>기존 흉터와 남은 조직부터 확인합니다.</p>
            <a class="more" href="revision.html">자세히 보기<span class="sr-only"> — 눈 재수술</span></a>
            <span class="v-card__num" aria-hidden="true">02</span>
          </div>
        </article>
      </div>
    </div>
  </section>
  <div class="ring-pin">
    <section class="ring" data-head="light" aria-labelledby="ring-title" aria-roledescription="단계 슬라이드">
      <div class="ring__fade" aria-hidden="true"></div>
      <div class="inner-full">
        <div class="ring__item">
          <div class="ring__back" aria-hidden="true">${RING.map((s, i) => `<p${i === 0 ? ' class="on"' : ""}><span>${s.halves[0]}</span><span>${s.halves[1]}</span></p>`).join("")}</div>
          <div class="ring__rot">
            <svg viewBox="0 0 1018 1018" aria-hidden="true"><circle class="ring__base" cx="509" cy="509" r="508" fill="none"/><circle class="ring__prog" cx="509" cy="509" r="508" fill="none"/></svg>
            <div class="ring__nums">${RING.map((s, i) => `<button type="button" data-step="${i + 1}" aria-pressed="${i === 0}" aria-label="${i + 1}단계 ${s.en}">0${i + 1}</button>`).join("")}</div>
          </div>
          <div class="ring__img" aria-hidden="true">${RING.map((s, i) => `<img src="./assets/ring-${i + 1}.jpg" alt="" width="1920" height="1200"${i ? ' loading="lazy"' : ""}${i === 0 ? ' class="on"' : ""}>`).join("")}</div>
          <div class="ring__text" aria-live="polite">
            <p class="ring__en">${RING[0].en}</p>
            <h2 class="ring__title" id="ring-title">${RING[0].title}</h2>
            <p class="ring__desc">${RING[0].desc}</p>
          </div>
        </div>
      </div>
      <script type="application/json" id="ring-data">${JSON.stringify(RING.map(({ en, title, desc }) => ({ en, title, desc })))}</script>
    </section>
  </div>
</div>
</main>
</div>`,
};
