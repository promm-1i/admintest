import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-base font-semibold">MINTCL STUDIO</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            정성스러운 관리와 편안한 공간을 제공하는
            <br />
            프라이빗 스튜디오입니다.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="mb-3 font-medium text-foreground">이용 안내</p>
          <p>평일 10:00 – 20:00</p>
          <p>토요일 10:00 – 17:00</p>
          <p>일요일 · 공휴일 휴무</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="mb-3 font-medium text-foreground">바로가기</p>
          <ul className="space-y-2">
            <li>
              <Link to="/notices">공지사항</Link>
            </li>
            <li>
              <Link to="/reserve">예약 문의</Link>
            </li>
            <li>
              <Link to="/auth">관리자 로그인</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MINTCL STUDIO. All rights reserved.
      </div>
    </footer>
  );
}
