import { HelpCircle, RefreshCw, Gem, MessageSquareWarning } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { FAQ } from "@/lib/faq";

/**
 * "나한테 맞나?"와 "궁금한 게 있는데"는 결정 직전에 나오는 같은 질문이라 한 밴드에 둔다.
 * 왼쪽은 대상, 오른쪽은 답변 — 카드 네 장을 또 한 줄 깔지 않는다.
 */
const RECOMMENDED_FOR = [
  {
    icon: HelpCircle,
    title: "홈페이지가 처음이신 분",
    desc: "어떤 메뉴와 내용이 필요한지 잘 모르셔도 함께 구성합니다.",
  },
  {
    icon: RefreshCw,
    title: "기존 홈페이지가 오래된 분",
    desc: "PC 중심의 오래된 홈페이지를 모바일 환경에 맞게 개선합니다.",
  },
  {
    icon: Gem,
    title: "브랜드를 제대로 보여주고 싶은 분",
    desc: "단순 정보 전달을 넘어 브랜드 분위기에 맞춰 구성합니다.",
  },
  {
    icon: MessageSquareWarning,
    title: "수정 요청하기 불편했던 분",
    desc: "추후 수정과 확장을 고려해 제작합니다.",
  },
];

export function FaqBand() {
  return (
    <section className="border-y border-border bg-secondary/30 px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* 대상 — 아이콘 박스 카드 대신 밑줄로 나눈 목록 */}
        <div>
          <SectionHeader label="FOR YOU" title="이런 분께 맞습니다" />
          <ul className="mt-8">
            {RECOMMENDED_FOR.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={i * 70}>
                  <li className="flex gap-4 border-b border-border/70 py-5 last:border-b-0">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.6} />
                    <div>
                      <h3 className="text-sm font-bold text-foreground break-keep">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground break-keep">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                </FadeIn>
              );
            })}
          </ul>
        </div>

        {/* 답변 */}
        <div>
          <SectionHeader label="FAQ" title="자주 묻는 질문" />
          <FadeIn delay={100}>
            <Accordion type="single" collapsible className="mt-6">
              {FAQ.map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
