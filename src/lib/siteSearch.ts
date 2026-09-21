import { SAMPLES } from "@/lib/samples";
import { INDUSTRY_LANDING } from "@/lib/industryLanding";
import { INDUSTRY_SHOWCASES } from "@/components/site/industryShowcase";

export type SearchHit = {
  kind: "디자인" | "업종" | "솔루션" | "안내";
  title: string;
  desc: string;
  href: string;
  image?: string;
  code?: string;
};

/** 메뉴로만 찾기에는 디자인이 150종을 넘는다. 한 줄 입력으로 전부 훑는다. */
const PAGES: SearchHit[] = [
  { kind: "안내", title: "제작 방법", desc: "상담에서 오픈까지 순서", href: "/website/process" },
  { kind: "안내", title: "제작 비용", desc: "형태와 구성별 금액", href: "/website/price" },
  { kind: "안내", title: "견적 계산기", desc: "기능을 골라 예상 금액 확인", href: "/estimate" },
  { kind: "안내", title: "기능 소개", desc: "화면과 운영 기능", href: "/website/features" },
  { kind: "안내", title: "유지보수", desc: "오픈 뒤 수정과 운영", href: "/website/maintenance" },
  { kind: "안내", title: "커스텀 개발", desc: "업무에 맞춘 기능 개발", href: "/services/custom" },
  { kind: "안내", title: "관리자 시스템", desc: "공지·문의·콘텐츠 직접 관리", href: "/services/admin-system" },
  { kind: "안내", title: "문의 · 예약 관리", desc: "접수부터 알림까지", href: "/services/inquiry-reservation" },
  { kind: "안내", title: "검색 · 필터 기능", desc: "조건으로 거르는 목록", href: "/services/search-filter" },
  { kind: "안내", title: "콘텐츠 관리", desc: "소식·사례·갤러리 등록", href: "/services/content-management" },
  { kind: "안내", title: "DB · API 연동", desc: "외부 서비스와 자료 연결", href: "/services/database-api" },
  { kind: "안내", title: "반응형 웹 제작", desc: "PC·태블릿·모바일 화면", href: "/services/responsive" },
  { kind: "안내", title: "검색엔진 최적화", desc: "검색 결과에 맞춘 설정", href: "/services/seo" },
  { kind: "안내", title: "회사 소개", desc: "NOVERIQ 가 하는 일", href: "/about" },
  { kind: "안내", title: "문의하기", desc: "제작 상담 접수", href: "/contact" },
  { kind: "안내", title: "자주 묻는 질문", desc: "비용·기간·관리자 기능", href: "/faq" },
  { kind: "안내", title: "공지사항", desc: "제작 안내와 소식", href: "/notices" },
  { kind: "안내", title: "개인정보처리방침", desc: "수집 항목과 보관 기간", href: "/privacy" },
];

let cache: SearchHit[] | null = null;

function buildIndex(): SearchHit[] {
  const hits: SearchHit[] = [...PAGES];
  for (const sample of SAMPLES) {
    if (!sample.image) continue;
    hits.push({
      kind: "디자인",
      title: sample.premiumLabel ? `${sample.premiumLabel} · ${sample.industry}` : sample.industry,
      desc: sample.tag ?? sample.type.join(" · "),
      href: `/samples/${sample.slug}`,
      image: sample.image,
      code: sample.designCode,
    });
  }
  for (const [key, copy] of Object.entries(INDUSTRY_LANDING)) {
    hits.push({ kind: "업종", title: copy.keyword, desc: copy.intro, href: `/homepage/${key}` });
  }
  for (const item of INDUSTRY_SHOWCASES) {
    hits.push({ kind: "솔루션", title: item.cardTitle, desc: item.cardTagline, href: item.solutionHref });
  }
  return hits;
}

/** 띄어쓰기로 나눈 낱말이 모두 들어 있어야 맞는 것으로 본다 */
export function searchSite(query: string, limit = 20): SearchHit[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  cache ??= buildIndex();
  const scored: { hit: SearchHit; score: number }[] = [];
  for (const hit of cache) {
    const haystack = `${hit.title} ${hit.desc} ${hit.code ?? ""} ${hit.kind}`.toLowerCase();
    if (!words.every((word) => haystack.includes(word))) continue;
    // 제목에 맞으면 위로, 디자인·업종을 안내 문서보다 앞에 둔다
    const inTitle = words.every((word) => hit.title.toLowerCase().includes(word));
    scored.push({ hit, score: (inTitle ? 100 : 0) + (hit.kind === "안내" ? 0 : 10) });
  }
  scored.sort((a, b) => b.score - a.score || a.hit.title.localeCompare(b.hit.title, "ko"));
  return scored.slice(0, limit).map((x) => x.hit);
}
