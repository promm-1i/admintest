import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

/* 이미지 — src/images/hero.jpg 를 덮어쓰면 그대로 반영됩니다 */
import heroImg from './images/hero.jpg'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

const SITE = {
  // 여기에 회사 기본 정보 교체
  name: '바움',
  nameEn: 'BAUM',
  slogan: '조용히, 오래,\n제대로 만듭니다',
  sloganSub: '2009년부터 정밀 부품 하나로 여기까지 왔습니다.\n화려한 말 대신, 숫자와 거래처가 바움을 설명합니다.',

  // 여기에 연락처 교체
  phone: '02-1234-5678',
  email: 'hello@baum.co.kr',
  address: '경기도 화성시 동탄산단로 123, 바움 제1공장',

  // 여기에 사업자 정보 교체
  ceo: '대표이사 김바움',
  bizNo: '123-45-67890',

  // 여기에 네비게이션 교체
  nav: [
    { label: '사업영역', href: '#business' },
    { label: '숫자로 보는 바움', href: '#numbers' },
    { label: '연혁', href: '#history' },
    { label: '함께한 기업', href: '#clients' },
    { label: '뉴스', href: '#news' },
    { label: '문의', href: '#contact' },
  ],

  // 여기에 히어로 사진 교체
  heroPhoto: heroImg,

  // 여기에 히어로 첫 줄 교체
  heroEyebrow: '정밀 부품 제조 · 2009년 설립 · 경기 화성',

  // 여기에 히어로 사양판 교체 — 라벨과 값만 바꾸면 됩니다
  heroPlate: {
    title: '가공 사양',
    caption: '제1공장 · 화성',
    specs: [
      { k: '가공 공차', v: '±0.005mm' },
      { k: '월 생산', v: '12만 개' },
      { k: '평균 납기', v: '21일' },
      { k: '검사', v: '전수 · 성적서 발행' },
    ],
  },

  // 사업영역
  business: [
    {
      title: '정밀 가공',
      desc: '±0.005mm 공차의 CNC 정밀 가공. 자동차 · 반도체 장비 부품을 주력으로 월 12만 개를 생산합니다.',
      keywords: ['CNC 5축', '자동차 부품', '반도체 장비'],
    },
    {
      title: '금형 설계 · 제작',
      desc: '설계부터 시험 사출까지 사내에서 끝냅니다. 평균 납기 21일, 수정 대응 48시간.',
      keywords: ['사출 금형', '프레스 금형', '시제품'],
    },
    {
      title: '조립 · 품질 검사',
      desc: '3차원 측정기 4대 상시 가동. 전수 검사 후 로트별 성적서를 함께 납품합니다.',
      keywords: ['3D 측정', '전수 검사', '성적서 발행'],
    },
  ],

  // 숫자 지표
  numbers: [
    { label: '설립', value: 2009, unit: '년', sub: '16년째 한 분야' },
    { label: '연 매출', value: 184, unit: '억', sub: '2025년 기준' },
    { label: '거래 기업', value: 47, unit: '개사', sub: '1차 협력사 포함' },
    { label: '불량률', value: 0.02, unit: '%', sub: '최근 3년 평균', decimal: true },
  ],

  // 연혁
  history: [
    { year: '2009', text: '바움정밀 설립 · 화성 1공장 가동' },
    { year: '2013', text: '자동차 1차 협력사 등록' },
    { year: '2016', text: 'ISO 9001 · IATF 16949 인증' },
    { year: '2019', text: '금형사업부 신설 · 5축 가공기 도입' },
    { year: '2022', text: '반도체 장비 부품 양산 시작' },
    { year: '2025', text: '연 매출 184억 · 제2공장 착공' },
  ],

  // 함께한 기업 — 로고 대신 업종 텍스트 (로고는 이미지 교체 시)
  clients: ['자동차 1차 협력사 3곳', '반도체 장비사 2곳', '전자부품 제조 5곳', '방산 협력 1곳', '의료기기 2곳'],
  certifications: ['ISO 9001', 'IATF 16949', '벤처기업 인증', 'ISO 14001'],

  // 일하는 방식
  values: [
    { title: '납기는 약속', desc: '지난 3년 납기 준수율 99.2%. 늦어질 것 같으면 먼저 전화드립니다.' },
    { title: '문제는 문서로', desc: '불량 · 이슈는 숨기지 않고 8D 리포트로 공유합니다. 같은 문제는 두 번 없습니다.' },
    { title: '사람이 오래 다니는 회사', desc: '평균 근속 9.4년. 숙련이 품질이라고 믿습니다.' },
  ],

  // 뉴스룸 — 여기에 실제 소식 교체
  news: [
    { date: '2026. 08', tag: '설비', title: '제2공장 착공 — 2027년 상반기 가동 목표' },
    { date: '2026. 06', tag: '인증', title: 'IATF 16949 갱신 심사 무결점 통과' },
    { date: '2026. 03', tag: '채용', title: 'CNC 가공 · 품질 부문 상시 채용 중' },
  ],

  // 오시는 길
  location: {
    car: '동탄IC에서 차량 10분 · 공장 앞 주차 가능',
    transit: '동탄역에서 셔틀 운행 (사전 연락)',
    hours: '평일 08:30 – 17:30 · 주말 휴무',
  },
} as const

