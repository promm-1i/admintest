// 첫 눈성형 — 머리 · 접근 · 고민 고르기
import { subVisual, approach, pick } from "../parts.mjs";

export default {
  path: "first.html",
  title: "첫 눈성형 | 여울성형외과",
  desc: "처음 하는 눈성형일수록 오래 보아도 편안한 결과를 기준으로 설계합니다. 고민에 맞는 안내를 골라 보세요.",
  body: () => `
${subVisual({ en: "First Eye Surgery", title: "처음이라서<br>더 신중하게", desc: "첫 수술이라고 가볍게 다루지 않습니다.<br>오래 지나도 자연스러운 모습을<br class=\"mo-br\"> 기준으로 설계합니다.", photo: "sub-first.jpg", alt: "눈을 감은 옆얼굴 사진" })}
${approach({ en: "Our Approach", title: "수술 방법보다 먼저,<br>무엇을 바꾸고 싶은지<br class=\"pc-br\"> 이해하는 일.", texts: ["여울은 수술 방법부터 권하지 않습니다.<br>어떤 점이 불편한지,<br>어떤 눈매를 원하는지 먼저 듣습니다.", "방법은 그다음입니다.<br>방향이 맞으면 방법은 자연스럽게 정해집니다."], photo: "approach-first.jpg", alt: "정면을 바라보는 얼굴 사진" })}
${pick("first", { title: "어떤 눈매를 원하시나요?", desc: "가장 가까운 고민을 고르면, 여울의 설계 방향을 안내해 드립니다." })}`,
};
