import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

const SITE = {
  // 여기에 사무소 기본 정보 교체
  name: '정도세무회계',
  nameEn: 'JEONGDO TAX & ACCOUNTING',
  tagline: '기장 · 신고 · 조사대응 · 역삼',
  slogan: '숫자는 정확하게,\n설명은 쉬운 말로',
  sloganSub:
    '세금은 어렵지만, 어렵게 설명할 이유는 없습니다. 매달 숫자가 무엇을 뜻하는지, 사장님 언어로 알려드리는 사무소입니다.',

  // 여기에 연락처 교체
  phone: '02-1234-5678',
  smsPhone: '01012345678',
  kakaoId: '@정도세무회계',

  // 여기에 사업자 정보 교체
  ceo: '대표 세무사 김정도',
  bizNo: '123-45-67890',
  address: '서울특별시 강남구 테헤란로 123, 8층',

  hours: [
    { day: '평일', time: '09:00 – 18:00' },
    { day: '신고 기간 (1 · 5 · 7월)', time: '09:00 – 20:00' },
    { day: '토 · 일 · 공휴일', time: '휴무 (문자 상담 가능)' },
  ],

  nav: [
    { label: '업무 안내', href: '#services' },
    { label: '기장료 안내', href: '#fees' },
    { label: '세무 일정', href: '#calendar' },
    { label: '세무사 소개', href: '#people' },
    { label: '자주 묻는 질문', href: '#faq' },
    { label: '상담', href: '#consult' },
  ],

  // 히어로 아래 괘선 팩트
  facts: [
    { n: '17년', label: '개업 세무사 경력' },
    { n: '320+', label: '기장 거래처' },
    { n: '48시간', label: '질문 답변 기한' },
    { n: '0건', label: '신고 기한 초과' },
  ],

  // 업무 안내
  services: [
    { name: '기장 대리', desc: '매달 증빙을 정리해 장부를 만들고, 분기마다 손익을 한 장으로 보고드립니다.', tag: '월 정액' },
    { name: '부가세 · 종소세 · 법인세 신고', desc: '신고 전에 예상 세액을 먼저 안내하고, 절세 항목을 빠짐없이 반영합니다.', tag: '신고 대리' },
    { name: '세무조사 대응', desc: '소명 자료 준비부터 현장 입회까지. 조사 통지를 받으셨다면 바로 연락 주세요.', tag: '긴급' },
    { name: '창업 · 사업자 등록', desc: '업종별 유리한 사업자 형태와 절세 구조를 창업 전에 설계합니다.', tag: '무료 상담' },
    { name: '양도 · 상속 · 증여', desc: '부동산과 주식의 이전 시점과 방법에 따라 세금이 크게 달라집니다.', tag: '자산' },
    { name: '경정청구', desc: '지난 5년간 더 낸 세금을 찾아 돌려받습니다. 착수 전 예상 환급액을 안내합니다.', tag: '환급' },
  ],

  // 기장료 — 매출 구간별
  feesNote: '부가세 별도 · 신고 대리 보수는 별도이며 계약 전에 서면으로 안내합니다. 직원 수 · 증빙량에 따라 조정될 수 있습니다.',
  feeTabs: ['개인사업자', '법인사업자'] as const,
  fees: {
    개인사업자: [
      { range: '연 매출 2억 미만', price: '월 88,000원', note: '간이 · 일반 동일' },
      { range: '연 매출 2억 – 5억', price: '월 110,000원', note: '분기 손익 보고 포함' },
      { range: '연 매출 5억 – 10억', price: '월 143,000원', note: '급여 대장 포함' },
      { range: '연 매출 10억 이상', price: '별도 견적', note: '전담 담당자 배정' },
    ],
    법인사업자: [
      { range: '연 매출 5억 미만', price: '월 132,000원', note: '법인세 조정계산서 별도' },
      { range: '연 매출 5억 – 20억', price: '월 176,000원', note: '분기 손익 보고 포함' },
      { range: '연 매출 20억 – 50억', price: '월 220,000원', note: '급여 · 4대보험 포함' },
      { range: '연 매출 50억 이상', price: '별도 견적', note: '전담 팀 배정' },
    ],
  },

  // 월별 세무 일정
  calendarNote: '기장 거래처는 모든 일정을 저희가 먼저 챙겨서 문자로 안내드립니다.',
  calendar: [
    { m: '1월', what: '부가세 확정신고 (2기)', who: '전 사업자', big: true },
    { m: '2월', what: '면세사업장현황신고', who: '면세사업자', big: false },
    { m: '3월', what: '법인세 신고', who: '12월 결산 법인', big: true },
    { m: '4월', what: '부가세 예정신고 (1기)', who: '법인', big: false },
    { m: '5월', what: '종합소득세 신고', who: '개인사업자', big: true },
    { m: '7월', what: '부가세 확정신고 (1기)', who: '전 사업자', big: true },
    { m: '8월', what: '법인세 중간예납', who: '법인', big: false },
    { m: '10월', what: '부가세 예정신고 (2기)', who: '법인', big: false },
    { m: '11월', what: '종소세 중간예납', who: '개인사업자', big: false },
    { m: '매월 10일', what: '원천세 신고 · 납부', who: '직원 있는 사업장', big: false },
  ],

  // 세무사 소개 — 여기에 프로필 사진 교체
  people: [
    {
      img: img1,
      name: '김정도',
      role: '대표 세무사',
      career: ['제47회 세무사시험 합격', '전 국세청 조사국 근무 7년', '중소기업중앙회 자문 세무사'],
    },
    {
      img: img2,
      name: '이바름',
      role: '세무사',
      career: ['제55회 세무사시험 합격', '개인사업자 · 프리랜서 기장 전담', '경정청구 환급 187건 수행'],
    },
  ],

  // 사무소 — 여기에 사진 교체
  officePhotos: [
    { img: img3, label: '상담실' },
    { img: img4, label: '업무 공간' },
  ],

  faq: [
    { q: '기장을 맡기면 매달 무엇을 해야 하나요?', a: '카드 · 계좌를 연결해 두시면 증빙은 저희가 수집합니다. 사장님은 현금 지출 사진만 카카오톡으로 보내주시면 됩니다.' },
    { q: '지금 세무사를 바꿔도 되나요?', a: '언제든 가능합니다. 전임 세무사 자료 인수부터 저희가 처리하며, 신고 기간 중 이관도 문제없습니다.' },
    { q: '세무조사 통지를 받았습니다.', a: '통지서를 받은 직후가 가장 중요합니다. 자료 제출 전에 반드시 상담을 먼저 받으세요. 초기 상담은 무료입니다.' },
    { q: '기장료 외 추가 비용이 있나요?', a: '신고 대리 보수(종소세 · 법인세)가 별도이며, 계약서에 금액을 명시합니다. 계약서에 없는 비용은 청구하지 않습니다.' },
    { q: '멀리 있어도 맡길 수 있나요?', a: '전국 비대면 기장이 가능합니다. 증빙 수집 · 보고 · 상담 모두 온라인으로 진행되며, 필요시 화상 상담을 잡아드립니다.' },
  ],

  reviews: [
    { text: '전에는 신고 끝나고 세금 고지서만 받았는데, 여기는 신고 전에 예상 세액과 줄일 방법을 먼저 알려줍니다. 그 차이가 큽니다.', name: '온라인쇼핑몰 · 박O민 대표', tag: '기장 3년차' },
    { text: '경정청구로 5년치 1,400만 원을 돌려받았습니다. 착수 전에 예상 금액을 정확히 말해준 곳은 여기뿐이었어요.', name: '제조업 · 김O석 대표', tag: '경정청구' },
    { text: '질문하면 48시간 안에 꼭 답이 옵니다. 어려운 말 없이 설명해 주셔서 직원들도 직접 물어봅니다.', name: '음식점 2개 운영 · 이O정 대표', tag: '기장 5년차' },
  ],

  consult: {
    lead: '업종과 연 매출 규모를 보내주시면\n예상 기장료와 상담 가능 시간을 문자로 안내드립니다.',
    topics: ['기장 문의', '신고 대리', '세무조사', '창업 · 등록', '경정청구(환급)'],
  },

  location: {
    walk: '역삼역 3번 출구 · 도보 4분',
    parking: '건물 주차장 30분 무료 (방문 상담 시)',
    landmark: '1층 카페가 있는 유리 건물 8층입니다.',
    mapUrl: 'https://map.naver.com',
  },
} as const

