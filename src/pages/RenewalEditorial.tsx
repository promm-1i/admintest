import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { HEADER_NAV } from "@/components/site/navData";
import { getNotice, listPublishedNotices } from "@/lib/api/notices";
import { FAQ } from "@/lib/faq";
import { KAKAO_CHANNEL_URL, NAVER_BLOG_URL, PHONE_NUMBER, PHONE_TEL_HREF } from "@/lib/contact";
import { SAMPLES, getPremiumDesigns } from "@/lib/samples";
import { PRICING_ROWS, PRODUCTION_PERIOD, TEMPLATE_PACKAGES, formatMan } from "@/lib/templatePackages";
import "./RenewalEditorial.css";

const ROOT = "/renewal-editorial";
const MEDIA = "/renewal-editorial/media";
// 서브페이지는 쪽마다 다른 사진을 쓴다. 새 사진이 오면 해당 줄의 파일명만 바꾸면 된다.
const SUBPAGE_MEDIA: Record<PageKey, string> = {
  process: `${MEDIA}/sub-process.webp`,
  price: `${MEDIA}/sub-process.webp`,  // 제작 비용 쪽은 상단 사진 판이 없어 실제로 쓰이지 않는다
  features: `${MEDIA}/sub-features.webp`,
  maintenance: `${MEDIA}/sub-maintenance.webp`,
  custom: `${MEDIA}/sub-custom.webp`,
  "admin-system": `${MEDIA}/sub-admin.webp`,
  "inquiry-reservation": `${MEDIA}/sub-inquiry.webp`,
  "search-filter": `${MEDIA}/sub-search.webp`,
  "content-management": `${MEDIA}/sub-content.webp`,
  "database-api": `${MEDIA}/sub-database.webp`,
  responsive: `${MEDIA}/sub-responsive.webp`,
  seo: `${MEDIA}/sub-seo.webp`,
};
const MEDIA_SLOTS = {
  hero: `${MEDIA}/hero.webp`,
  intro: `${MEDIA}/intro.webp`,
  stories: [`${MEDIA}/story-01.webp`, `${MEDIA}/story-02.webp`, `${MEDIA}/story-03.webp`],
  now: `${MEDIA}/now.webp`,
  values: [`${MEDIA}/value-01.webp`, `${MEDIA}/value-02.webp`, `${MEDIA}/value-03.webp`],
  tomorrow: [`${MEDIA}/tomorrow-01.webp`, `${MEDIA}/tomorrow-02.webp`, `${MEDIA}/tomorrow-03.webp`],
} as const;
type PageKey = "process" | "price" | "features" | "maintenance" | "custom" | "admin-system" | "inquiry-reservation" | "search-filter" | "content-management" | "database-api" | "responsive" | "seo";
type ContentPage = { eyebrow: string; title: string; intro: string; group: "홈페이지 제작" | "기술력"; image: string; sections: { title: string; text: string; points: string[] }[] };

