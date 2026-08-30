import { Phone, MapPin, Clock, Search, Train, Car, FileText, ChevronRight } from "lucide-react";
import aptExterior from "@/assets/images/re_apt_exterior.jpg";
import living01 from "@/assets/images/re_living_01.jpg";
import living02 from "@/assets/images/re_living_02.jpg";
import living03 from "@/assets/images/re_living_03.jpg";
import studio from "@/assets/images/re_studio.jpg";
import oneroom from "@/assets/images/re_oneroom.jpg";
import retail from "@/assets/images/re_retail.jpg";
import keys from "@/assets/images/re_keys.jpg";

const NAV = ["사무소 소개", "매물 정보", "중개보수 안내", "공지사항", "오시는 길"];

const LISTINGS = [
  {
    img: living01,
    deal: "매매",
    title: "역삼동 센트럴파크 32평",
    price: "9억 5,000만원",
    specs: ["아파트", "전용 84.9㎡", "12/25층", "남향"],
    note: "역삼역 도보 5분 · 즉시 입주 가능",
  },
  {
    img: living02,
    deal: "전세",
    title: "삼성동 아이파크 24평",
    price: "6억 2,000만원",
    specs: ["아파트", "전용 59.8㎡", "8/20층", "남동향"],
    note: "삼성역 도보 8분 · 올수리 완료",
  },
  {
    img: studio,
    deal: "월세",
    title: "논현동 리버스텔 오피스텔",
    price: "보증 3,000 / 월 130",
    specs: ["오피스텔", "전용 33.1㎡", "11/15층", "풀옵션"],
    note: "논현역 도보 3분 · 관리비 8만원",
  },
  {
    img: retail,
    deal: "임대",
    title: "신사동 가로수길 1층 상가",
    price: "보증 1억 / 월 550",
    specs: ["상가", "전용 49.5㎡", "1/5층", "권리금 협의"],
    note: "가로수길 메인 · 유동인구 우수",
  },
  {
    img: living03,
    deal: "매매",
    title: "청담동 프리미엄 타운하우스",
    price: "24억 8,000만원",
    specs: ["단독/다가구", "전용 168.2㎡", "복층", "주차 2대"],
    note: "청담역 도보 10분 · 단지 내 정원",
  },
  {
    img: oneroom,
    deal: "전세",
    title: "역삼동 대로변 투룸",
    price: "2억 9,000만원",
    specs: ["빌라/투룸", "전용 42.6㎡", "3/5층", "남향"],
    note: "선릉역 도보 7분 · 신축 3년차",
  },
];

const SERVICES = [
  { title: "아파트 매매·전세", desc: "역삼·삼성·논현 일대 아파트 실거래가 기준 매물을 안내합니다." },
  { title: "오피스텔·원룸", desc: "직장인 수요가 많은 역세권 오피스텔과 원룸을 전문으로 중개합니다." },
  { title: "상가·사무실", desc: "업종별 입지 분석과 권리금 협의까지 함께 진행합니다." },
  { title: "재개발·투자 상담", desc: "보유 자산 현황에 맞춰 투자 방향과 절세 방안을 상담해 드립니다." },
];

const FEE_ROWS = [
  { type: "매매·교환", price: "5천만원 미만", rate: "0.6%", limit: "25만원" },
  { type: "매매·교환", price: "5천만원 ~ 2억원", rate: "0.5%", limit: "80만원" },
  { type: "매매·교환", price: "2억원 ~ 9억원", rate: "0.4%", limit: "없음" },
  { type: "임대차", price: "5천만원 미만", rate: "0.5%", limit: "20만원" },
  { type: "임대차", price: "5천만원 ~ 1억원", rate: "0.4%", limit: "30만원" },
  { type: "임대차", price: "1억원 ~ 6억원", rate: "0.3%", limit: "없음" },
];

const STEPS = [
  { no: "01", title: "매물 문의", desc: "전화 또는 온라인으로 원하시는 조건을 남겨 주세요." },
  { no: "02", title: "매물 확인·임장", desc: "조건에 맞는 매물을 선별해 현장 방문 일정을 잡아 드립니다." },
  { no: "03", title: "조건 협의", desc: "가격, 입주일, 특약 사항을 매도인과 조율합니다." },
  { no: "04", title: "계약·잔금", desc: "권리 분석과 등기 절차까지 확인해 안전하게 마무리합니다." },
];

const NOTICES = [
  { date: "2026.08.24", title: "2026년 하반기 강남권 아파트 실거래가 동향 안내" },
  { date: "2026.08.11", title: "임대차 계약 시 확인해야 할 권리관계 체크리스트" },
  { date: "2026.07.29", title: "여름 휴가철 사무소 운영 시간 변경 안내" },
];

