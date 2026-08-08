import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="text-base font-semibold text-foreground">MintCL (민트클)</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">
            소상공인과 기업을 위한 맞춤형 홈페이지 제작 스튜디오입니다.
          </p>

          <div className="mt-6 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              <span><strong>상호명:</strong> 민트클</span>
              <span><strong>사업자등록번호:</strong> 266-07-03678</span>
            </p>
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              <span><strong>이메일:</strong> 6gsmake@gmail.com</span>
              <span><strong>운영시간:</strong> 평일 09:00 ~ 18:00</span>
            </p>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="mb-3 font-medium text-foreground">제작 서비스</p>
          <ul className="space-y-2">
            <li>
              <Link to="/services" className="hover:text-foreground transition-colors">
                제작 상품 및 가격 안내
              </Link>
            </li>
            <li>
              <Link to="/samples" className="hover:text-foreground transition-colors">
                업종별 포트폴리오
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="mb-3 font-medium text-foreground">바로가기</p>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:text-foreground transition-colors">
                민트클 소개
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground transition-colors">
                제작 문의
              </Link>
            </li>
            <li>
              <Link to="/notices" className="hover:text-foreground transition-colors">
                공지사항
              </Link>
            </li>
            <li>
              <Link to="/auth" className="hover:text-foreground transition-colors">
                관리자 로그인
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MintCL (민트클). All rights reserved.
      </div>
    </footer>
  );
}

