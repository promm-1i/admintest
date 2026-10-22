# 올린 중고나라 상품의 제목 · 본문만 post.txt 로 바꾼다. --save 를 붙여야 '수정하기'를 누른다.
#   python jn_edit.py <상품 번호> <글 폴더(post.txt)> [--save]
import json, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8")
from cdp_tab import Tab

pid, folder = sys.argv[1], Path(sys.argv[2])
SAVE = "--save" in sys.argv
title, body = (x.strip() for x in (folder / "post.txt").read_text(encoding="utf-8").split("\n===\n", 1))
SETVAL = """([sel,v])=>{const el=document.querySelector(sel); const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto,'value').set.call(el,v); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); return el.value.length}"""

with Tab(bg=False) as t:
    t.cmd("Emulation.setDeviceMetricsOverride", {"width": 1280, "height": 1000, "deviceScaleFactor": 1, "mobile": False})
    t.go("https://web.joongna.com/product/form?type=modify&productSeq=%s" % pid, 6)
    for _ in range(20):
        if t.js("!!document.querySelector('#product-name')&&document.querySelector('#product-name').value.length>0"):
            break
        t.wait(1)
    print("전 제목", t.js("document.querySelector('#product-name').value"))
    t.js("(%s)(%s)" % (SETVAL, json.dumps(["#product-name", title], ensure_ascii=False)))
    t.js("(%s)(%s)" % (SETVAL, json.dumps(["#product-description", body], ensure_ascii=False)))
    t.wait(1)
    st = t.js("""(()=>{const q=s=>document.querySelector(s); return {title:q('#product-name').value, price:q('#productPrice').value, desc:q('#product-description').value.length, pics:(document.body.innerText.match(/(\\d+)\\/10/)||[])[0]}})()""")
    print("채운 값", json.dumps(st, ensure_ascii=False))
    assert st["title"] == title and st["desc"] == len(body)
    if SAVE:
        print("수정하기", t.mclick_text("수정하기")); t.wait(6)
        print("뒤 주소", t.js("location.href"))