/** 부동산 중개업소 홈페이지 — 기본형 템플릿: 애니메이션 없이 정보를 정직하게 전달하는 정적 구성. */
export function RealEstateBasicPreview() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white font-sans text-neutral-900">
      {/* Utility bar */}
      <div className="hidden items-center justify-between border-b border-neutral-200 bg-neutral-50 px-6 py-2 text-[11px] text-neutral-500 sm:flex">
        <span>서울시 강남구 역삼로 123 마루빌딩 1층 · 공인중개사사무소 등록번호 11680-2024-00000</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> 평일 09:00–19:00 · 토 09:00–15:00
          </span>
          <span className="flex items-center gap-1 font-semibold text-neutral-800">
            <Phone className="h-3 w-3" /> 02-1234-5678
          </span>
        </span>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <div>
          <p className="text-lg font-bold tracking-tight">마루부동산</p>
          <p className="text-[10px] tracking-widest text-neutral-400">MARU REAL ESTATE</p>
        </div>
        <nav className="hidden gap-7 text-sm font-medium text-neutral-600 lg:flex">
          {NAV.map((n) => (
            <span key={n} className="cursor-default hover:text-neutral-900">
              {n}
            </span>
          ))}
        </nav>
        <span className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white">
          매물 문의
        </span>
      </header>

      {/* Hero */}
      <section>
        <div className="relative">
          <img src={aptExterior} alt="" className="h-[300px] w-full object-cover sm:h-[380px]" />
          <div className="absolute inset-0 bg-neutral-900/55" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-white/70">
            역삼 · 삼성 · 논현 지역 전문
          </p>
          <h1 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">
            20년 경력 공인중개사가
            <br />
            직접 확인한 매물만 안내합니다
          </h1>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-white/75 sm:text-sm">
              매매·전세·월세부터 상가 임대까지, 권리관계까지 꼼꼼히 확인한 매물을 소개해 드립니다.
            </p>
          </div>
        </div>

        {/* Search bar — 히어로 이미지 위로 살짝 겹쳐 올린다 */}
        <div className="relative z-10 mx-6 -mt-8 grid gap-2 rounded-xl border border-neutral-200 bg-white p-4 shadow-md sm:grid-cols-5">
          {[
            { label: "거래유형", value: "매매" },
            { label: "매물종류", value: "아파트" },
            { label: "지역", value: "강남구 역삼동" },
            { label: "가격대", value: "5억 ~ 10억" },
          ].map((f) => (
            <div key={f.label} className="rounded-md border border-neutral-200 px-3 py-2">
              <p className="text-[10px] text-neutral-400">{f.label}</p>
              <p className="mt-0.5 text-xs font-semibold">{f.value}</p>
            </div>
          ))}
          <div className="flex items-center justify-center gap-1.5 rounded-md bg-neutral-900 px-3 py-2 text-sm font-semibold text-white">
            <Search className="h-4 w-4" /> 매물 검색
          </div>
        </div>
      </section>

      {/* 추천 매물 */}
      <section className="px-6 py-14">
        <div className="flex items-end justify-between border-b border-neutral-200 pb-4">
          <div>
            <p className="text-[11px] font-semibold tracking-widest text-neutral-400">LISTINGS</p>
            <h2 className="mt-1.5 text-xl font-bold">이번 주 추천 매물</h2>
          </div>
          <span className="flex items-center gap-0.5 text-xs font-medium text-neutral-500">
            전체 매물 보기 <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LISTINGS.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-lg border border-neutral-200">
              <div className="relative">
                <img src={item.img} alt="" className="h-44 w-full object-cover" />
                <span className="absolute left-3 top-3 rounded bg-neutral-900/85 px-2 py-0.5 text-[11px] font-bold text-white">
                  {item.deal}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold">{item.title}</h3>
                <p className="mt-1 text-lg font-extrabold">{item.price}</p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {item.specs.map((s) => (
                    <li
                      key={s}
                      className="rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[10px] text-neutral-600"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 border-t border-neutral-100 pt-2.5 text-[11px] text-neutral-500">
                  {item.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 취급 업무 */}
      <section className="border-t border-neutral-200 bg-neutral-50 px-6 py-14">
        <p className="text-[11px] font-semibold tracking-widest text-neutral-400">SERVICES</p>
        <h2 className="mt-1.5 text-xl font-bold">취급 업무</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-lg border border-neutral-200 bg-white p-5">
              <h3 className="text-sm font-bold">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 중개보수 */}
      <section className="px-6 py-14">
        <p className="text-[11px] font-semibold tracking-widest text-neutral-400">BROKERAGE FEE</p>
        <h2 className="mt-1.5 text-xl font-bold">중개보수 요율 안내</h2>
        <p className="mt-2 text-xs text-neutral-500">
          서울특별시 주택 중개보수 기준입니다. 실제 보수는 거래금액에 요율을 곱해 산정하며 한도액을 넘지 않습니다.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-y border-neutral-200 bg-neutral-50 text-neutral-500">
                <th className="px-4 py-2.5 font-semibold">거래 구분</th>
                <th className="px-4 py-2.5 font-semibold">거래금액</th>
                <th className="px-4 py-2.5 font-semibold">상한 요율</th>
                <th className="px-4 py-2.5 font-semibold">한도액</th>
              </tr>
            </thead>
            <tbody>
              {FEE_ROWS.map((r, i) => (
                <tr key={`${r.type}-${r.price}`} className={i % 2 ? "bg-neutral-50/60" : ""}>
                  <td className="border-b border-neutral-100 px-4 py-2.5 text-neutral-500">{r.type}</td>
                  <td className="border-b border-neutral-100 px-4 py-2.5 font-medium">{r.price}</td>
                  <td className="border-b border-neutral-100 px-4 py-2.5 font-bold">{r.rate}</td>
                  <td className="border-b border-neutral-100 px-4 py-2.5 text-neutral-500">{r.limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 사무소 소개 */}
      <section className="border-t border-neutral-200 px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <img src={keys} alt="" className="h-64 w-full rounded-lg object-cover" />
          <div>
            <p className="text-[11px] font-semibold tracking-widest text-neutral-400">ABOUT US</p>
            <h2 className="mt-1.5 text-xl font-bold">한 건을 해도 확실하게 중개합니다</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              마루부동산은 2005년 개업 이후 20년간 역삼·삼성·논현 일대에서만 중개 업무를 해왔습니다.
              계약 전 등기부등본과 권리관계를 직접 확인하고, 고객이 놓치기 쉬운 부분까지 설명드리는 것을
              원칙으로 합니다.
            </p>
            <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-neutral-200 pt-5">
              {[
                { k: "개업 연차", v: "20년" },
                { k: "누적 중개", v: "1,200건" },
                { k: "소속 중개사", v: "3명" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="text-[11px] text-neutral-400">{s.k}</dt>
                  <dd className="mt-0.5 text-lg font-extrabold">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 거래 절차 */}
      <section className="border-t border-neutral-200 bg-neutral-50 px-6 py-14">
        <p className="text-[11px] font-semibold tracking-widest text-neutral-400">PROCESS</p>
        <h2 className="mt-1.5 text-xl font-bold">거래는 이렇게 진행됩니다</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.no} className="rounded-lg border border-neutral-200 bg-white p-5">
              <span className="text-xs font-bold text-neutral-300">{s.no}</span>
              <h3 className="mt-1 text-sm font-bold">{s.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 공지 + 오시는 길 */}
      <section className="grid gap-8 border-t border-neutral-200 px-6 py-14 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
            <h2 className="text-base font-bold">공지사항</h2>
            <span className="text-[11px] text-neutral-400">더보기</span>
          </div>
          <ul className="mt-3 divide-y divide-neutral-100">
            {NOTICES.map((n) => (
              <li key={n.title} className="flex items-start gap-3 py-3">
                <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-300" />
                <div>
                  <p className="text-xs font-medium leading-snug">{n.title}</p>
                  <p className="mt-1 text-[11px] text-neutral-400">{n.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="border-b border-neutral-200 pb-3 text-base font-bold">오시는 길</h2>
          <div className="mt-3 space-y-2.5 text-xs text-neutral-600">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" />
              서울시 강남구 역삼로 123 마루빌딩 1층
            </p>
            <p className="flex items-start gap-2">
              <Train className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" />
              2호선 역삼역 3번 출구 도보 5분 / 분당선 선릉역 도보 8분
            </p>
            <p className="flex items-start gap-2">
              <Car className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" />
              건물 지하 주차장 이용 가능 (방문 상담 시 2시간 무료)
            </p>
            <p className="flex items-start gap-2">
              <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" />
              평일 09:00–19:00 / 토요일 09:00–15:00 / 일요일·공휴일 휴무
            </p>
          </div>
          <div className="mt-4 flex h-32 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-[11px] text-neutral-400">
            지도 영역 (카카오맵 연동)
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-900 px-6 py-10 text-neutral-400">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-base font-bold text-white">마루부동산</p>
            <p className="mt-2 text-[11px] leading-relaxed">
              서울시 강남구 역삼로 123 마루빌딩 1층
              <br />
              대표: 김마루 · 공인중개사사무소 등록번호 11680-2024-00000
              <br />
              사업자등록번호 123-45-67890
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-xl font-extrabold text-white">02-1234-5678</p>
            <p className="mt-1 text-[11px]">평일 09:00–19:00 · 토 09:00–15:00</p>
            <p className="mt-3 text-[11px]">
              {NAV.slice(0, 4).map((n, i) => (
                <span key={n}>
                  {i > 0 && <span className="mx-1.5 text-neutral-600">|</span>}
                  {n}
                </span>
              ))}
            </p>
          </div>
        </div>
        <p className="mt-6 border-t border-neutral-800 pt-4 text-[10px] text-neutral-500">
          © 2026 마루부동산. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