const PAGE_DATA: Record<PageKey, ContentPage> = {
  process: { eyebrow: "WORK PROCESS", title: "제작 방법", intro: "상담에서 오픈까지 필요한 일을 순서대로 확인합니다", group: "홈페이지 제작", image: SUBPAGE_MEDIA["process"], sections: [
    { title: "상담", text: "업종, 필요한 메뉴, 참고 사이트와 준비된 자료를 확인합니다", points: ["참고 사이트", "필요한 기능", "도메인 보유 여부"] },
    { title: "구성", text: "메뉴와 페이지 수를 정하고 화면마다 들어갈 내용을 나눕니다", points: ["사이트맵", "화면 순서", "PC·모바일 기준"] },
    { title: "제작", text: "확정한 구성으로 디자인과 기능을 만들고 실제 화면에서 검수합니다", points: ["디자인", "관리자 기능", "반응형 화면"] },
    { title: "오픈", text: "도메인, 문의 알림과 검색 노출 설정을 확인한 뒤 공개합니다", points: ["도메인 연결", "알림 테스트", "검색 기본 설정"] },
  ] },
  price: { eyebrow: "PRICE GUIDE", title: "제작 비용", intro: "페이지 수와 화면 연출, 필요한 기능을 기준으로 비용을 정합니다", group: "홈페이지 제작", image: SUBPAGE_MEDIA["price"], sections: [] },
  features: { eyebrow: "WEBSITE FEATURES", title: "기능 소개", intro: "홈페이지에 필요한 화면과 운영 기능을 항목별로 확인합니다", group: "홈페이지 제작", image: SUBPAGE_MEDIA["features"], sections: [
    { title: "콘텐츠 화면", text: "회사 소개, 서비스, 사례, 소식과 문의 화면을 메뉴에 맞춰 구성합니다", points: ["소개·서비스", "목록·상세", "문의 화면"] },
    { title: "운영 화면", text: "담당자가 공지, 이미지와 게시물을 직접 등록하고 수정합니다", points: ["관리자 로그인", "등록·수정·삭제", "문의 내역 확인"] },
    { title: "방문자 기능", text: "검색, 필터, 예약과 신청처럼 방문자가 실제로 쓰는 기능을 연결합니다", points: ["검색·분류", "예약·신청", "문자 알림"] },
  ] },
  maintenance: { eyebrow: "MAINTENANCE", title: "유지보수", intro: "오픈 뒤 문구와 이미지 수정, 메뉴 추가와 기능 변경을 이어서 맡길 수 있습니다", group: "홈페이지 제작", image: SUBPAGE_MEDIA["maintenance"], sections: [
    { title: "오픈 후 1개월", text: "제작 범위 안의 문구와 이미지 수정을 무상으로 진행합니다", points: ["문구 교체", "이미지 교체", "오류 확인"] },
    { title: "월 유지보수", text: "간단한 수정이 꾸준히 필요한 경우 월 단위로 진행합니다", points: ["월 3회 간단 수정", "월 3만원", "작업 내역 확인"] },
    { title: "별도 개발", text: "페이지 추가나 기능 변경은 범위를 확인한 뒤 견적을 안내합니다", points: ["메뉴 추가", "기능 변경", "외부 서비스 연동"] },
  ] },
  custom: { eyebrow: "CUSTOM DEVELOPMENT", title: "커스텀 개발", intro: "정해진 화면에 내용을 넣는 작업부터 업무에 맞춘 관리 기능 개발까지 진행합니다", group: "기술력", image: SUBPAGE_MEDIA["custom"], sections: [
    { title: "화면 설계", text: "메뉴와 정보량, 방문 경로를 기준으로 페이지 구조를 정합니다", points: ["사이트맵", "화면 흐름", "반응형 기준"] },
    { title: "관리 기능", text: "운영자가 직접 다뤄야 하는 항목을 관리자 화면으로 만듭니다", points: ["권한", "데이터 관리", "파일 등록"] },
    { title: "서비스 연결", text: "지도, 문자, 결제와 외부 데이터가 필요하면 API로 연결합니다", points: ["외부 API", "DB", "알림·결제"] },
  ] },
  "admin-system": { eyebrow: "ADMIN SYSTEM", title: "관리자 시스템", intro: "공지, 문의와 홈페이지 내용을 담당자가 직접 관리할 수 있습니다", group: "기술력", image: SUBPAGE_MEDIA["admin-system"], sections: [
    { title: "콘텐츠 관리", text: "제목, 본문, 이미지와 노출 상태를 관리자 화면에서 바꿉니다", points: ["게시물 등록", "공개·비공개", "이미지 관리"] },
    { title: "문의 관리", text: "홈페이지에서 접수된 내용을 한곳에서 확인하고 처리 상태를 남깁니다", points: ["접수 내역", "처리 상태", "담당자 확인"] },
    { title: "권한 관리", text: "업무에 따라 관리자 계정과 접근 범위를 나눌 수 있습니다", points: ["계정 관리", "메뉴 권한", "작업 기록"] },
  ] },
  "inquiry-reservation": { eyebrow: "INQUIRY & RESERVATION", title: "문의 · 예약 관리", intro: "접수 화면과 관리자 확인, 알림까지 실제 상담 순서에 맞춰 연결합니다", group: "기술력", image: SUBPAGE_MEDIA["inquiry-reservation"], sections: [
    { title: "접수 항목", text: "상담에 필요한 날짜, 서비스와 연락처를 업종에 맞춰 받습니다", points: ["필수 항목", "동의 체크", "파일 첨부"] },
    { title: "예약 상태", text: "접수, 확인, 확정과 취소 상태를 관리자 화면에서 관리합니다", points: ["상태 변경", "일정 확인", "메모"] },
    { title: "알림", text: "새 문의가 들어오면 담당자가 바로 확인할 수 있도록 연결합니다", points: ["문자 알림", "이메일", "접수 안내"] },
  ] },
  "search-filter": { eyebrow: "SEARCH & FILTER", title: "검색 · 필터 기능", intro: "매물, 제품과 게시물이 많을 때 방문자가 원하는 항목을 빠르게 찾습니다", group: "기술력", image: SUBPAGE_MEDIA["search-filter"], sections: [
    { title: "조건 검색", text: "가격, 지역, 분류처럼 실제 선택에 필요한 조건을 정합니다", points: ["다중 조건", "범위 선택", "검색 초기화"] },
    { title: "목록 정렬", text: "최신순, 가격순과 추천순처럼 목록을 보는 기준을 제공합니다", points: ["정렬", "페이지 이동", "결과 수"] },
    { title: "상세 연결", text: "검색 결과에서 상세 정보와 문의 화면으로 이동합니다", points: ["상세 페이지", "관심 항목", "문의 연결"] },
  ] },
  "content-management": { eyebrow: "CONTENT MANAGEMENT", title: "콘텐츠 관리", intro: "새 소식과 사례, 갤러리를 운영자가 계속 올릴 수 있게 만듭니다", group: "기술력", image: SUBPAGE_MEDIA["content-management"], sections: [
    { title: "목록과 상세", text: "콘텐츠 성격에 맞춰 목록, 상세와 관련 글 구조를 만듭니다", points: ["카테고리", "목록·상세", "관련 콘텐츠"] },
    { title: "에디터", text: "글과 이미지를 직접 배치하고 수정할 수 있는 입력 화면을 제공합니다", points: ["본문 편집", "대표 이미지", "임시 저장"] },
    { title: "노출 관리", text: "게시 시점과 순서를 정하고 필요한 콘텐츠만 화면에 노출합니다", points: ["예약 공개", "순서 변경", "숨김 처리"] },
  ] },
  "database-api": { eyebrow: "DATABASE & API", title: "DB · API 연동", intro: "홈페이지의 데이터와 외부 서비스를 주고받도록 연결합니다", group: "기술력", image: SUBPAGE_MEDIA["database-api"], sections: [
    { title: "데이터 구조", text: "등록하고 검색할 항목을 정리해 데이터베이스 구조를 설계합니다", points: ["필드 설계", "관계 설정", "검색 기준"] },
    { title: "외부 연동", text: "지도, 문자와 업무 시스템에서 제공하는 API를 연결합니다", points: ["지도", "문자", "외부 업무 데이터"] },
    { title: "보안과 백업", text: "접근 권한을 나누고 운영 중 필요한 백업 기준을 정합니다", points: ["접근 제어", "환경 변수", "백업"] },
  ] },
  responsive: { eyebrow: "RESPONSIVE WEB", title: "반응형 웹 제작", intro: "PC 화면을 줄여 놓지 않고 태블릿과 모바일의 읽기 순서를 다시 맞춥니다", group: "기술력", image: SUBPAGE_MEDIA["responsive"], sections: [
    { title: "화면 너비", text: "콘텐츠 폭과 여백을 기기별로 조정해 가로 스크롤을 막습니다", points: ["PC", "태블릿", "모바일"] },
    { title: "메뉴와 터치", text: "모바일 메뉴, 버튼 크기와 손가락으로 누르는 영역을 확인합니다", points: ["모바일 메뉴", "터치 영역", "고정 버튼"] },
    { title: "이미지와 글", text: "사진 잘림과 글자 크기를 화면 비율에 맞춰 따로 설정합니다", points: ["이미지 크롭", "줄바꿈", "읽기 순서"] },
  ] },
  seo: { eyebrow: "SEARCH ENGINE", title: "검색엔진 최적화", intro: "검색 결과에 필요한 제목, 설명과 페이지 구조를 기본 설정합니다", group: "기술력", image: SUBPAGE_MEDIA["seo"], sections: [
    { title: "페이지 정보", text: "페이지마다 검색 결과에 표시할 제목과 설명을 작성합니다", points: ["페이지 제목", "설명", "공유 이미지"] },
    { title: "문서 구조", text: "제목 단계, 링크와 이미지 설명을 검색 로봇이 읽기 좋게 정리합니다", points: ["제목 단계", "대체 텍스트", "내부 링크"] },
    { title: "검색 등록", text: "사이트맵과 검색 도구 연결에 필요한 기본 파일을 준비합니다", points: ["사이트맵", "robots.txt", "검색 도구 연결"] },
  ] },
};

