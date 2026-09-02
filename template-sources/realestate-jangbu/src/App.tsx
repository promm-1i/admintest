import { useState, useEffect, useRef, useMemo } from 'react'
import { MOTION } from './variant'

/* 이미지 — src/images/ 안의 파일을 같은 이름으로 덮어쓰면 그대로 반영됩니다 */
import heroImg from './images/hero.jpg'
import listingImg1 from './images/listing-1.jpg'
import listingImg2 from './images/listing-2.jpg'
import listingImg3 from './images/listing-3.jpg'
import listingImg4 from './images/listing-4.jpg'
import listingImg5 from './images/listing-5.jpg'
import listingImg6 from './images/listing-6.jpg'
import listingImg7 from './images/listing-7.jpg'
import listingImg8 from './images/listing-8.jpg'
import listingImg9 from './images/listing-9.jpg'
import listingImg10 from './images/listing-10.jpg'
import listingImg11 from './images/listing-11.jpg'
import listingImg12 from './images/listing-12.jpg'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

const SITE = {
  // 여기에 사무소 기본 정보 교체
  name: '장부공인중개사사무소',
  nameShort: '장부부동산',
  slogan: '오늘 나온 매물,\n여기 다 있습니다',
  sloganSub: '망원 · 합정 · 성산 매물은 등록 전에 저희 장부부터 거칩니다.\n네이버에 올라가기 전 매물을 가장 먼저 보세요.',

  // 여기에 연락처 교체
  phone: '02-1234-5678',
  mobile: '010-1234-5678',
  kakaoId: '@장부부동산',
  kakaoUrl: 'https://pf.kakao.com/_xxxxxs',

  // 여기에 사무소 정보 교체 (공인중개사법 의무 표기)
  ceo: '대표 공인중개사 김장부',
  regNo: '11440-2012-00123',   // 중개사무소 등록번호
  bizNo: '123-45-67890',
  address: '서울특별시 마포구 망원로 123, 1층',
  hours: '평일 09:30 – 19:00 · 토 10:00 – 16:00 · 일 휴무',

  // 장부 한 줄 — 신뢰 지표
  ledger: [
    { k: '보유 매물', v: '156건' },
    { k: '이번 주 신규', v: '12건' },
    { k: '오늘 다녀간 손님', v: '9팀' },
    { k: '허위매물', v: '0건 원칙' },
  ],

  // 여기에 네비게이션 교체
  nav: [
    { label: '매물 장부', href: '#listings' },
    { label: '이주의 매물', href: '#pick' },
    { label: '중개보수', href: '#fee' },
    { label: '거래 절차', href: '#process' },
    { label: 'FAQ', href: '#faq' },
    { label: '사무소', href: '#office' },
  ],

  // 여기에 매물 교체 — deal: 매매 | 전세 | 월세
  dealTypes: ['전체', '매매', '전세', '월세'],
  // badge: '오늘' | 'NEW' | '급매' | null — 카드 좌상단 표시
  listings: [
    { deal: '매매', name: '망원 한강뷰 아파트', dong: '망원동', price: '11억 5,000', size: '84㎡', floor: '12/15층', rooms: '방3 욕2', note: '한강 조망 · 남향 · 올수리', badge: '급매', date: '8/31', photo: listingImg1 },
    { deal: '전세', name: '합정 역세권 신축', dong: '합정동', price: '6억 2,000', size: '59㎡', floor: '8/20층', rooms: '방2 욕1', note: '역 도보 3분 · 풀옵션', badge: '오늘', date: '8/31', photo: listingImg2 },
    { deal: '월세', name: '망원시장 앞 오피스텔', dong: '망원동', price: '2,000/95', size: '33㎡', floor: '6/12층', rooms: '원룸 분리형', note: '즉시 입주 · 주차 가능', badge: '오늘', date: '8/31', photo: listingImg3 },
    { deal: '매매', name: '성산 숲세권 아파트', dong: '성산동', price: '9억 8,000', size: '84㎡', floor: '5/18층', rooms: '방3 욕2', note: '초품아 · 확장형', badge: null, date: '8/29', photo: listingImg4 },
    { deal: '전세', name: '서교동 조용한 빌라', dong: '서교동', price: '3억 4,000', size: '66㎡', floor: '3/5층', rooms: '방3 욕1', note: '골목 안쪽 · 채광 좋음', badge: 'NEW', date: '8/30', photo: listingImg5 },
    { deal: '월세', name: '상수 카페거리 상가', dong: '상수동', price: '5,000/280', size: '52㎡', floor: '1/4층', rooms: '상가', note: '코너 자리 · 권리금 협의', badge: null, date: '8/27', photo: listingImg6 },
    { deal: '매매', name: '망원 리모델링 빌라', dong: '망원동', price: '6억 3,000', size: '74㎡', floor: '4/5층', rooms: '방3 욕1', note: '2024년 전체 수리', badge: 'NEW', date: '8/30', photo: listingImg7 },
    { deal: '전세', name: '연남동 테라스 하우스', dong: '연남동', price: '5억 500', size: '78㎡', floor: '2/3층', rooms: '방2 욕2', note: '전용 테라스 · 반려동물 협의', badge: null, date: '8/26', photo: listingImg8 },
    { deal: '월세', name: '합정 신축 투룸', dong: '합정동', price: '3,000/120', size: '44㎡', floor: '9/15층', rooms: '방2 욕1', note: '보안 좋음 · 여성 선호', badge: null, date: '8/28', photo: listingImg9 },
    { deal: '매매', name: '성산 신축급 아파트', dong: '성산동', price: '13억 2,000', size: '101㎡', floor: '15/22층', rooms: '방4 욕2', note: '2022년 입주 · 커뮤니티 좋음', badge: '오늘', date: '8/31', photo: listingImg10 },
    { deal: '전세', name: '망원 초역세권 아파트', dong: '망원동', price: '4억 8,000', size: '59㎡', floor: '11/15층', rooms: '방2 욕1', note: '역 도보 1분 · 즉시 입주', badge: 'NEW', date: '8/30', photo: listingImg11 },
    { deal: '월세', name: '연남 사무실 겸 주거', dong: '연남동', price: '1,000/80', size: '40㎡', floor: '2/4층', rooms: '방1 + 사무공간', note: '사업자 등록 가능', badge: null, date: '8/25', photo: listingImg12 },
  ],
  listingNote: '* 템플릿 예시 매물입니다. 실제 매물 정보로 교체하세요. 가격 단위: 매매·전세 = 만원 생략(억), 월세 = 보증금/월세(만원).',

  // 이주의 매물 (추천 1건)
  pick: {
    deal: '매매',
    name: '망원 한강뷰 아파트',
    dong: '망원동 · ○○아파트',
    price: '11억 5,000',
    photo: listingImg1,
    points: ['거실에서 한강이 정면으로 보이는 남향 라인', '2023년 샷시 포함 올수리 완료', '같은 평형 최근 실거래 대비 4,000만원 낮은 호가'],
    memo: '주인 사정으로 급매. 이번 주 안에 보실 분만 연락 주세요.',
  },

  // 거래 절차
  process: [
    { title: '상담 · 조건 정리', desc: '예산과 조건을 듣고, 실거래가 기준으로 가능한 범위를 정리해 드립니다.' },
    { title: '매물 동행', desc: '서류로 확인된 매물만 보여드립니다. 하루에 몰아서 보는 동선으로 준비합니다.' },
    { title: '계약 · 특약', desc: '등기부·건축물대장을 함께 확인하고, 상황에 맞는 특약을 넣어 계약서를 씁니다.' },
    { title: '잔금 · 이사', desc: '잔금일 은행·법무사 일정을 조율하고, 전입·확정일자까지 안내해 드립니다.' },
  ],

  // 후기
  reviews: [
    { text: '호가만 부르는 게 아니라 실거래 내역을 뽑아서 보여주셨어요. 덕분에 3천만원 깎아서 계약했습니다.', author: '박OO', tag: '매매 · 성산동' },
    { text: '전세 사기 걱정이 많았는데 등기부를 한 줄씩 짚어가며 설명해 주셨습니다. 특약도 꼼꼼하게 넣어주셨어요.', author: '이OO', tag: '전세 · 서교동' },
    { text: '가게 자리 구할 때 유동인구 시간대까지 같이 나가서 봐주셨습니다. 동네를 정말 잘 아시는 분.', author: '김OO', tag: '상가 월세 · 상수동' },
  ],

  // FAQ
  faq: [
    { q: '중개보수는 얼마인가요?', a: '법정 상한요율 이내에서 협의합니다. 위 계산기로 상한액을 먼저 확인해 보세요. 계약 전에 보수를 서면으로 명시하고, 그 외 비용은 일절 받지 않습니다.' },
    { q: '집을 내놓고 싶은데 어떻게 하나요?', a: '전화 주시면 방문해서 시세 상담을 해드리고, 사진 촬영과 광고 등록까지 무료로 진행합니다. 전속중개는 원하시는 경우에만 합니다.' },
    { q: '전세 계약이 처음이라 불안해요.', a: '등기부등본·건축물대장·선순위 보증금을 함께 확인하고, 보증보험 가입 가능 여부까지 계약 전에 검토해 드립니다.' },
    { q: '대출 상담도 되나요?', a: '거래하는 은행 지점들과 조건 비교를 도와드립니다. 다만 최종 승인은 은행 심사에 따르며, 저희는 수수료를 받지 않습니다.' },
    { q: '보고 싶은 매물이 장부에 없어요.', a: '조건을 남겨주시면 나오는 대로 가장 먼저 연락드립니다. 이 동네 매물은 등록 전에 저희 장부부터 거칩니다.' },
  ],

  // 오시는 길
  location: {
    subway: '6호선 망원역 2번 출구 도보 2분',
    parking: '사무소 앞 1대 · 인근 공영주차장 이용',
    landmark: '망원시장 입구 맞은편 1층',
  },

  // 여기에 히어로 사진 교체
  heroPhoto: heroImg,
} as const

