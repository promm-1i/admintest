from playwright.sync_api import sync_playwright

JS = """()=>[...document.querySelectorAll('.ProseMirror img')].map((e,i)=>
  i+': '+(e.getAttribute('alt')||'-')+' | '+(e.getAttribute('title')||'-')+' | '+(e.src||'').slice(-60))"""

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    for line in pg.evaluate(JS):
        print(line)
