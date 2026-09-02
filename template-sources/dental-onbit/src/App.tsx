import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

/* 이미지 — src/images/ 안의 파일을 같은 이름으로 덮어쓰면 그대로 반영됩니다 */
import heroImg from './images/hero.jpg'
import doctorImg1 from './images/doctor-1.jpg'
import doctorImg2 from './images/doctor-2.jpg'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

const SITE = {
  // 여기에 병원 기본 정보 교체
  name: '온빛치과의원',
  nameEn: 'ONBIT DENTAL',
  tagline: '보존 중심 진료 · 왕십리',
  slogan: '뽑자는 말보다,\n살리는 방법을 먼저',
  sloganSub:
    '치아는 한번 깎으면 되돌릴 수 없습니다. 온빛은 자연 치아를 지키는 보존 치료를 먼저 검토하고, 꼭 필요한 치료만 권합니다.',

  // 여기에 연락처 교체
  phone: '02-1234-5678',
  smsPhone: '01012345678',
  kakaoId: '@온빛치과',

  // 여기에 사업자 정보 교체
  ceo: '대표원장 김온빛',
  bizNo: '123-45-67890',
  address: '서울특별시 성동구 왕십리로 123, 4층',

  // 진료시간 — 실시간 '진료중' 배지가 이 데이터로 계산됩니다
  hours: [
    { day: '월 · 수 · 금', time: '09:30 – 18:30' },
    { day: '화 · 목 (야간)', time: '09:30 – 20:30' },
    { day: '토요일', time: '09:00 – 14:00' },
    { day: '일 · 공휴일', time: '휴진' },
  ],
  lunchNote: '점심시간 13:00 – 14:00 · 접수 마감은 진료 종료 30분 전',
  openTable: {
    // 요일(0=일…6=토)별 [시작, 끝] (분). 점심 13:00-14:00 공통.
    0: null,
    1: [570, 1110],
    2: [570, 1230],
    3: [570, 1110],
    4: [570, 1230],
    5: [570, 1110],
    6: [540, 840],
  } as Record<number, [number, number] | null>,

  // 여기에 히어로 사진 교체
  heroPhoto: heroImg,

  nav: [
    { label: '진료 안내', href: '#care' },
    { label: '임플란트 과정', href: '#process' },
    { label: '비급여 안내', href: '#fees' },
    { label: '의료진', href: '#doctors' },
    { label: '안심 약속', href: '#promise' },
    { label: '예약', href: '#reserve' },
  ],

  stats: [
    { n: 18, suffix: '년', label: '왕십리 한자리' },
    { n: 4200, suffix: '+', label: '임플란트 식립' },
    { n: 83, suffix: '%', label: '보존 치료 비율' },
    { n: 10, suffix: '년', label: '임플란트 보증' },
  ],

  // 진료 과목
  care: [
    { name: '충치 · 신경치료', desc: '현미경 확대 시야로 감염 부위만 정밀하게. 살릴 수 있는 치아는 끝까지 살립니다.' },
    { name: '임플란트', desc: '3D CT 분석 후 필요한 부위에만. 국산 · 수입 브랜드를 비용과 함께 투명하게 안내합니다.' },
    { name: '사랑니 발치', desc: '매복 사랑니 당일 발치. 발치 후 주의사항을 문자로 다시 보내드립니다.' },
    { name: '치주(잇몸) 치료', desc: '스케일링부터 잇몸 수술까지. 6개월 주기 정기검진으로 재발을 막습니다.' },
    { name: '보철 · 크라운', desc: '자연치와 구분되지 않는 색과 형태. 원내 기공 협업으로 제작 기간을 줄였습니다.' },
    { name: '소아 · 가족 검진', desc: '아이 첫 검진부터 부모님 임플란트까지, 한 가족의 치아를 이어서 봅니다.' },
  ],

  // 임플란트 진행 과정 — 단계 타임라인
  process: [
    { step: '01', name: '정밀 진단', period: '첫 방문', desc: '3D CT 촬영과 구강 검진으로 뼈 상태를 확인하고, 치료 계획과 총비용을 서면으로 드립니다.' },
    { step: '02', name: '식립 수술', period: '30 – 60분', desc: '계획된 위치에 픽스처를 심습니다. 대부분 당일 일상 복귀가 가능합니다.' },
    { step: '03', name: '뼈 융합 기간', period: '2 – 4개월', desc: '임플란트가 뼈와 단단히 붙는 기간입니다. 중간 점검 1회가 포함됩니다.' },
    { step: '04', name: '보철물 장착', period: '2주', desc: '본을 떠서 맞춤 크라운을 제작하고 장착합니다. 씹는 힘을 단계적으로 올립니다.' },
    { step: '05', name: '정기 관리', period: '10년 보증', desc: '6개월마다 상태를 점검합니다. 보증 기간 내 문제는 책임지고 처치합니다.' },
  ],

  // 비급여 진료비 — 의료법 고지 형식
  feesNote: '2026년 1월 기준 · 부가세 포함 · 상태에 따라 달라질 수 있으며 진단 후 서면으로 확정 안내합니다.',
  fees: [
    { name: '임플란트 (국산)', spec: '픽스처 + 지대주 + 크라운 포함', price: '890,000원' },
    { name: '임플란트 (수입)', spec: '오스템 프리미엄 · 스트라우만 등', price: '1,300,000원 ~' },
    { name: '지르코니아 크라운', spec: '1치아 기준', price: '450,000원' },
    { name: '레진 치료', spec: '1면 기준', price: '80,000원' },
    { name: '치아 미백 (전문가)', spec: '상하악 3회', price: '350,000원' },
    { name: '스케일링 (비급여)', spec: '연 1회 급여 초과 시', price: '50,000원' },
  ],

  // 의료진 — 여기에 프로필 사진 교체
  doctors: [
    {
      img: doctorImg1,
      name: '김온빛',
      role: '대표원장 · 통합치의학과 전문의',
      career: ['서울대학교 치의학대학원 졸업', '대한임플란트학회 인증의', '전 대학병원 임상조교수'],
    },
    {
      img: doctorImg2,
      name: '이수민',
      role: '원장 · 치주과 전문의',
      career: ['연세대학교 치과대학 졸업', '치주과학회 정회원', '잇몸 수술 · 보존 치료 전담'],
    },
  ],

  // 안심 약속
  promise: [
    { title: '과잉진료 없음', body: '치료가 필요 없으면 필요 없다고 말씀드립니다. 상담 후 바로 결제를 권하지 않습니다.' },
    { title: '비용 서면 안내', body: '치료 시작 전 총비용을 서면으로 드리고, 중간에 비용이 바뀌면 진행 전에 다시 확인받습니다.' },
    { title: '통증 케어', body: '마취 연고 → 무통 마취기 순서로 주사 통증부터 줄입니다. 치과가 무서운 분은 미리 말씀해 주세요.' },
    { title: '치료 후 책임', body: '임플란트 10년, 크라운 5년 보증. 보증서에 도장 찍어 드립니다.' },
  ],

  reviews: [
    { text: '다른 곳에서 임플란트 3개 하라던 걸 여기서는 신경치료로 2개를 살렸어요. 결과적으로 비용이 반으로 줄었습니다.', name: '박O진', tag: '신경치료' },
    { text: '수술 전에 총비용을 서면으로 받으니 마음이 편했습니다. 끝나고 추가 비용이 정말 없었어요.', name: '김O호', tag: '임플란트 2개' },
    { text: '주사 놓는 줄도 몰랐어요. 치과 공포증 있는 사람에게 진심으로 추천합니다.', name: '이O연', tag: '사랑니 발치' },
  ],

  reserve: {
    lead: '원하시는 진료와 시간대를 보내주시면\n예약 가능한 시간을 문자로 안내드립니다.',
    options: ['검진 · 상담', '충치 · 신경치료', '임플란트 상담', '스케일링', '사랑니'],
  },

  location: {
    walk: '왕십리역 6번 출구 · 도보 3분',
    parking: '건물 지하주차장 1시간 무료 (진료 확인 시)',
    landmark: '1층 은행이 있는 건물 4층입니다. 엘리베이터에서 내리시면 바로입니다.',
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

/** 진료중 여부 — openTable 기준, 점심(13-14시) 제외 */
function openStatus(): { label: string; on: boolean } {
  const now = new Date()
  const t = now.getHours() * 60 + now.getMinutes()
  const row = SITE.openTable[now.getDay()]
  if (!row) return { label: '오늘 휴진', on: false }
  const [s, e] = row
  if (t >= 780 && t < 840) return { label: '점심시간 (14:00 진료 재개)', on: false }
  if (t < s) return { label: '진료 전', on: false }
  if (t < e) return { label: '지금 진료중', on: true }
  return { label: '진료 종료', on: false }
}

// ─── 공통 섹션 헤드 ───────────────────────────────────────────────────────────

function Head({ en, title, sub, inView, dark }: { en: string; title: React.ReactNode; sub?: string; inView: boolean; dark?: boolean }) {
  return (
    <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
      <p className={`text-[0.75rem] tracking-[0.3em] uppercase font-bold ${dark ? 'text-mint' : 'text-mint-d'}`}>{en}</p>
      <div className="cross-rule mt-4 mb-5" aria-hidden>
        <span className="cross-h" />
      </div>
      <h2 className="text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] leading-tight">{title}</h2>
      {sub && <p className={`mt-4 max-w-xl text-[0.98rem] leading-relaxed ${dark ? 'text-snow/60' : 'text-navy/60'}`}>{sub}</p>}
    </div>
  )
}

// ─── 헤더 ─────────────────────────────────────────────────────────────────────

function Header({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false)
  const st = openStatus()
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-snow/95 ${scrolled ? 'shadow-[0_1px_0_rgba(16,42,67,0.1)]' : ''}`}
      style={{ transition: MOTION ? 'box-shadow 0.25s' : 'none', backdropFilter: 'blur(10px)' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[72px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-center gap-2.5">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-navy text-snow text-[1rem] font-extrabold leading-none">+</span>
          <span className="text-[1.1rem] font-extrabold tracking-tight">{SITE.name}</span>
          <span className={`hidden lg:inline-flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-full text-[0.72rem] font-bold ${st.on ? 'bg-mint/15 text-mint-d' : 'bg-navy/6 text-navy/50'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${st.on ? 'bg-mint-d' : 'bg-navy/30'}`} />
            {st.label}
          </span>
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[0.88rem] font-semibold ${active === n.href.slice(1) ? 'text-mint-d' : 'text-navy/65 hover:text-navy'}`}
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <a
          href={`tel:${SITE.phone}`}
          className="nums px-5 py-2.5 rounded-lg bg-navy text-snow text-[0.875rem] font-bold hover:bg-mint-d"
          style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
        >
          {SITE.phone}
        </a>
      </div>
    </header>
  )
}

// ─── 히어로 ───────────────────────────────────────────────────────────────────

/** 예약 데모의 요일 칩. key 는 Date#getDay 값이라 SITE.openTable 과 그대로 맞물립니다. */
const HERO_DAYS = [
  { key: 1, label: '월' },
  { key: 2, label: '화' },
  { key: 3, label: '수' },
  { key: 4, label: '목' },
  { key: 5, label: '금' },
  { key: 6, label: '토' },
  { key: 0, label: '일' },
] as const

/** 요일 → SITE.hours 의 몇 번째 행인지 */
const HERO_HOURS_ROW: Record<number, number> = { 1: 0, 3: 0, 5: 0, 2: 1, 4: 1, 6: 2, 0: 3 }

function hhmm(m: number) {
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

/** openTable 로 예약 가능 시간을 만든다 — 점심(13-14시) 제외, 접수 마감(종료 30분 전)까지 */
function heroSlots(dow: number) {
  const row = SITE.openTable[dow]
  if (!row) return []
  const out: string[] = []
  for (let t = row[0]; t <= row[1] - 30; t += 90) {
    if (t >= 780 && t < 840) continue
    out.push(hhmm(t))
  }
  return out
}

/**
 * 자동 재생 대본. 고정 시퀀스라 실행·빌드마다 결과가 같습니다.
 * 마지막 상태가 초기 상태(ti1 · di1 · si4)와 같아 이음매 없이 반복됩니다.
 */
const HERO_SCRIPT: { t?: number; d?: number; s?: number; hold: number }[] = [
  { hold: 2600 },
  { t: 2, hold: 900 },
  { d: 3, hold: 900 },
  { s: 6, hold: 2600 },
  { t: 0, hold: 900 },
  { d: 5, hold: 900 },
  { s: 1, hold: 2600 },
  { t: 4, hold: 900 },
  { d: 0, hold: 900 },
  { s: 3, hold: 2600 },
  { t: 1, hold: 900 },
  { d: 1, hold: 900 },
  { s: 4, hold: 2600 },
]

function Hero() {
  // 초기값이 곧 "완성된 선택 상태"입니다. 모션이 없는 기본형에서도 결과가 그대로 보입니다.
  const [ti, setTi] = useState(1)
  const [di, setDi] = useState(1)
  const [si, setSi] = useState(4)

  useEffect(() => {
    if (!MOTION) return
    let i = 0
    let id = 0
    const run = () => {
      const st = HERO_SCRIPT[i % HERO_SCRIPT.length]
      if (st.t !== undefined) setTi(st.t)
      if (st.d !== undefined) setDi(st.d)
      if (st.s !== undefined) setSi(st.s)
      i += 1
      id = window.setTimeout(run, st.hold)
    }
    run()
    return () => clearTimeout(id)
  }, [])

  const day = HERO_DAYS[di]
  const slots = heroSlots(day.key)
  const sIdx = Math.min(si, slots.length - 1)
  const time = slots[sIdx] ?? '휴진'
  const hours = SITE.hours[HERO_HOURS_ROW[day.key]]
  const item = SITE.reserve.options[ti]
  const smsHref = `sms:${SITE.smsPhone}?body=${encodeURIComponent(`[진료예약] 진료: ${item} / 희망: ${day.label}요일 ${time}`)}`

  return (
    <section className="hero relative overflow-hidden bg-snow pt-[72px]">
      <div className="mx-auto max-w-6xl px-5 lg:grid lg:grid-cols-[minmax(0,600px)_minmax(0,1fr)]">
        {/* 카피 */}
        <div className={`relative z-10 pt-9 lg:self-center lg:max-w-[480px] lg:py-20 ${MOTION ? 'hero-in' : ''}`}>
          <span className="hx-rule" aria-hidden />
          <p className="mt-3.5 text-[0.8rem] font-bold tracking-[0.14em] text-navy/70">자연 치아 보존 우선 진료</p>
          <h1 className="mt-4 text-[clamp(2.05rem,4.4vw,3rem)] font-extrabold tracking-[-0.04em] leading-[1.16] whitespace-pre-line">
            {SITE.slogan}
          </h1>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-navy/70">{SITE.sloganSub}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#reserve"
              onClick={(e) => {
                e.preventDefault()
                goTo('#reserve')
              }}
              className="hx-cta px-7 py-4 rounded-lg bg-navy text-snow text-[0.95rem] font-bold hover:bg-mint-d"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              진료 예약하기
            </a>
            <a
              href="#fees"
              onClick={(e) => {
                e.preventDefault()
                goTo('#fees')
              }}
              className="px-7 py-4 rounded-lg border-2 border-navy/20 text-[0.95rem] font-bold hover:border-mint-d hover:text-mint-d"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              비급여 비용 보기
            </a>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-navy/12 pt-6 sm:grid-cols-4 sm:gap-x-4">
            {SITE.stats.map((st) => (
              <div key={st.label}>
                <p className="nums text-[1.3rem] font-extrabold leading-none">
                  {st.n.toLocaleString()}
                  {st.suffix}
                </p>
                <p className="mt-1.5 text-[0.78rem] text-navy/65">{st.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 예약 화면 데모 — 화면 오른쪽으로 흘러나가고, 왼쪽 끝은 마스크로 배경에 녹습니다 */}
        <div
          className={`hx-panel relative z-10 mt-10 -ml-5 -mr-5 py-10 pl-5 pr-5 lg:mt-0 lg:ml-[-228px] lg:mr-[-212px] lg:flex lg:flex-col lg:justify-center lg:py-[52px] lg:pl-[276px] lg:pr-[156px] ${MOTION ? 'hero-in d300' : ''}`}
        >
          {/* 여기에 히어로 사진 교체 */}
          <img src={SITE.heroPhoto} alt="" className="hx-shot" aria-hidden />
          <span className="hx-veil" aria-hidden />

          <div className="relative">
            <p className="hx-tag">
              <span className="hx-dot" aria-hidden />
              예약 화면 데모 · 실제 접수는 전화 · 문자로 확정됩니다
            </p>

            <p className="hx-step mt-6">01 · 진료 항목</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {SITE.reserve.options.map((o, i) => (
                <span key={o} className={`hx-chip${i === ti ? ' is-on' : ''}`}>
                  {o}
                </span>
              ))}
            </div>

            <p className="hx-step mt-5">02 · 요일</p>
            <div className="mt-2.5 grid grid-cols-7 gap-1.5">
              {HERO_DAYS.map((d, i) => (
                <span key={d.key} className={`hx-day${i === di ? ' is-on' : ''}${SITE.openTable[d.key] ? '' : ' is-off'}`}>
                  {d.label}
                </span>
              ))}
            </div>
            <p className="nums mt-2.5 text-[0.78rem] text-snow/70">
              {hours.day} · {hours.time}
            </p>

            <p className="hx-step mt-5">03 · 시간</p>
            <div className="hx-slots mt-2.5 grid grid-cols-4 gap-1.5">
              {slots.map((s, i) => (
                <span key={s} className={`hx-slot${i === sIdx ? ' is-on' : ''}`}>
                  {s}
                </span>
              ))}
            </div>

            <div className="hx-result mt-6">
              <p className="text-[0.72rem] font-bold tracking-[0.14em] text-mint">선택한 예약</p>
              <p className="mt-2 text-[1.02rem] font-extrabold text-snow">{item}</p>
              <p className="nums mt-0.5 text-[1.28rem] font-extrabold text-mint">
                {day.label}요일 {time}
              </p>
              <p className="mt-2.5 text-[0.76rem] leading-relaxed text-snow/70">{SITE.lunchNote}</p>
              <a href={smsHref} className="hx-send mt-3.5">
                이 시간으로 문자 예약 문의
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 진료 안내 ────────────────────────────────────────────────────────────────

function Care() {
  const { ref, inView } = useInView()
  return (
    <section id="care" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Treatments" title="진료 안내" inView={inView} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SITE.care.map((c, i) => (
            <article
              key={c.name}
              className={`care p-7 rounded-2xl border border-navy/10 bg-snow ${MOTION ? `anim-fade-up d${(i % 3) * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}
            >
              <h3 className="text-[1.15rem] font-extrabold">{c.name}</h3>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-navy/60">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 임플란트 과정 타임라인 ───────────────────────────────────────────────────

function Process() {
  const { ref, inView } = useInView(0.15)
  return (
    <section id="process" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-navy text-snow">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="Implant Process" title="임플란트, 이렇게 진행됩니다" sub="첫 진단부터 10년 보증까지 — 전 과정을 미리 알고 시작하시도록 안내합니다." inView={inView} dark />
        <ol className="relative">
          <span className={`tl-line absolute left-[19px] top-2 bottom-2 w-px bg-mint/30 ${inView ? 'in-view' : ''}`} aria-hidden />
          {SITE.process.map((p, i) => (
            <li key={p.step} className={`relative flex gap-6 pb-9 last:pb-0 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <span className="relative z-10 grid place-items-center shrink-0 w-10 h-10 rounded-full bg-mint text-navy nums text-[0.85rem] font-extrabold">
                {p.step}
              </span>
              <div className="pt-1">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-[1.15rem] font-extrabold">{p.name}</h3>
                  <span className="nums text-[0.8rem] font-bold text-mint">{p.period}</span>
                </div>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-snow/60 max-w-lg">{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ─── 비급여 안내 ──────────────────────────────────────────────────────────────

function Fees() {
  const { ref, inView } = useInView()
  return (
    <section id="fees" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="Price Notice" title="비급여 진료비 안내" sub="의료법에 따라 주요 비급여 항목의 비용을 공개합니다. 진단 없이 비용부터 권하지 않습니다." inView={inView} />
        <div className={`overflow-x-auto ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <table className="w-full min-w-[520px] border-collapse">
            <thead>
              <tr className="border-b-2 border-navy text-left">
                <th className="py-3.5 pr-4 text-[0.85rem] font-extrabold tracking-wide">항목</th>
                <th className="py-3.5 pr-4 text-[0.85rem] font-extrabold tracking-wide">기준</th>
                <th className="py-3.5 text-[0.85rem] font-extrabold tracking-wide text-right">비용</th>
              </tr>
            </thead>
            <tbody>
              {SITE.fees.map((f) => (
                <tr key={f.name} className="border-b border-navy/10">
                  <td className="py-4 pr-4 text-[0.95rem] font-bold">{f.name}</td>
                  <td className="py-4 pr-4 text-[0.85rem] text-navy/55">{f.spec}</td>
                  <td className="nums py-4 text-[0.95rem] font-extrabold text-right whitespace-nowrap">{f.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={`mt-5 text-[0.82rem] text-navy/45 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>{SITE.feesNote}</p>
      </div>
    </section>
  )
}

// ─── 의료진 ───────────────────────────────────────────────────────────────────

function Doctors() {
  const { ref, inView } = useInView()
  return (
    <section id="doctors" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-ice/50">
      <div className="mx-auto max-w-5xl px-5">
        <Head en="Doctors" title="의료진 소개" inView={inView} />
        <div className="grid sm:grid-cols-2 gap-6">
          {SITE.doctors.map((d, i) => (
            <article key={d.name} className={`flex gap-6 p-6 rounded-2xl bg-snow border border-navy/8 ${MOTION ? `anim-fade-up d${i * 120 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="w-32 shrink-0 overflow-hidden rounded-xl">
                {/* 여기에 의료진 프로필 사진 교체 */}
                <img src={d.img} alt={d.name} className="w-full aspect-[4/5] object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-[1.2rem] font-extrabold">{d.name}</p>
                <p className="mt-0.5 text-[0.82rem] font-bold text-mint-d">{d.role}</p>
                <ul className="mt-3 space-y-1">
                  {d.career.map((l) => (
                    <li key={l} className="text-[0.82rem] text-navy/60 flex gap-1.5">
                      <span className="text-mint-d">·</span>
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 안심 약속 ────────────────────────────────────────────────────────────────

function Promise() {
  const { ref, inView } = useInView()
  return (
    <section id="promise" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Our Promise" title="온빛의 네 가지 약속" inView={inView} />
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-9">
          {SITE.promise.map((g, i) => (
            <div key={g.title} className={`flex gap-4 ${MOTION ? `anim-fade-up d${i * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <span className="grid place-items-center shrink-0 w-9 h-9 rounded-full bg-mint/15 text-mint-d text-[0.9rem] font-extrabold">{i + 1}</span>
              <div>
                <p className="text-[1.05rem] font-extrabold">{g.title}</p>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-navy/60">{g.body}</p>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-ice/50">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Reviews" title="다녀가신 분들의 기록" inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`p-7 rounded-2xl bg-snow border border-navy/8 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[0.95rem] leading-relaxed text-navy/75">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between">
                <span className="text-[0.85rem] font-bold">{r.name}</span>
                <span className="text-[0.78rem] font-bold text-mint-d">{r.tag}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 예약 ─────────────────────────────────────────────────────────────────────

function Reserve() {
  const { ref, inView } = useInView()
  const [opt, setOpt] = useState<string>(SITE.reserve.options[0])
  const [when, setWhen] = useState('')
  const smsBody = `[진료예약] 진료: ${opt} / 희망: ${when || '상담 후 결정'}`
  return (
    <section id="reserve" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-navy text-snow">
      <div className="mx-auto max-w-3xl px-5">
        <Head en="Reservation" title="진료 예약" inView={inView} dark />
        <p className={`-mt-6 mb-10 text-[0.98rem] leading-relaxed text-snow/60 whitespace-pre-line ${MOTION ? 'anim-fade-up d80' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.reserve.lead}
        </p>
        <div className={`space-y-7 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-snow/50 mb-2.5">01 · 진료 항목</p>
            <div className="flex flex-wrap gap-2">
              {SITE.reserve.options.map((s) => (
                <button
                  key={s}
                  onClick={() => setOpt(s)}
                  className={`px-4 py-2.5 rounded-lg text-[0.88rem] font-bold ${opt === s ? 'bg-mint text-navy' : 'bg-snow/8 text-snow/60 hover:bg-snow/15'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-snow/50 mb-2.5">02 · 희망 날짜 · 시간 (선택)</p>
            <input
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              placeholder="예) 화요일 저녁 7시 이후"
              className="w-full bg-transparent border-b-2 border-snow/25 px-1 py-3.5 text-[0.98rem] text-snow placeholder:text-snow/30 focus:outline-none focus:border-mint"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-4 rounded-lg text-center bg-mint text-navy text-[0.98rem] font-extrabold hover:bg-snow"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              문자로 예약 문의
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex-1 py-4 rounded-lg text-center border-2 border-snow/25 text-[0.98rem] font-bold hover:border-mint hover:text-mint"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              전화 {SITE.phone}
            </a>
          </div>
          <p className="text-[0.8rem] text-snow/40">통증이 심하신 경우 전화 주시면 당일 진료를 우선 안내드립니다.</p>
        </div>
      </div>
    </section>
  )
}

// ─── 진료시간 · 오시는 길 ─────────────────────────────────────────────────────

function Location() {
  const { ref, inView } = useInView()
  return (
    <section id="location" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 grid md:grid-cols-2 gap-12">
        <div className={`${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`} ref={ref as React.RefObject<HTMLDivElement>}>
          <Head en="Hours" title="진료 시간" inView={inView} />
          <ul className="-mt-4 divide-y divide-navy/8">
            {SITE.hours.map((h) => (
              <li key={h.day} className="py-3.5 flex items-baseline justify-between">
                <span className="text-[0.92rem] text-navy/60">{h.day}</span>
                <span className="nums text-[0.95rem] font-bold">{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.82rem] text-navy/45">{SITE.lunchNote}</p>
        </div>
        <div className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <Head en="Access" title="오시는 길" inView={inView} />
          <p className="-mt-4 text-[1.05rem] font-bold">{SITE.address}</p>
          <ul className="mt-4 space-y-2.5 text-[0.92rem] text-navy/65">
            <li>· {SITE.location.walk}</li>
            <li>· {SITE.location.parking}</li>
            <li>· {SITE.location.landmark}</li>
          </ul>
          <a
            href={SITE.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 px-6 py-3 rounded-lg border-2 border-navy/15 text-[0.9rem] font-bold hover:border-mint-d hover:text-mint-d"
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
    <footer className="border-t border-navy/8 py-12 pb-28 md:pb-12 bg-ice/40">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[1.1rem] font-extrabold">
            <span className="inline-grid place-items-center w-6 h-6 rounded-md bg-navy text-snow text-[0.8rem] mr-2 align-middle">+</span>
            {SITE.name}
          </p>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-navy/45">
            {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="text-[0.78rem] text-navy/35">본 페이지의 진료 정보는 참고용이며, 정확한 진단은 내원 후 안내드립니다.</p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t border-navy/10 bg-snow">
      <a href={`tel:${SITE.phone}`} className="py-4 text-center text-[0.95rem] font-bold">
        전화 문의
      </a>
      <button onClick={() => goTo('#reserve')} className="py-4 text-center text-[0.95rem] font-bold bg-navy text-snow">
        진료 예약
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
    <div className="bg-snow text-navy">
      <Header active={active} />
      <Hero />
      <Care />
      <Process />
      <Fees />
      <Doctors />
      <Promise />
      <Reviews />
      <Reserve />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