// ══════════════════════════════════════════════════════════════════════════════
// 중개보수 상한요율 (주택 기준 · 2021 개정) — 계산기에서 사용
// ══════════════════════════════════════════════════════════════════════════════

const FEE_TABLE = {
  sale: [
    { max: 5000, rate: 0.006, cap: 25 },
    { max: 20000, rate: 0.005, cap: 80 },
    { max: 90000, rate: 0.004, cap: null },
    { max: 120000, rate: 0.005, cap: null },
    { max: 150000, rate: 0.006, cap: null },
    { max: Infinity, rate: 0.007, cap: null },
  ],
  lease: [
    { max: 5000, rate: 0.005, cap: 20 },
    { max: 10000, rate: 0.004, cap: 30 },
    { max: 60000, rate: 0.003, cap: null },
    { max: 120000, rate: 0.004, cap: null },
    { max: 150000, rate: 0.005, cap: null },
    { max: Infinity, rate: 0.006, cap: null },
  ],
}

/** 만원 단위 금액 → 중개보수 상한(만원) */
function calcFee(kind: 'sale' | 'lease', amount: number) {
  const row = FEE_TABLE[kind].find((r) => amount <= r.max)!
  let fee = amount * row.rate
  if (row.cap !== null) fee = Math.min(fee, row.cap)
  return { fee, rate: row.rate }
}

