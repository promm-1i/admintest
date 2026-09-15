"""Industrial 2쪽(레이저 가공용·비전 검사용) 소스 + 거래처 로고 SVG 생성 — 원본 m231/m232 틀."""
from pathlib import Path
HERE = Path(__file__).parent / "pages"
P = Path(__file__).parents[3] / "public/templates/corporate-i/assets/p"

# 원본은 실존 기업 이름이라 가상 이름으로 바꾼다 (글자 수는 비슷하게)
DOMESTIC = [("한누리전자", "HANNURI"), ("한누리디스플레이", "HANNURI DP"), ("한누리전기", "HANNURI EM"), ("다온전자", "DAON"),
            ("다온디스플레이", "DAON DP"), ("빛가람옵틱스", "BITGARAM"), ("빛가람에너지", "BG ENERGY"), ("새온테크닉스", "SAEON TECH"),
            ("라온아이엠에스", "RAON IMS"), ("BT Systems", "BT SYSTEMS"), ("디엠엔티(DM&amp;T)", "DM&amp;T"), ("넥사온", "NEXAON"),
            ("에이제이아이(AJI)", "AJI"), ("하드온", "HARDON"), ("제나솔", "ZENASOL"), ("에이온아이", "AEON-I"),
            ("HJ Technology", "HJ TECH"), ("파인시스템스", "FINE SYSTEMS")]
OVERSEAS = [("ORVEX CORPORATION", "ORVEX"), ("ala", "ala"), ("NovaFusion", "NOVAFUSION"), ("Silera", "SILERA"), ("KTA", "KTA")]
COLORS = ["#2b4c9b", "#1f7a6b", "#b8342c", "#6a4cf0", "#d08a1e", "#3a3f4b"]


def logo(path, name, en, color):
    path.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" width="248" height="100" viewBox="0 0 248 100"><rect width="248" height="100" fill="#fff"/>'
        f'<rect x="40" y="34" width="30" height="30" rx="6" fill="{color}"/>'
        f'<text x="82" y="48" font-family="\'Noto Sans KR\',sans-serif" font-size="14" font-weight="700" fill="#222">{name.split("(")[0]}</text>'
        f'<text x="82" y="64" font-family="Poppins,Arial,sans-serif" font-size="10" font-weight="600" fill="{color}">{en}</text></svg>',
        encoding="utf-8")


def com_list(items, prefix):
    out = ""
    for i, (n, en) in enumerate(items, 1):
        logo(P / f"{prefix}{i}.svg", n, en, COLORS[i % len(COLORS)])
        out += f'<li><div class="img"><img src="./assets/p/{prefix}{i}.svg" alt="" width="248" height="100"></div><div class="tit">{n}</div></li>'
    return out


HEAD = """<!--
title: Industrial {tab}
pn: 2
h2: BUSINESS
sub: 산업마다 맞춘 정밀 광학 솔루션
h3: Industrial
lead: 고성능 정밀 광학 제품을 앞서 만드는 세계적인 광학 전문 기업
loc: HOME|BUSINESS|Industrial
cls: m20 m22 m23 {cls}
-->
<!--HEAD <link rel="stylesheet" href="./assets/biz.css"><link rel="stylesheet" href="./assets/defense.css"><link rel="stylesheet" href="./assets/industrial.css"> -->
<div class="sec1" id="topline">
  <div class="toparea innerwrap">
    <ul class="m22Tabs">{tabs}</ul>
    <div class="tabTitle">{tab}</div>
    <div class="tabTitle2">{tab2}</div>
  </div>
"""
BANNER = '<div class="bannerWrap fadeUp rv"><a href="./inquiry.html"><div class="bg"></div><div class="keoc"></div><div class="con"><span>해당 분야 전문가에게 상담받기</span><span>MORE <i><img src="./assets/more-w7.svg" alt="" width="61" height="7"></i></span></div></a></div>'


def tabs(on):
    ON = ' class="on"'
    return "".join(f'<li{ON if i == on else ""}><a href="./{n}.html#topline">{l}</a></li>'
                   for i, (n, l) in enumerate([("industrial-laser", "레이저 가공용 광학계"), ("industrial-vision", "비전 검사용 광학계")]))


