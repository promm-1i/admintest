import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

/* 이미지 — src/images/ 안의 파일을 같은 이름으로 덮어쓰면 그대로 반영됩니다 */
import heroImg from './images/hero.jpg'
import coachImg1 from './images/coach-1.jpg'
import coachImg2 from './images/coach-2.jpg'
import coachImg3 from './images/coach-3.jpg'
import spaceImg1 from './images/space-1.jpg'
import spaceImg2 from './images/space-2.jpg'
import spaceImg3 from './images/space-3.jpg'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

const SITE = {
  // 여기에 스튜디오 기본 정보 교체
  name: '코어리프',
  nameEn: 'CORELEAF',
  tagline: '필라테스 · 웨이트 · 성수',
  slogan: '코어부터,\n다시 짓는 몸',
  sloganSub:
    '기구 필라테스와 웨이트 트레이닝을 한 공간에서. 회원 수를 늘리는 대신, 한 타임 정원을 6명으로 줄였습니다.',

  // 여기에 연락처 교체
  phone: '02-1234-5678',
  smsPhone: '01012345678',
  kakaoId: '@코어리프',
  instagram: '@coreleaf.seongsu',

  // 여기에 사업자 정보 교체
  ceo: '대표 이코어',
  bizNo: '123-45-67890',
  address: '서울특별시 성동구 성수이로 123, 3층',

  hours: [
    { day: '평일', time: '06:00 – 22:30' },
    { day: '토요일', time: '09:00 – 18:00' },
    { day: '일 · 공휴일', time: '정기 휴무' },
  ],

  // 여기에 히어로 사진 교체
  heroPhoto: heroImg,

  nav: [
    { label: '프로그램', href: '#program' },
    { label: '시간표', href: '#timetable' },
    { label: '회원권', href: '#price' },
    { label: '코치', href: '#coach' },
    { label: '체험 신청', href: '#trial' },
    { label: '오시는 길', href: '#location' },
  ],

  stats: [
    { n: 6, suffix: '명', label: '타임 정원' },
    { n: 34, suffix: '개', label: '주간 수업' },
    { n: 800, suffix: '+', label: '누적 회원' },
    { n: 96, suffix: '%', label: '3개월 유지율' },
  ],

  // 프로그램
  programs: [
    { name: '기구 필라테스', en: 'Reformer', desc: '리포머 · 캐딜락 · 체어. 자세 교정과 코어 강화 중심의 그룹 수업.', level: '입문 – 심화' },
    { name: '웨이트 트레이닝', en: 'Weight', desc: '프리웨이트 존 상시 이용. 머신이 아니라 바벨 중심으로 가르칩니다.', level: '회원 전용' },
    { name: '1:1 퍼스널', en: 'Personal', desc: '체형 분석 후 필라테스 · 웨이트를 섞어 설계하는 개인 수업.', level: '맞춤' },
    { name: '재활 · 산전후', en: 'Rehab', desc: '통증 이력이 있는 분을 위한 저강도 프로그램. 의뢰서 지참 시 상담.', level: '전문' },
  ],

  // 주간 시간표 — 요일 탭. 난이도: 1 입문 / 2 중급 / 3 심화
  days: ['월', '화', '수', '목', '금', '토'] as const,
  timetableNote: '정원 6명 · 앱 없이 문자로 예약 가능 · 수업 2시간 전까지 취소 가능',
  timetable: {
    월: [
      { time: '07:00', name: '모닝 리포머', coach: '한결', level: 1 },
      { time: '10:00', name: '리포머 베이직', coach: '서윤', level: 1 },
      { time: '19:00', name: '리포머 코어', coach: '한결', level: 2 },
      { time: '20:30', name: '바벨 클래스', coach: '지후', level: 2 },
    ],
    화: [
      { time: '07:00', name: '모닝 코어', coach: '서윤', level: 2 },
      { time: '11:00', name: '산전후 필라테스', coach: '서윤', level: 1 },
      { time: '19:00', name: '리포머 베이직', coach: '한결', level: 1 },
      { time: '20:30', name: '리포머 심화', coach: '한결', level: 3 },
    ],
    수: [
      { time: '07:00', name: '모닝 리포머', coach: '한결', level: 1 },
      { time: '10:00', name: '체어 · 캐딜락', coach: '서윤', level: 2 },
      { time: '19:00', name: '바벨 클래스', coach: '지후', level: 2 },
      { time: '20:30', name: '리포머 코어', coach: '서윤', level: 2 },
    ],
    목: [
      { time: '07:00', name: '모닝 코어', coach: '서윤', level: 2 },
      { time: '11:00', name: '재활 스트레칭', coach: '한결', level: 1 },
      { time: '19:00', name: '리포머 베이직', coach: '서윤', level: 1 },
      { time: '20:30', name: '리포머 심화', coach: '한결', level: 3 },
    ],
    금: [
      { time: '07:00', name: '모닝 리포머', coach: '한결', level: 1 },
      { time: '10:00', name: '리포머 코어', coach: '서윤', level: 2 },
      { time: '19:00', name: '바벨 클래스', coach: '지후', level: 2 },
      { time: '20:30', name: '프리 트레이닝', coach: '지후', level: 1 },
    ],
    토: [
      { time: '10:00', name: '주말 리포머', coach: '한결', level: 1 },
      { time: '11:30', name: '리포머 코어', coach: '서윤', level: 2 },
      { time: '14:00', name: '바벨 클래스', coach: '지후', level: 2 },
    ],
  },

  // 회원권 가격표
  priceNote: '모든 그룹권은 웨이트 존 상시 이용 포함 · 휴회 1회 무료(최대 2주)',
  memberships: [
    { name: '그룹 8회', per: '월 8회', price: '220,000', unit: '27,500원/회', hot: false },
    { name: '그룹 12회', per: '월 12회', price: '290,000', unit: '24,100원/회', hot: true },
    { name: '그룹 무제한', per: '월 무제한', price: '350,000', unit: '주 5회 기준 17,500원/회', hot: false },
  ],
  ptPacks: [
    { name: '1:1 퍼스널 10회', price: '750,000', note: '회당 75,000원 · 3개월 이내 사용' },
    { name: '1:1 퍼스널 20회', price: '1,400,000', note: '회당 70,000원 · 6개월 이내 사용' },
    { name: '체험 수업 1회', price: '15,000', note: '체형 상담 30분 포함 · 1인 1회' },
  ],

  // 코치 — 여기에 프로필 사진 교체
  coaches: [
    {
      img: coachImg1,
      name: '한결',
      role: '필라테스 디렉터',
      career: ['국제 필라테스 지도자 과정 수료', '재활 필라테스 8년 · 지도 1.2만 시간'],
    },
    {
      img: coachImg2,
      name: '지후',
      role: '스트렝스 코치',
      career: ['생활스포츠지도사 2급(보디빌딩)', '파워리프팅 대회 입상 · 코칭 6년'],
    },
    {
      img: coachImg3,
      name: '서윤',
      role: '필라테스 코치',
      career: ['기구 필라테스 국제 자격', '산전후 · 시니어 수업 전문 5년'],
    },
  ],

  // 공간 — 여기에 스튜디오 사진 교체
  spaces: [
    { img: spaceImg1, label: '리포머 존 · 6베드' },
    { img: spaceImg2, label: '프리웨이트 존' },
    { img: spaceImg3, label: '라커 · 샤워실' },
  ],

  reviews: [
    { text: '3년째 허리 때문에 병원 다니다가 여기 재활 수업으로 정착했어요. 정원이 적어서 자세를 하나하나 다 봐주십니다.', name: '김O윤', tag: '재활 · 6개월' },
    { text: '필라테스랑 웨이트를 같이 할 수 있는 곳이 생각보다 없어요. 수업 끝나고 바벨 연습까지 하고 갑니다.', name: '박O현', tag: '그룹 무제한' },
    { text: '체험 수업에서 체형 분석해 준 내용이 PT 10회 내내 이어졌어요. 팔아야 해서 하는 상담이 아니었습니다.', name: '이O서', tag: '1:1 퍼스널' },
  ],

  trial: {
    lead: '체험 수업은 15,000원, 체형 상담 30분이 포함됩니다.\n원하시는 수업과 시간대를 보내주시면 예약 가능한 자리를 안내드립니다.',
    options: ['기구 필라테스', '웨이트 클래스', '1:1 퍼스널 상담', '재활 · 산전후'],
  },

  location: {
    walk: '성수역 4번 출구 · 도보 5분',
    parking: '건물 지하 주차장 2시간 무료 (수업 등록 차량)',
    landmark: '1층에 편의점이 있는 회색 벽돌 건물 3층입니다.',
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

function useCountUp(target: number, on: boolean) {
  const [v, setV] = useState(MOTION ? 0 : target)
  useEffect(() => {
    if (!MOTION || !on) return
    let raf = 0
    const t0 = performance.now()
    const dur = 1300
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1)
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, on])
  return v
}

function goTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })
}