const fmtMan = (man: number) => {
  if (man >= 10000) {
    const eok = Math.floor(man / 10000)
    const rest = Math.round(man % 10000)
    return rest ? `${eok}억 ${rest.toLocaleString()}만원` : `${eok}억원`
  }
  return `${Math.round(man).toLocaleString()}만원`
}

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

function dealClass(deal: string) {
  return deal === '매매' ? 'deal deal-sale' : deal === '전세' ? 'deal deal-jeonse' : 'deal deal-rent'
}

/* 섹션 머리 — 제목 밑에 와인색 밑줄이 그어짐 */
function Head({ title, sub, inView }: { title: string; sub?: string; inView: boolean }) {
  return (
    <div className={`anim-fade-up ${inView ? 'in-view' : ''} mb-10 md:mb-12`}>
      <h2 className="text-[1.8rem] md:text-[2.3rem] font-extrabold leading-tight">{title}</h2>
      <div className={`rule-draw ${inView ? 'in-view' : ''} mt-3 h-[3px] w-14 bg-wine`} />
      {sub && <p className="mt-4 text-[0.9375rem] text-ink-55 leading-[1.8] max-w-2xl">{sub}</p>}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 헤더
// ══════════════════════════════════════════════════════════════════════════════

function Header({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })
  }
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-6 h-16 flex items-center justify-between gap-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="text-left leading-tight">
          <span className="block text-[1.02rem] font-extrabold">{SITE.nameShort}</span>
          <span className="block text-[0.6875rem] text-ink-55">등록 {SITE.regNo}</span>
        </button>

        <nav className="hidden md:flex items-center gap-0.5">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => go(n.href)}
              className={`px-3 py-2 text-[0.9375rem] font-semibold ${active === n.href.slice(1) ? 'text-wine' : 'text-ink/70 hover:text-ink'}`}
            >
              {n.label}
            </button>
          ))}
          <a href={`tel:${SITE.phone}`} className="nums ml-3 px-4 py-2.5 rounded-lg bg-wine text-white text-[0.9375rem] font-extrabold hover:bg-wine-d">
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
        <div className="md:hidden border-t border-line bg-white px-5 py-2">
          {SITE.nav.map((n) => (
            <button key={n.href} onClick={() => go(n.href)} className="block w-full text-left py-3.5 text-[1rem] font-semibold border-b border-line last:border-0">
              {n.label}
            </button>
          ))}
          <a href={`tel:${SITE.phone}`} className="nums block text-center my-3 py-3 rounded-lg bg-wine text-white font-extrabold">
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
  return (
    <section ref={ref} className="pt-28 md:pt-36 pb-14 md:pb-20">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className={`anim-fade-up ${inView ? 'in-view' : ''}`}>
          <div className="rounded-xl overflow-hidden border border-line">
            <img src={SITE.heroPhoto} alt="동네 아파트 전경" className="w-full aspect-[21/8] object-cover" />
          </div>
          <p className="text-[0.75rem] text-ink-55 mt-2 text-right">망원동 · 사무소에서 도보 5분 거리</p>
        </div>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-14 items-start mt-9 mb-12">
          <h1 className={`anim-fade-up d80 ${inView ? 'in-view' : ''} text-[2.4rem] md:text-[3.3rem] font-extrabold leading-[1.18] whitespace-pre-line`}>
            {SITE.slogan}
          </h1>
          <div className={`anim-fade-up d160 ${inView ? 'in-view' : ''} lg:pt-2`}>
            <p className="whitespace-pre-line text-[1rem] text-ink-55 leading-[1.85] mb-7">{SITE.sloganSub}</p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => document.querySelector('#listings')?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })}
                className="px-7 py-4 rounded-lg bg-wine text-white text-[1rem] font-bold hover:bg-wine-d"
                style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
              >
                오늘 매물 보기 →
              </button>
              <a href={`tel:${SITE.phone}`} className="nums text-[1.2rem] font-extrabold border-b-[3px] border-wine pb-0.5">
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>

        {/* 장부 한 줄 */}
        <dl className={`anim-fade-up d240 ${inView ? 'in-view' : ''} grid grid-cols-2 md:grid-cols-4 border-y-2 border-ink`}>
          {SITE.ledger.map((l, i) => (
            <div key={l.k} className={`py-4 px-1 md:px-5 flex items-baseline gap-2.5 ${i > 0 ? 'md:border-l border-line' : ''}`}>
              <dt className="text-[0.8125rem] text-ink-55 font-semibold shrink-0">{l.k}</dt>
              <dd className="nums text-[1.05rem] md:text-[1.15rem] font-extrabold">{l.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 매물 장부 — 거래유형 필터  ★ 시그니처
// ══════════════════════════════════════════════════════════════════════════════

function Listings() {
  const { ref, inView } = useInView(0.04)
  const [tab, setTab] = useState('전체')
  const list = SITE.listings.filter((l) => tab === '전체' || l.deal === tab)
  return (
    <section id="listings" className="py-18 md:py-24 bg-sand">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="매물 장부" sub="전체 보유 156건 중 이번 주 공개분입니다. 서류로 확인된 매물만 올리고, 사진과 다른 집은 없습니다." inView={inView} />

        <div className={`anim-fade-up ${inView ? 'in-view' : ''} flex flex-wrap gap-2 mb-8`} role="tablist" aria-label="거래유형 필터">
          {SITE.dealTypes.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`px-4.5 py-2.5 rounded-lg text-[0.9375rem] font-bold border ${
                tab === t ? 'bg-ink text-white border-ink' : 'bg-white text-ink/65 border-line hover:border-ink/50'
              }`}
              style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
            >
              {t}
            </button>
          ))}
        </div>

        <div key={tab} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((l, i) => (
            <article
              key={l.name}
              className={`listing ${MOTION ? 'listing-in' : ''} bg-white border border-line rounded-xl overflow-hidden`}
              style={MOTION ? { animationDelay: `${i * 50}ms` } : undefined}
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img src={l.photo} alt={`${l.dong} ${l.name}`} className="listing-img w-full h-full object-cover" loading="lazy" />
                <span className={`absolute top-3 left-3 ${dealClass(l.deal)} bg-white/95`}>{l.deal}</span>
                {l.badge && (
                  <span className={`absolute top-3 right-3 text-[0.6875rem] font-extrabold px-2 py-1 rounded ${l.badge === '급매' ? 'bg-wine text-white' : 'bg-ink text-white'}`}>
                    {l.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between mb-0.5">
                  <p className="text-[0.8125rem] text-ink-55">{l.dong}</p>
                  <p className="nums text-[0.6875rem] text-ink-55/70">{l.date} 등록</p>
                </div>
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="text-[1.0625rem] font-extrabold">{l.name}</h3>
                </div>
                <p className="nums text-[1.35rem] font-extrabold text-wine mb-3">{l.price}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[0.8125rem] text-ink-55 pb-3 border-b border-line mb-3">
                  <span className="nums">{l.size}</span>
                  <span className="nums">{l.floor}</span>
                  <span>{l.rooms}</span>
                </div>
                <p className="text-[0.875rem] text-ink/75">{l.note}</p>
              </div>
            </article>
          ))}
        </div>
        <div className={`anim-fade-up d160 ${inView ? 'in-view' : ''} mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-line rounded-xl px-6 py-5`}>
          <p className="text-[0.9375rem]">
            <b>공개 안 된 매물이 {156 - SITE.listings.length}건 더 있습니다.</b>{' '}
            <span className="text-ink-55">조건을 남기시면 나오는 대로 가장 먼저 연락드립니다.</span>
          </p>
          <a href={`tel:${SITE.phone}`} className="shrink-0 px-5 py-3 rounded-lg bg-ink text-white text-[0.9375rem] font-bold hover:bg-wine" style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}>
            숨은 매물 문의
          </a>
        </div>
        <p className={`anim-fade-up d240 ${inView ? 'in-view' : ''} text-[0.75rem] text-ink-55 mt-4`}>{SITE.listingNote}</p>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 이주의 매물
// ══════════════════════════════════════════════════════════════════════════════

function Pick() {
  const { ref, inView } = useInView(0.12)
  const p = SITE.pick
  return (
    <section id="pick" className="py-18 md:py-24">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="이주의 매물" sub="사장님이 이번 주에 딱 하나만 꼽았습니다." inView={inView} />
        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''} grid lg:grid-cols-[1.15fr_0.85fr] border-2 border-ink rounded-xl overflow-hidden`}>
          <div className="relative min-h-[260px]">
            <img src={p.photo} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
            <span className={`absolute top-4 left-4 ${dealClass(p.deal)} bg-white/95 !text-[0.875rem]`}>{p.deal}</span>
          </div>
          <div className="p-7 md:p-9 bg-white">
            <p className="text-[0.875rem] text-ink-55 mb-1">{p.dong}</p>
            <h3 className="text-[1.4rem] font-extrabold mb-2">{p.name}</h3>
            <p className="nums text-[1.9rem] font-extrabold text-wine mb-6">{p.price}</p>
            <ul className="space-y-2.5 mb-6">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-2.5 text-[0.9375rem] text-ink/80 leading-[1.7]">
                  <span className="text-wine font-extrabold shrink-0">✓</span>
                  {pt}
                </li>
              ))}
            </ul>
            <p className="text-[0.875rem] text-ink-55 border-t border-line pt-4 mb-6">{p.memo}</p>
            <a href={`tel:${SITE.phone}`} className="inline-block px-6 py-3.5 rounded-lg bg-wine text-white font-bold hover:bg-wine-d" style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}>
              이 매물 문의하기
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 중개보수 계산기  ★ 시그니처
// ══════════════════════════════════════════════════════════════════════════════

function FeeCalc() {
  const { ref, inView } = useInView(0.12)
  const [kind, setKind] = useState<'sale' | 'jeonse' | 'rent'>('sale')
  const [eok, setEok] = useState(9)      // 억
  const [man, setMan] = useState(0)      // 나머지 만원
  const [deposit, setDeposit] = useState(3000) // 월세 보증금(만)
  const [monthly, setMonthly] = useState(100)  // 월세(만)

  const amount = useMemo(() => {
    if (kind === 'rent') {
      // 환산보증금 = 보증금 + 월세 × 100 (5천만 미만이면 ×70)
      let a = deposit + monthly * 100
      if (a < 5000) a = deposit + monthly * 70
      return a
    }
    return eok * 10000 + man
  }, [kind, eok, man, deposit, monthly])

  const { fee, rate } = calcFee(kind === 'sale' ? 'sale' : 'lease', amount)

  return (
    <section id="fee" className="py-18 md:py-24 bg-ink text-white">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="중개보수, 먼저 계산해 보세요" sub="법정 상한요율 기준입니다. 상한 이내에서 협의하며, 계약 전에 서면으로 확정합니다." inView={inView} />

        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''} grid lg:grid-cols-[1fr_0.9fr] gap-10 items-start`}>
          <div>
            <div className="flex gap-2 mb-6" role="tablist" aria-label="거래 유형">
              {([['sale', '매매'], ['jeonse', '전세'], ['rent', '월세']] as const).map(([k, label]) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={kind === k}
                  onClick={() => setKind(k)}
                  className={`px-5 py-2.5 rounded-lg text-[0.9375rem] font-bold border ${
                    kind === k ? 'bg-white text-ink border-white' : 'border-white/30 text-white/70 hover:border-white/60'
                  }`}
                  style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                >
                  {label}
                </button>
              ))}
            </div>

            {kind !== 'rent' ? (
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[0.8125rem] font-bold text-white/50 mb-1.5" htmlFor="f-eok">
                    {kind === 'sale' ? '매매가' : '전세 보증금'} — <span className="nums text-white">{eok}억 {man ? `${man.toLocaleString()}만` : ''}</span>
                  </label>
                  <input id="f-eok" type="range" min={0} max={30} value={eok} onChange={(e) => setEok(+e.target.value)} className="w-full accent-wine" />
                  <div className="flex justify-between text-[0.6875rem] text-white/40 nums"><span>0</span><span>30억</span></div>
                </div>
                <div>
                  <label className="block text-[0.8125rem] font-bold text-white/50 mb-1.5" htmlFor="f-man">+ 만원 단위</label>
                  <input id="f-man" type="range" min={0} max={9500} step={500} value={man} onChange={(e) => setMan(+e.target.value)} className="w-full accent-wine" />
                  <div className="flex justify-between text-[0.6875rem] text-white/40 nums"><span>0</span><span>9,500만</span></div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[0.8125rem] font-bold text-white/50 mb-1.5" htmlFor="f-dep">
                    보증금 — <span className="nums text-white">{fmtMan(deposit)}</span>
                  </label>
                  <input id="f-dep" type="range" min={0} max={30000} step={500} value={deposit} onChange={(e) => setDeposit(+e.target.value)} className="w-full accent-wine" />
                </div>
                <div>
                  <label className="block text-[0.8125rem] font-bold text-white/50 mb-1.5" htmlFor="f-mon">
                    월세 — <span className="nums text-white">{monthly.toLocaleString()}만원</span>
                  </label>
                  <input id="f-mon" type="range" min={0} max={500} step={5} value={monthly} onChange={(e) => setMonthly(+e.target.value)} className="w-full accent-wine" />
                </div>
                <p className="col-span-2 text-[0.75rem] text-white/40">
                  월세는 <span className="nums">보증금 + 월세×100</span> 환산보증금 기준으로 계산됩니다.
                </p>
              </div>
            )}
          </div>

          <div className="bg-white/6 border border-white/15 rounded-xl p-6 md:p-8">
            <dl className="space-y-2.5 text-[0.9375rem] mb-5">
              <div className="flex justify-between"><dt className="text-white/50">거래 금액</dt><dd className="nums font-bold">{fmtMan(amount)}</dd></div>
              <div className="flex justify-between"><dt className="text-white/50">상한요율</dt><dd className="nums font-bold">{(rate * 100).toFixed(1)}%</dd></div>
            </dl>
            <div className="border-t border-white/15 pt-5 flex items-baseline justify-between mb-6">
              <span className="text-[0.9375rem] text-white/60">중개보수 상한</span>
              <span className="nums text-[2rem] md:text-[2.4rem] font-extrabold" aria-live="polite">{fmtMan(fee)}</span>
            </div>
            <a href={`tel:${SITE.phone}`} className="block text-center py-4 rounded-lg bg-wine text-white font-extrabold hover:bg-wine-d" style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}>
              보수 협의 · 매물 상담
            </a>
            <p className="text-[0.75rem] text-white/40 mt-4">* 부가세 별도. 상한 이내에서 협의로 정하며, 오피스텔·상가는 요율이 다릅니다.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 거래 절차 · 후기
// ══════════════════════════════════════════════════════════════════════════════

function Process() {
  const { ref, inView } = useInView(0.12)
  return (
    <section id="process" className="py-18 md:py-24">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="거래는 이렇게 진행됩니다" sub="처음이어도 괜찮습니다. 단계마다 챙길 서류를 미리 알려드립니다." inView={inView} />
        <ol className="grid md:grid-cols-4 gap-x-6 gap-y-8">
          {SITE.process.map((s, i) => (
            <li key={s.title} className={`anim-fade-up ${['', 'd80', 'd160', 'd240'][i]} ${inView ? 'in-view' : ''} border-t-2 border-ink pt-4`}>
              <span className="nums text-[0.8125rem] font-extrabold text-wine">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-[1.0625rem] font-extrabold mt-1.5 mb-2">{s.title}</h3>
              <p className="text-[0.875rem] text-ink-55 leading-[1.75]">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Reviews() {
  const { ref, inView } = useInView(0.1)
  return (
    <section className="py-18 md:py-24 bg-sand">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="거래하신 분들 말" sub="실제 이용 후기를 바탕으로 재구성한 예시입니다." inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.author} className={`anim-fade-up ${['', 'd80', 'd160'][i]} ${inView ? 'in-view' : ''} bg-white border border-line rounded-xl p-6`}>
              <p className="text-[0.9375rem] leading-[1.85] text-ink/85 mb-5">{r.text}</p>
              <footer className="flex items-center justify-between">
                <cite className="not-italic text-[0.9375rem] font-extrabold">{r.author}</cite>
                <span className="text-[0.8125rem] text-ink-55">{r.tag}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// FAQ · 사무소 · 오시는 길
// ══════════════════════════════════════════════════════════════════════════════

function Faq() {
  const { ref, inView } = useInView(0.08)
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  return (
    <section id="faq" className="py-18 md:py-24">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="자주 묻는 질문" inView={inView} />
        <div className="max-w-3xl border-t-2 border-ink">
          {SITE.faq.map((f, i) => (
            <div key={f.q} className={`anim-fade-up ${['', 'd80', 'd160', 'd240', 'd320'][i] ?? ''} ${inView ? 'in-view' : ''} ledger-row`}>
              <button
                className="w-full flex items-baseline justify-between gap-6 py-5 text-left"
                aria-expanded={openIdx === i}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="text-[1.0625rem] font-bold">{f.q}</span>
                <span className={`nums shrink-0 text-[1.3rem] font-extrabold ${openIdx === i ? 'text-wine' : 'text-ink/30'}`} aria-hidden="true">
                  {openIdx === i ? '−' : '+'}
                </span>
              </button>
              {openIdx === i && <p className="pb-6 pr-10 text-[0.9375rem] text-ink-55 leading-[1.9]">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Office() {
  const { ref, inView } = useInView(0.12)
  return (
    <section id="office" className="py-18 md:py-24 bg-sand">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="사무소" sub="개업 공인중개사가 직접 상담합니다. 등록번호와 보증 내역은 사무소에 게시되어 있습니다." inView={inView} />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* 약도 — 실제 지도로 교체하세요 */}
          <div className={`anim-fade-up ${inView ? 'in-view' : ''} relative overflow-hidden rounded-xl border border-line bg-white aspect-[4/3]`}>
            <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="약도">
              <rect width="800" height="600" fill="#f7f5f2" />
              <g fill="#ece8e1">
                <rect x="40" y="40" width="220" height="150" rx="8" />
                <rect x="320" y="40" width="180" height="150" rx="8" />
                <rect x="560" y="40" width="200" height="150" rx="8" />
                <rect x="40" y="260" width="220" height="140" rx="8" />
                <rect x="560" y="260" width="200" height="140" rx="8" />
                <rect x="40" y="460" width="220" height="110" rx="8" />
                <rect x="320" y="460" width="180" height="110" rx="8" />
                <rect x="560" y="460" width="200" height="110" rx="8" />
              </g>
              <g stroke="#ffffff" strokeLinecap="round" fill="none">
                <path d="M0 225 H800" strokeWidth="26" />
                <path d="M0 430 H800" strokeWidth="18" />
                <path d="M290 0 V600" strokeWidth="22" />
                <path d="M530 0 V600" strokeWidth="18" />
              </g>
              <g transform="translate(410 320)">
                <circle r="15" fill="#7a2530" stroke="#ffffff" strokeWidth="4" />
                <circle r="5" fill="#ffffff" />
              </g>
              <text x="432" y="312" fontFamily="Pretendard, sans-serif" fontSize="15" fontWeight="700" fill="#1e1b18">{SITE.nameShort}</text>
            </svg>
            <p className="absolute bottom-3 left-4 text-[0.75rem] text-wine font-semibold">실제 지도로 교체해 주세요</p>
          </div>

          <div className={`anim-fade-up d160 ${inView ? 'in-view' : ''}`}>
            <dl className="border-t-2 border-ink">
              {[
                ['상호', SITE.name],
                ['대표', SITE.ceo],
                ['등록번호', SITE.regNo],
                ['주소', `${SITE.address} (${SITE.location.landmark})`],
                ['지하철', SITE.location.subway],
                ['주차', SITE.location.parking],
                ['영업시간', SITE.hours],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[92px_1fr] gap-6 py-3.5 ledger-row">
                  <dt className="text-[0.8125rem] font-bold text-ink-55 pt-0.5">{k}</dt>
                  <dd className="text-[0.9375rem] leading-[1.7]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// CTA · 푸터 · 모바일 바
// ══════════════════════════════════════════════════════════════════════════════

function Cta() {
  const { ref, inView } = useInView(0.2)
  return (
    <section ref={ref} className="bg-wine text-white">
      <div className="max-w-6xl mx-auto px-5 md:px-6 py-14 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className={`anim-fade-up ${inView ? 'in-view' : ''}`}>
          <h2 className="text-[1.7rem] md:text-[2.1rem] font-extrabold leading-[1.25] mb-2">
            집 내놓을 때도, 구할 때도
            <br />
            일단 전화 한 통이면 됩니다
          </h2>
          <p className="text-white/70 text-[0.9375rem]">시세만 물어보셔도 됩니다. 귀찮게 연락드리지 않아요.</p>
        </div>
        <a
          href={`tel:${SITE.phone}`}
          className={`anim-fade-up d80 ${inView ? 'in-view' : ''} nums shrink-0 text-center px-8 py-5 rounded-xl bg-white text-ink text-[1.5rem] md:text-[1.8rem] font-extrabold leading-none hover:bg-ink hover:text-white`}
          style={{ transition: MOTION ? 'background-color 0.2s, color 0.2s' : 'none' }}
        >
          {SITE.phone}
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <p className="text-[1.02rem] font-extrabold mb-6">{SITE.name}</p>
        <div className="space-y-1.5 text-[0.8125rem] text-ink-55">
          <p>{SITE.ceo} · 중개사무소 등록번호 {SITE.regNo} · 사업자등록번호 {SITE.bizNo}</p>
          <p>{SITE.address} · {SITE.phone} · {SITE.mobile}</p>
          <p>공제보험(한국공인중개사협회) 가입 · 보증서는 사무소에 게시</p>
        </div>
        <div className="mt-8 pt-4 border-t border-line flex flex-col sm:flex-row justify-between gap-2 text-[0.75rem] text-ink-55">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <p>본 페이지의 매물 정보는 예시입니다</p>
        </div>
      </div>
    </footer>
  )
}

function MobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-ink text-white pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 divide-x divide-white/15">
        <a href={`tel:${SITE.phone}`} className="py-3.5 text-center text-[0.9375rem] font-bold">전화</a>
        <a href={SITE.kakaoUrl} target="_blank" rel="noreferrer" className="py-3.5 text-center text-[0.9375rem] font-bold">카카오톡</a>
        <button
          onClick={() => document.querySelector('#fee')?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })}
          className="py-3.5 text-center text-[0.9375rem] font-bold text-white"
        >
          중개보수
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
        <Listings />
        <Pick />
        <FeeCalc />
        <Process />
        <Reviews />
        <Faq />
        <Office />
        <Cta />
      </main>
      <Footer />
      <MobileBar />
    </div>
  )
}
