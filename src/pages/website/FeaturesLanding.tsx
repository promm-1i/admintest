import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";

const FEATURE_GROUPS = [
  {
    num: "01",
    title: "기본 웹사이트 기능",
    desc: "모든 홈페이지에 필요한 기본 기능입니다.",
    items: ["PC / 모바일 반응형", "문의 버튼", "전화 연결", "카카오톡 연결", "지도", "게시판", "FAQ", "이미지 갤러리", "파일 다운로드", "기본 SEO"],
  },
  {
    num: "02",
    title: "고객 편의 기능",
    desc: "고객이 홈페이지에서 직접 사용하는 기능입니다.",
    items: ["검색", "조건별 필터", "예약", "견적 요청", "문의폼", "회원가입", "로그인", "마이페이지", "결제", "파일 업로드"],
  },
  {
    num: "03",
    title: "관리자 기능",
    desc: "운영자가 관리자 페이지에서 사용하는 기능입니다.",
    items: ["공지 등록", "콘텐츠 수정", "상품 / 매물 / 차량 관리", "고객 문의 관리", "예약 관리", "일정 관리", "공개 / 비공개", "직원 관리", "권한 관리", "통계", "활동로그"],
  },
  {
    num: "04",
    title: "확장 기능",
    desc: "필요한 경우 추가로 구축할 수 있는 기능입니다.",
    items: ["데이터베이스", "외부 API", "공공데이터 연동", "주소 검색", "지도 기반 검색", "SMS", "이메일", "AI 기능", "챗봇", "회원관리", "결제", "배송", "다국어"],
  },
];

const INDUSTRY_FLOWS = [
  { name: "부동산", flow: ["매물관리", "고객관리", "임장", "계약", "홈페이지 공개"] },
  { name: "병원 · 의원", flow: ["진료과목", "의료진", "예약", "문의", "홈페이지 공개"] },
  { name: "학원", flow: ["학생", "수강", "출결", "성적", "수강료"] },
  { name: "인테리어 · 리모델링", flow: ["문의", "실측", "견적", "계약", "공정", "A/S"] },
  { name: "이사 · 청소", flow: ["견적", "예약", "작업팀 배정", "결제", "후기"] },
];

export default function FeaturesLanding() {
  usePageTitle(
    "기능 소개 — MintCL",
    "MintCL 홈페이지 제작에서 구현 가능한 기본 기능, 고객 편의 기능, 관리자 기능, 확장 기능을 안내합니다.",
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">FEATURES</p>
      <h1 className="mt-3 text-3xl font-semibold">어디까지 구현할 수 있는지 확인해보세요.</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        기본적인 웹 기능부터 예약·문의를 관리하는 관리자 기능, 결제·회원 같은 확장 기능까지 필요한
        범위에 맞춰 구성합니다.
      </p>

      <div className="mt-14 space-y-14">
        {FEATURE_GROUPS.map((group) => (
          <div key={group.num}>
            <div className="flex items-baseline gap-3 border-b border-border pb-4">
              <span className="font-mono text-xs font-bold text-primary">{group.num}</span>
              <h2 className="text-lg font-semibold text-foreground">{group.title}</h2>
              <span className="text-xs text-muted-foreground">{group.desc}</span>
            </div>
            <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-foreground break-keep">
                  {item}
                </li>
              ))}
            </ul>
            {group.num === "03" && (
              <Link
                to="/#industry-section"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                업종별 관리자 데모 보러 가기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-xl font-semibold">업종별 실제 활용 예</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        업종별 맞춤 제작에서는 아래처럼 실제 업무 흐름에 맞춰 관리자 기능이 연결됩니다.
      </p>
      <div className="mt-6 space-y-4">
        {INDUSTRY_FLOWS.map((ind) => (
          <div key={ind.name} className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:gap-6">
            <span className="shrink-0 text-sm font-semibold text-foreground sm:w-40">{ind.name}</span>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-muted-foreground">
              {ind.flow.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-foreground">{step}</span>
                  {i < ind.flow.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground/50" />}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">우리 업종에 맞는 관리자 기능이 궁금하신가요?</p>
        <div className="mt-5 flex justify-center">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/#industry-section">
              업종별 맞춤 제작 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