const FEATURED_SLUGS = ["corporate-q-template", "corporate-r-template", "corporate-s-template", "corporate-i-template", "artist-a-template", "rentcar-f-template"];
const SCOPE_SCENES = [
  { no: "01", title: "화면 구성", keyword: "메뉴부터 정합니다", text: "메뉴와 페이지를 나누고\n읽는 순서를 정합니다", image: MEDIA_SLOTS.stories[0], href: "/website/process" },
  { no: "02", title: "관리자 기능", keyword: "직접 고칩니다", text: "공지와 사례를 직접 올리고\n접수된 문의를 확인합니다", image: MEDIA_SLOTS.stories[1], href: "/services/admin-system" },
  { no: "03", title: "기기별 검수", keyword: "셋 다 확인합니다", text: "PC·태블릿·모바일에서\n글자와 이미지를 봅니다", image: MEDIA_SLOTS.stories[2], href: "/services/responsive" },
];
const HOME_LATEST = [
  ["상담 전에 준비할 자료와 홈페이지 제작 순서를 안내합니다", "( 2026.09.20 )"],
  ["디자인 템플릿과 커스텀 제작 범위를 정리했습니다", "( 2026.09.12 )"],
  ["관리자 화면에서 직접 바꿀 수 있는 항목을 확인하세요", "( 2026.09.05 )"],
  ["PC·태블릿·모바일 화면 검수 기준을 안내합니다", "( 2026.08.28 )"],
] as const;
const LOCAL_GROUPS = {
  "홈페이지 제작": [["제작 방법", "/website/process"], ["제작 비용", "/website/price"], ["기능 소개", "/website/features"], ["유지보수", "/website/maintenance"]],
  기술력: [["커스텀 개발", "/services/custom"], ["관리자 시스템", "/services/admin-system"], ["문의 · 예약 관리", "/services/inquiry-reservation"], ["검색 · 필터 기능", "/services/search-filter"], ["콘텐츠 관리", "/services/content-management"], ["DB · API 연동", "/services/database-api"], ["반응형 웹 제작", "/services/responsive"], ["검색엔진 최적화", "/services/seo"]],
  고객센터: [["문의하기", "/contact"], ["공지사항", "/notices"], ["자주 묻는 질문", "/faq"]],
} as const;

function previewHref(href: string) { return /^(https?:|tel:|mailto:|#)/.test(href) ? href : `${ROOT}${href}`; }
function pathFromLocation(pathname: string) { const value = pathname.slice(ROOT.length) || "/"; return value.startsWith("/") ? value : `/${value}`; }

function useEditorialMotion(pathname: string) {
  useEffect(() => {
    if (window.location.hash) requestAnimationFrame(() => document.querySelector(window.location.hash)?.scrollIntoView()); else window.scrollTo(0, 0);
    const reveal = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .14, rootMargin: "0px 0px -8%" });
    reveal.forEach((node) => revealObserver.observe(node));
    // A tall section can be scrolled past without the observer ever reporting it,
    // which would leave real content stuck at opacity 0. Mark anything the reader
    // has already reached as revealed.
    const markReached = () => reveal.forEach((node) => { if (node.getBoundingClientRect().top < window.innerHeight * .92) node.classList.add("is-visible"); });
    window.addEventListener("scroll", markReached, { passive: true });
    markReached();
    const sourceNodes = [...document.querySelectorAll<HTMLElement>(".re-first-intro,.re-first-story,.re-now")];
    const sourceObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      const node = entry.target as HTMLElement;
      if (entry.intersectionRatio >= .5) { node.classList.remove("init", "re-init"); node.classList.add("active", "re-active"); }
      else if (entry.intersectionRatio === 0 && entry.boundingClientRect.top > window.innerHeight) { node.classList.add("init", "re-init"); node.classList.remove("active", "re-active"); }
    }), { threshold: [0, .5] });
    sourceNodes.forEach((node) => sourceObserver.observe(node));
    const valueNode = document.querySelector<HTMLElement>(".re-now-value");
    const valueObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      const node = entry.target as HTMLElement;
      if (entry.intersectionRatio >= .2) { node.classList.remove("init", "re-init"); node.classList.add("active", "re-active"); }
      else if (entry.intersectionRatio === 0 && entry.boundingClientRect.top > window.innerHeight) { node.classList.add("init", "re-init"); node.classList.remove("active", "re-active"); }
    }), { threshold: [0, .2] });
    if (valueNode) valueObserver.observe(valueNode);
    const tomorrowNode = document.querySelector<HTMLElement>(".re-tomorrow");
    const desktopMotion = window.matchMedia("(min-width: 1024px)");
    let tomorrowObserver: IntersectionObserver | null = null;
    const syncTomorrowMotion = () => {
      tomorrowObserver?.disconnect();
      tomorrowObserver = null;
      if (!tomorrowNode) return;
      if (!desktopMotion.matches) {
        tomorrowNode.classList.remove("init", "active", "re-init", "re-active");
        return;
      }
      tomorrowNode.classList.add("init", "re-init");
      tomorrowObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
        const node = entry.target as HTMLElement;
        if (entry.intersectionRatio >= .5) { node.classList.remove("init", "re-init"); node.classList.add("active", "re-active"); }
        else if (entry.intersectionRatio === 0) { node.classList.add("init", "re-init"); node.classList.remove("active", "re-active"); }
      }), { threshold: [0, .5] });
      tomorrowObserver.observe(tomorrowNode);
    };
    syncTomorrowMotion();
    desktopMotion.addEventListener("change", syncTomorrowMotion);
    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", markReached);
      sourceObserver.disconnect();
      valueObserver.disconnect();
      tomorrowObserver?.disconnect();
      desktopMotion.removeEventListener("change", syncTomorrowMotion);
    };
  }, [pathname]);
}

