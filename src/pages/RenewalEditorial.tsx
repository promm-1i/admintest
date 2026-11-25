import { Fragment, Suspense, createContext, lazy, useContext, useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useLocation, useNavigationType, useSearchParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, HelpCircle, Menu, Receipt, Route as RouteIcon, Search, X } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { MAIN_NAV, isStaticPage, type MainNavEntry } from "@/components/site/navData";
import { getNotice, listPublishedNotices } from "@/lib/api/notices";
import { FAQ } from "@/lib/faq";
import { KAKAO_CHANNEL_URL, NAVER_BLOG_URL, PHONE_NUMBER, PHONE_TEL_HREF } from "@/lib/contact";
const CONTACT_EMAIL = "6gsmake@gmail.com";
import { INDUSTRY_SHOWCASES } from "@/components/site/industryShowcase";
import { searchSite, type SearchHit } from "@/lib/siteSearch";
import { PAGE_EXTRAS, type ExtraBlock } from "@/lib/renewalExtras";
import { usePageTitle } from "@/hooks/usePageTitle";
// 커스텀 개발의 호버 영상 카드 4개. 라우트를 리뉴얼 본문으로 돌리면서 화면에서 사라졌던 것을 되살린다.
/**
 * 서비스 상세 8쪽의 알맹이. 리뉴얼로 갈아엎으면서 데모 절들이 통째로 빠져
 * 관리자 시스템만 4,579자 → 1,184자가 됐다. 그 본문을 그대로 다시 쓴다.
 * 리뉴얼 쪽에서는 제목블록·스크롤 히어로·하위메뉴를 이미 그리므로
 * 레거시 쪽이 들고 있는 큰 제목(h1)만 CSS 로 감춘다.
 */
const LEGACY_SERVICE_BODY: Record<string, ReturnType<typeof lazy>> = {
  custom: lazy(() => import("@/pages/services/CustomDevService")),
  "admin-system": lazy(() => import("@/pages/services/AdminSystemService")),
  "inquiry-reservation": lazy(() => import("@/pages/services/InquiryReservationService")),
  "search-filter": lazy(() => import("@/pages/services/SearchFilterService")),
  "content-management": lazy(() => import("@/pages/services/ContentManagementService")),
  "database-api": lazy(() => import("@/pages/services/DatabaseApiService")),
  responsive: lazy(() => import("@/pages/services/ResponsiveService")),
  seo: lazy(() => import("@/pages/services/SeoService")),
};

const CustomBuildPreviewSection = lazy(() => import("@/components/sections/CustomBuildPreviewSection").then((m) => ({ default: m.CustomBuildPreviewSection })));
import { WEBSITE_PACKAGES, formatMan } from "@/lib/templatePackages";
import { PricingComparison } from "@/components/site/PricingComparison";
import "./RenewalEditorial.css";

const PREVIEW_ROOT = "/renewal-editorial";
// 같은 껍데기를 시안 경로(/renewal-editorial)와 본 사이트 루트("") 양쪽에서 쓴다
const RootContext = createContext(PREVIEW_ROOT);
const useRoot = () => useContext(RootContext);
const MEDIA = "/renewal-editorial/media";
// 서브페이지는 쪽마다 다른 사진을 쓴다. 새 사진이 오면 해당 줄의 파일명만 바꾸면 된다.
/**
 * 서브 히어로 사진. 2026-09-23 부터 쪽 내용에 맞춰 새로 만든 사진(photos/<이름>-wide.webp)을 쓴다.
 * 기존 sub-*.webp 는 범용 이미지였다. 제작 비용 쪽은 사진 판이 없어 값만 채워 둔다.
 */
