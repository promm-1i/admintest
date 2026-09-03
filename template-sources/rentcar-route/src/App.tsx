import { useState, useEffect, useRef, useMemo } from 'react'
import { MOTION } from './variant'

/* 이미지 — src/images/ 안의 파일을 같은 이름으로 덮어쓰면 그대로 반영됩니다 */
import heroImg from './images/hero.jpg'
import carImg1 from './images/car-1.jpg'
import carImg2 from './images/car-2.jpg'
import carImg3 from './images/car-3.jpg'
import carImg4 from './images/car-4.jpg'
import carImg5 from './images/car-5.jpg'
import carImg6 from './images/car-6.jpg'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

const SITE = {
  // 여기에 업체 기본 정보 교체
  name: '루트렌트카',
  nameEn: 'ROUTE RENT-A-CAR',
  plate: '허 2757',
  slogan: '필요한 날만,\n필요한 만큼',
  sloganSub: '보증금 없이, 앱 설치 없이. 전화 한 통이면 30분 뒤에 차 키를 받습니다.',

  // 여기에 연락처 교체
  phone: '010-1234-5678',
  kakaoId: '@루트렌트카',
  kakaoUrl: 'https://pf.kakao.com/_xxxxxs',

  // 여기에 사업자 정보 교체
  ceo: '대표 김루트',
  bizNo: '123-45-67890',
  address: '서울특별시 강서구 공항대로 45, 1층',
  license: '자동차대여사업 등록 제0000호',

  // 여기에 히어로 사진 교체
  heroPhoto: heroImg,

  // 약속 3가지
  promises: [
    { k: '숨은 요금 0', v: '표시 요금이 전부입니다' },
    { k: '30분 배차', v: '전화 후 강서권 기준' },
    { k: '연중무휴', v: '오전 7시 – 밤 10시' },
  ],

  // 여기에 네비게이션 메뉴 교체
  nav: [
    { label: '차량', href: '#cars' },
    { label: '요금 계산', href: '#calc' },
    { label: '장기렌트', href: '#monthly' },
    { label: '보험', href: '#insurance' },
    { label: 'FAQ', href: '#faq' },
    { label: '오시는 길', href: '#location' },
  ],

  // 여기에 차량 교체 — dayPrice 는 1일 기준(만원), 계산기와 연동됩니다
  carTypes: ['전체', '소형', '세단', 'SUV'],
  cars: [
    {
      type: '소형',
      name: '경형 해치백',
      example: '캐스퍼 · 레이급',
      photo: carImg1,
      seats: '4인승',
      fuel: '가솔린',
      year: '22년식~',
      dayPrice: 4.5,
    },
    {
      type: '세단',
      name: '준중형 세단',
      example: '아반떼급',
      photo: carImg2,
      seats: '5인승',
      fuel: '가솔린',
      year: '22년식~',
      dayPrice: 6,
    },
    {
      type: '세단',
      name: '중형 세단',
      example: '쏘나타 · K5급',
      photo: carImg3,
      seats: '5인승',
      fuel: '가솔린 · LPG',
      year: '23년식~',
      dayPrice: 8,
    },
    {
      type: 'SUV',
      name: '준중형 SUV',
      example: '코나 · 셀토스급',
      photo: carImg4,
      seats: '5인승',
      fuel: '가솔린',
      year: '23년식~',
      dayPrice: 9,
    },
    {
      type: 'SUV',
      name: '중형 SUV',
      example: '쏘렌토 · 싼타페급',
      photo: carImg5,
      seats: '5–7인승',
      fuel: '디젤 · 하이브리드',
      year: '23년식~',
      dayPrice: 12,
    },
    {
      type: 'SUV',
      name: '대형 SUV',
      example: '팰리세이드급',
      photo: carImg6,
      seats: '7–8인승',
      fuel: '가솔린',
      year: '22년식~',
      dayPrice: 15,
    },
  ],

  // 요금 계산 규칙
  calc: {
    insurances: [
      { key: 'basic', label: '일반 자차', addPerDay: 0, note: '면책금 최대 30만원' },
      { key: 'full', label: '완전 자차', addPerDay: 1.5, note: '면책금 0원 · 휴차료 면제' },
    ],
    discounts: [
      { minDays: 7, rate: 0.2, label: '7일 이상 20%' },
      { minDays: 3, rate: 0.1, label: '3일 이상 10%' },
    ],
  },

  // 이용 방법
  how: [
    { title: '전화 · 카톡 예약', desc: '원하는 차종과 날짜만 말씀하세요. 견적을 바로 드립니다.' },
    { title: '면허 · 결제 확인', desc: '만 21세 이상, 면허 1년 이상. 카드 결제 시 보증금이 없습니다.' },
    { title: '차량 인수', desc: '지점 방문 또는 강서권 무료 딜리버리. 함께 차량 상태를 확인합니다.' },
    { title: '반납', desc: '연료는 인수 시 눈금만 맞춰 주세요. 세차는 저희가 합니다.' },
  ],

  // 보험 안내
  insurance: {
    rows: [
      { item: '대인 배상', basic: '무한', full: '무한' },
      { item: '대물 배상', basic: '1억', full: '1억' },
      { item: '자손 (1인)', basic: '1,500만', full: '1,500만' },
      { item: '자차 면책금', basic: '최대 30만', full: '0원' },
      { item: '휴차 보상료', basic: '청구', full: '면제' },
    ],
    note: '전 차량 종합보험 가입. 음주 · 무면허 · 약관 위반 사고는 보상에서 제외됩니다.',
  },

  // 후기
  reviews: [
    { text: '급하게 하루 빌렸는데 전화 30분 만에 집 앞으로 가져다주셨어요. 반납도 그 자리에서 끝.', author: '김OO', tag: '중형 세단 1일' },
    { text: '제주 갈 때마다 여기서 빌립니다. 표시 요금 그대로라 정산할 때 놀랄 일이 없어요.', author: '박OO', tag: '준중형 SUV 4일' },
    { text: '완전 자차로 했는데 주차하다 긁었을 때 정말 한 푼도 안 냈습니다. 다음에도 무조건.', author: '이OO', tag: '중형 SUV 7일' },
  ],

  // 장기렌트 — 월 단위
  monthly: {
    intro: '한 달 이상 쓰신다면 일 단위보다 훨씬 저렴합니다. 보험 · 정기점검 포함, 중도 반납 위약금 없이.',
    rows: [
      { name: '경형 해치백', m1: '45만', m3: '39만', m6: '33만' },
      { name: '준중형 세단', m1: '59만', m3: '52만', m6: '45만' },
      { name: '준중형 SUV', m1: '79만', m3: '69만', m6: '59만' },
      { name: '중형 SUV', m1: '99만', m3: '89만', m6: '79만' },
    ],
    note: '월 기준 · 보험료 포함 · 약정 개월별 월 요금입니다. 법인 · 개인사업자 세금계산서 발행 가능.',
  },

  // 부가 옵션
  extras: [
    { name: '유아용 카시트', price: '1일 5,000원', note: '신생아 · 주니어 모두 보유' },
    { name: '하이패스 단말기', price: '무료', note: '통행료는 반납 시 정산' },
    { name: '차량 딜리버리', price: '강서권 무료', note: '그 외 지역 거리별 협의' },
    { name: '심야 인수 · 반납', price: '1만원', note: '22시 이후, 사전 예약 시' },
    { name: '스노우 체인 · 루프박스', price: '1일 1만원', note: '동계 · 캠핑 시즌 한정' },
  ],

  // 이용 규정 요약
  rules: [
    { k: '운전자 조건', v: '만 21세 이상 · 면허 취득 1년 이상. 제2운전자는 인수 시 등록하면 무료입니다.' },
    { k: '연료', v: '인수할 때의 눈금만 맞춰 반납하시면 됩니다. 부족분은 주유소 단가로 정산합니다.' },
    { k: '흡연 · 반려동물', v: '전 차량 금연입니다. 반려동물은 켄넬 동반 시 가능하며 실내 오염 시 클리닝 비용이 청구됩니다.' },
    { k: '사고 시', v: '즉시 지점으로 연락 주세요. 보험 접수부터 대차 안내까지 저희가 처리합니다. 현장 합의는 하지 마세요.' },
    { k: '반납 지연', v: '30분까지는 괜찮습니다. 이후 초과 시간당 일 요금의 20%가 청구되니 미리 연락 주세요.' },
  ],

  // 자주 묻는 질문
  faq: [
    { q: '보증금이 정말 없나요?', a: '네. 신용 · 체크카드로 결제하시면 보증금이 없습니다. 현금 결제 시에만 소액 보증금을 받고 반납 시 즉시 돌려드립니다.' },
    { q: '당일 예약도 되나요?', a: '됩니다. 전화 주시면 가능한 차량을 바로 알려드리고, 강서권은 30분 안에 배차해 드립니다.' },
    { q: '다른 사람이 운전해도 되나요?', a: '인수할 때 제2운전자로 등록하면 됩니다. 등록 없이 운전하다 사고가 나면 보험 처리가 안 되니 꼭 말씀해 주세요.' },
    { q: '제주도나 지방까지 가도 되나요?', a: '전국 어디든 가능합니다. 도서 지역(선박 탑재)만 사전에 알려주세요.' },
    { q: '흠집이 원래 있었는지 어떻게 확인하나요?', a: '인수할 때 차량 외관을 함께 촬영하고 사진을 카톡으로 보내드립니다. 그 사진이 기준이 되니 안심하셔도 됩니다.' },
    { q: '예약 취소 수수료가 있나요?', a: '인수 24시간 전까지는 전액 무료 취소입니다. 이후에는 1일 요금의 30%가 발생합니다.' },
  ],
} as const

