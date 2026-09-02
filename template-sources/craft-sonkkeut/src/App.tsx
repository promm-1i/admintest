import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import img5 from './images/5.jpg'
import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// ══════════════════════════════════════════════════════════════════════════════

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

const SITE = {
  name: '손끝 공방',
  nameEn: 'SONKKEUT CERAMIC STUDIO',
  tagline: '도자기 원데이 · 정규 클래스 · 망원',
  slogan: '서툰 손이\n제일 예쁜 걸 만듭니다',
  sloganSub: '물레는 처음이 가장 재밌습니다. 흙 만지는 두 시간, 핸드폰은 잠시 잊으세요. 만든 그릇은 2주 뒤 가마에서 나옵니다.',

  phone: '02-1234-5678',
  smsPhone: '01012345678',
  instagram: '@sonkkeut.studio',

  ceo: '대표 도예가 한손끝',
  bizNo: '123-45-67890',
  address: '서울특별시 마포구 망원로 123, 2층',

  nav: [
    { label: '원데이 클래스', href: '#oneday' },
    { label: '정규 과정', href: '#regular' },
    { label: '주간 일정', href: '#schedule' },
    { label: '작품', href: '#works' },
    { label: '자주 묻는 질문', href: '#faq' },
    { label: '수강 신청', href: '#apply' },
  ],

  // 히어로 콜라주 — 여기에 사진 교체
  heroPhotos: [
    img1,
    img2,
    img3,
  ],

  // 원데이 클래스
  oneday: [
    { name: '물레 원데이', time: '120분', price: '55,000원', desc: '물레로 컵 또는 볼 1점. 유약 색을 고르면 2주 뒤 완성품을 찾아가세요.', hot: true },
    { name: '핸드빌딩 원데이', time: '120분', price: '45,000원', desc: '손으로 빚는 접시 · 트레이. 초등학생부터 가능해 가족 단위로 인기입니다.', hot: false },
    { name: '커플 · 소그룹', time: '150분', price: '1인 60,000원', desc: '2 – 4인 프라이빗. 서로의 그릇을 만들어 선물하세요.', hot: false },
  ],

  // 정규 과정
  regularNote: '재료비 · 소성비 포함 · 월 시작 기준 · 결석 시 당월 내 보강',
  regular: [
    { name: '물레 정규 4주', spec: '주 1회 · 120분', price: '월 180,000원', desc: '중심 잡기부터 굽 깎기까지, 물레의 기본기' },
    { name: '물레 심화 8주', spec: '주 1회 · 150분', price: '월 200,000원', desc: '주전자 · 화병 등 원하는 기물 중심 수업' },
    { name: '자율 작업반', spec: '월 8회 자유 출입', price: '월 150,000원', desc: '정규 수료자 대상 · 가마 사용 포함' },
  ],

  // 주간 일정표
  scheduleNote: '원데이는 ○ 표시 시간에 예약할 수 있습니다 · 정규반은 요일 고정',
  schedule: [
    { day: '화', slots: ['10:30 원데이 ○', '15:00 원데이 ○', '19:30 정규 4주'] },
    { day: '수', slots: ['15:00 원데이 ○', '19:30 정규 심화'] },
    { day: '목', slots: ['10:30 자율 작업', '19:30 정규 4주'] },
    { day: '금', slots: ['15:00 원데이 ○', '19:30 원데이 ○'] },
    { day: '토', slots: ['10:30 원데이 ○', '14:00 원데이 ○', '17:00 커플 ○'] },
    { day: '일', slots: ['10:30 원데이 ○', '14:00 자율 작업'] },
  ],

  // 작품 — 여기에 사진 교체
  works: [
    { img: img1, cap: '수강생 첫 물레 컵' },
    { img: img2, cap: '핸드빌딩 접시' },
    { img: img4, cap: '유약 시유 작업' },
    { img: img5, cap: '대표 도예가 시연' },
  ],

  faq: [
    { q: '처음인데 만들 수 있을까요?', a: '수강생의 8할이 처음입니다. 실패해도 흙은 다시 뭉치면 되고, 선생님이 옆에서 같이 잡아드립니다.' },
    { q: '만든 그릇은 언제 받나요?', a: '건조와 초벌 · 재벌 소성을 거쳐 약 2주 뒤 완성됩니다. 방문 수령 또는 택배(착불)로 보내드립니다.' },
    { q: '옷이 더러워지나요?', a: '앞치마를 드리지만 흙물이 튈 수 있어요. 편한 옷차림과 짧은 손톱을 추천합니다.' },
    { q: '예약 변경 · 취소는요?', a: '수업 2일 전까지 무료 변경 · 취소됩니다. 이후에는 재료 준비 관계로 50%가 차감됩니다.' },
  ],

  reviews: [
    { text: '데이트로 갔다가 취미가 됐어요. 2주 뒤 컵을 받으러 가는 길이 선물 받으러 가는 기분입니다.', name: '김O나', tag: '물레 원데이' },
    { text: '똥손이라 걱정했는데 선생님이 반 이상 잡아주셔서 그럴듯한 접시가 나왔어요. 아이가 자기 그릇에만 밥을 먹습니다.', name: '이O주 · 가족', tag: '핸드빌딩' },
    { text: '정규 4주 끝나고 심화까지 왔습니다. 흙 만지는 두 시간이 일주일 중 제일 조용한 시간이에요.', name: '박O형', tag: '정규반' },
  ],

  apply: {
    lead: '원하시는 클래스와 날짜를 보내주시면\n예약 가능한 시간을 문자로 안내드립니다.',
    options: ['물레 원데이', '핸드빌딩', '커플 · 소그룹', '정규 과정', '자율 작업반'],
  },

  location: {
    walk: '망원역 2번 출구 · 도보 5분',
    parking: '망원시장 공영주차장 도보 3분',
    landmark: '파란 대문 골목 안, 화분이 많은 2층입니다.',
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

function Head({ title, sub, inView, light }: { title: React.ReactNode; sub?: string; inView: boolean; light?: boolean }) {
  return (
    <div className={`mb-12 ${MOTION ? 'anim-fade-up' : ''} ${inView ? 'in-view' : ''}`}>
      <span className={`clay-dot inline-block w-3.5 h-3.5 rounded-full ${light ? 'bg-sand2' : 'bg-terra'} ${inView ? 'in-view' : ''}`} aria-hidden />
      <h2 className="mt-4 text-[clamp(1.75rem,4.2vw,2.6rem)] font-extrabold tracking-[-0.02em] leading-tight">{title}</h2>
      {sub && <p className={`mt-4 max-w-xl text-[0.98rem] leading-[1.8] ${light ? 'text-sand2/65' : 'text-soil/60'}`}>{sub}</p>}
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
      className={`fixed top-0 inset-x-0 z-50 bg-sand2/95 ${scrolled ? 'shadow-[0_1px_0_rgba(59,44,35,0.12)]' : ''}`}
      style={{ transition: MOTION ? 'box-shadow 0.25s' : 'none', backdropFilter: 'blur(10px)' }}
    >
      <div className="mx-auto max-w-6xl px-5 h-[72px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-baseline gap-2.5">
          <span className="w-3 h-3 rounded-full bg-terra inline-block" aria-hidden />
          <span className="text-[1.2rem] font-extrabold tracking-tight">{SITE.name}</span>
          <span className="hidden sm:inline text-[0.7rem] tracking-[0.12em] text-soil/45">{SITE.tagline}</span>
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => goTo(n.href)}
              className={`text-[0.88rem] font-bold ${active === n.href.slice(1) ? 'text-terra' : 'text-soil/60 hover:text-soil'}`}
              style={{ transition: MOTION ? 'color 0.2s' : 'none' }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <a
          href={`tel:${SITE.phone}`}
          className="nums px-5 py-2.5 rounded-full bg-terra text-sand2 text-[0.875rem] font-extrabold hover:bg-soil"
          style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
        >
          {SITE.phone}
        </a>
      </div>
    </header>
  )
}

// ─── 히어로 — 사진 콜라주가 주인공, 문구는 타일 속 ────────────────────────────

function Hero() {
  return (
    <section className="pt-[72px]">
      <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div className="grid md:grid-cols-4 gap-4 items-stretch">
          {/* 문구 타일 */}
          <div className={`md:col-span-2 rounded-3xl bg-terra text-sand2 p-8 md:p-10 flex flex-col justify-between min-h-[320px] ${MOTION ? 'hero-in' : ''}`}>
            <p className="text-[0.78rem] tracking-[0.28em] uppercase font-extrabold text-sand2/60">{SITE.nameEn}</p>
            <div>
              <h1 className="text-[clamp(1.9rem,4.4vw,2.9rem)] font-extrabold tracking-[-0.02em] leading-[1.25] whitespace-pre-line">
                {SITE.slogan}
              </h1>
              <p className="mt-4 max-w-md text-[0.98rem] leading-[1.8] text-sand2/75">{SITE.sloganSub}</p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => goTo('#apply')}
                  className="px-7 py-3.5 rounded-full bg-sand2 text-terra text-[0.92rem] font-extrabold hover:bg-soil hover:text-sand2"
                  style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
                >
                  클래스 신청하기
                </button>
                <button
                  onClick={() => goTo('#schedule')}
                  className="text-[0.92rem] font-extrabold border-b-2 border-sand2/60 pb-0.5 hover:border-sand2"
                  style={{ transition: MOTION ? 'border-color 0.2s' : 'none' }}
                >
                  주간 일정 보기
                </button>
              </div>
            </div>
          </div>
          {/* 사진 타일들 — 여기에 공방 사진 교체 */}
          <div className={`rounded-3xl overflow-hidden ${MOTION ? 'hero-in d150' : ''}`}>
            <img src={SITE.heroPhotos[0]} alt="물레 작업" className="w-full h-full min-h-[240px] object-cover" />
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className={`rounded-3xl overflow-hidden ${MOTION ? 'hero-in d300' : ''}`}>
              <img src={SITE.heroPhotos[1]} alt="완성 도자기" className="w-full h-full object-cover" />
            </div>
            <div className={`rounded-3xl overflow-hidden ${MOTION ? 'hero-in d450' : ''}`}>
              <img src={SITE.heroPhotos[2]} alt="공방 풍경" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 원데이 클래스 ────────────────────────────────────────────────────────────

function Oneday() {
  const { ref, inView } = useInView()
  return (
    <section id="oneday" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Head title="원데이 클래스" sub="예약제 · 최대 6인 소규모 · 재료비와 소성비가 모두 포함된 가격입니다." inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.oneday.map((c, i) => (
            <article
              key={c.name}
              className={`clay-card relative rounded-3xl p-8 ${c.hot ? 'bg-terra text-sand2' : 'bg-white border border-soil/12'} ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}
            >
              {c.hot && <span className="absolute -top-3 left-7 rounded-full bg-soil text-sand2 text-[0.72rem] font-extrabold px-3.5 py-1">가장 인기</span>}
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[1.3rem] font-extrabold">{c.name}</h3>
                <span className={`nums text-[0.82rem] font-bold ${c.hot ? 'text-sand2/60' : 'text-soil/45'}`}>{c.time}</span>
              </div>
              <p className={`nums mt-4 text-[1.7rem] font-extrabold ${c.hot ? '' : 'text-terra'}`}>{c.price}</p>
              <p className={`mt-3 text-[0.92rem] leading-[1.75] ${c.hot ? 'text-sand2/75' : 'text-soil/60'}`}>{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 정규 과정 ────────────────────────────────────────────────────────────────

function Regular() {
  const { ref, inView } = useInView()
  return (
    <section id="regular" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-kiln">
      <div className="mx-auto max-w-4xl px-5">
        <Head title="정규 과정" sub={SITE.regularNote} inView={inView} />
        <ul className={`${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.regular.map((r) => (
            <li key={r.name} className="grid sm:grid-cols-[1fr_auto] gap-x-8 gap-y-1 items-baseline py-5 border-b border-soil/12">
              <div>
                <p className="text-[1.1rem] font-extrabold">
                  {r.name} <span className="text-[0.82rem] font-bold text-soil/45 ml-2">{r.spec}</span>
                </p>
                <p className="mt-1 text-[0.9rem] text-soil/60">{r.desc}</p>
              </div>
              <span className="nums text-[1.15rem] font-extrabold text-terra">{r.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── 주간 일정 ────────────────────────────────────────────────────────────────

function Schedule() {
  const { ref, inView } = useInView()
  return (
    <section id="schedule" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <Head title="주간 일정표" sub={SITE.scheduleNote} inView={inView} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {SITE.schedule.map((d, i) => (
            <div key={d.day} className={`rounded-2xl bg-white border border-soil/12 p-5 ${MOTION ? `anim-fade-up d${i * 70 + 70}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[1.05rem] font-extrabold text-terra">{d.day}</p>
              <ul className="mt-3 space-y-2">
                {d.slots.map((sl) => (
                  <li key={sl} className="nums text-[0.8rem] font-semibold text-soil/70 leading-snug">
                    {sl}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={`mt-5 text-[0.82rem] text-soil/45 ${MOTION ? 'anim-fade-up d240' : ''} ${inView ? 'in-view' : ''}`}>월요일은 가마 소성일로 수업이 없습니다.</p>
      </div>
    </section>
  )
}

// ─── 작품 ─────────────────────────────────────────────────────────────────────

function Works() {
  const { ref, inView } = useInView()
  return (
    <section id="works" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-kiln">
      <div className="mx-auto max-w-6xl px-5">
        <Head title="가마에서 나온 것들" sub="전부 수강생의 손에서 나온 작품입니다." inView={inView} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SITE.works.map((w, i) => (
            <figure key={w.cap + i} className={`group ${MOTION ? `anim-fade-up d${(i % 4) * 80 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <div className="overflow-hidden rounded-3xl">
                {/* 여기에 작품 사진 교체 */}
                <img src={w.img} alt={w.cap} className={`w-full aspect-square object-cover ${MOTION ? 'group-hover:scale-105 transition-transform duration-700' : ''}`} />
              </div>
              <figcaption className="mt-3 text-center text-[0.85rem] font-bold text-soil/60">{w.cap}</figcaption>
            </figure>
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
        <Head title="자주 묻는 질문" inView={inView} />
        <div className={`border-t-2 border-soil/12 ${MOTION ? 'anim-fade-up d120' : ''} ${inView ? 'in-view' : ''}`}>
          {SITE.faq.map((g, i) => (
            <div key={g.q} className="border-b border-soil/10">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full py-5 flex items-center justify-between text-left gap-4">
                <span className="text-[1rem] font-extrabold">{g.q}</span>
                <span className={`text-terra text-[1.3rem] leading-none shrink-0 ${MOTION ? 'transition-transform duration-300' : ''} ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div className={`overflow-hidden ${MOTION ? 'transition-[max-height,opacity] duration-400' : ''} ${open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="pb-5 text-[0.94rem] leading-[1.8] text-soil/62">{g.a}</p>
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
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-kiln">
      <div className="mx-auto max-w-6xl px-5">
        <Head title="흙을 만진 사람들" inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.name} className={`rounded-3xl bg-white border border-soil/12 p-7 ${MOTION ? `anim-fade-up d${i * 100 + 80}` : ''} ${inView ? 'in-view' : ''}`}>
              <p className="text-[0.95rem] leading-[1.8] text-soil/72">{r.text}</p>
              <footer className="mt-5 flex items-baseline justify-between gap-2">
                <span className="text-[0.88rem] font-extrabold">{r.name}</span>
                <span className="text-[0.78rem] font-bold text-terra shrink-0">{r.tag}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 수강 신청 ────────────────────────────────────────────────────────────────

function Apply() {
  const { ref, inView } = useInView()
  const [opt, setOpt] = useState<string>(SITE.apply.options[0])
  const [when, setWhen] = useState('')
  const smsBody = `[수강신청] 클래스: ${opt} / 희망 날짜·인원: ${when || '상담 후 결정'}`
  return (
    <section id="apply" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-28 bg-soil text-sand2">
      <div className="mx-auto max-w-3xl px-5">
        <Head title="수강 신청" sub={SITE.apply.lead} inView={inView} light />
        <div className={`space-y-7 ${MOTION ? 'anim-fade-up d160' : ''} ${inView ? 'in-view' : ''}`}>
          <div>
            <p className="text-[0.85rem] font-extrabold text-sand2/50 mb-3">1 · 클래스</p>
            <div className="flex flex-wrap gap-2">
              {SITE.apply.options.map((s) => (
                <button
                  key={s}
                  onClick={() => setOpt(s)}
                  className={`px-4 py-2.5 rounded-full text-[0.9rem] font-extrabold ${opt === s ? 'bg-terra text-sand2' : 'bg-sand2/10 text-sand2/65 hover:bg-sand2/20'}`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.85rem] font-extrabold text-sand2/50 mb-3">2 · 희망 날짜 · 인원 (선택)</p>
            <input
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              placeholder="예) 토요일 오후 2시, 2명"
              className="w-full bg-transparent border-b-2 border-sand2/30 px-1 py-3.5 text-[0.98rem] text-sand2 placeholder:text-sand2/35 focus:outline-none focus:border-terra"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`sms:${SITE.smsPhone}?body=${encodeURIComponent(smsBody)}`}
              className="flex-1 py-4 rounded-full text-center bg-terra text-sand2 text-[0.98rem] font-extrabold hover:bg-sand2 hover:text-terra"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              문자로 신청하기
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex-1 py-4 rounded-full text-center border-2 border-sand2/30 text-[0.98rem] font-extrabold hover:border-terra hover:text-terra"
              style={{ transition: MOTION ? 'all 0.2s' : 'none' }}
            >
              전화 {SITE.phone}
            </a>
          </div>
          <p className="text-[0.82rem] text-sand2/45">인스타그램 {SITE.instagram} DM으로도 신청받습니다.</p>
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
          <p className="text-[1.1rem] font-extrabold">{SITE.address}</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem] text-soil/62">
            <li>· {SITE.location.walk}</li>
            <li>· {SITE.location.parking}</li>
            <li>· {SITE.location.landmark}</li>
          </ul>
          <a
            href={SITE.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-7 px-6 py-3 rounded-full border-2 border-soil/15 text-[0.9rem] font-extrabold hover:border-terra hover:text-terra"
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
    <footer className="border-t border-soil/10 py-12 pb-28 md:pb-12 bg-kiln">
      <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[1.15rem] font-extrabold">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-terra mr-2" />
            {SITE.name}
          </p>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-soil/50">
            {SITE.ceo} · 사업자등록번호 {SITE.bizNo}
            <br />
            {SITE.address} · {SITE.phone}
          </p>
        </div>
        <p className="text-[0.78rem] text-soil/40">instagram {SITE.instagram}</p>
      </div>
    </footer>
  )
}

// ─── 모바일 하단 바 ───────────────────────────────────────────────────────────

function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden grid grid-cols-2 border-t border-soil/12 bg-sand2">
      <a href={`tel:${SITE.phone}`} className="py-4 text-center text-[0.95rem] font-extrabold">
        전화 문의
      </a>
      <button onClick={() => goTo('#apply')} className="py-4 text-center text-[0.95rem] font-extrabold bg-terra text-sand2">
        수강 신청
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
    <div className="bg-sand2 text-soil">
      <Header active={active} />
      <Hero />
      <Oneday />
      <Regular />
      <Schedule />
      <Works />
      <Faq />
      <Reviews />
      <Apply />
      <Location />
      <Footer />
      <MobileBar />
    </div>
  )
}
