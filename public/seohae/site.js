const BASE = "/seohae";
const groups = [
  { label: "병원소개", links: [["서해중앙병원 소개", "/intro_hsptl"], ["병원장 인사말", "/intro_greeting"], ["미션·비전·핵심가치", "/intro_mission"], ["병원 연혁", "/intro_history"]] },
  { label: "진료", links: [["진료과", "/med_dept_departments"], ["전문센터", "/med_dept_center"], ["의료진", "/med_dept_medic"], ["외래진료", "/outpatientcare"], ["응급진료", "/emergencycare"], ["진료 절차", "/medicalprocedure"], ["신경과 채용", "/doctor_neuro"]] },
  { label: "이용 정보", links: [["입원과 퇴원", "/hsptl_process"], ["입원 생활", "/hsptl_liveinfo_1"], ["면회 시간", "/visit_info"], ["주간 식단", "/thisweekmeal"], ["서류 발급", "/certification"], ["비급여 진료비용", "/unpaidmedexpense"], ["오시는 길", "/location_1"], ["주차", "/parkinginfo"], ["시설", "/amenities"], ["층별 위치", "/floorlayout"], ["예배", "/worshipguide"], ["장례 시설", "/funeral_1"]] },
  { label: "건강 정보", links: [["건강 콘텐츠", "/health_info"], ["건강 상담", "/consultation"], ["진단 장비", "/intro_equipment"]] },
  { label: "소식과 문의", links: [["병원 소식", "/hospitalnews"], ["자주 묻는 질문", "/faq"], ["전화번호", "/phoneinfo"], ["채용", "/careers_1"], ["고객 의견", "/touchingstory"]] },
];
const pages = {
  "/intro_hsptl": ["병원 소개", "환자와 지역의 일상을 살피는 종합병원입니다.", "소개"],
  "/intro_greeting": ["병원장 인사말", "진료 과정과 확인할 내용을 쉽고 명확하게 설명하겠습니다.", "소개"],
  "/intro_mission": ["미션과 가치", "전문성을 바탕으로 믿을 수 있는 돌봄을 제공합니다.", "소개"],
  "/intro_history": ["병원 연혁", "병원의 주요 연도별 기록을 확인할 수 있습니다.", "소개"],
  "/intro_equipment": ["진단 장비", "검사 목적별 진단 장비와 검사항목을 확인하세요.", "소개"],
  "/med_dept_departments": ["진료과", "진료과별 진료 분야와 외래 접수 정보를 확인하세요.", "진료"],
  "/med_dept_center": ["전문센터", "센터별 진료 분야와 검사 항목을 확인하세요.", "진료"],
  "/med_dept_medic": ["의료진", "진료 분야와 외래 일정을 확인하세요.", "진료"],
  "/doctor_neuro": ["신경과 채용 안내", "신경과 진료 인력 채용 공고를 확인하세요.", "진료"],
  "/outpatientcare": ["외래 진료", "진료과별 접수 시간과 외래 진료 절차를 확인하세요.", "진료"],
  "/emergencycare": ["응급 진료", "응급실 운영 시간과 내원 절차를 확인하세요.", "진료"],
  "/medicalprocedure": ["진료 절차", "처음 방문할 때 확인할 진료 절차입니다.", "진료"],
  "/hsptl_process": ["입원과 퇴원", "입원 준비와 퇴원 절차를 차례대로 확인하세요.", "이용"],
  "/hsptl_liveinfo_1": ["입원 생활", "병실 이용과 입원 중 필요한 정보를 확인하세요.", "이용"],
  "/visit_info": ["면회 시간", "환자와 방문객의 안전을 위한 면회 정보를 안내합니다.", "이용"],
  "/thisweekmeal": ["주간 식단", "환자 식사 일정과 식단 정보를 확인하세요.", "이용"],
  "/certification": ["서류 발급", "진료기록과 증명서 발급 절차를 확인하세요.", "이용"],
  "/unpaidmedexpense": ["비급여 진료비", "비급여 항목별 비용을 확인하세요.", "이용"],
  "/location_1": ["오시는 길", "병원 방문 전 교통편과 주변 안내를 확인하세요.", "이용"],
  "/parkinginfo": ["주차", "주차장 위치와 이용 절차를 확인하세요.", "이용"],
  "/amenities": ["편의시설", "환자와 방문객이 이용하는 병원 내 시설입니다.", "이용"],
  "/floorlayout": ["층별 위치", "층별 진료 공간과 편의시설 위치를 확인하세요.", "이용"],
  "/worshipguide": ["예배와 기도", "예배 시간과 병원 예배실 위치를 확인하세요.", "이용"],
  "/funeral_1": ["장례 시설", "빈소 이용 항목과 장례 절차를 확인하세요.", "이용"],
  "/hospitalnews": ["병원 소식", "진료와 병원 생활에 필요한 소식을 확인하세요.", "소식"],
  "/careers_1": ["채용", "직무별 자격과 제출 자료는 채용 공고에서 확인해 주세요.", "소식"],
  "/faq": ["자주 묻는 질문", "병원 이용 중 자주 찾는 답변을 모았습니다.", "소식"],
  "/phoneinfo": ["전화번호", "진료과와 주요 부서의 전화번호를 확인하세요.", "소식"],
  "/consultation": ["건강 상담", "건강 관련 문의를 남기고 안내를 받아보세요.", "소식"],
  "/touchingstory": ["고객 의견", "병원 이용 경험과 의견을 전달해 주세요.", "소식"],
  "/health_info": ["건강 콘텐츠", "일상에서 참고할 건강 정보를 제공합니다.", "건강"],
  "/login": ["로그인", "회원 서비스를 이용하려면 로그인해 주세요.", "회원"],
  "/login/signup": ["회원가입", "필수 약관을 확인한 뒤 다음 단계로 이동합니다.", "회원"],
  "/ko/term": ["이용약관", "서비스 이용에 필요한 기본 약관입니다.", "정책"],
  "/ko/privacy": ["개인정보 처리방침", "개인정보 수집과 이용, 보관 및 보호 기준을 확인하세요.", "정책"],
  "/ko/cookie": ["쿠키 설정", "웹사이트 쿠키의 사용 목적과 설정 방법을 확인하세요.", "정책"],
  "/ko/rights": ["환자의 권리와 책임", "안전하고 존중받는 진료를 위한 안내입니다.", "정책"],
  "/ko/unpaidmedexpense": ["비급여 항목", "비급여 진료 항목과 비용을 확인하세요.", "정책"],
  "/departments/internal": ["내과", "내과 진료 분야와 외래 이용 정보를 안내합니다.", "진료"],
  "/departments/surgery": ["외과", "수술 전후 진료와 상담 정보를 안내합니다.", "진료"],
  "/departments/cardiology": ["심장내과", "심혈관 건강을 위한 진료 정보를 확인하세요.", "진료"],
  "/departments/neurology": ["신경과", "신경계 질환의 진료와 검사 정보를 안내합니다.", "진료"],
  "/centers/health-screening": ["건강검진센터", "검진 예약과 준비사항을 확인하세요.", "진료"],
  "/centers/emergency": ["응급의료센터", "응급 상황에서 필요한 진료 정보를 안내합니다.", "진료"],
  "/doctors/internal": ["내과 의료진", "진료 분야와 외래 일정을 확인하세요.", "진료"],
  "/doctors/surgery": ["외과 의료진", "진료 분야와 외래 일정을 확인하세요.", "진료"],
  "/news/safe-care": ["안전한 진료 환경", "환자 안전과 감염 예방 정보를 확인하세요.", "소식"],
  "/news/care-team": ["통합 돌봄 병동", "입원 중 돌봄 서비스의 대상과 이용 방법을 확인하세요.", "소식"],
};
const departments = ["심장내과", "호흡기내과", "내분비내과", "소화기내과", "내과", "외과", "정형외과", "신경외과", "신경과", "재활의학과", "소아청소년과", "비뇨의학과", "치과·구강악안면외과", "진단검사의학과", "영상의학과", "마취통증의학과", "응급의학과", "가정의학과"];
const quick = [["진료과", "/med_dept_departments", "stethoscope"], ["전화번호 안내", "/phoneinfo", "phone"], ["건강상담", "/consultation", "chat"], ["증명서 발급", "/certification", "document"], ["종합검진 예약", "/centers/health-screening", "clipboard"], ["장례식장", "/funeral_1", "flower"], ["오시는 길", "/location_1", "pin"]];
const quickIcon = name => ({
 stethoscope:'<svg viewBox="0 0 48 48"><path d="M13 8v11a8 8 0 0 0 16 0V8M9 8h8M25 8h8M21 27v3a8 8 0 0 0 16 0v-3M29 8v5"/><circle cx="37" cy="25" r="3"/></svg>',
 phone:'<svg viewBox="0 0 48 48"><path d="M15 8h18a3 3 0 0 1 3 3v26a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3Z"/><path d="M19 13h10M21 34h6"/><path class="accent" d="M20 23a6 6 0 0 1 8-5"/></svg>',
 chat:'<svg viewBox="0 0 48 48"><path d="M9 11h30v22H23l-9 7v-7H9z"/><path d="M16 19h16"/><path class="accent" d="M16 25h10"/></svg>',
 document:'<svg viewBox="0 0 48 48"><path d="M13 7h16l7 7v27H13zM29 7v8h7"/><path d="M18 22h13"/><path class="accent" d="M18 28h13M18 34h8"/></svg>',
 clipboard:'<svg viewBox="0 0 48 48"><path d="M17 11H12v31h24V11h-5"/><rect x="17" y="7" width="14" height="9" rx="2"/><path d="M18 23h13"/><path class="accent" d="M18 29h13M18 35h8"/></svg>',
 flower:'<svg viewBox="0 0 48 48"><path d="M24 23c-7-2-8-10-3-12 4-2 7 2 3 12Zm1 0c2-7 10-8 12-3 2 4-2 7-12 3Zm-1 1c7 2 8 10 3 12-4 2-7-2-3-12Zm-1-1c-2 7-10 8-12 3-2-4 2-7 12-3Z"/><circle cx="24" cy="24" r="3"/><path class="accent" d="M24 28v13m0-5c-4 0-6-2-7-5m7 8c4 0 6-2 7-5"/></svg>',
 pin:'<svg viewBox="0 0 48 48"><path d="M37 20c0 9-13 22-13 22S11 29 11 20a13 13 0 1 1 26 0Z"/><circle cx="24" cy="20" r="4"/><path class="accent" d="M17 8a11 11 0 0 1 13 0"/></svg>'
}[name]);
const heroSlides = [
  ["18개 진료과", "내과, 외과, 응급의학과 등 진료 분야별 외래 접수 정보를 확인하세요."],
  ["12개 전문센터", "심혈관, 응급, 건강검진 등 센터별 진료와 검사 정보를 확인할 수 있습니다."],
  ["외래와 응급 진료", "외래 접수는 평일 08:30–17:00이며 응급실은 24시간 운영합니다."]
];
let currentHeroSlide = 0;
const link = (href, label) => `<a href="${BASE}${href}">${label}</a>`;
const gallery = (files, captions) => `<div class="photo-grid">${files.map((file,i)=>`<figure class="photo-card"><img src="${BASE}/assets/img/${file}" alt="${captions[i]}" loading="lazy"><figcaption>${captions[i]}</figcaption></figure>`).join("")}</div>`;
const responsiveGallery = (pairs, captions, className="parking-photo-grid") => `<div class="photo-grid ${className}">${pairs.map(([mobile,desktop],i)=>`<figure class="photo-card"><picture><source media="(max-width: 640px)" srcset="${BASE}/assets/img/${mobile}"><img src="${BASE}/assets/img/${desktop}" alt="${captions[i]||"주차 시설"}" loading="lazy"></picture><figcaption>${captions[i]||"주차 시설"}</figcaption></figure>`).join("")}</div>`;
const nav = () => `<div class="nav"><div class="wrap nav-inner">${groups.map(g => `<div class="nav-item"><a href="${BASE}${g.links[0][1]}">${g.label}</a><div class="mega">${g.links.map(([l,h])=>link(h,l)).join("")}</div></div>`).join("")}</div><div class="wrap" style="height:48px;display:flex;align-items:center;justify-content:space-between"><button class="menu-toggle" aria-label="\uBA54\uB274 \uC5F4\uAE30" aria-expanded="false" aria-controls="mobileNav">&#9776;</button><span class="mobile-nav" id="mobileNav">${groups.flatMap(g=>g.links).map(([l,h])=>link(h,l)).join("")}</span><div class="nav-inner" style="min-height:0"><div class="nav-item"><a href="${BASE}/login">로그인</a></div><div class="nav-item"><a href="${BASE}/login/signup">회원가입</a></div></div></div></div>`;
const header = () => `<header><div class="topline"><div class="wrap"><span>진료 정보 · 병원 이용</span><div class="top-links">${link("/ko/rights","환자의 권리와 의무")}${link("/phoneinfo","전화번호")}</div></div></div><div class="wrap brandline"><a class="brand" href="${BASE}/"><span class="brand-mark">S</span><span>서해중앙병원<small>SEOHAE CENTRAL HOSPITAL</small></span></a><div class="brand-tools"><a class="utility" href="${BASE}/outpatientcare">진료 예약　↗</a><button class="utility" data-search>⌕　검색</button></div></div>${nav()}</header>`;
const footer = () => `<footer class="footer"><div class="wrap"><div class="footer-top"><a class="brand" href="${BASE}/" style="color:white"><span class="brand-mark">S</span><span>서해중앙병원<small style="color:#9aafb9">SEOHAE CENTRAL HOSPITAL</small></span></a><div class="footer-links">${link("/ko/term","이용약관")}${link("/ko/privacy","개인정보 처리방침")}${link("/ko/rights","환자의 권리와 의무")}${link("/location_1","오시는 길")}</div></div><div class="footer-info"><strong>서해중앙병원</strong><br><span>대표전화</span> <span>041-000-0200</span> <span>· 평일 진료</span> <span>08:30–17:30</span><br><span>새솔시 바다로 128</span> <span>· 사업자등록번호</span> <span>000-00-00000</span><br>응급 진료는 24시간 운영합니다.</div><div class="footer-copy">© 2026 SEOHAE CENTRAL HOSPITAL. All rights reserved.</div></div></footer>`;
function home(){
 const banners=[
  ["진료과 안내","진료 분야와 외래 접수 정보를 확인하세요.","index-01.jpg","/med_dept_departments","진료과 목록 확인　→"],
  ["병원 이용 안내","방문 전 필요한 진료 절차와 시설 정보를 확인할 수 있습니다.","index-02.jpg","/hsptl_process","입원 절차 확인　→"],
  ["응급 진료 안내","응급실은 24시간 운영하며 내원 절차를 안내합니다.","index-03.jpg","/emergencycare","응급실 이용 안내　→"],
  ["건강검진 안내","검진 예약과 검사 전 준비사항을 확인하세요.","index-04.jpg","/centers/health-screening","검진 예약 정보　→"]
 ];
 const centers=[["심장혈관센터","심장과 혈관 질환 진료","/med_dept_center"],["뇌혈관센터","뇌혈관 질환 진료","/med_dept_center"],["응급의료센터","응급 환자 진료","/med_dept_center"],["척추관절센터","척추와 관절 진료","/med_dept_center"],["소화기내시경센터","소화기 내시경 검사","/med_dept_center"],["건강검진센터","건강검진 예약과 검사","/centers/health-screening"],["재활의학센터","기능 평가와 재활 치료","/med_dept_center"],["어린이센터","소아·청소년 진료","/med_dept_center"],["당뇨센터","당뇨 진료와 검사","/med_dept_center"],["인공신장센터","혈액투석 진료","/med_dept_center"],["유방·갑상선센터","유방과 갑상선 진료","/med_dept_center"],["복강경센터","복강경 수술 진료","/med_dept_center"]];
 const departmentLinks=["/departments/internal","/departments/surgery","/departments/cardiology","/departments/neurology"];
 const news=[["2026.10.13","환자 안전 캠페인","환자와 직원이 참여하는 안전·감염 예방 활동을 진행했습니다.","/news/safe-care"],["2026.10.07","통합 간호 병동 운영 확대","간호·간병 통합서비스 병동 운영 범위를 넓혔습니다.","/news/care-team"],["2026.09.21","인플루엔자 국가 예방접종","국가 예방접종 대상과 일정을 확인해 주세요.","/hospitalnews"],["2026.09.17","응급 진료 안내","응급 진료 이용 절차와 준비사항을 확인하세요.","/med_dept_center"],["2026.08.04","복강경 수술 장비 안내","수술에 사용하는 다관절 기구 정보를 확인하세요.","/med_dept_center"],["2026.07.28","영상 검사 장비 안내","자기공명영상 검사 장비 정보를 확인하세요.","/intro_equipment"]];
 return `<main>
  <section class="home-banners" aria-label="병원 주요 안내"><div class="home-banner-track" data-banner-track>${banners.map(([title,copy,img,href,cta],i)=>`<article class="home-banner-card" ${i?'hidden':''}><img src="${BASE}/assets/img/${img}" alt="" ${i>1?'loading="lazy"':''}><div class="home-banner-copy"><span>병원 안내 ${String(i+1).padStart(2,"0")}</span><h1>${title}</h1><p>${copy}</p><a href="${BASE}${href}">${cta}</a></div></article>`).join("")}<div class="home-banner-heading"><span>서해중앙병원 안내</span><div class="home-banner-controls"><button type="button" data-banner-step="-1" aria-label="이전 안내">‹</button><button type="button" data-banner-step="1" aria-label="다음 안내">›</button></div></div></div></section>
  <section class="home-quicklinks"><div class="wrap"><div class="quick-intro"><span>서비스 바로가기</span><h2>원하시는 항목을<br>빠르게 찾아보세요.</h2></div><div class="quick-grid">${quick.map(([t,h,i])=>`<a class="quick" href="${BASE}${h}"><span class="icon" aria-hidden="true">${quickIcon(i)}</span><span>${t}</span></a>`).join("")}</div></div></section>
  <section class="home-medical"><div class="medical-photo"><img src="${BASE}/assets/img/index-05.jpg" alt="서해중앙병원 건물 외관"></div><div class="medical-panel"><div class="medical-copy"><span>SEOHAE MEDICAL TEAM</span><h2><b>서해중앙병원</b><br>의료진</h2><p>각 진료 분야의 의료진이 환자와 함께 진료 계획을 살펴봅니다.<br>진료 일정과 담당 의료진 정보를 확인해 주세요.</p><a class="btn" href="${BASE}/med_dept_medic">의료진 전체보기　→</a></div></div></section>
  <section class="home-departments section"><div class="wrap"><div class="section-head centered"><div><div class="section-kicker">MEDICAL DEPARTMENTS</div><h2>서해중앙병원 <b>진료과</b></h2></div></div><div class="home-single-carousel"><button type="button" data-home-step="departments" data-step="-1" aria-label="이전 진료과">‹</button><div class="home-single-track" data-home-track="departments">${departments.map((d,i)=>`<a class="dept-card" href="${BASE}${departmentLinks[i%departmentLinks.length]}" ${i?'hidden':''}><span>${String(i+1).padStart(2,"0")}<em> / ${String(departments.length).padStart(2,"0")}</em></span><h3>${d}</h3><p>바로가기 <b>→</b></p><i class="home-dept-icon" aria-hidden="true">${quickIcon(i%2?'document':'stethoscope')}</i></a>`).join("")}</div><button type="button" data-home-step="departments" data-step="1" aria-label="다음 진료과">›</button></div><div class="home-carousel-footer"><span data-home-count="departments">01 / 18</span><div class="home-carousel-arrows"><button type="button" data-home-step="departments" data-step="-1" aria-label="이전 진료과">←</button><button type="button" data-home-step="departments" data-step="1" aria-label="다음 진료과">→</button></div><a class="home-all-link" href="${BASE}/med_dept_departments">진료과 전체보기</a></div></div></section>
  <section class="home-centers section soft"><div class="wrap"><div class="section-head centered"><div><div class="section-kicker">SPECIALIZED CENTERS</div><h2>서해중앙병원 <b>전문센터</b></h2></div></div><div class="home-single-carousel"><button type="button" data-home-step="centers" data-step="-1" aria-label="이전 전문센터">‹</button><div class="home-single-track" data-home-track="centers">${centers.map(([name,description,href],i)=>`<article class="center-card" ${i?'hidden':''}><span>${String(i+1).padStart(2,"0")} / ${String(centers.length).padStart(2,"0")}</span><h3>${name}</h3><p>${description}</p>${link(href,"바로가기　→")}</article>`).join("")}</div><button type="button" data-home-step="centers" data-step="1" aria-label="다음 전문센터">›</button></div><div class="home-carousel-footer"><span data-home-count="centers">01 / 12</span><div class="home-carousel-arrows"><button type="button" data-home-step="centers" data-step="-1" aria-label="이전 전문센터">←</button><button type="button" data-home-step="centers" data-step="1" aria-label="다음 전문센터">→</button></div><a class="home-all-link" href="${BASE}/med_dept_center">전문센터 전체보기</a></div></div></section>
  <section class="section home-news"><div class="wrap"><div class="section-head centered"><div><div class="section-kicker">NEWS</div><h2>병원 소식</h2></div></div><div class="news-grid">${news.map(([date,title,description,href])=>`<article class="news-card"><time>${date}</time><h3>${link(href,title)}</h3><p>${description}</p>${link(href,"자세히 보기　→")}</article>`).join("")}</div><div class="home-news-all"><a class="btn" href="${BASE}/hospitalnews">병원소식 전체보기</a></div></div></section>
  <section class="home-location"><div class="visit-map-art" aria-hidden="true"></div><div class="visit-card"><h2>찾아오시는 길</h2><p><b>위치</b> 새솔시 바다로 128<br><b>대표전화</b> 041-000-0200<br><b>주차 안내</b> 방문객 주차장을 이용해 주세요.</p><div class="visit-map-links"><a href="${BASE}/location_1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6"/></svg>위치 안내</a><a href="${BASE}/phoneinfo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v18H7zM10 6h4m-3 12h2"/></svg>전화번호</a><a href="${BASE}/parkinginfo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V3h8a6 6 0 0 1 0 12H5"/></svg>주차 안내</a></div></div></section>
 </main>`
}
const termClauses = [
 ["제1조 목적", ["이 약관은 병원이 제공하는 온라인 서비스의 이용 조건을 정합니다.", "병원과 이용자 사이의 권리와 의무를 설명합니다.", "서비스 이용에 필요한 기본 절차를 안내합니다.", "의료 정보 제공과 홈페이지 기능에 적용합니다.", "별도 약정이 있는 경우 해당 약정의 내용을 함께 확인합니다.", "이용자는 서비스를 사용하기 전에 약관을 확인할 수 있습니다."]],
 ["제2조 용어", ["온라인 서비스는 병원 홈페이지에서 제공하는 정보와 기능을 말합니다.", "이용자는 홈페이지에 접속해 서비스를 이용하는 사람을 말합니다.", "회원은 가입 절차를 마치고 계정을 사용하는 이용자를 말합니다.", "비회원은 계정을 만들지 않고 이용 가능한 정보를 보는 사람을 말합니다.", "서비스에는 진료 정보와 병원 이용 정보가 포함됩니다.", "온라인 기능의 범위는 각 쪽의 안내에 표시합니다."]],
 ["제3조 약관의 게시와 변경", ["병원은 이용자가 약관을 확인할 수 있도록 홈페이지에 게시합니다.", "약관을 바꾸면 변경 사유와 적용 시점을 함께 안내합니다.", "개정 내용은 적용일 전에 홈페이지에 공지합니다.", "이용자는 개정된 내용과 적용 날짜를 확인할 수 있습니다.", "변경된 약관에 동의하지 않는 이용자는 적용 전에 이용을 중단할 수 있습니다.", "약관에 정하지 않은 사항은 관계 법령과 일반 관행을 따릅니다."]],
 ["제4조 서비스 제공", ["병원은 진료와 병원 이용에 관한 정보를 홈페이지에서 제공합니다.", "일부 기능은 제공 목적과 이용 조건에 따라 사용할 수 있습니다.", "서비스별 신청 방법은 해당 기능의 안내를 따릅니다.", "진료 정보는 이용자의 개별 진단이나 처방을 대신하지 않습니다.", "홈페이지에 게시된 안내는 병원 운영 상황에 따라 갱신될 수 있습니다.", "이용자는 중요한 일정을 해당 진료과나 부서에 확인할 수 있습니다."]],
 ["제5조 서비스 중단", ["전산 설비를 점검하거나 보수할 때 서비스 제공을 잠시 중단할 수 있습니다.", "설비 교체와 장애 복구 중에는 일부 기능이 제한될 수 있습니다.", "재난이나 통신 장애로 서비스 이용이 어려울 수 있습니다.", "병원은 확인된 중단 사유와 이용 제한 내용을 공지합니다.", "운영상 필요한 경우 중단 일정과 재개 시점을 안내합니다.", "서비스 중단에 관한 책임은 관계 법령과 약관에 따라 처리합니다."]],
 ["제6조 개인정보 보호", ["병원은 서비스 제공에 필요한 최소한의 개인정보를 수집합니다.", "수집 항목과 이용 목적은 개인정보 처리방침에 표시합니다.", "필수 정보와 선택 정보는 구분해 안내합니다.", "서비스 이용에 필요한 경우 성명 정보를 확인할 수 있습니다.", "연락이 필요한 서비스에는 주소나 전화번호를 요청할 수 있습니다.", "정보 수집과 이용은 이용자의 동의를 받아 진행합니다.", "법령에 별도 기준이 있으면 해당 기준을 따릅니다.", "서비스 계약 이행에 필요한 범위에서 정보를 사용할 수 있습니다.", "진료비 등 요금 정산에 필요한 정보를 처리할 수 있습니다.", "제3자 제공은 동의나 법령상 근거가 있는 경우에 한합니다.", "업무 위탁은 맡은 업무에 필요한 정보 범위로 제한합니다.", "이용자는 본인 정보의 열람과 정정을 신청할 수 있습니다.", "수집 목적이 끝난 정보는 보유 기준에 따라 파기합니다."]],
 ["제7조 병원의 의무", ["병원은 약관과 관계 법령을 준수합니다.", "병원은 서비스를 안정적으로 제공하기 위한 조치를 마련합니다.", "이용자 정보의 안전한 관리를 위한 보호 조치를 적용합니다.", "서비스 운영에 필요한 문의와 의견을 확인합니다.", "수신자가 동의하지 않은 홍보성 전자우편은 발송하지 않습니다.", "게시된 정보의 오류가 확인되면 필요한 범위에서 바로잡습니다."]],
 ["제8조 이용자의 의무", ["이용자는 신청하거나 정보를 바꿀 때 사실에 맞게 작성합니다.", "다른 사람의 개인정보를 허락 없이 사용하지 않습니다.", "홈페이지의 게시 정보를 임의로 바꾸지 않습니다.", "허용되지 않은 프로그램이나 자료를 전송하지 않습니다.", "병원이나 제3자의 저작권과 지식재산권을 침해하지 않습니다.", "다른 사람의 사생활을 침해하거나 업무를 방해하지 않습니다.", "불법 자료나 타인에게 피해를 주는 내용을 게시하지 않습니다.", "계정 정보는 본인이 안전하게 관리합니다."]],
 ["제9조 저작물의 이용", ["홈페이지에 게시된 글과 자료의 권리는 관계 법령에 따라 보호됩니다.", "이용자는 권리자의 허락 없이 자료를 복제할 수 없습니다.", "자료를 영리 목적으로 전송하거나 배포하지 않습니다.", "자료를 방송하거나 출판할 때에는 권리자의 이용 조건을 확인합니다.", "제3자가 게시한 자료에는 해당 권리자의 조건이 적용됩니다.", "허용된 범위를 넘어 자료를 사용하는 경우 권리자의 승낙을 받습니다."]],
 ["제10조 분쟁 처리", ["이용자는 서비스 이용에 관한 의견이나 불편을 병원에 전달할 수 있습니다.", "병원은 접수된 의견을 확인하고 가능한 범위에서 처리합니다.", "바로 처리하기 어려운 경우 사유와 예상 절차를 알립니다.", "분쟁은 당사자 간 협의와 관계 법령에 따라 처리합니다.", "법령에서 정한 조정 절차가 있으면 그 절차를 이용할 수 있습니다.", "피해 보상은 확인된 사실과 적용 기준에 따라 검토합니다."]],
 ["제11조 적용 범위", ["약관에 별도로 정하지 않은 내용은 관계 법령을 따릅니다.", "서비스 이용에 관한 분쟁에는 적용되는 국내 법령을 따릅니다.", "법령과 약관의 내용이 다르면 관계 법령을 우선 적용합니다.", "약관의 일부 조항이 효력을 잃어도 나머지 조항은 적용됩니다.", "조항의 해석은 서비스의 목적과 이용 조건을 기준으로 합니다.", "개별 기능에 별도 조건이 있으면 해당 조건도 함께 확인합니다."]]
];

