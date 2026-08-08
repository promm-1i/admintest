import { useState } from "react";
import { PhoneCall, ArrowUpRight } from "lucide-react";

export function InteriorPreview() {
  const [activeTab, setActiveTab] = useState("all");
  const [beforeAfterToggle, setBeforeAfterToggle] = useState<"after" | "before">("after");

  const projects = [
    {
      id: "p1",
      cat: "residential",
      title: "한남 파르크 68평 아파트 리노베이션",
      location: "서울 용산구 한남동",
      concept: "미니멀 미드센추리 & 월넛 원목",
      desc: "공간의 구조를 가로지르는 간접 조명과 고급 이탈리아 천연석 상판으로 완성한 럭셔리 주거 공간",
      afterImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      beforeImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "p2",
      cat: "commercial",
      title: "성수 아뜰리에 로스터리 카페 공간 컨설팅",
      location: "서울 성동구 성수동",
      concept: "노출 콘크리트 & 매트 스틸",
      desc: "탁 트인 층고를 활용하여 로스팅 존과 커스텀 바를 유기적으로 배치한 인더스트리얼 상업 공간",
      afterImg: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
      beforeImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "p3",
      cat: "residential",
      title: "판교 서판교 타운하우스 80평 전체 시공",
      location: "경기도 성남시 분당구",
      concept: "모던 파사드 & 히든 라인 라인조명",
      desc: "자연광의 동선을 고려한 통창 배치와 서재, 와인 셀러를 수용하는 하이엔드 단독주택 디자인",
      afterImg: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      beforeImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filteredProjects = activeTab === "all" ? projects : projects.filter(p => p.cat === activeTab);

  return (
    <div className="w-full bg-slate-950 text-slate-100 font-sans rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Top Architecture Marquee */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-2 text-center text-[11px] font-mono text-amber-400 tracking-widest uppercase">
        ARCHITECTURAL INTERIOR & DESIGN STUDIO · 3D RENDERING & REALIZATION
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-amber-500 text-slate-950 font-black flex items-center justify-center font-mono rounded">
            A
          </div>
          <div>
            <span className="font-bold text-lg tracking-wider font-mono text-white block">
              ATELIER ARCHI
            </span>
            <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase block -mt-1">SPATIAL DESIGN</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider text-slate-300">
          <a href="#about" className="hover:text-amber-400 transition-colors">설계 철학</a>
          <a href="#projects" className="hover:text-amber-400 transition-colors">프로젝트 포트폴리오</a>
          <a href="#process" className="hover:text-amber-400 transition-colors">시공 프로세스</a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">견적 문의</a>
        </nav>

        <a
          href="#contact"
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs px-5 py-2.5 rounded transition-all flex items-center gap-1.5"
        >
          <PhoneCall className="h-3.5 w-3.5" /> 무료 현장 견적
        </a>
      </header>

      {/* Hero Banner */}
      <section className="relative px-6 py-24 lg:py-32 overflow-hidden bg-slate-950">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="인테리어 아키텍처 메인"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative max-w-5xl mx-auto space-y-6 text-center">
          <span className="inline-block px-3.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs tracking-widest uppercase">
            HIGH-END SPATIAL ARCHITECTURE
          </span>
          <h1 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight break-keep font-sans">
            공간이 주는 감동과 가치를 <br />
            디테일로 완성하는 아틀리에
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-sans break-keep">
            라이프스타일을 고려한 동선 설계부터 3D 정밀 도면, 최고급 자재 셀렉션까지. 오직 한 사람을 위한 스파이셜 솔루션을 제시합니다.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="px-7 py-3 bg-amber-500 text-slate-950 font-bold font-mono text-xs rounded hover:bg-amber-400 transition-all shadow-xl"
            >
              포트폴리오 감상하기
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-slate-700 bg-slate-900/80 text-slate-200 font-mono text-xs rounded hover:bg-slate-800 transition-all"
            >
              3D 도면 컨설팅 신청
            </a>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-20 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">SELECTED WORKS</span>
            <h2 className="text-3xl font-bold text-white mt-1">시공 완료 포트폴리오</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded text-xs font-mono transition-all ${
                activeTab === "all" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setActiveTab("residential")}
              className={`px-4 py-2 rounded text-xs font-mono transition-all ${
                activeTab === "residential" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              RESIDENTIAL
            </button>
            <button
              onClick={() => setActiveTab("commercial")}
              className={`px-4 py-2 rounded text-xs font-mono transition-all ${
                activeTab === "commercial" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              COMMERCIAL
            </button>
          </div>
        </div>

        {/* Before / After Interactive View Toggle */}
        <div className="flex items-center justify-end gap-2 text-xs font-mono text-slate-400">
          <span>시공 비교:</span>
          <button
            onClick={() => setBeforeAfterToggle("after")}
            className={`px-3 py-1 rounded ${beforeAfterToggle === "after" ? "bg-slate-800 text-amber-400 font-bold" : "text-slate-500"}`}
          >
            AFTER (완공)
          </button>
          <button
            onClick={() => setBeforeAfterToggle("before")}
            className={`px-3 py-1 rounded ${beforeAfterToggle === "before" ? "bg-slate-800 text-amber-400 font-bold" : "text-slate-500"}`}
          >
            BEFORE (철거전)
          </button>
        </div>

        {/* Projects Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="group bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={beforeAfterToggle === "after" ? p.afterImg : p.beforeImg}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-slate-950/90 border border-slate-700 text-amber-400 text-[10px] font-mono px-2 py-1 rounded">
                  {p.location}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">{p.concept}</span>
                  <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors mt-1">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-amber-400">
                  <span>3D 랜더링 보기</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="bg-slate-900/60 py-20 px-6 border-y border-slate-800">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">WORKFLOW</span>
            <h2 className="text-3xl font-bold text-white">시공 프로세스 4단계</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-2xl font-mono font-bold text-amber-500">01</span>
              <h4 className="font-bold text-sm text-white">현장 미팅 & 측정</h4>
              <p className="text-xs text-slate-400 leading-relaxed">현장 레이아웃 상세 스캔 및 클라이언트 상담</p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-2xl font-mono font-bold text-amber-500">02</span>
              <h4 className="font-bold text-sm text-white">3D 그래픽 시뮬레이션</h4>
              <p className="text-xs text-slate-400 leading-relaxed">자재 및 마감재 정밀 랜더링 컨설팅</p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-2xl font-mono font-bold text-amber-500">03</span>
              <h4 className="font-bold text-sm text-white">정밀 정품 시공</h4>
              <p className="text-xs text-slate-400 leading-relaxed">전문 감리관 일일 감리 및 공정 스케줄 투명 공개</p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-2xl font-mono font-bold text-amber-500">04</span>
              <h4 className="font-bold text-sm text-white">2년 무상 A/S 보증</h4>
              <p className="text-xs text-slate-400 leading-relaxed">시공 완료 후 안심 정기 사후 관리 케어</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Contact */}
      <footer id="contact" className="bg-slate-950 text-slate-400 px-6 py-12 border-t border-slate-800 font-mono text-xs">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-white text-base mb-3">ATELIER ARCHI STUDIO</h4>
            <p className="leading-relaxed text-slate-400">
              서울시 강남구 논현로 642 아키타워 5층 <br />
              실내건축공사업 면허 등록업체
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-white text-base mb-3">상담 안내</h4>
            <p>월~금: 09:00 - 19:00 (사전 예약 필수)</p>
            <p className="text-amber-400">전화: 02-333-9999</p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-white text-base mb-3">상담 신청</h4>
            <p className="text-slate-400">온라인으로 현장 사진 및 평형대를 남겨주시면 예상 견적서를 발송해 드립니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
