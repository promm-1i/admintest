import { useState, useEffect, useRef } from 'react'
import { MOTION } from './variant'

/* 이미지 — src/images/ 안의 파일을 같은 이름으로 덮어쓰면 그대로 반영됩니다 */
import teacher1 from './images/teacher-1.jpg'
import teacher2 from './images/teacher-2.jpg'
import teacher3 from './images/teacher-3.jpg'
import teacher4 from './images/teacher-4.jpg'
import facility1 from './images/facility-1.jpg'
import facility2 from './images/facility-2.jpg'
import facility3 from './images/facility-3.jpg'
import facility4 from './images/facility-4.jpg'
import facility5 from './images/facility-5.jpg'
import facility6 from './images/facility-6.jpg'
import hero from './images/hero.jpg'

// ══════════════════════════════════════════════════════════════════════════════
// SITE — 모든 텍스트·이미지·데이터를 이곳에서만 교체하세요.
// 컴포넌트 내부에는 하드코딩된 값이 없습니다.
// ══════════════════════════════════════════════════════════════════════════════

type Cell = { subject: string; grade: string; color: string } | null

const SITE = {
  // 여기에 학원 기본 정보 교체
  name: '세움학원',
  nameEn: 'SEUM ACADEMY',
  slogan: '혼자 공부할 수 있게\n만듭니다',
  sloganSub: '단순한 수업이 아닙니다. 스스로 공부하는 습관이 완성될 때까지 함께합니다.',

  // 여기에 연락처 교체
  phone: '02-1234-5678',
  kakaoId: '@세움학원',
  kakaoUrl: 'https://pf.kakao.com/_xxxxxs',

  // 여기에 주소 교체
  address: '서울특별시 노원구 동일로 1234, 세움빌딩 3층',

  // 여기에 운영 시간 교체
  hours: {
    weekday:  '월 – 금  14:00 – 22:00',
    saturday: '토  10:00 – 18:00',
    holiday:  '일·공휴일  휴원',
    consult:  '상담 가능  평일 14:00–19:00 / 토 10:00–14:00',
  },

  // 여기에 신뢰 지표 숫자 교체
  stats: [
    { label: '개원',     value: 14,  unit: '년', sub: '2011년 설립' },
    { label: '재원생',   value: 320, unit: '명', sub: '현재 기준' },
    { label: '전담 강사', value: 12,  unit: '명', sub: '전 과목 상주' },
    { label: '관리 비율', value: 8,   unit: ':1', sub: '강사 1인당 학생 수' },
  ],

  // 여기에 네비게이션 메뉴 교체
  nav: [
    { label: '과정안내', href: '#courses' },
    { label: '커리큘럼', href: '#curriculum' },
    { label: '강사진',   href: '#teachers' },
    { label: '시간표',   href: '#schedule' },
    { label: '학원소개', href: '#about' },
    { label: '오시는길', href: '#location' },
  ],

  // 여기에 학년별 과정 교체
  courses: {
    elementary: [
      { subject: '국어', grade: '초 3–6학년', sessions: '주 2회', size: '최대 8명', method: '교과 독해·어휘 확장\n서술형 쓰기 훈련 병행' },
      { subject: '영어', grade: '초 1–6학년', sessions: '주 3회', size: '최대 6명', method: '파닉스·회화 기초부터 문법까지\n레벨별 단계 커리큘럼' },
      { subject: '수학', grade: '초 1–6학년', sessions: '주 3회', size: '최대 8명', method: '연산 기초부터 사고력 확장\n오답 노트 관리 필수' },
      { subject: '과학', grade: '초 4–6학년', sessions: '주 1회', size: '최대 10명', method: '교과 개념 정리 중심\n탐구 활동 포함' },
    ],
    middle: [
      { subject: '국어', grade: '중 1–3학년', sessions: '주 2회', size: '최대 8명', method: '문학·비문학 독해 집중\n서술형·논술형 쓰기 완성' },
      { subject: '영어', grade: '중 1–3학년', sessions: '주 3회', size: '최대 6명', method: '내신 대비 문법·독해\n듣기 훈련 주 1회 포함' },
      { subject: '수학', grade: '중 1–3학년', sessions: '주 3회', size: '최대 8명', method: '개념 이해 → 유형 숙달 → 응용\n주간 단원 테스트 시행' },
      { subject: '과학', grade: '중 1–3학년', sessions: '주 2회', size: '최대 8명', method: '물리·화학·생명·지구 전 단원\n수행평가 대비 포함' },
    ],
    high: [
      { subject: '국어', grade: '고 1–3학년', sessions: '주 2회', size: '최대 6명', method: '수능·내신 동시 대비\n문학·언어와 매체 집중' },
      { subject: '영어', grade: '고 1–3학년', sessions: '주 3회', size: '최대 6명', method: '수능 독해 유형 완성\n내신 본문 분석 병행' },
      { subject: '수학', grade: '고 1–3학년', sessions: '주 4회', size: '최대 6명', method: '수Ⅰ·수Ⅱ·미적분·확통 선택\n기출 풀이 + 오답 집중 관리' },
      { subject: '과학', grade: '고 1–2학년', sessions: '주 2회', size: '최대 6명', method: '물리학·화학·생명과학 선택\n수능 선택과목 집중 대비' },
    ],
  },

  // 여기에 커리큘럼 단계 교체
  curriculum: [
    { step: 1, title: '진단 평가',    desc: '입학 전 수준 진단 테스트를 통해 현재 학습 상태와 취약 단원을 파악합니다. 결과는 학부모와 함께 검토합니다.' },
    { step: 2, title: '반 배치',      desc: '진단 결과와 학년·목표를 고려해 가장 적합한 반에 배치합니다. 학기 중 레벨 이동도 가능합니다.' },
    { step: 3, title: '정규 수업',    desc: '소규모 정원제 수업으로 강사가 학생 개개인의 이해도를 확인하며 진행합니다. 자습 시간도 별도 운영됩니다.' },
    { step: 4, title: '주간 테스트',  desc: '매주 단원별 테스트로 이해도를 점검합니다. 틀린 문제는 반드시 재풀이하고, 오답 누적 분석이 이루어집니다.' },
    { step: 5, title: '학부모 리포트', desc: '월 1회 학습 결과와 출결 현황, 다음 달 학습 계획을 학부모께 문자·카카오톡으로 안내합니다.' },
  ],

  // 여기에 강사진 정보 교체 (사진 URL 포함)
  teachers: [
    {
      name: '김지수',
      subject: '수학 전담',
      career: ['서울대학교 수학교육학과 졸업', '수학 지도 경력 11년', '중·고등 수학 내신·수능 전문'],
      photo: teacher1,
    },
    {
      name: '이민준',
      subject: '영어 전담',
      career: ['연세대학교 영어영문학과 졸업', '영어 지도 경력 9년', '토플·내신·수능 영어 집중'],
      photo: teacher2,
    },
    {
      name: '박서연',
      subject: '국어 전담',
      career: ['이화여자대학교 국어교육학과 졸업', '국어 지도 경력 8년', '독해·서술형·수능 국어 전문'],
      photo: teacher3,
    },
    {
      name: '최현우',
      subject: '과학 전담',
      career: ['KAIST 물리학과 졸업', '과학 지도 경력 7년', '물리·화학 수능 선택과목 전문'],
      photo: teacher4,
    },
  ],

  // 여기에 시간표 데이터 교체 (grid[교시index][요일index], 월=0 ~ 토=5)
  schedule: {
    periods: ['1교시  14:00–15:30', '2교시  15:40–17:10', '3교시  17:20–18:50', '4교시  19:00–20:30', '5교시  20:40–22:00'],
    days:    ['월', '화', '수', '목', '금', '토'],
    grid: [
      [
        { subject: '초등 수학', grade: '초등', color: 'math' },
        { subject: '초등 영어', grade: '초등', color: 'eng'  },
        { subject: '초등 수학', grade: '초등', color: 'math' },
        { subject: '초등 국어', grade: '초등', color: 'kor'  },
        { subject: '초등 영어', grade: '초등', color: 'eng'  },
        { subject: '초등 수학', grade: '초등', color: 'math' },
      ],
      [
        { subject: '중등 수학', grade: '중등', color: 'math' },
        { subject: '중등 국어', grade: '중등', color: 'kor'  },
        { subject: '중등 수학', grade: '중등', color: 'math' },
        { subject: '중등 영어', grade: '중등', color: 'eng'  },
        { subject: '중등 수학', grade: '중등', color: 'math' },
        { subject: '중등 영어', grade: '중등', color: 'eng'  },
      ],
      [
        { subject: '고등 영어', grade: '고등', color: 'eng'  },
        { subject: '고등 수학', grade: '고등', color: 'math' },
        { subject: '고등 국어', grade: '고등', color: 'kor'  },
        { subject: '고등 수학', grade: '고등', color: 'math' },
        { subject: '고등 영어', grade: '고등', color: 'eng'  },
        { subject: '중등 과학', grade: '중등', color: 'sci'  },
      ],
      [
        { subject: '중등 영어', grade: '중등', color: 'eng'  },
        { subject: '고등 수학', grade: '고등', color: 'math' },
        { subject: '중등 과학', grade: '중등', color: 'sci'  },
        { subject: '고등 국어', grade: '고등', color: 'kor'  },
        { subject: '고등 수학', grade: '고등', color: 'math' },
        { subject: '고등 과학', grade: '고등', color: 'sci'  },
      ],
      [
        { subject: '고등 수학', grade: '고등', color: 'math' },
        { subject: '고등 영어', grade: '고등', color: 'eng'  },
        { subject: '고등 수학', grade: '고등', color: 'math' },
        { subject: '자습',     grade: '전체', color: 'self' },
        { subject: '고등 국어', grade: '고등', color: 'kor'  },
        null,
      ],
    ] as Cell[][],
  },

  // 여기에 시설 사진 교체
  facilities: [
    { label: '강의실', photo: facility1 },
    { label: '자습실', photo: facility2 },
    { label: '상담실', photo: facility3 },
    { label: '로비',   photo: facility4 },
    { label: '복도',   photo: facility5 },
    { label: '라운지', photo: facility6 },
  ],

  // 여기에 학부모 후기 교체
  reviews: [
    {
      text: '아이가 스스로 공부하는 습관을 잡지 못해서 걱정이 많았는데, 세움에 다닌 지 3개월 만에 혼자 계획 세우고 공부하는 모습을 보게 됐어요. 주간 리포트로 진도가 눈에 보여서 믿음이 생겼습니다.',
      author: '중2 학부모 김○○', date: '2024년 11월',
    },
    {
      text: '다른 학원에서 오래 다녔는데 성적이 제자리였어요. 여기는 진단 평가로 정확히 뭘 모르는지 집어주고, 그 부분을 집중해서 잡아줘서 효율이 달랐습니다. 강사 선생님이 직접 연락 주시는 것도 신뢰가 됐어요.',
      author: '고1 학부모 이○○', date: '2025년 3월',
    },
    {
      text: '초등학교 때부터 보냈는데 꾸준히 수업 방식이 일관돼서 좋았어요. 아이가 모르는 걸 부끄러워하지 않고 질문하는 분위기가 만들어진 것 같아요. 학원을 옮길 생각을 해본 적이 없습니다.',
      author: '초5 학부모 박○○', date: '2025년 1월',
    },
  ],

  // 여기에 수강료 교체 (fee는 원화 숫자만, 단위 표시는 자동)
  tuition: [
    { grade: '초등부', course: '단과 (1과목)', sessions: '주 2–3회', fee: '180,000' },
    { grade: '초등부', course: '종합 (3과목)', sessions: '주 6–9회', fee: '450,000' },
    { grade: '중등부', course: '단과 (1과목)', sessions: '주 2–3회', fee: '220,000' },
    { grade: '중등부', course: '종합 (3과목)', sessions: '주 6–9회', fee: '560,000' },
    { grade: '고등부', course: '단과 (1과목)', sessions: '주 3–4회', fee: '260,000' },
    { grade: '고등부', course: '종합 (2과목)', sessions: '주 6–8회', fee: '460,000' },
  ],

  // 여기에 히어로 이미지 URL 교체
  heroPhoto: hero,

  // 여기에 교통 안내 교체
  transport: [
    { label: '지하철', desc: '4·7호선 노원역 2번 출구 도보 3분' },
    { label: '버스',   desc: '147, 1142, 노원03번 정류장 하차' },
    { label: '주차',   desc: '건물 내 지하 주차장 (30분 무료)' },
    { label: '셔틀',   desc: '운행 없음 (대중교통 이용 권장)' },
  ],

  // 여기에 법적 고지 정보 교체
  legal: {
    representative:  '대표자: 홍길동',
    registrationNo:  '학원등록번호: 제2015-노원-1234호',
    businessNo:      '사업자등록번호: 123-45-67890',
    privacyUrl:      '#',
    tuitionNoticeUrl:'#',
  },

  // 입학 절차
  admission: [
    { title: '진단 테스트', desc: '무료 · 40분. 현재 학습 상태와 취약 단원을 확인합니다.', note: '예약제' },
    { title: '학부모 상담', desc: '결과지를 놓고 목표와 학습 계획을 함께 정합니다.', note: '30분' },
    { title: '반 배치', desc: '레벨에 맞는 반을 배정합니다. 학기 중 레벨 이동이 가능합니다.', note: '정원 제한' },
    { title: '등원 시작', desc: '첫 주는 적응 기간으로, 담임 강사가 매일 학습 상태를 안내합니다.', note: '교재 지급' },
  ],

  // 셔틀버스 — 여기에 실제 노선 교체
  shuttle: {
    note: '하원 시간에 맞춰 역방향으로 운행합니다. 노선 외 지역은 상담 시 문의해 주세요.',
    routes: [
      { name: 'A노선 (상계 방면)', stops: '상계주공 → 노원역 → 중계목화 → 학원', times: '13:20 · 15:20 · 17:20' },
      { name: 'B노선 (중계 방면)', stops: '중계역 → 은행사거리 → 하계역 → 학원', times: '13:40 · 15:40 · 17:40' },
    ],
  },

  // 자주 묻는 질문
  faq: [
    { q: '진단 테스트는 꼭 봐야 하나요?', a: '네. 레벨에 맞지 않는 반에 들어가면 아이가 힘들어집니다. 테스트는 무료이고, 결과지는 등록하지 않으셔도 드립니다.' },
    { q: '중간에 반을 바꿀 수 있나요?', a: '월말 평가 결과에 따라 상향·하향 이동이 가능합니다. 담임 강사가 먼저 제안드리는 경우가 더 많습니다.' },
    { q: '보강은 어떻게 해주나요?', a: '결석 시 해당 주 토요일 보강 시간에 무료로 보충합니다. 사전 연락 없는 결석도 1회까지는 보강해 드립니다.' },
    { q: '숙제량은 어느 정도인가요?', a: '학년과 과목에 따라 하루 30분~1시간 분량입니다. 아이가 소화하지 못하면 양을 조절합니다. 억지로 늘리지 않습니다.' },
    { q: '수강료 외에 추가 비용이 있나요?', a: '교재비(분기 1회)만 별도입니다. 테스트비 · 관리비 명목의 추가 비용은 없으며, 수강료는 교육청 게시 기준을 따릅니다.' },
  ],

  // 공지사항 — 여기에 실제 공지 교체
  notices: [
    { date: '2026. 08', title: '9월 신규 등원 진단 테스트 예약 안내', tag: '입학' },
    { date: '2026. 08', title: '추석 연휴 휴원 및 보강 일정', tag: '휴원' },
    { date: '2026. 07', title: '여름 특강 종료 · 2학기 정규반 개강', tag: '개강' },
  ],
}

