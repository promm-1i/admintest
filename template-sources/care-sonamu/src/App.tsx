import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img4 from './images/4.jpg'
import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 보호자 연령대를 고려해 글자를 크게, 대비를 높게 설계했습니다.
// ══════════════════════════════════════════════════════════════════════════════

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

const SITE = {
  name: '소나무집 요양원',
  tagline: '노인전문 요양시설 · 주간보호 · 남양주',
  slogan: '부모님을 모신다는 마음,\n그대로 돌봅니다',
  sloganSub: '국민건강보험공단 장기요양기관 지정 시설입니다. 등급 신청부터 입소까지, 처음이라 막막한 과정을 전화 한 통부터 함께합니다.',

  phone: '031-123-4567',
  smsPhone: '01012345678',

  ceo: '대표 원장 박소나무 (사회복지사 1급)',
  bizNo: '123-45-67890',
  address: '경기도 남양주시 소나무로 123',
  designation: '장기요양기관 지정번호 4-12345678',

  nav: [
    { label: '시설 소개', href: '#about' },
    { label: '비용 안내', href: '#cost' },
    { label: '하루 일과', href: '#daily' },
    { label: '입소 절차', href: '#process' },
    { label: '자주 묻는 질문', href: '#faq' },
    { label: '상담', href: '#consult' },
  ],

  trust: [
    { n: '2016년', label: '개원 · 무사고 운영' },
    { n: '3.2 : 1', label: '어르신 대비 요양보호사' },
    { n: '간호사 상주', label: '주 5일 · 촉탁의 왕진' },
    { n: 'A등급', label: '공단 정기평가' },
  ],

  // 시설 — 여기에 사진 교체
  about: [
    { img: img1, name: '생활실 (2 · 4인실)', desc: '햇빛 드는 남향 생활실, 침대별 개인 수납장과 안전 손잡이' },
    { img: img2, name: '물리치료실', desc: '주 3회 물리치료 · 재활운동 프로그램' },
    { img: img4, name: '프로그램실 · 식당', desc: '인지활동 · 음악 프로그램, 영양사 식단' },
  ],

  // 비용 — 장기요양등급별 본인부담 (시설급여 20% 기준 예시)
  costNote:
    '2026년 장기요양 시설급여 수가 기준 예시이며, 본인부담률(일반 20% · 감경 12%/8% · 기초수급 0%)에 따라 달라집니다. 식재료비 등 비급여는 별도로 서면 안내드립니다.',
  cost: [
    { grade: '1등급', month: '월 약 60만원대', desc: '일반 본인부담 20% 기준' },
    { grade: '2등급', month: '월 약 56만원대', desc: '일반 본인부담 20% 기준' },
    { grade: '3 – 5등급', month: '월 약 52만원대', desc: '시설 입소 가능 여부 상담' },
    { grade: '등급 없음', month: '전액 본인부담', desc: '등급 신청 대행을 도와드립니다' },
  ],
  costExtra: [
    { k: '식재료비 · 간식', v: '월 30만원 내외 (실비)' },
    { k: '상급 침실 (2인실)', v: '월 20만원' },
    { k: '이 · 미용, 병원 동행', v: '실비 · 사전 동의 후 진행' },
  ],

  // 하루 일과
  daily: [
    { t: '07:00', what: '기상 · 세면 도움 · 아침 식사' },
    { t: '09:30', what: '건강 체크 (혈압 · 혈당) · 투약' },
    { t: '10:30', what: '인지활동 프로그램 · 재활운동' },
    { t: '12:00', what: '점심 식사 · 휴식' },
    { t: '14:30', what: '음악 · 미술 · 원예 프로그램' },
    { t: '16:00', what: '간식 · 산책 (날씨 좋은 날)' },
    { t: '18:00', what: '저녁 식사 · 가족 영상통화' },
    { t: '21:00', what: '취침 준비 · 야간 순회 (2시간 간격)' },
  ],

  process: [
    { step: '1', name: '전화 상담', desc: '어르신 상태와 등급 여부를 듣고, 입소 가능 여부와 예상 비용을 바로 안내드립니다.' },
    { step: '2', name: '시설 방문', desc: '생활실과 식단표, 프로그램표를 직접 보십시오. 평일 · 주말 모두 가능합니다.' },
    { step: '3', name: '등급 신청 (필요시)', desc: '공단 등급 신청 서류 준비를 무료로 도와드립니다. 보통 30일 내 결과가 나옵니다.' },
    { step: '4', name: '입소 · 적응 기간', desc: '첫 2주는 적응 기간으로 매일 상태를 보호자께 문자로 알려드립니다.' },
  ],

  faq: [
    { q: '등급이 없어도 입소할 수 있나요?', a: '가능합니다. 다만 비용 부담이 커서, 등급 신청을 먼저 도와드리는 편입니다. 신청부터 결과까지 보통 한 달이 걸립니다.' },
    { q: '면회는 자유롭게 되나요?', a: '매일 10시–19시 면회 가능하며, 예약 없이 오셔도 됩니다. 원하시면 주 1회 영상통화 일정을 잡아드립니다.' },
    { q: '병원 진료가 필요하면 어떻게 하나요?', a: '촉탁의가 격주로 왕진하며, 외래 진료 시 직원이 동행합니다. 응급 시 협력병원으로 즉시 이송하고 보호자께 바로 연락드립니다.' },
    { q: '어르신 상태를 어떻게 알 수 있나요?', a: '매주 생활 사진과 건강 기록을 보호자 단체방으로 보내드리고, 변화가 있으면 그날 바로 전화드립니다.' },
    { q: '주간보호(데이케어)도 하나요?', a: '네. 아침 송영차량으로 모시고 저녁에 댁으로 모셔다드립니다. 재가 등급(1–5등급 · 인지지원등급) 이용 가능합니다.' },
  ],

  reviews: [
    { text: '아버지를 모시고 3년째입니다. 매주 오는 사진 속 표정이 밝아서 마음을 놓습니다. 상태가 조금만 달라져도 먼저 전화를 주세요.', name: '보호자 김O진 님', tag: '입소 3년' },
    { text: '등급 신청부터 다 도와주셨어요. 어디서부터 해야 할지 몰랐는데 서류까지 같이 준비해 주셨습니다.', name: '보호자 이O숙 님', tag: '등급 신청 대행' },
    { text: '어머니가 주간보호 차량 기다리시는 게 하루 낙이 되셨어요. 선생님들이 이름을 다 기억하고 불러주십니다.', name: '보호자 박O철 님', tag: '주간보호' },
  ],

  consult: {
    lead: '어르신 연세와 등급 여부를 보내주시면\n예상 비용과 상담 가능 시간을 문자로 안내드립니다.',
    topics: ['시설 입소', '주간보호', '등급 신청 문의', '비용 문의', '시설 방문 예약'],
  },

  location: {
    car: '수도권제1순환 남양주 IC에서 10분',
    bus: '남양주역 2번 출구 마을버스 5분 · 방문 상담 시 역까지 모시러 갑니다',
    landmark: '소나무 숲이 보이는 3층 벽돌 건물입니다.',
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

function Head({ title, sub, inView }: { title: React.ReactNode; sub?: string; inView: boolean }) {
  return (
    <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
      <h2 className="text-[clamp(1.9rem,4.4vw,2.7rem)] font-extrabold tracking-[-0.02em] leading-tight">{title}</h2>
      {sub && <p className="mt-4 max-w-2xl text-[1.08rem] leading-[1.8] text-bark/65">{sub}</p>}
      <div className={`sage-rule mt-6 h-1.5 w-16 rounded-full bg-sage ${inView ? 'in-view' : ''}`} aria-hidden />
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
      className={`fixed top-0 inset-x-0 z-50 bg-warm/96 ${scrolled ? 'shadow-[0_1px_0_rgba(61,50,41,0.12)]' : ''}`}
      style={{ transition: MOTION ? 'box-shadow 0.25s' : 'none', backdropFilter: 'blur(10px)' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[76px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-center gap-2.5">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-sage text-warm text-[1.1rem]" aria-hidden>🌲</span>
          <span className="text-[1.25rem] font-extrabold tracking-tight">{SITE.name}</span>
        </button>
        <nav className="hidden lg:flex items-center gap-6">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[1rem] font-bold ${active === n.href.slice(1) ? 'text-sage-d' : 'text-bark/65 hover:text-bark'}`}
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <a
          href={`tel:${SITE.phone}`}
          className="nums px-5 py-3 rounded-xl bg-sage-d text-warm text-[1.05rem] font-extrabold hover:bg-bark"
          style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
        >
          {SITE.phone}
        </a>
      </div>
    </header>
  )
}

// ─── 히어로 — 햇살 드는 생활공간 풀블리드 + 전화번호 CTA ──────────────────────

function Hero() {
  return (
    <section className="hero pt-[76px]">
      <div className="hx-fill relative flex items-end overflow-hidden md:items-center">
        {/* 여기에 히어로 사진 교체 — 가로로 넓은 실내 전경이 좋습니다 */}
        <img src={img4} alt="햇살이 드는 소나무집 요양원 프로그램실과 식당" className="hx-photo absolute inset-0 h-full w-full object-cover" />
        <div className="hx-veil absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-9 pt-14 md:py-14">
          <div className="hx-copy">
            <p className={`hx-onphoto inline-block rounded-full border border-warm/35 bg-[rgba(24,17,11,0.42)] px-4 py-2 text-[0.92rem] font-extrabold text-warm ${MOTION ? 'hero-in' : ''}`}>
              {SITE.designation}
            </p>
            <h1
              className={`hx-onphoto mt-6 whitespace-pre-line text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold leading-[1.3] tracking-[-0.03em] text-warm ${MOTION ? 'hero-in d150' : ''}`}
            >
              {SITE.slogan}
            </h1>
            <p className={`hx-onphoto hx-lede mt-5 text-[1.05rem] leading-[1.8] text-warm ${MOTION ? 'hero-in d300' : ''}`}>
              {SITE.sloganSub}
            </p>
            {/* 전화가 가장 큰 요소 — 보호자 세대 최우선 동선 */}
            <div className={`mt-8 ${MOTION ? 'hero-in d450' : ''}`}>
              <span className="relative inline-flex w-full sm:w-auto">
                <span className="hx-halo" aria-hidden />
                <a
                  href={`tel:${SITE.phone}`}
                  className="phone-cta relative flex w-full items-center justify-center gap-3 rounded-2xl bg-sage-d px-5 py-5 text-warm hover:bg-bark sm:w-auto sm:justify-start sm:gap-4 sm:px-9 sm:py-6"
                  style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
                >
                  <span className="whitespace-nowrap text-[1rem] font-bold opacity-90">입소 상담</span>
                  <span className="nums whitespace-nowrap text-[clamp(1.55rem,3.2vw,2.6rem)] font-extrabold tracking-tight">{SITE.phone}</span>
                </a>
              </span>
              <p className="hx-onphoto mt-4 text-[0.95rem] leading-relaxed text-warm">
                평일 · 주말 09:00 – 20:00 · 통화가 어려우시면{' '}
                <button onClick={() => goTo('#consult')} className="font-extrabold text-warm underline underline-offset-4">
                  문자 상담
                </button>
                을 남겨주세요
              </p>
            </div>
          </div>
        </div>
      </div>
      <Trust />
    </section>
  )
}

function Trust() {
  const { ref, inView } = useInView(0.4)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="bg-warm border-y border-bark/10">
      <div className="mx-auto max-w-6xl px-5 grid grid-cols-2 md:grid-cols-4">
        {SITE.trust.map((s, i) => (
          <div key={s.label} className={`py-8 px-4 text-center ${i < SITE.trust.length - 1 ? 'md:border-r border-bark/10' : ''} ${MOTION ? `anim-fade-up d${i * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
            <p className="text-[1.35rem] font-extrabold tracking-tight text-sage-d">{s.n}</p>
            <p className="mt-1 text-[0.95rem] text-bark/60 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── 시설 소개 ────────────────────────────────────────────────────────────────

function About() {
  const { ref, inView } = useInView()
  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head title="시설 둘러보기" sub="사진보다 직접 보시는 게 좋습니다. 방문 상담은 평일 · 주말 모두 가능합니다." inView={inView} />
        <div className="grid md:grid-cols-3 gap-6">
          {SITE.about.map((a, i) => (
            <figure key={a.name} className={`${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="overflow-hidden rounded-2xl">
                {/* 여기에 시설 사진 교체 */}
                <img src={a.img} alt={a.name} className="w-full aspect-[4/3] object-cover" />
              </div>
              <figcaption className="mt-4">
                <p className="text-[1.15rem] font-extrabold">{a.name}</p>
                <p className="mt-1.5 text-[0.98rem] leading-relaxed text-bark/60">{a.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 비용 안내 ────────────────────────────────────────────────────────────────

function Cost() {
  const { ref, inView } = useInView()
  return (
    <section id="cost" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-sage/12">
      <div className="mx-auto max-w-4xl px-5">
        <Head title="비용, 숨기지 않고 안내합니다" sub="등급별 본인부담금 예시입니다. 정확한 금액은 등급과 감경 여부를 확인해 서면으로 드립니다." inView={inView} />
        <div className={`overflow-hidden rounded-2xl border border-bark/12 bg-warm ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.cost.map((c, i) => (
            <div key={c.grade} className={`grid grid-cols-[96px_1fr_auto] items-center gap-4 px-6 py-5 ${i > 0 ? 'border-t border-bark/10' : ''}`}>
              <span className="inline-grid place-items-center rounded-xl bg-sage/18 text-sage-d text-[1.05rem] font-extrabold py-2.5">{c.grade}</span>
              <span className="text-[0.95rem] text-bark/60">{c.desc}</span>
              <span className="nums text-[1.15rem] font-extrabold text-right">{c.month}</span>
            </div>
          ))}
        </div>
        <div className={`mt-5 rounded-2xl bg-warm border border-bark/12 px-6 py-5 ${MOTION ? 'anim-fade-up d200' : ''} ${inView ? 'in-view' : ''}`}>
          <p className="text-[0.95rem] font-extrabold mb-3">비급여 항목 (별도)</p>
          {SITE.costExtra.map((e) => (
            <p key={e.k} className="flex justify-between gap-4 py-1.5 text-[0.95rem]">
              <span className="text-bark/60">{e.k}</span>
              <span className="nums font-bold">{e.v}</span>
            </p>
          ))}
        </div>
        <p className={`mt-5 text-[0.88rem] leading-relaxed text-bark/50 ${MOTION ? 'anim-fade-up d240' : ''} ${inView ? 'in-view' : ''}`}>{SITE.costNote}</p>
      </div>
    </section>
  )
}

// ─── 하루 일과 ────────────────────────────────────────────────────────────────

function Daily() {
  const { ref, inView } = useInView(0.1)
  return (
    <section id="daily" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Head title="어르신의 하루" sub="매일 같은 리듬이 어르신을 안정시킵니다. 프로그램표는 매달 보호자께 보내드립니다." inView={inView} />
        <ol className="relative">
          <span className={`dline absolute left-[52px] top-2 bottom-2 w-[3px] rounded bg-sage/35 ${inView ? 'in-view' : ''}`} aria-hidden />
          {SITE.daily.map((d, i) => (
            <li key={d.t} className={`relative flex items-center gap-7 py-3.5 ${MOTION ? `anim-fade-up d${(i % 4) * 70 + 70}` : ''} ${inView ? 'in-view' : ''}`}>
              <span className="nums relative z-10 w-[104px] shrink-0 rounded-full bg-sage-d text-warm text-center py-2 text-[0.98rem] font-extrabold">{d.t}</span>
              <p className="text-[1.05rem] font-semibold">{d.what}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ─── 입소 절차 ────────────────────────────────────────────────────────────────

function Process() {
  const { ref, inView } = useInView()
  return (
    <section id="process" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-sage/12">
      <div className="mx-auto max-w-6xl px-5">
        <Head title="입소까지 네 걸음" inView={inView} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SITE.process.map((p, i) => (
            <div key={p.step} className={`rounded-2xl bg-warm border border-bark/12 p-7 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <span className="grid place-items-center w-10 h-10 rounded-full bg-sage/20 text-sage-d text-[1.1rem] font-extrabold">{p.step}</span>
              <h3 className="mt-4 text-[1.15rem] font-extrabold">{p.name}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-bark/60">{p.desc}</p>
            </div>
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
        <Head title="보호자님들이 자주 묻습니다" inView={inView} />
        <div className={`border-t-2 border-bark/15 ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.faq.map((g, i) => (
            <div key={g.q} className="border-b border-bark/10">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full py-5 flex items-center justify-between text-left gap-4">
                <span className="text-[1.08rem] font-extrabold">{g.q}</span>
                <span className={`text-sage-d text-[1.4rem] leading-none shrink-0 ${MOTION ? 'transition-transform duration-300' : ''} ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div className={`overflow-hidden ${MOTION ? 'transition-[max-height,opacity] duration-400' : ''} ${open === i ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="pb-5 text-[1rem] leading-[1.8] text-bark/65">{g.a}</p>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-sage/12">
      <div className="mx-auto max-w-6xl px-5">
        <Head title="보호자님의 말" inView={inView} />
        <div className="grid md:grid-cols-3 gap-6">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`rounded-2xl bg-warm border border-bark/12 p-7 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[1rem] leading-[1.8] text-bark/75">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between gap-2">
                <span className="text-[0.95rem] font-extrabold">{r.name}</span>
                <span className="text-[0.82rem] font-bold text-sage-d shrink-0">{r.tag}</span>
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
  const [info, setInfo] = useState('')
  const smsBody = `[상담문의] 항목: ${topic} / 어르신 정보: ${info || '전화로 말씀드릴게요'}`
  return (
    <section id="consult" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-bark text-warm">
      <div className="mx-auto max-w-3xl px-5">
        <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
          <h2 className="text-[clamp(1.9rem,4.4vw,2.7rem)] font-extrabold tracking-[-0.02em]">상담 문의</h2>
          <p className="mt-4 max-w-2xl text-[1.08rem] leading-[1.8] text-warm/65 whitespace-pre-line">{SITE.consult.lead}</p>
        </div>
        <div className={`space-y-8 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <div>
            <p className="text-[0.95rem] font-extrabold text-warm/55 mb-3">1 · 어떤 상담이신가요</p>
            <div className="flex flex-wrap gap-2.5">
              {SITE.consult.topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`px-5 py-3 rounded-xl text-[0.98rem] font-extrabold ${topic === t ? 'bg-sage text-bark' : 'bg-warm/10 text-warm/65 hover:bg-warm/20'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.95rem] font-extrabold text-warm/55 mb-3">2 · 어르신 정보 (선택)</p>
            <input
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="예) 83세 어머니, 3등급, 거동 도움 필요"
              className="w-full bg-transparent border-b-2 border-warm/30 px-1 py-4 text-[1.05rem] text-warm placeholder:text-warm/35 focus:outline-none focus:border-sage"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-5 rounded-xl text-center bg-sage text-bark text-[1.1rem] font-extrabold hover:bg-warm"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              문자로 상담 남기기
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex-1 py-5 rounded-xl text-center border-2 border-warm/30 text-[1.1rem] font-extrabold hover:border-sage hover:text-sage"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              전화 {SITE.phone}
            </a>
          </div>
          <p className="text-[0.9rem] text-warm/50">밤 시간에 남기신 문자는 다음 날 아침 가장 먼저 연락드립니다.</p>
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
        <Head title="찾아오시는 길" inView={inView} />
        <div className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <p className="text-[1.2rem] font-extrabold">{SITE.address}</p>
          <ul className="mt-5 space-y-3 text-[1.02rem] text-bark/65">
            <li>· {SITE.location.car}</li>
            <li>· {SITE.location.bus}</li>
            <li>· {SITE.location.landmark}</li>
          </ul>
          <a
            href={SITE.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-7 px-7 py-3.5 rounded-xl border-2 border-bark/20 text-[1rem] font-extrabold hover:border-sage-d hover:text-sage-d"
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
    <footer className="border-t border-bark/10 py-12 pb-32 md:pb-12 bg-sage/12">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[1.2rem] font-extrabold">🌲 {SITE.name}</p>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-bark/50">
            {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
            <br />
            {SITE.designation}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="text-[0.85rem] text-bark/40">비용 안내는 공단 고시 수가 기준 예시입니다.</p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t border-bark/12 bg-warm">
      <a href={`tel:${SITE.phone}`} className="py-5 text-center text-[1.05rem] font-extrabold bg-sage-d text-warm">
        전화 상담
      </a>
      <button onClick={() => goTo('#consult')} className="py-5 text-center text-[1.05rem] font-extrabold">
        문자 상담
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
    <div className="bg-warm text-bark text-[17px]">
      <Header active={active} />
      <Hero />
      <About />
      <Cost />
      <Daily />
      <Process />
      <Faq />
      <Reviews />
      <Consult />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
