# -*- coding: utf-8 -*-
"""
이로한의원 — 베이스 1개 + 섹션 이식으로 만든 첫 합본 템플릿.

레퍼런스 클론이 아니다. 내가 가진 프리미엄 디자인에서 가져와 합친다.

  베이스   semroot(셈루트)   셸·토큰·리듬·메인 6섹션(in/bk/sl/dt/rv/ep)
  이식 1   ondam(온담푸드)    .steps  → 진료 진행 단계
  이식 2   haesol(해솔건축)   .lst    → 치료 사례 그리드
  이식 3   bodien(바디언)     .faq    → 자주 묻는 질문 아코디언

베이스를 고른 이유: 59종 중 토큰 레이어가 완성된 유일한 템플릿이다.
`html{font-size:6.25%}` 로 1rem=1px 이고 뷰포트 비례로 줄어, 색 3줄·글꼴 2줄만
바꾸면 브랜드가 통째로 갈린다. 공통 CSS(site.css)는 전 쪽이 공유하고 섹션 CSS 는
쪽마다 <style> 안에 따로 있어, 이식해도 다른 쪽을 건드리지 않는다.

이식 환산 — 치수는 전부 1rem=1px 로 맞춘 뒤 색·글꼴만 이 템플릿 사다리로 바꿨다.
  ondam  : 같은 6.25% 체계라 치수 1:1. --f13 16→--f10, --f14 14→--f11,
           --lh13 26rem(=1.625)→--lh11 1.6, --blush(브랜드 틴트)→--tint
  haesol : 16px 루트 + px 표기 → px 숫자를 그대로 rem 으로. #767676 은
           --g600 과 값이 정확히 같다. #000→--black, Poppins→--fd
  bodien : 16px 루트 + px 표기 → 그대로 rem. 21→--f08, 19→--f09, 17→--f10,
           14→--f11. #ccc→--g400, #ddd→--g300, #f9f9f9→--g100(중립 유지), #777→--g600

재실행하면 public/iro/*.html 을 전부 덮어쓴다. 사진을 설치한 뒤에는 돌리지 말 것.
"""
import io, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
SRC = os.path.join(ROOT, 'public', 'semroot')
OUT = os.path.join(ROOT, 'public', 'iro')

B = dict(
    name='이로한의원',
    en='IRO',
    tel='010-4894-4905',
    mail='6gsmake@gmail.com',
    owner='김진수',
    biz='266-07-03678',
    addr='서울특별시 성동구 왕십리로 123 민트클빌딩 4층',
    hours='평일 09:30~19:00 · 토요일 09:30~14:00 (일·공휴일 휴진)',
)

NAV = [
    ('about.html', '한의원 소개', []),
    ('treatment.html', '진료 안내', [
        ('treatment.html', '진료 과목 전체', '침·약침부터 한약까지 여섯 가지'),
        ('t-chimgu.html', '침·약침 치료', '통증의 원인 자리를 직접 풉니다'),
    ]),
    ('cases.html', '치료 사례', []),
    ('reviews.html', '환자 후기', []),
    ('location.html', '오시는 길', []),
    ('contact.html', '예약·상담', []),
]

# ── 진료 과목 (sl 플립 카드 / treatment.html 공용) ──────────────────
SUBJECTS = [
    ('침·약침 치료', 'tr-1.jpg', '굳은 자리를 직접 풀어 통증의 원인을 다룹니다',
     '통증이 있는 자리만 보지 않고 그 자리를 당기고 있는 근육과 관절까지 함께 봅니다. 약침은 한약재에서 뽑은 액을 혈자리에 직접 넣어 침의 자극에 약의 작용을 더합니다.'),
    ('추나 요법', 'tr-2.jpg', '틀어진 뼈와 관절을 손으로 바로잡습니다',
     '손과 몸으로 척추와 관절의 어긋난 자리를 제자리로 돌립니다. 건강보험이 적용되는 치료이며, 자세를 틀어지게 만든 생활 습관까지 같이 짚어 드립니다.'),
    ('맞춤 한약', 'tr-3.jpg', '같은 증상이라도 몸에 따라 처방이 달라집니다',
     '진맥과 문진으로 몸의 상태를 먼저 읽습니다. 체질과 지금의 컨디션에 맞춰 약재를 정하고, 원내 탕전실에서 달여 드립니다.'),
    ('공진단·경옥고', 'tr-4.jpg', '기력이 떨어진 몸을 끌어올립니다',
     '오래 지친 몸, 회복이 느린 몸에 씁니다. 재료의 등급과 원산지를 진료실에서 직접 보여 드리고 고르시게 합니다.'),
    ('부항·뜸', 'tr-5.jpg', '순환이 막힌 자리를 데우고 뚫습니다',
     '뭉친 자리의 순환을 끌어올려 침 치료의 효과를 오래 가게 합니다. 자극의 세기는 처음 받으시는 분께 맞춰 조절합니다.'),
    ('한방 다이어트', 'tr-6.jpg', '굶기지 않고 몸의 흐름을 바꿉니다',
     '체중만 보지 않고 부종·소화·수면까지 함께 봅니다. 한약과 침, 식사 상담을 묶어 4주 단위로 진행합니다.'),
]

# ── 진료 진행 단계 (ondam .steps 이식) ─────────────────────────────
STEPS = [
    ('01', '예약 접수', '전화 또는 온라인'),
    ('02', '초진 상담', '언제부터 아팠는지부터'),
    ('03', '진맥 · 체형 검사', '몸의 상태를 먼저 읽습니다'),
    ('04', '치료 계획 설명', '기간과 비용을 먼저 알려 드립니다'),
    ('05', '치료 · 경과 관찰', '회차마다 변화를 기록합니다'),
]

# ── 치료 사례 (haesol .lst 이식) ───────────────────────────────────
CASES = [
    ('목·어깨 통증', '책상 앞 하루 10시간, 돌아가지 않던 목', 'cs-1.jpg'),
    ('허리 디스크', '앉았다 일어설 때마다 멈칫하던 허리', 'cs-2.jpg'),
    ('교통사고 후유증', '사고 두 달 뒤에 찾아온 두통', 'cs-3.jpg'),
    ('무릎 관절', '계단을 옆으로 내려가던 무릎', 'cs-4.jpg'),
    ('만성 소화불량', '먹으면 체하던 2년', 'cs-5.jpg'),
    ('산후 회복', '손목과 발목이 시리던 산후 6개월', 'cs-6.jpg'),
    ('수면 장애', '새벽 세 시에 눈이 떠지던 날들', 'cs-7.jpg'),
    ('한방 다이어트', '12주, 숫자보다 먼저 바뀐 것', 'cs-8.jpg'),
    ('안면 마비', '한쪽만 움직이던 얼굴', 'cs-9.jpg'),
]

