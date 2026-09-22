/**
 * 쪽별 검수. 쪽마다 같은 항목을 보고 결과를 그대로 적는다.
 *   1 컨테이너   본문 왼쪽 시작점과 폭 (기준: 넓은 쪽 x60 w1320 · 좁은 쪽 x272 w896)
 *   2 넘침       문서 가로 스크롤, 화면 밖으로 나간 요소
 *   3 잘림       overflow:hidden 안에서 글자가 잘린 곳
 *   4 문구       뜻 없이 멋만 낸 표현 (경험으로 구성·여정·니즈·인사이트·차별화된…)
 *   5 중복       같은 글이 두 번 이상 나오는 곳
 *   6 죽은 링크  href 가 없거나 #, 또는 404 로 가는 내부 링크
 *   7 이미지     alt 없는 뜻 있는 이미지 · 깨진 이미지
 *   8 오류       JS 오류 · 404 화면
 *   9 분량       본문 글자 수
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";

const ROUTES = [
  ["/", "홈"], ["/about", "회사 소개"], ["/contact", "문의하기"], ["/estimate", "견적 계산기"],
  ["/faq", "자주 묻는 질문"], ["/notices", "공지사항"], ["/privacy", "개인정보처리방침"], ["/blog", "블로그"],
  ["/samples", "제작 사례"], ["/templates", "홈페이지 템플릿"], ["/web-solutions", "프리미엄 디자인"],
  ["/web-solutions/demos", "솔루션 데모"], ["/web-solutions/interior", "인테리어 솔루션"], ["/homepage", "업종별 홈페이지"],
  ["/website/process", "제작 방법"], ["/website/price", "제작 비용"], ["/website/features", "기능 소개"],
  ["/website/maintenance", "유지보수"], ["/services/custom", "커스텀 개발"], ["/services/admin-system", "관리자 시스템"],
  ["/services/inquiry-reservation", "문의·예약 관리"], ["/services/search-filter", "검색·필터"],
  ["/services/content-management", "콘텐츠 관리"], ["/services/database-api", "DB·API 연동"],
  ["/services/responsive", "반응형 웹 제작"], ["/services/seo", "검색엔진 최적화"],
  ["/homepage/rentcar", "업종 - 렌트카"], ["/homepage/real-estate", "업종 - 부동산"],
  ["/samples/travel-b-template", "사례 - 지질공원"], ["/samples/hospital-a-template", "사례 - 전문병원"],
];
const FLUFF = /(경험으로 구성|경험을 설계|여정|시너지|극대화|최적의|최상의|혁신적|차별화된|고객의 마음|가치를 전달|새로운 기준|한 차원|비로소|진정한|본질에 집중|스토리텔링|인사이트|니즈|퍼포먼스|임팩트|감성을 담|숨결|철학을 담|이상의 가치)/;

const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--autoplay-policy=no-user-gesture-required"] });
const rows = [];
for (const [route, name] of ROUTES) {
  const rec = { route, name, views: {} };
  for (const [W, H, tag] of [[1440, 950, "pc"], [768, 900, "tab"], [390, 844, "mob"]]) {
    const p = await b.newPage({ viewport: { width: W, height: H } });
    const errs = [];
    p.on("pageerror", (e) => errs.push(String(e).slice(0, 70)));
    try {
      await p.goto("http://127.0.0.1:4179" + route, { waitUntil: "networkidle", timeout: 45000 });
      await p.evaluate(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 900) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } scrollTo(0, 0); });
      await p.waitForTimeout(300);
      const r = await p.evaluate((fluffSrc) => {
        const fluff = new RegExp(fluffSrc);
        const doc = document.documentElement;
        const clipOk = (el) => { let n = el; while (n && n !== document.body) { const s = getComputedStyle(n);
          if (/auto|scroll|hidden/.test(s.overflowX) || s.overflow === "hidden") return true; n = n.parentElement; } return false; };
        // 컨테이너
        const counts = new Map();
        for (const el of document.querySelectorAll("main > *, main > * > *, main section > *, main div[class*=max-w]")) {
          const b = el.getBoundingClientRect();
          if (b.width < 300 || b.width > doc.clientWidth + 1 || b.height < 40) continue;
          const k = `x${Math.round(b.x)} w${Math.round(b.width)}`;
          counts.set(k, (counts.get(k) || 0) + 1);
        }
        const container = [...counts.entries()].sort((a, c) => c[1] - a[1])[0]?.[0] ?? "-";
        // 화면 밖
        const spill = [];
        for (const el of document.querySelectorAll("main *, footer *")) {
          const b = el.getBoundingClientRect();
          if (b.width < 4 || b.height < 4) continue;
          if (b.right <= innerWidth + 2 && b.left >= -2) continue;
          const s = getComputedStyle(el);
          if (s.position === "fixed" || s.pointerEvents === "none" || clipOk(el)) continue;
          spill.push(el.tagName + "." + String(el.className).slice(0, 20));
        }
        // 글자 잘림
        const clipped = [];
        for (const el of document.querySelectorAll("main h1,main h2,main h3,main strong,main p,main a,main button,main li")) {
          if (el.children.length) continue;
          const s = getComputedStyle(el);
          if (!/hidden|clip/.test(s.overflow) || (s.webkitLineClamp && s.webkitLineClamp !== "none") || s.textOverflow === "ellipsis") continue;
          if (el.getBoundingClientRect().width < 30) continue;
          if (el.scrollWidth > el.clientWidth + 3 || el.scrollHeight > el.clientHeight + 4) clipped.push(`"${(el.textContent || "").trim().slice(0, 14)}"`);
        }
        // 문구
        const bad = [];
        for (const el of document.querySelectorAll("main h1,main h2,main h3,main p,main strong,main em,main li")) {
          if (el.children.length) continue;
          const t = (el.textContent || "").trim();
          if (t && t.length < 120 && fluff.test(t)) bad.push(t.slice(0, 34));
        }
        // 중복 문장
        const seen = new Map();
        for (const el of document.querySelectorAll("main h2, main h3")) {
          const t = (el.textContent || "").trim();
          if (t.length > 3) seen.set(t, (seen.get(t) || 0) + 1);
        }
        const dup = [...seen.entries()].filter(([, n]) => n > 1).map(([t, n]) => `"${t.slice(0, 18)}"x${n}`);
        // 링크
        const dead = [];
        for (const a of document.querySelectorAll("main a")) {
          const href = a.getAttribute("href");
          if (!href || href === "#" || href === "") dead.push(`"${(a.textContent || "").trim().slice(0, 14)}"`);
        }
        const emptyLabel = [...document.querySelectorAll("main a, main button")].filter((el) => !(el.textContent || "").trim() && !el.querySelector("svg,img")).length;
        // 이미지
        const imgs = [...document.querySelectorAll("main img")];
        const broken = imgs.filter((im) => im.complete && im.naturalWidth === 0).length;
        const noAlt = imgs.filter((im) => im.getAttribute("alt") === null).length;
        return { container, spill: [...new Set(spill)].slice(0, 3), clipped: [...new Set(clipped)].slice(0, 3),
          fluff: [...new Set(bad)].slice(0, 3), dup: dup.slice(0, 3), dead: [...new Set(dead)].slice(0, 3), emptyLabel,
          imgs: imgs.length, broken, noAlt, over: Math.max(0, doc.scrollWidth - doc.clientWidth),
          text: document.body.innerText.trim().length,
          notFound: /Page not found|찾을 수 없/.test(document.body.innerText) };
      }, FLUFF.source);
      r.errs = errs.slice(0, 2);
      rec.views[tag] = r;
    } catch (e) { rec.views[tag] = { fail: String(e).slice(0, 60) }; }
    await p.close();
  }
  rows.push(rec);
  const pc = rec.views.pc || {};
  const flags = [];
  if (pc.over > 2) flags.push(`가로넘침${pc.over}`);
  if (pc.spill?.length) flags.push("화면밖");
  if (pc.clipped?.length) flags.push("잘림");
  if (pc.fluff?.length) flags.push("문구");
  if (pc.dup?.length) flags.push("중복");
  if (pc.dead?.length || pc.emptyLabel) flags.push("링크");
  if (pc.broken) flags.push("깨진이미지");
  if (pc.errs?.length) flags.push("JS오류");
  if (pc.notFound) flags.push("404");
  console.log(`${name.padEnd(16)} ${route.padEnd(30)} ${pc.container?.padEnd(14) ?? ""} ${String(pc.text ?? 0).padStart(5)}자  ${flags.length ? "★ " + flags.join(" ") : "이상없음"}`);
}
await b.close();
await fs.writeFile("C:/Users/진수/Desktop/개발/tmp/renewal-fix/audit.json", JSON.stringify(rows, null, 1), "utf8");
console.log("\n원자료 저장: Desktop/개발/tmp/renewal-fix/audit.json");
