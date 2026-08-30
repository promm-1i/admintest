import { Monitor, SlidersHorizontal, Rocket, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

type FeatureItem = {
  label: string;
  desc: string;
  /** "map"이면 팝업에 지도 미리보기를 함께 띄운다 */
  visual?: "map";
};

const FEATURE_GROUPS: { num: string; title: string; icon: typeof Monitor; items: FeatureItem[] }[] = [
  {
    num: "01",
    title: "기본 웹 기능",
    icon: Monitor,
    items: [
      {
        label: "PC / 모바일 반응형",
        desc: "하나의 홈페이지가 PC · 태블릿 · 모바일 화면 크기에 맞춰 자동으로 재배치됩니다.",
      },
      {
        label: "기본 SEO",
        desc: "네이버 · 구글 검색엔진이 페이지를 잘 읽어가도록 제목 · 설명 · 구조를 설정합니다.",
      },
      {
        label: "문의 / 상담 폼",
        desc: "방문자가 이름 · 연락처 · 내용을 남기면 바로 접수되어 확인할 수 있습니다.",
      },
      {
        label: "전화 · 카카오톡 연결",
        desc: "버튼 한 번으로 전화 걸기나 카카오톡 채널 상담으로 바로 이어집니다.",
      },
      {
        label: "지도 연동",
        desc: "카카오지도로 사업장 위치를 표시하고 길찾기로 연결합니다.",
        visual: "map",
      },
      {
        label: "게시판 / 공지사항",
        desc: "공지 · 소식을 직접 등록하고 수정할 수 있는 게시판을 제공합니다.",
      },
    ],
  },
  {
    num: "02",
    title: "운영 기능",
    icon: SlidersHorizontal,
    items: [
      {
        label: "관리자 페이지",
        desc: "콘텐츠 · 문의 · 데이터를 제작자 없이 직접 등록 · 수정하는 전용 관리 화면입니다.",
      },
      {
        label: "데이터베이스",
        desc: "매물 · 상품 · 예약처럼 쌓이는 데이터를 저장하고 검색할 수 있게 구축합니다.",
      },
      {
        label: "검색 / 필터",
        desc: "조건을 선택하면 목록이 바로 좁혀지는 검색 기능입니다.",
      },
      {
        label: "고객 문의 관리",
        desc: "접수된 문의를 상태별로 확인하고 처리 이력까지 관리합니다.",
      },
      {
        label: "파일 관리",
        desc: "이미지 · 문서 파일을 업로드하고 홈페이지에서 바로 사용할 수 있습니다.",
      },
    ],
  },
  {
    num: "03",
    title: "확장 기능",
    icon: Rocket,
    items: [
      {
        label: "결제 연동",
        desc: "카드 · 간편결제 모듈을 연동해 홈페이지에서 바로 결제받을 수 있습니다.",
      },
      {
        label: "회원 기능",
        desc: "회원가입 · 로그인, 마이페이지 등 회원 체계를 구축합니다.",
      },
      {
        label: "외부 API 연동",
        desc: "지도, 문자 발송, 공공데이터 등 외부 서비스와 데이터를 주고받습니다.",
      },
      {
        label: "AI 기능",
        desc: "챗봇 응대, 콘텐츠 자동 생성 등 AI 기능을 필요한 범위에 맞춰 연동합니다.",
      },
    ],
  },
];

/** 지도 연동 팝업에 들어가는 미니 지도 미리보기 (도로 + 현재 위치 핀) */
function MapPreview() {
  return (
    <span className="relative mb-2.5 block h-28 w-full overflow-hidden rounded-md bg-[#EAE7E1]">
      <svg viewBox="0 0 224 112" className="absolute inset-0 h-full w-full" aria-hidden>
        {/* 블록(건물 영역) */}
        <rect x="8" y="8" width="60" height="34" rx="3" fill="#DDD9CF" />
        <rect x="8" y="56" width="60" height="48" rx="3" fill="#E2DED4" />
        <rect x="84" y="8" width="56" height="34" rx="3" fill="#E2DED4" />
        <rect x="84" y="56" width="56" height="48" rx="3" fill="#DDD9CF" />
        <rect x="156" y="8" width="60" height="34" rx="3" fill="#E2DED4" />
        <rect x="156" y="56" width="60" height="48" rx="3" fill="#DDD9CF" />
        {/* 공원 */}
        <rect x="160" y="60" width="52" height="40" rx="3" fill="#CBDCC2" />
        {/* 도로 */}
        <rect x="0" y="44" width="224" height="10" fill="#FFFFFF" />
        <rect x="72" y="0" width="10" height="112" fill="#FFFFFF" />
        <rect x="144" y="0" width="10" height="112" fill="#FFFFFF" />
        <line x1="0" y1="49" x2="224" y2="49" stroke="#F5C63F" strokeWidth="1.5" strokeDasharray="6 5" />
      </svg>
      {/* 위치 핀 */}
      <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-md">
          <MapPin className="h-3.5 w-3.5 text-white" />
        </span>
        <span className="-mt-0.5 block h-0 w-0 border-x-4 border-t-[6px] border-x-transparent border-t-primary" />
      </span>
      <span className="absolute bottom-1.5 right-2 rounded bg-white/85 px-1.5 py-0.5 text-[9px] font-semibold text-neutral-600">
        카카오지도 연동
      </span>
    </span>
  );
}

/** 기능 항목에 마우스를 올리면 설명(지도 연동은 지도 미리보기 포함)이 팝업으로 뜬다 */
function FeatureTip({ item }: { item: FeatureItem }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        className="cursor-default text-left text-sm leading-relaxed text-muted-foreground underline decoration-border decoration-dotted underline-offset-4 transition-colors break-keep hover:text-primary focus-visible:text-primary focus-visible:outline-none"
      >
        {item.label}
      </button>
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-0 top-full z-30 mt-2 translate-y-1 rounded-lg bg-neutral-800 px-3.5 py-3 text-xs font-medium leading-relaxed text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none",
          item.visual === "map" ? "w-64" : "w-60",
        )}
      >
        <span className="absolute -top-1 left-4 h-2 w-2 rotate-45 bg-neutral-800" />
        {item.visual === "map" && <MapPreview />}
        {item.desc}
      </span>
    </span>
  );
}

export function FeaturesSection() {
  return (
    <section className="border-y border-border bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          label="FEATURES"
          title="필요한 기능을 홈페이지 안에 함께 구축합니다."
          description="기본적인 웹 기능부터 예약·문의를 관리하는 운영 기능, 결제·회원 같은 확장 기능까지 필요한 범위에 맞춰 구성합니다."
        />

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {FEATURE_GROUPS.map((group, i) => {
            const Icon = group.icon;
            return (
            <FadeIn key={group.title} delay={i * 80}>
              <div className={i > 0 ? "sm:border-l sm:border-border sm:pl-10" : ""}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">{group.num}</span>
                  <Icon className="h-6 w-6 text-muted-foreground/40" strokeWidth={1.5} />
                </div>
                <h3 className="mt-2 text-base font-semibold text-foreground">{group.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <FeatureTip item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            );
          })}
        </div>

        <p className="mt-10 text-xs leading-relaxed text-muted-foreground/80 break-keep">
          ※ 각 기능에 마우스를 올리면 설명을 확인하실 수 있습니다. 모든 기능이 기본 포함되는 것은
          아니며, 필요한 범위는 상담 후 맞춤으로 결정됩니다.
        </p>
      </div>
    </section>
  );
}