function firstHref(entry: (typeof HEADER_NAV)[number]) {
  if (entry.type === "link") return entry.href;
  const walk = (items: readonly { href?: string; children?: readonly unknown[] }[]): string | undefined => {
    for (const item of items) {
      if (item.href) return item.href;
      if (item.children) { const found = walk(item.children as never); if (found) return found; }
    }
    return undefined;
  };
  return walk(entry.items as never) ?? "/";
}

function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  useEffect(() => { setMobileOpen(false); setDesktopMenu(null); }, [pathname]);
  return <header className={`header re-header${mobileOpen ? " active" : ""}`} onPointerLeave={() => setDesktopMenu(null)}>
    <div className="header-frame">
      <div className="header-logo"><Link className="header-logo-link re-header__logo" to={ROOT} aria-label="NOVERIQ 리뉴얼 홈"><Logo showMark={false} wordmarkClassName="re-wordmark" /></Link></div>
      <div className="header-nav"><div className="header-gnb"><nav className="gnb re-header__desktop" aria-label="주요 메뉴">{HEADER_NAV.map((entry) => entry.type === "link" ? <Link className="gnb-1d-link" key={entry.key} to={previewHref(entry.href)}>{entry.label}</Link> : <div className="gnb-1d-item re-nav-group" key={entry.key} data-open={desktopMenu === entry.key} onPointerEnter={() => setDesktopMenu(entry.key)} onFocusCapture={() => setDesktopMenu(entry.key)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDesktopMenu(null); }}><Link className="gnb-1d-link" to={previewHref(firstHref(entry))} aria-haspopup="true" aria-expanded={desktopMenu === entry.key} onKeyDown={(event) => { if (event.key === "Escape") { setDesktopMenu(null); event.currentTarget.blur(); } }}>{entry.label}<ChevronDown /></Link><div className="re-mega"><div className="re-mega__links">{entry.items.map((item) => <Link key={item.href} to={previewHref(item.href)}>{item.label}<ArrowUpRight /></Link>)}</div></div></div>)}</nav></div></div>
      <div className="header-feature"><Link className="header-bank-shortcut re-header__contact" to={`${ROOT}/contact`}>제작 문의<ArrowUpRight /></Link><span className="header-lang-select re-header__lang">KR</span><button className="header-mnb-button re-header__toggle" type="button" aria-expanded={mobileOpen} aria-controls="re-mobile-menu" onClick={() => setMobileOpen((open) => !open)}><span className="re-visually-hidden">메뉴 {mobileOpen ? "닫기" : "열기"}</span>{mobileOpen ? <X /> : <Menu />}</button></div>
    </div>
    <div id="re-mobile-menu" className="header-mnb re-mobile" aria-hidden={!mobileOpen}>{HEADER_NAV.map((entry) => entry.type === "link" ? <Link key={entry.key} to={previewHref(entry.href)}>{entry.label}</Link> : <details key={entry.key}><summary>{entry.label}<ChevronDown /></summary><div>{entry.items.map((item) => <Link key={item.href} to={previewHref(item.href)}>{item.label}</Link>)}</div></details>)}</div>
  </header>;
}

function Footer() { return <><div className="re-footer__gap" aria-hidden="true" /><div className="re-footer__top"><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>TOP<span aria-hidden="true">▲</span></button></div><footer className="re-footer"><div className="re-footer__panel"><div className="re-footer__explorer"><p>상담에서 오픈까지<br />함께 만듭니다</p><nav className="re-footer__nav" aria-label="푸터 메뉴">{HEADER_NAV.map((entry) => <div key={entry.key}><strong>{entry.label}</strong>{entry.type === "dropdown" && entry.items.slice(0, 5).map((item) => <Link key={item.href} to={previewHref(item.href)}>{item.label}</Link>)}</div>)}</nav></div><div className="re-footer__info"><Logo showMark={false} wordmarkClassName="re-wordmark" /><div className="re-footer__shortcuts"><Link to={`${ROOT}/contact`}>제작 문의</Link><Link to={`${ROOT}/faq`}>자주 묻는 질문</Link><a href={NAVER_BLOG_URL} target="_blank" rel="noreferrer">네이버 블로그</a></div><p className="re-footer__contactline"><a href={PHONE_TEL_HREF}>{PHONE_NUMBER}</a><small>© 2026 NOVERIQ</small></p><a className="re-footer__family" href={NAVER_BLOG_URL} target="_blank" rel="noreferrer">NOVERIQ 채널<span>+</span></a><div className="re-footer__socials"><a href={NAVER_BLOG_URL} target="_blank" rel="noreferrer" aria-label="네이버 블로그">N</a><a href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer" aria-label="카카오 채널">K</a></div></div></div></footer></>; }

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [slide, setSlide] = useState(0);
  const [slideTransitioning, setSlideTransitioning] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused || !inView) video.pause(); else void video.play().catch(() => undefined);
    video.closest(".greeting")?.classList.toggle("pause", paused || !inView);
  }, [paused, inView]);
  useEffect(() => {
    if (paused || !inView) return;
    let transitionTimer = 0;
    let autoplayTimer = 0;
    const advance = () => {
      setSlideTransitioning(true);
      setSlide((current) => (current + 1) % 2);
      transitionTimer = window.setTimeout(() => setSlideTransitioning(false), 1000);
      autoplayTimer = window.setTimeout(advance, 4000);
    };
    autoplayTimer = window.setTimeout(advance, 3000);
    return () => {
      window.clearTimeout(autoplayTimer);
      window.clearTimeout(transitionTimer);
      setSlideTransitioning(false);
    };
  }, [paused, inView]);
  return <>
    <div className="greeting-player">
      <video ref={videoRef} className="greeting-video" poster={MEDIA_SLOTS.hero} muted playsInline aria-hidden="true" />
      <div className="greeting-dim re-greeting__dim" />
      <div className="greeting-swiper re-greeting__slides" aria-live="polite">
        <div className="swiper">
          <div className="swiper-wrapper">
            <div className={`swiper-slide${slide === 0 ? " swiper-slide-active" : ""}`} style={{ transitionDuration: slideTransitioning ? "1000ms" : "0ms" }}><h1 className="greeting-slogan"><span>홈페이지 제작과</span><span>운영을 함께</span></h1></div>
            <div className={`swiper-slide${slide === 1 ? " swiper-slide-active" : ""}`} style={{ transform: "translate3d(-100%, 0, 0)", transitionDuration: slideTransitioning ? "1000ms" : "0ms" }}><p className="greeting-message">처음 상담부터<br />오픈 이후까지</p></div>
          </div>
        </div>
      </div>
    </div>
    <div className="greeting-controls"><button className="greeting-control re-greeting__control" type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>{paused ? "play" : "pause"}</button></div>
  </>;
}

