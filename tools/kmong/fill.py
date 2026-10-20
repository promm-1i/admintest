"""크몽 포트폴리오 등록 — 제목·카테고리·이미지·설명까지 채운다. 등록 버튼은 누르지 않는다.

  python fill.py VETP-1001          코드 하나
  python fill.py --list             채울 수 있는 코드 목록

제목 규칙: 50자 이내, 특수문자는 : + - # / . ( ) 만. 가운뎃점(·)이 들어가면 '다음'이 막힌다.
"""
import re
import sys
import unicodedata
from pathlib import Path

from playwright.sync_api import sync_playwright

REPO = Path(__file__).resolve().parents[2]
_F = Path("C:/_tmp/claude/kmong_facts.json")
FACTS = __import__("json").loads(_F.read_text(encoding="utf-8")) if _F.exists() else {}
CDP = "http://127.0.0.1:9223"
NEW = "https://kmong.com/seller/portfolios/new"
CAT1, CAT2 = "IT·프로그래밍", "홈페이지 신규 제작"
DESC_MAX = 500

# 대표/상세 '추가' 버튼에 표를 붙인다 — DOM 순서가 화면 순서와 달라 nth 로는 못 고른다
TAG_JS = """()=>{const out={};
 for(const h of document.querySelectorAll('h3')){
   const t=(h.textContent||'').trim();
   const key = t.startsWith('대표 이미지') ? 'cover' : t.startsWith('상세 이미지') ? 'detail' : null;
   if(!key)continue;
   for(let n=h,i=0;n&&i<8;n=n.parentElement,i++){
     const b=[...n.querySelectorAll('button')].filter(x=>(x.innerText||'').trim()==='추가');
     if(b.length===1){ b[0].setAttribute('data-pick',key); out[key]=1; break }
   }
 }
 return out}"""

COUNT_JS = """()=>{const o={};
 for(const h of document.querySelectorAll('h3')){
   const t=(h.textContent||'').trim();
   const m=t.match(/\\((\\d+)\\/(\\d+)\\)/);
   if(!m)continue;
   if(t.startsWith('대표 이미지'))o.cover=+m[1];
   if(t.startsWith('상세 이미지'))o.detail=+m[1];
 }
 return o}"""


# 크몽 업종 선택지에 우리 코드를 맞춘 표 (선택지는 17개로 고정)
INDUSTRY = {
    "HOSP": "병원·제약", "DENP": "병원·제약", "CARP": "병원·제약",
    "VETP": "반려동물",
    "LAWP": "법률·세무", "TAXP": "법률·세무",
    "REAP": "부동산·분양", "ESTP": "부동산·분양",
    "INTP": "가구·인테리어·이사", "LIGP": "가구·인테리어·이사", "FURP": "가구·인테리어·이사",
    "INSP": "부동산·분양", "GARP": "여행·숙박", "TRVP": "여행·숙박",
    "RESP": "식당·카페", "BREP": "음료·식품",
    "STAP": "여행·숙박", "TRVL": "여행·숙박",
    "GOLP": "건강·스포츠", "FITP": "건강·스포츠", "BICP": "건강·스포츠",
    "KIDP": "학원·교육", "EDUP": "학원·교육",
    "BEAP": "미용·뷰티", "PERP": "미용·뷰티",
    "AGEP": "IT·미디어", "VIDP": "IT·미디어", "PHOP": "IT·미디어",
    "LAUP": "생활·가전",
    "AUTP": "일반·기타", "CORP": "일반·기타", "ARTP": "일반·기타",
}
INDUSTRY_BY_CODE = {"CORP-1015": "공기업·공공기관", "CORP-1012": "공기업·공공기관"}
KEYWORDS = ["홈페이지", "홈페이지제작", "홈페이지개발", "웹사이트", "반응형홈페이지"]


def industry_of(code: str) -> str:
    return INDUSTRY_BY_CODE.get(code) or INDUSTRY.get(code.split("-")[0], "일반·기타")


def clean_title(t: str) -> str:
    for k, v in BANNED.items():   # 제목에도 같은 금지어(셈다움 '수학 문제은행')
        t = t.replace(k, v)
    t = t.replace("·", "/").replace("—", "-").replace("~", "-").replace(",", "")
    t = re.sub(r"[^0-9A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\s:+\-#/.()]", "", t)
    return re.sub(r"\s+", " ", t).strip()[:50]


def out_root() -> Path:
    dev = next((p for p in (Path.home() / "Desktop").iterdir()
                if unicodedata.normalize("NFC", p.name) == "개발"), None)
    return (dev or Path.home() / "Desktop" / "개발") / "크몽_업로드"