T1 = [("디스플레이", "디스플레이는 스마트폰, TV, 자동차, 웨어러블 기기처럼 일상 곳곳에 쓰이는 기술입니다. 광학 부품은 디스플레이 기술과 함께 계속 발전하고 있으며, 고해상도·저전력·경량화 흐름에 맞춘 설계가 필요합니다. 누빛광학은 디스플레이 생산에 들어가는 광학 부품을 효율적으로 설계하고 제조합니다. 고객사마다 다른 공정 조건에 맞춰 대응할 수 있어 차별화된 경쟁력을 갖추고 있습니다."),
      ("반도체", "반도체는 현대 기술의 중심에 있으며 미세 공정과 높은 정밀도를 요구합니다. 광학 부품은 미세 구조를 만들고 공정의 정확도를 좌우하는 중요한 역할을 맡습니다. 특히 광학 리소그래피 같은 기술에서 광학 부품은 반도체 기술을 한 단계 끌어올리는 핵심 요소입니다.<br>AI, IoT, 5G, 자율주행차 같은 첨단 기술이 발전할수록 더 정밀한 반도체가 필요하고, 이를 받쳐 주는 광학 기술은 산업의 중요한 동력입니다."),
      ("고출력 레이저 광학", "누빛광학은 국제 광학 박막 손상 시험에서 CW irradiation 10 MW/cm² 조건 아래 No damage observed 판정을 받았으며, 산업과 방산 분야에 쓰이는 고출력 레이저 광학 기술에 꾸준히 투자하며 연구 개발을 이어 가고 있습니다. 코팅 설계부터 손상 문턱값 측정까지 직접 수행합니다.")]

li = ""
for k, (tit, txt) in enumerate(T1):
    a, b = ("fadeLeft", "fadeRight") if k % 2 == 0 else ("fadeRight", "fadeLeft")
    li += f'<li><div class="img {a} rv"></div><div class="txts {b} rv"><div class="tit">{tit}</div><div class="txt">{txt}</div></div></li>\n'
laser = HEAD.format(tab="레이저 가공용 광학계", tab2="", cls="m231", tabs=tabs(0)) + f"""  <div class="conwrap t1">
    <div class="exp"></div>
    <div class="innerwrap">
      <h6>핵심 기술</h6>
      <ul class="list type2">
{li}      </ul>
      <div class="comListWrap"><div class="comTit">대표 거래 연구소</div><ul class="comList">{com_list(DOMESTIC, "ind-logo")}</ul><div class="comSubTit">해외</div><ul class="comList">{com_list(OVERSEAS, "ind-t2-logo")}</ul></div>
    </div>
    {BANNER}
  </div>
</div>
"""
PC = '<span class="pcbr"></span>'
vision = HEAD.format(tab="비전 검사용 광학계", tab2=f"고해상도 카메라와 렌즈를 활용해 {PC}제품의 결함과 품질 상태를 정밀하게 살피는 광학 시스템", cls="m232", tabs=tabs(1)) + f"""  <div class="conwrap t2">
    <div class="exp"></div>
    <div class="innerwrap">
      <h5>비전 검사 광학 모듈</h5>
      <p>누빛광학은 정밀 광학 기술을 바탕으로 디스플레이·이차전지·반도체 등 여러 제조 공정에 쓸 수 있는 {PC}비전 검사 광학 모듈을 공급합니다. 고객마다 다른 검사 요구에 맞추기 위해 자체 테스트 벤치를 갖추고 있으며, {PC}실제 시료로 성능을 꼼꼼히 검증하고 공정에 알맞은 검사 조건을 잡을 수 있습니다. {PC}또한 광학계 설계부터 렌즈와 모듈 제작까지 모두 직접 맡아 고객 맞춤형 광학 모듈을 안정적으로 생산하고 있습니다. {PC}이렇게 한곳에서 모두 해내는 역량은 생산 현장의 품질 관리 효율과 정밀도를 함께 끌어올리는 누빛광학만의 핵심 경쟁력입니다.</p>
      <h6>핵심 기술</h6>
      <ul class="list">
        <li class="fadeUp rv"><div class="img"><img src="./assets/p/m23-t2-li1.jpg" alt="" width="588" height="240"></div><div class="tit">테스트 벤치 구축</div><div class="txt">여러 시료 조건에 대응<br>고객 요구에 맞춘 검사 환경 구현</div></li>
        <li class="fadeUp rv"><div class="img"><img src="./assets/p/m23-t2-li2.jpg" alt="" width="588" height="240"></div><div class="tit">맞춤형 설계 및 제작</div><div class="txt">부품 공급에서 그치지 않고, {PC}설계부터 모듈화까지 전 과정을 {PC}직접 맡는 End-to-End 광학 솔루션 제공</div></li>
      </ul>
    </div>
    {BANNER}
  </div>
</div>
"""
(HERE / "industrial-laser.html").write_text(laser, encoding="utf-8")
(HERE / "industrial-vision.html").write_text(vision, encoding="utf-8")
print("wrote industrial-laser, industrial-vision")
