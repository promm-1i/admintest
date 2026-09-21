/**
 * 템플릿 실물에서 구간 캡처를 뽑아 src/lib/templateSections.ts 를 갱신한다.
 *
 * 이전 방식은 구간을 4개로 잘라 놓고 화면에서 다시 4:3 으로 잘라 보여줘서
 * 내용이 중간에서 끊겼다. 여기서는
 *   - 구간 수를 고정하지 않는다. 템플릿이 가진 만큼 전부 담는다.
 *   - 한 구간은 통째로 찍는다. 잘라 붙이지 않는다.
 *   - 너무 긴 구간(뷰포트 4배 이상)은 건너뛴다. 줄여 보여줄 수 없어서다.
 *
 *   node tools/ref-clone/capture_sections.mjs              프리미엄 24종
 *   node tools/ref-clone/capture_sections.mjs corporate-k   한 종만
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = "C:/web-project/mintcl-netlify-spa";
const OUT_DIR = path.join(ROOT, "public/thumbs/sections");
const DATA = path.join(ROOT, "src/lib/templateSections.ts");
const BASE = process.env.CAPTURE_BASE || "http://127.0.0.1:4179"; // 개발 서버. file:// 은 fetch 하는 템플릿에서 빈 화면이 된다
const VIEWPORT = { width: 1280, height: 960 };
const MAX_SECTION_HEIGHT = Math.round(VIEWPORT.height * 2.5); // 이보다 길면 한 장에 담아도 안 읽힌다
const MIN_SECTION_HEIGHT = 300; // 띠 배너나 좁은 줄은 아래 조건에서 걸러낸다

const PREMIUM = ["hospital-a", "dental-f", "clinic-f", "artist-a", "rentcar-g", "rentcar-f", "estate-f", "estate-g",
  "wedding-a", "hotel-e", "brew-a", "corporate-i", "corporate-s", "corporate-q", "corporate-r", "corporate-o",
  "corporate-n", "corporate-m", "corporate-l", "corporate-k", "corporate-j", "corporate-h", "corporate-g", "corporate-f"];

const targets = process.argv.slice(2).length ? process.argv.slice(2) : PREMIUM;

await fs.mkdir(OUT_DIR, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const captured = {};

for (const slug of targets) {
  const page = await browser.newPage({ viewport: VIEWPORT });
  try {
    await page.goto(`${BASE}/templates/${slug}/index.html`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(2200);
    await page.evaluate(() => {
      for (const v of document.querySelectorAll("video")) v.remove();
      for (const el of document.querySelectorAll(".main-popup,.intro-splash,.layer-popup,.popup_wrap")) el.remove();
      for (const el of document.querySelectorAll(".rv,[data-reveal],[data-motion]")) el.classList.add("on", "active", "is-visible", "show");
    });
    await page.evaluate(async () => {
      const height = document.documentElement.scrollHeight;
      for (let y = 0; y < height; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 55)); }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(900);

    const blocks = await page.evaluate(([minH, maxH]) => {
      const skip = /header|footer|gnb|nav|popup|quick|top-?btn|float|cursor/i;
      const base = [...document.querySelectorAll('section, .section, [class*="sec0"], [class*="sec-"], [class^="sec "], main > div, #container > div, .contents > div, .content > div, #wrap > div')];
      // 한 덩어리가 너무 길면 통째로는 못 보여주니 그 안쪽을 구간으로 본다
      const candidates = [];
      for (const el of base) {
        if (el.getBoundingClientRect().height > maxH) candidates.push(...el.children);
        else candidates.push(el);
      }
      // section 도 .section 도 안 쓰는 템플릿이 있다. 그럴 땐 본문 컨테이너의 자식을 훑는다.
      if (candidates.length === 0) {
        const roots = [document.querySelector("#container"), document.querySelector("main"), document.body].filter(Boolean);
        const walk = (el, depth) => {
          if (depth > 3) return;
          for (const child of el.children) {
            const h = child.getBoundingClientRect().height;
            if (h > maxH) walk(child, depth + 1);
            else if (h >= minH) candidates.push(child);
          }
        };
        for (const root of roots) { walk(root, 0); if (candidates.length) break; }
      }
      // 그래도 못 찾으면 크기가 맞는 요소를 통째로 훑는다 (GSAP 핀 구간처럼 상자가 중첩된 경우)
      if (candidates.length === 0) {
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.height >= minH && r.height <= maxH && r.width >= 900) candidates.push(el);
        }
      }
      const found = [];
      for (const el of candidates) {
        const rect = el.getBoundingClientRect();
        const height = Math.round(rect.height);
        if (height < minH || height > maxH) continue;
        if (Math.round(rect.width) < 600) continue;
        if (skip.test(String(el.className) + " " + (el.id || ""))) continue;
        if (el.closest("header, footer")) continue;
        const top = Math.round(rect.y + scrollY);
        const heading = el.querySelector("h1,h2,h3,.title,.tit,.tit_h2");
        if (height < 420 && !heading && el.childElementCount < 2) continue;
        found.push({ top, height, title: (heading?.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60) });
      }
      found.sort((a, b) => (a.top - b.top) || (b.height - a.height));
      const kept = [];
      for (const block of found) {
        const inside = kept.some((k) => block.top >= k.top - 4 && block.top + block.height <= k.top + k.height + 4);
        const overlaps = kept.some((k) => Math.abs(block.top - k.top) < 80);
        if (!inside && !overlaps) kept.push(block);
      }
      return kept;
    }, [MIN_SECTION_HEIGHT, MAX_SECTION_HEIGHT]);

    // 지난 회차에 더 많이 찍었을 수 있으니 이 슬러그의 옛 파일은 먼저 지운다
    for (const old of await fs.readdir(OUT_DIR)) {
      if (old.startsWith(`${slug}-`) && /^\d+\.jpg$/.test(old.slice(slug.length + 1))) await fs.rm(path.join(OUT_DIR, old), { force: true });
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(400);
    const shots = [];
    for (let i = 0; i < blocks.length; i += 1) {
      const block = blocks[i];
      const file = `${slug}-${i + 1}.jpg`;
      const clipH = Math.min(block.height, MAX_SECTION_HEIGHT);
      try {
        // fullPage 라야 뷰포트보다 긴 구간도 한 장에 통째로 들어간다
        await page.screenshot({ path: path.join(OUT_DIR, file), type: "jpeg", quality: 74, fullPage: true, clip: { x: 0, y: block.top, width: VIEWPORT.width, height: clipH } });
        shots.push({ img: `/thumbs/sections/${file}`, title: block.title || `화면 ${i + 1}`, h: clipH });
      } catch { /* 찍히지 않는 구간은 건너뛴다 */ }
    }
    captured[slug] = shots;
    console.log(`${slug.padEnd(14)} ${String(shots.length).padStart(2)}장  ${shots.map((s) => s.h).join("/")}`);
  } catch (error) {
    console.log(`${slug.padEnd(14)} 실패 ${String(error).slice(0, 70)}`);
  }
  await page.close();
}
await browser.close();

