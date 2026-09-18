import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, MessageCircle } from "lucide-react";
import { PHONE_TEL_HREF } from "@/lib/contact";
import { Logo } from "@/components/site/Logo";

export function SiteFooter() {
  const [familyOpen, setFamilyOpen] = useState(false);

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-10">
        <div className="text-center">
          <Logo className="justify-center" wordmarkClassName="text-3xl sm:text-4xl" />
          <div className="mx-auto mt-7 flex max-w-4xl flex-col justify-center gap-x-8 gap-y-2 text-sm leading-6 text-muted-foreground lg:flex-row">
            <p><strong className="mr-2 text-foreground">사업장</strong>서울특별시 강남구 테헤란로 일대 원격 제작 스튜디오</p>
            <p><strong className="mr-2 text-foreground">상담 운영</strong>온라인 · 전화 · 카카오톡 상담</p>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <p><strong className="mr-2 text-foreground">대표</strong>김진수</p>
            <p><strong className="mr-2 text-foreground">Tel</strong><a href={PHONE_TEL_HREF}>010-4894-4905</a></p>
            <p><strong className="mr-2 text-foreground">E-mail</strong>6gsmake@gmail.com</p>
            <p><strong className="mr-2 text-foreground">사업자등록번호</strong>266-07-03678</p>
          </div>
        </div>

        <div className="mt-10 grid items-end gap-8 border-t border-border pt-8 lg:grid-cols-3">
          <div>
            <form onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="footer-newsletter" className="text-sm font-black">뉴스레터</label>
              <div className="mt-3 flex max-w-sm">
                <input id="footer-newsletter" type="email" placeholder="E-mail 입력" className="h-11 min-w-0 flex-1 border border-border bg-transparent px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                <button type="submit" className="h-11 border border-l-0 border-border px-5 text-sm font-bold focus-visible:outline-2 focus-visible:outline-primary">신청</button>
              </div>
            </form>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <Link to="/auth">이용약관</Link>
              <Link to="/auth" className="font-bold text-foreground">개인정보처리방침</Link>
              <Link to="/admin">관리자 로그인</Link>
            </div>
          </div>

          <div className="text-center">
            <div className="flex justify-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="인스타그램" className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-xs font-black">IG</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="유튜브" className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-xs font-black">YT</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="페이스북" className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-xs font-black">FB</a>
              <Link to="/contact" aria-label="블로그" className="flex h-11 w-11 items-center justify-center rounded-full border border-border"><MessageCircle className="size-4" /></Link>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">© {new Date().getFullYear()} NOVERIQ. ALL RIGHTS RESERVED.</p>
          </div>

          <div className="relative justify-self-start lg:justify-self-end">
            <button type="button" aria-expanded={familyOpen} onClick={() => setFamilyOpen((open) => !open)} className="flex h-11 min-w-[170px] items-center justify-between border border-border px-5 text-sm font-bold focus-visible:outline-2 focus-visible:outline-primary">
              Family Site
              <ChevronDown className={`size-4 transition-transform ${familyOpen ? "rotate-180" : ""}`} />
            </button>
            {familyOpen && (
              <ul className="absolute bottom-full left-0 right-0 mb-1 border border-border bg-background py-2 text-sm shadow-lg">
                <li><Link to="/web-solutions" className="block px-4 py-2 hover:bg-secondary">웹 솔루션</Link></li>
                <li><Link to="/templates" className="block px-4 py-2 hover:bg-secondary">템플릿</Link></li>
                <li><Link to="/samples" className="block px-4 py-2 hover:bg-secondary">포트폴리오</Link></li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
