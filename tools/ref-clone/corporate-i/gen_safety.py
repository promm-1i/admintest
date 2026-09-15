"""ESG 안전보건(m52) 소스 + 아이콘 SVG 생성."""
from pathlib import Path
HERE = Path(__file__).parent / "pages"
IC = Path(__file__).parents[3] / "public/templates/corporate-i/assets/ic"
PB = '<span class="pcbr"></span>'

# 원본 아이콘 칸 크기(42x50 · 59x43 · 45x40 · 36x52)에 맞춘 선 아이콘
ICONS = [
    (42, 50, "M21 3l17 7v14c0 11-7 19-17 23C11 43 4 35 4 24V10z M13 25l6 6 11-12"),
    (59, 43, "M29.5 4L56 39H3z M29.5 16v12 M29.5 33v2"),
    (45, 40, "M4 8h37v24H4z M14 38h17 M22.5 32v6 M12 16h21 M12 23h14"),
    (36, 52, "M18 4a10 10 0 110 20 10 10 0 010-20z M5 48c0-10 6-17 13-17s13 7 13 17z"),
]
for i, (w, h, d) in enumerate(ICONS, 1):
    (IC / f"sf{i}.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><path d="{d}" fill="none" stroke="#6a4cf0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        encoding="utf-8")

TOP = ["안전경영 시스템과 안전사고 예방", "위험성 평가 체계 구축과 철저한 이행", "교육과 훈련으로 안전 의식 높이기", "산업재해 Zero 유지와 목표 재해율 Zero"]
POLICY = [
    f"임직원이 안전하고 건강하게 일할 수 있는 환경을 만들기 위해 ESG 경영시스템 {PB}운영지침 안에 안전보건관리지침을 따로 두고 운영하고 있습니다.",
    f"안전보건 경영방침을 바탕으로 책임과 권한, 위험성 평가, 교육훈련, {PB}비상사태 관리 등 작업장 안전보건과 관련된 내용을 실천하고 있습니다.",
    f"산업안전보건위원회를 운영하면서 안전보건 활동의 전략과 이행 과제, {PB}예산을 세우고 주기적으로 점검하여 더 효과적으로 실행하고 있습니다.",
    f"회사의 바탕인 임직원의 안전과 건강을 위해 여러 방면으로 지원하고 {PB}더 많은 자원을 들일 계획입니다.",
]
top = "".join(f'<li><div class="icon"><img src="./assets/ic/sf{i}.svg" alt="" width="{ICONS[i-1][0]}" height="{ICONS[i-1][1]}"></div><div class="tit">{t}</div></li>' for i, t in enumerate(TOP, 1))
pol = "".join(f'<li><div class="keoc"><span>{i:02d}</span>누빛광학은</div><div class="txt">{t}</div></li>' for i, t in enumerate(POLICY, 1))

CSS = """
.m52 .sec1{padding:100px 0 80px}
.m52 .sec1 .slg{font-size:48px;color:#000;font-weight:600;line-height:1.3em}
.m52 .sec1 ul{display:flex;align-items:center;justify-content:space-between;max-width:1279px;height:286px;margin:60px auto 0;background:url(./assets/p/m52-rings.svg) no-repeat;background-size:100% auto}
.m52 .sec1 ul li{width:23%;padding:0 30px;text-align:center}
.m52 .sec1 ul li .icon{height:52px;margin-bottom:15px}
.m52 .sec1 ul li .icon img{display:inline-block}
.m52 .sec1 ul li .tit{font-size:23px;color:#000;font-weight:600}
.m52 .sec2{padding:170px 0;background:#f9f9f9}
.m52 .sec2 h4{font-size:39px;color:#000;font-weight:600}
.m52 .sec2 .conwrap{margin:50px 0 0;padding:59px;border:1px solid #ddd;border-radius:30px;background:#fff}
.m52 .sec2 .conwrap h5{padding:35px;background:var(--navy);border-radius:30px 30px 0 0;font-size:27px;color:#fff;font-weight:600;text-align:center}
.m52 .sec2 .conwrap ul li{display:flex;align-items:center;padding:45px 20px;border-bottom:1px solid #ddd}
.m52 .sec2 .conwrap ul li .keoc{position:relative;display:flex;align-items:center;width:210px;font-size:19px;color:#333;line-height:1.7em}
.m52 .sec2 .conwrap ul li .keoc:after{display:block;content:"";width:1px;height:20px;background:#b2b2b2;position:absolute;right:0;top:14px}
.m52 .sec2 .conwrap ul li .keoc span{display:flex;align-items:center;justify-content:center;width:48px;height:48px;margin-right:18px;background:#f1f1f1;border-radius:50%;font-size:15px;color:var(--navy);font-weight:600;text-align:center}
.m52 .sec2 .conwrap ul li .txt{width:calc(100% - 210px);padding-left:58px;font-size:19px;color:#333;line-height:1.7em}
.m52 .sec2 .conwrap .last{display:flex;align-items:center;justify-content:space-between;margin:70px 0 0}
.m52 .sec2 .conwrap .last p{font-size:19px;color:#555}
.m52 .sec2 .conwrap .last .sign{font-size:23px;color:#000;font-weight:600;width:350px}
.m52 .sec2 .conwrap .last .sign .bar{display:inline-block;width:2px;height:22px;background:#ddd;margin:0 10px}
@media(min-width:1400px){.m52 .sec2 .conwrap .last .sign .names{font-weight:400;color:#000;font-size:20px}}
@media(max-width:1399px){
  .m52 .sec1 .conwrap{padding-bottom:20px;overflow-x:auto}
  .m52 .sec1 ul{min-width:1165px}
  .m52 .sec1 ul li .tit{font-size:19px}
  .m52 .sec2 .conwrap .last{flex-direction:column;align-items:stretch;justify-content:flex-start}
  .m52 .sec2 .conwrap .last .sign{width:auto;margin-top:20px}
}
@media(max-width:812px){
  .m52 .sec1 .slg{font-size:37px}
  .m52 .sec1 .conwrap{padding-bottom:10px}
  .m52 .sec1 ul{min-width:800px;background:url(./assets/p/m52-rings.svg) no-repeat center/contain}
  .m52 .sec1 ul li .icon{height:auto;transform:scale(.7);margin-bottom:5px}
  .m52 .sec1 ul li .tit{font-size:15px}
  .m52 .sec2{padding:120px 0}
  .m52 .sec2 h4{font-size:28px}
  .m52 .sec2 .conwrap{padding:20px}
  .m52 .sec2 .conwrap h5{border-radius:18px 18px 0 0;font-size:22px}
  .m52 .sec2 .conwrap ul li{display:block;padding:30px 0}
  .m52 .sec2 .conwrap ul li .keoc{width:100%;font-size:18px}
  .m52 .sec2 .conwrap ul li .keoc:after{display:none}
  .m52 .sec2 .conwrap ul li .keoc span{width:40px;height:40px}
  .m52 .sec2 .conwrap ul li .txt{width:100%;margin-top:30px;padding-left:0;font-size:16px}
  .m52 .sec2 .conwrap .last{display:block;margin:30px 0 0}
  .m52 .sec2 .conwrap .last p{font-size:16px}
  .m52 .sec2 .conwrap .last .sign{font-size:18px}
  .m52 .sec2 .conwrap .last .sign .bar{width:1px;height:16px}
}
"""

src = f"""<!--
title: 안전보건
pn: 5
h2: ESG
sub: 사람과 환경을 생각하는 지속가능경영
h3: 안전보건
lead: 지구 환경을 지키고 지속가능한 사회를 앞장서 만들어 갑니다.
loc: HOME|ESG|안전보건
cls: m52
-->
<style>{CSS}</style>
<div class="sec1">
  <div class="innerwrap">
    <div class="slg">누빛광학은 안전보건경영체계를 {PB}꾸준히 유지하고 관리합니다.</div>
    <div class="conwrap scaleAni2 rv"><ul>{top}</ul></div>
  </div>
</div>
<div class="sec2">
  <div class="innerwrap">
    <h4>환경경영방침</h4>
    <div class="conwrap">
      <h5>누빛광학은 안전보건경영체계를 유지하고 관리해 {PB}모든 직원이 안전하고 쾌적한 환경에서 일할 수 있도록 최선을 다합니다.</h5>
      <ul>{pol}</ul>
      <div class="last"><p>모든 직원은 위 방침을 잘 이해하고 운영 목표를 이루기 위해 최선을 다합니다.</p><div class="sign">대표이사 <span class="bar"></span> <span class="names">한지훈</span></div></div>
    </div>
  </div>
</div>
"""
(HERE / "safety.html").write_text(src, encoding="utf-8")
print("wrote safety")
