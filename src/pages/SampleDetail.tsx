import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { getSampleBySlug } from "@/lib/samples";
import { usePageTitle } from "@/hooks/usePageTitle";
import NotFound from "@/pages/NotFound";
import {
  Monitor,
  Smartphone,
  Eye,
  FileText,
  ArrowLeft,
  CheckCircle2,
  Send,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { KAKAO_CHANNEL_URL } from "@/lib/contact";

import { HospitalPreview } from "@/components/samples/HospitalPreview";
import { RestaurantPreview } from "@/components/samples/RestaurantPreview";
import { BeautyPreview } from "@/components/samples/BeautyPreview";
import { InteriorPreview } from "@/components/samples/InteriorPreview";
import { CleaningPreview } from "@/components/samples/CleaningPreview";
import { CorporatePreview } from "@/components/samples/CorporatePreview";
import { ExternalSitePreview } from "@/components/samples/ExternalSitePreview";
import { RealEstateBasicPreview } from "@/components/samples/RealEstateBasicPreview";
import { RealEstateLandingPreview } from "@/components/samples/RealEstateLandingPreview";
import { Reveal, RevealScale } from "@/pages/services/previewKit";
import { TemplateSpecPanel } from "@/components/site/TemplateSpecPanel";
import { PricingComparison } from "@/components/site/PricingComparison";
import { cn } from "@/lib/utils";

export default function SampleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const sample = slug ? getSampleBySlug(slug) : undefined;

  const [viewTab, setViewTab] = useState<"preview" | "overview">("preview");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  usePageTitle(
    sample
      ? sample.industryKey
        ? `${sample.title} — NOVERIQ`
        : `${sample.industry} 실시간 미리보기 — NOVERIQ`
      : "포트폴리오를 찾을 수 없습니다 — NOVERIQ",
    sample?.purpose,
  );

  if (!sample) return <NotFound />;
  if (sample.detailHref) return <Navigate to={sample.detailHref} replace />;

  // 템플릿 항목은 포트폴리오가 아니라 /templates 목록에서 넘어오므로 되돌아가는 링크도 그쪽으로 보낸다.
  const isTemplate = Boolean(sample.industryKey);
  const templateStyle = sample.type.includes("landing-template") ? "landing-template" : "basic-template";

  const renderSamplePreview = () => {
    if (sample.liveUrl) return <ExternalSitePreview url={sample.liveUrl} />;

    switch (sample.slug) {
      case "hospital":
        return <HospitalPreview />;
      case "korean-restaurant":
        return <RestaurantPreview />;
      case "beauty":
        return <BeautyPreview />;
      case "interior-construction":
        return <InteriorPreview />;
      case "move-in-cleaning":
        return <CleaningPreview />;
      case "corporate":
        return <CorporatePreview />;
      case "real-estate-basic-template":
        return <RealEstateBasicPreview />;
      case "real-estate-landing-template":
        return <RealEstateLandingPreview />;
      default:
        return <HospitalPreview />;
    }
  };

  return (
    <div
      className={cn(
        "mx-auto py-10 lg:py-14",
        // 템플릿은 실제 화면을 크게 보여주는 게 목적이라 좌우 여백을 최대한 줄인다.
        isTemplate ? "max-w-[1720px] px-3 sm:px-5 lg:px-8" : "max-w-6xl px-4 sm:px-6",
      )}
    >
      {/* Top Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <Link
            to={isTemplate ? `/templates?style=${templateStyle}` : "/samples"}
            className="inline-flex items-center text-xs font-semibold text-primary hover:underline mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            {isTemplate ? "전체 템플릿 목록으로" : "전체 포트폴리오 목록으로"}
          </Link>
          <div className="flex items-center gap-2">
            <span className="rounded bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {sample.industry}
            </span>
            <span className="text-xs text-muted-foreground">{sample.tag}</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl text-foreground break-keep">
            {sample.title}
          </h1>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex rounded-lg border border-border bg-card p-1 text-xs">
            <button
              onClick={() => setViewTab("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all ${
                viewTab === "preview"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="h-3.5 w-3.5" /> 실제 사이트 화면
            </button>
            <button
              onClick={() => setViewTab("overview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all ${
                viewTab === "overview"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-3.5 w-3.5" /> 제작 구성 가이드
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewTab === "preview" ? (
        <div
          className={cn(
            "mt-8",
            isTemplate ? "grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start" : "space-y-6",
          )}
        >
          <div className="space-y-6">
          {/* Device Frame Controls & Info Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border bg-secondary/30 px-5 py-3.5">
            {sample.liveUrl ? (
              <p className="text-xs text-muted-foreground break-keep">
                💡 실제로 배포된 사이트입니다. 화면 안 미리보기는 좁게 잘려 보일 수 있으니,{" "}
                <strong>새 탭에서 직접 방문</strong>하시면 원래 화면 그대로 보실 수 있습니다.
              </p>
            ) : (
              <p className="text-xs text-muted-foreground break-keep">
                💡 실제 고객 연결 동선(예약, 메뉴판, 카카오톡 상담)을 모방한 <strong>실시간 인터랙티브 데모</strong>입니다.
              </p>
            )}

            <div className="flex items-center gap-2 text-xs shrink-0">
              {sample.liveUrl && (
                <a
                  href={sample.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> 실제 웹사이트 방문하기
                </a>
              )}
              <span className="text-muted-foreground font-medium hidden sm:inline">화면 크기:</span>
              <button
                onClick={() => setDevice("desktop")}
                className={`flex items-center gap-1 px-3 py-1 rounded border transition-colors ${
                  device === "desktop"
                    ? "border-primary bg-card text-primary font-semibold"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Monitor className="h-3.5 w-3.5" /> 데스크톱
              </button>
              <button
                onClick={() => setDevice("mobile")}
                className={`flex items-center gap-1 px-3 py-1 rounded border transition-colors ${
                  device === "mobile"
                    ? "border-primary bg-card text-primary font-semibold"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" /> 모바일
              </button>
            </div>
          </div>

          {/* Interactive Live Website Frame Wrapper */}
          <RevealScale className="flex justify-center">
            <div
              className={`w-full transition-all duration-500 ${
                device === "mobile" ? "max-w-md my-4 shadow-2xl rounded-2xl border-4 border-slate-800" : "max-w-full"
              }`}
            >
              {renderSamplePreview()}
            </div>
          </RevealScale>
          </div>

          {isTemplate && (
            <div className="xl:sticky xl:top-24">
              <TemplateSpecPanel sample={sample} />
            </div>
          )}
        </div>
      ) : (
        /* Plan Overview Tab */
        <div className="mt-8 space-y-8">
          <Reveal>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-3xl break-keep">
              {sample.purpose}
            </p>
          </Reveal>

          <Reveal delay={80} className="rounded-xl border border-border bg-card p-6 shadow-xs">
            <ImagePlaceholder
              src={sample.image}
              ratio="wide"
              label={`${sample.industry} 포트폴리오 대표 이미지`}
            />
          </Reveal>

          <div className="grid gap-8 border-t border-border pt-8 md:grid-cols-2">
            <Reveal delay={140}>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">주요 구성 및 특징</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {sample.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground font-medium">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200} className="md:border-l md:border-border md:pl-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">추천 대상</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground break-keep">{sample.idealFor}</p>
            </Reveal>
          </div>
        </div>
      )}

      {/* 템플릿 요금제 비교 (템플릿 상세에서만) */}
      {isTemplate && (
        <Reveal className="mt-16 rounded-2xl border border-border bg-card p-6 shadow-xs sm:p-8">
          <PricingComparison />
        </Reveal>
      )}

      {/* Bottom CTA Box */}
      <div className="mt-14 rounded-2xl border border-border bg-card p-8 text-center shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-foreground">
          이 구성과 스타일로 제작을 원하시나요?
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto break-keep">
          원하시는 문구, 로고, 색상, 메뉴 구성을 전달해 주시면 노베릭에서 빠르게 맞춤 제작해 드립니다.
        </p>
        <div className="pt-2 flex flex-col items-center gap-3">
          {/* Top row: 제작상담 & 카카오톡 */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="font-bold gap-2 shadow-sm">
              <Link to="/contact">
                <Send className="h-4 w-4" />
                {sample.industry} 제작 상담하기
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#FEE500] text-[#191919] hover:bg-[#FADA00] font-bold border-none shadow-sm gap-2"
            >
              <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 fill-[#191919]" />
                카카오톡 문의
              </a>
            </Button>
          </div>
          {/* Bottom row: 포트폴리오 다시보기 / 목록 */}
          <div className="mt-1 flex justify-center">
            <Button asChild variant="ghost" size="lg" className="font-semibold text-muted-foreground hover:text-foreground">
              <Link to={isTemplate ? `/templates?style=${templateStyle}` : "/samples"}>
                {isTemplate ? "다른 템플릿 보기" : "다른 포트폴리오 보기"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
