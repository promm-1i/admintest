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
  // 여기에 정비소 기본 정보 교체
  name: '모터웍스',
  nameEn: 'MOTORWORKS',
  tagline: '수입 · 국산 정비공작소 · 성수',
  slogan: '견적 승인 전에는,\n볼트 하나 풀지 않습니다',
  sloganSub:
    '진단 결과와 견적서를 사진과 함께 먼저 보내드립니다. 승인하신 작업만 진행하고, 교환한 부품은 전부 돌려드립니다.',

  // 여기에 연락처 교체
  phone: '02-1234-5678',
  smsPhone: '01012345678',
  kakaoId: '@모터웍스',

  // 여기에 사업자 정보 교체
  ceo: '대표 정비사 강모터',
  bizNo: '123-45-67890',
  address: '서울특별시 성동구 성수일로 123',

  hours: [
    { day: '평일', time: '08:30 – 19:00' },
    { day: '토요일', time: '08:30 – 15:00' },
    { day: '일 · 공휴일', time: '정기 휴무' },
  ],

  // 여기에 히어로 사진 교체
  heroPhoto: img1,

  nav: [
    { label: '정비 안내', href: '#services' },
    { label: '공임표', href: '#labor' },
    { label: '오일 패키지', href: '#oil' },
    { label: '작업 과정', href: '#process' },
    { label: '정비사', href: '#mechanic' },
    { label: '예약', href: '#reserve' },
  ],

  facts: [
    { n: '21년', label: '정비 경력' },
    { n: '1급', label: '자동차정비 기능장' },
    { n: '6개월', label: '정비 보증' },
    { n: '100%', label: '교환 부품 반환' },
  ],

  services: [
    { name: '엔진오일 · 소모품', desc: '오일 · 필터 · 브레이크패드 · 배터리. 규격품과 순정품 중 선택하실 수 있습니다.' },
    { name: '하체 · 서스펜션', desc: '소음 · 쏠림 진단, 로워암 · 쇼바 교환, 얼라인먼트까지 한번에.' },
    { name: '브레이크 시스템', desc: '패드 · 디스크 · 라이닝 교환. 제동 이상은 당일 우선 점검합니다.' },
    { name: '엔진 · 미션 정밀 진단', desc: '스캐너 + 실차 주행 진단으로 원인을 좁힌 뒤 견적을 드립니다.' },
    { name: '수입차 정비', desc: '벤츠 · BMW · 아우디 전용 진단기 보유. 공식센터 견적과 비교해 보세요.' },
    { name: '사고 수리 연계', desc: '판금 · 도색은 검증된 협력 공장과 연계하고, 저희가 품질을 확인합니다.' },
  ],

  // 공임표 — 부품비 별도 명시
  laborNote: '부품비 별도 · 부가세 포함 공임 기준입니다. 차종과 상태에 따라 달라질 수 있으며, 작업 전 확정 견적을 드립니다.',
  labor: [
    { name: '엔진오일 교환', time: '30분', price: '20,000원', note: '오일값 별도' },
    { name: '브레이크패드 교환 (앞)', time: '40분', price: '40,000원', note: '패드값 별도' },
    { name: '배터리 교환', time: '20분', price: '10,000원', note: '배터리값 별도' },
    { name: '점화플러그 교환', time: '60분~', price: '60,000원~', note: '4기통 기준' },
    { name: '로워암 교환 (편측)', time: '60분', price: '70,000원', note: '얼라인먼트 별도' },
    { name: '얼라인먼트', time: '40분', price: '50,000원', note: '수입차 +20,000원' },
    { name: '냉각수 순환 교환', time: '50분', price: '50,000원', note: '냉각수 포함' },
    { name: '정밀 진단 (스캐너)', time: '30분', price: '30,000원', note: '정비 진행 시 무료' },
  ],

  // 엔진오일 패키지
  oilNote: '오일 + 오일필터 + 에어필터 점검 + 하체 무상 점검 포함 · 부가세 포함',
  oil: [
    { grade: '스탠다드', spec: '규격 합성유 5W-30', target: '국산 승용 기준', price: '77,000원', hot: false },
    { grade: '프리미엄', spec: '100% 합성유 (모빌1 · 킥스파오)', target: '국산 · 수입 승용', price: '110,000원', hot: true },
    { grade: '수입차 전용', spec: '제조사 승인유 (MB · LL 규격)', target: '벤츠 · BMW · 아우디', price: '165,000원~', hot: false },
  ],

  process: [
    { step: '01', name: '접수 · 증상 청취', desc: '언제, 어떤 상황에서 증상이 나타나는지부터 듣습니다.' },
    { step: '02', name: '진단 · 사진 공유', desc: '리프트에 올려 확인하고, 문제 부위 사진을 바로 보내드립니다.' },
    { step: '03', name: '견적 승인', desc: '부품비와 공임을 나눠 적은 견적서를 승인하신 뒤에만 작업합니다.' },
    { step: '04', name: '정비 · 출고', desc: '작업 내역과 교환 부품을 함께 확인하고 출고합니다. 보증 6개월.' },
  ],

  // 정비사 — 여기에 프로필 사진 교체
  mechanic: {
    img: img2,
    name: '강모터',
    role: '대표 정비사 · 자동차정비 기능장',
    career: [
      '자동차정비 기능장 (국가기술자격 1급)',
      '전 수입차 공식서비스센터 테크니션 9년',
      '성수동 자가 공장 운영 12년',
      '벤츠 · BMW 전용 진단기 보유',
    ],
    words: '정비는 고장난 데를 고치는 일이 아니라, 왜 고장났는지 찾는 일입니다. 원인을 못 찾으면 같은 수리를 반복하게 됩니다.',
  },

  // 작업장 — 여기에 사진 교체
  shopPhotos: [
    { img: img3, label: '리프트 3기 · 진단 베이' },
    { img: img4, label: '공구 · 부품 보관실' },
  ],

  reviews: [
    { text: '다른 데서 미션 교환하라던 차를 여기서 센서 하나로 잡았습니다. 30만 원으로 끝났어요. 원인을 찾는 집이라는 말이 맞습니다.', name: '김O진 · 그랜저', tag: '정밀 진단' },
    { text: '견적서에 부품값이랑 공임이 따로 적혀 나오니까 비교가 됩니다. 교환한 부품도 박스에 담아 트렁크에 넣어주네요.', name: '이O호 · BMW 520d', tag: '하체 정비' },
    { text: '단골 된 지 5년. 필요 없는 정비는 다음에 하자고 먼저 말려주는 곳입니다.', name: '박O선 · 카니발', tag: '소모품 관리' },
  ],

  reserve: {
    lead: '차종과 증상을 보내주시면\n예약 가능한 시간과 예상 소요를 문자로 안내드립니다.',
    options: ['엔진오일 · 소모품', '소음 · 진동 진단', '브레이크', '하체 · 얼라인먼트', '수입차 정비'],
  },

  location: {
    walk: '성수역 3번 출구 · 도보 7분',
    parking: '공장 앞 대기 주차 4대 · 출고 대기 시 인근 카페 이용권 제공',
    landmark: '주황색 셔터가 보이는 단층 공장입니다.',
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

function Head({ en, title, sub, inView, dark }: { en: string; title: React.ReactNode; sub?: string; inView: boolean; dark?: boolean }) {
  return (
    <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
      <p className="inline-flex items-center gap-2.5 text-[0.75rem] tracking-[0.3em] uppercase font-extrabold text-safety">
        <span className="hazard-chip" aria-hidden />
        {en}
      </p>
      <h2 className="mt-4 text-[clamp(1.75rem,4.2vw,2.6rem)] font-extrabold tracking-[-0.03em] leading-tight uppercase">{title}</h2>
      {sub && <p className={`mt-4 max-w-xl text-[0.98rem] leading-relaxed ${dark ? 'text-concrete/60' : 'text-steel/60'}`}>{sub}</p>}
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
      className={`fixed top-0 inset-x-0 z-50 bg-concrete/95 ${scrolled ? 'shadow-[0_1px_0_rgba(26,28,30,0.15)]' : ''}`}
      style={{ transition: MOTION ? 'box-shadow 0.25s' : 'none', backdropFilter: 'blur(10px)' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[70px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-center gap-2.5">
          <span className="grid place-items-center w-8 h-8 bg-safety text-steel font-extrabold text-[0.95rem]" aria-hidden>
            M
          </span>
          <span className="text-[1.12rem] font-extrabold tracking-tight uppercase">{SITE.nameEn}</span>
          <span className="hidden sm:inline text-[0.7rem] text-steel/50 ml-1">{SITE.tagline}</span>
        </button>
        <nav className="hidden lg:flex items-center gap-6">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[0.88rem] font-bold ${active === n.href.slice(1) ? 'text-safety-d' : 'text-steel/65 hover:text-steel'}`}
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
        <a
          href={`tel:${SITE.phone}`}
          className="nums px-5 py-2.5 bg-steel text-concrete text-[0.875rem] font-extrabold hover:bg-safety-d"
          style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
        >
          {SITE.phone}
        </a>
          {/* 1024px 미만 — 내비를 접고 햄버거로 연다. 768~1023 에서 내비가 두 줄로 눌리던 것을 막는다 */}
          <button className="lg:hidden p-2 -mr-2 text-steel" aria-label="메뉴" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span className="block w-6 space-y-1.5">
              <span className="block h-0.5 bg-current" />
              <span className={`block h-0.5 bg-current ${open ? 'opacity-0' : ''}`} />
              <span className="block h-0.5 bg-current" />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-steel/15 bg-concrete px-5 py-2">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => { setOpen(false); goTo(n.href) }}
              className="block w-full text-left py-3.5 text-[1rem] font-semibold text-steel border-b border-steel/10 last:border-0"
            >
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

// ─── 히어로 — [layer] 리프트에 올린 차가 텍스트 뒤로 파고들어 화면 밖으로 흘러나간다 ──

function Hero() {
  return (
    <section className="hero hx-hero pt-[70px]">
      <div className="hx-bay">
        <div className="hx-bay-copy mx-auto max-w-6xl px-5">
          <p className={`hx-eyebrow ${MOTION ? 'hero-in' : ''}`}>
            <span className="hazard-chip" aria-hidden />
            NO APPROVAL, NO WORK
          </p>
          <h1 className={`hx-title ${MOTION ? 'hero-in d150' : ''}`}>{SITE.slogan}</h1>
          <p className={`hx-sub ${MOTION ? 'hero-in d300' : ''}`}>{SITE.sloganSub}</p>
          <div className={`hx-actions ${MOTION ? 'hero-in d450' : ''}`}>
            <a
              href="#reserve"
              onClick={(e) => {
                e.preventDefault()
                goTo('#reserve')
              }}
              className="hx-cta"
            >
              정비 예약하기
            </a>
            <a
              href="#labor"
              onClick={(e) => {
                e.preventDefault()
                goTo('#labor')
              }}
              className="hx-cta-ghost"
            >
              공임표 보기
            </a>
          </div>
          <p className={`hx-meta nums ${MOTION ? 'hero-in d450' : ''}`}>
            <a href={`tel:${SITE.phone}`} className="hx-meta-tel">
              {SITE.phone}
            </a>
            {` · ${SITE.location.walk} · `}
            <span className="hx-nowrap">{`${SITE.hours[0].day} ${SITE.hours[0].time}`}</span>
          </p>
        </div>

        <div className={`hx-photo ${MOTION ? 'hx-photo-in' : ''}`}>
          {/* 여기에 히어로 사진 교체 */}
          <img
            src={SITE.heroPhoto}
            alt="리프트에 올린 차량 하체를 점검하는 모터웍스 정비사"
            className="hx-photo-img"
          />
          <span className="hx-photo-veil" aria-hidden />
        </div>

        <span className="hx-floorline" aria-hidden>
          <span className={`hx-tape ${MOTION ? 'hx-tape-run' : ''}`} />
        </span>
      </div>

      <div className="hx-rail">
        <div className="mx-auto max-w-6xl px-5 hx-rail-grid">
          {SITE.facts.map((f) => (
            <div key={f.label} className="hx-fact">
              <p className="nums hx-fact-n">{f.n}</p>
              <p className="hx-fact-l">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 마퀴 밴드 — 인더스트리얼 시그니처 ───────────────────────────────────────

const MARQUEE = 'OIL CHANGE · BRAKE · SUSPENSION · DIAGNOSTICS · ALIGNMENT · IMPORTED CARS · '

function Marquee() {
  return (
    <div className="overflow-hidden border-y-2 border-steel bg-steel py-3 select-none" aria-hidden>
      <div className={`whitespace-nowrap text-[0.95rem] font-extrabold tracking-[0.25em] text-concrete/70 ${MOTION ? 'marquee' : ''}`}>
        <span>{MARQUEE.repeat(4)}</span>
        <span>{MARQUEE.repeat(4)}</span>
      </div>
    </div>
  )
}

// ─── 정비 안내 ────────────────────────────────────────────────────────────────

function Services() {
  const { ref, inView } = useInView()
  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Services" title="정비 안내" inView={inView} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SITE.services.map((sv, i) => (
            <article
              key={sv.name}
              className={`svc p-7 border-2 border-steel/12 bg-white ${MOTION ? `anim-fade-up d${(i % 3) * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}
            >
              <h3 className="text-[1.12rem] font-extrabold">{sv.name}</h3>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-steel/60">{sv.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 공임표 ───────────────────────────────────────────────────────────────────

function Labor() {
  const { ref, inView } = useInView()
  return (
    <section id="labor" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-steel text-concrete">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="Labor Price" title="공임표" sub="부품비와 공임을 분리해서 안내합니다 — 견적서를 다른 곳과 비교해 보세요." inView={inView} dark />
        <div className={`overflow-x-auto ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <table className="w-full min-w-[540px] border-collapse">
            <thead>
              <tr className="border-b-2 border-safety text-left">
                <th className="py-3.5 pr-4 text-[0.82rem] font-extrabold tracking-wide text-safety uppercase">작업 항목</th>
                <th className="py-3.5 pr-4 text-[0.82rem] font-extrabold tracking-wide text-safety uppercase">소요</th>
                <th className="py-3.5 pr-4 text-[0.82rem] font-extrabold tracking-wide text-safety uppercase text-right">공임</th>
                <th className="py-3.5 text-[0.82rem] font-extrabold tracking-wide text-safety uppercase text-right">비고</th>
              </tr>
            </thead>
            <tbody>
              {SITE.labor.map((f) => (
                <tr key={f.name} className="border-b border-concrete/12">
                  <td className="py-4 pr-4 text-[0.95rem] font-bold">{f.name}</td>
                  <td className="nums py-4 pr-4 text-[0.85rem] text-concrete/60">{f.time}</td>
                  <td className="nums py-4 pr-4 text-[0.98rem] font-extrabold text-right whitespace-nowrap">{f.price}</td>
                  <td className="py-4 text-[0.8rem] text-concrete/50 text-right whitespace-nowrap">{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={`mt-5 text-[0.82rem] text-concrete/50 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>{SITE.laborNote}</p>
      </div>
    </section>
  )
}

// ─── 오일 패키지 ──────────────────────────────────────────────────────────────

function Oil() {
  const { ref, inView } = useInView()
  return (
    <section id="oil" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Oil Package" title="엔진오일 패키지" sub={SITE.oilNote} inView={inView} />
        <div className="grid md:grid-cols-3 gap-4">
          {SITE.oil.map((o, i) => (
            <article
              key={o.grade}
              className={`relative p-8 border-2 ${o.hot ? 'border-safety bg-safety/8 oil-hot' : 'border-steel/12 bg-white'} ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}
            >
              {o.hot && <span className="absolute -top-3 left-7 bg-safety text-steel text-[0.7rem] font-extrabold tracking-[0.15em] px-3 py-1 uppercase">Best</span>}
              <h3 className="text-[1.25rem] font-extrabold uppercase">{o.grade}</h3>
              <p className="mt-1.5 text-[0.88rem] font-bold text-steel/70">{o.spec}</p>
              <p className="mt-0.5 text-[0.8rem] text-steel/50">{o.target}</p>
              <p className="nums mt-6 text-[1.8rem] font-extrabold">{o.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 작업 과정 ────────────────────────────────────────────────────────────────

function Process() {
  const { ref, inView } = useInView()
  return (
    <section id="process" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-fog">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Work Order" title="작업은 이렇게 진행됩니다" inView={inView} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SITE.process.map((p, i) => (
            <div key={p.step} className={`relative p-7 bg-white border-2 border-steel/12 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <span className="nums text-[2rem] font-extrabold text-safety leading-none">{p.step}</span>
              <h3 className="mt-4 text-[1.05rem] font-extrabold">{p.name}</h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-steel/60">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 정비사 소개 ──────────────────────────────────────────────────────────────

function Mechanic() {
  const { ref, inView } = useInView()
  const m = SITE.mechanic
  return (
    <section id="mechanic" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 grid md:grid-cols-[0.8fr_1fr] gap-10 items-center">
        <div className={`${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
          {/* 여기에 정비사 프로필 사진 교체 */}
          <img src={m.img} alt={m.name} className="w-full aspect-[4/5] object-cover" />
        </div>
        <div className={`${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <Head en="Mechanic" title={`${m.name} 기능장`} inView={inView} />
          <blockquote className="-mt-4 border-l-[3px] border-safety pl-5 text-[1.02rem] leading-relaxed text-steel/80">{m.words}</blockquote>
          <ul className="mt-7 space-y-1.5">
            {m.career.map((l) => (
              <li key={l} className="text-[0.88rem] text-steel/65 flex gap-2.5 font-medium">
                <span className="text-safety-d font-extrabold">·</span>
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-5 mt-10 grid sm:grid-cols-2 gap-4">
        {SITE.shopPhotos.map((o, i) => (
          <figure key={o.label} className={`${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
            {/* 여기에 작업장 사진 교체 */}
            <img src={o.img} alt={o.label} className="w-full aspect-[16/9] object-cover" />
            <figcaption className="mt-2.5 text-[0.85rem] font-bold text-steel/60">{o.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

// ─── 후기 ─────────────────────────────────────────────────────────────────────

function Reviews() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-fog">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Reviews" title="차주들의 기록" inView={inView} />
        <div className="grid md:grid-cols-3 gap-4">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`p-7 bg-white border-2 border-steel/12 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[0.94rem] leading-relaxed text-steel/75">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between gap-2">
                <span className="text-[0.85rem] font-extrabold">{r.name}</span>
                <span className="text-[0.76rem] font-extrabold text-safety-d shrink-0 uppercase">{r.tag}</span>
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
  const [car, setCar] = useState('')
  const smsBody = `[정비예약] 항목: ${opt} / 차종·증상: ${car || '상담 후 안내'}`
  return (
    <section id="reserve" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-steel text-concrete relative overflow-hidden">
      <span className="hazard-band absolute top-0 left-0 right-0 h-3" aria-hidden />
      <div className="mx-auto max-w-3xl px-5">
        <Head en="Booking" title="정비 예약" inView={inView} dark />
        <p className={`-mt-6 mb-10 text-[0.98rem] leading-relaxed text-concrete/60 whitespace-pre-line ${MOTION ? 'anim-fade-up d80' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.reserve.lead}
        </p>
        <div className={`space-y-7 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <div>
            <p className="text-[0.82rem] font-extrabold tracking-wide text-concrete/50 mb-2.5 uppercase">01 · 정비 항목</p>
            <div className="flex flex-wrap gap-2">
              {SITE.reserve.options.map((s) => (
                <button
                  key={s}
                  onClick={() => setOpt(s)}
                  className={`px-4 py-2.5 text-[0.88rem] font-extrabold border-2 ${opt === s ? 'bg-safety text-steel border-safety' : 'border-concrete/25 text-concrete/60 hover:border-concrete/60'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.82rem] font-extrabold tracking-wide text-concrete/50 mb-2.5 uppercase">02 · 차종 · 증상 (선택)</p>
            <input
              value={car}
              onChange={(e) => setCar(e.target.value)}
              placeholder="예) 2019 쏘렌토, 시동 시 덜덜거림"
              className="w-full bg-transparent border-b-2 border-concrete/25 px-1 py-3.5 text-[0.98rem] text-concrete placeholder:text-concrete/30 focus:outline-none focus:border-safety"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-4 text-center bg-safety text-steel text-[0.98rem] font-extrabold hover:bg-concrete"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              문자로 예약 문의
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex-1 py-4 text-center border-2 border-concrete/25 text-[0.98rem] font-extrabold hover:border-safety hover:text-safety"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              전화 {SITE.phone}
            </a>
          </div>
          <p className="text-[0.8rem] text-concrete/45">주행 중 경고등 · 브레이크 이상은 예약 없이 바로 오세요. 우선 점검해 드립니다.</p>
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
        <Head en="Access" title="찾아오시는 길" inView={inView} />
        <div className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <p className="text-[1.1rem] font-extrabold">{SITE.address}</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem] text-steel/65">
            <li>· {SITE.location.walk}</li>
            <li>· {SITE.location.parking}</li>
            <li>· {SITE.location.landmark}</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2">
            {SITE.hours.map((h) => (
              <p key={h.day} className="text-[0.9rem]">
                <span className="text-steel/45 mr-2.5">{h.day}</span>
                <span className="nums font-extrabold">{h.time}</span>
              </p>
            ))}
          </div>
          <a
            href={SITE.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-7 px-6 py-3 border-2 border-steel/20 text-[0.9rem] font-extrabold hover:border-safety-d hover:text-safety-d"
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
    <footer className="border-t-2 border-steel/12 py-12 pb-28 md:pb-12 bg-fog">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[1.1rem] font-extrabold uppercase">
            <span className="inline-grid place-items-center w-7 h-7 bg-safety text-steel text-[0.8rem] mr-2 align-middle">M</span>
            {SITE.nameEn}
          </p>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-steel/45">
            {SITE.name} · {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="text-[0.78rem] text-steel/35">자동차관리법에 따른 등록 정비사업자 · 정비 이력은 전산으로 보관됩니다.</p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t-2 border-steel/12 bg-concrete">
      <a href={`tel:${SITE.phone}`} className="py-4 text-center text-[0.95rem] font-extrabold">
        전화 문의
      </a>
      <button onClick={() => goTo('#reserve')} className="py-4 text-center text-[0.95rem] font-extrabold bg-safety text-steel">
        정비 예약
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
    <div className="bg-concrete text-steel">
      <Header active={active} />
      <Hero />
      <Marquee />
      <Services />
      <Labor />
      <Oil />
      <Process />
      <Mechanic />
      <Reviews />
      <Reserve />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
