import { useState } from "react";
import { Utensils, Clock, Phone, Check, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import heroImg from "@/assets/images/korean_restaurant_no_people_1786182882900.jpg";
import sotbapImg from "@/assets/images/sotbap_hansang_1786182575903.jpg";
import bulgogiImg from "@/assets/images/pork_bulgogi_1786182586969.jpg";
import galbijjimImg from "@/assets/images/galbijjim_set_1786182598023.jpg";
import bossamImg from "@/assets/images/bossam_suyuk_1786182610418.jpg";
import tilefishImg from "@/assets/images/grilled_tilefish_1786182623407.jpg";
import pajeonImg from "@/assets/images/seafood_pajeon_1786182632936.jpg";
import yukhoeImg from "@/assets/images/yukhoe_tartare_1786182643079.jpg";
import dessertImg from "@/assets/images/sujeonggwa_dessert_1786182655388.jpg";

export function RestaurantPreview() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [orderCount, setOrderCount] = useState(0);
  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "2명",
  });
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: "all", name: "전체 메뉴" },
    { id: "signature", name: "대표 정갈한 한상" },
    { id: "seasonal", name: "계절 제철 특선" },
    { id: "side", name: "곁들임 및 일품요리" },
    { id: "drinks", name: "전통 음료 및 주류" },
  ];

  const menuItems = [
    {
      cat: "signature",
      title: "강원도 산나물 솥밥 한상",
      desc: "당일 수급한 정갈한 제철 산나물과 고소한 들기름, 방앗간 직송 쌀로 지은 가마솥 솥밥과 7첩 반상",
      price: "16,000원",
      image: sotbapImg,
      tag: "인기 No.1",
    },
    {
      cat: "signature",
      title: "직화 돼지불고기 & 유기농 쌈채소 정식",
      desc: "은은한 참숯 직화 향의 특제 양념 돼지불고기와 당일 농장에서 직송된 싱싱한 유기농 모둠 쌈채소",
      price: "18,000원",
      image: bulgogiImg,
      tag: "강력 추천",
    },
    {
      cat: "signature",
      title: "궁중 소갈비찜 정식",
      desc: "수제 과일 소스로 12시간 저온 숙성하여 야들야들 부드럽게 고아낸 다온 특제 궁중 갈비찜",
      price: "29,000원",
      image: galbijjimImg,
      tag: "대표 보양식",
    },
    {
      cat: "seasonal",
      title: "봄 미나리 암돼지 통삼겹 수육",
      desc: "향긋한 봄 미나리와 부드럽게 삶아낸 국내산 암돼지 삼겹 보쌈 및 수제 보쌈김치",
      price: "32,000원",
      image: bossamImg,
      tag: "봄 한정",
    },
    {
      cat: "seasonal",
      title: "제주 옥돔 구이 & 능이버섯 탕",
      desc: "제주 산지 직송 옥돔 구이와 은은한 향이 일품인 능이버섯 맑은 탕 한상차림",
      price: "35,000원",
      image: tilefishImg,
      tag: "제철 특선",
    },
    {
      cat: "side",
      title: "바싹 해물 파전",
      desc: "통통한 문어와 새우, 찰쪽파를 듬뿍 넣어 노릇하고 바삭하게 지져낸 잔치 파전",
      price: "18,000원",
      image: pajeonImg,
      tag: "안주 추천",
    },
    {
      cat: "side",
      title: "한우 육회 & 배 침채",
      desc: "최상급 1++ 한우 우둔살에 수제 참기름과 아삭한 나주 배를 곁들인 별미",
      price: "25,000원",
      image: yukhoeImg,
      tag: "신선 별미",
    },
    {
      cat: "drinks",
      title: "수제 수정과 & 수제 양갱 세트",
      desc: "알싸한 계피 향과 곶감의 단맛이 깊은 수제 수정과와 밤 양갱 후식",
      price: "7,000원",
      image: dessertImg,
      tag: "디저트",
    },
  ];

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter((item) => item.cat === activeCategory);

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservation.name || !reservation.phone || !reservation.date) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#fcf9f2] text-stone-900 font-sans rounded-2xl overflow-hidden border border-amber-900/10 shadow-2xl">
      {/* Top Banner Header */}
      <div className="bg-amber-950 text-amber-200 text-xs py-2 px-6 text-center font-serif tracking-wider border-b border-amber-900/40">
        🌿 당일 아침 산지 직송 식재료로 정갈하게 지어내는 단정한 한식당
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md text-stone-100 px-6 py-4 flex items-center justify-between border-b border-stone-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-bold text-xl font-serif shadow-inner">
            다
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight font-serif text-amber-100 block">
              다온 한식당
            </span>
            <span className="text-[10px] block text-amber-400/80 tracking-widest font-mono">DAON KOREAN DINING</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-xs font-serif tracking-widest text-stone-300">
          <a href="#story" className="hover:text-amber-400 transition-colors">브랜드 스토리</a>
          <a href="#principles" className="hover:text-amber-400 transition-colors">3대 철학</a>
          <a href="#menu" className="hover:text-amber-400 transition-colors">정갈한 메뉴판</a>
          <a href="#reserve" className="hover:text-amber-400 transition-colors">예약 문의</a>
          <a href="#info" className="hover:text-amber-400 transition-colors">오시는 길</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#reserve"
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-4 py-2 rounded-full transition-all shadow-md flex items-center gap-1.5 font-serif"
          >
            <Utensils className="h-3.5 w-3.5" /> 룸/단체 예약 {orderCount > 0 && `(담기 ${orderCount})`}
          </a>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative min-h-[480px] sm:min-h-[580px] flex items-center justify-center text-center px-6 py-20 bg-stone-950 text-white overflow-hidden">
        <img
          src={heroImg}
          alt="다온한식당 전경"
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />

        <div className="relative max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/40 px-4 py-1.5 text-xs font-semibold text-amber-300 tracking-widest font-mono">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" /> TRADITIONAL KOREAN TABLE
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-amber-50 leading-tight break-keep">
            정성껏 지어내는 한 그릇의 온기,<br />
            제철 식재료로 차려낸 깊은 정갈함
          </h1>
          <p className="text-sm text-stone-300 max-w-xl mx-auto break-keep leading-relaxed font-serif">
            방앗간에서 직접 짜낸 고소한 들기름, 강원도 산지의 무농약 나물, 정성껏 다린 가마솥 밥. 다온에서 소중한 사람들과 따뜻한 정성을 나누세요.
          </p>
          <div className="pt-3 flex flex-wrap justify-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-7 py-3 text-xs font-bold text-stone-950 hover:bg-amber-400 transition-all shadow-xl"
            >
              차림표 살펴보기
            </a>
            <a
              href="#reserve"
              className="inline-flex items-center justify-center rounded-full border border-stone-600 bg-stone-900/80 px-6 py-3 text-xs font-medium text-amber-200 hover:bg-stone-800 transition-all"
            >
              <Calendar className="h-3.5 w-3.5 mr-1.5 text-amber-400" /> 실시간 예약 신청
            </a>
          </div>
        </div>
      </section>

      {/* Brand Story & 3 Principles */}
      <section id="story" className="max-w-6xl mx-auto px-6 py-20 border-b border-amber-900/10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono text-amber-800 font-bold uppercase tracking-widest">BRAND PHILOSOPHY</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-snug">
              "음식은 곧 만드는 사람의 <br />마음가짐입니다."
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed break-keep font-serif">
              다온 한식당은 인공조미료의 자극적인 맛을 내려놓고, 원재료 본연의 자연스러운 단맛과 고소함을 살려냅니다. 매일 새벽 장을 보고 식재료를 엄선하는 고집스러운 정성이 한 상 위의 감동으로 이어집니다.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-amber-100/60 border border-amber-200/80">
                <div className="text-2xl font-serif font-bold text-amber-900">100%</div>
                <div className="text-xs font-medium text-stone-700 mt-1">당일 수급 산지 직송 식재료</div>
              </div>
              <div className="p-4 rounded-xl bg-amber-100/60 border border-amber-200/80">
                <div className="text-2xl font-serif font-bold text-amber-900">프라이빗 룸</div>
                <div className="text-xs font-medium text-stone-700 mt-1">4인~24인 단독 룸 보유</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 relative">
            <img
              src={sotbapImg}
              alt="산나물 솥밥"
              className="rounded-2xl object-cover h-64 w-full shadow-md"
            />
            <img
              src={galbijjimImg}
              alt="궁중 소갈비찜"
              className="rounded-2xl object-cover h-64 w-full shadow-md mt-6"
            />
          </div>
        </div>
      </section>

      {/* Menu Catalog */}
      <section id="menu" className="max-w-6xl mx-auto px-6 py-20 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono text-amber-800 font-bold uppercase tracking-widest">DAON MENU CATALOG</span>
          <h2 className="text-3xl font-serif font-bold text-stone-900">다온 정갈한 차림표</h2>
          <p className="text-xs text-stone-600 max-w-lg mx-auto">
            각 메뉴 이름에 꼭 맞는 정갈하고 정성스런 음식 사진입니다. 클릭하여 담아보세요.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-serif transition-all ${
                activeCategory === cat.id
                  ? "bg-amber-900 text-amber-100 font-bold shadow-md scale-105"
                  : "bg-amber-100/80 text-stone-800 hover:bg-amber-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid - Generous card proportions */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-xl hover:border-amber-500/60 transition-all duration-300"
            >
              <div className="sm:w-2/5 h-52 sm:h-auto relative overflow-hidden bg-stone-100 shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute top-3 left-3 rounded-md bg-stone-950/90 text-amber-300 px-2.5 py-1 text-[11px] font-bold font-mono shadow-sm">
                  {item.tag}
                </span>
              </div>

              <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold font-serif text-lg text-stone-900 group-hover:text-amber-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed break-keep font-serif">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="font-bold text-base text-amber-900 font-serif">{item.price}</span>
                  <Button
                    size="sm"
                    onClick={() => setOrderCount((prev) => prev + 1)}
                    className="bg-amber-800 hover:bg-amber-900 text-amber-100 text-xs px-4 rounded-full font-serif"
                  >
                    포장 담기 <Check className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation Form Section */}
      <section id="reserve" className="bg-stone-900 text-stone-100 px-6 py-20">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">ONLINE RESERVATION</span>
            <h2 className="text-3xl font-serif font-bold text-amber-50">프라이빗 룸 & 단체 예약</h2>
            <p className="text-xs text-stone-300 leading-relaxed font-serif">
              상견례, 돌잔치, 정갈한 가족 모임을 위한 단독 룸이 준비되어 있습니다. 사전에 예약하시면 맞춤 세팅을 도와드립니다.
            </p>
            <div className="pt-2 space-y-2 text-xs text-amber-200 font-serif">
              <p className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400" /> 4인 ~ 24인 프라이빗 방음 룸</p>
              <p className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400" /> 주차 가능 (1시간 무료 지원)</p>
              <p className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400" /> 콜키지 프립 문의 가능</p>
            </div>
          </div>

          <div className="bg-stone-800/90 border border-stone-700 p-6 rounded-2xl shadow-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="h-12 w-12 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
                <h3 className="text-lg font-serif font-bold text-white">예약 신청이 접수되었습니다!</h3>
                <p className="text-xs text-stone-300 font-serif">확인 후 10분 내로 안내 문자를 발송해 드립니다.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs text-amber-400 underline font-serif"
                >
                  새 예약 작성하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleReservation} className="space-y-4 text-xs font-serif">
                <div>
                  <label className="block text-stone-300 mb-1">성함</label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={reservation.name}
                    onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
                    className="w-full rounded-lg bg-stone-900 border border-stone-700 px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">연락처</label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={reservation.phone}
                    onChange={(e) => setReservation({ ...reservation, phone: e.target.value })}
                    className="w-full rounded-lg bg-stone-900 border border-stone-700 px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 mb-1">예약 날짜</label>
                    <input
                      type="date"
                      required
                      value={reservation.date}
                      onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                      className="w-full rounded-lg bg-stone-900 border border-stone-700 px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 mb-1">인원 수</label>
                    <select
                      value={reservation.guests}
                      onChange={(e) => setReservation({ ...reservation, guests: e.target.value })}
                      className="w-full rounded-lg bg-stone-900 border border-stone-700 px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option>2명</option>
                      <option>3~4명</option>
                      <option>5~8명 (룸)</option>
                      <option>10인 이상 (대관)</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition-colors font-serif text-xs mt-2"
                >
                  예약 신청하기
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <footer id="info" className="bg-stone-950 text-stone-400 px-6 py-12 border-t border-stone-800 text-xs font-serif">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          <div>
            <h4 className="font-bold text-amber-200 text-base mb-3 font-serif">다온 한식당</h4>
            <p className="leading-relaxed text-stone-400">
              서울 종로구 인사동길 45 (안국역 6번 출구) <br />
              사업자등록번호: 120-88-98765 | 대표자: 김다온
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-amber-200 text-base mb-3 font-serif">영업시간</h4>
            <p className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              <span>매일 11:30 - 21:30 (Break 15:00 - 17:00)</span>
            </p>
            <p className="text-stone-500">라스트 오더: 점심 14:15 / 저녁 20:30</p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-amber-200 text-base mb-3 font-serif">예약 및 문의</h4>
            <p className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-mono text-stone-200">02-9876-5432</span>
            </p>
            <p className="text-stone-500">포장주문 및 대관 문의 가능</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