# ── 자주 묻는 질문 (bodien .faq 이식) ──────────────────────────────
FAQ = [
    ('한의원 치료도 건강보험이 되나요?',
     '됩니다. 침·뜸·부항은 건강보험이 적용되고, 추나 요법도 연 20회까지 보험이 적용됩니다. 한약과 약침 일부는 비급여입니다. 진료 전에 어느 항목이 보험이고 어느 항목이 비급여인지 금액까지 적어서 보여 드립니다.'),
    ('첫 진료는 얼마나 걸리나요?',
     '초진은 상담과 진맥, 체형 검사를 함께 해서 40분 정도 걸립니다. 재진은 치료 시간까지 30분 안팎입니다. 예약하고 오시면 기다리는 시간이 거의 없습니다.'),
    ('한약은 꼭 먹어야 하나요?',
     '아닙니다. 침과 추나만으로 충분한 경우에는 한약을 권하지 않습니다. 필요하다고 판단되면 왜 필요한지, 얼마 동안 드셔야 하는지 먼저 설명드리고 결정은 환자분이 하십니다.'),
    ('자동차보험으로 치료받을 수 있나요?',
     '가능합니다. 교통사고 후유증은 자동차보험으로 본인 부담 없이 치료받으실 수 있습니다. 접수증 번호만 알려 주시면 보험사 접수까지 저희가 도와 드립니다.'),
    ('임신 중에도 치료받을 수 있나요?',
     '가능합니다. 임신 주수에 따라 쓰지 않는 혈자리와 약재가 있어, 임신 사실을 먼저 알려 주시면 그에 맞춰 치료 방법을 정합니다.'),
    ('주차는 되나요?',
     '건물 지하 주차장에 2시간 무료 주차됩니다. 접수 시 차량 번호를 말씀해 주세요. 만차일 때는 바로 옆 공영주차장을 안내해 드립니다.'),
]

REVIEWS = [
    ('목·어깨', '세 번째 치료부터 아침에 목이 돌아갔어요', '성수동 · 30대 직장인'),
    ('허리', '수술 얘기까지 들었는데 지금은 걷습니다', '금호동 · 50대'),
    ('산후 회복', '손목 시린 게 없어진 게 제일 큽니다', '옥수동 · 30대'),
    ('다이어트', '굶지 않았는데 11kg 빠졌습니다', '행당동 · 40대'),
    ('교통사고', '보험 접수까지 다 해주셔서 편했어요', '왕십리 · 20대'),
    ('소화불량', '2년 만에 밥이 맛있어졌습니다', '응봉동 · 60대'),
]

NUMBERS = [
    ('누적 진료', '68000', '건'),
    ('재방문율', '91', '%'),
    ('평균 대기', '7', '분'),
    ('진료 경력', '18', '년'),
]


# ══════════════════════════════════════════════════════════════════
# 베이스에서 섹션 CSS·JS 를 떼어 온다 (손으로 다시 쓰지 않는다)
# ══════════════════════════════════════════════════════════════════

def base_index():
    return io.open(os.path.join(SRC, 'index.html'), encoding='utf-8').read()


def split_rules(css):
    """최상위 규칙/미디어쿼리를 통째로 끊는다."""
    out, depth, start = [], 0, 0
    for i, ch in enumerate(css):
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                out.append(css[start:i + 1])
                start = i + 1
    tail = css[start:].strip()
    if tail:
        out.append(tail)
    return out


def drop_ct(css):
    """ct(5열 모션) 섹션은 안 쓴다 — 규칙을 통째로 들어낸다."""
    kept = []
    for r in split_rules(css):
        if r.lstrip().startswith('@media'):
            head, _, inner = r.partition('{')
            inner = inner.rstrip()[:-1]
            sub = [x for x in split_rules(inner) if not re.match(r'\s*\.ct[-.\s]', x)]
            if sub:
                kept.append(head + '{' + ''.join(sub) + '}')
        elif not re.match(r'\s*\.ct[-.\s]', r):
            kept.append(r)
    return ''.join(kept)


# 섹션 CSS 에 토큰을 안 거치고 박혀 있던 옛 브랜드색 — 전수로 훑어 찾은 네 군데다.
# .rv-cat 의 밝은 끝(#3FA35F)은 흰 글자 대비가 3.2 라 작은 글자에 못 쓴다.
# 이로에서는 --sec → --pri 로 잡아 6.38 을 확보했다.
BRAND_SWAP = [
    ('rgba(10,160,106,.55)', 'rgba(78,158,120,.55)'),            # .dt-bg 글로우
    ('#CDEFE0', '#DCEAE1'),                                       # .rv-slide:hover 바탕
    ('linear-gradient(95deg,#067A50 1.78%,#3FA35F 97.65%)',
     'linear-gradient(95deg,#234F3B 1.78%,#2E6A4F 97.65%)'),      # .rv-cat 배지
]


# 베이스에서 가져온 섹션 CSS 의 결함 수리.
#   .in-slide:first-child 는 padding-top(31.87%) 으로만 높이를 만든다. 그 안의
#   .in-link 는 height:100% 라 "콘텐츠 높이 0" 을 받아 0 이 되고, 그 안의 img 는
#   inset:0 절대배치라 같이 0 이 된다 → 히어로 첫 장 사진이 아예 안 보인다.
#   2~3번째 장은 .in-slide:not(:first-child) .in-link 가 absolute inset:0 이라 멀쩡하다.
#   첫 장도 같은 방식으로 깔아 준다. 셈루트(/semroot/) 원본에도 그대로 있는 결함이다.
BASE_FIX = """
.in-slide:first-child .in-link{position:absolute;inset:0;height:auto}
"""


def base_section_css():
    h = base_index()
    css = re.search(r'<style[^>]*>([\s\S]*?)</style>', h).group(1)
    css = drop_ct(css)
    for a, b in BRAND_SWAP:
        css = css.replace(a, b)
    for a, _ in BRAND_SWAP:
        assert a not in css, '옛 브랜드색이 남았다: %s' % a
    return css


def base_section_js():
    """최상위 IIFE 중 ct 를 건드리는 블록만 버린다."""
    h = base_index()
    body = [m.group(2) for m in re.finditer(r'<script([^>]*)>([\s\S]*?)</script>', h) if m.group(2).strip()][0]
    marks = [m.start() for m in re.finditer(r'\(function\(\)\{', body)] + [len(body)]
    out = [body[:marks[0]]]
    for i in range(len(marks) - 1):
        chunk = body[marks[i]:marks[i + 1]]
        if '.ct-' in chunk:
            continue
        out.append(chunk)
    return ''.join(out)


# ══════════════════════════════════════════════════════════════════
# 이식 3종 CSS — 출처 값을 이 템플릿 사다리로 옮긴 것
# ══════════════════════════════════════════════════════════════════

