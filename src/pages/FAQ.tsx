import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { usePageTitle } from "@/hooks/usePageTitle";
import { listPublishedNotices } from "@/lib/api/notices";

type FaqItem = { q: string; a: string; category: string; link?: { label: string; to: string } };

const CATEGORIES = ["전체", "제작 문의", "비용 · 결제", "유지보수", "관리자 · 기능", "도메인 · 운영"];

const FAQS: FaqItem[] = [
  {
    category: "제작 문의",
    q: "홈페이지 제작기간은 얼마나 걸리나요?",
    a: "기본 구성은 보통 5~10영업일 기준으로 안내드립니다. 자료 준비 상태와 수정 범위에 따라 달라질 수 있습니다.",
  },
  {
    category: "제작 문의",
    q: "홈페이지 제작 전에 무엇을 준비해야 하나요?",
    a: "회사 로고, 회사 기본정보(업체명·연락처·주소 등), 원하는 메뉴 구성, 소개할 서비스·상품 자료가 있으면 좋습니다. 준비가 어려워도 상담하면서 함께 정리할 수 있습니다.",
    link: { label: "제작 방법 자세히 보기", to: "/website/process" },
  },
  { category: "제작 문의", q: "정확한 기획이 없어도 상담할 수 있나요?", a: "네, 괜찮습니다. 업종과 대략적인 목적만 알려주시면 상담 과정에서 필요한 페이지와 기능을 함께 구성합니다." },
  {
    category: "제작 문의",
    q: "템플릿형과 맞춤형은 무엇이 다른가요?",
    a: "템플릿형은 미리 제작된 디자인을 기반으로 정보만 바꿔 빠르게 제작하고, 맞춤형은 사업 구조와 기능부터 새로 설계합니다.",
  },
  { category: "제작 문의", q: "기존 홈페이지 리뉴얼도 가능한가요?", a: "네, 가능합니다. 기존 디자인과 구조를 검토한 뒤 개선 범위를 상담 후 안내드립니다." },
  { category: "제작 문의", q: "모바일 홈페이지도 함께 제작되나요?", a: "네, 모든 홈페이지는 PC · 모바일 반응형으로 기본 제작됩니다." },

  {
    category: "비용 · 결제",
    q: "홈페이지 제작비용은 어떻게 결정되나요?",
    a: "페이지 수, 디자인 난이도, 관리자 기능, 데이터베이스, 회원 · 예약 · 결제 기능 등에 따라 달라집니다.",
    link: { label: "제작 비용 자세히 보기", to: "/website/price" },
  },
  {
    category: "비용 · 결제",
    q: "대표 제작유형별 시작 가격이 궁금해요.",
    a: "원페이지 40만 원부터, 소상공인 50만 원부터, 기업 100만 원부터, 쇼핑몰 200만 원부터 시작합니다.",
    link: { label: "제작 비용 자세히 보기", to: "/website/price" },
  },
  { category: "비용 · 결제", q: "추가 페이지 비용은 어떻게 되나요?", a: "페이지당 5만 원이 추가됩니다." },
  {
    category: "비용 · 결제",
    q: "관리자 기능은 추가 비용이 발생하나요?",
    a: "네, 관리자 기능(공지사항 관리 등)은 10만 원부터 추가되며, 업종별 맞춤 관리자 시스템은 별도 상담 후 견적을 안내드립니다.",
  },
  { category: "비용 · 결제", q: "표시된 금액에 부가세가 포함되어 있나요?", a: "표시 금액은 부가세 별도입니다." },

  {
    category: "유지보수",
    q: "제작 완료 후 수정이 가능한가요?",
    a: "네. 제작 완료 후 일정 기간 기본 지원이 포함되며, 이후에는 작업 범위에 따라 안내드립니다.",
    link: { label: "유지보수 안내 보기", to: "/website/maintenance" },
  },
  { category: "유지보수", q: "어떤 수정이 간단 수정에 해당하나요?", a: "오타, 연락처, 주소, 텍스트 일부, 이미지 교체, 링크 변경 등이 간단 수정에 해당합니다." },
  { category: "유지보수", q: "새로운 페이지를 추가할 수 있나요?", a: "네, 가능합니다. 신규 페이지 추가는 별도 견적으로 진행합니다." },
  { category: "유지보수", q: "기능을 나중에 추가할 수 있나요?", a: "네. 처음에는 기본 홈페이지로 시작하고, 필요할 때 관리자 · 예약 · 결제 등의 기능을 확장할 수 있습니다." },
  {
    category: "유지보수",
    q: "자주 수정하는 내용도 매번 요청해야 하나요?",
    a: "자주 바뀌는 내용이라면 매번 요청하기보다, 직접 관리할 수 있는 관리자 기능을 구축하는 것을 추천드립니다.",
  },

  {
    category: "관리자 · 기능",
    q: "관리자 페이지에서는 무엇을 관리할 수 있나요?",
    a: "공지사항, 콘텐츠, 상품 · 매물 · 차량, 고객 문의, 예약, 일정 등을 관리자 화면에서 직접 관리할 수 있습니다.",
    link: { label: "기능 소개 자세히 보기", to: "/website/features" },
  },
  { category: "관리자 · 기능", q: "고객 문의를 관리자에서 확인할 수 있나요?", a: "네, 홈페이지로 접수된 문의를 관리자 화면에서 확인하고 처리 상태를 관리할 수 있습니다." },
  { category: "관리자 · 기능", q: "예약 기능을 만들 수 있나요?", a: "네, 업종에 맞는 예약 기능을 구축할 수 있습니다." },
  { category: "관리자 · 기능", q: "회원가입과 로그인 기능도 가능한가요?", a: "네, 회원 기능은 확장 기능으로 추가할 수 있습니다." },
  { category: "관리자 · 기능", q: "외부 API 연동도 가능한가요?", a: "네, 필요한 경우 결제, 지도, 문자 등 외부 서비스와 연동할 수 있습니다." },

  { category: "도메인 · 운영", q: "도메인은 누가 소유하나요?", a: "도메인은 고객님 명의로 등록하는 것을 권장하며, NOVERIQ은 연결과 관리를 지원합니다." },
  { category: "도메인 · 운영", q: "기존 도메인을 사용할 수 있나요?", a: "네, 보유하신 도메인이 있다면 그대로 연결해 사용할 수 있습니다." },
  { category: "도메인 · 운영", q: "호스팅은 무엇인가요?", a: "홈페이지가 인터넷에서 24시간 운영되는 서버 공간입니다. NOVERIQ이 대행해서 안내드립니다." },
];

