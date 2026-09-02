import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

/* 이미지 — src/images/ 안의 파일을 같은 이름으로 덮어쓰면 그대로 반영됩니다 */
import heroImg from './images/hero.jpg'
import styleImg1 from './images/style-1.jpg'
import styleImg2 from './images/style-2.jpg'
import styleImg3 from './images/style-3.jpg'
import styleImg4 from './images/style-4.jpg'
import designerImg1 from './images/designer-1.jpg'
import designerImg2 from './images/designer-2.jpg'
import designerImg3 from './images/designer-3.jpg'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

const SITE = {
  // 여기에 살롱 기본 정보 교체
  name: '살롱 무드',
  nameEn: 'SALON MUUD',
  tagline: '헤어 · 두피 클리닉 · 연남',
  slogan: '머리를 하는 날이,\n좋아지는 날',
  sloganSub:
    '상담 15분을 먼저 씁니다. 두상과 모질, 평소 스타일링 습관까지 듣고 나서 가위를 듭니다.',

  // 여기에 연락처 교체
  phone: '02-1234-5678',
  smsPhone: '01012345678',
  kakaoId: '@살롱무드',
  kakaoUrl: 'https://pf.kakao.com/_xxxxxs',
  instagram: '@salon.muud',

  // 여기에 사업자 정보 교체
  ceo: '대표 김무드',
  bizNo: '123-45-67890',
  address: '서울특별시 마포구 연남로 123, 2층',

  // 영업시간
  hours: [
    { day: '화 – 금', time: '10:30 – 20:30' },
    { day: '토 · 일', time: '10:00 – 19:00' },
    { day: '월요일', time: '정기 휴무' },
  ],
  hoursNote: '마감 90분 전 입장 마감 · 전 시술 예약제',

  // 여기에 히어로 사진 교체
  heroPhoto: heroImg,

  nav: [
    { label: '시술 안내', href: '#price' },
    { label: '스타일', href: '#style' },
    { label: '디자이너', href: '#designer' },
    { label: '이용 안내', href: '#guide' },
    { label: '예약', href: '#reserve' },
    { label: '오시는 길', href: '#location' },
  ],

  // 숫자로 보는 살롱
  stats: [
    { n: 12, suffix: '년', label: '연남에서' },
    { n: 4.9, suffix: '', label: '리뷰 평점', decimal: true },
    { n: 15, suffix: '분', label: '기본 상담' },
    { n: 92, suffix: '%', label: '재방문율' },
  ],

  // 시술 메뉴판 — 카테고리 탭. time은 소요 시간
  priceTabs: ['컷', '펌', '염색', '클리닉'] as const,
  priceNote: '기장 추가 · 모발 상태에 따라 금액이 달라질 수 있으며, 상담 후 확정됩니다.',
  price: {
    컷: [
      { name: '디자이너 컷', desc: '상담 15분 + 컷 + 스타일링', time: '60분', price: '35,000', star: true },
      { name: '원장 컷', desc: '두상 교정 커트 · 원장 지명', time: '70분', price: '55,000', star: false },
      { name: '앞머리 컷', desc: '재방문 고객 · 당일 가능', time: '20분', price: '10,000', star: false },
      { name: '남성 컷', desc: '컷 + 다운펌 상담', time: '50분', price: '28,000', star: false },
    ],
    펌: [
      { name: '레이어드 펌', desc: '얼굴형 보정 · 셋팅 포함', time: '150분', price: '130,000', star: true },
      { name: '히피 펌', desc: '자연 건조로 완성되는 웨이브', time: '160분', price: '150,000', star: false },
      { name: '볼륨 매직', desc: '손상 최소 연화 · 뿌리 볼륨', time: '180분', price: '180,000', star: false },
      { name: '남성 다운펌', desc: '옆머리 정리 · 30분 완성', time: '30분', price: '30,000', star: false },
    ],
    염색: [
      { name: '전체 염색', desc: '애쉬 계열 전문 · 산성보호제 포함', time: '120분', price: '90,000', star: true },
      { name: '뿌리 염색', desc: '새치 · 리터치', time: '80분', price: '60,000', star: false },
      { name: '발레아쥬', desc: '탈색 1회 + 토닝 · 디자인 염색', time: '240분', price: '250,000', star: false },
      { name: '토닝', desc: '탈색모 컬러 보정', time: '90분', price: '70,000', star: false },
    ],
    클리닉: [
      { name: '두피 스케일링', desc: '모공 클렌징 + 쿨링 마사지', time: '40분', price: '40,000', star: false },
      { name: '손상모 클리닉', desc: '단백질 4단계 충전', time: '60분', price: '70,000', star: true },
      { name: '시술 결합 클리닉', desc: '펌 · 염색과 함께 진행 시', time: '+30분', price: '45,000', star: false },
    ],
  },

  // 스타일 갤러리 — 여기에 스타일 사진 교체
  styles: [
    { img: styleImg1, name: '허쉬 레이어드', tag: '컷 · 펌' },
    { img: styleImg2, name: '애쉬 브라운 발레아쥬', tag: '염색' },
    { img: styleImg3, name: '빌드 펌', tag: '펌' },
    { img: styleImg4, name: '슬릭 보브', tag: '컷' },
  ],

  // 디자이너 — 지명 예약. 여기에 프로필 사진 교체
  designers: [
    {
      img: designerImg1,
      role: '원장',
      name: '김무드',
      career: '경력 14년',
      spec: '두상 교정 컷 · 손상모 펌',
      note: '지명비 +20,000원',
      insta: '@muud.kim',
    },
    {
      img: designerImg2,
      role: '수석 디자이너',
      name: '이하루',
      career: '경력 9년',
      spec: '애쉬 염색 · 발레아쥬',
      note: '지명비 없음',
      insta: '@haru.color',
    },
    {
      img: designerImg3,
      role: '디자이너',
      name: '박온',
      career: '경력 6년',
      spec: '레이어드 컷 · 남성 컷',
      note: '지명비 없음',
      insta: '@on.hair',
    },
  ],

  // 이용 안내
  guide: [
    { title: '전 시술 예약제', body: '워크인 손님도 받지만, 예약 고객이 우선입니다. 당일 예약은 전화가 가장 빠릅니다.' },
    { title: '상담이 먼저입니다', body: '원하는 사진을 캡처해 오시면 좋습니다. 안 되는 시술은 안 된다고 먼저 말씀드립니다.' },
    { title: '변경 · 취소', body: '예약 2시간 전까지 문자로 가능합니다. 무단 노쇼 2회부터는 예약금이 필요합니다.' },
    { title: '시술 후 관리', body: '펌 · 염색 후 48시간은 샴푸를 피해주세요. 관리법을 문자로 따로 보내드립니다.' },
  ],

  // 후기
  reviews: [
    { text: '항상 어디 가서 머리 망치고 오는 편이었는데, 상담에서 제 습관까지 물어봐 주신 곳은 처음이었어요. 말린 대로 손질이 돼요.', name: '김O연', tag: '레이어드 펌' },
    { text: '애쉬 염색 세 번 실패하고 왔는데 여기서 정착했습니다. 물 빠지는 과정까지 예쁘게 설계해 주세요.', name: '박O름', tag: '전체 염색' },
    { text: '지명비가 아깝지 않은 원장님 컷. 두 달이 지나도 형태가 안 무너집니다.', name: '이O진', tag: '원장 컷' },
  ],

  // 예약 문자 폼
  reserve: {
    lead: '원하시는 시술과 디자이너를 골라 보내주시면,\n가능한 시간을 문자로 안내드립니다.',
    services: ['컷', '펌', '염색', '클리닉', '상담 후 결정'],
  },

  location: {
    walk: '홍대입구역 3번 출구 · 도보 7분',
    parking: '건물 뒤 전용 주차 2대 · 만차 시 연남 공영주차장(도보 2분) 지원',
    landmark: '1층 파란 문 베이커리 건물 2층입니다.',
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

function Head({ no, en, title, inView }: { no: string; en: string; title: React.ReactNode; inView: boolean }) {
  return (
    <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
      <div className="flex items-baseline gap-3">
        <span className="f-serif italic text-[1.05rem] text-rose">{no}</span>
        <span className="text-[0.75rem] tracking-[0.3em] uppercase text-ink/45 font-semibold">{en}</span>
      </div>
      <div className="ed-rule h-px bg-rose/60 my-4" />
      <h2 className="text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold tracking-tight leading-tight">{title}</h2>
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
      className={`fixed top-0 inset-x-0 z-50 ${scrolled ? 'bg-porcelain/95 shadow-[0_1px_0_0_rgba(31,24,21,0.08)]' : 'bg-porcelain/0'}`}
      style={{ transition: MOTION ? 'background-color 0.25s, box-shadow 0.25s' : 'none', backdropFilter: scrolled ? 'blur(10px)' : 'none' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[72px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-baseline gap-2.5">
          <span className="f-serif italic text-[1.35rem] leading-none">{SITE.nameEn}</span>
          <span className="hidden sm:inline text-[0.72rem] tracking-[0.18em] text-ink/50">{SITE.tagline}</span>
        </button>
        <nav className="hidden md:flex items-center gap-7">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[0.9rem] pb-0.5 border-b ${active === n.href.slice(1) ? 'border-rose text-rose font-bold' : 'border-transparent text-ink/70 hover:text-ink font-medium'}`}
              style={{ transition: MOTION ? 'color 0.2s, border-color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <a
          href={`tel:${SITE.phone}`}
          className="nums px-5 py-2.5 bg-ink text-porcelain text-[0.875rem] font-bold hover:bg-rose"
          style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
        >
          {SITE.phone}
        </a>
      </div>
    </header>
  )
}

// ─── 히어로 — 매거진 커버 ─────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative pt-[72px] overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pt-12 md:pt-16">
        <p className={`f-serif italic text-[clamp(2.6rem,8vw,5.6rem)] leading-none text-rose/90 ${MOTION ? 'hero-in' : ''}`}>Salon Muud</p>
        <div className={`mt-6 md:mt-8 flex flex-col md:flex-row md:items-end justify-between gap-7 pb-10 md:pb-12 ${MOTION ? 'hero-in d120' : ''}`}>
          <h1 className="text-[clamp(1.9rem,4.6vw,3rem)] font-extrabold tracking-[-0.03em] leading-[1.2] whitespace-pre-line">
            {SITE.slogan}
          </h1>
          <div className="max-w-sm">
            <p className="text-[0.98rem] leading-relaxed text-ink/65">{SITE.sloganSub}</p>
            <div className="mt-6 flex items-center gap-5">
              <button
                onClick={() => goTo('#reserve')}
                className="px-7 py-3.5 bg-ink text-porcelain text-[0.92rem] font-bold hover:bg-rose"
                style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
              >
                예약 문의하기
              </button>
              <button
                onClick={() => goTo('#price')}
                className="text-[0.92rem] font-bold border-b-2 border-ink pb-0.5 hover:text-rose hover:border-rose"
                style={{ transition: MOTION ? 'color 0.2s, border-color 0.2s' : 'none' }}
              >
                시술 가격 보기
              </button>
            </div>
          </div>
        </div>
      </div>
      <figure className={`mx-auto max-w-6xl px-5 ${MOTION ? 'hero-photo' : ''}`}>
        {/* 여기에 히어로 사진 교체 */}
        <img src={SITE.heroPhoto} alt="살롱 내부" className="w-full aspect-[16/7] object-cover object-[center_62%]" />
        <figcaption className="flex items-baseline justify-between pt-3">
          <span className="f-serif italic text-[0.92rem] text-rose">Hair &amp; Scalp — Yeonnam</span>
          <span className="text-[0.75rem] tracking-[0.22em] uppercase text-ink/40">est. 2014</span>
        </figcaption>
      </figure>
    </section>
  )
}

// ─── 숫자 스트립 ──────────────────────────────────────────────────────────────

function Stats() {
  const { ref, inView } = useInView(0.3)
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="mt-14 border-y border-ink/10">
      <div
        className={`mx-auto max-w-6xl px-5 py-6 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2 text-center ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}
      >
        {SITE.stats.map((s, i) => (
          <span key={s.label} className="inline-flex items-baseline gap-x-3">
            {i > 0 && <span className="f-serif italic text-rose/60" aria-hidden>·</span>}
            <span className="text-[0.95rem] text-ink/70">
              {s.label} <span className="nums font-extrabold text-ink">{'decimal' in s && (s as { decimal?: boolean }).decimal ? s.n.toFixed(1) : s.n}{s.suffix}</span>
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}

// ─── 시술 메뉴판 ──────────────────────────────────────────────────────────────

function Price() {
  const { ref, inView } = useInView()
  const [tab, setTab] = useState<(typeof SITE.priceTabs)[number]>(SITE.priceTabs[0])
  return (
    <section id="price" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <Head no="01" en="Price Menu" title="시술 안내" inView={inView} />
        <div className={`flex gap-2 mb-8 flex-wrap ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.priceTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-[0.9rem] font-bold border ${tab === t ? 'bg-ink text-porcelain border-ink' : 'border-ink/20 text-ink/60 hover:border-ink/50'}`}
              style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
            >
              {t}
            </button>
          ))}
        </div>
        <ul key={tab} className={MOTION ? 'menu-in' : ''}>
          {SITE.price[tab].map((m) => (
            <li key={m.name} className="flex items-baseline gap-3 py-4 border-b border-ink/10">
              <div className="min-w-0">
                <p className="text-[1.05rem] font-bold">
                  {m.name}
                  {m.star && <span className="f-serif italic text-rose text-[0.85rem] ml-2">signature</span>}
                </p>
                <p className="mt-0.5 text-[0.85rem] text-ink/50">
                  {m.desc} · <span className="nums">{m.time}</span>
                </p>
              </div>
              <span className="leader flex-1" />
              <span className="nums text-[1.05rem] font-extrabold shrink-0">{m.price}원</span>
            </li>
          ))}
        </ul>
        <p className={`mt-6 text-[0.82rem] text-ink/45 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>{SITE.priceNote}</p>
      </div>
    </section>
  )
}

// ─── 스타일 갤러리 ────────────────────────────────────────────────────────────

function Style() {
  const { ref, inView } = useInView()
  return (
    <section id="style" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-blush">
      <div className="mx-auto max-w-6xl px-5">
        <Head no="02" en="Style Book" title="이번 시즌, 무드가 만든 머리" inView={inView} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SITE.styles.map((s, i) => (
            <figure key={s.name} className={`group ${MOTION ? `anim-fade-up d${(i % 4) * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="overflow-hidden">
                {/* 여기에 스타일 사진 교체 */}
                <img src={s.img} alt={s.name} className={`w-full aspect-[3/4] object-cover ${MOTION ? 'group-hover:scale-105 transition-transform duration-700' : ''}`} />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-2">
                <span className="text-[0.95rem] font-bold">{s.name}</span>
                <span className="f-serif italic text-[0.8rem] text-rose shrink-0">{s.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 디자이너 지명 ────────────────────────────────────────────────────────────

function Designer() {
  const { ref, inView } = useInView()
  return (
    <section id="designer" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head no="03" en="Designers" title={<>손을 맡길 사람을,<br className="sm:hidden" /> 먼저 보여드립니다</>} inView={inView} />
        <div className="grid md:grid-cols-3 gap-6">
          {SITE.designers.map((d, i) => (
            <article key={d.name} className={`${MOTION ? `anim-fade-up d${i * 120 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="overflow-hidden">
                {/* 여기에 디자이너 프로필 사진 교체 */}
                <img src={d.img} alt={d.name} className="w-full aspect-[4/5] object-cover" />
              </div>
              <div className="pt-4 border-t-2 border-ink mt-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-[1.15rem] font-extrabold">
                    {d.name} <span className="text-[0.8rem] font-semibold text-rose ml-1">{d.role}</span>
                  </p>
                  <span className="text-[0.8rem] text-ink/45">{d.career}</span>
                </div>
                <p className="mt-1.5 text-[0.88rem] text-ink/60">{d.spec}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[0.8rem] font-bold text-ink/70">{d.note}</span>
                  <span className="f-serif italic text-[0.82rem] text-ink/40">{d.insta}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 이용 안내 ────────────────────────────────────────────────────────────────

function Guide() {
  const { ref, inView } = useInView()
  return (
    <section id="guide" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-ink text-porcelain">
      <div className="mx-auto max-w-6xl px-5">
        <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
          <div className="flex items-baseline gap-3">
            <span className="f-serif italic text-[1.05rem] text-rose-l">04</span>
            <span className="text-[0.75rem] tracking-[0.3em] uppercase text-porcelain/45 font-semibold">House Rules</span>
          </div>
          <div className="ed-rule h-px bg-rose-l/60 my-4" />
          <h2 className="text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold tracking-tight">처음 오시기 전에</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
          {SITE.guide.map((g, i) => (
            <div key={g.title} className={`${MOTION ? `anim-fade-up d${i * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[1.05rem] font-bold text-rose-l">{g.title}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-porcelain/70">{g.body}</p>
            </div>
          ))}
        </div>
        <div className={`mt-12 pt-8 border-t border-porcelain/15 flex flex-wrap gap-x-12 gap-y-3 ${MOTION ? 'anim-fade-up d320' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.hours.map((h) => (
            <p key={h.day} className="text-[0.92rem]">
              <span className="text-porcelain/50 mr-3">{h.day}</span>
              <span className="nums font-semibold">{h.time}</span>
            </p>
          ))}
          <p className="text-[0.85rem] text-porcelain/45 basis-full">{SITE.hoursNote}</p>
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
        <Head no="05" en="Reviews" title="다녀간 분들의 말" inView={inView} />
        <div className="grid md:grid-cols-3 gap-6">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`bg-blush p-7 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="f-serif italic text-rose text-[1.6rem] leading-none">&ldquo;</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between">
                <span className="text-[0.85rem] font-bold">{r.name}</span>
                <span className="text-[0.78rem] text-rose font-semibold">{r.tag}</span>
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
  const [service, setService] = useState<string>(SITE.reserve.services[0])
  const [designer, setDesigner] = useState('지명 없음')
  const [when, setWhen] = useState('')
  const smsBody = `[예약문의] 시술: ${service} / 디자이너: ${designer} / 희망: ${when || '상담 후 결정'}`
  return (
    <section id="reserve" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-blush">
      <div className="mx-auto max-w-3xl px-5">
        <Head no="06" en="Reservation" title="예약 문의" inView={inView} />
        <p className={`-mt-6 mb-10 text-[0.98rem] leading-relaxed text-ink/60 whitespace-pre-line ${MOTION ? 'anim-fade-up d80' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.reserve.lead}
        </p>
        <div className={`space-y-7 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-ink/50 mb-2.5">01 · 시술 선택</p>
            <div className="flex flex-wrap gap-2">
              {SITE.reserve.services.map((s) => (
                <button
                  key={s}
                  onClick={() => setService(s)}
                  className={`px-4 py-2 text-[0.88rem] font-bold border ${service === s ? 'bg-ink text-porcelain border-ink' : 'border-ink/25 text-ink/60 hover:border-ink/50 bg-porcelain'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-ink/50 mb-2.5">02 · 디자이너 지명 (선택)</p>
            <div className="flex flex-wrap gap-2">
              {['지명 없음', ...SITE.designers.map((d) => `${d.name} ${d.role}`)].map((d) => (
                <button
                  key={d}
                  onClick={() => setDesigner(d)}
                  className={`px-4 py-2 text-[0.88rem] font-bold border ${designer === d ? 'bg-ink text-porcelain border-ink' : 'border-ink/25 text-ink/60 hover:border-ink/50 bg-porcelain'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.82rem] font-bold tracking-wide text-ink/50 mb-2.5">03 · 희망 날짜 · 시간 (선택)</p>
            <input
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              placeholder="예) 이번 주 토요일 오후"
              className="w-full bg-porcelain border border-ink/20 px-4 py-3.5 text-[0.95rem] focus:outline-none focus:border-rose"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-4 text-center bg-ink text-porcelain text-[0.98rem] font-bold hover:bg-rose"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              문자로 예약 문의
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex-1 py-4 text-center border-2 border-ink text-[0.98rem] font-bold hover:border-rose hover:text-rose"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              전화 {SITE.phone}
            </a>
          </div>
          <p className="text-[0.8rem] text-ink/40">카카오톡 {SITE.kakaoId} 채널로도 같은 내용으로 문의하실 수 있습니다.</p>
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
        <Head no="07" en="Access" title="오시는 길" inView={inView} />
        <div className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          <p className="text-[1.15rem] font-bold">{SITE.address}</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem] text-ink/65">
            <li>· {SITE.location.walk}</li>
            <li>· {SITE.location.parking}</li>
            <li>· {SITE.location.landmark}</li>
          </ul>
          <a
            href={SITE.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-7 px-6 py-3 border-2 border-ink text-[0.9rem] font-bold hover:border-rose hover:text-rose"
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
    <footer className="border-t border-ink/10 py-12 pb-28 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="f-serif italic text-[1.4rem]">{SITE.nameEn}</p>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-ink/45">
            {SITE.name} · {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="text-[0.78rem] text-ink/35">
          instagram {SITE.instagram} · kakao {SITE.kakaoId}
        </p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t border-ink/10 bg-porcelain">
      <a href={`tel:${SITE.phone}`} className="py-4 text-center text-[0.95rem] font-bold">
        전화 문의
      </a>
      <button onClick={() => goTo('#reserve')} className="py-4 text-center text-[0.95rem] font-bold bg-ink text-porcelain">
        예약하기
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
    <div className="bg-porcelain text-ink">
      <Header active={active} />
      <Hero />
      <Stats />
      <Price />
      <Style />
      <Designer />
      <Guide />
      <Reviews />
      <Reserve />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
