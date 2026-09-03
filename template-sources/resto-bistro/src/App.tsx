import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

/* 이미지 — src/images/ 안의 파일을 같은 이름으로 덮어쓰면 그대로 반영됩니다 */
import heroImg from './images/hero.jpg'
import spaceImg1 from './images/space-1.jpg'
import spaceImg2 from './images/space-2.jpg'
import spaceImg3 from './images/space-3.jpg'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

const SITE = {
  // 여기에 가게 기본 정보 교체
  name: '소반',
  nameEn: 'SOBAN',
  tagline: '한식 다이닝 · 합정',
  slogan: '오늘 지은 밥,\n오늘 끓인 국',
  sloganSub: '육수는 매일 아침 새로 냅니다. 좋은 재료를 눈앞에서 정직하게 — 그게 소반의 전부입니다.',

  // 여기에 연락처 교체
  phone: '02-1234-5678',
  kakaoId: '@소반합정',
  kakaoUrl: 'https://pf.kakao.com/_xxxxxs',
  instagram: '@soban_hapjeong',

  // 여기에 사업자 정보 교체
  ceo: '대표 김소반',
  bizNo: '123-45-67890',
  address: '서울특별시 마포구 독막로 123, 1층',

  // 영업시간 — 실시간 '영업중' 배지가 이 데이터로 계산됩니다
  openHours: {
    lunch: '11:30 – 15:00',
    dinner: '17:00 – 21:30',
    lastOrder: '라스트오더 20:40',
    breakNote: '브레이크 15:00 – 17:00',
    closed: '월요일 정기 휴무',
    closedDay: 1, // 0=일 … 6=토
  },

  // 여기에 히어로 사진 교체
  heroPhoto: heroImg,

  // 여기에 네비게이션 교체
  nav: [
    { label: '오늘의 추천', href: '#today' },
    { label: '메뉴', href: '#menu' },
    { label: '공간', href: '#space' },
    { label: '예약', href: '#reserve' },
    { label: '오시는 길', href: '#location' },
  ],

  // 오늘의 추천 (3개)
  today: [
    { name: '제주 딱새우 솥밥', desc: '주문 즉시 짓는 1인 솥밥, 딱새우 장 비빔', price: '18,000' },
    { name: '한우 차돌 된장술밥', desc: '이틀 숙성 집된장, 차돌박이 구이 올림', price: '16,000' },
    { name: '계절 나물 반상', desc: '아침 장 본 나물 다섯 가지, 들기름 향', price: '13,000' },
  ],

  // 메뉴판 — 카테고리 탭
  menuTabs: ['식사', '안주', '디저트', '음료'] as const,
  menu: {
    식사: [
      { name: '딱새우 솥밥', desc: '제주 딱새우 · 버터 간장', price: '18,000', star: true },
      { name: '차돌 된장술밥', desc: '이틀 숙성 집된장', price: '16,000', star: true },
      { name: '계절 나물 반상', desc: '나물 다섯 가지 · 국 포함', price: '13,000', star: false },
      { name: '들기름 막국수', desc: '메밀 100% · 김가루', price: '11,000', star: false },
      { name: '소반 육개장', desc: '양지 결대로 찢어 하루 끓임', price: '12,000', star: false },
    ],
    안주: [
      { name: '수육 한 접시', desc: '삼겹 수육 · 새우젓 · 배추겉절이', price: '26,000', star: true },
      { name: '파전과 명이', desc: '쪽파 가득 · 명이나물 곁들임', price: '18,000', star: false },
      { name: '두부구이 강된장', desc: '손두부 · 제철 쌈채소', price: '15,000', star: false },
      { name: '황태포 구이', desc: '들기름 발라 구움 · 마요 간장', price: '14,000', star: false },
    ],
    디저트: [
      { name: '흑임자 아이스크림', desc: '직접 볶은 흑임자', price: '6,000', star: false },
      { name: '수정과 셔벗', desc: '계피 · 곶감 조림 올림', price: '6,500', star: false },
      { name: '인절미 브륄레', desc: '겉은 바삭, 속은 쫀득', price: '7,500', star: true },
    ],
    음료: [
      { name: '소반 하이볼', desc: '유자청 · 위스키', price: '9,000', star: true },
      { name: '막걸리 (지평)', desc: '차게 보관', price: '8,000', star: false },
      { name: '제주 감귤 에이드', desc: '생과일 착즙', price: '6,500', star: false },
      { name: '보리숭늉 (무료)', desc: '식사 주문 시', price: '0', star: false },
    ],
  },
  menuNote: '* 템플릿 예시 메뉴입니다. 실제 메뉴와 가격으로 교체하세요. 재료 소진 시 조기 마감될 수 있습니다.',

  // 여기에 공간 사진 교체
  space: [
    { photo: spaceImg1, label: '홀 · 12석' },
    { photo: spaceImg2, label: '창가 2인석' },
    { photo: spaceImg3, label: '단체 룸 · 8석' },
  ],

  // 철학 한 단락
  philosophy: '냉동고를 반으로 줄였습니다. 그날 쓸 만큼만 사고, 남으면 직원 밥상에 올립니다. 메뉴가 자주 바뀌는 건 그 때문입니다 — 재료가 메뉴를 정합니다.',

  // 예약 안내
  reserve: {
    note: '4인 이상 · 단체 룸은 예약을 권장합니다. 노쇼 방지를 위해 6인 이상은 예약금 1만원/인을 받고, 방문 시 전액 차감됩니다.',
    walkIn: '2인 이하는 예약 없이 오셔도 됩니다.',
  },

  // 후기
  reviews: [
    { text: '솥밥이 나오는 15분이 아깝지 않아요. 누룽지까지 긁어먹고 나면 예약해서 또 오게 됩니다.', author: '네이버 방문자 리뷰', tag: '딱새우 솥밥' },
    { text: '혼밥으로 갔는데 반상 하나가 정갈해서 대접받는 기분이었습니다. 나물이 계속 바뀌는 것도 좋아요.', author: '카카오맵 리뷰', tag: '계절 나물 반상' },
    { text: '회식 2차로 룸 썼는데 수육이랑 하이볼 조합이 미쳤습니다. 시끄럽지 않아서 이야기하기 좋아요.', author: '구글 리뷰', tag: '단체 룸' },
  ],

  // 오시는 길
  location: {
    subway: '2·6호선 합정역 7번 출구 도보 5분',
    parking: '전용 주차 없음 · 인근 공영주차장 2분 (주차권 미제공)',
    landmark: '독막로 골목 안, 붉은 벽돌 건물 1층',
  },
} as const

