import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import img5 from './images/5.jpg'
import img6 from './images/6.jpg'
import img7 from './images/7.jpg'
import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

const SITE = {
  // 여기에 꽃집 기본 정보 교체
  name: '꽃상점 오월',
  nameEn: 'FLOWER SHOP OWOL',
  tagline: '꽃다발 · 화환 · 정기구독 · 연희',
  slogan: '오늘 아침 시장에서\n골라온 꽃으로',
  sloganSub: '매일 새벽 고속터미널 꽃시장에 다녀옵니다. 그날 가장 좋은 꽃으로만 만들고, 시든 꽃은 진열하지 않습니다.',

  // 여기에 연락처 교체
  phone: '02-1234-5678',
  smsPhone: '01012345678',
  kakaoId: '@꽃상점오월',
  instagram: '@owol.flower',

  // 여기에 사업자 정보 교체
  ceo: '대표 플로리스트 오월',
  bizNo: '123-45-67890',
  address: '서울특별시 서대문구 연희로 123, 1층',

  hours: [
    { day: '월 – 토', time: '10:00 – 20:00' },
    { day: '일요일', time: '10:00 – 17:00' },
    { day: '명절 당일', time: '휴무' },
  ],

  // 당일배달 마감 (시 기준) — 이 시간 전 주문은 오늘 도착
  sameDayCutoff: 14,
  deliveryNote: '서대문 · 마포 · 은평 직접 배달 (그 외 지역 퀵 연계)',

  nav: [
    { label: '주문하기', href: '#shop' },
    { label: '정기구독', href: '#subscribe' },
    { label: '만드는 사람', href: '#florist' },
    { label: '꽃 관리법', href: '#care' },
    { label: '이용 안내', href: '#guide' },
    { label: '주문 문의', href: '#order' },
  ],

  // 용도별 상품 — 여기에 상품 사진 교체
  shop: [
    { img: img1, name: '오월의 꽃다발', use: '생일 · 기념일', price: '35,000원부터', note: '당일 제작 · 예산에 맞춰 구성' },
    { img: img2, name: '축하 화환 · 스탠드', use: '개업 · 행사', price: '90,000원부터', note: '문구 리본 무료 · 당일 배송' },
    { img: img3, name: '개업 화분', use: '개업 · 이전', price: '60,000원부터', note: '공기정화 식물 · 관리법 카드 동봉' },
    { img: img4, name: '테이블 센터피스', use: '행사 · 촬영', price: '50,000원부터', note: '행사 규모별 견적' },
    { img: img5, name: '드라이플라워 · 프리저브드', use: '선물 · 인테리어', price: '28,000원부터', note: '오래 두고 보는 꽃' },
    { img: img6, name: '근조 화환', use: '조문', price: '85,000원부터', note: '2시간 내 배송 · 리본 문구 대필' },
  ],

  // 정기구독
  subNote: '꽃병은 첫 달에 무료로 드립니다 · 휴가 주는 미루기 가능 · 언제든 해지',
  subscribe: [
    { name: '한 손 다발', cycle: '격주', price: '월 39,000원', desc: '식탁 위 작은 꽃병에 어울리는 크기', hot: false },
    { name: '풍성한 다발', cycle: '격주', price: '월 69,000원', desc: '거실 · 매장용, 계절 꽃 중심', hot: true },
    { name: '매주 상점 픽', cycle: '매주', price: '월 99,000원', desc: '그 주 가장 좋은 꽃으로 자유 구성', hot: false },
  ],

  // 만드는 사람 — 여기에 프로필 · 작업 사진 교체
  florist: {
    img: img7,
    name: '오월',
    role: '대표 플로리스트',
    career: ['화훼장식기능사', '플라워샵 운영 9년차', '웨딩 · 행사 장식 240회'],
    words: '꽃은 받는 순간보다 다음 날 아침이 중요합니다. 하루 지나 더 예뻐지는 꽃을 고르는 게 저희 일입니다.',
  },

  // 꽃 관리법
  care: [
    { title: '받은 날', body: '포장을 풀고 줄기 끝을 사선으로 1cm 잘라 미지근한 물에 꽂아주세요.' },
    { title: '매일', body: '물은 하루 한 번 갈고, 물에 잠기는 잎은 미리 떼주세요.' },
    { title: '놓는 자리', body: '직사광선과 에어컨 바람을 피하면 꽃이 이틀은 더 갑니다.' },
    { title: '시들기 시작하면', body: '시든 꽃만 빼내면 나머지가 오래갑니다. 드라이가 잘 되는 꽃은 거꾸로 말려보세요.' },
  ],

  guide: [
    { q: '당일 배달되나요?', a: '오후 2시 전 주문은 당일 배달됩니다. 서대문 · 마포 · 은평은 직접 배달하고, 그 외 지역은 퀵으로 보내드립니다. 근조 화환은 시간 관계없이 최우선으로 나갑니다.' },
    { q: '예산만 말해도 되나요?', a: '네, 가장 많은 주문 방식입니다. 예산과 용도, 받는 분 분위기를 알려주시면 그날 가장 좋은 꽃으로 구성해 사진을 먼저 보내드립니다.' },
    { q: '리본 문구는 어떻게 하나요?', a: '문자로 보내주시면 그대로 인쇄합니다. 축하 · 근조 문구가 고민되시면 상황에 맞는 문구를 추천해 드립니다.' },
    { q: '꽃이 시들어서 왔어요.', a: '받으신 날 사진과 함께 연락 주시면 새 꽃으로 다시 보내드립니다. 저희 꽃은 하루 만에 시들지 않아야 정상입니다.' },
  ],

  reviews: [
    { text: '예산 5만 원이라고만 말했는데 사진으로 먼저 보여주고 보내주셨어요. 받은 분이 어디 꽃집이냐고 물어봤습니다.', name: '김O연', tag: '꽃다발' },
    { text: '개업 화환 당일 아침에 주문했는데 오후 행사 전에 도착했어요. 리본 문구까지 추천해 주셔서 편했습니다.', name: '박O준', tag: '축하 화환' },
    { text: '정기구독 6개월째. 격주로 오는 꽃 상태가 첫 주문 때랑 똑같습니다. 식탁이 달라졌어요.', name: '이O서', tag: '정기구독' },
  ],

  order: {
    lead: '용도와 예산, 받는 날짜를 보내주시면\n구성안과 사진을 먼저 보내드립니다.',
    uses: ['꽃다발', '축하 화환', '개업 화분', '근조 화환', '정기구독', '행사 장식'],
    budgets: ['3만원대', '5만원대', '10만원대', '상담 후 결정'],
  },

  location: {
    walk: '홍대입구역 3번 출구 · 마을버스 5분',
    parking: '가게 앞 정차 가능 · 인근 공영주차장 도보 2분',
    landmark: '연희동 사러가시장 입구, 초록 차양이 있는 모퉁이 가게입니다.',
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

/** 당일배달 마감 배지 — 오후 2시 전이면 '오늘 도착 가능' */
function sameDayStatus(): { label: string; on: boolean } {
  const now = new Date()
  const h = now.getHours()
  if (h < SITE.sameDayCutoff) {
    return { label: `지금 주문하면 오늘 도착 (${SITE.sameDayCutoff}시 마감)`, on: true }
  }
  return { label: '지금 주문은 내일 도착 · 근조 화환은 예외', on: false }
}

// ─── 공통 섹션 헤드 ───────────────────────────────────────────────────────────

function Head({ en, title, sub, inView }: { en: string; title: React.ReactNode; sub?: string; inView: boolean }) {
  return (
    <div className={`mb-12 text-center ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
      <p className="f-disp text-[0.85rem] tracking-[0.35em] text-stem">{en}</p>
      <h2 className="f-disp mt-3 text-[clamp(1.75rem,4vw,2.5rem)] tracking-tight leading-snug">{title}</h2>
      {sub && <p className="mx-auto mt-4 max-w-xl text-[0.96rem] leading-relaxed text-plum/60">{sub}</p>}
    </div>
  )
}

// ─── 헤더 ─────────────────────────────────────────────────────────────────────

function Header({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false)
  const st = sameDayStatus()
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-cream/95 ${scrolled ? 'shadow-[0_1px_0_rgba(110,59,84,0.12)]' : ''}`}
      style={{ transition: MOTION ? 'box-shadow 0.25s' : 'none', backdropFilter: 'blur(10px)' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[72px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-baseline gap-2.5">
          <span className="f-disp text-[1.3rem] tracking-tight">꽃상점 오월</span>
          <span className={`hidden lg:inline-flex items-center gap-1.5 ml-1 px-2.5 py-1 rounded-full text-[0.7rem] font-bold ${st.on ? 'bg-stem/12 text-stem' : 'bg-plum/6 text-plum/50'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${st.on ? 'bg-stem' : 'bg-plum/30'}`} />
            {st.on ? '오늘 도착 가능' : '내일 도착'}
          </span>
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[0.88rem] font-semibold ${active === n.href.slice(1) ? 'text-plum' : 'text-plum/55 hover:text-plum'}`}
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <a
          href={`tel:${SITE.phone}`}
          className="nums px-5 py-2.5 rounded-full bg-plum text-cream text-[0.875rem] font-bold hover:bg-stem"
          style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
        >
          {SITE.phone}
        </a>
      </div>
    </header>
  )
}

// ─── 히어로 — 컴팩트 센터 + 당일배달 배지 ─────────────────────────────────────

function Hero() {
  const st = sameDayStatus()
  return (
    <section className="pt-[72px]">
      <div className="mx-auto max-w-3xl px-5 pt-14 md:pt-20 pb-12 text-center">
        <p className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.85rem] font-bold ${st.on ? 'bg-stem/12 text-stem' : 'bg-plum/8 text-plum/60'} ${MOTION ? 'hero-in' : ''}`}>
          🚚 {st.label}
        </p>
        <h1 className={`f-disp mt-7 text-[clamp(2.3rem,6.2vw,4rem)] tracking-tight leading-[1.22] whitespace-pre-line ${MOTION ? 'hero-in d150' : ''}`}>
          {SITE.slogan}
        </h1>
        <p className={`mx-auto mt-6 max-w-md text-[1rem] leading-relaxed text-plum/60 ${MOTION ? 'hero-in d300' : ''}`}>{SITE.sloganSub}</p>
        <div className={`mt-9 flex justify-center items-center gap-5 ${MOTION ? 'hero-in d450' : ''}`}>
          <button
            onClick={() => goTo('#order')}
            className="px-8 py-4 rounded-full bg-plum text-cream text-[0.95rem] font-bold hover:bg-stem"
            style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
          >
            문자로 주문하기
          </button>
          <button
            onClick={() => goTo('#shop')}
            className="text-[0.95rem] font-bold border-b-2 border-plum pb-0.5 hover:text-stem hover:border-stem"
            style={{ transition: MOTION ? 'color 0.2s, border-color 0.2s' : 'none' }}
          >
            상품 보기
          </button>
        </div>
      </div>
      <Shop />
    </section>
  )
}

// ─── 상품 그리드 ──────────────────────────────────────────────────────────────

function Shop() {
  const { ref, inView } = useInView(0.05)
  return (
    <div id="shop" ref={ref as React.RefObject<HTMLDivElement>} className="mx-auto max-w-6xl px-5 pb-20 md:pb-28 pt-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
        {SITE.shop.map((p, i) => (
          <article key={p.name} className={`group ${MOTION ? `anim-fade-up d${(i % 3) * 90 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
            <div className={`overflow-hidden rounded-t-[120px] rounded-b-2xl ${MOTION ? 'bloom' : ''}`}>
              {/* 여기에 상품 사진 교체 */}
              <img
                src={p.img}
                alt={p.name}
                className={`w-full aspect-[4/5] object-cover ${MOTION ? 'group-hover:scale-105 transition-transform duration-700' : ''}`}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-[0.75rem] tracking-[0.15em] font-bold text-stem">{p.use}</p>
              <h3 className="f-disp mt-1 text-[1.25rem]">{p.name}</h3>
              <p className="nums mt-1.5 text-[0.95rem] font-bold text-plum/80">{p.price}</p>
              <p className="mt-1 text-[0.8rem] text-plum/45">{p.note}</p>
            </div>
          </article>
        ))}
      </div>
      <p className={`mt-10 text-center text-[0.85rem] text-plum/50 ${MOTION ? 'anim-fade-up d240' : ''} ${inView ? 'in-view' : ''}`}>
        {SITE.deliveryNote} · 사진은 예시이며 그날의 꽃으로 새로 만듭니다
      </p>
    </div>
  )
}

// ─── 정기구독 ─────────────────────────────────────────────────────────────────

function Subscribe() {
  const { ref, inView } = useInView()
  return (
    <section id="subscribe" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-blossom">
      <div className="mx-auto max-w-5xl px-5">
        <Head en="SUBSCRIPTION" title="꽃이 있는 생활, 정기구독" sub={SITE.subNote} inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.subscribe.map((s, i) => (
            <article
              key={s.name}
              className={`relative rounded-3xl p-8 text-center ${s.hot ? 'bg-plum text-cream' : 'bg-cream border border-plum/12'} ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}
            >
              {s.hot && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-stem text-cream text-[0.72rem] font-bold px-3.5 py-1">가장 인기</span>
              )}
              <p className={`text-[0.78rem] tracking-[0.2em] font-bold ${s.hot ? 'text-cream/60' : 'text-stem'}`}>{s.cycle} 배달</p>
              <h3 className="f-disp mt-2 text-[1.45rem]">{s.name}</h3>
              <p className="nums mt-4 text-[1.7rem] font-extrabold">{s.price}</p>
              <p className={`mt-3 text-[0.88rem] leading-relaxed ${s.hot ? 'text-cream/70' : 'text-plum/55'}`}>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 만드는 사람 ──────────────────────────────────────────────────────────────

function Florist() {
  const { ref, inView } = useInView()
  const f = SITE.florist
  return (
    <section id="florist" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 grid md:grid-cols-[0.75fr_1fr] gap-10 items-center">
        <div className={`${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
          {/* 여기에 플로리스트 사진 교체 */}
          <img src={f.img} alt={f.name} className="w-full aspect-[4/5] object-cover rounded-t-[140px] rounded-b-3xl" />
        </div>
        <div className={`${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <p className="f-disp text-[0.85rem] tracking-[0.35em] text-stem">FLORIST</p>
          <h2 className="f-disp mt-3 text-[clamp(1.6rem,3.6vw,2.2rem)] tracking-tight">만드는 사람, {f.name}</h2>
          <blockquote className="mt-6 border-l-2 border-stem pl-5 text-[1.02rem] leading-[1.85] text-plum/75">{f.words}</blockquote>
          <ul className="mt-6 space-y-1.5">
            {f.career.map((l) => (
              <li key={l} className="text-[0.88rem] text-plum/55 flex gap-2.5">
                <span className={`text-stem ${MOTION ? "float-slow" : ""}`}>✿</span>
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ─── 꽃 관리법 ────────────────────────────────────────────────────────────────

function Care() {
  const { ref, inView } = useInView()
  return (
    <section id="care" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-blossom">
      <div className="mx-auto max-w-5xl px-5">
        <Head en="FLOWER CARE" title="꽃을 오래 보는 법" sub="다발과 함께 카드로도 넣어드리는 내용입니다." inView={inView} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SITE.care.map((c, i) => (
            <div key={c.title} className={`rounded-2xl bg-cream border border-plum/10 p-6 text-center ${MOTION ? `anim-fade-up d${i * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="f-disp text-[1.05rem] text-stem">{c.title}</p>
              <p className="mt-2.5 text-[0.88rem] leading-relaxed text-plum/60">{c.body}</p>
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
        <Head en="INFORMATION" title="자주 묻는 질문" inView={inView} />
        <div className={`border-t border-plum/12 ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.guide.map((g, i) => (
            <div key={g.q} className="border-b border-plum/10">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full py-5 flex items-center justify-between text-left gap-4">
                <span className="text-[0.98rem] font-bold">{g.q}</span>
                <span className={`text-stem text-[1.2rem] leading-none shrink-0 ${MOTION ? 'transition-transform duration-300' : ''} ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden ${MOTION ? 'transition-[max-height,opacity] duration-400' : ''} ${open === i ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="pb-5 text-[0.92rem] leading-relaxed text-plum/60">{g.a}</p>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-blossom">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="NOTES" title="꽃을 받은 마음들" inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`rounded-2xl bg-cream border border-plum/10 p-7 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className={`text-stem text-[1.1rem] ${MOTION ? "float-slow" : ""}`} aria-hidden>✿</p>
              <p className="mt-2.5 text-[0.94rem] leading-relaxed text-plum/75">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between">
                <span className="text-[0.85rem] font-bold">{r.name}</span>
                <span className="text-[0.78rem] font-bold text-stem">{r.tag}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 주문 문의 ────────────────────────────────────────────────────────────────

function Order() {
  const { ref, inView } = useInView()
  const [use, setUse] = useState<string>(SITE.order.uses[0])
  const [budget, setBudget] = useState<string>(SITE.order.budgets[1])
  const [when, setWhen] = useState('')
  const smsBody = `[주문문의] 용도: ${use} / 예산: ${budget} / 받는 날: ${when || '상담 후 결정'}`
  return (
    <section id="order" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Head en="ORDER" title="주문 문의" inView={inView} />
        <p className={`-mt-6 mb-10 text-center text-[0.98rem] leading-relaxed text-plum/60 whitespace-pre-line ${MOTION ? 'anim-fade-up d80' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.order.lead}
        </p>
        <div className={`space-y-7 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-plum/50 mb-2.5">01 · 용도</p>
            <div className="flex flex-wrap gap-2">
              {SITE.order.uses.map((s) => (
                <button
                  key={s}
                  onClick={() => setUse(s)}
                  className={`px-4 py-2.5 rounded-full text-[0.88rem] font-bold border ${use === s ? 'bg-plum text-cream border-plum' : 'border-plum/20 text-plum/60 hover:border-plum/50'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-plum/50 mb-2.5">02 · 예산</p>
            <div className="flex flex-wrap gap-2">
              {SITE.order.budgets.map((s) => (
                <button
                  key={s}
                  onClick={() => setBudget(s)}
                  className={`px-4 py-2.5 rounded-full text-[0.88rem] font-bold border ${budget === s ? 'bg-stem text-cream border-stem' : 'border-plum/20 text-plum/60 hover:border-plum/50'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-plum/50 mb-2.5">03 · 받는 날짜 (선택)</p>
            <input
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              placeholder="예) 9월 12일 오후, 사무실로"
              className="w-full bg-transparent border-b-2 border-plum/20 px-1 py-3.5 text-[0.98rem] focus:outline-none focus:border-stem"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-4 rounded-full text-center bg-plum text-cream text-[0.98rem] font-bold hover:bg-stem"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              문자로 주문 문의
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex-1 py-4 rounded-full text-center border-2 border-plum/20 text-[0.98rem] font-bold hover:border-stem hover:text-stem"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              전화 {SITE.phone}
            </a>
          </div>
          <p className="text-center text-[0.8rem] text-plum/45">근조 화환은 전화 주시면 가장 빠르게 처리해 드립니다 · 카카오톡 {SITE.kakaoId}</p>
        </div>
      </div>
    </section>
  )
}

// ─── 오시는 길 ────────────────────────────────────────────────────────────────

function Location() {
  const { ref, inView } = useInView()
  return (
    <section id="location" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-blossom">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="VISIT" title="가게에 놀러 오세요" inView={inView} />
        <div className={`text-center ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <p className="text-[1.1rem] font-bold">{SITE.address}</p>
          <ul className="mt-5 space-y-2 text-[0.95rem] text-plum/60">
            <li>{SITE.location.walk}</li>
            <li>{SITE.location.parking}</li>
            <li>{SITE.location.landmark}</li>
          </ul>
          <div className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-2">
            {SITE.hours.map((h) => (
              <p key={h.day} className="text-[0.9rem]">
                <span className="text-plum/45 mr-2.5">{h.day}</span>
                <span className="nums font-bold">{h.time}</span>
              </p>
            ))}
          </div>
          <a
            href={SITE.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-7 px-6 py-3 rounded-full border-2 border-plum/20 text-[0.9rem] font-bold hover:border-stem hover:text-stem"
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
    <footer className="py-12 pb-28 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="f-disp text-[1.3rem]">꽃상점 오월</p>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-plum/45">
            {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="text-[0.78rem] text-plum/35">
          instagram {SITE.instagram} · kakao {SITE.kakaoId}
        </p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t border-plum/10 bg-cream">
      <a href={`tel:${SITE.phone}`} className="py-4 text-center text-[0.95rem] font-bold">
        전화 주문
      </a>
      <button onClick={() => goTo('#order')} className="py-4 text-center text-[0.95rem] font-bold bg-plum text-cream">
        주문 문의
      </button>
    </div>
  )
}

// ─── 앱 ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const secs = Array.from(document.querySelectorAll('section[id], div[id="shop"]'))
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55%' },
    )
    secs.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
  return (
    <div className="bg-cream text-plum">
      <Header active={active} />
      <Hero />
      <Subscribe />
      <Florist />
      <Care />
      <Guide />
      <Reviews />
      <Order />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
