// 눈 재수술 — 머리 · 이해 · 고민 고르기
import { subVisual, approach, pick } from "../parts.mjs";

export default {
  path: "revision.html",
  noConsult: true, // 레퍼런스 sub_1·sub_2 는 상담 띠 없이 평평한 푸터
  title: "눈 재수술 | 여울성형외과",
  desc: "이전 수술의 아쉬움을 원인부터 살핍니다. 남길 것과 고칠 것을 나누어 다시 손대지 않아도 되는 구조를 설계합니다.",
  body: () => `
${subVisual({ en: "Revision Surgery", title: "한 번 더,<br>이번에는 차분하게", desc: "이전 수술의 아쉬움을 가볍게 넘기지 않습니다.<br>남길 것과 고칠 것을<br class=\"mo-br\"> 나누어, 다시 손대지 않아도 되는<br class=\"mo-br\"> 구조를 설계합니다.", photo: "sub-revision.jpg", alt: "눈매를 가까이 담은 사진" })}
${approach({ en: "We Understand", title: "첫 수술이<br>전부를 해결해 주지는<br>않았습니다.", texts: ["기대와 달랐던 결과,<br>다시 결심하기까지의 머뭇거림.", "여울은 그 마음을 가볍게 보지 않습니다.<br>그래서 더 천천히, 더 꼼꼼하게<br class=\"pc-br\"> 끝까지 봅니다."], photo: "approach-revision.jpg", alt: "창가 빛을 받은 얼굴 사진" })}
${pick("revision", { title: "어떤 점이 아쉬우신가요?", desc: "고민을 고르면 재수술 설계 방향을 안내해 드립니다." })}`,
};