// 이번에 다시 찍지 않은 슬러그는 기존 내용을 그대로 옮긴다
const previous = (await fs.readFile(DATA, "utf8")).split("\r\n").join("\n");
const keep = {};
const entry = new RegExp('\\n {2}"?([a-z0-9-]+)"?: \\[\\n([\\s\\S]*?)\\n {2}\\],', "g");
for (const match of previous.matchAll(entry)) {
  if (!(match[1] in captured)) keep[match[1]] = match[2];
}
if (Object.keys(keep).length === 0 && previous.includes(": [")) {
  throw new Error("기존 templateSections.ts 를 읽지 못했습니다. 덮어쓰지 않고 멈춥니다.");
}

const lines = [
  "// 자동 생성 파일 — tools/ref-clone/capture_sections.mjs 가 템플릿 실물에서 뽑습니다.",
  "// 템플릿을 고치면 다시 돌려 갱신하세요. 구간 수는 템플릿마다 다릅니다.",
  "// 한 구간은 통째로 한 장입니다. 화면에서 다시 잘라 쓰지 마세요.",
  "export type TemplateSectionShot = { img: string; title: string; width?: number; height?: number };",
  "",
  "export const TEMPLATE_SECTIONS: Record<string, TemplateSectionShot[]> = {",
];
for (const [slug, shots] of Object.entries(captured)) {
  lines.push(`  "${slug}": [`);
  for (const shot of shots) lines.push(`    { img: "${shot.img}", title: ${JSON.stringify(shot.title)}, width: ${VIEWPORT.width}, height: ${shot.h} },`);
  lines.push("  ],");
}
for (const [slug, body] of Object.entries(keep)) {
  lines.push(`  "${slug}": [`);
  lines.push(body);
  lines.push("  ],");
}
lines.push("};", "");
await fs.writeFile(DATA, lines.join("\n"), "utf8");
console.log("갱신", Object.keys(captured).length, "종 / 유지", Object.keys(keep).length, "종");