function bodyFor(path,title){
 if(path==="/doctor_neuro") return `<h2>신경과 채용 안내</h2><p class="lead">신경과 진료 인력 채용 공고를 확인해 주세요.</p><div class="table-scroll"><table class="table"><thead><tr><th>번호</th><th>제목</th><th>작성</th><th>게시</th></tr></thead><tbody><tr><td>1</td><td>신경과 전문의 채용 안내</td><td>병원</td><td>채용 공고</td></tr></tbody></table></div><p class="notice">지원 자격과 접수 기간은 채용 공고에서 확인해 주세요.</p>`;
 if(path==="/login/signup") return `<h2>회원가입</h2><p class="lead">회원가입을 진행하기 전에 필수 약관을 확인해 주세요.</p><div class="steps"><div class="step"><strong>01</strong><p>약관 동의</p></div><div class="step"><strong>02</strong><p>개인정보 입력</p></div><div class="step"><strong>03</strong><p>가입 완료</p></div></div><form class="form signup-consent"><label class="check"><input type="checkbox" data-agree-all> 전체 약관에 동의합니다.</label><label class="check"><input type="checkbox" required> (필수) 이용약관에 동의합니다. <a href="${BASE}/ko/term">자세히 보기</a></label><label class="check"><input type="checkbox" required> (필수) 개인정보 처리방침의 내용을 확인하고 동의합니다. <a href="${BASE}/ko/privacy">자세히 보기</a></label><div class="form-actions"><button class="btn outline" type="button" disabled>이전</button><button class="btn" type="submit">다음</button></div><p class="form-result" aria-live="polite"></p></form>`;
 if(path==="/consultation") return `<h2>건강상담</h2><p class="lead">진료와 병원 이용에 관한 문의처를 확인해 주세요.</p><h3>문의 분야</h3><div class="table-scroll"><table class="table"><thead><tr><th>분야</th><th>확인할 곳</th></tr></thead><tbody><tr><th>외래 진료</th><td>예약한 진료과에서 접수 시간과 방문 일정을 확인합니다.</td></tr><tr><th>건강검진</th><td>검진센터에서 예약 가능 일정과 검사 전 준비를 확인합니다.</td></tr><tr><th>검사 준비</th><td>검사를 예약한 부서에 금식과 복용 약 기준을 확인합니다.</td></tr><tr><th>소아 진료</th><td>소아청소년과에서 접수와 검사 일정을 확인합니다.</td></tr><tr><th>진료과 일정</th><td>진료과별 의료진 일정과 외래 접수 방법을 확인합니다.</td></tr><tr><th>진료 의뢰</th><td>의뢰서와 이전 검사 자료는 외래 접수 창구에 제출합니다.</td></tr><tr><th>진료기록</th><td>신청인별 구비 자료는 서류 발급 안내에서 확인합니다.</td></tr><tr><th>주차</th><td>차량 등록과 지원 기준은 주차 안내에서 확인합니다.</td></tr><tr><th>입원 문의</th><td>입원 준비와 병실 이용은 배정된 병동에 확인합니다.</td></tr><tr><th>응급 상황</th><td>긴급한 증상은 응급실 또는 119에 연락합니다.</td></tr></tbody></table></div><h3>상담 전 준비</h3><ul class="notice-list"><li>진료과와 예약 날짜를 확인해 두면 문의 대상을 찾기 쉽습니다.</li><li>검사 준비는 예약한 검사실의 안내 내용을 기준으로 확인합니다.</li><li>진료 결과에 대한 설명은 담당 진료과에 요청해 주세요.</li><li>증상과 복용 약에 관한 내용은 담당 의료진에게 전달해 주세요.</li><li>온라인 상담은 진단이나 처방을 대신하지 않습니다.</li><li>문의 글에는 주민등록번호와 다른 환자의 정보를 적지 않습니다.</li><li>갑작스럽고 위급한 증상이 있으면 119 또는 응급실에 연락합니다.</li></ul><p class="notice">온라인 접수는 준비 중입니다. 문의는 010-4894-4905로 전화 주세요.</p>`;
 if(path==="/med_dept_departments"||path.startsWith("/departments/")) {const detailIndex={"/departments/internal":1,"/departments/surgery":2,"/departments/cardiology":3,"/departments/neurology":4}[path];const files=detailIndex?[`meddeptdep-0${detailIndex+1}.jpg`]:["meddeptdep-01.jpg","meddeptdep-02.jpg","meddeptdep-03.jpg","meddeptdep-04.jpg","meddeptdep-05.jpg"];const captions=detailIndex?["진료 안내 공간"]:["외래 진료 공간","진료 상담실","진료 준비","검사실","편안한 진료 환경"];return `<h2>진료 분야</h2><p class="lead">진료 일정과 방문 전 준비사항은 대표전화로 문의해 주세요.</p>${gallery(files,captions)}<div class="dept-grid">${departments.map((d,i)=>`<a class="dept-card" href="${BASE}${["/departments/internal","/departments/surgery","/departments/cardiology","/departments/neurology"][i%4]}"><h3>${d}</h3></a>`).join("")}</div>`}
 if(path==="/med_dept_medic"||path==="/doctor_neuro"||path.startsWith("/doctors/")) {const start=path==="/med_dept_medic"?1:path==="/doctor_neuro"?5:path==="/doctors/internal"?9:13;const specialties=path==="/med_dept_medic"?["내과","외과","소화기내과","심장내과","호흡기내과","신경과","재활의학과","정형외과","영상의학과","응급의학과"]:["내과","외과","심장내과","신경과"];return `<h2>진료 분야별 의료진</h2><p class="lead">상담과 진료 예약은 전화로 안내해 드립니다.</p><div class="doctor-grid">${specialties.map((d,i)=>`<article class="doctor"><div class="doctor-art"><img src="${BASE}/assets/img/meddeptmed-${String(start+i).padStart(2,"0")}.jpg" alt="진료 준비를 하는 의료진의 뒷모습" loading="lazy"></div><div><h3>${d} 진료팀</h3><p>${d} 진료 분야</p></div></article>`).join("")}</div>` }
 if(path==="/login") return `<h2>로그인</h2><p class="lead">회원 서비스 이용을 위해 아이디와 비밀번호를 입력해 주세요.</p><form class="form"><label>아이디<input required autocomplete="username" placeholder="아이디"></label><label class="check"><input type="checkbox"> 아이디 저장</label><label>비밀번호<input type="password" required autocomplete="current-password" placeholder="비밀번호"></label><div class="form-actions"><a href="${BASE}/login/signup">아이디 찾기</a><a href="${BASE}/login/signup">비밀번호 찾기</a></div><button class="btn" type="submit">로그인</button><a class="btn outline" href="${BASE}/login/signup">회원가입</a><p class="form-result" aria-live="polite"></p></form>`;
 if(path==="/login"||path==="/login/signup"||path==="/consultation"||path==="/touchingstory") return `<h2>${title}</h2><p class="lead">필수 항목을 입력한 뒤 안내에 따라 진행해 주세요.</p><form class="form"><label>이름<input required autocomplete="name" placeholder="이름을 입력하세요"></label><label>연락처<input required inputmode="tel" placeholder="010-0000-0000"></label>${path==="/login"?`<label>비밀번호<input type="password" required></label>`:`<label>문의 내용<textarea required placeholder="문의 내용을 입력하세요"></textarea></label>`}<label class="check"><input type="checkbox" required> 개인정보 수집 및 이용에 동의합니다.</label><button class="btn" type="submit">${path==="/login"?"로그인":"내용 제출"}</button><p class="form-result" aria-live="polite"></p></form>`;
  if(path==="/hospitalnews") return `<h2>병원 소식</h2><p class="lead">병원 운영과 환자 지원에 관한 소식을 확인할 수 있습니다.</p>${gallery(["hospitalne-02.jpg","hospitalne-03.jpg","hospitalne-04.jpg"],["병원 내 공용 공간","진료 준비","환자 지원 공간"])}<div class="info-grid"><a class="info-box" href="${BASE}/news/safe-care"><strong>환자 안전 캠페인</strong><span>감염 예방과 안전 수칙을 확인하는 참여 활동을 진행했습니다.</span></a><a class="info-box" href="${BASE}/news/care-team"><strong>간호·간병 통합 서비스</strong><span>입원 환자 지원을 위한 병동 서비스 운영 내용을 안내합니다.</span></a></div>`;
  if(path==="/news/safe-care") return `<h2>환자 안전 캠페인</h2><p class="lead">입원 환자와 병원 직원을 대상으로 환자 안전과 감염 예방 수칙을 알렸습니다.</p>${gallery(["hospitalne-02.jpg"],["환자 안전 안내 활동"])}<h3>참여 활동</h3><p>감염 관리와 환자 안전을 맡은 부서가 OX 퀴즈를 마련해 기본 안전 수칙을 확인했습니다. 참여자는 문항을 읽고 답을 고른 뒤 생활 속 감염 예방 방법을 안내받았습니다.</p><h3>안내 주제</h3><ul class="notice-list"><li>환자 확인 절차</li><li>손 위생과 감염 예방</li><li>병동에서 지킬 안전 수칙</li></ul>`;
  if(path==="/news/care-team") return `<h2>간호·간병 통합 서비스</h2><p class="lead">병동 간호 인력이 입원 환자의 일상 지원과 기본 간호를 제공하는 서비스입니다.</p>${gallery(["hospitalne-03.jpg","hospitalne-04.jpg"],["병동 간호 준비","입원 지원 공간"])}<h3>서비스 이용</h3><p>서비스 운영 여부와 이용 가능한 병동은 입원 배정 때 확인해 주세요. 환자 상태와 병동 운영 기준에 따라 제공 범위가 달라질 수 있습니다.</p><h3>입원 전 확인</h3><ul class="notice-list"><li>입원 예정 병동에서 서비스 운영 여부를 확인합니다.</li><li>간호 지원 범위와 보호자 상주 기준을 안내받습니다.</li><li>개인별 도움이 필요한 내용은 담당 간호사에게 전달합니다.</li></ul>`;
  if(path==="/faq") return `<h2>자주 묻는 질문</h2><div class="faq-list">${[
    ["건강검진 예약은 어떻게 하나요?", "검진 예약은 방문 또는 전화로 접수할 수 있습니다. 예약이 완료되면 안내문과 문진표를 우편으로 보내드립니다. 전화번호는 전화번호 쪽에서 확인해 주세요."],
    ["물리치료를 받으려면 어떤 절차가 필요한가요?", "치료 부위와 진료 결과에 따라 처방이 달라집니다. 관련 진료과에서 진료를 받은 뒤 재활의학센터에서 운동·전기·온열·작업 치료를 받을 수 있습니다."],
    ["내시경 검사는 각각 몇 분 정도 걸리나요?", "일반 위내시경은 보통 5~7분 정도 소요됩니다. 수면 내시경은 회복 시간을 약 40분 더 고려해야 합니다. 대장내시경은 보통 15분이며 용종 제거 여부에 따라 달라집니다."],
    ["CT나 MRI 촬영 결과를 당일 확인할 수 있나요?", "당일 촬영을 진행하는 경우가 있습니다. 특별한 사정이 없으면 검사 결과도 당일 확인할 수 있습니다."],
    ["외래 또는 입원 기간에 주차 지원을 받을 수 있나요?", "외래 환자는 진료비 영수증을 제시하면 최대 8시간 주차 지원을 받을 수 있습니다. 입원 환자는 입원 확인 후 입원 기간 동안 지원됩니다."],
    ["대중교통 시간은 어디서 확인하나요?", "대중교통으로 방문할 때는 오시는 길 쪽의 시내버스 시간표를 확인해 주세요."],
    ["입원 병실은 어느 층에 있나요?", "입원 병실은 5층부터 10층까지 운영합니다. 병동 배정 결과에 따라 병실 위치가 달라집니다."],
    ["입원할 때 준비할 물품은 무엇인가요?", "세면도구와 미끄럼 방지 슬리퍼, 물병, 컵을 준비해 주세요. 보호자 침구도 준비해 주세요."],
    ["병동별 면회 시간은 어떻게 되나요?", "일반 병동은 평일 오후 6시부터 8시까지 면회를 권장합니다. 주말과 공휴일에는 오전 10시부터 정오, 오후 6시부터 8시까지입니다. 중환자실 면회 시간은 정오부터 20분간입니다."],
    ["병실에서 사용할 수 있는 물품은 무엇인가요?", "병실에는 TV와 냉장고, 개인 수납장, 보호자용 침대가 비치되어 있습니다. 병실별 세부 비품은 배정 후 확인해 주세요."]
  ].map(([q,a])=>`<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>`;
  if(path==="/ko/cookie") return `<h2>쿠키 정책</h2><p>쿠키는 웹사이트가 이용자의 브라우저에 저장하는 작은 정보 파일입니다. 로그인 유지, 화면 설정과 방문 통계에 사용할 수 있습니다.</p><h3>쿠키 사용 목적</h3><table class="table"><thead><tr><th>구분</th><th>목적</th><th>저장 시점</th></tr></thead><tbody><tr><td>필수 쿠키</td><td>보안 확인과 서비스 요청 상태 유지</td><td>세션 중</td></tr><tr><td>설정 쿠키</td><td>언어와 화면 설정 기억</td><td>설정 기간</td></tr><tr><td>통계 쿠키</td><td>페이지 방문과 기능 사용 통계 집계</td><td>동의 및 보유 기준에 따름</td></tr></tbody></table><h3>쿠키 차단과 삭제</h3><p>브라우저 설정에서 저장된 쿠키를 삭제하거나 새 쿠키 저장을 차단할 수 있습니다. 필수 쿠키를 차단하면 로그인과 일부 문의 기능이 작동하지 않을 수 있습니다.</p><h3>브라우저 설정</h3><ul class="notice-list"><li>Chrome 설정의 개인정보 및 보안 메뉴에서 쿠키를 관리합니다.</li><li>Edge 설정의 쿠키 및 사이트 권한 메뉴에서 저장 범위를 선택합니다.</li><li>Safari 개인정보 보호 설정에서 사이트 간 추적과 쿠키를 조정합니다.</li><li>Firefox 설정의 개인정보 및 보안 메뉴에서 쿠키 기록을 삭제합니다.</li></ul><p>통계 기능은 동의 설정에 따라 적용되며, 쿠키 기록을 삭제하면 기존 설정이 초기화될 수 있습니다.</p>`;
   if(path==="/ko/rights") return `<h2>1. 환자의 권리</h2><ol class="legal-list"><li><strong>적절한 진료를 받을 권리</strong><p>환자는 성별, 나이, 종교, 신분과 경제적 사정에 따른 차별 없이 필요한 진료를 받을 권리가 있습니다.</p></li><li><strong>설명을 듣고 결정할 권리</strong><p>환자는 질병 상태와 치료 방법, 예상 결과에 관한 설명을 듣고 치료 여부를 결정할 수 있습니다.</p></li><li><strong>진료 정보와 사생활을 보호받을 권리</strong><p>환자의 진료 정보와 개인정보는 법률상 근거나 동의가 있는 경우를 제외하고 보호됩니다.</p></li><li><strong>상담과 조정을 신청할 권리</strong><p>의료서비스 이용 중 발생한 문제에 관해 상담과 조정을 신청할 수 있습니다.</p></li><li><strong>안전하게 진료받을 권리</strong><p>환자는 안전한 진료를 위해 필요한 설명과 보호 조치를 받을 권리가 있습니다.</p></li></ol><h2>2. 환자의 의무</h2><ol class="legal-list"><li><strong>정확한 정보 제공</strong><p>환자는 건강 상태와 복용 중인 약, 과거 치료 정보를 의료진에게 알려야 합니다.</p></li><li><strong>진료 협조</strong><p>환자는 의료진의 설명을 듣고 진료 계획과 병원의 안전 안내에 협조해야 합니다.</p></li></ol>`;
  if(path==="/ko/privacy") return `<h2>개인정보의 수집·이용 및 관리</h2><p>서해중앙병원은 진료와 병원 이용에 필요한 개인정보를 처리합니다. 처리 목적과 항목, 보유 기준, 정보주체의 권리와 요청 방법을 아래에 안내합니다.</p><h3>1. 수집 항목과 방법</h3><p>진료 신청과 검사, 병원 이용에 필요한 정보를 접수 창구, 서면 신청서, 전화 문의와 온라인 문의에서 받습니다. 환자 정보에는 성명, 생년월일, 연락처, 주소와 진료 관련 건강 정보가 포함될 수 있습니다. 온라인 문의는 답변에 필요한 연락 정보와 문의 내용을 입력받습니다.</p><table class="table"><thead><tr><th>이용 구분</th><th>처리 항목</th><th>이용 목적</th></tr></thead><tbody><tr><td>진료 신청</td><td>성명, 생년월일, 연락처, 주소</td><td>환자 확인과 진료 접수</td></tr><tr><td>진료 및 검사</td><td>보험 자격, 건강 정보, 진료 기록, 검사 결과</td><td>진료와 검사 제공</td></tr><tr><td>증명서 발급</td><td>신청인 정보, 환자와의 관계, 동의 자료</td><td>신청 자격 확인과 문서 발급</td></tr><tr><td>온라인 문의</td><td>이름, 연락처, 문의 내용</td><td>문의 확인과 답변</td></tr><tr><td>결제</td><td>결제 승인에 필요한 정보</td><td>진료비 수납과 결제 확인</td></tr><tr><td>미성년 환자</td><td>법정대리인 성명, 연락처, 관계 정보</td><td>대리인 확인과 동의 처리</td></tr><tr><td>건강검진</td><td>검진 신청 정보와 검사 결과 전달 정보</td><td>검진 일정 안내와 결과 발송</td></tr><tr><td>진료 협력</td><td>환자 식별 정보와 의뢰에 필요한 진료 자료</td><td>진료 회신과 협력 진료 처리</td></tr><tr><td>채용 지원</td><td>지원자 연락 정보와 자격 확인 자료</td><td>전형 접수와 지원 자격 확인</td></tr><tr><td>고객 의견</td><td>연락처와 의견 내용, 처리에 필요한 정보</td><td>불편 사항 접수와 회신</td></tr><tr><td>진료 회신</td><td>환자 식별 정보와 협력 진료에 필요한 자료</td><td>진료 회신서 작성과 전달</td></tr><tr><td>온라인 문진</td><td>예약 전 확인을 위해 입력한 건강 질문</td><td>진료 준비와 문진 확인</td></tr><tr><td>서비스 조사</td><td>응답 내용과 연락 선택 정보</td><td>의료서비스 만족도 확인</td></tr><tr><td>결과 발송</td><td>검진 결과 전달에 필요한 이름과 주소</td><td>결과 문서와 안내 자료 발송</td></tr></tbody></table><h3>2. 처리 목적</h3><ul class="notice-list"><li>환자 확인, 진단과 치료를 위한 진료서비스를 제공합니다.</li><li>진료 및 검사 신청, 결과 확인, 예약과 접수 업무를 처리합니다.</li><li>진료비 청구와 수납, 환급 및 증명서 발급을 진행합니다.</li><li>건강검진 결과와 검진 일정에 관한 안내를 전달합니다.</li><li>진료 협력이나 외부 검사가 필요할 때 해당 자료를 준비합니다.</li><li>병원 이용 절차와 새 서비스에 관한 안내를 제공합니다.</li><li>법령상 의무를 이행하고 관련 기록을 보관합니다.</li><li>민원과 불편 사항을 확인하고 답변을 전달합니다.</li><li>교육·연구와 업무 개선에 필요한 최소 자료를 분석합니다.</li><li>채용 지원 접수와 자격 확인을 진행합니다.</li><li>의료서비스 만족도와 운영 품질을 점검합니다.</li><li>환자와 의료기관 사이의 의뢰·회신 절차를 처리합니다.</li><li>검진 결과와 필요한 안내 자료를 환자에게 전달합니다.</li><li>지원자의 본인 여부와 공고상 자격 요건을 확인합니다.</li><li>민원 처리 결과와 추가 확인 사항을 신청인에게 알립니다.</li></ul><h3>3. 제3자 제공</h3><p>환자 동의가 있거나 법령상 의무를 이행해야 할 때 필요한 정보만 관계 기관에 제공합니다. 제공 목적과 항목, 근거와 보유 기간을 확인한 뒤 전달합니다.</p><div class="table-scroll"><table class="table"><thead><tr><th>제공 대상</th><th>처리 목적</th><th>제공 항목</th><th>법적 근거</th><th>보유 기준</th></tr></thead><tbody><tr><td>건강보험 관계기관</td><td>진료비 심사와 급여 확인</td><td>환자 식별 정보, 진단과 진료 내역</td><td>보험 급여 심사 관련 법령</td><td>관련 법령과 심사 기준에 따름</td></tr><tr><td>산재보험 관계기관</td><td>보험 급여 심사와 지급 확인</td><td>환자 식별 정보, 진료 내역</td><td>산재 보상과 급여 심사 법령</td><td>관련 법령과 심사 기준에 따름</td></tr><tr><td>암 통계 담당기관</td><td>국가 암 통계 산출</td><td>환자 식별 정보, 진단과 치료 자료</td><td>암 관리와 통계 작성 법령</td><td>법령상 통계 처리 기준에 따름</td></tr><tr><td>감염병 담당기관</td><td>법정 감염병 보고와 조사</td><td>환자 식별 정보, 진단과 진료 내역</td><td>감염병 보고와 보건 조사 법령</td><td>보고와 조사 근거에 따름</td></tr><tr><td>보건 통계 담당기관</td><td>보건 정책 통계 작성</td><td>법령에 정한 통계 항목</td><td>보건 통계 작성 관련 법령</td><td>통계 작성 기준에 따름</td></tr></tbody></table></div><p>응급 상황에서 생명이나 신체를 보호해야 하는 경우에도 법령에 정한 항목과 절차를 따릅니다. 개인을 알아볼 수 없도록 처리한 자료는 동의나 법률상 근거가 있는 통계·연구 목적에 한해 이용합니다.</p><h3>4. 처리 업무 위탁</h3><p>검체 검사, 의료 영상 판독, 결제, 전산 운영과 문서 발송을 외부 전문 기관에 맡길 수 있습니다. 위탁 계약에 개인정보 보호, 목적 외 이용 금지와 안전 관리 의무를 포함하고, 계약이 끝나면 자료의 반환 또는 파기 여부를 확인합니다.</p><table class="table"><thead><tr><th>업무</th><th>처리 범위</th><th>관리 기준</th></tr></thead><tbody><tr><td>검체 검사</td><td>검사 의뢰와 결과 전달</td><td>검사 목적에 필요한 정보 사용</td></tr><tr><td>영상 판독</td><td>의료 영상 확인과 판독 결과 회신</td><td>진료 업무에 필요한 기간 보관</td></tr><tr><td>전산·결제 지원</td><td>시스템 운영, 승인과 문서 발송</td><td>위탁 계약과 접근 권한 관리</td></tr></tbody></table><h3>5. 정보주체의 권리와 행사 방법</h3><p>환자 본인 또는 법정대리인은 개인정보 열람, 정정, 삭제와 처리 정지를 요청할 수 있습니다. 대리 신청에는 관계를 확인할 서류와 위임 자료가 필요합니다.</p><ul class="notice-list"><li>법률상 보관이나 제출 의무가 있는 정보는 해당 기간 동안 삭제를 제한할 수 있습니다.</li><li>요청을 처리하면 다른 사람의 생명·신체 또는 재산상 권리를 침해할 우려가 있는 경우 범위를 조정할 수 있습니다.</li><li>공공기관이 법률에 따른 업무를 수행하는 데 필요한 정보는 처리 정지가 제한될 수 있습니다.</li><li>계약 이행에 필요한 정보는 계약 해지 의사를 확인한 뒤 처리 기준을 안내합니다.</li></ul><h3>6. 열람 청구와 처리 절차</h3><p>열람이나 정정 요청은 개인정보 담당 부서 또는 원무 창구에 제출해 주세요. 신청인의 본인 여부와 대리 자격을 확인한 뒤 담당 부서가 요청 범위와 보관 의무를 검토합니다.</p><ul class="notice-list"><li>환자 본인은 신분 확인 자료와 신청서를 제출합니다.</li><li>가족이나 대리인이 신청할 때는 환자와의 관계, 위임 여부를 확인할 자료가 필요합니다.</li><li>진료기록 사본 발급은 관계 법령의 신청 자격과 서류 기준을 따릅니다.</li><li>자료에 다른 환자나 제3자의 정보가 포함된 경우 해당 부분을 가린 뒤 제공합니다.</li></ul><h3>7. 개인정보 파기</h3><p>수집 목적이 끝나거나 보유 기간이 지나면 파기 대상 자료를 확인해 삭제합니다. 전자 파일은 복구할 수 없도록 삭제하고 종이 문서는 분쇄 또는 폐기 절차로 처리합니다. 다른 법령에 따라 보관해야 하는 기록은 별도 분리해 정해진 기간 동안 관리합니다.</p><table class="table"><thead><tr><th>기록 종류</th><th>관리 원칙</th><th>종료 후 처리</th></tr></thead><tbody><tr><td>진료기록</td><td>의료 관계 법령의 보존 기준 적용</td><td>보존 의무 종료 후 파기</td></tr><tr><td>예약·문의 자료</td><td>응대와 일정 확인에 필요한 기간 보관</td><td>업무 목적 종료 후 삭제</td></tr><tr><td>결제·발급 기록</td><td>회계와 재발급 확인에 필요한 기준 적용</td><td>법정 보유 기간 뒤 파기</td></tr><tr><td>검사 의뢰 자료</td><td>검사 결과 회신과 진료 기록 연결에 필요한 기간</td><td>검사 목적 종료와 보존 의무 확인 뒤 파기</td></tr><tr><td>민원 처리 기록</td><td>요청 내용 확인과 결과 회신을 위한 기간</td><td>업무 처리 종료 후 내부 기준에 따라 삭제</td></tr><tr><td>채용 지원 자료</td><td>전형과 자격 확인에 필요한 기간</td><td>전형 종료 후 관련 기준에 따라 파기</td></tr><tr><td>영상정보 기록</td><td>시설 안전과 사고 확인에 필요한 기간</td><td>설치 구역 고지 기준에 따라 자동 삭제</td></tr></tbody></table><h3>8. 영상정보 처리</h3><p>시설 안전과 사고 확인에 필요한 공용 구역에서 영상정보를 처리할 수 있습니다. 촬영 범위와 보관 기간은 설치 장소의 안내에 표시하며, 열람 요청은 본인 확인과 타인의 사생활 보호 기준에 따라 검토합니다.</p><table class="table"><thead><tr><th>설치 구역</th><th>촬영 범위</th><th>운영 시간</th><th>보관 기준</th><th>보관 장소</th></tr></thead><tbody><tr><td>건물 공용부</td><td>출입구, 로비와 복도</td><td>시설 운영 시간</td><td>정해진 보존 기간이 지나면 삭제</td><td>시설 관리 담당 장소</td></tr><tr><td>승강기</td><td>승강기 내부</td><td>24시간 촬영</td><td>고지된 보관 기한 종료 뒤 파기</td><td>영상정보 관리 장소</td></tr><tr><td>주차 구역</td><td>차량 출입구와 주차 통로</td><td>주차장 운영 중 촬영</td><td>사고 확인 기간이 지나면 삭제</td><td>주차 관리 담당 장소</td></tr></tbody></table><h3>9. 안전성 확보 조치</h3><ul class="notice-list"><li>업무에 필요한 범위로 개인정보 접근 권한을 관리합니다.</li><li>접속 기록과 보관 장비를 점검합니다.</li><li>개인정보 보호 교육과 내부 점검을 실시합니다.</li><li>문서와 전자 파일의 보관·파기 절차를 관리합니다.</li><li>처리 시스템 계정은 담당 업무에 따라 권한을 나눕니다.</li><li>외부 접속과 비인가 접근을 제한하는 보안 장치를 운영합니다.</li><li>비밀번호와 중요 자료는 암호화해 보관하거나 전송합니다.</li><li>시스템 접속 기록을 보관하고 변경·분실을 점검합니다.</li><li>보안 프로그램을 최신 상태로 유지합니다.</li><li>관리 단말기와 종이 자료는 접근이 제한된 장소에 보관합니다.</li><li>재해 발생에 대비해 자료 복구 절차를 마련합니다.</li></ul><h3>10. 개인정보 보호 담당</h3><p>개인정보 보호책임자와 처리 담당 부서는 열람·정정 요청, 보유 기간 문의와 침해 신고를 접수합니다. 문의는 대표 안내 041-000-0200 또는 원무 창구를 통해 전달할 수 있습니다. 접수된 요청은 본인 확인 후 담당 업무에 따라 안내합니다.</p><table class="table"><thead><tr><th>담당</th><th>업무</th><th>문의 경로</th></tr></thead><tbody><tr><td>개인정보 보호책임자</td><td>처리방침과 보호 업무 총괄</td><td>대표 안내 또는 원무 창구</td></tr><tr><td>개인정보 처리 담당</td><td>열람·정정·삭제 요청 접수</td><td>대표 안내 또는 원무 창구</td></tr><tr><td>영상정보 담당</td><td>영상 열람과 보관 문의</td><td>시설 안내 창구</td></tr><tr><td>시스템 담당</td><td>접근 권한과 보안 점검</td><td>병원 전산 문의 경로</td></tr></tbody></table><h3>11. 자동 수집 장치와 쿠키</h3><p>웹사이트는 방문한 메뉴와 접속 시간, 서비스 오류 확인에 필요한 정보를 기록할 수 있습니다. 쿠키는 브라우저에 저장되는 작은 정보 파일입니다. 브라우저 설정에서 저장을 허용하거나 제한할 수 있으며, 저장을 제한하면 일부 웹 기능이 달라질 수 있습니다.</p><table class="table"><thead><tr><th>설정</th><th>이용자 선택</th><th>변경 방법</th></tr></thead><tbody><tr><td>쿠키 허용</td><td>방문 상태와 환경을 브라우저에 저장</td><td>브라우저 개인정보 설정에서 허용</td></tr><tr><td>저장 전 확인</td><td>쿠키 저장 시점마다 확인</td><td>브라우저 사이트 권한에서 선택</td></tr><tr><td>쿠키 차단</td><td>브라우저에 쿠키를 저장하지 않음</td><td>개인정보·보안 메뉴에서 차단</td></tr></tbody></table><ul class="notice-list"><li>Chrome은 설정의 개인정보 및 보안 항목에서 쿠키 저장을 관리할 수 있습니다.</li><li>Edge는 설정의 쿠키 및 사이트 권한 메뉴에서 허용 범위를 정할 수 있습니다.</li><li>사이트별 예외를 등록하면 선택한 웹사이트의 저장 기준을 따로 관리합니다.</li><li>저장된 쿠키를 삭제하면 일부 방문 설정과 로그인 상태가 초기화될 수 있습니다.</li><li>쿠키를 전부 차단할 때는 필요한 병원 안내 기능이 제한되는지 확인해 주세요.</li><li>브라우저별 메뉴 이름은 버전에 따라 달라질 수 있으므로 현재 설정 화면을 확인합니다.</li></ul><h3>12. 권익 침해 구제</h3><p>개인정보 처리와 관련한 불편이나 침해 의심은 병원 개인정보 담당 부서에 접수해 주세요. 담당 부서는 접수 내용과 처리 기록을 확인해 결과와 후속 절차를 안내합니다.</p><ul class="notice-list"><li>개인정보 열람이나 정정이 지연되는 경우 접수 내역을 확인해 주세요.</li><li>자료가 잘못 전달된 정황이 있으면 발생 시점과 이용 서비스를 알려 주세요.</li><li>계정이나 접속 정보가 노출된 것으로 의심되면 병원 담당 부서에 바로 알립니다.</li><li>환자 정보가 포함된 문서는 본인 또는 적법한 대리인이 신청합니다.</li><li>외부 기관의 분쟁 조정이나 신고 절차는 해당 기관의 공식 안내에서 확인할 수 있습니다.</li></ul><div class="table-scroll"><table class="table"><thead><tr><th>절차 구분</th><th>확인 내용</th><th>신청 경로</th></tr></thead><tbody><tr><td>열람과 정정</td><td>보유 자료의 열람, 오류 정정과 처리 정지를 요청합니다.</td><td>병원 개인정보 담당 부서에 접수</td></tr><tr><td>침해 신고 상담</td><td>정보 노출이나 부당한 이용 의심을 상담합니다.</td><td>관계 기관의 공식 신고 창구 이용</td></tr><tr><td>분쟁 조정</td><td>정보 처리로 발생한 다툼의 조정 절차를 확인합니다.</td><td>분쟁 조정 담당 기관에 신청</td></tr><tr><td>수사 요청</td><td>불법 접근이나 자료 유출 의심 정황을 신고합니다.</td><td>수사 기관의 신고 절차를 이용</td></tr><tr><td>행정 구제</td><td>행정 처분이나 권리 침해에 대한 이의 절차를 확인합니다.</td><td>법률에 정해진 구제 절차에 따라 신청</td></tr></tbody></table></div><h3>13. 처리방침 변경</h3><p>처리 목적, 항목이나 보유 기준에 변경이 있으면 이 페이지에 개정 내용을 알립니다. 변경된 항목과 적용 시점은 공지에서 확인해 주세요.</p><h3>추가 개인정보 안내</h3><p>웹사이트 운영 과정에서 접속 시각, 방문한 화면, 브라우저 종류와 오류 기록이 자동으로 생성될 수 있습니다. 해당 기록은 서비스 안정성과 보안 문제를 확인하는 데 필요한 범위에서 살펴봅니다.</p><p>온라인 문의를 작성할 때에는 답변에 필요한 내용만 입력해 주세요. 진료기록이나 다른 사람의 민감한 정보는 문의 본문에 적지 않는 것이 좋습니다.</p><p>동의가 필요한 항목은 목적과 처리 범위를 확인한 뒤 선택할 수 있습니다. 선택 동의를 거부해도 동의가 필수가 아닌 서비스 이용에는 영향을 주지 않습니다.</p><p>개인정보 관련 요청에는 본인 확인에 필요한 최소 자료만 제출해 주세요. 확인이 끝난 자료는 정해진 보유 기준에 따라 관리하거나 파기합니다.</p><p>개인정보 처리 방식이 바뀌면 적용 시점과 변경 내용을 안내합니다. 이전 안내와 새 안내의 적용 범위가 다르면 변경 공지에서 시행 시기를 확인할 수 있습니다.</p><p>병원은 업무 담당자별 접근 권한을 관리하고, 권한 부여와 변경 내역을 점검합니다. 자료 전달과 보관은 정해진 업무 절차에 따라 수행합니다.</p>`;
  if(path==="/ko/term") return `<h2>서비스 이용약관</h2>${termClauses.map(([heading,lines])=>`<h3>${heading}</h3><p>${lines.join("<br>")}</p>`).join("")}`;
  if(path==="/intro_history"){const events=[["2020년대",[["2026년 1월","검사실 인증 평가에서 연속으로 높은 등급을 받았습니다."],["2026년 3월","의료기관 인증을 갱신했습니다."],["2026년 4월","심뇌혈관센터를 열었습니다."],["2025년 1월","검사실 인증 평가에서 높은 등급을 받았습니다."],["2025년 5월","심뇌혈관센터 운영을 시작했습니다."],["2025년 10월","간호·간병 통합 병동을 늘렸습니다."],["2025년 12월","의료기관 간 협력 수련 사업에 참여했습니다."],["2024년 11월","지역 응급의료센터로 승격했습니다."],["2023년 6월","간호·간병 통합 병동을 개설했습니다."],["2022년 1월","감염병 환자 치료 병상을 운영했습니다."],["2022년 7월","통합 의료정보 시스템을 교체했습니다."],["2022년 10월","수술실과 회복 병상 수를 늘렸습니다."],["2021년 5월","야간·휴일 중증 응급환자 수술 지원 사업에 참여했습니다."],["2021년 10월","암 검진 평가에서 높은 등급을 받았습니다."],["2021년 11월","응급실에 음압 격리 병상을 설치했습니다."],["2020년 2월","감염병 대응 의료기관으로 지정됐습니다."],["2020년 9월","1층 외래 대기 공간을 정비했습니다."],["2020년 10월","컴퓨터단층촬영 장비를 추가해 두 대를 운영했습니다."]]],["2010년대",[["2019년 1월","다수 환자 발생에 대비한 대응 체계를 마련했습니다."],["2019년 12월","인공신장실을 확장했습니다."],["2018년 8월","지하 1층에 식음 시설이 들어섰습니다."],["2017년 3월","산부인과 진료실을 이전하고 내부를 정비했습니다."],["2017년 9월","중환자실에 음압 격리실을 설치했습니다."],["2016년 1월","지역 의료기관과 진료 협약을 맺었습니다."],["2016년 6월","1층부터 3층까지 공간을 넓혔습니다."],["2015년 5월","자기공명영상 장비를 도입했습니다."],["2015년 6월","감염병 대응 의료기관으로 지정됐습니다."],["2015년 11월","공공 의료기관과 협력 양해각서를 맺었습니다."],["2013년 3월","다중 절편 컴퓨터단층촬영 장비를 도입했습니다."],["2013년 5월","대학 의료기관과 진료 협약을 맺었습니다."],["2012년 1월","수도권 의료기관과 진료 협약을 체결했습니다."],["2012년 3월","대학병원과 진료 협력 관계를 맺었습니다."],["2012년 7월","의료기관 간 협력 진료를 시작했습니다."],["2011년 2월","내시경센터를 개설했습니다."],["2011년 8월","의료기관 간 진료 협약을 추가했습니다."],["2011년 9월","전문병원과 진료 협력 관계를 마련했습니다."],["2010년 3월","의료기관 간 진료 협약을 시작했습니다."],["2010년 4월","상급 의료기관과 협력 관계를 넓혔습니다."],["2010년 6월","지역 의료기관과 진료 협약을 맺었습니다."],["2010년 10월","국내외 의료기관과 협력 진료를 추진했습니다."]]],["2000년대",[["2009년 3월","대학 의료기관과 진료 협약을 체결했습니다."],["2009년 4월","소아청소년 진료를 확대하고 중독 진료센터를 열었습니다."],["2009년 5월","대학병원과 협력 진료 관계를 맺었습니다."],["2006년 2월","병원 건물을 준공했습니다."],["2006년 3월","종합병원 진료를 시작했습니다."],["2006년","14개 진료과와 288병상으로 운영을 시작했습니다."],["2006년 5월","개원 예배와 기념 행사를 진행했습니다."],["2006년 12월","대학 의료기관과 진료 협약을 체결했습니다."],["2003년 11월","병원 건축을 시작했습니다."],["2001년 10월","건강검진센터를 개설했습니다."]]],["1990년대",[["1999년 9월","인공신장실을 개설했습니다."],["1998년 9월","병원 운영 장소를 옮겼습니다."],["1998년 9월","자기공명영상 장비를 도입했습니다."],["1994년 4월","8개 진료과를 갖춘 병원 진료를 시작했습니다."]]],["1930~1960년대",[["1936년 1월","의료기관이 진료를 시작했습니다."],["1962년 5월","의원 운영 책임자가 새로 취임했습니다."]]]];return '<h2>\ubcd1\uc6d0 \uc5f0\ud601</h2><p class="lead">\uc5f0\ub3c4\ubcc4 \uc9c4\ub8cc \uc2dc\uc124\uacfc \uc758\ub8cc \uc6b4\uc601 \uae30\ub85d\uc785\ub2c8\ub2e4.</p><div class="history-layout"><aside class="history-intro"><p>\uc9c0\uc5ed \uc8fc\ubbfc\uc758 \uac74\uac15\uc744 \uc704\ud55c \ubcd1\uc6d0 \uc6b4\uc601</p><strong>\ubcd1\uc6d0\uc774 \uc8fc\uc694 \uc5f0\ud601</strong></aside><div class="timeline">'+events.map(([period,rows])=>'<section><h3>'+period+'</h3><dl>'+rows.map(([date,event])=>'<dt>'+date+'</dt><dd>'+event+'</dd>').join('')+'</dl></section>').join('')+'</div></div>';}
  if(path==="/intro_mission") return `<h2>미션·비전·핵심가치</h2>${gallery(["intromissi-01.jpg","intromissi-02.jpg","intromissi-03.jpg","intromissi-04.jpg","intromissi-05.jpg","intromissi-06.jpg"],["환자 상담에 사용하는 진료 기록","병원 복도를 걷는 의료진의 뒷모습","침상을 정돈하는 의료진의 손","보호자와 상담하는 간호사","손 위생을 위한 세면대와 소독제","나무와 벤치가 있는 회복 정원"]).replace('class="photo-grid"','class="photo-grid mission-photo-grid"')}<div class="mission-value-grid"><article class="mission-value-card"><h3>미션</h3><p>그리스도의 사랑으로 환자의 몸과 마음을 돌보고 복음을 전합니다.</p></article><article class="mission-value-card"><h3>비전</h3><p>전인 치료와 기독교 신앙, 양질의 의료서비스를 바탕으로 지역사회에 봉사합니다.</p></article></div><h2>핵심가치</h2><div class="mission-value-grid"><article class="mission-value-card"><h3>환자 중심</h3><p>환자 중심의 진료를 지향합니다.</p></article><article class="mission-value-card"><h3>전문 역량</h3><p>전문 역량을 바탕으로 의료서비스를 제공합니다.</p></article><article class="mission-value-card"><h3>상호 존중</h3><p>환자와 직원 사이에 상호 존중을 실천합니다.</p></article><article class="mission-value-card"><h3>사회 공헌</h3><p>의료 봉사와 지역사회 활동에 참여합니다.</p></article></div>`; if(path==="/thisweekmeal") return `<h2>이번 주 식단</h2><p class="lead">병동에서 제공하는 주간 식단 자료입니다.</p><p class="board-count">등록 자료 10건</p><div class="table-scroll"><table class="table meal-board"><thead><tr><th>번호</th><th>게시물</th><th>작성 부서</th><th>등록일</th><th>조회</th></tr></thead><tbody>${[[10,"11월 둘째 주 병동 식사 구성","2026.11.06",34],[9,"11월 첫째 주 병동 식사 구성","2026.10.30",29],[8,"10월 넷째 주 병동 식사 구성","2026.10.23",42],[7,"10월 셋째 주 병동 식사 구성","2026.10.16",37],[6,"10월 둘째 주 병동 식사 구성","2026.10.09",24],[5,"10월 첫째 주 병동 식사 구성","2026.10.02",61],[4,"9월 넷째 주 병동 식사 구성","2026.09.25",54],[3,"9월 셋째 주 병동 식사 구성","2026.09.18",70],[2,"9월 둘째 주 병동 식사 구성","2026.09.11",83],[1,"9월 첫째 주 병동 식사 구성","2026.09.04",91]].map(([n,title,date,views])=>`<tr><td>${n}</td><td>${title}</td><td>영양팀</td><td>${date}</td><td>${views}</td></tr>`).join("")}</tbody></table></div><nav class="meal-pages" aria-label="목록 페이지">${[1,2,3,4,5].map(n=>`<span${n===1?" aria-current=page":""}>${n}</span>`).join("")}</nav>`;
 if(path==="/floorlayout") return `<h2>층별 주요 공간</h2><table class="table"><thead><tr><th>층</th><th>주요 공간</th><th>참고</th></tr></thead><tbody>${[["10층","입원 병동","병동 안내"],["9층","입원 병동","병동 안내"],["8층","입원 병동","병동 안내"],["7층","입원 병동","병동 안내"],["6층","입원 병동","병동 안내"],["5층","입원 병동 · 옥상 정원","병동 안내"],["3층","진료 · 검사 공간","진료과 안내"],["2층","진료 · 수술 공간","안내 데스크"],["1층","접수 · 응급 진료","안내 데스크"],["지하 1층","재활 · 주차 공간","시설 안내"],["지하 2층","장례 시설 · 지원 공간","시설 안내"]].map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table>` ;
  if(path==="/phoneinfo") return `<h2>전화번호</h2><p class="lead">진료과와 병원 부서별 문의 번호입니다. 응급 상황은 119로 연락해 주세요.</p><h3>진료과</h3><table class="table"><tbody>${[["심장내과","041-000-1101"],["호흡기내과","041-000-1102"],["내분비내과","041-000-1103"],["소화기내과","041-000-1104"],["외과","041-000-1105"],["비뇨의학과","041-000-1106"],["소아청소년과","041-000-1107"],["재활의학과","041-000-1108"],["신경외과","041-000-1109"],["신경과","041-000-1110"],["정형외과","041-000-1111"],["치과","041-000-1112"],["영상의학과","041-000-1113"],["진단검사의학과","041-000-1114"]].map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join("")}</tbody></table><h3>진료센터</h3><table class="table"><tbody>${[["소화기내시경센터","041-000-1201"],["뇌신경센터","041-000-1202"],["복강경센터","041-000-1203"],["재활의학센터","041-000-1204"],["유방갑상선센터","041-000-1205"],["인공신장센터","041-000-1206"],["건강증진센터","041-000-1207"],["당뇨센터","041-000-1208"]].map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join("")}</tbody></table><h3>병동과 주요 부서</h3><table class="table"><tbody>${[["3병동","041-000-1303"],["5병동","041-000-1305"],["6병동","041-000-1306"],["7병동","041-000-1307"],["8병동","041-000-1308"],["9병동","041-000-1309"],["10병동","041-000-1310"],["중환자실","041-000-1311"],["수술실","041-000-1312"],["인공신장실","041-000-1313"],["원무팀","041-000-1401"],["구매팀","041-000-1402"],["심사팀","041-000-1403"],["약제팀","041-000-1404"],["전산팀","041-000-1405"],["간호부","041-000-1406"],["감염관리실","041-000-1407"],["총무팀","041-000-1408"],["진료협력팀","041-000-1409"],["시설팀","041-000-1410"]].map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join("")}</tbody></table><p class="notice">대표 안내 041-000-0200 · 응급실 041-000-0299 · 건강검진 예약 041-000-0230</p>`;
  if(path.includes("expense")) return `<h2>비급여 항목</h2><p class="lead">진료비용은 진료 내용과 사용 재료에 따라 달라질 수 있습니다. 세부 항목과 금액은 원무팀에서 확인해 주세요.</p><div class="tabs" role="tablist"><button role="tab" aria-selected="true">행위료</button><button role="tab" aria-selected="false">치료 재료</button><button role="tab" aria-selected="false">약제비</button><button role="tab" aria-selected="false">제증명 수수료</button></div><h3>진료 행위</h3><table class="table"><thead><tr><th>분류</th><th>항목</th><th>금액 확인</th></tr></thead><tbody>${[["검사료","초음파 검사","원무팀 문의"],["검사료","자기공명영상 검사","원무팀 문의"],["검사료","컴퓨터단층촬영","원무팀 문의"],["검사료","내시경 검사","원무팀 문의"],["검사료","심전도 검사","원무팀 문의"],["검사료","골밀도 측정","원무팀 문의"],["처치료","상처 처치","진료과 문의"],["처치료","관절 주사","진료과 문의"],["처치료","물리 치료","진료과 문의"],["처치료","신경 차단술","진료과 문의"],["치료 재료","고정용 재료","원무팀 문의"],["치료 재료","상처 치료 재료","원무팀 문의"],["치료 재료","수술 보조 재료","원무팀 문의"],["약제비","비급여 약제","약제팀 문의"],["제증명","일반 진단서","원무팀 문의"],["제증명","영문 증명서","원무팀 문의"],["제증명","진료기록 사본","원무팀 문의"],["제증명","영상 자료 복사","원무팀 문의"]].map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table><h3>금액 확인 시 필요한 정보</h3><p>검사명, 진료일과 처치 내용을 확인한 뒤 해당 진료과 또는 원무팀에 문의해 주세요. 치료 재료와 약제 비용은 사용량에 따라 달라질 수 있습니다.</p><p>비급여 비용 변경은 병원 내 게시 자료와 원무 창구 안내를 기준으로 합니다. 보험 적용 여부는 환자 상태와 진료 내용에 따라 달라질 수 있습니다.</p><p class="notice">비급여 비용 문의 041-000-0200</p>`;
  if(path==="/parkinginfo") return `<h2>주차 요금과 이용</h2><p class="lead">진료 방문, 입·퇴원, 장례식장 이용, 일반 방문 차량의 주차 기준입니다.</p>${responsiveGallery([["parkinginf-01.jpg","parkinginf-02.jpg"],["parkinginf-03.jpg","parkinginf-04.jpg"],["parkinginf-05.jpg","parkinginf-06.jpg"],["parkinginf-07.jpg","parkinginf-08.jpg"],["parkinginf-09.jpg","parkinginf-10.jpg"]],["주차장 진입로","방문 차량 구역","승하차 구역","주차장 보행로"])}<table class="table"><thead><tr><th>구분</th><th>대상</th><th>요금 기준</th><th>확인 방법</th></tr></thead><tbody><tr><td>진료 방문</td><td>외래 환자·영수증 미발급 검사 환자</td><td>8시간 무료</td><td>진료 영수증 또는 해당 부서 확인증</td></tr><tr><td>입·퇴원</td><td>환자와 보호자 차량 1대</td><td>입원 당일과 퇴원 당일 무료</td><td>원무 창구 등록</td></tr><tr><td>장례 상주</td><td>상주 차량 최대 6대</td><td>장례 기간 무료</td><td>장례 안내실에 차량 정보 제출</td></tr><tr><td>장례 방문</td><td>조문 차량</td><td>3시간 할인권 적용, 이후 일반 요금</td><td>장례 안내실 할인권</td></tr><tr><td>정기권</td><td>등록 차량</td><td>15일권·월권</td><td>주차 관리 창구에서 금액 확인</td></tr><tr><td>일반 차량</td><td>일반 내원객</td><td>최초 30분 무료, 이후 30분당 1,500원이며 1일 최대 20,000원</td><td>무인 정산기 또는 정산 부스</td></tr></tbody></table><h3>주차장 위치와 정산</h3><p>주차 공간은 약 350대 규모이며 장애인 주차 구역을 운영합니다.</p><ul class="notice-list"><li>장애인 주차 구역을 운영합니다.</li><li>지상 전면 주차장과 후면 주차장, 지하 1층 주차장을 이용할 수 있습니다.</li><li>무인 정산기는 1층 후문과 지하 1층 매장 옆에 있습니다.</li><li>할인 확인 자료가 없으면 일반 요금으로 정산해야 합니다.</li><li>차량과 주차장 안의 소지품은 직접 확인해 주세요.</li></ul>`;
  if(path==="/location_1") return `<h2>오시는 길</h2><p class="lead">서해중앙병원 주소와 교통 문의를 안내합니다.</p><div class="map-panel"><div class="map-copy"><h3>서해중앙병원</h3><p>새솔시 바다로 128<br>대표전화 041-000-0200<br>외래 접수 평일 08:30–17:30</p><a class="btn" href="${BASE}/phoneinfo">전화번호</a></div><div class="map-art"><span class="map-pin">서해중앙병원</span></div></div><h3>교통편</h3><table class="table"><thead><tr><th>이동 수단</th><th>방문 전 확인</th></tr></thead><tbody><tr><th>시내버스</th><td>운행 노선과 하차 정류장은 교통 운영 기관에 확인해 주세요.</td></tr><tr><th>택시</th><td>주소를 기사에게 보여 주세요. 병원 정문에서 하차할 수 있습니다.</td></tr><tr><th>자가용</th><td>주차장 진입 표지에 따라 방문객 주차 구역에 주차해 주세요.</td></tr><tr><th>장애인 차량</th><td>승하차 구역과 장애인 주차 구역을 이용할 수 있습니다.</td></tr></tbody></table><h3>방문 전 확인</h3><p>대중교통 운행과 도로 상황은 방문 당일 교통 안내를 확인해 주세요. 주차장 이용 정보는 주차 안내에서 확인할 수 있습니다. 진료 예약 시간과 접수 위치는 진료과에서 확인할 수 있습니다.</p><p>병원 안에서 진료과를 찾기 어려운 경우 1층 안내 데스크에 문의해 주세요. 이동 지원이 필요한 환자는 보호자와 함께 방문하거나 예약한 진료과에 사전 문의할 수 있습니다.</p><p>주소를 이용한 길찾기 결과가 다를 때는 대표 안내로 연락해 병원 정문과 주차장 위치를 확인해 주세요.</p>`;
 if(path==="/emergencycare") return `<h2>응급 진료</h2><p class="lead">응급실은 하루 24시간 운영합니다. 생명이 위급한 상황은 119에 신고해 주세요.</p><div class="feature-photo"><picture><source media="(max-width: 640px)" srcset="${BASE}/assets/img/emergencyc-02.jpg"><img src="${BASE}/assets/img/emergencyc-01.jpg" alt="응급 진료 출입구" loading="lazy"></picture><div><h3>응급실 접수</h3><p>응급실 접수 창구에서 환자 상태와 방문 경위를 확인합니다. 진료 순서는 응급도에 따라 정합니다.</p><p>접수와 진료 절차는 응급실 안내 창구에서 확인합니다.</p></div></div><h3>내원 후 절차</h3><div class="steps">${[["응급 진료 접수","진료 신청서를 작성한 뒤 응급실 접수를 진행합니다."],["응급의학과 전문의 진료","환자의 증상과 상태를 평가하고 필요한 진료를 결정합니다."],["입원","입원이 결정되면 원무 창구에서 입원 절차를 밟고 병동으로 이동합니다."],["귀가","진료비를 수납하고 처방과 후속 진료 안내를 확인합니다."]].map(([a,b])=>`<div class="step"><strong>${a}</strong><p>${b}</p></div>`).join("")}</div><h3>응급 증상</h3><div class="info-grid"><div class="info-box"><strong>신경계</strong><span>의식 저하, 갑작스러운 마비, 경련, 말하기 어려운 증상</span></div><div class="info-box"><strong>심혈관계</strong><span>심한 흉통, 호흡 곤란, 심정지 또는 급격한 맥박 이상</span></div><div class="info-box"><strong>외상과 복통</strong><span>다발성 골절, 척추나 대퇴부 골절, 심한 복통과 외상</span></div><div class="info-box"><strong>중독과 대사 이상</strong><span>심한 탈수, 약물이나 알코올 중독, 간·신장 기능의 급성 이상</span></div><div class="info-box"><strong>출혈</strong><span>기침할 때 피가 나오거나 출혈이 멎지 않는 경우, 소화관 출혈이 계속되는 경우</span></div><div class="info-box"><strong>눈 손상</strong><span>화학물질이 눈에 들어간 경우에는 즉시 응급실에 방문해 주세요.</span></div><div class="info-box"><strong>알레르기 반응</strong><span>얼굴 부종을 동반한 심한 알레르기 반응</span></div><div class="info-box"><strong>소아 증상</strong><span>소아의 경련성 장애와 급격한 의식 변화</span></div><div class="info-box"><strong>정신건강 위기</strong><span>본인 또는 타인을 해칠 위험이 있는 상황</span></div></div><h3>응급 협진 진료과</h3><ul class="notice-list"><li>신장내과 · 심장내과 · 내분비내과</li><li>소화기내과 · 외과 · 비뇨의학과</li><li>소아청소년과 · 신경외과 · 신경과</li><li>정형외과 · 재활의학과 · 응급의학과</li><li>치과·구강외과 · 마취통증의학과 · 영상의학과</li><li>진단검사의학과</li></ul><p class="notice">위급한 증상은 119에 신고하거나 가까운 응급실을 이용해 주세요.</p>`;
  if(path==="/outpatientcare") return `<h2>외래 진료</h2><p class="lead">진료과별 접수 시간과 진료 절차를 확인해 주세요.</p>${responsiveGallery([["outpatient-02.jpg","outpatient-01.jpg"]],["밝은 외래 진료 공간"],"outpatient-photo-grid")}<h3>진료 접수 시간</h3><table class="table"><thead><tr><th>요일</th><th>접수 시간</th></tr></thead><tbody><tr><td>평일</td><td>오전 8:30–오후 5:00</td></tr><tr><td>토요일</td><td>오전 8:30–오후 12:00</td></tr><tr><td>점심 시간</td><td>오후 12:30–오후 1:30</td></tr></tbody></table><p>진료과별 접수 일정은 해당 의료진의 진료 일정을 확인해 주세요.</p><h3>외래 진료 절차</h3><ol class="steps"><li class="step"><strong>접수 신청서 작성</strong><p>대기 중 진료 신청서를 작성해 접수 창구에 제출합니다.</p></li><li class="step"><strong>환자 확인</strong><p>등록, 수납, 검사와 진료 창구에서 성명과 생년월일을 확인합니다.</p></li><li class="step"><strong>진료와 검사</strong><p>접수한 진료과의 순서를 확인한 뒤 진료 및 필요한 검사를 받습니다.</p></li><li class="step"><strong>수납</strong><p>진료와 검사 후 수납 창구에서 비용을 납부합니다.</p></li><li class="step"><strong>처방과 귀가</strong><p>처방전과 다음 진료 일정을 확인합니다.</p></li></ol><p>환자 확인은 접수, 수납, 검사와 진료 창구에서 반복해 진행합니다. 접수 시 성명과 생년월일을 확인할 자료를 준비해 주세요.</p><p>진료 신청서는 대기 순서에 맞춰 작성하고 접수 창구에 제출합니다. 진료과별 의료진 일정은 외래 예약 전에 확인해 주세요.</p><h3>외래 서비스</h3><ul class="notice-list"><li>진료 절차와 진료과 선택 정보 확인</li><li>진료 시설 위치 확인</li><li>진료 방문 차량 무료 주차 확인</li><li>입원 환자의 병실 위치 확인</li><li>휠체어 대여</li><li>신청서 작성 지원</li><li>불편·불만 사항 상담</li></ul><h3>방문 전 확인 사항</h3><p>접수 시간은 환자 수와 진료과 운영 상황에 따라 조정될 수 있으므로 방문 전에 진료 일정을 확인해 주세요. 응급 환자는 외래 접수 시간과 관계없이 응급실에서 진료를 받을 수 있습니다.</p><p>처음 방문하는 환자는 건강보험 자격 확인 자료를 준비해 주세요. 의료급여 환자는 진료 의뢰서 등 필요한 자료를 해당 진료과에 확인합니다.</p><p>병원에서는 진료실 위치 안내와 상담을 돕는 설명 간호 서비스를 운영합니다. 입원 대기 시간을 줄이고 수술·검사 전 처치를 지원하는 주간 병동도 이용할 수 있습니다.</p><p>진료과 선택, 진료 시설 위치, 병실 확인, 휠체어 대여와 신청서 작성 지원은 방문 중 안내 창구에서 요청할 수 있습니다.</p>`;
  if(path==="/hsptl_process") return `<h2>입원과 퇴원</h2><p class="lead">입원 결정 뒤 병동 배정과 준비 사항을 원무 창구에서 확인해 주세요.</p><h3>입원 절차</h3><div class="steps">${[["입원 결정","외래 또는 응급실 진료 뒤 담당 진료과가 입원 필요성과 일정을 안내합니다."],["입원 접수","원무 창구에서 입원 절차를 진행하고 필요한 환자 확인 자료를 제출합니다."],["입원 예약","수술 일정이나 병상 상황에 따라 입원 날짜를 예약할 수 있습니다. 예약한 날 해당 진료과에 방문해 주세요."],["입원 검사","입원에 필요한 검사와 확인 절차를 진행합니다."],["병실 배정","병동과 병실 위치를 확인한 뒤 병동으로 이동합니다."],["병동 안내","병실 생활에 관한 내용은 병동 간호사실에서 안내받을 수 있습니다."]].map(([a,b])=>`<div class="step"><strong>${a}</strong><p>${b}</p></div>`).join("")}</div><h3>입원 준비</h3><ul class="notice-list"><li>환자 신분증과 진료에 필요한 서류를 준비해 주세요.</li><li>현재 복용 중인 약의 처방전이나 약 봉투를 가져와 주세요.</li><li>수건, 칫솔, 치약과 개인 위생용품을 준비해 주세요.</li><li>실내에서 신을 슬리퍼와 물컵을 준비해 주세요.</li><li>보호자 침구가 필요한 경우 병동 안내를 확인해 주세요.</li><li>귀중품과 현금은 병실에 두지 마세요.</li><li>보호자 상주와 면회 기준은 입원 병동에 문의해 주세요.</li></ul><h3>퇴원 절차</h3><div class="steps">${[["퇴원 결정","담당 의사가 퇴원을 결정하면 병동 간호사실에서 절차를 안내합니다."],["진료비 심사","퇴원 전 진료비 심사가 끝났는지 원무 창구에서 확인합니다."],["진료비 수납","심사가 완료된 뒤 원무 창구에서 진료비를 납부합니다."],["퇴원 약 수령","퇴원 약과 복용 방법을 확인하고 약을 수령합니다."],["주의사항 확인","병동 간호사에게 퇴원 뒤 주의할 점과 후속 외래 일정을 확인합니다."],["귀가","필요한 안내를 확인한 뒤 병동에서 퇴실합니다."]].map(([a,b])=>`<div class="step"><strong>${a}</strong><p>${b}</p></div>`).join("")}</div><p class="notice">병실 배정과 퇴원 정산에 관한 문의는 원무 창구 또는 병동 간호사실에 확인해 주세요.</p>`;
  if(path==="/medicalprocedure") return `<h2>진료 절차</h2><p class="lead">진료 목적과 예약 시간에 맞춰 접수 창구를 방문해 주세요.</p><div class="steps">${[["도착","예약 시간과 진료과 위치를 확인합니다."],["접수","신분 확인 자료와 진료카드를 제출합니다."],["진료·검사","담당 진료과에 따라 진료 또는 검사를 받습니다."],["수납","진료비와 검사비를 수납합니다."],["처방·귀가","처방전과 재방문 일정을 확인합니다."]].map(([a,b])=>`<div class="step"><strong>${a}</strong><p>${b}</p></div>`).join("")}</div><h3>준비 자료</h3><p>진료카드와 신분증을 준비해 주세요. 타 의료기관의 진료 의뢰서, 검사 결과나 영상 자료가 있으면 접수 시 제출할 수 있습니다.</p><h3>검사 예약</h3><p>금식, 복용 약 조정이나 검사 전 준비가 필요한 경우 예약 안내를 확인해 주세요. 안내를 받지 못했으면 검사실에 문의해 주세요.</p><h3>진료 후 확인</h3><p>수납 후 처방전, 다음 진료 날짜와 검사 결과 확인 일정을 확인합니다. 응급 증상이 있으면 외래 접수 대신 응급실로 방문해 주세요.</p>`;
 if(path==="/med_dept_center"){const icon=(shape)=>`<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">${shape}</svg>`;const centerItems=[["심장혈관센터","심장과 혈관 질환 진료","/med_dept_center",icon('<path d="M24 39S7 29 7 17c0-8 11-11 17-2 6-9 17-6 17 2 0 12-17 22-17 22Z"/><path d="M10 24h8l4-7 5 14 4-7h7"/>')],["뇌혈관센터","뇌혈관 질환 진료","/med_dept_center",icon('<path d="M24 8c-8-5-16 1-14 8-6 4-4 13 2 15 0 7 8 10 13 5 5 5 13 2 13-5 6-2 8-11 2-15 2-7-6-13-14-8Z"/><path d="M24 9v29M16 16l5 4m11-4-5 4m-13 5 6 1m17-1-6 1"/>')],["응급의료센터","응급 환자 진료","/centers/emergency",icon('<path d="M6 16h24v19H6zM30 22h7l6 7v6H30z"/><path d="M16 20v11m-5-5h10M34 28h8M12 39h5m17 0h5"/>')],["척추관절센터","척추와 관절 진료","/med_dept_center",icon('<path d="M24 7c-5 3-5 7 0 9-5 2-5 6 0 8-5 2-5 6 0 8-5 2-5 6 0 9"/><path d="M16 12l8 2 8-2m-16 9 8 2 8-2m-16 9 8 2 8-2"/>')],["소화기내시경센터","소화기 내시경 검사","/med_dept_center",icon('<path d="M13 8v13c0 11 20 11 20 0V8"/><path d="M13 8h8m12 0h-8M18 29c0 8 12 8 12 0M24 8v11"/>')],["건강검진센터","건강검진 예약과 검사","/centers/health-screening",icon('<path d="M13 6h22v36H13zM19 13h10M19 20h10M19 27h4"/><path d="m25 34 4 4 8-9"/>')],["재활의학센터","기능 평가와 재활 치료","/med_dept_center",icon('<circle cx="17" cy="10" r="4"/><path d="m16 16 7 6 8-2m-15-4-5 10 8 4 3 10m2-18 8 10 8 1M14 27l-5 12"/>')],["어린이센터","소아·청소년 진료","/med_dept_center",icon('<circle cx="24" cy="13" r="7"/><path d="M12 40c1-10 5-15 12-15s11 5 12 15M18 14h.1M30 14h.1m-9 4q3 3 6 0"/>')],["당뇨센터","당뇨 진료와 검사","/med_dept_center",icon('<path d="M24 6c-5 8-12 15-12 23a12 12 0 0 0 24 0C36 21 29 14 24 6Z"/><path d="M17 29h5l3-6 3 11 3-5h3"/>')],["인공신장센터","혈액투석 진료","/med_dept_center",icon('<path d="M18 10c-7 0-9 8-7 15 2 8 8 12 13 7 4-5 2-22-6-22Zm12 0c7 0 9 8 7 15-2 8-8 12-13 7-4-5-2-22 6-22Z"/><path d="M24 21v13m-5-7h10"/>')],["유방·갑상선센터","유방과 갑상선 진료","/med_dept_center",icon('<path d="M24 9c-7 7-11 12-11 19a11 11 0 0 0 22 0c0-7-4-12-11-19Z"/><path d="M18 27c2-3 4-4 6-3 2-1 4 0 6 3m-6-3v9"/>')],["복강경센터","복강경 수술 진료","/med_dept_center",icon('<path d="m12 8 24 24m-8-24L12 32"/><path d="M8 6l8 8m16 16 8 8M32 6l8 8M8 32l8 8"/><circle cx="24" cy="24" r="5"/>')]];return `<h2>전문센터</h2><p class="lead">센터별 진료 분야와 검사 정보를 확인해 주세요.</p><div class="center-grid">${centerItems.map(([name,desc,href,svg])=>`<a class="center-card" href="${BASE}${href}"><span class="center-icon">${svg}</span><h3>${name}</h3><p>${desc}</p></a>`).join("")}</div>`}
 if(path==="/centers/emergency") return `<h2>응급의료센터</h2><p class="lead">응급 환자 진료 절차와 내원 시 확인할 내용을 안내합니다.</p>${gallery(["meddeptcen-04.jpg","meddeptcen-08.jpg"],["응급 진료 공간","환자 안내 공간"])}<h3>응급 진료</h3><p>응급실에 도착하면 접수 창구에서 환자 상태와 방문 경위를 확인합니다. 진료 순서는 응급도에 따라 정하며 필요한 검사와 처치는 담당 의료진이 판단합니다.</p><h3>내원 전 준비</h3><ul class="notice-list"><li>복용 중인 약과 확인된 알레르기 정보를 의료진에게 알려 주세요.</li><li>증상이 시작된 시점과 달라진 상태를 설명해 주세요.</li><li>생명이 위급한 상황은 119에 신고해 주세요.</li></ul>`;
 if(path==="/centers/health-screening") return `<h2>건강검진센터</h2><p class="lead">건강검진 예약과 검사 전 준비 사항을 확인해 주세요.</p>${gallery(["meddeptcen-01.jpg","meddeptcen-10.jpg"],["검진 상담 공간","검사 준비 공간"])}<h3>검진 예약</h3><p>검진 종류와 가능한 일정을 확인한 뒤 예약을 신청합니다. 예약 안내에 적힌 날짜와 준비 사항을 확인해 주세요.</p><h3>검사 전 확인</h3><ul class="notice-list"><li>검사별 금식과 복용 약 기준을 예약 안내에서 확인합니다.</li><li>이전 검사 결과나 진료 자료가 있으면 접수 때 제출합니다.</li><li>검사 당일 본인 확인 자료를 준비해 주세요.</li></ul>`;
  if(path==="/certification") return `<h2>진료기록과 증명서 발급</h2><p class="lead">신청 자격과 구비 서류를 확인한 뒤 원무 창구에서 발급을 신청해 주세요.</p><h3>신청인별 구비 자료</h3><table class="table"><thead><tr><th>신청인</th><th>준비 자료</th></tr></thead><tbody><tr><th>환자 본인</th><td>신분증 또는 건강보험증</td></tr><tr><th>배우자·직계가족</th><td>신청인 신분증, 가족관계 확인 자료, 환자 동의서와 신분증 사본</td></tr><tr><th>지정 대리인</th><td>신청인 신분증, 환자 자필 동의서, 위임장, 환자 신분증 사본</td></tr><tr><th>미성년 환자 대리 신청</th><td>법정대리인 신분증과 가족관계 확인 자료</td></tr><tr><th>환자가 동의할 수 없는 경우</th><td>신청인과 환자의 관계 및 신청 사유를 확인하는 자료</td></tr></tbody></table><h3>동의서와 위임장 작성</h3><ul class="notice-list"><li>동의서와 위임장에는 환자 본인이 직접 서명해야 합니다. 도장이나 지장은 사용할 수 없습니다.</li><li>동의서와 위임장은 법정 서식을 사용해 주세요.</li><li>만 17세 미만 환자는 본인 확인을 위한 신분증이나 가족관계 확인 자료가 필요합니다.</li><li>환자가 동의할 수 없는 상황에는 친족이 신청할 수 있으며, 친족이 없는 경우에는 관계를 확인할 자료를 추가로 제출해야 합니다.</li><li>진료기록을 요청할 때는 진료일과 필요한 기록 범위를 신청서에 적어 주세요.</li></ul><h3>외래 환자 신청</h3><div class="steps">${[["서류 준비","신청인 관계에 필요한 증빙과 신분증을 준비합니다."],["외래 접수","외래 접수 창구에서 진료기록 발급을 신청합니다."],["진료과 확인","해당 진료과에 필요한 기록과 발급 범위를 전달합니다."],["비용 확인","발급 서류 종류와 부수에 따른 비용을 확인합니다."],["서류 수령","원무과 발급 창구에서 서류를 받습니다."]].map(([a,b])=>`<div class="step"><strong>${a}</strong><p>${b}</p></div>`).join("")}</div><h3>입원 환자 신청</h3><div class="steps">${[["서류 준비","신청인 관계에 맞는 자료를 갖춥니다."],["병동 신청","입원 중인 병동 간호사실에 신청서를 제출합니다."],["서류 확인","발급 범위와 신청 자료를 확인합니다."],["원무과 수령","비용을 납부한 뒤 원무과 발급 창구에서 서류를 받습니다."]].map(([a,b])=>`<div class="step"><strong>${a}</strong><p>${b}</p></div>`).join("")}</div><h3>발급 시 확인 사항</h3><p>진료 없이 진단서만 신청하는 경우에는 접수비가 없습니다. 재발급은 원무과 제증명 발행 창구에서 신청할 수 있습니다. 보험사 제출용 서류는 정오부터 오후 2시까지 발급하지 않습니다. 서류별 수수료와 발급 가능 여부를 신청 전에 확인해 주세요.</p>`;
  if(path==="/amenities")return '<h2>편의시설</h2><p class="lead">병원을 방문할 때 이용할 수 있는 시설과 안내를 확인해 주세요.</p>'+responsiveGallery([["amenities-11.jpg","amenities-01.jpg"],["amenities-12.jpg","amenities-02.jpg"],["amenities-13.jpg","amenities-03.jpg"],["amenities-14.jpg","amenities-04.jpg"],["amenities-15.jpg","amenities-05.jpg"],["amenities-16.jpg","amenities-06.jpg"],["amenities-17.jpg","amenities-07.jpg"],["amenities-18.jpg","amenities-08.jpg"],["amenities-19.jpg","amenities-09.jpg"],["amenities-20.jpg","amenities-10.jpg"]],["방문객 대기 라운지","정원 옆 휴게 좌석","카페 좌석과 음료 공간","의료용품 진열 공간","환자 병실과 보호자 좌석","가족 대기 공간","정수대가 있는 휴식 공간","손 씻는 곳과 복도 벤치","재활 치료 공간","실내 정원이 있는 로비"],"amenities-photo-grid")+'<h3>시설 위치</h3><table class="table"><thead><tr><th>시설</th><th>위치</th><th>이용 안내</th></tr></thead><tbody><tr><td>식당</td><td>지하 1층</td><td>운영 여부와 이용 시간은 현장 안내를 확인합니다.</td></tr><tr><td>의료용품 판매점</td><td>1층 로비</td><td>필요한 물품은 판매점에서 확인합니다.</td></tr><tr><td>편의점</td><td>1층 로비</td><td>운영 시간은 현장 게시 안내를 확인합니다.</td></tr><tr><td>휠체어 대여</td><td>1층 정문</td><td>대여 가능 여부를 안내 창구에 문의합니다.</td></tr><tr><td>무인 민원 발급기</td><td>1층 정문</td><td>발급 가능한 문서 종류를 기기 화면에서 확인합니다.</td></tr><tr><td>현금 인출기</td><td>1층 정문</td><td>금융기관별 이용 기준을 따릅니다.</td></tr><tr><td>카페</td><td>1층 로비</td><td>음료와 휴식 공간 이용은 현장 안내에 따릅니다.</td></tr><tr><td>옥상 정원</td><td>5층</td><td>출입 가능 여부는 병원 운영 안내를 확인합니다.</td></tr><tr><td>퇴원 환자용 카트</td><td>각 병동</td><td>필요하면 병동 직원에게 문의합니다.</td></tr><tr><td>장애인 화장실</td><td>각 층</td><td>가까운 위치는 층별 안내에서 확인합니다.</td></tr></tbody></table><h3>이용 중 필요한 도움</h3><p>휠체어와 퇴원용 카트가 필요한 경우 가까운 안내 창구나 병동 직원에게 요청해 주세요. 무인 발급기 이용에 도움이 필요하면 발급 창구에 문의할 수 있습니다.</p><p>시설별 운영 시간과 이용 가능 여부는 병원 운영 상황에 따라 달라질 수 있으므로 방문 당일 현장 안내를 확인해 주세요.</p>';
  if(path==="/funeral_1") return `<h2>장례식장</h2><p class="lead">장례 시설 면적과 장례 절차, 준비 서류를 확인해 주세요.</p>${responsiveGallery([["funeral1-02.jpg","funeral1-01.jpg"],["funeral1-04.jpg","funeral1-03.jpg"],["funeral1-06.jpg","funeral1-05.jpg"],["funeral1-08.jpg","funeral1-07.jpg"]],["빈소와 가족 휴게 공간","장례 안내 공간","조용한 내부 복도","장례 시설 내부 공간"],"funeral-photo-grid")}<h3>빈소 면적</h3><table class="table"><thead><tr><th>구분</th><th>면적</th></tr></thead><tbody><tr><td>특실</td><td>100평 · 330㎡</td></tr><tr><td>별실</td><td>84평 · 277.2㎡</td></tr><tr><td>1호실</td><td>56평 · 184.8㎡</td></tr><tr><td>2호실</td><td>56평 · 184.8㎡</td></tr><tr><td>3호실</td><td>56평 · 184.8㎡</td></tr></tbody></table><h3>장례 절차</h3><div class="steps">${[["빈소 선정","사용할 수 있는 분향실과 시설 이용 조건을 확인합니다."],["운구","운구 차량은 24시간 운영합니다. 차량 도착 예정 시각과 이용 가능 지역을 장례 안내실에 확인합니다."],["안치","유가족이 동행해 안치 호실을 확인합니다."],["분향실 계약","장례 절차를 상담하고 분향실 임대차 계약서를 작성합니다."],["상주 준비","사망진단서 또는 사체검안서, 영정 사진, 제단 장식과 장의용품을 준비합니다. 발급 서류 부수는 사망 경위에 따라 장례 안내실에 확인합니다."],["입관","입관 시간은 오전 10시부터 오후 5시 사이에 정합니다. 사고사인 경우 검시필증 제출 여부를 확인합니다."],["장지 이동","종교 예절에 따른 의식을 진행하고 운구 차량과 장지 이동 시간을 확인합니다."]].map(([a,b])=>`<div class="step"><strong>${a}</strong><p>${b}</p></div>`).join("")}</div><h3>이용 시 유의 사항</h3><ul class="notice-list"><li>외부 음식물 반입은 제한합니다.</li><li>조화는 시설의 폐기 기준을 확인해 주세요.</li><li>귀중품과 조의금은 직접 보관해 주세요.</li><li>빈소 이용 조건과 추가 비용을 계약 전에 확인해 주세요.</li><li>빈소 계약 후 장례 일정과 장례 방법을 담당자와 확인합니다.</li><li>입관 전에 사망진단서 또는 사체검안서를 제출해야 합니다.</li><li>입관에 필요한 관, 수의와 부속 용품은 미리 선택합니다.</li><li>장지 이동 시 종교별 의례와 운구 일정을 확인합니다.</li></ul>`;
  if(path==="/worshipguide"){
    const services=[
      ["예배실 위치","예배실은 병원 지하 2층에 있습니다."],
      ["주일 예배","장년 예배는 일요일 오전 9시에 진행합니다."],
      ["새벽 예배","월요일부터 목요일까지 오전 7시 30분에 진행합니다."]
    ];
    const gatherings=[
      ["계절 부흥회","여름과 겨울에 각각 한 차례 열며 환자와 직원이 함께합니다."],
      ["기도 모임","병원 구성원과 환자를 위한 기도 모임을 운영합니다."],
      ["조찬 기도회","병원과 구성원을 위한 아침 기도 모임을 열고 있습니다."],
      ["수요 예배","매주 수요일 오후 6시에 지역 목회자를 초청해 예배합니다."]
    ];
    const pairs=[["worshipgui-02.jpg","worshipgui-01.jpg"],["worshipgui-04.jpg","worshipgui-03.jpg"],["worshipgui-06.jpg","worshipgui-05.jpg"],["worshipgui-08.jpg","worshipgui-07.jpg"],["worshipgui-10.jpg","worshipgui-09.jpg"],["worshipgui-12.jpg","worshipgui-11.jpg"],["worshipgui-14.jpg","worshipgui-13.jpg"]];
    const captions=["나무 벽과 간접 조명이 있는 조용한 공간","창가에 마련된 조용한 좌석","책과 의자가 있는 휴식 공간","실내 식물이 놓인 복도 벤치","햇빛이 드는 창가 휴식 자리","복도 옆 벤치와 조명","실내 정원 곁 휴식 공간"];
    return `<h2>병원 교회와 예배 안내</h2><p class="lead">병원 교회는 환자와 가족, 직원이 자유롭게 신앙 활동을 할 수 있는 공간이며 지역 종교 활동 장소로도 이용됩니다.</p><h3>예배 장소와 시간</h3><div class="info-grid">${services.map(([a,b])=>`<div class="info-box"><strong>${a}</strong><span>${b}</span></div>`).join("")}</div><h3>병원 내 휴게 공간</h3><p>병원 안에서 잠시 생각을 정리하거나 기도할 수 있도록 차분한 분위기의 공간을 살펴볼 수 있습니다. 예배실의 위치는 병원 지하 2층이며, 병원 교회 안내에 따라 이용해 주세요.</p>${responsiveGallery(pairs,captions,"worship-photo-grid")}<h3>병원 교회 소식</h3><div class="info-grid">${gatherings.map(([a,b])=>`<div class="info-box"><strong>${a}</strong><span>${b}</span></div>`).join("")}</div><p>병원 교회 소식에는 계절 부흥회, 기도 모임, 조찬 기도회와 지역 목회자를 초청하는 수요 예배가 소개되어 있습니다. 부흥회는 여름과 겨울에 환자와 직원이 함께하는 일정으로 진행합니다.</p><h3>의료선교회</h3><p>의료선교회는 지역 안에서 기독교 단체 간 연합 활동을 이어가고, 병원과 함께 지역 주민을 위한 의료 봉사에 참여합니다. 공개된 안내에는 선교회 소식지와 활동 화보집에 관한 내용도 포함되어 있습니다.</p><p>예배 참석과 종교 활동은 각자의 선택입니다. 예배 시간은 위 안내를 확인하고, 병원 이용 중 필요한 사항은 해당 부서에 문의해 주세요.</p>`
  }
  if(path==="/hsptl_liveinfo_1") return `<h2>입원 생활</h2><p class="lead">입원 중 준비할 물품과 병동 생활 정보를 확인해 주세요.</p><h3>입원 시 준비 물품</h3><ul class="notice-list"><li>세면도구</li><li>미끄럼 방지 슬리퍼</li><li>물통과 컵</li><li>보호자 침구</li></ul><h3>식사 시간</h3><p>식사 변경은 식사 시간 1시간 전까지 병동에 알려 주세요.</p><p>식사 제공 시간과 환자별 식이 내용은 담당 병동에서 확인해 주세요.</p><h3>회진</h3><p>회진 시간은 병동 상황에 따라 달라질 수 있습니다. 담당 의료진이나 간호사실에서 당일 일정을 확인해 주세요.</p><p>검사나 처치 일정에 따라 회진 시간이 조정될 수 있습니다. 상세 일정은 병동 담당자에게 문의해 주세요.</p><h3>병동 출입</h3><p>병동 출입문 개방 시간은 병동별 운영 기준을 따릅니다. 출입문이 잠겨 있으면 병동 호출 장치로 직원에게 알려 주세요.</p><h3>병실 전화 이용</h3><p>교환실 음성 안내에 따라 병실 연결 번호를 입력하면 환자에게 연결됩니다. 병실 번호와 연결 방법은 병동 안내 자료를 확인해 주세요.</p><p>병실 연결은 환자와 병동의 전화 사용 가능 상태에 따라 제한될 수 있습니다.</p><h3>병동 문의</h3><p>입원 중 필요한 사항과 병실 이용 문의는 해당 병동 간호사실에 말씀해 주세요.</p>`;
  if(path==="/visit_info") return `<h2>면회 시간과 유의 사항</h2><p class="lead">환자의 안정과 감염 예방을 위해 병동별 권장 시간에 면회해 주세요. 감염병 유행 시 시간과 운영 방법이 달라질 수 있습니다.</p><table class="table"><thead><tr><th>요일</th><th>일반 병동</th><th>중환자실</th></tr></thead><tbody><tr><td>평일</td><td>오후 6시–8시</td><td>오후 12시–12시 20분</td></tr><tr><td>토요일·공휴일</td><td>오전 10시–정오, 오후 6시–8시</td><td>오후 12시–12시 20분</td></tr></tbody></table><h3>면회 시 확인 사항</h3><ul class="notice-list"><li>감염 취약자는 면회를 자제해 주세요.</li><li>면회 인원 제한과 손 위생 지침을 따라 주세요.</li><li>병동에서 지정한 면회 장소를 이용해 주세요.</li><li>외부 물품과 음식물은 병동에 확인한 뒤 반입해 주세요.</li><li>면회객 명부를 작성해 주세요.</li></ul><h3>방문 전 준비</h3><p>환자가 입원한 병동과 병실을 먼저 확인한 뒤 권장 시간에 방문해 주세요. 면회 시간 외 방문은 병동 의료진과 상의해야 합니다.</p><p>중환자실 방문은 지정된 시간과 병동 절차를 따릅니다. 환자 상태나 감염 관리 상황에 따라 입장이 제한될 수 있습니다.</p><p>면회 중에는 병동 직원의 손 위생과 보호 장비 안내를 따라 주세요. 기침이나 발열 등 감염 증상이 있으면 방문을 미뤄 주세요.</p><p>환자에게 필요한 물품을 가져올 때는 병동에 반입 가능 여부를 먼저 확인합니다. 음식물은 환자 식이와 치료 계획을 고려해 의료진 확인 후 전달해 주세요.</p>`;
  if(path==="/intro_equipment"){const photoFiles=["introequip-04.jpg","introequip-05.jpg","introequip-14.jpg","graphic-01.svg","introequip-12.jpg","introequip-06.jpg","introequip-15.jpg","introequip-13.jpg","introequip-07.jpg","introequip-05.jpg","graphic-02.svg","introequip-16.jpg","introequip-07.jpg","introequip-14.jpg","introequip-15.jpg","introequip-06.jpg","graphic-03.svg","introequip-11.jpg","introequip-08.jpg","introequip-16.jpg","introequip-14.jpg"];const items=[["자기공명영상 장비 3.0T","강한 자기장과 고해상도 영상으로 여러 신체 부위를 촬영합니다."],["초음파 진단 장비","영상 기술과 자동화 기능으로 여러 진료 분야의 검사를 지원합니다."],["초음파 장비","고해상도 영상으로 신체 내부를 확인하는 검사에 사용합니다."],["고압 산소 치료기","대기압보다 높은 압력으로 산소를 공급하는 치료 장비입니다."],["혈관조영 장비","혈관 상태를 영상으로 확인하고 필요한 시술을 돕습니다."],["혈관 내 초음파","혈관 내부를 촬영해 관상동맥 상태를 확인합니다."],["24시간 심전도 검사기","일상 활동 중 심장 박동을 기록해 부정맥 평가에 사용합니다."],["자기공명영상 장비 1.5T","자기적 성질을 이용해 인체 내부 영상을 얻습니다."],["컴퓨터단층촬영 장비","X선을 이용해 신체 단면 영상을 촬영합니다."],["혈관 초음파 장비","컬러 도플러 영상으로 혈류를 살펴보는 데 사용합니다."],["체외충격파 장비","충격 에너지를 모아 요로 결석을 잘게 부수는 데 사용합니다."],["파노라마 촬영 장비","치아와 턱을 넓은 범위로 촬영합니다."],["골밀도 측정 장비","방사선 측정값으로 뼈의 무기질 밀도를 확인합니다."],["뇌혈류 초음파","초음파 도플러 방식으로 뇌혈관의 혈류를 측정합니다."],["뇌파 검사기","뇌의 전기 신호를 기록하는 비침습 검사 장비입니다."],["근전도 검사기","신경과 근육의 전기 반응을 측정합니다."],["체성분 분석기","체지방과 근육량 등 신체 구성 지표를 측정합니다."],["폐기능 검사기","호흡량과 폐의 환기 기능을 측정합니다."],["협대역 내시경","특정 파장의 빛으로 점막 표면과 혈관을 관찰합니다."],["C-arm 영상 장비","시술과 수술 중 목표 부위를 영상으로 확인합니다."],["진공 보조 유방 조직 채취 장비","유방 조직 검체를 채취하는 데 사용하는 장비입니다."]];return '<h2>\uC9C4\uB2E8 \uC7A5\uBE44</h2><p class="lead">\uAC80\uC0AC \uBAA9\uC801\uBCC4 \uC9C4\uB2E8 \uC7A5\uBE44\uC640 \uAC80\uC0AC\uD56D\uBAA9\uC744 \uD655\uC778\uD558\uC138\uC694.</p><div class="equipment-cards">'+items.map(([a,b],i)=>'<article class="equipment-card"><img src="'+BASE+'/assets/img/'+photoFiles[i]+'" alt="'+a+' \uC7A5\uBE44 \uC774\uBBF8\uC9C0" loading="lazy"><div><h3>'+a+'</h3><p>'+b+'</p></div></article>').join('')+'</div>'; }
  if(path==="/intro_hsptl") return `<p class="lead">지역 주민의 건강을 살피며 외래·입원·응급 진료와 건강검진을 제공하는 종합병원입니다.</p><div class="info-grid"><div class="info-box"><strong>진료과와 전문센터</strong><span>여러 진료과와 전문센터가 협력해 질환별 진료와 검사를 제공합니다.</span></div><div class="info-box"><strong>진료와 돌봄</strong><span>외래 진료부터 입원 치료와 응급 상황까지 필요한 절차를 안내합니다.</span></div><div class="info-box"><strong>지역 의료</strong><span>주민 건강을 위한 의료 봉사와 지역 의료기관 간 협력을 진행합니다.</span></div></div>${gallery(["introhsptl-01.jpg","introhsptl-02.jpg","introhsptl-03.jpg","introhsptl-04.jpg","introhsptl-35.jpg","introhsptl-36.jpg","introhsptl-37.jpg","introhsptl-38.jpg","introhsptl-39.jpg","introhsptl-40.jpg"],["병원 외관과 조경","밝은 입구 로비와 안내 데스크","환자 승하차 구역과 보행로","진료동을 연결하는 실내 통로","나무와 벤치가 있는 병원 광장","병원 외관과 석재 마감","목재 천장이 있는 접수 로비","보행로 옆 환자 승하차 공간","두 진료동 사이의 실내 연결 통로","그늘과 벤치가 놓인 병원 광장"]).replace('class="photo-grid"','class="photo-grid hospital-photo-grid"')}<section class="hospital-story"><h2>지역 주민을 위한 진료</h2><p>의료기관이 부족했던 지역에서 의원으로 진료를 시작하고, 세대를 거쳐 병원을 세워 지역 주민에게 의료서비스를 제공해 왔습니다.</p><p>질환을 치료하고 주민의 건강을 돌보며 지역사회 발전에 참여하는 일을 병원의 역할로 삼고 있습니다.</p></section><section class="hospital-story"><h2>의료서비스와 진료 협력</h2><p>현대적인 진료 환경과 의료 장비를 갖추고 여러 진료 분야를 운영합니다. 환자 상태와 질환에 따라 필요한 진료과가 협력하고, 검사와 치료 과정을 안내합니다.</p><p>지역 의료기관과 진료 의뢰 및 협력 체계를 갖춰 환자에게 필요한 진료를 지원합니다. 의료정보를 체계적으로 관리해 진료에 활용합니다.</p><div class="mission-value-grid"><article class="mission-value-card"><h3>환자 중심</h3><p>환자와 보호자가 진료 과정과 이용 절차를 알 수 있도록 필요한 내용을 설명합니다.</p></article><article class="mission-value-card"><h3>지역 의료 봉사</h3><p>의료 취약 지역을 찾아가는 진료와 생활이 어려운 주민을 위한 의료 지원에 참여합니다.</p></article><article class="mission-value-card"><h3>진료 정보 관리</h3><p>진료 정보를 효율적으로 관리해 각 진료 분야에서 필요한 내용을 확인할 수 있도록 합니다.</p></article><article class="mission-value-card"><h3>병원교회 활동</h3><p>병원교회에서 직원과 내원 환자의 종교 활동을 지원합니다.</p></article><article class="mission-value-card"><h3>지역 종교인 협력</h3><p>지역 목회자와 교류하며 의료 봉사와 병원 공동체 활동을 진행합니다.</p></article><article class="mission-value-card"><h3>진료 분야별 서비스</h3><p>질환별 진료를 운영하고 의료 지원이 필요한 주민을 위한 서비스를 제공합니다.</p></article></div></section><section class="hospital-story"><h2>병원교회와 지역 공동체</h2><p>병원교회를 통해 직원과 내원 환자의 종교 활동을 지원하고, 지역 목회자와 교류하며 의료 봉사를 진행합니다. 예배 장소와 운영 시간은 예배 안내에서 확인할 수 있습니다.</p><p>병원 이용에 필요한 안내를 환자와 보호자가 확인할 수 있도록 진료과와 안내 창구에서 문의를 받습니다.</p></section><section class="hospital-story"><h2>진료 이용 안내</h2><p>외래 접수와 진료 일정은 진료과 안내에서 확인해 주세요. 입원 준비와 병동 생활, 응급실 이용, 건강검진과 증명서 발급은 각 이용 안내에 정리되어 있습니다.</p><p>병원 위치와 주차, 편의시설 및 층별 위치도 방문 전에 확인할 수 있습니다. 검사 준비나 진료 과정에 궁금한 점이 있으면 해당 진료과 또는 안내 창구에 문의해 주세요.</p><p>진료를 마친 뒤에는 처방된 약 복용법과 다음 진료 일정을 확인해 주세요.</p>${link("/intro_mission","미션과 가치 보기　→")}`; if(path==="/intro_greeting") return `<p class="lead">서해중앙병원을 찾아주신 환자와 보호자께 인사드립니다.</p><p>병원은 환자의 생명과 건강을 돌보는 의료기관입니다. 의료진은 환자의 상태를 확인하고 필요한 진료를 제공하겠습니다.</p><p>응급 환자의 진료와 수술에 필요한 인력\xb7장비\xb7시설을 확인하고, 지역 주민이 필요한 의료서비스를 이용하도록 진료과와 병동을 운영하겠습니다.</p><p>환자와 보호자에게 진료 과정과 확인할 내용을 설명하고, 종교 활동과 의료 봉사도 병원 여건에 맞춰 진행하겠습니다.</p><p>지역 병원으로서 주민과 함께하며 필요한 진료를 제공하겠습니다. 환자와 보호자의 건강을 돌보기 위해 의료 인력과 진료 시설을 갖추겠습니다.</p><p>뇌출혈과 뇌경색 등 응급 질환의 진료와 수술에 필요한 준비를 하겠습니다. 필요한 검사와 치료는 담당 의료진이 설명합니다.</p><p>병원 이용 중 불편한 점이나 진료 관련 문의는 해당 진료과 또는 안내 창구에 알려주시기 바랍니다.</p><p class="signature">서해중앙병원장</p>`;
  if(path==="/careers_1") return `<h2>채용 정보</h2><p class="lead">직무별 자격과 제출 자료는 채용 공고에서 확인해 주세요.</p><h3>인재상</h3><div class="info-grid">${[["책임감","맡은 업무의 기준과 일정을 확인하고 책임 있게 수행합니다."],["성실성","규정을 지키고 동료와 필요한 정보를 정확히 공유합니다."],["협업","진료 부서와 지원 부서가 업무 정보를 나눕니다."],["목표 의식","직무 목표와 교육 계획을 세워 업무 역량을 높입니다."]].map(([a,b])=>`<div class="info-box"><strong>${a}</strong><span>${b}</span></div>`).join("")}</div><h3>인사·복지 제도</h3><p>근무 조건과 복지 제도는 해당 채용 공고에 표시된 내용을 확인해 주세요. 직무와 부서에 따라 자격, 제출 자료와 전형 절차가 다를 수 있습니다.</p><h3>채용 공고 확인</h3><ul class="notice-list"><li>모집 직무와 담당 업무를 확인합니다.</li><li>지원 자격과 필수 면허·경력 조건을 살펴봅니다.</li><li>제출 서류와 접수 마감 시각을 확인합니다.</li><li>전형 단계와 결과 안내 방법을 공고에서 확인합니다.</li></ul><h3>온라인 입사 지원</h3><p>온라인 지원이 열려 있는 공고는 안내된 지원 페이지에서 자료를 제출합니다. 접수 후에는 지원 내역과 연락 가능한 정보를 확인해 주세요.</p><p>채용 일정과 공고별 문의는 게시된 채용 안내를 기준으로 확인합니다.</p>`;
 if(path==="/health_info") return `<h2>건강을 위한 생활 정보</h2><div class="info-grid">${[["손 씻기","외출 후와 식사 전에는 비누로 충분히 손을 씻어 주세요."],["수분 섭취","하루 동안 물을 나누어 마시고 몸 상태를 살펴보세요."],["정기 검진","연령과 건강 상태에 맞는 검진 일정을 확인하세요."]].map(([a,b])=>`<div class="info-box"><strong>${a}</strong><span>${b}</span></div>`).join("")}</div>`;
 return `<h2>${title}</h2><p class="lead">${pages[path]?.[1]||"병원 이용에 필요한 정보를 안내합니다."}</p><div class="notice">세부 정보와 이용 일정은 대표전화 041-000-0200으로 문의해 주세요.</div><div class="info-grid"><div class="info-box"><strong>이용 정보</strong><span>방문 목적에 맞는 절차를 확인하세요.</span></div><div class="info-box"><strong>준비 사항</strong><span>필요한 서류와 예약 정보를 미리 살펴보세요.</span></div><div class="info-box"><strong>문의 방법</strong><span>궁금한 점은 안내 데스크에서 확인할 수 있습니다.</span></div></div>`;
}
const reviewFacts = {
 "/certification": [
  ["신청 자료 확인", "신청인 본인의 신분 확인 자료와 환자와의 관계를 확인할 서류를 함께 준비합니다."],
  ["환자 동의", "환자가 의사표시를 할 수 있는 경우 신청서와 동의서에 본인이 서명합니다."],
  ["미성년 환자", "나이와 신청인 관계에 따라 가족관계 확인 자료 또는 법정대리인 자료가 필요합니다."],
  ["대리 신청", "환자 본인이 아닌 사람이 신청하면 위임장과 환자 동의 자료를 확인합니다."],
  ["발급 범위", "필요한 진료 날짜와 문서 종류를 신청서에 적어 발급 범위를 지정합니다."],
  ["비용과 수령", "문서 종류와 발급 부수에 따른 수수료를 확인한 뒤 지정 창구에서 수령합니다."]
 ],
 "/consultation": [
  ["문의 내용", "증상 상담을 요청할 때는 불편이 시작된 시기와 현재 상태를 구체적으로 적어 주세요."],
  ["진료 선택", "온라인 문의는 진단이나 처방을 대신하지 않습니다. 급한 증상이 있으면 응급 진료를 이용해 주세요."],
  ["예약 변경", "진료 예약 시간과 진료과를 확인한 뒤 해당 부서에 변경 가능 여부를 문의합니다."],
  ["개인정보", "문의 내용에는 주민등록번호와 다른 사람의 진료 정보를 입력하지 마세요."],
  ["접수 안내", "온라인 접수는 준비 중입니다. 문의는 010-4894-4905로 전화 주세요."]
 ],
 "/emergencycare": [
  ["응급실 운영", "응급실은 연중무휴로 운영하며 응급 환자의 초기 평가와 처치를 진행합니다."],
  ["진료 순서", "도착 후 환자 상태를 먼저 평가하고 중증도와 응급 상황에 따라 진료 순서를 정합니다."],
  ["협진", "응급의학과 평가 뒤 필요한 경우 관련 임상 진료과에 협진을 요청합니다."],
  ["비응급 증상", "응급 증상에 해당하지 않는 경우 응급의료 관리료가 발생할 수 있습니다."],
  ["내원 준비", "복용 중인 약과 알레르기, 기존 진료 자료가 있으면 의료진에게 알려 주세요."],
  ["보호자 안내", "환자 안전과 처치 공간 확보를 위해 보호자 출입은 현장 직원의 안내를 따릅니다."]
 ],
 "/faq": [
  ["건강검진 예약", "검진 날짜와 검사 종류를 정하기 전에 예약 가능 일정과 금식 여부를 확인합니다."],
  ["재활 치료", "재활 치료는 진료 후 처방된 운동·전기·온열·작업 치료 항목에 따라 진행합니다."],
  ["내시경 검사", "검사 전 준비 방법과 회복 시간은 위내시경·대장내시경 종류에 따라 달라집니다."],
  ["영상 검사", "촬영 당일 결과 확인 여부는 검사 종류와 판독 일정에 따라 달라질 수 있습니다."],
  ["주차 확인", "주차 지원을 받으려면 진료 영수증 또는 입원 확인 자료를 정산 때 제시합니다."],
  ["입원 물품", "세면도구, 미끄럼 방지 슬리퍼, 물통과 컵을 준비하고 보호자 침구는 병동에 확인합니다."]
 ],
 "/funeral_1": [
  ["운구와 안치", "운구 차량 도착 시간을 장례 안내실에 알리고 유가족이 안치 장소를 확인합니다."],
  ["계약", "사용할 빈소와 시설 이용 범위를 확인한 뒤 임대차 계약서를 작성합니다."],
  ["준비 서류", "사망진단서 또는 사체검안서를 준비하고 사고사라면 검시 관련 서류를 확인합니다."],
  ["입관 일정", "입관 예정 시각과 준비 용품은 장례 담당자와 사전에 조율합니다."],
  ["발인", "장지와 운구 차량을 정하고 종교 의례가 있으면 진행 순서를 담당자에게 알립니다."],
  ["비용 확인", "빈소 사용료와 장례 용품 비용을 계약 전 항목별로 확인합니다."]
 ],
 "/health_info": [
  ["호흡기 감염 예방", "기침할 때 옷소매로 입과 코를 가리고 손 위생을 실천합니다."],
  ["검진 전 확인", "검사 종류에 따라 금식이나 복용 약 조정이 필요할 수 있어 예약 부서에 확인합니다."],
  ["영상 검사", "CT와 MRI는 검사 목적과 촬영 부위에 따라 준비 사항이 다릅니다."],
  ["유방 검사", "검사 대상과 방법은 연령, 증상과 이전 검사 결과를 확인한 뒤 의료진과 상의합니다."],
  ["검사 결과", "검사 결과는 담당 의료진의 설명과 함께 확인하고 개인별 치료 판단에 활용합니다."],
  ["응급 증상", "갑작스러운 흉통, 호흡 곤란, 의식 저하가 있으면 지체하지 말고 응급 도움을 요청합니다."]
 ],
 "/hospitalnews": [
  ["환자 안전 활동", "입원 환자와 직원이 참여하는 안전 수칙 교육과 감염 예방 활동을 진행한 기록이 있습니다."],
  ["병동 운영 소식", "간호·간병 통합서비스 운영 병동을 확대해 병동별 이용 조건을 안내했습니다."],
  ["예방접종 정보", "국가 예방접종은 대상 연령과 접종 기간을 보건 당국의 최신 공지에서 확인합니다."],
  ["응급의료센터", "응급의료기관 지정과 평가 관련 공지는 확인 가능한 발표 자료에 한해 게시합니다."],
  ["수술 장비", "수술 기구와 영상 장비 관련 소식은 도입 여부와 사용 진료과를 확인해 안내합니다."],
  ["진료 일정", "휴진과 진료 일정은 각 진료과의 최신 공지를 확인해 주세요."]
 ],
 "/hsptl_liveinfo_1": [
  ["입원 준비", "개인 세면도구, 미끄럼 방지 슬리퍼, 물통과 컵을 챙겨 주세요."],
  ["식사 변경", "식사 종류를 바꾸려면 배식 시간보다 한 시간 전에 병동에 알려 주세요."],
  ["회진 시간", "회진은 진료와 처치 일정에 따라 조정될 수 있어 병동에서 당일 시간을 확인합니다."],
  ["병동 출입", "출입문 운영 시간은 병동별 기준을 따르며 잠긴 문은 호출 장치로 직원에게 알려 주세요."],
  ["병실 통화", "병실 연결 방법과 전화 사용 가능 여부는 교환실 안내 또는 병동 자료를 확인합니다."],
  ["퇴원 준비", "퇴원 일정과 복약·외래 예약 안내를 확인하고 개인 물품을 챙겨 주세요."]
 ],
 "/intro_greeting": [
  ["진료 범위", "병원은 외래, 입원, 응급 진료와 건강검진 관련 정보를 제공합니다."],
  ["환자 안내", "접수와 검사 절차는 진료과 또는 예약한 검사실에서 확인할 수 있습니다."],
  ["종교 활동", "병원 내 예배와 기도 모임은 예배 안내에 적힌 시간과 장소를 확인해 이용합니다."],
  ["문의", "진료 일정과 병원 이용에 관한 문의는 대표 안내 번호로 연락해 주세요."]
 ],
 "/intro_hsptl": [
  ["외래 진료", "진료과별 접수 시간과 의료진 일정은 방문 전에 확인해 주세요."],
  ["입원 진료", "입원 환자는 병동에서 검사 일정, 식사와 병실 이용 기준을 안내받습니다."],
  ["응급 진료", "응급실은 연중 운영하며 상태에 따라 필요한 임상 진료과와 협진합니다."],
  ["건강검진", "검진 종류별 예약, 금식과 준비 자료는 건강검진 접수 부서에서 확인합니다."],
  ["진료 지원", "진료기록 사본과 증명서는 본인 확인 및 신청 자격 서류를 갖춰 신청합니다."],
  ["병원 이용", "주차, 면회, 편의시설과 층별 위치는 각 이용 안내에서 확인할 수 있습니다."]
 ],
 "/ko/privacy": [
  ["처리 원칙", "개인정보는 진료 제공과 법령에 따른 의무 이행에 필요한 범위에서 처리합니다."],
  ["환자 확인", "환자 식별 정보와 연락 정보는 접수, 예약 변경, 진료 기록 연결에 사용합니다."],
  ["진료 정보", "증상, 진단, 검사와 처방 내용은 환자 진료와 의료 기록 관리에 이용합니다."],
  ["증명서 신청", "발급 신청인의 신원과 환자와의 관계를 확인하는 자료를 처리할 수 있습니다."],
  ["문의 접수", "문의에 적은 연락 정보는 답변과 처리 결과 안내를 위해 사용합니다."],
  ["결제 처리", "결제 과정에서는 승인과 취소에 필요한 거래 정보가 처리될 수 있습니다."],
  ["법정 보존", "진료기록 등은 의료 관계 법령이 정한 보존 기간에 따라 관리합니다."],
  ["목적 종료", "보유 목적이 끝난 정보는 다른 법적 보존 의무가 없으면 파기합니다."],
  ["제공 제한", "환자 동의나 법률상 근거가 없는 개인정보 제공은 제한합니다."],
  ["위탁 관리", "업무를 위탁할 때는 계약과 점검 절차로 수탁자의 안전 조치를 관리합니다."],
  ["접근 통제", "개인정보 처리 시스템은 업무상 필요한 권한을 가진 담당자가 이용합니다."],
  ["접속 기록", "시스템 이용 기록을 보관하고 비정상 접근 여부를 점검합니다."],
  ["전송 보호", "개인정보 전송과 보관에는 접근 통제와 보호 조치를 적용합니다."],
  ["파기 절차", "보존 기간이 지난 전자 파일은 복구할 수 없도록 삭제하고 종이 자료는 파쇄합니다."],
  ["열람 요청", "정보주체는 본인 정보의 열람과 정정을 요청할 수 있습니다."],
  ["삭제 요청", "법령상 보존 의무가 없는 정보는 삭제 또는 처리 정지를 요청할 수 있습니다."],
  ["대리인 신청", "대리인이 권리를 행사할 때는 위임 관계와 신청 자격을 확인합니다."],
  ["처리 제한", "다른 사람의 권리를 침해하거나 법률상 제한 사유가 있으면 요청 처리가 제한될 수 있습니다."],
  ["쿠키", "브라우저 저장 정보는 서비스 설정과 방문 통계에 사용될 수 있습니다."],
  ["쿠키 관리", "이용자는 브라우저 설정에서 쿠키 저장을 차단하거나 기존 기록을 삭제할 수 있습니다."],
  ["문의 접수처", "개인정보 관련 열람, 정정과 처리 문의는 병원 개인정보 담당 부서에 요청합니다."],
  ["침해 신고", "개인정보 침해 신고와 상담은 관계 기관의 공식 창구를 이용할 수 있습니다."],
  ["방침 변경", "처리방침이 변경되면 개정 내용과 시행 시점을 공개합니다."],
  ["권리 행사", "진료기록 사본 발급에는 별도의 본인 확인과 신청 서류가 적용됩니다."]
 ],
 "/ko/rights": [
  ["진료 선택", "환자는 질병 상태와 치료 방법에 관해 설명을 듣고 동의 여부를 결정할 수 있습니다."],
  ["기록 보호", "진료 정보는 동의 또는 법률상 허용되는 경우 외에는 공개하지 않습니다."],
  ["의료진 협조", "정확한 진료를 위해 건강 상태와 복용 약 정보를 의료진에게 알립니다."],
  ["진료 계획", "검사와 치료 과정에서 담당 의료진의 설명을 듣고 협의합니다."],
  ["안전 수칙", "환자와 보호자는 병원 내 감염 예방 및 안전 안내를 따라야 합니다."],
  ["비용 납부", "진료와 검사에 따른 비용을 확인하고 정해진 절차에 따라 납부합니다."]
 ],
 "/ko/term": [
  ["회원 정보", "회원은 가입 정보가 바뀌면 계정 정보를 최신 상태로 관리해야 합니다."],
  ["계정 이용", "계정과 인증 정보를 다른 사람에게 빌려주거나 공유하지 않습니다."],
  ["금지 행위", "타인의 권리를 침해하거나 시스템 운영을 방해하는 방식으로 서비스를 이용할 수 없습니다."],
  ["게시 자료", "이용자가 제출한 자료는 법령과 운영 기준에 따라 처리하며 권리 침해 자료는 제한할 수 있습니다."],
  ["의료 안내", "온라인 정보는 개인별 진단, 처방 또는 응급 처치를 대체하지 않습니다."],
  ["서비스 변경", "운영상 필요한 경우 서비스 기능을 변경할 수 있으며 주요 변경은 사전에 안내합니다."],
  ["일시 중단", "점검, 장애와 재난으로 서비스가 중단되면 가능한 범위에서 관련 내용을 알립니다."],
  ["손해와 책임", "책임 범위는 관련 법률과 병원의 고의 또는 과실 여부에 따라 정합니다."],
  ["분쟁 처리", "서비스 관련 분쟁은 관계 법령과 정해진 조정 또는 재판 절차에 따릅니다."],
  ["약관 개정", "개정 약관은 시행일과 변경 이유를 함께 게시합니다."],
  ["이용 종료", "회원은 안내된 절차에 따라 서비스 이용을 중단하거나 탈퇴를 신청할 수 있습니다."],
  ["개인정보", "계정 정보의 처리와 보유는 별도의 개인정보 처리방침을 따릅니다."]
 ],
 "/ko/unpaidmedexpense": [
  ["비급여 항목 확인", "검사, 처치와 치료 재료는 항목명과 단위를 확인한 뒤 비용을 살펴봅니다."],
  ["비용 변동", "환자 상태와 진료 범위에 따라 실제 부담 금액이 달라질 수 있습니다."],
  ["급여 기준", "급여 인정 기준에 해당하지 않는 경우 비급여로 처리될 수 있습니다."],
  ["영상 검사", "영상 검사 비용은 촬영 부위, 조영제 사용과 검사 조합에 따라 구분됩니다."],
  ["치료 재료", "치료 재료는 제품 종류와 사용 단위를 기준으로 비용을 확인합니다."],
  ["진료 전 문의", "예상 비용과 적용 기준은 처방 또는 시술 전에 담당 부서에 문의해 주세요."]
 ],
 "/location_1": [
  ["대중교통", "방문 전 운행 기관의 최신 노선과 시간표를 확인해 주세요."],
  ["자가용", "내비게이션에는 서해중앙병원 또는 새솔시 바다로 128을 입력해 주세요."],
  ["도착 후", "정문 안내 표지에서 외래 접수, 응급실과 주차장 위치를 확인할 수 있습니다."],
  ["주차", "주차 요금과 할인 기준은 주차 안내에서 확인하고 출차 전 정산합니다."],
  ["응급 방문", "응급 증상이 있으면 일반 외래 접수 대신 응급실 안내를 이용합니다."],
  ["교통 정보", "버스 노선이나 도로 상황은 해당 운송 기관과 지도 서비스의 최신 정보를 확인합니다."]
 ],
 "/login/signup": [
  ["계정 이름", "아이디는 영문, 숫자와 허용된 기호로 입력하고 길이 제한을 확인합니다."],
  ["비밀번호", "비밀번호는 영문과 숫자를 포함해 안내된 글자 수에 맞춰 입력합니다."],
  ["생년월일", "연도는 네 자리로 적고 월과 일이 한 자리면 앞에 0을 입력합니다."],
  ["약관 확인", "가입을 진행하기 전에 이용약관과 개인정보 처리방침을 확인합니다."],
  ["수신 선택", "문자 안내 수신 여부는 선택 항목에서 별도로 지정합니다."],
  ["본인 정보", "다른 사람의 이름이나 연락처를 사용해 계정을 만들지 않습니다."]
 ],
 "/med_dept_departments": [
  ["진료과 찾기", "내과, 외과, 정형외과와 신경계 진료 등 분야별 진료과를 확인합니다."],
  ["예약 전 확인", "진료과별 접수 시간과 의료진 일정을 확인한 뒤 방문해 주세요."],
  ["검사 의뢰", "검사와 치료는 담당 의료진의 진료 및 처방에 따라 진행합니다."],
  ["센터 진료", "전문센터 이용은 해당 센터의 진료 분야와 예약 안내를 확인합니다."],
  ["진료 변경", "진료 일정 변경이 필요하면 예약한 진료과에 연락해 주세요."]
 ],
 "/med_dept_medic": [
  ["진료 분야", "의료진별 진료과와 담당 분야를 확인한 뒤 예약을 신청합니다."],
  ["외래 일정", "진료 일정은 요일과 병원 운영 상황에 따라 바뀔 수 있습니다."],
  ["진료 기록", "이전 검사 결과와 복용 중인 약 목록이 있으면 진료 시 의료진에게 전달합니다."],
  ["예약 문의", "예약 가능 시간과 초진 접수 방법은 해당 진료과에서 확인합니다."],
  ["대면 확인", "진료 내용과 치료 선택은 의료진의 직접 평가와 상담을 거쳐 결정합니다."]
 ],
 "/outpatientcare": [
  ["접수 시간", "외래 접수는 진료과 운영 시간과 당일 접수 상황에 따라 조정될 수 있습니다."],
  ["초진 환자", "처음 방문하는 환자는 본인 확인 자료와 보험 자격 정보를 준비합니다."],
  ["의료급여", "의료급여 이용자는 필요한 진료 의뢰서 또는 관련 자료를 접수 전에 확인합니다."],
  ["예약 진료", "예약 시간보다 일찍 도착해 접수와 검사 준비를 마쳐 주세요."],
  ["응급 상황", "응급 환자는 외래 접수 시간과 관계없이 응급실에서 평가합니다."],
  ["진료 후", "검사 예약과 다음 진료 일정은 진료과 안내에 따라 확인합니다."]
 ],
 "/parkinginfo": [
  ["정산", "출차 전에 무인 정산기 또는 정산 부스에서 주차 요금을 납부합니다."],
  ["할인 확인", "진료 영수증이나 입원 확인 자료를 제시해 지원 대상 여부를 확인합니다."],
  ["할인권 분실", "할인 자료를 제시하지 못해 정산한 금액은 환불이 제한될 수 있습니다."],
  ["정산기 위치", "정산기는 주 출입구 인근과 지하 주차 구역에 마련되어 있습니다."],
  ["정기권", "정기 주차권은 별도 등록과 이용 기간 확인이 필요합니다."],
  ["차량 관리", "차량 안 귀중품은 직접 보관하고 주차장 내 안전 표지를 따라 주세요."],
  ["문의", "차량 등록, 정기권과 할인 적용은 주차 관리 창구에 확인합니다."]
 ],
 "/phoneinfo": [
  ["대표 안내", "진료과 연결이 필요하면 대표 안내 번호에 부서명을 알려 주세요."],
  ["외래 접수", "외래 예약과 진료 시간 문의는 방문할 진료과로 연결을 요청합니다."],
  ["검사 부서", "검사 준비와 결과 확인은 검사를 예약한 부서에 문의합니다."],
  ["입원 병동", "입원 환자 병실 연결은 교환실 안내에 따라 병동 번호를 확인합니다."],
  ["서류 발급", "진료기록과 증명서 문의는 원무 발급 창구에 연락합니다."],
  ["응급 상황", "생명이 위급한 상황에서는 병원 대표번호보다 119에 먼저 연락합니다."]
 ],
 "/thisweekmeal": [
  ["환자 식이", "치료식과 식이 제한은 담당 의료진의 처방을 확인해 제공됩니다."],
  ["식사 변경", "식사 종류 변경은 배식 예정 시각보다 한 시간 전에 병동에 알려 주세요."],
  ["알레르기", "식품 알레르기와 섭취 제한이 있으면 입원 시 담당자에게 알려 주세요."],
  ["배식 시간", "병동별 식사 제공 시각은 입원 안내 자료에서 확인할 수 있습니다."],
  ["외부 음식", "외부 음식 반입 전에는 환자 식이와 병동 감염 관리 기준을 확인합니다."]
 ],
 "/touchingstory": [
  ["의견 접수", "병원 이용에 관한 건의와 불편 사항을 접수할 수 있습니다."],
  ["개인정보", "의견에는 주민등록번호, 진료 기록과 다른 환자의 정보를 적지 마세요."],
  ["처리 과정", "접수된 의견은 담당 부서가 확인한 뒤 필요한 경우 연락드립니다."],
  ["긴급 문의", "진료 변경이나 건강 상태 문의는 의견 게시판 대신 해당 진료과로 연락합니다."],
  ["온라인 접수", "온라인 접수는 준비 중입니다. 문의는 010-4894-4905로 전화 주세요."]
 ],
 "/unpaidmedexpense": [
  ["고지 항목", "비급여 비용은 항목명과 단위별로 나누어 확인할 수 있습니다."],
  ["적용 기준", "진료 내용과 보험 적용 기준에 따라 비급여 대상 여부가 달라질 수 있습니다."],
  ["검사 조합", "영상 검사 비용은 촬영 부위와 검사 조합별로 확인합니다."],
  ["재료 비용", "치료 재료는 사용한 품목과 수량을 기준으로 산정합니다."],
  ["금액 문의", "예상 본인 부담액은 진료 내용이 정해진 뒤 수납 부서에 문의해 주세요."]
 ],
 "/visit_info": [
  ["면회 시간", "일반 병동은 평일 저녁, 주말과 공휴일은 오전과 저녁 권장 시간을 확인합니다."],
  ["중환자실", "중환자실 방문은 짧은 지정 시간과 출입 절차를 따릅니다."],
  ["감염 예방", "발열이나 기침 증상이 있으면 면회를 미루고 손 위생을 지켜 주세요."],
  ["방문 인원", "병동별 면회 인원과 방문 장소는 환자 상태에 따라 제한될 수 있습니다."],
  ["물품 전달", "음식이나 물품은 환자 식이와 치료 계획을 확인한 뒤 전달합니다."],
  ["시간 변경", "감염병 유행과 병동 운영에 따라 면회 시간은 달라질 수 있습니다."]
 ],
 "/worshipguide": [
  ["예배 공간", "예배실은 병원 안에 있으며 환자와 가족, 직원이 이용할 수 있습니다."],
  ["예배 시간", "주일 예배와 평일 새벽 기도 시간은 예배실 현장 안내에서 확인합니다."],
  ["기도 모임", "병원 구성원을 위한 기도 모임은 운영 일정에 따라 진행합니다."],
  ["이용 안내", "예배 참석이 어려운 환자는 병동 직원에게 이동 가능 여부를 문의합니다."],
  ["병동 배려", "예배실 이용 전 환자 상태와 검사·치료 일정을 확인해 주세요."]
 ]
};
const reviewMatrices = {
 "/ko/privacy": [
  ["진료 예약", "환자 이름과 생년월일", "예약 환자 확인과 진료 일정 등록", "예약 처리와 관련 법령상 보존 기준"],
  ["외래 접수", "연락처와 진료과 선택", "접수 안내와 진료 순서 관리", "진료 관련 기록의 법정 보존 기준"],
  ["응급 접수", "환자 식별 정보와 응급 연락처", "응급 진료와 보호자 연락", "응급 진료 기록의 법정 보존 기준"],
  ["입원 관리", "입원 환자 정보와 병동 배정", "입원 진료와 병실 관리", "입원 기록의 법정 보존 기준"],
  ["진료 기록", "증상, 진단과 진료 내용", "환자 상태 확인과 치료 제공", "의료 관계 법령이 정한 보존 기간"],
  ["검사 기록", "검사 항목, 결과와 시행 일자", "검사 판독과 진료 계획", "의료 기록 보존 기준에 따라 관리"],
  ["처방 기록", "처방 약과 복용 안내", "처방 확인과 약제 관리", "진료 기록에 적용되는 보존 기준"],
  ["건강검진", "검진 예약 정보와 문진 응답", "검진 항목 결정과 결과 안내", "검진 기록의 법정 보존 기준"],
  ["보험 자격", "보험 종류와 자격 확인 자료", "급여 적용과 진료비 청구", "보험 청구 관련 규정에 따라 관리"],
  ["수납", "진료비 내역과 결제 승인 정보", "수납, 환불과 회계 확인", "거래 관계 법령상 보존 기준"],
  ["증명서 발급", "문서 종류와 필요한 발급 부수", "진료기록 사본 및 증명서 제공", "발급 처리와 의료 기록 보존 기준"],
  ["가족 신청", "환자와 신청인의 관계 자료", "대리 신청 자격 확인", "발급 심사 종료 뒤 보존 의무 확인"],
  ["위임 신청", "위임장과 환자 동의 자료", "환자 의사 및 대리 권한 확인", "관계 법령상 필요한 기간에 한해 관리"],
  ["미성년 환자", "법정대리인 연락처와 관계 정보", "보호자 확인과 진료 동의", "미성년 진료 기록의 보존 기준"],
  ["온라인 문의", "이름, 연락 방법과 질문 내용", "병원 이용 문의 확인 및 답변", "문의 처리 목적이 끝난 뒤 파기 기준 적용"],
  ["민원 접수", "민원 요지와 회신에 필요한 연락 정보", "담당 부서 배정과 처리 결과 통지", "민원 처리와 분쟁 대응 기준에 따라 관리"],
  ["채용 문의", "지원 직무와 연락처", "지원 관련 질문에 회신", "채용 문의 처리 완료 후 삭제 기준 적용"],
  ["웹 이용", "접속 일시와 요청한 서비스 정보", "오류 확인과 보안 점검", "서비스 운영 기록의 관리 기준에 따라 보관"],
  ["보안 기록", "접속 기록과 시스템 이용 흔적", "비정상 접근 탐지와 사고 조사", "관련 법령과 내부 보안 기준에 따라 관리"],
  ["쿠키 설정", "브라우저 설정과 동의 선택", "선택한 화면 설정 유지", "브라우저에서 삭제하거나 설정을 바꿀 때까지"],
  ["통계 정보", "서비스 이용 횟수와 기능 사용 기록", "방문 통계와 기능 개선 검토", "개인 식별이 필요한 범위를 줄여 관리"],
  ["제3자 제공", "동의 또는 법적 근거가 있는 최소 정보", "고지한 제공 목적의 업무 처리", "제공 시 안내한 보유 기간에 따라 관리"],
  ["업무 위탁", "수탁 업무에 필요한 정보 범위", "검사, 전산 운영과 문서 발송", "계약상 안전 조치와 종료 절차를 적용"],
  ["정보 열람", "신청인의 신원과 확인하려는 정보", "정보주체 본인 여부와 요청 범위 확인", "열람 요청 처리 기록의 관리 기준 적용"],
  ["정보 정정", "수정 대상과 사실 확인 자료", "정확한 정보로 갱신하고 관련 부서에 반영", "정정 처리 기록의 보존 기준 적용"],
  ["삭제 요청", "삭제를 요청한 정보와 신청 사유", "삭제 가능 여부와 법적 보존 의무 확인", "삭제 이후 처리 결과를 기록으로 관리"],
  ["처리 정지", "중단을 요청한 정보와 요청 범위", "법률상 제한과 진료 필요 여부 검토", "요청 심사에 필요한 기간 동안 관리"],
  ["권리 대리", "위임 관계와 대리인의 신원 자료", "적법한 대리 신청인지 확인", "신청 처리를 마친 뒤 보존 의무 확인"],
  ["전자 파일 파기", "보유 기간이 지난 전자 문서", "복구하기 어려운 방식으로 삭제", "파기 처리 확인에 필요한 기록만 보존"],
  ["종이 문서 파기", "보존 필요가 끝난 신청서와 출력물", "분쇄 또는 이에 준하는 방법으로 파기", "폐기 여부를 확인한 뒤 문서 자체는 보관하지 않음"],
  ["접근 권한", "직무에 필요한 계정과 권한 정보", "업무 담당자별 정보 열람 범위 설정", "인사 이동과 업무 종료 때 권한을 조정"],
  ["교육과 점검", "개인정보 취급 업무와 교육 이력", "담당자 교육과 보호 절차 확인", "점검 결과의 관리 기준에 따라 보관"],
  ["사고 대응", "유출 의심 정보와 확인된 영향 범위", "피해 최소화와 관계 기관 신고 판단", "사고 대응 및 법령상 보존 기준 적용"],
  ["방침 개정", "변경된 처리 항목과 적용 시점", "이용자에게 개정 사항 공개", "이전 방침 기록은 변경 이력으로 관리"],
  ["문의 담당", "개인정보 관련 문의와 회신 정보", "권리 행사와 처리 문의 접수", "문의 해결 뒤 정해진 파기 기준 적용"]
 ],
 "/ko/term": [
  ["계정 신청", "가입 시 필수 항목을 정확하게 입력합니다.", "타인의 정보로 계정을 만들지 않습니다.", "가입 완료 뒤 계정 정보를 직접 관리합니다."],
  ["계정 보안", "인증 정보는 다른 사람과 공유하지 않습니다.", "도용이 의심되면 병원에 알려 계정을 확인합니다.", "병원은 확인을 위해 필요한 조치를 안내합니다."],
  ["서비스 이용", "병원은 진료와 이용에 관한 온라인 정보를 제공합니다.", "서비스별 이용 가능 시간과 조건을 확인합니다.", "정기 점검이나 장애 때 일부 기능이 제한될 수 있습니다."],
  ["예약 기능", "온라인 예약은 접수 가능 여부를 확인하는 기능입니다.", "예약 확정은 병원의 확인 절차를 거쳐야 합니다.", "예약 변경과 취소는 안내된 방법으로 요청합니다."],
  ["문의 기능", "문의 내용은 답변에 필요한 범위로 작성합니다.", "접수 결과는 확인 가능한 연락 방법으로 안내합니다.", "온라인 문의는 응급 진료 접수에 사용할 수 없습니다."],
  ["이용자 준수", "법령과 병원 이용 규칙을 지켜 서비스를 사용합니다.", "타인의 권리와 개인정보를 침해하지 않습니다.", "시스템에 과도한 요청을 보내거나 기능을 방해하지 않습니다."],
  ["금지 자료", "불법 정보나 악성 코드가 포함된 내용을 전송하지 않습니다.", "허위 사실로 다른 사람의 명예를 훼손하지 않습니다.", "병원은 권리 침해 자료의 접근을 제한할 수 있습니다."],
  ["자료 권리", "이용자가 작성한 내용의 권리는 관계 법령에 따릅니다.", "병원 자료를 허락 없이 복사해 영리 목적으로 쓰지 않습니다.", "권리 침해 신고는 확인 가능한 자료와 함께 접수합니다."],
  ["건강 정보", "온라인 건강 자료는 일반적인 안내로 제공됩니다.", "개인 진단과 처방은 의료진의 진료를 통해 결정합니다.", "응급 증상은 온라인 문의가 아닌 응급 절차를 이용합니다."],
  ["서비스 변경", "병원은 운영상 필요한 기능을 조정할 수 있습니다.", "주요 변경은 내용과 적용 시점을 미리 안내합니다.", "법령 변경이나 긴급한 보안 문제는 별도 조치할 수 있습니다."],
  ["일시 중단", "정기 점검 일정은 가능한 범위에서 사전 공지합니다.", "장애가 발생하면 원인 확인과 복구를 진행합니다.", "재난이나 통신 장애에는 서비스가 중단될 수 있습니다."],
  ["이용 제한", "계정 도용이나 반복적인 운영 방해가 확인되면 제한할 수 있습니다.", "제한 사유와 해제 방법을 확인 가능한 방식으로 안내합니다.", "이용자는 제한 결정에 관해 병원에 문의할 수 있습니다."],
  ["탈퇴 신청", "회원은 안내된 방법으로 서비스 탈퇴를 요청할 수 있습니다.", "법정 보존 자료는 탈퇴 이후에도 정해진 기간 관리될 수 있습니다.", "보존 의무가 없는 계정 정보는 파기 절차에 따라 삭제합니다."],
  ["책임 범위", "병원은 법률이 정한 범위에서 서비스 책임을 부담합니다.", "천재지변과 외부 통신 장애는 서비스 이용에 영향을 줄 수 있습니다.", "이용자의 고의 또는 과실로 생긴 손해는 관계 법령을 따릅니다."],
  ["분쟁 절차", "이용과 관련한 문의는 병원 담당 창구에 접수합니다.", "당사자는 분쟁 해결을 위해 필요한 자료를 확인합니다.", "해결되지 않은 사안은 관계 법령의 조정과 재판 절차를 따릅니다."],
  ["약관 변경", "개정 약관에는 변경 이유와 시행일을 표시합니다.", "이용자는 시행 전에 변경 내용을 확인할 수 있습니다.", "계속 이용하면 시행일부터 개정 약관이 적용됩니다."]
 ]
};
reviewFacts["/certification"].push(
 ["온라인 서류", "일부 서류는 온라인 발급 대상과 본인 확인 절차가 따로 적용됩니다."],
 ["신청서 작성", "환자 성명과 진료 기간, 필요한 기록 종류를 정확히 기재합니다."],
 ["제출 자료", "사본 제출이 필요한 서류와 원본 대조 여부는 발급 창구에서 확인합니다."]
);
reviewFacts["/consultation"].push(
 ["증상 변화", "증상이 악화되거나 새 증상이 생기면 온라인 답변을 기다리지 말고 진료를 받습니다."],
 ["검사 문의", "검사 결과 해석은 결과지를 준비해 담당 진료과에 문의해 주세요."],
 ["진료 기록", "온라인 상담에는 환자 식별 번호나 검사 결과 전체를 첨부하지 마세요."],
 ["진료 예약", "새 진료 예약은 진료과 접수 시간과 초진 가능 여부를 확인합니다."],
 ["약 복용", "복용 중인 약의 용량을 임의로 바꾸지 말고 처방한 의료진에게 확인합니다."],
 ["응급 연락", "호흡 곤란이나 의식 저하 등 급한 상황은 119에 연락해 도움을 요청합니다."],
 ["답변 범위", "문의 답변은 병원 이용 절차와 진료과 안내를 중심으로 제공합니다."]
);
reviewFacts["/faq"].push(
 ["진료기록 발급", "환자 본인 또는 적법한 대리인이 신청서와 확인 자료를 제출해야 합니다."],
 ["응급실 이용", "응급실은 중증도에 따라 진료 순서를 정하므로 도착 순서와 다를 수 있습니다."],
 ["식사 변경", "입원 식이는 처방과 병동 배식 일정에 따라 제공됩니다."],
 ["면회 제한", "감염병 대응이나 환자 상태에 따라 면회 방식이 변경될 수 있습니다."]
);
reviewFacts["/funeral_1"].push(
 ["빈소 선택", "빈소별 이용 가능 여부와 사용료를 계약 전에 확인합니다."],
 ["운구 일정", "차량 이용 시간과 출발 장소를 장례 담당자와 미리 정합니다."],
 ["장례 용품", "관과 수의 등 필요한 용품의 종류와 비용을 신청 전에 확인합니다."],
 ["조문객 안내", "빈소 위치와 주차 방법은 유가족이 확인한 뒤 조문객에게 전달합니다."]
);
reviewFacts["/health_info"].push(
 ["폐암 검사", "검사 대상과 촬영 방법은 위험 요인과 의료진 평가를 기준으로 상담합니다."],
 ["심장 검사", "심장 석회화 영상 검사는 검사 필요성과 결과 설명을 의료진과 확인합니다."],
 ["자기공명검사", "MRI와 MRA는 촬영 부위와 확인하려는 혈관·조직에 따라 구분합니다."],
 ["유방 선별검사", "선별검사의 범위와 후속 진료 여부는 의료진 설명에 따라 결정합니다."],
 ["검사 전 복용약", "복용 중인 약을 검사 전에 임의로 중단하지 말고 검사실에 문의합니다."]
);
reviewFacts["/hospitalnews"].push(
 ["공지 확인", "진료 휴진이나 일정 변경은 해당 진료과의 최신 공지를 확인합니다."],
 ["정보 기준일", "게시물에 날짜가 있는 경우 해당 날짜의 운영 소식으로 확인해 주세요."],
 ["예방접종 대상", "접종 대상 연령과 일정은 질병관리청의 해당 절기 공지를 따릅니다."],
 ["병동 서비스", "통합 간호 서비스 이용은 병동 운영과 환자 상태에 따라 확인합니다."],
 ["안전 교육", "환자 안전 수칙과 감염 예방 안내는 병원 현장 공지를 확인합니다."]
);
reviewFacts["/ko/unpaidmedexpense"].push(
 ["단위 확인", "표에 표시된 금액의 산정 단위와 적용 횟수를 확인합니다."],
 ["검사 판독", "촬영과 판독 비용이 항목별로 분리되어 있는지 확인합니다."],
 ["재료대", "치료 재료 비용은 사용 품목과 진료 범위에 따라 달라질 수 있습니다."],
 ["고시 개정", "비급여 항목과 금액은 고시와 병원 운영 기준에 따라 변경될 수 있습니다."],
 ["진료비 문의", "청구된 항목의 상세 내역은 수납 창구에서 확인할 수 있습니다."]
);
reviewFacts["/location_1"].push(
 ["건물 진입", "병원에 도착하면 표지판을 따라 외래 접수 또는 응급실로 이동합니다."],
 ["교통 약자", "이동 지원이 필요하면 방문 전에 안내 데스크에 이용 가능 여부를 문의합니다."]
);
reviewFacts["/med_dept_medic"].push(
 ["담당 질환", "각 진료 분야에서 다루는 질환과 검사 항목을 확인할 수 있습니다."],
 ["진료 의뢰", "다른 병원에서 의뢰받은 환자는 의뢰서와 검사 자료를 준비합니다."],
 ["재진 일정", "재진은 이전 진료에서 안내받은 날짜와 진료과를 확인해 예약합니다."],
 ["의료진 변경", "진료 일정에 변동이 생기면 예약 부서에서 대체 일정을 안내합니다."],
 ["진료 상담", "증상과 이전 치료 내용을 정리해 진료 시 의료진에게 설명해 주세요."]
);
reviewFacts["/parkinginfo"].push(
 ["입원 차량", "입원 차량 지원은 입원 확인과 차량 등록 절차를 거쳐 적용됩니다."],
 ["외래 차량", "외래 이용 차량은 영수증을 준비해 정산 전에 지원 기준을 확인합니다."],
 ["검사 방문", "검사만 이용한 경우 지원 여부를 검사 확인 자료로 문의합니다."],
 ["출차 전 정산", "정산 결과와 차량 번호를 확인한 뒤 주차장을 나갑니다."],
 ["주차 구역", "주차 구역별 출입구와 엘리베이터 위치는 현장 표지를 확인합니다."],
 ["혼잡 시간", "진료 시작 전후 혼잡할 수 있으므로 여유 있게 도착해 주세요."],
 ["사고 신고", "주차 중 차량 사고나 시설 파손은 관리 창구에 즉시 알립니다."],
 ["분실물", "주차장 분실물은 발견 장소와 시간을 확인해 관리 창구에 문의합니다."]
);
reviewFacts["/touchingstory"].push(
 ["감사 의견", "진료와 병원 이용 중 전달할 감사 의견을 접수할 수 있습니다."],
 ["불편 접수", "불편이 발생한 날짜와 이용 부서를 알려 주면 담당 부서가 확인합니다."],
 ["처리 결과", "추가 확인이 필요한 경우 남겨 둔 연락처로 문의할 수 있습니다."],
 ["타인 정보", "의견에는 다른 환자나 직원의 실명과 연락처를 적지 않습니다."],
 ["개인 진료 문의", "환자별 진료 내용은 공개 게시판이 아닌 담당 진료과에 문의합니다."],
 ["긴급 안전", "즉시 조치가 필요한 안전 문제는 현장 직원에게 바로 알려 주세요."]
);
reviewFacts["/unpaidmedexpense"].push(
 ["조회 범위", "항목명을 검색할 때는 검사명과 재료명 등 표기 기준을 확인합니다."],
 ["최저·최고 금액", "비용 범위가 표시되면 적용 조건과 진료 단위를 함께 살펴봅니다."],
 ["비급여 고지", "비급여 진료비는 진료 전에 항목과 예상 부담액을 확인합니다."],
 ["급여 전환", "보험 급여 여부는 진료 시점의 인정 기준에 따라 결정됩니다."],
 ["이의 문의", "비용 산정에 궁금한 점은 진료비 세부 내역을 준비해 문의합니다."]
);
reviewFacts["/visit_info"].push(
 ["환자 확인", "방문 전 병동과 병실을 확인하고 지정된 면회 장소를 이용합니다."],
 ["손 위생", "병실에 들어가기 전후 손을 씻거나 손 소독제를 사용합니다."],
 ["면회 중 촬영", "환자와 다른 방문객의 사생활을 위해 촬영 전 동의를 구합니다."]
);
// A weekly menu must not reuse a fabricated menu on every weekday.
reviewFacts["/certification"].push(["신청 자격", "대리 신청은 관계 법령이 정한 자격과 제출 서류를 확인한 뒤 접수합니다."]);
reviewFacts["/consultation"].push(
 ["검사 예약", "검사 전 준비와 예약 변경은 검사를 진행하는 부서에 확인합니다."],
 ["진료비 문의", "진료비 세부 내역은 수납 창구에서 항목별로 확인할 수 있습니다."],
 ["감염 증상", "발열이나 호흡기 증상이 있으면 방문 전 병원에 알려 주세요."],
 ["문의 기록", "답변에 필요한 진료과와 연락 가능 시간을 남겨 주세요."]
);
reviewFacts["/health_info"].push(["건강 자료", "일반 건강 정보는 개인의 진단이나 치료 계획을 대신하지 않습니다."]);
reviewFacts["/hospitalnews"].push(["게시 문의", "게시 내용에 관한 문의는 안내된 담당 부서를 통해 확인합니다."]);
reviewFacts["/ko/term"].push(
 ["적용 범위", "온라인으로 제공되는 병원 안내와 관련 기능에 약관을 적용합니다."],
 ["통지 방법", "서비스 관련 공지는 웹사이트 게시 또는 이용자가 제공한 연락 방법으로 알립니다."]
);
reviewFacts["/consultation"].push(
 ["진료 전 확인", "진료 전 복용 약과 이전 검사 자료를 준비하면 상담에 도움이 됩니다."],
 ["개인 자료 보호", "문의 답변을 위해 필요하지 않은 신분증 사본은 전송하지 마세요."]
);
reviewFacts["/ko/term"].push(["이용자 문의", "약관 해석이나 서비스 이용 문의는 병원 안내 창구를 통해 접수합니다."]);
reviewFacts["/med_dept_medic"].push(["진료 준비", "진료 당일에는 예약 정보와 본인 확인 자료를 접수 창구에 제시합니다."]);
reviewFacts["/parkinginfo"].push(["차량 높이", "높이 제한이 있는 구역은 입구 표지의 기준을 확인해 진입합니다."]);
reviewFacts["/touchingstory"].push(["답변 확인", "답변이 필요한 경우 연락 가능한 번호를 정확히 남겨 주세요."]);
reviewFacts["/unpaidmedexpense"].push(["표시 금액", "비용 안내는 고시 기준을 참고하며 실제 청구액은 진료 후 확인합니다."]);
function reviewSection(path){if(path==="/login"||path==="/login/signup"||path==="/ko/term"||path==="/consultation"||path==="/worshipguide"||path==="/thisweekmeal"||path==="/ko/privacy"||path==="/intro_hsptl"||path==="/intro_greeting")return "";const rows=reviewFacts[path];const matrix=reviewMatrices[path];if(!rows&&!matrix)return "";return `<section class="review-facts">${rows?`<h3>이용 시 확인할 사항</h3><div class="info-grid">${rows.map(([label,text])=>`<div class="info-box"><strong>${label}</strong><span>${text}</span></div>`).join("")}</div>`:""}${matrix?`<h3>처리 기준별 확인</h3><div class="table-scroll"><table class="table"><thead><tr>${(path==="/ko/privacy"?["처리 업무","정보 범위","이용 목적","보유와 관리"]:["이용 항목","적용 기준","이용자 확인","처리 방식"]).map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${matrix.map(row=>`<tr>${row.map(cell=>`<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:""}</section>`}
function pageBody(path,title){let body=bodyFor(path,title);if(pages[path]){const item=pages[path];body=body.replace(/<p class="lead">[\s\S]*?<\/p>/,`<p class="lead">${item[0]} \xb7 ${item[1]}</p>`)}body=body.replace(/<p class="photo-note">[\s\S]*?<\/p>/,"");return body}
 function page(path){const item=pages[path]||["병원 안내","병원 이용에 필요한 정보를 확인하세요.","안내"];const legal=["/ko/term","/ko/privacy","/ko/cookie","/ko/rights","/ko/unpaidmedexpense"].includes(path);const legalTabs=[["이용약관","/ko/term"],["개인정보 처리방침","/ko/privacy"],["쿠키 정책","/ko/cookie"],["환자의 권리와 의무","/ko/rights"],["비급여 항목","/ko/unpaidmedexpense"]];return `<main class="${legal?"legal-page":""}">${legal?`<section class="legal-heading"><div class="wrap"><h1>개인정보 보호 및 약관</h1><nav class="legal-tabs" aria-label="정책 메뉴">${legalTabs.map(([label,href])=>`<a href="${BASE}${href}" ${href===path?'aria-current="page" class="active"':''}>${label}</a>`).join("")}</nav></div></section>`:`<section class="subhero"><div class="wrap"><div class="crumb">${link("/","홈")}　/　${item[2]}　/　${item[0]}</div><h1>${item[0]}</h1><p>${item[1]}</p></div></section>`}<section class="content"><div class="wrap content-layout ${legal?"legal-layout":""}">${legal?"":`<aside class="side-nav">${(groups.find(g=>g.label.includes(item[2]))?.links||groups[1].links).map(([l,h])=>`<a class="${h===path?"active":""}" href="${BASE}${h}">${l}</a>`).join("")}</aside>`}<div class="content-main route-${path.replace(/^\//,"").replace(/\//g,"-")}">${path==="/ko/privacy"?`<p class="policy-summary">\uAC1C\uC778\uC815\uBCF4 \uCC98\uB9AC \uBAA9\uC801\uACFC \uD56D\uBAA9, \uBCF4\uC720 \uAE30\uC900, \uC774\uC6A9\uC790\uC758 \uAD8C\uB9AC \uBC0F \uC694\uCCAD \uC808\uCC28\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4.</p><nav class="policy-toc" aria-label="\uCC98\uB9AC\uBC29\uCE68 \uD56D\uBAA9">${Array.from({length:13},(_,i)=>`<a href="#policy-${i+1}">\uC81C${i+1}\uC870</a>`).join("")}</nav>`:""}${path==="/ko/privacy"?pageBody(path,item[0]).replace(/<h3>(\\d+)\\./g,'<h3 id="policy-$1">$1.'):pageBody(path,item[0])}${path==="/ko/rights"?"":reviewSection(path)}</div></div></section></main>`}
function modal(){return `<div class="modal" data-modal hidden><div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="searchTitle"><button class="modal-close" data-close aria-label="닫기">×</button><h2 id="searchTitle">병원 정보 검색</h2><form class="form" data-search-form><label>검색어<input placeholder="진료과, 이용 정보 등을 입력하세요" autofocus></label><button class="btn">검색</button><p class="form-result" aria-live="polite"></p></form></div></div>`}
function render(){let path=document.body.dataset.route||location.pathname.replace(BASE,"").replace(/\/index\.html$/,"").replace(/\/+$/,"")||"/";const root=document.getElementById("app");root.innerHTML=header()+(path==="/"?home():page(path))+footer()+modal();document.title=`${pages[path]?.[0]||"서해중앙병원"} | 서해중앙병원`;bind()}
 function bind(){document.querySelector("[data-agree-all]")?.addEventListener("change",e=>document.querySelectorAll(".signup-consent input[required]").forEach(c=>c.checked=e.currentTarget.checked));document.querySelector(".menu-toggle")?.addEventListener("click",()=>document.getElementById("mobileNav").classList.toggle("open"));document.querySelector(".menu-toggle")?.addEventListener("click",e=>{const open=document.getElementById("mobileNav").classList.contains("open");e.currentTarget.setAttribute("aria-expanded",String(open));e.currentTarget.setAttribute("aria-label",open?"\uBA54\uB274 \uB2EB\uAE30":"\uBA54\uB274 \uC5F4\uAE30")});document.querySelectorAll("#mobileNav a").forEach(a=>a.addEventListener("click",()=>{const nav=document.getElementById("mobileNav");nav.classList.remove("open");const b=document.querySelector(".menu-toggle");b?.setAttribute("aria-expanded","false");b?.setAttribute("aria-label","\uBA54\uB274 \uC5F4\uAE30")}));document.querySelectorAll("[data-search]").forEach(b=>b.addEventListener("click",()=>{document.querySelector("[data-modal]").hidden=false;document.querySelector("[data-modal] input")?.focus()}));document.querySelector("[data-close]")?.addEventListener("click",()=>document.querySelector("[data-modal]").hidden=true);document.querySelector("[data-modal]")?.addEventListener("click",e=>{if(e.target.matches("[data-modal]"))e.currentTarget.hidden=true});document.addEventListener("keydown",e=>{if(e.key==="Escape"){const m=document.querySelector("[data-modal]");if(m&&!m.hidden){m.hidden=true;document.querySelector("[data-search]")?.focus()}}});document.querySelectorAll(".tabs[role=tablist]").forEach(list=>{const table=list.parentElement?.querySelector("table.table"),rows=[...(table?.tBodies[0]?.rows||[])];list.querySelectorAll("[role=tab]").forEach(tab=>tab.addEventListener("click",()=>{list.querySelectorAll("[role=tab]").forEach(x=>x.setAttribute("aria-selected",String(x===tab)));const label=tab.textContent.trim(),allowed=label.includes("\uD589\uC704")?["\uAC80\uC0AC\uB8CC","\uCC98\uCE58\uB8CC"]:label.includes("\uCE58\uB8CC \uC7AC\uB8CC")?["\uCE58\uB8CC \uC7AC\uB8CC"]:label.includes("\uC57D\uC81C")?["\uC57D\uC81C\uBE44"]:label.includes("\uC81C\uC99D\uBA85")?["\uC81C\uC99D\uBA85"]:null;rows.forEach(row=>{row.hidden=!!allowed&&!allowed.includes(row.cells[0]?.textContent.trim())})}))});document.querySelectorAll("form").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();const m=f.querySelector(".form-result");if(m)m.textContent=f.matches("[data-search-form]")?"검색어와 관련된 쪽을 메뉴에서 선택해 주세요.":"온라인 접수는 준비 중입니다. 문의는 010-4894-4905로 전화 주세요."}));document.querySelectorAll("[data-slide]").forEach(b=>b.addEventListener("click",()=>{currentHeroSlide=(currentHeroSlide+(b.dataset.slide==="next"?1:heroSlides.length-1))%heroSlides.length;const hero=document.querySelector(".hero");if(!hero)return;hero.classList.remove("slide-1","slide-2");if(currentHeroSlide)hero.classList.add(`slide-${currentHeroSlide}`);hero.querySelector("h1").innerHTML=heroSlides[currentHeroSlide][0];hero.querySelector(".hero-copy p").textContent=heroSlides[currentHeroSlide][1];hero.querySelector(".hero-controls span").textContent=`0${currentHeroSlide+1} / 03`}))}
function bindHomeControls(){
 const banner=document.querySelector("[data-banner-track]");
 const bannerCards=banner?[...banner.querySelectorAll(".home-banner-card")]:[];
 let bannerIndex=0;
 document.querySelectorAll("[data-banner-step]").forEach(button=>button.addEventListener("click",()=>{
  if(!bannerCards.length)return;
  bannerIndex=(bannerIndex+Number(button.dataset.bannerStep)+bannerCards.length)%bannerCards.length;
  bannerCards.forEach((card,index)=>{card.hidden=index!==bannerIndex;card.setAttribute("aria-hidden",String(index!==bannerIndex))});
 }));
 const indexes={departments:0,centers:0};
 const visibleItems=name=>innerWidth<=640?2:6;
 Object.entries(indexes).forEach(([name,index])=>{
  const track=document.querySelector(`[data-home-track="${name}"]`);
  if(track){const count=visibleItems(name);[...track.children].forEach((item,i)=>{item.hidden=i>=count;item.setAttribute("aria-hidden",String(i>=count))})}
 });
 document.querySelectorAll("[data-home-step]").forEach(button=>button.addEventListener("click",()=>{
  const name=button.dataset.homeStep,track=document.querySelector(`[data-home-track="${name}"]`);
  if(!track)return;
  const items=[...track.children];
  if(!items.length)return;
  indexes[name]=(indexes[name]+Number(button.dataset.step)+items.length)%items.length;
  const count=visibleItems(name);
  items.forEach((item,index)=>{const visible=(index-indexes[name]+items.length)%items.length<count;item.hidden=!visible;item.setAttribute("aria-hidden",String(!visible))});
  const countDisplay=document.querySelector(`[data-home-count="${name}"]`);
  if(countDisplay)countDisplay.textContent=`${String(indexes[name]+1).padStart(2,"0")} / ${String(items.length).padStart(2,"0")}`;
 }));
}
if(document.body.dataset.sourceFrame!=="1")render();else bind();
bindHomeControls();
function bindSourceBreadcrumbs(){
 const selects=[...document.querySelectorAll("[data-crumb-select]")];
 if(!selects.length)return;
 const close=(select,restoreFocus=false)=>{
  const button=select.querySelector("[data-crumb-toggle]");
  const menu=select.querySelector(".crumb-select-menu");
  if(!button||!menu)return;
  button.setAttribute("aria-expanded","false");
  menu.hidden=true;
  if(restoreFocus)button.focus();
 };
 selects.forEach(select=>select.querySelector("[data-crumb-toggle]")?.addEventListener("click",event=>{
  const button=event.currentTarget;
  const menu=select.querySelector(".crumb-select-menu");
  const willOpen=button.getAttribute("aria-expanded")!=="true";
  selects.forEach(other=>close(other));
  if(willOpen){button.setAttribute("aria-expanded","true");menu.hidden=false;menu.querySelector("a")?.focus();}
 }));
 document.addEventListener("click",event=>{
  if(!event.target.closest("[data-crumb-select]"))selects.forEach(select=>close(select));
 });
 document.addEventListener("keydown",event=>{
  if(event.key==="Escape"){
   const open=selects.find(select=>select.querySelector("[data-crumb-toggle]")?.getAttribute("aria-expanded")==="true");
   if(open){close(open,true);event.stopPropagation();}
  }
 });
}
bindSourceBreadcrumbs();

function bindCountUp(){
 const nodes=[...document.querySelectorAll("[data-count-num]")];
 if(!nodes.length)return;
 const animate=node=>{
  const target=Number(node.dataset.countNum);
  if(!Number.isFinite(target))return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){node.textContent=String(target);return;}
  const start=performance.now(),duration=1100;
  const frame=now=>{const progress=Math.min(1,(now-start)/duration);node.textContent=String(Math.round(target*(1-Math.pow(1-progress,3))));if(progress<1)requestAnimationFrame(frame);};
  requestAnimationFrame(frame);
 };
 if(!("IntersectionObserver" in window)){nodes.forEach(animate);return;}
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){animate(entry.target);observer.unobserve(entry.target);}}),{threshold:.35});
 nodes.forEach(node=>observer.observe(node));
}
bindCountUp();
