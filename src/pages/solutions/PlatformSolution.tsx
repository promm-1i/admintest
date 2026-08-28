import { Link } from "react-router-dom";
import { Users, ShieldCheck, Database, Briefcase, Plug, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";

const FEATURES = [
  {
    icon: Users,
    title: "회원",
    desc: "회원가입, 로그인 등 회원 시스템을 구축합니다.",
  },
  {
    icon: ShieldCheck,
    title: "권한",
    desc: "관리자·직원·일반회원 등 역할별로 접근 권한을 다르게 설정합니다.",
  },
  {
    icon: Database,
    title: "데이터베이스",
    desc: "필요한 데이터를 체계적으로 저장하고 관리합니다.",
  },
  {
    icon: Briefcase,
    title: "업무관리",
    desc: "실제 업무 흐름에 맞춘 관리 기능을 구축합니다.",
  },
  {
    icon: Plug,
    title: "API 연동",
    desc: "외부 서비스나 시스템과 연동합니다.",
  },
];

export default function PlatformSolution() {
  usePageTitle(
    "플랫폼형 웹서비스 — MintCL",
    "회원, 권한, 데이터베이스, 업무관리, API 연동을 갖춘 플랫폼형 웹서비스 구축을 안내합니다.",
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
        WEB SOLUTION
      </p>
      <h1 className="mt-3 text-3xl font-semibold">플랫폼형 웹서비스</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        홈페이지를 넘어 회원, 권한, 데이터베이스까지 갖춘 실제 업무용 플랫폼을 구축합니다. 정해진
        틀 없이 필요한 업무 흐름에 맞춰 기능을 설계합니다.
      </p>

      <h2 className="mt-12 text-xl font-semibold">주요 기능</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
