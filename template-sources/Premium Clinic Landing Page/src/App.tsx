import { useState, useEffect, useRef, useCallback } from "react";
import { MOTION } from "./variant";

/* 이미지 — src/images/ 안의 파일을 교체하면 그대로 반영됩니다 */
import doctor1 from "./images/doctor-1.jpg";
import doctor2 from "./images/doctor-2.jpg";
import doctor3 from "./images/doctor-3.jpg";
import service1 from "./images/service-1.jpg";
import service2 from "./images/service-2.jpg";
import service3 from "./images/service-3.jpg";
import service4 from "./images/service-4.jpg";
import service5 from "./images/service-5.jpg";
import service6 from "./images/service-6.jpg";
import gallery1 from "./images/gallery-1.jpg";
import gallery2 from "./images/gallery-2.jpg";
import gallery3 from "./images/gallery-3.jpg";
import gallery4 from "./images/gallery-4.jpg";
import gallery5 from "./images/gallery-5.jpg";
import gallery6 from "./images/gallery-6.jpg";
import gallery7 from "./images/gallery-7.jpg";
import gallery8 from "./images/gallery-8.jpg";
import heroPoster from "./images/hero-poster.jpg";
import ctaBg from "./images/cta-bg.jpg";

/* ================================================================
   SITE 설정 — 이 객체만 수정하면 홈페이지의 모든 내용이 반영됩니다
   ================================================================ */
