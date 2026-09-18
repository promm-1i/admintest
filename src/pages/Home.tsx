import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowRight, FileText, Laptop, MessageCircle, Pause, Play, Settings2, X } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/images/hero_banner.jpg";
import officeImage from "@/assets/images/01_hero_imac.jpg";
import laptopImage from "@/assets/images/06_laptop_phone_site.jpg";
import rentcarImage from "@/assets/images/rentcar_solution_thumbnail.jpg";
import realEstateImage from "@/assets/images/real_estate_platform_thumbnail.jpg";
import hospitalImage from "@/assets/images/hospital_solution_thumbnail.jpg";
import academyImage from "@/assets/images/academy_solution_thumbnail.jpg";
import interiorImage from "@/assets/images/interior_solution_thumbnail.jpg";
import movingImage from "@/assets/images/moving_solution_thumbnail.jpg";

const storyCards = [
  { eyebrow: "Process", title: "작은 시작부터 확장까지 이어지는 제작 흐름", desc: "상담, 기획, 디자인, 개발, 공개 이후 유지관리까지 한 흐름으로 관리합니다.", href: "/website/process", image: officeImage },
  { eyebrow: "Brand", title: "업종의 첫인상을 만드는 맞춤형 화면 설계", desc: "렌트카, 부동산, 병원, 학원처럼 고객이 바로 이해해야 하는 업종에 맞춥니다.", href: "/homepage", image: laptopImage },
  { eyebrow: "Technology", title: "고객용 홈페이지와 관리자 시스템을 함께 구축", desc: "등록, 공개, 문의, 예약, 검색, 필터처럼 실제 운영에 필요한 기능을 붙입니다.", href: "/services/admin-system", image: realEstateImage },
];

const productTabs = ["NEW", "렌트카 맞춤형", "부동산 맞춤형", "NOVERIQ PICK"] as const;

const productItems = [
  { tab: "NEW", title: "병원 · 의원 맞춤형", desc: "의료진, 진료과목, 예약 문의, 비급여 안내", tags: ["예약관리", "의료진", "모바일"], href: "/web-solutions/hospital", image: hospitalImage },
  { tab: "NEW", title: "학원 맞춤형", desc: "강의, 시간표, 수강 상담, 후기 관리", tags: ["강의관리", "상담", "후기"], href: "/web-solutions/academy", image: academyImage },
  { tab: "NEW", title: "인테리어 맞춤형", desc: "시공 사례, 평형 패키지, 견적 문의", tags: ["시공사례", "견적", "갤러리"], href: "/web-solutions/interior", image: interiorImage },
  { tab: "렌트카 맞춤형", title: "렌트카 예약형 홈페이지", desc: "차량 관리, 조건별 검색, 렌트 문의 접수", tags: ["차량DB", "검색필터", "문의관리"], href: "/web-solutions/rentcar", image: rentcarImage },
  { tab: "렌트카 맞춤형", title: "차량 재고 관리자", desc: "차종과 대여 상태를 관리하고 고객 화면에 즉시 공개", tags: ["재고관리", "공개설정", "예약"], href: "/web-solutions/rentcar/demo", image: laptopImage },
  { tab: "렌트카 맞춤형", title: "렌트 문의 고객 화면", desc: "기간과 조건을 선택해 차량을 찾고 바로 상담 접수", tags: ["기간검색", "요금", "상담"], href: "/web-solutions/rentcar/demo/site", image: officeImage },
  { tab: "부동산 맞춤형", title: "부동산 매물형 홈페이지", desc: "매물 등록, 지도 보기, 중개보수 계산기", tags: ["매물관리", "지도", "상담CRM"], href: "/web-solutions/real-estate", image: realEstateImage },
  { tab: "부동산 맞춤형", title: "매물 등록 관리자", desc: "매물 정보와 공개 상태, 상담 문의를 한 화면에서 관리", tags: ["등록", "공개설정", "문의관리"], href: "/web-solutions/real-estate/demo", image: officeImage },
  { tab: "부동산 맞춤형", title: "지도 기반 매물 검색", desc: "지역, 거래 유형, 금액 조건으로 원하는 매물을 탐색", tags: ["지도", "다중필터", "상세보기"], href: "/web-solutions/real-estate/demo/site", image: laptopImage },
  { tab: "NOVERIQ PICK", title: "인테리어 · 리모델링", desc: "시공 사례, 평형 패키지, 견적 문의", tags: ["시공사례", "견적", "갤러리"], href: "/web-solutions/interior", image: interiorImage },
  { tab: "NOVERIQ PICK", title: "이사 · 청소업체", desc: "서비스 지역, 옵션 견적, 작업 사례", tags: ["지역관리", "옵션", "접수"], href: "/web-solutions/moving", image: movingImage },
  { tab: "NOVERIQ PICK", title: "운영형 웹 솔루션", desc: "고객 화면과 관리자 기능을 업종에 맞게 연결", tags: ["관리자", "DB", "유지보수"], href: "/web-solutions", image: realEstateImage },
];