GRAFT_CSS = """
/* ── 이식 1 · 진료 진행 단계 (출처: ondam .steps) ──────────────────
   같은 1rem=1px 체계라 치수는 1:1. --f13→--f10, --f14→--f11,
   --lh13 26rem(=1.625)→--lh11, --blush(브랜드 틴트)→--tint 만 바꿨다. */
.steps ul{display:flex;gap:40rem}
.steps ul+ul{margin-top:41rem}
.steps li{flex:1 1 0;height:183rem;border-radius:100rem;border:1px solid var(--g300);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:0 16rem;transition:border-color .3s,background .3s}
.steps li:hover{border-color:var(--pri);background:var(--tint)}
/* 출처는 .steps em/b/span 이었지만 이 베이스의 섹션 제목에도 span(.mk 강조)이 있다.
   그대로 두면 h2 안의 .mk 가 14rem 으로 쪼그라든다 — li 안으로 가둔다. */
.steps li em{font-family:var(--fd);font-style:normal;font-size:var(--f11);font-weight:700;color:var(--pri)}
.steps li b{margin-top:10rem;font-size:var(--f10);line-height:var(--lh11);font-weight:600}
.steps li span{margin-top:6rem;font-size:var(--f11);color:var(--g600)}

/* ── 이식 2 · 치료 사례 그리드 (출처: haesol .pg-works .lst) ───────
   16px 루트 + px 표기였다. px 숫자를 그대로 rem 으로 옮겼다(=같은 크기).
   #767676 은 --g600 과 값이 정확히 같고, #000→--black, Poppins→--fd. */
.cs-list{display:flex;flex-wrap:wrap;column-gap:20rem;row-gap:100rem}
.cs-list li{width:calc((100% - 40rem) / 3)}
.cs-list a{display:block}
.cs-th{display:block;position:relative;width:100%;overflow:hidden;border-radius:4rem}
.cs-th img{width:100%;height:auto;transition:transform 1s}
.cs-list li:hover .cs-th img{transform:scale(1.1)}
.cs-more{display:block;position:absolute;inset:0;background:rgba(0,0,0,.5);opacity:0;transition:opacity .3s}
.cs-list li:hover .cs-more{opacity:1}
.cs-more span{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  white-space:nowrap;font-family:var(--fd);font-size:var(--f09);font-weight:500;
  color:var(--white);border-bottom:1px solid var(--white)}
.cs-txs{display:block;margin-top:20rem}
.cs-cat{display:block;font-family:var(--fd);font-size:var(--f10);color:var(--g600)}
.cs-nm{display:block;margin-top:4rem;font-size:var(--f08);font-weight:600;line-height:var(--lh08);color:var(--black)}

/* ── 이식 3 · 자주 묻는 질문 (출처: bodien .faq) ───────────────────
   16px 루트 + px 표기 → 그대로 rem. 21→--f08, 19→--f09, 17→--f10, 14→--f11.
   #ccc→--g400, #ddd→--g300, #777→--g600, #f9f9f9 는 중립을 살려 --g100. */
.fq{border-top:1px solid var(--g400);word-break:keep-all}
.fq-q{border-bottom:1px solid var(--g300);transition:background .24s}
.fq-q button{display:flex;align-items:flex-start;justify-content:space-between;
  width:100%;padding:25rem 0;text-align:left}
.fq-mark{flex:none;width:112rem;text-align:center}
.fq-mark span{display:inline-flex;align-items:center;justify-content:center;
  width:42rem;height:42rem;border:1px solid var(--g400);border-radius:50%;
  font-family:var(--fd);font-size:var(--f08);font-weight:600;color:var(--pri)}
.fq-tit{flex:1;padding:8rem 0 0;font-size:var(--f09);font-weight:600;color:var(--black)}
.fq-arr{flex:none;width:80rem;text-align:center}
.fq-arr::after{display:inline-block;content:"";width:8rem;height:8rem;margin-top:16rem;
  border-right:2rem solid var(--g600);border-bottom:2rem solid var(--g600);
  transform:rotate(45deg);transition:transform .24s}
.fq-q.on{background:var(--g100)}
.fq-q.on .fq-arr::after{transform:rotate(225deg)}
.fq-a{display:none;padding:25rem 0;background:var(--g100);border-bottom:1px solid var(--g300)}
.fq-a.on{display:block}
.fq-a>div{display:flex}
.fq-a .fq-mark span{color:var(--white);background:var(--sec);border-color:var(--sec)}
.fq-txt{flex:1;padding:6rem 112rem 0 0;font-size:var(--f10);line-height:1.8;color:var(--g800)}

@media (max-width:1200px){
  .cs-list li{width:calc((100% - 20rem) / 2)}
}
@media (max-width:860px){
  .steps ul{flex-wrap:wrap;gap:16rem}
  .steps ul+ul{margin-top:16rem}
  .steps li{flex:0 0 calc(50% - 8rem);height:120rem;border-radius:16rem}
  .cs-list{row-gap:60rem}
  .cs-list li{width:100%}
  .fq-mark,.fq-a .fq-mark{width:80rem}
  .fq-tit{font-size:var(--f10)}
  .fq-txt{padding:6rem 40rem 0 0;font-size:var(--f11)}
}
"""

GRAFT_JS = """
(function(){
  /* 이식 3 · FAQ 아코디언 — 출처 bodien 은 jQuery slideToggle 이었다.
     이 템플릿은 라이브러리가 없어 aria-expanded 로 직접 여닫는다. */
  document.querySelectorAll('.fq-q button').forEach(function(btn){
    btn.addEventListener('click', function(){
      var q = btn.parentElement;
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      q.classList.toggle('on', !open);
      var a = q.nextElementSibling;
      if (a && a.classList.contains('fq-a')) a.classList.toggle('on', !open);
    });
  });
})();
"""


# ══════════════════════════════════════════════════════════════════
# 셸 (베이스의 header/footer 구조를 그대로, 내용만 이로한의원으로)
# ══════════════════════════════════════════════════════════════════

LOGO = ('<svg viewBox="0 0 130 30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="이로한의원">'
        '<path d="M4 21 C4 9 12 5 18 11 C24 17 30 13 30 7" fill="none" stroke="currentColor" '
        'stroke-width="2.4" stroke-linecap="round"/>'
        '<text x="36" y="22" font-family="Cormorant Garamond,Pretendard,serif" font-size="19" '
        'font-weight="600" letter-spacing="1.5" fill="currentColor">IRO</text>'
        '<text x="74" y="22" font-family="Pretendard,sans-serif" font-size="13" '
        'font-weight="600" fill="currentColor">한의원</text></svg>')


def header(cur):
    items = []
    for href, label, subs in NAV:
        on = ' is-on' if href == cur else ''
        sub = ''
        if subs:
            lis = ''.join('<li><a href="./%s"><span>%s</span><em>%s</em></a></li>' % s for s in subs)
            sub = '<ul class="nav-sub">%s</ul>' % lis
        items.append('<li class="nav-item%s"><a href="./%s"><span>%s</span></a>%s</li>' % (on, href, label, sub))
    return (
        '<header id="header">\n  <div class="shell">\n'
        '    <p id="logo"><a href="./index.html" aria-label="%s 홈">%s</a></p>\n'
        '    <nav class="nav" aria-label="주 메뉴"><ul class="nav-list">%s</ul></nav>\n'
        '    <div class="hd-utils"><a class="hd-login" href="./location.html">오시는 길</a>'
        '<a class="hd-start" href="./contact.html">진료 예약</a></div>\n'
        '    <button id="hd-toggle" type="button" aria-label="메뉴 열기"><i></i><i></i><i></i></button>\n'
        '  </div>\n</header>' % (B['name'], LOGO, ''.join(items))
    )


