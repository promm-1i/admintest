import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

/* 이미지 — src/images/ 안의 파일을 같은 이름으로 덮어쓰면 그대로 반영됩니다 */
import heroImg from './images/hero.jpg'
import baBefore from './images/ba-before.jpg'
import baAfter from './images/ba-after.jpg'
import projImg1 from './images/proj-1.jpg'
import projImg2 from './images/proj-2.jpg'
import projImg3 from './images/proj-3.jpg'
import projImg4 from './images/proj-4.jpg'
import projImg5 from './images/proj-5.jpg'
import projImg6 from './images/proj-6.jpg'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

const SITE = {
  // 여기에 업체 기본 정보 교체
  name: '온도 인테리어',
  nameEn: 'ONDO INTERIOR',
  slogan: '공간의 온도를\n바꾸는 일',
  sloganSub: '허물고 새로 짓는 대신, 이 집이 가진 결을 살립니다.\n실측부터 입주까지, 한 명의 실장이 끝까지 책임집니다.',

  // 여기에 연락처 교체
  phone: '010-1234-5678',
  kakaoId: '@온도인테리어',
  kakaoUrl: 'https://pf.kakao.com/_xxxxxs',
  instagram: '@ondo_interior',

  // 여기에 사업자 정보 교체
  ceo: '대표 김온도',
  bizNo: '123-45-67890',
  address: '서울특별시 마포구 성미산로 123, 1층',
  license: '실내건축공사업 면허 제0000호',

  // 여기에 히어로 사진 교체
  heroPhoto: heroImg,
  heroSpec: { area: '32py', period: '8주', type: '아파트 전체' },

  // 여기에 네비게이션 메뉴 교체
  nav: [
    { label: '프로젝트', href: '#projects' },
    { label: '전후 비교', href: '#ba' },
    { label: '진행 방식', href: '#process' },
    { label: '비용', href: '#pricing' },
    { label: '자재 · 보증', href: '#materials' },
    { label: 'FAQ', href: '#faq' },
    { label: '상담', href: '#consult' },
  ],

  // 여기에 프로젝트 교체 — spec 은 도면 타이틀 블록에 표기됩니다
  projects: [
    {
      photo: projImg1,
      title: '연남동 32py',
      desc: '주방 확장 전체 리모델링',
      spec: { area: '32py', period: '8주', scope: '전체' },
      wide: true,
    },
    {
      photo: projImg2,
      title: '망원동 24py',
      desc: '거실 중심 부분 수리',
      spec: { area: '24py', period: '4주', scope: '부분' },
      wide: false,
    },
    {
      photo: projImg3,
      title: '합정동 18py',
      desc: '신혼집 올수리',
      spec: { area: '18py', period: '6주', scope: '전체' },
      wide: false,
    },
    {
      photo: projImg4,
      title: '상수동 카페',
      desc: '15py 상가 신규 오픈',
      spec: { area: '15py', period: '5주', scope: '상업' },
      wide: true,
    },
    {
      photo: projImg5,
      title: '성산동 28py',
      desc: '욕실 · 주방 집중 공사',
      spec: { area: '28py', period: '3주', scope: '부분' },
      wide: false,
    },
    {
      photo: projImg6,
      title: '연희동 사무실',
      desc: '20py 업무 공간',
      spec: { area: '20py', period: '4주', scope: '상업' },
      wide: false,
    },
  ],

  // 여기에 비포/애프터 사진 교체 — 같은 공간의 시공 전·후 사진을 넣으세요
  beforeAfter: {
    before: baBefore,
    after: baAfter,
    caption: '연남동 32py 주방 — 철거부터 마감까지 8주',
  },

  // 진행 방식 — 주차별 공정
  process: [
    { week: '1주', title: '상담 · 실측', desc: '집을 직접 보고 치수를 잽니다. 살면서 불편했던 지점부터 듣습니다.' },
    { week: '2주', title: '설계 · 견적', desc: '도면과 3D, 항목별 견적서를 드립니다. 자재 등급까지 명시합니다.' },
    { week: '3주', title: '철거', desc: '보양 작업 후 철거. 폐기물 처리와 민원 안내문까지 저희 몫입니다.' },
    { week: '4-5주', title: '설비 · 목공', desc: '배관 · 전기 · 단열을 손보고 뼈대를 세웁니다. 중간 점검을 함께 합니다.' },
    { week: '6-7주', title: '마감', desc: '타일 · 도장 · 필름 · 바닥. 매일 저녁 사진으로 진행을 공유합니다.' },
    { week: '8주', title: '조명 · 검수 · 인도', desc: '함께 체크리스트로 검수하고 열쇠를 드립니다. 하자보수 2년.' },
  ],

  // 비용 기준 — 평형별
  pricing: [
    { scope: '부분 수리', desc: '주방 또는 욕실 1곳 + 도배 · 바닥', p18: '900만~', p24: '1,200만~', p32: '1,500만~' },
    { scope: '전체 리모델링', desc: '철거 포함 전 구역, 구조 변경 제외', p18: '2,800만~', p24: '3,600만~', p32: '4,800만~' },
    { scope: '올수리 (확장 포함)', desc: '구조 변경 · 확장 · 새시 교체 포함', p18: '3,800만~', p24: '4,900만~', p32: '6,500만~' },
  ],
  pricingNote: '부가세 별도 기준 요금입니다. 현장 상태와 자재 선택에 따라 실측 후 확정 견적을 드리며, 계약 이후 추가 비용이 생기면 사전 서면 동의 없이는 진행하지 않습니다.',

  // 원칙 3가지
  principles: [
    { title: '한 명이 끝까지', desc: '상담한 실장이 시공도 관리합니다. 말이 바뀌지 않습니다.' },
    { title: '견적서가 계약서', desc: '항목별 견적서 그대로 시공합니다. 추가 비용은 서면 동의 후에만.' },
    { title: '매일 저녁 보고', desc: '오늘 한 일과 내일 할 일을 사진과 함께 보냅니다.' },
  ],

  // 후기
  reviews: [
    { text: '견적서에 자재 모델명까지 적혀 있어서 비교가 쉬웠어요. 공사 중에 말이 바뀐 적이 한 번도 없었습니다.', author: '연남동 32py', tag: '전체 리모델링' },
    { text: '매일 저녁 사진으로 보고를 받으니 멀리서도 불안하지 않았어요. 검수 날 체크리스트로 같이 확인한 게 좋았습니다.', author: '합정동 18py', tag: '올수리' },
  ],

  // 자재 기준 — 항목별로 무엇을 기본으로 쓰는지
  materials: [
    { part: '새시', spec: '1군 브랜드 이중창 (24mm 로이유리)', note: '결로 · 단열 기준 충족' },
    { part: '바닥', spec: '강마루 또는 원목마루, 친환경 E0 등급', note: '층간소음 완충재 포함' },
    { part: '도장 · 벽', spec: '친환경 수성 페인트 · 실크 벽지', note: 'KC 인증 자재만 사용' },
    { part: '주방 · 붙박이', spec: 'E0 등급 PB · 무소음 댐핑 경첩', note: '10년 이상 사용 기준 설계' },
    { part: '욕실', spec: '국산 1군 도기 · 논슬립 타일', note: '방수 2회 + 담수 테스트' },
    { part: '조명 · 전기', spec: 'KS 인증 LED · 전 구간 신규 배선', note: '누전차단기 회로 분리' },
  ],

  // A/S · 보증
  warranty: {
    years: 2,
    items: [
      { title: '하자보수 2년', desc: '준공일 기준 2년. 시공 하자는 무상으로 보수합니다.' },
      { title: '48시간 응답', desc: '접수 후 2일 안에 방문 일정을 잡습니다. 급한 누수는 당일.' },
      { title: '서류로 남기는 보증', desc: '보증 범위와 기간을 준공 서류에 명시해 드립니다.' },
    ],
  },

  // 자주 묻는 질문
  faq: [
    { q: '살면서 공사할 수 있나요?', a: '부분 수리는 가능합니다. 구역을 나눠 진행하고 매일 청소 후 퇴근합니다. 전체 리모델링은 먼지와 소음 때문에 2~3주 단기 거처를 권해 드립니다.' },
    { q: '견적은 유료인가요?', a: '실측 견적까지 무료입니다. 도면과 항목별 견적서를 받아 보시고 비교 후 결정하셔도 됩니다. 계약을 재촉하지 않습니다.' },
    { q: '공사 중에 추가 비용이 생기지 않나요?', a: '철거 후 드러나는 문제(누수, 곰팡이 등)가 있으면 사진과 함께 견적을 다시 드리고, 서면 동의 후에만 진행합니다. 동의 없는 추가 청구는 없습니다.' },
    { q: '아파트 민원은 어떻게 하나요?', a: '관리사무소 신고, 동의서 취합 안내, 엘리베이터 보양, 세대 안내문 부착까지 저희가 처리합니다.' },
    { q: '자재를 직접 고를 수 있나요?', a: '네. 쇼룸 동행 또는 샘플북으로 직접 고르실 수 있고, 선택에 따른 금액 변동은 그 자리에서 알려드립니다.' },
  ],

  // 오시는 길
  location: {
    subway: '6호선 망원역 1번 출구 도보 6분',
    parking: '사무실 앞 2대 · 인근 공영주차장 3분',
    hours: '평일 10:00 – 19:00 · 토 예약제 · 일 휴무',
    note: '상담은 예약제로 운영합니다. 방문 전 연락 주세요.',
  },
} as const

