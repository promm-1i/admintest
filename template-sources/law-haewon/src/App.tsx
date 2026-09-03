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
  name: '해원 법률사무소',
  nameEn: 'HAEWON LAW OFFICE',
  tagline: '민사 · 형사 · 가사 · 서초',
  slogan: '결과를 약속하는 곳은\n피하셔야 합니다',
  sloganSub:
    '소송의 결과는 누구도 장담할 수 없습니다. 저희가 약속드릴 수 있는 것은 정직한 전망, 서면으로 확정하는 수임료, 그리고 매 단계의 보고입니다.',

  phone: '02-1234-5678',
  smsPhone: '01012345678',
  kakaoId: '@해원법률',

  ceo: '대표 변호사 김해원',
  bizNo: '123-45-67890',
  address: '서울특별시 서초구 서초대로 123, 5층',

  hours: [
    { day: '평일', time: '09:00 – 18:00' },
    { day: '야간 상담 (화 · 목)', time: '– 21:00 (예약제)' },
    { day: '토 · 일', time: '긴급 사건 전화 가능' },
  ],

  nav: [
    { label: '수행 분야', href: '#fields' },
    { label: '진행 절차', href: '#process' },
    { label: '수임료 원칙', href: '#fees' },
    { label: '변호사', href: '#lawyers' },
    { label: '자주 묻는 질문', href: '#faq' },
    { label: '상담', href: '#consult' },
  ],

  // 수행 분야 — 히어로 우측 목차와 본문 겸용
  fields: [
    { no: 'I', name: '민사 · 손해배상', desc: '대여금 · 공사대금 · 임대차 · 교통사고. 소송 전 내용증명과 보전처분부터 설계합니다.', cases: '수행 320건' },
    { no: 'II', name: '형사 변호', desc: '수사 단계 동행부터 재판까지. 초기 진술이 결과를 좌우합니다 — 조사 전에 연락 주세요.', cases: '수행 210건' },
    { no: 'III', name: '가사 · 상속', desc: '이혼 · 양육권 · 재산분할 · 상속분쟁. 감정이 아닌 자료로 준비합니다.', cases: '수행 180건' },
    { no: 'IV', name: '부동산', desc: '명도 · 경매 · 재개발 · 분양 분쟁. 등기부와 계약서 검토는 상담 당일 진행합니다.', cases: '수행 150건' },
    { no: 'V', name: '기업 자문', desc: '계약서 검토 · 임금 분쟁 · 채권 회수. 월 자문으로 분쟁을 예방합니다.', cases: '자문사 28곳' },
  ],

  process: [
    { step: '01', name: '사실관계 상담', desc: '있는 그대로 말씀해 주세요. 불리한 사정까지 알아야 정확한 전망이 나옵니다. 초기 상담 30분 5만 원.' },
    { step: '02', name: '전망 · 수임료 서면 안내', desc: '승소 가능성과 예상 기간, 착수금 · 성공보수를 서면으로 드립니다. 검토 후 결정하세요.' },
    { step: '03', name: '수행 · 단계 보고', desc: '서면 제출 · 기일 결과를 그때그때 문자로 보고합니다. 묻기 전에 먼저 알려드립니다.' },
    { step: '04', name: '종결 · 정산', desc: '판결 · 조정 결과와 성공보수 정산 내역을 서면으로 정리해 드립니다.' },
  ],

  feesNote: '사건의 난이도 · 소가에 따라 달라지며, 계약서에 명시되지 않은 비용은 청구하지 않습니다.',
  fees: [
    { name: '초기 상담 (30분)', price: '50,000원', note: '수임 시 착수금에서 공제' },
    { name: '내용증명 · 계약서 검토', price: '220,000원부터', note: '당일 – 3일 내 회신' },
    { name: '민사 소송 착수금', price: '3,300,000원부터', note: '소가 · 난이도별 서면 견적' },
    { name: '형사 변호 착수금', price: '4,400,000원부터', note: '수사 · 재판 단계별' },
    { name: '성공보수', price: '결과 기준 협의', note: '계약 시 서면 확정' },
  ],

  lawyers: [
    {
      img: img1,
      name: '김해원',
      role: '대표 변호사',
      career: ['사법연수원 38기', '전 서울중앙지방법원 국선전담변호사', '민사 · 부동산 소송 17년'],
    },
    {
      img: img2,
      name: '박서진',
      role: '변호사',
      career: ['변호사시험 7회', '형사 · 가사 사건 전담', '대한변협 이혼 · 상속 전문 등록'],
    },
  ],

  officePhoto: { img: img3, label: '서초 사무소 서가' },

  faq: [
    { q: '상담만 받아도 되나요?', a: '네. 상담 후 직접 해결하실 수 있는 사건이라면 그렇게 안내드립니다. 소송이 답이 아닌 경우도 많습니다.' },
    { q: '수임료가 부담됩니다.', a: '분할 납부가 가능하며, 소송구조 제도 대상인지 먼저 확인해 드립니다. 비용 대비 실익이 없는 소송은 말립니다.' },
    { q: '진행 상황을 어떻게 알 수 있나요?', a: '서면 제출 · 기일 지정 · 기일 결과를 각각 문자로 보고합니다. 재판 기록은 요청 시 사본을 드립니다.' },
    { q: '경찰 조사 통보를 받았습니다.', a: '조사 일정 조율부터 도와드립니다. 조사 전 상담이 가장 중요하니 출석 전에 반드시 연락 주세요.' },
    { q: '멀리 살아도 맡길 수 있나요?', a: '전자소송으로 전국 사건 수행이 가능합니다. 상담은 화상으로, 기일 출석은 저희가 합니다.' },
  ],

  reviews: [
    { text: '다른 사무실 두 곳은 무조건 이긴다고 했는데, 여기는 승산이 6:4라며 조정안을 먼저 권했습니다. 결과적으로 소송 없이 원하는 금액을 받았어요.', name: '공사대금 · 김O수', tag: '민사' },
    { text: '경찰 조사 전날 밤에 전화를 받아주셨습니다. 진술 방향을 잡고 들어간 것과 아닌 것은 하늘과 땅 차이였습니다.', name: '형사 · 이O진', tag: '형사 변호' },
    { text: '기일마다 결과 문자가 먼저 옵니다. 변호사님이 어디까지 했는지 몰라 답답할 일이 없었습니다.', name: '이혼 · 박O림', tag: '가사' },
  ],

  consult: {
    lead: '분야와 상황을 간단히 보내주시면\n상담 가능 시간을 문자로 안내드립니다. 모든 상담 내용은 비밀이 보장됩니다.',
    topics: ['민사 · 손배', '형사', '가사 · 상속', '부동산', '기업 자문'],
  },

  location: {
    walk: '교대역 7번 출구 · 도보 3분',
    parking: '건물 주차장 1시간 지원 (방문 상담 시)',
    landmark: '법원 방면 대로변, 1층 약국 건물 5층입니다.',
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

function Head({ en, title, sub, inView, light }: { en: string; title: React.ReactNode; sub?: string; inView: boolean; light?: boolean }) {
  return (
    <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
      <p className={`f-latin italic text-[0.95rem] tracking-[0.08em] ${light ? 'text-cream/55' : 'text-pine/70'}`}>{en}</p>
      <h2 className="mt-3 text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold tracking-[-0.02em] leading-snug">{title}</h2>
      {sub && <p className={`mt-4 max-w-xl text-[0.98rem] leading-relaxed ${light ? 'text-cream/60' : 'text-inkg/60'}`}>{sub}</p>}
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
      className={`fixed top-0 inset-x-0 z-50 bg-cream/95 ${scrolled ? 'shadow-[0_1px_0_rgba(30,40,32,0.12)]' : ''}`}
      style={{ transition: MOTION ? 'box-shadow 0.25s' : 'none', backdropFilter: 'blur(10px)' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[72px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-baseline gap-2.5">
          <span className="text-[1.2rem] font-extrabold tracking-tight">해원 <span className="text-pine">법률사무소</span></span>
          <span className="hidden sm:inline text-[0.7rem] tracking-[0.14em] text-inkg/45">{SITE.tagline}</span>
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[0.88rem] font-semibold ${active === n.href.slice(1) ? 'text-pine' : 'text-inkg/60 hover:text-inkg'}`}
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <a
          href={`tel:${SITE.phone}`}
          className="nums px-5 py-2.5 bg-pine text-cream text-[0.875rem] font-bold hover:bg-inkg"
          style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
        >
          {SITE.phone}
        </a>
      </div>
    </header>
  )
}

// ─── 히어로 — 불 낮춘 상담실, 문장 하나만 밝다 ────────────────────────────────

function Hero() {
  const [lead, key] = SITE.slogan.split('\n')
  return (
    <section className="hero hx-hero relative overflow-hidden pt-[72px]">
      <span className="hx-room" aria-hidden />
      <div className="hx-stage relative mx-auto flex max-w-[1080px] flex-col items-center px-5 text-center sm:px-8">
        {/* 이 사무소가 하는 말 전부 — 한 문장 */}
        <h1 className="hx-say">
          <span className={`hx-say-lead block ${MOTION ? 'hx-rise' : ''}`}>{lead}</span>
          <span className={`hx-say-key block ${MOTION ? 'hx-rise hx-d1' : ''}`}>{key}</span>
        </h1>

        {/* 그래서 무엇을 약속하는가 */}
        <p className={`hx-sub ${MOTION ? 'hx-rise hx-d2' : ''}`}>{SITE.sloganSub}</p>

        <div className={`hx-act ${MOTION ? 'hx-rise hx-d3' : ''}`}>
          <a
            href="#consult"
            onClick={(e) => {
              e.preventDefault()
              goTo('#consult')
            }}
            className="hx-cta"
            style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
          >
            비밀 상담 문의
          </a>
          <a
            href="#fees"
            onClick={(e) => {
              e.preventDefault()
              goTo('#fees')
            }}
            className="hx-cta-line"
            style={{ transition: MOTION ? 'border-color 0.2s' : 'none' }}
          >
            수임료 원칙 보기
          </a>
        </div>

        {/* 찾아오는 길 · 늦은 시간 상담 — 상담실 문이 언제 열려 있는지 */}
        <p className={`hx-note ${MOTION ? 'hx-rise hx-d4' : ''}`}>
          <span>{SITE.location.walk}</span>
          <span className="hx-note-gap">
            {SITE.hours[1].day} {SITE.hours[1].time}
          </span>
        </p>
      </div>
    </section>
  )
}

// ─── 수행 분야 ────────────────────────────────────────────────────────────────

function Fields() {
  const { ref, inView } = useInView()
  return (
    <section id="fields" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-mistg">
      <div className="mx-auto max-w-5xl px-5">
        <Head en="Practice Areas" title="수행 분야" inView={inView} />
        <div className="space-y-0">
          {SITE.fields.map((f, i) => (
            <article
              key={f.no}
              className={`field grid sm:grid-cols-[64px_1fr_auto] gap-x-6 gap-y-2 items-baseline py-6 border-b border-inkg/12 ${MOTION ? `anim-fade-up d${(i % 5) * 70 + 70}` : ''} ${inView ? 'in-view' : ''}`}
            >
              <span className="f-latin text-[1.5rem] text-pine/50">{f.no}.</span>
              <div>
                <h3 className="text-[1.2rem] font-extrabold">{f.name}</h3>
                <p className="mt-1.5 text-[0.93rem] leading-relaxed text-inkg/60 max-w-xl">{f.desc}</p>
              </div>
              <span className="nums text-[0.82rem] font-bold text-pine">{f.cases}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 진행 절차 ────────────────────────────────────────────────────────────────

function Process() {
  const { ref, inView } = useInView(0.15)
  return (
    <section id="process" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="How We Work" title="사건은 이렇게 진행됩니다" inView={inView} />
        <ol className="relative">
          <span className={`vline absolute left-[15px] top-2 bottom-2 w-px bg-pine/30 ${inView ? 'in-view' : ''}`} aria-hidden />
          {SITE.process.map((p, i) => (
            <li key={p.step} className={`relative flex gap-6 pb-9 last:pb-0 ${MOTION ? `anim-fade-up d${i * 110 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <span className="relative z-10 grid place-items-center shrink-0 w-8 h-8 bg-pine text-cream nums text-[0.8rem] font-extrabold">{p.step}</span>
              <div className="pt-0.5">
                <h3 className="text-[1.12rem] font-extrabold">{p.name}</h3>
                <p className="mt-1.5 text-[0.93rem] leading-relaxed text-inkg/60 max-w-lg">{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ─── 수임료 원칙 ──────────────────────────────────────────────────────────────

function Fees() {
  const { ref, inView } = useInView()
  return (
    <section id="fees" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-pine text-cream">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="Fees" title="수임료 원칙" sub="계약서에 쓰지 않은 비용은 청구하지 않습니다." inView={inView} light />
        <ul className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.fees.map((f) => (
            <li key={f.name} className="grid sm:grid-cols-[1fr_auto_auto] items-baseline gap-x-8 gap-y-1 py-4 border-b border-cream/15">
              <span className="text-[1rem] font-bold">{f.name}</span>
              <span className="text-[0.8rem] text-cream/50">{f.note}</span>
              <span className="nums text-[1.05rem] font-extrabold text-right">{f.price}</span>
            </li>
          ))}
        </ul>
        <p className={`mt-6 text-[0.82rem] text-cream/50 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>{SITE.feesNote}</p>
      </div>
    </section>
  )
}

// ─── 변호사 ───────────────────────────────────────────────────────────────────

function Lawyers() {
  const { ref, inView } = useInView()
  return (
    <section id="lawyers" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <Head en="Attorneys" title="변호사 소개" inView={inView} />
        <div className="grid sm:grid-cols-2 gap-6">
          {SITE.lawyers.map((d, i) => (
            <article key={d.name} className={`flex gap-6 p-6 border border-inkg/12 bg-cream ${MOTION ? `anim-fade-up d${i * 120 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="w-28 shrink-0 overflow-hidden">
                {/* 여기에 변호사 프로필 사진 교체 */}
                <img src={d.img} alt={d.name} className="w-full aspect-[4/5] object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-[1.2rem] font-extrabold">
                  {d.name} <span className="text-[0.8rem] text-pine ml-1 font-bold">{d.role}</span>
                </p>
                <ul className="mt-3 space-y-1.5">
                  {d.career.map((l) => (
                    <li key={l} className="text-[0.84rem] text-inkg/60 flex gap-2">
                      <span className="text-pine">·</span>
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <figure className={`mt-6 ${MOTION ? 'anim-fade-up d280' : ''} ${inView ? 'in-view' : ''}`}>
          {/* 여기에 사무소 사진 교체 */}
          <img src={SITE.officePhoto.img} alt={SITE.officePhoto.label} className="w-full aspect-[21/9] object-cover" />
          <figcaption className="mt-2.5 text-[0.82rem] text-inkg/50">{SITE.officePhoto.label}</figcaption>
        </figure>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function Faq() {
  const { ref, inView } = useInView()
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-mistg">
      <div className="mx-auto max-w-3xl px-5">
        <Head en="FAQ" title="자주 묻는 질문" inView={inView} />
        <div className={`border-t border-inkg/15 ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.faq.map((g, i) => (
            <div key={g.q} className="border-b border-inkg/10">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full py-5 flex items-center justify-between text-left gap-4">
                <span className="text-[0.98rem] font-bold">{g.q}</span>
                <span className={`text-pine text-[1.2rem] leading-none shrink-0 ${MOTION ? 'transition-transform duration-300' : ''} ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div className={`overflow-hidden ${MOTION ? 'transition-[max-height,opacity] duration-400' : ''} ${open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="pb-5 text-[0.92rem] leading-relaxed text-inkg/60">{g.a}</p>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Records" title="의뢰인의 기록" inView={inView} />
        <div className="grid md:grid-cols-3 gap-6">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`p-7 bg-mistg border-l-2 border-pine ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[0.94rem] leading-relaxed text-inkg/75">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between gap-2">
                <span className="text-[0.83rem] font-bold">{r.name}</span>
                <span className="text-[0.76rem] font-bold text-pine shrink-0">{r.tag}</span>
              </footer>
            </blockquote>
          ))}
        </div>
        <p className={`mt-6 text-[0.78rem] text-inkg/40 ${MOTION ? 'anim-fade-up d280' : ''} ${inView ? 'in-view' : ''}`}>
          * 의뢰인 보호를 위해 사건 내용은 특정되지 않도록 각색되었습니다.
        </p>
      </div>
    </section>
  )
}

// ─── 상담 ─────────────────────────────────────────────────────────────────────

function Consult() {
  const { ref, inView } = useInView()
  const [topic, setTopic] = useState<string>(SITE.consult.topics[0])
  const [when, setWhen] = useState('')
  const smsBody = `[상담문의] 분야: ${topic} / 희망 시간: ${when || '조율 필요'}`
  return (
    <section id="consult" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-pine text-cream">
      <div className="mx-auto max-w-3xl px-5">
        <Head en="Consultation" title="비밀 상담 문의" inView={inView} light />
        <p className={`-mt-6 mb-10 text-[0.98rem] leading-relaxed text-cream/60 whitespace-pre-line ${MOTION ? 'anim-fade-up d80' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.consult.lead}
        </p>
        <div className={`space-y-7 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-cream/50 mb-2.5">01 · 분야</p>
            <div className="flex flex-wrap gap-2">
              {SITE.consult.topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`px-4 py-2.5 text-[0.88rem] font-bold border ${topic === t ? 'bg-cream text-pine border-cream' : 'border-cream/30 text-cream/60 hover:border-cream/70'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-cream/50 mb-2.5">02 · 희망 상담 시간 (선택)</p>
            <input
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              placeholder="예) 화요일 저녁 7시 이후, 화상 상담"
              className="w-full bg-transparent border-b-2 border-cream/25 px-1 py-3.5 text-[0.98rem] text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-4 text-center bg-cream text-pine text-[0.98rem] font-extrabold hover:bg-inkg hover:text-cream"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              문자로 상담 문의
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex-1 py-4 text-center border-2 border-cream/30 text-[0.98rem] font-bold hover:border-cream"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              전화 {SITE.phone}
            </a>
          </div>
          <p className="text-[0.8rem] text-cream/45">체포 · 구속 등 긴급 상황은 시간과 관계없이 전화 주세요.</p>
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
          <p className="text-[1.1rem] font-extrabold">{SITE.address}</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem] text-inkg/65">
            <li>· {SITE.location.walk}</li>
            <li>· {SITE.location.parking}</li>
            <li>· {SITE.location.landmark}</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2">
            {SITE.hours.map((h) => (
              <p key={h.day} className="text-[0.9rem]">
                <span className="text-inkg/45 mr-2.5">{h.day}</span>
                <span className="nums font-bold">{h.time}</span>
              </p>
            ))}
          </div>
          <a
            href={SITE.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-7 px-6 py-3 border-2 border-inkg/20 text-[0.9rem] font-bold hover:border-pine hover:text-pine"
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
    <footer className="border-t border-inkg/12 py-12 pb-28 md:pb-12 bg-mistg">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[1.15rem] font-extrabold">해원 <span className="text-pine">법률사무소</span></p>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-inkg/45">
            {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="text-[0.78rem] text-inkg/35">본 페이지는 법률 정보 제공이며, 개별 사건에 대한 법률 자문이 아닙니다.</p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t border-inkg/12 bg-cream">
      <a href={`tel:${SITE.phone}`} className="py-4 text-center text-[0.95rem] font-bold">
        전화 상담
      </a>
      <button onClick={() => goTo('#consult')} className="py-4 text-center text-[0.95rem] font-bold bg-pine text-cream">
        비밀 상담
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
    <div className="bg-cream text-inkg">
      <Header active={active} />
      <Hero />
      <Fields />
      <Process />
      <Fees />
      <Lawyers />
      <Faq />
      <Reviews />
      <Consult />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
