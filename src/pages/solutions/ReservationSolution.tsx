import { Link } from "react-router-dom";
import { CalendarCheck, CalendarDays, Users, Settings, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";

const FEATURES = [
  {
    icon: CalendarCheck,
    title: "예약접수",
    desc: "고객이 온라인에서 원하는 날짜와 시간에 바로 예약을 접수합니다.",
  },
  {
    icon: CalendarDays,
    title: "일정관리",
    desc: "예약 현황을 달력 형태로 한눈에 확인하고 관리합니다.",
  },
  {
    icon: Users,
    title: "고객관리",
    desc: "예약 이력과 고객 정보를 체계적으로 관리합니다.",
  },
  {
    icon: Settings,
    title: "관리자",
    desc: "예약 승인, 취소 등을 관리자 페이지에서 처리합니다.",
  },
];

export default function ReservationSolution() {
  usePageTitle(
    "예약 / 고객관리 웹 솔루션 — NOVERIQ",
    "예약접수, 일정관리, 고객관리 기능을 갖춘 예약·고객관리 웹 솔루션을 안내합니다.",
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
        WEB SOLUTION
      </p>
      <h1 className="mt-3 text-3xl font-semibold">예약 / 고객관리 웹 솔루션</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        고객이 온라인으로 직접 예약하고, 예약 현황과 고객 정보를 한 곳에서 관리할 수 있는 웹
        솔루션입니다. 병원, 미용실, 스튜디오 등 예약 기반 업종에 적합합니다.
      </p>

      <h2 className="mt-12 text-xl font-semibold">주요 기능</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="flex h-full flex-col items-start gap-3 rounded-xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground break-keep">{f.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          구축비와 월 이용료 등 자세한 요금은 웹 솔루션 요금 페이지에서 확인하실 수 있습니다.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline">
            <Link to="/web-solutions">요금 확인하기</Link>
          </Button>
          <Button asChild className="gap-1.5 font-bold">
            <Link to="/contact">
              <Send className="h-3.5 w-3.5" />
              구축 문의하기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
