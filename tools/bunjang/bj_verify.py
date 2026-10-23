# 올라간 번개장터 상품을 상세 API 로 읽어 원고 · 설정과 대조(읽기만, 내 탭): python bj_verify.py <상품 번호> <글 폴더>
import json, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8")
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "joongna"))
from cdp_tab import Tab
pid, folder = sys.argv[1], Path(sys.argv[2])
title, body = (x.strip() for x in (folder / "post.txt").read_text(encoding="utf-8").split("\n===\n", 1))
with Tab() as t:
    t.go("https://m.bunjang.co.kr/products/%s" % pid, 5)
    p = t.js("fetch('https://api.bunjang.co.kr/api/pms/v1/products/%s/detail/web').then(r=>r.json())" % pid)["data"]["product"]
    print("제목", p["name"] == title, "| 본문", p["description"].strip() == body, "| 가격", p["price"])
    print("분류", p["category"]["name"], "| 상태", p["condition"], "| 배송", json.dumps(p["trade"], ensure_ascii=False), "| 수량", p["qty"], "| 사진", p["imageCount"], "| 판매", p["saleStatus"])
