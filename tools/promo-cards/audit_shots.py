"""홍보 이미지 검수 — 등장 효과가 안 돌아 비어 있는(거의 단색) 장면을 찾는다.

  python tools/promo-cards/audit_shots.py            # 전 폴더
  python tools/promo-cards/audit_shots.py CORP-1007  # 한 폴더
"""
import sys
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
from make_cards import OUT_ROOT  # noqa: E402


def flat_ratio(im: Image.Image) -> float:
    """세로로 훑어 '내용이 없는 줄'(가로 방향 색 변화가 거의 없는 줄)의 비율."""
    g = im.convert("L").resize((160, max(40, min(600, im.height // 8))))
    w, h = g.size
    px = g.load()
    flat = 0
    for y in range(h):
        row = [px[x, y] for x in range(w)]
        if max(row) - min(row) < 10:
            flat += 1
    return flat / h


def main() -> None:
    want = sys.argv[1] if len(sys.argv) > 1 else ""
    bad = []
    for folder in sorted(OUT_ROOT.iterdir()):
        if not folder.is_dir() or (want and want not in folder.name):
            continue
        for sub in ("크몽", "블로그", "당근_카페", "당근_비즈니스소식"):
            for f in sorted((folder / sub).glob("*.jpg")):
                with Image.open(f) as im:
                    r = flat_ratio(im)
                    if r >= 0.6:
                        bad.append((round(r, 2), folder.name, sub, f.name, f"{im.width}x{im.height}"))
    for r, *rest in sorted(bad, reverse=True):
        print(r, *rest)
    print("빈 장면", len(bad), "개")


if __name__ == "__main__":
    main()