// ══════════════════════════════════════════════════════════════════════════════
// 훅 · 공통
// ══════════════════════════════════════════════════════════════════════════════

function useInView(threshold = 0.12) {
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

/* 치수선 라벨 — |——— 텍스트 ———| */
function Dim({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`dim ${className}`} aria-hidden="true">
      <span className="dim-tickL" />
      <span className="shrink-0">{children}</span>
      <span className="dim-tickR" />
    </div>
  )
}

/* 섹션 머리 */
function Head({ label, title, inView }: { label: string; title: string; inView: boolean }) {
  return (
    <div className={`anim-fade-up ${inView ? 'in-view' : ''} mb-12 md:mb-16`}>
      <Dim className="max-w-[280px] mb-5">{label}</Dim>
      <h2 className="f-thin text-[2.1rem] md:text-[3rem] leading-[1.15]">{title}</h2>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 헤더
// ══════════════════════════════════════════════════════════════════════════════

function Header({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })
  }
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${scrolled || open ? 'bg-ivory/95 backdrop-blur-sm border-b border-hair' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-6 h-[68px] flex items-center justify-between gap-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="text-left leading-tight">
          <span className="block text-[1.05rem] font-extrabold tracking-tight">{SITE.name}</span>
          <span className="block text-[0.6875rem] text-ink-55 tracking-[0.14em]">{SITE.nameEn}</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => go(n.href)}
              className={`px-3.5 py-2 text-[0.9375rem] ${active === n.href.slice(1) ? 'text-camel font-bold' : 'text-ink/70 hover:text-ink font-medium'}`}
            >
              {n.label}
            </button>
          ))}
          <a href={`tel:${SITE.phone}`} className="nums ml-4 text-[0.9375rem] font-bold border-b-2 border-camel pb-0.5">
            {SITE.phone}
          </a>
        </nav>

        <button className="md:hidden p-2 -mr-2" aria-label="메뉴" onClick={() => setOpen(!open)}>
          <div className="w-6 space-y-[7px]">
            <span className="block h-px bg-ink" />
            <span className={`block h-px bg-ink ${open ? 'opacity-0' : ''}`} />
            <span className="block h-px bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-hair bg-ivory px-5 py-2">
          {SITE.nav.map((n) => (
            <button key={n.href} onClick={() => go(n.href)} className="block w-full text-left py-3.5 text-[1rem] font-medium border-b border-hair last:border-0">
              {n.label}
            </button>
          ))}
          <a href={`tel:${SITE.phone}`} className="nums block py-3.5 text-[1.05rem] font-bold text-camel">
            {SITE.phone}
          </a>
        </div>
      )}
    </header>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 히어로 — 매거진 오프닝
