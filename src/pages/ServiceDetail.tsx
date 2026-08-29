import { Link, useParams } from "react-router-dom";
import { Send, Check, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CUSTOM_SERVICES, getCustomService } from "@/components/site/customServices";
import NotFound from "@/pages/NotFound";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getCustomService(slug) : undefined;

  usePageTitle(
    service ? `${service.title} — MintCL` : "서비스를 찾을 수 없습니다 — MintCL",
    service?.desc,
  );

  if (!service) return <NotFound />;

  const Icon = service.icon;
  const others = CUSTOM_SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 pb-10 pt-14 sm:pt-20">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">CUSTOM SERVICE</p>
        <div className="mt-4 flex items-center gap-3">
          <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{service.title}</h1>
        </div>
        <p className="mt-4 text-lg font-medium text-foreground break-keep">{service.tagline}</p>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground break-keep">{service.desc}</p>
        <div className="mt-8">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              구축 상담하기
            </Link>
          </Button>
        </div>
      </div>

      <div className="border-y border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-lg font-bold text-foreground">포함 항목</h2>
          <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground break-keep">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {service.examples.length > 0 && (
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="text-lg font-bold text-foreground">실제로 이렇게 구축되어 있습니다</h2>
          <div className="mt-5 flex flex-col gap-2.5">
            {service.examples.map((ex) => (
              <a
                key={ex.href}
                href={ex.href}
                target={ex.href.startsWith("http") || ex.href.includes("/demo") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm transition-colors hover:border-primary/40"
              >
                <span className="font-medium text-foreground">{ex.label}</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">다른 맞춤형 서비스</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {others.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {s.navLabel}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-border bg-secondary/30 py-14 text-center">
        <div className="mx-auto max-w-md px-4">
          <p className="text-base font-bold text-foreground break-keep">필요한 범위만 골라 구축할 수 있습니다.</p>
          <p className="mt-2 text-sm text-muted-foreground break-keep">
            업종과 필요한 기능을 알려주시면 적합한 구성과 예상 비용을 안내드립니다.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild className="gap-2 font-bold">
              <Link to="/contact">
                <Send className="h-4 w-4" />
                구축 상담하기
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-1.5">
              <Link to="/website/features">
                전체 기능 소개 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
