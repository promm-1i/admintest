# -*- coding: utf-8 -*-
"""올라간 비즈 소식의 사진만 PHOTOS[키] 로 바꾼다(제목 · 본문 · 쿠폰은 그대로).

  python biz_photos.py <키>          바꾸고 순서를 그림으로 대조한 뒤 맞을 때만 '완료'
  python biz_photos.py <키> --dry    바꾸고 대조만 하고 저장하지 않고 닫는다

2026-10-15: 아름결 소식이 폴더 앞 10장으로 올라가 제목(수면치료)의 사진이 빠졌다.
수정 화면은 사진마다 ✕ 단추가 있고 쿠폰도 붙은 채로 열린다.
"""
import base64
import io
import sys

from PIL import Image
from playwright.sync_api import sync_playwright

import biz_post_new as N

LIST = "https://bizprofile.daangn.com/biz_accounts/4030544/manager/posts/"
OPEN_MENU = """(title)=>{
  const el=[...document.querySelectorAll('*')].find(e=>e.children.length===0 && (e.textContent||'').includes(title));
  if(!el) return 'no-title';
  const r=el.getBoundingClientRect();
  const b=[...document.querySelectorAll("button[aria-label='더보기']")]
    .find(x=>Math.abs(x.getBoundingClientRect().y-r.y)<60);
  if(!b) return 'no-menu';
  b.click(); return 'ok';}"""
# 사진 띠: 사진 단추와 같은 줄에 놓인 64px 안팎 썸네일
THUMBS = """()=>{const cam=document.querySelector('button.css-mw5fyl'); if(!cam) return [];
  const y=cam.getBoundingClientRect().y;
  return [...document.querySelectorAll('img')].filter(i=>{const r=i.getBoundingClientRect();
    return r.width>40&&r.width<120&&Math.abs(r.y-y)<40}).map(i=>i.src);}"""
# 첫 썸네일의 ✕ 를 누른다
REMOVE_FIRST = """()=>{const cam=document.querySelector('button.css-mw5fyl'); const y=cam.getBoundingClientRect().y;
  const bs=[...document.querySelectorAll('button')].filter(b=>{const r=b.getBoundingClientRect();
    return b!==cam&&r.width>0&&r.width<=28&&r.height<=28&&r.y>y-30&&r.y<y+30}).sort((a,b)=>a.getBoundingClientRect().x-b.getBoundingClientRect().x);
  if(!bs.length) return false; bs[0].click(); return true;}"""
FETCH = """async (src)=>{const r=await fetch(src); const b=new Uint8Array(await r.arrayBuffer());
  let s=''; for(let i=0;i<b.length;i+=8192) s+=String.fromCharCode.apply(null,b.subarray(i,i+8192)); return btoa(s);}"""


def tiny(img: Image.Image):
    return list(img.convert("L").resize((16, 16)).tobytes())


def nearest(t, refs):
    d = [sum((a - b) ** 2 for a, b in zip(t, r)) for r in refs]
    return d.index(min(d))


def main() -> None:
    key = sys.argv[1]
    dry = "--dry" in sys.argv
    title = N.POSTS[key][1]
    files = N.photo_files(key)
    refs = [tiny(Image.open(f)) for f in files]
    with sync_playwright() as p:
        b = p.chromium.connect_over_cdp("http://localhost:9222")
        pg = b.contexts[0].new_page()
        pg.goto(LIST, wait_until="domcontentloaded")
        pg.wait_for_timeout(3500)
        if pg.evaluate(OPEN_MENU, title) != "ok":
            sys.exit("목록에서 글을 못 찾음: " + title)
        pg.wait_for_timeout(1200)
        pg.get_by_text("소식 수정", exact=True).first.click()
        pg.wait_for_timeout(5000)
        if pg.locator("input[placeholder='소식 제목']").first.input_value() != title:
            pg.close(run_before_unload=False)
            sys.exit("다른 글이 열림")

        for _ in range(12):
            if N.photo_count(pg) == 0:
                break
            pg.evaluate(REMOVE_FIRST)
            pg.wait_for_timeout(500)
        if N.photo_count(pg) != 0:
            pg.close(run_before_unload=False)
            sys.exit("사진을 다 못 뺐다: %d" % N.photo_count(pg))

        pg.locator("button.css-mw5fyl").first.click()
        pg.wait_for_timeout(1200)
        with pg.expect_file_chooser(timeout=15000) as fc:
            pg.get_by_text("내 앨범에서 선택", exact=True).first.click()
        fc.value.set_files([str(f) for f in files])
        for _ in range(40):
            pg.wait_for_timeout(700)
            if N.photo_count(pg) >= len(files):
                break
        pg.wait_for_timeout(1500)

        srcs = pg.evaluate(THUMBS)
        got = [nearest(tiny(Image.open(io.BytesIO(base64.b64decode(pg.evaluate(FETCH, s))))), refs) for s in srcs]
        print("넣은 순서:", [files[i].name[:2] for i in got])
        if got != list(range(len(files))):
            pg.close(run_before_unload=False)
            sys.exit("순서가 다르다 — 저장 안 하고 닫음")
        if dry:
            pg.close(run_before_unload=False)
            print("순서 맞음 · --dry 라 저장 안 하고 닫음")
            return
        pg.get_by_role("button", name="완료").first.click()
        pg.wait_for_timeout(5000)
        # 10-15: 저장하면 소식 목록으로 돌아간다(postId= 가 안 붙는다)
        ok = "postId=" in pg.url or pg.url.rstrip("/").endswith("/manager/posts")
        print("저장됨" if ok else "저장 확인 필요 — " + pg.url[-50:])


if __name__ == "__main__":
    main()