// ══════════════════════════════════════════════════════════════════════════════
// 훅 · 공통
// ══════════════════════════════════════════════════════════════════════════════

function useInView(threshold = 0.12) {
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

const won = (man: number) => {
  const v = Math.round(man * 10) / 10
  return v % 1 === 0 ? `${v.toLocaleString('ko-KR')}만원` : `${v.toFixed(1)}만원`
}

/* 섹션 머리 — 차선 위 제목 */
function Head({ title, sub, inView, dark = false }: { title: string; sub?: string; inView: boolean; dark?: boolean }) {
  return (
    <div className={`anim-fade-up ${inView ? 'in-view' : ''} mb-10 md:mb-14`}>
      <h2 className={`f-speed text-[1.9rem] md:text-[2.6rem] leading-none ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {sub && <p className={`mt-3 text-[0.9375rem] ${dark ? 'text-white/55' : 'text-ink-55'}`}>{sub}</p>}
      <div className={`mt-6 ${dark ? 'lane-dark' : 'lane'}`} />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 헤더
// ══════════════════════════════════════════════════════════════════════════════

function Header({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const dark = !scrolled && !open
  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })
  }
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${dark ? 'bg-road' : 'bg-white/95 backdrop-blur-sm border-b border-line'}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-6 h-16 flex items-center justify-between gap-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-center gap-2.5">
          <span className="plate text-[0.8125rem]">{SITE.plate}</span>
          <span className={`f-speed text-[1.1rem] ${dark ? 'text-white' : 'text-ink'}`}>{SITE.name}</span>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => go(n.href)}
              className={`px-3 py-2 text-[0.9375rem] font-semibold ${
                active === n.href.slice(1) ? 'text-blue' : dark ? 'text-white/70 hover:text-white' : 'text-ink/70 hover:text-ink'
              }`}
            >
              {n.label}
            </button>
          ))}
          <a href={`tel:${SITE.phone}`} className="nums ml-4 px-4 py-2.5 rounded-lg bg-blue text-white text-[0.9375rem] font-extrabold hover:bg-blue-d">
            {SITE.phone}
          </a>
        </nav>

        <button className="lg:hidden p-2 -mr-2" aria-label="메뉴" onClick={() => setOpen(!open)}>
          <div className="w-6 space-y-1.5">
            <span className={`block h-0.5 ${dark ? 'bg-white' : 'bg-ink'}`} />
            <span className={`block h-0.5 ${dark ? 'bg-white' : 'bg-ink'} ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 ${dark ? 'bg-white' : 'bg-ink'}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-white px-5 py-2">
          {SITE.nav.map((n) => (
            <button key={n.href} onClick={() => go(n.href)} className="block w-full text-left py-3.5 text-[1rem] font-semibold border-b border-line last:border-0">
              {n.label}
            </button>
          ))}
          <a href={`tel:${SITE.phone}`} className="nums block text-center my-3 py-3 rounded-lg bg-blue text-white font-extrabold">
            {SITE.phone}
          </a>
        </div>
      )}
    </header>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 히어로 — 지도 위의 지점과 픽업 포인트
// ══════════════════════════════════════════════════════════════════════════════

/* 강서 · 김포공항 일대 약도.
   좌표는 viewBox(0 0 1200 820) 기준 고정값이고 건물은 고정 시드로 한 번만 만들기 때문에
   빌드마다 같은 그림이 나옵니다. 지점 · 픽업 포인트 · 딜리버리 구역은 SITE 의 주소와
   안내(강서 · 양천 · 김포공항 무료 딜리버리)를 그대로 옮긴 것입니다. */

/* 도로가 나눈 가구(街區). 이 안을 건물로 채웁니다 — [x, y, 너비, 높이] */
const MAP_ZONES: Array<[number, number, number, number]> = [
  [60, 314, 140, 144],
  [60, 524, 140, 104],
  [60, 700, 140, 128],
  [616, 312, 100, 146],
  [736, 312, 104, 146],
  [862, 312, 122, 146],
  [1016, 308, 150, 150],
  [616, 526, 100, 80],
  [616, 634, 100, 56],
  [736, 526, 104, 164],
  [862, 526, 122, 80],
  [862, 632, 122, 58],
  [1016, 522, 150, 168],
  [610, 730, 106, 96],
  [736, 734, 104, 92],
  [862, 730, 122, 96],
  [1016, 732, 150, 94],
]

/* 건물 자국 — 세 가지 밝기로 나눠 path 세 개에 몰아 담습니다 */
const MAP_FABRIC = (() => {
  let s = 20260903
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
  const d = ['', '', '']
  for (const [zx, zy, zw, zh] of MAP_ZONES) {
    let y = zy
    while (y < zy + zh - 14) {
      const h = Math.min(15 + Math.round(rnd() * 26), zy + zh - y)
      let x = zx
      while (x < zx + zw - 14) {
        const w = Math.min(18 + Math.round(rnd() * 38), zx + zw - x)
        if (w > 12 && h > 12) d[Math.floor(rnd() * 3)] += `M${x} ${y}h${w}v${h}h${-w}z`
        x += w + 4 + Math.round(rnd() * 5)
      }
      y += h + 4 + Math.round(rnd() * 6)
    }
  }
  return d
})()

/* 이면도로 */
const MAP_STREETS = [
  'M 616 388 H 984',
  'M 616 600 H 840',
  'M 1016 402 H 1166',
  'M 690 312 V 458',
  'M 920 526 V 690',
  'M 780 730 V 826',
  'M 1090 308 V 458',
  'M 640 702 L 742 648',
  'M 210 292 V 828',
  'M 60 480 H 240',
  'M 60 648 H 200',
]

/* vb — 가로로 넓고 낮은 띠에서는 세로가 잘려 나가므로, 그 구간에서만
   보이는 창(窓)의 중심을 아래로 내린 viewBox 를 넘겨 지명이 잘리지 않게 합니다. */
function RouteMap({ k, vb = '0 0 1200 820' }: { k: number; vb?: string }) {
  const lbl = { stroke: '#15171c', strokeWidth: 5, style: { paintOrder: 'stroke' as const } }
  return (
    <svg viewBox={vb} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full overflow-hidden" aria-hidden="true">
      <rect x="0" y="0" width="1200" height="820" fill="#181b21" />

      {/* 한강 · 한강공원 · 안양천 */}
      <path d="M -80 158 C 140 116, 330 184, 560 166 C 790 148, 950 214, 1290 168" stroke="#1b3350" strokeWidth="176" fill="none" />
      <path d="M -80 262 C 140 220, 330 288, 560 270 C 790 252, 950 318, 1290 272" stroke="#1e2a23" strokeWidth="30" fill="none" />
      <path d="M 1000 210 C 988 330, 1024 434, 1006 562 C 990 690, 1016 762, 1008 862" stroke="#1b3350" strokeWidth="30" fill="none" />

      {/* 건물 · 근린공원 */}
      <path d={MAP_FABRIC[0]} fill="#242832" />
      <path d={MAP_FABRIC[1]} fill="#2a2f3a" />
      <path d={MAP_FABRIC[2]} fill="#1f232b" />
      <ellipse cx="252" cy="656" rx="52" ry="42" fill="#1e2a23" />

      {/* 이면도로 */}
      <g stroke="#2d313a" strokeWidth="8" fill="none" strokeLinecap="round">
        {MAP_STREETS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {/* 간선도로 */}
      <g fill="none" strokeLinecap="round">
        <path d="M -80 296 C 140 254, 330 322, 560 304 C 790 286, 950 352, 1290 306" stroke="#454a56" strokeWidth="15" />
        <path d="M -80 716 C 200 726, 470 700, 730 710 C 950 718, 1110 702, 1290 708" stroke="#454a56" strokeWidth="16" />
        <path d="M 726 250 C 732 380, 716 470, 726 600 C 734 700, 722 780, 726 880" stroke="#454a56" strokeWidth="14" />
        <path d="M 850 300 C 856 420, 842 540, 852 660 C 858 760, 848 830, 850 890" stroke="#3f444f" strokeWidth="12" />
        <path d="M 700 618 C 850 612, 1000 624, 1290 608" stroke="#3f444f" strokeWidth="11" />
        <path d="M 604 268 C 608 340, 600 400, 604 470" stroke="#3b404a" strokeWidth="10" />
        <path d="M 1100 300 C 1104 400, 1096 500, 1100 700" stroke="#3b404a" strokeWidth="10" />
        {/* 공항대로 — 이 길가에 본점이 있습니다 */}
        <path d="M -80 512 C 180 506, 420 482, 700 474 C 900 468, 1060 456, 1290 450" stroke="#5c6371" strokeWidth="25" />
        <path d="M -80 512 C 180 506, 420 482, 700 474 C 900 468, 1060 456, 1290 450" stroke="#949cab" strokeWidth="2" strokeDasharray="16 20" />
      </g>

      {/* 김포공항 — 활주로 · 유도로 · 청사 */}
      <g>
        <rect x="248" y="298" width="356" height="496" rx="18" fill="#1d2129" />
        <path d="M 330 330 C 300 420, 316 620, 366 756" stroke="#22262e" strokeWidth="10" fill="none" />
        <path d="M 296 336 L 438 758" stroke="#343943" strokeWidth="26" fill="none" />
        <path d="M 378 328 L 520 750" stroke="#343943" strokeWidth="26" fill="none" />
        <path d="M 296 336 L 438 758" stroke="#79808c" strokeWidth="2" strokeDasharray="18 22" fill="none" />
        <path d="M 378 328 L 520 750" stroke="#79808c" strokeWidth="2" strokeDasharray="18 22" fill="none" />
        <path d="M 342 334 L 484 756" stroke="#252932" strokeWidth="9" fill="none" />
        <path d="M 470 470 H 560" stroke="#252932" strokeWidth="9" fill="none" />
        <rect x="520" y="466" width="72" height="146" rx="8" fill="#333944" />
        <g fill="#282d36">
          <rect x="520" y="626" width="72" height="16" rx="3" />
          <rect x="520" y="650" width="72" height="16" rx="3" />
          <rect x="520" y="674" width="72" height="16" rx="3" />
        </g>
      </g>

      {/* 무료 딜리버리 구역 — 강서 · 양천 · 김포공항 */}
      <path
        d="M 296 322 C 340 258, 470 236, 592 252 C 700 266, 806 258, 896 300 C 986 342, 1032 430, 1010 520 C 992 596, 1012 664, 962 716 C 900 780, 742 820, 596 792 C 470 768, 372 720, 322 630 C 276 548, 268 430, 296 322 Z"
        fill="rgba(39,87,255,0.07)"
        stroke="rgba(39,87,255,0.4)"
        strokeWidth="2"
        strokeDasharray="10 9"
      />

      {/* 9호선 · 공항시장역 */}
      <path d="M 520 546 C 620 534, 700 512, 780 500 C 880 488, 980 482, 1090 476" stroke="#8f7c4a" strokeWidth="4" fill="none" />
      <circle cx="690" cy="515" r="6.5" fill="#15171c" stroke="#8f7c4a" strokeWidth="3" />

      {/* 지명 */}
      <g transform={`translate(600 212) scale(${k})`}>
        <text {...lbl} fill="#b6d2f6" fontSize="21" fontWeight="600">한강</text>
      </g>
      <g transform={`translate(700 696) scale(${k})`}>
        <text {...lbl} fill="#acb3bf" fontSize="17" fontWeight="600">남부순환로</text>
      </g>
      {/* 활주로 서쪽은 좌측 카피 컬럼 스크림에 덮여 글자가 읽히지 않으므로, 청사 위 열린 자리에 둡니다 */}
      <g transform={`translate(602 356) scale(${k})`}>
        <text {...lbl} textAnchor="end" fill="#acb3bf" fontSize="17" fontWeight="600">김포공항</text>
      </g>

      {/* 픽업 포인트 — 김포공항 (이 핀만 점멸합니다) */}
      <g transform={`translate(556 540) scale(${k})`}>
        <circle className="hx-ping" r="34" fill="none" stroke="#2757ff" strokeWidth="3" />
        <circle r="11" fill="#2757ff" stroke="#ffffff" strokeWidth="3" />
        <text {...lbl} x="-40" y="26" textAnchor="end" fill="#ffffff" fontSize="19" fontWeight="700">김포공항 픽업</text>
      </g>

      {/* 픽업 포인트 — 양천 */}
      <g transform={`translate(900 620) scale(${k})`}>
        <circle r="11" fill="#2757ff" stroke="#ffffff" strokeWidth="3" />
        <text {...lbl} x="-20" y="6" textAnchor="end" fill="#ffffff" fontSize="19" fontWeight="700">양천 픽업</text>
      </g>

      {/* 본점 */}
      <g transform={`translate(760 472) scale(${k})`}>
        <path d="M 0 0 C -6 -13 -18 -20 -18 -33 A 18 18 0 1 1 18 -33 C 18 -20 6 -13 0 0 Z" fill="#2757ff" stroke="#ffffff" strokeWidth="3" />
        <circle cy="-33" r="6" fill="#ffffff" />
        <text {...lbl} x="-30" y="-34" textAnchor="end" fill="#ffffff" fontSize="21" fontWeight="800">{SITE.name} 강서 본점</text>
        <text {...lbl} x="-30" y="-13" textAnchor="end" fill="#b8bec9" fontSize="16" fontWeight="600">공항대로 45</text>
      </g>
    </svg>
  )
}

/* 지도 위 카드 — 오늘 나갈 수 있는 차 */
function FleetCard({ className = '' }: { className?: string }) {
  const from = Math.min(...SITE.cars.map((c) => c.dayPrice))
  return (
    <div
      className={`hx-place flex items-stretch bg-[#20232a] border border-[#333741] rounded-xl overflow-hidden ${className}`}
      style={{ boxShadow: '0 14px 36px rgba(0,0,0,0.45)' }}
    >
      <img src={SITE.heroPhoto} alt="루트렌트카 보유 차량" className="w-[104px] shrink-0 object-cover" />
      <div className="px-4 py-3 min-w-0">
        <p className="text-[0.75rem] font-bold text-[#9ea3ab]">오늘 나갈 수 있는 차</p>
        <p className="nums text-[1.0625rem] font-extrabold text-white mt-0.5">1일 {won(from)}부터</p>
        <p className="text-[0.8125rem] text-[#a6abb3] mt-0.5">
          {SITE.carTypes.filter((t) => t !== '전체').join(' · ')} {SITE.cars.length}종
        </p>
      </div>
    </div>
  )
}

function Hero() {
  const { ref, inView } = useInView(0.05)
  const go = (e: { preventDefault(): void }, href: string) => {
    if (!MOTION) return
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section ref={ref} className="hx-hero relative bg-road text-white overflow-hidden">
      {/* 지도 — 오른쪽 화면 밖으로 흘러나간다 */}
      <div className="hx-map-stage hidden lg:block absolute inset-y-0 right-0 left-[38%] overflow-hidden">
        <RouteMap k={1} />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg,#16181d 0%,#16181d 10%,rgba(22,24,29,0.93) 16%,rgba(22,24,29,0.64) 24%,rgba(22,24,29,0.32) 33%,rgba(22,24,29,0.1) 42%,rgba(22,24,29,0) 54%)',
          }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(180deg,rgba(22,24,29,0) 80%,rgba(22,24,29,0.5) 100%)' }} />
        <FleetCard className="absolute top-28 right-8 w-[300px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-6 pt-20 md:pt-24 lg:pt-32 pb-14 md:pb-12 lg:pb-20 lg:min-h-[760px] flex flex-col justify-center">
        <div className="lg:max-w-[540px]">
          <p className={`slide-in ${inView ? 'in-view' : ''} mb-4 md:mb-5`}>
            <span className="plate text-[0.9375rem]">{SITE.plate}</span>
          </p>
          <h1
            className={`slide-in ${inView ? 'in-view' : ''} f-speed text-[2.7rem] md:text-[3.35rem] lg:text-[4.6rem] leading-[1.04] whitespace-pre-line mb-5 lg:mb-6`}
            style={{ transitionDelay: MOTION ? '80ms' : undefined }}
          >
            {SITE.slogan}
          </h1>
          <p
            className={`slide-in ${inView ? 'in-view' : ''} text-[1.0625rem] text-[#b9babc] leading-[1.7] max-w-md mb-6 lg:mb-8`}
            style={{ transitionDelay: MOTION ? '160ms' : undefined }}
          >
            {SITE.sloganSub}
          </p>

          <div
            className={`slide-in ${inView ? 'in-view' : ''} flex flex-wrap items-center gap-x-6 gap-y-3`}
            style={{ transitionDelay: MOTION ? '240ms' : undefined }}
          >
            <a
              href="#calc"
              onClick={(e) => go(e, '#calc')}
              className="hx-cta px-7 py-4 rounded-xl bg-blue text-white text-[1rem] font-extrabold hover:bg-blue-d"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              요금 계산해 보기
            </a>
            <a href={`tel:${SITE.phone}`} className="nums text-[1.25rem] font-extrabold text-white border-b-[3px] border-blue pb-0.5">
              {SITE.phone}
            </a>
          </div>

          {/* 지도 범례 */}
          <div className={`anim-fade-up d240 ${inView ? 'in-view' : ''} mt-5 lg:mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-[#a2a3a7]`}>
            <span className="flex items-center gap-2.5">
              <span className="w-7 h-0 border-t-2 border-dashed border-blue" />
              무료 딜리버리 — 강서 · 양천 · 김포공항
            </span>
            <span className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full border-[2.5px] border-[#8f7c4a]" />
              9호선 공항시장역 도보 4분
            </span>
          </div>
        </div>

        {/* 지도 — 모바일 · 태블릿 */}
        <div className="hx-map-stage lg:hidden relative -mx-5 md:-mx-6 mt-6 lg:mt-7 h-[320px] min-[600px]:h-[400px] md:h-[44vw] overflow-hidden bg-[#181b21]">
          {/* 폭에 따라 지도가 확대되므로 글자 크기를 두 단계로 맞춥니다 */}
          <div className="md:hidden">
            <RouteMap k={1.75} />
          </div>
          <div className="hidden md:block">
            <RouteMap k={1.25} vb="0 76 1200 732" />
          </div>
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(180deg,rgba(22,24,29,0.45) 0%,rgba(22,24,29,0) 16%,rgba(22,24,29,0) 86%,rgba(22,24,29,0.4) 100%)' }}
          />
          {/* 태블릿에서는 카드를 지도 오른쪽 위에 얹어 세로 길이를 줄입니다 — 지명·핀 라벨이 없는 자리 */}
          <FleetCard className="hidden md:flex absolute top-5 right-6 w-[300px]" />
        </div>
        <FleetCard className="md:hidden mt-4" />

        <dl
          className={`anim-fade-up d320 ${inView ? 'in-view' : ''} mt-6 lg:mt-8 pt-5 lg:pt-7 border-t border-[#31343b] grid grid-cols-3 gap-4 lg:max-w-[540px]`}
        >
          {SITE.promises.map((p) => (
            <div key={p.k}>
              <dt className="text-[0.875rem] md:text-[0.9375rem] font-extrabold text-white mb-0.5">{p.k}</dt>
              <dd className="text-[0.75rem] text-[#a2a3a7] leading-snug">{p.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 차량 라인업 — 필터 탭  ★ 시그니처
// ══════════════════════════════════════════════════════════════════════════════

function Cars() {
  const { ref, inView } = useInView(0.05)
  const [tab, setTab] = useState('전체')
  const [sel, setSel] = useState<(typeof SITE.cars)[number] | null>(null)
  useEffect(() => {
    if (!sel) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setSel(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [sel])
  const list = SITE.cars.filter((c) => tab === '전체' || c.type === tab)
  return (
    <section id="cars" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="오늘 나갈 수 있는 차" sub="전 차량 정비 이력 공개 · 실내 살균 후 배차합니다." inView={inView} />

        <div className={`anim-fade-up ${inView ? 'in-view' : ''} flex flex-wrap gap-2 mb-8`} role="tablist" aria-label="차종 필터">
          {SITE.carTypes.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`px-4.5 py-2.5 rounded-full text-[0.9375rem] font-bold border-2 ${
                tab === t ? 'bg-ink text-white border-ink' : 'bg-white text-ink/65 border-line hover:border-ink/50'
              }`}
              style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
            >
              {t}
            </button>
          ))}
        </div>

        <div key={tab} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((c, i) => (
            <article
              key={c.name}
              className={`car-card ${MOTION ? 'car-in' : ''} bg-white border-2 border-line rounded-2xl overflow-hidden cursor-pointer`}
              style={MOTION ? { animationDelay: `${i * 60}ms` } : undefined}
              onClick={() => setSel(c)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setSel(c) }}
            >
              <div className="aspect-[16/10] overflow-hidden bg-fog">
                <img src={c.photo} alt={c.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <h3 className="text-[1.125rem] font-extrabold">{c.name}</h3>
                  <span className="text-[0.75rem] font-bold text-blue bg-blue/8 rounded-md px-2 py-0.5">{c.type}</span>
                </div>
                <p className="text-[0.8125rem] text-ink-55 mb-4">{c.example}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-ink-55 mb-4">
                  <span>{c.seats}</span>
                  <span>{c.fuel}</span>
                  <span className="nums">{c.year}</span>
                </div>
                <div className="pt-4 border-t border-line flex items-baseline justify-between">
                  <span className="text-[0.8125rem] text-ink-55">1일</span>
                  <span className="nums f-speed text-[1.5rem] text-ink">{won(c.dayPrice)}<span className="text-[0.875rem] font-bold not-italic text-ink-55">부터</span></span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className={`anim-fade-up d160 ${inView ? 'in-view' : ''} text-[0.8125rem] text-ink-55 mt-6`}>
          * 표시 요금은 일반 자차 기준 1일 요금입니다. 성수기 · 주말에는 달라질 수 있습니다.
        </p>
      </div>
    
      {sel && (
        <div className="fixed inset-0 z-[100] bg-road/85 flex items-end md:items-center justify-center p-0 md:p-8" onClick={() => setSel(null)} role="dialog" aria-modal="true" aria-label={`${sel.name} 상세`}>
          <div className="bg-white w-full max-w-xl rounded-t-2xl md:rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[16/9] bg-fog">
              <img src={sel.photo} alt={sel.name} className="w-full h-full object-cover" />
              <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-ink text-[1.2rem] font-bold" aria-label="닫기" onClick={() => setSel(null)}>×</button>
              <span className="absolute bottom-3 left-3 plate text-[0.75rem]">{SITE.plate}</span>
            </div>
            <div className="p-6">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="f-speed text-[1.5rem]">{sel.name}</h3>
                <span className="nums f-speed text-[1.4rem] text-blue">{won(sel.dayPrice)}<span className="text-[0.8125rem] not-italic font-bold text-ink-55">/1일~</span></span>
              </div>
              <p className="text-[0.875rem] text-ink-55 mb-4">{sel.example}</p>
              <dl className="grid grid-cols-3 gap-3 mb-6">
                {[['인승', sel.seats], ['연료', sel.fuel], ['연식', sel.year]].map(([k, v]) => (
                  <div key={k} className="bg-fog rounded-xl px-3 py-2.5">
                    <dt className="text-[0.6875rem] font-bold text-ink-55">{k}</dt>
                    <dd className="nums text-[0.9375rem] font-extrabold">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex gap-3">
                <a href={`tel:${SITE.phone}`} className="flex-1 text-center py-3.5 rounded-xl bg-blue text-white font-extrabold">전화 예약</a>
                <button
                  onClick={() => { setSel(null); document.querySelector('#calc')?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' }) }}
                  className="flex-1 text-center py-3.5 rounded-xl border-2 border-line font-extrabold"
                >
                  요금 계산해 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 요금 계산기  ★ 시그니처
// ══════════════════════════════════════════════════════════════════════════════

function Calc() {
  const { ref, inView } = useInView(0.1)
  const [carIdx, setCarIdx] = useState(1)
  const [days, setDays] = useState(2)
  const [insKey, setInsKey] = useState<string>(SITE.calc.insurances[1].key)
  const [copied, setCopied] = useState(false)

  const car = SITE.cars[carIdx]
  const ins = SITE.calc.insurances.find((x) => x.key === insKey)!

  const { total, discount } = useMemo(() => {
    const disc = SITE.calc.discounts.find((d) => days >= d.minDays)
    const raw = (car.dayPrice + ins.addPerDay) * days
    const tot = raw * (1 - (disc?.rate ?? 0))
    return { total: tot, discount: disc ?? null }
  }, [car, days, ins])

  return (
    <section id="calc" className="py-20 md:py-28 bg-road text-white">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="요금, 미리 계산해 보세요" sub="이 금액이 결제 금액입니다. 인수할 때 더 붙는 요금이 없습니다." inView={inView} dark />

        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''} grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start`}>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[0.8125rem] font-bold text-white/50 mb-1.5" htmlFor="r-car">차종</label>
              <select id="r-car" className="field" value={carIdx} onChange={(e) => setCarIdx(+e.target.value)}>
                {SITE.cars.map((c, i) => (
                  <option key={c.name} value={i}>{c.name} — 1일 {won(c.dayPrice)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[0.8125rem] font-bold text-white/50 mb-1.5" htmlFor="r-days">
                대여 기간 — <span className="nums text-white">{days}일</span>
              </label>
              <input
                id="r-days"
                type="range"
                min={1}
                max={30}
                value={days}
                onChange={(e) => setDays(+e.target.value)}
                className="w-full accent-blue mt-3"
              />
              <div className="flex justify-between text-[0.6875rem] text-white/40 nums"><span>1일</span><span>30일</span></div>
            </div>
            <div className="sm:col-span-2">
              <span className="block text-[0.8125rem] font-bold text-white/50 mb-2">보험</span>
              <div className="grid grid-cols-2 gap-3">
                {SITE.calc.insurances.map((x) => (
                  <button
                    key={x.key}
                    onClick={() => setInsKey(x.key)}
                    aria-pressed={insKey === x.key}
                    className={`text-left px-4 py-3.5 rounded-xl border-2 ${
                      insKey === x.key ? 'border-blue bg-blue/15' : 'border-white/15 hover:border-white/40'
                    }`}
                    style={{ transition: MOTION ? 'all 0.15s' : 'none' }}
                  >
                    <span className="block text-[0.9375rem] font-extrabold">{x.label}</span>
                    <span className="block text-[0.75rem] text-white/50 mt-0.5">{x.note}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-road-2 rounded-2xl p-6 md:p-8">
            <dl className="space-y-2.5 text-[0.9375rem] mb-5">
              <div className="flex justify-between"><dt className="text-white/50">{car.name} × {days}일</dt><dd className="nums font-bold">{won(car.dayPrice * days)}</dd></div>
              <div className="flex justify-between"><dt className="text-white/50">{ins.label}</dt><dd className="nums font-bold">{ins.addPerDay ? `+${won(ins.addPerDay * days)}` : '포함'}</dd></div>
              {discount && (
                <div className="flex justify-between text-blue"><dt>장기 할인 — {discount.label}</dt><dd className="nums font-bold">-{won((car.dayPrice + ins.addPerDay) * days * discount.rate)}</dd></div>
              )}
            </dl>
            <div className="lane-dark mb-5" />
            <div className="flex items-baseline justify-between mb-6">
              <span className="text-[0.9375rem] text-white/60">총 대여료</span>
              <span className="nums f-speed text-[2.2rem] md:text-[2.7rem] leading-none" aria-live="polite">{won(total)}</span>
            </div>
            <a href={`tel:${SITE.phone}`} className="block text-center py-4 rounded-xl bg-blue text-white font-extrabold hover:bg-blue-d" style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}>
              이 조건으로 예약 전화
            </a>
            {(() => {
              const summary = `[렌트 견적] ${car.name} · ${days}일 · ${ins.label} → 총 ${won(total)} (문의드립니다)`
              return (
                <div className="flex items-center justify-center gap-x-6 mt-4">
                  <a href={`sms:${SITE.phone.replace(/-/g, '')}?body=${encodeURIComponent(summary)}`} className="text-[0.8125rem] font-bold text-white/70 hover:text-white underline underline-offset-4">
                    문자로 문의
                  </a>
                  <button
                    onClick={() => { navigator.clipboard?.writeText(summary); setCopied(true); setTimeout(() => setCopied(false), 1800) }}
                    className="text-[0.8125rem] font-bold text-white/70 hover:text-white underline underline-offset-4"
                  >
                    {copied ? '복사됨 ✓' : '조건 복사'}
                  </button>
                </div>
              )
            })()}
            <p className="text-[0.75rem] text-white/40 mt-4">* 유류비 별도, 보증금 없음. 성수기 요금은 상담 시 안내됩니다.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 이용 방법 · 보험
// ══════════════════════════════════════════════════════════════════════════════

function How() {
  const { ref, inView } = useInView(0.12)
  return (
    <section id="how" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="이용 방법" sub="처음이어도 10분이면 끝납니다." inView={inView} />
        <ol className="grid md:grid-cols-4 gap-x-6 gap-y-8">
          {SITE.how.map((s, i) => (
            <li key={s.title} className={`anim-fade-up ${['', 'd80', 'd160', 'd240'][i]} ${inView ? 'in-view' : ''}`}>
              <span className="nums f-speed text-[2.4rem] text-blue/25 leading-none block mb-2">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-[1.0625rem] font-extrabold mb-2">{s.title}</h3>
              <p className="text-[0.875rem] text-ink-55 leading-[1.75]">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Insurance() {
  const { ref, inView } = useInView(0.12)
  return (
    <section id="insurance" className="py-20 md:py-28 bg-fog">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="보험은 이렇게 됩니다" sub="사고 났을 때 얼마를 내는지, 계약 전에 다 보여드립니다." inView={inView} />
        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''} scroll-x -mx-5 px-5 md:mx-0 md:px-0`}>
          <table className="w-full min-w-[520px] border-collapse bg-white rounded-2xl overflow-hidden border-2 border-line">
            <thead>
              <tr className="text-left border-b-2 border-line">
                <th className="px-5 py-4 text-[0.8125rem] font-bold text-ink-55">항목</th>
                <th className="px-5 py-4 text-[0.8125rem] font-bold text-ink-55">일반 자차</th>
                <th className="px-5 py-4 text-[0.8125rem] font-bold text-blue">완전 자차</th>
              </tr>
            </thead>
            <tbody>
              {SITE.insurance.rows.map((r, i) => (
                <tr key={r.item} className={i % 2 ? 'bg-fog/60' : ''}>
                  <td className="px-5 py-3.5 text-[0.9375rem] font-bold">{r.item}</td>
                  <td className="nums px-5 py-3.5 text-[0.9375rem] text-ink-55">{r.basic}</td>
                  <td className="nums px-5 py-3.5 text-[0.9375rem] font-extrabold text-blue">{r.full}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={`anim-fade-up d160 ${inView ? 'in-view' : ''} text-[0.8125rem] text-ink-55 mt-5`}>{SITE.insurance.note}</p>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 후기 · 오시는 길
// ══════════════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════════════
// 장기렌트 · 부가 옵션
// ══════════════════════════════════════════════════════════════════════════════

function Monthly() {
  const { ref, inView } = useInView(0.1)
  return (
    <section id="monthly" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="한 달 이상은 장기렌트" sub={SITE.monthly.intro} inView={inView} />
        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''} scroll-x -mx-5 px-5 md:mx-0 md:px-0`}>
          <table className="w-full min-w-[520px] border-collapse bg-white rounded-2xl overflow-hidden border-2 border-line">
            <thead>
              <tr className="text-left border-b-2 border-line">
                <th className="px-5 py-4 text-[0.8125rem] font-bold text-ink-55">차종</th>
                <th className="nums px-5 py-4 text-[0.8125rem] font-bold text-ink-55">1개월</th>
                <th className="nums px-5 py-4 text-[0.8125rem] font-bold text-ink-55">3개월 약정</th>
                <th className="nums px-5 py-4 text-[0.8125rem] font-bold text-blue">6개월 약정</th>
              </tr>
            </thead>
            <tbody>
              {SITE.monthly.rows.map((r, i) => (
                <tr key={r.name} className={i % 2 ? 'bg-fog/60' : ''}>
                  <td className="px-5 py-4 text-[0.9375rem] font-extrabold">{r.name}</td>
                  <td className="nums px-5 py-4 text-[0.9375rem] text-ink-55">{r.m1}</td>
                  <td className="nums px-5 py-4 text-[0.9375rem] text-ink-55">{r.m3}</td>
                  <td className="nums px-5 py-4 text-[0.9375rem] font-extrabold text-blue">{r.m6}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={`anim-fade-up d160 ${inView ? 'in-view' : ''} text-[0.8125rem] text-ink-55 mt-4`}>{SITE.monthly.note}</p>

        <div className={`anim-fade-up d240 ${inView ? 'in-view' : ''} mt-14`}>
          <h3 className="f-speed text-[1.3rem] mb-5">부가 옵션</h3>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
            {SITE.extras.map((x) => (
              <li key={x.name} className="flex items-baseline justify-between gap-4 py-3.5 border-b-2 border-dashed border-line">
                <div>
                  <span className="block text-[0.9375rem] font-bold">{x.name}</span>
                  <span className="block text-[0.75rem] text-ink-55 mt-0.5">{x.note}</span>
                </div>
                <span className="nums text-[0.9375rem] font-extrabold text-blue whitespace-nowrap">{x.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 이용 규정 · FAQ
// ══════════════════════════════════════════════════════════════════════════════

function Rules() {
  const { ref, inView } = useInView(0.1)
  return (
    <section className="py-20 md:py-28 bg-road text-white">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="타기 전에 알아두세요" sub="당연한 것도 문서로 남깁니다. 분쟁이 생기지 않도록." inView={inView} dark />
        <dl className="grid md:grid-cols-2 gap-x-14">
          {SITE.rules.map((r, i) => (
            <div key={r.k} className={`anim-fade-up ${['', 'd80', 'd160', 'd80', 'd160'][i]} ${inView ? 'in-view' : ''} py-5 border-b border-white/12`}>
              <dt className="text-[0.9375rem] font-extrabold text-blue mb-1.5">{r.k}</dt>
              <dd className="text-[0.9375rem] text-white/65 leading-[1.8]">{r.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Faq() {
  const { ref, inView } = useInView(0.08)
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  return (
    <section id="faq" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="자주 묻는 질문" inView={inView} />
        <div className="max-w-3xl">
          {SITE.faq.map((f, i) => (
            <div key={f.q} className={`anim-fade-up ${['', 'd80', 'd160', 'd240', 'd320', 'd320'][i] ?? ''} ${inView ? 'in-view' : ''} border-2 border-line rounded-2xl mb-3 overflow-hidden ${openIdx === i ? 'border-blue' : ''}`}>
              <button
                className="w-full flex items-center justify-between gap-6 px-5 py-4 text-left"
                aria-expanded={openIdx === i}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="text-[1rem] font-extrabold">{f.q}</span>
                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[1.1rem] font-extrabold ${openIdx === i ? 'bg-blue text-white' : 'bg-fog text-ink'}`} aria-hidden="true">
                  {openIdx === i ? '−' : '+'}
                </span>
              </button>
              {openIdx === i && (
                <p className="px-5 pb-5 text-[0.9375rem] text-ink-55 leading-[1.85]">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const { ref, inView } = useInView(0.12)
  return (
    <section className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="타 본 분들 이야기" sub="실제 이용 후기를 바탕으로 재구성한 예시입니다." inView={inView} />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.author} className={`anim-fade-up ${['', 'd80', 'd160'][i]} ${inView ? 'in-view' : ''} border-2 border-line rounded-2xl p-6`}>
              <p className="text-[0.9375rem] leading-[1.85] text-ink/85 mb-5">{r.text}</p>
              <footer className="flex items-center justify-between">
                <cite className="not-italic text-[0.9375rem] font-extrabold">{r.author}</cite>
                <span className="plate text-[0.6875rem]">{r.tag}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

function Location() {
  const { ref, inView } = useInView(0.15)
  return (
    <section id="location" className="py-20 md:py-28 bg-fog">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="오시는 길" sub={SITE.address} inView={inView} />
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* 약도 — 실제 지도로 교체하세요 */}
          <div className={`anim-fade-up ${inView ? 'in-view' : ''} relative overflow-hidden rounded-2xl border-2 border-line bg-white aspect-[4/3]`}>
            <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="약도">
              <rect width="800" height="600" fill="#f4f5f7" />
              <g fill="#e9ebef">
                <rect x="40" y="40" width="200" height="140" rx="8" />
                <rect x="300" y="40" width="180" height="140" rx="8" />
                <rect x="540" y="40" width="220" height="140" rx="8" />
                <rect x="40" y="250" width="200" height="130" rx="8" />
                <rect x="540" y="250" width="220" height="130" rx="8" />
                <rect x="40" y="440" width="200" height="120" rx="8" />
                <rect x="300" y="440" width="180" height="120" rx="8" />
                <rect x="540" y="440" width="220" height="120" rx="8" />
              </g>
              <g stroke="#ffffff" strokeLinecap="round" fill="none">
                <path d="M0 215 H800" strokeWidth="28" />
                <path d="M0 410 H800" strokeWidth="20" />
                <path d="M270 0 V600" strokeWidth="24" />
                <path d="M510 0 V600" strokeWidth="20" />
              </g>
              <path d="M0 215 H800" stroke="#e2e4e9" strokeWidth="3" strokeDasharray="18 14" fill="none" />
              <g transform="translate(390 300)">
                <circle r="16" fill="#2757ff" stroke="#ffffff" strokeWidth="4" />
                <circle r="5" fill="#ffffff" />
              </g>
            </svg>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 rounded-xl border-2 border-line px-4 py-3">
              <p className="text-[0.9375rem] font-extrabold">{SITE.name} 강서 본점</p>
              <p className="text-[0.8125rem] text-ink-55 mt-0.5">{SITE.address}</p>
              <p className="text-[0.75rem] text-blue mt-1 font-bold">실제 지도로 교체해 주세요</p>
            </div>
          </div>
          <div className={`anim-fade-up d160 ${inView ? 'in-view' : ''} space-y-5`}>
            {[
              { k: '지하철', v: '9호선 공항시장역 2번 출구 도보 4분' },
              { k: '주차', v: '건물 앞 전용 주차장 — 반납 시 그대로 두시면 됩니다' },
              { k: '영업시간', v: '연중무휴 07:00 – 22:00 (심야 반납은 사전 협의)' },
              { k: '딜리버리', v: '강서 · 양천 · 김포공항 무료 / 그 외 지역 협의' },
            ].map((x) => (
              <div key={x.k} className="flex gap-5 pb-5 border-b border-line last:border-0">
                <span className="w-16 shrink-0 text-[0.8125rem] font-extrabold text-blue pt-0.5">{x.k}</span>
                <span className="text-[0.9375rem] text-ink/80 leading-[1.7]">{x.v}</span>
              </div>
            ))}
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
    <section ref={ref} className="bg-blue text-white">
      <div className="max-w-6xl mx-auto px-5 md:px-6 py-14 md:py-18 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className={`anim-fade-up ${inView ? 'in-view' : ''}`}>
          <h2 className="f-speed text-[1.9rem] md:text-[2.5rem] leading-[1.1] mb-2">지금 전화하면, 30분 뒤 출발</h2>
          <p className="text-white/70 text-[0.9375rem]">상담만 해도 됩니다. 재촉하지 않아요.</p>
        </div>
        <a
          href={`tel:${SITE.phone}`}
          className={`anim-fade-up d80 ${inView ? 'in-view' : ''} nums f-speed shrink-0 text-center px-8 py-5 rounded-2xl bg-white text-ink text-[1.6rem] md:text-[2rem] leading-none hover:bg-road hover:text-white`}
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
    <footer className="bg-road text-white py-12">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="plate text-[0.8125rem]">{SITE.plate}</span>
          <span className="f-speed text-[1.1rem]">{SITE.name}</span>
        </div>
        <div className="space-y-1.5 text-[0.8125rem] text-white/45">
          <p>{SITE.ceo} · 사업자등록번호 {SITE.bizNo}</p>
          <p>{SITE.license}</p>
          <p>{SITE.address} · {SITE.phone}</p>
        </div>
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-[0.75rem] text-white/30">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <p>전 차량 자동차종합보험 가입</p>
        </div>
      </div>
    </footer>
  )
}

function MobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-line pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 divide-x divide-line">
        <a href={`tel:${SITE.phone}`} className="py-3.5 text-center text-[0.9375rem] font-extrabold text-blue">전화</a>
        <a href={SITE.kakaoUrl} target="_blank" rel="noreferrer" className="py-3.5 text-center text-[0.9375rem] font-bold">카카오톡</a>
        <button
          onClick={() => document.querySelector('#calc')?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })}
          className="py-3.5 text-center text-[0.9375rem] font-bold"
        >
          요금계산
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
        <Cars />
        <Calc />
        <How />
        <Monthly />
        <Insurance />
        <Rules />
        <Faq />
        <Reviews />
        <Location />
        <Cta />
      </main>
      <Footer />
      <MobileBar />
    </div>
  )
}
