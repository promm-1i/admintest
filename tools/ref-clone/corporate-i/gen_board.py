"""Press/IR 5쪽 소스 — 보도자료 목록(list1)·보기(bbsView), 미디어(list3 + 영상 팝업), IR 공고(list2), 브로슈어(m64)."""
from pathlib import Path
HERE = Path(__file__).parent / "pages"
A = Path(__file__).parents[3] / "public/templates/corporate-i/assets"
PB = '<span class="pcbr"></span>'

(A / "btn-play.svg").write_text('<svg xmlns="http://www.w3.org/2000/svg" width="103" height="103" viewBox="0 0 103 103"><path d="M43 36l24 15.5L43 67z" fill="#fff"/></svg>', encoding="utf-8")
(A / "x-w36.svg").write_text('<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M8 8l20 20M28 8L8 28" stroke="#fff" stroke-width="2.4"/></svg>', encoding="utf-8")
(A / "icon-down.svg").write_text('<svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17"><path d="M9.5 1v10M5 7l4.5 4.5L14 7M1 12v4h17v-4" fill="none" stroke="#6a4cf0" stroke-width="1.6"/></svg>', encoding="utf-8")


def head(title, h3, loc2, cls, extra=""):
    return f"""<!--
title: {title}
pn: 6
h2: PRESS
sub: 누빛광학의 새로운 소식
h3: {h3}
lead: 고성능 정밀 광학 제품을 앞서 만드는 세계적인 광학 전문 기업
loc: HOME|{loc2}|{h3}
cls: {cls}
-->
<!--HEAD <link rel="stylesheet" href="./assets/board.css">{extra} -->
"""


PRESS_TIT = "누빛광학(주) 휴대용 살균기 30대 기탁"
PRESS_TXT = "누빛광학(주)은 최근 지역 복지시설에 스마트폰 살균기 30대를 기탁했습니다."

press = head("Press Release", "Press Release", "PRESS", "bbs") + f"""<div class="innerwrap">
  <div class="slg">누빛광학(주)의 새 소식을 전합니다.</div>
  <ul class="list1">
    <li><a href="./press-view.html"><div class="thumb"><img src="./assets/p/press-1.jpg" alt="" width="1200" height="800"></div><div class="tit">{PRESS_TIT}</div><div class="txt">{PRESS_TXT}</div><div class="date">2022.07.25</div></a></li>
  </ul>
  <div class="paging"><strong>1</strong></div>
</div>
"""
press_view = head("Press Release", "Press Release", "PRESS", "bbs bbsView") + f"""<div class="innerwrap">
  <div class="slg">누빛광학(주)의 새 소식을 전합니다.</div>
  <div class="titlearea"><div class="tit">{PRESS_TIT}</div><div class="date">2022-07-25</div></div>
  <div class="viewcon"><p><span style="color:#3c4858;font-family:'Noto Sans KR',sans-serif;font-size:14px;background-color:#fff">{PRESS_TXT}<br>&nbsp;</span></p></div>
  <div class="btn"><a href="./press.html">목록</a></div>
</div>
"""

MEDIA = [("정밀 광학의 내일을 만나다(경제 채널 인터뷰)", 482, 273), ("누빛광학 홍보 영상", 493, 272), ("누빛광학 모션 그래픽", 1405, 737)]
mli = "".join(f'<li><a data-title="{t}"><div class="thumb"><img src="./assets/p/media-{i}.jpg" alt="" width="{w}" height="{h}"><div class="btnPlay"></div></div><div class="tit">{t}</div></a></li>'
              for i, (t, w, h) in enumerate(MEDIA, 1))
media = head("Media", "Media", "PRESS", "bbs") + f"""<div class="innerwrap">
  <div class="slg">누빛광학(주)의 사업 소개 영상입니다.</div>
  <ul class="list3">{mli}</ul>
  <div class="paging"><strong>1</strong></div>
</div>
<div class="lpop vod" role="dialog" aria-label="영상 보기">
  <div class="btnClose"><a role="button" aria-label="닫기"><img src="./assets/x-w36.svg" alt="" width="36" height="36"></a></div>
  <div class="vodarea"></div>
  <div class="titarea">누빛광학(주)의 사업 소개 영상입니다.</div>
</div>
<script>
// 원본: 목록을 누르면 어두운 막 위에 영상 팝업을 띄운다. 샘플이라 영상 대신 자리 표시를 넣는다
$('.bbs .list3 li').on('click', function () {{
  var t = $(this).find('a').attr('data-title');
  $('.lpop.vod .titarea').text(t);
  $('.lpop.vod .vodarea').html('<div class="vodph">유튜브 영상 주소를 넣으면 이 자리에서 재생됩니다</div>');
  $('#dim').show(); $('.lpop.vod').show();
}});
$('.lpop.vod .btnClose, #dim').on('click', function () {{ $('#dim').hide(); $('.lpop.vod').hide(); $('.lpop.vod .vodarea').html(''); }});
</script>
"""

IR = [("2026.07.22", "(20260722) 전자증권 전환 대상 주권 권리자 보호 안내", "전자증권 전환 대상 주권 권리자 보호 안내 당사는 전자증권제도 시행에 따라 전자등록일 당시 예탁되지 않은 전환 대상 주권 권리자를 보호하기 위해 아래와 같이 안내드립니다.."),
      ("2026.04.30", "(20260430) 무상증자에 따른 신주 발행 공고", "무상증자에 따른 신주 발행 공고 누빛광학㈜(이하 “당사”)는 상법에 따라 이사회 결의로 주식발행초과금 일부를 자본에 넣고 아래와 같이 신주를 발행하기로 했습니다.."),
      ("2026.04.16", "(20260416) 주식 액면분할 공고", "주식 액면분할 공고 1. 누빛광학㈜(이하 “당사”)는 임시 주주총회 결의에 따라 당사 주식 1주의 금액을 분할하기로 했으며, 자세한 일정과 절차는 아래와 같습니다..")]
