"""템플릿마다 실제 작업월과 쓰인 기술을 뽑아 kmong_facts.json 에 적는다.

작업월: 폴더에 파일을 5개 이상 건드린 커밋만 센다. 한 줄짜리 전체 수정(대표자명 등)은
전 템플릿을 같은 달로 만들어 버려서 실제 작업월이 아니다.
기술: 템플릿 html/js 에서 실제로 불러 쓰는 라이브러리를 센다. 짐작하지 않는다.
"""
import json
import re
import subprocess
import sys
import unicodedata
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "promo-cards"))
import kmong_shots as K  # noqa: E402

LIBS = {
    "jQuery": r"jquery",
    "GSAP": r"gsap|ScrollTrigger",
    "Swiper": r"swiper",
    "Lenis": r"lenis",
    "AOS": r"\baos\b|data-aos",
    "Vue": r"vue(\.min)?\.js|v-for=|v-if=",
    "Chart.js": r"chart\.js|new Chart\(",
    "SCSS": r"\.scss",
    "Tailwind CSS": r"tailwind",
}


def months(folder: str) -> tuple[str, str]:
    path = f"public/templates/{folder}" if (K.REPO / "public" / "templates" / folder).is_dir() else f"public/{folder}"
    log = subprocess.run(
        ["git", "log", "--format=%H %ad", "--date=format:%Y-%m", "--name-only", "--", path],
        capture_output=True, text=True, cwd=K.REPO).stdout
    cur, cnt, hits = None, 0, []
    for line in log.split("\n"):
        if re.match(r"^[0-9a-f]{7,40} \d{4}-\d{2}$", line.strip()):
            if cur and cnt >= 5:
                hits.append(cur)
            cur, cnt = line.strip().split()[1], 0
        elif line.strip():
            cnt += 1
    if cur and cnt >= 5:
        hits.append(cur)
    if not hits:
        return "", ""
    return min(hits), max(hits)


def libs(folder: str) -> list[str]:
    d = K.site_dir(folder)
    blob = []
    for f in list(d.glob("*.html"))[:12] + list(d.rglob("*.js"))[:25]:
        try:
            blob.append(f.read_text(encoding="utf-8", errors="ignore")[:200000])
        except Exception:
            pass
    text = "\n".join(blob).lower()
    return [name for name, pat in LIBS.items() if re.search(pat, text, re.I)]


def main() -> None:
    rows = {r["code"]: r for r in K.premium()}
    out = {}
    tally = Counter()
    for d in sorted(K.out_root().iterdir()):
        if not d.is_dir():
            continue
        code = unicodedata.normalize("NFC", d.name).split("_")[0]
        r = rows.get(code)
        if not r:
            continue
        a, b = months(r["folder"])
        found = libs(r["folder"])
        tally.update(found)
        out[code] = {"brand": unicodedata.normalize("NFC", d.name).split("_", 1)[1],
                     "folder": r["folder"], "start": a, "end": b, "libs": found}
        print(f"{code:10s} {a or '-':8s}~ {b or '-':8s} {', '.join(found)}")
    p = Path("C:/_tmp/claude/kmong_facts.json")
    p.write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
    print("\n라이브러리 빈도:", tally.most_common())
    print("적어 둠:", p)


if __name__ == "__main__":
    main()
