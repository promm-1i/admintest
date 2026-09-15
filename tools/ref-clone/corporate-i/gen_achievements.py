"""R&D 연구실적(m42) 소스 생성 — 연도·항목 수는 원본과 같다."""
from pathlib import Path
HERE = Path(__file__).parent / "pages"
PB = '<br class="pcbr">'
GROUPS = [
    [("2024", ["대공 레이저 체계 1차형 빔정렬기 양산", "국산 레이저용 빔정렬기 개발", "전투차량 빔 특성 측정 모듈 개발", "전투차량용 빔 결합 모듈 개발",
               "IR 대역 TGV 가공용 F-theta Lens 개발", "UV 대역 극초단 레이저용 대구경 F-theta Lens(380 x 380 mm²) 개발", "Laser Direct Imaging 노광 모듈 개발", "넓은 시야 대물렌즈 개발"]),
     ("2023", ["고에너지 레이저 빔 제어용 빔정렬기 보완 시제 개발", "소형 무인기용 레이저 빔 결합 모듈 개발", "원거리 화학 탐지용 소형 흑체 조립체 개발", f"UV 대역 극초단 레이저용 대구경 F-theta Lens{PB}(200 x 200 mm²) 개발"]),
     ("2022", ["빔 특성 측정 장치 개발", "고에너지 레이저 빔 제어용 빔정렬기 기본 시제 개발", "고속 광파면 변형 기술 성능 시험 장비 개발"]),
     ("2021", ["2차 전지 용접용 고출력 레이저 모듈 개발", "Laser Direct Imaging Module 개발", "다중 영상 융합 주행 시스템 점검 장비 개발"]),
     ("2020", ["Laser Cutting 용 대면적 가공용 Telecentric Lens 개발", "대공 레이저 체계 1차형 빔정렬기의 조준 광학부, 회전축 보정 광학부, 광학 제어부 모듈 개발"])],
    [("2019", ["자외선 라인빔 휴대폰 살균기 개발"]),
     ("2015", ["Excimer Laser Annealing용 Line Beam 광학계 개발", "핵융합 장치 편광 진단 장비(MSE, CES, IRTV) 개발"]),
     ("2014", ["생물독소 분석 식별기 광학 모듈(BTDS) 개발", "레이저 표적 신호 모의기 개발"]),
     ("2013", ["레이저 경고 장치 자동 검사 장비(LWRS) 개발"]),
     ("2012", ["생물독소 감시기 입자 광측부(BTMS) 개발"]),
     ("2011", ["레이저 경고 장치 자동 검사 장비(LAOTB) 개발"]),
     ("2010", ["가시광선과 적외선 영역을 함께 만족하는 고반사율 미러 개발"])],
    [("2008", ["Digital modulation 노광 광학계 개발"]),
     ("2007", ["주사형 엑스선 현미경 시스템에 쓰는 Wolter Mirror 개발"]),
     ("1996", ["누빛광학 기업 부설 연구소 설립"])],
]
cons = ""
for n, g in enumerate(GROUPS, 1):
    dls = "".join(f'<dl class="fadeUp rv"><dt>{y}</dt><dd>{"".join(f"<p>{x}</p>" for x in items)}</dd></dl>' for y, items in g)
    cons += f'      <div class="con"><div class="imgwrap showImg rv"><img src="./assets/p/m42-{n}.jpg" alt="" width="500" height="600"></div><div class="yearwrap">{dls}</div></div>\n'
src = f"""<!--
title: 기술개발성과
pn: 4
h2: R&amp;D
sub: 정밀 광학 기술로 앞서가는 광학 전문기업
h3: 기술개발성과
lead: 고성능 정밀 광학 제품을 앞서 만드는 세계적인 광학 전문 기업
loc: HOME|R&amp;D|기술개발성과
cls: m42
-->
<style>
.m42 .sec1{{margin-top:90px;padding:120px 0 300px;background:url(./assets/p/m41-bg-l.jpg) no-repeat center bottom/cover}}
.m42 .sec1 .slg{{position:relative;margin:0 0 200px;width:100%;height:620px;border-radius:30px;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:0 20px}}
.m42 .sec1 .slg .bg{{position:absolute;left:0;top:0;width:100%;height:100%;background:url(./assets/p/m42-slg.jpg) no-repeat center/cover}}
.m42 .sec1 .slg .txts{{position:relative;text-align:center;font-size:56px;font-weight:700;color:#fff;line-height:1.3em}}
.m42 .sec1 .conwrap .con{{display:flex;justify-content:space-between}}
.m42 .sec1 .conwrap .con:nth-child(2n){{flex-direction:row-reverse}}
.m42 .sec1 .conwrap .con+.con{{margin-top:180px}}
.m42 .sec1 .conwrap .con .imgwrap{{width:40%;height:600px;border-radius:30px;overflow:hidden}}
.m42 .sec1 .conwrap .con .imgwrap img{{display:block;width:100%;height:100%;object-fit:cover}}
.m42 .sec1 .conwrap .con .yearwrap{{width:50%}}
.m42 .sec1 .conwrap .con .yearwrap dl{{padding:40px 0;border-top:1px solid #ccc;display:flex}}
.m42 .sec1 .conwrap .con .yearwrap dl dt{{width:185px;font-family:Poppins,sans-serif;font-size:55px;font-weight:600;color:#000}}
.m42 .sec1 .conwrap .con .yearwrap dl dd{{width:calc(100% - 185px)}}
.m42 .sec1 .conwrap .con .yearwrap dl dd p{{position:relative;padding-left:16px;font-size:20px;line-height:2em}}
.m42 .sec1 .conwrap .con .yearwrap dl dd p+p{{margin-top:5px}}
.m42 .sec1 .conwrap .con .yearwrap dl dd p:after{{content:"";position:absolute;left:0;top:16px;width:5px;height:5px;background:var(--accent)}}
@media(max-width:812px){{
  .m42 .sec1{{margin-top:0;padding:120px 0}}
  .m42 .sec1 .slg{{height:450px}}
  .m42 .sec1 .slg .txts{{font-size:35px}}
  .m42 .sec1 .conwrap .con{{display:block}}
  .m42 .sec1 .conwrap .con+.con{{margin-top:100px}}
  .m42 .sec1 .conwrap .con .imgwrap{{width:100%;height:auto;border-radius:15px}}
  .m42 .sec1 .conwrap .con .yearwrap{{width:100%;margin-top:40px}}
  .m42 .sec1 .conwrap .con .yearwrap dl{{display:block;padding:30px 0}}
  .m42 .sec1 .conwrap .con .yearwrap dl dt{{width:auto;font-size:40px}}
  .m42 .sec1 .conwrap .con .yearwrap dl dd{{width:100%}}
  .m42 .sec1 .conwrap .con .yearwrap dl dd p{{padding-left:10px;font-size:15px}}
  .m42 .sec1 .conwrap .con .yearwrap dl dd p:after{{top:12px;width:4px;height:4px}}
}}
</style>
<div class="sec1">
  <div class="innerwrap2">
    <div class="slg"><div class="bg"></div><div class="txts fadeUp rv">누빛광학㈜은 기술 개발과 R&amp;D 투자로 {PB}맞춤형 광학 제품을 공급하며 성장해왔습니다.</div></div>
  </div>
  <div class="innerwrap">
    <div class="conwrap">
{cons}    </div>
  </div>
</div>
"""
(HERE / "achievements.html").write_text(src, encoding="utf-8")
print("wrote achievements")
