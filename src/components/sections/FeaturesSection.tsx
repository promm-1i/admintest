import { useState } from "react";
import { Monitor, SlidersHorizontal, Rocket, MapPin, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

type FeatureItem = {
  label: string;
  desc: string;
  /** 실제 구축 화면 캡처 (/thumbs/features/). 없으면 아이콘 패널로 표시 */
  img?: string;
  /** "map"이면 지도 미리보기를 그려서 보여준다 */
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
        img: "/thumbs/features/responsive.jpg",
      },
      {
        label: "기본 SEO",
        desc: "네이버 · 구글 검색엔진이 페이지를 잘 읽어가도록 제목 · 설명 · 구조를 설정합니다.",
      },
      {
        label: "문의 / 상담 폼",
        desc: "방문자가 원하는 항목을 고르고 연락처를 남기면 바로 접수되어 확인할 수 있습니다.",
        img: "/thumbs/features/form.jpg",
      },
      {
        label: "전화 · 카카오톡 연결",
        desc: "버튼 한 번으로 전화 걸기, 문자 보내기, 카카오톡 채널 상담으로 바로 이어집니다.",
        img: "/thumbs/features/call.jpg",
      },
      {
        label: "지도 연동",
        desc: "카카오지도로 사업장 위치를 표시하고 길찾기로 연결합니다.",
        visual: "map",
      },
      {
        label: "게시판 / 공지사항",
        desc: "공지 · 소식을 직접 등록하고 수정할 수 있는 게시판을 제공합니다.",
        img: "/thumbs/features/board.jpg",
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
        img: "/thumbs/features/admin.jpg",
      },
      {
        label: "데이터베이스",
        desc: "매물 · 상품 · 예약처럼 쌓이는 데이터를 저장하고 검색할 수 있게 구축합니다.",
        img: "/thumbs/features/db.jpg",
      },
      {
        label: "검색 / 필터",
        desc: "조건을 선택하면 목록이 바로 좁혀지는 검색 기능입니다.",
        img: "/thumbs/features/search.jpg",
      },
      {
        label: "고객 문의 관리",
        desc: "접수된 문의를 상태별로 확인하고 처리 이력까지 관리합니다.",
        img: "/thumbs/features/inquiry.jpg",
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

/** 지도 연동 패널에 들어가는 지도 미리보기 (도로 + 현재 위치 핀) */
function MapPreview() {
  return (
    <span className="relative block aspect-[16/9] w-full overflow-hidden bg-[#EAE7E1]">
      <svg viewBox="0 0 224 126" className="absolute inset-0 h-full w-full" aria-hidden>
        <rect x="8" y="8" width="60" height="40" rx="3" fill="#DDD9CF" />
        <rect x="8" y="64" width="60" height="54" rx="3" fill="#E2DED4" />
        <rect x="84" y="8" width="56" height="40" rx="3" fill="#E2DED4" />
        <rect x="84" y="64" width="56" height="54" rx="3" fill="#DDD9CF" />
        <rect x="156" y="8" width="60" height="40" rx="3" fill="#E2DED4" />
        <rect x="156" y="64" width="60" height="54" rx="3" fill="#CBDCC2" />
        <rect x="0" y="50" width="224" height="11" fill="#FFFFFF" />
        <rect x="72" y="0" width="10" height="126" fill="#FFFFFF" />
        <rect x="144" y="0" width="10" height="126" fill="#FFFFFF" />
        <line x1="0" y1="55.5" x2="224" y2="55.5" stroke="#F5C63F" strokeWidth="1.5" strokeDasharray="6 5" />
      </svg>
      <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-md">
          <MapPin className="h-4.5 w-4.5 text-white" />
        </span>
        <span className="-mt-0.5 block h-0 w-0 border-x-[5px] border-t-[8px] border-x-transparent border-t-primary" />
      </span>
      <span className="absolute bottom-2 right-2.5 rounded bg-white/85 px-2 py-1 text-[10px] font-semibold text-neutral-600">
        카카오지도 연동
      </span>
    </span>
  );
}

/**
 * 좌측 분류 → 가운데 기능 목록 → 우측 실제 화면 캡처.
 * 기능에 마우스를 올리거나 클릭하면 우측 미리보기가 그 기능의 실제 화면으로 바뀐다.
 */
export function FeaturesSection() {
  const [groupIdx, setGroupIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const group = FEATURE_GROUPS[groupIdx]!;
  const item = group.items[itemIdx] ?? group.items[0]!;
  const GroupIcon = group.icon;

  const pickGroup = (gi: number) => {
    setGroupIdx(gi);
    setItemIdx(0);
  };

  return (
    <section className="border-y border-border bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          label="FEATURES"
          title="필요한 기능을 홈페이지 안에 함께 구축합니다."
          description="기본적인 웹 기능부터 예약·문의를 관리하는 운영 기능, 결제·회원 같은 확장 기능까지 필요한 범위에 맞춰 구성합니다. 기능을 선택하면 실제 구축 화면으로 보여드립니다."
        />

        <FadeIn className="mt-12">
          <div className="grid gap-4 lg:grid-cols-[220px_250px_1fr] lg:gap-0 lg:overflow-hidden lg:rounded-2xl lg:border lg:border-border lg:bg-card lg:shadow-xs">
            {/* 1단 · 분류 */}
            <ul className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-col lg:gap-0 lg:overflow-visible lg:border-r lg:border-border lg:bg-secondary/40 lg:p-3 lg:pb-3">
              {FEATURE_GROUPS.map((g, gi) => {
                const Icon = g.icon;
                const on = gi === groupIdx;
                return (
                  <li key={g.title} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onMouseEnter={() => pickGroup(gi)}
                      onFocus={() => pickGroup(gi)}
                      onClick={() => pickGroup(gi)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors lg:py-3.5",
                        on ? "bg-card shadow-xs ring-1 ring-border lg:ring-primary/25" : "text-muted-foreground hover:bg-card/70",
                      )}
                    >
                      <Icon className={cn("h-5 w-5 shrink-0", on ? "text-primary" : "text-muted-foreground/50")} strokeWidth={1.5} />
                      <span className="min-w-0">
                        <span className="block font-mono text-[10px] font-bold text-primary/70">{g.num}</span>
                        <span className={cn("block whitespace-nowrap text-sm font-bold", on ? "text-foreground" : "")}>{g.title}</span>
                      </span>
                      <ChevronRight className={cn("ml-auto hidden h-3.5 w-3.5 lg:block", on ? "text-primary" : "opacity-0")} />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* 2단 · 기능 목록 */}
            <ul className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-col lg:gap-0.5 lg:overflow-visible lg:border-r lg:border-border lg:p-3">
              {group.items.map((it, ii) => {
                const on = ii === itemIdx;
                return (
                  <li key={it.label} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onMouseEnter={() => setItemIdx(ii)}
                      onFocus={() => setItemIdx(ii)}
                      onClick={() => setItemIdx(ii)}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-left text-sm transition-colors",
                        on ? "bg-primary/8 font-bold text-primary" : "font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      {it.label}
                      <ChevronRight className={cn("hidden h-3.5 w-3.5 shrink-0 lg:block", on ? "opacity-100" : "opacity-0")} />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* 3단 · 실제 화면 미리보기 */}
            <div key={`${groupIdx}-${itemIdx}`} className="overflow-hidden rounded-2xl border border-border bg-card lg:rounded-none lg:border-0 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
              <div className="relative border-b border-border bg-secondary/30">
                {item.visual === "map" ? (
                  <MapPreview />
                ) : item.img ? (
                  <>
                    <img src={item.img} alt={`${item.label} 실제 화면`} loading="lazy" className="aspect-[16/9] w-full object-cover object-top" />
                    <span className="absolute left-3.5 top-3.5 rounded-full bg-black/65 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                      실제 구축 화면
                    </span>
                  </>
                ) : (
                  <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-secondary/60 to-primary/10">
                    <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-card shadow-sm ring-1 ring-border">
                      <GroupIcon className="h-9 w-9 text-primary" strokeWidth={1.4} />
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="text-lg font-bold text-foreground">{item.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground break-keep">{item.desc}</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground/80 break-keep">
          ※ 모든 기능이 기본 포함되는 것은 아니며, 필요한 범위는 상담 후 맞춤으로 결정됩니다.
        </p>
      </div>
    </section>
  );
}
