// 눈 재수술 — 머리 · 이해 · 고민 고르기
import { subVisual, approach, pick } from "../parts.mjs";

export default {
  path: "revision.html",
  title: "눈 재수술 | 여울성형외과",
  desc: "이전 수술의 아쉬움을 원인부터 살핍니다. 남길 것과 고칠 것을 나누어 다시 손대지 않아도 되는 구조를 설계합니다.",
  body: () => `
${subVisual({ en: "Revision Surgery", title: "한 번 더,<br>이번에는 차분하게", desc: "이전 수술의 아쉬움을 가볍게 넘기지 않습니다.<br>남길 것과 고칠 것을 나누어,<br class=\"mo-br\"> 다시 손대지 않아도 되는 구조를 설계합니다.", photo: "sub-revision.jpg", alt: "눈매를 가까이 담은 사진" })}
${approach({ en: "We Understand", title: "기대와 달랐던 결과,<br>다시 결심하기까지의<br class=\"pc-br\"> 망설임.", texts: ["첫 수술이 모든 것을 해결해 주지는 못합니다.<br>여울은 다시 병원을 찾기까지의<br>마음이 가볍지 않다는 것을 압니다.", "그래서 더 천천히 보고,<br>더 정확하게 원인을 찾습니다."], photo: "approach-revision.jpg", alt: "창가 빛을 받은 얼굴 사진" })}
${pick("revision", { title: "어떤 점이 아쉬우신가요?", desc: "가장 가까운 고민을 고르면, 재수술 설계 방향을 안내해 드립니다." })}`,
};