def footer():
    cols = []
    for href, label, subs in NAV:
        links = subs if subs else [(href, label, '')]
        lis = ''.join('<li><a href="./%s">%s</a></li>' % (h, t) for h, t, _ in links)
        cols.append('<div class="ft-col"><h3>%s</h3><ul>%s</ul></div>' % (label, lis))
    sns = ''.join('<a href="./contact.html" aria-label="%s"><span aria-hidden="true">%s</span></a>' % (a, b)
                  for a, b in [('인스타그램', 'IG'), ('네이버 블로그', 'BLOG'), ('카카오톡 상담', 'KAKAO'),
                               ('네이버 예약', '예약')])
    return (
        '<footer id="footer">\n  <div class="shell">\n'
        '    <div class="ft-top">\n'
        '      <p class="ft-logo">%s</p>\n'
        '      <nav class="ft-nav" aria-label="푸터 메뉴">%s</nav>\n'
        '    </div>\n'
        '    <div class="ft-mid">\n'
        '      <div class="ft-contact">\n'
        '        <p class="ft-tel">진료 예약 <b>%s</b></p>\n'
        '        <p>%s</p>\n'
        '        <p>진료 문의 %s</p>\n'
        '      </div>\n'
        '      <div class="ft-sns">%s</div>\n'
        '    </div>\n'
        '    <p class="ft-biz">%s · 대표자 %s · 사업자등록번호 %s<br>%s</p>\n'
        '    <div class="ft-bot">\n'
        '      <p class="ft-copy">© 2026 %s. ALL RIGHTS RESERVED.</p>\n'
        '      <nav class="ft-policy"><a href="./contact.html">진료 안내</a>'
        '<a href="./contact.html"><b>개인정보 처리방침</b></a>'
        '<a href="./location.html">오시는 길</a></nav>\n'
        '    </div>\n  </div>\n</footer>'
        % (LOGO, ''.join(cols), B['tel'], B['hours'], B['mail'], sns,
           B['name'], B['owner'], B['biz'], B['addr'], B['en'])
    )


def page(fname, title, desc, body, css='', js='', home=False):
    html = (
        '<!DOCTYPE html>\n<html lang="ko">\n<head>\n'
        '<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
        '<title>%s</title>\n'
        '<meta name="description" content="%s">\n'
        '<meta property="og:title" content="%s">\n'
        '<meta property="og:description" content="%s">\n'
        '<meta property="og:type" content="website">\n'
        '<meta property="og:image" content="./og.jpg">\n'
        '<link rel="icon" href="./favicon.svg" type="image/svg+xml">\n'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">\n'
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&display=swap">\n'
        '<link rel="stylesheet" href="./assets/site.css">\n'
        '%s</head>\n<body%s>\n%s\n<main>\n%s\n</main>\n%s\n'
        '<script src="./assets/site.js"></script>\n%s</body>\n</html>\n'
        % (title, desc, title, desc,
           ('<style>\n%s\n</style>\n' % css) if css else '',
           ' class="home"' if home else '',
           header(fname), body, footer(),
           ('<script>\n%s\n</script>\n' % js) if js else '')
    )
    io.open(os.path.join(OUT, fname), 'w', encoding='utf-8', newline='').write(html)
    return len(html)


def digits(num):
    """dt 섹션의 숫자 롤 — 자리마다 그 숫자부터 10개를 깔아 둔다(베이스 방식)."""
    out = []
    for ch in num:
        if not ch.isdigit():
            out.append('<span class="dg-sep">%s</span>' % ch)
            continue
        d = int(ch)
        spans = ''.join('<span>%d</span>' % ((d + k) % 10) for k in range(10))
        out.append('<span class="dg-list"><span class="dg-roll" style="--d:%d">%s</span></span>' % (d, spans))
    return ''.join(out)


def comma(n):
    return format(int(n), ',')


ICONS = {
    'needle': '<path d="M12 36L36 12M30 12h6v6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    'hand': '<path d="M16 32V16a3 3 0 016 0v12m0-10a3 3 0 016 0v10m0-7a3 3 0 016 0v11a9 9 0 01-9 9h-4a9 9 0 01-9-9v-5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    'herb': '<path d="M24 38V18m0 0c0-6 5-10 11-10 0 7-4 12-11 12zm0 6c0-5-4-9-10-9 0 6 4 10 10 10z" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    'pill': '<circle cx="24" cy="24" r="13" fill="none" stroke="#fff" stroke-width="3"/><path d="M18 24h12" stroke="#fff" stroke-width="3" stroke-linecap="round"/>',
    'cup': '<path d="M14 16h20v10a10 10 0 01-20 0zM34 19h4a4 4 0 010 8h-4M12 38h24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    'scale': '<path d="M24 12v24M14 20h20M17 20l-4 9a5 5 0 008 0zM31 20l-4 9a5 5 0 008 0z" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
}
ICON_ORDER = ['needle', 'hand', 'herb', 'pill', 'cup', 'scale']

HERO_ALT = [
    '진료실에서 진맥을 보는 모습',
    '원내 탕전실에서 한약을 달이는 모습',
    '치료실 침대와 온열 장비',
]


def sec_in():
    slides = []
    for i in range(1, 4):
        eager = ' fetchpriority="high"' if i == 1 else ' loading="lazy"'
        slides.append('<li class="in-slide"><a class="in-link" href="./treatment.html">'
                      '<img src="./assets/in-%d.jpg" alt="%s" width="1240" height="395"%s></a></li>'
                      % (i, HERO_ALT[i - 1], eager))
    return (
        '<section class="sec-main in" aria-labelledby="in-t"><div class="shell">'
        '<div class="in-content"><div class="in-col">'
        '<h1 class="in-title" id="in-t">아픈 자리만 보지 않고<br>그 자리를 당긴 몸을 봅니다</h1></div>'
        '<div class="in-col in-col--side"><p class="in-desc">성동구 왕십리 18년, 이로한의원<br>'
        '초진 상담 40분 · <span>치료 기간과 비용을 먼저</span> 알려 드립니다</p>'
        '<div class="in-ctrl"><a class="btn btn--fill" href="./contact.html">진료 예약하기</a>'
        '<a class="btn btn--line" href="./treatment.html">진료 과목 보기</a></div></div></div>'
        '<div class="in-visual"><ul class="in-slider">%s</ul>'
        '<div class="in-ctrl-row"><div class="in-dots" aria-label="화면 넘기기"></div>'
        '<button class="in-state" type="button" aria-label="자동 넘김 멈춤"></button></div></div>'
        '</div></section>' % ''.join(slides)
    )


BK = [
    ('진료실', '처음 오신 분께 40분을 씁니다', '언제부터, 어떤 자세에서 아픈지부터 듣습니다'),
    ('탕전실', '한약은 원내에서 달입니다', '약재가 들어가는 과정을 직접 보실 수 있습니다'),
    ('추나 치료실', '보험이 적용되는 추나', '연 20회까지 건강보험으로 받으실 수 있습니다'),
    ('약재실', '등급과 원산지를 공개합니다', '쓰는 약재를 진료실에서 꺼내 보여 드립니다'),
    ('회복실', '치료 뒤 20분', '온열 침대에서 몸을 데우고 가십니다'),
]

CHEV = ('<span class="bk-more" aria-hidden="true"><svg viewBox="0 0 24 24">'
        '<path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" '
        'stroke-linecap="round" stroke-linejoin="round"/></svg></span>')


def sec_bk():
    out = []
    for i, (cap, b, em) in enumerate(BK, 1):
        out.append('<li class="bk-slide"><a class="bk-link" href="./about.html">'
                   '<img src="./assets/bk-%d.jpg" alt="%s" width="1240" height="580" loading="lazy">'
                   '<span class="bk-cap"><b>%s</b><em>%s</em></span>%s</a></li>'
                   % (i, cap, b, em, CHEV))
    return (
        '<section class="sec-main bk" aria-labelledby="bk-t"><div class="shell">'
        '<div class="sec-head" data-rv><h2 class="sec-h2" id="bk-t">이로한의원은 <br>'
        '<span class="mk">이렇게 진료합니다</span></h2>'
        '<p class="sec-p">진료실부터 탕전실까지 <br>다섯 곳을 하나씩 보여 드립니다.</p></div></div>'
        '<div class="bk-wrap"><ul class="bk-slider">%s</ul>'
        '<button class="bk-prev" type="button" aria-label="이전 화면"></button>'
        '<button class="bk-next" type="button" aria-label="다음 화면"></button>'
        '<p class="bk-num"><b>1</b> / %d</p></div></section>' % (''.join(out), len(BK))
    )