def premium_by_code() -> dict:
    src = (REPO / "src" / "lib" / "samples.ts").read_text(encoding="utf-8")
    rows = {}
    for b in src.split("    slug: ")[1:]:
        head = b.split("\n  },")[0]
        if "premium: true" not in head:
            continue
        g = lambda k: (re.search(k + r': "([^"]+)"', head) or [None, ""])[1]
        feats = re.findall(r'"([^"]{4,})"', (re.search(r"features: \[(.*?)\]", head, re.S) or ["", ""])[1])
        rows[g("designCode")] = {
            "slug": b.split('"')[1], "title": g("title"), "industry": g("industry"),
            "purpose": g("purpose"), "features": feats, "idealFor": g("idealFor"),
        }
    return rows


# 크몽 설명 칸 금지어(10-12 실측) — 네이트(외부 메신저)는 '라미네이트' 안에서도, 띄어 써도 걸린다.
# 비밀번호 · 카톡 · 카카오톡 · 전화 · 라인별도 걸린다. 온라인상담 · 예약 · 상담 · 블로그 · 번호 · 가격 · 금액 · 견적은 통과.
# 새 설명은 올리기 전에 check_words.py <코드…> 로 2단계 설명 칸에 넣어 '제한된 단어' 경고를 먼저 본다.
BANNED = {
    "비밀번호 확인 창이 있는": "비밀글로 쓰는",
    "라미네이트": "앞니 심미 보철",
    "라인별": "제품군별",          # 라인(메신저) — '온라인'은 통과
    # 10-17 실측: '개인별'(개인 거래) · '은행'(계좌)도 걸린다. '학습 경로' · '맞춤형' · '문항 DB'는 통과
    "개인별 학습 경로": "아이마다 다른 학습 경로",
    "개인별": "맞춤형",
    "문제은행": "문항 DB",
}


def describe(r: dict) -> str:
    """상세 설명 500자 — 가격·주소 없이, 화면에 있는 기능만."""
    parts = [f"{r['industry']} 시안입니다. 실제 납품 건이 아니라 업종 콘셉트로 만든 디자인입니다.", ""]
    for f in r["features"][:4]:
        parts.append(f"· {f}")
    if r["idealFor"]:
        parts += ["", f"이런 곳에 맞습니다: {r['idealFor']}"]
    out = "\n".join(parts)
    for a, b in BANNED.items():
        out = out.replace(a, b)
    if len(out) > DESC_MAX:
        out = out[:DESC_MAX - 1].rsplit("\n", 1)[0]
    return out


def close_dialog(pg, names=("닫기", "확인", "취소", "다음에 하기")) -> None:
    for _ in range(3):
        dlg = pg.locator("[role=dialog]").first
        if not dlg.count() or not dlg.is_visible():
            return
        for nm in names:
            btn = dlg.get_by_role("button", name=nm)
            if btn.count() and btn.first.is_visible():
                btn.first.click()
                pg.wait_for_timeout(800)
                break
        else:
            pg.keyboard.press("Escape")
            pg.wait_for_timeout(800)


def pick_option(pg, button_name: str, option: str) -> bool:
    b = pg.get_by_role("button", name=button_name)
    if not b.count():
        return False
    b.first.click()
    pg.wait_for_timeout(900)
    for sel in ("[role=listbox]", "[role=dialog]", "[role=menu]", "ul"):
        box = pg.locator(sel).filter(has_text=option).first
        if box.count() and box.is_visible():
            box.get_by_text(option, exact=True).first.click()
            pg.wait_for_timeout(900)
            return True
    opt = pg.get_by_text(option, exact=True)
    for i in range(opt.count()):
        if opt.nth(i).is_visible():
            opt.nth(i).click()
            pg.wait_for_timeout(900)
            return True
    return False


def pick_select(pg, current: str, option: str) -> bool:
    """react-select 칸 — 지금 글자(자리표시 또는 고른 값)로 상자를 찾아 열고 목록에서 고른다.
    타자는 안 먹고 첫 항목이 골라지므로 반드시 목록에서 클릭해야 한다."""
    cont = pg.locator("div[class*='-container']").filter(has_text=current).last
    if not cont.count():
        return False
    cont.click()
    pg.wait_for_timeout(1000)
    menu = pg.locator("[class*='-menu']")
    target = pg.get_by_role("option", name=option, exact=True)
    if not target.count() and menu.count():
        target = menu.get_by_text(option, exact=True)
    if not target.count():
        pg.keyboard.press("Escape")
        return False
    target.first.click()
    pg.wait_for_timeout(900)
    return option in pg.evaluate("document.body.innerText")



