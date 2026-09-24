// 병원 소개 — 머리 · 대표원장 · 한마디 · 네 가지 기준 · 공간 · 오시는 길
import { subVisual, img } from "../parts.mjs";
import { BRAND } from "../shell.mjs";

const STANDARD = [
  ["RESPECT", "타고난 결을 존중합니다", "무엇을 더할지보다, 무엇을 남길지 먼저 정합니다.", "여울은 눈꺼풀의 구조와 조직을 가능한 한 보존하고, 원래의 인상이 살아 있는 설계를 합니다."],
  ["SUBTLE", "흔적은 옅게 남깁니다", "변화는 분명하게, 수술한 티는 덜 나게.", "절개 위치와 봉합 간격까지 계산해 시간이 지날수록 자연스럽게 가라앉는 결과를 봅니다."],
  ["PRECISE", "필요한 수술만 권합니다", "수술을 여러 개 더한다고 결과가 좋아지지는 않습니다.", "하지 않아도 되는 것은 권하지 않는 것, 여울이 지키는 절제의 기준입니다."],
  ["HARMONY", "만족할 만큼 바꿉니다", "소극적인 수술이 늘 정답은 아닙니다.", "과함과 부족함 사이, 얼굴 전체의 균형이 맞는 지점을 찾습니다."],
];
const SPACE = [
  ["entrance", "입구", 1], ["lobby", "로비", 2], ["waiting", "대기 공간", 2], ["consult", "상담실", 3], ["care", "처치실", 2],
];

