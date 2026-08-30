import { Phone, MapPin } from "lucide-react";

const LISTINGS = [
  { type: "매매", title: "역삼동 32평 아파트", price: "9억 5,000", desc: "역삼역 도보 5분 · 남향 · 25층" },
  { type: "전세", title: "삼성동 신축 오피스텔", price: "3억 8,000", desc: "삼성역 도보 3분 · 풀옵션" },
  { type: "월세", title: "논현동 1층 상가", price: "보증금 5,000 / 월 250", desc: "논현역 인근 · 15평" },
];

/** 부동산 중개업소 홈페이지 — 기본형 템플릿: 애니메이션 없이 정보를 정직하게 나열하는 정적 구성. */
export function RealEstateBasicPreview() {
  return (
    <div className="w-full bg-white text-neutral-900 font-sans border border-neutral-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <span className="text-lg font-bold tracking-tight">마루부동산</span>
        <nav className="hidden gap-6 text-sm text-neutral-600 sm:flex">
          <span>회사소개</span>
          <span>매물정보</span>
          <span>중개보수 계산</span>
          <span>오시는 길</span>
        </nav>
        <a href="#contact" className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
          전화 문의
        </a>
      </header>

      {/* Hero */}
      <section className="border-b border-neutral-200 px-6 py-14 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">역삼·삼성 지역 전문</p>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">믿을 수 있는 부동산 거래, 마루부동산</h1>
        <p className="mt-3 text-sm text-neutral-600">20년 경력 공인중개사가 매매·전세·월세 상담을 도와드립니다.</p>
        <a
          href="#contact"
          className="mt-6 inline-block rounded-md border border-neutral-900 px-5 py-2.5 text-sm font-medium"
        >
          매물 문의하기
        </a>
      </section>

      {/* 취급 업무 */}
      <section className="border-b border-neutral-200 px-6 py-10">
        <h2 className="text-base font-bold">취급 업무</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-neutral-700 sm:grid-cols-4">
          {["아파트 매매", "아파트 전월세", "상가 · 사무실", "중개보수 계산"].map((item) => (
            <li key={item} className="rounded border border-neutral-200 px-3 py-2.5 text-center">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* 매물 리스트 */}
      <section className="border-b border-neutral-200 px-6 py-10">
        <h2 className="text-base font-bold">현재 매물</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {LISTINGS.map((item) => (
            <div key={item.title} className="rounded border border-neutral-200 p-4">
              <span className="text-xs font-semibold text-neutral-500">{item.type}</span>
              <p className="mt-1.5 text-sm font-bold">{item.title}</p>
              <p className="mt-1 text-base font-bold">{item.price}</p>
              <p className="mt-1 text-xs text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="px-6 py-8 text-xs text-neutral-500">
        <p className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" /> 서울시 강남구 역삼로 123 마루빌딩 1층
        </p>
        <p className="mt-1.5 flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5" /> 02-1234-5678
        </p>
        <p className="mt-1.5">마루부동산 · 공인중개사사무소등록번호 11680-2024-00000</p>
      </footer>
    </div>
  );
}