irli = "".join(f'<li><a href="#"><div class="date">{d}</div><div class="txts"><div class="tit">{t}</div><div class="txt">{x}</div></div><div class="more"><span>MORE</span><i></i></div></a></li>' for d, t, x in IR)
ir = head("IR공고", "IR공고", "IR", "bbs").replace("h2: PRESS", "h2: IR") + f"""<div class="innerwrap">
  <div class="slg">누빛광학(주)에서 알려드립니다.</div>
  <ul class="list2">{irli}</ul>
  <div class="paging"><strong>1</strong></div>
</div>
"""

BRO_P = "누빛광학은 항공, 지상, 해양 등 방위산업의 여러 분야에 정밀 광학 부품과 솔루션을 공급하며 믿을 수 있는 파트너로 자리 잡고 있습니다. 우리의 기술은 최첨단 방위 시스템에서 핵심적인 역할을 맡고 있습니다."
box = f'<div class="boxwrap"><div class="thumb"><img src="./assets/p/m64-brochure.jpg" alt="" width="438" height="578"></div><div class="txts"><div class="toparea"><div class="tit">NUVIT BROCHURE</div><div class="tit2">누빛광학 방위산업 정밀 광학 부품과 솔루션</div></div><div class="btmarea"><p>{BRO_P}</p><div class="down"><a href="#">국문 DOWNLOAD <i></i></a><a href="#">영문 DOWNLOAD <i></i></a></div></div></div></div>'
brochure = head("브로슈어", "브로슈어", "PRESS", "m64") + f"""<style>
.m64{{padding:0 0 200px;overflow:hidden}}
.m64 .slg{{font-size:54px;color:#000;font-weight:700;line-height:1.3em}}
.m64 .conwrap{{margin:110px auto 0}}
.m64 .conwrap .con .boxwrap{{position:relative;display:flex;align-items:center;justify-content:space-between;margin:150px 0 50px;padding:0 100px 100px}}
.m64 .conwrap .con .boxwrap:nth-child(even){{flex-direction:row-reverse}}
.m64 .conwrap .con .boxwrap:after{{display:block;content:"";width:100vw;height:40vh;background:#f2f2f2;position:absolute;left:0;bottom:0;z-index:-1}}
.m64 .conwrap .con .boxwrap .thumb{{overflow:hidden;width:40.74%;border:1px solid #ddd;box-shadow:1px 1px 2px rgba(0,0,0,.1),-1px -1px 2px rgba(0,0,0,.1)}}
.m64 .conwrap .con .boxwrap .thumb img{{display:block;width:100%}}
.m64 .conwrap .con .boxwrap .txts{{width:50%}}
.m64 .conwrap .con .boxwrap .txts .toparea .tit{{font-size:16px;color:var(--accent);font-weight:600}}
.m64 .conwrap .con .boxwrap .txts .toparea .tit2{{margin:20px 0 100px;font-size:42px;color:#000;font-weight:700;line-height:1.3em}}
.m64 .conwrap .con .boxwrap .txts .btmarea{{position:relative}}
.m64 .conwrap .con .boxwrap .txts .btmarea p{{font-size:19px;color:#555;line-height:1.7em}}
.m64 .conwrap .con .boxwrap .txts .btmarea .down{{display:flex;flex-wrap:wrap;justify-content:space-between;margin:35px 0 0}}
.m64 .conwrap .con .boxwrap .txts .btmarea .down a{{display:flex;align-items:center;justify-content:space-between;width:49%;height:60px;padding:0 28px;border:1px solid var(--accent);border-radius:10px;font-size:14px;color:var(--accent);font-weight:600}}
.m64 .conwrap .con .boxwrap .txts .btmarea .down a i{{display:inline-block;width:19px;height:17px;background:url(./assets/icon-down.svg) no-repeat}}
@media(max-width:1399px){{
  .m64 .conwrap .con .boxwrap:after{{width:150vw;left:-35%}}
}}
@media(max-width:812px){{
  .m64{{padding:0 0 120px}}
  .m64 .slg{{font-size:37px}}
  .m64 .conwrap .con .boxwrap,.m64 .conwrap .con .boxwrap:nth-child(even){{display:block;margin:100px 0 50px;padding:0}}
  .m64 .conwrap .con .boxwrap:after{{height:80vh;bottom:-50px}}
  .m64 .conwrap .con .boxwrap .thumb{{width:100%}}
  .m64 .conwrap .con .boxwrap .txts{{width:100%;margin-top:50px}}
  .m64 .conwrap .con .boxwrap .txts .toparea .tit2{{margin:20px 0 50px;font-size:27px}}
  .m64 .conwrap .con .boxwrap .txts .btmarea p{{font-size:16px}}
  .m64 .conwrap .con .boxwrap .txts .btmarea .down a{{width:100%;height:50px;padding:0 20px;margin-bottom:10px}}
}}
</style>
<div class="innerwrap">
  <div class="conwrap">
    <div class="slg">누빛광학(주)의 브로슈어를 만나보세요.</div>
    <div class="con">{box}{box}</div>
  </div>
</div>
"""
for name, src in [("press", press), ("press-view", press_view), ("media", media), ("ir", ir), ("brochure", brochure)]:
    (HERE / f"{name}.html").write_text(src, encoding="utf-8")
print("wrote press, press-view, media, ir, brochure")
