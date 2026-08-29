import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { usePageTitle } from "@/hooks/usePageTitle";

const FAQS = [
  {
    q: "제작 기간은 얼마나 걸리나요?",
    a: "홈페이지 규모와 자료 준비 상태에 따라 다르지만, 일반적인 소상공인 홈페이지 기준 상담부터 배포까지 2~3주 정도 소요됩니다. 업종별 맞춤 홈페이지는 필요한 기능 범위에 따라 상담 시 안내드립니다.",
  },
  {
    q: "제작 비용은 어떻게 되나요?",
    a: "홈페이지 유형에 따라 40만 원부터 시작하며, 업종별 맞춤 홈페이지는 스타터 49만 원 / 프로 99만 원부터입니다(부가세 별도). 정확한 견적은 필요한 페이지 수와 기능에 따라 상담 후 확정됩니다.",
  },
  {
    q: "호스팅과 도메인은 어떻게 하나요?",
    a: "호스팅은 MintCL이 제공합니다. 도메인만 준비해 주시면 연결해 드립니다.",
  },
  {
    q: "제작 후 수정이 필요하면 어떻게 하나요?",
    a: "업종별 맞춤 홈페이지는 문구 수정 등 간단한 요청을 월 3회까지 기본으로 지원합니다. 그 외 홈페이지 유형은 상담 시 유지보수 방법을 안내드립니다.",
  },
  {
    q: "우리 업종에 맞는 기능이 없는데 만들 수 있나요?",
    a: "네, 가능합니다. 업종별 맞춤 제작에 없는 업종이라도 상담을 통해 필요한 기능을 확인하고 맞춤 구성해 드립니다.",
  },
  {
    q: "관리자 페이지는 모든 홈페이지에 포함되나요?",
    a: "기본 제공 기능은 아니며, 운영 형태에 따라 맞춤 옵션으로 추가됩니다. 업종별 맞춤 제작(스타터/프로)에는 관리자 페이지가 포함됩니다.",
  },
];

export default function FAQ() {
  usePageTitle(
    "자주 묻는 질문 — MintCL",
    "제작 기간, 비용, 절차 등 MintCL 홈페이지 제작에 대해 자주 묻는 질문을 안내합니다.",
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-semibold">자주 묻는 질문</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground break-keep">
        제작 기간, 비용, 절차 등 자주 묻는 내용을 정리했습니다. 원하는 답을 찾지 못하셨다면
        언제든 문의해 주세요.
      </p>

      <Accordion type="single" collapsible className="mt-8">
        {FAQS.map((item, i) => (
          <AccordionItem key={item.q} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-sm font-medium">{item.q}</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground break-keep">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">더 궁금한 점이 있으신가요?</p>
        <Button asChild className="mt-4">
          <Link to="/contact">상담 문의하기</Link>
        </Button>
      </div>
    </div>
  );
}
