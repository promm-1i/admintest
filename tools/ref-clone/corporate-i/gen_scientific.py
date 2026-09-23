"""Scientific(m24) 소스 + 연구소 로고·어플리케이션 아이콘 SVG 생성."""
from pathlib import Path
HERE = Path(__file__).parent / "pages"
A = Path(__file__).parents[3] / "public/nubit/assets"
# 원본은 실존 국책 연구소라 가상 기관으로 바꾼다 (글자 수 비슷하게)
LABS = ["한빛과학기술원<br>첨단광기술연구소", "미래통신연구원", "누리전기연구원", "새빛원자력연구원", "측정표준연구원", "한결기계연구원", "기초물리연구원",
        "기초과학분석연구원", "가온화학연구원", "핵융합에너지센터", "누리공대 방사광가속기연구소", "미래과학기술원", "미래과학기술연구원"]
COLORS = ["#2b4c9b", "#1f7a6b", "#b8342c", "#6a4cf0", "#d08a1e", "#3a3f4b"]
ICONS = [  # 80x80 선 아이콘 경로
    "M20 40h40M28 30l-8 10 8 10M52 30l8 10-8 10", "M40 18l6 14 15 1-11 10 4 15-14-8-14 8 4-15-11-10 15-1z", "M16 32h48v18H48l-8-8-8 8H16z",
    "M40 20v40M20 40h40M28 28l24 24M52 28L28 52", "M18 58l44-36M50 22h12v12M22 42a8 8 0 1016 0", "M24 56c10-24 22-24 32 0M30 26h20M40 26v14",
    "M16 56l12-20 10 12 10-22 16 30", "M40 22a18 18 0 110 36 18 18 0 010-36zM40 32a8 8 0 110 16 8 8 0 010-16z", "M20 24h40v8H20zM26 32v24h28V32M34 42h12"]
APPS = ["초강력 레이저와 레이저 플라즈마용 옵틱<br>- 대구경 옵틱 &amp; OAP &amp; 특수 커스텀 옵틱 etc", "우주용 광학 부품 개발<br>- 대구경 Mirror", "VR 광학기기용 옵틱",
        "의료용 옵틱 개발과 연구<br>- ARM MIRROR, BS MIRROR etc", "펨토초 레이저를 쓰는 장비 개발(산업용&amp;의료용)<br>- 레이저 커팅, 레이저 용접, 레이저 마킹",
        "중적외선 레이저 장비 개발과 연구<br>- CaF2, ZnSe 소재 옵틱", "레이저 분광 장비 옵틱<br>(Raman Spectroscopy) 개발", "공초점 현미경 옵틱<br>(Confocal Microscope) 개발", "리소그래피 장비 옵틱 개발"]

labs = ""
for i, n in enumerate(LABS, 1):
    c = COLORS[i % len(COLORS)]
    short = n.split("<br>")[0].split(" ")[0]
    (A / f"p/sci-logo{i}.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" width="246" height="98" viewBox="0 0 246 98"><rect width="246" height="98" fill="#fff"/><circle cx="56" cy="49" r="15" fill="none" stroke="{c}" stroke-width="5"/>'
        f'<text x="82" y="55" font-family="\'Noto Sans KR\',sans-serif" font-size="15" font-weight="700" fill="#222">{short}</text></svg>', encoding="utf-8")
    labs += f'<li><div class="img"><img src="./assets/p/sci-logo{i}.svg" alt="" width="246" height="98"></div><div class="tit">{n}</div></li>'