// ══════════════════════════════════════════════════════════════════════════════

function Hero() {
  const { ref, inView } = useInView(0.05)
  return (
    <section ref={ref} className={`pt-28 md:pt-40 pb-16 md:pb-24 ${inView ? 'in-view' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-end mb-12">
          <div>
            <h1 className={`anim-fade-up ${inView ? 'in-view' : ''} f-thin text-[3.2rem] md:text-[4.6rem] leading-[1.1] whitespace-pre-line mb-8`}>
              {SITE.slogan}
            </h1>
            <p className={`anim-fade-up d80 ${inView ? 'in-view' : ''} whitespace-pre-line text-[1rem] text-ink-55 leading-[1.9]`}>
              {SITE.sloganSub}
            </p>
          </div>
          <div className={`anim-fade-up d160 ${inView ? 'in-view' : ''} flex lg:justify-end`}>
            <div className="flex items-center gap-5">
              <button
                onClick={() => document.querySelector('#consult')?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })}
                className="px-7 py-4 bg-ink text-ivory text-[0.9375rem] font-bold hover:bg-camel"
                style={{ transition: MOTION ? 'background-color 0.25s' : 'none' }}
              >
                상담 신청
              </button>
              <button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })}
                className="text-[0.9375rem] font-bold border-b border-ink pb-1 hover:text-camel hover:border-camel"
                style={{ transition: MOTION ? 'color 0.2s, border-color 0.2s' : 'none' }}
              >
                프로젝트 보기
              </button>
            </div>
          </div>
        </div>

        {/* 히어로 사진 + 도면 타이틀 블록 */}
        <figure className={`anim-fade-up d240 ${inView ? 'in-view' : ''}`}>
          <div className="overflow-hidden">
            <img src={SITE.heroPhoto} alt="시공 사례 거실" className="img-settle w-full h-[340px] md:h-[560px] object-cover" />
          </div>
          <figcaption className="tblock mt-0 border-t-0">
            <div className="flex flex-wrap gap-x-6 gap-y-1 items-center text-ink-55">
              <span className="font-bold text-ink">최근 프로젝트</span>
              <span className="nums">{SITE.heroSpec.area}</span>
              <span className="nums">공기 {SITE.heroSpec.period}</span>
              <span>{SITE.heroSpec.type}</span>
            </div>
            <div className="tb-r nums text-ink-55">2026</div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 프로젝트 — 매거진 그리드 + 타이틀 블록 캡션
// ══════════════════════════════════════════════════════════════════════════════

function Projects() {
  const { ref, inView } = useInView(0.04)
  const [lb, setLb] = useState<number | null>(null)
  useEffect(() => {
    if (lb === null) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setLb(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lb])
  const P = SITE.projects
  return (
    <section id="projects" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head label="PROJECTS" title="지은 공간들" inView={inView} />
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-14">
          {SITE.projects.map((p, i) => (
            <figure key={p.title} className={`proj anim-fade-up ${['', 'd80', 'd160', 'd80', 'd160', 'd240'][i]} ${inView ? 'in-view' : ''} ${p.wide ? 'md:col-span-2' : ''}`}>
              <div className="overflow-hidden cursor-zoom-in" onClick={() => setLb(i)}>
                <img
                  src={p.photo}
                  alt={`${p.title} — ${p.desc}`}
                  className={`proj-img w-full object-cover ${p.wide ? 'aspect-[21/10]' : 'aspect-[4/3]'}`}
                  loading="lazy"
                />
              </div>
              <figcaption className="tblock border-t-0">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5">
                  <span className="font-bold">{p.title}</span>
                  <span className="text-ink-55">{p.desc}</span>
                </div>
                <div className="tb-r flex items-center gap-3 nums text-ink-55">
                  <span>{p.spec.period}</span>
                  <span className="text-camel font-bold">{p.spec.scope}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    
      {lb !== null && (
        <div className="fixed inset-0 z-[100] bg-ink/94 flex items-center justify-center p-5 md:p-10" onClick={() => setLb(null)} role="dialog" aria-modal="true" aria-label="프로젝트 사진 크게 보기">
          <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={P[lb].photo} alt={`${P[lb].title} — ${P[lb].desc}`} className="w-full max-h-[74vh] object-contain" />
            <figcaption className="tblock mt-0 border-t-0 !border-ivory/40 text-ivory">
              <div className="flex flex-wrap items-baseline gap-x-4">
                <span className="font-bold">{P[lb].title}</span>
                <span className="text-ivory/60">{P[lb].desc}</span>
              </div>
              <div className="tb-r !border-ivory/40 nums text-ivory/60">{lb + 1} / {P.length}</div>
            </figcaption>
          </figure>
          <button className="absolute top-4 right-5 text-ivory/80 hover:text-ivory text-[2rem] leading-none p-2" aria-label="닫기" onClick={() => setLb(null)}>×</button>
          <button className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 text-ivory/60 hover:text-ivory text-[2.4rem] p-3" aria-label="이전" onClick={(e) => { e.stopPropagation(); setLb((lb + P.length - 1) % P.length) }}>‹</button>
          <button className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 text-ivory/60 hover:text-ivory text-[2.4rem] p-3" aria-label="다음" onClick={(e) => { e.stopPropagation(); setLb((lb + 1) % P.length) }}>›</button>
        </div>
      )}
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 전후 비교
// ══════════════════════════════════════════════════════════════════════════════

function BeforeAfter() {
  const { ref, inView } = useInView(0.15)
  const [pos, setPos] = useState(50)
  const boxRef = useRef<HTMLDivElement>(null)
  const [boxW, setBoxW] = useState(0)
  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setBoxW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  /* 첫 진입 시 슬라이더가 한 번 살짝 왕복 — 드래그되는 요소임을 알립니다 */
  const didSwing = useRef(false)
  useEffect(() => {
    if (!MOTION || didSwing.current || !inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    didSwing.current = true
    const t0 = performance.now()
    const dur = 1300
    const tick = (ts: number) => {
      const p = Math.min((ts - t0) / dur, 1)
      setPos(50 + Math.sin(p * Math.PI * 2) * 13 * (1 - p))
      if (p < 1) requestAnimationFrame(tick)
      else setPos(50)
    }
    requestAnimationFrame(tick)
  }, [inView])
  return (
    <section id="ba" className="py-20 md:py-28 bg-ivory-d">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head label="BEFORE / AFTER" title="같은 집이 맞습니다" inView={inView} />
        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''}`}>
          <div ref={boxRef} className="relative overflow-hidden select-none aspect-[16/9] md:aspect-[2/1] border border-ink">
            <img src={SITE.beforeAfter.before} alt="시공 전" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <img
                src={SITE.beforeAfter.after}
                alt="시공 후"
                className="absolute inset-0 h-full object-cover max-w-none"
                style={{ width: boxW || '100%' }}
                draggable={false}
              />
            </div>
            <div className="absolute top-0 bottom-0 w-px bg-ivory" style={{ left: `${pos}%` }} aria-hidden="true">
              <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-ivory border border-ink flex items-center justify-center">
                <svg width="16" height="12" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                  <path d="M5 1L1 7l4 6M13 1l4 6-4 6" stroke="#26241f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <span className="absolute bottom-3 left-3 text-[0.75rem] font-bold bg-ivory/90 px-2.5 py-1">AFTER</span>
            <span className="absolute bottom-3 right-3 text-[0.75rem] font-bold bg-ink/80 text-ivory px-2.5 py-1">BEFORE</span>
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(+e.target.value)}
              className="ba-range absolute inset-0 w-full h-full opacity-0"
              aria-label="시공 전후 비교 슬라이더"
            />
          </div>
          <p className="text-[0.875rem] text-ink-55 mt-4">{SITE.beforeAfter.caption}</p>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 진행 방식 — 주차별 공정 (가로 치수선 타임라인)
// ══════════════════════════════════════════════════════════════════════════════

function Process() {
  const { ref, inView } = useInView(0.1)
  return (
    <section id="process" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head label="PROCESS — 8 WEEKS" title="여덟 주의 계획" inView={inView} />
        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''} scroll-x -mx-5 px-5 md:mx-0 md:px-0`}>
          <ol className="flex min-w-[860px] md:min-w-0">
            {SITE.process.map((s, i) => (
              <li key={s.title} className="flex-1 relative pr-6 last:pr-0">
                {/* 상단 치수선 */}
                <div className="flex items-center h-4 mb-4" aria-hidden="true">
                  <span className="w-px h-full bg-ink" />
                  <span className={`hairline flex-1 ${inView ? 'in-view' : ''}`}>
                    <span className="rule-draw block h-px bg-ink" style={{ transitionDelay: `${i * 120}ms` }} />
                  </span>
                  {i === SITE.process.length - 1 && <span className="w-px h-full bg-ink" />}
                </div>
                <p className="nums text-[0.8125rem] font-bold text-camel mb-2">{s.week}</p>
                <h3 className="text-[1.0625rem] font-extrabold mb-2">{s.title}</h3>
                <p className="text-[0.875rem] text-ink-55 leading-[1.75] pr-2">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 비용 — 평형별 표
// ══════════════════════════════════════════════════════════════════════════════

function Pricing() {
  const { ref, inView } = useInView(0.12)
  return (
    <section id="pricing" className="py-20 md:py-28 bg-ivory-d">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head label="PRICING" title="비용을 먼저 말합니다" inView={inView} />
        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''} scroll-x -mx-5 px-5 md:mx-0 md:px-0`}>
          <table className="w-full min-w-[640px] border-collapse bg-ivory border border-ink">
            <thead>
              <tr className="border-b border-ink text-left">
                <th className="px-5 py-4 text-[0.8125rem] font-bold text-ink-55">범위</th>
                <th className="nums px-5 py-4 text-[0.8125rem] font-bold text-ink-55">18py</th>
                <th className="nums px-5 py-4 text-[0.8125rem] font-bold text-ink-55">24py</th>
                <th className="nums px-5 py-4 text-[0.8125rem] font-bold text-ink-55">32py</th>
              </tr>
            </thead>
            <tbody>
              {SITE.pricing.map((p) => (
                <tr key={p.scope} className="border-b border-hair last:border-0">
                  <td className="px-5 py-5">
                    <span className="block font-extrabold text-[1rem]">{p.scope}</span>
                    <span className="block text-[0.8125rem] text-ink-55 mt-0.5">{p.desc}</span>
                  </td>
                  <td className="nums px-5 py-5 font-bold whitespace-nowrap">{p.p18}</td>
                  <td className="nums px-5 py-5 font-bold whitespace-nowrap">{p.p24}</td>
                  <td className="nums px-5 py-5 font-bold text-camel whitespace-nowrap">{p.p32}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={`anim-fade-up d160 ${inView ? 'in-view' : ''} text-[0.8125rem] text-ink-55 mt-5 leading-[1.8] max-w-2xl`}>
          {SITE.pricingNote}
        </p>
        <QuickEstimate />
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 원칙 + 후기
// ══════════════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════════════
// 간이 비용 계산 — 평형 × 범위 (pricing 표와 같은 데이터)
// ══════════════════════════════════════════════════════════════════════════════

function QuickEstimate() {
  const { ref, inView } = useInView(0.15)
  const [scopeIdx, setScopeIdx] = useState(1)
  const [pyKey, setPyKey] = useState<'p18' | 'p24' | 'p32'>('p24')
  const row = SITE.pricing[scopeIdx]
  return (
    <div ref={ref} className={`anim-fade-up d240 ${inView ? 'in-view' : ''} mt-10 border border-ink bg-ivory p-6 md:p-8`}>
      <div className="grid md:grid-cols-[1fr_1fr_auto] gap-6 md:gap-10 items-end">
        <div>
          <label className="block text-[0.8125rem] font-bold text-ink-55 mb-1" htmlFor="e-scope">공사 범위</label>
          <select id="e-scope" className="field" value={scopeIdx} onChange={(e) => setScopeIdx(+e.target.value)}>
            {SITE.pricing.map((x, i) => (
              <option key={x.scope} value={i}>{x.scope}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[0.8125rem] font-bold text-ink-55 mb-1" htmlFor="e-py">평형</label>
          <select id="e-py" className="field" value={pyKey} onChange={(e) => setPyKey(e.target.value as 'p18' | 'p24' | 'p32')}>
            <option value="p18">18py 안팎</option>
            <option value="p24">24py 안팎</option>
            <option value="p32">32py 이상</option>
          </select>
        </div>
        <div className="md:text-right">
          <p className="text-[0.8125rem] font-bold text-ink-55 mb-1">예상 시작가</p>
          <p className="nums f-thin text-[2.2rem] md:text-[2.6rem] leading-none" aria-live="polite">
            {row[pyKey]}
          </p>
        </div>
      </div>
      <p className="text-[0.8125rem] text-ink-55 mt-5">
        {row.desc} — 부가세 별도, 실측 후 확정됩니다.
      </p>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 자재 기준 · A/S 보증
// ══════════════════════════════════════════════════════════════════════════════

function Materials() {
  const { ref, inView } = useInView(0.08)
  return (
    <section id="materials" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head label="MATERIALS" title="무엇으로 짓는지 밝힙니다" inView={inView} />
        <ul className="border-t border-ink">
          {SITE.materials.map((m, i) => (
            <li
              key={m.part}
              className={`anim-fade-up ${['', 'd80', 'd160', 'd80', 'd160', 'd240'][i]} ${inView ? 'in-view' : ''} grid md:grid-cols-[120px_1fr_auto] gap-x-8 gap-y-1 py-5 border-b border-hair items-baseline`}
            >
              <span className="font-extrabold text-[1rem]">{m.part}</span>
              <span className="text-[0.9375rem] text-ink/80">{m.spec}</span>
              <span className="text-[0.8125rem] text-camel font-semibold">{m.note}</span>
            </li>
          ))}
        </ul>

        <div className="grid md:grid-cols-3 gap-x-10 gap-y-8 mt-16">
          {SITE.warranty.items.map((w, i) => (
            <div key={w.title} className={`anim-fade-up ${['', 'd80', 'd160'][i]} ${inView ? 'in-view' : ''}`}>
              <Dim className="max-w-[160px] mb-4">A/S {String(i + 1).padStart(2, '0')}</Dim>
              <h3 className="text-[1.0625rem] font-extrabold mb-2">{w.title}</h3>
              <p className="text-[0.9375rem] text-ink-55 leading-[1.8]">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 자주 묻는 질문 — 헤어라인 아코디언
// ══════════════════════════════════════════════════════════════════════════════

function Faq() {
  const { ref, inView } = useInView(0.08)
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  return (
    <section id="faq" className="py-20 md:py-28 bg-ivory-d">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head label="FAQ" title="자주 받는 질문" inView={inView} />
        <div className="max-w-3xl border-t border-ink">
          {SITE.faq.map((f, i) => (
            <div key={f.q} className={`anim-fade-up ${['', 'd80', 'd160', 'd240', 'd320'][i] ?? ''} ${inView ? 'in-view' : ''} border-b border-hair`}>
              <button
                className="w-full flex items-baseline justify-between gap-6 py-5 text-left"
                aria-expanded={openIdx === i}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="text-[1.0625rem] font-bold">{f.q}</span>
                <span className="nums f-thin text-[1.5rem] leading-none text-camel shrink-0" aria-hidden="true">
                  {openIdx === i ? '−' : '+'}
                </span>
              </button>
              {openIdx === i && (
                <p className="pb-6 pr-10 text-[0.9375rem] text-ink-55 leading-[1.9]">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 오시는 길 — 도면풍 약도
// ══════════════════════════════════════════════════════════════════════════════

function Location() {
  const { ref, inView } = useInView(0.12)
  return (
    <section className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head label="VISIT" title="사무실에서 뵙겠습니다" inView={inView} />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* 약도 플레이스홀더 — 실제 지도로 교체하세요 */}
          <div className={`anim-fade-up ${inView ? 'in-view' : ''} border border-ink relative overflow-hidden aspect-[4/3] bg-ivory`}>
            <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="약도">
              <rect width="800" height="600" fill="#f4f3ef" />
              <g fill="none" stroke="#d9d5cc" strokeWidth="1">
                <path d="M0 100 H800 M0 200 H800 M0 300 H800 M0 400 H800 M0 500 H800" />
                <path d="M100 0 V600 M200 0 V600 M300 0 V600 M400 0 V600 M500 0 V600 M600 0 V600 M700 0 V600" />
              </g>
              <g fill="none" stroke="#26241f" strokeWidth="2">
                <path d="M0 240 H800" />
                <path d="M340 0 V600" />
              </g>
              <g fill="none" stroke="#26241f" strokeWidth="1" opacity="0.5">
                <rect x="80" y="60" width="180" height="120" />
                <rect x="420" y="60" width="300" height="120" />
                <rect x="80" y="320" width="180" height="200" />
                <rect x="420" y="320" width="140" height="140" />
              </g>
              <g transform="translate(400 300)">
                <circle r="13" fill="none" stroke="#a5754a" strokeWidth="2.5" />
                <circle r="4" fill="#a5754a" />
              </g>
              <text x="424" y="292" fontFamily="Pretendard, sans-serif" fontSize="15" fontWeight="700" fill="#26241f">온도 인테리어</text>
            </svg>
            <p className="absolute bottom-3 left-4 text-[0.75rem] text-camel font-semibold">실제 지도로 교체해 주세요</p>
          </div>

          <div className={`anim-fade-up d160 ${inView ? 'in-view' : ''}`}>
            <dl className="border-t border-ink">
              {[
                ['주소', SITE.address],
                ['지하철', SITE.location.subway],
                ['주차', SITE.location.parking],
                ['상담 시간', SITE.location.hours],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[92px_1fr] gap-6 py-4 border-b border-hair">
                  <dt className="text-[0.8125rem] font-bold text-ink-55 pt-0.5">{k}</dt>
                  <dd className="text-[0.9375rem] leading-[1.7]">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="text-[0.875rem] text-ink-55 mt-5">{SITE.location.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Principles() {
  const { ref, inView } = useInView(0.15)
  return (
    <section className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head label="PRINCIPLES" title="바뀌지 않는 세 가지" inView={inView} />
        <div className="grid md:grid-cols-3">
          {SITE.principles.map((p, i) => (
            <div key={p.title} className={`anim-fade-up ${['', 'd80', 'd160'][i]} ${inView ? 'in-view' : ''} py-6 md:py-2 md:px-8 first:pl-0 last:pr-0 border-t md:border-t-0 md:border-l border-hair first:border-0`}>
              <p className="nums text-[0.8125rem] text-camel font-bold mb-3">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="text-[1.125rem] font-extrabold mb-2.5">{p.title}</h3>
              <p className="text-[0.9375rem] text-ink-55 leading-[1.8]">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="hairline my-16" />

        <div className="grid md:grid-cols-2 gap-x-14 gap-y-10">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.author} className={`anim-fade-up ${['', 'd80'][i]} ${inView ? 'in-view' : ''}`}>
              <p className="f-thin text-[1.25rem] md:text-[1.4rem] leading-[1.75] mb-5">“{r.text}”</p>
              <footer className="flex items-baseline gap-3 text-[0.875rem]">
                <cite className="not-italic font-bold">{r.author}</cite>
                <span className="text-ink-55">{r.tag}</span>
              </footer>
            </blockquote>
          ))}
        </div>
        <p className={`anim-fade-up d160 ${inView ? 'in-view' : ''} text-[0.75rem] text-ink-55 mt-8`}>
          실제 이용 후기를 바탕으로 재구성한 예시입니다.
        </p>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 상담 — 밑줄 폼 (화면만, 전송 기능 없음)
// ══════════════════════════════════════════════════════════════════════════════

function Consult() {
  const { ref, inView } = useInView(0.15)
  const [sent, setSent] = useState(false)
  return (
    <section id="consult" className="py-20 md:py-28 bg-ink text-ivory">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div className={`anim-fade-up ${inView ? 'in-view' : ''}`}>
          <h2 className="f-thin text-[2.1rem] md:text-[3rem] leading-[1.2] mb-6">
            집 이야기를
            <br />
            들려주세요
          </h2>
          <p className="text-ivory/60 text-[0.9375rem] leading-[1.9] mb-10 max-w-sm">
            지금 어떤 집에 살고 계신지, 무엇이 불편한지면 충분합니다. 실측 상담은 무료이고, 계약을 권하지 않습니다.
          </p>
          <a href={`tel:${SITE.phone}`} className="nums inline-block text-[1.6rem] font-extrabold border-b-2 border-camel pb-1 mb-4">
            {SITE.phone}
          </a>
          <p className="text-[0.875rem] text-ivory/50">
            카카오톡 {SITE.kakaoId} · 인스타그램 {SITE.instagram}
          </p>
        </div>

        <form
          className={`anim-fade-up d160 ${inView ? 'in-view' : ''}`}
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div className="space-y-7">
            <div className="grid sm:grid-cols-2 gap-7">
              <div>
                <label className="block text-[0.8125rem] font-bold text-ivory/50 mb-1" htmlFor="c-name">성함</label>
                <input id="c-name" className="field !border-ivory/40 !text-ivory placeholder:text-ivory/30" placeholder="홍길동" />
              </div>
              <div>
                <label className="block text-[0.8125rem] font-bold text-ivory/50 mb-1" htmlFor="c-phone">연락처</label>
                <input id="c-phone" className="field !border-ivory/40 !text-ivory placeholder:text-ivory/30" placeholder="010-0000-0000" inputMode="tel" />
              </div>
            </div>
            <div>
              <label className="block text-[0.8125rem] font-bold text-ivory/50 mb-1" htmlFor="c-msg">어떤 공사를 생각하고 계세요?</label>
              <input id="c-msg" className="field !border-ivory/40 !text-ivory placeholder:text-ivory/30" placeholder="예) 24평 아파트, 주방이랑 욕실 위주로" />
            </div>
            <button type="submit" className="w-full py-4 bg-camel text-ink text-[0.9375rem] font-extrabold hover:bg-ivory" style={{ transition: MOTION ? 'background-color 0.25s' : 'none' }}>
              {sent ? '접수됐습니다. 하루 안에 연락드릴게요.' : '상담 신청하기'}
            </button>
            <p className="text-[0.75rem] text-ivory/40">* 템플릿 데모 — 실제 전송되지 않습니다.</p>
          </div>
        </form>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 푸터 · 모바일 바
// ══════════════════════════════════════════════════════════════════════════════

function Footer() {
  return (
    <footer className="py-12 border-t border-hair">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <p className="font-extrabold text-[1.05rem] mb-0.5">{SITE.name}</p>
        <p className="text-[0.6875rem] text-ink-55 tracking-[0.14em] mb-6">{SITE.nameEn}</p>
        <div className="space-y-1.5 text-[0.8125rem] text-ink-55">
          <p>{SITE.ceo} · 사업자등록번호 {SITE.bizNo}</p>
          <p>{SITE.license} · 하자보수 보증 2년</p>
          <p>{SITE.address} · {SITE.phone}</p>
        </div>
        <div className="mt-8 pt-4 border-t border-hair flex flex-col sm:flex-row justify-between gap-2 text-[0.75rem] text-ink-55">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <p>{SITE.instagram}</p>
        </div>
      </div>
    </footer>
  )
}

function MobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-ink text-ivory pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 divide-x divide-ivory/15">
        <a href={`tel:${SITE.phone}`} className="py-3.5 text-center text-[0.9375rem] font-bold">전화</a>
        <a href={SITE.kakaoUrl} target="_blank" rel="noreferrer" className="py-3.5 text-center text-[0.9375rem] font-bold">카카오톡</a>
        <button
          onClick={() => document.querySelector('#consult')?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })}
          className="py-3.5 text-center text-[0.9375rem] font-bold text-camel"
        >
          상담신청
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
        <Projects />
        <BeforeAfter />
        <Process />
        <Pricing />
        <Materials />
        <Principles />
        <Faq />
        <Location />
        <Consult />
      </main>
      <Footer />
      <MobileBar />
    </div>
  )
}
