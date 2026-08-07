import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-base font-semibold">MINTCL</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            소상공인과 1인기업을 위한
            <br />
            홈페이지 제작 스튜디오입니다.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="mb-3 font-medium text-foreground">제작 상품</p>
          <ul className="space-y-2">
            <li>
              <Link to="/services">제작 상품 및 가격 안내</Link>
            </li>
            <li>
              <Link to="/samples">업종별 샘플 사이트</Link>
            </li>
          </ul>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="mb-3 font-medium text-foreground">바로가기</p>
          <ul className="space-y-2">
            <li>
              <Link to="/about">민트클 소개</Link>
            </li>
            <li>
              <Link to="/contact">제작 문의</Link>
            </li>
            <li>
              <Link to="/notices">공지사항</Link>
            </li>
            <li>
              <Link to="/auth">관리자 로그인</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MINTCL. All rights reserved.
      </div>
    </footer>
  );
}
