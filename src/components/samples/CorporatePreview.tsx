import { Shield, ArrowRight, Cpu, BarChart3 } from "lucide-react";

export function CorporatePreview() {

  return (
    <div className="w-full bg-slate-950 text-slate-100 font-sans rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Top Banner */}
      <div className="bg-blue-950 border-b border-blue-900/60 px-6 py-2 text-center text-xs font-mono text-blue-300 tracking-wider">
        GLOBAL B2B ENTERPRISE AI & CLOUD SOLUTIONS · ISO 27001 CERTIFIED
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white font-mono">
            N
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white font-mono">
            NEXTWAVE <span className="text-xs font-normal text-blue-400">INC.</span>
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider text-slate-300">
          <a href="#about" className="hover:text-blue-400 transition-colors">ABOUT US</a>
          <a href="#solutions" className="hover:text-blue-400 transition-colors">SOLUTIONS</a>
          <a href="#history" className="hover:text-blue-400 transition-colors">MILESTONES</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">IR & CONTACT</a>
        </nav>

        <a
          href="#contact"
          className="bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs px-5 py-2.5 rounded transition-all flex items-center gap-1"
        >
          INQUIRE NOW <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:py-32 bg-slate-950 overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          <span className="inline-block px-3.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs tracking-widest">
            NEXT-GEN DIGITAL TRANSFORMATION
          </span>
          <h1 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight font-mono">
            Empowering Enterprise <br />
            With Scalable AI Infrastructure
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-sans break-keep">
            넥스트웨이브 솔루션즈는 글로벌 금융, 제조, IT 기업을 대상으로 클라우드 최적화 및 보안엔진 인프라 통합 구축 서비스를 제공합니다.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="#solutions"
              className="px-7 py-3 bg-blue-600 text-white font-mono text-xs font-bold rounded hover:bg-blue-500 transition-all shadow-xl"
            >
              솔루션 안내서 다운로드
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-slate-700 bg-slate-900/80 text-slate-200 font-mono text-xs rounded hover:bg-slate-800 transition-all"
            >
              기업 도입 문의
            </a>
          </div>
        </div>

        {/* Global Stats Grid */}
        <div className="mt-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl border border-slate-800 bg-slate-900/60 font-mono">
          <div className="text-center p-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-400">120+</p>
            <p className="text-[11px] text-slate-400 mt-1">Global Clients</p>
          </div>
          <div className="text-center p-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-white">99.99%</p>
            <p className="text-[11px] text-slate-400 mt-1">SLA Uptime</p>
          </div>
          <div className="text-center p-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-400">18 Patents</p>
            <p className="text-[11px] text-slate-400 mt-1">Core Tech Patents</p>
          </div>
          <div className="text-center p-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-white">$45M+</p>
            <p className="text-[11px] text-slate-400 mt-1">Annual Revenue</p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="max-w-6xl mx-auto px-6 py-20 space-y-10 border-t border-slate-800">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">OUR CAPABILITIES</span>
          <h2 className="text-3xl font-bold font-mono text-white">엔터프라이즈 핵심 솔루션</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <Cpu className="h-6 w-6 text-blue-400" />
            <h3 className="font-mono font-bold text-lg text-white">Cloud Native Architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              대규모 트래픽 처리에 특화된 멀티 클라우드 오케스트레이션 및 컨테이너 최적화 설계.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <Shield className="h-6 w-6 text-blue-400" />
            <h3 className="font-mono font-bold text-lg text-white">Zero Trust Security</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              모든 트랜잭션을 실시간 검증하는 엔드투엔드 암호화 및 차세대 접근 제어 솔루션.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <BarChart3 className="h-6 w-6 text-blue-400" />
            <h3 className="font-mono font-bold text-lg text-white">AI Data Intelligence</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              비정형 빅데이터 분석 및 프라이빗 LLM 온프레미스 구축 프로세스 완비.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Contact */}
      <footer id="contact" className="bg-slate-950 text-slate-400 px-6 py-12 border-t border-slate-800 font-mono text-xs">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-white text-base mb-3">NEXTWAVE SOLUTIONS INC.</h4>
            <p className="leading-relaxed text-slate-400">
              서울시 서초구 반포대로 122 넥스트타워 14~16층 <br />
              대표전화: 02-500-1000
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-white text-base mb-3">BUSINESS INQUIRIES</h4>
            <p>E-mail: contact@nextwave-sol.com</p>
            <p>IR: ir@nextwave-sol.com</p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-white text-base mb-3">GLOBAL OFFICES</h4>
            <p>SEOUL · TOKYO · SINGAPORE · SAN FRANCISCO</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