export default {
  path: "about.html",
  title: "병원 소개 | 여울성형외과",
  desc: "눈의 구조와 인상의 균형을 함께 보는 여울성형외과의 대표원장, 네 가지 기준, 공간과 오시는 길을 안내합니다.",
  body: () => `
${subVisual({ en: "About Yeoul", title: "흐름대로,<br>자연스럽게.", desc: "여울성형외과는 눈의 구조와 인상의 균형을 함께 보고,<br class=\"mo-br\"> 그 사람다운 변화를 설계하는 곳입니다.<br>빠른 결과보다 오래 편안한 결과를<br class=\"mo-br\"> 기준으로 합니다.", photo: "sub-about.jpg", alt: "빛이 드는 옆얼굴 사진" })}
<section class="sec director" id="doctor" aria-labelledby="doctor-name">
  <div class="director__mq" aria-hidden="true"><div class="director__track"><span>Reading the natural flow of your eyes &nbsp;&nbsp;·&nbsp;&nbsp;</span><span>Reading the natural flow of your eyes &nbsp;&nbsp;·&nbsp;&nbsp;</span></div></div>
  <div class="in-1110">
    <div class="director__head">
      <div class="director__photo">${img("director.jpg", "여울성형외과 대표원장 프로필 사진", 1200, 1200)}</div>
      <div class="director__text" data-rv>
        <p class="s-en">Han Seoyul, M.D.</p>
        <h2 class="director__name" id="doctor-name">한서율 원장</h2>
        <p class="director__role">여울성형외과 대표원장 · 눈성형 중심 진료</p>
        <div class="director__list">
          <div><h3>Education</h3><ul><li>한빛대학교 의과대학 졸업</li><li>성형외과 전문의</li><li>대한성형외과학회 정회원</li></ul></div>
          <div><h3>Career</h3><ul><li>前 대학병원 성형외과 임상강사</li><li>前 성형외과 의원 원장</li></ul></div>
          <div><h3>Focus</h3><ul><li>첫눈성형</li><li>눈재수술</li><li>눈매교정</li><li>상 · 하안검</li><li>눈밑지방재배치</li></ul></div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="sec quote" aria-label="원장의 한마디">
  <div data-rv>
    <p class="quote__text">“ 좋은 변화는<br>더 많이 바꾸는 데서 오지 않고,<br>그 사람에게 어울리는<br class="mo-br"> 균형에서 시작됩니다.”</p>
    <p class="quote__by">- 한서율 원장 -</p>
  </div>
</section>
<section class="sec standard" aria-labelledby="std-title">
  <div class="in-1680">
    <div class="center" data-rv><p class="s-en">Our Standard</p><h2 class="s-title standard-t" id="std-title">여울이 지키는 네 가지</h2><p class="s-desc">빠른 결과보다 오래가는 결과를 고릅니다.<br>여울이 모든 수술에서 같은 무게로 지키는 기준입니다.</p></div>
    <div class="standard__wr" data-slider>
      <button class="nav-btn prev" type="button" aria-label="이전 기준"></button>
      <div class="standard__view"><div class="standard__track">
        ${STANDARD.map(([en, t, lead, d], i) => `<article class="standard__card${i === 0 ? " on" : ""}" aria-label="${i + 1} / 4"><div class="standard__img">${img(`standard-${i + 1}.jpg`, "", 2400, 928)}</div><div class="standard__body"><p class="standard__en">${en}</p><h3 class="standard__title">${t}</h3><p class="standard__lead">${lead}</p><p class="standard__desc">${d}</p></div></article>`).join("")}
      </div></div>
      <button class="nav-btn next" type="button" aria-label="다음 기준"></button>
    </div>
  </div>
</section>
<section class="sec space" data-bg="#ECE3D6" aria-labelledby="space-title">
  <div class="in-1680">
    <div class="center" data-rv><p class="s-en">Our Space</p><h2 class="s-title" id="space-title">여울의 공간</h2><p class="s-desc">편안한 상담과 차분한 수술을 위해 꾸민 공간입니다.</p></div>
    <div class="tabs" role="tablist" aria-label="공간 선택">${SPACE.map(([k, l], i) => `<button type="button" role="tab" id="tab-${k}" aria-controls="panel-${k}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ""}>${l}</button>`).join("")}</div>
    <div class="space__panels">
      ${SPACE.map(([k, l, n], i) => `<div class="space__panel" role="tabpanel" id="panel-${k}" aria-labelledby="tab-${k}"${i ? " hidden" : ""} data-slider>
        ${n > 1 ? '<button class="nav-btn light prev" type="button" aria-label="이전 사진"></button>' : ""}
        <div class="space__view"><div class="space__track">${Array.from({ length: n }, (_, j) => img(`space-${k}-${j + 1}.jpg`, `${l} 사진 ${j + 1}`, 2400, 1030)).join("")}</div></div>
        ${n > 1 ? '<button class="nav-btn light next" type="button" aria-label="다음 사진"></button>' : ""}
      </div>`).join("")}
    </div>
  </div>
</section>
<section class="sec contact" id="location" aria-labelledby="loc-title">
  <div class="in-1680">
    <div class="center" data-rv><p class="s-en">Contact</p><h2 class="s-title" id="loc-title">오시는 길</h2><p class="s-desc">편하게 찾아오실 수 있도록<br class="mo-br"> 위치와 진료 시간을 안내드립니다.</p></div>
    <div class="contact__map">${img("map.jpg", `${BRAND.ko} 위치 안내 지도`, 1920, 600)}<a href="https://map.naver.com/p/search/${encodeURIComponent(BRAND.addr)}" target="_blank" rel="noopener">지도 앱에서 보기</a></div>
    <div class="contact__info" id="hours">
      <div><h3>CALL</h3><p class="contact__val contact__tel"><a href="${BRAND.telHref}">${BRAND.tel}</a></p></div>
      <div><h3>LOCATION</h3><div class="contact__val"><b>${BRAND.addr}<br>${BRAND.ko}</b><span>신사역 · 압구정역에서 도보로 오실 수 있습니다<br><br>건물 내 주차장을 이용하실 수 있습니다<br>주차 지원 시간은 예약 시 안내해 드립니다</span></div></div>
      <div><h3>TIME</h3><div class="contact__val">${BRAND.hours.slice(0, 2).map(([d, t]) => `<span><b class="d">${d}</b>${t}</span>`).join("")}<span>(일 · 공휴일 휴진)</span></div></div>
    </div>
  </div>
</section>`,
};
