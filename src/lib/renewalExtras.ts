/**
 * 리뉴얼 서브페이지에 되살린 알맹이.
 *
 * 12쪽을 리뉴얼 골격으로 바꾸면서 본문이 쪽당 850자 안팎으로 얇아졌다.
 * 기존 쪽들이 갖고 있던 내용을 그대로 가져와, 모델링 사이트(NHN Cloud)에서
 * 실측한 배치 세 가지에 담는다. 문구를 새로 쓰지 않는다 — 기존 배열을 그대로 읽는다.
 *
 *   items   → NHN "주요 서비스" 2열 목록 (아이콘 타일 88x88 + 제목 + 설명)
 *   steps   → NHN "도움 되는 정보" 파스텔 카드 (308x308 · 라운드 12 · 간격 16 · 여백 32)
 *   compare → NHN "주요 솔루션" 가로 아코디언 (접힘 79 / 펼침 865 / 높이 520)
 *   points  → 같은 2열 목록에서 설명만 없는 형태
 */
import { COMPARE, STEPS as CUSTOM_STEPS, COST_FACTORS } from "@/pages/services/CustomDevService";
import { INDUSTRY_DEMOS, FEATURED_ITEMS } from "@/pages/services/AdminSystemService";
import { INDUSTRY_USES as INQUIRY_USES } from "@/pages/services/InquiryReservationService";
import { INDUSTRY_USES as SEARCH_USES } from "@/pages/services/SearchFilterService";
import { BUILDABLE_CONTENT, INDUSTRY_USES as CONTENT_USES } from "@/pages/services/ContentManagementService";
import { IN_USE, AVAILABLE, NEED_CASES } from "@/pages/services/DatabaseApiService";
import { DEVICES, PROBLEMS_WITHOUT } from "@/pages/services/ResponsiveService";
import { APPLIED_ITEMS, DOES, DOES_NOT } from "@/pages/services/SeoService";
import { STEPS as PROCESS_STEPS, REQUIRED_MATERIALS } from "@/pages/website/ProcessLanding";
import { BASIC_FEATURE_GROUPS, ADMIN_FEATURES } from "@/pages/website/FeaturesLanding";
import { GLOSSARY, COST_TIERS } from "@/pages/website/MaintenanceLanding";

export type ExtraItem = { title: string; desc: string };
export type ExtraStep = { no: string; title: string; desc: string };
export type ExtraCompare = { name: string; desc: string; points: readonly string[]; href?: string; linkLabel?: string };
export type ExtraBlock =
  | { kind: "items"; title: string; rows: ExtraItem[] }
  | { kind: "points"; title: string; rows: string[] }
  | { kind: "steps"; title: string; rows: ExtraStep[] }
  | { kind: "compare"; title: string; rows: ExtraCompare[] };

const items = (title: string, rows: ExtraItem[]): ExtraBlock => ({ kind: "items", title, rows });
const points = (title: string, rows: readonly string[]): ExtraBlock => ({ kind: "points", title, rows: [...rows] });
const steps = (title: string, rows: ExtraStep[]): ExtraBlock => ({ kind: "steps", title, rows });
const compare = (title: string, rows: ExtraCompare[]): ExtraBlock => ({ kind: "compare", title, rows });

export const PAGE_EXTRAS: Record<string, ExtraBlock[]> = {
  process: [
    steps("진행 순서", PROCESS_STEPS.map((s) => ({ no: s.num, title: s.title, desc: s.lede }))),
    items("미리 준비해 주시면 빨라지는 것", REQUIRED_MATERIALS.map((m) => ({ title: m.title, desc: m.desc }))),
  ],
  features: [
    items("기본으로 들어가는 것", BASIC_FEATURE_GROUPS.map((g) => ({ title: g.title, desc: g.items.join(" · ") }))),
    points("관리자에서 다루는 항목", ADMIN_FEATURES),
  ],
  maintenance: [
    items("먼저 알아 두면 좋은 말", GLOSSARY.map((g) => ({ title: g.term, desc: g.desc }))),
    items("수정 요청은 이렇게 처리합니다", COST_TIERS.map((t) => ({ title: t.title, desc: t.desc }))),
  ],
  custom: [
    compare("고르는 것과 설계하는 것", COMPARE.map((c) => ({ name: c.name, desc: c.desc, points: c.points, href: c.href, linkLabel: c.linkLabel }))),
    steps("상담부터 오픈까지", CUSTOM_STEPS.map((s) => ({ no: s.no, title: s.title, desc: s.desc }))),
    points("비용이 정해지는 기준", COST_FACTORS),
  ],
  "admin-system": [
    items("이런 항목을 직접 관리합니다", FEATURED_ITEMS.map((f) => ({ title: f.title, desc: f.benefit }))),
    items("업종에 맞게 다르게 구성합니다", INDUSTRY_DEMOS.map((d) => ({ title: d.label, desc: d.flow }))),
  ],
  "inquiry-reservation": [
    items("업종별 접수 흐름", INQUIRY_USES.map((u) => ({ title: u.label, desc: u.flow }))),
  ],
  "search-filter": [
    items("업종별 실제 활용", SEARCH_USES.map((u) => ({ title: u.label, desc: u.desc }))),
  ],
  "content-management": [
    items("직접 올릴 수 있는 것", BUILDABLE_CONTENT.map((c) => ({ title: c.label, desc: c.example }))),
    items("업종별 실제 활용", CONTENT_USES.map((u) => ({ title: u.label, desc: u.content }))),
  ],
  "database-api": [
    items("지금 쓰고 있는 것", IN_USE.map((x) => ({ title: x.name, desc: x.desc }))),
    items("연결할 수 있는 것", AVAILABLE.map((x) => ({ title: x.name, desc: x.desc }))),
    points("이럴 때 필요합니다", NEED_CASES),
  ],
  responsive: [
    items("세 화면에서 확인합니다", DEVICES.map((d) => ({ title: `${d.label} ${d.width}`, desc: d.note }))),
    points("반응형이 아니면 생기는 일", PROBLEMS_WITHOUT),
  ],
  seo: [
    items("실제로 넣는 항목", APPLIED_ITEMS.map((a) => ({ title: a.name, desc: a.desc }))),
    points("하는 것", DOES),
    points("하지 않는 것", DOES_NOT),
  ],
};
