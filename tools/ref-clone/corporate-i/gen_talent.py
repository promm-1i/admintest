"""Career 인재상(m71) 소스 + 도식 배경·아이콘 SVG 생성."""
from pathlib import Path
HERE = Path(__file__).parent / "pages"
A = Path(__file__).parents[3] / "public/nubit/assets"

(A / "p/m71-rings.svg").write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" width="841" height="841" viewBox="0 0 841 841">'
    '<defs><linearGradient id="t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfc6fb"/><stop offset="1" stop-color="#e6e2f8"/></linearGradient></defs>'
    '<circle cx="420.5" cy="420.5" r="419" fill="none" stroke="#c9c9c9" stroke-dasharray="3 3"/>'
    '<circle cx="420.5" cy="420.5" r="365" fill="none" stroke="#c9c9c9" stroke-dasharray="3 3"/>'
    '<circle cx="420.5" cy="420.5" r="282" fill="none" stroke="url(#t)" stroke-width="55" opacity=".7"/>'
    '<circle cx="420.5" cy="420.5" r="227" fill="none" stroke="#b9acf7" stroke-width="55" opacity=".45"/></svg>', encoding="utf-8")
ICONS = [(45, 38, "M4 6h28v18H14l-8 7v-7H4z M20 16h21v14h-4v6l-7-6h-10z"),
         (45, 38, "M22.5 34l-15-14a8 8 0 0111-11l4 4 4-4a8 8 0 0111 11z"),
         (42, 42, "M21 4a17 17 0 110 34 17 17 0 010-34z M13 21l6 6 11-12")]
for i, (w, h, d) in enumerate(ICONS, 1):
    (A / f"ic/tl{i}.svg").write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><path d="{d}" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>', encoding="utf-8")

VALUES = [("소통", "열린 마음"), ("신뢰", "믿음직한 행동"), ("투명", "투명한 Process")]
li = "".join(f'<li><div><div><div class="icon"><img src="./assets/ic/tl{i}.svg" alt="" width="{ICONS[i-1][0]}" height="{ICONS[i-1][1]}"></div><div class="tit">{t}</div><div class="exp">{e}</div></div></div></li>'
             for i, (t, e) in enumerate(VALUES, 1))

src = f"""<!--
title: 인재상
pn: 7
h2: CAREER
sub: 함께 성장할 사람을 찾습니다
h3: 인재상
lead:
loc: HOME|CAREER|인재상
cls: m71
-->
<style>
.m71{{padding:0 0 200px}}
.m71 .slg{{display:flex;align-items:center;justify-content:center;width:92%;height:620px;margin:140px auto;background:url(./assets/p/m71-slg.jpg) no-repeat center;background-size:cover;border-radius:30px;font-size:54px;color:#fff;font-weight:700;text-align:center;line-height:1.3em}}
.m71 .talent{{position:relative;padding-top:110px}}
.m71 .talent h4{{display:flex;align-items:center;justify-content:center;width:801px;height:801px;margin:0 auto;background:url(./assets/p/m71-rings.svg) no-repeat;background-size:cover;font-size:39px;color:#000;font-weight:700;text-align:center;line-height:1.3em}}
.m71 .talent ul li{{position:absolute;width:310px;height:310px;padding:19px;border:1px solid #ddd;border-radius:50%;background:#fff}}
.m71 .talent ul li:nth-child(1){{left:50%;top:0;transform:translate(-50%,0)}}
.m71 .talent ul li:nth-child(2){{right:15%;bottom:5%}}
.m71 .talent ul li:nth-child(3){{left:15%;bottom:5%}}
.m71 .talent ul li>div{{display:flex;align-items:center;justify-content:center;width:100%;height:100%;border-radius:50%;text-align:center}}
.m71 .talent ul li:nth-child(1)>div{{background:#6a4cf0}}
.m71 .talent ul li:nth-child(2)>div{{background:#1d1450}}
.m71 .talent ul li:nth-child(3)>div{{background:#8b73f4}}
.m71 .talent ul li .icon img{{display:inline-block}}
.m71 .talent ul li .tit{{margin:10px 0 0;font-size:33px;color:#fff;font-weight:700}}
.m71 .talent ul li .exp{{font-size:17px;color:rgba(255,255,255,.7);font-weight:500}}
@media(max-width:1399px){{
  .m71 .talent h4{{width:600px;height:600px;background:url(./assets/p/m71-rings.svg) no-repeat center/contain}}
  .m71 .talent ul li{{width:240px;height:240px}}
}}
@media(max-width:812px){{
  .m71 .slg{{height:450px;font-size:37px}}
  .m71 .talent h4{{width:300px;height:300px;font-size:20px}}
  .m71 .talent ul li{{width:150px;height:150px;padding:10px}}
  .m71 .talent ul li:nth-child(2){{left:54%;right:auto;bottom:-18%}}
  .m71 .talent ul li:nth-child(3){{right:54%;left:auto;bottom:-18%}}
  .m71 .talent ul li .tit{{font-size:18px}}
  .m71 .talent ul li .exp{{font-size:13px}}
}}
</style>
<div class="slg"><div class="fadeUp rv">열린 마음을 가진<br>창의적이고 열정적인 인재</div></div>
<div class="innerwrap">
  <div class="talent scaleAni2 rv">
    <h4>핵심가치</h4>
    <ul>{li}</ul>
  </div>
</div>
"""
(HERE / "talent.html").write_text(src, encoding="utf-8")
print("wrote talent")