// ══════════════════════════════════════════════════════════════════════════════
// 훅 · 공통
// ══════════════════════════════════════════════════════════════════════════════

function useInView(threshold = 0.1) {
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

function goTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })
}

/* 지금 영업중인지 — openHours 를 현재 시각과 대조 */
function openStatus(): { label: string; on: boolean } {
  const now = new Date()
  if (now.getDay() === SITE.openHours.closedDay) return { label: '오늘 휴무', on: false }
  const cur = now.getHours() * 60 + now.getMinutes()
  const parse = (r: string) => {
    const m = r.match(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/)
    return m ? { s: +m[1] * 60 + +m[2], e: +m[3] * 60 + +m[4] } : null
  }
  const lunch = parse(SITE.openHours.lunch)
  const dinner = parse(SITE.openHours.dinner)
  if (lunch && cur >= lunch.s && cur < lunch.e) return { label: '영업중 · 점심', on: true }
  if (dinner && cur >= dinner.s && cur < dinner.e) return { label: '영업중 · 저녁', on: true }
  if (lunch && dinner && cur >= lunch.e && cur < dinner.s) return { label: '브레이크타임', on: false }
  if (lunch && cur < lunch.s) return { label: '오픈 전', on: false }
  return { label: '영업 종료', on: false }
}

const won = (p: string) => (p === '0' ? '무료' : p)

