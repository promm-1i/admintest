// clinic-h 여울성형외과 — 모든 쪽이 함께 쓰는 틀(머리·헤더·메뉴·상담 띠·푸터).
// 쪽 파일은 pages/*.mjs 가 본문만 만들고, build.mjs 가 이 틀로 감싸 public/yeoul/ 에 쓴다.

export const BRAND = {
  ko: "여울성형외과",
  en: "YEOUL PLASTIC SURGERY",
  addr: "서울특별시 강남구 도산대로 123, 3층",
  tel: "010-4894-4905",
  telHref: "tel:01048944905",
  ceo: "김진수",
  biz: "266-07-03678",
  hours: [["MON-FRI", "10:00 - 19:00"], ["SAT", "10:00 - 16:00"], ["SUN", "CLOSED"]],
  kakao: "https://pf.kakao.com/_xiPziX", // NOVERIQ 상담 채널 (전화번호와 같은 원칙 — 데모 문의는 제작사로)
};

export const NAV = [
  { href: "first.html", num: "01", label: "첫눈성형" },
  { href: "revision.html", num: "02", label: "눈재수술" },
  { href: "about.html", num: "03", label: "병원소개" },
  { href: "reviews.html", num: "04", label: "후기" },
  { href: "column.html", num: "05", label: "여울의 생각" },
];

// 워드마크: 로고 이미지 대신 글자로 그린다. 색은 currentColor.
export const logo = (cls = "logo-mark") => `<svg class="${cls}" viewBox="0 0 112 48" role="img" aria-label="${BRAND.ko}"><text x="1" y="30" font-family="Noto Serif KR, serif" font-size="27" font-weight="500" letter-spacing="1">여울</text><text x="61" y="30" font-family="Noto Serif KR, serif" font-size="11.5" letter-spacing=".5">성형외과</text><text x="2" y="44" font-family="Tenor Sans, sans-serif" font-size="6.2" letter-spacing=".9" textLength="106" lengthAdjust="spacingAndGlyphs">YEOUL PLASTIC SURGERY</text></svg>`;

const ico = {
  call: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
};
export const ICON = ico;

export const arrow = (cls) => `<svg class="${cls}" viewBox="0 0 54 54" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 27h44M34 13l14 14-14 14"/></svg>`;

