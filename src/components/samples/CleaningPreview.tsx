import { useState } from "react";
import { Check, Sparkles, PhoneCall, ShieldCheck } from "lucide-react";

export function CleaningPreview() {
  const [selectedPyung, setSelectedPyung] = useState(24);
  const [cleanType, setCleanType] = useState<"moveIn" | "resident">("moveIn");

  // Price estimation formula
  const pricePerPyung = cleanType === "moveIn" ? 11000 : 13000;
  const estimatedPrice = selectedPyung * pricePerPyung;

  return (
    <div className="w-full bg-slate-900 text-slate-100 font-sans rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Top Banner Notice */}
      <div className="bg-cyan-950 text-cyan-200 text-xs py-2 px-6 text-center font-mono tracking-wider border-b border-cyan-800/40">
        ✨ 고온 스팀 소독 기본 제공 · 친환경 세제 사용 · 피톤치드 탈취 서비스 무상
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 bg-cyan-500 rounded-xl flex items-center justify-center text-slate-950 font-bold text-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-lg text-white block">클린앤케어</span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-widest block -mt-1">PREMIUM CLEANING</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium text-slate-300">
          <a href="#services" className="hover:text-cyan-400 transition-colors">청소 범위</a>
          <a href="#calculator" className="hover:text-cyan-400 transition-colors">실시간 견적 계산</a>
          <a href="#reviews" className="hover:text-cyan-400 transition-colors">고객 후기</a>
          <a href="#process" className="hover:text-cyan-400 transition-colors">진행 절차</a>
        </nav>

        <a
          href="tel:1588-0000"
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5"
        >
          <PhoneCall className="h-3.5 w-3.5" /> 1588-0000 빠른 상담
        </a>
      </header>

      {/* Hero Banner */}
      <section className="relative px-6 py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <ShieldCheck className="h-4 w-4 text-cyan-400" /> 하청 없는 100% 본사 직영 전문 팀 구속
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight break-keep">
            새집증후군 고민 끝! <br />
            구석구석 완벽하게 케어하는 프리미엄 입주청소
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed break-keep">
            싱크대 걸레받이 하부, 환기구, 전등 갓 내부까지 전면 탈거 후 친환경 스팀 및 피톤치드로 말끔하게 케어해 드립니다.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href="#calculator"
              className="px-7 py-3 bg-cyan-500 text-slate-950 font-bold text-xs rounded-full hover:bg-cyan-400 transition-all shadow-xl"
            >
              내 평수 견적 계산하기
            </a>
            <a
              href="tel:1588-0000"
              className="px-6 py-3 border border-slate-700 bg-slate-800/80 text-slate-200 text-xs font-semibold rounded-full hover:bg-slate-700 transition-all"
            >
              전화 바로 상담
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Price Calculator */}
      <section id="calculator" className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">ESTIMATION</span>
            <h2 className="text-2xl font-bold text-white">실시간 입주청소 예상 견적기</h2>
            <p className="text-xs text-slate-400">평수와 청소 유형을 선택하시면 투명한 맞춤 단가를 계산해 드립니다.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">청소 종류 선택</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCleanType("moveIn")}
                  className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                    cleanType === "moveIn" ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-slate-400"
                  }`}
                >
                  입주 / 이사 청소
                </button>
                <button
                  onClick={() => setCleanType("resident")}
                  className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                    cleanType === "resident" ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-slate-400"
                  }`}
                >
                  거주 / 특수 청소
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">공급 평수</span>
                <span className="text-cyan-400 font-mono font-bold">{selectedPyung} 평</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="1"
                value={selectedPyung}
                onChange={(e) => setSelectedPyung(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>10평</span>
                <span>40평</span>
                <span>80평</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block">예상 청소 단가 (피톤치드 탈취 포함)</span>
              <span className="text-2xl font-extrabold text-cyan-400 font-mono">
                {estimatedPrice.toLocaleString()} 원
              </span>
            </div>
            <a
              href="tel:1588-0000"
              className="w-full sm:w-auto px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg text-center"
            >
              이 금액으로 예약 문의
            </a>
          </div>
        </div>
      </section>

      {/* Cleaning Scope Checklist */}
      <section id="services" className="max-w-5xl mx-auto px-6 py-16 space-y-8 border-t border-slate-800">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase">CHECKLIST</span>
          <h2 className="text-2xl font-bold text-white">구역별 세부 청소 범위</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 text-xs">
          <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-3">
            <h4 className="font-bold text-sm text-cyan-400">주방 구역</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-400" /> 싱크대 걸레받이 내부 청소</li>
              <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-400" /> 후드 필터 기름때 고온스팀</li>
              <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-400" /> 수납장 탈거 후 미세먼지 세척</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-3">
            <h4 className="font-bold text-sm text-cyan-400">욕실 & 베란다</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-400" /> 배수구 탈거 및 약품 소독</li>
              <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-400" /> 환풍기 커버 분리 세척</li>
              <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-400" /> 물때 제거 및 방오 코팅</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-3">
            <h4 className="font-bold text-sm text-cyan-400">방 & 거실</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-400" /> 창틀 묵은 먼지 틈새 세척</li>
              <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-400" /> 몰딩/벽지 풀 자국 제거</li>
              <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-400" /> 전등갓 내부 벌레/먼지 분리</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 px-6 py-10 text-xs border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h4 className="font-bold text-white text-sm mb-2">클린앤케어 본사 직영점</h4>
            <p className="text-slate-500">서울시 영등포구 국회대로 45길 12 | 대표: 박클린</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-cyan-400 text-sm">상담 센터: 1588-0000</p>
            <p className="text-slate-500">365일 연중무휴 상담 가능</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
