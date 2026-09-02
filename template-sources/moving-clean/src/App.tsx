import { useState, useEffect, useRef, useMemo } from 'react'
import { MOTION } from './variant'

/* 이미지 — src/images/ 안의 파일을 같은 이름으로 덮어쓰면 그대로 반영됩니다 */
import heroImg from './images/hero.jpg'
import baBefore from './images/ba-before.jpg'
import baAfter from './images/ba-after.jpg'
import caseImg1 from './images/case-1.jpg'
import caseImg2 from './images/case-2.jpg'
import caseImg3 from './images/case-3.jpg'
import caseImg4 from './images/case-4.jpg'
import caseImg5 from './images/case-5.jpg'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

const SITE = {
  // 여기에 업체 기본 정보 교체
  name: '한결이사청소',
  nameEn: 'HANGYEOL MOVING & CLEANING',
  since: 2014,

  // 여기에 연락처 교체
  phone: '010-1234-5678',
  kakaoId: '@한결이사청소',
  kakaoUrl: 'https://pf.kakao.com/_xxxxxs',

  // 여기에 사업자 정보 교체
  ceo: '대표 김한결',
  bizNo: '123-45-67890',
  address: '서울특별시 강서구 공항대로 123, 2층',
  license: '화물자동차 운송주선사업 허가 제0000호',

  // 히어로
  heroKicker: '강서 · 양천 이사청소 직영팀',
  // \n 위치에서 줄이 바뀝니다. {중괄호} 구간에 형광펜이 칠해집니다
  heroTitle: '이사부터 {청소까지},\n한 팀이 끝냅니다',
  heroSub: '견적 따로, 업체 따로 알아볼 필요 없습니다.\n방문 견적 그대로 작업하고, 견적서에 없는 요금은 받지 않습니다.',
  // 여기에 히어로 사진 교체
  heroPhoto: heroImg,
  heroPhotoNote: '오전 8시, 화곡동 현장',

  // 원장(元帳) 한 줄 — 신뢰 지표
  ledger: [
    { k: '작업 누적', v: '4,800건+' },
    { k: '시작', v: '2014년' },
    { k: '인력', v: '직영 9명' },
    { k: '적재물보험', v: '1억 가입' },
  ],

  // 여기에 네비게이션 메뉴 교체
  nav: [
    { label: '하는 일', href: '#services' },
    { label: '간편견적', href: '#quote' },
    { label: '작업 순서', href: '#process' },
    { label: '현장 기록', href: '#cases' },
    { label: '지역', href: '#areas' },
    { label: '요금', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],

  // 하는 일 — 견적서식 리스트
  services: {
    moving: [
      { name: '원룸 · 소형이사', desc: '1톤 차량과 2인 작업. 짐이 적은 원룸·오피스텔에 맞는 구성.', base: '25만~' },
      { name: '포장이사', desc: '포장부터 배치·정리까지 전 과정. 손 하나 대실 일 없습니다.', base: '90만~' },
      { name: '사무실 이사', desc: '업무 공백 없는 야간·주말 작업. OA 장비 전용 포장.', base: '견적' },
    ],
    cleaning: [
      { name: '입주 · 이사청소', desc: '빈집 상태에서 구석까지. 새집으로 만든 뒤 열쇠를 드립니다.', base: '평당 1.3만~' },
      { name: '거주 청소', desc: '주방 기름때, 욕실 물때, 베란다까지 밀린 대청소 한 번에.', base: '평당 1.6만~' },
      { name: '사무실 · 상가 청소', desc: '오픈 전 준공청소부터 정기 관리 계약까지.', base: '견적' },
    ],
  },

  // 작업 순서 — 체크리스트
  process: [
    { title: '전화 · 카톡 상담', desc: '일정과 짐 규모를 확인합니다.', note: '사진만 보내셔도 됩니다' },
    { title: '방문 견적', desc: '직접 보고 확정 금액을 드립니다.', note: '견적서에 없는 요금 없음' },
    { title: '예약 확정', desc: '날짜와 범위를 문자로 정리해 드립니다.', note: '취소 위약금 없음' },
    { title: '작업 진행', desc: '약속 시간에 도착해 당일 완료합니다.', note: '진행 사진 실시간 공유' },
    { title: '확인 · A/S', desc: '함께 최종 확인 후 마무리합니다.', note: '7일 내 재방문 보장' },
  ],

  // 여기에 비포/애프터 사진 교체 (청소 사례)
  beforeAfter: {
    before: baBefore,
    after: baAfter,
    caption: '30평대 아파트 입주청소, 작업 6시간',
  },

  // 여기에 현장 기록 사진 교체
  cases: [
    { photo: caseImg1, label: '포장이사', note: '25평 아파트 → 아파트, 4인 5시간' },
    { photo: caseImg2, label: '소형이사', note: '원룸 → 오피스텔, 오전 반나절' },
    { photo: caseImg3, label: '사무실 이사', note: '20인 사무실, 금요일 야간' },
    { photo: caseImg4, label: '입주청소', note: '신축 34평, 준공 먼지 제거' },
    { photo: caseImg5, label: '거주청소', note: '주방 · 욕실 집중 코스' },
  ],

  // 지역
  areas: {
    primaryTitle: '당일 방문 견적',
    primary: ['강서구', '양천구', '영등포구', '마포구', '구로구', '금천구'],
    secondaryTitle: '예약 방문 견적',
    secondary: ['서울 전 지역', '고양 · 김포', '부천 · 인천', '광명 · 시흥'],
    note: '그 외 지역도 일정에 따라 갑니다. 편하게 물어보세요.',
  },

  // 후기
  reviews: [
    { text: '방문 견적 때 말한 금액 그대로였어요. 이사 끝나고 버릴 짐까지 다 가져가 주셔서 몸이 편했습니다.', author: '이OO', tag: '포장이사 27평' },
    { text: '입주청소 후기 보고 맡겼는데 줄눈까지 새것처럼 해주셨어요. 작업 중간에 사진 보내주시는 게 좋았습니다.', author: '박OO', tag: '입주청소 34평' },
    { text: '금요일 밤에 사무실 옮기고 월요일에 바로 업무 시작했습니다. 배선 정리까지 깔끔했어요.', author: '김OO', tag: '사무실 이사 18석' },
  ],

  // 요금 기준
  pricing: [
    { service: '원룸 · 소형이사', base: '25만원부터', includes: '1톤 차량 · 2인 · 기본 포장재' },
    { service: '포장이사 (20평대)', base: '90만원부터', includes: '5톤 차량 · 4인 · 전체 포장 · 정리' },
    { service: '사무실 이사', base: '방문 견적', includes: '규모 · 장비에 따라 산정' },
    { service: '입주 · 이사청소', base: '평당 1.3만원부터', includes: '전 구역 · 줄눈 · 유리창 내부' },
    { service: '거주 청소', base: '평당 1.6만원부터', includes: '주방 · 욕실 · 방 · 베란다' },
    { service: '사무실 · 상가 청소', base: '방문 견적', includes: '면적 · 주기에 따라 산정' },
  ],
  pricingNote: '기준 요금입니다. 층수 · 짐 양 · 거리에 따라 방문 견적으로 확정하며, 확정 후 추가 요금은 없습니다.',

  // 이사 준비 체크리스트 — 고객이 할 일 / 저희가 할 일
  checklist: [
    {
      when: 'D-30', title: '한 달 전',
      you: ['이사 날짜 확정, 견적 예약', '관리비 · 공과금 정산일 확인'],
      we: ['방문 견적 · 확정 금액 안내', '사다리차 · 엘리베이터 예약 대행'],
    },
    {
      when: 'D-7', title: '일주일 전',
      you: ['버릴 짐 분리 (스티커 부착)', '냉장고 정리 시작'],
      we: ['포장재 사전 배송 (원하시면)', '작업 인원 · 차량 확정 문자'],
    },
    {
      when: 'D-1', title: '하루 전',
      you: ['귀중품 · 서류만 따로 가방에', '세탁기 물빼기 (저희가 해도 됩니다)'],
      we: ['출발 시간 · 담당자 연락처 안내', '날씨 확인 후 우천 대비 자재 적재'],
    },
    {
      when: 'D-DAY', title: '이사 당일',
      you: ['귀중품 가방만 챙기시면 끝', '새집에서 배치만 알려주세요'],
      we: ['포장 → 운반 → 배치 → 정리', '폐기물 수거 · 진행 사진 공유'],
    },
  ],

  // 파손 보상 절차
  claim: {
    intro: '4,800건 중 보상 접수는 31건이었습니다. 숨기지 않고, 아래 순서대로 처리합니다.',
    steps: [
      { title: '현장에서 바로 접수', desc: '발견 즉시 담당 반장에게 말씀하세요. 사진을 함께 찍고 접수증을 드립니다.' },
      { title: '48시간 내 연락', desc: '수리 또는 배상 방안을 이틀 안에 안내드립니다.' },
      { title: '수리 · 배상', desc: '수리 가능하면 전문 업체 수리, 불가하면 감가 기준으로 배상합니다.' },
      { title: '보험 처리', desc: '고액 물품은 적재물배상보험(1억)으로 처리합니다. 서류는 저희가 준비합니다.' },
    ],
  },

  // 부가 서비스
  extras: [
    { name: '에어컨 이전 설치', price: '8만원부터', note: '탈거 + 설치 + 가스 보충 포함' },
    { name: '폐기물 수거', price: '5만원부터', note: '가구 · 가전 · 생활 폐기물' },
    { name: '정수기 · 세탁기 설치', price: '2만원부터', note: '이사 당일 함께 처리' },
    { name: '포장재 사전 배송', price: '무료', note: '박스 · 테이프 · 에어캡' },
    { name: '입주청소 연계', price: '평당 1.3만원부터', note: '이사와 함께 예약 시 10% 할인' },
  ],

  // 자주 묻는 질문
  faq: [
    { q: '견적은 어떻게 받나요?', a: '전화나 카톡으로 사진만 보내주셔도 대략 범위를 드리고, 방문 견적에서 확정 금액을 드립니다. 방문 견적은 무료이고 계약을 강요하지 않습니다.' },
    { q: '확정 견적 후에 정말 추가 요금이 없나요?', a: '견적서에 적힌 금액이 전부입니다. 다만 견적 때 말씀하지 않은 짐이 크게 늘었거나, 안내받지 못한 특수 조건(피아노, 금고 등)이 있으면 현장에서 먼저 상의드립니다.' },
    { q: '이사 날짜를 바꿔야 하면요?', a: '3일 전까지는 무료로 변경됩니다. 성수기(2~3월, 손 없는 날)는 자리가 빨리 차니 되도록 일찍 연락 주세요.' },
    { q: '포장은 어디까지 해주시나요?', a: '포장이사는 옷장 속 옷, 주방 그릇, 책까지 전부 저희가 쌉니다. 고객님은 귀중품 가방 하나만 챙기시면 됩니다.' },
    { q: '입주청소를 같이 맡기면 어떻게 진행되나요?', a: '이사 전날 새집을 청소해 두고, 다음 날 짐을 들입니다. 두 팀이 같은 회사라 일정이 어긋날 일이 없고, 함께 예약하시면 청소 요금을 10% 할인합니다.' },
    { q: '보험은 어떻게 되어 있나요?', a: '적재물배상책임보험 1억 원에 가입되어 있습니다. 파손 시 보상 절차는 위 4단계 그대로 진행됩니다.' },
  ],

  // 간편 견적 계산 기준 (만원 단위)
  quote: {
    types: [
      { key: 'oneroom', label: '원룸 · 소형이사', kind: 'move', base: [25, 35] },
      { key: 'pack', label: '포장이사', kind: 'move', base: [70, 100] },
      { key: 'movein', label: '입주 · 이사청소', kind: 'clean', perPy: [1.3, 1.6] },
      { key: 'resident', label: '거주 청소', kind: 'clean', perPy: [1.6, 2.0] },
    ],
    sizes: [
      { label: '10평 이하 (원룸)', py: 10, moveFactor: 1.0 },
      { label: '10 – 18평', py: 15, moveFactor: 1.15 },
      { label: '18 – 25평', py: 22, moveFactor: 1.4 },
      { label: '25 – 34평', py: 30, moveFactor: 1.75 },
      { label: '34평 이상', py: 38, moveFactor: 2.1 },
    ],
    distances: [
      { label: '같은 구 안에서', add: 0 },
      { label: '서울 · 인접 도시', add: 5 },
      { label: '30km 이상 장거리', add: 12 },
    ],
    noElevatorAdd: 0.15,
  },
} as const

// ══════════════════════════════════════════════════════════════════════════════
// 훅
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

const fmt = (n: number) => n.toLocaleString('ko-KR')

/* 섹션 머리 — 괘선 위에 앉은 제목. 카드 대신 문서의 '항'처럼 */
function Head({ no, title, sub, inView }: { no: string; title: string; sub?: string; inView: boolean }) {
  return (
    <div className={`anim-fade-up ${inView ? 'in-view' : ''} mb-10 md:mb-14`}>
      <div className="flex items-end justify-between gap-4 pb-3">
        <h2 className="f-display text-[2rem] md:text-[2.9rem] leading-none">{title}</h2>
        <span className="nums text-[0.8125rem] font-bold text-ink-60 pb-1 shrink-0">{no}</span>
      </div>
      <div className="h-[2.5px] bg-rule rule-draw" />
      {sub && <p className="mt-4 text-[0.9375rem] text-ink-60 leading-[1.75]">{sub}</p>}
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-sm border-b-2 border-rule">
      <div className="max-w-6xl mx-auto px-5 md:px-6 h-16 flex items-center justify-between gap-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="f-display text-[1.15rem] leading-none pt-0.5">
          {SITE.name}
        </button>

        <nav className="hidden md:flex items-center">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => go(n.href)}
              className={`px-3 py-2 text-[0.9375rem] font-semibold ${
                active === n.href.slice(1) ? 'text-orange' : 'text-ink/70 hover:text-ink'
              }`}
            >
              {n.label}
            </button>
          ))}
          <a href={`tel:${SITE.phone}`} className="nums ml-4 text-[1.05rem] font-extrabold underline decoration-orange decoration-[3px] underline-offset-4">
            {SITE.phone}
          </a>
        </nav>

        <button className="md:hidden p-2 -mr-2" aria-label="메뉴" onClick={() => setOpen(!open)}>
          <div className="w-6 space-y-1.5">
            <span className="block h-[2.5px] bg-ink" />
            <span className={`block h-[2.5px] bg-ink ${open ? 'opacity-0' : ''}`} />
            <span className="block h-[2.5px] bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/20 bg-paper px-5 py-2">
          {SITE.nav.map((n) => (
            <button key={n.href} onClick={() => go(n.href)} className="block w-full text-left py-3 text-[1rem] font-semibold border-b border-dashed border-ink/20 last:border-0">
              {n.label}
            </button>
          ))}
          <a href={`tel:${SITE.phone}`} className="nums block py-3.5 text-[1.1rem] font-extrabold text-orange">
            {SITE.phone}
          </a>
        </div>
      )}
    </header>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 히어로 — 타이포 중심 + 원장 한 줄 + 테이프로 붙인 현장 사진