# 선택 칸 — 실제로 쓰는 것만. 근거: package.json(React·Vite·Tailwind·TypeScript·Supabase),
# 템플릿 실측(jQuery 18종·SCSS), 도구가 전부 Python, 블로그 자동화가 Node.js,
# 지도 API 10개 파일, 문자 알림·분석 도구 흔적.
TECH = ["HTML/CSS", "JavaScript/TypeScript", "jQuery", "SCSS", "Tailwind CSS",
        "React/Next.js", "Vue/Nuxt", "Vite", "Node.js", "Python", "Supabase", "PostgreSQL"]
# 기획부터 버그수정까지 혼자 다 한다 (사용자 확인 2026-10-08)
ROLES = ["기획", "디자인", "프론트엔드", "백엔드", "개선·버그수정"]
PRODUCTS = ["반응형 웹사이트", "관리자 페이지/Admin", "커머스/쇼핑몰", "콘텐츠/미디어형", "B2C 플랫폼형"]
LINKS = ["지도/위치 API", "메신저/알림 연동", "파일 업로드/저장소", "마케팅/분석 도구 연동", "소셜 로그인/인증"]

MULTI = {"기술 스택": TECH, "참여 작업 영역": ROLES, "제품 유형": PRODUCTS, "외부 연동": LINKS}

FIND_BOX_JS = """(label)=>{
 document.querySelectorAll('[data-pick]').forEach(e=>e.removeAttribute('data-pick'));
 const hs=[...document.querySelectorAll('h3,h4,label,span,div')]
   .filter(e=>e.children.length===0&&(e.textContent||'').trim()===label);
 if(!hs.length)return false;
 let n=hs[0];
 for(let i=0;i<7&&n;i++,n=n.parentElement){
   const c=n.querySelector("div[class*='-container']");
   if(c){c.setAttribute('data-pick','x');return true}}
 return false}"""


def pick_multi(pg, label: str, wants: list[str]) -> int:
    """여러 개 고르는 칸. 눌러서 열리는 목록에서 하나씩 누른다(타자는 안 먹는다)."""
    done = 0
    for w in wants:
        if not pg.evaluate(FIND_BOX_JS, label):
            break
        box = pg.locator("[data-pick=x]").first
        try:
            box.scroll_into_view_if_needed()
            pg.wait_for_timeout(200)
            ctrl = box.locator("div[class*='-control']").first
            (ctrl if ctrl.count() else box).click()
            pg.wait_for_timeout(700)
            ok = pg.evaluate("""(t)=>{
              for(const e of document.querySelectorAll("[id^='react-select'][id*='option'],[role=option]")){
                if((e.textContent||'').trim()===t){e.click();return true}}
              return false}""", w)
            pg.wait_for_timeout(500)
            pg.keyboard.press("Escape")
            pg.wait_for_timeout(250)
            done += 1 if ok else 0
        except Exception:
            pg.keyboard.press("Escape")
    return done


def set_month(pg, idx: int, ym: str) -> bool:
    """참여 기간 — 읽기 전용 칸을 눌러 열리는 < 2026년 > · 1~12월 격자에서 고른다.
    idx 0=시작일, 1=종료일. ym 은 '2026-09' 꼴."""
    year, month = ym.split("-")
    inp = pg.locator("input[readonly]").nth(idx)
    if not inp.count():
        return False
    inp.scroll_into_view_if_needed()
    pg.wait_for_timeout(300)
    inp.click()
    pg.wait_for_timeout(900)
    for _ in range(12):
        shown = pg.evaluate("""()=>{const m=[...document.querySelectorAll('div,span')]
          .map(e=>(e.children.length?'':(e.textContent||'').trim()))
          .find(t=>/^\d{4}년$/.test(t)); return m||''}""")
        if shown.startswith(year):
            break
        arrow = "<" if int(year) < int(shown[:4] or year) else ">"
        btn = pg.get_by_role("button", name=arrow, exact=True)
        if not btn.count():
            break
        btn.first.click()
        pg.wait_for_timeout(500)
    # react-datepicker — 누르는 순간 다시 그려져 요소를 놓친다. aria-label 로 집어 JS 로 누른다.
    ok = pg.evaluate("""(want)=>{
      const el=document.querySelector(`[role=option][aria-label*="${want}"]`);
      if(!el)return false; el.click(); return true}""", f"{int(month)}월 {year}")
    pg.wait_for_timeout(900)
    if not ok:
        pg.keyboard.press("Escape")
        return False
    return inp.input_value() == ym


