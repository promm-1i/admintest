// clinic-h 여울성형외과 빌드 — pages/*.mjs 본문을 공통 틀로 감싸 public/yeoul/*.html 로 쓴다.
//   node tools/ref-clone/clinic-h/build.mjs
import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { head, header, consultBand, footer, tail } from "./shell.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "../../../public/yeoul");

for (const f of readdirSync(join(here, "pages")).filter((n) => n.endsWith(".mjs")).sort()) {
  const mod = (await import(pathToFileURL(join(here, "pages", f)).href)).default;
  for (const page of [].concat(mod)) {
  const bodyClass = page.main ? page.bodyClass : `page-sub ${page.bodyClass || ""}${page.noConsult ? " no-band" : ""}`.trim();
  const html = [
    head({ title: page.title, desc: page.desc, bodyClass, path: page.path }),
    header(page.current ?? page.path),
    page.main ? page.body() : `<main id="content">${page.body()}</main>`,
    page.noConsult ? "" : consultBand(page.consultDesc),
    footer(),
    tail(),
  ].join("\n");
  writeFileSync(join(out, page.path), html);
  console.log("wrote", page.path, html.length);
  }
}