def sec_sl():
    out = []
    for i, (name, img, short, _long) in enumerate(SUBJECTS, 1):
        ico = ICONS[ICON_ORDER[i - 1]]
        out.append('<li class="sl-item"><a class="sl-link" href="./treatment.html">'
                   '<span class="sl-inner"><span class="sl-front">'
                   '<img src="./assets/%s" alt="%s" width="440" height="609" loading="lazy">'
                   '<b class="sl-name">%s</b></span>'
                   '<span class="sl-back"><span class="sl-back-in"><span class="sl-ico">'
                   '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">%s</svg>'
                   '</span><span class="sl-desc">%s</span>'
                   '<span class="sl-more">자세히 보기</span></span></span></span></a></li>'
                   % (img, name, name, ico, short))
    return (
        '<section class="sec-main sl sec-main--secondary" aria-labelledby="sl-t"><div class="shell">'
        '<div class="sec-head" data-rv><h2 class="sec-h2" id="sl-t">이로한의원이 <br>'
        '<span class="mk">보는 여섯 가지</span></h2></div>'
        '<ul class="sl-list">%s</ul></div></section>' % ''.join(out)
    )


def sec_steps():
    rows = ''.join('<li data-rv><em>%s</em><b>%s</b><span>%s</span></li>' % s for s in STEPS)
    return (
        '<section class="sec-main steps sec-main--secondary" aria-labelledby="st-t"><div class="shell">'
        '<div class="sec-head" data-rv><h2 class="sec-h2" id="st-t">처음 오시면 <br>'
        '<span class="mk">이 순서로 진행합니다</span></h2>'
        '<p class="sec-p">치료를 시작하기 전에 <br>기간과 비용을 먼저 알려 드립니다.</p></div>'
        '<ul>%s</ul></div></section>' % rows
    )


def sec_dt():
    out = []
    for label, num, unit in NUMBERS:
        out.append('<li class="dt-item"><span class="dt-nums">%s<span class="dg-sep">%s</span></span>'
                   '<b>%s</b></li>' % (digits(comma(num)), unit, label))
    return (
        '<section class="sec-main dt" aria-labelledby="dt-t">'
        '<div class="dt-bg" aria-hidden="true"></div><div class="shell">'
        '<div class="sec-head" data-rv><h2 class="sec-h2" id="dt-t">숫자로 보는 <br>'
        '<span class="mk">이로한의원</span></h2></div>'
        '<ul class="dt-list">%s</ul></div></section>' % ''.join(out)
    )


def sec_cs(limit=6, head=True):
    out = []
    for cat, nm, img in CASES[:limit]:
        out.append('<li data-rv><a href="./cases.html"><span class="cs-th">'
                   '<img src="./assets/%s" alt="%s" width="720" height="540" loading="lazy">'
                   '<span class="cs-more" aria-hidden="true"><span>view more</span></span></span>'
                   '<span class="cs-txs"><span class="cs-cat">%s</span>'
                   '<span class="cs-nm">%s</span></span></a></li>' % (img, nm, cat, nm))
    h = ('<div class="sec-head" data-rv><h2 class="sec-h2" id="cs-t">이런 분들이 <br>'
         '<span class="mk">좋아지셨습니다</span></h2>'
         '<p class="sec-p">환자분 동의를 받아 <br>치료 경과를 그대로 적었습니다.</p></div>') if head else ''
    return (
        '<section class="sec-main cs sec-main--secondary" aria-labelledby="cs-t"><div class="shell">'
        '%s<ul class="cs-list">%s</ul></div></section>' % (h, ''.join(out))
    )


PLAY = ('<span class="rv-play" aria-hidden="true"><svg viewBox="0 0 24 24">'
        '<path d="M9 7.5l8 4.5-8 4.5z" fill="currentColor"/></svg></span>')


def sec_rv():
    out = []
    for i, (cat, title, tag) in enumerate(REVIEWS, 1):
        out.append('<li class="rv-slide"><a class="rv-inner" href="./reviews.html">'
                   '<span class="rv-video"><img src="./assets/rv-%d.jpg" alt="%s" '
                   'width="775" height="438" loading="lazy">%s</span>'
                   '<span class="rv-content"><span class="rv-meta"><em class="rv-cat">%s</em></span>'
                   '<b class="rv-title">%s</b><span class="rv-tag">%s</span></span></a></li>'
                   % (i, title, PLAY, cat, title, tag))
    return (
        '<section class="sec-main rv" aria-labelledby="rv-t"><div class="shell">'
        '<div class="sec-head" data-rv><h2 class="sec-h2" id="rv-t">치료받으신 분들이 <br>'
        '<span class="mk">남겨 주신 이야기</span></h2></div></div>'
        '<div class="rv-wrap"><ul class="rv-slider">%s</ul></div></section>' % ''.join(out)
    )


def sec_fq(limit=6, head=True):
    out = []
    for i, (q, a) in enumerate(FAQ[:limit], 1):
        out.append(
            '<div class="fq-q">'
            '<button type="button" aria-expanded="false" aria-controls="fq-a-%d">'
            '<span class="fq-mark"><span aria-hidden="true">Q</span></span>'
            '<span class="fq-tit">%s</span><span class="fq-arr" aria-hidden="true"></span></button></div>'
            '<div class="fq-a" id="fq-a-%d"><div>'
            '<span class="fq-mark"><span aria-hidden="true">A</span></span>'
            '<span class="fq-txt">%s</span></div></div>' % (i, q, i, a))
    h = ('<div class="sec-head" data-rv><h2 class="sec-h2" id="fq-t">자주 묻는 <br>'
         '<span class="mk">질문</span></h2></div>') if head else ''
    return (
        '<section class="sec-main fq-sec sec-main--secondary" aria-labelledby="fq-t"><div class="shell">'
        '%s<div class="fq">%s</div></div></section>' % (h, ''.join(out))
    )


def sec_ep():
    return (
        '<section class="sec-main ep" aria-labelledby="ep-t">'
        '<div class="ep-bg" aria-hidden="true"></div><div class="ep-content">'
        '<h2 class="ep-title" id="ep-t">오늘 아픈 자리부터 봅니다</h2>'
        '<p class="ep-desc">전화 한 통이면 예약됩니다.<br>'
        '처음 오시는 분은 40분을 비워 두겠습니다.</p>'
        '<a class="btn btn--fill ep-btn" href="./contact.html">진료 예약하기</a></div></section>'
    )


# ══════════════════════════════════════════════════════════════════
# 서브 쪽 — 베이스의 .art-* / .sec-* / .btn 을 그대로 쓰고, 부족한 것만 더한다
# ══════════════════════════════════════════════════════════════════