const PHOTOS = "/renewal-editorial/photos";
const SUBPAGE_MEDIA: Record<PageKey, string> = {
  process: `${PHOTOS}/process-wide.webp`,
  price: `${PHOTOS}/process-wide.webp`,
  features: `${PHOTOS}/features-wide.webp`,
  maintenance: `${PHOTOS}/maintenance-wide.webp`,
  custom: `${PHOTOS}/custom-wide.webp`,
  "admin-system": `${PHOTOS}/admin-wide.webp`,
  "inquiry-reservation": `${PHOTOS}/inquiry-wide.webp`,
  "search-filter": `${PHOTOS}/search-wide.webp`,
  "content-management": `${PHOTOS}/content-wide.webp`,
  "database-api": `${PHOTOS}/database-wide.webp`,
  responsive: `${PHOTOS}/responsive-wide.webp`,
  seo: `${PHOTOS}/seo-wide.webp`,
};
const MEDIA_SLOTS = {
  hero: `${MEDIA}/hero.webp`,
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
  "search-filter": { eyebrow: "SEARCH & FILTER", title: "검색 · 필터 기능", intro: "매물, 제품과 게시물이 많을 때 방문자가 조건을 골라 원하는 항목을 찾습니다", group: "기술력", image: SUBPAGE_MEDIA["search-filter"], sections: [
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
  responsive: { eyebrow: "RESPONSIVE WEB", title: "반응형 웹 제작", intro: "태블릿과 모바일에서 읽는 순서를 PC와 따로 맞춥니다", group: "기술력", image: SUBPAGE_MEDIA["responsive"], sections: [
    { title: "기기마다 다른 화면", text: "글과 사진 폭을 기기에 맞춰 옆으로 밀리지 않게 합니다", points: ["PC", "태블릿", "모바일"] },
    { title: "메뉴와 터치", text: "모바일 메뉴, 버튼 크기와 손가락으로 누르는 영역을 확인합니다", points: ["모바일 메뉴", "터치 영역", "고정 버튼"] },
    { title: "이미지와 글", text: "사진 잘림과 글자 크기를 화면 비율에 맞춰 따로 설정합니다", points: ["이미지 크롭", "줄바꿈", "읽기 순서"] },
  ] },
  seo: { eyebrow: "SEARCH ENGINE", title: "검색엔진 최적화", intro: "검색 결과에 필요한 제목, 설명과 페이지 구조를 기본 설정합니다", group: "기술력", image: SUBPAGE_MEDIA["seo"], sections: [
    { title: "페이지 정보", text: "페이지마다 검색 결과에 표시할 제목과 설명을 작성합니다", points: ["페이지 제목", "설명", "공유 이미지"] },
    { title: "문서 구조", text: "제목 단계, 링크와 이미지 설명을 검색 로봇이 읽기 좋게 정리합니다", points: ["제목 단계", "대체 텍스트", "내부 링크"] },
    { title: "검색 등록", text: "사이트맵과 검색 도구 연결에 필요한 기본 파일을 준비합니다", points: ["사이트맵", "robots.txt", "검색 도구 연결"] },
  ] },
};

const LOCAL_GROUPS = {
  "홈페이지 제작": [["제작 방법", "/website/process"], ["제작 비용", "/website/price"], ["기능 소개", "/website/features"], ["유지보수", "/website/maintenance"]],
  기술력: [["커스텀 개발", "/services/custom"], ["관리자 시스템", "/services/admin-system"], ["문의 · 예약 관리", "/services/inquiry-reservation"], ["검색 · 필터 기능", "/services/search-filter"], ["콘텐츠 관리", "/services/content-management"], ["DB · API 연동", "/services/database-api"], ["반응형 웹 제작", "/services/responsive"], ["검색엔진 최적화", "/services/seo"]],
  고객센터: [["문의하기", "/contact"], ["공지사항", "/notices"], ["자주 묻는 질문", "/faq"]],
} as const;

function hrefIn(root: string, href: string) { return /^(https?:|tel:|mailto:|#)/.test(href) || isStaticPage(href) ? href : `${root}${href}`; }
function pathFromLocation(pathname: string, root: string) { const value = pathname.slice(root.length) || "/"; return value.startsWith("/") ? value : `/${value}`; }

function useEditorialMotion(pathname: string) {
  const navType = useNavigationType();
  useEffect(() => {
    // 뒤로·앞으로 가기는 ScrollToTop 이 보던 위치로 되돌린다 — 여기서 맨 위로 올리면 그걸 덮는다
    if (navType !== "POP") {
      if (window.location.hash) requestAnimationFrame(() => document.querySelector(window.location.hash)?.scrollIntoView()); else window.scrollTo(0, 0);
    }
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

function SiteSearch() {
  const root = useRoot();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const hits: SearchHit[] = query.trim() ? searchSite(query) : [];
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => {
    // 어디서든 / 를 누르면 검색이 열린다
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (event.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") { event.preventDefault(); setOpen(true); }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return <>
    <button type="button" className="re-search__open" aria-label="사이트 검색 열기" onClick={() => setOpen(true)}><Search /></button>
    {open && <div className="re-search" role="dialog" aria-modal="true" aria-label="사이트 검색">
      <button type="button" className="re-search__dim" aria-label="검색 닫기" onClick={() => setOpen(false)} />
      <div className="re-search__panel">
        <div className="re-search__field">
          <Search />
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="업종, 기능, 디자인 이름으로 찾기" aria-label="검색어" />
          <button type="button" onClick={() => setOpen(false)} aria-label="닫기"><X /></button>
        </div>
        {query.trim() === "" ? (
          <p className="re-search__hint">예를 들어 카페, 예약, 관리자, 부동산처럼 넣어 보세요. 디자인 150여 종과 안내 쪽을 함께 찾습니다.</p>
        ) : hits.length === 0 ? (
          <p className="re-search__hint">찾는 것이 없습니다. 다른 낱말로 해 보시거나 <Link to={`${root}/contact`} onClick={() => setOpen(false)}>문의</Link>해 주세요.</p>
        ) : (
          <ul className="re-search__list">{hits.map((hit) => <li key={hit.href + hit.title}>
            <Link to={hrefIn(root, hit.href)} onClick={() => setOpen(false)}>
              {hit.image && <img src={hit.image} alt="" loading="lazy" />}
              <span><small>{hit.kind}{hit.code ? ` · ${hit.code}` : ""}</small><strong>{hit.title}</strong><em>{hit.desc}</em></span>
            </Link>
          </li>)}</ul>
        )}
      </div>
    </div>}
  </>;
}

/* 맨 아래 채널 아이콘. 글자 한 자로는 무엇인지 알 수 없어 실제 마크를 그린다. */
function NaverBlogMark() {
  return <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
    <rect width="24" height="24" rx="7" fill="#03C75A" />
    <path fill="#fff" d="M7.6 7.4h2.05l2.62 4.02V7.4h2.02v9.2h-2.04l-2.63-4.02v4.02H7.6z" />
  </svg>;
}

function KakaoMark() {
  return <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
    <rect width="24" height="24" rx="7" fill="#FEE500" />
    <path fill="#191600" d="M12 5.4c-3.75 0-6.8 2.4-6.8 5.36 0 1.9 1.26 3.57 3.16 4.5l-.8 2.95c-.07.25.21.45.43.3l3.5-2.32c.17.01.34.02.51.02 3.76 0 6.8-2.4 6.8-5.45 0-2.96-3.04-5.36-6.8-5.36z" />
  </svg>;
}

/**
 * 홈 "제작 사례" · "도움 되는 정보" 두 칸.
 * NHN Cloud 메인에서 실측한 값을 그대로 쓴다 (2026-09-21 측정).
 *   컨테이너 1280 / 제목 40px·700·lh56 / 설명 18px·400·lh28 #51565f
 *   사례 카드 320x411, 간격 20, 로고 상자 320x220 라운드 12 테두리 1px #e2e5eb, 사진 318x145
 *   사례 제목 20px·700·lh30 / 설명 17px·400·lh26 #51565f
 *   알약 버튼 186x48 라운드 30 #125de6, 17px·500 흰 글자
 *   정보 카드 308x308 라운드 12, 간격 16, 안쪽 여백 32, 제목 24px·700·lh34, 설명 17px·500·lh26
 *   정보 카드 배경 #f6f4ff · #f4f8ff · #f2f9f2 · #f3f4f6
 */
const HELP_CARDS = [
  { title: "제작 방법", desc: "상담에서 오픈까지\n무엇을 언제 하는지", href: "/website/process", tone: "a", Icon: RouteIcon },
  { title: "제작 비용", desc: "형태와 구성별로\n정해진 금액 보기", href: "/website/price", tone: "b", Icon: Receipt },
  { title: "자주 묻는 질문", desc: "비용 · 기간 · 관리자 기능에\n대한 답", href: "/faq", tone: "d", Icon: HelpCircle },
] as const;

function HomeHelp() {
  const root = useRoot();
  return <section className="re-nhn re-nhn--help">
    <div className="re-nhn__frame">
      <h2 className="re-nhn__heading">홈페이지 제작</h2>
      <p className="re-nhn__lead">소상공인 · 기업 홈페이지를 만듭니다. 비용은 형태와 구성별로 정해져 있습니다.</p>
      <ul className="re-help-list">{HELP_CARDS.map((card) => <li className={`re-help re-help--${card.tone}`} key={card.title}>
        <Link to={`${root}${card.href}`}>
          <h3>{card.title}</h3>
          <p>{card.desc}</p>
          <ArrowRight className="re-help__go" aria-hidden="true" />
          <card.Icon className="re-help__mark" aria-hidden="true" />
        </Link>
      </li>)}</ul>
    </div>
  </section>;
}

function Header() {
  const root = useRoot();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [groupKey, setGroupKey] = useState<string | null>(null);
  // 좁은 폭(768~1023)에서는 손가락으로 고르는 2단 드로어를 쓴다
  const [drawerKey, setDrawerKey] = useState<string>(MAIN_NAV[0].key);
  // Escape 로 닫은 뒤 트리거로 초점을 되돌리면 focus 가 다시 열어 버린다. 그 한 번만 막는다.
  const justClosed = useRef(false);
  const openEntry = (item: MainNavEntry) => { if (justClosed.current) return; setOpenKey(item.key); setGroupKey(item.groups[0]?.key ?? null); };
  const closeMenu = (trigger?: HTMLElement | null) => { justClosed.current = true; setOpenKey(null); trigger?.focus(); setTimeout(() => { justClosed.current = false; }, 80); };
  useEffect(() => { setMobileOpen(false); setOpenKey(null); }, [pathname]);
  const entry = MAIN_NAV.find((item) => item.key === openKey) ?? null;
  const group = entry ? (entry.groups.find((item) => item.key === groupKey) ?? entry.groups[0]) : null;
  return <header className={`header re-header${mobileOpen ? " active" : ""}`} onPointerLeave={() => setOpenKey(null)}
    onKeyDown={(event) => { if (event.key === "Escape" && openKey) closeMenu(event.currentTarget.querySelector(".gnb-1d-link") as HTMLElement | null); }}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenKey(null); }}>
    <a className="re-skip" href="#re-main">본문 바로가기</a>
    <div className="header-frame">
      <div className="header-logo"><Link className="header-logo-link re-header__logo" to={root} aria-label="NOVERIQ 홈"><Logo showMark={false} wordmarkClassName="re-wordmark" /></Link></div>
      <div className="header-nav"><div className="header-gnb"><nav className="gnb re-header__desktop" data-open={!!openKey} aria-label="주요 메뉴">
        {MAIN_NAV.map((item) => <Link key={item.key} className="gnb-1d-link" to={hrefIn(root, item.href)} data-active={openKey === item.key}
          aria-haspopup="true" aria-expanded={openKey === item.key}
          onPointerEnter={() => openEntry(item)} onFocus={() => openEntry(item)}
          onKeyDown={(event) => { if (event.key === "Escape") closeMenu(event.currentTarget); }}>{item.label}</Link>)}
      </nav></div></div>
      <div className="header-feature"><SiteSearch /><Link className="header-bank-shortcut re-header__contact" to={`${root}/contact`}>제작 문의<ArrowRight /></Link><span className="header-lang-select re-header__lang">KR</span><button className="header-mnb-button re-header__toggle" type="button" aria-expanded={mobileOpen} aria-controls="re-mobile-menu" onClick={() => setMobileOpen((open) => !open)}><span className="re-visually-hidden">메뉴 {mobileOpen ? "닫기" : "열기"}</span>{mobileOpen ? <X /> : <Menu />}</button></div>
    </div>
    {/* 펼침판 — 왼쪽 중메뉴 · 오른쪽 소메뉴. 여는 값은 기존 그대로(opacity .2s / max-height .3s) */}
    <div className="re-mega2" data-open={!!entry} aria-hidden={!entry}>
      {entry && group && <div className="re-mega2__frame">
        <div className="re-mega2__aside">
          <ul className="re-mega2__groups">{entry.groups.map((item) => <li key={item.key}>
            <Link to={hrefIn(root, item.href)} data-active={item.key === group.key}
              onPointerEnter={() => setGroupKey(item.key)} onFocus={() => setGroupKey(item.key)}>{item.label}</Link>
          </li>)}</ul>
          <Link className="re-mega2__all" to={hrefIn(root, entry.href)}>전체 목록 보기</Link>
        </div>
        <div className={`re-mega2__items${group.items.length > 8 ? " re-mega2__items--dense" : ""}`}>
          <ul>{group.items.map((item) => <li key={item.href + item.label}>
            <Link to={hrefIn(root, item.href)} reloadDocument={isStaticPage(item.href)}><strong>{item.label}</strong>{item.desc && <span>{item.desc}</span>}</Link>
          </li>)}</ul>
        </div>
      </div>}
    </div>
    <div id="re-mobile-menu" className="header-mnb re-mobile" aria-hidden={!mobileOpen} onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setMobileOpen(false); }}>
      {/* 좁은 폭 — 왼쪽 대메뉴 / 오른쪽 그 메뉴의 항목 */}
      <div className="re-drawer">
        <ul className="re-drawer__side">{MAIN_NAV.map((item) => <li key={item.key}>
          <button type="button" data-active={item.key === drawerKey} onClick={() => setDrawerKey(item.key)}>{item.label}</button>
        </li>)}</ul>
        <div className="re-drawer__body">
          {(MAIN_NAV.find((item) => item.key === drawerKey) ?? MAIN_NAV[0]).groups.map((group) => <div key={group.key}>
            <p className="re-drawer__group">{group.label}</p>
            {group.items.map((link) => <Link key={link.href + link.label} to={hrefIn(root, link.href)} reloadDocument={isStaticPage(link.href)}>{link.label}</Link>)}
          </div>)}
        </div>
      </div>
      {/* 손바닥 폭 — 접었다 펴는 목록 */}
      <div className="re-stack">{MAIN_NAV.map((item) => <details key={item.key}><summary>{item.label}<ChevronDown /></summary><div>{item.groups.flatMap((entry2) => entry2.items).map((link) => <Link key={link.href + link.label} to={hrefIn(root, link.href)} reloadDocument={isStaticPage(link.href)}>{link.label}</Link>)}</div></details>)}</div>
    </div>
  </header>;
}

function Footer() {
  const root = useRoot();
  return <><div className="re-footer__gap" aria-hidden="true" /><div className="re-footer__top"><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>TOP<span aria-hidden="true">▲</span></button></div><footer className="re-footer"><div className="re-footer__panel"><div className="re-footer__explorer"><p>상담에서 오픈까지<br />함께 만듭니다</p><nav className="re-footer__nav" aria-label="맨 아래 메뉴">{MAIN_NAV.map((entry) => <div key={entry.key}><strong>{entry.label}</strong>{entry.groups.flatMap((group) => group.items).slice(0, 6).map((item) => <Link key={item.href + item.label} to={hrefIn(root, item.href)} reloadDocument={isStaticPage(item.href)}>{item.label}</Link>)}</div>)}</nav></div><div className="re-footer__info"><Logo showMark={false} wordmarkClassName="re-wordmark" /><div className="re-footer__shortcuts"><Link to={`${root}/privacy`}><b>개인정보처리방침</b></Link><Link to={`${root}/contact`}>제작 문의</Link><Link to={`${root}/faq`}>자주 묻는 질문</Link><Link to={`${root}/notices`}>공지사항</Link></div><div className="re-footer__biz"><p><span>상호명 <b>민트클</b></span><span>대표자 <b>김진수</b></span><span>사업자등록번호 <b>266-07-03678</b></span></p><p><span>통신판매업신고번호 <b>제2026-서울강남-00480호</b></span></p><p><span>전화 <a href={PHONE_TEL_HREF}>{PHONE_NUMBER}</a></span><span>이메일 <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></span></p></div><p className="re-footer__contactline"><small>© 2026 NOVERIQ. All rights reserved.</small></p><a className="re-footer__family" href={NAVER_BLOG_URL} target="_blank" rel="noreferrer">NOVERIQ 채널<span>+</span></a><div className="re-footer__socials"><a href={NAVER_BLOG_URL} target="_blank" rel="noreferrer" aria-label="네이버 블로그"><NaverBlogMark /></a><a href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer" aria-label="카카오톡 채널"><KakaoMark /></a></div></div></div></footer></>; }

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
      <video ref={videoRef} className="greeting-video" src={`${MEDIA}/hero.mp4`} poster={MEDIA_SLOTS.hero} muted loop playsInline preload="metadata" aria-hidden="true" />
      <div className="greeting-dim re-greeting__dim" />
      <div className="greeting-swiper re-greeting__slides" aria-live="polite">
        <div className="swiper">
          <div className="swiper-wrapper">
            <div className={`swiper-slide${slide === 0 ? " swiper-slide-active" : ""}`} style={{ transitionDuration: slideTransitioning ? "1000ms" : "0ms" }}><h1 className="greeting-slogan"><span>앱과 홈페이지를</span><span>만듭니다</span></h1></div>
            <div className={`swiper-slide${slide === 1 ? " swiper-slide-active" : ""}`} style={{ transform: "translate3d(-100%, 0, 0)", transitionDuration: slideTransitioning ? "1000ms" : "0ms" }}><p className="greeting-message">PC · 폰 · 태블릿에서<br />쓰는 앱</p></div>
          </div>
        </div>
      </div>
    </div>
    <div className="greeting-controls"><button className="greeting-control re-greeting__control" type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>{paused ? "play" : "pause"}</button></div>
  </>;
}

/**
 * 사업 영역 둘(2026-11-11). 첫 화면 바로 아래에서 홈페이지 제작과 앱을 같은 크기로 나란히 보인다.
 * 앱 판은 앱 사업 전체라 특정 앱을 보이지 않는다. 사진은 노트북 · 태블릿 · 폰에 글자 없는 배경화면(apps-devices).
 * 앱마다의 사진은 /apps 목록(APPS)에서 쓴다.
 */
const APPS = [
  {
    slug: "byscreen", name: "바이스크린", href: "/byscreen/", icon: "/byscreen/icon.png",
    line: "태블릿을 PC의 두 번째 모니터로",
    desc: "안드로이드 태블릿을 윈도우 PC 옆 화면으로 씁니다. USB 케이블이나 와이파이로 연결하고, 펜과 터치도 PC로 갑니다.",
    photo: "/byscreen/img/hero-ko-1536.webp", photoSmall: "/byscreen/img/hero-ko-768.webp",
    alt: "흰 USB 케이블로 이어진 노트북과 태블릿",
    facts: ["안드로이드 태블릿 앱 · 윈도우 PC 프로그램", "USB · 와이파이 · 최대 120프레임", "3일 무료 · 그다음 11,000원 한 번 결제"],
  },
  {
    slug: "cross", name: "바이크로스", href: "/cross/", icon: "/cross/icon.png",
    line: "PC 마우스로 태블릿까지",
    desc: "윈도우 PC의 마우스와 키보드로 USB 케이블에 연결한 안드로이드 태블릿을 씁니다. 화면 끝으로 밀면 태블릿으로 넘어갑니다.",
    photo: "/cross/img/mouse-ko-1536.webp", photoSmall: "/cross/img/mouse-ko-768.webp",
    alt: "흰 USB 케이블로 이어진 노트북과 태블릿, 마우스를 쥔 손",
    facts: ["안드로이드 태블릿 앱 · 윈도우 PC 프로그램", "USB 케이블 · 마우스 · 키보드 · 클립보드", "3일 무료 · 마우스는 계속 무료 · 키보드 5,500원"],
  },
  {
    slug: "bypad", name: "바이패드", href: "/bypad/", icon: "/bypad/icon.png",
    line: "태블릿을 PC 단축키 버튼판으로",
    desc: "안드로이드 태블릿을 윈도우 PC의 단축키 버튼판으로 씁니다. 단축키, 문장 입력, 프로그램 열기를 버튼 하나로 하고, 앞에 띄운 프로그램에 맞춰 버튼판이 바뀝니다.",
    photo: "/bypad/img/press-ko-1536.webp", photoSmall: "/bypad/img/press-ko-768.webp",
    alt: "스탠드 불빛 아래 낮게 세운 태블릿의 단축키 버튼을 누르는 손",
    facts: ["안드로이드 태블릿 앱 · 윈도우 PC 프로그램", "USB 케이블 · 와이파이 · 단축키 · 문장 · 프로그램 열기", "무료로 시작 · 전체 기능 9,900원 한 번 결제"],
  },
  {
    slug: "bypen", name: "바이펜", href: "/bypen/", icon: "/bypen/icon.png",
    line: "태블릿 펜으로 PC에 그리기",
    desc: "USB 케이블로 연결한 안드로이드 태블릿에 S펜으로 그리면 윈도우 PC 그림 프로그램에 그려집니다. 필압과 기울기, 지우개까지 윈도우 펜으로 들어가고, 드라이버는 깔지 않습니다.",
    photo: "/bypen/img/draw-ko-1536.webp", photoSmall: "/bypen/img/draw-ko-768.webp",
    alt: "흰 USB 케이블로 이어진 노트북과 태블릿, 펜으로 태블릿에 그리는 손",
    facts: ["안드로이드 태블릿 앱 · 윈도우 PC 프로그램", "USB 케이블 · S펜 · 필압 · 기울기 · 빈 패드", "3일 무료 · 펜은 계속 무료 · 필압 5,500원"],
  },
  {
    slug: "byphoto", name: "바이포토", href: "/byphoto/", icon: "/byphoto/icon.png",
    line: "폰 사진을 집 PC로",
    desc: "폰으로 찍은 사진과 동영상을 집 와이파이에서 윈도우 PC로 저절로 백업합니다. 원본 그대로 쌓이고, 밖에서도 집 PC 사진을 봅니다.",
    photo: "/byphoto/img/desk-ko-1536.webp", photoSmall: "/byphoto/img/desk-ko-768.webp",
    alt: "밤 책상의 모니터에 열린 사진 폴더와 손에 든 폰",
    facts: ["안드로이드 폰 앱 · 윈도우 PC 프로그램", "집 와이파이 자동 백업 · 원본 · 밖에서 보기", "집에서는 무료 · 밖에서 쓰기 11,000원 한 번 결제"],
  },
  {
    slug: "bycare", name: "바이케어", href: "/bycare/", icon: "/bycare/icon.png",
    line: "부모님 폰 화면 보고 도와주기",
    desc: "부모님 폰 화면을 내 폰에서 보면서 누를 곳을 짚어 드리고, 대신 눌러 드립니다. 볼 때마다 부모님이 [보여 주기]를 누르셔야 보입니다.",
    photo: "/bycare/img/child-1536.webp", photoSmall: "/bycare/img/child-768.webp",
    alt: "밤 책상 앞에서 손에 든 폰에 부모님 폰의 알람 화면이 보인다",
    facts: ["안드로이드 폰 앱 · 부모님 폰과 자녀 폰", "보기 · 짚어 주기 · 대신 누르기 · 빨간 테두리", "3일 무료 · 보기는 계속 무료 · 대신 누르기 5,500원"],
  },
  {
    slug: "byview", name: "바이뷰", href: "/byview/", icon: "/byview/icon.png",
    line: "남는 폰을 카메라 모니터로",
    desc: "삼각대에 세운 폰이 찍는 화면을 남는 폰이나 태블릿에 띄워 보면서 녹화합니다. 모니터에서 녹화를 켜고 끄고, 누른 곳에 초점과 밝기를 맞춥니다.",
    photo: "/byview/img/card-ko-1536.webp", photoSmall: "/byview/img/card-ko-768.webp",
    alt: "어두운 거실에서 두 손으로 든 태블릿에 꽃을 꽂는 손이 보이고, 뒤쪽 삼각대 위에 폰이 서 있다",
    facts: ["안드로이드 폰 앱 · 폰이나 태블릿 두 대", "와이파이 다이렉트 · 녹화 · 누른 곳 초점 · 밝기", "3일 무료 · 보기와 녹화는 계속 무료 · Pro 11,000원 한 번 결제"],
  },
] as const;

/** 홈 첫 칸(PC와 태블릿)과 하는 일 아래 카드 셋에 나눠 싣는다. 바이펜은 하는 일 배경 사진, 일곱 개 전부는 아래 출시한 앱 목록. */
const HOME_STORY_APPS = APPS.filter((app) => ["byscreen", "cross", "bypad"].includes(app.slug));
const HOME_VALUE_APPS = APPS.filter((app) => ["byphoto", "bycare", "byview"].includes(app.slug));

function HomeBusiness() {
  const root = useRoot();
  return <section className="re-biz" aria-labelledby="re-biz-heading">
    <div className="re-biz__frame">
      <h2 id="re-biz-heading" className="re-biz__heading">사업 영역</h2>
      <div className="re-biz__grid">
        <article className="re-biz__card re-biz__card--app">
          <img className="re-biz__photo" src={`${PHOTOS}/apps-devices-768.webp`} srcSet={`${PHOTOS}/apps-devices-768.webp 768w, ${PHOTOS}/apps-devices.webp 1536w`} sizes="(max-width: 1023px) 100vw, 50vw" alt="" loading="lazy" decoding="async" />
          <div className="re-biz__text">
            <p className="re-biz__kind">앱</p>
            <h3 className="re-biz__title">PC · 모바일 앱</h3>
            <div className="re-biz__links"><Link className="re-pill re-pill--light" to={`${root}/apps`}>출시한 앱</Link></div>
          </div>
        </article>
        <article className="re-biz__card">
          <img className="re-biz__photo" src={`${PHOTOS}/responsive-wide.webp`} alt="" loading="lazy" decoding="async" />
          <div className="re-biz__text">
            <p className="re-biz__kind">홈페이지 제작</p>
            <h3 className="re-biz__title">소상공인 · 기업 홈페이지</h3>
            <div className="re-biz__links"><Link className="re-pill" to={`${root}/website/process`}>제작 방법</Link><Link className="re-biz__more" to={`${root}/contact`}>제작 문의<ArrowRight /></Link></div>
          </div>
        </article>
      </div>
    </div>
  </section>;
}

function EditorialHome() {
  const root = useRoot();
  const storyItems = HOME_STORY_APPS;
  return <main id="top" className="re-home">
    <section className="greeting re-greeting"><div className="greeting-frame re-greeting__frame"><HeroVideo /></div></section>
    <HomeBusiness />
    <section id="scope" className="first re-first">
      <div className="first-intro re-first-intro init re-init">
        <h2 className="first-heading">PC와<br />태블릿</h2>
        <div className="first-action re-first-intro__actions"><Link className="first-button" to={`${root}/apps`}>앱 전체</Link></div>
        <figure className="first-docs"><img src={`${PHOTOS}/apps-devices-768.webp`} alt="노트북 · 태블릿 · 폰" /></figure>
        <div className="first-lights re-first-lights" aria-hidden="true"><div className="first-light re-first-light"><i className="light-trail blue re-light-trail"><span className="light-trail-circle" /><span className="light-trail-circle" /><span className="light-trail-circle" /></i></div><div className="first-light-small re-first-light re-first-light--small"><i className="light-trail blue small reverse re-light-trail re-light-trail--small"><span className="light-trail-circle" /><span className="light-trail-circle" /><span className="light-trail-circle" /></i></div></div>
      </div>
      <div className="first-stories re-first-stories">{storyItems.map((scene, index) => <article className={`first-story type-${index + 1} re-first-story re-first-story--${index + 1} init re-init`} key={scene.slug}><div className="first-before re-first-story__before"><h3 className="first-title"><a href={scene.href}>{scene.name}</a><br /><span className="first-keyword">{scene.line}</span></h3></div><div className="first-after re-first-story__after"><p className="first-desc">{scene.facts.slice(1).map((line, lineIndex) => <Fragment key={line}>{lineIndex > 0 && <br />}{line}</Fragment>)}</p></div><figure className="first-fixer"><img src={scene.photoSmall} alt={scene.alt} /></figure></article>)}</div>
    </section>
    <section className="now re-now init re-init" style={{ "--re-now-image": `url(/bypen/img/draw-ko-1536.webp)` } as CSSProperties}><div className="now-track re-now__track"><p className="now-heading re-now__heading">지금<br />우리는</p><div className="now-sticky re-now__sticky"><div className="now-frame re-now__frame"><div className="now-text re-now__text"><p className="now-step">하는 일</p><h2 className="now-title">윈도우 PC와<br />안드로이드 폰 · 태블릿에서<br className="mobile" /> 쓰는 앱</h2></div><i className="now-dim re-now__dim" /><i className="now-edge-top re-now__edge re-now__edge--top" /><i className="now-edge-bottom re-now__edge re-now__edge--bottom" /></div></div></div></section>
    <section className="now-value re-now-value init re-init"><div className="now-value-frame re-now-value__frame"><ul className="now-value-list">{HOME_VALUE_APPS.map((app, index) => <li className="now-value-item" key={app.slug}><a className={`now-value-card type-${index + 1}`} href={app.href}><img src={app.photoSmall} alt="" /><span className="now-value-text"><span className="now-value-title">{app.name}</span><span className="now-value-desc">{app.line}</span></span></a></li>)}</ul></div></section>
    <section className="latest re-latest"><div className="latest-frame re-latest__frame"><h2 className="latest-heading">출시한<br />앱</h2><ul className="latest-list">{APPS.map((app) => <li className="latest-item" key={app.slug}><a className="latest-link" href={app.href}><span className="latest-category">{app.facts[0].startsWith("안드로이드 폰") ? "폰 앱" : "태블릿 앱"}</span><span className="latest-title re-latest__title"><span className="latest-title-text">{app.name} · {app.line}</span></span></a></li>)}</ul></div></section>
    <HomeHelp />
    <div className="tomorrow re-tomorrow init re-init"><i className="tomorrow-glow type-1 re-tomorrow__glow" /><i className="tomorrow-glow type-2 re-tomorrow__glow re-tomorrow__glow--right" /><section className="tomorrow-frame re-tomorrow__frame"><h2 className="tomorrow-heading">오픈<br />이후</h2><p className="tomorrow-message">오픈한 뒤에도<br className="mobile" /> 내용을 직접 바꾸고<br />계속 쓰실 수 있게<br className="mobile" /> 만듭니다</p><ul className="tomorrow-list">{["/services/responsive", "/services/content-management", "/services/inquiry-reservation"].map((href, index) => <li className="tomorrow-item" key={href}><Link className={`tomorrow-link type-${index + 1}`} to={`${root}${href}`}><span className="tomorrow-title">{index === 0 ? "반응형 제작" : index === 1 ? "콘텐츠 관리" : "문의·예약"}</span><span className="tomorrow-desc">{index === 0 ? <>기기마다 화면을 다시 맞추고<br />터치하기 쉽게 만듭니다</> : index === 1 ? <>공지와 사례를 직접 올리고<br />오픈 뒤에도 내용을 바꿉니다</> : <>문의와 예약을 한곳에 모아<br />접수 순서대로 확인합니다</>}</span><span className="tomorrow-image"><img src={MEDIA_SLOTS.tomorrow[index]} alt="" /></span></Link></li>)}</ul></section><section className="recruit re-recruit"><p className="recruit-category">제작 문의</p><h2 className="recruit-heading">어떤 홈페이지가 필요하세요?<br />연락 주시면 같이 정해 드립니다</h2><div className="recruit-action"><Link className="recruit-link" to={`${root}/contact`}>제작 상담</Link><Link className="recruit-link" to={`${root}/website/price`}>제작 비용</Link></div></section></div>
  </main>;
}

function PageInfo({ category, title }: { category: string; title: string }) { return <div className="re-page-info"><div className="re-page-align"><p className="re-page-category">{category}</p><h1 className="re-page-heading">{title}</h1></div></div>; }
/**
 * 서브 히어로. 우리은행 서브페이지 실측(2026-09-22):
 *   .hero{height:1800px} · .hero-sticky{position:sticky;top:0;height:100vh;padding:180px 160px}
 *   스크롤이 히어로 꼭대기에 닿으면 .hero-sticky 의 padding 을 20px 로 바꾼다 → 카드가 화면을 채운다.
 *   1440x900 기준 프레임 160,673 1120x540 → 20,20 1400x860, transition padding .6s ease.
 */
function SubHero({ step, title, image }: { step: string; title: ReactNode; image: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [locked, setLocked] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      setLocked(box.top <= 0 && box.bottom > window.innerHeight * 0.5);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { if (frame) cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return <div className="re-hero re-hero--single" ref={ref} data-locked={locked ? "true" : "false"}><div className="re-hero__sticky"><div className="re-hero__frame"><img src={image} alt="" /><div className="re-hero__dim" /><i className="re-hero__edge" /><div className="re-hero__single"><h2 className="re-hero__step">{step}</h2><p className="re-hero__title">{title}</p></div></div></div></div>;
}
function Section({ title, children, wide, split }: { title?: string; children: ReactNode; wide?: boolean; split?: boolean }) { return <section className={["re-section", wide ? "re-section--wide" : "", split ? "re-section--split" : ""].filter(Boolean).join(" ")} data-reveal>{title && <h2 className="re-section__h2">{title}</h2>}{split ? <div className="re-section__body">{children}</div> : children}</section>; }
function Contents({ children }: { children: ReactNode }) { return <div className="re-contents">{children}</div>; }
function LocalNav({ group, path }: { group: keyof typeof LOCAL_GROUPS; path: string }) {
  const root = useRoot(); return <nav className="re-local-nav" aria-label={`${group} 하위 메뉴`}>{LOCAL_GROUPS[group].map(([label, href]) => <Link key={href} to={hrefIn(root, href)} aria-current={path === href ? "page" : undefined}>{label}</Link>)}</nav>; }
function Pagination({ total, current, onSelect }: { total: number; current: number; onSelect: (page: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const start = Math.max(0, Math.min(current - 3, total - 5));
  const pages = Array.from({ length: total }, (_, index) => index + 1).slice(start, start + 5);
  // 쪽을 바꾸면 목록 위로 올린다 — 그대로 두면 새 목록의 끝과 쪽 번호만 보인다
  const select = (page: number) => {
    onSelect(page);
    const section = ref.current?.closest("section"); if (!section) return;
    // 하위 쪽 머리글은 따라 내려오지 않으니 화면에 걸쳐 있을 때만 그 아래로 맞춘다
    const top = section.getBoundingClientRect().top - Math.max(0, document.querySelector(".re-header")?.getBoundingClientRect().bottom ?? 0);
    if (top < 0) window.scrollBy({ top, behavior: "smooth" });
  };
  return <nav ref={ref} className="re-pagination" aria-label="페이지 이동"><ul className="re-pagination__list">{pages.map((page) => <li key={page} className="re-pagination__page"><button type="button" aria-current={page === current ? "page" : undefined} onClick={() => select(page)}>{page}</button></li>)}<li className="re-pagination__page re-pagination__page--next"><button type="button" aria-label="다음 페이지" disabled={current >= total} onClick={() => select(current + 1)}><ArrowRight /></button></li></ul></nav>;
}
function BoardSearch({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) { return <div className="re-board-util"><div className="re-board-search"><label className="re-blind" htmlFor="re-board-keyword">{label}</label><input id="re-board-keyword" value={value} placeholder="검색어를 입력하세요" onChange={(event) => onChange(event.target.value)} /><button type="button" aria-label="검색"><Search /></button></div></div>; }
function DetailArticle({ category, title, date, children, listHref, prev, next }: { category: string; title: string; date?: string; children: ReactNode; listHref: string; prev?: { label: string; href: string }; next?: { label: string; href: string } }) {
  return <article className="re-detail"><header className="re-detail__meta"><p>{category}</p><h2>{title}</h2>{date && <time>{date}</time>}</header><div className="re-detail__post">{children}</div><nav className="re-detail__nav">{prev ? <Link to={prev.href}><span>이전</span><b>{prev.label}</b></Link> : <p><span>이전</span><b>이전 글이 없습니다</b></p>}{next ? <Link to={next.href}><span>다음</span><b>{next.label}</b></Link> : <p><span>다음</span><b>다음 글이 없습니다</b></p>}</nav><div className="re-detail__action"><Link to={listHref}>목록</Link></div></article>;
}
function ContactBand() {
  return <Section wide><div className="re-contact-band"><p>제작할 페이지와 기능을 알려주세요</p><h3>견적과 진행 순서를 안내해 드립니다</h3><div><a href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer">카카오톡 문의<ArrowUpRight /></a><a href={PHONE_TEL_HREF}>전화 문의<ArrowUpRight /></a></div></div></Section>; }
/**
 * 서브페이지 항목 목록. NHN Cloud "주요 서비스" 2열 목록 구조를 쓴다.
 * 아이콘 타일 88x88 · 2열 · 행 사이 얇은 선.
 *
 * 타일 안에는 번호를 넣는다. 원본은 항목마다 전용 아이콘이 있지만 그건 NHN 제품
 * 아이콘이라 가져올 수 없고, 낱말로 아이콘을 추측하게 했더니 못 맞춘 항목이 전부
 * 같은 체크 표시로 떨어져 중복이 생겼다. 번호는 겹치지 않고 지어내는 것도 없다.
 */
/**
 * 쪽마다 실제 제작 화면 두 장. remo finefit .manage_sect .cont 실측(2026-09-22):
 *   grid 580px 580px 580px · gap 40px 30px
 *   .img01 은 두 칸(1190) · .img02 는 한 칸(580) · 둘 다 radius 30
 * 사진은 public/cases 의 실제 캡처에서 쪽 내용에 맞는 것으로 직접 골랐다.
 * 전부 템플릿 시안(가상 브랜드) 캡처다 — 실제 고객사가 운영 중인 사이트가 아니다.
 * 2026-10-06 에 머리말이 "제작해 운영 중인 사이트"라고 단언하고 있어 바로잡았다.
 * 경로를 바꿀 때는 파일 존재를 반드시 기계로 확인할 것 — point-* 를 상상해 적어
 * 네 장이 깨진 채 올라가 있었다(corporate-g/point-news 등, 같은 날 수리).
 * 22장 모두 서로 다른 화면이다. 반응형 쪽만 같은 사이트의 PC/모바일을
 * 일부러 짝지었다 — 그게 그 쪽이 말하는 내용이라서다.
 */
const PAGE_PHOTOS: Record<string, { file: string; wide: string; side: string; wideAlt: string; sideAlt: string }> = {
  process: { file: "process", wide: "interior-a/point-process", side: "law-a/point-process",
    wideAlt: "인테리어 사이트의 시공 진행 단계 화면", sideAlt: "법률사무소 사이트의 상담 절차 화면" },
  features: { file: "features", wide: "clinic-a/point-services", side: "fitness-a/point-services",
    wideAlt: "의원 사이트의 진료 항목 화면", sideAlt: "피트니스 사이트의 프로그램 항목 화면" },
  maintenance: { file: "maintenance", wide: "corporate-g/page-news", side: "estate-f/page-notice",
    wideAlt: "금속기업 사이트의 공지 목록 화면", sideAlt: "부동산 사이트의 공지 상세 화면" },
  custom: { file: "custom", wide: "corporate-j/page-automation", side: "corporate-g/page-technology",
    wideAlt: "기계기업 사이트의 자동화 소개 화면", sideAlt: "금속기업 사이트의 기술 소개 화면" },
  "admin-system": { file: "admin", wide: "estate-f/page-listings", side: "estate-g/point-featured",
    wideAlt: "부동산 사이트에 등록된 매물 목록", sideAlt: "회원제 부동산 사이트의 추천 매물 화면" },
  "inquiry-reservation": { file: "inquiry", wide: "rentcar-g/point-reserve", side: "interior-f/point-contact",
    wideAlt: "렌터카 사이트의 예약 접수 화면", sideAlt: "인테리어 사이트의 상담 문의 화면" },
  "search-filter": { file: "search", wide: "rentcar-f/point-search", side: "estate-g/point-listings",
    wideAlt: "렌터카 사이트의 조건 검색 화면", sideAlt: "부동산 사이트의 매물 목록 화면" },
  "content-management": { file: "content", wide: "wedding-a/point-gallery", side: "restaurant-g/point-newslist",
    wideAlt: "웨딩 사이트의 갤러리 화면", sideAlt: "다이닝 사이트의 소식 목록 화면" },
  "database-api": { file: "database", wide: "estate-f/point-map", side: "rentcar-g/point-estimate",
    wideAlt: "부동산 사이트의 지도 연동 화면", sideAlt: "렌터카 사이트의 요금 계산 화면" },
  responsive: { file: "responsive", wide: "academy-a/main", side: "academy-a/m-index",
    wideAlt: "학원 사이트의 PC 화면", sideAlt: "같은 사이트의 모바일 화면" },
  seo: { file: "seo", wide: "corporate-l/page-index", side: "brew-a/page-index",
    wideAlt: "기업 사이트의 서브페이지 구조", sideAlt: "양조장 사이트의 서브페이지 구조" },
};
function PhotoBand({ page }: { page: string }) {
  const photo = PAGE_PHOTOS[page];
  if (!photo) return null;
  return <div className="re-photoband">
    <figure className="re-photoband__wide"><img src={`/cases/${photo.wide}.webp`} alt={photo.wideAlt} loading="lazy" /></figure>
    <figure className="re-photoband__side"><img src={`/cases/${photo.side}.webp`} alt={photo.sideAlt} loading="lazy" /></figure>
  </div>;
}

/**
 * 제목만 있는 목록. remo finefit .ana_box 실측(2026-09-22):
 *   왼쪽 2px 세로선(오른쪽 여백 80) + 항목마다 "• " 라벨 18/500 #0a1225
 * 순서가 없는 목록에 01 02 03 을 붙이던 것을 걷어냈다.
 */
function PointList({ points }: { points: string[] }) {
  return <div className="re-fflist"><span className="re-fflist__line" aria-hidden="true" />
    <ul>{points.map((point) => <li key={point}><strong>{point}</strong></li>)}</ul>
  </div>;
}

/**
 * 되살린 알맹이를 모델링 사이트 배치에 담는다. 배치는 NHN Cloud 실측값,
 * 문구는 기존 쪽들이 갖고 있던 것을 그대로 읽는다 (src/lib/renewalExtras.ts).
 */
/**
 * 서브페이지 영상 자리. 파일이 없으면 아무것도 그리지 않는다.
 *
 * 히어로에서 한 번 당한 적이 있다 — video 에 src 를 안 달아 두면 포스터만 보이고
 * 아무도 모른다. 그래서 여기서는 HEAD 로 파일이 있는지 먼저 확인하고,
 * 있을 때만 붙인다. 파일을 넣는 순간 자동으로 재생된다.
 *
 * 표시 1320x743 (16:9) · 무음 · 반복 · 화면 밖이면 멈춘다.
 */
const SLOT_VIDEOS: Partial<Record<PageKey, string>> = {
  "admin-system": "support",
  responsive: "responsive",
  "inquiry-reservation": "inquiry",
  "search-filter": "search",
};

function SlotVideo({ name }: { name: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const src = `${MEDIA}/${name}.mp4`;
  useEffect(() => {
    if (location.protocol.startsWith("file")) return;
    let alive = true;
    fetch(src, { method: "HEAD" })
      .then((r) => { if (alive && r.ok && (r.headers.get("content-type") || "").startsWith("video/")) setReady(true); })
      .catch(() => undefined);
    return () => { alive = false; };
  }, [src]);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => undefined); else video.pause();
    }, { threshold: 0 });
    io.observe(video);
    return () => io.disconnect();
  }, [ready]);
  if (!ready) return null;
  return <figure className="re-slot-video">
    <video ref={ref} src={src} poster={`${MEDIA}/${name}.webp`} muted loop playsInline preload="metadata" aria-hidden="true" />
  </figure>;
}

/**
 * 제목 + 설명 목록. remo finefit .pre_box 실측(2026-09-22, 설계폭 1920):
 *   .box_wrap  grid 2열 · gap 30px 40px
 *   .pre_box   padding 40px 40px 45px · radius 30 · #fff
 *              border 1px #d6e1f4 · shadow 0 4px 20px rgba(79,109,134,.08)
 *   제목 25/600 lh32.5 #0a1225 · 설명 18/400 lh23.4 #63656c
 * 원본은 카드마다 손으로 그린 SVG 를 왼쪽 70x70 타일에 넣는다. 우리 항목이
 * 174개라 아이콘을 지어내지 않고 타일 칸은 두지 않았다.
 */
function ExtraItemList({ rows }: { rows: { title: string; desc: string }[] }) {
  return <ul className="re-ffcards">{rows.map((row) => <li className="re-ffcard" key={row.title}>
    <strong>{row.title}</strong><em>{row.desc}</em>
  </li>)}</ul>;
}

/* NHN "도움 되는 정보" 파스텔 카드 — 308x308 · 라운드 12 · 간격 16 · 여백 32 */
/**
 * 번호 붙는 단계 목록. 우리은행 "실천 프로그램"(.program-list) 실측값 그대로.
 *   .program-list  grid 650px 650px · gap 20
 *   .program-item  padding 80 · 홀수 칸에 border-right, 마지막 줄 빼고 border-bottom
 *                  (1px solid rgba(20,23,26,.5)) — 박스도 배경도 없다
 *   번호 68/600 lh91.8 · 제목 28/700 lh42 · 설명 18/400 lh28.8 #535a63
 */
function ExtraSteps({ rows }: { rows: { no: string; title: string; desc: string }[] }) {
  const lastRowStart = Math.floor((rows.length - 1) / 2) * 2;
  return <ol className="re-program">{rows.map((row, index) => <li className="re-program__item" key={row.no + row.title}
    data-divider-right={index % 2 === 0 ? "true" : "false"}
    data-divider-bottom={index < lastRowStart ? "true" : "false"}>
    <span className="re-program__no">{row.no} .</span>
    <span className="re-program__title">{row.title}</span>
    <span className="re-program__desc">{row.desc}</span>
  </li>)}</ol>;
}

/* NHN "주요 솔루션" 가로 아코디언 — 접힘 79 / 펼침 865 / 높이 520 */
function ExtraCompare({ rows }: { rows: { name: string; desc: string; points: readonly string[]; href?: string; linkLabel?: string }[] }) {
  const root = useRoot();
  const [open, setOpen] = useState(0);
  return <ul className="re-acc re-acc--compare">{rows.map((row, index) => {
    const active = index === open;
    return <li key={row.name} className="re-acc__panel" data-open={active}
      onPointerEnter={() => setOpen(index)} onFocusCapture={() => setOpen(index)}>
      <Link to={hrefIn(root, row.href ?? "/contact")} aria-expanded={active}>
        <span className="re-acc__name">{row.name}</span>
        <span className="re-acc__body">
          <em>{row.desc}</em>
          <span className="re-acc__points">{row.points.map((point) => <span key={point}>{point}</span>)}</span>
          <span className="re-acc__link">{row.linkLabel ?? "자세히 보기"}<ArrowRight aria-hidden="true" /></span>
        </span>
      </Link>
    </li>;
  })}</ul>;
}

function ExtraSections({ pageKey }: { pageKey: string }) {
  const blocks: ExtraBlock[] | undefined = PAGE_EXTRAS[pageKey];
  if (!blocks) return null;
  return <>
    {pageKey === "custom" && <Section wide>
      <Suspense fallback={null}><CustomBuildPreviewSection /></Suspense>
    </Section>}
    {SLOT_VIDEOS[pageKey as PageKey] && <Section wide><SlotVideo name={SLOT_VIDEOS[pageKey as PageKey] as string} /></Section>}
    {blocks.map((block) => <Section key={block.title} wide title={block.title}>
    {block.kind === "items" && <ExtraItemList rows={block.rows} />}
    {block.kind === "points" && <PointList points={block.rows} />}
    {block.kind === "steps" && <ExtraSteps rows={block.rows} />}
    {block.kind === "compare" && <ExtraCompare rows={block.rows} />}
  </Section>)}
  </>;
}

function pageKeyOf(path: string) { return path.replace(/^\/(website|services)\//, ""); }

function PageSections({ page }: { page: ContentPage }) { return <>{page.sections.map((section) => <Section key={section.title} split title={section.title}><div className="re-step-body"><p className="re-step-text">{section.text}</p><PointList points={[...section.points]} /></div></Section>)}</>; }

function StandardPage({ page, path }: { page: ContentPage; path: string }) {
  if (path === "/website/price") return <PriceDetail page={page} path={path} />;
  const group = page.group as keyof typeof LOCAL_GROUPS;
  const key = pageKeyOf(path);
  const Legacy = LEGACY_SERVICE_BODY[key];
  return <main className="re-sub-page"><PageInfo category={page.group} title={page.title} /><SubHero step={page.eyebrow} title={page.intro} image={page.image} /><Contents>
    <LocalNav group={group} path={path} />
    <PageSections page={page} />
    {PAGE_PHOTOS[key] && <Section wide title="실제로 만든 화면">
      <p className="re-photoband__lead">노베릭이 직접 만든 디자인에서 그대로 캡처한 화면입니다.</p>
      <PhotoBand page={key} />
    </Section>}
    {Legacy
      ? <div className="re-legacy-service"><Suspense fallback={null}><Legacy /></Suspense></div>
      : <ExtraSections pageKey={key} />}
    <ContactBand />
  </Contents></main>;
}

function PriceDetail({ page, path }: { page: ContentPage; path: string }) {
  const root = useRoot();
  return <main className="re-sub-page"><PageInfo category={page.group} title={page.title} /><Contents><LocalNav group="홈페이지 제작" path={path} /><Section split title="제작 방식별 비용"><div className="re-price-packages">{WEBSITE_PACKAGES.map((item) => <div className="re-price-card" key={item.key}><p>{item.badge ?? "홈페이지 제작"}</p><h3>{item.label}</h3><span>{item.desc}</span><strong>{formatMan(item.total)}<small>부터</small></strong></div>)}</div><p className="re-price-note">모든 금액은 부가세 별도이며 필요한 범위에 따라 달라집니다</p></Section><Section wide title="포함 항목 비교"><PricingComparison bare /></Section><Section split title="맞춤 제작"><div className="re-premium-price"><h3>150만원부터</h3><span>메뉴별 상세 페이지가 있고 나중에 더 늘릴 수 있습니다. 섹션 구성과 브랜드 색 · 글꼴을 잡고 사진을 새로 만듭니다</span><Link to={`${root}/contact`}>제작 문의<ArrowRight /></Link></div></Section><ContactBand /></Contents></main>;
}

const BOARD_PAGE_SIZE = 10;
function useBoardPage<T>(items: T[]) {
  // 쪽 번호를 주소(?page=)에 둬야 상세에 들어갔다 뒤로 와도 보던 쪽으로 돌아온다
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get("page")) || 1);
  const total = Math.max(1, Math.ceil(items.length / BOARD_PAGE_SIZE));
  const safe = Math.min(page, total);
  const setPage = (next: number) => {
    if (next === page) return;
    const query = new URLSearchParams(params);
    if (next <= 1) query.delete("page"); else query.set("page", String(next));
    setParams(query);
  };
  return { page: safe, total, setPage, slice: items.slice((safe - 1) * BOARD_PAGE_SIZE, safe * BOARD_PAGE_SIZE) };
}

function ContactPage() {
  const openKakao = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); window.open(KAKAO_CHANNEL_URL, "_blank", "noopener,noreferrer"); };
  return <main className="re-sub-page"><PageInfo category="고객센터" title="문의하기" /><Contents><LocalNav group="고객센터" path="/contact" /><Section split title="제작 상담 신청"><p className="re-form-guide">입력값은 자동으로 전송되지 않습니다. 버튼을 누르면 카카오톡 문의 창이 열립니다. 상호, 연락처, 필요한 메뉴, 참고 사이트와 준비된 자료를 함께 알려주시면 상담이 빠릅니다</p><form className="re-form" onSubmit={openKakao}><div><label htmlFor="re-name">이름 또는 상호</label><input id="re-name" name="name" required /></div><div><label htmlFor="re-phone">연락처</label><input id="re-phone" name="phone" type="tel" required /></div><div className="re-form__wide"><label htmlFor="re-site">참고 사이트</label><input id="re-site" name="site" type="url" placeholder="https://" /></div><div className="re-form__wide"><label htmlFor="re-message">문의 내용</label><textarea id="re-message" name="message" rows={8} required /></div><label className="re-form__consent"><input type="checkbox" required /><span>상담을 위해 입력한 내용을 확인했습니다</span></label><button type="submit">입력 후 카카오톡 문의 열기<ArrowUpRight /></button></form></Section><Section split title="바로 연결"><div className="re-contact-direct"><a href={PHONE_TEL_HREF}>전화 문의 <b>{PHONE_NUMBER}</b><ArrowUpRight /></a><a href={KAKAO_CHANNEL_URL} target="_blank" rel="noreferrer">카카오톡 채널<ArrowUpRight /></a></div></Section></Contents></main>;
}

function NoticesPage() {
  const root = useRoot();
  const [keyword, setKeyword] = useState("");
  const { data, isLoading, error } = useQuery({ queryKey: ["notices", "published"], queryFn: listPublishedNotices });
  const notices = (data ?? []).filter((notice) => notice.title.toLowerCase().includes(keyword.trim().toLowerCase()));
  const board = useBoardPage(notices);
  return <main className="re-sub-page"><PageInfo category="고객센터" title="공지사항" /><Contents><LocalNav group="고객센터" path="/notices" /><Section wide><BoardSearch value={keyword} onChange={(value) => { setKeyword(value); board.setPage(1); }} label="공지사항 검색" /><div className="re-board"><ul className="re-board__list">{board.slice.map((notice) => <li className="re-board__item" key={notice.id}><Link to={`${root}/notices/${notice.id}`}><span className="re-board__body"><small>{notice.is_pinned ? "공지" : notice.category || "안내"}</small><strong>{notice.title}</strong></span><time>{new Date(notice.created_at).toLocaleDateString("ko-KR")}</time></Link></li>)}</ul></div>{isLoading && <p className="re-board__state">공지사항을 불러오는 중입니다</p>}{error && <p className="re-board__state">공지사항을 불러오지 못했습니다</p>}{!isLoading && !error && notices.length === 0 && <p className="re-board__state">등록된 공지사항이 없습니다</p>}<Pagination total={board.total} current={board.page} onSelect={board.setPage} /></Section></Contents></main>;
}

function NoticeDetailPage({ id }: { id: string }) {
  const root = useRoot();
  const { data, isLoading, error } = useQuery({ queryKey: ["notice", id], queryFn: () => getNotice(id), enabled: Boolean(id) });
  return <main className="re-sub-page"><PageInfo category="고객센터" title="공지사항" /><Contents><LocalNav group="고객센터" path="/notices" /><Section wide>{isLoading && <p className="re-board__state">공지사항을 불러오는 중입니다</p>}{(error || (!isLoading && !data)) && <p className="re-board__state">공지사항을 찾을 수 없습니다</p>}{data && <DetailArticle category={data.category || "공지"} title={data.title} date={new Date(data.created_at).toLocaleDateString("ko-KR")} listHref={`${root}/notices`}>{data.content}</DetailArticle>}</Section></Contents></main>;
}

function FaqPage() {
  const [keyword, setKeyword] = useState("");
  const items = FAQ.filter((item) => (item.question + item.answer).toLowerCase().includes(keyword.trim().toLowerCase()));
  return <main className="re-sub-page"><PageInfo category="고객센터" title="자주 묻는 질문" /><Contents><LocalNav group="고객센터" path="/faq" /><Section split title="질문 찾기"><BoardSearch value={keyword} onChange={setKeyword} label="자주 묻는 질문 검색" /><div className="re-faq">{items.map((item) => <details key={item.question}><summary><span>Q</span><strong>{item.question}</strong><i /></summary><div><span>A</span><p>{item.answer}</p></div></details>)}</div>{items.length === 0 && <p className="re-board__state">검색 결과가 없습니다</p>}</Section><ContactBand /></Contents></main>;
}

function AppsPage() {
  return <main className="re-sub-page"><PageInfo category="NOVERIQ" title="앱" /><Contents>
    <Section split title="출시한 앱"><div className="re-apps">
      {APPS.map((app) => <article className="re-app" key={app.slug}>
        <a className="re-app__photo" href={app.href} tabIndex={-1} aria-hidden="true"><img src={app.photoSmall} srcSet={`${app.photoSmall} 768w, ${app.photo} 1536w`} sizes="(max-width: 1023px) 100vw, 900px" alt="" loading="lazy" decoding="async" /></a>
        <div className="re-app__body">
          <img className="re-app__icon" src={app.icon} width="64" height="64" alt="" />
          <h3 className="re-app__name">{app.name}</h3>
          <p className="re-app__line">{app.line}</p>
          <p className="re-app__desc">{app.desc}</p>
          <ul className="re-app__facts">{app.facts.map((fact) => <li key={fact}><Check />{fact}</li>)}</ul>
          <a className="re-pill" href={app.href}>{app.name} 보기<ArrowRight /></a>
        </div>
      </article>)}
    </div></Section>
  </Contents></main>;
}

const ABOUT_VALUES = [
  { num: "01", title: "담당자와 직접 소통", desc: "기획 대행을 거치지 않고 제작 담당자와 바로 주고받습니다. 고칠 곳을 말하면 그날 반영합니다.", points: ["중간 전달 단계 없음", "요청한 수정은 진행 중에도 반영", "어려운 용어는 화면으로 설명"] },
  { num: "02", title: "문의로 이어지는 구조", desc: "방문자가 서비스와 위치, 가격을 첫 화면에서 보고 바로 연락하도록 메뉴 순서와 버튼 위치를 짭니다.", points: ["대표 서비스와 가격을 위쪽에 배치", "전화·지도·카카오톡 버튼 상시 노출", "모바일에서 누르기 쉬운 크기"] },
  { num: "03", title: "오픈 뒤에도 이어지는 관리", desc: "배포하고 끝내지 않습니다. 문구 수정, 사진 교체, 공지 등록을 오픈 이후에도 도와드립니다.", points: ["오픈 후 1개월 무상 수정", "운영 중 문구·사진 교체 지원", "관리자 화면에서 직접 관리"] },
];

function AboutPage() {
  return <main className="re-sub-page"><PageInfo category="NOVERIQ" title="회사 소개" /><SubHero step="ABOUT NOVERIQ" title={<>소상공인과 기업의<br />첫 화면을 만듭니다</>} image={SUBPAGE_MEDIA.custom} /><Contents>
    <Section split title="하는 일"><div className="re-step-body"><p className="re-step-text">업종에 맞는 화면을 설계하고, 운영자가 직접 다룰 수 있는 관리자 기능까지 함께 만듭니다. 상담부터 오픈, 오픈 이후 수정까지 한 사람이 맡습니다.</p><ul className="re-step-list"><li><Check />홈페이지 제작</li><li><Check />관리자 기능 개발</li><li><Check />오픈 후 운영 지원</li></ul></div></Section>
    {ABOUT_VALUES.map((value) => <Section key={value.num} split title={`${value.num} ${value.title}`}><div className="re-step-body"><p className="re-step-text">{value.desc}</p><ul className="re-step-list">{value.points.map((point) => <li key={point}><Check />{point}</li>)}</ul></div></Section>)}
    <Section split title="사업자 정보"><dl className="re-detail__spec">
      <div><dt>상호명</dt><dd>민트클</dd></div>
      <div><dt>대표자</dt><dd>김진수</dd></div>
      <div><dt>사업자등록번호</dt><dd>266-07-03678</dd></div>
      <div><dt>통신판매업신고번호</dt><dd>제2026-서울강남-00480호</dd></div>
      <div><dt>전화</dt><dd><a href={PHONE_TEL_HREF}>{PHONE_NUMBER}</a></dd></div>
      <div><dt>이메일</dt><dd><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></dd></div>
    </dl></Section>
    <ContactBand />
  </Contents></main>;
}

// 업종 솔루션과 업종 랜딩은 본 사이트 컴포넌트를 그대로 쓰고 리뉴얼 헤더·맨 아래 안에서 그린다.
// 안쪽 화면까지 다시 짜지 않고 껍데기만 리뉴얼로 맞추는 방식이다.
const SKINNED_SOLUTIONS: Record<string, ReturnType<typeof lazy>> = {
  "real-estate": lazy(() => import("@/pages/solutions/RealEstateSolution")),
  rentcar: lazy(() => import("@/pages/solutions/RentcarSolution")),
  hospital: lazy(() => import("@/pages/solutions/HospitalSolution")),
  academy: lazy(() => import("@/pages/solutions/AcademySolution")),
  interior: lazy(() => import("@/pages/solutions/InteriorSolution")),
  moving: lazy(() => import("@/pages/solutions/MovingSolution")),
  reservations: lazy(() => import("@/pages/solutions/ReservationSolution")),
  platform: lazy(() => import("@/pages/solutions/PlatformSolution")),
  "product-quotes": lazy(() => import("@/pages/solutions/ProductQuoteSolution")),
};

function SkinnedPage({ category, title, children }: { category: string; title: string; children: ReactNode }) {
  return <main className="re-sub-page re-sub-page--skinned"><PageInfo category={category} title={title} /><div className="re-skinned"><Suspense fallback={<p className="re-board__state">불러오는 중입니다</p>}>{children}</Suspense></div></main>;
}

function SolutionsPage() {
  const root = useRoot();
  return <main className="re-sub-page"><PageInfo category="기술력" title="솔루션 · 데모 체험" /><Contents>
    <LocalNav group="기술력" path="/web-solutions" />
    <Section split title="업종별 통합관리"><div className="re-step-body"><p className="re-step-text">업종마다 관리해야 할 항목이 다릅니다. 매물, 차량, 예약, 수강생, 견적처럼 실제 업무에 쓰는 화면을 관리자에 맞춰 만듭니다. 아래 여섯 업종은 관리자와 고객 화면을 직접 눌러 볼 수 있습니다.</p><ul className="re-step-list"><li><Check />관리자에서 올린 내용이 고객 화면에 바로 반영</li><li><Check />직원별 권한과 활동 기록</li><li><Check />업종에 없는 기능은 빼고 필요한 기능은 추가</li></ul></div></Section>
    <Section wide title="데모 체험">
      <ul className="re-solutions">{INDUSTRY_SHOWCASES.map((item) => <li key={item.key}>
        <div className="re-solutions__body"><small>{item.name}</small><strong>{item.cardTitle}</strong><span>{item.cardTagline}</span></div>
        <div className="re-solutions__links"><Link to={hrefIn(root, item.solutionHref)}>자세히</Link><a href={item.adminHref}>관리자 데모</a><a href={item.siteHref}>고객 화면</a></div>
      </li>)}</ul>
      <p className="re-estimate__note">데모 화면은 기능을 보여 주기 위한 예시입니다. 실제 제작에서는 색과 글꼴, 화면 구성을 업체에 맞춰 새로 잡습니다. 데모는 리뉴얼 시안이 아닌 현재 사이트 화면으로 열립니다.</p>
    </Section>
    <ContactBand />
  </Contents></main>;
}

function BlogPage() {
  return <main className="re-sub-page"><PageInfo category="NOVERIQ" title="블로그" /><Contents>
    <Section split title="제작 기록"><div className="re-step-body"><p className="re-step-text">제작 후기와 운영하면서 알게 된 것들을 네이버 블로그에 올립니다. 업종별 화면 구성, 관리자 사용법, 오픈 뒤 관리 방법을 다룹니다.</p><p className="re-detail__live"><a href={NAVER_BLOG_URL} target="_blank" rel="noreferrer">네이버 블로그 열기<ArrowUpRight /></a></p></div></Section>
    <ContactBand />
  </Contents></main>;
}

const PRIVACY_UPDATED = "2026년 9월 21일";
const PRIVACY_SECTIONS: { title: string; body: string[]; list?: string[] }[] = [
  {
    title: "01 수집하는 항목과 이용 목적",
    body: ["제작 상담과 문의 응대에만 씁니다. 그 밖의 용도로 쓰지 않습니다."],
    list: [
      "상담 신청 시 받는 항목 — 이름 또는 상호, 연락처, 참고 사이트, 문의 내용",
      "이용 목적 — 제작 범위와 견적 안내, 진행 일정 조율, 문의 회신",
      "홈페이지 이용 과정에서 자동으로 남는 항목 — 접속 기록, 브라우저 종류",
    ],
  },
  {
    title: "02 보관 기간",
    body: ["목적을 다한 뒤에는 지체 없이 지웁니다. 법에서 따로 정한 기간이 있으면 그 기간 동안만 보관합니다."],
    list: [
      "상담 기록 — 상담 종료 후 1년",
      "계약과 대금 결제 기록 — 전자상거래법에 따라 5년",
      "소비자 불만 또는 분쟁 처리 기록 — 전자상거래법에 따라 3년",
    ],
  },
  {
    title: "03 제3자 제공",
    body: ["제공하지 않습니다. 다만 법령에 따라 수사기관이 적법한 절차로 요구하면 그에 따릅니다."],
  },
  {
    title: "04 처리 위탁",
    body: ["홈페이지 운영에 필요한 범위에서 아래 업체에 처리를 맡깁니다. 위탁 내용이 바뀌면 이 문서에서 알립니다."],
    list: [
      "Supabase — 문의와 공지 데이터 보관",
      "Netlify — 홈페이지 호스팅",
    ],
  },
  {
    title: "05 이용자의 권리",
    body: ["언제든 본인 정보의 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 아래 연락처로 알려주시면 확인 후 처리합니다."],
  },
  {
    title: "06 쿠키",
    body: ["접속 기록을 남기기 위해 쿠키를 씁니다. 브라우저 설정에서 저장을 거부할 수 있습니다. 거부해도 홈페이지 이용에는 지장이 없습니다."],
  },
  {
    title: "07 안전성 확보 조치",
    body: ["접근 권한을 담당자로 제한하고, 전송 구간을 암호화하며, 보관 기간이 지난 자료는 지웁니다."],
  },
  {
    title: "08 책임자와 문의처",
    body: [
      "개인정보와 관련한 문의, 불만, 피해 구제는 아래로 연락해 주세요. 확인 후 회신드립니다.",
      `개인정보 보호책임자 김진수 (대표)`,
      `상호명 민트클 · 사업자등록번호 266-07-03678`,
      `전화 ${PHONE_NUMBER} · 이메일 ${CONTACT_EMAIL}`,
      "접수는 24시간 가능하며 영업일 1일 이내에 회신드립니다.",
      "개인정보 분쟁조정위원회 1833-6972 · 개인정보침해 신고센터 118 로도 도움을 받으실 수 있습니다.",
    ],
  },
  {
    title: "09 변경 안내",
    body: ["내용이 바뀌면 시행일과 바뀐 내용을 이 페이지에 올립니다."],
  },
];

function PrivacyPage() {
  return <main className="re-sub-page"><PageInfo category="NOVERIQ" title="개인정보처리방침" /><Contents>
    <Section split title="처리 원칙"><div className="re-step-body"><p className="re-step-text">민트클은 홈페이지 제작 상담에 필요한 최소한의 정보만 받습니다. 받은 정보는 상담과 제작 진행에만 쓰고, 목적을 다하면 지웁니다.</p><ul className="re-step-list"><li><Check />최소 수집</li><li><Check />목적 외 사용 없음</li><li><Check />제3자 제공 없음</li></ul></div></Section>
    {PRIVACY_SECTIONS.map((section) => <Section key={section.title} split title={section.title}>
      <div className="re-step-body">{section.body.map((line) => <p className="re-step-text" key={line}>{line}</p>)}{section.list && <ul className="re-step-list">{section.list.map((item) => <li key={item}><Check />{item}</li>)}</ul>}</div>
    </Section>)}
    <Section split title="사업자 정보"><dl className="re-detail__spec">
      <div><dt>상호명</dt><dd>민트클</dd></div>
      <div><dt>대표자</dt><dd>김진수</dd></div>
      <div><dt>사업자등록번호</dt><dd>266-07-03678</dd></div>
      <div><dt>통신판매업신고번호</dt><dd>제2026-서울강남-00480호</dd></div>
      <div><dt>전화</dt><dd><a href={PHONE_TEL_HREF}>{PHONE_NUMBER}</a></dd></div>
      <div><dt>이메일</dt><dd><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></dd></div>
      <div><dt>시행일</dt><dd>{PRIVACY_UPDATED}</dd></div>
    </dl></Section>
  </Contents></main>;
}

function NotFound() {
  const root = useRoot();
  return <main className="re-sub-page"><PageInfo category="NOVERIQ" title="페이지를 찾을 수 없습니다" /><Contents><Section><p className="re-step-text">주소가 바뀌었거나 삭제된 페이지입니다</p><p className="re-detail__live"><Link to={root}>메인으로 돌아가기<ArrowRight /></Link></p></Section></Contents></main>; }

function RouteContent({ path }: { path: string }) {
  const root = useRoot();
  if (path === "/") return <EditorialHome />;
  if (path === "/web-solutions" || path === "/templates" || path.startsWith("/templates/") || path === "/homepage" || path.startsWith("/homepage/")) return <Navigate to={`${root}/website/price`} replace />;
  if (path === "/samples" || path.startsWith("/samples/")) return <Navigate to={`${root}/`} replace />;
  if (path === "/contact") return <ContactPage />;
  if (path === "/notices") return <NoticesPage />;
  if (path.startsWith("/notices/")) return <NoticeDetailPage id={path.split("/")[2]} />;
  if (path === "/faq") return <FaqPage />;
  if (path === "/privacy") return <PrivacyPage />;
  if (path === "/about") return <AboutPage />;
  if (path === "/apps") return <AppsPage />;
  if (path === "/estimate") return <Navigate to={`${root}/website/price`} replace />;
  if (path === "/web-solutions/demos" || path === "/solutions") return <SolutionsPage />;
  if (path.startsWith("/web-solutions/")) {
    const Solution = SKINNED_SOLUTIONS[path.split("/")[2]];
    if (Solution) return <SkinnedPage category="기술력" title="업종 솔루션"><Solution /></SkinnedPage>;
  }
  if (path === "/blog") return <BlogPage />;
  const key = Object.entries({ "/website/process": "process", "/website/price": "price", "/website/features": "features", "/website/maintenance": "maintenance", "/services/custom": "custom", "/services/admin-system": "admin-system", "/services/inquiry-reservation": "inquiry-reservation", "/services/search-filter": "search-filter", "/services/content-management": "content-management", "/services/database-api": "database-api", "/services/responsive": "responsive", "/services/seo": "seo" }).find(([route]) => route === path)?.[1] as PageKey | undefined;
  return key ? <StandardPage page={PAGE_DATA[key]} path={path} /> : <NotFound />;
}

/** 본 사이트 루트에 리뉴얼 헤더·맨 아래만 씌울 때 쓴다. 안쪽 화면은 각 페이지가 그린다. */
export function RenewalShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useEditorialMotion(pathname);
  return <RootContext.Provider value=""><div className="renewal-editorial"><Header /><div id="re-main" tabIndex={-1}>{children}</div><Footer /></div></RootContext.Provider>;
}

function RenewalEditorialInner() {
  const { pathname } = useLocation(); const path = pathFromLocation(pathname, PREVIEW_ROOT); useEditorialMotion(pathname);
  useEffect(() => { const label = path === "/" ? "홈페이지 제작" : path.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ") ?? "홈페이지 제작"; document.title = `NOVERIQ · ${label}`; }, [path]);
  return <div className="renewal-editorial"><Header /><div id="re-main" tabIndex={-1}><RouteContent path={path} /></div><Footer /></div>;
}

/** 옛 쪽들은 usePageTitle 로 제목 · canonical · og:url 을 굽는데 리뉴얼 본문은 안 불러서 홈 기본값으로 남았다. */
function PageMeta({ page }: { page: ContentPage }) { usePageTitle(`${page.title} — NOVERIQ`, page.intro); return null; }

/** 본 사이트 루트에서 쓰는 리뉴얼 본문들. 껍데기는 SiteLayout 이 이미 씌운다. */
export function RenewalHomeBody() { return <EditorialHome />; }
export function RenewalPriceBody() { return <><PageMeta page={PAGE_DATA.price} /><PriceDetail page={PAGE_DATA.price} path="/website/price" /></>; }
export function RenewalPrivacyBody() { return <PrivacyPage />; }
export function RenewalAppsBody() {
  usePageTitle("앱 — NOVERIQ", "노베릭이 출시한 앱. 윈도우 PC와 안드로이드 폰 · 태블릿에서 쓰는 앱을 만듭니다.");
  return <AppsPage />;
}

/** 제작 안내·기술력 12쪽을 본 사이트에서도 리뉴얼 본문으로 그린다. 경로로 어느 쪽인지 고른다. */
const CONTENT_ROUTES: Record<string, PageKey> = {
  "/website/process": "process", "/website/price": "price", "/website/features": "features", "/website/maintenance": "maintenance",
  "/services/custom": "custom", "/services/admin-system": "admin-system", "/services/inquiry-reservation": "inquiry-reservation",
  "/services/search-filter": "search-filter", "/services/content-management": "content-management",
  "/services/database-api": "database-api", "/services/responsive": "responsive", "/services/seo": "seo",
};
export function RenewalContentBody() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";
  const key = CONTENT_ROUTES[path];
  if (!key) return <NotFound />;
  // 서비스 8쪽은 안에 넣는 옛 본문(LEGACY_SERVICE_BODY)이 이미 usePageTitle 을 부른다
  return <>{!LEGACY_SERVICE_BODY[key] && <PageMeta page={PAGE_DATA[key]} />}<StandardPage page={PAGE_DATA[key]} path={path} /></>;
}

export default function RenewalEditorial() {
  return <RootContext.Provider value={PREVIEW_ROOT}><RenewalEditorialInner /></RootContext.Provider>;
}
