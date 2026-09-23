"""Career 인사제도(m72) 소스 + 아이콘 SVG 생성 — 평가제도(목록) · 보상제도(카드 4 + 빈 칸 2) · 교육제도(목록)."""
from pathlib import Path
HERE = Path(__file__).parent / "pages"
IC = Path(__file__).parents[3] / "public/nubit/assets/ic"
PB = '<br class="pcbr"><br class="tbbr">'

ICONS = {  # 원본 칸 크기 그대로
    "h1": (101, 99, "M20 80V40 M40 80V25 M60 80V50 M80 80V15 M12 88h78"),
    "h2": (96, 96, "M16 20h64v56H16z M28 36h40 M28 50h40 M28 64h24"),
    "h3": (84, 84, "M42 10l9 20 22 3-16 15 4 22-19-11-19 11 4-22-16-15 22-3z"),
    "e1": (90, 76, "M10 20l35-12 35 12-35 12z M22 26v20c0 8 46 8 46 0V26 M80 20v24"),
    "e2": (92, 92, "M14 22h64v42H14z M34 76h24 M46 64v12 M40 34l14 9-14 9z"),
}
for k, (w, h, d) in ICONS.items():
    (IC / f"{k}.svg").write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><path d="{d}" fill="none" stroke="#6a4cf0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>', encoding="utf-8")


def dl(items):
    out = ""
    for dt, dd, ic in items:
        w, h, _ = ICONS[ic]
        out += f'<dl class="fadeUp rv"><dt>{dt}</dt><dd>{dd}</dd><div class="icon"><img src="./assets/ic/{ic}.svg" alt="" width="{w}" height="{h}"></div></dl>'
    return out


EVAL = [("부문별 KPI<br class=\"mbbr\">(핵심성과지표) 설정", f"부문마다 역할과 목표에 맞는 핵심성과지표를 세워, {PB}각자 무엇을 이뤄야 하는지 스스로 분명히 알 수 있도록 돕습니다.", "h1"),
        ("KPI를 바탕으로 연 1회 <br class=\"mbbr\">인사평가(업적과 역량) 실시", f"정한 KPI를 기준으로 해마다 한 번 정기 인사평가를 하며, {PB}목표 달성도를 보는 업적평가와 일하는 능력을 보는 역량평가를 함께 진행해 종합적으로 살핍니다.", "h2"),
        ("평가 결과를 <br class=\"mbbr\">보상·승진에 반영", f"평가 결과는 급여 조정, 성과급, 승진 같은 보상 체계에 바로 이어져, {PB}성과에 걸맞은 공정한 보상을 받을 수 있도록 합니다.", "h3")]
EDU = [("교육체계", "직무별 교육, 계층별 교육, 공통 교육", "e1"),
       ("교육운영", f"연간 교육계획을 세워 체계적으로 운영하며, {PB}사내외 교육 병행, 온라인 학습 지원, 사내 강사 제도를 운영합니다.", "e2")]
BOX = [("경영 성과에 따른 <br class=\"pcbr\"><br class=\"mbbr\">차등 인센티브 지급", "01", "성과에 맞는 보상이 돌아가는 <br class=\"pcbr\">동기부여 환경을 만듭니다."),
       ("능력과 성과가 뛰어난 <br class=\"mbbr\">우수인재 조기 발탁승진 <br class=\"mbbr\">제도 운영", "02", "연공서열을 넘어 성과 중심으로 인재를 일찍 발탁하고 경력을 키울 기회를 드립니다."),
       ("제안제도에 따른 <br class=\"pcbr\"><br class=\"mbbr\">참여형 보상 <br class=\"pcbr\">System 운영", "03", "업무 개선 아이디어를 자유롭게 제안하고, 모두가 함께 참여하는 창의적인 조직문화를 만듭니다."),
       ("핵심인재 육성 교육 <br class=\"mbbr\">Program 운영", "04", "체계적인 육성 프로그램을 운영해 <br class=\"pcbr\">개인의 성장과 회사의 발전을 함께 이룹니다.")]


def box(t, n, p):
    return f'<div class="box fadeUp rv"><div class="top"><div class="tit">{t}</div><div class="num">{n}</div></div><p>{p}</p></div>'


boxes = box(*BOX[0]) + box(*BOX[1]) + '<div class="box blank"></div><div class="box blank"></div>' + box(*BOX[2]) + box(*BOX[3])