function EditorialHome() {
  const projects = useMemo(() => FEATURED_SLUGS.map((slug) => SAMPLES.find((sample) => sample.slug === slug)).filter((sample): sample is NonNullable<typeof sample> => Boolean(sample?.image)), []);
  const storyItems = SCOPE_SCENES.slice(0, 3);
  return <main id="top" className="re-home">
    <section className="greeting re-greeting"><div className="greeting-frame re-greeting__frame"><HeroVideo /></div></section>
    <section id="scope" className="first re-first">
      <div className="first-intro re-first-intro init re-init">
        <h2 className="first-heading">첫번째<br />화면</h2>
        <div className="first-action re-first-intro__actions"><Link className="first-button" to={`${ROOT}/website/process`}>제작 방법</Link><Link className="first-button" to={`${ROOT}/website/features`}>기능 소개</Link><Link className="first-button" to={`${ROOT}/samples`}>제작 사례</Link></div>
        <figure className="first-docs"><img src={MEDIA_SLOTS.intro} alt="추후 교체할 이미지 영역" /></figure>
        <div className="first-lights re-first-lights" aria-hidden="true"><div className="first-light re-first-light"><i className="light-trail blue re-light-trail"><span className="light-trail-circle" /><span className="light-trail-circle" /><span className="light-trail-circle" /></i></div><div className="first-light-small re-first-light re-first-light--small"><i className="light-trail blue small reverse re-light-trail re-light-trail--small"><span className="light-trail-circle" /><span className="light-trail-circle" /><span className="light-trail-circle" /></i></div></div>
      </div>
      <div className="first-stories re-first-stories">{storyItems.map((scene, index) => <article className={`first-story type-${index + 1} re-first-story re-first-story--${index + 1} init re-init`} key={`${scene.no}-${scene.title}`}><div className="first-before re-first-story__before"><span className="first-year">{scene.no}</span><h3 className="first-title">{scene.title}<br /><span className="first-keyword">{scene.keyword}</span></h3></div><div className="first-after re-first-story__after"><p className="first-desc">{scene.text.split("\n").map((line, lineIndex) => <Fragment key={line}>{lineIndex > 0 && <br />}{line}</Fragment>)}</p></div><figure className="first-fixer"><img src={scene.image} alt={`${scene.title} 화면`} /></figure></article>)}</div>
    </section>
    <section className="now re-now init re-init" style={{ "--re-now-image": `url(${MEDIA_SLOTS.now})` } as CSSProperties}><div className="now-track re-now__track"><p className="now-heading re-now__heading">지금<br />우리는</p><div className="now-sticky re-now__sticky"><div className="now-frame re-now__frame"><div className="now-text re-now__text"><p className="now-step">지금 우리는</p><h2 className="now-title">오늘의 화면과<br />내일의 운영을<br className="mobile" /> 함께 만듭니다</h2></div><i className="now-dim re-now__dim" /><i className="now-edge-top re-now__edge re-now__edge--top" /><i className="now-edge-bottom re-now__edge re-now__edge--bottom" /></div></div></div></section>
    <section className="now-value re-now-value init re-init"><div className="now-value-frame re-now-value__frame"><ul className="now-value-list">{projects.slice(0, 3).map((project, index) => <li className="now-value-item" key={project.slug}><Link className={`now-value-card type-${index + 1}`} to={`${ROOT}/samples/${project.slug}`}><img src={MEDIA_SLOTS.values[index]} alt="" /><span className="now-value-text"><span className="now-value-title">{index === 0 ? "업종에 맞는 화면" : index === 1 ? "직접 다루는 관리자" : "PC와 모바일 검수"}</span><span className="now-value-desc">{index === 0 ? "메뉴와 콘텐츠를 업종에 맞춰 구성합니다" : index === 1 ? "게시물과 문의를 운영자가 관리합니다" : "각 화면의 순서와 이미지 잘림을 확인합니다"}</span></span></Link></li>)}</ul></div></section>
    <section className="latest re-latest"><div className="latest-frame re-latest__frame"><h2 className="latest-heading">오늘을 함께하는<br />제작 안내</h2><ul className="latest-list">{HOME_LATEST.map(([title, date]) => <li className="latest-item" key={title}><Link className="latest-link" to={`${ROOT}/website/process`}><span className="latest-category">제작안내</span><span className="latest-title re-latest__title"><span className="latest-title-text">{title}</span><span className="latest-date">{date}</span></span></Link></li>)}</ul></div></section>
    <div className="tomorrow re-tomorrow init re-init"><i className="tomorrow-glow type-1 re-tomorrow__glow" /><i className="tomorrow-glow type-2 re-tomorrow__glow re-tomorrow__glow--right" /><section className="tomorrow-frame re-tomorrow__frame"><h2 className="tomorrow-heading">오픈<br />이후</h2><p className="tomorrow-message">오픈 뒤에도<br className="mobile" /> 내용을 바꾸고<br />운영하는 하루까지<br className="mobile" /> 함께합니다</p><ul className="tomorrow-list">{projects.slice(3, 6).map((project, index) => <li className="tomorrow-item" key={project.slug}><Link className={`tomorrow-link type-${index + 1}`} to={`${ROOT}/samples/${project.slug}`}><span className="tomorrow-title">{index === 0 ? "반응형 제작" : index === 1 ? "콘텐츠 관리" : "문의·예약"}</span><span className="tomorrow-desc">{index === 0 ? <>기기마다 화면을 다시 맞추고<br />터치하기 쉽게 만듭니다</> : index === 1 ? <>공지와 사례를 직접 올리고<br />오픈 뒤에도 내용을 바꿉니다</> : <>문의와 예약을 한곳에 모아<br />접수 순서대로 확인합니다</>}</span><span className="tomorrow-image"><img src={MEDIA_SLOTS.tomorrow[index]} alt="" /></span></Link></li>)}</ul></section><section className="recruit re-recruit"><p className="recruit-category">제작 문의</p><h2 className="recruit-heading">필요한 페이지와 기능을<br />상담에서 확인합니다</h2><div className="recruit-action"><Link className="recruit-link" to={`${ROOT}/contact`}>제작 상담</Link><Link className="recruit-link" to={`${ROOT}/samples`}>제작 사례</Link></div></section></div>
  </main>;
}

