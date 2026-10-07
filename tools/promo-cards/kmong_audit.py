"""크몽 업로드물 검수 — 규격·빈 장·중복."""
import sys
import unicodedata
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None
sys.path.insert(0, str(Path(__file__).parent))
from kmong_shots import out_root  # noqa: E402
from make_page_shots import band_ratio, content_ratio, diff  # noqa: E402

root = out_root()
bad: list[str] = []
tot = short = 0
for d in sorted(root.iterdir()):
    if not d.is_dir():
        continue
    name = unicodedata.normalize("NFC", d.name)
    cover = d / "00_대표_1x1.png"
    dets = sorted(d.glob("*_상세.png"))
    tot += len(dets) + (1 if cover.exists() else 0)
    if not cover.exists():
        bad.append(f"{name}: 대표 없음")
    else:
        ci = Image.open(cover)
        if ci.width != ci.height or ci.width < 600:
            bad.append(f"{name}: 대표 {ci.size} (1:1 · 600 이상이어야 함)")
    if len(dets) < 10:
        short += 1
    ims = []
    for f in dets:
        im = Image.open(f).convert("RGB")
        if im.width < 600:
            bad.append(f"{name}/{f.name}: 가로 {im.width} (600 미만)")
        if im.height > 3000:
            bad.append(f"{name}/{f.name}: 세로 {im.height} (3000 초과)")
        if content_ratio(im) < 0.045:
            bad.append(f"{name}/{f.name}: 빈 장 (내용 {content_ratio(im):.3f})")
        if band_ratio(im) > 0.5:
            bad.append(f"{name}/{f.name}: 통짜 띠 {band_ratio(im):.0%}")
        for pf, pim in ims:
            if diff(pim, im) < 6:
                bad.append(f"{name}/{f.name}: {pf} 와 중복")
                break
        ims.append((f.name, im))

folders = [d for d in root.iterdir() if d.is_dir()]
print(f"폴더 {len(folders)}개 · 이미지 {tot}장 · 상세 10장 미만 {short}곳")
print(f"문제 {len(bad)}건")
for line in bad[:40]:
    print("  ", line)