SUB_CSS = """
.pg{padding-bottom:40rem}
.pg-lead{max-width:760rem;margin:0 auto 80rem;text-align:center;
  font-size:var(--f08);line-height:var(--lh08);color:var(--g700)}
.blk+.blk{margin-top:120rem}
.blk-h{margin-bottom:40rem}
.blk-h h2{font-size:var(--f04);font-weight:700;line-height:var(--lh04);letter-spacing:var(--ls1)}
.blk-h p{margin-top:12rem;font-size:var(--f09);line-height:var(--lh09);color:var(--g700)}

/* 소개 — 사진 + 글 두 단 */
.duo{display:flex;gap:80rem;align-items:flex-start}
.duo>figure{flex:0 0 46%;margin:0}
.duo img{width:100%;height:auto;border-radius:8rem}
.duo figcaption{margin-top:12rem;font-size:var(--f11);color:var(--g600)}
.duo-body p+p{margin-top:20rem}
.duo-body p{font-size:var(--f09);line-height:var(--lh09);color:var(--g800)}
.duo--flip{flex-direction:row-reverse}

/* 정의 목록 (진료 시간 · 약도 정보) */
.dl{border-top:1px solid var(--g400)}
.dl>div{display:flex;gap:24rem;padding:20rem 0;border-bottom:1px solid var(--g300)}
.dl dt{flex:0 0 160rem;font-size:var(--f10);font-weight:700;color:var(--g800)}
.dl dd{flex:1;margin:0;font-size:var(--f10);line-height:var(--lh10);color:var(--g700)}

/* 진료 과목 목록 */
.tr-list>li{display:flex;gap:48rem;padding:48rem 0;border-bottom:1px solid var(--g300)}
.tr-list>li:first-child{border-top:1px solid var(--g400)}
.tr-list figure{flex:0 0 320rem;margin:0}
.tr-list img{width:100%;height:auto;border-radius:8rem}
.tr-body{flex:1}
.tr-body h3{font-size:var(--f05);font-weight:700;line-height:var(--lh05);letter-spacing:var(--ls1)}
.tr-body .tr-sum{margin-top:10rem;font-size:var(--f09);color:var(--pri);font-weight:600}
.tr-body p{margin-top:16rem;font-size:var(--f10);line-height:var(--lh10);color:var(--g700)}

/* 후기 목록 */
.rv-list{display:flex;flex-wrap:wrap;gap:24rem}
.rv-list li{width:calc((100% - 48rem) / 3);padding:32rem;border:1px solid var(--g300);border-radius:8rem;
  transition:border-color .3s}
.rv-list li:hover{border-color:var(--pri)}
.rv-list .rc-cat{display:inline-block;padding:4rem 12rem;border-radius:99rem;
  background:var(--g100);font-size:var(--f12);font-weight:600;color:var(--pri)}
.rv-list .rc-t{margin-top:16rem;font-size:var(--f08);font-weight:700;line-height:var(--lh08)}
.rv-list .rc-b{margin-top:12rem;font-size:var(--f10);line-height:var(--lh10);color:var(--g700)}
.rv-list .rc-m{margin-top:20rem;font-size:var(--f11);color:var(--g600)}

/* 오시는 길 — 지도 자리 */
.map{position:relative;aspect-ratio:16/7;border-radius:8rem;overflow:hidden;background:var(--g200)}
.map img{width:100%;height:100%;object-fit:cover}

/* 예약 폼 */
.form{max-width:760rem;margin:0 auto}
.form .row+.row{margin-top:24rem}
.form label{display:block;margin-bottom:8rem;font-size:var(--f10);font-weight:600}
.form .req{color:var(--pri)}
.form input,.form select,.form textarea{width:100%;padding:14rem 16rem;border:1px solid var(--g400);
  border-radius:8rem;font:inherit;font-size:var(--f10);color:var(--black);background:var(--white)}
.form textarea{min-height:160rem;resize:vertical}
.form input:focus,.form select:focus,.form textarea:focus{outline:2rem solid var(--pri);outline-offset:1rem}
.form .two{display:flex;gap:24rem}
.form .two>*{flex:1}
.form .agree{display:flex;gap:10rem;align-items:flex-start;margin-top:24rem;
  font-size:var(--f11);line-height:var(--lh11);color:var(--g700)}
.form .agree input{width:18rem;height:18rem;flex:none;margin-top:2rem;padding:0}
.form .submit{margin-top:40rem;text-align:center}

@media (max-width:1200px){
  .rv-list li{width:calc((100% - 24rem) / 2)}
}
@media (max-width:860px){
  .blk+.blk{margin-top:80rem}
  .duo,.duo--flip{display:block}
  .duo>figure{margin-bottom:32rem}
  .tr-list>li{display:block;padding:32rem 0}
  .tr-list figure{margin-bottom:24rem}
  .dl>div{display:block}
  .dl dd{margin-top:8rem}
  .rv-list li{width:100%}
  .form .two{display:block}
  .form .two>*+*{margin-top:24rem}
}
"""


def art_head(cat, title, lead=''):
    p = '<p class="pg-lead">%s</p>' % lead if lead else ''
    return ('<div class="shell"><div class="art-head" data-rv>'
            '<p class="art-cat">%s</p><h1 class="art-title">%s</h1></div>%s</div>' % (cat, title, p))


def p_about():
    body = art_head('ABOUT', '한의원 소개',
                    '왕십리에서 18년, 같은 자리에서 진료하고 있습니다.<br>'
                    '오래 다니신 분이 많아 가족 단위로 오시는 일이 흔합니다.')
    body += '<div class="shell">'
    body += ('<div class="blk duo" data-rv><figure>'
             '<img src="./assets/ab-1.jpg" alt="진료실에서 환자와 상담하는 원장" width="760" height="950" loading="lazy">'
             '<figcaption>진료실 · 초진 상담은 40분입니다</figcaption></figure>'
             '<div class="duo-body"><div class="blk-h"><h2>아픈 자리만 보지 않습니다</h2></div>'
             '<p>목이 아파 오신 분의 목만 보면 다음 달에 또 오십니다. 그 목을 당기고 있는 어깨와 등, '
             '하루 열 시간 앉아 있는 자세까지 봐야 그 다음이 달라집니다.</p>'
             '<p>그래서 초진에 40분을 씁니다. 언제부터 아팠는지, 어떤 자세에서 심해지는지, '
             '어떤 치료를 받아 보셨는지를 먼저 듣습니다. 진맥과 체형 검사는 그 다음입니다.</p>'
             '<p>치료를 시작하기 전에 몇 회가 필요한지, 비용이 얼마인지, 보험이 되는 항목은 무엇인지 '
             '적어서 보여 드립니다. 중간에 늘어나는 일은 없습니다.</p></div></div>')
    body += ('<div class="blk duo duo--flip" data-rv><figure>'
             '<img src="./assets/ab-2.jpg" alt="원내 탕전실에서 한약을 달이는 모습" width="760" height="950" loading="lazy">'
             '<figcaption>탕전실 · 약재가 들어가는 과정을 보실 수 있습니다</figcaption></figure>'
             '<div class="duo-body"><div class="blk-h"><h2>한약은 원내에서 달입니다</h2></div>'
             '<p>외부 탕전원에 맡기지 않고 원내 탕전실에서 직접 달입니다. 어떤 약재가 얼마나 '
             '들어가는지 진료실에서 꺼내 보여 드리고, 원하시면 탕전 과정도 보실 수 있습니다.</p>'
             '<p>약재는 등급과 원산지를 공개합니다. 같은 이름의 약재라도 등급에 따라 값이 크게 '
             '다르기 때문에, 고르실 수 있도록 선택지를 함께 보여 드립니다.</p></div></div>')
    body += ('<div class="blk" data-rv><div class="blk-h"><h2>진료 시간</h2>'
             '<p>점심시간에도 접수는 받습니다. 예약하고 오시면 기다리는 시간이 거의 없습니다.</p></div>'
             '<dl class="dl">'
             '<div><dt>평일</dt><dd>09:30 ~ 19:00</dd></div>'
             '<div><dt>토요일</dt><dd>09:30 ~ 14:00 (점심시간 없이 진료)</dd></div>'
             '<div><dt>점심시간</dt><dd>13:00 ~ 14:00</dd></div>'
             '<div><dt>휴진</dt><dd>일요일 · 공휴일</dd></div>'
             '<div><dt>야간 진료</dt><dd>목요일 21:00까지 (예약자에 한함)</dd></div>'
             '</dl></div>')
    body += '</div>'
    body += sec_steps()
    return body


