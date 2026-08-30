import { Link } from "react-router-dom";
import { ExternalLink, Lock } from "lucide-react";
import { PHONE_TEL_HREF, NAVER_BLOG_URL } from "@/lib/contact";

const FOOTER_GROUPS = [
  {
    title: "홈페이지 제작",
    links: [
      { label: "제작 방법", to: "/website/process" },
      { label: "제작 비용", to: "/website/price" },
      { label: "기능 소개", to: "/website/features" },
      { label: "유지보수", to: "/website/maintenance" },
    ],
  },
  {
    title: "업종별 맞춤 제작",
    links: [
      { label: "부동산", to: "/web-solutions/real-estate" },
      { label: "렌트카", to: "/web-solutions/rentcar" },
      { label: "병원 · 의원", to: "/web-solutions/hospital" },
      { label: "학원", to: "/web-solutions/academy" },
      { label: "인테리어 · 리모델링", to: "/web-solutions/interior" },
      { label: "이사 · 청소업체", to: "/web-solutions/moving" },
    ],
  },
  {
    title: "홈페이지",
    links: [
      { label: "홈페이지 템플릿", to: "/templates" },
      { label: "포트폴리오", to: "/samples" },
      { label: "NOVERIQ 소개", to: "/about" },
    ],
  },
  {
    title: "고객센터",
    links: [
      { label: "문의하기", to: "/contact" },
      { label: "공지사항", to: "/notices" },
      { label: "자주 묻는 질문", to: "/faq" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <p className="text-base font-semibold text-foreground">NOVERIQ (노베릭)</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">
            소상공인과 기업을 위한 맞춤형 홈페이지 제작 스튜디오입니다.
          </p>

          <div className="mt-6 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              <span><strong>상호명:</strong> 민트클</span>
              <span><strong>사업자등록번호:</strong> 266-07-03678</span>
            </p>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>
                <strong>전화:</strong>{" "}
                <a href={PHONE_TEL_HREF} className="hover:text-foreground transition-colors">
                  전화 문의
                </a>
              </span>
              <span><strong>이메일:</strong> 6gsmake@gmail.com</span>
            </p>
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              <span><strong>문의 접수:</strong> 24시간 언제든 가능 (1일 이내 회신)</span>
            </p>
          </div>
        </div>

        {FOOTER_GROUPS.map((group) => (
          <div key={group.title} className="text-sm text-muted-foreground">
            <p className="mb-3 font-bold text-foreground">{group.title}</p>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              {group.title === "고객센터" && (
                <li>
                  <a
                    href={NAVER_BLOG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    네이버 블로그
                    <ExternalLink className="size-3" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NOVERIQ (노베릭). All rights reserved.
        {" · "}
        <Link
          to="/auth"
          className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 hover:text-foreground hover:border-foreground/30 transition-colors"
        >
          <Lock className="size-3" />
          관리자 로그인
        </Link>
      </div>
    </footer>
  );
}