/* 섹션 머리 */
function Head({ title, sub, inView }: { title: React.ReactNode; sub?: string; inView: boolean }) {
  return (
    <div className={`anim-fade-up ${inView ? 'in-view' : ''} mb-12 md:mb-14 text-center`}>
      <h2 className="f-serif text-[1.9rem] md:text-[2.6rem] leading-[1.25]">{title}</h2>
      <div className="mx-auto mt-4 w-10 border-b-2 border-tomato" aria-hidden="true" />
      {sub && <p className="mt-5 text-[0.9375rem] text-ink-55 leading-[1.8] max-w-xl mx-auto">{sub}</p>}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 헤더
// ══════════════════════════════════════════════════════════════════════════════

function Header({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  const st = openStatus()
  const go = (href: string) => {
    setOpen(false)
    goTo(href)
  }
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-5xl mx-auto px-5 md:px-6 h-16 flex items-center justify-between gap-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-baseline gap-2.5">
          <span className="f-serif text-[1.35rem]">{SITE.name}</span>
          <span className={`hidden sm:inline-flex items-center gap-1.5 text-[0.6875rem] font-bold px-2 py-0.5 rounded-full ${st.on ? 'bg-tomato text-ivory' : 'bg-ink/8 text-ink-55'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${st.on ? 'bg-ivory' : 'bg-ink/30'}`} aria-hidden="true" />
            {st.label}
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-0.5">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => go(n.href)}
              className={`px-3 py-2 text-[0.9375rem] font-semibold ${active === n.href.slice(1) ? 'text-tomato' : 'text-ink/65 hover:text-ink'}`}
            >
              {n.label}
            </button>
          ))}
          <a href={`tel:${SITE.phone}`} className="nums ml-3 px-5 py-2.5 rounded-full bg-ink text-ivory text-[0.9375rem] font-bold hover:bg-tomato" style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}>
            {SITE.phone}
          </a>
        </nav>

        <button className="md:hidden p-2 -mr-2" aria-label="메뉴" onClick={() => setOpen(!open)}>
          <div className="w-6 space-y-1.5">
            <span className="block h-0.5 bg-ink" />
            <span className={`block h-0.5 bg-ink ${open ? 'opacity-0' : ''}`} />
            <span className="block h-0.5 bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-ivory px-5 py-2">
          {SITE.nav.map((n) => (
            <button key={n.href} onClick={() => go(n.href)} className="block w-full text-left py-3.5 text-[1rem] font-semibold border-b border-line last:border-0">
              {n.label}
            </button>
          ))}
          <a href={`tel:${SITE.phone}`} className="nums block text-center my-3 py-3.5 rounded-full bg-ink text-ivory font-bold">
            {SITE.phone}
          </a>
        </div>
      )}
    </header>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 히어로
// ══════════════════════════════════════════════════════════════════════════════

