import { Link } from "react-router-dom";
import { Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { KAKAO_CHANNEL_URL } from "@/lib/contact";

const GLOSSARY = [
  { term: "도메인", desc: "홈페이지 주소입니다. 예: company.co.kr" },
  { term: "호스팅", desc: "홈페이지가 인터넷에서 운영되는 서버 공간입니다." },
  {
    term: "유지보수",
    desc: "홈페이지 오픈 후 필요한 문구 수정, 이미지 교체, 페이지 변경, 신규 기능, 오류 대응, 디자인 변경 등을 말합니다.",
  },
];

const SIMPLE_SCOPE = ["오타 수정", "연락처 변경", "주소 변경", "텍스트 수정", "단순 이미지 교체"];
const SEPARATE_SCOPE = ["신규 페이지", "레이아웃 변경", "새로운 기능", "DB 변경", "API 추가", "결제 기능", "회원 기능", "전체 리뉴얼"];

export default function MaintenanceLanding() {
  usePageTitle(
    "유지보수 안내 — MintCL",
    "홈페이지 오픈 이후 도메인, 호스팅, 유지보수가 어떻게 지원되는지 안내합니다.",
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">SUPPORT</p>
      <h1 className="mt-3 text-3xl font-semibold">홈페이지는 오픈 이후에도 관리가 필요합니다.</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        간단한 내용 수정부터 신규 기능 추가와 리뉴얼까지, 필요한 범위에 따라 지원합니다.
      </p>

      <h2 className="mt-16 text-xl font-semibold">도메인 · 호스팅 · 유지보수, 처음이어도 괜찮습니다</h2>
      <dl className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
        {GLOSSARY.map((g) => (
          <div key={g.term} className="grid gap-1 p-5 sm:grid-cols-[120px_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-foreground">{g.term}</dt>
            <dd className="text-sm leading-relaxed text-muted-foreground break-keep">{g.desc}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80 break-keep">
        도메인과 호스팅은 대행해서 안내드리며, 보유하신 도메인이 있다면 그대로 사용할 수 있습니다. 두
        가지 모두 기간제로 운영되어 주기적인 갱신이 필요하며, 만료 전에 미리 안내드립니다.
      </p>

      <h2 className="mt-16 text-xl font-semibold">현재 지원 정책</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground">일반 홈페이지</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">
            오픈 이후 수정은 기본 AS 기간 내 무료로 진행하며, 이후에는 건별 또는 월 유지보수 방식으로
            지원합니다.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground">업종별 맞춤 홈페이지</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">
            문구 수정 등 간단한 요청을 월 3회까지 기본으로 지원합니다. 그 외 범위는 별도 협의로
            진행합니다.
          </p>
        </div>
      </div>

      <h2 className="mt-16 text-xl font-semibold">유지보수 범위</h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-base font-semibold text-foreground">간단 수정</h3>
          <ul className="mt-4 space-y-2">
            {SIMPLE_SCOPE.map((item) => (
              <li key={item} className="text-sm text-foreground break-keep">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:border-l sm:border-border sm:pl-8">
          <h3 className="text-base font-semibold text-foreground">별도 작업 (견적 후 진행)</h3>
          <ul className="mt-4 space-y-2">
            {SEPARATE_SCOPE.map((item) => (
              <li key={item} className="text-sm text-foreground break-keep">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          이미 제작한 홈페이지의 수정·유지보수든, 새로운 제작 문의든 편하게 남겨주세요.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild className="gap-2 font-bold">
            <Link to="/contact?service=유지보수 / 수정 문의">
              <Send className="h-4 w-4" />
              유지보수 문의
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 font-bold">
            <Link to="/contact">제작 문의</Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 font-bold">
            <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              카카오톡 문의
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