// ══════════════════════════════════════════════════════════════════════════════
// 훅 · 공통
// ══════════════════════════════════════════════════════════════════════════════

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(!MOTION)
  useEffect(() => {
    if (!MOTION) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useCountUp(target: number, active: boolean, decimal = false, duration = 1500) {
  const [val, setVal] = useState(MOTION ? 0 : target)
  useEffect(() => {
    if (!active) return
    if (!MOTION || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target)
      return
    }
    let start: number | null = null
    const tick = (ts: number) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const v = (1 - (1 - p) ** 3) * target
      setVal(decimal ? Math.round(v * 100) / 100 : Math.round(v))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration, decimal])
  return val
}

function goTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })
}

/* 섹션 머리 — 좌측 정렬 + 인디고 룰 */
function Head({ title, sub, inView, light = false }: { title: React.ReactNode; sub?: string; inView: boolean; light?: boolean }) {
  return (
    <div className={`anim-fade-up ${inView ? 'in-view' : ''} mb-12 md:mb-16`}>
      <div className={`rule-draw ${inView ? 'in-view' : ''} w-12 h-1 bg-indigo mb-6`} />
      <h2 className={`f-display text-[1.9rem] md:text-[2.6rem] ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {sub && <p className={`mt-4 text-[0.9375rem] leading-[1.8] max-w-xl ${light ? 'text-white/55' : 'text-ink-55'}`}>{sub}</p>}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 헤더
// ══════════════════════════════════════════════════════════════════════════════

function Header({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  const go = (href: string) => {
    setOpen(false)
    goTo(href)
  }
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-6 h-16 flex items-center justify-between gap-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-indigo" aria-hidden="true" />
          <span className="f-display text-[1.15rem] tracking-tight">{SITE.nameEn}</span>
          <span className="text-[0.8125rem] font-semibold text-ink-55 mt-0.5">{SITE.name}</span>
        </button>

        <nav className="hidden md:flex items-center gap-0.5">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => go(n.href)}
              className={`px-3 py-2 text-[0.9rem] font-semibold ${active === n.href.slice(1) ? 'text-indigo' : 'text-ink/60 hover:text-ink'}`}
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => go('#contact')}
            className="ml-3 px-5 py-2.5 bg-graph text-white text-[0.9rem] font-bold hover:bg-indigo"
            style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
          >
            견적 문의
          </button>
        </nav>

        <button className="md:hidden p-2 -mr-2" aria-label="메뉴" onClick={() => setOpen(!open)}>
          <div className="w-6 space-y-1.5">
            <span className="block h-0.5 bg-ink" />
            <span className={`block h-0.5 bg-ink ${open ? 'opacity-0' : ''}`} />
            <span className="block h-0.5 bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-white px-5 py-2">
          {SITE.nav.map((n) => (
            <button key={n.href} onClick={() => go(n.href)} className="block w-full text-left py-3.5 text-[1rem] font-semibold border-b border-line last:border-0">
              {n.label}
            </button>
          ))}
          <button onClick={() => go('#contact')} className="block w-full text-center my-3 py-3.5 bg-graph text-white font-bold">
            견적 문의
          </button>
        </div>
      )}
    </header>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 히어로 — 도면 한 장. 부품 단면이 화면을 가로질러 좌우로 흘러나가고,
//          절삭 지점(엔드밀) 한 곳만 8초 루프로 움직인다.
// ══════════════════════════════════════════════════════════════════════════════

/* 부품 도면 — 배경 이미지로 깔아 히어로 폭을 가로지르고 좌우로 잘려 나간다.
   DOM 요소가 아니라서 화면 밖으로 삐져나가는 자식 노드가 생기지 않는다.
   좌표계 2000×230, 중심선 y=115. 우측 정렬이라 오른쪽 끝(가공면·툴)이 항상 보인다.
   플랜지 → 몸통 → 보스 → 저널 → 모따기 → 끝면 순의 단차축 단면. */
const HX_DRAWING = `<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="230" viewBox="0 0 2000 230">
<defs><pattern id="hxh" width="15" height="15" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
<rect width="15" height="15" fill="#ffffff" fill-opacity="0.028"/>
<line x1="0" y1="0" x2="0" y2="15" stroke="#ffffff" stroke-opacity="0.075" stroke-width="1"/>
</pattern></defs>
<path d="M0 115H2000" stroke="#ffffff" stroke-opacity="0.32" stroke-width="1.5" stroke-dasharray="42 10 8 10"/>
<path d="M0 57H750V83H880V97H1000V83H1320V69H1670V98H1690V94H1916L1936 101V129L1916 136H1690V132H1670V161H1320V147H750V173H0Z" fill="url(#hxh)" stroke="#ffffff" stroke-opacity="0.8" stroke-width="2.2" stroke-linejoin="miter"/>
<path d="M1690 142V190M1916 142V190M1690 181H1916" stroke="#ffffff" stroke-opacity="0.32" stroke-width="1.1"/>
<path d="M1690 181l14-4.2v8.4zM1916 181l-14-4.2v8.4z" fill="#ffffff" fill-opacity="0.48"/>
<text x="1803" y="172" text-anchor="middle" font-family="sans-serif" font-size="17" font-weight="600" letter-spacing="0.4" fill="#dfe0e4">±0.005mm</text>
</svg>`

const HX_DRAWING_URL = `url("data:image/svg+xml,${encodeURIComponent(HX_DRAWING)}")`

function Hero() {
  const { ref, inView } = useInView(0.05)
  return (
    <section ref={ref} className="hero hx-hero relative overflow-hidden bg-graph text-white">
      {/* 여기에 회사 대표 사진 교체 (공장 · 설비 · 팀) */}
      <img src={SITE.heroPhoto} alt="바움 제1공장 CNC 가공 라인" className="hx-photo absolute inset-0 w-full h-full object-cover" />
      <div className="hx-scrim absolute inset-0" aria-hidden="true" />

      {/* ── 선언 ── */}
      <div className={`anim-fade-up ${inView ? 'in-view' : ''} relative max-w-6xl mx-auto px-5 md:px-6 pt-28 md:pt-32 pb-8 md:pb-10`}>
        <p className="flex items-center gap-2.5 text-[0.8125rem] font-semibold text-[#b9bbc2] mb-6">
          <span className="w-2.5 h-2.5 shrink-0" style={{ background: '#8b83f6' }} aria-hidden="true" />
          {SITE.heroEyebrow}
        </p>

        <h1 className="f-display text-[2.4rem] md:text-[3.4rem] lg:text-[4rem] xl:text-[4.6rem] whitespace-pre-line mb-7 max-w-4xl">
          {SITE.slogan}
        </h1>

        <p className="whitespace-pre-line text-[1rem] leading-[1.85] text-[#b9bbc2] max-w-xl mb-9">{SITE.sloganSub}</p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); goTo('#contact') }}
            className="hx-cta inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-indigo text-white text-[1rem] font-bold hover:bg-indigo-d"
            style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
          >
            견적 문의하기
          </a>
          <a
            href="#business"
            onClick={(e) => { e.preventDefault(); goTo('#business') }}
            className="text-[1rem] font-bold text-white border-b-2 border-white/50 pb-0.5 hover:border-white"
            style={{ transition: MOTION ? 'border-color 0.2s' : 'none' }}
          >
            사업영역 보기
          </a>
        </div>
      </div>

      {/* ── 도면 — 좌우로 흘러나가고, 절삭 지점 한 곳만 움직인다 ── */}
      <div className="hx-draw relative" style={{ backgroundImage: HX_DRAWING_URL }} aria-hidden="true">
        {/* 히어로 안에서 무한 반복하는 선언은 이 하나뿐이다.
            기본 상태 = 툴이 저널 오른쪽 끝 위로 물러난 자리 → 멈추면 완성 부품 도면이 된다. */}
        <svg className="hx-tool" viewBox="0 0 70 140" fill="none">
          <path d="M20 0H50V54H20Z" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
          <path d="M8 54H62V132L56 140H14L8 132Z" fill="rgba(139,131,246,0.16)" stroke="#8b83f6" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M8 122L62 96M8 104L62 78M8 86L62 60" stroke="#8b83f6" strokeOpacity="0.5" strokeWidth="1.6" />
        </svg>
      </div>

      {/* ── 표제란 — 도면 아래 전 폭에 깔리는 사양·인증 ── */}
      <div className="hx-rail relative">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {SITE.heroPlate.specs.map((s) => (
              <div key={s.k} className="hx-cell">
                <dt className="text-[0.75rem] font-semibold tracking-[0.04em] text-[#a4a6ad] mb-1.5">{s.k}</dt>
                <dd className="nums text-[0.9375rem] font-bold text-white">{s.v}</dd>
              </div>
            ))}
          </dl>
          <div className="hx-note">
            <span className="hx-note-k">{SITE.heroPlate.title}</span>
            <span className="hx-note-v">{SITE.heroPlate.caption}</span>
            <span className="hx-note-k">인증</span>
            <span className="hx-note-v">{SITE.certifications.join(' · ')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 사업영역 — 그리드 타일 (호버 시 잉크 침투)
// ══════════════════════════════════════════════════════════════════════════════

function Business() {
  const { ref, inView } = useInView(0.08)
  return (
    <section id="business" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="세 가지만 합니다" sub="넓게 벌리지 않습니다. 잘하는 것을 더 잘하게 — 그게 바움의 성장 방식입니다." inView={inView} />
        <div className="grid md:grid-cols-3 border-t border-l border-line">
          {SITE.business.map((b, i) => (
            <div key={b.title} className={`biz anim-fade-up ${['', 'd80', 'd160'][i]} ${inView ? 'in-view' : ''} border-r border-b border-line p-8 md:p-10`}>
              <h3 className="biz-t f-display text-[1.5rem] mb-4" style={{ transition: MOTION ? 'color 0.25s' : 'none' }}>{b.title}</h3>
              <p className="biz-d text-[0.9375rem] text-ink-55 leading-[1.8] mb-6" style={{ transition: MOTION ? 'color 0.25s' : 'none' }}>{b.desc}</p>
              <p className="biz-a text-[0.8125rem] font-bold text-indigo" style={{ transition: MOTION ? 'color 0.25s' : 'none' }}>
                {b.keywords.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 숫자 지표
// ══════════════════════════════════════════════════════════════════════════════

function NumberItem({ n, active }: { n: (typeof SITE.numbers)[number]; active: boolean }) {
  const val = useCountUp(n.value, active, 'decimal' in n && !!n.decimal)
  return (
    <div className="py-8 md:py-10">
      <p className="text-[0.8125rem] font-semibold text-ink-55 mb-2">{n.label}</p>
      <p className="nums f-display text-[2.6rem] md:text-[3.4rem] text-ink leading-none">
        {'decimal' in n && n.decimal ? val.toFixed(2) : val.toLocaleString()}
        <span className="text-[1.1rem] md:text-[1.4rem] ml-0.5 text-indigo">{n.unit}</span>
      </p>
      <p className="text-[0.75rem] text-ink-55/80 mt-2">{n.sub}</p>
    </div>
  )
}

function Numbers() {
  const { ref, inView } = useInView(0.35)
  return (
    <section id="numbers" ref={ref} className="border-y border-line bg-mist/60">
      <div className="max-w-6xl mx-auto px-5 md:px-6 grid grid-cols-2 md:grid-cols-4">
        {SITE.numbers.map((n, i) => (
          <div key={n.label} className={i > 0 ? 'md:border-l border-line md:pl-8' : ''}>
            <NumberItem n={n} active={inView} />
          </div>
        ))}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 연혁 — 가로 타임라인
// ══════════════════════════════════════════════════════════════════════════════

function History() {
  const { ref, inView } = useInView(0.12)
  return (
    <section id="history" className="py-20 md:py-28">
      <div ref={ref} className={`max-w-6xl mx-auto px-5 md:px-6 ${inView ? 'in-view' : ''}`}>
        <Head title="16년의 기록" inView={inView} />
        <div className="scroll-x -mx-5 px-5 md:mx-0 md:px-0">
          <ol className="flex min-w-[820px] md:min-w-0 relative pt-4">
            <div className="absolute top-[7px] left-0 right-0 h-px bg-line" aria-hidden="true">
              <div className="timeline-line h-full bg-indigo" />
            </div>
            {SITE.history.map((h, i) => (
              <li key={h.year} className={`anim-fade-up ${['', 'd80', 'd160', 'd240', 'd320', 'd320'][i]} ${inView ? 'in-view' : ''} flex-1 pr-6 relative`}>
                <span className="absolute -top-[9px] left-0 w-2 h-2 rounded-full bg-indigo" aria-hidden="true" />
                <p className="nums f-display text-[1.3rem] text-indigo mt-4 mb-2">{h.year}</p>
                <p className="text-[0.875rem] text-ink/80 leading-[1.7] pr-2">{h.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 함께한 기업 · 인증 · 일하는 방식
// ══════════════════════════════════════════════════════════════════════════════

function Clients() {
  const { ref, inView } = useInView(0.1)
  return (
    <section id="clients" className="py-20 md:py-28 bg-mist/60">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="함께한 기업" sub="계약상 사명을 밝힐 수 없는 곳이 많습니다. 업종과 숫자로 대신합니다." inView={inView} />
        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''} flex flex-wrap gap-3 mb-10`}>
          {SITE.clients.map((c) => (
            <span key={c} className="px-5 py-3 bg-white border border-line text-[0.9375rem] font-semibold">{c}</span>
          ))}
        </div>
        <div className={`anim-fade-up d160 ${inView ? 'in-view' : ''} flex flex-wrap items-center gap-x-8 gap-y-2 text-[0.875rem] font-bold text-ink-55`}>
          <span className="text-[0.8125rem] font-semibold text-ink-55/70">보유 인증</span>
          {SITE.certifications.map((c) => (
            <span key={c} className="nums">{c}</span>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-x-12 gap-y-8 mt-20">
          {SITE.values.map((v, i) => (
            <div key={v.title} className={`anim-fade-up ${['', 'd80', 'd160'][i]} ${inView ? 'in-view' : ''} border-t-2 border-graph pt-5`}>
              <h3 className="text-[1.1rem] font-extrabold mb-2">{v.title}</h3>
              <p className="text-[0.9375rem] text-ink-55 leading-[1.8]">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 뉴스
// ══════════════════════════════════════════════════════════════════════════════

function News() {
  const { ref, inView } = useInView(0.12)
  return (
    <section id="news" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="바움 소식" inView={inView} />
        <ul className="border-t border-line">
          {SITE.news.map((n, i) => (
            <li key={n.title} className={`anim-fade-up ${['', 'd80', 'd160'][i]} ${inView ? 'in-view' : ''} grid md:grid-cols-[110px_90px_1fr] gap-x-8 gap-y-1 items-baseline py-5 border-b border-line`}>
              <span className="nums text-[0.875rem] text-ink-55">{n.date}</span>
              <span className="text-[0.75rem] font-bold text-indigo">{n.tag}</span>
              <p className="text-[1rem] font-semibold">{n.title}</p>
            </li>
          ))}
        </ul>
        <p className={`anim-fade-up d240 ${inView ? 'in-view' : ''} text-[0.75rem] text-ink-55 mt-4`}>* 템플릿 예시 소식입니다. 실제 소식으로 교체하세요.</p>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 문의 — 그라파이트
// ══════════════════════════════════════════════════════════════════════════════

function Contact() {
  const { ref, inView } = useInView(0.12)
  const [sent, setSent] = useState(false)
  return (
    <section id="contact" className="py-20 md:py-28 bg-graph text-white">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6 grid lg:grid-cols-2 gap-x-20 gap-y-12">
        <div className={`anim-fade-up ${inView ? 'in-view' : ''}`}>
          <div className={`rule-draw ${inView ? 'in-view' : ''} w-12 h-1 bg-indigo mb-6`} />
          <h2 className="f-display text-[1.9rem] md:text-[2.6rem] text-white mb-6">
            도면 한 장이면
            <br />
            견적이 시작됩니다
          </h2>
          <p className="text-white/55 text-[0.9375rem] leading-[1.85] max-w-sm mb-10">
            도면 또는 샘플 사진을 보내주시면 2영업일 안에 견적과 납기를 회신드립니다. NDA가 필요하면 먼저 요청해 주세요.
          </p>
          <div className="space-y-2 text-[0.9375rem]">
            <p><span className="text-white/45 inline-block w-16">전화</span><a href={`tel:${SITE.phone}`} className="nums font-bold border-b border-indigo pb-0.5">{SITE.phone}</a></p>
            <p><span className="text-white/45 inline-block w-16">이메일</span><a href={`mailto:${SITE.email}`} className="font-bold border-b border-indigo pb-0.5">{SITE.email}</a></p>
          </div>
        </div>

        <form
          className={`anim-fade-up d160 ${inView ? 'in-view' : ''}`}
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-[0.8125rem] font-bold text-white/45 mb-1" htmlFor="c-company">회사명</label>
                <input id="c-company" className="field-dark" placeholder="회사명" />
              </div>
              <div>
                <label className="block text-[0.8125rem] font-bold text-white/45 mb-1" htmlFor="c-name">담당자</label>
                <input id="c-name" className="field-dark" placeholder="이름 / 직함" />
              </div>
            </div>
            <div>
              <label className="block text-[0.8125rem] font-bold text-white/45 mb-1" htmlFor="c-contact">연락처 또는 이메일</label>
              <input id="c-contact" className="field-dark" placeholder="회신받을 연락처" />
            </div>
            <div>
              <label className="block text-[0.8125rem] font-bold text-white/45 mb-1" htmlFor="c-msg">문의 내용</label>
              <input id="c-msg" className="field-dark" placeholder="예) 알루미늄 가공 부품 견적 요청, 월 5,000개" />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-indigo text-white text-[1rem] font-bold hover:bg-indigo-d"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              {sent ? '접수됐습니다. 2영업일 내 회신드립니다.' : '견적 문의 보내기'}
            </button>
            <p className="text-[0.75rem] text-white/35">* 템플릿 데모 — 실제 전송되지 않습니다.</p>
          </div>
        </form>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 오시는 길 · 푸터 · 모바일 바
// ══════════════════════════════════════════════════════════════════════════════

function Location() {
  const { ref, inView } = useInView(0.15)
  return (
    <section className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="오시는 길" sub={SITE.address} inView={inView} />
        <dl className={`anim-fade-up d80 ${inView ? 'in-view' : ''} grid md:grid-cols-3 border-t border-l border-line`}>
          {[
            ['차량', SITE.location.car],
            ['대중교통', SITE.location.transit],
            ['근무시간', SITE.location.hours],
          ].map(([k, v]) => (
            <div key={k} className="border-r border-b border-line p-7">
              <dt className="text-[0.8125rem] font-bold text-indigo mb-2">{k}</dt>
              <dd className="text-[0.9375rem] text-ink/80 leading-[1.75]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2.5 h-2.5 bg-indigo" aria-hidden="true" />
          <span className="f-display text-[1.1rem]">{SITE.nameEn}</span>
          <span className="text-[0.8125rem] font-semibold text-ink-55">{SITE.name}</span>
        </div>
        <div className="space-y-1.5 text-[0.8125rem] text-ink-55">
          <p>{SITE.ceo} · 사업자등록번호 {SITE.bizNo}</p>
          <p>{SITE.address}</p>
          <p>{SITE.phone} · {SITE.email}</p>
        </div>
        <p className="mt-8 pt-4 border-t border-line text-[0.75rem] text-ink-55">
          © {new Date().getFullYear()} {SITE.nameEn}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function MobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-graph text-white pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 divide-x divide-white/15">
        <a href={`tel:${SITE.phone}`} className="py-3.5 text-center text-[0.9375rem] font-bold">전화</a>
        <a href={`mailto:${SITE.email}`} className="py-3.5 text-center text-[0.9375rem] font-bold">이메일</a>
        <button onClick={() => goTo('#contact')} className="py-3.5 text-center text-[0.9375rem] font-extrabold" style={{ color: '#8b83f6' }}>
          견적 문의
        </button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// App
// ══════════════════════════════════════════════════════════════════════════════

export default function App() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const ids = SITE.nav.map((n) => n.href.slice(1))
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen pb-12 md:pb-0">
      <Header active={active} />
      <main>
        <Hero />
        <Business />
        <Numbers />
        <History />
        <Clients />
        <News />
        <Contact />
        <Location />
      </main>
      <Footer />
      <MobileBar />
    </div>
  )
}