// ─── 유틸리티 ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(!MOTION)
  useEffect(() => {
    if (!MOTION) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, inView }
}

function goTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })
}

// ─── 공통 섹션 헤드 ───────────────────────────────────────────────────────────

function Head({ en, title, sub, inView }: { en: string; title: React.ReactNode; sub?: string; inView: boolean }) {
  return (
    <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
      <p className="f-serif text-[0.8rem] tracking-[0.35em] text-gold">{en}</p>
      <h2 className="f-serif mt-4 text-[clamp(1.7rem,4vw,2.5rem)] font-bold tracking-tight leading-snug">{title}</h2>
      {sub && <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-char/60">{sub}</p>}
      <div className="ledger-rule mt-6 h-[3px] w-full" aria-hidden />
    </div>
  )
}

// ─── 헤더 ─────────────────────────────────────────────────────────────────────

function Header({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-paper/95 ${scrolled ? 'shadow-[0_1px_0_rgba(38,36,31,0.12)]' : ''}`}
      style={{ transition: MOTION ? 'box-shadow 0.25s' : 'none', backdropFilter: 'blur(10px)' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[72px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-baseline gap-2.5">
          <span className="f-serif text-[1.25rem] font-bold tracking-tight">정도<span className="text-gold">세무회계</span></span>
          <span className="hidden sm:inline text-[0.7rem] tracking-[0.15em] text-char/45">{SITE.tagline}</span>
        </button>
        <nav className="hidden lg:flex items-center gap-6">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[0.88rem] font-semibold ${active === n.href.slice(1) ? 'text-gold' : 'text-char/65 hover:text-char'}`}
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
        <a
          href={`tel:${SITE.phone}`}
          className="nums px-5 py-2.5 bg-char text-paper text-[0.875rem] font-bold hover:bg-gold"
          style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
        >
          {SITE.phone}
        </a>
          {/* 1024px 미만 — 내비를 접고 햄버거로 연다. 768~1023 에서 내비가 두 줄로 눌리던 것을 막는다 */}
          <button className="lg:hidden p-2 -mr-2 text-char" aria-label="메뉴" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span className="block w-6 space-y-1.5">
              <span className="block h-0.5 bg-current" />
              <span className={`block h-0.5 bg-current ${open ? 'opacity-0' : ''}`} />
              <span className="block h-0.5 bg-current" />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-char/15 bg-paper px-5 py-2">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => { setOpen(false); goTo(n.href) }}
              className="block w-full text-left py-3.5 text-[1rem] font-semibold text-char border-b border-char/10 last:border-0"
            >
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

// ─── 히어로 — 옅은 장부 격자 위, 화면 폭까지 키운 한 문장 ─────────────────────

function Hero() {
  return (
    <section className="hero hx-hero relative overflow-hidden bg-paper pt-[72px]">
      {/* 배경 결: 장부 괘선. 아주 옅어 글자와 경쟁하지 않는다 */}
      <div className="hx-ledger" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1180px] px-5 pt-10 md:pt-11 pb-12">
        <div className={`flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5 ${MOTION ? 'hero-in' : ''}`}>
          <p className="f-serif text-[0.7rem] md:text-[0.76rem] font-bold tracking-[0.36em] text-char/70">SINCE 2009 — YEOKSAM</p>
          <p className="shrink-0 text-[0.74rem] tracking-[0.1em] text-char/65">{SITE.tagline}</p>
        </div>
        <div className={`mt-3.5 h-px w-full bg-char/20 ${MOTION ? 'hero-in' : ''}`} aria-hidden />

        <h1 className="hx-title f-serif mt-8 md:mt-9 font-bold">
          {SITE.slogan.split('\n').map((line, i) => (
            <span key={line} className="block overflow-hidden py-[0.04em]">
              <span className={`block ${MOTION ? `mask-line md${i}` : ''}`}>{line}</span>
            </span>
          ))}
        </h1>

        <div className={`hx-rule mt-7 md:mt-8 ${MOTION ? 'hx-rule-draw' : ''}`} aria-hidden />

        <div className={`mt-7 grid gap-y-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-x-16 ${MOTION ? 'hero-in d300' : ''}`}>
          <p className="max-w-[38rem] text-[0.95rem] md:text-[1rem] leading-[1.85] text-char/70">{SITE.sloganSub}</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <a
              href="#consult"
              onClick={(e) => {
                e.preventDefault()
                goTo('#consult')
              }}
              className="hx-cta w-full sm:w-auto px-9 py-4 text-center bg-char text-paper text-[0.95rem] font-bold hover:bg-gold"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              상담 문의하기
            </a>
            <a
              href="#fees"
              onClick={(e) => {
                e.preventDefault()
                goTo('#fees')
              }}
              className="self-start sm:self-center text-[0.93rem] font-bold border-b-2 border-char pb-1 hover:text-gold hover:border-gold"
              style={{ transition: MOTION ? 'color 0.2s, border-color 0.2s' : 'none' }}
            >
              기장료 보기
            </a>
          </div>
        </div>

        <Facts />
      </div>
    </section>
  )
}

function Facts() {
  const { ref, inView } = useInView(0.3)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="mt-11 md:mt-12">
      <div className={`h-px w-full bg-char/20 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`} aria-hidden />
      <dl className={`hx-facts grid grid-cols-2 md:grid-cols-4 border-b border-char/15 ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
        {SITE.facts.map((f) => (
          <div key={f.label} className="py-6 md:py-7">
            <dt className="hx-fig f-serif nums font-bold tracking-tight text-gold">{f.n}</dt>
            <dd className="mt-2 text-[0.8rem] text-char/65">{f.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

// ─── 업무 안내 ────────────────────────────────────────────────────────────────

function Services() {
  const { ref, inView } = useInView()
  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="SERVICES" title="맡기실 수 있는 일" inView={inView} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {SITE.services.map((sv, i) => (
            <article key={sv.name} className={`svc border-t border-char/15 pt-5 ${MOTION ? `anim-fade-up d${(i % 3) * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="f-serif text-[1.2rem] font-bold">{sv.name}</h3>
                <span className="shrink-0 text-[0.72rem] font-bold tracking-wide text-gold border border-gold/40 px-2 py-0.5">{sv.tag}</span>
              </div>
              <p className="mt-2.5 text-[0.92rem] leading-relaxed text-char/60">{sv.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 기장료 안내 ──────────────────────────────────────────────────────────────

function Fees() {
  const { ref, inView } = useInView()
  const [tab, setTab] = useState<(typeof SITE.feeTabs)[number]>(SITE.feeTabs[0])
  return (
    <section id="fees" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-linen">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="MONTHLY FEE" title="기장료 안내" sub="숨은 비용 없이, 계약 전에 서면으로 확정합니다." inView={inView} />
        <div className={`flex gap-0 mb-8 border border-char/20 w-fit ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.feeTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 text-[0.9rem] font-bold ${tab === t ? 'bg-char text-paper' : 'text-char/55 hover:text-char'}`}
              style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
            >
              {t}
            </button>
          ))}
        </div>
        <ul key={tab} className={`${MOTION ? 'menu-in' : ''}`}>
          {SITE.fees[tab].map((f) => (
            <li key={f.range} className="grid sm:grid-cols-[1fr_auto_auto] items-baseline gap-x-8 gap-y-1 py-4.5 border-b border-char/12 py-4">
              <span className="text-[1rem] font-bold">{f.range}</span>
              <span className="text-[0.82rem] text-char/50">{f.note}</span>
              <span className="f-serif nums text-[1.15rem] font-bold text-right">{f.price}</span>
            </li>
          ))}
        </ul>
        <p className={`mt-6 text-[0.82rem] text-char/50 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>{SITE.feesNote}</p>
      </div>
    </section>
  )
}

// ─── 세무 일정 캘린더 ─────────────────────────────────────────────────────────

function Calendar() {
  const { ref, inView } = useInView()
  return (
    <section id="calendar" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <Head en="TAX CALENDAR" title="한 해 세무 일정" sub={SITE.calendarNote} inView={inView} />
        <div className="grid sm:grid-cols-2 gap-x-14">
          {SITE.calendar.map((c, i) => (
            <div
              key={c.m + c.what}
              className={`flex items-baseline gap-4 py-3.5 border-b border-char/10 ${MOTION ? `anim-fade-up d${(i % 5) * 60 + 60}` : ''} ${inView ? 'in-view' : ''}`}
            >
              <span className={`f-serif nums shrink-0 w-20 text-[0.98rem] font-bold ${c.big ? 'text-gold' : 'text-char/70'}`}>{c.m}</span>
              <div className="min-w-0">
                <p className={`text-[0.95rem] ${c.big ? 'font-bold' : 'font-medium'}`}>{c.what}</p>
                <p className="text-[0.78rem] text-char/45 mt-0.5">{c.who}</p>
              </div>
              {c.big && <span className="ml-auto shrink-0 text-[0.7rem] font-bold text-paper bg-gold px-2 py-0.5">주요</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 세무사 소개 ──────────────────────────────────────────────────────────────

function People() {
  const { ref, inView } = useInView()
  return (
    <section id="people" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-char text-paper">
      <div className="mx-auto max-w-5xl px-5">
        <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
          <p className="f-serif text-[0.8rem] tracking-[0.35em] text-gold">TAX ACCOUNTANTS</p>
          <h2 className="f-serif mt-4 text-[clamp(1.7rem,4vw,2.5rem)] font-bold tracking-tight">담당 세무사를 알고 맡기세요</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {SITE.people.map((d, i) => (
            <article key={d.name} className={`flex gap-6 p-6 border border-paper/15 ${MOTION ? `anim-fade-up d${i * 120 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="w-28 shrink-0 overflow-hidden">
                {/* 여기에 프로필 사진 교체 */}
                <img src={d.img} alt={d.name} className="w-full aspect-[4/5] object-cover" />
              </div>
              <div className="min-w-0">
                <p className="f-serif text-[1.25rem] font-bold">
                  {d.name} <span className="text-[0.8rem] text-gold ml-1">{d.role}</span>
                </p>
                <ul className="mt-3 space-y-1.5">
                  {d.career.map((l) => (
                    <li key={l} className="text-[0.84rem] text-paper/65 flex gap-2">
                      <span className="text-gold">·</span>
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className={`mt-6 grid sm:grid-cols-2 gap-6 ${MOTION ? 'anim-fade-up d280' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.officePhotos.map((o) => (
            <figure key={o.label}>
              {/* 여기에 사무소 사진 교체 */}
              <img src={o.img} alt={o.label} className="w-full aspect-[16/9] object-cover opacity-90" />
              <figcaption className="mt-2.5 text-[0.82rem] text-paper/55">{o.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function Faq() {
  const { ref, inView } = useInView()
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Head en="FAQ" title="자주 묻는 질문" inView={inView} />
        <div className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.faq.map((g, i) => (
            <div key={g.q} className="border-b border-char/12">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full py-5 flex items-center justify-between text-left gap-4">
                <span className="text-[0.98rem] font-bold">{g.q}</span>
                <span className={`f-serif text-gold text-[1.2rem] leading-none shrink-0 ${MOTION ? 'transition-transform duration-300' : ''} ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden ${MOTION ? 'transition-[max-height,opacity] duration-400' : ''} ${open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="pb-5 text-[0.92rem] leading-relaxed text-char/60">{g.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 후기 ─────────────────────────────────────────────────────────────────────

function Reviews() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-linen">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="CLIENTS" title="거래처의 말" inView={inView} />
        <div className="grid md:grid-cols-3 gap-6">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`bg-paper border border-char/10 p-7 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="f-serif text-gold text-[1.6rem] leading-none">&ldquo;</p>
              <p className="mt-2 text-[0.94rem] leading-relaxed text-char/75">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between gap-2">
                <span className="text-[0.83rem] font-bold">{r.name}</span>
                <span className="text-[0.76rem] font-bold text-gold shrink-0">{r.tag}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 상담 ─────────────────────────────────────────────────────────────────────

function Consult() {
  const { ref, inView } = useInView()
  const [topic, setTopic] = useState<string>(SITE.consult.topics[0])
  const [size, setSize] = useState('')
  const smsBody = `[상담문의] 분야: ${topic} / 업종·매출: ${size || '상담 후 안내'}`
  return (
    <section id="consult" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Head en="CONSULTATION" title="상담 문의" inView={inView} />
        <p className={`-mt-6 mb-10 text-[0.98rem] leading-relaxed text-char/60 whitespace-pre-line ${MOTION ? 'anim-fade-up d80' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.consult.lead}
        </p>
        <div className={`space-y-7 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-char/50 mb-2.5">01 · 상담 분야</p>
            <div className="flex flex-wrap gap-2">
              {SITE.consult.topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`px-4 py-2.5 text-[0.88rem] font-bold border ${topic === t ? 'bg-char text-paper border-char' : 'border-char/25 text-char/60 hover:border-char/60'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-char/50 mb-2.5">02 · 업종 · 연 매출 (선택)</p>
            <input
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="예) 온라인쇼핑몰, 연 매출 3억"
              className="w-full bg-transparent border-b-2 border-char/25 px-1 py-3.5 text-[0.98rem] focus:outline-none focus:border-gold"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-4 text-center bg-char text-paper text-[0.98rem] font-bold hover:bg-gold"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              문자로 상담 문의
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex-1 py-4 text-center border-2 border-char/25 text-[0.98rem] font-bold hover:border-gold hover:text-gold"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              전화 {SITE.phone}
            </a>
          </div>
          <p className="text-[0.8rem] text-char/45">세무조사 통지를 받으신 경우, 자료 제출 전에 반드시 전화 주세요.</p>
        </div>
      </div>
    </section>
  )
}

// ─── 오시는 길 ────────────────────────────────────────────────────────────────

function Location() {
  const { ref, inView } = useInView()
  return (
    <section id="location" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-linen">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="ACCESS" title="오시는 길" inView={inView} />
        <div className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <p className="text-[1.1rem] font-bold">{SITE.address}</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem] text-char/65">
            <li>· {SITE.location.walk}</li>
            <li>· {SITE.location.parking}</li>
            <li>· {SITE.location.landmark}</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2">
            {SITE.hours.map((h) => (
              <p key={h.day} className="text-[0.9rem]">
                <span className="text-char/45 mr-2.5">{h.day}</span>
                <span className="nums font-bold">{h.time}</span>
              </p>
            ))}
          </div>
          <a
            href={SITE.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-7 px-6 py-3 border-2 border-char/25 text-[0.9rem] font-bold hover:border-gold hover:text-gold"
            style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
          >
            네이버 지도로 길찾기 ↗
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── 푸터 ─────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-char/12 py-12 pb-28 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="f-serif text-[1.25rem] font-bold">정도<span className="text-gold">세무회계</span></p>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-char/45">
            {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="text-[0.78rem] text-char/35">본 페이지의 안내는 일반적인 내용이며, 개별 사안은 상담을 통해 확인해 드립니다.</p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t border-char/12 bg-paper">
      <a href={`tel:${SITE.phone}`} className="py-4 text-center text-[0.95rem] font-bold">
        전화 상담
      </a>
      <button onClick={() => goTo('#consult')} className="py-4 text-center text-[0.95rem] font-bold bg-char text-paper">
        상담 문의
      </button>
    </div>
  )
}

// ─── 앱 ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const secs = Array.from(document.querySelectorAll('section[id]'))
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55%' },
    )
    secs.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
  return (
    <div className="bg-paper text-char">
      <Header active={active} />
      <Hero />
      <Services />
      <Fees />
      <Calendar />
      <People />
      <Faq />
      <Reviews />
      <Consult />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