const newsItems = [
  { kind: "NOTICE", date: "2026.09.18", title: "업종별 맞춤 제작 메뉴가 새롭게 정리되었습니다.", image: officeImage },
  { kind: "NEWS", date: "2026.09.12", title: "렌트카·부동산 관리자 데모 기능을 고도화했습니다.", image: laptopImage },
  { kind: "UPDATE", date: "2026.09.03", title: "스타터와 프로 요금제를 운영형 서비스 기준으로 개편했습니다." },
  { kind: "EVENT", date: "2026.08.29", title: "상담 문의 고객 대상 초기 기획 점검을 지원합니다." },
  { kind: "NEWS", date: "2026.08.20", title: "검색·필터·상담 관리 기능을 업종별 템플릿에 확장했습니다." },
  { kind: "NOTICE", date: "2026.08.16", title: "제작 이후 월 유지보수 월 3회 간단 수정 기준을 안내합니다." },
];

const reviewItems = [
  { title: "관리자에서 공개한 내용이 고객 화면에 바로 보여요", product: "부동산 맞춤형 데모", desc: "매물 등록, 공개 상태 전환, 고객용 상세 페이지 확인까지 한 번에 시연할 수 있어 상담이 쉬워졌습니다.", image: realEstateImage, thumb: officeImage },
  { title: "차량 문의가 정리돼서 응대가 빨라졌습니다", product: "렌트카 맞춤형 데모", desc: "차량 조건과 예약 문의가 분리되어 들어오니 전화 상담 전에 필요한 정보를 먼저 확인할 수 있습니다.", image: rentcarImage, thumb: laptopImage },
  { title: "처음에는 작게 만들고 나중에 키우는 설명이 잘 먹힙니다", product: "스타터 홈페이지", desc: "구축비와 월 관리비가 분리되어 있어 고객에게 도입 비용을 명확하게 안내하기 좋습니다.", image: officeImage, thumb: academyImage },
  { title: "업종별 샘플이 있으니 설득 시간이 줄었습니다", product: "프로 홈페이지", desc: "단순 소개 페이지가 아니라 실제 운영 화면을 보여줄 수 있어 견적 상담의 신뢰도가 올라갑니다.", image: laptopImage, thumb: hospitalImage },
];

const faqItems = [
  { category: "제작", question: "기본 홈페이지 제작 기간은 얼마나 걸리나요?", image: officeImage },
  { category: "비용", question: "구축비와 월 관리비에는 무엇이 포함되나요?", image: laptopImage },
  { category: "기능", question: "렌트카나 부동산처럼 관리자 페이지도 가능한가요?", image: realEstateImage },
  { category: "유지보수", question: "월 3회 간단 수정의 기준은 어떻게 되나요?", image: movingImage },
];

const popupStorageKey = "noveriq-home-popup-closed-date";
const todayKey = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

