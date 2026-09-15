"""corporate-i 서브페이지 조립 — index.html 의 머리글 · 푸터를 읽어 pages/*.html 본문과 합친다.

pages/<파일명>.html 형식:
<!--
title: 기업개요
pn: 1
h2: ABOUT
sub: 서브 비주얼 한 줄
h3: 기업개요
lead: 페이지 제목 아래 한 줄 (없으면 비움)
loc: HOME|ABOUT|기업개요
cls: m11
-->
<style>페이지 CSS</style>
본문 (.page 안쪽)
<script>페이지 스크립트 (선택)</script>

  python tools/ref-clone/corporate-i/build.py            # 전부
  python tools/ref-clone/corporate-i/build.py about ceo  # 일부
"""
import re
import sys
from pathlib import Path

HERE = Path(__file__).parent
OUT = HERE.parents[2] / "public/templates/corporate-i"
index = (OUT / "index.html").read_text(encoding="utf-8")
HEADER = index[index.index("<!--HEADER-->"): index.index("<!--/HEADER-->") + len("<!--/HEADER-->")]
FOOTER = index[index.index("<!--FOOTER-->"): index.index("<!--/FOOTER-->") + len("<!--/FOOTER-->")]


def meta_of(src: str) -> tuple[dict, str]:
    m = re.match(r"\s*<!--(.*?)-->", src, re.S)
    meta = {}
    for line in m.group(1).strip().splitlines():
        k, _, v = line.partition(":")
        meta[k.strip()] = v.strip()
    return meta, src[m.end():]


def build(name: str) -> None:
    meta, rest = meta_of((HERE / "pages" / f"{name}.html").read_text(encoding="utf-8"))
    style = "".join(re.findall(r"<style>(.*?)</style>", rest, re.S))
    script = "".join(re.findall(r"<script>(.*?)</script>", rest, re.S))
    extra_head = "".join(re.findall(r"<!--HEAD(.*?)-->", rest, re.S))
    body = re.sub(r"<style>.*?</style>|<script>.*?</script>|<!--HEAD.*?-->", "", rest, flags=re.S).strip()
    loc = "".join(f"<li>{x}</li>" for x in meta["loc"].split("|"))
    # 원본은 설명이 없는 쪽도 빈 <p></p> 를 둔다(인재상·인사제도·상시채용) — "lead:" 만 적으면 빈 칸을 낸다
    lead = f"<p>{meta['lead']}</p>" if "lead" in meta else ""
    sub = f"<p>{meta['sub']}</p>" if meta.get("sub") else ""
    html = f"""<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes" />
<link rel="icon" href="./favicon.svg" type="image/svg+xml">
<title>{meta['title']} — 누빛광학 (프리미엄 디자인 D)</title>
<meta property="og:title" content="{meta['title']} — 누빛광학">
<meta property="og:image" content="./og.jpg">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.css">
<link rel="stylesheet" href="./assets/site.css">
{extra_head}
<style>{style}</style>
</head>
<body>
<div id="wrap">
<a class="sr" href="#main">본문 바로가기</a>
<div id="dim"></div>
{HEADER}
<main id="main">
  <div class="subVisual pn{meta['pn']} rv">
    <div class="bg"></div>
    <div class="txts"><h2>{meta['h2']}</h2>{sub}</div>
  </div>
  <div class="pageTitle">
    <div class="innerwrap">
      <h3>{meta['h3']}</h3>{lead}
      <ul class="pageLocation">{loc}</ul>
    </div>
  </div>
  <div class="page {meta['cls']}">
{body}
  </div>
</main>
{FOOTER}
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.9/SmoothScroll.min.js"></script>
<script src="./assets/site.js"></script>
{f'<script>{script}</script>' if script.strip() else ''}
</body>
</html>
"""
    (OUT / f"{name}.html").write_text(html, encoding="utf-8")
    print("built", name)


names = sys.argv[1:] or sorted(p.stem for p in (HERE / "pages").glob("*.html"))
for n in names:
    build(n)
