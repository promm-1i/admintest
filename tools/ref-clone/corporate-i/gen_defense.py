"""Defense 3쪽(항공·지상·해양) 소스 생성 — 원본은 한 틀을 공유하고 내용 수만 다르다."""
from pathlib import Path
HERE = Path(__file__).parent / "pages"
LOGOS = ["한결시스템", "누리에어로", "빛나텍", "솔빛윈텍", "마루기술", "아이온시스템", "가온우주항공", "국방광학연구소", "방위기술연구원"]
PAGES = {
  "defense-air": dict(cls="m20 m22 m221", on=0, tab="항공", tab2="하늘에서 앞서기 위한 첨단 광학 기술", t=1,
    h5="정밀 광학으로<br>하늘의 쓰임을 넓히다.",
    p='항공 방위산업은 빠르게 바뀌는 작전 환경에서도 높은 정확도와 안정성을 요구합니다.<br class="pcbr">누빛광학의 정밀 광학 기술은 항공기, 드론, 위성 등 여러 플랫폼에 쓰여 핵심 방위 시스템의 성능을 든든하게 받쳐주고 있습니다.',
    items=[("항공용 열상 광학모듈", '먼 거리 관측과 목표물 탐지를 위한 <span class="pcbr"></span>고성능 열상 광학'),
           ("비전 모듈", '공중 정찰과 감시를 위한 <span class="pcbr"></span>정밀한 광학 모듈'),
           ("EMI 차폐 광학 시스템", '금속 에칭 공정으로 전자파를 막는 차폐 <span class="pcbr"></span>성능을 갖춘 광학계 제작')],
    merits=['고온·저온 등 극한 환경에서도 문제없는 <span class="pcbr"></span>안정적인 내구성', '가벼운 설계로 효율 향상', '높은 신뢰성과 정밀도를 바탕으로 <span class="pcbr"></span>MIL SPEC 준수']),
  "defense-land": dict(cls="m20 m22 m222", on=1, tab="지상", tab2="가장 알맞은 성능과 신뢰성을 드립니다", t=2,
    h5='지상의 모든 전장에서<br>믿고 쓰는 광학 솔루션.',
    p='지상 방위 시스템은 전장의 시야 확보와 정밀 타격이 꼭 필요합니다.<span class="pcbr"></span>누빛광학은 군용 차량 · 전차 · 감시 장비 등 다양한 지상 플랫폼에 꼭 맞춘 광학 기술을 공급합니다.',
    items=[("열상 광학 모듈", '밤낮 없이 정확한 타격과 탐지를 <span class="pcbr"></span>돕는 광학 모듈 공급'),
           ("레이저 거리 측정기", '목표물의 거리와 위치를 <span class="pcbr"></span>정밀하게 알아내는 광학계'),
           ("주간 야간 창", '누빛광학만의 코팅 레시피로 <span class="pcbr"></span>강한 내구성 확보')],
    merits=['험한 지형과 거친 환경에서도 고성능 유지', '환경시험을 거친 높은 내구성 설계']),
  "defense-sea": dict(cls="m20 m22", on=2, tab="해양", tab2="극한 환경에서도 믿고 쓰는 광학 기술", t=3,
    h5='바다의 경계를 넓히는<br>정밀 광학 기술.',
    p='해양 방위산업은 높은 습도와 염분, 거센 파도 속에서도 변함없는 안정성을 요구합니다.<span class="pcbr"></span>누빛광학의 광학 기술은 해양 작전에 꼭 필요한 탐지와 추적 시스템에 두루 쓰입니다.',
    items=[("해양용 광학모듈", '바다 위 목표물 식별과 추적이 <span class="pcbr"></span>가능한 광학계 공급'),
           ("EMI 차폐 광학 시스템", '금속 에칭 공정으로 전자파를 막는 차폐 <span class="pcbr"></span>성능을 갖춘 광학계 제작')],
    merits=['온도·습도·염분 환경시험을 거친 내구성 높은 설계']),
}
STYLE = ""
for name, d in PAGES.items():
    ON = ' class="on"'
    tabs = "".join(f'<li{ON if i == d["on"] else ""}><a href="./{n}.html#topline">{l}</a></li>' for i, (n, l) in enumerate([("defense-air", "항공"), ("defense-land", "지상"), ("defense-sea", "해양")]))
    items = ""
    for k, (tit, txt) in enumerate(d["items"], 1):
        if txt is None:
            continue
        items += f'<li class="fadeUp rv"><div class="img"><img src="./assets/p/m22-t{d["t"]}-{k}.jpg" alt="" width="370" height="170"></div><div class="tit">{tit}</div><div class="txt">{txt}</div></li>\n'
    logos = "".join(f'<li><div class="img"><img src="./assets/p/def-logo{i}.svg" alt="" width="248" height="100"></div><div class="tit">{n}</div></li>' for i, n in enumerate(LOGOS, 1))
    merits = "".join(f'<li class="fadeUp rv"><div class="num">{i:02d}</div><div class="txt">{m}</div></li>' for i, m in enumerate(d["merits"], 1))
    src = f"""<!--
title: Defense {d['tab']}
pn: 2
h2: BUSINESS
sub: 산업마다 맞춘 정밀 광학 솔루션
h3: Defense
lead: 고성능 정밀 광학 제품을 앞서 만드는 세계적인 광학 전문 기업
loc: HOME|BUSINESS|Defense
cls: {d['cls']}
-->
<!--HEAD <link rel="stylesheet" href="./assets/biz.css"><link rel="stylesheet" href="./assets/defense.css"> -->
<div class="sec1" id="topline">
  <div class="toparea innerwrap">
    <h4>정밀 광학 기술로 <span class="pcbr"></span>방위산업의 내일을 이끌다.</h4>
    <p>누빛광학은 항공, 지상, 해양 등 방위산업의 여러 분야에 정밀 광학 부품과 솔루션을 공급하며, <span class="pcbr"></span>믿을 수 있는 파트너로 자리 잡고 있습니다. 우리의 기술은 최첨단 방위 시스템에서 핵심 역할을 맡고 있습니다.</p>
    <ul class="m22Tabs">{tabs}</ul>
    <div class="tabTitle">{d['tab']}</div>
    <div class="tabTitle2">{d['tab2']}</div>
  </div>
  <div class="conwrap t{d['t']}">
    <div class="exp rv"><div><h5 class="fadeUp rv">{d['h5']}</h5><p class="fadeUp rv">{d['p']}</p></div></div>
    <div class="innerwrap">
      <h6>핵심 기술 및 제품</h6>
      <ul class="list">
{items}      </ul>
      <div class="comListWrap"><div class="comTit">대표 거래 연구소</div><ul class="comList">{logos}</ul></div>
    </div>
  </div>
  <div class="merit t{d['t']}">
    <div class="innerwrap">
      <h6>특장점</h6>
      <ul>{merits}</ul>
      <div class="banner fadeUp rv"><a href="./inquiry.html"><div class="bg"></div><div class="keoc"></div><div class="con"><span>해당 분야 전문가에게 상담받기</span><span>MORE <i><img src="./assets/more-w7.svg" alt="" width="61" height="7"></i></span></div></a></div>
    </div>
  </div>
</div>
"""
    (HERE / f"{name}.html").write_text(src, encoding="utf-8")
    print("wrote", name)
