import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'
import { Stethoscope, SmilePlus, Slice, Scissors, Home, Cat, Dog, Moon, PawPrint } from 'lucide-react'

/* 이미지 — src/images/ 안의 파일을 같은 이름으로 덮어쓰면 그대로 반영됩니다 */
import heroImg from './images/hero.jpg'
import doctorImg1 from './images/doctor-1.jpg'
import doctorImg2 from './images/doctor-2.jpg'
import facilityImg1 from './images/facility-1.jpg'
import facilityImg2 from './images/facility-2.jpg'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

const SITE = {
  // 여기에 병원 기본 정보 교체
  name: '곁에동물병원',
  nameEn: 'GYEOTE ANIMAL CLINIC',
  tagline: '진료 · 미용 · 호텔 · 망우',
  slogan: '말 못하는 가족의 말을,\n대신 듣습니다',
  sloganSub:
    '아이가 아픈 이유를 보호자님이 이해하실 때까지 설명합니다. 진료, 미용, 호텔까지 — 한 병원에서 아이의 평생을 기록합니다.',

  // 여기에 연락처 교체
  phone: '02-1234-5678',
  smsPhone: '01012345678',
  kakaoId: '@곁에동물병원',
  instagram: '@gyeote.vet',

  // 여기에 사업자 정보 교체
  ceo: '대표원장 박곁에',
  bizNo: '123-45-67890',
  address: '서울특별시 중랑구 망우로 123, 1층',

  hours: [
    { day: '평일', time: '09:30 – 20:00' },
    { day: '토 · 일', time: '10:00 – 17:00' },
    { day: '공휴일', time: '10:00 – 14:00' },
  ],
  emergencyNote: '야간 응급은 전화 주시면 24시 협력병원(도보 10분)으로 바로 연결해 드립니다.',

  // 여기에 히어로 사진 교체
  heroPhoto: heroImg,
  heroPhotoLabel: '진료실',

  nav: [
    { label: '진료 안내', href: '#care' },
    { label: '요금 안내', href: '#price' },
    { label: '접종 스케줄', href: '#vaccine' },
    { label: '의료진', href: '#doctors' },
    { label: '첫 방문 안내', href: '#guide' },
    { label: '예약', href: '#reserve' },
  ],

  stats: [
    { n: 11, suffix: '년', label: '망우동에서' },
    { n: 9800, suffix: '+', label: '진료 차트' },
    { n: 24, suffix: '시', label: '응급 연계' },
    { n: 4.9, suffix: '', label: '보호자 평점', decimal: true },
  ],

  // 진료 안내
  care: [
    { icon: Stethoscope, name: '내과 진료', desc: '구토 · 설사 · 피부 · 심장 정기검진. 혈액검사 결과는 당일 설명드립니다.' },
    { icon: SmilePlus, name: '치과 · 스케일링', desc: '마취 전 검사 필수 진행. 노령견 저마취 프로토콜을 운영합니다.' },
    { icon: Slice, name: '외과 · 중성화', desc: '중성화 · 종양 제거 · 슬개골 수술. 수술 전 비용을 서면 안내합니다.' },
    { icon: Scissors, name: '미용', desc: '진료실 옆 미용실. 예민한 아이는 수의사가 곁에서 함께합니다.' },
    { icon: Home, name: '호텔', desc: '진료 기록이 있는 아이만 받습니다. 하루 두 번 사진과 영상을 보내드립니다.' },
    { icon: Cat, name: '고양이 친화 진료', desc: '강아지와 대기 공간을 분리했습니다. 이동장 그대로 진료 가능합니다.' },
  ],

  // 요금 안내 — 카테고리 탭
  priceTabs: ['진료', '미용', '호텔'] as const,
  priceNote: '체중 · 상태에 따라 달라질 수 있으며, 진료 전 예상 비용을 먼저 안내드립니다. (부가세 포함)',
  price: {
    진료: [
      { name: '기본 진찰', spec: '초진 · 재진 동일', price: '15,000원' },
      { name: '종합 백신 (강아지)', spec: 'DHPPL 1회', price: '25,000원' },
      { name: '종합 백신 (고양이)', spec: '3종 1회', price: '30,000원' },
      { name: '혈액검사 (기본)', spec: '건강검진 패널', price: '55,000원' },
      { name: '스케일링', spec: '마취 전 검사 별도', price: '150,000원 ~' },
      { name: '중성화 수술', spec: '수컷 기준 · 암컷 상담', price: '250,000원 ~' },
    ],
    미용: [
      { name: '위생 미용', spec: '발바닥 · 배 · 항문', price: '20,000원' },
      { name: '전체 클리핑', spec: '~5kg 기준', price: '45,000원' },
      { name: '가위컷', spec: '~5kg 기준 · 디자인컷', price: '70,000원 ~' },
      { name: '스파 · 약욕', spec: '피부 처방 샴푸', price: '35,000원' },
    ],
    호텔: [
      { name: '소형견 1박', spec: '~7kg · 산책 2회 포함', price: '35,000원' },
      { name: '중형견 1박', spec: '7–15kg · 산책 2회 포함', price: '45,000원' },
      { name: '고양이 1박', spec: '독립 룸 · 모래 개별', price: '35,000원' },
      { name: '장기 위탁 (7박~)', spec: '건강 체크 매일', price: '10% 할인' },
    ],
  },

  // 접종 스케줄 — 강아지 / 고양이 탭
  vaccineTabs: ['강아지', '고양이'] as const,
  vaccineNote: '아이마다 시기가 다를 수 있어요. 접종 수첩을 가져오시면 일정을 다시 짜드립니다.',
  vaccine: {
    강아지: [
      { age: '6 – 8주', shot: '종합백신 1차 + 코로나 1차', note: '첫 검진 · 구충 시작' },
      { age: '10 – 12주', shot: '종합백신 2차 + 코로나 2차', note: '켄넬코프 1차' },
      { age: '14 – 16주', shot: '종합백신 3차 + 켄넬코프 2차', note: '광견병 기초' },
      { age: '이후 매년', shot: '종합 + 광견병 보강', note: '심장사상충은 매달' },
    ],
    고양이: [
      { age: '8 – 9주', shot: '종합백신(3종) 1차', note: '첫 검진 · 범백 포함' },
      { age: '12주', shot: '종합백신 2차', note: '백혈병 검사 권장' },
      { age: '16주', shot: '종합백신 3차 + 광견병', note: '중성화 상담 시작' },
      { age: '이후 매년', shot: '종합 보강 접종', note: '치아 · 신장 정기검진' },
    ],
  },

  // 의료진 — 여기에 프로필 사진 교체
  doctors: [
    {
      img: doctorImg1,
      name: '박곁에',
      role: '대표원장 · 외과',
      career: ['건국대학교 수의과대학 졸업', '외과 임상 12년 · 슬개골 수술 1,500례'],
    },
    {
      img: doctorImg2,
      name: '정다정',
      role: '진료수의사 · 내과',
      career: ['서울대학교 수의과대학 졸업', '고양이 진료 · 노령 동물 내과 전담'],
    },
  ],

  // 첫 방문 안내
  guide: [
    { title: '데려오실 때', body: '평소 먹는 사료와 배변 상태를 알려주시면 진단이 빨라집니다. 구토 · 설사 시 사진도 도움이 됩니다.' },
    { title: '고양이 보호자님', body: '이동장 위에 담요를 덮어 오시면 아이가 덜 긴장합니다. 고양이 전용 대기 공간이 따로 있습니다.' },
    { title: '진료 기록', body: '다른 병원 기록이 있다면 지참해 주세요. 중복 검사 없이 이어서 진료합니다.' },
    { title: '비용 안내', body: '검사 · 수술 전 예상 비용을 먼저 말씀드립니다. 안내 없는 항목은 청구하지 않습니다.' },
  ],

  // 시설 — 여기에 시설 사진 교체
  facilities: [
    { img: facilityImg1, label: '고양이 전용 대기 공간' },
    { img: facilityImg2, label: '호텔링 룸' },
  ],

  reviews: [
    { text: '설사가 계속돼서 갔는데 필요한 검사만 하고, 사진 찍어가며 설명해 주셨어요. 과잉진료 걱정이 사라졌습니다.', name: '김O은 · 푸들 콩이', tag: '내과' },
    { text: '겁 많은 고양이인데 대기실이 분리돼 있어서 훨씬 안정적이었어요. 이동장 안에서 그대로 진료 봐주십니다.', name: '이O래 · 코숏 두부', tag: '고양이 진료' },
    { text: '호텔 맡기고 여행 갔는데 하루 두 번 영상이 와요. 산책하는 모습 보고 안심하고 다녀왔습니다.', name: '박O수 · 비숑 구름', tag: '호텔 3박' },
  ],

  reserve: {
    lead: '아이 정보와 원하시는 진료를 보내주시면\n예약 가능한 시간을 문자로 안내드립니다.',
    options: ['진료 · 검진', '예방접종', '미용', '호텔', '수술 상담'],
    pets: ['강아지', '고양이', '기타'],
  },

  location: {
    walk: '망우역 1번 출구 · 도보 5분',
    parking: '병원 앞 전용 주차 3대 · 만차 시 옆 공영주차장',
    landmark: '1층 통유리에 발자국 로고가 붙어 있는 건물입니다.',
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
      <p className={`inline-flex items-center gap-2 text-[0.75rem] tracking-[0.25em] uppercase font-bold ${dark ? 'text-amber' : 'text-amber-d'}`}>
        <span className="paw-dot" aria-hidden />
        {en}
      </p>
      <h2 className="mt-4 text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] leading-tight">{title}</h2>
      {sub && <p className={`mt-4 max-w-xl text-[0.98rem] leading-relaxed ${dark ? 'text-cream/60' : 'text-cocoa/60'}`}>{sub}</p>}
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
      className={`fixed top-0 inset-x-0 z-50 bg-cream/95 ${scrolled ? 'shadow-[0_1px_0_rgba(59,42,31,0.1)]' : ''}`}
      style={{ transition: MOTION ? 'box-shadow 0.25s' : 'none', backdropFilter: 'blur(10px)' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[72px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-center gap-2.5">
          <span className="grid place-items-center w-8 h-8 rounded-xl bg-cocoa text-amber" aria-hidden>
            <PawPrint size={17} strokeWidth={2.4} />
          </span>
          <span className="text-[1.12rem] font-extrabold tracking-tight">{SITE.name}</span>
          <span className="hidden sm:inline text-[0.72rem] text-cocoa/50 ml-1">{SITE.tagline}</span>
        </button>
        <nav className="hidden lg:flex items-center gap-6">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[0.88rem] font-semibold ${active === n.href.slice(1) ? 'text-amber-d' : 'text-cocoa/65 hover:text-cocoa'}`}
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
        <a
          href={`tel:${SITE.phone}`}
          className="nums px-5 py-2.5 rounded-full bg-cocoa text-cream text-[0.875rem] font-bold hover:bg-amber-d"
          style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
        >
          {SITE.phone}
        </a>
          {/* 1024px 미만 — 내비를 접고 햄버거로 연다. 768~1023 에서 내비가 두 줄로 눌리던 것을 막는다 */}
          <button className="lg:hidden p-2 -mr-2 text-cocoa" aria-label="메뉴" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span className="block w-6 space-y-1.5">
              <span className="block h-0.5 bg-current" />
              <span className={`block h-0.5 bg-current ${open ? 'opacity-0' : ''}`} />
              <span className="block h-0.5 bg-current" />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-cocoa/15 bg-cream px-5 py-2">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => { setOpen(false); goTo(n.href) }}
              className="block w-full text-left py-3.5 text-[1rem] font-semibold text-cocoa border-b border-cocoa/10 last:border-0"
            >
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

// ─── 히어로 ───────────────────────────────────────────────────────────────────

/* 히어로 콜라주 — 진료실 · 고양이 대기 공간 · 호텔 룸 세 장이 서로 겹칩니다.
   사진은 SITE.heroPhoto 와 SITE.facilities 의 이미지를 그대로 씁니다. */
const HERO_SHOTS = [
  {
    img: SITE.heroPhoto,
    label: SITE.heroPhotoLabel,
    alt: '병원에 온 강아지',
    box: 'col-span-2 md:absolute md:left-0 md:top-[7%] md:w-[62%]',
    frame: 'aspect-[16/10] md:aspect-[4/5]',
    delay: '',
  },
  {
    img: SITE.facilities[0].img,
    label: SITE.facilities[0].label,
    alt: SITE.facilities[0].label,
    box: 'hx-ph-b md:absolute md:right-[1%] md:top-0 md:z-20 md:w-[50%]',
    frame: 'aspect-[4/3]',
    delay: 'hx-d2',
  },
  {
    img: SITE.facilities[1].img,
    label: SITE.facilities[1].label,
    alt: SITE.facilities[1].label,
    box: 'hx-ph-c md:absolute md:right-[6%] md:bottom-[7%] md:z-10 md:w-[46%]',
    frame: 'aspect-[4/3] md:aspect-[1/1]',
    delay: 'hx-d3',
  },
]

function Hero() {
  return (
    <section className="hx-hero relative overflow-hidden bg-cream pt-[72px]">
      <div className="mx-auto max-w-6xl px-5 pt-9 pb-12 md:pt-14 md:pb-16">
        <div className="grid gap-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] md:items-center md:gap-8">
          {/* ── 카피 ── */}
          <div>
            <p className={`inline-flex items-center gap-2 rounded-full bg-amber/25 px-3.5 py-1.5 text-[0.78rem] font-bold ${MOTION ? 'hx-rise' : ''}`}>
              <PawPrint size={14} strokeWidth={2.6} aria-hidden />
              진료 · 미용 · 호텔을 한곳에서
            </p>
            <h1
              className={`mt-5 whitespace-pre-line text-[clamp(1.85rem,4.2vw,2.85rem)] leading-[1.22] font-extrabold tracking-[-0.035em] ${MOTION ? 'hx-rise hx-d1' : ''}`}
            >
              {SITE.slogan}
            </h1>
            <p className={`mt-4 max-w-[31rem] text-[0.98rem] leading-relaxed text-cocoa/70 ${MOTION ? 'hx-rise hx-d2' : ''}`}>{SITE.sloganSub}</p>
            <div className={`mt-7 flex flex-wrap items-center gap-4 ${MOTION ? 'hx-rise hx-d3' : ''}`}>
              <a
                href="#reserve"
                onClick={(e) => {
                  e.preventDefault()
                  goTo('#reserve')
                }}
                className="hx-cta rounded-full bg-cocoa px-7 py-3.5 text-[0.92rem] font-bold text-cream hover:bg-amber-d"
                style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
              >
                진료 예약하기
              </a>
              <a
                href="#price"
                onClick={(e) => {
                  e.preventDefault()
                  goTo('#price')
                }}
                className="hx-cta-line border-b-2 border-cocoa pb-0.5 text-[0.92rem] font-bold hover:border-amber-d hover:text-amber-d"
                style={{ transition: MOTION ? 'color 0.2s, border-color 0.2s' : 'none' }}
              >
                요금 안내 보기
              </a>
            </div>
          </div>

          {/* ── 사진 세 장 — PC 는 겹치고, 모바일은 겹침을 풀어 나란히 ── */}
          <div className="grid max-w-[27rem] grid-cols-2 gap-3 md:relative md:block md:aspect-[27/23] md:max-w-none">
            {HERO_SHOTS.map((s) => (
              <figure key={s.label} className={s.box}>
                <div
                  className={`relative overflow-hidden rounded-[20px] shadow-[0_16px_40px_rgba(59,42,31,0.16)] ring-[5px] ring-cream ${s.frame} ${MOTION ? `hx-photo ${s.delay}` : ''}`}
                >
                  <img src={s.img} alt={s.alt} className="h-full w-full object-cover" />
                  <figcaption className="absolute inset-x-0 top-0 md:top-auto md:bottom-0 bg-cocoa/80 px-3 py-1.5 text-[0.72rem] font-bold text-cream md:text-[0.78rem]">{s.label}</figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        {/* ── 사진 아래를 가로지르는 실적 · 진료시간 띠 ── */}
        <div className="mt-9 flex flex-col gap-5 border-t border-cocoa/12 pt-6 md:mt-12 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className={`flex flex-wrap items-center gap-x-7 gap-y-2.5 ${MOTION ? 'hx-rise hx-d3' : ''}`}>
            {SITE.stats.map((st) => (
              <p key={st.label} className="flex items-baseline gap-1.5">
                <span className="nums text-[1.18rem] font-extrabold">
                  {'decimal' in st && (st as { decimal?: boolean }).decimal ? st.n.toFixed(1) : st.n.toLocaleString()}
                  {st.suffix}
                </span>
                <span className="text-[0.82rem] text-cocoa/70">{st.label}</span>
              </p>
            ))}
          </div>
          <div className={`flex flex-col gap-2 md:items-end ${MOTION ? 'hx-rise hx-d3' : ''}`}>
            <p className="flex items-center gap-2 text-[0.84rem] font-bold">
              <span className="hx-pulse" aria-hidden />
              야간 응급 24시 연계
            </p>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-[0.82rem] text-cocoa/70 md:justify-end">
              {SITE.hours.map((h) => (
                <span key={h.day} className="nums whitespace-nowrap">
                  <b className="font-bold text-cocoa">{h.day}</b> {h.time}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 진료 안내 ────────────────────────────────────────────────────────────────

function Care() {
  const { ref, inView } = useInView()
  return (
    <section id="care" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="Services" title="진료 안내" inView={inView} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SITE.care.map((c, i) => (
            <article
              key={c.name}
              className={`care p-7 rounded-[22px] bg-cream border border-cocoa/10 ${MOTION ? `anim-fade-up d${(i % 3) * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}
            >
              <span className="inline-grid place-items-center w-11 h-11 rounded-2xl bg-amber/15 text-amber-d" aria-hidden>
                <c.icon size={22} strokeWidth={2.2} />
              </span>
              <h3 className="mt-4 text-[1.12rem] font-extrabold">{c.name}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-cocoa/60">{c.desc}</p>
            </article>
          ))}
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
    <section id="price" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-butter/50">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="Price" title="요금 안내" inView={inView} />
        <div className={`flex gap-2 mb-8 ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.priceTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-full text-[0.9rem] font-bold ${tab === t ? 'bg-cocoa text-cream' : 'bg-cream text-cocoa/60 border border-cocoa/15 hover:border-cocoa/40'}`}
              style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
            >
              {t}
            </button>
          ))}
        </div>
        <ul key={tab} className={`rounded-[22px] bg-cream border border-cocoa/10 px-7 py-2 ${MOTION ? 'menu-in' : ''}`}>
          {SITE.price[tab].map((m) => (
            <li key={m.name} className="flex items-baseline gap-3 py-4 border-b border-cocoa/8 last:border-0">
              <div className="min-w-0">
                <p className="text-[1rem] font-bold">{m.name}</p>
                <p className="mt-0.5 text-[0.82rem] text-cocoa/50">{m.spec}</p>
              </div>
              <span className="leader flex-1" />
              <span className="nums text-[1rem] font-extrabold shrink-0">{m.price}</span>
            </li>
          ))}
        </ul>
        <p className={`mt-5 text-[0.82rem] text-cocoa/50 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>{SITE.priceNote}</p>
      </div>
    </section>
  )
}

// ─── 접종 스케줄 ──────────────────────────────────────────────────────────────

function Vaccine() {
  const { ref, inView } = useInView()
  const [tab, setTab] = useState<(typeof SITE.vaccineTabs)[number]>(SITE.vaccineTabs[0])
  return (
    <section id="vaccine" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <Head en="Vaccination" title="예방접종 스케줄" sub="처음 아이를 데려오셨다면, 이 표 그대로 오시면 됩니다." inView={inView} />
        <div className={`flex gap-2 mb-8 ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.vaccineTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-full text-[0.9rem] font-bold ${tab === t ? 'bg-amber-d text-cream' : 'bg-butter/70 text-cocoa/60 hover:bg-butter'}`}
              style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
            >
              <span className="inline-flex items-center gap-1.5">
                {t === '강아지' ? <Dog size={16} strokeWidth={2.4} /> : <Cat size={16} strokeWidth={2.4} />}
                {t}
              </span>
            </button>
          ))}
        </div>
        <ol key={tab} className={`relative ${MOTION ? 'menu-in' : ''}`}>
          <span className="absolute left-[7px] top-3 bottom-3 w-px bg-amber/40" aria-hidden />
          {SITE.vaccine[tab].map((v) => (
            <li key={v.age} className="relative pl-8 pb-7 last:pb-0">
              <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-amber border-[3px] border-cream shadow-[0_0_0_1px_rgba(59,42,31,0.15)]" aria-hidden />
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="nums text-[0.95rem] font-extrabold text-amber-d">{v.age}</span>
                <h3 className="text-[1.02rem] font-bold">{v.shot}</h3>
              </div>
              <p className="mt-1 text-[0.85rem] text-cocoa/55">{v.note}</p>
            </li>
          ))}
        </ol>
        <p className={`mt-6 text-[0.82rem] text-cocoa/50 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>{SITE.vaccineNote}</p>
      </div>
    </section>
  )
}

// ─── 의료진 ───────────────────────────────────────────────────────────────────

function Doctors() {
  const { ref, inView } = useInView()
  return (
    <section id="doctors" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-butter/50">
      <div className="mx-auto max-w-5xl px-5">
        <Head en="Doctors" title="의료진 소개" inView={inView} />
        <div className="grid sm:grid-cols-2 gap-6">
          {SITE.doctors.map((d, i) => (
            <article key={d.name} className={`flex gap-6 p-6 rounded-[22px] bg-cream border border-cocoa/10 ${MOTION ? `anim-fade-up d${i * 120 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="w-32 shrink-0 overflow-hidden rounded-2xl">
                {/* 여기에 의료진 프로필 사진 교체 */}
                <img src={d.img} alt={d.name} className="w-full aspect-[4/5] object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-[1.2rem] font-extrabold">{d.name}</p>
                <p className="mt-0.5 text-[0.82rem] font-bold text-amber-d">{d.role}</p>
                <ul className="mt-3 space-y-1">
                  {d.career.map((l) => (
                    <li key={l} className="text-[0.82rem] text-cocoa/60 flex gap-1.5">
                      <span className="text-amber-d">·</span>
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

// ─── 첫 방문 안내 ─────────────────────────────────────────────────────────────

function Guide() {
  const { ref, inView } = useInView()
  return (
    <section id="guide" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-cocoa text-cream">
      <div className="mx-auto max-w-6xl px-5">
        <Head en="First Visit" title="처음 오시나요?" inView={inView} dark />
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-9">
          {SITE.guide.map((g, i) => (
            <div key={g.title} className={`${MOTION ? `anim-fade-up d${i * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[1.05rem] font-extrabold text-amber">{g.title}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-cream/70">{g.body}</p>
            </div>
          ))}
        </div>
        <div className={`mt-12 grid sm:grid-cols-2 gap-5 ${MOTION ? 'anim-fade-up d280' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.facilities.map((f) => (
            <figure key={f.label}>
              {/* 여기에 시설 사진 교체 */}
              <img src={f.img} alt={f.label} className="w-full aspect-[16/9] object-cover rounded-2xl" />
              <figcaption className="mt-3 text-[0.88rem] font-bold text-cream/80">{f.label}</figcaption>
            </figure>
          ))}
        </div>
        <p className={`mt-10 pt-7 border-t border-cream/15 text-[0.9rem] text-cream/60 ${MOTION ? 'anim-fade-up d320' : ''} ${inView ? 'in-view' : ''}`}>
          <Moon size={15} strokeWidth={2.4} className="inline -mt-0.5 mr-1.5 text-amber" aria-hidden /> {SITE.emergencyNote}
        </p>
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
        <Head en="Reviews" title="보호자님들의 이야기" inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`p-7 rounded-[22px] bg-butter/60 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[0.95rem] leading-relaxed text-cocoa/75">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between gap-2">
                <span className="text-[0.83rem] font-bold">{r.name}</span>
                <span className="text-[0.78rem] font-bold text-amber-d shrink-0">{r.tag}</span>
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
  const [pet, setPet] = useState<string>(SITE.reserve.pets[0])
  const [opt, setOpt] = useState<string>(SITE.reserve.options[0])
  const [when, setWhen] = useState('')
  const smsBody = `[예약문의] 아이: ${pet} / 항목: ${opt} / 희망: ${when || '상담 후 결정'}`
  return (
    <section id="reserve" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-butter/50">
      <div className="mx-auto max-w-3xl px-5">
        <Head en="Reservation" title="진료 예약" inView={inView} />
        <p className={`-mt-6 mb-10 text-[0.98rem] leading-relaxed text-cocoa/60 whitespace-pre-line ${MOTION ? 'anim-fade-up d80' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.reserve.lead}
        </p>
        <div className={`space-y-7 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-cocoa/50 mb-2.5">01 · 어떤 아이인가요</p>
            <div className="flex gap-2">
              {SITE.reserve.pets.map((s) => (
                <button
                  key={s}
                  onClick={() => setPet(s)}
                  className={`px-5 py-2.5 rounded-full text-[0.88rem] font-bold ${pet === s ? 'bg-cocoa text-cream' : 'bg-cream border border-cocoa/15 text-cocoa/60 hover:border-cocoa/40'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-cocoa/50 mb-2.5">02 · 필요한 항목</p>
            <div className="flex flex-wrap gap-2">
              {SITE.reserve.options.map((s) => (
                <button
                  key={s}
                  onClick={() => setOpt(s)}
                  className={`px-4 py-2.5 rounded-full text-[0.88rem] font-bold ${opt === s ? 'bg-amber-d text-cream' : 'bg-cream border border-cocoa/15 text-cocoa/60 hover:border-cocoa/40'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-cocoa/50 mb-2.5">03 · 희망 시간 (선택)</p>
            <input
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              placeholder="예) 토요일 오전"
              className="w-full bg-cream border border-cocoa/15 rounded-xl px-4 py-3.5 text-[0.95rem] focus:outline-none focus:border-amber-d"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-4 rounded-full text-center bg-cocoa text-cream text-[0.98rem] font-bold hover:bg-amber-d"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              문자로 예약 문의
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex-1 py-4 rounded-full text-center border-2 border-cocoa/20 text-[0.98rem] font-bold hover:border-amber-d hover:text-amber-d"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              전화 {SITE.phone}
            </a>
          </div>
          <p className="text-[0.8rem] text-cocoa/45">응급 상황은 문자보다 전화가 빠릅니다. {SITE.phone}</p>
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
          <p className="text-[1.1rem] font-bold">{SITE.address}</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem] text-cocoa/65">
            <li>· {SITE.location.walk}</li>
            <li>· {SITE.location.parking}</li>
            <li>· {SITE.location.landmark}</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2">
            {SITE.hours.map((h) => (
              <p key={h.day} className="text-[0.9rem]">
                <span className="text-cocoa/45 mr-2.5">{h.day}</span>
                <span className="nums font-bold">{h.time}</span>
              </p>
            ))}
          </div>
          <a
            href={SITE.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-7 px-6 py-3 rounded-full border-2 border-cocoa/20 text-[0.9rem] font-bold hover:border-amber-d hover:text-amber-d"
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
    <footer className="border-t border-cocoa/8 py-12 pb-28 md:pb-12 bg-butter/40">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="flex items-center gap-2 text-[1.1rem] font-extrabold">
            <span className="grid place-items-center w-7 h-7 rounded-lg bg-cocoa text-amber" aria-hidden>
              <PawPrint size={15} strokeWidth={2.4} />
            </span>
            {SITE.name}
          </p>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-cocoa/45">
            {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="text-[0.78rem] text-cocoa/35">
          instagram {SITE.instagram} · kakao {SITE.kakaoId}
        </p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t border-cocoa/10 bg-cream">
      <a href={`tel:${SITE.phone}`} className="py-4 text-center text-[0.95rem] font-bold">
        전화 문의
      </a>
      <button onClick={() => goTo('#reserve')} className="py-4 text-center text-[0.95rem] font-bold bg-cocoa text-cream">
        진료 예약
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
    <div className="bg-cream text-cocoa">
      <Header active={active} />
      <Hero />
      <Care />
      <Price />
      <Vaccine />
      <Doctors />
      <Guide />
      <Reviews />
      <Reserve />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
