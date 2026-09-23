"""ESG 인권경영(m55) 소스 + 신고 창구 이미지(SVG) 생성."""
from pathlib import Path
HERE = Path(__file__).parent / "pages"
A = Path(__file__).parents[3] / "public/nubit/assets"
PB = '<span class="pcbr"></span>'

# 원본은 담당자 메일·전화를 이미지로 넣어 두었다 — 같은 칸 크기에 자리 표시 연락처
(A / "p/m55-mail.svg").write_text('<svg xmlns="http://www.w3.org/2000/svg" width="187" height="21" viewBox="0 0 187 21"><text x="0" y="16" font-family="Poppins,Arial,sans-serif" font-size="16" font-weight="500" fill="#333">ethics@nuvit.co.kr</text></svg>', encoding="utf-8")
(A / "p/m55-tel.svg").write_text('<svg xmlns="http://www.w3.org/2000/svg" width="119" height="15" viewBox="0 0 119 15"><text x="0" y="13" font-family="Poppins,Arial,sans-serif" font-size="15" font-weight="500" fill="#333">000-000-0000</text></svg>', encoding="utf-8")
(A / "ic/hr-mail.svg").write_text('<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="30" fill="#f1f1f1"/><path d="M17 21h26v18H17z M17 21l13 10 13-10" fill="none" stroke="#6a4cf0" stroke-width="2" stroke-linejoin="round"/></svg>', encoding="utf-8")
(A / "ic/hr-tel.svg").write_text('<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="30" fill="#f1f1f1"/><path d="M22 18h6l3 7-4 3c1.5 3.5 4.5 6.5 8 8l3-4 7 3v6c0 1-1 2-2 2-13 0-23-10-23-23 0-1 1-2 2-2z" fill="none" stroke="#6a4cf0" stroke-width="2" stroke-linejoin="round"/></svg>', encoding="utf-8")

# 유엔글로벌콤팩트 10대 원칙 — 공개된 원칙을 우리 말로 풀어 적는다 (칸 수·원칙 번호는 원본과 같다)
BOXES = [
    ("인권 (Human Rights)", [("원칙 1", f"기업은 국제적으로 인정된 인권 보호를 지지하고 {PB}존중합니다."),
                             ("원칙 2", f"기업은 인권 침해에 가담하지 않도록 {PB}늘 주의를 기울입니다.")]),
    ("노동규칙 (Labour Standards)", [("원칙 3", f"기업은 결사의 자유와 단체교섭권을 실질적으로 {PB}인정하고 지지하며,"),
                                     ("원칙 4", "모든 강제노동을 허용하지 않으며,"),
                                     ("원칙 5", "아동노동을 실질적으로 없애며,"),
                                     ("원칙 6", "고용과 업무에서 차별을 없앱니다.")]),
    ("환경 (Environment)", [("원칙 7", "기업은 환경 문제를 미리 막는 접근을 지지하고,"),
                            ("원칙 8", "환경에 대한 책임을 넓히는 활동을 펼치며,"),
                            ("원칙 9", "환경친화적인 기술의 개발과 보급을 돕습니다.")]),
    ("반부패 (Anti-Corruption)", [("원칙 10", f"기업은 부당한 이익과 뇌물을 포함한 {PB}모든 형태의 부패에 반대합니다.")]),
]
GUIDE = ["차별금지", "직장 내<br>괴롭힘 금지", "결사 및<br>단체교섭의 자유보장", "강제 및<br>아동 노동의 금지", "산업안전<br>보건 보장", "협력업체<br>인권경영",
         "현지주민의<br>인권보호", "환경권<br>보장", "이해관계자<br>인권보호", "정보 접근권<br>보장", "구제조치<br>제공"]

boxes = ""
for i, (tit, dls) in enumerate(BOXES, 1):
    d = "".join(f"<dl><dt>{a}</dt><dd>{b}</dd></dl>" for a, b in dls)
    boxes += f'<div class="boxwrap fadeUp rv"><div class="img"><img src="./assets/p/m55-{i}.jpg" alt="" width="587" height="190"></div><div class="tit">{tit}</div>{d}</div>\n'
guide = "".join(f'<li class="fadeUp rv"><div class="num"><span>{n:02d}</span></div><div class="tit">{t}</div></li>' for n, t in enumerate(GUIDE, 1))