def upload(pg, kind: str, path: Path, crop: bool) -> bool:
    pg.evaluate(TAG_JS)
    btn = pg.locator(f"button[data-pick={kind}]").first
    if not btn.count():
        print("   '추가' 버튼 못 찾음:", kind)
        return False
    before = pg.evaluate(COUNT_JS).get(kind, 0)
    with pg.expect_file_chooser(timeout=20000) as fc:
        btn.click()
    fc.value.set_files(str(path))
    pg.wait_for_timeout(2500)
    if crop:   # 대표 이미지는 자르기 창이 뜬다
        dlg = pg.locator("[role=dialog]").first
        if dlg.count() and dlg.is_visible():
            for nm in ("추가하기", "등록", "확인", "적용", "완료", "저장"):
                b2 = dlg.get_by_role("button", name=nm)
                if b2.count() and b2.first.is_visible() and b2.first.is_enabled():
                    b2.first.click()
                    break
            pg.wait_for_timeout(2500)
    for _ in range(20):
        if pg.evaluate(COUNT_JS).get(kind, 0) > before:
            return True
        pg.wait_for_timeout(500)
    return False


def run(code: str) -> None:
    rows = premium_by_code()
    r = rows.get(code)
    if not r:
        print("모르는 코드:", code)
        return
    d = next((p for p in out_root().iterdir()
              if p.is_dir() and unicodedata.normalize("NFC", p.name).startswith(code + "_")), None)
    if d is None:
        print("이미지 폴더 없음:", code)
        return
    cover = d / "00_대표_1x1.png"
    dets = sorted(d.glob("*_상세.png"))
    title = clean_title(r["title"])
    print(f"{code} {unicodedata.normalize('NFC', d.name)}")
    print(f"  제목: {title} ({len(title)}자)")
    print(f"  사진: 대표 {cover.exists()} · 상세 {len(dets)}장")

    with sync_playwright() as p:
        b = p.chromium.connect_over_cdp(CDP)
        pg = [x for x in b.contexts[0].pages if "about:blank" not in x.url][-1]
        pg.goto(NEW, wait_until="domcontentloaded", timeout=60000)
        pg.wait_for_timeout(2500)
        close_dialog(pg)

        t = pg.locator("input[placeholder*='제목']").first
        t.click()
        t.fill(title)
        pg.wait_for_timeout(500)
        print("  1차:", pick_option(pg, "1차 카테고리", CAT1), "· 2차:", pick_option(pg, "2차 카테고리", CAT2))
        pg.get_by_role("button", name="다음").first.click()
        pg.wait_for_timeout(3500)
        if "이미지 등록" not in pg.evaluate("document.body.innerText"):
            print("  2단계로 못 넘어감 — 제목 특수문자나 카테고리를 확인하세요")
            return

        print("  대표:", upload(pg, "cover", cover, crop=True))
        ok = 0
        for f in dets:        # 한 장씩 — 한꺼번에 던지면 끝난 순서대로 꽂혀 뒤섞인다
            if upload(pg, "detail", f, crop=False):
                ok += 1
            else:
                print("   상세 실패:", f.name)
                break
        print(f"  상세: {ok}/{len(dets)}장")

        ind = industry_of(code)
        print("  업종:", ind, pick_select(pg, "업종을 선택해 주세요", ind))

        desc = describe(r)
        ta = pg.locator("textarea").first
        ta.click()
        ta.fill(desc)
        print(f"  설명: {len(desc)}자")

        # 고객사는 가상 브랜드라 비공개로 둔다
        for cb in pg.locator("input[type=checkbox]").all():
            lab = cb.evaluate("""e=>{let n=e,t='';for(let i=0;i<4&&n;i++,n=n.parentElement){
              t=(n.innerText||'').trim(); if(t)break} return t.slice(0,20)}""")
            if "비공개" in lab and not cb.is_checked():
                cb.click(force=True)
                print("  고객사: 비공개 체크")
                break

        kw = pg.locator("input[placeholder*='키워드']").first
        for w in KEYWORDS:
            kw.click()
            kw.fill(w)
            kw.press("Enter")
            pg.wait_for_timeout(400)
        print("  키워드:", ", ".join(KEYWORDS))

        for lab, wants in MULTI.items():
            n = pick_multi(pg, lab, wants)
            print(f"  {lab}: {n}/{len(wants)}개")

        fx = FACTS.get(code, {})
        if fx.get("start"):
            print("  시작일:", fx["start"], set_month(pg, 0, fx["start"]))
            print("  종료일:", fx["end"], set_month(pg, 1, fx["end"]))
        print("  등록 버튼은 누르지 않았습니다. 참여 기간은 화면에서 확인하세요.")


if __name__ == "__main__":
    if "--list" in sys.argv:
        for p in sorted(out_root().iterdir()):
            if p.is_dir():
                print(" ", unicodedata.normalize("NFC", p.name))
    else:
        run(sys.argv[1])