function PageInfo({ category, title }: { category: string; title: string }) { return <div className="re-page-info"><div className="re-page-align"><p className="re-page-category">{category}</p><h1 className="re-page-heading">{title}</h1></div></div>; }
function SubHero({ step, title, image }: { step: string; title: ReactNode; image: string }) { return <div className="re-hero re-hero--single"><div className="re-hero__sticky"><div className="re-hero__frame"><img src={image} alt="" /><div className="re-hero__dim" /><i className="re-hero__edge" /><div className="re-hero__single"><h2 className="re-hero__step">{step}</h2><p className="re-hero__title">{title}</p></div></div></div></div>; }
function Section({ title, children, wide, split }: { title?: string; children: ReactNode; wide?: boolean; split?: boolean }) { return <section className={["re-section", wide ? "re-section--wide" : "", split ? "re-section--split" : ""].filter(Boolean).join(" ")} data-reveal>{title && <h2 className="re-section__h2">{title}</h2>}{split ? <div className="re-section__body">{children}</div> : children}</section>; }
function Contents({ children }: { children: ReactNode }) { return <div className="re-contents">{children}</div>; }
function LocalNav({ group, path }: { group: keyof typeof LOCAL_GROUPS; path: string }) { return <nav className="re-local-nav" aria-label={`${group} 하위 메뉴`}>{LOCAL_GROUPS[group].map(([label, href]) => <Link key={href} to={previewHref(href)} aria-current={path === href ? "page" : undefined}>{label}</Link>)}</nav>; }
function Pagination({ total, current, onSelect }: { total: number; current: number; onSelect: (page: number) => void }) {
  const start = Math.max(0, Math.min(current - 3, total - 5));
  const pages = Array.from({ length: total }, (_, index) => index + 1).slice(start, start + 5);
  return <nav className="re-pagination" aria-label="페이지 이동"><ul className="re-pagination__list">{pages.map((page) => <li key={page} className="re-pagination__page"><button type="button" aria-current={page === current ? "page" : undefined} onClick={() => onSelect(page)}>{page}</button></li>)}<li className="re-pagination__page re-pagination__page--next"><button type="button" aria-label="다음 페이지" disabled={current >= total} onClick={() => onSelect(current + 1)}><ArrowRight /></button></li></ul></nav>;
}
function BoardSearch({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) { return <div className="re-board-util"><div className="re-board-search"><label className="re-blind" htmlFor="re-board-keyword">{label}</label><input id="re-board-keyword" value={value} placeholder="검색어를 입력하세요" onChange={(event) => onChange(event.target.value)} /><button type="button" aria-label="검색"><Search /></button></div></div>; }
function DetailArticle({ category, title, date, children, listHref, prev, next }: { category: string; title: string; date?: string; children: ReactNode; listHref: string; prev?: { label: string; href: string }; next?: { label: string; href: string } }) {
  return <article className="re-detail"><header className="re-detail__meta"><p>{category}</p><h2>{title}</h2>{date && <time>{date}</time>}</header><div className="re-detail__post">{children}</div><nav className="re-detail__nav">{prev ? <Link to={prev.href}><span>이전</span><b>{prev.label}</b></Link> : <p><span>이전</span><b>이전 글이 없습니다</b></p>}{next ? <Link to={next.href}><span>다음</span><b>{next.label}</b></Link> : <p><span>다음</span><b>다음 글이 없습니다</b></p>}</nav><div className="re-detail__action"><Link to={listHref}>목록</Link></div></article>;
}
function ContactBand() { return <Section wide><div className="re-contact-band"><p>제작할 페이지와 기능을 알려주세요</p><h3>견적과 진행 순서를 안내해 드립니다</h3><div><a href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer">카카오톡 문의<ArrowUpRight /></a><a href={PHONE_TEL_HREF}>전화 문의<ArrowUpRight /></a></div></div></Section>; }
function PageSections({ page }: { page: ContentPage }) { return <>{page.sections.map((section) => <Section key={section.title} split title={section.title}><div className="re-step-body"><p className="re-step-text">{section.text}</p><ul className="re-step-list">{section.points.map((point) => <li key={point}><Check />{point}</li>)}</ul></div></Section>)}</>; }

function StandardPage({ page, path }: { page: ContentPage; path: string }) {
  if (path === "/website/price") return <PriceDetail page={page} path={path} />;
  const group = page.group as keyof typeof LOCAL_GROUPS;
  return <main className="re-sub-page"><PageInfo category={page.group} title={page.title} /><SubHero step={page.eyebrow} title={page.intro} image={page.image} /><Contents><LocalNav group={group} path={path} /><PageSections page={page} /><ContactBand /></Contents></main>;
}

function PriceDetail({ page, path }: { page: ContentPage; path: string }) {
  return <main className="re-sub-page"><PageInfo category={page.group} title={page.title} /><Contents><LocalNav group="홈페이지 제작" path={path} /><Section split title="제작 방식별 비용"><div className="re-price-packages">{TEMPLATE_PACKAGES.map((item) => <div className="re-price-card" key={item.key}><p>{item.badge ?? "홈페이지 제작"}</p><h3>{item.label}</h3><span>{item.desc}</span><strong>{formatMan(item.total)}<small>부터</small></strong></div>)}</div><p className="re-price-note">모든 금액은 부가세 별도이며 필요한 범위에 따라 달라집니다</p></Section><Section split title="포함 항목 비교"><div className="re-price-table"><div><strong>포함 항목</strong>{TEMPLATE_PACKAGES.map((item) => <span key={item.key}>{item.label}</span>)}</div>{PRICING_ROWS.map((row) => <div key={row.label}><strong>{row.label}<small>{row.note}</small></strong>{row.values.map((value, index) => <span key={`${row.label}-${TEMPLATE_PACKAGES[index].key}`}>{value}</span>)}</div>)}<div><strong>제작 기간</strong>{TEMPLATE_PACKAGES.map((item) => <span key={item.key}>{PRODUCTION_PERIOD}</span>)}</div></div></Section><Section split title="프리미엄 디자인"><div className="re-premium-price"><h3>300만원부터</h3><span>메뉴 구성, 화면 디자인, 스크롤 연출과 관리자 기능을 새로 설계합니다</span><Link to={`${ROOT}/web-solutions`}>프리미엄 사례 보기<ArrowRight /></Link></div></Section><ContactBand /></Contents></main>;
}

const BOARD_PAGE_SIZE = 10;
function useBoardPage<T>(items: T[]) {
  const [page, setPage] = useState(1);
  const total = Math.max(1, Math.ceil(items.length / BOARD_PAGE_SIZE));
  const safe = Math.min(page, total);
  return { page: safe, total, setPage, slice: items.slice((safe - 1) * BOARD_PAGE_SIZE, safe * BOARD_PAGE_SIZE) };
}

function CatalogPage({ mode }: { mode: "templates" | "premium" }) {
  const { search } = useLocation(); const query = new URLSearchParams(search); const style = query.get("style"); const industry = query.get("industry");
  const [keyword, setKeyword] = useState("");
  const source = mode === "premium" ? getPremiumDesigns().map((item) => item.sample) : SAMPLES;
  const items = source.filter((sample) => (!style || sample.type.includes(style)) && (!industry || sample.industryKey === industry) && sample.image && (sample.industry + sample.tag).toLowerCase().includes(keyword.trim().toLowerCase()));
  const board = useBoardPage(items);
  const title = mode === "premium" ? "프리미엄 디자인" : "디자인 템플릿";
  const groupTitle = mode === "premium" ? "전체 디자인" : style === "basic-template" ? "기본형 템플릿" : style === "landing-template" ? "랜딩형 템플릿" : "전체 템플릿";
  return <main className="re-sub-page"><PageInfo category="디자인" title={title} /><Contents><Section wide title={groupTitle}><BoardSearch value={keyword} onChange={(value) => { setKeyword(value); board.setPage(1); }} label={`${title} 검색`} />{mode === "templates" && <nav className="re-board-filter" aria-label="제작 방식"><Link to={`${ROOT}/templates`} aria-current={!style ? "page" : undefined}>전체</Link><Link to={`${ROOT}/templates?style=basic-template`} aria-current={style === "basic-template" ? "page" : undefined}>기본형</Link><Link to={`${ROOT}/templates?style=landing-template`} aria-current={style === "landing-template" ? "page" : undefined}>랜딩형</Link></nav>}<ul className="re-cards">{board.slice.map((sample) => <li className="re-cards__item" key={sample.slug}><Link to={`${ROOT}/samples/${sample.slug}`}><figure><img src={sample.image} alt="" loading="lazy" /></figure><span className="re-cards__subject">{sample.premiumLabel ?? sample.industry}</span></Link></li>)}</ul>{items.length === 0 && <p className="re-board__state">해당 조건의 디자인이 없습니다</p>}<Pagination total={board.total} current={board.page} onSelect={board.setPage} /></Section></Contents></main>;
}

function PortfolioPage() {
  const [keyword, setKeyword] = useState("");
  const items = SAMPLES.filter((sample) => sample.image && (sample.industry + (sample.tag ?? "")).toLowerCase().includes(keyword.trim().toLowerCase()));
  const board = useBoardPage(items);
  return <main className="re-sub-page"><PageInfo category="포트폴리오" title="제작 사례" /><Contents><Section wide title="전체 사례"><BoardSearch value={keyword} onChange={(value) => { setKeyword(value); board.setPage(1); }} label="제작 사례 검색" /><ul className="re-cards">{board.slice.map((sample) => <li className="re-cards__item" key={sample.slug}><Link to={`${ROOT}/samples/${sample.slug}`}><figure><img src={sample.image} alt="" loading="lazy" /></figure><span className="re-cards__subject">{sample.premiumLabel ?? sample.industry}</span></Link></li>)}</ul>{items.length === 0 && <p className="re-board__state">검색 결과가 없습니다</p>}<Pagination total={board.total} current={board.page} onSelect={board.setPage} /></Section></Contents></main>;
}

function SampleDetail({ slug }: { slug: string }) {
  const list = SAMPLES.filter((item) => item.image);
  const index = list.findIndex((item) => item.slug === slug);
  const sample = list[index]; if (!sample) return <NotFound />;
  const prev = list[index - 1]; const next = list[index + 1];
  const related = list.filter((item) => item.slug !== sample.slug && item.industryKey === sample.industryKey).slice(0, 3);
  return <main className="re-sub-page"><PageInfo category="제작 사례" title={sample.premiumLabel ?? sample.industry} /><Contents><Section wide><DetailArticle category={sample.designCode ?? "NOVERIQ"} title={sample.title} listHref={`${ROOT}/samples`} prev={prev && { label: prev.premiumLabel ?? prev.industry, href: `${ROOT}/samples/${prev.slug}` }} next={next && { label: next.premiumLabel ?? next.industry, href: `${ROOT}/samples/${next.slug}` }}>
    <figure className="re-detail__figure"><img src={sample.image} alt={`${sample.industry} 홈페이지 미리보기`} /></figure>
    <p>{sample.purpose}</p>
    <dl className="re-detail__spec"><div><dt>제작 유형</dt><dd>{sample.type.join(" · ")}</dd></div><div><dt>추천 업종</dt><dd>{sample.idealFor}</dd></div>{sample.designCode && <div><dt>디자인 코드</dt><dd>{sample.designCode}</dd></div>}</dl>
    <h3>포함된 화면과 기능</h3><ol className="re-detail__features">{sample.features.map((feature) => <li key={feature}>{feature}</li>)}</ol>
    {sample.liveUrl && <p className="re-detail__live"><a href={sample.liveUrl} target="_blank" rel="noreferrer">실제 화면 보기<ArrowUpRight /></a></p>}
    {related.length > 0 && <><h3>같은 업종의 다른 화면</h3><ul className="re-detail__related">{related.map((item) => <li key={item.slug}><Link to={`${ROOT}/samples/${item.slug}`}><img src={item.image} alt="" loading="lazy" /><span>{item.premiumLabel ?? item.industry}</span></Link></li>)}</ul></>}
  </DetailArticle></Section><ContactBand /></Contents></main>;
}

function ContactPage() {
  const openKakao = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); window.open(KAKAO_CHANNEL_URL, "_blank", "noopener,noreferrer"); };
  return <main className="re-sub-page"><PageInfo category="고객센터" title="문의하기" /><Contents><LocalNav group="고객센터" path="/contact" /><Section split title="제작 상담 신청"><p className="re-form-guide">입력값은 자동으로 전송되지 않습니다. 버튼을 누르면 카카오톡 문의 창이 열립니다. 상호, 연락처, 필요한 메뉴, 참고 사이트와 준비된 자료를 함께 알려주시면 상담이 빠릅니다</p><form className="re-form" onSubmit={openKakao}><div><label htmlFor="re-name">이름 또는 상호</label><input id="re-name" name="name" required /></div><div><label htmlFor="re-phone">연락처</label><input id="re-phone" name="phone" type="tel" required /></div><div className="re-form__wide"><label htmlFor="re-site">참고 사이트</label><input id="re-site" name="site" type="url" placeholder="https://" /></div><div className="re-form__wide"><label htmlFor="re-message">문의 내용</label><textarea id="re-message" name="message" rows={8} required /></div><label className="re-form__consent"><input type="checkbox" required /><span>상담을 위해 입력한 내용을 확인했습니다</span></label><button type="submit">입력 후 카카오톡 문의 열기<ArrowUpRight /></button></form></Section><Section split title="바로 연결"><div className="re-contact-direct"><a href={PHONE_TEL_HREF}>전화 문의 <b>{PHONE_NUMBER}</b><ArrowUpRight /></a><a href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer">카카오톡 채널<ArrowUpRight /></a></div></Section></Contents></main>;
}

