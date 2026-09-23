"""corporate-i(누빛광학) 사진 요청서 + 대응표 생성.

imgsizes.json(쪽마다 1440 폭에서 잰 표시 크기)과 자리 이미지 원본 크기로 생성 크기를 정한다:
생성 = 자리 이미지 비율 그대로, 표시 크기의 1.2배와 원본 칸 크기 중 큰 쪽 (긴 변 2400 상한).
"""
import json
import math
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parents[3] / "public/nubit/assets"
SIZES = json.load(open(r"C:\_tmp\claude\keoc\imgsizes.json", encoding="utf-8"))
OUT_MD = Path(r"C:\Users\진수\Desktop\개발")
TAIL = "No logos, brand names, readable text, labels, numbers or real landmarks."

# 파일 → (자리 설명, 영문 프롬프트 본문)
LIGHT = "a very light, almost white abstract background with soft pale lavender gradients and faint thin optical light lines, extremely low contrast so dark text stays readable on top"
P = {
    "hero.jpg": ("메인 첫 화면 영상 포스터 — 가운데 흰 대형 영문 제목", "A cinematic wide photograph of a precision optics clean room: a large polished lens and mirror assembly on an optical table, a thin violet laser beam crossing the frame, deep dark background, cool purple and blue light, calm center area for white headline text."),
    "ov.jpg": ("메인 회사 소개 영상 포스터 — 흰 글자가 위에 얹힘", "A dark cinematic close-up of light refracting through stacked optical lenses, glowing violet and white highlights, lots of dark negative space."),
    "ov-pill.jpg": ("메인 회사 소개 문장 사이 알약 모양 작은 사진", "A macro photograph of a polished optical lens surface reflecting purple light, shallow depth of field."),
    "all-bg.jpg": ("전체 메뉴 배경(아래쪽 정렬)", LIGHT),
    "biz-1.jpg": ("메인 사업 카드 1 — Space", "A satellite optical payload with a large telescope mirror in a clean assembly room, soft studio light."),
    "biz-2.jpg": ("메인 사업 카드 2 — Defense", "A rugged thermal imaging camera module with a germanium lens on a dark metal surface, dramatic side light."),
    "biz-3.jpg": ("메인 사업 카드 3 — Industrial", "A laser processing head with an f-theta lens above a semiconductor wafer, faint laser glow, industrial clean look."),
    "biz-4.jpg": ("메인 사업 카드 4 — Scientific", "A high-power laser research setup with large round mirrors on an optical breadboard, violet beam path, laboratory darkness."),
    "prod-1.jpg": ("메인 제품 카드 1 — Sub-System", "An industrial optical inspection system cabinet with a lens module and camera, clean product photo on neutral grey."),
    "prod-2.jpg": ("메인 제품 카드 2 — Optical Module", "A compact precision optical module in an anodized black metal housing, three-quarter view, studio product light."),
    "prod-3.jpg": ("메인 제품 카드 3 — Lens Assembly", "A multi-element objective lens assembly in a silver barrel, cutaway feeling, studio product light on white."),
    "prod-4.jpg": ("메인 제품 카드 4 — Optical Components", "Several optical windows, mirrors and prisms arranged neatly on a black velvet cloth, reflections of soft light."),
    "prod-bg.jpg": ("메인 제품 섹션 넓은 배경 — 카드가 위에 얹힘", "A dark, blurred abstract photo of optical glass reflections with soft purple bokeh, low detail so cards stay readable."),
    "rnd.jpg": ("메인 R&D 세로 사진", "A Korean researcher in a white clean suit aligning an interferometer in an optics lab, side view, cool light, face not the focus."),
    "esg-bg.jpg": ("메인 ESG 가로 띠 배경 — 흰 글자", "A calm aerial view of green forest and a clear river at sunrise, soft light, slightly darkened for white text."),
    "career-bg.jpg": ("메인 채용 가로 띠 배경 — 흰 글자", "Young Korean engineers collaborating around an optical bench in a bright modern lab, candid, slightly darkened for white text."),
    "press-1.jpg": ("메인 소식 카드 사진", "Korean company staff handing over boxed portable sterilizer devices at a community welfare center, warm documentary style, faces soft."),
    "sv-1.jpg": ("About 서브 첫 화면 배경", "A wide dark photograph of a precision optics factory floor with polishing machines, cool violet light, cinematic."),
    "sv-1-m.jpg": ("About 서브 첫 화면 배경(모바일 세로)", "A tall dark photograph of a precision lens polishing machine, cool violet light, cinematic, vertical composition."),
    "sv-2.jpg": ("Business 서브 첫 화면 배경", "A wide dark photograph of an aircraft sensor pod and optical window under hangar lights, cinematic."),
    "sv-3.jpg": ("Product 서브 첫 화면 배경", "A wide dark photograph of optical lenses and prisms arranged on black glass with violet rim light."),
    "sv-4.jpg": ("R&D 서브 첫 화면 배경", "A wide dark photograph of an optics research lab with laser beams visible through light haze."),
    "sv-5.jpg": ("ESG 서브 첫 화면 배경", "A wide calm photograph of wind turbines on green hills under a soft evening sky, slightly dark."),
    "sv-6.jpg": ("Press 서브 첫 화면 배경", "A wide dark photograph of a modern corporate building lobby with glass and soft purple lighting."),
    "sv-7.jpg": ("Career 서브 첫 화면 배경", "A wide photograph of Korean employees walking through a bright modern office corridor, motion blur, slightly dark."),
    "p/m11-sec1.jpg": ("기업개요 소개 사진(둥근 모서리)", "A modern optical company headquarters building with glass facade on a clear day, architectural photo."),
    "p/m11-sec2.jpg": ("기업개요 두 번째 섹션 큰 배경 — 흰 글자와 숫자가 위에 얹힘", "A tall dark photograph of a lens polishing workshop from above, rows of machines, cool violet tone, very low contrast."),
    "p/m12-img0.jpg": ("CEO 인사말 가로 사진", "A wide photograph of a bright executive meeting room overlooking a city, empty chairs, soft daylight."),
    "p/m12-img1.jpg": ("CEO 인사말 제목 속 알약 사진 1", "A macro photograph of a violet laser beam passing through a lens."),
    "p/m12-img2.jpg": ("CEO 인사말 제목 속 알약 사진 2", "A macro photograph of polished optical glass edges with soft reflections."),
    "p/m13-bg1.jpg": ("연혁 도약기 확대 사진", "A modern advanced optics production line with coating chambers, bright and clean."),
    "p/m13-bg2.jpg": ("연혁 성장기 확대 사진", "A precision machining workshop producing large optical mirrors, 2010s industrial feel."),
    "p/m13-bg3.jpg": ("연혁 설립기 확대 사진", "A vintage-toned photograph of an early optical workshop with lens grinding tools, warm light."),
    "p/m15-img1.jpg": ("비전 Mission 사진", "Hands of a Korean engineer holding a finished precision lens up to the light."),
    "p/m15-img2.jpg": ("비전 Vision 사진", "A sunrise over a city skyline seen through a large clear optical window."),
    "p/m21-bg-l.jpg": ("Space 쪽 아래 넓은 연한 배경", LIGHT),
    "p/m21-top.jpg": ("Space 윗부분 넓은 사진", "Earth from low orbit with a satellite optical telescope in the foreground, deep space, cinematic."),
    "p/m21-img1.jpg": ("Space 카드 — 위성 관측", "A satellite observing Earth's surface, clouds and oceans below."),
    "p/m21-img2.jpg": ("Space 카드 — 항공 감시", "A drone with a gimbal camera flying over a coastline."),
    "p/m21-img3.jpg": ("Space 카드 — 우주 탐사", "A large observatory telescope under a starry night sky."),
    "p/m21-img4.jpg": ("Space 카드 — 적외선·광전자", "A thermal false-color image of a landscape at night."),
    "p/m21-img5.jpg": ("Space 카드 — 레이저 시스템", "A green and violet laser beam aimed at the night sky from a ground station."),
    "p/m21-img6.jpg": ("Space 카드 — 정밀 광학 기기", "A set of precision lenses and filters arranged on a clean surface."),
    "p/m22-bg-l.jpg": ("Defense·Industrial 아래 넓은 연한 배경", LIGHT),
    "p/m22-t1-top.jpg": ("Defense 항공 윗부분 넓은 사진 — 흰 제목", "A military-style jet silhouette at dusk with an electro-optical targeting pod, dramatic sky, darkened for white text."),
    "p/m22-t1-1.jpg": ("Defense 항공 카드 — 열상 광학모듈", "A compact airborne thermal camera module on a dark background."),
    "p/m22-t1-2.jpg": ("Defense 항공 카드 — 비전 모듈", "A small reconnaissance drone camera gimbal close-up."),
    "p/m22-t1-3.jpg": ("Defense 항공 카드 — EMI 차폐 광학", "A round optical window with a fine metallic mesh coating reflecting light."),
    "p/m22-t2-top.jpg": ("Defense 지상 윗부분 넓은 사진 — 흰 제목", "An armored ground vehicle periscope sight in a misty field at dawn, darkened for white text."),
    "p/m22-t2-1.jpg": ("Defense 지상 카드 — 열상 광학 모듈", "A rugged thermal sight module mounted on a vehicle, close-up."),
    "p/m22-t2-2.jpg": ("Defense 지상 카드 — 레이저 거리 측정기", "A handheld laser rangefinder on a tripod in a field."),
    "p/m22-t2-3.jpg": ("Defense 지상 카드 — 주간·야간 창", "A thick coated optical window for day and night vision, studio shot."),
    "p/m22-t2-merit.jpg": ("Defense 지상 상담 배너 배경 — 흰 글자", "A wide dark photograph of desert terrain at dusk, low contrast."),
    "p/m22-t3-top.jpg": ("Defense 해양 윗부분 넓은 사진 — 흰 제목", "A naval ship mast with electro-optical sensors over a stormy sea, darkened for white text."),
    "p/m22-t3-1.jpg": ("Defense 해양 카드 — 해양용 광학모듈", "A marine electro-optical sensor turret on a ship deck."),
    "p/m22-t3-2.jpg": ("Defense 해양 카드 — EMI 차폐 광학", "A metal-mesh coated optical dome reflecting sea light."),
    "p/m22-t3-merit.jpg": ("Defense 해양 상담 배너 배경 — 흰 글자", "A wide dark photograph of open ocean waves at night, low contrast."),
    "p/banner-defense.jpg": ("Defense 항공 상담 배너 배경 — 흰 글자", "A wide dark photograph of clouds at high altitude seen from a cockpit, low contrast."),
    "p/banner-space.jpg": ("Space 상담 배너 배경 — 흰 글자", "A wide dark photograph of the Earth horizon from space with a thin blue glow."),
    "p/banner-laser.jpg": ("Industrial 레이저 상담 배너 배경 — 흰 글자", "A wide dark photograph of laser cutting sparks on metal, low contrast."),
    "p/banner-vision.jpg": ("Industrial 비전 상담 배너 배경 — 흰 글자", "A wide dark photograph of a display panel under inspection light, low contrast."),
    "p/banner-sci.jpg": ("Scientific 상담 배너 배경 — 흰 글자", "A wide dark photograph of a laser laboratory optical table, low contrast."),
    "p/m23-t1-top.jpg": ("Industrial 레이저 윗부분 넓은 사진", "A laser processing machine engraving a glass panel, bright violet laser point, industrial clean room."),
    "p/m23-t1-li1.jpg": ("레이저 가공 — 디스플레이", "A large OLED display panel on a production line."),
    "p/m23-t1-li2.jpg": ("레이저 가공 — 반도체", "A silicon wafer under a lithography lens with purple light."),
    "p/m23-t1-li3.jpg": ("레이저 가공 — 고출력 레이저 광학", "A high-power laser mirror with a bright reflection spot."),
    "p/m23-t2-top.jpg": ("Industrial 비전 윗부분 넓은 사진", "An automated optical inspection camera scanning electronic boards on a conveyor."),
    "p/m23-t2-li1.jpg": ("비전 검사 — 테스트 벤치", "An optical test bench with a camera and sample stage in a lab."),
    "p/m23-t2-li2.jpg": ("비전 검사 — 맞춤형 설계", "An engineer's desk with optical design drawings and a lens module prototype."),
    "p/m24-top.jpg": ("Scientific 윗부분 넓은 사진", "A large research laser facility with long beam tubes and mirrors, cool light."),
    "p/m30-1.jpg": ("PRODUCT 카드 — Lens Assembly(세로)", "A vertical studio photo of a precision lens assembly standing upright, dark background."),
    "p/m30-2.jpg": ("PRODUCT 카드 — Optical Components(세로)", "A vertical studio photo of optical windows and mirrors stacked, dark background."),
    "p/m30-3.jpg": ("PRODUCT 카드 — Optical Module(세로)", "A vertical studio photo of a compact optical module, dark background."),
    "p/m30-4.jpg": ("PRODUCT 카드 — Sub-System(세로)", "A vertical studio photo of an optical inspection system unit, dark background."),
    "p/m31-exp-bg-l.jpg": ("제품 목록·상세 소개 띠 연한 배경", LIGHT),
    "p/m41-bg-l.jpg": ("R&D 쪽 넓은 연한 배경", LIGHT),
    "p/m41-slg.jpg": ("연구소 슬로건 넓은 사진 — 흰 글자", "A dark optics research lab with a glowing interferometer, darkened for white text."),
    "p/m41-1.jpg": ("연구소 — 기술 경쟁력", "A Korean researcher analyzing wavefront data on a monitor next to an optical setup."),
    "p/m41-2.jpg": ("연구소 — 연구 환경", "A bright collaborative R&D room with engineers discussing around a table."),
    "p/m41-3.jpg": ("연구소 — 성장 기반", "A large high-power laser optic being inspected under bright light."),
    "p/m42-slg.jpg": ("기술개발성과 슬로건 넓은 사진 — 흰 글자", "A dark photo of multiple prototype optical modules on a lab bench, darkened for white text."),
    "p/m42-1.jpg": ("기술개발성과 세로 사진 1", "A vertical photo of a beam alignment optical module on a test stand."),
    "p/m42-2.jpg": ("기술개발성과 세로 사진 2", "A vertical photo of a line-beam optical system in a cleanroom."),
    "p/m42-3.jpg": ("기술개발성과 세로 사진 3", "A vertical photo of an X-ray mirror component under soft light."),
    "p/m51-slg.jpg": ("ESG 슬로건 넓은 사진 — 흰 글자", "A calm forest with sunlight rays, darkened for white text."),
    "p/m51-bg-l.jpg": ("ESG 윗부분 연한 배경", LIGHT),
    "p/m51-1.jpg": ("ESG 경영정책 사진", "Green leaves growing near a solar panel in soft daylight."),
    "p/m53-1.jpg": ("사회공헌 활동 사진(갤러리)", "Korean company volunteers donating supplies at a local community center, warm documentary style, faces soft."),
    "p/m55-exp.jpg": ("인권경영 목적 넓은 사진 — 흰 글자", "Diverse hands joined together in a circle, soft light, darkened for white text."),
    "p/m55-1.jpg": ("UNGC 인권 가로 띠", "A wide soft photo of people from different backgrounds smiling together."),
    "p/m55-2.jpg": ("UNGC 노동 가로 띠", "A wide soft photo of workers in safety gear in a bright factory."),
    "p/m55-3.jpg": ("UNGC 환경 가로 띠", "A wide soft photo of a green valley and river."),
    "p/m55-4.jpg": ("UNGC 반부패 가로 띠", "A wide soft photo of a handshake over a clean office desk."),
    "p/m56-bg.jpg": ("공정거래 선언문 배경 — 흰 글자", "A dark, calm photograph of a modern boardroom table at night, low contrast."),
    "p/m64-brochure.jpg": ("브로슈어 표지(세로)", "A vertical brochure cover style photo of a violet-lit optical lens on black, empty space at top."),
    "p/media-1.jpg": ("미디어 영상 썸네일 1", "An interview scene in an optics factory with a camera crew, cinematic."),
    "p/media-2.jpg": ("미디어 영상 썸네일 2", "A corporate promotional video frame of a lens production line."),
    "p/media-3.jpg": ("미디어 영상 썸네일 3", "An abstract motion-graphic style frame of light beams through prisms, violet palette."),
    "p/press-1.jpg": ("보도자료 카드 사진", "Korean company staff handing over boxed portable sterilizer devices at a community welfare center, documentary style, faces soft."),
    "p/m71-slg.jpg": ("인재상 슬로건 넓은 사진 — 흰 글자", "Young Korean professionals brainstorming in a bright office, darkened for white text."),
    "p/m72-s1.jpg": ("인사제도 평가제도 띠 — 흰 글자", "A wide dark photo of a performance review meeting with charts on a screen, low contrast."),
    "p/m72-s2-l.jpg": ("인사제도 보상제도 넓은 연한 배경 — 반투명 흰 카드가 얹힘", LIGHT),
    "p/m72-s3.jpg": ("인사제도 교육제도 띠 — 흰 글자", "A wide dark photo of a training workshop in a seminar room, low contrast."),
    "p/m73-slg.jpg": ("복리후생 슬로건 넓은 사진 — 흰 글자", "Korean employees enjoying a company picnic in a park, warm light, darkened for white text."),
    "p/m73-bg-l.jpg": ("복리후생·상시채용 넓은 연한 배경", LIGHT),
    "p/m74-slg.jpg": ("상시채용 슬로건 넓은 사진 — 흰 글자", "A sunrise view from a modern office window with a desk and laptop, darkened for white text."),
    "p/m74-1.jpg": ("채용 카드 — 펌웨어 설계", "A circuit board with a microcontroller and code on a monitor behind, darkened."),
    "p/m74-2.jpg": ("채용 카드 — 회로설계", "An electronics engineer probing a PCB with an oscilloscope, darkened."),
    "p/m74-3.jpg": ("채용 카드 — 기구설계", "A 3D CAD model of a mechanical housing on a monitor, darkened."),
    "p/m74-4.jpg": ("채용 카드 — 광학설계", "Optical ray tracing diagrams on a monitor next to lenses, darkened."),
    "p/m74-5.jpg": ("채용 카드 — 생산기술", "A lens polishing machine in operation, darkened."),
    "p/m74-6.jpg": ("채용 카드 — 조립", "Gloved hands assembling a lens module in a cleanroom, darkened."),
    "p/m74-7.jpg": ("채용 카드 — 품질 QA", "A quality engineer reviewing inspection reports at a desk, darkened."),
    "p/m74-8.jpg": ("채용 카드 — 품질 QC", "An interferometer measuring a lens surface, darkened."),
}
PRD = {
    "prd-1-001": "an infinity-corrected microscope objective lens", "prd-1-002": "an f-theta scan lens with a galvanometer scanner", "prd-1-003": "a laser beam expander",
    "prd-1-004": "a machine vision telecentric lens", "prd-1-005": "a projection lens assembly", "prd-1-006": "a collimator lens",
    "prd-2-001": "laser windows and optical flats", "prd-2-002": "laser mirrors with dielectric coating", "prd-2-003": "ultrafast laser mirrors", "prd-2-004": "cylindrical lenses",
    "prd-3-001": "a vision inspection optical module", "prd-3-002": "a laser beam alignment module", "prd-3-003": "a compact beam combining module", "prd-3-004": "a precision beam steering module",
    "prd-3-005": "an aiming optical sight module", "prd-3-006": "a blackbody calibration source", "prd-4-001": "an OCT inspection system",
    "prd-217": "a display interlayer inspection optical module", "prd-218": "a slim AOI optical module standing vertically", "prd-219": "an FPCB inspection optical module",
    "prd-220": "a viewing-angle inspection module with a line scan camera", "prd-225": "a tablet display inspection module",
    "prd-226": "a lens barrel alignment assembly", "prd-227": "a wavefront measurement setup",
    "prd-228": "an anti-reflection coated laser window", "prd-229": "a plane parallel laser window", "prd-230": "a square laser grade window", "prd-231": "a rectangular laser grade window",
    "prd-232": "an interferometer flat", "prd-233": "a large wedge window",
    "prd-249": "a convex fused silica mirror blank", "prd-250": "a concave spherical mirror blank", "prd-251": "a round N-BK7 mirror blank",
    "prd-252": "a round fused silica mirror blank", "prd-253": "a square mirror blank", "prd-254": "a rectangular fused silica mirror blank",
    "prdv-226-t": "a lens barrel alignment assembly", "prdv-226-1": "a centering alignment diagram-like photo of lenses in a barrel on an alignment station",
    "prdv-227-1": "an interferometer measuring an objective lens", "prdv-227-2": "a tall view of a wavefront sensor test stand", "prdv-227-3": "an optical test bench with a lens under measurement",
    "prdv-232-1": "an interferometer flat on an optical mount", "prdv-233-1": "a wedge window on an optical mount",
}
for k, v in PRD.items():
    P[f"p/{k}.jpg"] = ("제품 사진 — " + v, f"A clean studio product photograph of {v}, centered on a plain white background, soft even light, crisp detail.")

