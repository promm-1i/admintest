import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

/* 이미지 — src/images/ 안의 파일을 같은 이름으로 덮어쓰면 그대로 반영됩니다 */
import heroImg from './images/hero.jpg'
import roomImg1 from './images/room-1.jpg'
import roomImg2 from './images/room-2.jpg'
import roomImg3 from './images/room-3.jpg'
import enjoyImg1 from './images/enjoy-1.jpg'
import enjoyImg2 from './images/enjoy-2.jpg'
import enjoyImg3 from './images/enjoy-3.jpg'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

const SITE = {
  // 여기에 스테이 기본 정보 교체
  name: '스테이 여백',
  nameEn: 'STAY YEOBAEK',
  tagline: '양양 · 독채 3동',
  slogan: '아무것도 하지 않으려고\n오는 곳',
  sloganSub:
    '바다까지 걸어서 6분. 텔레비전 대신 창을 크게 냈습니다. 체크인하고 나면, 나머지는 전부 여백입니다.',

  // 여기에 연락처 교체
  phone: '010-1234-5678',
  smsPhone: '01012345678',
  kakaoId: '@스테이여백',
  instagram: '@stay.yeobaek',

  // 여기에 사업자 정보 교체
  ceo: '대표 김여백',
  bizNo: '123-45-67890',
  address: '강원특별자치도 양양군 현남면 바다길 123',

  // 여기에 히어로 사진 교체
  heroPhoto: heroImg,

  nav: [
    { label: '여백에 대해', href: '#about' },
    { label: '객실', href: '#rooms' },
    { label: '요금 안내', href: '#rates' },
    { label: '머무는 법', href: '#enjoy' },
    { label: '이용 안내', href: '#guide' },
    { label: '예약', href: '#reserve' },
  ],

  about:
    '여백은 방 세 개짜리 펜션이 아니라, 독채 세 동입니다. 담을 사이에 두고 서로 보이지 않게 앉혔습니다. 조식은 없지만 밥솥과 좋은 쌀, 동네 빵집 지도를 두었습니다. 필요한 만큼만 준비해 두고, 나머지는 비워두는 것 — 저희가 생각하는 환대는 그런 것입니다.',

  // 객실 — 독채 3동. 여기에 객실 사진 교체
  rooms: [
    {
      img: roomImg1,
      name: '동 하나 · 바다',
      en: 'HAENG',
      people: '기준 2인 · 최대 2인',
      size: '18평 · 침대 1',
      features: ['바다 전망 통창', '노천 욕조', '프라이빗 마당'],
      weekday: '280,000',
      weekend: '350,000',
    },
    {
      img: roomImg2,
      name: '동 둘 · 숲',
      en: 'SUP',
      people: '기준 2인 · 최대 4인',
      size: '24평 · 침대 2',
      features: ['대숲 뷰 거실', '실내 자쿠지', '장작 벽난로'],
      weekday: '320,000',
      weekend: '410,000',
    },
    {
      img: roomImg3,
      name: '동 셋 · 마당',
      en: 'MADANG',
      people: '기준 4인 · 최대 6인',
      size: '32평 · 침대 2 + 온돌',
      features: ['넓은 잔디 마당', '바베큐 화덕', '반려견 동반 가능'],
      weekday: '390,000',
      weekend: '490,000',
    },
  ],

  // 요금 안내
  rates: {
    note: '1박 기준 · 기준 인원 초과 1인당 20,000원(침구 포함) · 미취학 아동 무료',
    rows: [
      { label: '주중 (일–목)', desc: '위 객실 요금 그대로', extra: '연박 시 2박째부터 10% 할인' },
      { label: '금요일 · 주말', desc: '주말 요금 적용', extra: '토요일은 최소 1박' },
      { label: '성수기 (7/15 – 8/20)', desc: '주말 요금 + 50,000원', extra: '설·추석 연휴 동일' },
    ],
    checkin: '체크인 15:00 – 21:00 · 체크아웃 11:00',
    cancel: [
      '7일 전까지 취소 시 전액 환불',
      '3일 전까지 50% 환불',
      '이후 취소 · 노쇼는 환불이 어렵습니다',
      '기상 악화로 인한 입도 불가 시 전액 환불',
    ],
  },

  // 머무는 법 — 여기에 사진 교체
  enjoy: [
    { img: enjoyImg1, title: '불멍과 바베큐', body: '장작과 그릴을 준비해 드립니다. 밤 10시까지, 마당 화덕에서.' },
    { img: enjoyImg2, title: '바다 산책로', body: '대문을 나서면 방파제까지 6분. 아침 물때 시간을 안내해 드립니다.' },
    { img: enjoyImg3, title: '요가 매트와 차', body: '각 동에 매트 두 장과 동네 찻집의 잎차를 두었습니다.' },
  ],

  // 이용 안내 — 아코디언
  guide: [
    { q: '입실 전에 알려주세요', a: '전 객실 금연입니다(마당 흡연 구역 있음). 21시 이후 도착 시 미리 연락 주시면 셀프 체크인을 안내드립니다.' },
    { q: '아이와 함께 가도 되나요', a: '동 셋(마당)은 아이 동반에 좋습니다. 유아 욕조와 침대 가드를 무료로 빌려드립니다. 동 하나는 2인 전용으로 조용히 운영합니다.' },
    { q: '반려견 동반', a: '동 셋만 가능합니다. 1마리 30,000원, 배변 매너와 침구 미사용을 부탁드립니다.' },
    { q: '바베큐 이용', a: '화덕 이용료 20,000원(장작 포함). 21시 이전에 시작해 주세요. 우천 시 처마 아래 그릴로 대체됩니다.' },
    { q: '주차 · 짐', a: '각 동 앞 1대씩, 추가 차량은 공용 마당에 주차 가능합니다. 무거운 짐은 카트를 빌려드립니다.' },
  ],

  reviews: [
    { text: '독채라 소리에 예민한 저희 부부한테 완벽했어요. 이틀 내내 다른 손님을 한 번도 못 마주쳤습니다.', name: '김O림', tag: '동 하나 · 2박' },
    { text: '자쿠지에서 보이는 대숲이 사진보다 좋습니다. 밥솥에 쌀까지 안쳐져 있는 디테일에 놀랐어요.', name: '이O주', tag: '동 둘' },
    { text: '아이 둘, 강아지 한 마리와 갔는데 마당에서 하루 종일 놀았습니다. 화덕 바베큐는 꼭 하세요.', name: '박O솔', tag: '동 셋 · 가족' },
  ],

  reserve: {
    lead: '원하시는 동과 날짜, 인원을 보내주시면\n빈 날짜와 입금 안내를 문자로 드립니다.',
  },

  location: {
    car: '서울양양고속도로 하조대 IC에서 15분',
    bus: '양양터미널에서 택시 20분 (요청 시 시간 맞춰 안내)',
    landmark: '해변 주차장 끝, 낮은 돌담 안쪽 세 채입니다.',
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

function Head({ en, title, inView, light }: { en: string; title: React.ReactNode; inView: boolean; light?: boolean }) {
  return (
    <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
      <p className={`text-[0.72rem] tracking-[0.4em] uppercase font-semibold ${light ? 'text-paper/50' : 'text-teal/70'}`}>{en}</p>
      <h2 className="f-myeongjo mt-4 text-[clamp(1.7rem,4vw,2.4rem)] font-bold leading-snug">{title}</h2>
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
      className={`fixed top-0 inset-x-0 z-50 ${scrolled ? 'bg-paper/95 shadow-[0_1px_0_rgba(42,46,51,0.08)]' : ''}`}
      style={{ transition: MOTION ? 'background-color 0.3s, box-shadow 0.3s' : 'none', backdropFilter: scrolled ? 'blur(10px)' : 'none' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[72px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-baseline gap-2.5">
          <span className="f-myeongjo text-[1.2rem] font-bold tracking-tight text-ink">여백</span>
          <span className="text-[0.7rem] tracking-[0.25em] uppercase text-ink/70">{SITE.tagline}</span>
        </button>
        <nav className="hidden md:flex items-center gap-7">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[0.88rem] ${
                active === n.href.slice(1) ? 'font-bold text-teal' : 'text-ink/70 hover:text-ink font-medium'
              }`}
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => goTo('#reserve')}
          className="px-5 py-2.5 text-[0.85rem] font-bold bg-teal text-paper hover:bg-ink"
          style={{ transition: MOTION ? 'background-color 0.2s, color 0.2s' : 'none' }}
        >
          예약 문의
        </button>
      </div>
    </header>
  )
}

// ─── 히어로 ───────────────────────────────────────────────────────────────────

function Hero() {
  const jump = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    goTo(href)
  }
  return (
    <section className="hx-hero relative h-[92vh] min-h-[560px] overflow-hidden bg-paper">
      <div className="relative h-full flex flex-col justify-between px-[clamp(20px,4vw,64px)] pt-[clamp(88px,11vh,116px)] pb-[clamp(28px,5vh,48px)]">
        {/* 위 — 이름표 하나, 작은 사진 하나 */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-6">
          <p className={`text-[0.72rem] tracking-[0.4em] uppercase font-semibold text-teal ${MOTION ? 'hero-in' : ''}`}>
            {SITE.nameEn} — Yangyang
          </p>
          <div className={`hx-photo self-end shrink-0 overflow-hidden w-[clamp(116px,13vw,188px)] ${MOTION ? 'hero-in d200' : ''}`}>
            {/* 여기에 히어로 사진 교체 */}
            <img src={SITE.heroPhoto} alt="스테이 여백 독채 세 동" className="w-full aspect-[3/2] object-cover" />
          </div>
        </div>

        {/* 가운데 — 이름 두 글자를 화면 끝까지, 그 사이의 여백에 문장 하나 */}
        <div className="hx-wordrow">
          <span className="sr-only">{SITE.name}</span>
          <span aria-hidden="true" className={`hx-glyph hx-g1 f-myeongjo ${MOTION ? 'hx-open' : ''}`}>
            여
          </span>
          <h1 className={`hx-slogan f-myeongjo whitespace-pre-line ${MOTION ? 'hero-in d400' : ''}`}>{SITE.slogan}</h1>
          <span aria-hidden="true" className={`hx-glyph hx-g2 f-myeongjo ${MOTION ? 'hx-open' : ''}`}>
            백
          </span>
        </div>

        {/* 아래 — 한 단락과 예약 */}
        <div
          className={`border-t border-ink/15 pt-5 md:pt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-12 ${MOTION ? 'hero-in d600' : ''}`}
        >
          <p className="max-w-[33rem] text-[0.9rem] md:text-[0.95rem] leading-relaxed text-ink/70">{SITE.sloganSub}</p>
          <div className="flex items-center gap-6 shrink-0">
            <a
              href="#rooms"
              onClick={jump('#rooms')}
              className="hx-cta px-7 py-3.5 bg-teal text-paper text-[0.92rem] font-bold hover:bg-ink"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              객실 보기
            </a>
            <a
              href="#reserve"
              onClick={jump('#reserve')}
              className="text-[0.92rem] font-bold border-b border-ink/40 pb-0.5 hover:text-teal hover:border-teal"
              style={{ transition: MOTION ? 'color 0.2s, border-color 0.2s' : 'none' }}
            >
              빈 날짜 문의
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 소개 ─────────────────────────────────────────────────────────────────────

function About() {
  const { ref, inView } = useInView(0.25)
  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <p className={`text-[0.72rem] tracking-[0.4em] uppercase font-semibold text-teal/70 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
          About
        </p>
        <p className={`f-myeongjo mt-8 text-[clamp(1.05rem,2.2vw,1.3rem)] leading-[2.1] text-ink/80 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.about}
        </p>
        <div className={`mx-auto mt-10 w-px h-16 bg-teal/40 v-rule ${inView ? 'in-view' : ''}`} />
      </div>
    </section>
  )
}

// ─── 객실 ─────────────────────────────────────────────────────────────────────

function Rooms() {
  const { ref, inView } = useInView(0.08)
  return (
    <section id="rooms" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-mist">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Rooms" title="독채 세 동" inView={inView} />
        <div className="space-y-16 md:space-y-20">
          {SITE.rooms.map((r, i) => (
            <article key={r.name} className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${i % 2 ? 'md:[&>div:first-child]:order-2' : ''}`}>
              <div className={`overflow-hidden ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
                {/* 여기에 객실 사진 교체 */}
                <img src={r.img} alt={r.name} className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className={`${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
                <p className="text-[0.7rem] tracking-[0.35em] uppercase text-teal/70 font-semibold">{r.en}</p>
                <h3 className="f-myeongjo mt-2 text-[1.7rem] font-bold">{r.name}</h3>
                <p className="mt-2 text-[0.9rem] text-ink/55">
                  {r.people} · {r.size}
                </p>
                <ul className="mt-5 space-y-1.5">
                  {r.features.map((f) => (
                    <li key={f} className="text-[0.95rem] text-ink/70 flex gap-2.5">
                      <span className="text-teal">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-ink/15 flex gap-10">
                  <p>
                    <span className="text-[0.78rem] text-ink/45 block">주중</span>
                    <span className="nums text-[1.25rem] font-bold">{r.weekday}원</span>
                  </p>
                  <p>
                    <span className="text-[0.78rem] text-ink/45 block">금 · 주말</span>
                    <span className="nums text-[1.25rem] font-bold">{r.weekend}원</span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 요금 안내 ────────────────────────────────────────────────────────────────

function Rates() {
  const { ref, inView } = useInView()
  return (
    <section id="rates" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="Rates" title="요금 안내" inView={inView} />
        <div className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <ul className="divide-y divide-ink/10 border-y border-ink/15">
            {SITE.rates.rows.map((row) => (
              <li key={row.label} className="py-5 grid sm:grid-cols-[180px_1fr_auto] gap-x-6 gap-y-1 items-baseline">
                <p className="text-[1rem] font-bold">{row.label}</p>
                <p className="text-[0.92rem] text-ink/60">{row.desc}</p>
                <p className="text-[0.82rem] text-teal font-semibold">{row.extra}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.85rem] text-ink/50">{SITE.rates.note}</p>
          <p className="mt-2 text-[0.85rem] text-ink/50 nums">{SITE.rates.checkin}</p>
          <div className="mt-8 p-6 bg-mist">
            <p className="text-[0.82rem] font-bold tracking-wide text-ink/60 mb-3">취소 · 환불</p>
            <ul className="space-y-1.5">
              {SITE.rates.cancel.map((c) => (
                <li key={c} className="text-[0.88rem] text-ink/65 flex gap-2.5">
                  <span className="text-teal">·</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 머무는 법 ────────────────────────────────────────────────────────────────

function Enjoy() {
  const { ref, inView } = useInView()
  return (
    <section id="enjoy" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="How to Stay" title="여백에서 머무는 법" inView={inView} light />
        <div className="grid md:grid-cols-3 gap-6">
          {SITE.enjoy.map((e, i) => (
            <figure key={e.title} className={`${MOTION ? `anim-fade-up d${i * 140 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="overflow-hidden">
                {/* 여기에 사진 교체 */}
                <img src={e.img} alt={e.title} className="w-full aspect-[4/3] object-cover opacity-90" />
              </div>
              <figcaption className="mt-4">
                <p className="f-myeongjo text-[1.15rem] font-bold">{e.title}</p>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-paper/60">{e.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 이용 안내 (아코디언) ─────────────────────────────────────────────────────

function Guide() {
  const { ref, inView } = useInView()
  const [open, setOpen] = useState(0)
  return (
    <section id="guide" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Head en="Information" title="이용 안내" inView={inView} />
        <div className={`border-t border-ink/15 ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.guide.map((g, i) => (
            <div key={g.q} className="border-b border-ink/10">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full py-5 flex items-center justify-between text-left gap-4">
                <span className="text-[1rem] font-bold">{g.q}</span>
                <span className={`text-teal text-[1.2rem] leading-none shrink-0 ${MOTION ? 'transition-transform duration-300' : ''} ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden ${MOTION ? 'transition-[max-height,opacity] duration-400' : ''} ${open === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="pb-5 text-[0.92rem] leading-relaxed text-ink/60">{g.a}</p>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-mist">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Guest Book" title="다녀간 마음들" inView={inView} />
        <div className="grid md:grid-cols-3 gap-6">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`bg-paper p-7 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="f-myeongjo text-[0.95rem] leading-[1.9] text-ink/75">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between">
                <span className="text-[0.85rem] font-bold">{r.name}</span>
                <span className="text-[0.78rem] text-teal font-semibold">{r.tag}</span>
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
  const [room, setRoom] = useState<string>(SITE.rooms[0].name)
  const [dates, setDates] = useState('')
  const [people, setPeople] = useState('2명')
  const smsBody = `[예약문의] 객실: ${room} / 날짜: ${dates || '상담 후 결정'} / 인원: ${people}`
  return (
    <section id="reserve" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Head en="Reservation" title="예약 문의" inView={inView} />
        <p className={`-mt-6 mb-10 text-[0.98rem] leading-relaxed text-ink/60 whitespace-pre-line ${MOTION ? 'anim-fade-up d80' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.reserve.lead}
        </p>
        <div className={`space-y-7 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <div>
            <p className="text-[0.8rem] font-bold tracking-wide text-ink/50 mb-2.5">01 · 객실</p>
            <div className="flex flex-wrap gap-2">
              {SITE.rooms.map((r) => (
                <button
                  key={r.name}
                  onClick={() => setRoom(r.name)}
                  className={`px-4 py-2.5 text-[0.88rem] font-bold border ${room === r.name ? 'bg-teal text-paper border-teal' : 'border-ink/20 text-ink/60 hover:border-ink/50'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[0.8rem] font-bold tracking-wide text-ink/50 mb-2.5">02 · 날짜</p>
              <input
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                placeholder="예) 10월 24 – 25일, 1박"
                className="w-full bg-transparent border-b border-ink/25 px-1 py-3 text-[0.95rem] focus:outline-none focus:border-teal"
              />
            </div>
            <div>
              <p className="text-[0.8rem] font-bold tracking-wide text-ink/50 mb-2.5">03 · 인원</p>
              <div className="flex gap-2">
                {['2명', '3명', '4명', '5명 이상'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeople(p)}
                    className={`px-3.5 py-2 text-[0.85rem] font-bold border ${people === p ? 'bg-teal text-paper border-teal' : 'border-ink/20 text-ink/55 hover:border-ink/50'}`}
                    style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-4 text-center bg-teal text-paper text-[0.98rem] font-bold hover:bg-ink"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              문자로 빈 날짜 문의
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex-1 py-4 text-center border border-ink/30 text-[0.98rem] font-bold hover:border-teal hover:text-teal"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              전화 {SITE.phone}
            </a>
          </div>
          <p className="text-[0.8rem] text-ink/40">네이버 예약 · 카카오톡 {SITE.kakaoId} 채널로도 문의하실 수 있습니다.</p>
        </div>
      </div>
    </section>
  )
}

// ─── 오시는 길 ────────────────────────────────────────────────────────────────

function Location() {
  const { ref, inView } = useInView()
  return (
    <section id="location" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-mist">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="Access" title="찾아오시는 길" inView={inView} />
        <div className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <p className="text-[1.1rem] font-bold">{SITE.address}</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem] text-ink/65">
            <li>· {SITE.location.car}</li>
            <li>· {SITE.location.bus}</li>
            <li>· {SITE.location.landmark}</li>
          </ul>
          <a
            href={SITE.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-7 px-6 py-3 border border-ink/40 text-[0.9rem] font-bold hover:border-teal hover:text-teal"
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
    <footer className="py-12 pb-28 md:pb-12 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="f-myeongjo text-[1.3rem] font-bold">여백</p>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-paper/45">
            {SITE.name} · {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="text-[0.78rem] text-paper/35">
          instagram {SITE.instagram} · kakao {SITE.kakaoId}
        </p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t border-ink/10 bg-paper">
      <a href={`tel:${SITE.phone}`} className="py-4 text-center text-[0.95rem] font-bold">
        전화 문의
      </a>
      <button onClick={() => goTo('#reserve')} className="py-4 text-center text-[0.95rem] font-bold bg-teal text-paper">
        예약 문의
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
    <div className="bg-paper text-ink">
      <Header active={active} />
      <Hero />
      <About />
      <Rooms />
      <Rates />
      <Enjoy />
      <Guide />
      <Reviews />
      <Reserve />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