function NoticesPage() {
  const [keyword, setKeyword] = useState("");
  const { data, isLoading, error } = useQuery({ queryKey: ["notices", "published"], queryFn: listPublishedNotices });
  const notices = (data ?? []).filter((notice) => notice.title.toLowerCase().includes(keyword.trim().toLowerCase()));
  const board = useBoardPage(notices);
  return <main className="re-sub-page"><PageInfo category="고객센터" title="공지사항" /><Contents><LocalNav group="고객센터" path="/notices" /><Section wide><BoardSearch value={keyword} onChange={(value) => { setKeyword(value); board.setPage(1); }} label="공지사항 검색" /><div className="re-board"><ul className="re-board__list">{board.slice.map((notice) => <li className="re-board__item" key={notice.id}><Link to={`${ROOT}/notices/${notice.id}`}><span className="re-board__body"><small>{notice.is_pinned ? "공지" : notice.category || "안내"}</small><strong>{notice.title}</strong></span><time>{new Date(notice.created_at).toLocaleDateString("ko-KR")}</time></Link></li>)}</ul></div>{isLoading && <p className="re-board__state">공지사항을 불러오는 중입니다</p>}{error && <p className="re-board__state">공지사항을 불러오지 못했습니다</p>}{!isLoading && !error && notices.length === 0 && <p className="re-board__state">등록된 공지사항이 없습니다</p>}<Pagination total={board.total} current={board.page} onSelect={board.setPage} /></Section></Contents></main>;
}