const POPULAR_COUNT = 8;

const INTENTS = [
  { num: "01", title: "새 홈페이지 제작", desc: "제작 방식, 기간, 예상 비용을 안내해드립니다.", to: "/contact" },
  { num: "02", title: "기존 홈페이지 수정", desc: "문구 · 이미지 수정부터 페이지 추가까지 확인해드립니다.", to: "/contact?service=유지보수 / 수정 문의" },
  { num: "03", title: "관리자 · 기능 구축", desc: "예약 · 고객관리 · DB 등 필요한 기능을 상담합니다.", to: "/contact?service=업종별 맞춤 홈페이지" },
];

export default function FAQ() {
  usePageTitle(
    "고객센터 — NOVERIQ",
    "제작 문의, 비용, 유지보수, 관리자 기능, 도메인까지 NOVERIQ 홈페이지 제작에 대해 자주 묻는 질문을 안내합니다.",
  );

  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const { data: notices } = useQuery({ queryKey: ["notices", "published"], queryFn: listPublishedNotices });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((item) => {
      const matchesCategory = category === "전체" || item.category === category;
      const matchesQuery = !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const visible = showAll || query ? filtered : filtered.slice(0, POPULAR_COUNT);

  return (
    <div>
      {/* 01 Hero + 검색 */}
      <div className="mx-auto max-w-3xl px-4 pb-10 pt-14 text-center sm:pt-20">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">CUSTOMER CENTER</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">무엇을 도와드릴까요?</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground break-keep">
          홈페이지 제작부터 운영, 수정, 관리자 기능까지. 자주 묻는 내용을 빠르게 확인해보세요.
        </p>

        <div className="relative mx-auto mt-8 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="예: 제작기간, 관리자, 유지보수, 도메인"
            className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary/50"
          />
        </div>
      </div>

      {/* 02 카테고리 */}
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-b border-border pb-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCategory(c);
                setShowAll(false);
              }}
              className={cnTab(c === category)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 03 FAQ 목록 */}
      <div className="mx-auto max-w-3xl px-4 py-10">
        {visible.length > 0 ? (
          <Accordion type="single" collapsible>
            {visible.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger className="text-left text-sm font-medium">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground break-keep">
                  {item.a}
                  {item.link && (
                    <Link to={item.link.to} className="mt-2 flex items-center gap-1 text-primary hover:underline">
                      {item.link.label}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="py-10 text-center text-sm text-muted-foreground">검색 결과가 없습니다.</p>
        )}

        {!showAll && !query && filtered.length > POPULAR_COUNT && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="text-sm font-medium text-primary hover:underline"
            >
              질문 더 보기 ({filtered.length - POPULAR_COUNT})
            </button>
          </div>
        )}
      </div>

      {/* 04 못 찾으셨나요 */}
      <div className="border-y border-border bg-secondary/30 py-10 text-center">
        <p className="text-sm font-semibold text-foreground">찾으시는 답변이 없나요?</p>
        <p className="mt-1.5 text-sm text-muted-foreground break-keep">궁금한 내용을 남겨주시면 확인 후 안내드립니다.</p>
        <Link
          to="/contact"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          1:1 문의하기
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 05 문의 목적 선택 */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        <h2 className="text-xl font-bold text-foreground">어떤 도움이 필요하신가요?</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {INTENTS.map((intent) => (
            <Link key={intent.num} to={intent.to} className="group border-t-2 border-foreground pt-4">
              <span className="font-mono text-2xl font-bold text-primary/30">{intent.num}</span>
              <h3 className="mt-2 text-base font-bold text-foreground">{intent.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground break-keep">{intent.desc}</p>
              <span className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
                문의하기
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 06 공지사항 */}
      {notices && notices.length > 0 && (
        <div className="border-t border-border bg-secondary/30 py-14">
          <div className="mx-auto max-w-3xl px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">공지사항</h2>
              <Link to="/notices" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                전체 공지 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <ul className="mt-5 divide-y divide-border border-t border-border">
              {notices.slice(0, 3).map((n) => (
                <li key={n.id}>
                  <Link to={`/notices/${n.id}`} className="flex items-center justify-between gap-4 py-3.5 text-sm hover:text-primary">
                    <span className="truncate text-foreground">{n.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {new Date(n.created_at).toLocaleDateString("ko-KR")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-14 text-center">
        <Button asChild size="lg" className="gap-2 font-bold">
          <Link to="/contact">
            <Send className="h-4 w-4" />
            상담 문의하기
          </Link>
        </Button>
      </div>
    </div>
  );
}

function cnTab(active: boolean) {
  return active
    ? "border-b-2 border-foreground pb-3 -mb-[1px] text-sm font-bold text-foreground"
    : "border-b-2 border-transparent pb-3 -mb-[1px] text-sm text-muted-foreground transition-colors hover:text-foreground";
}