const SITE = {
  /* 병원 기본 정보 */
  clinic: {
    name: "리엔 클리닉",                                     // 여기에 병원명 교체
    nameEn: "LIEN CLINIC",
    slogan: "충분히 듣고,\n정확하게 봅니다",                  // 여기에 슬로건 교체
    phone: "02-555-7890",                                    // 여기에 전화번호 교체
    address: "서울특별시 강남구 테헤란로 512, 리엔빌딩 3층",  // 여기에 주소 교체
    addressShort: "강남구 테헤란로 512",
    ceo: "대표원장 박리엔",                                   // 여기에 대표원장명 교체
    bizNo: "123-45-67890",                                   // 여기에 사업자등록번호 교체
    licenseNo: "제 2012-강남-0123호",                        // 여기에 의료기관 기호 교체
  },

  /* 히어로 배경 */
  // 여기에 히어로 배경 이미지 교체 (src/images/hero-poster.jpg 를 덮어써도 됩니다)
  heroImage: heroPoster,

  /* 진료 시간 | 배열 인덱스: 0=월 1=화 2=수 3=목 4=금 5=토 6=일 */
  schedule: {
    rows: [
      { day: "월요일", time: "09:00 – 18:00", note: "" },
      { day: "화요일", time: "09:00 – 19:00", note: "야간진료" },
      { day: "수요일", time: "09:00 – 18:00", note: "" },
      { day: "목요일", time: "09:00 – 19:00", note: "야간진료" },
      { day: "금요일", time: "09:00 – 18:00", note: "" },
      { day: "토요일", time: "09:00 – 13:00", note: "오전 진료" },
      { day: "일요일", time: "휴진", note: "공휴일 휴진" },
    ],
    lunch: "평일 13:00 – 14:00 점심시간",           // 여기에 점심시간 교체
    parking: "건물 지하 주차 2시간 무료",             // 여기에 주차 안내 교체
    holidayNote: "공휴일 및 임시 휴진은 별도 공지에 따릅니다.",
  },

  /* 신뢰 지표 */
  stats: [
    { label: "개원",      value: 12,    suffix: "년",  desc: "2012년 개원" },
    { label: "누적 진료", value: 84000, suffix: "건+", desc: "풍부한 임상 경험" },
    { label: "전문의",    value: 4,     suffix: "인",  desc: "내과 전문의 상주" },
  ],

  /* 진료 안내 (6개) */
  services: [
    {
      name: "내과 · 일반진료",
      desc: "발열, 기침, 소화불량 등 일상적 증상부터 복합적인 컨디션 저하까지 꼼꼼하게 진찰합니다.",
      // 여기에 내과 진료 사진 교체
      image: service1,
    },
    {
      name: "가정의학과",
      desc: "전 연령대의 건강 문제를 한 곳에서 관리합니다. 가족 모두의 지속적인 건강 파트너를 지향합니다.",
      // 여기에 가정의학과 사진 교체
      image: service2,
    },
    {
      name: "건강검진",
      desc: "기본 건강검진부터 정밀 검진까지. 결과를 충분히 설명하고 이후 관리 방향을 함께 설계합니다.",
      // 여기에 건강검진 사진 교체
      image: service3,
    },
    {
      name: "소화기 클리닉",
      desc: "위·장 내시경 검사와 역류성 식도염, 과민성 대장증후군 등 소화기 증상을 체계적으로 검토합니다.",
      // 여기에 소화기 진료 사진 교체
      image: service4,
    },
    {
      name: "순환기 클리닉",
      desc: "고혈압, 부정맥, 심계항진 등 심장·혈관계 증상을 정밀 검사를 통해 정확하게 파악합니다.",
      // 여기에 순환기 진료 사진 교체
      image: service5,
    },
    {
      name: "만성질환 관리",
      desc: "당뇨, 고지혈증 등 만성질환의 지속적인 모니터링과 생활습관 개선 계획을 함께 수립합니다.",
      // 여기에 만성질환 관리 사진 교체
      image: service6,
    },
  ],

  /* 의료진 (3명) */
  doctors: [
    {
      name: "박리엔",
      title: "대표원장",
      specialty: "내과 전문의",
      career: [
        "서울대학교 의과대학 졸업",
        "서울대학교병원 내과 전공의 수료",
        "내과 전문의 취득",
        "전 삼성서울병원 임상강사",
      ],
      // 여기에 대표원장 프로필 사진 교체 (세로형 권장)
      image: doctor1,
    },
    {
      name: "김준서",
      title: "진료원장",
      specialty: "가정의학과 전문의",
      career: [
        "연세대학교 의과대학 졸업",
        "세브란스병원 가정의학과 전공의 수료",
        "가정의학과 전문의 취득",
        "건강검진 클리닉 10년 경력",
      ],
      // 여기에 진료원장 프로필 사진 교체
      image: doctor2,
    },
    {
      name: "이하은",
      title: "진료원장",
      specialty: "소화기내과 전문의",
      career: [
        "고려대학교 의과대학 졸업",
        "고려대학교 구로병원 소화기내과 전공의 수료",
        "소화기내과 전문의 취득",
        "대한소화기내시경학회 정회원",
      ],
      // 여기에 진료원장 프로필 사진 교체
      image: doctor3,
    },
  ],

  /* 갤러리 (8장) */
  gallery: [
    // 여기에 병원 시설 사진 교체 (진료실, 대기실, 복도, 로비 순서로)
    { image: gallery1, alt: "진료실 전경" },
    { image: gallery2, alt: "대기 공간" },
    { image: gallery3, alt: "상담실" },
    { image: gallery4, alt: "내부 복도" },
    { image: gallery5, alt: "검사실" },
    { image: gallery6, alt: "진단 장비" },
    { image: gallery7, alt: "진료 데스크" },
    { image: gallery8, alt: "진료 준비" },
  ],

  /* 환자 후기 (3개) */
  reviews: [
    {
      text: "오랜 시간 기다렸는데도 진료실에 들어가니 처음부터 차분하게 들어주셨어요. 검사 결과도 이해하기 쉽게 설명해주셔서 모든 궁금증이 풀렸습니다.",
      author: "김OO",
      age: "40대",
      date: "2024. 11",
    },
    {
      text: "만성질환 관리를 다른 병원에서 받다 옮겼는데, 생활 습관까지 함께 봐주시는 게 달랐습니다. 처방을 최소화하고 관리 중심으로 접근해주셔서 신뢰가 생겼어요.",
      author: "이OO",
      age: "50대",
      date: "2024. 10",
    },
    {
      text: "건강검진 결과를 30분 넘게 설명해주셨어요. 수치 하나하나 짚어주시고 무엇을 주의해야 하는지 문자로도 보내주셔서 정말 감사했습니다.",
      author: "박OO",
      age: "30대",
      date: "2024. 12",
    },
  ],

  /* 예약 CTA */
  cta: {
    // 여기에 CTA 배경 이미지 교체
    image: ctaBg,
    title: "편하게 문의해 주세요",
    subtitle:
      "예약 없이 방문하셔도 됩니다. 전화 또는 온라인으로 사전 예약하시면 대기 없이 진료받으실 수 있습니다.",
  },

  /* 오시는 길 */
  location: {
    subway: "3호선 매봉역 2번 출구 도보 5분",
    bus: "강남구청 방면 정류장 도보 2분 (461, 4318, 146번)",
    parking: "건물 지하 1층 (2시간 무료, 이후 10분당 500원)",
    floors: "B1 주차 · 1F 입구 및 약국 · 3F 리엔 클리닉",
  },

  /* 진료 프로세스 */
  process: [
    { step: "01", title: "접수",    desc: "방문 또는 전화·온라인으로 접수합니다." },
    { step: "02", title: "상담",    desc: "증상과 경과를 충분히 청취합니다." },
    { step: "03", title: "검사",    desc: "필요한 검사를 안내하고 진행합니다." },
    { step: "04", title: "진료",    desc: "검사 결과를 바탕으로 진료합니다." },
    { step: "05", title: "사후관리", desc: "이후 관리 계획을 함께 수립합니다." },
  ],

  // 첫 방문 안내
  firstVisit: {
    intro: "처음 오시는 분은 아래만 준비해 주시면 됩니다.",
    items: [
      { title: "신분증", desc: "건강보험 적용을 위해 필요합니다. 미성년자는 보호자 동반을 권장합니다." },
      { title: "복용 중인 약", desc: "약봉투나 처방전 사진이면 충분합니다. 정확한 처방에 큰 도움이 됩니다." },
      { title: "이전 검사 기록", desc: "타 병원 검사 결과가 있다면 지참해 주세요. 중복 검사를 줄일 수 있습니다." },
    ],
    note: "예약 없이 방문하셔도 진료가 가능하나, 예약 시 대기 없이 안내됩니다.",
  },

  // 비급여 진료비용 — 의료법에 따라 고지하는 항목입니다. 여기에 실제 비용 교체
  nonCovered: [
    { item: "독감 예방접종 (4가)", price: "40,000원", note: "10~12월 시행" },
    { item: "대상포진 예방접종", price: "150,000원", note: "50세 이상 권장" },
    { item: "종합 건강검진 (기본)", price: "180,000원", note: "혈액 · 소변 · 심전도 포함" },
    { item: "수면 위내시경", price: "100,000원", note: "검진 항목과 별도" },
    { item: "영양 수액 (기본)", price: "50,000원부터", note: "성분에 따라 상이" },
    { item: "진단서 발급", price: "20,000원", note: "일반 진단서 기준" },
  ],
  nonCoveredNote: "비급여 항목은 건강보험이 적용되지 않는 진료 비용입니다. 시행 전 충분히 설명드리고 동의를 받은 후 진행합니다.",

  // 자주 묻는 질문
  faq: [
    { q: "예약 없이 가도 되나요?", a: "네, 접수 순서대로 진료합니다. 다만 예약 환자분이 우선 안내되므로, 전화나 카카오톡으로 예약하시면 대기 시간을 줄일 수 있습니다." },
    { q: "주차할 수 있나요?", a: "건물 지하 주차장을 2시간 무료로 이용하실 수 있습니다. 접수 시 차량 번호를 말씀해 주세요." },
    { q: "건강검진 결과는 언제 나오나요?", a: "기본 검진은 3일, 내시경 조직검사가 포함되면 7일 정도 소요됩니다. 결과는 내원 상담으로 자세히 설명드립니다." },
    { q: "타 병원 진료의뢰서를 받을 수 있나요?", a: "네. 상급 병원 진료가 필요하다고 판단되면 진료의뢰서를 발급해 드리고, 필요한 검사 기록을 함께 정리해 드립니다." },
    { q: "야간 진료는 언제 하나요?", a: "화요일과 목요일은 저녁 7시까지 진료합니다. 공휴일 진료 여부는 공지사항을 확인해 주세요." },
  ],

  // 공지사항 — 여기에 실제 공지 교체
  notices: [
    { date: "2026. 08", title: "9월 독감 예방접종 사전 예약 안내", tag: "접종" },
    { date: "2026. 07", title: "여름 휴진 안내 (8/3 – 8/5)", tag: "휴진" },
    { date: "2026. 06", title: "국가건강검진 지정 기관 안내", tag: "검진" },
  ],
};
/* ================================================================
   SITE 설정 끝
   ================================================================ */

/* ── Utility Hooks ────────────────────────────────────────────── */