export function head({ title, desc, bodyClass, path }) {
  const url = `/yeoul/${path === "index.html" ? "" : path}`;
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="./og.jpg">
<link rel="canonical" href="https://noveriq.co.kr${url}">
<link rel="icon" href="./favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500&family=Tenor+Sans&display=swap">
<link rel="stylesheet" href="./assets/site.css">
<script>document.documentElement.classList.add("js")</script>
</head>
<body class="${bodyClass}">
<a class="skip" href="#content">본문 바로가기</a>`;
}

export function header(current) {
  const items = NAV.map((n) => `<li><a href="${n.href}"${n.href === current ? ' aria-current="page"' : ""}><span class="num">${n.num}</span><span class="label">${n.label}</span></a></li>`).join("");
  return `
<header class="site-head">
  <div class="bar">
    <a class="home" href="index.html" aria-label="${BRAND.ko} 홈">${logo()}</a>
    <button class="ham" type="button" aria-label="전체 메뉴 열기" aria-controls="menu" aria-expanded="false"><i></i><i></i><i></i></button>
  </div>
</header>
<div class="menu" id="menu" aria-hidden="true">
  <button class="menu__dim" type="button" tabindex="-1" aria-label="메뉴 닫기"></button>
  <aside class="menu__panel" aria-label="전체 메뉴">
    <button class="menu__close" type="button" aria-label="메뉴 닫기"></button>
    <div class="menu__inner">
      <nav class="menu__nav" aria-label="주 메뉴"><ul>${items}</ul></nav>
      <div class="menu__info">
        <p class="addr">${BRAND.addr}</p>
        <p class="tel"><a href="${BRAND.telHref}">${BRAND.tel}</a></p>
        <dl class="menu__hours">${BRAND.hours.map(([d, t]) => `<div><dt>${d}</dt><dd>${t}</dd></div>`).join("")}</dl>
        <div class="menu__acts">
          <a class="pill" href="${BRAND.telHref}">${ico.call}<span>전화 예약</span></a>
          <a class="pill" href="${BRAND.kakao}" target="_blank" rel="noopener">${ico.chat}<span>카톡 상담/예약</span></a>
          <a class="pill" href="consult.html">${ico.pin}<span>온라인 상담</span></a>
        </div>
      </div>
    </div>
  </aside>
</div>`;
}

export const consultBand = (desc = "수술 이야기보다 먼저,<br class=\"mo-br\"> 지금 무엇이 불편한지부터 듣겠습니다.") => `
<section class="consult-band" data-head="light" aria-labelledby="consult-band-title">
  <div class="consult-band__bg" aria-hidden="true"></div>
  <div class="consult-band__wr">
    <h2 class="consult-band__title" id="consult-band-title"><a href="consult.html" aria-label="상담 신청하기 CONSULTATION"><span class="consult-band__letters" aria-hidden="true">${[..."CONSULTATION"].map((c) => `<span>${c}</span>`).join("")}${arrow("consult-band__arrow")}</span></a></h2>
    <p class="consult-band__desc">${desc}</p>
  </div>
</section>`;

export function footer() {
  return `
<footer class="site-foot" data-head="light">
  <div class="site-foot__curve" aria-hidden="true"><svg viewBox="0 0 1920 219.482" preserveAspectRatio="none"><path fill="#261e19" d="M0 219.5V56.3c38 13.9 76 25.6 114 34.8 38.6 9.3 77.2 15.6 115.6 20.1 77.4 9 155.1 10.2 231.2 6 153.8-8.6 305.9-37.7 466.8-66 80.5-14.1 163.5-27.8 249.7-37.6 86-9.7 175.5-15.5 265.8-12.6 45.3 1.5 90.3 5.2 135.1 11.3 43.9 6 87.2 14.9 129.9 26.7 41.7 11.7 81.6 26.2 117.7 43.8 32.9 15.9 84.1 53.8 92.9 60.4H1920v77z"/></svg></div>
  <div class="in">
    <div class="foot-row">
      <div class="foot-left">
        <div class="foot-logo">${logo()}</div>
        <ul class="foot-info">
          <li>주소: ${BRAND.addr}</li>
          <li>전화번호: ${BRAND.tel}</li>
          <li>대표: ${BRAND.ceo} | 사업자등록번호: ${BRAND.biz}</li>
        </ul>
      </div>
      <div class="foot-right">
        <ul class="foot-nav">
          <li><a href="first.html">진료분야</a><ul><li><a href="first.html">첫눈성형</a></li><li><a href="revision.html">눈재수술</a></li></ul></li>
          <li><a href="reviews.html">여울의 기록</a><ul><li><a href="reviews.html">수술 후기</a></li><li><a href="column.html">여울의 생각</a></li></ul></li>
          <li><a href="about.html">병원안내</a><ul><li><a href="about.html#doctor">원장소개</a></li><li><a href="about.html#location">오시는 길</a></li><li><a href="about.html#hours">진료시간</a></li></ul></li>
          <li><a href="consult.html">상담 예약</a><ul><li><a href="consult.html">온라인 상담</a></li><li><a href="${BRAND.kakao}" target="_blank" rel="noopener">카카오톡 상담</a></li><li><a href="${BRAND.telHref}">전화 상담</a></li></ul></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <p>© 2026 ${BRAND.ko}. All rights reserved.</p>
    </div>
  </div>
</footer>
<button class="to-top" type="button" aria-label="맨 위로"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 20V5M6 11l6-6 6 6"/></svg></button>`;
}

export const tail = () => `
<script src="./assets/site.js"></script>
</body>
</html>
`;
