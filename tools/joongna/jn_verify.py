# 올라간 중고나라 상품을 읽어 원고와 대조(읽기만, 내 탭): python jn_verify.py <상품 번호> <글 폴더>
import sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8")
from cdp_tab import Tab
pid, folder = sys.argv[1], Path(sys.argv[2])
title, body = (x.strip() for x in (folder / "post.txt").read_text(encoding="utf-8").split("\n===\n", 1))
want = [l.strip() for l in body.split("\n") if l.strip()]
with Tab() as t:
    t.go("https://web.joongna.com/product/%s" % pid, 5)
    t.js("[...document.querySelectorAll('button')].filter(b=>(b.innerText||'').trim()==='펼치기').forEach(b=>b.click())"); t.wait(1)
    txt = t.js("document.body.innerText")
    lines = [l.strip() for l in txt.split("\n") if l.strip()]
    i = lines.index("홈") if "홈" in lines else 0
    print("머리", lines[i:i + 6])
    print("제목", title in lines, "| 가격", "300,000원" in lines or "300,000" in txt)
    miss = [w for w in want if w not in txt]
    print("본문 줄", len(want) - len(miss), "/", len(want), "| 빠진 줄", miss[:3])
    print("사진", t.js("(document.body.innerText.match(/\d+\/(\d+)/)||[])[0]"))
