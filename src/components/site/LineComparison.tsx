import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * 템플릿 라인 ↔ 프리미엄 라인 비교.
 *
 * 관리자 모드 · 반응형 · DB · 문자는 두 라인 모두 기본 제공이므로(PriceLanding의
 * "기본으로 제공되는 것", templatePackages의 PRICING_ROWS와 같은 사실) 기능을
 * 차별점으로 쓰지 않는다. 같은 것을 먼저 인정하고, 실제로 갈리는 항목만 표로 보여준다.
 */

/** 두 라인 모두 기본 제공 — 여기서 빼거나 더할 때는 PriceLanding의 INCLUDED_BY_DEFAULT와 함께 고친다 */
const SAME_IN_BOTH = [
  "관리자 모드 (공지 · 문의 · 콘텐츠 관리)",
  "반응형 제작 (PC · 태블릿 · 모바일)",
  "DB · 파일 무제한",
  "실시간 문자 기능",
  "기본 SEO 설정",
  "도메인 1개 (첫 1년 무료)",
  "문의 · 상담 연결",
  "배포 및 오픈 지원",
];

type DiffRow = { label: string; template: string; premium: string };

const DIFF_ROWS: DiffRow[] = [
  {
    label: "화면 시작점",
    template: "완성된 템플릿에서 고릅니다",
    premium: "프리미엄 등급 시안에서 다시 구성합니다",
  },
  {
    label: "화면 구성",
    template: "템플릿 구조 그대로, 내용만 교체",
    premium: "섹션 순서 · 개수를 사업에 맞춰 재배치",
  },
  {
    label: "브랜드 색 · 글꼴",
    template: "템플릿에 정해진 값",
    premium: "브랜드에 맞춰 교체",
  },
  {
    label: "사진",
    template: "보내주신 사진 · 업종 기본 사진",
    premium: "브랜드에 맞춰 새로 제작",
  },
  {
    label: "화면 연출",
    template: "스크롤 등장 · 기본 인터랙션",
    premium: "고정 히어로 · 스크롤 확대 · 겹쳐 쌓이는 배치",
  },
  {
    label: "관리 항목",
    template: "공지 · 문의 · 콘텐츠 (정해진 항목)",
    premium: "사업 데이터에 맞춰 설계 · 조건 검색 · 직원별 권한",
  },
  {
    label: "첫해 호스팅 · 셋팅",
    template: "항목별로 더해집니다",
    premium: "포함",
  },
  {
    label: "예약 접수 · 관리",
    template: "별도 협의",
    premium: "포함",
  },
  {
    label: "제작 기간",
    template: "영업일 7일부터",
    premium: "3~4주 (상담 후 확정)",
  },
];

/** 라인별 상세 페이지 — 지금 보고 있는 페이지로 가는 버튼은 빼고 보여준다 */
const LINE_LINKS = [
  { to: "/templates", label: "템플릿 라인 보기" },
  { to: "/web-solutions", label: "프리미엄 라인 보기" },
];

/**
 * 템플릿 라인과 프리미엄 라인의 차이 — /website/price와 /web-solutions에서 같은 표를 쓴다.
 *
 * showSameBlock: /website/price에는 바로 위에 "기본으로 제공되는 것" 목록이 이미 있어
 * 같은 항목이 두 번 나오므로 그 페이지에서는 끈다.
 */
export function LineComparison({ showSameBlock = true }: { showSameBlock?: boolean }) {
  const { pathname } = useLocation();

  return (
    <div>
      <h2 className="text-3xl font-bold text-foreground break-keep sm:text-4xl">
        템플릿 라인과 프리미엄 라인, 무엇이 다를까요?
      </h2>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground break-keep">
        기능은 양쪽 다 똑같이 들어갑니다. 다른 것은 완성된 화면을 <strong className="font-semibold text-foreground">고르시는지</strong>,
        브랜드에 맞춰 <strong className="font-semibold text-foreground">짓는지</strong>입니다.
      </p>

      {/* 같은 것을 먼저 밝힌다 */}
      {showSameBlock && (
        <div className="mt-7 rounded-2xl border border-border bg-secondary/30 p-6 sm:p-7">
          <p className="text-base font-bold text-foreground">두 라인 모두 기본으로 들어가는 것</p>
          <p className="mt-1.5 text-sm text-muted-foreground break-keep">
            관리자 기능과 반응형이 프리미엄에만 있는 것이 아닙니다. 아래는 64만원 기본형에도 그대로
            들어갑니다.
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {SAME_IN_BOTH.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground break-keep">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 실제로 갈리는 항목 */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full border-collapse text-xs sm:min-w-[42rem] sm:text-sm">
          <caption className="sr-only">
            템플릿 라인과 프리미엄 라인에서 실제로 달라지는 항목 비교
          </caption>
          <thead>
            <tr className="bg-card">
              <th scope="col" className="w-[5rem] px-2 py-3 text-left align-bottom sm:w-[9.5rem] sm:px-4 sm:py-4">
                <span className="text-[11px] font-semibold text-muted-foreground break-keep sm:text-xs">
                  여기가 갈립니다
                </span>
              </th>
              <th scope="col" className="px-2 py-3 text-left align-bottom sm:px-4 sm:py-4">
                <span className="block text-sm font-bold text-foreground sm:text-base">템플릿 라인</span>
                <span className="mt-0.5 block text-[11px] font-bold text-muted-foreground sm:text-sm">64만원 ~ 114만원</span>
              </th>
              <th scope="col" className="bg-primary/[0.06] px-2 py-3 text-left align-bottom sm:px-4 sm:py-4">
                <span className="block text-sm font-bold text-primary sm:text-base">프리미엄 라인</span>
                <span className="mt-0.5 block text-[11px] font-bold text-primary/80 sm:text-sm">300만원 ~</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {DIFF_ROWS.map((row, i) => (
              <tr key={row.label} className={i % 2 ? "bg-secondary/25" : ""}>
                <th
                  scope="row"
                  className="border-t border-border px-2 py-3 text-left align-top font-semibold text-foreground break-keep sm:px-4 sm:py-3.5"
                >
                  {row.label}
                </th>
                <td className="border-t border-border px-2 py-3 align-top text-muted-foreground break-keep sm:px-4 sm:py-3.5">
                  {row.template}
                </td>
                <td className="border-t border-border bg-primary/[0.04] px-2 py-3 align-top font-medium text-foreground break-keep sm:px-4 sm:py-3.5">
                  {row.premium}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground break-keep">
        올릴 내용이 계속 늘어나거나(매물 · 객실 · 시술 · 메뉴 · 작품), 손님이 조건으로 골라야 하거나,
        브랜드 사진부터 새로 만들어야 한다면 프리미엄 라인이 맞습니다. 그렇지 않다면 템플릿 라인으로
        시작하시는 편이 낫습니다.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">
        유지보수는 두 라인이 같습니다. 오픈 후 1개월은 무상이고, 이후에는 월 3만원 계약(간단 수정
        월 3회)이나 건별 협의로 진행합니다.{" "}
        <Link to="/website/maintenance" className="font-semibold text-primary hover:underline">
          유지보수 안내 보기
        </Link>
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        {LINE_LINKS.filter((l) => l.to !== pathname).map((l) => (
          <Button key={l.to} asChild size="lg" variant="outline" className="gap-1.5 font-semibold">
            <Link to={l.to}>
              {l.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        ))}
        <Button asChild size="lg" className="gap-2 font-bold">
          <Link to="/contact">
            <Send className="h-4 w-4" />
            어느 쪽이 맞는지 상담받기
          </Link>
        </Button>
      </div>
    </div>
  );
}