export default function Home() {
  usePageTitle("NOVERIQ — 업종별 맞춤 홈페이지 제작", "홈페이지 제작, 업종별 맞춤 기능, 관리자 시스템, 유지보수를 함께 제공하는 웹 솔루션 스튜디오입니다.");

  const [activeTab, setActiveTab] = useState<(typeof productTabs)[number]>("NEW");
  const [productIndex, setProductIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [showPopup, setShowPopup] = useState(() => localStorage.getItem(popupStorageKey) !== todayKey());
  const activeProducts = useMemo(() => productItems.filter((item) => item.tab === activeTab), [activeTab]);
  const activeProduct = activeProducts[productIndex] ?? activeProducts[0];

  const closePopup = (forToday = false) => {
    if (forToday) localStorage.setItem(popupStorageKey, todayKey());
    setShowPopup(false);
  };
  const changeTab = (tab: (typeof productTabs)[number]) => {
    setActiveTab(tab);
    setProductIndex(0);
  };
  const moveProduct = (direction: -1 | 1) => {
    setProductIndex((current) => (current + direction + activeProducts.length) % activeProducts.length);
  };

  return (
    <div className="bg-background text-foreground">
      {showPopup && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/25 px-4 py-4" role="dialog" aria-modal="true" aria-labelledby="home-popup-title">
          <div className="relative flex max-h-[calc(100vh-32px)] w-full max-w-[536px] flex-col overflow-hidden bg-background shadow-2xl">
            <button type="button" aria-label="팝업 닫기" onClick={() => closePopup()} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <X className="size-5" />
            </button>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="aspect-[1.18/1] min-h-[280px] bg-secondary">
                <img src={laptopImage} alt="노트북과 모바일 홈페이지 제작 화면" className="h-full w-full object-cover" />
              </div>
              <div className="px-7 py-6">
                <p className="text-sm font-bold text-primary">NOVERIQ 서비스 안내</p>
                <h2 id="home-popup-title" className="mt-3 break-keep text-3xl font-black leading-tight">업종별 맞춤 홈페이지 제작</h2>
                <p className="mt-4 border-l-4 border-primary pl-4 text-sm leading-6 text-muted-foreground">스타터 구축비 49만원, 월 9.9만원부터 호스팅과 월 3회 간단 수정을 함께 제공합니다.</p>
              </div>
            </div>
            <div className="flex shrink-0 justify-end gap-2 border-t border-border px-5 py-4">
              <button type="button" onClick={() => closePopup(true)} className="h-10 border border-border px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">오늘 하루 열지 않음</button>
              <button type="button" onClick={() => closePopup()} className="h-10 bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">닫기</button>
            </div>
          </div>
        </div>
      )}

      <section className="relative min-h-screen overflow-hidden">
        <img src={heroImage} alt="" className="idle-zoom absolute inset-0 h-full w-full object-cover" style={{ animationPlayState: heroPaused ? "paused" : "running" }} />
        <div className="absolute inset-0 bg-black/38" />
        <div className="relative flex min-h-screen items-center justify-center px-5 text-center sm:px-10">
          <div className="max-w-5xl text-white">
            <p className="text-sm font-bold uppercase tracking-[0.38em] text-white/82">Since 2026</p>
            <h1 className="mt-7 break-keep text-4xl font-black leading-[1.13] sm:text-6xl lg:text-[76px]">업종의 운영을 이해하는<br className="hidden sm:block" /> 맞춤형 홈페이지</h1>
            <p className="mx-auto mt-7 max-w-2xl break-keep text-base leading-8 text-white/84 sm:text-lg">고객용 화면과 관리자 시스템을 연결해 문의부터 실제 운영까지 이어지는 웹 솔루션을 구축합니다.</p>
          </div>
        </div>
        <a href="#since" className="absolute bottom-10 left-1/2 hidden h-12 -translate-x-1/2 items-center gap-2 rounded-full bg-white/20 px-7 text-sm font-bold text-white backdrop-blur-sm md:flex">Start Scrolling<ArrowDown className="size-4" /></a>
        <button type="button" onClick={() => setHeroPaused((paused) => !paused)} className="absolute bottom-10 left-5 flex h-11 w-11 items-center justify-center text-white/85 focus-visible:outline-2 focus-visible:outline-white sm:left-10" aria-label={heroPaused ? "히어로 재생" : "히어로 정지"}>
          {heroPaused ? <Play className="size-5" /> : <Pause className="size-5" />}
        </button>
      </section>

      <section id="since" className="flex min-h-screen items-center justify-center px-5 py-28 text-center sm:px-10">
        <div className="max-w-5xl">
          <p className="font-logo text-3xl sm:text-4xl">Since 2026</p>
          <h2 className="mt-6 break-keep text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">업종이 달라도 변하지 않는 제작 기준</h2>
          <p className="mx-auto mt-8 max-w-3xl break-keep text-base leading-8 text-muted-foreground sm:text-xl sm:leading-9">작은 시작에서 운영형 서비스까지, 필요한 시점에 기능과 페이지를 자연스럽게 확장할 수 있도록 설계합니다.</p>
        </div>
      </section>

      <section aria-label="브랜드 제작 기준" className="grid min-h-screen lg:grid-cols-3">
        {storyCards.map((card, index) => (
          <article key={card.eyebrow} className="group relative min-h-[68vh] overflow-hidden border-b border-white/20 bg-foreground lg:min-h-screen lg:border-b-0 lg:border-r">
            <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-62 transition duration-700 group-hover:scale-105 group-hover:opacity-35 group-focus-within:scale-105 group-focus-within:opacity-35" />
            <div className="absolute inset-0 bg-black/35" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-logo text-[22vw] leading-none text-white/14 lg:text-[10vw]">{String(index + 1).padStart(2, "0")}</span>
            <div className="relative flex h-full min-h-[68vh] flex-col justify-between p-8 text-white sm:p-12 lg:min-h-screen lg:p-14">
              <p className="font-logo text-3xl sm:text-4xl">{card.eyebrow}</p>
              <div className="translate-y-0 transition-transform duration-500 lg:translate-y-20 lg:group-hover:translate-y-0 lg:group-focus-within:translate-y-0">
                <h3 className="max-w-md break-keep text-3xl font-black leading-tight sm:text-4xl">{card.title}</h3>
                <p className="mt-6 max-w-md break-keep text-base leading-7 text-white/78 opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">{card.desc}</p>
                <Link to={card.href} className="mt-8 inline-flex h-12 items-center gap-3 border border-white/65 px-6 text-sm font-bold opacity-100 transition-opacity duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">View more<ArrowRight className="size-4" /></Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="relative min-h-[900px] overflow-hidden bg-secondary/45 px-5 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center"><p className="font-logo text-3xl sm:text-4xl">PRODUCT</p><h2 className="mt-3 break-keep text-2xl font-bold sm:text-3xl">바로 적용 가능한 업종별 솔루션</h2></div>
          {activeProduct && (
            <div className="mx-auto mt-12 max-w-5xl">
              <Link to={activeProduct.href} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                <div className="relative aspect-[16/8.8] min-h-[380px] overflow-hidden bg-secondary sm:min-h-[520px]">
                  <img src={activeProduct.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 via-black/35 to-transparent px-7 pb-8 pt-28 text-white sm:px-12 sm:pb-11">
                    <h3 className="break-keep text-3xl font-black sm:text-5xl">{activeProduct.title}</h3><p className="mt-3 text-base text-white/78 sm:text-lg">{activeProduct.desc}</p>
                    <div className="mt-5 flex flex-wrap gap-3">{activeProduct.tags.map((tag) => <span key={tag} className="text-sm font-bold">#{tag}</span>)}</div>
                  </div>
                </div>
              </Link>
              <div className="mt-8 flex items-center justify-between gap-5">
                <div className="flex gap-2">
                  <button type="button" onClick={() => moveProduct(-1)} aria-label="이전 제품" className="flex h-11 w-11 items-center justify-center border border-border bg-background focus-visible:outline-2 focus-visible:outline-primary"><ArrowLeft className="size-4" /></button>
                  <button type="button" onClick={() => moveProduct(1)} aria-label="다음 제품" className="flex h-11 w-11 items-center justify-center border border-border bg-background focus-visible:outline-2 focus-visible:outline-primary"><ArrowRight className="size-4" /></button>
                </div>
                <p className="text-sm font-bold text-muted-foreground">{String(productIndex + 1).padStart(2, "0")} / {String(activeProducts.length).padStart(2, "0")}</p>
              </div>
            </div>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 border-t border-border pt-6">
            {productTabs.map((tab) => <button key={tab} type="button" onClick={() => changeTab(tab)} className={cn("border-b-2 px-1 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-base", activeTab === tab ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}>{tab}</button>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="font-logo text-3xl sm:text-4xl">NEWS &amp; EVENT</p><h2 className="mt-3 break-keep text-2xl font-bold sm:text-3xl">제작과 운영에 필요한 소식</h2></div>
            <Link to="/notices" className="inline-flex h-12 items-center gap-3 self-start border border-border px-6 text-sm font-bold focus-visible:outline-2 focus-visible:outline-primary sm:self-auto">View more<ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="grid gap-6 sm:grid-cols-2">
              {newsItems.slice(0, 2).map((item) => (
                <Link key={item.title} to="/notices" className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-secondary"><img src={item.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div>
                  <div className="mt-4 flex gap-3 text-sm"><span className="font-black text-primary">{item.kind}</span><span className="text-muted-foreground">{item.date}</span></div>
                  <p className="mt-2 break-keep text-lg font-bold leading-7">{item.title}</p>
                </Link>
              ))}
            </div>
            <div className="divide-y divide-border border-y border-border">
              {newsItems.slice(2).map((item) => <Link key={item.title} to="/notices" className="grid min-h-[78px] items-center gap-2 py-4 transition-colors hover:bg-secondary/35 sm:grid-cols-[92px_100px_1fr] sm:px-4"><span className="text-xs font-black text-primary">{item.kind}</span><span className="text-sm text-muted-foreground">{item.date}</span><span className="break-keep text-base font-bold">{item.title}</span></Link>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/45 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-10"><p className="font-logo text-3xl sm:text-4xl">REVIEW</p><h2 className="mt-3 break-keep text-2xl font-bold sm:text-3xl">고객 상담에서 바로 보여줄 수 있는 화면</h2></div>
        <div className="scrollbar-none mx-auto mt-12 flex max-w-[1440px] snap-x gap-5 overflow-x-auto px-5 pb-4 sm:px-10 lg:gap-6">
          {reviewItems.map((item) => (
            <button key={item.title} type="button" className="group min-w-[300px] flex-1 snap-start bg-background text-left sm:min-w-[330px]">
              <div className="relative h-[220px] overflow-hidden bg-secondary"><img src={item.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div>
              <div className="relative min-h-[225px] px-6 pb-7 pt-12">
                <span className="absolute -top-10 left-6 h-20 w-20 overflow-hidden border-4 border-background bg-secondary"><img src={item.thumb} alt="" className="h-full w-full object-cover" /></span>
                <p className="text-sm font-bold text-primary">{item.product}</p><h3 className="mt-3 line-clamp-2 break-keep text-lg font-black leading-6">{item.title}</h3><p className="mt-4 line-clamp-2 break-keep text-sm leading-6 text-muted-foreground">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="font-logo text-3xl sm:text-4xl">FAQ</p><h2 className="mt-3 break-keep text-2xl font-bold sm:text-3xl">맞춤형 홈페이지 제작이 궁금하신가요?</h2></div>
            <Link to="/faq" className="inline-flex h-12 items-center gap-3 self-start border border-border px-6 text-sm font-bold focus-visible:outline-2 focus-visible:outline-primary sm:self-auto">View more<ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {faqItems.map((item) => (
              <Link key={item.question} to="/faq" className="group relative min-h-[294px] overflow-hidden bg-secondary">
                <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-black/48 transition-colors group-hover:bg-black/62" />
                <div className="relative flex min-h-[294px] flex-col justify-end p-7 text-white"><p className="text-sm font-bold text-white/72">{item.category}</p><h3 className="mt-3 break-keep text-xl font-black leading-7">{item.question}</h3><ArrowRight className="mt-6 size-5" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[520px] overflow-hidden text-white">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-black/68" />
        <div className="relative mx-auto flex min-h-[520px] max-w-5xl flex-col items-center justify-center px-5 py-16 text-center sm:px-10">
          <p className="break-keep text-xl font-bold text-white/82">운영에 필요한 기능을 직접 확인해보세요</p>
          <Link to="/web-solutions/demos" className="mt-7 inline-flex h-12 items-center gap-3 border border-white/75 px-7 text-sm font-bold">업종별 데모 보기<ArrowRight className="size-4" /></Link>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-10">
            <div><p className="text-sm text-white/65">홈페이지 제작 대표 상담</p><a href="tel:01048944905" className="mt-1 block text-3xl font-black">010-4894-4905</a></div><div className="h-px w-12 bg-white/25 sm:h-12 sm:w-px" /><div><p className="text-sm text-white/65">상담 접수</p><p className="mt-1 text-lg font-bold">24시간 접수 · 1일 이내 회신</p></div>
          </div>
          <div className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[["상담 문의", "/contact", MessageCircle], ["견적 계산기", "/estimate", Settings2], ["데모 보기", "/web-solutions/demos", Laptop], ["제작 비용", "/website/price", FileText]].map(([label, href, Icon]) => (
              <Link key={label as string} to={href as string} className="flex h-20 items-center justify-between border border-white/35 px-5 text-sm font-bold transition-colors hover:bg-white/10">{label as string}<Icon className="size-5" /></Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
