import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { FAQ } from "@/lib/faq";

export function FaqSection() {
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-3xl px-4 py-20">
        <SectionHeader label="FAQ" title="자주 묻는 질문" align="center" />
        <FadeIn delay={100}>
          <Accordion type="single" collapsible className="mt-10">
            {FAQ.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
