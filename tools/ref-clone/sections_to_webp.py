# -*- coding: utf-8 -*-
"""구간 캡처를 WebP 두 폭으로 바꾸고 templateSections.ts 를 srcset 에 맞게 고친다.

상세 한 쪽에 캡처가 13장까지 붙어 JPEG 그대로는 첫 로딩이 무겁다.
  - 1280w 원본 → WebP
  - 640w 축소본 → WebP (모바일용)
  - 원본 JPEG 는 지운다 (데이터 파일이 더 이상 참조하지 않는다)

  python tools/ref-clone/sections_to_webp.py
"""
import io
import os
import re
import sys
from PIL import Image

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
ROOT = "C:/web-project/mintcl-netlify-spa"
DIR = os.path.join(ROOT, "public/thumbs/sections")
DATA = os.path.join(ROOT, "src/lib/templateSections.ts")
SMALL_WIDTH = 640

before = sum(os.path.getsize(os.path.join(DIR, f)) for f in os.listdir(DIR))
converted, removed = 0, 0

for name in sorted(os.listdir(DIR)):
    if not name.lower().endswith(".jpg"):
        continue
    src = os.path.join(DIR, name)
    stem = name[:-4]
    image = Image.open(src).convert("RGB")
    image.save(os.path.join(DIR, stem + ".webp"), "WEBP", quality=78, method=5)
    width, height = image.size
    if width > SMALL_WIDTH:
        small = image.resize((SMALL_WIDTH, round(height * SMALL_WIDTH / width)), Image.LANCZOS)
        small.save(os.path.join(DIR, stem + "-640.webp"), "WEBP", quality=74, method=5)
    os.remove(src)
    converted += 1
    removed += 1

after = sum(os.path.getsize(os.path.join(DIR, f)) for f in os.listdir(DIR))

source = io.open(DATA, encoding="utf-8").read()
source = source.replace("/thumbs/sections/", "/thumbs/sections/").replace('.jpg"', '.webp"')
io.open(DATA, "w", encoding="utf-8", newline="\n").write(source)

print("변환 %d장 / JPEG 제거 %d장" % (converted, removed))
print("용량 %.1fMB → %.1fMB (%.0f%%)" % (before / 1e6, after / 1e6, after / before * 100))
print("데이터 파일에 남은 .jpg:", len(re.findall(r"\.jpg\"", source)))
