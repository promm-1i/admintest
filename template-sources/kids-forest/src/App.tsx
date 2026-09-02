import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// ══════════════════════════════════════════════════════════════════════════════

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

const SITE = {
  name: '둥근숲 어린이집',
  tagline: '만 0 – 5세 · 정원 49명 · 은평',
  slogan: '아이의 하루가\n궁금하지 않게',
  sloganSub: '등원부터 하원까지, 오늘 무엇을 먹고 무엇을 하고 놀았는지 — 매일 사진과 함께 알림장으로 보내드립니다.',

  phone: '02-1234-5678',
  smsPhone: '01012345678',

  ceo: '원장 김둥근 (보육교사 1급 · 원장 자격)',
  bizNo: '123-45-67890',
  address: '서울특별시 은평구 둥근숲길 123',
  license: '서울시 인가 어린이집 · 평가제 A등급',

  nav: [
    { label: '반 안내', href: '#classes' },
    { label: '하루 일과', href: '#daily' },
    { label: '선생님', href: '#teachers' },
    { label: '급식', href: '#meal' },
    { label: '자주 묻는 질문', href: '#faq' },
    { label: '입소 상담', href: '#apply' },
  ],

  // 히어로 콜라주 — 여기에 사진 교체
  heroPhotos: [img1, img2],

  // 반별 안내
  classNote: '교사 1인당 아동 수는 법정 기준보다 적게 운영합니다 · 연령은 3월 1일 기준',
  classes: [
    { name: '씨앗반', age: '만 0세', size: '정원 6 · 교사 2', color: 'coral' },
    { name: '새싹반', age: '만 1세', size: '정원 8 · 교사 2', color: 'sun' },
    { name: '잎새반', age: '만 2세', size: '정원 10 · 교사 2', color: 'sky' },
    { name: '나무반', age: '만 3세', size: '정원 12 · 교사 1', color: 'coral' },
    { name: '숲속반', age: '만 4 – 5세', size: '정원 13 · 교사 1', color: 'sky' },
  ],

  daily: [
    { t: '07:30', what: '등원 · 건강 관찰 · 자유놀이' },
    { t: '09:30', what: '오전 간식 · 주제 활동 (오감 · 미술 · 음률)' },
    { t: '11:30', what: '점심 식사 · 양치 지도' },
    { t: '13:00', what: '낮잠 · 휴식 (연령별 조정)' },
    { t: '15:00', what: '오후 간식 · 바깥놀이 (매일 1시간)' },
    { t: '16:30', what: '자유놀이 · 순차 하원 (연장반 – 19:30)' },
  ],

  // 선생님 — 여기에 사진 교체
  teachers: [
    { img: U('1580489944761-15a19d654956', 800, 1000), name: '김둥근 원장', career: '보육 경력 18년 · 아동학 석사' },
    { img: U('1587654780291-39c9404d746b', 800, 1000), name: '담임교사 7명', career: '전원 보육교사 자격 · 평균 경력 7년' },
  ],
  teacherNote: '모든 교직원은 매년 아동학대 예방 · 심폐소생술 교육을 이수하며, 전 보육실 CCTV는 보호자 요청 시 열람할 수 있습니다.',

  meal: {
    note: '유아 영양사 식단 · 당일 조리 · 알레르기 대체식 제공',
    items: [
      { day: '월', menu: '차조밥 · 소고기미역국 · 삼치구이 · 나물 2종' },
      { day: '화', menu: '백미밥 · 두부된장국 · 닭갈비 · 채소볶음' },
      { day: '수', menu: '흑미밥 · 어묵국 · 돼지불고기 · 시금치나물' },
      { day: '목', menu: '잡곡밥 · 계란국 · 코다리조림 · 브로콜리' },
      { day: '금', menu: '카레라이스 · 유부국 · 과일 샐러드' },
    ],
  },

  faq: [
    { q: '입소 대기는 어떻게 하나요?', a: '임신육아종합포털 아이사랑에서 대기 신청 후, 아래 상담 문자를 남겨주시면 현재 반별 대기 현황을 알려드립니다.' },
    { q: '적응 기간은 어떻게 진행되나요?', a: '첫 주는 1–2시간씩 보호자와 함께, 둘째 주부터 아이 상태에 맞춰 시간을 늘립니다. 아이마다 속도가 달라 서두르지 않습니다.' },
    { q: '아프면 어떻게 하나요?', a: '열이 나면 즉시 연락드리고 별도 공간에서 쉬게 합니다. 투약 의뢰서가 있으면 시간 맞춰 투약하고 알림장에 기록합니다.' },
    { q: '연장 보육이 되나요?', a: '19:30까지 연장반을 운영합니다. 갑작스러운 야근 시 당일 연락 주셔도 괜찮습니다.' },
  ],

  reviews: [
    { text: '매일 오는 알림장 사진이 하루의 낙입니다. 오늘은 뭘 하고 놀았는지 저녁 대화가 달라졌어요.', name: '새싹반 학부모', tag: '재원 1년' },
    { text: '적응 기간을 아이 속도에 맞춰주셔서 울지 않고 다닌 첫 기관이에요. 선생님들이 진심인 게 느껴집니다.', name: '잎새반 학부모', tag: '적응기' },
    { text: '알레르기가 있는 아이인데 대체식을 따로 챙겨주시고 식단표에 표시까지 해주세요.', name: '나무반 학부모', tag: '급식' },
  ],

  apply: {
    lead: '아이 연령과 희망 시기를 보내주시면\n반별 대기 현황과 상담 가능 시간을 안내드립니다.',
    ages: ['만 0세', '만 1세', '만 2세', '만 3세', '만 4 – 5세'],
  },

  location: {
    walk: '불광역 2번 출구 · 도보 6분',
    parking: '등하원 시 정문 앞 정차 가능',
    landmark: '둥근숲 공원 바로 옆, 노란 지붕 단독 건물입니다.',
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

const DOT: Record<string, string> = { coral: 'bg-coral', sun: 'bg-sun', sky: 'bg-skyb' }

// ─── 공통 섹션 헤드 ───────────────────────────────────────────────────────────

function Head({ title, sub, inView }: { title: React.ReactNode; sub?: string; inView: boolean }) {
  return (
    <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
      <div className="flex items-center gap-2" aria-hidden>
        <span className={`w-3 h-3 rounded-full bg-coral ${MOTION ? 'bob b1' : ''}`} />
        <span className={`w-3 h-3 rounded-full bg-sun ${MOTION ? 'bob b2' : ''}`} />
        <span className={`w-3 h-3 rounded-full bg-skyb ${MOTION ? 'bob b3' : ''}`} />
      </div>
      <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,2.6rem)] font-extrabold tracking-[-0.02em] leading-tight">{title}</h2>
      {sub && <p className="mt-4 max-w-xl text-[1rem] leading-[1.8] text-choco/60">{sub}</p>}
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
      className={`fixed top-0 inset-x-0 z-50 bg-milk/96 ${scrolled ? 'shadow-[0_1px_0_rgba(64,52,44,0.1)]' : ''}`}
      style={{ transition: MOTION ? 'box-shadow 0.25s' : 'none', backdropFilter: 'blur(10px)' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[74px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-center gap-2.5">
          <span className="flex -space-x-1" aria-hidden>
            <span className="w-4 h-4 rounded-full bg-coral" />
            <span className="w-4 h-4 rounded-full bg-sun" />
            <span className="w-4 h-4 rounded-full bg-skyb" />
          </span>
          <span className="text-[1.2rem] font-extrabold tracking-tight">{SITE.name}</span>
        </button>
        <nav className="hidden lg:flex items-center gap-6">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[0.92rem] font-bold ${active === n.href.slice(1) ? 'text-coral' : 'text-choco/60 hover:text-choco'}`}
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <a
          href={`tel:${SITE.phone}`}
          className="nums px-5 py-2.5 rounded-full bg-coral text-milk text-[0.9rem] font-extrabold hover:bg-choco"
          style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
        >
          {SITE.phone}
        </a>
      </div>
    </header>
  )
}

// ─── 히어로 — 좌 도형·사진 콜라주 / 우 문구 ───────────────────────────────────

function Hero() {
  return (
    <section className="pt-[74px] overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-20 grid md:grid-cols-[1.05fr_1fr] gap-12 items-center">
        {/* 좌: 콜라주 */}
        <div className={`relative h-[340px] md:h-[440px] ${MOTION ? 'hero-in' : ''}`}>
          <span className={`absolute left-[4%] top-[6%] w-24 h-24 rounded-full bg-sun/80 ${MOTION ? 'bob b1' : ''}`} aria-hidden />
          <span className={`absolute right-[6%] top-[2%] w-14 h-14 rounded-2xl bg-skyb/70 rotate-12 ${MOTION ? 'bob b3' : ''}`} aria-hidden />
          <span className={`absolute left-[10%] bottom-[4%] w-16 h-16 rounded-2xl bg-coral/70 -rotate-6 ${MOTION ? 'bob b2' : ''}`} aria-hidden />
          {/* 여기에 아이들 활동 사진 교체 */}
          <img
            src={SITE.heroPhotos[0]}
            alt="놀이 중인 아이들"
            className="absolute left-[8%] top-[12%] w-[62%] aspect-square object-cover rounded-[36px] border-[6px] border-milk shadow-[0_16px_40px_rgba(64,52,44,0.16)] rotate-[-2deg]"
          />
          <img
            src={SITE.heroPhotos[1]}
            alt="미술 활동"
            className="absolute right-[2%] bottom-[6%] w-[44%] aspect-square object-cover rounded-[28px] border-[6px] border-milk shadow-[0_16px_40px_rgba(64,52,44,0.16)] rotate-[3deg]"
          />
        </div>
        {/* 우: 문구 */}
        <div>
          <p className={`inline-block px-4 py-2 rounded-full bg-sun/25 text-choco text-[0.88rem] font-extrabold ${MOTION ? 'hero-in d150' : ''}`}>
            {SITE.license}
          </p>
          <h1 className={`mt-6 text-[clamp(2.2rem,5.6vw,3.6rem)] font-extrabold tracking-[-0.03em] leading-[1.2] whitespace-pre-line ${MOTION ? 'hero-in d300' : ''}`}>
            {SITE.slogan}
          </h1>
          <p className={`mt-5 max-w-md text-[1.05rem] leading-[1.8] text-choco/60 ${MOTION ? 'hero-in d450' : ''}`}>{SITE.sloganSub}</p>
          <div className={`mt-8 flex flex-wrap items-center gap-4 ${MOTION ? 'hero-in d450' : ''}`}>
            <button
              onClick={() => goTo('#apply')}
              className="px-8 py-4 rounded-full bg-coral text-milk text-[1rem] font-extrabold hover:bg-choco"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              입소 상담 신청
            </button>
            <button
              onClick={() => goTo('#classes')}
              className="text-[1rem] font-extrabold border-b-[3px] border-sun pb-0.5 hover:text-coral"
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              반 안내 보기
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 반 안내 ──────────────────────────────────────────────────────────────────

function Classes() {
  const { ref, inView } = useInView()
  return (
    <section id="classes" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-cloud">
      <div className="mx-auto max-w-5xl px-5">
        <Head title="다섯 개의 반" sub={SITE.classNote} inView={inView} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SITE.classes.map((c, i) => (
            <div key={c.name} className={`sticker rounded-[26px] bg-milk border-2 border-choco/8 p-6 text-center ${MOTION ? `anim-fade-up d${i * 70 + 70}` : ''} ${inView ? 'in-view' : ''}`}>
              <span className={`inline-block w-4 h-4 rounded-full ${DOT[c.color]}`} aria-hidden />
              <h3 className="mt-3 text-[1.25rem] font-extrabold">{c.name}</h3>
              <p className="mt-1 text-[0.95rem] font-bold text-choco/60">{c.age}</p>
              <p className="mt-2 text-[0.82rem] text-choco/45">{c.size}</p>
            </div>
          ))}
        </div>
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
        <Head title="숲속의 하루" sub="매일 바깥놀이 1시간은 거르지 않습니다. 미세먼지가 나쁜 날은 실내 대근육 놀이로 바꿉니다." inView={inView} />
        <ol className="space-y-3">
          {SITE.daily.map((d, i) => (
            <li key={d.t} className={`flex items-center gap-5 rounded-2xl bg-cloud px-6 py-4 ${MOTION ? `anim-fade-up d${(i % 3) * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <span className="nums shrink-0 w-16 text-[1.05rem] font-extrabold text-coral">{d.t}</span>
              <p className="text-[1rem] font-semibold">{d.what}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ─── 선생님 ───────────────────────────────────────────────────────────────────

function Teachers() {
  const { ref, inView } = useInView()
  return (
    <section id="teachers" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-cloud">
      <div className="mx-auto max-w-5xl px-5">
        <Head title="아이 곁의 어른들" sub={SITE.teacherNote} inView={inView} />
        <div className="grid sm:grid-cols-2 gap-6">
          {SITE.teachers.map((t, i) => (
            <article key={t.name} className={`flex items-center gap-6 rounded-[26px] bg-milk border-2 border-choco/8 p-6 ${MOTION ? `anim-fade-up d${i * 120 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="w-24 shrink-0 overflow-hidden rounded-2xl">
                {/* 여기에 선생님 사진 교체 */}
                <img src={t.img} alt={t.name} className="w-full aspect-square object-cover" />
              </div>
              <div>
                <p className="text-[1.15rem] font-extrabold">{t.name}</p>
                <p className="mt-1.5 text-[0.92rem] text-choco/60">{t.career}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 급식 ─────────────────────────────────────────────────────────────────────

function Meal() {
  const { ref, inView } = useInView()
  return (
    <section id="meal" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Head title="이번 주 밥상" sub={SITE.meal.note} inView={inView} />
        <ul className={`rounded-[26px] border-2 border-choco/8 bg-milk overflow-hidden ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.meal.items.map((m, i) => (
            <li key={m.day} className={`flex items-center gap-5 px-6 py-4 ${i > 0 ? 'border-t border-choco/8' : ''}`}>
              <span className={`grid place-items-center shrink-0 w-10 h-10 rounded-full text-milk text-[1rem] font-extrabold ${['bg-coral', 'bg-sun', 'bg-skyb', 'bg-coral', 'bg-skyb'][i]}`}>
                {m.day}
              </span>
              <p className="text-[0.98rem] font-semibold text-choco/80">{m.menu}</p>
            </li>
          ))}
        </ul>
        <p className={`mt-4 text-[0.85rem] text-choco/45 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          * 식단 예시입니다. 실제 식단표는 매주 알림장으로 보내드립니다.
        </p>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function Faq() {
  const { ref, inView } = useInView()
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-cloud">
      <div className="mx-auto max-w-3xl px-5">
        <Head title="자주 묻는 질문" inView={inView} />
        <div className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.faq.map((g, i) => (
            <div key={g.q} className="border-b-2 border-choco/8">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full py-5 flex items-center justify-between text-left gap-4">
                <span className="text-[1.02rem] font-extrabold">{g.q}</span>
                <span className={`text-coral text-[1.3rem] leading-none shrink-0 ${MOTION ? 'transition-transform duration-300' : ''} ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div className={`overflow-hidden ${MOTION ? 'transition-[max-height,opacity] duration-400' : ''} ${open === i ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="pb-5 text-[0.96rem] leading-[1.8] text-choco/65">{g.a}</p>
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
        <Head title="학부모님의 말" inView={inView} />
        <div className="grid md:grid-cols-3 gap-6">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`sticker rounded-[26px] bg-cloud p-7 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[0.98rem] leading-[1.8] text-choco/75">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between gap-2">
                <span className="text-[0.9rem] font-extrabold">{r.name}</span>
                <span className="text-[0.8rem] font-bold text-coral shrink-0">{r.tag}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 입소 상담 ────────────────────────────────────────────────────────────────

function Apply() {
  const { ref, inView } = useInView()
  const [age, setAge] = useState<string>(SITE.apply.ages[1])
  const [when, setWhen] = useState('')
  const smsBody = `[입소상담] 연령: ${age} / 희망 시기: ${when || '상담 후 결정'}`
  return (
    <section id="apply" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-choco text-milk">
      <div className="mx-auto max-w-3xl px-5">
        <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
          <h2 className="text-[clamp(1.8rem,4.2vw,2.6rem)] font-extrabold tracking-[-0.02em]">입소 상담 · 견학 신청</h2>
          <p className="mt-4 max-w-xl text-[1rem] leading-[1.8] text-milk/60 whitespace-pre-line">{SITE.apply.lead}</p>
        </div>
        <div className={`space-y-8 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <div>
            <p className="text-[0.9rem] font-extrabold text-milk/50 mb-3">1 · 아이 연령</p>
            <div className="flex flex-wrap gap-2.5">
              {SITE.apply.ages.map((a) => (
                <button
                  key={a}
                  onClick={() => setAge(a)}
                  className={`px-5 py-3 rounded-full text-[0.95rem] font-extrabold ${age === a ? 'bg-sun text-choco' : 'bg-milk/10 text-milk/65 hover:bg-milk/20'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.9rem] font-extrabold text-milk/50 mb-3">2 · 입소 희망 시기 (선택)</p>
            <input
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              placeholder="예) 내년 3월, 견학도 하고 싶어요"
              className="w-full bg-transparent border-b-2 border-milk/30 px-1 py-4 text-[1rem] text-milk placeholder:text-milk/35 focus:outline-none focus:border-sun"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-4 rounded-full text-center bg-sun text-choco text-[1.02rem] font-extrabold hover:bg-milk"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              문자로 상담 신청
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex-1 py-4 rounded-full text-center border-2 border-milk/30 text-[1.02rem] font-extrabold hover:border-sun hover:text-sun"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              전화 {SITE.phone}
            </a>
          </div>
          <p className="text-[0.85rem] text-milk/45">견학은 아이들 낮잠 시간(13–15시)에 조용히 진행됩니다.</p>
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
        <Head title="오시는 길" inView={inView} />
        <div className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <p className="text-[1.15rem] font-extrabold">{SITE.address}</p>
          <ul className="mt-5 space-y-2.5 text-[0.98rem] text-choco/65">
            <li>· {SITE.location.walk}</li>
            <li>· {SITE.location.parking}</li>
            <li>· {SITE.location.landmark}</li>
          </ul>
          <a
            href={SITE.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-7 px-6 py-3 rounded-full border-2 border-choco/15 text-[0.92rem] font-extrabold hover:border-coral hover:text-coral"
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
    <footer className="border-t-2 border-choco/8 py-12 pb-28 md:pb-12 bg-cloud">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="flex items-center gap-2 text-[1.15rem] font-extrabold">
            <span className="flex -space-x-1" aria-hidden>
              <span className="w-3.5 h-3.5 rounded-full bg-coral" />
              <span className="w-3.5 h-3.5 rounded-full bg-sun" />
              <span className="w-3.5 h-3.5 rounded-full bg-skyb" />
            </span>
            {SITE.name}
          </p>
          <p className="mt-3 text-[0.85rem] leading-relaxed text-choco/50">
            {SITE.ceo} · 사업자등록번호 {SITE.bizNo} · {SITE.license}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="text-[0.8rem] text-choco/40">사진은 학부모 동의를 받은 활동 사진입니다.</p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t-2 border-choco/8 bg-milk">
      <a href={`tel:${SITE.phone}`} className="py-4 text-center text-[0.98rem] font-extrabold">
        전화 문의
      </a>
      <button onClick={() => goTo('#apply')} className="py-4 text-center text-[0.98rem] font-extrabold bg-coral text-milk">
        입소 상담
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
    <div className="bg-milk text-choco">
      <Header active={active} />
      <Hero />
      <Classes />
      <Daily />
      <Teachers />
      <Meal />
      <Faq />
      <Reviews />
      <Apply />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