// ══════════════════════════════════════════════════════════════════════════════

function Hero() {
  const { ref, inView } = useInView(0.05)
  // {마커} 구간 파싱
  const lines = SITE.heroTitle.split('\n').map((line) => {
    const m = line.match(/^(.*)\{(.+)\}(.*)$/)
    return m ? { pre: m[1], mark: m[2], post: m[3] } : { pre: line, mark: '', post: '' }
  })
  return (
    <section ref={ref} className="pt-28 md:pt-36 pb-0">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <p className={`anim-fade-up ${inView ? 'in-view' : ''} text-[0.9375rem] font-bold text-ink-60 mb-5`}>
          {SITE.heroKicker} · {SITE.since}년부터
        </p>
        <h1 className={`anim-fade-up d80 ${inView ? 'in-view' : ''} f-display text-[3rem] md:text-[5.2rem] leading-[1.08] mb-7`}>
          {lines.map((l, i) => (
            <span key={i} className="block">
              {l.pre}
              {l.mark && <span className="mark">{l.mark}</span>}
              {l.post}
            </span>
          ))}
        </h1>
        <p className={`anim-fade-up d160 ${inView ? 'in-view' : ''} whitespace-pre-line text-[1rem] md:text-[1.0625rem] text-ink-60 leading-[1.85] mb-9`}>
          {SITE.heroSub}
        </p>
        <div className={`anim-fade-up d240 ${inView ? 'in-view' : ''} flex flex-wrap items-center gap-x-6 gap-y-4 mb-14`}>
          <button
            onClick={() => document.querySelector('#quote')?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })}
            className="px-7 py-4 bg-ink text-paper text-[1.0625rem] font-bold hover:bg-orange hover:text-ink"
            style={{ transition: MOTION ? 'background-color 0.2s, color 0.2s' : 'none' }}
          >
            30초 간편 견적 →
          </button>
          <a href={`tel:${SITE.phone}`} className="nums text-[1.35rem] font-extrabold underline decoration-orange decoration-[4px] underline-offset-[7px]">
            {SITE.phone}
          </a>
        </div>

        {/* 원장 한 줄 */}
        <div className={`anim-fade-up d320 ${inView ? 'in-view' : ''} border-y-2 border-rule`}>
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {SITE.ledger.map((l, i) => (
              <div key={l.k} className={`py-4 px-1 md:px-5 flex items-baseline gap-2.5 ${i > 0 ? 'md:border-l border-dashed border-ink/25' : ''}`}>
                <dt className="text-[0.8125rem] text-ink-60 font-semibold shrink-0">{l.k}</dt>
                <dd className="nums text-[1.05rem] md:text-[1.15rem] font-extrabold">{l.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* 현장 사진 — 테이프로 붙인 인화지처럼 */}
      <div className="max-w-6xl mx-auto px-5 md:px-6 mt-12 md:mt-16">
        <figure className={`anim-fade-up d400 ${inView ? 'in-view' : ''} relative`}>
          <div className="relative bg-white p-2.5 pb-3 shadow-[0_2px_0_rgba(26,26,24,0.18)]" style={{ transform: 'rotate(-0.4deg)' }}>
            <span className="tape" style={{ top: -12, left: 36, transform: 'rotate(-8deg)' }} aria-hidden="true" />
            <span className="tape" style={{ top: -12, right: 52, transform: 'rotate(6deg)' }} aria-hidden="true" />
            <img src={SITE.heroPhoto} alt="이사 작업 현장" className="w-full h-[300px] md:h-[460px] object-cover" />
          </div>
          <figcaption className="f-pen text-[1.35rem] text-ink-60 mt-3 ml-2" style={{ transform: 'rotate(-0.5deg)' }}>
            {SITE.heroPhotoNote}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 하는 일 — 카드 없이, 견적서식 괘선 리스트
// ══════════════════════════════════════════════════════════════════════════════

function ServiceList({ title, items, inView, delay }: { title: string; items: readonly { name: string; desc: string; base: string }[]; inView: boolean; delay: string }) {
  return (
    <div className={`anim-fade-up ${delay} ${inView ? 'in-view' : ''}`}>
      <p className="f-display text-[1.15rem] text-orange mb-1">{title}</p>
      <ul>
        {items.map((s) => (
          <li key={s.name} className="border-b border-ink/25 py-5 flex items-baseline justify-between gap-6 hover:bg-paper-d/60 px-1 -mx-1">
            <div>
              <h3 className="text-[1.125rem] font-extrabold mb-1">{s.name}</h3>
              <p className="text-[0.9rem] text-ink-60 leading-[1.7]">{s.desc}</p>
            </div>
            <span className="nums shrink-0 text-[1.05rem] font-extrabold whitespace-nowrap">{s.base}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Services() {
  const { ref, inView } = useInView(0.08)
  return (
    <section id="services" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head no="항목 01" title="하는 일" sub="이사와 청소를 같이 맡기면 일정이 한 번에 잡히고, 비용도 줄어듭니다." inView={inView} />
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-10">
          <ServiceList title="이사" items={SITE.services.moving} inView={inView} delay="d80" />
          <ServiceList title="청소" items={SITE.services.cleaning} inView={inView} delay="d160" />
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 간편 견적 — 전표(슬립) 한 장
// ══════════════════════════════════════════════════════════════════════════════

function QuoteCalc() {
  const { ref, inView } = useInView(0.1)
  const [type, setType] = useState<string>(SITE.quote.types[1].key)
  const [sizeIdx, setSizeIdx] = useState(2)
  const [distIdx, setDistIdx] = useState(0)
  const [noElev, setNoElev] = useState(false)
  const [copied, setCopied] = useState(false)

  const t = SITE.quote.types.find((x) => x.key === type)!
  const size = SITE.quote.sizes[sizeIdx]

  const [lo, hi] = useMemo(() => {
    let min: number
    let max: number
    if (t.kind === 'move') {
      min = t.base![0] * size.moveFactor + SITE.quote.distances[distIdx].add
      max = t.base![1] * size.moveFactor + SITE.quote.distances[distIdx].add
    } else {
      min = t.perPy![0] * size.py
      max = t.perPy![1] * size.py
    }
    if (noElev) {
      min *= 1 + SITE.quote.noElevatorAdd
      max *= 1 + SITE.quote.noElevatorAdd
    }
    return [Math.round(min), Math.round(max)]
  }, [t, size, distIdx, noElev])

  return (
    <section id="quote" className="py-20 md:py-28 bg-paper-d/50">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head no="항목 02" title="간편 견적 전표" sub="대략의 범위를 먼저 적어 보세요. 정확한 금액은 방문 견적에서 확정됩니다." inView={inView} />

        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''} max-w-2xl mx-auto`}>
          {/* 전표 */}
          <div className="bg-white border-2 border-rule px-6 py-7 md:px-10 md:py-9 relative">
            <span className="tape" style={{ top: -13, left: '50%', marginLeft: -44, transform: 'rotate(-2deg)' }} aria-hidden="true" />

            <div className="flex items-baseline justify-between border-b-2 border-rule pb-3 mb-6">
              <p className="f-display text-[1.3rem]">견 적 전 표</p>
              <p className="nums text-[0.8125rem] text-ink-60 font-semibold">No. {String(SITE.since).slice(2)}-견적</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mb-5">
              <div>
                <label className="block text-[0.8125rem] font-bold text-ink-60 mb-1" htmlFor="q-type">서비스</label>
                <select id="q-type" className="field" value={type} onChange={(e) => setType(e.target.value)}>
                  {SITE.quote.types.map((x) => (
                    <option key={x.key} value={x.key}>{x.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[0.8125rem] font-bold text-ink-60 mb-1" htmlFor="q-size">평수</label>
                <select id="q-size" className="field" value={sizeIdx} onChange={(e) => setSizeIdx(+e.target.value)}>
                  {SITE.quote.sizes.map((x, i) => (
                    <option key={x.label} value={i}>{x.label}</option>
                  ))}
                </select>
              </div>
              {t.kind === 'move' && (
                <div>
                  <label className="block text-[0.8125rem] font-bold text-ink-60 mb-1" htmlFor="q-dist">이동 거리</label>
                  <select id="q-dist" className="field" value={distIdx} onChange={(e) => setDistIdx(+e.target.value)}>
                    {SITE.quote.distances.map((x, i) => (
                      <option key={x.label} value={i}>{x.label}</option>
                    ))}
                  </select>
                </div>
              )}
              <label className="flex items-end gap-2.5 pb-2 cursor-pointer select-none">
                <input type="checkbox" checked={noElev} onChange={(e) => setNoElev(e.target.checked)} className="w-[18px] h-[18px] accent-orange" />
                <span className="text-[0.9375rem] font-semibold text-ink/80">엘리베이터 없음 (계단)</span>
              </label>
            </div>

            <hr className="cutline my-6" />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[0.8125rem] font-bold text-ink-60 mb-1">예상 범위</p>
                <p className="nums f-display text-[2.2rem] md:text-[2.7rem] leading-none" aria-live="polite">
                  {fmt(lo)}만 <span className="text-ink/35">~</span> {fmt(hi)}만원
                </p>
              </div>
              <span key={`${lo}-${hi}`} className={`stamp text-[0.9375rem] ${MOTION ? 'stamp-in' : ''}`}>방문견적 시 확정</span>
            </div>

            <p className="f-pen text-[1.25rem] text-ink-60 mt-5" style={{ transform: 'rotate(-0.4deg)' }}>
              * 참고용입니다. 짐 양과 현장 조건 보고 정확히 적어드려요.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a href={`tel:${SITE.phone}`} className="flex-1 text-center px-5 py-4 bg-ink text-paper font-bold hover:bg-orange hover:text-ink" style={{ transition: MOTION ? 'background-color 0.2s, color 0.2s' : 'none' }}>
              이 조건으로 전화 상담
            </a>
            <a href={SITE.kakaoUrl} target="_blank" rel="noreferrer" className="flex-1 text-center px-5 py-4 border-2 border-rule font-bold hover:bg-paper-d">
              카카오톡 문의
            </a>
          </div>

          {(() => {
            const summary = `[간편견적] ${t.label} · ${size.label}${t.kind === 'move' ? ' · ' + SITE.quote.distances[distIdx].label : ''}${noElev ? ' · 계단 작업' : ''} → 예상 ${fmt(lo)}만~${fmt(hi)}만원 (방문견적으로 확정)`
            return (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
                <a
                  href={`sms:${SITE.phone.replace(/-/g, '')}?body=${encodeURIComponent(summary + ' — 상담 부탁드립니다.')}`}
                  className="text-[0.875rem] font-bold underline decoration-orange decoration-2 underline-offset-4"
                >
                  이 조건 문자로 보내기
                </a>
                <button
                  onClick={() => { navigator.clipboard?.writeText(summary); setCopied(true); setTimeout(() => setCopied(false), 1800) }}
                  className="text-[0.875rem] font-bold underline decoration-ink/30 decoration-2 underline-offset-4"
                >
                  {copied ? '복사했습니다 ✓' : '조건 복사하기'}
                </button>
              </div>
            )
          })()}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 작업 순서 — 체크리스트
// ══════════════════════════════════════════════════════════════════════════════

function Process() {
  const { ref, inView } = useInView(0.12)
  return (
    <section id="process" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head no="항목 03" title="작업 순서" sub="상담부터 A/S까지 다섯 칸. 하나씩 지워 나가면 끝납니다." inView={inView} />
        <ol className="max-w-3xl">
          {SITE.process.map((s, i) => (
            <li key={s.title} className={`anim-fade-up ${['', 'd80', 'd160', 'd240', 'd320'][i]} ${inView ? 'in-view' : ''} flex gap-5 py-5 ${i < SITE.process.length - 1 ? 'border-b border-dashed border-ink/25' : ''}`}>
              {/* 체크박스 */}
              <span className="shrink-0 mt-0.5 w-7 h-7 border-2 border-rule flex items-center justify-center" aria-hidden="true">
                <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
                  <path d="M1.5 6.5L6 11L14.5 1.5" stroke="#FF5B04" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="flex-1 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <h3 className="text-[1.125rem] font-extrabold">{s.title}</h3>
                <p className="text-[0.9375rem] text-ink-60">{s.desc}</p>
                <span className="f-pen text-[1.25rem] text-orange ml-auto" style={{ transform: 'rotate(-1deg)' }}>{s.note}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 비포 / 애프터
// ══════════════════════════════════════════════════════════════════════════════

function BeforeAfter() {
  const { ref, inView } = useInView(0.15)
  const [pos, setPos] = useState(50)
  const boxRef = useRef<HTMLDivElement>(null)
  const [boxW, setBoxW] = useState(0)
  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setBoxW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  /* 첫 진입 시 슬라이더가 한 번 살짝 왕복 — 드래그되는 요소임을 알립니다 */
  const didSwing = useRef(false)
  useEffect(() => {
    if (!MOTION || didSwing.current || !inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    didSwing.current = true
    const t0 = performance.now()
    const dur = 1300
    const tick = (ts: number) => {
      const p = Math.min((ts - t0) / dur, 1)
      setPos(50 + Math.sin(p * Math.PI * 2) * 13 * (1 - p))
      if (p < 1) requestAnimationFrame(tick)
      else setPos(50)
    }
    requestAnimationFrame(tick)
  }, [inView])
  return (
    <section className="py-20 md:py-28 bg-paper-d/50">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head no="항목 04" title="작업 전 · 후" sub="손잡이를 좌우로 밀어 보세요." inView={inView} />
        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''}`}>
          <div className="bg-white p-2.5 border-2 border-rule">
            <div ref={boxRef} className="relative overflow-hidden select-none aspect-[16/9] md:aspect-[2/1]">
              <img src={SITE.beforeAfter.before} alt="청소 작업 전" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
                <img
                  src={SITE.beforeAfter.after}
                  alt="청소 작업 후"
                  className="absolute inset-0 h-full object-cover max-w-none"
                  style={{ width: boxW || '100%' }}
                  draggable={false}
                />
              </div>
              <div className="absolute top-0 bottom-0 w-[3px] bg-orange" style={{ left: `${pos}%` }} aria-hidden="true">
                <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-orange flex items-center justify-center">
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                    <path d="M5 1L1 7l4 6M13 1l4 6-4 6" stroke="#1A1A18" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <span className="absolute top-3 left-3 text-[0.8125rem] font-extrabold bg-orange text-ink px-2.5 py-1">후</span>
              <span className="absolute top-3 right-3 text-[0.8125rem] font-extrabold bg-ink text-paper px-2.5 py-1">전</span>
              <input
                type="range"
                min={0}
                max={100}
                value={pos}
                onChange={(e) => setPos(+e.target.value)}
                className="ba-range absolute inset-0 w-full h-full opacity-0"
                aria-label="작업 전후 비교 슬라이더"
              />
            </div>
          </div>
          <p className="f-pen text-[1.35rem] text-ink-60 mt-3 ml-1" style={{ transform: 'rotate(-0.4deg)' }}>{SITE.beforeAfter.caption}</p>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 현장 기록 — 테이프로 붙인 인화지 보드
// ══════════════════════════════════════════════════════════════════════════════

function Cases() {
  const { ref, inView } = useInView(0.06)
  const tilts = [-1.1, 0.9, -0.7, 1.2, -0.9]
  return (
    <section id="cases" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head no="항목 05" title="현장 기록" sub="모든 작업은 고객 동의 후 사진으로 남깁니다." inView={inView} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {SITE.cases.map((c, i) => (
            <figure
              key={c.note}
              className={`anim-fade-up ${['', 'd80', 'd160', 'd80', 'd160'][i]} ${inView ? 'in-view' : ''} ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="photo-tilt relative bg-white p-2 pb-2.5 shadow-[0_2px_0_rgba(26,26,24,0.16)]" style={{ transform: `rotate(${tilts[i]}deg)` }}>
                <span className="tape" style={{ top: -11, left: '50%', marginLeft: -38, transform: `rotate(${-tilts[i] * 2}deg)`, width: 76, height: 22 }} aria-hidden="true" />
                <img src={c.photo} alt={`${c.label} 현장`} className="w-full aspect-[4/3] object-cover" loading="lazy" />
              </div>
              <figcaption className="mt-3 ml-1 flex items-baseline gap-3">
                <span className="text-[0.9375rem] font-extrabold">{c.label}</span>
                <span className="f-pen text-[1.25rem] text-ink-60">{c.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 지역 — 타이포 보드
// ══════════════════════════════════════════════════════════════════════════════

function Areas() {
  const { ref, inView } = useInView(0.12)
  return (
    <section id="areas" className="py-20 md:py-28 bg-paper-d/50">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head no="항목 06" title="가는 지역" sub={SITE.areas.note} inView={inView} />
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-x-14 gap-y-10">
          <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''}`}>
            <p className="text-[0.875rem] font-bold text-orange mb-3">{SITE.areas.primaryTitle}</p>
            <p className="f-display text-[1.9rem] md:text-[2.5rem] leading-[1.35]">
              {SITE.areas.primary.map((a, i) => (
                <span key={a}>
                  {a}
                  {i < SITE.areas.primary.length - 1 && <span className="text-orange"> · </span>}
                </span>
              ))}
            </p>
          </div>
          <div className={`anim-fade-up d160 ${inView ? 'in-view' : ''} md:border-l md:border-dashed md:border-ink/25 md:pl-10`}>
            <p className="text-[0.875rem] font-bold text-ink-60 mb-3">{SITE.areas.secondaryTitle}</p>
            <ul className="space-y-2">
              {SITE.areas.secondary.map((a) => (
                <li key={a} className="text-[1.1rem] font-bold text-ink/75">{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 후기 — 낫표 인용
// ══════════════════════════════════════════════════════════════════════════════

function Reviews() {
  const { ref, inView } = useInView(0.1)
  return (
    <section className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head no="항목 07" title="들은 말" sub="실제 이용 후기를 바탕으로 재구성한 예시입니다." inView={inView} />
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-10">
          {SITE.reviews.map((r, i) => (
            <blockquote key={r.author} className={`anim-fade-up ${['', 'd80', 'd160'][i]} ${inView ? 'in-view' : ''}`}>
              <span className="f-display text-[2.2rem] text-orange leading-none block mb-2" aria-hidden="true">「</span>
              <p className="text-[0.9375rem] leading-[1.9] text-ink/85">{r.text}</p>
              <footer className="mt-4 flex items-baseline gap-3">
                <cite className="not-italic text-[0.9375rem] font-extrabold">{r.author}</cite>
                <span className="f-pen text-[1.2rem] text-ink-60">{r.tag}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 요금 — 괘선 표
// ══════════════════════════════════════════════════════════════════════════════

function Pricing() {
  const { ref, inView } = useInView(0.1)
  return (
    <section id="pricing" className="py-20 md:py-28 bg-paper-d/50">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head no="항목 08" title="요금 기준" sub="먼저 공개합니다. 견적 후 금액이 바뀌지 않는 것이 원칙입니다." inView={inView} />
        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''} scroll-x -mx-5 px-5 md:mx-0 md:px-0`}>
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className="border-b-[2.5px] border-rule text-left">
                <th className="py-3 pr-4 text-[0.8125rem] font-bold text-ink-60">서비스</th>
                <th className="py-3 pr-4 text-[0.8125rem] font-bold text-ink-60">기준 요금</th>
                <th className="py-3 text-[0.8125rem] font-bold text-ink-60">포함</th>
              </tr>
            </thead>
            <tbody>
              {SITE.pricing.map((p) => (
                <tr key={p.service} className="border-b border-ink/25">
                  <td className="py-4 pr-4 text-[1rem] font-extrabold">{p.service}</td>
                  <td className="nums py-4 pr-4 text-[1rem] font-extrabold text-orange whitespace-nowrap">{p.base}</td>
                  <td className="py-4 text-[0.9rem] text-ink-60">{p.includes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={`anim-fade-up d160 ${inView ? 'in-view' : ''} text-[0.8125rem] text-ink-60 mt-5 leading-[1.75]`}>{SITE.pricingNote}</p>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 이사 준비 체크리스트 — 두 칸 대조표
// ══════════════════════════════════════════════════════════════════════════════

function Checklist() {
  const { ref, inView } = useInView(0.06)
  return (
    <section className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head no="항목 09" title="이사 준비표" sub="고객님 칸은 짧고, 저희 칸은 깁니다. 그게 정상입니다." inView={inView} />
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10">
          {SITE.checklist.map((c, i) => (
            <div key={c.when} className={`anim-fade-up ${['', 'd80', 'd160', 'd240'][i]} ${inView ? 'in-view' : ''}`}>
              <div className="flex items-baseline gap-3 border-b-[2.5px] border-rule pb-2 mb-4">
                <span className="f-display text-[1.3rem] text-orange">{c.when}</span>
                <span className="text-[0.9375rem] font-bold text-ink-60">{c.title}</span>
              </div>
              <p className="text-[0.75rem] font-extrabold text-ink-60 mb-2">고객님이 하실 일</p>
              <ul className="space-y-1.5 mb-5">
                {c.you.map((t) => (
                  <li key={t} className="text-[0.875rem] leading-[1.6] pl-4 relative">
                    <span className="absolute left-0 top-[0.45em] w-2 h-2 border-[1.5px] border-ink" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="text-[0.75rem] font-extrabold text-orange mb-2">저희가 하는 일</p>
              <ul className="space-y-1.5">
                {c.we.map((t) => (
                  <li key={t} className="text-[0.875rem] leading-[1.6] pl-4 relative text-ink/80">
                    <span className="absolute left-0 top-[0.35em] text-orange font-extrabold" aria-hidden="true">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 파손 보상 절차 · 부가 서비스
// ══════════════════════════════════════════════════════════════════════════════

function Claim() {
  const { ref, inView } = useInView(0.1)
  return (
    <section className="py-20 md:py-28 bg-paper-d/50">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head no="항목 10" title="깨지면, 이렇게 물어드립니다" sub={SITE.claim.intro} inView={inView} />
        <ol className="grid md:grid-cols-4 gap-x-6 gap-y-8 mb-16">
          {SITE.claim.steps.map((c, i) => (
            <li key={c.title} className={`anim-fade-up ${['', 'd80', 'd160', 'd240'][i]} ${inView ? 'in-view' : ''}`}>
              <span className="nums f-display text-[1.6rem] text-orange block mb-2">{i + 1}.</span>
              <h3 className="text-[1rem] font-extrabold mb-1.5">{c.title}</h3>
              <p className="text-[0.875rem] text-ink-60 leading-[1.7]">{c.desc}</p>
            </li>
          ))}
        </ol>

        <div className={`anim-fade-up d160 ${inView ? 'in-view' : ''}`}>
          <p className="f-display text-[1.15rem] text-orange mb-1">부가 서비스</p>
          <ul>
            {SITE.extras.map((x) => (
              <li key={x.name} className="border-b border-ink/25 py-4 flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <span className="text-[1rem] font-extrabold w-44">{x.name}</span>
                <span className="nums text-[0.9375rem] font-extrabold text-orange">{x.price}</span>
                <span className="text-[0.875rem] text-ink-60 ml-auto">{x.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// FAQ — 절취선 아코디언
// ══════════════════════════════════════════════════════════════════════════════

function Faq() {
  const { ref, inView } = useInView(0.06)
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  return (
    <section id="faq" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head no="항목 11" title="자주 묻는 질문" inView={inView} />
        <div className="max-w-3xl">
          {SITE.faq.map((f, i) => (
            <div key={f.q} className={`anim-fade-up ${['', 'd80', 'd160', 'd240', 'd320', 'd400'][i] ?? ''} ${inView ? 'in-view' : ''} border-b-2 border-dashed border-ink/30`}>
              <button
                className="w-full flex items-baseline justify-between gap-6 py-5 text-left"
                aria-expanded={openIdx === i}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="text-[1.0625rem] font-extrabold">Q. {f.q}</span>
                <span className="f-display text-[1.3rem] leading-none text-orange shrink-0" aria-hidden="true">
                  {openIdx === i ? '닫기' : '보기'}
                </span>
              </button>
              {openIdx === i && (
                <p className="pb-6 pr-8 text-[0.9375rem] text-ink/80 leading-[1.9]">
                  <span className="font-extrabold text-orange mr-1.5">A.</span>
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// CTA — 트럭 옆면
// ══════════════════════════════════════════════════════════════════════════════

function Cta() {
  const { ref, inView } = useInView(0.2)
  return (
    <section ref={ref} className="bg-orange border-y-[3px] border-rule">
      <div className="max-w-6xl mx-auto px-5 md:px-6 py-14 md:py-20 text-center">
        <p className={`anim-fade-up ${inView ? 'in-view' : ''} text-[1rem] font-extrabold text-ink/80 mb-3`}>
          날짜만 정해지셨다면, 지금 물어보세요
        </p>
        <a href={`tel:${SITE.phone}`} className={`anim-fade-up d80 ${inView ? 'in-view' : ''} nums f-display block text-[3rem] md:text-[5.5rem] leading-none text-ink hover:text-paper`} style={{ transition: MOTION ? 'color 0.2s' : 'none' }}>
          {SITE.phone}
        </a>
        <p className={`anim-fade-up d160 ${inView ? 'in-view' : ''} mt-5 text-[0.9375rem] font-semibold text-ink/70`}>
          통화가 어려우면 카카오톡 <a href={SITE.kakaoUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-2 font-extrabold">{SITE.kakaoId}</a>
        </p>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 푸터 · 모바일 바
// ══════════════════════════════════════════════════════════════════════════════

function Footer() {
  return (
    <footer className="py-12">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <p className="f-display text-[1.2rem] mb-1">{SITE.name}</p>
        <p className="text-[0.75rem] text-ink-60 mb-6 tracking-wide">{SITE.nameEn}</p>
        <div className="space-y-1.5 text-[0.8125rem] text-ink-60">
          <p>{SITE.ceo} · 사업자등록번호 {SITE.bizNo}</p>
          <p>{SITE.license}</p>
          <p>{SITE.address} · {SITE.phone}</p>
        </div>
        <div className="mt-8 pt-4 border-t-2 border-rule flex flex-col sm:flex-row justify-between gap-2 text-[0.75rem] text-ink-60">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <p>적재물배상책임보험 가입 업체</p>
        </div>
      </div>
    </footer>
  )
}

function MobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-ink text-paper pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 divide-x divide-paper/20">
        <a href={`tel:${SITE.phone}`} className="py-3.5 text-center text-[0.9375rem] font-bold">전화</a>
        <a href={SITE.kakaoUrl} target="_blank" rel="noreferrer" className="py-3.5 text-center text-[0.9375rem] font-bold">카카오톡</a>
        <button
          onClick={() => document.querySelector('#quote')?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })}
          className="py-3.5 text-center text-[0.9375rem] font-bold text-orange"
        >
          간편견적
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
        <Services />
        <QuoteCalc />
        <Process />
        <BeforeAfter />
        <Cases />
        <Areas />
        <Reviews />
        <Pricing />
        <Checklist />
        <Claim />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <MobileBar />
    </div>
  )
}
