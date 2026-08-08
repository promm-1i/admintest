import { useState } from "react";
import { Sparkles, MessageCircle, Phone } from "lucide-react";

import skincareImg from "@/assets/images/beauty_skincare_1786182932542.jpg";
import nailImg from "@/assets/images/beauty_nail_1786182945465.jpg";
import directorImg from "@/assets/images/beauty_director_1786182960278.jpg";

export function BeautyPreview() {
  const [activeTab, setActiveTab] = useState("all");

  const services = [
    {
      id: "s1",
      cat: "skincare",
      name: "아쿠아 수분 윤광 스킨케어",
      price: "110,000원",
      time: "70분",
      desc: "모공 청결 관리부터 깊은 속건조 해소까지, 천연 오가닉 세럼을 이용한 1:1 피부 밀착 케어",
      image: skincareImg,
      tag: "베스트셀러",
    },
    {
      id: "s2",
      cat: "skincare",
      name: "프리미엄 페이셜 윤곽 림프 테라피",
      desc: "얼굴 림프 순환을 돕는 아로마 오일 테라피와 윤곽 탄력 개선 프로그램",
      price: "150,000원",
      time: "90분",
      tag: "강력 추천",
      image: skincareImg,
    },
    {
      id: "s3",
      cat: "nail",
      name: "시그니처 은하수 시럽 젤 네일",
      price: "65,000원",
      time: "60분",
      desc: "은은하고 영롱하게 빛나는 수제 글리터 파츠 조합과 오랫동안 유지되는 안심 케어",
      image: nailImg,
      tag: "인기 네일",
    },
    {
      id: "s4",
      cat: "lash",
      name: "노글루 블랙 틴팅 래쉬펌",
      price: "45,000원",
      time: "50분",
      desc: "속눈썹 손상을 최소화하는 영양 케라틴 영양제 포함, 바짝 올라가는 또렷한 컬링",
      image: skincareImg,
      tag: "재방문 1위",
    },
  ];

  const filteredServices = activeTab === "all" ? services : services.filter(s => s.cat === activeTab);

  return (
    <div className="w-full bg-[#fdfbf7] text-stone-800 font-sans rounded-2xl overflow-hidden border border-rose-100 shadow-2xl">
      {/* Aesthetic Top Marquee Notice */}
      <div className="bg-rose-900 text-rose-100 text-[11px] py-2 px-6 text-center font-serif tracking-widest uppercase">
        ✧ 100% 프라이빗 1:1 사전 예약제 아뜰리에 에스테틱 & 뷰티 스튜디오 ✧
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#fdfbf7]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-rose-100">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-rose-400" />
          <span className="font-serif font-bold text-xl tracking-wide text-rose-950">
            MAISON DE BEAUTÉ
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-xs font-serif text-stone-600 tracking-wider">
          <a href="#about" className="hover:text-rose-500 transition-colors">아뜰리에 소개</a>
          <a href="#services" className="hover:text-rose-500 transition-colors">프로그램 & 케어</a>
          <a href="#artist" className="hover:text-rose-500 transition-colors">아티스트</a>
          <a href="#reviews" className="hover:text-rose-500 transition-colors">고객 후기</a>
          <a href="#location" className="hover:text-rose-500 transition-colors">위치 안내</a>
        </nav>

        <a
          href="https://pf.kakao.com"
          target="_blank"
          rel="noreferrer"
          className="bg-rose-500 hover:bg-rose-600 text-white font-serif text-xs px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5"
        >
          <MessageCircle className="h-3.5 w-3.5" /> 카톡 간편 예약
        </a>
      </header>

      {/* Hero Banner */}
      <section className="relative px-6 py-20 lg:py-28 overflow-hidden bg-rose-50/40">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-serif tracking-wider">
              ✦ PRIVATE BEAUTY ATELIER
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-rose-950 leading-tight">
              당신의 본연의 빛을 <br />
              가장 아름답게 깨우는 시간
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-serif break-keep">
              바쁜 일상에서 벗어나 감각적인 프라이빗 전용 공간에서 나만을 위한 섬세한 뷰티 테라피를 경험해 보세요.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <a
                href="#services"
                className="px-7 py-3 bg-rose-900 text-rose-50 text-xs font-serif rounded-full hover:bg-rose-800 transition-all shadow-lg"
              >
                시술 안내 보기
              </a>
              <a
                href="https://pf.kakao.com"
                className="px-6 py-3 border border-rose-300 text-rose-900 text-xs font-serif rounded-full hover:bg-rose-100/50 transition-all"
              >
                1:1 카톡 상담
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src={skincareImg}
              alt="에스테틱 시술"
              className="rounded-3xl shadow-2xl object-cover h-[380px] w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-rose-100 space-y-1 font-serif">
              <div className="text-xl font-bold text-rose-900">100% 사전예약제</div>
              <div className="text-xs text-stone-500">1인 전용 프라이빗 룸 완비</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-20 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-serif text-rose-700 tracking-widest uppercase">CARE PROGRAM</span>
          <h2 className="text-3xl font-serif font-bold text-stone-900">프리미엄 뷰티 프로그램</h2>
          <p className="text-xs text-stone-600 max-w-md mx-auto font-serif">
            피부 타입과 니즈에 맞추어 전문 피부관리사가 진행하는 차별화된 케어를 만나보세요.
          </p>
        </div>

        {/* Filter Category */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2 rounded-full text-xs font-serif transition-all ${
              activeTab === "all" ? "bg-rose-900 text-white font-bold" : "bg-rose-100/60 text-stone-700"
            }`}
          >
            전체 프로그램
          </button>
          <button
            onClick={() => setActiveTab("skincare")}
            className={`px-5 py-2 rounded-full text-xs font-serif transition-all ${
              activeTab === "skincare" ? "bg-rose-900 text-white font-bold" : "bg-rose-100/60 text-stone-700"
            }`}
          >
            피부 & 윤곽 케어
          </button>
          <button
            onClick={() => setActiveTab("nail")}
            className={`px-5 py-2 rounded-full text-xs font-serif transition-all ${
              activeTab === "nail" ? "bg-rose-900 text-white font-bold" : "bg-rose-100/60 text-stone-700"
            }`}
          >
            아트 젤 네일
          </button>
          <button
            onClick={() => setActiveTab("lash")}
            className={`px-5 py-2 rounded-full text-xs font-serif transition-all ${
              activeTab === "lash" ? "bg-rose-900 text-white font-bold" : "bg-rose-100/60 text-stone-700"
            }`}
          >
            속눈썹 테라피
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredServices.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-rose-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
            >
              <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden bg-rose-50 shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-rose-950/80 text-rose-100 px-2.5 py-0.5 rounded text-[10px] font-serif">
                  {item.tag}
                </span>
              </div>

              <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-rose-950 group-hover:text-rose-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed font-serif break-keep">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-rose-100 flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-rose-900">{item.price}</span>
                  <span className="text-xs text-stone-400 font-serif">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artist Intro Section */}
      <section id="artist" className="bg-rose-50/50 py-20 px-6 border-y border-rose-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <img
            src={directorImg}
            alt="원장 프로필"
            className="w-48 h-48 rounded-full object-cover shadow-xl border-4 border-white"
          />
          <div className="space-y-4 text-center md:text-left font-serif">
            <span className="text-xs font-mono text-rose-700 uppercase tracking-widest">DIRECTOR</span>
            <h3 className="text-2xl font-bold text-rose-950">아티스트 유진 원장</h3>
            <p className="text-xs text-stone-600 leading-relaxed break-keep">
              "피부는 감춰야 할 대상이 아닌, 자신감을 더해주는 가장 아름다운 바탕입니다. 한 분 한 분과의 정성스런 소통을 통해 가장 잘 어울리는 화사함을 찾아드리겠습니다."
            </p>
            <div className="text-xs text-rose-900 space-y-1">
              <p>· 국가 공인 피부미용/메이크업 자격 보유</p>
              <p>· 前 청담 아뜰리에 수석 테라피스트 12년 경력</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-serif text-rose-700 tracking-widest uppercase">REVIEWS</span>
          <h2 className="text-3xl font-serif font-bold text-stone-900">리얼 고객 방문 후기</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-rose-100 space-y-3 font-serif">
            <div className="text-rose-400 text-xs">★★★★★</div>
            <p className="text-xs text-stone-600 leading-relaxed">
              "피부가 진짜 예민해서 붉어지기 쉬운데 아쿠아 윤광 관리 받고 속건조가 싹 사라졌어요. 1:1 룸이라 너무 편해요!"
            </p>
            <span className="text-[11px] text-stone-400 block pt-2 border-t border-rose-50">박O아 님 (스킨케어)</span>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-rose-100 space-y-3 font-serif">
            <div className="text-rose-400 text-xs">★★★★★</div>
            <p className="text-xs text-stone-600 leading-relaxed">
              "시럽 젤 네일 디자인 추천받아서 했는데 손톱 모양도 너무 예쁘게 잘 잡아주시고 4주 넘게 안 깨지고 유지돼요!"
            </p>
            <span className="text-[11px] text-stone-400 block pt-2 border-t border-rose-50">최O윤 님 (젤네일)</span>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-rose-100 space-y-3 font-serif">
            <div className="text-rose-400 text-xs">★★★★★</div>
            <p className="text-xs text-stone-600 leading-relaxed">
              "속눈썹 펌 주기적으로 받는 곳입니다. 틴팅 같이 들어가서 뷰러 안 해도 눈이 너무 또렷해 보여서 대만족입니다."
            </p>
            <span className="text-[11px] text-stone-400 block pt-2 border-t border-rose-50">김O서 님 (래쉬펌)</span>
          </div>
        </div>
      </section>

      {/* Location */}
      <footer id="location" className="bg-rose-950 text-rose-100 px-6 py-12 border-t border-rose-900 font-serif">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-xs">
          <div>
            <h4 className="font-bold text-lg text-white mb-3">MAISON DE BEAUTÉ</h4>
            <p className="text-rose-300 leading-relaxed">
              서울시 성동구 성수이로 88 아뜰리에 빌딩 2층 <br />
              (성수역 3번 출구 도보 3분)
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-lg text-white mb-3">영업시간</h4>
            <p>100% 사전 예약제 (당일 카톡 예약 문의)</p>
            <p className="text-rose-300">화~일: 10:00 ~ 21:00 (월요일 휴무)</p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-lg text-white mb-3">예약 문의</h4>
            <p className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-rose-400" />
              <span>010-8888-7777</span>
            </p>
            <p className="text-rose-300">카카오톡 채널: @메종드뷰티</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