SKIP = {"p/m43-cert1.jpg": "인증서 원본(스캔)", "p/m43-cert2.jpg": "인증서 원본(스캔)", "p/m43-noimg.jpg": "인증서 없음 표시 칸"}

rows, n = [], 0
for rel in sorted(P):
    f = ROOT / rel
    if not f.exists():
        raise SystemExit("없는 파일: " + rel)
    nw, nh = Image.open(f).size
    dw, dh = SIZES.get(rel, [nw, nh])[:2]
    s = max(1.0, 1.2 * dw / nw, 1.2 * dh / nh)
    gw, gh = math.ceil(nw * s / 2) * 2, math.ceil(nh * s / 2) * 2
    if max(gw, gh) > 2400:
        k = 2400 / max(gw, gh); gw, gh = math.ceil(gw * k / 2) * 2, math.ceil(gh * k / 2) * 2
    n += 1
    rows.append((f"k{n}", rel, dw, dh, gw, gh) + P[rel])

name = f"기업D_누빛광학_사진{n}장_요청.md"
md = [f"# 기업 D · 누빛광학 사진 {n}장", "",
      "광학 기업 템플릿 `corporate-i` 에 들어갑니다. 가상 브랜드입니다. 지금은 줄무늬 임시 그림입니다.",
      "로고·아이콘·도식(원형·링·물결)·연락처·거래처 로고는 그림(SVG)으로 만들어 두어 넣지 않았습니다. 인증서 3칸은 실제 회사 문서로 바꿀 자리라 뺐습니다.", "",
      "## 저장 규칙", "", f"- 저장 위치: `C:\\Users\\진수\\Desktop\\개발\\누빛광학_사진{n}장`", f"- 파일명: **`k1` ~ `k{n}`** (.jpg)",
      "- **\"생성 크기\"로** 만들어 주세요.", "- 사람이 나오면 **한국인**으로, 얼굴은 크게 드러나지 않게 부탁드립니다.",
      "- **로고·글자·숫자·실제 회사 이름·실존 랜드마크가 보이면 안 됩니다.**", "- \"흰 글자\"라고 적힌 칸은 글자가 얹히니 어둡고 차분하게, \"연한 배경\" 칸은 거의 흰색으로 부탁드립니다.", "", "---", ""]
for key, rel, dw, dh, gw, gh, desc, prompt in rows:
    md += [f"### {key}.jpg · `{rel}` · 표시 {dw}×{dh} · **생성 {gw}×{gh}**", "", desc, "", "```", f"{prompt} {TAIL} Output exactly {gw}x{gh} pixels.", "```", ""]
(OUT_MD / name).write_text("\n".join(md), encoding="utf-8")
tsv = ["# 기업 D — 번호\t슬러그\t파일\t표시w\t표시h\t생성w\t생성h"] + [f"{k}\tcorporate-i\t{rel}\t{dw}\t{dh}\t{gw}\t{gh}" for k, rel, dw, dh, gw, gh, *_ in rows]
(Path(__file__).parents[1] / "photo-map-corporate-i.txt").write_text("\n".join(tsv) + "\n", encoding="utf-8")
print(name, n)