/* 지금 진료중인지 — SITE.schedule 을 현재 시각과 대조합니다 */
function openStatus(): { label: string; on: boolean } {
  const now = new Date();
  const row = SITE.schedule.rows[(now.getDay() + 6) % 7];
  const m = row.time.match(/(\d{2}):(\d{2})\s*[–-]\s*(\d{2}):(\d{2})/);
  if (!m) return { label: "오늘 휴진", on: false };
  const cur = now.getHours() * 60 + now.getMinutes();
  const open = +m[1] * 60 + +m[2];
  const close = +m[3] * 60 + +m[4];
  const lm = SITE.schedule.lunch.match(/(\d{2}):(\d{2})\s*[–-]\s*(\d{2}):(\d{2})/);
  if (lm && now.getDay() >= 1 && now.getDay() <= 5) {
    const ls = +lm[1] * 60 + +lm[2];
    const le = +lm[3] * 60 + +lm[4];
    if (cur >= ls && cur < le) return { label: "점심시간", on: false };
  }
  if (cur < open) return { label: "진료 전", on: false };
  if (cur < close) return { label: "진료중", on: true };
  return { label: "진료 종료", on: false };
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!MOTION);
  useEffect(() => {
    if (!MOTION) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(MOTION ? 0 : target);
  const done = useRef(false);
  const start = useCallback(() => {
    if (done.current) return;
    done.current = true;
    if (!MOTION || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target); return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return { count, start };
}

/* FadeItem — 스크롤 진입 시 fade-up + stagger delay */
function FadeItem({
  children,
  delay = 0,
  className = "",
  kind = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /* up = 아래에서 올라옴 · mask = 마스크가 걷힘(제목) · scale = 축소에서 제자리(이미지) */
  kind?: "up" | "mask" | "scale";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!MOTION);
  useEffect(() => {
    if (!MOTION) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${
        kind === "mask" ? "reveal-mask" : kind === "scale" ? "reveal-scale" : "fade-up"
      } ${visible ? "visible" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ScrollProgress — 페이지 상단 진행 표시 (랜딩형 전용) */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    if (!MOTION) return;
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? window.scrollY / max : 0);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, []);
  if (!MOTION) return null;
  return (
    <div className="scroll-progress" style={{ transform: `scaleX(${pct})` }} aria-hidden="true" />
  );
}

/* ── Nav ──────────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { label: "진료안내", id: "services" },
  { label: "의료진",   id: "doctors" },
  { label: "둘러보기", id: "gallery" },
  { label: "진료시간", id: "schedule" },
  { label: "오시는길", id: "location" },
];

function Nav({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-white/96 backdrop-blur-md shadow-[0_1px_0_#DDD8CE] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* 로고 */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col leading-none text-left"
        >
          <span className="font-serif text-xl tracking-[0.12em] text-[#2F6B58]">
            {SITE.clinic.nameEn}
          </span>
          <span className="t-brand text-[#16211C]/50 mt-0.5">
            {SITE.clinic.name}
          </span>
        </button>

        {/* 데스크탑 메뉴 */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative t-action pb-0.5 transition-colors duration-200 hover:text-[#2F6B58] ${
                active === id ? "text-[#2F6B58]" : "text-[#16211C]/65"
              }`}
            >
              {label}
              {active === id && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#2F6B58] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* 예약 버튼 */}
        <a
          href={`tel:${SITE.clinic.phone}`}
          className="hidden md:inline-flex items-center gap-2 px-4 py-[9px] rounded-xl bg-[#2F6B58] text-white t-action hover:bg-[#265d4c] transition-colors duration-200"
        >
          온라인 예약
        </a>

        {/* 햄버거 */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          aria-label="메뉴"
        >
          <span
            className={`block h-px bg-[#16211C] origin-center transition-all duration-250 ${
              open ? "rotate-45 translate-y-[7px] w-6" : "w-6"
            }`}
          />
          <span
            className={`block h-px bg-[#16211C] transition-all duration-200 ${
              open ? "opacity-0 w-4" : "w-6"
            }`}
          />
          <span
            className={`block h-px bg-[#16211C] origin-center transition-all duration-250 ${
              open ? "-rotate-45 -translate-y-[7px] w-6" : "w-6"
            }`}
          />
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="border-t border-[#DDD8CE] bg-white/97 backdrop-blur-md">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="block w-full text-left px-6 py-3.5 t-body-sm text-[#16211C]/75 hover:bg-[#E8EFEA] hover:text-[#2F6B58] transition-colors"
            >
              {label}
            </button>
          ))}
          <div className="px-6 py-4 border-t border-[#DDD8CE]">
            <a
              href={`tel:${SITE.clinic.phone}`}
              className="block w-full text-center py-3 rounded-xl bg-[#2F6B58] text-white t-action"
            >
              전화 예약 {SITE.clinic.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Hero ─────────────────────────────────────────────────────── */

function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // JS: 0=Sun, 1=Mon…6=Sat → 내 배열: 0=Mon…6=Sun
  const todayIndex = (new Date().getDay() + 6) % 7;
  const todayRow = SITE.schedule.rows[todayIndex];

  const parallaxOffset = MOTION ? Math.min(scrollY * 0.18, 120) : 0;

  return (
    <section
      id="home"
      data-section="home"
      className="relative h-screen overflow-hidden flex flex-col justify-center"
    >
      {/* 배경 이미지 — 아주 느린 확대 (ken burns) */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${parallaxOffset}px)`, willChange: "transform" }}
        >
          <img
            src={SITE.heroImage}
            alt=""
            className={`w-full h-full object-cover ${MOTION ? "hero-zoom" : ""}`}
            style={{ height: "130%", marginTop: "-15%" }}
          />
        </div>
        {/* 흰색 그라디언트 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FBFAF7]/95 via-[#FBFAF7]/75 to-[#FBFAF7]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FBFAF7] via-transparent to-[#FBFAF7]/10" />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20">
        <h1 className="font-serif t-display text-[#16211C] mb-7 max-w-xl">
          {MOTION ? (
            SITE.clinic.slogan.split("\n").map((line, i) => (
              <span key={i} className="block overflow-hidden py-[0.06em]">
                <span
                  className="block hero-line"
                  style={{ animationDelay: `${160 + i * 150}ms` }}
                >
                  {line}
                </span>
              </span>
            ))
          ) : (
            <span className="whitespace-pre-line">{SITE.clinic.slogan}</span>
          )}
        </h1>
        <p className="t-body text-[#16211C]/55 mb-10 max-w-sm">
          환자 한 분 한 분의 이야기를 끝까지 듣고,
          <br />
          근거 있는 진료로 건강을 함께 관리합니다.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${SITE.clinic.phone}`}
            className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#2F6B58] text-white t-action hover:bg-[#265d4c] transition-colors duration-200"
          >
            예약하기
          </a>
          <button
            onClick={() =>
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center px-7 py-3.5 rounded-full border border-[#DDD8CE] text-[#16211C]/75 t-action bg-white/60 hover:border-[#2F6B58] hover:text-[#2F6B58] transition-colors duration-200"
          >
            진료안내
          </button>
        </div>
      </div>

      {/* 오늘 진료시간 바 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/88 backdrop-blur-md border-t border-[#DDD8CE]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center gap-x-6 gap-y-1 t-body-sm">
          <span className="text-[#2F6B58] font-medium">오늘 진료</span>
          {(() => { const st = openStatus(); return (
            <span className={`inline-flex items-center gap-1.5 t-micro font-medium px-2.5 py-0.5 rounded-full ${st.on ? "bg-[#2F6B58] text-white" : "bg-[#16211C]/8 text-[#16211C]/55"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${st.on ? "bg-white" : "bg-[#16211C]/35"}`} aria-hidden="true" />
              {st.label}
            </span>
          ); })()}
          <span className="text-[#16211C]/80">
            {todayRow.day} &nbsp;{todayRow.time}
            {todayRow.note && (
              <span className="ml-2 t-micro text-[#2F6B58] bg-[#E8EFEA] px-2 py-0.5 rounded-full">
                {todayRow.note}
              </span>
            )}
          </span>
          <span className="text-[#16211C]/40 t-micro hidden sm:inline">
            {SITE.schedule.lunch}
          </span>
          <a
            href={`tel:${SITE.clinic.phone}`}
            className="ml-auto text-[#16211C] font-medium t-num hover:text-[#2F6B58] transition-colors"
          >
            {SITE.clinic.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── TrustStrip — 카운터 애니메이션 ─────────────────────────── */

function StatItem({ stat }: { stat: (typeof SITE.stats)[0] }) {
  const { ref, visible } = useInView(0.3);
  const { count, start } = useCounter(stat.value, 1800);
  useEffect(() => { if (visible) start(); }, [visible, start]);

  return (
    <div ref={ref} className="text-center">
      <p className="t-meta text-[#2F6B58] mb-3">
        {stat.label}
      </p>
      <p className="font-serif t-stat text-[#16211C] mb-1">
        {count.toLocaleString()}
        <span className="t-h3 ml-1 text-[#2F6B58]">{stat.suffix}</span>
      </p>
      <p className="t-micro text-[#16211C]/45">{stat.desc}</p>
    </div>
  );
}

function TrustStrip() {
  return (
    <section className="border-y border-[#DDD8CE] bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-3 gap-8 divide-x divide-[#DDD8CE]">
        {SITE.stats.map((s, i) => (
          <StatItem key={i} stat={s} />
        ))}
      </div>
    </section>
  );
}

/* ── Services — 진료 안내 ─────────────────────────────────────── */

function Services() {
  return (
    <section id="services" data-section="services" className="py-24 md:py-36 bg-[#FBFAF7]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeItem kind="mask">
          <h2 className="font-serif t-h2 text-[#16211C] mb-4">
            진료 안내
          </h2>
          <p className="t-body-sm text-[#16211C]/50 mb-16 max-w-xs">
            각 진료과목에 대한 자세한 상담은 방문 또는 전화로 문의해 주세요.
          </p>
        </FadeItem>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {SITE.services.map((svc, i) => (
            <FadeItem key={i} delay={i * 80}>
              <div className="service-card group cursor-default">
                <div className="service-img-wrap overflow-hidden rounded-3xl aspect-[4/3] mb-5">
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="t-h3 font-medium text-[#16211C] mb-1.5">{svc.name}</h3>
                <p className="t-body-sm text-[#16211C]/55 leading-[1.75]">{svc.desc}</p>
                <a
                  href={`tel:${SITE.clinic.phone}`}
                  className="inline-block mt-3 t-meta text-[#2F6B58]/80 border-b border-[#2F6B58]/25 pb-0.5 hover:text-[#2F6B58] hover:border-[#2F6B58] transition-colors"
                >
                  진료 문의하기 →
                </a>
              </div>
            </FadeItem>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Doctors — 의료진 소개 ───────────────────────────────────── */

function Doctors() {
  return (
    <section id="doctors" data-section="doctors" className="py-24 md:py-36 bg-[#E8EFEA]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeItem kind="mask">
          <h2 className="font-serif t-h2 text-[#16211C] mb-16">
            의료진 소개
          </h2>
        </FadeItem>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE.doctors.map((doc, i) => (
            <FadeItem key={i} delay={i * 120}>
              <div className="doctor-card group">
                <div className="overflow-hidden rounded-2xl mb-6 bg-[#DDD8CE] aspect-[5/7]">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="doctor-photo w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <p className="t-meta text-[#2F6B58] mb-1">{doc.specialty}</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="font-serif t-h3 text-[#16211C]">{doc.name}</h3>
                    <span className="t-micro text-[#16211C]/50">{doc.title}</span>
                  </div>
                  <ul className="mt-4 space-y-1.5">
                    {doc.career.map((c, j) => (
                      <li key={j} className="flex gap-2 t-body-sm text-[#16211C]/60">
                        <span className="mt-[5px] w-1 h-1 rounded-full bg-[#2F6B58] flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeItem>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Gallery — 병원 둘러보기 ─────────────────────────────────── */

function Gallery() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const getParallax = (factor: number) => {
    if (!MOTION) return 0;
    if (!sectionRef.current) return 0;
    const rect = sectionRef.current.getBoundingClientRect();
    return rect.top * factor * -0.12;
  };

  const g = SITE.gallery;
  const [lb, setLb] = useState<number | null>(null);
  useEffect(() => {
    if (lb === null) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setLb(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lb]);

  return (
    <section id="gallery" data-section="gallery" ref={sectionRef} className="py-24 md:py-36 bg-[#FBFAF7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <FadeItem kind="mask">
          <h2 className="font-serif t-h2 text-[#16211C] mb-16">
            병원 둘러보기
          </h2>
        </FadeItem>

        {/* 비대칭 갤러리 그리드 */}
        <div className="flex gap-3 h-auto">
          {/* 왼쪽 컬럼 — 40% */}
          <div className="flex-[2] flex flex-col gap-3 min-w-0">
            <FadeItem kind="scale" delay={0} className="overflow-hidden rounded-xl">
              <div
                className="overflow-hidden rounded-xl h-64 sm:h-80 bg-[#E8EFEA]"
                style={{ transform: `translateY(${getParallax(1)  }px)`, transition: "transform 0.1s linear" }}
              >
                <img src={g[0].image} alt={g[0].alt} className="w-full h-full object-cover cursor-zoom-in" onClick={() => setLb(0)} />
              </div>
            </FadeItem>
            <FadeItem kind="scale" delay={80} className="overflow-hidden rounded-xl">
              <div className="overflow-hidden rounded-xl h-48 sm:h-56 bg-[#E8EFEA]">
                <img src={g[4].image} alt={g[4].alt} className="w-full h-full object-cover cursor-zoom-in" onClick={() => setLb(4)} />
              </div>
            </FadeItem>
            <FadeItem kind="scale" delay={160} className="overflow-hidden rounded-xl">
              <div className="overflow-hidden rounded-xl h-40 sm:h-48 bg-[#E8EFEA]">
                <img src={g[5].image} alt={g[5].alt} className="w-full h-full object-cover cursor-zoom-in" onClick={() => setLb(5)} />
              </div>
            </FadeItem>
          </div>

          {/* 가운데 컬럼 — 30% */}
          <div className="flex-[1.4] flex flex-col gap-3 min-w-0 mt-10">
            <FadeItem kind="scale" delay={60}>
              <div
                className="overflow-hidden rounded-xl h-72 sm:h-96 bg-[#E8EFEA]"
                style={{ transform: `translateY(${getParallax(0.6)}px)`, transition: "transform 0.1s linear" }}
              >
                <img src={g[1].image} alt={g[1].alt} className="w-full h-full object-cover cursor-zoom-in" onClick={() => setLb(1)} />
              </div>
            </FadeItem>
            <FadeItem kind="scale" delay={140}>
              <div className="overflow-hidden rounded-xl h-44 sm:h-52 bg-[#E8EFEA]">
                <img src={g[6].image} alt={g[6].alt} className="w-full h-full object-cover cursor-zoom-in" onClick={() => setLb(6)} />
              </div>
            </FadeItem>
          </div>

          {/* 오른쪽 컬럼 — 30% */}
          <div className="hidden sm:flex flex-[1.4] flex-col gap-3 min-w-0 mt-20">
            <FadeItem kind="scale" delay={100}>
              <div className="overflow-hidden rounded-xl h-52 bg-[#E8EFEA]">
                <img src={g[2].image} alt={g[2].alt} className="w-full h-full object-cover cursor-zoom-in" onClick={() => setLb(2)} />
              </div>
            </FadeItem>
            <FadeItem kind="scale" delay={180}>
              <div
                className="overflow-hidden rounded-xl h-72 bg-[#E8EFEA]"
                style={{ transform: `translateY(${getParallax(0.4)}px)`, transition: "transform 0.1s linear" }}
              >
                <img src={g[3].image} alt={g[3].alt} className="w-full h-full object-cover cursor-zoom-in" onClick={() => setLb(3)} />
              </div>
            </FadeItem>
            <FadeItem kind="scale" delay={220}>
              <div className="overflow-hidden rounded-xl h-40 bg-[#E8EFEA]">
                <img src={g[7].image} alt={g[7].alt} className="w-full h-full object-cover cursor-zoom-in" onClick={() => setLb(7)} />
              </div>
            </FadeItem>
          </div>
        </div>
      </div>
    
      {lb !== null && (
        <div className="fixed inset-0 z-[100] bg-[#16211C]/92 flex items-center justify-center p-5 md:p-10" onClick={() => setLb(null)} role="dialog" aria-modal="true" aria-label="시설 사진 크게 보기">
          <figure className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={g[lb].image.replace(/w=\d+&h=\d+/, "w=1600&h=1100")} alt={g[lb].alt} className="w-full max-h-[76vh] object-contain" />
            <figcaption className="mt-4 flex items-center justify-between text-white/85 t-body-sm">
              <span>{g[lb].alt}</span>
              <span className="t-num text-white/50">{lb + 1} / {g.length}</span>
            </figcaption>
          </figure>
          <button className="absolute top-4 right-5 text-white/80 hover:text-white text-[2rem] leading-none p-2" aria-label="닫기" onClick={() => setLb(null)}>×</button>
          <button className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-[2.4rem] p-3" aria-label="이전 사진" onClick={(e) => { e.stopPropagation(); setLb((lb + g.length - 1) % g.length); }}>‹</button>
          <button className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-[2.4rem] p-3" aria-label="다음 사진" onClick={(e) => { e.stopPropagation(); setLb((lb + 1) % g.length); }}>›</button>
        </div>
      )}
    </section>
  );
}

/* ── Process — 진료 프로세스 ─────────────────────────────────── */

function Process() {
  const lineRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLineVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-36 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <FadeItem kind="mask">
          <h2 className="font-serif t-h2 text-[#16211C] mb-16">
            진료 프로세스
          </h2>
        </FadeItem>

        <div ref={wrapRef}>
          {/* 가로 타임라인 선 */}
          <div className="relative mb-10 hidden md:block">
            <div className="absolute top-0 left-[2.5rem] right-[2.5rem] h-px bg-[#DDD8CE]" />
            <div
              ref={lineRef}
              className={`timeline-line absolute top-0 left-[2.5rem] h-px bg-[#2F6B58] ${
                lineVisible ? "visible" : ""
              }`}
              style={{ right: "2.5rem" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {SITE.process.map((step, i) => (
              <FadeItem key={i} delay={i * 100}>
                <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center">
                  {/* 스텝 원형 */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full border-2 border-[#2F6B58] bg-white flex items-center justify-center">
                      <span className="font-serif t-micro text-[#2F6B58] tracking-wider">{step.step}</span>
                    </div>
                  </div>
                  <div className="md:mt-5">
                    <h3 className="t-h3 font-medium text-[#16211C] mb-1.5 md:mb-2">{step.title}</h3>
                    <p className="t-micro text-[#16211C]/50">{step.desc}</p>
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Schedule — 진료시간 ─────────────────────────────────────── */

function Schedule() {
  // JS 0=Sun → 내 배열 0=Mon
  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <section id="schedule" data-section="schedule" className="py-24 md:py-36 bg-[#FBFAF7]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeItem kind="mask">
          <h2 className="font-serif t-h2 text-[#16211C] mb-16">
            진료시간 안내
          </h2>
        </FadeItem>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* 진료시간 표 */}
          <FadeItem>
            <div className="overflow-hidden rounded-2xl border border-[#DDD8CE] bg-white">
              <table className="w-full t-body-sm">
                <thead>
                  <tr className="border-b border-[#DDD8CE]">
                    <th className="text-left px-3 sm:px-5 py-3.5 t-meta text-[#16211C]/40 font-normal">
                      요일
                    </th>
                    <th className="text-left px-3 sm:px-5 py-3.5 t-meta text-[#16211C]/40 font-normal">
                      진료시간
                    </th>
                    <th className="text-left px-3 sm:px-5 py-3.5 t-meta text-[#16211C]/40 font-normal">
                      비고
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SITE.schedule.rows.map((row, i) => {
                    const isToday = i === todayIndex;
                    const isClosed = row.time === "휴진";
                    return (
                      <tr
                        key={i}
                        className={`border-b border-[#DDD8CE]/60 last:border-0 transition-colors ${
                          isToday ? "bg-[#E8EFEA]" : ""
                        }`}
                      >
                        <td className="px-3 sm:px-5 py-3.5">
                          <span
                            className={`font-medium ${
                              isToday ? "text-[#2F6B58]" : "text-[#16211C]/70"
                            }`}
                          >
                            {row.day}
                          </span>
                          {isToday && (
                            <span className="ml-2 t-micro text-white bg-[#2F6B58] px-1.5 py-0.5 rounded-full">
                              오늘
                            </span>
                          )}
                        </td>
                        <td
                          className={`px-3 sm:px-5 py-3.5 font-serif t-num whitespace-nowrap ${
                            isClosed
                              ? "text-[#16211C]/30"
                              : isToday
                              ? "text-[#2F6B58]"
                              : "text-[#16211C]"
                          }`}
                        >
                          {row.time}
                        </td>
                        <td className="px-3 sm:px-5 py-3.5 t-micro text-[#2F6B58]">
                          {row.note}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-2">
              {[SITE.schedule.lunch, SITE.schedule.parking, SITE.schedule.holidayNote].map(
                (note, i) => (
                  <p key={i} className="t-micro text-[#16211C]/45">
                    · {note}
                  </p>
                )
              )}
            </div>
          </FadeItem>

          {/* 전화 & 예약 */}
          <FadeItem delay={120}>
            <div className="flex flex-col gap-8">
              <div>
                <p className="t-meta text-[#16211C]/40 mb-3">대표 전화</p>
                <a
                  href={`tel:${SITE.clinic.phone}`}
                  className="font-serif t-phone text-[#16211C] hover:text-[#2F6B58] transition-colors duration-200"
                >
                  {SITE.clinic.phone}
                </a>
                <p className="t-micro text-[#16211C]/40 mt-2">
                  진료 중에도 전화를 받습니다. 부재 시 문자를 남겨주시면 연락드립니다.
                </p>
              </div>

              <div className="border-t border-[#DDD8CE] pt-8">
                <p className="t-meta text-[#16211C]/40 mb-4">온라인 예약 문의</p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="text"
                    placeholder="성함"
                    className="w-full px-4 py-3 t-body-sm border border-[#DDD8CE] rounded-xl bg-white placeholder-[#16211C]/30 focus:outline-none focus:border-[#2F6B58] transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="연락처"
                    className="w-full px-4 py-3 t-body-sm border border-[#DDD8CE] rounded-xl bg-white placeholder-[#16211C]/30 focus:outline-none focus:border-[#2F6B58] transition-colors"
                  />
                  <select className="w-full px-4 py-3 t-body-sm border border-[#DDD8CE] rounded-xl bg-white text-[#16211C]/70 focus:outline-none focus:border-[#2F6B58] transition-colors appearance-none">
                    <option value="">진료과목 선택</option>
                    {SITE.services.map((s, i) => (
                      <option key={i} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <textarea
                    rows={3}
                    placeholder="간단한 증상이나 문의사항을 남겨주세요."
                    className="w-full px-4 py-3 t-body-sm border border-[#DDD8CE] rounded-xl bg-white placeholder-[#16211C]/30 focus:outline-none focus:border-[#2F6B58] transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#2F6B58] text-white t-action hover:bg-[#265d4c] transition-colors duration-200"
                  >
                    예약 문의 보내기
                  </button>
                  <p className="t-micro text-[#16211C]/35 text-center">
                    영업일 기준 4시간 이내 연락드립니다.
                  </p>
                </form>
              </div>
            </div>
          </FadeItem>
        </div>
      </div>
    </section>
  );
}

/* ── Reviews — 환자 후기 ─────────────────────────────────────── */

/* ── 첫 방문 안내 · 비급여 비용 ─────────────────────────────── */
function VisitInfo() {
  return (
    <section id="visit" className="py-24 md:py-36" style={{ backgroundColor: "#F4F1EA" }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeItem kind="mask">
          <h2 className="font-serif t-h2 text-[#16211C] mb-3">처음 오시나요?</h2>
          <p className="t-body-sm text-[#16211C]/50 mb-14 max-w-md">{SITE.firstVisit.intro}</p>
        </FadeItem>

        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {SITE.firstVisit.items.map((it, i) => (
            <FadeItem key={it.title} delay={i * 100}>
              <div className="bg-white rounded-2xl border border-[#DDD8CE] p-7 h-full">
                <p className="font-serif t-h3 text-[#2F6B58] mb-3">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 font-medium text-[#16211C] mb-2">{it.title}</h3>
                <p className="t-body-sm text-[#16211C]/55">{it.desc}</p>
              </div>
            </FadeItem>
          ))}
        </div>
        <FadeItem delay={200}>
          <p className="t-micro text-[#16211C]/45">{SITE.firstVisit.note}</p>
        </FadeItem>

        <FadeItem kind="mask">
          <h2 className="font-serif t-h2 text-[#16211C] mt-24 mb-3">비급여 진료비용</h2>
          <p className="t-body-sm text-[#16211C]/50 mb-10 max-w-lg">{SITE.nonCoveredNote}</p>
        </FadeItem>
        <FadeItem delay={100}>
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
            <table className="w-full min-w-[520px] bg-white rounded-2xl border border-[#DDD8CE] border-separate border-spacing-0 overflow-hidden">
              <thead>
                <tr className="text-left border-b-2 border-[#16211C]/12">
                  <th className="px-5 py-3.5 t-meta text-[#16211C]/60 font-medium">항목</th>
                  <th className="px-5 py-3.5 t-meta text-[#16211C]/60 font-medium">비용</th>
                  <th className="px-5 py-3.5 t-meta text-[#16211C]/60 font-medium">비고</th>
                </tr>
              </thead>
              <tbody>
                {SITE.nonCovered.map((r) => (
                  <tr key={r.item}>
                    <td className="px-5 py-4 t-body-sm font-medium text-[#16211C] border-t border-[#DDD8CE]/60">{r.item}</td>
                    <td className="px-5 py-4 t-body-sm t-num font-medium text-[#2F6B58] border-t border-[#DDD8CE]/60 whitespace-nowrap">{r.price}</td>
                    <td className="px-5 py-4 t-micro text-[#16211C]/50 border-t border-[#DDD8CE]/60">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeItem>
      </div>
    </section>
  );
}

/* ── FAQ · 공지 ─────────────────────────────────────────────── */
function FaqNotice() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-16">
        <div>
          <FadeItem kind="mask">
            <h2 className="font-serif t-h2 text-[#16211C] mb-12">자주 묻는 질문</h2>
          </FadeItem>
          <div className="border-t border-[#DDD8CE]">
            {SITE.faq.map((f, i) => (
              <FadeItem key={f.q} delay={i * 60}>
                <div className="border-b border-[#DDD8CE]">
                  <button
                    className="w-full flex items-baseline justify-between gap-6 py-5 text-left"
                    aria-expanded={openIdx === i}
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  >
                    <span className="t-body font-medium text-[#16211C]">{f.q}</span>
                    <span className="font-serif t-h3 text-[#2F6B58] shrink-0" aria-hidden="true">{openIdx === i ? "–" : "+"}</span>
                  </button>
                  {openIdx === i && (
                    <p className="pb-6 pr-10 t-body-sm text-[#16211C]/60">{f.a}</p>
                  )}
                </div>
              </FadeItem>
            ))}
          </div>
        </div>

        <div>
          <FadeItem kind="mask">
            <h2 className="font-serif t-h2 text-[#16211C] mb-12">공지사항</h2>
          </FadeItem>
          <ul className="border-t border-[#DDD8CE]">
            {SITE.notices.map((n, i) => (
              <FadeItem key={n.title} delay={i * 80}>
                <li className="border-b border-[#DDD8CE] py-5">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="t-micro px-2 py-0.5 rounded-full bg-[#E8EFEA] text-[#2F6B58] font-medium">{n.tag}</span>
                    <span className="t-micro t-num text-[#16211C]/40">{n.date}</span>
                  </div>
                  <p className="t-body-sm font-medium text-[#16211C]">{n.title}</p>
                </li>
              </FadeItem>
            ))}
          </ul>
          <FadeItem delay={240}>
            <p className="t-micro text-[#16211C]/40 mt-5">* 템플릿 예시 공지입니다. 실제 공지로 교체하세요.</p>
          </FadeItem>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="py-24 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeItem kind="mask">
          <h2 className="font-serif t-h2 text-[#16211C] mb-3">
            환자 후기
          </h2>
          <p className="t-micro text-[#16211C]/35 mb-16">
            실제 후기를 바탕으로 재구성한 예시입니다.
          </p>
        </FadeItem>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SITE.reviews.map((review, i) => (
            <FadeItem key={i} delay={i * 100}>
              <div className="flex flex-col h-full p-7 rounded-2xl border border-[#DDD8CE] bg-[#FBFAF7]">
                <span className="font-serif text-5xl leading-none text-[#2F6B58]/25 mb-4">"</span>
                <p className="t-body text-[#16211C]/70 flex-1">{review.text}</p>
                <div className="mt-6 pt-5 border-t border-[#DDD8CE] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E8EFEA] flex items-center justify-center">
                      <span className="t-micro text-[#2F6B58] font-medium">
                        {review.author[0]}
                      </span>
                    </div>
                    <div>
                      <p className="t-body-sm font-medium text-[#16211C]">{review.author}</p>
                      <p className="t-micro text-[#16211C]/40">{review.age}</p>
                    </div>
                  </div>
                  <p className="t-micro text-[#16211C]/35">{review.date}</p>
                </div>
              </div>
            </FadeItem>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA — 예약 섹션 (패럴랙스) ─────────────────────────────── */

function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [bgOffset, setBgOffset] = useState(0);

  useEffect(() => {
    const fn = () => {
      if (!sectionRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setBgOffset(center * 0.25);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-36 overflow-hidden">
      {/* 패럴랙스 배경 */}
      <div
        className="absolute inset-[-20%]"
        style={{
          backgroundImage: `url(${SITE.cta.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${bgOffset}px)`,
          willChange: "transform",
        }}
      />
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-[#16211C]/78" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <FadeItem kind="mask">
          <h2 className="font-serif t-h2-lg text-white mb-6 max-w-2xl mx-auto">
            {SITE.cta.title}
          </h2>
          <p className="t-body text-white/60 mb-10 max-w-md mx-auto">
            {SITE.cta.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${SITE.clinic.phone}`}
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-[#2F6B58] t-action font-medium hover:bg-[#E8EFEA] transition-colors duration-200"
            >
              예약 문의
            </a>
            <a
              href={`tel:${SITE.clinic.phone}`}
              className="inline-flex items-center px-8 py-4 rounded-full border border-white/40 text-white t-action hover:border-white hover:bg-white/10 transition-colors duration-200"
            >
              {SITE.clinic.phone}
            </a>
          </div>
        </FadeItem>
      </div>
    </section>
  );
}

/* ── Location — 오시는 길 ─────────────────────────────────────── */

function Location() {
  return (
    <section id="location" data-section="location" className="py-24 md:py-36 bg-[#FBFAF7]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeItem kind="mask">
          <h2 className="font-serif t-h2 text-[#16211C] mb-16">
            오시는 길
          </h2>
        </FadeItem>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* 지도 자리 */}
          <FadeItem>
            <div className="relative overflow-hidden rounded-2xl bg-[#E8EFEA] aspect-[4/3]">
              {/* 약도 플레이스홀더 — 네이버·카카오 지도 임베드로 교체하세요 */}
              <svg viewBox="0 0 900 660" className="w-full h-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="약도">
                <rect width="900" height="660" fill="#E4DFD3" />
                <g fill="#EFEBE3">
                  <rect x="40" y="40" width="230" height="150" rx="6" />
                  <rect x="330" y="40" width="180" height="150" rx="6" />
                  <rect x="570" y="40" width="290" height="150" rx="6" />
                  <rect x="330" y="250" width="180" height="160" rx="6" />
                  <rect x="570" y="250" width="290" height="160" rx="6" />
                  <rect x="40" y="470" width="230" height="150" rx="6" />
                  <rect x="330" y="470" width="180" height="150" rx="6" />
                  <rect x="570" y="470" width="290" height="150" rx="6" />
                </g>
                {/* 건물 윤곽 */}
                <g fill="#DCD6C7">
                  <rect x="62" y="62" width="72" height="48" rx="3" />
                  <rect x="152" y="62" width="96" height="48" rx="3" />
                  <rect x="62" y="130" width="120" height="40" rx="3" />
                  <rect x="352" y="62" width="64" height="52" rx="3" />
                  <rect x="596" y="62" width="110" height="52" rx="3" />
                  <rect x="726" y="62" width="112" height="52" rx="3" />
                  <rect x="352" y="272" width="76" height="56" rx="3" />
                  <rect x="596" y="272" width="96" height="56" rx="3" />
                  <rect x="62" y="492" width="88" height="52" rx="3" />
                  <rect x="352" y="492" width="86" height="52" rx="3" />
                  <rect x="596" y="492" width="120" height="52" rx="3" />
                </g>
                {/* 공원 */}
                <rect x="40" y="250" width="230" height="160" rx="6" fill="#CFE0CE" />
                {/* 도로 */}
                <g stroke="#FFFFFF" fill="none" strokeLinecap="round">
                  <path d="M0 220 H900" strokeWidth="30" />
                  <path d="M0 440 H900" strokeWidth="20" />
                  <path d="M300 0 V660" strokeWidth="24" />
                  <path d="M540 0 V660" strokeWidth="20" />
                  <path d="M150 190 V250" strokeWidth="9" />
                  <path d="M700 190 V250" strokeWidth="9" />
                  <path d="M150 410 V470" strokeWidth="9" />
                </g>
                {/* 지하철 노선 */}
                <path d="M0 560 H900" stroke="#2F6B58" strokeWidth="4" strokeDasharray="16 11" opacity="0.6" fill="none" />
              </svg>
              {/* 핀 마커 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#2F6B58] border-2 border-white shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="w-px h-4 bg-[#2F6B58]" />
                </div>
              </div>
              {/* 지도 라벨 */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-xl px-4 py-3">
                <p className="t-micro font-medium text-[#16211C]">{SITE.clinic.name}</p>
                <p className="t-micro text-[#16211C]/50 mt-0.5">{SITE.clinic.addressShort}</p>
                <p className="t-micro text-[#2F6B58] mt-1">실제 지도로 교체해 주세요</p>
              </div>
            </div>
          </FadeItem>

          {/* 위치 정보 */}
          <FadeItem delay={100}>
            <div className="space-y-7">
              <div>
                <p className="t-meta text-[#2F6B58] mb-2">주소</p>
                <p className="t-body text-[#16211C]">{SITE.clinic.address}</p>
              </div>

              {[
                { label: "지하철", value: SITE.location.subway },
                { label: "버스", value: SITE.location.bus },
                { label: "주차", value: SITE.location.parking },
                { label: "층별 안내", value: SITE.location.floors },
              ].map(({ label, value }) => (
                <div key={label} className="border-t border-[#DDD8CE] pt-5">
                  <p className="t-meta text-[#16211C]/40 mb-2">{label}</p>
                  <p className="t-body text-[#16211C]/75">{value}</p>
                </div>
              ))}

              <div className="border-t border-[#DDD8CE] pt-5">
                <a
                  href={`tel:${SITE.clinic.phone}`}
                  className="inline-flex items-center gap-3 text-[#2F6B58] hover:text-[#265d4c] transition-colors"
                >
                  <span className="t-action border-b border-[#2F6B58]/40 pb-0.5">
                    전화로 길 안내 받기 →
                  </span>
                </a>
              </div>
            </div>
          </FadeItem>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-[#F0EDE8] border-t border-[#DDD8CE]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div>
            <p className="font-serif t-body tracking-[0.12em] text-[#2F6B58] mb-1">
              {SITE.clinic.nameEn}
            </p>
            <p className="t-brand text-[#16211C]/40 mb-6">
              {SITE.clinic.name}
            </p>
            <div className="space-y-1.5 t-micro text-[#16211C]/50">
              <p>의료기관 명칭: {SITE.clinic.name} &nbsp;|&nbsp; {SITE.clinic.ceo}</p>
              <p>사업자등록번호: {SITE.clinic.bizNo} &nbsp;|&nbsp; 의료기관 기호: {SITE.clinic.licenseNo}</p>
              <p>{SITE.clinic.address}</p>
              <p>대표 전화: {SITE.clinic.phone}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-right">
            <button className="t-micro text-[#16211C]/40 hover:text-[#2F6B58] transition-colors underline underline-offset-2 text-right">
              개인정보처리방침
            </button>
            <button className="t-micro text-[#16211C]/40 hover:text-[#2F6B58] transition-colors underline underline-offset-2 text-right">
              비급여 진료비용 안내
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#DDD8CE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 t-micro text-[#16211C]/35">
          <p>© {new Date().getFullYear()} {SITE.clinic.name}. All rights reserved.</p>
          <p>본 홈페이지는 의료광고 심의기준을 준수합니다.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── MobileBar — 모바일 하단 고정바 ─────────────────────────── */

function MobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#DDD8CE] pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 divide-x divide-[#DDD8CE]">
        <a
          href={`tel:${SITE.clinic.phone}`}
          className="flex flex-col items-center justify-center py-3 gap-1 hover:bg-[#E8EFEA] transition-colors"
        >
          {/* 전화 아이콘 */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F6B58" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.4a2 2 0 0 1 1.99-2H6.6a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9c1.085 1.87 2.514 3.52 4.2 4.8l1-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 20 16l.92-.08z"/>
          </svg>
          <span className="t-micro text-[#16211C]/60">전화</span>
        </a>

        <a
          href="https://pf.kakao.com"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-3 gap-1 hover:bg-[#E8EFEA] transition-colors"
        >
          {/* 카카오톡 아이콘 */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#2F6B58">
            <path d="M12 3C6.477 3 2 6.477 2 11c0 2.83 1.603 5.326 4.029 6.858L5 21l4.202-2.213A11.337 11.337 0 0 0 12 19c5.523 0 10-3.477 10-8S17.523 3 12 3z"/>
          </svg>
          <span className="t-micro text-[#16211C]/60">카카오톡</span>
        </a>

        <button
          onClick={() =>
            document.getElementById("location")?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex flex-col items-center justify-center py-3 gap-1 hover:bg-[#E8EFEA] transition-colors w-full"
        >
          {/* 지도 아이콘 */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F6B58" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="t-micro text-[#16211C]/60">길찾기</span>
        </button>
      </div>
    </div>
  );
}

/* ── App ─────────────────────────────────────────────────────── */

export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.getAttribute("data-section") ?? "home");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFAF7]">
      <ScrollProgress />
      <Nav active={active} />
      <main className="pb-16 md:pb-0">
        <Hero />
        <TrustStrip />
        <Services />
        <Doctors />
        <Gallery />
        <Process />
        <Schedule />
        <VisitInfo />
        <Reviews />
        <FaqNotice />
        <CTASection />
        <Location />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
