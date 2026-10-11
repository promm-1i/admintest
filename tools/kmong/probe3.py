"""참여 작업 영역 · 기술 스택 · 외부 연동 · 제품 유형 · 참여 기간 칸의 선택지를 읽는다."""
import json
from pathlib import Path

from playwright.sync_api import sync_playwright

FIELDS = ["참여 작업 영역", "기술 스택", "외부 연동", "제품 유형", "참여 기간"]

NEAR_JS = """(label)=>{
 const heads=[...document.querySelectorAll('h3,h4,label,p,span,div')]
   .filter(e=>e.children.length===0 && (e.textContent||'').trim()===label);
 if(!heads.length)return {found:false};
 const h=heads[0];
 let n=h, box=null;
 for(let i=0;i<6&&n;i++,n=n.parentElement){
   if(n.querySelector("div[class*='-container'],button,input")){box=n;break}
 }
 if(!box)return {found:true, box:false};
 return {found:true, box:true,
   html:(box.innerText||'').split(String.fromCharCode(10)).join(' | ').slice(0,200),
   controls:[...box.querySelectorAll("div[class*='-container'],button,input")]
     .map(e=>e.tagName+'/'+(e.className+'').slice(0,26)+'/'+((e.innerText||e.placeholder||'').trim().slice(0,22)))
     .slice(0,8)}}"""

MENU_JS = """()=>{const o=[];
 for(const e of document.querySelectorAll("[class*='-menu'] *, [role=option], [role=listbox] *")){
   if(e.children.length)continue;
   const t=(e.textContent||'').trim();
   if(t&&t.length<30)o.push(t)}
 return [...new Set(o)]}"""

out = {}
with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://127.0.0.1:9223")
    pg = [x for x in b.contexts[0].pages if "about:blank" not in x.url][-1]
    print("화면:", pg.url)
    for f in FIELDS:
        info = pg.evaluate(NEAR_JS, f)
        print(f"\n=== {f}: {info}")
        if not info.get("box"):
            continue
        cont = pg.locator("div[class*='-container']").filter(has_text="선택").first
        try:
            pg.get_by_text(f, exact=True).first.scroll_into_view_if_needed()
            pg.wait_for_timeout(300)
        except Exception:
            pass
    # 각 select 컨테이너를 차례로 열어 선택지를 읽는다
    conts = pg.locator("div[class*='-container']")
    print("\nselect 상자 수:", conts.count())
    for i in range(conts.count()):
        c = conts.nth(i)
        try:
            label = c.evaluate("""e=>{let n=e;for(let i=0;i<6&&n;i++,n=n.parentElement){
              const h=n.querySelector('h3,h4,label');if(h)return (h.innerText||'').trim().slice(0,20)}return '?'}""")
            c.click()
            pg.wait_for_timeout(900)
            opts = pg.evaluate(MENU_JS)
            if opts:
                out[label or f"칸{i}"] = opts
                print(f"  [{label}] {opts[:30]}")
            pg.keyboard.press("Escape")
            pg.wait_for_timeout(400)
        except Exception as e:
            print(f"  칸{i} 실패 {str(e)[:40]}")
Path("C:/_tmp/claude/kmong_options.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
print("\n적어 둠: C:/_tmp/claude/kmong_options.json")
