// 메인 — 인트로(물결 분할 → 얼굴 면 상승 → 마퀴) · 가로 패널 전환 · 두 갈래 · 원형 네 단계 · 상담 띠
import { logo } from "../shell.mjs";

const RING = [
  { en: "RESPECT", halves: ["RESP", "ECT"], title: "타고난 결을<br class=\"mo-br\"> 존중합니다", desc: "좋은 수술은 무엇을 더할지보다,<br>무엇을 남길지 먼저 정하는 일입니다.<br><br>여울은 눈꺼풀의 구조와 조직을 가능한 한 보존하고,<br>원래의 인상이 살아 있는 설계를 합니다." },
  { en: "SUBTLE", halves: ["SUB", "TLE"], title: "흔적은<br class=\"mo-br\"> 옅게 남깁니다", desc: "변화는 분명하게,<br>수술한 티는 덜 나게.<br><br>여울은 절개 위치와 봉합 간격까지 계산해<br>시간이 지날수록 자연스럽게 가라앉는 결과를 봅니다." },
  { en: "PRECISE", halves: ["PREC", "ISE"], title: "필요한 수술만<br class=\"mo-br\"> 권합니다", desc: "수술을 여러 개 더한다고<br>결과가 좋아지지는 않습니다.<br><br>하지 않아도 되는 것은 권하지 않는 것,<br>여울이 지키는 절제의 기준입니다." },
  { en: "HARMONY", halves: ["HARM", "ONY"], title: "만족할 만큼<br class=\"mo-br\"> 바꿉니다", desc: "소극적인 수술이 늘 정답은 아닙니다.<br>원하는 인상에 닿을 만큼은 충분히.<br><br>여울은 과함과 부족함 사이,<br>얼굴 전체의 균형이 맞는 지점을 찾습니다." },
];

const MARQUEE = ["눈매의 흐름을 읽는 상담", "시간이 지나도 편안한 인상", "필요한 만큼만 섬세하게", "첫 수술부터 재수술까지", "나다운 눈매", "여울의 원칙"];

export default {
  path: "index.html",
  title: "여울성형외과 | 눈매의 흐름대로, 자연스럽게",
  desc: "여울성형외과는 눈매의 흐름을 먼저 읽고 얼굴에 어울리는 만큼만 바꾸는 눈성형 중심 성형외과입니다. 첫 눈성형과 눈 재수술을 한 명의 전문의가 상담부터 회복까지 맡습니다.",
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
        <p class="intro__sub">EYELID DESIGN CLINIC</p>
        <p class="intro__title">흐르는 대로, 자연스럽게<br><em>여울처럼</em></p>
        <p class="intro__desc">눈매의 흐름을 먼저 읽고,<br class="mo-br"> 얼굴에 맞는 변화를 그립니다.</p>
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
      <p class="visual__sub">TWO STARTING POINTS,<br class="mo-br"> ONE STANDARD</p>
      <h2 class="visual__title" id="visual-title">처음 하는 결정과 다시 하는 결정은,<br>서로 다른 마음에서 출발합니다.</h2>
      <div class="visual__row">
        <article class="v-card">
          <div class="v-card__text">
            <p class="v-card__en">First Surgery</p>
            <h3 class="v-card__title">처음 만나는 눈매</h3>
            <p class="v-card__desc">얼굴 비율에 맞춰 라인을 그리는 첫 눈성형.<br>한참 뒤에 보아도 어색하지 않은 결과를 목표로 합니다.</p>
            <a class="more" href="first.html">자세히 보기<span class="sr-only"> — 첫 눈성형</span></a>
            <span class="v-card__num" aria-hidden="true">01</span>
          </div>
        </article>
        <article class="v-card">
          <div class="v-card__text">
            <p class="v-card__en">Revision Surgery</p>
            <h3 class="v-card__title">다시 설계하는 눈매</h3>
            <p class="v-card__desc">이전 수술에서 불편했던 부분을 차근차근 살핍니다.<br>남길 것과 고칠 것을 나누는 데서 시작합니다.</p>
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