def p_treatment():
    body = art_head('TREATMENT', '진료 안내',
                    '여섯 가지를 봅니다. 증상이 겹칠 때는 묶어서 계획을 세웁니다.')
    rows = []
    for i, (name, img, short, long) in enumerate(SUBJECTS, 1):
        href = './t-chimgu.html' if i == 1 else './contact.html'
        more = '자세히 보기' if i == 1 else '예약 문의'
        rows.append('<li data-rv><figure><img src="./assets/%s" alt="%s" width="640" height="480" '
                    'loading="lazy"></figure><div class="tr-body"><h3>%s</h3>'
                    '<p class="tr-sum">%s</p><p>%s</p>'
                    '<p><a class="btn btn--line" href="%s">%s</a></p></div></li>'
                    % (img.replace('tr-', 'trw-'), name, name, short, long, href, more))
    body += '<div class="shell"><ul class="tr-list">%s</ul></div>' % ''.join(rows)
    body += sec_fq(limit=4)
    return body


def p_chimgu():
    name, img, short, long = SUBJECTS[0]
    body = art_head('TREATMENT', name, short)
    body += '<div class="shell">'
    body += ('<div class="blk duo" data-rv><figure>'
             '<img src="./assets/tv-1.jpg" alt="%s" width="760" height="950" loading="lazy">'
             '<figcaption>침 치료실</figcaption></figure>'
             '<div class="duo-body"><div class="blk-h"><h2>어떤 치료인가요</h2></div>'
             '<p>%s</p>'
             '<p>침은 굳어 있는 근육을 직접 풀어 줍니다. 약침은 한약재에서 뽑아낸 액을 혈자리에 '
             '넣는 치료로, 침의 자극에 약의 작용을 더합니다. 염증이 오래된 자리나 침만으로 '
             '회복이 더딘 자리에 씁니다.</p></div></div>' % (name, long))
    body += ('<div class="blk" data-rv><div class="blk-h"><h2>이런 분께 권합니다</h2></div>'
             '<dl class="dl">'
             '<div><dt>목 · 어깨</dt><dd>하루 종일 앉아 일하고, 오후가 되면 목이 돌아가지 않는 분</dd></div>'
             '<div><dt>허리</dt><dd>앉았다 일어설 때 멈칫하게 되거나, 다리까지 저린 분</dd></div>'
             '<div><dt>무릎 · 발목</dt><dd>계단을 내려갈 때 통증이 생기는 분</dd></div>'
             '<div><dt>교통사고</dt><dd>사고 뒤 검사에서는 이상이 없다는데 계속 불편한 분</dd></div>'
             '</dl></div>')
    body += ('<div class="blk" data-rv><div class="blk-h"><h2>진행과 비용</h2>'
             '<p>침·뜸·부항은 건강보험이 적용됩니다. 약침은 비급여이며, 시작 전에 금액을 적어 보여 드립니다.</p></div>'
             '<dl class="dl">'
             '<div><dt>1회 소요</dt><dd>초진 40분 · 재진 30분 안팎</dd></div>'
             '<div><dt>권장 주기</dt><dd>처음 2주는 주 2~3회, 이후 경과를 보고 줄입니다</dd></div>'
             '<div><dt>보험 적용</dt><dd>침 · 뜸 · 부항 (건강보험) · 추나 연 20회</dd></div>'
             '<div><dt>비급여</dt><dd>약침 (1회 기준 금액을 진료실에서 안내)</dd></div>'
             '</dl></div>')
    body += '</div>'
    body += sec_cs(limit=3, head=False)
    return body


def p_cases():
    body = art_head('CASES', '치료 사례',
                    '환자분 동의를 받아 적었습니다. 같은 증상이라도 몸에 따라 경과가 다릅니다.')
    body += '<section class="sec-main cs sec-main--secondary" aria-label="치료 사례 목록">'
    body += '<div class="shell"><ul class="cs-list">'
    rows = []
    for cat, nm, img in CASES:
        rows.append('<li data-rv><a href="./contact.html"><span class="cs-th">'
                    '<img src="./assets/%s" alt="%s" width="720" height="540" loading="lazy">'
                    '<span class="cs-more" aria-hidden="true"><span>view more</span></span></span>'
                    '<span class="cs-txs"><span class="cs-cat">%s</span>'
                    '<span class="cs-nm">%s</span></span></a></li>' % (img, nm, cat, nm))
    body += ''.join(rows) + '</ul></div></section>'
    return body


RV_LONG = [
    ('목·어깨', '세 번째 치료부터 아침에 목이 돌아갔어요',
     '회사에서 하루 열 시간을 앉아 있습니다. 작년부터 아침에 일어나면 목이 한쪽으로 안 돌아갔는데 '
     '정형외과에서는 이상 없다고만 하셨어요. 여기서는 목이 아니라 등이 굳어서 그렇다고 하시더라고요. '
     '세 번째 치료받고 나서 아침에 목이 돌아갔습니다.', '성수동 · 30대 직장인'),
    ('허리', '수술 얘기까지 들었는데 지금은 걷습니다',
     '디스크가 터져서 수술해야 한다는 얘기를 들었습니다. 겁이 나서 일단 한의원부터 와 봤는데, '
     '수술이 필요한 상태인지 아닌지부터 솔직하게 말씀해 주셨어요. 석 달 치료받고 지금은 '
     '한 시간씩 걷습니다.', '금호동 · 50대'),
    ('산후 회복', '손목 시린 게 없어진 게 제일 큽니다',
     '출산하고 반년이 지나도 손목하고 발목이 계속 시렸어요. 아기 보느라 제 몸은 뒷전이었는데, '
     '수유 중에도 먹을 수 있는 약으로 맞춰 주셨습니다. 지금은 시린 게 없습니다.', '옥수동 · 30대'),
    ('다이어트', '굶지 않았는데 11kg 빠졌습니다',
     '지금까지 한 다이어트는 전부 굶는 거였어요. 여기서는 식사를 어떻게 바꿔야 하는지부터 '
     '잡아 주셨습니다. 네 달 동안 11kg 빠졌고, 끝나고 석 달 지났는데 아직 그대로입니다.', '행당동 · 40대'),
    ('교통사고', '보험 접수까지 다 해주셔서 편했어요',
     '처음 당한 사고라 뭘 어떻게 해야 하는지 몰랐습니다. 접수증 번호만 드렸는데 보험사 쪽은 '
     '한의원에서 다 해주셨어요. 치료비도 따로 낸 게 없습니다.', '왕십리 · 20대'),
    ('소화불량', '2년 만에 밥이 맛있어졌습니다',
     '내시경을 두 번 했는데 아무 이상이 없다고 했습니다. 그런데 먹으면 계속 체했어요. '
     '여기서 위장이 아니라 긴장 때문이라고 하시더라고요. 한약 두 달 먹고 지금은 괜찮습니다.', '응봉동 · 60대'),
]


