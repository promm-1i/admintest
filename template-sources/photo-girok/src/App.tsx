import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

/* 이미지 — src/images/ 안의 파일을 같은 이름으로 덮어쓰면 그대로 반영됩니다 */
import heroImg from './images/hero.jpg'
import gImg1 from './images/g-1.jpg'
import gImg2 from './images/g-2.jpg'
import gImg3 from './images/g-3.jpg'
import gImg4 from './images/g-4.jpg'
import gImg5 from './images/g-5.jpg'
import gImg6 from './images/g-6.jpg'
import artistImg from './images/artist.jpg'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

const SITE = {
  // 여기에 사진관 기본 정보 교체
  name: '사진관 기록',
  nameEn: 'STUDIO GIROK',
  tagline: '인물 전문 사진관 · 서촌',
  slogan: '지금의 얼굴을,\n오래 남게',
  sloganSub:
    '잘 나온 사진보다 나다운 사진. 촬영 전 20분 대화로 표정이 풀릴 때까지 기다렸다가, 그때부터 셔터를 누릅니다.',

  // 여기에 연락처 교체
  phone: '02-1234-5678',
  smsPhone: '01012345678',
  kakaoId: '@사진관기록',
  instagram: '@studio.girok',

  // 여기에 사업자 정보 교체
  ceo: '대표 사진가 한기록',
  bizNo: '123-45-67890',
  address: '서울특별시 종로구 자하문로 123, 2층',

  hours: [
    { day: '화 – 토', time: '10:00 – 19:00' },
    { day: '일요일', time: '예약 촬영만' },
    { day: '월요일', time: '정기 휴무' },
  ],

  // 여기에 히어로 사진 교체 (배경 = 촬영 현장)
  heroPhoto: heroImg,

  // 히어로 콜라주 — 여기에 대표 컷 3장 교체 (왼쪽 큰 것부터 순서대로)
  heroPrints: [
    { img: gImg1, cap: '개인 프로필' },
    { img: gImg2, cap: '흑백 초상' },
    { img: gImg5, cap: '가족 사진' },
  ],

  nav: [
    { label: '갤러리', href: '#gallery' },
    { label: '촬영 상품', href: '#products' },
    { label: '촬영 과정', href: '#process' },
    { label: '사진가', href: '#artist' },
    { label: '자주 묻는 질문', href: '#faq' },
    { label: '예약', href: '#reserve' },
  ],

  // 갤러리 — 여기에 대표작 교체
  gallery: [
    { img: gImg1, cap: '개인 프로필', no: '001' },
    { img: gImg2, cap: '흑백 초상', no: '002' },
    { img: gImg3, cap: '웨딩 리허설', no: '003' },
    { img: gImg4, cap: '배우 프로필', no: '004' },
    { img: gImg5, cap: '가족 사진', no: '005' },
    { img: gImg6, cap: '작업 노트', no: '006' },
  ],

  // 촬영 상품
  productsNote: '모든 상품에 원본 전체 파일 제공 · 보정본은 추가 구매 가능(장당 15,000원) · 부가세 포함',
  products: [
    {
      name: '증명 · 여권',
      price: '25,000원',
      time: '15분',
      includes: ['기본 보정 2컷', '규격 인화 8매', '당일 파일 전송'],
      hot: false,
    },
    {
      name: '개인 프로필',
      price: '150,000원',
      time: '60분',
      includes: ['컨셉 상담 20분', '의상 2벌 · 배경 2종', '정밀 보정 4컷', '원본 전체 제공'],
      hot: true,
    },
    {
      name: '가족 사진',
      price: '250,000원',
      time: '90분',
      includes: ['최대 6인', '정밀 보정 6컷', '11×14 액자 1점', '원본 전체 제공'],
      hot: false,
    },
    {
      name: '흑백 초상 시리즈',
      price: '200,000원',
      time: '75분',
      includes: ['기록 시그니처 조명', '정밀 보정 5컷', '파인아트 인화 1매'],
      hot: false,
    },
  ],

  // 촬영 과정
  process: [
    { step: 'A', name: '예약 · 상담', desc: '문자로 원하는 촬영과 날짜를 보내주시면, 참고 사진과 의상 가이드를 먼저 드립니다.' },
    { step: 'B', name: '촬영 전 대화', desc: '카메라 없이 20분 대화부터. 긴장이 풀린 표정이 나올 때 촬영을 시작합니다.' },
    { step: 'C', name: '촬영', desc: '중형 디지털 + 필름 병행. 모니터로 함께 확인하며 원하는 방향으로 조정합니다.' },
    { step: 'D', name: '셀렉 · 보정', desc: '일주일 안에 전체 원본을 드리고, 함께 고른 컷만 정밀 보정합니다. 과한 보정은 하지 않습니다.' },
  ],

  // 사진가 — 여기에 프로필 교체
  artist: {
    img: artistImg,
    name: '한기록',
    career: [
      '상업 · 인물 사진 14년',
      '전 매거진 피처 포토그래퍼',
      '개인전 「얼굴의 온도」 (2024)',
      '중형 필름 · 디지털 병행 작업',
    ],
    words: '사진관에서 찍은 사진이 어색한 이유는 카메라 앞의 10분이 전부이기 때문입니다. 저는 그 10분을 늘리는 일을 합니다.',
  },

  faq: [
    { q: '보정은 어디까지 해주나요?', a: '피부결 정리, 명암·색 보정까지가 기본입니다. 얼굴형 변형 같은 과한 보정은 하지 않는 것이 원칙이지만, 원하시는 방향이 있으면 셀렉 때 함께 정합니다.' },
    { q: '원본을 모두 받을 수 있나요?', a: '네. 증명사진을 제외한 모든 상품은 촬영 원본 전체를 파일로 드립니다.' },
    { q: '의상과 메이크업은요?', a: '의상은 2벌까지 갈아입으실 수 있고, 간단한 헤어 · 메이크업 수정 공간이 있습니다. 전문 메이크업이 필요하면 제휴샵을 연결해 드립니다.' },
    { q: '아이 · 반려견 촬영도 되나요?', a: '가족 사진 상품으로 가능합니다. 아이 컨디션에 맞춰 쉬는 시간을 넉넉히 잡으니 예약 시 미리 알려주세요.' },
    { q: '결과물은 언제 받나요?', a: '원본은 3일 안에, 보정본은 셀렉 후 7일 안에 드립니다. 급하신 경우(면접 등) 당일 보정도 가능합니다.' },
  ],

  reviews: [
    { text: '증명사진 찍으러 갔다가 프로필까지 예약했어요. 대화하다 보니 긴장이 풀려서, 제 사진 중에 처음으로 마음에 드는 게 나왔습니다.', name: '김O담', tag: '개인 프로필' },
    { text: '부모님 칠순 기념 가족사진. 아버지가 웃는 사진이 거의 없는데, 자연스럽게 웃는 컷을 건졌어요. 액자 품질도 훌륭합니다.', name: '박O영', tag: '가족 사진' },
    { text: '흑백 초상은 정말 작품이에요. 10년 뒤에 또 찍으러 오라는 말이 인사말이 아니라 진심으로 들렸습니다.', name: '정O우', tag: '흑백 초상' },
  ],

  reserve: {
    lead: '원하시는 촬영과 날짜를 보내주시면\n가능한 시간과 준비 가이드를 문자로 드립니다.',
  },

  location: {
    walk: '경복궁역 3번 출구 · 도보 8분',
    parking: '인근 공영주차장 30분 지원 (도보 2분)',
    landmark: '한옥 카페 골목 안쪽, 검정 문 2층입니다.',
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

function Head({ no, en, title, sub, inView }: { no: string; en: string; title: React.ReactNode; sub?: string; inView: boolean }) {
  return (
    <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
      <p className="f-mono text-[0.75rem] tracking-[0.25em] uppercase text-silver/70">
        <span className="text-flash">{no}</span> / {en}
      </p>
      <h2 className="mt-4 text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] leading-tight text-white">{title}</h2>
      {sub && <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-silver/70">{sub}</p>}
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
      className={`fixed top-0 inset-x-0 z-50 bg-carbon/90 ${scrolled ? 'shadow-[0_1px_0_rgba(255,255,255,0.08)]' : ''}`}
      style={{ transition: MOTION ? 'box-shadow 0.25s' : 'none', backdropFilter: 'blur(12px)' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[70px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-center gap-3">
          <span className="grid place-items-center w-8 h-8 border border-white/25 text-white f-mono text-[0.7rem]" aria-hidden>
            REC
          </span>
          <span className="text-[1.08rem] font-extrabold tracking-tight text-white">{SITE.name}</span>
          <span className="hidden lg:inline f-mono text-[0.68rem] text-silver/50">{SITE.tagline}</span>
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[0.86rem] font-semibold ${active === n.href.slice(1) ? 'text-flash' : 'text-silver/70 hover:text-white'}`}
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => goTo('#reserve')}
          className="px-5 py-2.5 bg-white text-carbon text-[0.85rem] font-extrabold hover:bg-flash"
          style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
        >
          촬영 예약
        </button>
      </div>
    </header>
  )
}

// ─── 히어로 ───────────────────────────────────────────────────────────────────

/* 콜라주 프린트 3장의 배치 — 모바일은 2열 그리드, lg 이상에서 겹칩니다.
   순서: 0 = 왼쪽 큰 컷, 1 = 오른쪽 위, 2 = 오른쪽 아래(맨 앞) */
const HERO_PRINT_LAYOUT = [
  { grid: 'row-span-2', place: 'lg:absolute lg:left-0 lg:top-[6%] lg:w-[60%] lg:z-10', tilt: '', ratio: 'aspect-[3/4]', pos: 'object-center' },
  { grid: '', place: 'lg:absolute lg:right-0 lg:top-0 lg:w-[48%] lg:z-30', tilt: 'lg:rotate-[3deg]', ratio: 'aspect-square', pos: 'object-[center_22%]' },
  { grid: '', place: 'lg:absolute lg:right-[14%] lg:bottom-[6%] lg:w-[40%] lg:z-20', tilt: 'lg:rotate-[-4deg]', ratio: 'aspect-[4/5]', pos: 'object-[center_38%]' },
]

function Hero() {
  const hot = SITE.products.find((p) => p.hot) ?? SITE.products[0]
  const facts = [`${hot.name} ${hot.price}`, `${SITE.hours[0].day} ${SITE.hours[0].time}`, SITE.location.walk]
  const jump = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    goTo(href)
  }
  return (
    <section className="hero hx-hero relative overflow-hidden bg-carbon pt-[70px]">
      {/* 여기에 히어로 배경 사진(촬영 현장) 교체 */}
      <img src={SITE.heroPhoto} alt="" aria-hidden className={`absolute inset-0 w-full h-full object-cover object-[40%_45%] ${MOTION ? 'hero-photo' : ''}`} />
      <div className="hx-hero-veil absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-5 grid lg:grid-cols-[minmax(0,0.93fr)_minmax(0,1.07fr)] lg:items-center gap-y-8 lg:gap-x-8 pt-7 pb-14 lg:py-14 lg:min-h-[calc(90vh-70px)]">
        {/* 카피 */}
        <div>
          <p className={`f-mono text-[0.78rem] tracking-[0.3em] text-flash ${MOTION ? 'hero-in' : ''}`}>PORTRAIT — SEOCHON, SEOUL</p>
          <h1 className={`mt-5 text-[clamp(2.3rem,5.4vw,4.05rem)] font-extrabold tracking-[-0.04em] leading-[1.08] whitespace-pre-line text-white ${MOTION ? 'hero-in d150' : ''}`}>
            {SITE.slogan}
          </h1>
          <p className={`mt-5 max-w-[27rem] text-[0.97rem] leading-relaxed text-silver opacity-85 ${MOTION ? 'hero-in d300' : ''}`}>{SITE.sloganSub}</p>
          <div className={`mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 ${MOTION ? 'hero-in d450' : ''}`}>
            <a
              href="#reserve"
              onClick={jump('#reserve')}
              className="hx-cta px-8 py-4 bg-white text-carbon text-[0.95rem] font-extrabold hover:bg-flash"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              촬영 예약하기
            </a>
            <a
              href="#products"
              onClick={jump('#products')}
              className="hx-cta-sub f-mono text-[0.85rem] font-bold text-silver border-b border-silver/50 pb-1 hover:text-flash hover:border-flash"
              style={{ transition: MOTION ? 'color 0.2s, border-color 0.2s' : 'none' }}
            >
              PRICE LIST →
            </a>
          </div>
          <ul className={`mt-7 f-mono text-[0.72rem] leading-relaxed text-silver opacity-80 space-y-1.5 lg:space-y-0 lg:flex lg:flex-wrap lg:items-center ${MOTION ? 'hero-in d450' : ''}`}>
            {facts.map((f, i) => (
              <li key={f} className={i ? 'lg:ml-4 lg:pl-4 lg:border-l lg:border-white/20' : ''}>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* 대표 컷 콜라주 */}
        <div>
          <div className="hx-collage relative grid grid-cols-[1.8fr_1fr] items-end gap-3 max-w-[440px] lg:max-w-none lg:block lg:aspect-square">
            {SITE.heroPrints.map((p, i) => {
              const L = HERO_PRINT_LAYOUT[i]
              return (
                <div key={p.cap} className={`${L.grid} ${L.place} ${L.tilt}`}>
                  <figure
                    className="hx-print bg-white p-[7px] pb-1.5 shadow-[0_26px_58px_-20px_rgba(0,0,0,0.9)]"
                    style={{ animationDelay: MOTION ? `${i * 150 + 200}ms` : undefined }}
                  >
                    {/* 여기에 대표 컷 교체 */}
                    <img src={p.img} alt={`${p.cap} 촬영 예시`} className={`w-full ${L.ratio} object-cover ${L.pos}`} />
                    <figcaption className="f-mono px-0.5 pt-2 text-[0.6rem] tracking-[0.05em] text-carbon">{p.cap}</figcaption>
                  </figure>
                </div>
              )
            })}
          </div>
          <p className="f-mono mt-5 text-[0.68rem] tracking-[0.2em] text-silver opacity-70 lg:text-right">KODAK 400 · 80mm · f/2.8</p>
        </div>
      </div>
    </section>
  )
}

// ─── 갤러리 ───────────────────────────────────────────────────────────────────

function Gallery() {
  const { ref, inView } = useInView(0.08)
  return (
    <section id="gallery" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 border-t border-white/8">
      <div className="mx-auto max-w-6xl px-5">
        <Head no="01" en="Selected Works" title="기록의 장면들" inView={inView} />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {SITE.gallery.map((g, i) => (
            <figure key={g.no} className={`group relative overflow-hidden ${MOTION ? `anim-fade-up d${(i % 3) * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              {/* 여기에 갤러리 사진 교체 */}
              <img
                src={g.img}
                alt={g.cap}
                className={`w-full aspect-[3/4] object-cover ${MOTION ? 'grayscale-[35%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700' : ''}`}
              />
              <figcaption className="absolute bottom-0 inset-x-0 flex items-baseline justify-between px-4 py-3 bg-gradient-to-t from-carbon/85 to-transparent">
                <span className="text-[0.85rem] font-bold text-white">{g.cap}</span>
                <span className="f-mono text-[0.65rem] text-silver/60">#{g.no}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 촬영 상품 ────────────────────────────────────────────────────────────────

function Products() {
  const { ref, inView } = useInView()
  return (
    <section id="products" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-dark">
      <div className="mx-auto max-w-6xl px-5">
        <Head no="02" en="Price List" title="촬영 상품" inView={inView} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SITE.products.map((p, i) => (
            <article
              key={p.name}
              className={`relative flex flex-col p-7 border ${p.hot ? 'border-flash' : 'border-white/12'} ${MOTION ? `anim-fade-up d${i * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}
            >
              {p.hot && <span className="f-mono absolute -top-2.5 left-6 px-2.5 py-0.5 bg-flash text-carbon text-[0.62rem] font-bold tracking-[0.15em]">MOST BOOKED</span>}
              <h3 className="text-[1.12rem] font-extrabold text-white">{p.name}</h3>
              <p className="f-mono mt-1 text-[0.7rem] text-silver/50">RUNNING {p.time}</p>
              <p className="nums mt-5 text-[1.55rem] font-extrabold text-white">{p.price}</p>
              <ul className="mt-5 space-y-1.5 flex-1">
                {p.includes.map((l) => (
                  <li key={l} className="text-[0.83rem] text-silver/75 flex gap-2">
                    <span className="text-flash">—</span>
                    {l}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => goTo('#reserve')}
                className={`mt-6 py-2.5 text-[0.83rem] font-bold border ${p.hot ? 'bg-flash text-carbon border-flash hover:bg-white hover:border-white' : 'border-white/25 text-silver hover:border-white hover:text-white'}`}
                style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
              >
                이 상품으로 예약
              </button>
            </article>
          ))}
        </div>
        <p className={`mt-6 text-[0.82rem] text-silver/50 ${MOTION ? 'anim-fade-up d320' : ''} ${inView ? 'in-view' : ''}`}>{SITE.productsNote}</p>
      </div>
    </section>
  )
}

// ─── 촬영 과정 ────────────────────────────────────────────────────────────────

function Process() {
  const { ref, inView } = useInView()
  return (
    <section id="process" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head no="03" en="How It Works" title="촬영은 이렇게 진행됩니다" inView={inView} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {SITE.process.map((p, i) => (
            <div key={p.step} className={`${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="f-mono text-[2.2rem] font-bold text-flash/90 leading-none">{p.step}.</p>
              <h3 className="mt-4 text-[1.08rem] font-extrabold text-white">{p.name}</h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-silver/70">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 사진가 ───────────────────────────────────────────────────────────────────

function Artist() {
  const { ref, inView } = useInView()
  const a = SITE.artist
  return (
    <section id="artist" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-dark">
      <div className="mx-auto max-w-5xl px-5 grid md:grid-cols-[0.8fr_1fr] gap-10 items-center">
        <div className={`${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
          {/* 여기에 사진가 프로필 교체 */}
          <img src={a.img} alt={a.name} className="w-full aspect-[4/5] object-cover grayscale-[25%]" />
        </div>
        <div className={`${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <Head no="04" en="Photographer" title={`사진가 ${a.name}`} inView={inView} />
          <blockquote className="-mt-4 border-l-2 border-flash pl-5 text-[1.02rem] leading-relaxed text-silver/85">{a.words}</blockquote>
          <ul className="mt-7 space-y-1.5">
            {a.career.map((l) => (
              <li key={l} className="f-mono text-[0.8rem] text-silver/60 flex gap-2.5">
                <span className="text-flash">·</span>
                {l}
              </li>
            ))}
          </ul>
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
        <Head no="05" en="FAQ" title="자주 묻는 질문" inView={inView} />
        <div className={`border-t border-white/12 ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.faq.map((g, i) => (
            <div key={g.q} className="border-b border-white/10">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full py-5 flex items-center justify-between text-left gap-4">
                <span className="text-[0.98rem] font-bold text-white">{g.q}</span>
                <span className={`f-mono text-flash text-[1.1rem] leading-none shrink-0 ${MOTION ? 'transition-transform duration-300' : ''} ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden ${MOTION ? 'transition-[max-height,opacity] duration-400' : ''} ${open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="pb-5 text-[0.92rem] leading-relaxed text-silver/70">{g.a}</p>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-dark">
      <div className="mx-auto max-w-6xl px-5">
        <Head no="06" en="Guest Notes" title="다녀간 분들의 기록" inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`p-7 border border-white/10 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[0.93rem] leading-relaxed text-silver/80">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between">
                <span className="text-[0.85rem] font-bold text-white">{r.name}</span>
                <span className="f-mono text-[0.72rem] text-flash">{r.tag}</span>
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
  const [opt, setOpt] = useState<string>(SITE.products[1].name)
  const [when, setWhen] = useState('')
  const smsBody = `[촬영예약] 상품: ${opt} / 희망 날짜: ${when || '상담 후 결정'}`
  return (
    <section id="reserve" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Head no="07" en="Booking" title="촬영 예약" inView={inView} />
        <p className={`-mt-6 mb-10 text-[0.98rem] leading-relaxed text-silver/70 whitespace-pre-line ${MOTION ? 'anim-fade-up d80' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.reserve.lead}
        </p>
        <div className={`space-y-7 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <div>
            <p className="f-mono text-[0.72rem] tracking-[0.2em] text-silver/50 mb-3">01 / 촬영 상품</p>
            <div className="flex flex-wrap gap-2">
              {[...SITE.products.map((pr) => pr.name), '상담 후 결정'].map((s) => (
                <button
                  key={s}
                  onClick={() => setOpt(s)}
                  className={`px-4 py-2.5 text-[0.86rem] font-bold border ${opt === s ? 'bg-white text-carbon border-white' : 'border-white/20 text-silver/70 hover:border-white/50 hover:text-white'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="f-mono text-[0.72rem] tracking-[0.2em] text-silver/50 mb-3">02 / 희망 날짜 (선택)</p>
            <input
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              placeholder="예) 10월 둘째 주 주말"
              className="w-full bg-transparent border-b border-white/25 px-1 py-3.5 text-[0.98rem] text-white placeholder:text-silver/30 focus:outline-none focus:border-flash"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-4 text-center bg-white text-carbon text-[0.98rem] font-extrabold hover:bg-flash"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              문자로 예약 문의
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex-1 py-4 text-center border border-white/25 text-[0.98rem] font-bold text-silver hover:border-flash hover:text-flash"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              전화 {SITE.phone}
            </a>
          </div>
          <p className="text-[0.8rem] text-silver/45">카카오톡 {SITE.kakaoId} 채널로 참고 사진을 먼저 보내주셔도 좋습니다.</p>
        </div>
      </div>
    </section>
  )
}

// ─── 오시는 길 ────────────────────────────────────────────────────────────────

function Location() {
  const { ref, inView } = useInView()
  return (
    <section id="location" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-dark">
      <div className="mx-auto max-w-4xl px-5">
        <Head no="08" en="Access" title="찾아오시는 길" inView={inView} />
        <div className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <p className="text-[1.1rem] font-bold text-white">{SITE.address}</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem] text-silver/70">
            <li>· {SITE.location.walk}</li>
            <li>· {SITE.location.parking}</li>
            <li>· {SITE.location.landmark}</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2">
            {SITE.hours.map((h) => (
              <p key={h.day} className="text-[0.9rem]">
                <span className="text-silver/45 mr-2.5">{h.day}</span>
                <span className="nums font-bold text-silver">{h.time}</span>
              </p>
            ))}
          </div>
          <a
            href={SITE.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-7 px-6 py-3 border border-white/25 text-[0.9rem] font-bold text-silver hover:border-flash hover:text-flash"
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
    <footer className="border-t border-white/8 py-12 pb-28 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[1.1rem] font-extrabold text-white">
            <span className="f-mono inline-grid place-items-center w-7 h-7 border border-white/25 text-[0.6rem] mr-2.5 align-middle">REC</span>
            {SITE.name}
          </p>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-silver/45">
            {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="f-mono text-[0.72rem] text-silver/35">
          instagram {SITE.instagram} · kakao {SITE.kakaoId}
        </p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t border-white/12 bg-carbon">
      <a href={`tel:${SITE.phone}`} className="py-4 text-center text-[0.95rem] font-bold text-silver">
        전화 문의
      </a>
      <button onClick={() => goTo('#reserve')} className="py-4 text-center text-[0.95rem] font-extrabold bg-white text-carbon">
        촬영 예약
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
    <div className="bg-carbon text-silver">
      <Header active={active} />
      <Hero />
      <Gallery />
      <Products />
      <Process />
      <Artist />
      <Faq />
      <Reviews />
      <Reserve />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