function NoticeDetailPage({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery({ queryKey: ["notice", id], queryFn: () => getNotice(id), enabled: Boolean(id) });
  return <main className="re-sub-page"><PageInfo category="고객센터" title="공지사항" /><Contents><LocalNav group="고객센터" path="/notices" /><Section wide>{isLoading && <p className="re-board__state">공지사항을 불러오는 중입니다</p>}{(error || (!isLoading && !data)) && <p className="re-board__state">공지사항을 찾을 수 없습니다</p>}{data && <DetailArticle category={data.category || "공지"} title={data.title} date={new Date(data.created_at).toLocaleDateString("ko-KR")} listHref={`${ROOT}/notices`}>{data.content}</DetailArticle>}</Section></Contents></main>;
}

function FaqPage() {
  const [keyword, setKeyword] = useState("");
  const items = FAQ.filter((item) => (item.question + item.answer).toLowerCase().includes(keyword.trim().toLowerCase()));
  return <main className="re-sub-page"><PageInfo category="고객센터" title="자주 묻는 질문" /><Contents><LocalNav group="고객센터" path="/faq" /><Section split title="질문 찾기"><BoardSearch value={keyword} onChange={setKeyword} label="자주 묻는 질문 검색" /><div className="re-faq">{items.map((item) => <details key={item.question}><summary><span>Q</span><strong>{item.question}</strong><i /></summary><div><span>A</span><p>{item.answer}</p></div></details>)}</div>{items.length === 0 && <p className="re-board__state">검색 결과가 없습니다</p>}</Section><ContactBand /></Contents></main>;
}

function NotFound() { return <main className="re-sub-page"><PageInfo category="NOVERIQ" title="페이지를 찾을 수 없습니다" /><Contents><Section><p className="re-step-text">주소가 바뀌었거나 삭제된 페이지입니다</p><p className="re-detail__live"><Link to={ROOT}>메인으로 돌아가기<ArrowRight /></Link></p></Section></Contents></main>; }

function RouteContent({ path }: { path: string }) {
  if (path === "/") return <EditorialHome />;
  if (path === "/web-solutions") return <CatalogPage mode="premium" />;
  if (path === "/templates") return <CatalogPage mode="templates" />;
  if (path === "/samples") return <PortfolioPage />;
  if (path.startsWith("/samples/")) return <SampleDetail slug={path.split("/")[2]} />;
  if (path === "/contact") return <ContactPage />;
  if (path === "/notices") return <NoticesPage />;
  if (path.startsWith("/notices/")) return <NoticeDetailPage id={path.split("/")[2]} />;
  if (path === "/faq") return <FaqPage />;
  const key = Object.entries({ "/website/process": "process", "/website/price": "price", "/website/features": "features", "/website/maintenance": "maintenance", "/services/custom": "custom", "/services/admin-system": "admin-system", "/services/inquiry-reservation": "inquiry-reservation", "/services/search-filter": "search-filter", "/services/content-management": "content-management", "/services/database-api": "database-api", "/services/responsive": "responsive", "/services/seo": "seo" }).find(([route]) => route === path)?.[1] as PageKey | undefined;
  return key ? <StandardPage page={PAGE_DATA[key]} path={path} /> : <NotFound />;
}

export default function RenewalEditorial() {
  const { pathname } = useLocation(); const path = pathFromLocation(pathname); useEditorialMotion(pathname);
  useEffect(() => { const label = path === "/" ? "홈페이지 제작" : path.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ") ?? "홈페이지 제작"; document.title = `NOVERIQ · ${label}`; }, [path]);
  return <div className="renewal-editorial"><Header /><RouteContent path={path} /><Footer /></div>;
}
