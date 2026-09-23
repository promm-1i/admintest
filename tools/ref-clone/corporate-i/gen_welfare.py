"""Career 복리후생(m73) 소스 + 80x80 아이콘 SVG 생성 (묶음 4개, 항목 4·4·3·2 — 원본처럼 생활안정 첫 항목이 여가 첫 항목과 같다)."""
from pathlib import Path
HERE = Path(__file__).parent / "pages"
IC = Path(__file__).parents[3] / "public/nubit/assets/ic"
PATHS = ["M22 30h36v28H22z M30 30v-6h20v6", "M40 20v40 M20 40h40", "M26 50a14 14 0 1128 0 M20 58h40", "M20 56l12-16 10 10 8-8 10 14z",
         "M24 24h32v32H24z M32 36h16 M32 44h10", "M40 22a18 18 0 110 36 18 18 0 010-36z M40 30v10l7 5", "M24 34h32v22H24z M40 34v22 M22 28h36v6H22z", "M30 24a10 10 0 1120 0v6H30z M26 30h28v24H26z",
         "M22 48c6-10 30-10 36 0 M30 34a4 4 0 118 0 4 4 0 01-8 0z M44 34a4 4 0 118 0 4 4 0 01-8 0z", "M28 36h24v18H28z M40 36v18 M34 30c0-6 12-6 12 0", "M26 30h28 M30 30v24 M50 30v24 M24 54h32", "M40 58l-14-13a8 8 0 0111-11l3 3 3-3a8 8 0 0111 11z", "M22 40h8l4-10 6 20 5-14 3 4h10"]
for i, d in enumerate(PATHS, 1):
    (IC / f"wf{i}.svg").write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="#f1f1f1"/><path d="{d}" fill="none" stroke="#6a4cf0" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>', encoding="utf-8")
BOXES = [("여가생활지원", ["휴가제도(경조, 포상, 하계, 연차 등) 운영", "회사 창립기념일 및 노사 화합의 날 유급 휴일", "동호회 운영과 활동비 지원", "휴가철 제휴 리조트와 호텔 이용 지원"]),
         ("생활안정지원", ["휴가제도(경조, 포상, 하계, 연차 등) 운영", "장기근속수당", "경조비 지급과 경조 물품 지원", "직원 선물 지급(생일, 창립기념일 등)"]),
         ("근무환경지원", ["Family Day(팀워크 행사)", "생일자 행사", "사내식당 운영"]),
         ("건강한 생활지원", ["종합건강검진(41세 이상) 비용 지원", "사내 Fitness실 운영"])]
n = 0
html = ""
for h5, items in BOXES:
    lis = ""
    for t in items:
        n += 1
        lis += f'<li class="fadeUp rv"><div class="icon"><img src="./assets/ic/wf{n}.svg" alt="" width="80" height="80"></div><div class="txt">{t}</div></li>'
    html += f'<div class="boxwrap"><h5>{h5}</h5><ul>{lis}</ul></div>\n'
src = f"""<!--
title: 복리후생
pn: 7
h2: CAREER
sub: 함께 성장할 사람을 찾습니다
h3: 복리후생
lead: 좋은 복지를 제공해 직원 한 사람 한 사람의 행복한 삶을 챙깁니다.
loc: HOME|CAREER|복리후생
cls: m73
-->
<style>
.m73{{padding:0 0 200px;background:url(./assets/p/m73-bg-l.jpg) no-repeat center 140px;background-size:100% auto}}
.m73 .slg{{display:flex;align-items:center;justify-content:center;width:92%;height:620px;margin:140px auto;background:url(./assets/p/m73-slg.jpg) no-repeat center;background-size:cover;border-radius:30px;font-size:54px;color:#fff;font-weight:700;text-align:center;line-height:1.3em}}
.m73 .boxwrap{{margin-bottom:150px}}
.m73 .boxwrap:last-child{{margin-bottom:0}}
.m73 .boxwrap h5{{font-size:39px;color:#000;font-weight:700}}
.m73 .boxwrap ul{{display:flex;flex-wrap:wrap;justify-content:space-between;margin-top:60px}}
.m73 .boxwrap ul li{{display:flex;align-items:center;width:49%;margin:0 0 2% 0;padding:49px;border:1px solid #ddd;border-radius:30px;background:#fff}}
.m73 .boxwrap ul li .icon{{width:80px}}
.m73 .boxwrap ul li .icon img{{display:block}}
.m73 .boxwrap ul li .txt{{width:calc(100% - 80px);padding:0 0 0 50px;font-size:19px;color:#333}}
@media(max-width:812px){{
  .m73 .slg{{height:450px;font-size:37px}}
  .m73 .boxwrap h5{{font-size:27px}}
  .m73 .boxwrap ul li{{width:100%;padding:20px;border-radius:20px}}
  .m73 .boxwrap ul li .icon{{width:50px}}
  .m73 .boxwrap ul li .icon img{{width:50px;height:auto}}
  .m73 .boxwrap ul li .txt{{width:calc(100% - 50px);padding:0 0 0 20px;font-size:16px}}
}}
</style>
<div class="slg"><div>직원의 행복을 위해<br>좋은 복지를 준비했습니다.</div></div>
<div class="innerwrap">
{html}</div>
"""
(HERE / "welfare.html").write_text(src, encoding="utf-8")
print("wrote welfare")
