import { useState } from "react";
import { Phone, MapPin, Clock, Calendar, Shield, X, Activity, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HospitalPreview() {
  const [selectedDept, setSelectedDept] = useState("all");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  const departments = [
    { id: "all", name: "전체 진료과목" },
    { id: "skin", name: "피부·성형센터" },
    { id: "checkup", name: "정밀 건강검진" },
    { id: "rehab", name: "도수·재활치료" },
    { id: "wellness", name: "면역·항노화" },
  ];

  const treatments = [
    {
      dept: "skin",
      title: "3D 정밀 분석 맞춤 리프팅",
      desc: "개개인의 피부 두께와 근막 상태를 3D 고해상도로 정밀 측정한 후 진행하는 1:1 맞춤 레이저 시술",
      time: "약 40분 소요",
      tag: "인기 대표 시술",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
    },
    {
      dept: "checkup",
      title: "VIP 원스톱 정밀 종합 검진",
      desc: "혈액 정밀 검사, 초음파, 뇌혈관 MRA를 포함하여 당일 결과를 확인할 수 있는 원스톱 시스템",
      time: "약 2시간 소요",
      tag: "사전 예약제",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
    },
    {
      dept: "rehab",
      title: "1:1 도수 & 척추 체형 교정",
      desc: "전문 물리치료사가 체형 분석 결과를 토대로 척추 및 관절 불균형을 비수술로 정밀 케어",
      time: "약 50분 소요",
      tag: "실비보험 가능",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    },
    {
      dept: "wellness",
      title: "맞춤형 면역 수액 & 영양 테라피",
      desc: "만성 피로, 면역 저하, 항산화 완화를 위해 개개인 혈액 상태에 알맞게 배합된 영양 수액",
      time: "약 30분 소요",
      tag: "당일 진료 가능",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const filteredTreatments =
    selectedDept === "all"
      ? treatments
      : treatments.filter((t) => t.dept === selectedDept);

  return (
    <div className="w-full bg-slate-50 text-slate-800 font-sans rounded-2xl overflow-hidden border border-slate-200 shadow-2xl">
      {/* Top Emergency & Booking Notice */}
      <div className="bg-teal-700 border-b border-teal-800 px-6 py-2 text-center text-xs text-teal-50 font-medium flex items-center justify-center gap-2">
        <Activity className="h-3.5 w-3.5 text-teal-200 animate-pulse" />
        <span>보건복지부 인증 전문의 1:1 전담 시스템 · 평일 야간진료 시행 중</span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold font-mono text-lg shadow-sm">
            M
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-slate-900 block">
              민트 정밀의원
            </span>
            <span className="text-[10px] text-teal-700 font-mono tracking-wider block -mt-1 font-semibold">MINT MEDICAL CENTER</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-600">
          <a href="#about" className="hover:text-teal-700 transition-colors">의원 소개</a>
          <a href="#dept" className="hover:text-teal-700 transition-colors">진료 센터</a>
          <a href="#doctors" className="hover:text-teal-700 transition-colors">의료진 소개</a>
          <a href="#reviews" className="hover:text-teal-700 transition-colors">진료 후기</a>
          <a href="#location" className="hover:text-teal-700 transition-colors">오시는 길</a>
        </nav>

        <Button
          onClick={() => setIsBookingOpen(true)}
          size="sm"
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 rounded-full shadow-md"
        >
          <Calendar className="h-3.5 w-3.5 mr-1.5" /> 빠른 진료 예약
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-teal-50/90 via-white to-slate-50 border-b border-slate-200">
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-100/80 px-4 py-1.5 text-xs font-semibold text-teal-800">
            <Shield className="h-3.5 w-3.5 text-teal-600" /> 대학병원급 최첨단 3D 정밀 검사 장비 도입
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight break-keep">
            정확한 데이터 기반 진단과 <br />
            환자 중심의 맞춤 정밀 케어
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-slate-600 break-keep">
            과잉 진료 없는 정직한 마음으로, 분야별 전문의가 첫 진찰부터 치료 후 관리까지 1:1 전담으로 책임지고 함께합니다.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => setIsBookingOpen(true)}
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 rounded-full shadow-lg"
            >
              온라인 진료 예약
            </Button>
            <a
              href="tel:02-1234-5678"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
            >
              <Phone className="h-4 w-4 mr-2 text-teal-600" /> 전화 문의: 02-1234-5678
            </a>
          </div>
        </div>

        {/* Precision Metrics */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-slate-200 bg-white shadow-md">
          <div className="text-center p-3 border-r border-slate-200 last:border-r-0">
            <p className="text-2xl sm:text-3xl font-extrabold text-teal-600 font-mono">99.4%</p>
            <p className="text-xs text-slate-500 font-medium mt-1">환자 만족도</p>
          </div>
          <div className="text-center p-3 border-r border-slate-200 last:border-r-0">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">15,000+</p>
            <p className="text-xs text-slate-500 font-medium mt-1">누적 임상 케이스</p>
          </div>
          <div className="text-center p-3 border-r border-slate-200 last:border-r-0">
            <p className="text-2xl sm:text-3xl font-extrabold text-teal-600 font-mono">0건</p>
            <p className="text-xs text-slate-500 font-medium mt-1">과잉 진료 제로 수칙</p>
          </div>
          <div className="text-center p-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">1:1</p>
            <p className="text-xs text-slate-500 font-medium mt-1">전문의 주치의 시스템</p>
          </div>
        </div>
      </section>

      {/* Treatments Section with Rich Visuals */}
      <section id="dept" className="px-6 py-20 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-teal-700 font-bold uppercase tracking-widest">MEDICAL CENTERS</span>
            <h2 className="text-3xl font-bold text-slate-900">센터별 맞춤 진료 과목</h2>
            <p className="text-xs sm:text-sm text-slate-600">최첨단 의료 장비를 활용하여 신속하고 정확하게 원인을 진단합니다.</p>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                  selectedDept === dept.id
                    ? "bg-teal-600 text-white shadow-md scale-105"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Treatment Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {filteredTreatments.map((t, idx) => (
              <div
                key={idx}
                className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-teal-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={t.image}
                    alt={t.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-md bg-white/90 border border-teal-200 text-teal-800 px-2.5 py-0.5 text-[10px] font-semibold">
                    {t.tag}
                  </span>
                </div>

                <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 break-keep">{t.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-teal-700">
                    <span className="font-semibold">{t.time}</span>
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="hover:underline font-sans text-xs font-bold text-teal-700"
                    >
                      상담 신청 →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Reviews Section */}
      <section id="reviews" className="px-6 py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-teal-700 font-bold uppercase tracking-widest">REAL PATIENT REVIEWS</span>
            <h2 className="text-3xl font-bold text-slate-900">환자분들이 직접 남겨주신 후기</h2>
            <p className="text-xs text-slate-600">민트 정밀의원을 다녀가신 환자분들의 진솔한 경험담입니다.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/80 space-y-3 shadow-xs">
              <div className="flex items-center gap-1 text-amber-500 text-xs">★★★★★</div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                "원장님께서 검사 결과를 하나하나 친절하게 설명해주셔서 과잉진료 없이 필요한 시술만 안심하고 받을 수 있었습니다."
              </p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>김O진 님 (리프팅 센터)</span>
                <span>2026.02 작성</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/80 space-y-3 shadow-xs">
              <div className="flex items-center gap-1 text-amber-500 text-xs">★★★★★</div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                "만성 목/어깨 통증으로 고생하다 도수치료 받았습니다. 물리치료사분 손길이 너무 꼼꼼해서 3회 만에 편해졌습니다."
              </p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>박O우 님 (도수재활 센터)</span>
                <span>2026.01 작성</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/80 space-y-3 shadow-xs">
              <div className="flex items-center gap-1 text-amber-500 text-xs">★★★★★</div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                "종합검진 당일 결과 상담이 가능해서 너무 편리했습니다. 시설도 깨끗하고 간호사분들도 정말 친절하세요!"
              </p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>이O현 님 (VIP 건강검진)</span>
                <span>2026.02 작성</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Operating Hours */}
      <section id="location" className="px-6 py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-slate-900">오시는 길 및 진료시간</h3>
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-teal-600 shrink-0" />
                  <span><strong>평일:</strong> 09:30 ~ 19:30 (야간진료 / 점심 13:00~14:00)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-teal-600 shrink-0" />
                  <span><strong>토요일:</strong> 09:30 ~ 14:00 (점심시간 없이 연속 진료)</span>
                </p>
                <p className="text-slate-500 text-[11px] pl-6">※ 일요일 및 공휴일 휴진</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-teal-600 shrink-0" />
                  <span>서울시 강남구 테헤란로 123 민트타워 3층 (강남역 5번 출구 100m)</span>
                </p>
                <p className="text-slate-500 text-[11px] pl-6">※ 원내 발렛 파킹 및 지하 주차장 2시간 무료 이용</p>
              </div>
            </div>
          </div>

          <div className="h-64 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 text-xs font-mono shadow-xs">
            [ 네이버/카카오 지도 연동 구역 ]
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 space-y-5 text-slate-800 shadow-2xl relative">
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-teal-700 font-bold">MINT MEDICAL</span>
              <h3 className="text-lg font-bold text-slate-900">진료 예약 문의</h3>
              <p className="text-xs text-slate-600">원하시는 날짜와 연락처를 남겨주시면 담당자가 확인 후 연락드립니다.</p>
            </div>

            {bookingStep === 1 ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBookingStep(2);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block text-slate-700 font-medium mb-1">성함</label>
                  <input
                    required
                    type="text"
                    placeholder="홍길동"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">연락처</label>
                  <input
                    required
                    type="tel"
                    placeholder="010-0000-0000"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">희망 진료 센터</label>
                  <select className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none">
                    <option>피부·성형 센터</option>
                    <option>정밀 건강검진</option>
                    <option>도수·재활 치료</option>
                    <option>면역·항노화 테라피</option>
                  </select>
                </div>
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold mt-2">
                  예약 신청하기
                </Button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">예약 문의가 접수되었습니다</h4>
                <p className="text-xs text-slate-600 break-keep">
                  작성해 주신 연락처로 상담원이 15분 내로 연락드려 확정 예약을 진행해 드립니다.
                </p>
                <Button
                  onClick={() => {
                    setIsBookingOpen(false);
                    setBookingStep(1);
                  }}
                  variant="outline"
                  className="mt-2 text-xs border-slate-300 text-slate-700"
                >
                  닫기
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
