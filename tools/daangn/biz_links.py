"""올릴 후보의 주소가 살아 있는지 확인한다. 라이브(noveriq)와 어제 쓴 미리보기를 같이 본다."""
from playwright.sync_api import sync_playwright

PREVIEW = "https://6ab88480a52e280008ed5a62--mintcl.netlify.app/"
LIVE = "https://noveriq.co.kr/"

CAND = [
    ("semroot", "EDUP-1001 셈루트 (학원)"),
    ("bodien", "FITP-1001 바디언 (헬스장)"),
    ("yedam", "HOSP-1002 365서울예담치과 (치과)"),
    ("onsum", "PHOP-1001 스튜디오 온섬 (사진관)"),
    ("sumgil", "HOSP-1004 숨길이비인후과 (의원)"),
    ("gama", "LIGP-1001 가마 (조명 공방)"),
    ("windvalley", "GOLP-1001 윈드밸리 (골프)"),
    ("hangil", "RENP-1002 한길렌터카"),
    ("damhwa", "STAP-1003 담화재 (한옥 숙소)"),
    ("sobok", "KIDP-1001 소복소복 (유아 매트)"),
]

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].new_page()
    print(f"{'브랜드':28s} {'라이브':>6s} {'미리보기':>8s}")
    for slug, label in CAND:
        out = []
        for base in (LIVE, PREVIEW):
            code = "실패"
            for _ in range(2):
                try:
                    code = str(pg.request.get(base + slug + "/", timeout=20000).status)
                    break
                except Exception:
                    pg.wait_for_timeout(1200)
            out.append(code)
        print(f"{label:28s} {out[0]:>6s} {out[1]:>8s}")
    pg.close()