function Hero() {
  const { ref, inView } = useInView(0.05)
  const st = openStatus()
  return (
    <section ref={ref} className="hx-hero relative mt-16 h-[calc(100svh-4rem)] min-h-[34rem] max-h-[54rem] overflow-hidden">
      <img
        src={SITE.heroPhoto}
        alt="돌솥밥과 나물 반찬, 국을 함께 차린 소반의 한 상"
        className="hx-hero-img absolute inset-0 w-full h-full object-cover"
      />
      <div className="hx-hero-scrim absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative h-full max-w-7xl mx-auto px-5 md:px-8 xl:px-10 flex flex-col justify-end xl:justify-center pb-20 md:pb-16 xl:pb-0">
        <div className="hx-hero-text max-w-[32rem] md:max-w-[30rem] xl:max-w-[32rem]">
          <p className={`anim-fade-up ${inView ? 'in-view' : ''} hx-hero-fine text-[0.75rem] md:text-[0.8125rem] font-bold tracking-[0.2em] text-ivory mb-4 md:mb-5`}>
            {SITE.nameEn} · {SITE.tagline}
          </p>
          <h1 className={`anim-fade-up d80 ${inView ? 'in-view' : ''} f-serif text-ivory text-[2.5rem] md:text-[3.25rem] xl:text-[4rem] leading-[1.16] whitespace-pre-line mb-4 md:mb-5 xl:mb-6`}>
            {SITE.slogan}
          </h1>
          <p className={`anim-fade-up d160 ${inView ? 'in-view' : ''} hx-hero-fine text-[0.9375rem] md:text-[1rem] xl:text-[1.0625rem] text-ivory leading-[1.8] mb-7 md:mb-8 xl:mb-9`}>
            {SITE.sloganSub}
          </p>

          <div className={`anim-fade-up d240 ${inView ? 'in-view' : ''} flex flex-wrap items-center gap-x-7 gap-y-4`}>
            <a
              href="#reserve"
              onClick={(e) => { e.preventDefault(); goTo('#reserve') }}
              className="hx-cta inline-flex items-center px-8 py-4 rounded-full bg-tomato text-ivory text-[1rem] font-bold hover:bg-tomato-d"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              자리 예약하기
            </a>
            <a
              href="#menu"
              onClick={(e) => { e.preventDefault(); goTo('#menu') }}
              className="hx-cta-line text-[1rem] font-bold text-ivory border-b-2 border-ivory/60 pb-0.5 hover:border-ivory"
              style={{ transition: MOTION ? 'border-color 0.2s' : 'none' }}
            >
              메뉴판 펼치기
            </a>
          </div>

          <div className={`anim-fade-up d320 ${inView ? 'in-view' : ''} hx-hero-fine mt-8 md:mt-9 xl:mt-10 pt-5 border-t border-ivory/25 flex flex-col gap-1.5 text-[0.8125rem] md:text-[0.875rem] text-ivory`}>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-2 font-bold text-ivory">
                <span className={`hx-dot ${st.on ? 'hx-dot-on' : ''}`} aria-hidden="true" />
                {st.label}
              </span>
              <span className="nums">점심 {SITE.openHours.lunch} · 저녁 {SITE.openHours.dinner}</span>
            </p>
            <p className="nums">{SITE.openHours.lastOrder} · {SITE.openHours.closed}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 오늘의 추천
// ══════════════════════════════════════════════════════════════════════════════

function Today() {
  const { ref, inView } = useInView(0.12)
  return (
    <section id="today" className="py-18 md:py-24 bg-ivory-d/60">
      <div ref={ref} className="max-w-5xl mx-auto px-5 md:px-6">
        <Head title="오늘의 추천" sub="아침 장을 보고 정합니다. 재료가 떨어지면 그날은 끝." inView={inView} />
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-8">
          {SITE.today.map((t, i) => (
            <div key={t.name} className={`anim-fade-up ${['', 'd80', 'd160'][i]} ${inView ? 'in-view' : ''} text-center`}>
              <h3 className="f-serif-md text-[1.3rem] star mb-2">{t.name}</h3>
              <p className="text-[0.9rem] text-ink-55 leading-[1.75] mb-3">{t.desc}</p>
              <p className="nums text-[1.05rem] font-bold text-tomato">{t.price}원</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 메뉴판 — 카테고리 탭 + 점선 리더  ★ 시그니처
// ══════════════════════════════════════════════════════════════════════════════

function Menu() {
  const { ref, inView } = useInView(0.06)
  const [tab, setTab] = useState<(typeof SITE.menuTabs)[number]>('식사')
  const list = SITE.menu[tab]
  return (
    <section id="menu" className="py-18 md:py-24">
      <div ref={ref} className="max-w-3xl mx-auto px-5 md:px-6">
        <Head title="메뉴판" sub="★ 표시는 처음 오신 분께 권하는 메뉴입니다." inView={inView} />

        <div className={`anim-fade-up ${inView ? 'in-view' : ''} flex justify-center gap-2 mb-10`} role="tablist" aria-label="메뉴 분류">
          {SITE.menuTabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-full text-[0.9375rem] font-bold border ${
                tab === t ? 'bg-ink text-ivory border-ink' : 'border-line text-ink/60 hover:border-ink/40'
              }`}
              style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
            >
              {t}
            </button>
          ))}
        </div>

        <ul key={tab} className={MOTION ? 'menu-in' : ''}>
          {list.map((m) => (
            <li key={m.name} className="py-4 border-b border-line last:border-0">
              <div className="leader">
                <span className={`f-serif-md text-[1.1rem] ${m.star ? 'star' : ''}`}>{m.name}</span>
                <span className="leader-price nums text-[1.05rem] font-bold">{won(m.price)}{m.price !== '0' && '원'}</span>
              </div>
              <p className="text-[0.8125rem] text-ink-55 mt-1">{m.desc}</p>
            </li>
          ))}
        </ul>
        <p className={`anim-fade-up d160 ${inView ? 'in-view' : ''} text-[0.75rem] text-ink-55 mt-6 text-center`}>{SITE.menuNote}</p>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 공간 · 철학
// ══════════════════════════════════════════════════════════════════════════════

function Space() {
  const { ref, inView } = useInView(0.08)
  return (
    <section id="space" className="py-18 md:py-24 bg-ivory-d/60">
      <div ref={ref} className="max-w-5xl mx-auto px-5 md:px-6">
        <Head title="자리" inView={inView} />
        <div className="grid md:grid-cols-[1.2fr_0.8fr_1fr] gap-4 items-stretch mb-16">
          {SITE.space.map((s, i) => (
            <figure key={s.label} className={`anim-fade-up ${['', 'd80', 'd160'][i]} ${inView ? 'in-view' : ''}`}>
              <div className="ph rounded-2xl h-full">
                <img src={s.photo} alt={s.label} className="w-full h-56 md:h-72 object-cover" loading="lazy" />
              </div>
              <figcaption className="mt-2.5 text-[0.8125rem] font-semibold text-ink-55 text-center">{s.label}</figcaption>
            </figure>
          ))}
        </div>
        <blockquote className={`anim-fade-up d160 ${inView ? 'in-view' : ''} max-w-2xl mx-auto text-center`}>
          <p className="f-serif-md text-[1.15rem] md:text-[1.35rem] leading-[1.85] text-ink/85">“{SITE.philosophy}”</p>
          <footer className="mt-4 text-[0.875rem] text-ink-55">— {SITE.ceo}</footer>
        </blockquote>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 예약 · 영업시간
// ══════════════════════════════════════════════════════════════════════════════

function Reserve() {
  const { ref, inView } = useInView(0.12)
  const [people, setPeople] = useState(4)
  const smsBody = `[예약 문의] ${people}명, 원하는 날짜/시간: `
  return (
    <section id="reserve" className="py-18 md:py-24 bg-ink text-ivory">
      <div ref={ref} className="max-w-5xl mx-auto px-5 md:px-6">
        <div className={`anim-fade-up ${inView ? 'in-view' : ''} text-center mb-12`}>
          <h2 className="f-serif text-[1.9rem] md:text-[2.6rem] text-ivory leading-[1.25]">자리를 잡아드릴게요</h2>
          <div className="mx-auto mt-4 w-10 border-b-2 border-tomato" aria-hidden="true" />
          <p className="mt-5 text-[0.9375rem] text-ivory/60 leading-[1.8] max-w-xl mx-auto">{SITE.reserve.note}</p>
        </div>

        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''} max-w-md mx-auto text-center`}>
          <p className="text-[0.8125rem] font-bold text-ivory/50 mb-3">인원을 고르면 문자가 준비됩니다</p>
          <div className="flex justify-center gap-2 mb-7" role="group" aria-label="예약 인원">
            {[2, 4, 6, 8].map((n) => (
              <button
                key={n}
                aria-pressed={people === n}
                onClick={() => setPeople(n)}
                className={`nums w-14 h-14 rounded-full text-[1.05rem] font-bold border-2 ${
                  people === n ? 'bg-tomato border-tomato text-ivory' : 'border-ivory/25 text-ivory/70 hover:border-ivory/60'
                }`}
                style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
              >
                {n}명
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`tel:${SITE.phone}`} className="flex-1 py-4 rounded-full bg-ivory text-ink text-[1rem] font-bold hover:bg-tomato hover:text-ivory" style={{ transition: MOTION ? 'background-color 0.2s, color 0.2s' : 'none' }}>
              전화 예약
            </a>
            <a
              href={`sms:${SITE.phone.replace(/-/g, '')}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-4 rounded-full border-2 border-ivory/40 text-ivory text-[1rem] font-bold hover:border-ivory"
              style={{ transition: MOTION ? 'border-color 0.2s' : 'none' }}
            >
              문자로 예약 문의
            </a>
          </div>
          <p className="text-[0.8125rem] text-ivory/45 mt-5">{SITE.reserve.walkIn}</p>
        </div>

        <dl className={`anim-fade-up d160 ${inView ? 'in-view' : ''} grid grid-cols-2 md:grid-cols-4 gap-y-6 max-w-3xl mx-auto mt-14 pt-10 border-t border-ivory/15 text-center`}>
          {[
            ['점심', SITE.openHours.lunch],
            ['저녁', SITE.openHours.dinner],
            ['라스트오더', SITE.openHours.lastOrder.replace('라스트오더 ', '')],
            ['휴무', SITE.openHours.closed.replace(' 정기 휴무', '')],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[0.75rem] font-bold text-ivory/45 mb-1">{k}</dt>
              <dd className="nums text-[1rem] font-bold">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 후기 · 오시는 길
// ══════════════════════════════════════════════════════════════════════════════

function Reviews() {
  const { ref, inView } = useInView(0.1)
  return (
    <section className="py-18 md:py-24">
      <div ref={ref} className="max-w-5xl mx-auto px-5 md:px-6">
        <Head title="다녀가신 분들" sub="실제 리뷰를 바탕으로 재구성한 예시입니다." inView={inView} />
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-10">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.tag} className={`anim-fade-up ${['', 'd80', 'd160'][i]} ${inView ? 'in-view' : ''} text-center`}>
              <p className="text-[0.9375rem] leading-[1.85] text-ink/80 mb-4">“{r.text}”</p>
              <footer className="text-[0.8125rem] text-ink-55">
                <span className="star font-bold text-ink">{r.tag}</span> · {r.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

function Location() {
  const { ref, inView } = useInView(0.12)
  return (
    <section id="location" className="py-18 md:py-24 bg-ivory-d/60">
      <div ref={ref} className="max-w-5xl mx-auto px-5 md:px-6">
        <Head title="오시는 길" sub={SITE.address} inView={inView} />
        <div className="max-w-2xl mx-auto">
          <dl className={`anim-fade-up ${inView ? 'in-view' : ''} border-t-2 border-ink`}>
            {[
              ['지하철', SITE.location.subway],
              ['주차', SITE.location.parking],
              ['찾기', SITE.location.landmark],
              ['인스타', SITE.instagram],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[84px_1fr] gap-6 py-4 border-b border-line">
                <dt className="text-[0.8125rem] font-bold text-ink-55 pt-0.5">{k}</dt>
                <dd className="text-[0.9375rem] leading-[1.7]">{v}</dd>
              </div>
            ))}
          </dl>
          <p className={`anim-fade-up d160 ${inView ? 'in-view' : ''} text-[0.75rem] text-ink-55 mt-4 text-center`}>
            지도 영역은 카카오맵 · 네이버지도 임베드로 교체해 주세요.
          </p>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 푸터 · 모바일 바
// ══════════════════════════════════════════════════════════════════════════════

function Footer() {
  return (
    <footer className="py-12 border-t border-line">
      <div className="max-w-5xl mx-auto px-5 md:px-6 text-center">
        <p className="f-serif text-[1.5rem] mb-1">{SITE.name}</p>
        <p className="text-[0.75rem] text-ink-55 tracking-[0.16em] mb-6">{SITE.nameEn} · {SITE.tagline}</p>
        <div className="space-y-1 text-[0.8125rem] text-ink-55">
          <p>{SITE.ceo} · 사업자등록번호 {SITE.bizNo}</p>
          <p>{SITE.address} · {SITE.phone}</p>
        </div>
        <p className="mt-8 pt-4 border-t border-line text-[0.75rem] text-ink-55">
          © {new Date().getFullYear()} {SITE.name} · 카카오톡 {SITE.kakaoId}
        </p>
      </div>
    </footer>
  )
}

function MobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-ink text-ivory pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 divide-x divide-ivory/15">
        <a href={`tel:${SITE.phone}`} className="py-3.5 text-center text-[0.9375rem] font-bold">전화</a>
        <button onClick={() => goTo('#menu')} className="py-3.5 text-center text-[0.9375rem] font-bold">메뉴판</button>
        <button onClick={() => goTo('#reserve')} className="py-3.5 text-center text-[0.9375rem] font-extrabold text-tomato" style={{ color: '#ff8a70' }}>
          예약
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
        <Today />
        <Menu />
        <Space />
        <Reserve />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <MobileBar />
    </div>
  )
}