// ─── 유틸리티 ────────────────────────────────────────────────────────────────

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

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [val, setVal] = useState(MOTION ? 0 : target)
  useEffect(() => {
    if (!active) return
    if (!MOTION || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target)
      return
    }
    let start: number | null = null
    const tick = (ts: number) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.round((1 - (1 - p) ** 3) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return val
}

function goTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: MOTION ? 'smooth' : 'auto' })
}

/* 섹션 머리 — 제목만 크게. 라벨·번호·장식 없음 */
function Head({ title, sub, inView, light = false }: { title: React.ReactNode; sub?: string; inView: boolean; light?: boolean }) {
  return (
    <div className={`anim-fade-up ${inView ? 'in-view' : ''} mb-12 md:mb-16`}>
      <h2 className={`f-display text-[2.1rem] md:text-[3rem] ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {sub && <p className={`mt-4 text-[0.9375rem] leading-[1.8] max-w-xl ${light ? 'text-white/55' : 'text-ink-55'}`}>{sub}</p>}
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
    const fn = () => setScrolled(window.scrollY > 24)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const go = (href: string) => {
    setOpen(false)
    goTo(href)
  }
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-sm ${scrolled || open ? 'border-b border-line' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-6 h-16 flex items-center justify-between gap-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' })} className="flex items-baseline gap-1">
          <span className="f-display text-[1.15rem]">{SITE.name}</span>
          <span className="w-2 h-2 rounded-full bg-lime translate-y-[-2px]" aria-hidden="true" />
        </button>

        <nav className="hidden md:flex items-center gap-0.5">
          {SITE.nav.map((n) => (
            <button
              key={n.href}
              onClick={() => go(n.href)}
              className={`px-3 py-2 text-[0.9375rem] font-semibold ${active === n.href.slice(1) ? 'text-ink underline decoration-lime decoration-[3px] underline-offset-[6px]' : 'text-ink/60 hover:text-ink'}`}
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => go('#consult')}
            className="ml-3 px-5 py-2.5 rounded-full bg-ink text-white text-[0.9375rem] font-bold hover:bg-ink/85"
            style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
          >
            상담 신청
          </button>
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
        <div className="md:hidden border-t border-line bg-paper px-5 py-2">
          {SITE.nav.map((n) => (
            <button key={n.href} onClick={() => go(n.href)} className="block w-full text-left py-3.5 text-[1rem] font-semibold border-b border-line last:border-0">
              {n.label}
            </button>
          ))}
          <button onClick={() => go('#consult')} className="block w-full text-center my-3 py-3.5 rounded-full bg-ink text-white font-bold">
            상담 신청
          </button>
        </div>
      )}
    </header>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 히어로 — 풀 타이포 + 와이드 사진
// ══════════════════════════════════════════════════════════════════════════════

function Hero() {
  const { ref, inView } = useInView(0.05)
  const [first, ...restLines] = SITE.slogan.split('\n')
  // 진단 테스트 예약 화면 — 학년 → 과목 → 시간 순으로 스스로 채워진다.
  // MOTION 이 꺼진 기본형에서는 마지막 상태로 고정돼 정보는 그대로 남는다.
  const STEPS = [
    { k: '학년', pick: '고등부', opts: ['초등부', '중등부', '고등부'] },
    { k: '과목', pick: '수학',   opts: ['국어', '영어', '수학'] },
    { k: '시간', pick: '평일 17:00', opts: ['평일 15:00', '평일 17:00', '토 10:00'] },
  ]
  return (
    <section ref={ref} className={`pt-28 md:pt-36 pb-16 md:pb-24 hx-hero ${inView ? 'in-view' : ''}`}>
      <div className="hx-wrap max-w-6xl mx-auto px-5 md:px-6">
        <div className="hx-copy">
          <h1 className={`anim-fade-up ${inView ? 'in-view' : ''} f-display text-[3rem] md:text-[4.6rem] mb-7`}>
            <span className="hl">{first}</span>
            {restLines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </h1>
          <p className={`anim-fade-up d80 ${inView ? 'in-view' : ''} text-[1.0625rem] text-ink-55 leading-[1.85] max-w-md mb-8`}>
            {SITE.sloganSub}
          </p>
          <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''} flex items-center gap-4 mb-6`}>
            <button
              onClick={() => goTo('#consult')}
              className="px-7 py-4 rounded-full bg-lime text-ink text-[1rem] font-extrabold hover:bg-lime-d"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              진단 테스트 예약
            </button>
            <button onClick={() => goTo('#courses')} className="text-[1rem] font-bold border-b-2 border-ink pb-0.5 hover:opacity-70" style={{ transition: MOTION ? 'opacity 0.2s' : 'none' }}>
              과정 보기
            </button>
          </div>
          <p className={`anim-fade-up d160 ${inView ? 'in-view' : ''} hx-meta text-[0.875rem] text-ink-55`}>
            이번 주 상담 가능 <b className="nums text-ink">8팀</b> · {SITE.hours.consult}
          </p>
        </div>

        <div className={`hx-board anim-fade-up d160 ${inView ? 'in-view' : ''}`} role="group" aria-label="진단 테스트 예약 화면 예시">
          <div className="hx-bar">
            <span className="hx-bt">진단 테스트 예약</span>
            <span className="hx-demo">데모 화면</span>
          </div>
          <div className="hx-body">
            {STEPS.map((st, i) => (
              <div className="hx-step" key={st.k} style={{ ['--i']: String(i) }}>
                <span className="hx-k">{st.k}</span>
                <span className="hx-opts">
                  {st.opts.map((o) => (
                    <span key={o} className={`hx-o ${o === st.pick ? 'is-on' : ''}`}>{o}</span>
                  ))}
                </span>
              </div>
            ))}
            <div className="hx-out">
              <span className="hx-ok" aria-hidden="true" />
              <span className="hx-otext">
                <b>고등부 수학 · 평일 17:00</b>
                <span>이 시간에 진단 테스트 가능합니다 · 소요 40분</span>
              </span>
            </div>
            <p className="hx-note">화면은 예약 흐름을 보여 주는 예시입니다.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 지표 — 밴드 없이, 잉크 숫자만 크게
// ══════════════════════════════════════════════════════════════════════════════

function StatItem({ stat, active }: { stat: (typeof SITE.stats)[number]; active: boolean }) {
  const val = useCountUp(stat.value, active)
  return (
    <div className="py-8 md:py-10">
      <p className="text-[0.8125rem] font-semibold text-ink-55 mb-2">{stat.label}</p>
      <p className="nums f-display text-[2.8rem] md:text-[3.6rem] text-ink leading-none">
        {val}
        <span className="text-[1.2rem] md:text-[1.5rem] align-baseline ml-0.5">{stat.unit}</span>
      </p>
      <p className="text-[0.75rem] text-ink-55/80 mt-2">{stat.sub}</p>
    </div>
  )
}

function Stats() {
  const { ref, inView } = useInView(0.35)
  return (
    <section ref={ref} className="border-y border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-6 grid grid-cols-2 md:grid-cols-4">
        {SITE.stats.map((s, i) => (
          <div key={s.label} className={`${i > 0 ? 'md:border-l border-line md:pl-8' : ''}`}>
            <StatItem stat={s} active={inView} />
          </div>
        ))}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 과정 — 밑줄 탭 + 로우 리스트 (카드 폐기)
// ══════════════════════════════════════════════════════════════════════════════

const GRADE_TABS = [
  { key: 'elementary', label: '초등부' },
  { key: 'middle', label: '중등부' },
  { key: 'high', label: '고등부' },
] as const

function Courses() {
  const { ref, inView } = useInView(0.06)
  const [tab, setTab] = useState<(typeof GRADE_TABS)[number]['key']>('elementary')
  const list = SITE.courses[tab]
  return (
    <section id="courses" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title={<>학년별 <span className="hl">과정</span></>} sub="전 과목 소수 정원제. 자리가 차면 대기를 받습니다." inView={inView} />

        <div className={`anim-fade-up ${inView ? 'in-view' : ''} flex gap-7 border-b border-line mb-2`} role="tablist" aria-label="학년 선택">
          {GRADE_TABS.map((g) => (
            <button
              key={g.key}
              role="tab"
              aria-selected={tab === g.key}
              onClick={() => setTab(g.key)}
              className={`pb-3.5 text-[1.05rem] -mb-px border-b-[3px] ${
                tab === g.key ? 'font-extrabold text-ink border-ink' : 'font-semibold text-ink/45 border-transparent hover:text-ink/70'
              }`}
              style={{ transition: MOTION ? 'color 0.15s' : 'none' }}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div key={tab} className={MOTION ? 'tab-fadein' : ''}>
          {list.map((c) => (
            <div key={c.subject} className="mark-row grid md:grid-cols-[130px_1fr_auto] gap-x-8 gap-y-2 items-baseline py-7 border-b border-line">
              <h3 className="f-display text-[1.6rem] md:text-[1.9rem]">{c.subject}</h3>
              <p className="text-[0.9375rem] text-ink-55 leading-[1.75] whitespace-pre-line">{c.method}</p>
              <div className="flex md:flex-col md:items-end gap-x-4 gap-y-1 text-[0.875rem] font-semibold text-ink/70 nums">
                <span>{c.grade}</span>
                <span>{c.sessions} · {c.size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 커리큘럼 — 형광 체크 로그
// ══════════════════════════════════════════════════════════════════════════════

function Curriculum() {
  const { ref, inView } = useInView(0.08)
  return (
    <section id="curriculum" className="py-20 md:py-28 bg-paper2">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title={<>입학부터 리포트까지,<br /><span className="hl">전부 연결됩니다</span></>} inView={inView} />
        <ol className="max-w-3xl">
          {SITE.curriculum.map((c, i) => (
            <li key={c.title} className={`anim-fade-up ${['', 'd80', 'd160', 'd240', 'd320'][i]} ${inView ? 'in-view' : ''} flex gap-6 py-6 ${i < SITE.curriculum.length - 1 ? 'border-b border-dashed border-ink/15' : ''}`}>
              <span className="shrink-0 mt-1 w-8 h-8 rounded-lg bg-lime flex items-center justify-center" aria-hidden="true">
                <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
                  <path d="M1.5 6.5L6 11L14.5 1.5" stroke="#141412" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h3 className="text-[1.15rem] font-extrabold mb-1.5">{c.title}</h3>
                <p className="text-[0.9375rem] text-ink-55 leading-[1.8]">{c.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 강사진 — 큰 사진 · 큰 이름
// ══════════════════════════════════════════════════════════════════════════════

function Teachers() {
  const { ref, inView } = useInView(0.05)
  return (
    <section id="teachers" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title={<><span className="hl">가르치는 사람</span>이 전부입니다</>} sub="전 과목 전담 강사가 상주합니다. 수업도, 관리 연락도 같은 사람이 합니다." inView={inView} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {SITE.teachers.map((t, i) => (
            <div key={t.name} className={`anim-fade-up ${['', 'd80', 'd160', 'd240'][i]} ${inView ? 'in-view' : ''}`}>
              <div className="ph rounded-2xl mb-5">
                <img src={t.photo} alt={`${t.subject} ${t.name} 강사`} className="w-full aspect-[4/5] object-cover" />
              </div>
              <p className="text-[0.8125rem] font-bold mb-1"><span className="hl">{t.subject}</span></p>
              <h3 className="f-display text-[1.5rem] mb-3">{t.name}</h3>
              <ul className="space-y-1">
                {t.career.map((c) => (
                  <li key={c} className="text-[0.8125rem] text-ink-55 leading-[1.6]">{c}</li>
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
// 시간표 — 모노 그리드, 오늘 열 형광
// ══════════════════════════════════════════════════════════════════════════════

function Schedule() {
  const { ref, inView } = useInView(0.08)
  const todayIdx = (new Date().getDay() + 6) % 7 // 월=0 … 일=6
  return (
    <section id="schedule" className="py-20 md:py-28 bg-paper2">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="주간 시간표" sub={todayIdx < 6 ? '오늘 수업이 형광펜으로 칠해져 있습니다.' : '일요일은 휴원입니다. 월요일 시간표부터 확인하세요.'} inView={inView} />
        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''} scroll-x -mx-5 px-5 md:mx-0 md:px-0`}>
          <table className="w-full min-w-[760px] border-collapse bg-paper rounded-2xl overflow-hidden">
            <thead>
              <tr>
                <th className="text-left text-[0.75rem] font-semibold text-ink-55 px-4 py-4 w-40">교시</th>
                {SITE.schedule.days.map((d, i) => (
                  <th key={d} className={`text-[0.9375rem] px-3 py-4 ${i === todayIdx ? 'bg-lime font-extrabold' : 'font-bold text-ink/70'}`}>
                    {d}
                    {i === todayIdx && <span className="block text-[0.625rem] font-bold">오늘</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SITE.schedule.grid.map((row, pi) => (
                <tr key={pi} className="border-t border-line">
                  <td className="nums text-[0.75rem] text-ink-55 px-4 py-4 whitespace-pre">{SITE.schedule.periods[pi]}</td>
                  {row.map((cell, di) => (
                    <td key={di} className={`px-3 py-4 text-center ${di === todayIdx ? 'bg-lime/25' : ''}`}>
                      {cell ? (
                        <>
                          <span className="block text-[0.875rem] font-bold">{cell.subject}</span>
                          <span className="block text-[0.6875rem] text-ink-55 mt-0.5">{cell.grade}</span>
                        </>
                      ) : (
                        <span className="text-ink/20">–</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 학습 관리 + 시설 (#about)
// ══════════════════════════════════════════════════════════════════════════════

function About() {
  const { ref, inView } = useInView(0.06)
  return (
    <section id="about" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title={<>부모님 폰으로 <span className="hl">다 보입니다</span></>} sub="출결, 이번 주 테스트, 다음 달 계획까지 — 물어보지 않아도 먼저 보냅니다." inView={inView} />

        <div className="grid md:grid-cols-3 gap-5 mb-24">
          {[
            { tag: '실시간', title: '출결 알림', desc: '등원 · 하원 즉시 문자로 알립니다. 무단결석은 10분 안에 전화드립니다.' },
            { tag: '매주', title: '주간 테스트 결과', desc: '점수만 보내지 않습니다. 어떤 유형을 틀렸고 어떻게 보완하는지까지.' },
            { tag: '매월', title: '학부모 리포트', desc: '한 달 학습 요약과 다음 달 계획을 카카오톡 리포트로 보냅니다.' },
          ].map((m, i) => (
            <div key={m.title} className={`anim-fade-up ${['', 'd80', 'd160'][i]} ${inView ? 'in-view' : ''} rounded-2xl bg-paper2 p-7`}>
              <span className="inline-block text-[0.6875rem] font-extrabold bg-lime rounded-full px-2.5 py-1 mb-4">{m.tag}</span>
              <h3 className="text-[1.15rem] font-extrabold mb-2">{m.title}</h3>
              <p className="text-[0.9375rem] text-ink-55 leading-[1.8]">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SITE.facilities.map((f, i) => (
            <figure key={f.label} className={`anim-fade-up ${['', 'd80', 'd160', 'd80', 'd160', 'd240'][i]} ${inView ? 'in-view' : ''}`}>
              <div className="ph rounded-xl">
                <img src={f.photo} alt={f.label} className="w-full aspect-[4/3] object-cover" loading="lazy" />
              </div>
              <figcaption className="mt-2 text-[0.8125rem] font-semibold text-ink-55">{f.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 입학 절차 + 셔틀
// ══════════════════════════════════════════════════════════════════════════════

function Admission() {
  const { ref, inView } = useInView(0.08)
  return (
    <section className="py-20 md:py-28 bg-paper2">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="입학까지 일주일" sub="진단부터 등원까지, 보통 일주일 안에 끝납니다." inView={inView} />
        <ol className="grid md:grid-cols-4 gap-x-6 gap-y-8 mb-16">
          {SITE.admission.map((a, i) => (
            <li key={a.title} className={`anim-fade-up ${['', 'd80', 'd160', 'd240'][i]} ${inView ? 'in-view' : ''} border-t-2 border-ink pt-5`}>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-[1.05rem] font-extrabold">{a.title}</h3>
                <span className="text-[0.6875rem] font-extrabold bg-lime rounded-full px-2 py-0.5">{a.note}</span>
              </div>
              <p className="text-[0.875rem] text-ink-55 leading-[1.75]">{a.desc}</p>
            </li>
          ))}
        </ol>

        <div className={`anim-fade-up d240 ${inView ? 'in-view' : ''}`}>
          <h3 className="text-[1.05rem] font-extrabold mb-4">셔틀버스</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {SITE.shuttle.routes.map((r) => (
              <div key={r.name} className="rounded-2xl bg-paper p-6">
                <p className="text-[0.9375rem] font-extrabold mb-1.5">{r.name}</p>
                <p className="text-[0.875rem] text-ink-55 mb-2.5">{r.stops}</p>
                <p className="nums text-[0.875rem] font-bold">등원 {r.times}</p>
              </div>
            ))}
          </div>
          <p className="text-[0.75rem] text-ink-55 mt-3.5">{SITE.shuttle.note}</p>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 후기 — 첫 후기를 크게
// ══════════════════════════════════════════════════════════════════════════════

function Reviews() {
  const { ref, inView } = useInView(0.08)
  const [first, ...rest] = SITE.reviews
  return (
    <section className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="학부모님들 말" sub="실제 상담 내용을 바탕으로 재구성한 예시입니다." inView={inView} />
        <blockquote className={`anim-fade-up ${inView ? 'in-view' : ''} mb-14`}>
          <p className="f-display text-[1.5rem] md:text-[2.1rem] leading-[1.45] max-w-4xl">
            “{first.text}”
          </p>
          <footer className="mt-5 text-[0.9375rem] text-ink-55">
            <cite className="not-italic font-bold text-ink">{first.author}</cite> · {first.date}
          </footer>
        </blockquote>
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-8 border-t border-line pt-10">
          {rest.map((r, i) => (
            <blockquote key={r.author} className={`anim-fade-up ${['d80', 'd160'][i]} ${inView ? 'in-view' : ''}`}>
              <p className="text-[0.9375rem] leading-[1.85] text-ink/80 mb-4">{r.text}</p>
              <footer className="text-[0.875rem] text-ink-55">
                <cite className="not-italic font-bold text-ink">{r.author}</cite> · {r.date}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 수강료 — 모노 표
// ══════════════════════════════════════════════════════════════════════════════

function Tuition() {
  const { ref, inView } = useInView(0.1)
  return (
    <section className="py-20 md:py-28 bg-paper2">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="수강료" sub="교육청 게시 기준을 따릅니다. 교재비(분기 1회) 외 추가 비용은 없습니다." inView={inView} />
        <div className={`anim-fade-up d80 ${inView ? 'in-view' : ''} scroll-x -mx-5 px-5 md:mx-0 md:px-0`}>
          <table className="w-full min-w-[560px] border-collapse bg-paper rounded-2xl overflow-hidden">
            <thead>
              <tr className="text-left border-b-2 border-ink">
                <th className="px-5 py-4 text-[0.8125rem] font-bold text-ink-55">대상</th>
                <th className="px-5 py-4 text-[0.8125rem] font-bold text-ink-55">과정</th>
                <th className="px-5 py-4 text-[0.8125rem] font-bold text-ink-55">수업</th>
                <th className="px-5 py-4 text-[0.8125rem] font-bold text-ink-55 text-right">월 수강료</th>
              </tr>
            </thead>
            <tbody>
              {SITE.tuition.map((t, i) => (
                <tr key={i} className="border-b border-line last:border-0">
                  <td className="px-5 py-4 text-[0.9375rem] font-extrabold">{t.grade}</td>
                  <td className="px-5 py-4 text-[0.9375rem] text-ink/75">{t.course}</td>
                  <td className="nums px-5 py-4 text-[0.9375rem] text-ink-55">{t.sessions}</td>
                  <td className="nums px-5 py-4 text-[1rem] font-extrabold text-right whitespace-nowrap"><span className="hl in-view">{t.fee}원</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={`anim-fade-up d160 ${inView ? 'in-view' : ''} text-[0.75rem] text-ink-55 mt-4`}>
          교습비 게시표는 <a href={SITE.legal.tuitionNoticeUrl} className="underline underline-offset-2">여기</a>에서 확인하실 수 있습니다.
        </p>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// FAQ · 공지
// ══════════════════════════════════════════════════════════════════════════════

function FaqNotice() {
  const { ref, inView } = useInView(0.06)
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  return (
    <section className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6 grid lg:grid-cols-[1.25fr_0.75fr] gap-x-20 gap-y-16">
        <div>
          <Head title="자주 묻는 질문" inView={inView} />
          <div className="border-t-2 border-ink">
            {SITE.faq.map((f, i) => (
              <div key={f.q} className="border-b border-line">
                <button
                  className="w-full flex items-baseline justify-between gap-6 py-5 text-left"
                  aria-expanded={openIdx === i}
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                >
                  <span className="text-[1.0625rem] font-bold">{f.q}</span>
                  <span className={`nums shrink-0 text-[1.3rem] font-extrabold ${openIdx === i ? '' : 'text-ink/30'}`} aria-hidden="true">
                    {openIdx === i ? '−' : '+'}
                  </span>
                </button>
                {openIdx === i && <p className="pb-6 pr-10 text-[0.9375rem] text-ink-55 leading-[1.9]">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>

        <div>
          <Head title="공지" inView={inView} />
          <ul className="border-t-2 border-ink">
            {SITE.notices.map((n) => (
              <li key={n.title} className="border-b border-line py-4.5 py-5">
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="text-[0.6875rem] font-extrabold bg-lime rounded-full px-2 py-0.5">{n.tag}</span>
                  <span className="nums text-[0.75rem] text-ink-55">{n.date}</span>
                </div>
                <p className="text-[0.9375rem] font-semibold">{n.title}</p>
              </li>
            ))}
          </ul>
          <p className="text-[0.75rem] text-ink-55 mt-4">* 템플릿 예시 공지입니다.</p>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 상담 신청 — 유일한 잉크 다크 섹션
// ══════════════════════════════════════════════════════════════════════════════

function Consult() {
  const { ref, inView } = useInView(0.12)
  const [sent, setSent] = useState(false)
  return (
    <section id="consult" className="py-20 md:py-28 bg-ink text-white">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6 grid lg:grid-cols-2 gap-x-20 gap-y-12">
        <div className={`anim-fade-up ${inView ? 'in-view' : ''} ${inView ? 'in-view' : ''}`}>
          <h2 className="f-display text-[2.1rem] md:text-[3rem] text-white mb-6">
            진단 테스트부터
            <br />
            <span className="hl !text-ink" style={{ color: '#141412' }}>무료로 시작</span>
          </h2>
          <p className="text-white/55 text-[0.9375rem] leading-[1.85] max-w-sm mb-10">
            테스트 결과지는 등록하지 않으셔도 드립니다. 아이 상태를 정확히 아는 것부터가 시작이니까요.
          </p>
          <a href={`tel:${SITE.phone}`} className="nums inline-block text-[1.7rem] font-extrabold border-b-[3px] border-lime pb-1 mb-3">
            {SITE.phone}
          </a>
          <p className="text-[0.875rem] text-white/45">카카오톡 {SITE.kakaoId} · {SITE.hours.consult}</p>
        </div>

        <form
          className={`anim-fade-up d160 ${inView ? 'in-view' : ''}`}
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-[0.8125rem] font-bold text-white/45 mb-1" htmlFor="c-name">학생 이름</label>
                <input id="c-name" className="field-dark" placeholder="홍길동" />
              </div>
              <div>
                <label className="block text-[0.8125rem] font-bold text-white/45 mb-1" htmlFor="c-grade">학년</label>
                <select id="c-grade" className="field-dark" defaultValue="">
                  <option value="" disabled>선택해 주세요</option>
                  <option>초등부</option>
                  <option>중등부</option>
                  <option>고등부</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[0.8125rem] font-bold text-white/45 mb-1" htmlFor="c-phone">연락처</label>
              <input id="c-phone" className="field-dark" placeholder="010-0000-0000" inputMode="tel" />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-lime text-ink text-[1rem] font-extrabold hover:bg-lime-d"
              style={{ transition: MOTION ? 'background-color 0.2s' : 'none' }}
            >
              {sent ? '접수됐습니다. 하루 안에 연락드릴게요.' : '진단 테스트 예약하기'}
            </button>
            <p className="text-[0.75rem] text-white/35">* 템플릿 데모 — 실제 전송되지 않습니다.</p>
          </div>
        </form>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 오시는 길 · 푸터 · 모바일 바
// ══════════════════════════════════════════════════════════════════════════════

function Location() {
  const { ref, inView } = useInView(0.12)
  return (
    <section id="location" className="py-20 md:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-6">
        <Head title="오시는 길" sub={SITE.address} inView={inView} />
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-8">
          <dl className={`anim-fade-up ${inView ? 'in-view' : ''} border-t-2 border-ink`}>
            {SITE.transport.map((t) => (
              <div key={t.label} className="grid grid-cols-[84px_1fr] gap-6 py-4 border-b border-line">
                <dt className="text-[0.8125rem] font-bold text-ink-55 pt-0.5">{t.label}</dt>
                <dd className="text-[0.9375rem] leading-[1.7]">{t.desc}</dd>
              </div>
            ))}
          </dl>
          <dl className={`anim-fade-up d160 ${inView ? 'in-view' : ''} border-t-2 border-ink`}>
            {[
              ['평일', SITE.hours.weekday],
              ['토요일', SITE.hours.saturday],
              ['휴원', SITE.hours.holiday],
              ['상담', SITE.hours.consult],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[84px_1fr] gap-6 py-4 border-b border-line">
                <dt className="text-[0.8125rem] font-bold text-ink-55 pt-0.5">{k}</dt>
                <dd className="nums text-[0.9375rem] leading-[1.7]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <p className="f-display text-[1.15rem] mb-1">{SITE.name}<span className="text-lime-d">.</span></p>
        <p className="text-[0.6875rem] text-ink-55 tracking-[0.1em] mb-6">{SITE.nameEn}</p>
        <div className="space-y-1.5 text-[0.8125rem] text-ink-55">
          <p>{SITE.legal.representative} · {SITE.legal.registrationNo}</p>
          <p>{SITE.legal.businessNo} · {SITE.address}</p>
          <p>{SITE.phone} · 카카오톡 {SITE.kakaoId}</p>
        </div>
        <div className="mt-8 pt-4 border-t border-line flex flex-col sm:flex-row justify-between gap-2 text-[0.75rem] text-ink-55">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <div className="flex gap-5">
            <a href={SITE.legal.privacyUrl} className="underline underline-offset-2">개인정보처리방침</a>
            <a href={SITE.legal.tuitionNoticeUrl} className="underline underline-offset-2">교습비 게시표</a>
          </div>
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
        <button onClick={() => goTo('#consult')} className="py-3.5 text-center text-[0.9375rem] font-extrabold text-lime">
          진단 예약
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
        <Stats />
        <Courses />
        <Curriculum />
        <Teachers />
        <Schedule />
        <About />
        <Admission />
        <Reviews />
        <Tuition />
        <FaqNotice />
        <Consult />
        <Location />
      </main>
      <Footer />
      <MobileBar />
    </div>
  )
}
