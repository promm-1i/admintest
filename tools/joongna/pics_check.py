# 올릴 사진에 전화번호 · 메일 주소가 찍혔는지 글자 인식으로 본다 — 중고나라 · 번개장터 모두 연락처 노출은 제재 대상
#   python pics_check.py <사진 폴더> [<사진 폴더> ...]   → 걸린 장이 있으면 끝 코드 1
# 템플릿 대표 번호(010-4894-4905)는 실제 번호라 꼭 걸러야 한다. 02-000-xxxx 같은 가짜 번호도 같이 표시만 한다.
import re, subprocess, sys, tempfile
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8")
REAL = ("4894", "4905")
files = [f for d in sys.argv[1:] for f in sorted(Path(d).glob("*.jpg"))]
assert files, "사진 없음"
tmp = Path(tempfile.mkdtemp())
(tmp / "list.txt").write_text("\n".join(map(str, files)), encoding="utf-8")
subprocess.run(["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(Path(__file__).with_name("ocr.ps1")),
                "-ListFile", str(tmp / "list.txt"), "-OutFile", str(tmp / "out.txt")], check=True)
rows = [l.split("\t", 1) + [""] for l in (tmp / "out.txt").read_text(encoding="utf-8").splitlines()]
bad = 0
for p, t, *_ in rows:
    z = re.sub(r"\s", "", t)
    nums = re.findall(r"\d{2,3}[-.]?\d{3,4}[-.]?\d{4}", z)
    mails = re.findall(r"[\w.-]+@[\w-]+\.[\w.]+", t)
    real = any(k in z for k in REAL)
    if real or mails:
        bad += 1
    if real or nums or mails:
        print("실번호" if real else ("메일" if mails else "가짜번호"), Path(p).parent.parent.name, Path(p).name, nums[:3], mails[:2])
print("읽은 장 %d · 걸린 장 %d" % (len(rows), bad))
sys.exit(1 if bad else 0)
