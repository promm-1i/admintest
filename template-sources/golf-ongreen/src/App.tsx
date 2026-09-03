import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// ══════════════════════════════════════════════════════════════════════════════

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

const SITE = {
  name: '온그린 스크린골프',
  nameEn: 'ONGREEN',
  tagline: '최신 시뮬레이터 · 연습 타석 · 목동',
  slogan: '퇴근하고 18홀',
  sloganSub: '최신 시뮬레이터 6룸과 연습 타석 8석. 예약부터 결제까지 문자 한 통이면 끝나는 동네 골프 아지트입니다.',

  phone: '02-1234-5678',
  smsPhone: '01012345678',
  kakaoId: '@온그린',

  ceo: '대표 오그린',
  bizNo: '123-45-67890',
  address: '서울특별시 양천구 목동로 123, 지하 1층',

  hours: [
    { day: '평일', time: '06:00 – 24:00' },
    { day: '주말 · 공휴일', time: '06:00 – 24:00' },
    { day: '연중무휴', time: '명절 당일만 휴무' },
  ],

  nav: [
    { label: '요금 안내', href: '#price' },
    { label: '룸 · 타석', href: '#rooms' },
    { label: '레슨', href: '#lesson' },
    { label: '회원권', href: '#member' },
    { label: '이용 안내', href: '#guide' },
    { label: '예약', href: '#reserve' },
  ],

  // 히어로 사진 — 여기에 교체
  heroPhoto: img1,

  // 타석 요금 — 시간대별
  priceNote: '1인 기준 18홀 · 룸당 최대 4인 · 부가세 포함 · 주말은 금요일 18시부터 적용',
  price: [
    { time: '아침 (06 – 10시)', week: '15,000원', weekend: '18,000원', note: '모닝 커피 제공' },
    { time: '낮 (10 – 18시)', week: '18,000원', weekend: '22,000원', note: '' },
    { time: '저녁 (18 – 24시)', week: '22,000원', weekend: '25,000원', note: '가장 인기' },
    { time: '연습 타석 (1시간)', week: '10,000원', weekend: '12,000원', note: '무제한 타석' },
  ],

  // 룸 · 타석 — 여기에 사진 교체
  rooms: [
    { img: img2, name: '스크린 룸 6개', desc: '최신 시뮬레이터 · 국내외 200개 코스 · 좌타석 2룸' },
    { img: img3, name: '연습 타석 8석', desc: '개인 모니터 스윙 분석 · 자동 티업' },
    { img: U('1587174486073-ae5e5cff23aa', 1000, 700), name: '퍼팅 그린 · 라운지', desc: '실전 경사 퍼팅존 · 맥주와 간단한 안주' },
  ],

  // 레슨
  lessonNote: '레슨 회원은 연습 타석 이용이 무료입니다',
  lessons: [
    { name: '원포인트 레슨', spec: '30분 · 스윙 진단 포함', price: '40,000원' },
    { name: '주 1회 정규 레슨', spec: '월 4회 · 50분', price: '240,000원' },
    { name: '주 2회 정규 레슨', spec: '월 8회 · 50분', price: '420,000원' },
    { name: '입문 4주 패키지', spec: '그립부터 라운드까지', price: '380,000원' },
  ],
  pro: {
    img: img4,
    name: '박온그린 프로',
    career: ['KPGA 프로 · 투어 경력 6년', '레슨 경력 11년 · 입문자 전문', '스크린 대회 우승 3회'],
  },

  member: [
    { name: '10회권', price: '180,000원', note: '회당 18,000원 · 시간대 무관' },
    { name: '30회권', price: '480,000원', note: '회당 16,000원 · 가족 공유 가능' },
    { name: '월 무제한', price: '250,000원', note: '평일 낮 시간대' },
  ],

  guide: [
    { q: '골프가 처음인데 가도 되나요?', a: '됩니다. 입문 패키지로 그립부터 알려드리고, 클럽은 무료로 빌려드립니다. 처음 오시는 분이 한 달에 스무 분은 됩니다.' },
    { q: '예약은 어떻게 하나요?', a: '문자로 인원과 시간을 보내주시면 바로 확정 문자를 드립니다. 당일 예약도 빈 룸이 있으면 가능합니다.' },
    { q: '음식을 먹을 수 있나요?', a: '라운지에서 맥주와 간단한 안주를 판매하고, 룸 안 취식도 가능합니다. 배달음식은 라운지에서만 부탁드립니다.' },
    { q: '클럽이 없어도 되나요?', a: '남녀 풀세트를 무료로 빌려드립니다. 장갑만 챙겨오시거나 매장에서 구매하실 수 있습니다.' },
  ],

  reviews: [
    { text: '회사에서 10분 거리라 퇴근하고 동료들과 매주 옵니다. 룸 상태와 센서 정확도가 근처에서 제일 낫습니다.', name: '직장인 4인방', tag: '저녁 단골' },
    { text: '입문 패키지로 시작해서 이제 필드 나갑니다. 프로님이 급하게 안 가르쳐서 좋았어요.', name: '김O연', tag: '입문 4주' },
    { text: '아침 시간대가 싸서 출근 전에 연습 타석 씁니다. 6시 오픈이 진짜 큽니다.', name: '박O호', tag: '모닝 골퍼' },
  ],

  reserve: {
    lead: '인원과 희망 시간을 보내주시면\n빈 룸을 확인해 바로 확정 문자를 드립니다.',
    options: ['스크린 룸', '연습 타석', '레슨 문의', '회원권 문의'],
  },

  location: {
    walk: '오목교역 4번 출구 · 도보 3분',
    parking: '건물 주차 2시간 무료',
    landmark: '1층 은행 건물 지하 1층입니다.',
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
      <p className="text-[0.75rem] tracking-[0.32em] uppercase font-extrabold text-tracer">
        <span className="tracer-dash inline-block w-8 h-[2px] bg-tracer align-middle mr-3" />
        {en}
      </p>
      <h2 className="mt-4 text-[clamp(1.75rem,4.2vw,2.6rem)] font-extrabold tracking-[-0.03em] leading-tight text-white">{title}</h2>
      {sub && <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-smoke/70">{sub}</p>}
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
      className={`fixed top-0 inset-x-0 z-50 bg-turf/92 ${scrolled ? 'shadow-[0_1px_0_rgba(255,255,255,0.08)]' : ''}`}
      style={{ transition: MOTION ? 'box-shadow 0.25s' : 'none', backdropFilter: 'blur(12px)' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[70px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-center gap-2.5">
          <span className="grid place-items-center w-8 h-8 rounded-full border-2 border-tracer text-tracer text-[0.75rem] font-extrabold" aria-hidden>⛳</span>
          <span className="text-[1.12rem] font-extrabold tracking-tight text-white uppercase">{SITE.nameEn}</span>
          <span className="hidden sm:inline text-[0.7rem] text-smoke/50 ml-1">{SITE.tagline}</span>
        </button>
        <nav className="hidden lg:flex items-center gap-6">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[0.88rem] font-bold ${active === n.href.slice(1) ? 'text-tracer' : 'text-smoke/65 hover:text-white'}`}
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
        <a
          href={`tel:${SITE.phone}`}
          className="nums px-5 py-2.5 rounded-full bg-tracer text-turf text-[0.875rem] font-extrabold hover:bg-white"
          style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
        >
          {SITE.phone}
        </a>
          {/* 1024px 미만 — 내비를 접고 햄버거로 연다. 768~1023 에서 내비가 두 줄로 눌리던 것을 막는다 */}
          <button className="lg:hidden p-2 -mr-2 text-smoke" aria-label="메뉴" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span className="block w-6 space-y-1.5">
              <span className="block h-0.5 bg-current" />
              <span className={`block h-0.5 bg-current ${open ? 'opacity-0' : ''}`} />
              <span className="block h-0.5 bg-current" />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-smoke/15 bg-turf px-5 py-2">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => { setOpen(false); goTo(n.href) }}
              className="block w-full text-left py-3.5 text-[1rem] font-semibold text-smoke border-b border-smoke/10 last:border-0"
            >
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

// ─── 히어로 — 스크린 안에서 코스가 바뀌는 시뮬레이터 화면 ──────────────────────

// 능선 아래 나무 라인 (12구간 × 40 = 480)
const TREELINE =
  'M0 118 q20 -16 40 0 q20 -18 40 0 q20 -14 40 0 q20 -17 40 0 q20 -15 40 0 q20 -18 40 0 q20 -14 40 0 q20 -16 40 0 q20 -17 40 0 q20 -15 40 0 q20 -16 40 0 q20 -14 40 0 L480 134 L0 134 Z'

// 시뮬레이터 화면 안의 코스 — 글자 없이 그래픽만. 1=파4 도그렉, 2=파3 아일랜드, 3=파5 롱홀
function CourseScene({ n, k }: { n: 1 | 2 | 3; k: number }) {
  const sky = `hxSky${k}`
  const haze = `hxHaze${k}`
  const shade = `hxShade${k}`
  const horizon = n === 1 ? 103 : n === 2 ? 99 : 111
  return (
    <svg viewBox="0 0 480 270" preserveAspectRatio="xMidYMid slice" className="block w-full h-full" aria-hidden>
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#122333" />
          <stop offset="100%" stopColor="#527d92" />
        </linearGradient>
        <linearGradient id={haze} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfe3ea" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#cfe3ea" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={shade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04170a" stopOpacity="0" />
          <stop offset="100%" stopColor="#04170a" stopOpacity="0.38" />
        </linearGradient>
      </defs>
      <rect width="480" height="270" fill={`url(#${sky})`} />

      {n === 1 && (
        <>
          <path d="M0 104 L0 88 L54 76 L110 87 L170 66 L238 85 L304 70 L368 87 L426 76 L480 88 L480 104 Z" fill="#24473c" />
          <rect y="103" width="480" height="167" fill="#1f5226" />
          <path d={TREELINE} transform="translate(0 -12)" fill="#1a3a22" />
          <rect y={horizon} width="480" height="34" fill={`url(#${haze})`} />
          <path d="M70 270 C112 214 180 166 246 128 L302 128 C330 168 356 216 402 270 Z" fill="#4a9440" />
          <path d="M132 270 C170 218 214 172 258 132 L272 132 C246 174 214 220 196 270 Z" fill="#57a84a" opacity="0.5" />
          <path d="M302 270 C290 218 290 172 296 132 L306 132 C318 174 338 220 358 270 Z" fill="#57a84a" opacity="0.32" />
          <ellipse cx="150" cy="196" rx="30" ry="10" fill="#ddd0aa" />
          <ellipse cx="346" cy="166" rx="21" ry="7" fill="#ddd0aa" />
          <ellipse cx="277" cy="127" rx="36" ry="11" fill="#3f7f36" />
          <ellipse cx="277" cy="126" rx="26" ry="7.5" fill="#6fc453" />
          <ellipse cx="277" cy="125" rx="14" ry="4" fill="#85da63" />
          <path d="M286 124 L286 101" stroke="#f2f8ec" strokeWidth="1.8" />
          <path d="M286 101 L305 106 L286 111 Z" fill="#8cf24c" />
          <rect y="140" width="480" height="130" fill={`url(#${shade})`} />
          <path d="M232 266 C238 172 250 96 283 121" stroke="#8cf24c" strokeWidth="2.6" fill="none" strokeLinecap="round" className="hx-tracer" />
          <circle cx="283" cy="121" r="4" fill="#f4ffea" className="hx-tracer" />
        </>
      )}

      {n === 2 && (
        <>
          <path d="M0 100 L0 84 L60 72 L118 84 L182 62 L250 82 L318 68 L384 84 L440 74 L480 84 L480 100 Z" fill="#24473c" />
          <rect y="99" width="480" height="171" fill="#1f5226" />
          <path d={TREELINE} transform="translate(0 -16)" fill="#1a3a22" />
          <rect y={horizon} width="480" height="34" fill={`url(#${haze})`} />
          <path d="M0 152 C110 140 210 162 300 150 C382 140 440 154 480 146 L480 214 C420 224 356 208 276 216 C186 225 106 208 0 218 Z" fill="#2a6b85" />
          <path d="M40 170 C130 160 210 178 300 166" stroke="#5b9db4" strokeWidth="2" fill="none" opacity="0.75" strokeLinecap="round" />
          <ellipse cx="298" cy="150" rx="55" ry="17" fill="#376b32" />
          <ellipse cx="298" cy="149" rx="40" ry="11.5" fill="#6fc453" />
          <ellipse cx="303" cy="147" rx="20" ry="5.5" fill="#85da63" />
          <ellipse cx="264" cy="156" rx="13" ry="4.5" fill="#ddd0aa" />
          <path d="M308 145 L308 122" stroke="#f2f8ec" strokeWidth="1.8" />
          <path d="M308 122 L327 127 L308 132 Z" fill="#8cf24c" />
          <path d="M112 270 L364 270 L308 222 L180 222 Z" fill="#4a9440" />
          <path d="M182 270 L272 270 L262 224 L214 224 Z" fill="#57a84a" opacity="0.45" />
          <rect y="160" width="480" height="110" fill={`url(#${shade})`} />
          <path d="M244 218 C252 150 272 110 304 143" stroke="#8cf24c" strokeWidth="2.6" fill="none" strokeLinecap="round" className="hx-tracer" />
          <circle cx="304" cy="143" r="4" fill="#f4ffea" className="hx-tracer" />
        </>
      )}

      {n === 3 && (
        <>
          <path d="M0 112 L0 94 L58 82 L112 94 L176 74 L244 92 L310 78 L376 94 L432 84 L480 94 L480 112 Z" fill="#24473c" />
          <rect y="111" width="480" height="159" fill="#1f5226" />
          <path d={TREELINE} transform="translate(0 -4)" fill="#1a3a22" />
          <rect y={horizon} width="480" height="34" fill={`url(#${haze})`} />
          <path d="M40 270 C88 206 158 156 228 124 L292 124 C334 158 396 208 442 270 Z" fill="#4a9440" />
          <path d="M112 270 C152 214 198 168 246 130 L260 130 C226 172 190 218 172 270 Z" fill="#57a84a" opacity="0.5" />
          <path d="M296 270 C288 216 284 168 292 130 L304 130 C320 172 350 218 378 270 Z" fill="#57a84a" opacity="0.32" />
          <ellipse cx="418" cy="198" rx="50" ry="18" fill="#2a6b85" />
          <path d="M386 194 C404 188 430 192 448 198" stroke="#5b9db4" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round" />
          <ellipse cx="256" cy="176" rx="32" ry="10" fill="#ddd0aa" />
          <ellipse cx="152" cy="212" rx="24" ry="8" fill="#ddd0aa" />
          <ellipse cx="258" cy="125" rx="30" ry="9" fill="#3f7f36" />
          <ellipse cx="258" cy="124" rx="21" ry="6" fill="#6fc453" />
          <ellipse cx="258" cy="123" rx="11" ry="3.2" fill="#85da63" />
          <path d="M265 122 L265 100" stroke="#f2f8ec" strokeWidth="1.8" />
          <path d="M265 100 L283 105 L265 110 Z" fill="#8cf24c" />
          <rect y="146" width="480" height="124" fill={`url(#${shade})`} />
          <path d="M240 266 C226 176 224 96 262 119" stroke="#8cf24c" strokeWidth="2.6" fill="none" strokeLinecap="round" className="hx-tracer" />
          <circle cx="262" cy="119" r="4" fill="#f4ffea" className="hx-tracer" />
        </>
      )}
    </svg>
  )
}

function Hero() {
  const jump = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    goTo(href)
  }
  return (
    <section className="hero hx-hero relative overflow-hidden md:h-[92vh] md:min-h-[660px]">
      {/* 여기에 히어로 사진 교체 */}
      <img src={SITE.heroPhoto} alt="스크린 룸에서 티샷하는 골퍼" className="absolute inset-0 w-full h-full object-cover" />
      {/* 모바일 — 세로로 어둡게 */}
      <div
        className="absolute inset-0 md:hidden"
        style={{ backgroundImage: 'linear-gradient(180deg, rgba(23,26,23,0.94) 0%, rgba(23,26,23,0.78) 34%, rgba(23,26,23,0.86) 62%, #171a17 100%)' }}
      />
      {/* PC — 문구가 앉는 왼쪽만 눌러 두고, 가운데 스크린 빛은 남긴다 */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(23,26,23,0.96) 0%, rgba(23,26,23,0.9) 30%, rgba(23,26,23,0.6) 50%, rgba(23,26,23,0.24) 66%, rgba(23,26,23,0.5) 100%)',
        }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{ backgroundImage: 'linear-gradient(180deg, rgba(23,26,23,0.72) 0%, rgba(23,26,23,0.08) 34%, rgba(23,26,23,0.3) 68%, #171a17 100%)' }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pt-[104px] pb-14 md:h-full md:pt-[70px] md:pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-9 md:gap-12">
        {/* 왼쪽 — 문구 */}
        <div className="md:max-w-[540px] md:pb-1">
          <p className={`text-[0.72rem] md:text-[0.78rem] tracking-[0.34em] uppercase font-extrabold text-tracer ${MOTION ? 'hero-in' : ''}`}>
            Screen Golf — Mokdong
          </p>
          <h1
            className={`mt-4 text-[clamp(2.6rem,5.9vw,4.9rem)] font-extrabold tracking-[-0.04em] leading-[1.06] text-white ${MOTION ? 'hero-in d150' : ''}`}
            style={{ textShadow: '0 2px 28px rgba(0,0,0,0.6)' }}
          >
            {SITE.slogan}
          </h1>
          <p
            className={`mt-5 max-w-[28rem] text-[1rem] leading-relaxed text-smoke ${MOTION ? 'hero-in d300' : ''}`}
            style={{ textShadow: '0 1px 14px rgba(0,0,0,0.7)' }}
          >
            {SITE.sloganSub}
          </p>
          <div className={`mt-8 flex flex-wrap items-center gap-3 ${MOTION ? 'hero-in d450' : ''}`}>
            <a
              href="#reserve"
              onClick={jump('#reserve')}
              className="hx-cta px-7 py-3.5 rounded-full bg-tracer text-turf text-[0.95rem] font-extrabold hover:bg-white"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              룸 예약하기
            </a>
            <a
              href="#price"
              onClick={jump('#price')}
              className="hx-cta-sub px-7 py-3.5 rounded-full border-2 border-white/35 text-[0.95rem] font-bold text-smoke hover:border-tracer hover:text-tracer"
              style={{ transition: MOTION ? 'color 0.2s, border-color 0.2s' : 'none' }}
            >
              요금 보기
            </a>
          </div>
          <p
            className={`mt-6 text-[0.85rem] leading-relaxed text-smoke ${MOTION ? 'hero-in d450' : ''}`}
            style={{ textShadow: '0 1px 12px rgba(0,0,0,0.7)' }}
          >
            {SITE.location.walk} · {SITE.location.parking}
          </p>
        </div>

        {/* 오른쪽 — 시뮬레이터 화면. 화면 안 코스가 8초 루프로 바뀐다 */}
        <div
          className={`w-full md:w-[452px] md:shrink-0 rounded-xl border border-white/12 bg-[#131711] p-4 shadow-[0_30px_70px_rgba(0,0,0,0.65)] ${MOTION ? 'hero-in d300' : ''}`}
        >
          <div className="flex items-baseline justify-between gap-3 px-0.5 pb-3">
            <span className="text-[0.66rem] font-extrabold tracking-[0.28em] uppercase text-tracer">Simulator</span>
            <span className="nums text-[0.74rem] text-[#9aa39a]">
              {SITE.hours[0].day} {SITE.hours[0].time}
            </span>
          </div>
          <div className="hx-view aspect-[12/5] md:aspect-[16/9] rounded-md border border-white/10">
            <div className="hx-reel">
              <div className="hx-scene">
                <CourseScene n={1} k={1} />
              </div>
              <div className="hx-scene">
                <CourseScene n={2} k={2} />
              </div>
              <div className="hx-scene">
                <CourseScene n={3} k={3} />
              </div>
              <div className="hx-scene">
                <CourseScene n={1} k={4} />
              </div>
            </div>
          </div>
          <p className="mt-4 text-[0.98rem] font-extrabold text-white">
            {SITE.rooms[0].name} · {SITE.rooms[1].name}
          </p>
          <p className="mt-1.5 text-[0.82rem] leading-relaxed text-[#9aa39a]">{SITE.rooms[0].desc}</p>
          <div className="mt-4 pt-3.5 border-t border-white/10 flex items-baseline justify-between gap-3">
            <span className="text-[0.82rem] font-bold text-white whitespace-nowrap">{SITE.price[2].time}</span>
            <span className="nums text-[0.84rem] font-extrabold text-tracer whitespace-nowrap">
              주중 {SITE.price[2].week} · 주말 {SITE.price[2].weekend}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 타석 요금 ────────────────────────────────────────────────────────────────

function Price() {
  const { ref, inView } = useInView()
  return (
    <section id="price" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="Green Fee" title="타석 요금" sub={SITE.priceNote} inView={inView} />
        <div className={`overflow-x-auto ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <table className="w-full min-w-[520px] border-collapse">
            <thead>
              <tr className="border-b-2 border-tracer text-left">
                <th className="py-3.5 pr-4 text-[0.82rem] font-extrabold tracking-wide text-tracer uppercase">시간대</th>
                <th className="py-3.5 pr-4 text-[0.82rem] font-extrabold tracking-wide text-tracer uppercase text-right">주중</th>
                <th className="py-3.5 pr-4 text-[0.82rem] font-extrabold tracking-wide text-tracer uppercase text-right">주말</th>
                <th className="py-3.5 text-[0.82rem] font-extrabold tracking-wide text-tracer uppercase text-right">비고</th>
              </tr>
            </thead>
            <tbody>
              {SITE.price.map((f) => (
                <tr key={f.time} className="border-b border-white/10">
                  <td className="py-4 pr-4 text-[0.95rem] font-bold text-white">{f.time}</td>
                  <td className="nums py-4 pr-4 text-[0.98rem] font-extrabold text-right text-white whitespace-nowrap">{f.week}</td>
                  <td className="nums py-4 pr-4 text-[0.98rem] font-extrabold text-right text-white whitespace-nowrap">{f.weekend}</td>
                  <td className="py-4 text-[0.8rem] text-smoke/55 text-right whitespace-nowrap">{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// ─── 룸 · 타석 ────────────────────────────────────────────────────────────────

function Rooms() {
  const { ref, inView } = useInView()
  return (
    <section id="rooms" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-rough">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Facility" title="룸 · 타석 안내" inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.rooms.map((s, i) => (
            <article key={s.name} className={`${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                {/* 여기에 시설 사진 교체 */}
                <img src={s.img} alt={s.name} className="w-full aspect-[4/3] object-cover" />
              </div>
              <h3 className="mt-4 text-[1.1rem] font-extrabold text-white">{s.name}</h3>
              <p className="mt-1.5 text-[0.88rem] leading-relaxed text-smoke/60">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 레슨 ─────────────────────────────────────────────────────────────────────

function Lesson() {
  const { ref, inView } = useInView()
  return (
    <section id="lesson" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 grid md:grid-cols-[0.7fr_1fr] gap-10 items-start">
        <div className={`${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            {/* 여기에 프로 사진 교체 */}
            <img src={SITE.pro.img} alt={SITE.pro.name} className="w-full aspect-[4/5] object-cover" />
          </div>
          <p className="mt-4 text-[1.1rem] font-extrabold text-white">{SITE.pro.name}</p>
          <ul className="mt-2 space-y-1">
            {SITE.pro.career.map((l) => (
              <li key={l} className="text-[0.84rem] text-smoke/60 flex gap-2">
                <span className="text-tracer">·</span>
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Head en="Lesson" title="레슨 안내" sub={SITE.lessonNote} inView={inView} />
          <ul className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
            {SITE.lessons.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between gap-4 py-4 border-b border-white/10">
                <div>
                  <p className="text-[1rem] font-bold text-white">{l.name}</p>
                  <p className="mt-0.5 text-[0.82rem] text-smoke/55">{l.spec}</p>
                </div>
                <span className="nums text-[1.05rem] font-extrabold text-tracer shrink-0">{l.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ─── 회원권 ───────────────────────────────────────────────────────────────────

function Member() {
  const { ref, inView } = useInView()
  return (
    <section id="member" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-rough">
      <div className="mx-auto max-w-5xl px-5">
        <Head en="Membership" title="회원권" inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.member.map((m, i) => (
            <article key={m.name} className={`rounded-2xl border border-white/12 bg-turf p-8 text-center ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <h3 className="text-[1.15rem] font-extrabold text-white">{m.name}</h3>
              <p className="nums mt-4 text-[1.8rem] font-extrabold text-tracer">{m.price}</p>
              <p className="mt-2 text-[0.82rem] text-smoke/55">{m.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 이용 안내 ────────────────────────────────────────────────────────────────

function Guide() {
  const { ref, inView } = useInView()
  const [open, setOpen] = useState(0)
  return (
    <section id="guide" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Head en="Guide" title="자주 묻는 질문" inView={inView} />
        <div className={`border-t border-white/12 ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.guide.map((g, i) => (
            <div key={g.q} className="border-b border-white/10">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full py-5 flex items-center justify-between text-left gap-4">
                <span className="text-[0.98rem] font-bold text-white">{g.q}</span>
                <span className={`text-tracer text-[1.2rem] leading-none shrink-0 ${MOTION ? 'transition-transform duration-300' : ''} ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div className={`overflow-hidden ${MOTION ? 'transition-[max-height,opacity] duration-400' : ''} ${open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="pb-5 text-[0.92rem] leading-relaxed text-smoke/65">{g.a}</p>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-rough">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Reviews" title="다녀간 골퍼들" inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`rounded-2xl border border-white/10 bg-turf p-7 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[0.93rem] leading-relaxed text-smoke/75">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between gap-2">
                <span className="text-[0.85rem] font-bold text-white">{r.name}</span>
                <span className="text-[0.76rem] font-extrabold text-tracer shrink-0">{r.tag}</span>
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
  const smsBody = `[예약] 항목: ${opt} / 인원·시간: ${when || '상담 후 결정'}`
  return (
    <section id="reserve" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Head en="Booking" title="룸 예약" inView={inView} />
        <p className={`-mt-6 mb-10 text-[0.98rem] leading-relaxed text-smoke/65 whitespace-pre-line ${MOTION ? 'anim-fade-up d80' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.reserve.lead}
        </p>
        <div className={`space-y-7 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <div>
            <p className="text-[0.82rem] font-extrabold tracking-wide text-smoke/50 mb-2.5 uppercase">01 · 이용 항목</p>
            <div className="flex flex-wrap gap-2">
              {SITE.reserve.options.map((s) => (
                <button
                  key={s}
                  onClick={() => setOpt(s)}
                  className={`px-4 py-2.5 rounded-full text-[0.88rem] font-extrabold ${opt === s ? 'bg-tracer text-turf' : 'bg-white/8 text-smoke/60 hover:bg-white/15'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.82rem] font-extrabold tracking-wide text-smoke/50 mb-2.5 uppercase">02 · 인원 · 희망 시간 (선택)</p>
            <input
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              placeholder="예) 4명, 금요일 저녁 8시"
              className="w-full bg-transparent border-b-2 border-white/25 px-1 py-3.5 text-[0.98rem] text-white placeholder:text-smoke/30 focus:outline-none focus:border-tracer"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-4 rounded-full text-center bg-tracer text-turf text-[0.98rem] font-extrabold hover:bg-white"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              문자로 예약하기
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex-1 py-4 rounded-full text-center border-2 border-white/25 text-[0.98rem] font-bold text-smoke hover:border-tracer hover:text-tracer"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              전화 {SITE.phone}
            </a>
          </div>
          <p className="text-[0.8rem] text-smoke/45">카카오톡 {SITE.kakaoId} 채널로도 예약하실 수 있습니다.</p>
        </div>
      </div>
    </section>
  )
}

// ─── 오시는 길 ────────────────────────────────────────────────────────────────

function Location() {
  const { ref, inView } = useInView()
  return (
    <section id="location" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-rough">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="Access" title="오시는 길" inView={inView} />
        <div className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <p className="text-[1.1rem] font-extrabold text-white">{SITE.address}</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem] text-smoke/65">
            <li>· {SITE.location.walk}</li>
            <li>· {SITE.location.parking}</li>
            <li>· {SITE.location.landmark}</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2">
            {SITE.hours.map((h) => (
              <p key={h.day} className="text-[0.9rem]">
                <span className="text-smoke/45 mr-2.5">{h.day}</span>
                <span className="nums font-bold text-smoke">{h.time}</span>
              </p>
            ))}
          </div>
          <a
            href={SITE.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-7 px-6 py-3 rounded-full border-2 border-white/25 text-[0.9rem] font-bold text-smoke hover:border-tracer hover:text-tracer"
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
    <footer className="border-t border-white/10 py-12 pb-28 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[1.1rem] font-extrabold text-white uppercase">⛳ {SITE.nameEn}</p>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-smoke/45">
            {SITE.name} · {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="text-[0.78rem] text-smoke/35">kakao {SITE.kakaoId} · 연중무휴 06:00 – 24:00</p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t border-white/12 bg-turf">
      <a href={`tel:${SITE.phone}`} className="py-4 text-center text-[0.95rem] font-bold text-smoke">
        전화 문의
      </a>
      <button onClick={() => goTo('#reserve')} className="py-4 text-center text-[0.95rem] font-extrabold bg-tracer text-turf">
        룸 예약
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
    <div className="bg-turf text-smoke">
      <Header active={active} />
      <Hero />
      <Price />
      <Rooms />
      <Lesson />
      <Member />
      <Guide />
      <Reviews />
      <Reserve />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
