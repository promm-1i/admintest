import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// ══════════════════════════════════════════════════════════════════════════════

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

const SITE = {
  name: '스터디카페 몰입',
  nameEn: 'MOLIP STUDY',
  tagline: '24시간 무인 · 노량진',
  slogan: '조용함도\n시설입니다',
  sloganSub: '칸막이 높이 1.2m, 백색소음 42dB, 좌석 간격 광폭. 몰입이 깨지는 모든 요소를 설계로 지웠습니다.',

  phone: '02-1234-5678',
  smsPhone: '01012345678',
  kakaoId: '@스터디카페몰입',

  ceo: '대표 김몰입',
  bizNo: '123-45-67890',
  address: '서울특별시 동작구 노량진로 123, 4층',

  // 전광판 — 좌석 현황 (연출용 기준값)
  board: {
    total: { free: 48, fixed: 22, room: 4 },
    note: '앱 없이 입구 키오스크에서 바로 발권됩니다',
  },

  nav: [
    { label: '요금 안내', href: '#price' },
    { label: '좌석 안내', href: '#seats' },
    { label: '시설', href: '#facility' },
    { label: '이용 안내', href: '#guide' },
    { label: '오시는 길', href: '#location' },
  ],

  priceNote: '모든 요금 부가세 포함 · 기간권은 개시일부터 연속 계산 · 고정석은 사물함 포함',
  priceTabs: ['시간권', '기간권', '고정석 · 룸'] as const,
  price: {
    시간권: [
      { name: '2시간', price: '3,000원', note: '당일 재입장 가능' },
      { name: '4시간', price: '5,500원', note: '' },
      { name: '8시간', price: '9,000원', note: '가장 인기' },
      { name: '12시간', price: '12,000원', note: '' },
      { name: '50시간 충전권', price: '48,000원', note: '30일 이내 · 시간당 960원' },
      { name: '100시간 충전권', price: '85,000원', note: '60일 이내 · 시간당 850원' },
    ],
    기간권: [
      { name: '1주 자유석', price: '25,000원', note: '24시간 무제한' },
      { name: '2주 자유석', price: '45,000원', note: '' },
      { name: '4주 자유석', price: '79,000원', note: '가장 인기 · 하루 2,800원꼴' },
      { name: '12주 자유석', price: '210,000원', note: '장기 할인 12%' },
    ],
    '고정석 · 룸': [
      { name: '고정석 4주', price: '119,000원', note: '전용 책상 + 사물함 + 개인 조명' },
      { name: '고정석 12주', price: '320,000원', note: '10% 할인' },
      { name: '스터디룸 (4인)', price: '시간당 8,000원', note: '2시간부터 · 화이트보드' },
      { name: '스터디룸 (6인)', price: '시간당 12,000원', note: '모니터 · HDMI' },
    ],
  },

  // 좌석 유형 — 여기에 좌석 사진 교체
  seats: [
    { img: img1, name: '자유석 · 오픈존', desc: '광폭 책상과 낮은 백색소음. 매일 자리를 고르는 재미가 있습니다.', count: '48석' },
    { img: img2, name: '고정석 · 집중존', desc: '1.2m 칸막이, 개인 조명과 사물함. 내 책상이 생깁니다.', count: '22석' },
    { img: img3, name: '스터디룸', desc: '방음 시공된 4인 · 6인 룸. 스터디와 화상 면접까지.', count: '4룸' },
  ],

  facility: [
    { k: '백색소음 시스템', v: '42dB 유지 · 구역별 조절' },
    { k: '좌석별 콘센트 · USB', v: '전 좌석 개별 전원' },
    { k: '무료 커피 · 차', v: '원두머신 · 티바 무제한' },
    { k: '프린트 존', v: '흑백 무료 · 컬러 장당 300원' },
    { k: '수면실 · 안마의자', v: '30분 단위 무료 이용' },
    { k: 'CCTV · 무인 보안', v: '24시간 관제 · 여성 안심 구역' },
  ],

  guide: [
    { q: '처음 가면 어떻게 이용하나요?', a: '입구 키오스크에서 전화번호만 입력하면 발권됩니다. 앱 설치나 회원가입 없이 1분이면 시작합니다.' },
    { q: '자리를 비우면 어떻게 되나요?', a: '외출 버튼을 누르면 최대 2시간 자리가 유지됩니다. 식사하고 오셔도 짐을 옮길 필요가 없습니다.' },
    { q: '환불되나요?', a: '기간권은 사용 일수를 정상가로 차감 후 잔액을 환불해 드립니다. 충전권은 유효기간 내 언제든 환불 가능합니다.' },
    { q: '조용한가요?', a: '통화는 밖에서, 키보드는 저소음존에서만 가능합니다. 소음 3회 안내 시 이용이 제한됩니다 — 그래서 조용합니다.' },
  ],

  reviews: [
    { text: '공시 준비 1년 내내 다녔습니다. 새벽 2시에도 자리 걱정이 없고, 무엇보다 정말 조용해요. 소음 규정이 살아있는 곳입니다.', name: '9급 합격 · 김O정', tag: '고정석 12주' },
    { text: '충전권으로 주말만 쓰는데 시간당 계산이 합리적입니다. 커피값 아끼는 것만으로 본전이에요.', name: '직장인 · 이O호', tag: '충전권' },
    { text: '스터디룸 방음이 진짜라서 화상 면접을 여기서 봤습니다. 합격했어요.', name: '취준 · 박O서', tag: '스터디룸' },
  ],

  location: {
    walk: '노량진역 3번 출구 · 도보 2분',
    parking: '건물 뒤 공영주차장 (야간 무료)',
    landmark: '1층 편의점 건물 4층, 엘리베이터에서 내리면 바로 키오스크입니다.',
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
      <p className="f-mono text-[0.75rem] tracking-[0.3em] uppercase text-lamp">{en}</p>
      <h2 className="mt-4 text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] leading-tight text-white">{title}</h2>
      {sub && <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-fogb/70">{sub}</p>}
    </div>
  )
}

// ─── 헤더 ─────────────────────────────────────────────────────────────────────

function Header({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-night/92 ${scrolled ? 'shadow-[0_1px_0_rgba(255,255,255,0.08)]' : ''}`}
      style={{ transition: MOTION ? 'box-shadow 0.25s' : 'none', backdropFilter: 'blur(12px)' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[70px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full bg-lamp ${MOTION ? 'lamp-glow' : ''}`} aria-hidden />
          <span className="text-[1.1rem] font-extrabold tracking-tight text-white">{SITE.name}</span>
          <span className="hidden sm:inline text-[0.7rem] text-fogb/50 ml-1">{SITE.tagline}</span>
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[0.88rem] font-semibold ${active === n.href.slice(1) ? 'text-lamp' : 'text-fogb/65 hover:text-white'}`}
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <a
          href={`tel:${SITE.phone}`}
          className="nums px-5 py-2.5 rounded-lg bg-lamp text-night text-[0.875rem] font-extrabold hover:bg-white"
          style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
        >
          {SITE.phone}
        </a>
      </div>
    </header>
  )
}

// ─── 히어로 — 좌석 전경이 화면을 채운다 ──────────────────────────────────────

function Hero() {
  const cap = SITE.board.total
  const tr = (v: string) => ({ transition: MOTION ? v : 'none' })
  return (
    <section className="hero hx-hero relative isolate w-full overflow-hidden h-[100svh] min-h-[600px] max-h-[880px]">
      {/* 여기에 좌석 전경 사진 교체 */}
      <img src={img1} alt="줄지어 선 몰입 좌석과 좌석별 스탠드 조명" className="hx-hero-img absolute inset-0 h-full w-full" />
      <div className="hx-scrim absolute inset-0" aria-hidden />
      <div className="hx-lampglow absolute left-[68.5%] top-[68%] hidden h-[320px] w-[440px] -translate-x-1/2 -translate-y-1/2 md:block" aria-hidden />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-start px-5 pt-[100px] pb-12 md:justify-center md:pt-[70px]">
        <div className="md:max-w-[34rem]">
          <p className={`f-mono text-[0.72rem] uppercase tracking-[0.22em] text-lamp ${MOTION ? 'hero-in' : ''}`}>
            {SITE.nameEn} · {SITE.tagline}
          </p>
          <h1
            className={`mt-5 whitespace-pre-line text-[clamp(2.5rem,6.2vw,4.4rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white ${MOTION ? 'hero-in' : ''}`}
          >
            {SITE.slogan}
          </h1>
          <p className={`mt-5 max-w-md text-[1rem] leading-relaxed text-fogb/90 ${MOTION ? 'hero-in d150' : ''}`}>{SITE.sloganSub}</p>
          <div className={`mt-8 flex flex-wrap items-center gap-5 ${MOTION ? 'hero-in d300' : ''}`}>
            <a
              href="#price"
              onClick={(e) => {
                e.preventDefault()
                goTo('#price')
              }}
              className="hx-cta rounded-lg bg-lamp px-8 py-4 text-[0.95rem] font-extrabold text-night hover:bg-white"
              style={tr('background-color 0.2s')}
            >
              요금 보기
            </a>
            <a
              href="#seats"
              onClick={(e) => {
                e.preventDefault()
                goTo('#seats')
              }}
              className="border-b-2 border-fogb/60 pb-0.5 text-[0.95rem] font-bold text-white hover:border-lamp hover:text-lamp"
              style={tr('color 0.2s, border-color 0.2s')}
            >
              좌석 둘러보기
            </a>
          </div>
          <div className={`mt-8 max-w-md border-t border-white/25 pt-4 ${MOTION ? 'hero-in d300' : ''}`}>
            <p className="text-[0.88rem] font-bold text-white">
              자유석 <span className="f-mono nums text-lamp">{cap.free}</span>석
              <span className="mx-2 text-white/45">·</span>
              고정석 <span className="f-mono nums text-lamp">{cap.fixed}</span>석
              <span className="mx-2 text-white/45">·</span>
              스터디룸 <span className="f-mono nums text-lamp">{cap.room}</span>룸
            </p>
            <p className="mt-1.5 text-[0.83rem] text-fogb">{SITE.board.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 요금 안내 ────────────────────────────────────────────────────────────────

function Price() {
  const { ref, inView } = useInView()
  const [tab, setTab] = useState<(typeof SITE.priceTabs)[number]>(SITE.priceTabs[0])
  return (
    <section id="price" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-boardbg/50">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="Pricing" title="요금 안내" sub={SITE.priceNote} inView={inView} />
        <div className={`flex gap-2 mb-8 flex-wrap ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.priceTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-lg text-[0.9rem] font-bold ${tab === t ? 'bg-lamp text-night' : 'bg-white/6 text-fogb/60 hover:bg-white/12'}`}
              style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
            >
              {t}
            </button>
          ))}
        </div>
        <ul key={tab} className={`grid sm:grid-cols-2 gap-3 ${MOTION ? 'menu-in' : ''}`}>
          {SITE.price[tab].map((m) => (
            <li key={m.name} className="flex items-baseline justify-between gap-4 rounded-xl border border-white/10 bg-night px-6 py-5">
              <div>
                <p className="text-[1rem] font-bold text-white">{m.name}</p>
                {m.note && <p className="mt-1 text-[0.78rem] text-fogb/50">{m.note}</p>}
              </div>
              <span className="f-mono nums text-[1.1rem] font-bold text-lamp shrink-0">{m.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── 좌석 안내 ────────────────────────────────────────────────────────────────

function Seats() {
  const { ref, inView } = useInView()
  return (
    <section id="seats" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Seats" title="좌석 안내" inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.seats.map((s, i) => (
            <article key={s.name} className={`${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="overflow-hidden rounded-xl border border-white/10">
                {/* 여기에 좌석 사진 교체 */}
                <img src={s.img} alt={s.name} className="w-full aspect-[4/3] object-cover opacity-90" />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="text-[1.1rem] font-extrabold text-white">{s.name}</h3>
                <span className="f-mono text-[0.85rem] text-lamp">{s.count}</span>
              </div>
              <p className="mt-1.5 text-[0.88rem] leading-relaxed text-fogb/60">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 시설 ─────────────────────────────────────────────────────────────────────

function Facility() {
  const { ref, inView } = useInView()
  return (
    <section id="facility" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-boardbg/50">
      <div className="mx-auto max-w-5xl px-5">
        <Head en="Facility" title="시설 · 서비스" inView={inView} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SITE.facility.map((f, i) => (
            <div key={f.k} className={`rounded-xl border border-white/10 bg-night px-6 py-5 ${MOTION ? `anim-fade-up d${(i % 3) * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[0.98rem] font-bold text-white">{f.k}</p>
              <p className="mt-1 text-[0.82rem] text-fogb/55">{f.v}</p>
            </div>
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
        <Head en="Guide" title="이용 안내" inView={inView} />
        <div className={`border-t border-white/12 ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.guide.map((g, i) => (
            <div key={g.q} className="border-b border-white/10">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full py-5 flex items-center justify-between text-left gap-4">
                <span className="text-[0.98rem] font-bold text-white">{g.q}</span>
                <span className={`text-lamp text-[1.2rem] leading-none shrink-0 ${MOTION ? 'transition-transform duration-300' : ''} ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div className={`overflow-hidden ${MOTION ? 'transition-[max-height,opacity] duration-400' : ''} ${open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="pb-5 text-[0.92rem] leading-relaxed text-fogb/65">{g.a}</p>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-boardbg/50">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Reviews" title="다녀간 사람들" inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`rounded-xl border border-white/10 bg-night p-7 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[0.93rem] leading-relaxed text-fogb/75">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between gap-2">
                <span className="text-[0.85rem] font-bold text-white">{r.name}</span>
                <span className="f-mono text-[0.72rem] text-lamp shrink-0">{r.tag}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 오시는 길 ────────────────────────────────────────────────────────────────

function Location() {
  const { ref, inView } = useInView()
  return (
    <section id="location" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="Access" title="오시는 길" inView={inView} />
        <div className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <p className="text-[1.1rem] font-extrabold text-white">{SITE.address}</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem] text-fogb/65">
            <li>· {SITE.location.walk}</li>
            <li>· {SITE.location.parking}</li>
            <li>· {SITE.location.landmark}</li>
          </ul>
          <p className="mt-5 text-[0.9rem] text-fogb/50">연중무휴 · 24시간 무인 운영 · 문의는 문자가 가장 빠릅니다</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent('[문의] 스터디카페 몰입 이용 문의드립니다.')}`}
              className="px-6 py-3 rounded-lg bg-lamp text-night text-[0.9rem] font-extrabold hover:bg-white"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              문자 문의
            </a>
            <a
              href={SITE.location.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-lg border border-white/25 text-[0.9rem] font-bold text-fogb hover:border-lamp hover:text-lamp"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              네이버 지도로 길찾기 ↗
            </a>
          </div>
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
          <p className="text-[1.1rem] font-extrabold text-white">
            <span className="inline-block w-2 h-2 rounded-full bg-lamp mr-2" />
            {SITE.name}
          </p>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-fogb/45">
            {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="text-[0.78rem] text-fogb/35">kakao {SITE.kakaoId} · 24시간 무인 운영</p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t border-white/12 bg-night">
      <a href={`tel:${SITE.phone}`} className="py-4 text-center text-[0.95rem] font-bold text-fogb">
        전화 문의
      </a>
      <button onClick={() => goTo('#price')} className="py-4 text-center text-[0.95rem] font-extrabold bg-lamp text-night">
        요금 보기
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
    <div className="bg-night text-fogb">
      <Header active={active} />
      <Hero />
      <Price />
      <Seats />
      <Facility />
      <Guide />
      <Reviews />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
