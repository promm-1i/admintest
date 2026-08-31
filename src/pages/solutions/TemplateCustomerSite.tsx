import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Info, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";

/**
 * 업종별 솔루션 데모의 "고객 홈페이지" 공용 화면.
 *
 * public/templates/{slug}-landing/ 에 배포된 실제 랜딩형 템플릿을 iframe 으로
 * 그대로 보여주고, 진입 시 "이건 예시일 뿐, 실제 구축은 완전 커스텀" 안내 팝업을
 * 한 번 띄운다. (상단 바의 안내 버튼으로 언제든 다시 볼 수 있다)
 */
export default function TemplateCustomerSite({
  slug,
  name,
  adminHref,
}: {
  /** public/templates/{slug}-landing/ 의 slug */
  slug: string;
  /** 상단 바에 표시할 데모 업체명 */
  name: string;
  /** 관리자 데모로 돌아가는 경로 */
  adminHref: string;
}) {
  usePageTitle(
    `${name} — 고객 홈페이지 데모`,
    `NOVERIQ ${name} 맞춤형 웹 솔루션의 고객용 홈페이지 예시 화면입니다.`,
  );
  const [notice, setNotice] = useState(true);

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-neutral-950">
      {/* 데모 상단 바 */}
      <div className="flex items-center gap-3 px-4 py-2.5 text-white">
        <Link
          to={adminHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white"
        >
          <ArrowLeft className="size-4" />
          관리자 데모
        </Link>
        <span className="h-4 w-px bg-white/20" aria-hidden="true" />
        <span className="text-sm font-bold">{name} · 고객 홈페이지</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/60">
          데모
        </span>
        <button
          onClick={() => setNotice(true)}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10"
        >
          <Info className="size-3.5" />
          이 화면은 예시입니다
        </button>
      </div>

      {/* 실제 랜딩형 템플릿 */}
      <iframe
        src={`/templates/${slug}-landing/`}
        title={`${name} 고객 홈페이지 데모`}
        className="w-full flex-1 border-0 bg-white"
      />

      {/* 커스텀 안내 팝업 */}
      {notice && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-5 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="고객 홈페이지 안내"
          onClick={() => setNotice(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-neutral-950 text-white">
                <Sparkles className="size-5" />
              </span>
              <button
                onClick={() => setNotice(false)}
                className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
                aria-label="닫기"
              >
                <X className="size-5" />
              </button>
            </div>
            <h2 className="mb-2 text-lg font-extrabold text-neutral-950">
              지금 보시는 화면은 구축 예시입니다
            </h2>
            <p className="mb-5 text-[15px] leading-relaxed text-neutral-600">
              기존에 구축한 사례를 그대로 넣어 둔 것으로, 실제 제작은{" "}
              <b className="text-neutral-900">디자인부터 기능까지 하나부터 열까지
              원하시는 대로 커스텀</b>됩니다. 구성 · 색 · 문구 · 기능 무엇이든
              바꿔 드립니다.
            </p>
            <div className="flex gap-2.5">
              <Button className="flex-1" onClick={() => setNotice(false)}>
                예시 둘러보기
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/contact">맞춤 제작 문의</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