CSS = """
.m55 .exp{overflow:hidden;display:flex;align-items:center;justify-content:center;width:92%;height:620px;margin:140px auto;background:url(./assets/p/m55-exp.jpg) no-repeat;background-size:cover;border-radius:30px;text-align:center}
.m55 .exp h4{font-size:54px;color:#fff;font-weight:600}
.m55 h5{font-size:39px;color:#000;font-weight:600}
.m55 .exp p{margin-top:15px;font-size:29px;color:#fff;font-weight:600;line-height:1.7em}
.m55 .sec1{padding:0 0 140px}
.m55 .sec1 .conwrap{display:flex;flex-wrap:wrap;justify-content:space-between}
.m55 .sec1 .conwrap .boxwrap{overflow:hidden;width:49%;margin-bottom:4%;padding:20px 20px 55px;background:#f1f1f1;border-radius:30px}
.m55 .sec1 .conwrap .boxwrap .img{overflow:hidden;border-radius:30px}
.m55 .sec1 .conwrap .boxwrap .img img{display:block;width:100%}
.m55 .sec1 .conwrap .boxwrap .tit{padding:30px 0 20px;font-family:"Noto Sans KR",sans-serif;font-size:29px;color:var(--navy);font-weight:700;text-align:center}
.m55 .sec1 .conwrap .boxwrap dl{display:flex;margin-bottom:10px;padding:0 30px}
.m55 .sec1 .conwrap .boxwrap dl:last-child{margin-bottom:0}
.m55 .sec1 .conwrap .boxwrap dl dt{width:71px;height:35px;background:var(--accent);border-radius:18px;font-size:16px;color:#fff;text-align:center;line-height:35px}
.m55 .sec1 .conwrap .boxwrap dl dd{width:calc(100% - 71px);padding:2px 0 0 19px;font-size:19px;color:#333;line-height:1.6em}
.m55 .sec2{padding:190px 0;background:#f9f9f9}
.m55 .sec2 ul{display:flex;flex-wrap:wrap;margin:40px 0 0}
.m55 .sec2 ul li{display:flex;flex-wrap:wrap;align-content:space-between;width:23.85%;height:242px;margin:0 1.5% 3% 0;padding:40px;border:1px solid #ddd;border-radius:30px;background:#fff}
.m55 .sec2 ul li:nth-child(4n){margin-right:0}
.m55 .sec2 ul li .num{width:100%}
.m55 .sec2 ul li .num span{display:inline-block;width:48px;height:48px;background:#f1f1f1;border-radius:50%;font-size:15px;color:var(--navy);font-weight:600;text-align:center;line-height:48px}
.m55 .sec2 ul li .tit{width:100%;font-size:23px;color:#000;font-weight:600;line-height:1.5em}
.m55 .sec3{padding:190px 0}
.m55 .sec3 .conwrap{display:flex;justify-content:space-between;flex-wrap:wrap;margin-top:50px}
.m55 .sec3 .conwrap dl{width:48.5%;padding:40px 0;border-top:1px solid #ddd}
.m55 .sec3 .conwrap dl dt{padding-left:80px;font-size:30px;color:#000;font-weight:600;line-height:60px}
.m55 .sec3 .conwrap dl:nth-child(1) dt{background:url(./assets/ic/hr-mail.svg) no-repeat left top}
.m55 .sec3 .conwrap dl:nth-child(2) dt{background:url(./assets/ic/hr-tel.svg) no-repeat left top}
.m55 .sec3 .conwrap dl dd{margin-top:25px;font-size:19px;color:#333;font-weight:500}
@media(max-width:812px){
  .m55 .exp h4,.m55 h5{font-size:30px}
  .m55 .exp p{font-size:22px}
  .m55 .sec1{padding:0 0 120px}
  .m55 .sec1 .conwrap .boxwrap{width:100%;margin-bottom:20px;border-radius:20px}
  .m55 .sec1 .conwrap .boxwrap .tit{font-size:23px}
  .m55 .sec1 .conwrap .boxwrap dl{display:block;padding:0}
  .m55 .sec1 .conwrap .boxwrap dl dd{width:100%;margin-top:10px;padding:0;font-size:16px}
  .m55 .sec2{padding:120px 0}
  .m55 .sec2 ul li{width:49%;height:200px;margin:0 2% 2% 0;padding:20px;border-radius:20px}
  .m55 .sec2 ul li:nth-child(4n){margin-right:2%}
  .m55 .sec2 ul li:nth-child(2n){margin-right:0}
  .m55 .sec2 ul li .tit{font-size:19px}
  .m55 .sec3{padding:120px 0}
  .m55 .sec3 .conwrap{justify-content:flex-start}
  .m55 .sec3 .conwrap dl{width:100%}
}
"""

src = f"""<!--
title: 인권경영
pn: 5
h2: ESG
sub: 사람과 환경을 생각하는 지속가능경영
h3: 인권경영
lead: 지구 환경을 지키고 지속가능한 사회를 앞장서 만들어 갑니다.
loc: HOME|ESG|인권경영
cls: m55
-->
<style>{CSS}</style>
<div class="sec1">
  <div class="exp"><div>
    <h4 class="fadeUp rv">인권경영 목적</h4>
    <p class="fadeUp rv">누빛광학㈜은 임직원과 회사의 경영·사업 활동에 관련된 이해관계자의 {PB}인권을 지키고 높이기 위한 정책을 세워 시행하는 것을 목적으로 하며, {PB}유엔글로벌콤팩트(UNGC,UN Global Compact) 10대 원칙을 지지하고 존중합니다.</p>
  </div></div>
  <div class="innerwrap">
    <div class="conwrap">
{boxes}    </div>
  </div>
</div>
<div class="sec2">
  <div class="innerwrap">
    <h5>세부 운영지침</h5>
    <div class="conwrap"><ul>{guide}</ul></div>
  </div>
</div>
<div class="sec3">
  <div class="innerwrap">
    <h5>내부 신고</h5>
    <div class="conwrap">
      <dl><dt>E-mail</dt><dd><img src="./assets/p/m55-mail.svg" alt="ethics@nuvit.co.kr" width="187" height="21"></dd></dl>
      <dl><dt>Tel</dt><dd><img src="./assets/p/m55-tel.svg" alt="000-000-0000" width="119" height="15"></dd></dl>
    </div>
  </div>
</div>
"""
(HERE / "human-rights.html").write_text(src, encoding="utf-8")
print("wrote human-rights")