def p_reviews():
    body = art_head('REVIEWS', '환자 후기',
                    '치료받으신 분들이 직접 남겨 주신 글입니다. 동의를 받아 옮겼습니다.')
    rows = []
    for cat, t, b, m in RV_LONG:
        rows.append('<li data-rv><span class="rc-cat">%s</span><p class="rc-t">%s</p>'
                    '<p class="rc-b">%s</p><p class="rc-m">%s</p></li>' % (cat, t, b, m))
    body += '<div class="shell"><ul class="rv-list">%s</ul></div>' % ''.join(rows)
    body += sec_ep()
    return body


def p_location():
    body = art_head('LOCATION', '오시는 길',
                    '2호선 · 5호선 왕십리역 3번 출구에서 걸어서 4분입니다.')
    body += '<section class="sec-main sec-main--secondary" aria-label="오시는 길 안내"><div class="shell">'
    body += ('<div class="blk" data-rv><div class="map">'
             '<img src="./assets/map.jpg" alt="%s 약도" width="1600" height="700" loading="lazy">'
             '</div></div>' % B['name'])
    body += ('<div class="blk" data-rv><div class="blk-h"><h2>찾아오시는 방법</h2></div>'
             '<dl class="dl">'
             '<div><dt>주소</dt><dd>%s</dd></div>'
             '<div><dt>지하철</dt><dd>2 · 5호선 왕십리역 3번 출구 도보 4분</dd></div>'
             '<div><dt>버스</dt><dd>왕십리역 정류장 하차 · 간선 121, 420 · 지선 2012, 2014</dd></div>'
             '<div><dt>주차</dt><dd>건물 지하 주차장 2시간 무료 (접수 시 차량 번호를 말씀해 주세요)</dd></div>'
             '<div><dt>전화</dt><dd>%s</dd></div>'
             '</dl></div>' % (B['addr'], B['tel']))
    body += ('<div class="blk" data-rv><div class="blk-h"><h2>진료 시간</h2></div>'
             '<dl class="dl">'
             '<div><dt>평일</dt><dd>09:30 ~ 19:00</dd></div>'
             '<div><dt>토요일</dt><dd>09:30 ~ 14:00</dd></div>'
             '<div><dt>목요일 야간</dt><dd>21:00까지 (예약자에 한함)</dd></div>'
             '<div><dt>휴진</dt><dd>일요일 · 공휴일</dd></div>'
             '</dl></div>')
    body += '</div></section>'
    return body


def p_contact():
    opts = ''.join('<option>%s</option>' % s[0] for s in SUBJECTS)
    body = art_head('CONTACT', '예약 · 상담',
                    '남겨 주시면 진료 시간 안에 전화로 연락드립니다.<br>'
                    '급하시면 %s 로 바로 전화 주세요.' % B['tel'])
    body += ('<div class="shell"><form class="form" data-rv '
             'onsubmit="alert(\'보기용 화면이라 실제로 접수되지 않습니다.\');return false;">'
             '<div class="row two">'
             '<div><label for="f-name">성함 <span class="req" aria-hidden="true">*</span></label>'
             '<input id="f-name" name="name" type="text" required autocomplete="name"></div>'
             '<div><label for="f-tel">연락처 <span class="req" aria-hidden="true">*</span></label>'
             '<input id="f-tel" name="tel" type="tel" required autocomplete="tel" '
             'placeholder="010-0000-0000"></div></div>'
             '<div class="row two">'
             '<div><label for="f-sub">진료 과목</label>'
             '<select id="f-sub" name="subject">%s</select></div>'
             '<div><label for="f-date">희망 날짜</label>'
             '<input id="f-date" name="date" type="date"></div></div>'
             '<div class="row"><label for="f-msg">어디가 어떻게 불편하신가요</label>'
             '<textarea id="f-msg" name="message" '
             'placeholder="언제부터, 어떤 자세에서 심해지는지 적어 주시면 진료가 빨라집니다."></textarea></div>'
             '<div class="agree"><input id="f-ok" name="agree" type="checkbox" required>'
             '<label for="f-ok">진료 예약을 위한 개인정보 수집·이용에 동의합니다. '
             '수집한 정보는 예약 안내 외의 목적으로 쓰지 않으며 3개월 뒤 파기합니다.</label></div>'
             '<div class="submit"><button class="btn btn--fill btn--lg" type="submit">예약 신청하기</button></div>'
             '</form></div>' % opts)
    body += sec_fq(limit=6)
    return body


# ══════════════════════════════════════════════════════════════════

def main():
    if not os.path.isdir(OUT):
        os.makedirs(OUT)
    css = base_section_css() + BASE_FIX + GRAFT_CSS
    js = base_section_js() + GRAFT_JS

    n = page('index.html',
             '%s — 성동구 왕십리 한의원 | 침·추나·한약' % B['name'],
             '왕십리 18년. 아픈 자리만 보지 않고 그 자리를 당긴 몸을 봅니다. '
             '초진 상담 40분, 치료 기간과 비용을 먼저 알려 드립니다.',
             '\n'.join([sec_in(), sec_bk(), sec_sl(), sec_steps(), sec_dt(),
                        sec_cs(limit=6), sec_rv(), sec_fq(limit=6), sec_ep()]),
             css=css, js=js, home=True)
    print('  index.html        %6d bytes' % n)

    subs = [
        ('about.html', '한의원 소개 | %s' % B['name'],
         '왕십리 18년. 초진 40분 상담과 원내 탕전, 진료 시간 안내입니다.', p_about()),
        ('treatment.html', '진료 안내 | %s' % B['name'],
         '침·약침, 추나, 맞춤 한약, 공진단, 부항·뜸, 한방 다이어트 여섯 가지를 봅니다.', p_treatment()),
        ('t-chimgu.html', '침·약침 치료 | %s' % B['name'],
         '굳은 자리를 직접 풀어 통증의 원인을 다룹니다. 보험 적용과 비용을 먼저 알려 드립니다.', p_chimgu()),
        ('cases.html', '치료 사례 | %s' % B['name'],
         '목·어깨, 허리, 교통사고 후유증 등 환자분 동의를 받아 적은 치료 경과입니다.', p_cases()),
        ('reviews.html', '환자 후기 | %s' % B['name'],
         '치료받으신 분들이 직접 남겨 주신 후기입니다.', p_reviews()),
        ('location.html', '오시는 길 | %s' % B['name'],
         '왕십리역 3번 출구 도보 4분. 지하 주차장 2시간 무료.', p_location()),
        ('contact.html', '예약 · 상담 | %s' % B['name'],
         '온라인으로 남기시면 진료 시간 안에 전화로 연락드립니다.', p_contact()),
    ]
    sub_css = SUB_CSS + GRAFT_CSS
    for fname, title, desc, body in subs:
        n = page(fname, title, desc, body, css=sub_css, js=js)
        print('  %-18s%6d bytes' % (fname, n))


if __name__ == '__main__':
    main()