apps = ""
for i, (d, t) in enumerate(zip(ICONS, APPS), 1):
    (A / f"ic/s{i}.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="#f1f1f1"/><path d="{d}" fill="none" stroke="#6a4cf0" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>', encoding="utf-8")
    apps += f'<li><div class="icon"><img src="./assets/ic/s{i}.svg" alt="" width="80" height="80"></div><div class="txt">{t}</div></li>'

src = f"""<!--
title: Scientific
pn: 2
h2: BUSINESS
sub: 산업마다 맞춘 정밀 광학 솔루션
h3: Scientific
lead: 고성능 정밀 광학 제품을 앞서 만드는 세계적인 광학 전문 기업
loc: HOME|BUSINESS|Scientific
cls: m20 m22 m24
-->
<!--HEAD <link rel="stylesheet" href="./assets/biz.css"><link rel="stylesheet" href="./assets/defense.css"> -->
<style>
.m24 .sec1{{padding:120px 0 200px}}
.m24 .sec1 .conwrap{{margin:0}}
.m24 .sec1 .t1 .exp{{background:url(./assets/p/m24-top.jpg) no-repeat center;background-size:cover}}
.m24 .sec1 .conwrap h5{{margin:160px 0 0;font-size:54px;color:#000;font-weight:600;line-height:1.3em}}
.m24 .sec1 .conwrap h5+p{{margin:25px 0 -70px;font-size:19px;color:#000;opacity:.7}}
.m24 .sec1 .conwrap ul.labs{{display:flex;flex-wrap:wrap}}
.m24 .sec1 .conwrap ul.labs li{{width:19%;margin:0 1% 25px 0;text-align:center}}
.m24 .sec1 .conwrap ul.labs li:nth-child(5n){{margin-right:0}}
.m24 .sec1 .conwrap ul.labs li .img{{overflow:hidden;border:1px solid #ccc;border-radius:30px;background:#fff}}
.m24 .sec1 .conwrap ul.labs li .tit{{margin:15px 0 0;font-size:19px;color:#333;font-weight:400}}
.m22 .sec1 .app{{padding:190px 0 0}}
.m22 .sec1 .app h6{{margin:0 0 80px;font-size:39px;color:#000;font-weight:600}}
.m22 .sec1 .app ul{{display:flex;flex-wrap:wrap;justify-content:space-between}}
.m22 .sec1 .app ul li{{display:flex;align-items:center;width:49%;padding:49px;margin-bottom:2%;border:1px solid #ccc;border-radius:30px}}
.m22 .sec1 .app ul li .icon{{width:80px}}
.m22 .sec1 .app ul li .txt{{width:calc(100% - 80px);padding:0 0 0 50px;font-size:19px;color:#333}}
@media(max-width:1399px){{
  .m24 .sec1 .conwrap ul.labs li{{width:calc((100% - 4%) / 3);margin:0 2% 25px 0}}
  .m24 .sec1 .conwrap ul.labs li:nth-child(5n){{margin-right:2%}}
  .m24 .sec1 .conwrap ul.labs li:nth-child(3n){{margin-right:0}}
}}
@media(max-width:812px){{
  .m24 .sec1 .conwrap h5{{font-size:37px}}
  .m24 .sec1 .conwrap ul.labs li,.m24 .sec1 .conwrap ul.labs li:nth-child(3n),.m24 .sec1 .conwrap ul.labs li:nth-child(5n){{width:49%;margin:0 2% 25px 0}}
  .m24 .sec1 .conwrap ul.labs li:nth-child(2n){{margin-right:0}}
  .m24 .sec1 .conwrap ul.labs li .img{{border-radius:15px}}
  .m24 .sec1 .conwrap ul.labs li .tit{{font-size:16px}}
  .m22 .sec1 .app{{padding:120px 0 0}}
  .m22 .sec1 .app ul li{{width:100%;padding:30px 19px;border-radius:15px}}
  .m22 .sec1 .app ul li .icon{{width:50px}}
  .m22 .sec1 .app ul li .txt{{width:calc(100% - 50px);padding:0 0 0 20px;font-size:16px}}
}}
</style>
<div class="sec1" id="topline">
  <div class="conwrap t1">
    <div class="exp"></div>
    <div class="innerwrap">
      <h5>Scientific 분야</h5>
      <p>누빛광학은 Scientific 분야에서 연구용 광학 부품에 필요한 핵심 기술과 솔루션을 공급하고 있습니다. <br class="pcbr">대구경 레이저 옵틱과 OAP(Off-Axis Parabola) Mirror, 실험용 특수 옵틱까지 맞춤 제작할 수 있으며, 해외 협력사의 <br class="pcbr">고출력 레이저용 옵틱 제작 기술을 바탕으로 40년 넘게 여러 국책 연구소, 국내 주요 대학과 함께 <br class="pcbr">레이저 광 부품을 생산하고 공급해 왔습니다.</p>
      <h6>대표 거래 연구소</h6>
      <ul class="labs">{labs}</ul>
    </div>
  </div>
  <div class="app t1">
    <div class="innerwrap">
      <h6>Scientific 어플리케이션</h6>
      <ul>{apps}</ul>
    </div>
  </div>
  <div class="bannerWrap fadeUp rv"><a href="./inquiry.html"><div class="bg"></div><div class="keoc"></div><div class="con"><span>해당 분야 전문가에게 상담받기</span><span>MORE <i><img src="./assets/more-w7.svg" alt="" width="61" height="7"></i></span></div></a></div>
</div>
"""
(HERE / "scientific.html").write_text(src, encoding="utf-8")
print("wrote scientific")