CSS = """
.m72 .sec1{padding:120px 0 140px}
.m72 .sec3{padding:150px 0}
.m72 .listSec .slgWrap{width:100%;height:400px;padding:0 20px;border-radius:30px;display:flex;justify-content:center;align-items:center}
.m72 .listSec.sec1 .slgWrap{background:url(./assets/p/m72-s1.jpg) no-repeat center/cover}
.m72 .listSec.sec3 .slgWrap{background:url(./assets/p/m72-s3.jpg) no-repeat center/cover}
.m72 .listSec .slgWrap p{font-family:"Noto Sans KR",sans-serif;font-size:40px;font-weight:700;color:#fff;text-align:center}
.m72 .listSec .dlWrap{margin-top:80px;border-top:1px solid rgba(0,0,0,.4)}
.m72 .listSec .dlWrap dl{position:relative;padding:40px 0;border-bottom:1px solid rgba(0,0,0,.4)}
.m72 .listSec .dlWrap dl dt{font-family:"Noto Sans KR",sans-serif;font-size:30px;font-weight:700;color:#000;margin-bottom:20px}
.m72 .listSec .dlWrap dl dd{font-family:"Noto Sans KR",sans-serif;font-size:18px}
.m72 .listSec .dlWrap dl .icon{position:absolute;right:0;top:50%;transform:translateY(-50%)}
.m72 .listSec .dlWrap dl .icon img{display:block}
.m72 .sec2{padding:120px 0;background:url(./assets/p/m72-s2-l.jpg) no-repeat center/cover}
.m72 .sec2 .secTit{font-size:40px;font-weight:700;color:#000;margin-bottom:60px}
.m72 .sec2 .boxWrap{display:flex;flex-wrap:wrap;gap:20px}
.m72 .sec2 .boxWrap .box{width:calc((100% - 40px) / 3);aspect-ratio:1;border-radius:30px;padding:30px;background:rgba(255,255,255,.7);display:flex;flex-direction:column;justify-content:space-between}
.m72 .sec2 .boxWrap .box.blank{opacity:0}
.m72 .sec2 .boxWrap .box .top{display:flex;justify-content:space-between}
.m72 .sec2 .boxWrap .box .top .tit{flex-shrink:1;font-family:"Noto Sans KR",sans-serif;font-size:30px;font-weight:700;color:#000}
.m72 .sec2 .boxWrap .box .top .num{flex-shrink:0;font-family:"Noto Sans KR",sans-serif;font-size:18px;font-weight:300;color:rgba(0,0,0,.7)}
.m72 .sec2 .boxWrap .box p{font-family:"Noto Sans KR",sans-serif;font-size:17px;color:rgba(0,0,0,.7)}
@media(max-width:1399px){
  .m72 .listSec .dlWrap dl .icon{top:40px;transform:none}
  .m72 .listSec .dlWrap dl .icon img{width:40px;height:auto}
  .m72 .sec2 .boxWrap .box .top .tit{font-size:20px}
  .m72 .sec2 .boxWrap .box .top .num{font-size:15px}
  .m72 .sec2 .boxWrap .box p{margin-top:10px}
}
@media(max-width:812px){
  .m72 .sec1,.m72 .sec3,.m72 .sec2{padding:100px 0}
  .m72 .listSec .slgWrap{border-radius:15px}
  .m72 .listSec .slgWrap p{font-size:27px}
  .m72 .listSec .dlWrap dl dt{font-size:22px}
  .m72 .listSec .dlWrap dl dd{font-size:15px}
  .m72 .sec2 .secTit{font-size:32px}
  .m72 .sec2 .boxWrap{gap:10px}
  .m72 .sec2 .boxWrap .box{width:100%;height:250px;aspect-ratio:auto;border-radius:15px;padding:20px}
  .m72 .sec2 .boxWrap .box.blank{display:none}
}
"""

src = f"""<!--
title: 인사제도
pn: 7
h2: CAREER
sub: 함께 성장할 사람을 찾습니다
h3: 인사제도
lead:
loc: HOME|CAREER|인사제도
cls: m72
-->
<style>{CSS}</style>
<div class="sec1 listSec">
  <div class="innerwrap">
    <div class="slgWrap"><p class="fadeUp rv">투명한 Process에 따른 {PB}공정한 평가제도</p></div>
    <div class="dlWrap">{dl(EVAL)}</div>
  </div>
</div>
<div class="sec2">
  <div class="innerwrap">
    <div class="secTit">성과에 따른 <br class="mbbr">합리적인 보상제도</div>
    <div class="boxWrap">{boxes}</div>
  </div>
</div>
<div class="sec3 listSec">
  <div class="innerwrap">
    <div class="slgWrap"><p class="fadeUp rv">구성원 성장 단계에 맞춘 {PB}맞춤형 교육제도</p></div>
    <div class="dlWrap">{dl(EDU)}</div>
  </div>
</div>
"""
(HERE / "hr.html").write_text(src, encoding="utf-8")
print("wrote hr")