const LEVEL = ['', '입문', '중급', '심화']

// ─── 공통 섹션 헤드 ───────────────────────────────────────────────────────────

function Head({ en, title, sub, inView, dark }: { en: string; title: React.ReactNode; sub?: string; inView: boolean; dark?: boolean }) {
  return (
    <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
      <p className={`text-[0.78rem] tracking-[0.32em] uppercase font-bold ${dark ? 'text-leaf-l' : 'text-leaf'}`}>
        <span className="inline-block w-7 h-[2px] align-middle mr-3 bg-current grow-rule" />
        {en}
      </p>
      <h2 className="mt-4 text-[clamp(1.75rem,4.2vw,2.6rem)] font-extrabold tracking-[-0.03em] leading-tight">{title}</h2>
      {sub && <p className={`mt-4 max-w-xl text-[0.98rem] leading-relaxed ${dark ? 'text-sand/60' : 'text-coal/60'}`}>{sub}</p>}
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
      className={`fixed top-0 inset-x-0 z-50 ${scrolled ? 'bg-sand/95 shadow-[0_1px_0_rgba(35,36,31,0.1)]' : ''}`}
      style={{ transition: MOTION ? 'background-color 0.25s, box-shadow 0.25s' : 'none', backdropFilter: scrolled ? 'blur(10px)' : 'none' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[70px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-leaf" />
          <span className="text-[1.15rem] font-extrabold tracking-[-0.02em]">{SITE.nameEn}</span>
          <span className="hidden sm:inline text-[0.72rem] text-coal/50 ml-1">{SITE.tagline}</span>
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[0.88rem] font-semibold ${active === n.href.slice(1) ? 'text-leaf' : 'text-coal/65 hover:text-coal'}`}
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => goTo('#trial')}
          className="px-5 py-2.5 rounded-full bg-leaf text-sand text-[0.85rem] font-bold hover:bg-coal"
          style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
        >
          체험 신청
        </button>
      </div>
    </header>
  )
}

// ─── 히어로 ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative pt-[70px]">
      <div className="mx-auto max-w-6xl px-5 pt-12 md:pt-20 pb-10">
        <h1 className={`text-[clamp(2.6rem,7.5vw,5rem)] font-extrabold tracking-[-0.04em] leading-[1.05] whitespace-pre-line ${MOTION ? 'hero-in' : ''}`}>
          {SITE.slogan.split('\n')[0]}
          <br />
          <span className="text-leaf">{SITE.slogan.split('\n')[1]}</span>
        </h1>
        <div className={`mt-7 flex flex-col md:flex-row md:items-end justify-between gap-6 ${MOTION ? 'hero-in d200' : ''}`}>
          <p className="max-w-lg text-[1.02rem] leading-relaxed text-coal/65">{SITE.sloganSub}</p>
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => goTo('#trial')}
              className="px-7 py-4 rounded-full bg-coal text-sand text-[0.95rem] font-bold hover:bg-leaf"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              체험 수업 신청 →
            </button>
            <button
              onClick={() => goTo('#timetable')}
              className="text-[0.95rem] font-bold border-b-2 border-coal pb-0.5 hover:text-leaf hover:border-leaf"
              style={{ transition: MOTION ? 'color 0.2s, border-color 0.2s' : 'none' }}
            >
              시간표 보기
            </button>
          </div>
        </div>
      </div>
      <div className={`mx-auto max-w-6xl px-5 ${MOTION ? 'hero-photo' : ''}`}>
        {/* 여기에 히어로 사진 교체 */}
        <img src={SITE.heroPhoto} alt="스튜디오 전경" className="w-full aspect-[16/8] object-cover rounded-2xl" />
      </div>
      <Stats />
    </section>
  )
}

function Stats() {
  const { ref, inView } = useInView(0.4)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="mx-auto max-w-6xl px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-y-6">
      {SITE.stats.map((s) => (
        <StatCell key={s.label} s={s} on={inView} />
      ))}
    </div>
  )
}

function StatCell({ s, on }: { s: (typeof SITE.stats)[number]; on: boolean }) {
  const v = useCountUp(s.n, on)
  return (
    <div className="text-center md:text-left md:pl-6 md:border-l-2 border-leaf/25 first:border-0 first:pl-0">
      <p className="nums text-[2.1rem] font-extrabold tracking-tight leading-none">
        {v}
        <span className="text-leaf text-[1.25rem]">{s.suffix}</span>
      </p>
      <p className="mt-1.5 text-[0.85rem] text-coal/55">{s.label}</p>
    </div>
  )
}

// ─── 프로그램 ─────────────────────────────────────────────────────────────────

function Program() {
  const { ref, inView } = useInView()
  return (
    <section id="program" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Programs" title="한 공간, 두 가지 운동" sub="필라테스로 정렬을 잡고 웨이트로 힘을 쌓습니다. 서로 다른 운동이 아니라 같은 몸의 순서입니다." inView={inView} />
        <div className="grid sm:grid-cols-2 gap-5">
          {SITE.programs.map((p, i) => (
            <article
              key={p.name}
              className={`prog group p-8 rounded-2xl border-2 border-coal/10 ${MOTION ? `anim-fade-up d${(i % 2) * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}
            >
              <div className="flex items-baseline justify-between">
                <p className="text-[0.75rem] tracking-[0.25em] uppercase font-bold text-leaf">{p.en}</p>
                <span className="prog-lv text-[0.75rem] font-bold px-2.5 py-1 rounded-full bg-coal/5 text-coal/60">{p.level}</span>
              </div>
              <h3 className="mt-3 text-[1.45rem] font-extrabold tracking-tight">{p.name}</h3>
              <p className="prog-d mt-3 text-[0.95rem] leading-relaxed text-coal/60">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 주간 시간표 ──────────────────────────────────────────────────────────────

function Timetable() {
  const { ref, inView } = useInView()
  const [day, setDay] = useState<(typeof SITE.days)[number]>(SITE.days[0])
  return (
    <section id="timetable" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-coal text-sand">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="Weekly Timetable" title="주간 시간표" inView={inView} dark />
        <div className={`grid grid-cols-6 gap-1.5 mb-8 ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.days.map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`py-3 rounded-lg text-[0.95rem] font-extrabold ${day === d ? 'bg-leaf-l text-coal' : 'bg-sand/8 text-sand/55 hover:bg-sand/15'}`}
              style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
            >
              {d}
            </button>
          ))}
        </div>
        <ul key={day} className={`space-y-2 ${MOTION ? 'menu-in' : ''}`}>
          {SITE.timetable[day].map((c) => (
            <li key={c.time + c.name} className="flex items-center gap-4 md:gap-6 px-5 py-4 rounded-xl bg-sand/6">
              <span className="nums text-[1.15rem] font-extrabold text-leaf-l w-16 shrink-0">{c.time}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[1.02rem] font-bold">{c.name}</p>
                <p className="text-[0.8rem] text-sand/45 mt-0.5">{c.coach} 코치</p>
              </div>
              <span
                className={`shrink-0 text-[0.75rem] font-bold px-2.5 py-1 rounded-full ${c.level === 3 ? 'bg-leaf-l text-coal' : c.level === 2 ? 'bg-sand/15 text-sand/85' : 'bg-sand/8 text-sand/55'}`}
              >
                {LEVEL[c.level]}
              </span>
            </li>
          ))}
        </ul>
        <p className={`mt-6 text-[0.82rem] text-sand/45 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>{SITE.timetableNote}</p>
      </div>
    </section>
  )
}

// ─── 회원권 ───────────────────────────────────────────────────────────────────

function Price() {
  const { ref, inView } = useInView()
  return (
    <section id="price" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Membership" title="회원권 안내" inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.memberships.map((m, i) => (
            <article
              key={m.name}
              className={`relative p-8 rounded-2xl ${m.hot ? 'bg-leaf text-sand' : 'border-2 border-coal/10'} ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}
            >
              {m.hot && (
                <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-coal text-sand text-[0.72rem] font-bold tracking-wide">가장 많이 선택</span>
              )}
              <p className={`text-[0.85rem] font-bold ${m.hot ? 'text-sand/70' : 'text-coal/50'}`}>{m.per}</p>
              <h3 className="mt-1 text-[1.35rem] font-extrabold">{m.name}</h3>
              <p className="nums mt-5 text-[2.1rem] font-extrabold tracking-tight">
                {m.price}
                <span className="text-[1rem] font-bold ml-1">원</span>
              </p>
              <p className={`mt-1 text-[0.82rem] ${m.hot ? 'text-sand/60' : 'text-coal/45'}`}>{m.unit}</p>
            </article>
          ))}
        </div>
        <div className={`mt-5 grid sm:grid-cols-3 gap-5 ${MOTION ? 'anim-fade-up d240' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.ptPacks.map((p) => (
            <div key={p.name} className="flex flex-col justify-between p-6 rounded-2xl bg-coal/4 border border-coal/8">
              <p className="text-[0.95rem] font-bold">{p.name}</p>
              <div className="mt-3">
                <p className="nums text-[1.35rem] font-extrabold">{p.price}원</p>
                <p className="mt-1 text-[0.78rem] text-coal/50">{p.note}</p>
              </div>
            </div>
          ))}
        </div>
        <p className={`mt-6 text-[0.82rem] text-coal/45 ${MOTION ? 'anim-fade-up d280' : ''} ${inView ? 'in-view' : ''}`}>{SITE.priceNote}</p>
      </div>
    </section>
  )
}

// ─── 코치 ─────────────────────────────────────────────────────────────────────

function Coach() {
  const { ref, inView } = useInView()
  return (
    <section id="coach" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-mist">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Coaches" title="자격부터 보여드립니다" inView={inView} />
        <div className="grid md:grid-cols-3 gap-6">
          {SITE.coaches.map((c, i) => (
            <article key={c.name} className={`${MOTION ? `anim-fade-up d${i * 120 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="overflow-hidden rounded-2xl">
                {/* 여기에 코치 프로필 사진 교체 */}
                <img src={c.img} alt={c.name} className="w-full aspect-[4/5] object-cover" />
              </div>
              <div className="mt-4">
                <p className="text-[1.2rem] font-extrabold">
                  {c.name} <span className="text-[0.82rem] font-bold text-leaf ml-1.5">{c.role}</span>
                </p>
                <ul className="mt-2.5 space-y-1">
                  {c.career.map((l) => (
                    <li key={l} className="text-[0.85rem] text-coal/60 flex gap-2">
                      <span className="text-leaf font-bold">·</span>
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

// ─── 공간 ─────────────────────────────────────────────────────────────────────

function Space() {
  const { ref, inView } = useInView()
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Studio" title="공간 둘러보기" inView={inView} />
        <div className="grid sm:grid-cols-3 gap-4">
          {SITE.spaces.map((s, i) => (
            <figure key={s.label} className={`${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="overflow-hidden rounded-2xl">
                {/* 여기에 공간 사진 교체 */}
                <img src={s.img} alt={s.label} className="w-full aspect-[4/3] object-cover" />
              </div>
              <figcaption className="mt-3 text-[0.9rem] font-bold text-coal/70">{s.label}</figcaption>
            </figure>
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
        <Head en="Reviews" title="회원들의 기록" inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`p-7 rounded-2xl bg-sand border border-coal/8 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[0.95rem] leading-relaxed text-coal/75">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between">
                <span className="text-[0.85rem] font-bold">{r.name}</span>
                <span className="text-[0.78rem] font-bold text-leaf">{r.tag}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 체험 신청 ────────────────────────────────────────────────────────────────

function Trial() {
  const { ref, inView } = useInView()
  const [opt, setOpt] = useState<string>(SITE.trial.options[0])
  const [when, setWhen] = useState('')
  const smsBody = `[체험신청] 수업: ${opt} / 희망 시간대: ${when || '상담 후 결정'}`
  return (
    <section id="trial" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-coal text-sand">
      <div className="mx-auto max-w-3xl px-5">
        <Head en="Trial Class" title="체험 수업 신청" inView={inView} dark />
        <p className={`-mt-6 mb-10 text-[0.98rem] leading-relaxed text-sand/60 whitespace-pre-line ${MOTION ? 'anim-fade-up d80' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.trial.lead}
        </p>
        <div className={`space-y-7 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-sand/50 mb-2.5">01 · 관심 수업</p>
            <div className="flex flex-wrap gap-2">
              {SITE.trial.options.map((s) => (
                <button
                  key={s}
                  onClick={() => setOpt(s)}
                  className={`px-4 py-2.5 rounded-full text-[0.88rem] font-bold ${opt === s ? 'bg-leaf-l text-coal' : 'bg-sand/8 text-sand/60 hover:bg-sand/15'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-sand/50 mb-2.5">02 · 희망 시간대 (선택)</p>
            <input
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              placeholder="예) 평일 저녁 7시 이후"
              className="w-full bg-transparent border-b-2 border-sand/25 px-1 py-3.5 text-[0.98rem] text-sand placeholder:text-sand/30 focus:outline-none focus:border-leaf-l"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-4 rounded-full text-center bg-leaf-l text-coal text-[0.98rem] font-extrabold hover:bg-sand"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              문자로 체험 신청
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex-1 py-4 rounded-full text-center border-2 border-sand/30 text-[0.98rem] font-bold hover:border-leaf-l hover:text-leaf-l"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              전화 {SITE.phone}
            </a>
          </div>
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
          <p className="text-[1.15rem] font-bold">{SITE.address}</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem] text-coal/65">
            <li>· {SITE.location.walk}</li>
            <li>· {SITE.location.parking}</li>
            <li>· {SITE.location.landmark}</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2">
            {SITE.hours.map((h) => (
              <p key={h.day} className="text-[0.9rem]">
                <span className="text-coal/45 mr-2.5">{h.day}</span>
                <span className="nums font-bold">{h.time}</span>
              </p>
            ))}
          </div>
          <a
            href={SITE.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-7 px-6 py-3 rounded-full border-2 border-coal text-[0.9rem] font-bold hover:border-leaf hover:text-leaf"
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
    <footer className="border-t border-coal/10 py-12 pb-28 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[1.2rem] font-extrabold">
            <span className="inline-block w-2 h-2 rounded-full bg-leaf mr-2" />
            {SITE.nameEn}
          </p>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-coal/45">
            {SITE.name} · {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="text-[0.78rem] text-coal/35">
          instagram {SITE.instagram} · kakao {SITE.kakaoId}
        </p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t border-coal/10 bg-sand">
      <a href={`tel:${SITE.phone}`} className="py-4 text-center text-[0.95rem] font-bold">
        전화 문의
      </a>
      <button onClick={() => goTo('#trial')} className="py-4 text-center text-[0.95rem] font-extrabold bg-leaf text-sand">
        체험 신청
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
    <div className="bg-sand text-coal">
      <Header active={active} />
      <Hero />
      <Program />
      <Timetable />
      <Price />
      <Coach />
      <Space />
      <Reviews />
      <Trial />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
