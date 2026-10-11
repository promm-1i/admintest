# -*- coding: utf-8 -*-
"""비즈니스 소식 본문을 카페 본문으로 바꾼다 (2026-10-11 사용자 지시).

사용자: "당근비즈니스 본문 내용 좋아. 이걸 가지고 당근카페에 주소만 지우고
영업 같은 거 지우면 좋을 거 같은데. 지금 당근카페는 '이렇게 구현하면 이쁩니다'
이거만 있어서 별로야."

카페는 주소·가격·문의 유도가 전부 금지다(feedback_karrot_post_titles).
그래서 비즈 본문에서 주소 줄과 마무리 영업 문단만 뗀다.
가운데 설명(화면에 실제로 있는 것)은 그대로 쓴다.

  python cafe_body.py <키>     biz_post_new.POSTS 의 그 건을 카페용으로 찍어 본다
"""
import sys

# 2026-10-11 사용자: "이렇게 구현하면 이쁩니다는 빼" — 감상 한 줄로 닫지 않는다.
# 설명이 끝나는 자리에서 그냥 끝낸다.
# 영업은 늘 마지막 문단에만 있다. 가운데 '문의하기 폼'·'온라인상담 쪽' 은
# 화면에 있는 기능 이름이라 남긴다 — 낱말로 훑어 지우면 설명이 통째로 날아간다.
SALES = ("문의해 주세요", "문의해주세요", "상담해 드립니다", "상담 가능합니다",
         "상담해드립니다", "만원부터", "위 주소", "제작해 드", "제작해드",
         "만들어 드립니다", "확인해 보세요", "보실 수 있습니다")
# 떼고도 남으면 눈으로 봐야 하는 것(기능 이름이면 오탐)
LOOK = ("문의", "상담", "만원", "요금", "가격")


def to_cafe(body: str) -> str:
    paras = [p for p in body.split("\n\n") if p.strip()]
    keep = []
    for p in paras:
        lines = [ln for ln in p.split("\n") if not ln.lstrip().startswith("http")]
        p = "\n".join(lines).strip()
        if p:
            keep.append(p)
    while keep and any(w in keep[-1] for w in SALES):   # 마무리 영업 문단만 뗀다
        keep.pop()
    return "\n\n".join(keep)


def warn(text: str) -> None:
    for p in text.split("\n\n"):
        hits = [w for w in LOOK if w in p]
        if hits:
            print("눈으로 볼 것(%s): %s" % (", ".join(hits), p[:60]))


if __name__ == "__main__":
    sys.path.insert(0, ".")
    src = open("biz_post_new.py", encoding="utf-8").read().split("def photo_count")[0]
    ns = {}
    exec(compile(src, "biz_post_new.py", "exec"), ns)
    key = sys.argv[1]
    out = to_cafe(ns["POSTS"][key][2])
    print(out)
    print("---")
    warn(out)
