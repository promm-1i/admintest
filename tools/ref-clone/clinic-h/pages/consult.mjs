// 상담 신청 — 왼쪽 안내 패널 + 오른쪽 신청서 (포트폴리오 데모: 전송하지 않음)
import { BRAND, ICON, arrow } from "../shell.mjs";

const CONCERN = ["작고 답답한 눈", "눈 균형 · 비율", "강한 눈매", "눈 위 처짐", "눈밑 윤곽", "쌍꺼풀 풀림", "양쪽 눈 차이", "부자연스러운 라인", "수술 효과 감소", "기타"];

export default {
  path: "consult.html",
  title: "상담 신청 | 여울성형외과",
  desc: "궁금한 점과 수술 이력을 남겨 주시면 여울성형외과가 상담 전에 미리 살펴보고 안내드립니다.",
  bodyClass: "page-consult",
  noConsult: true,
  body: () => `
<section class="cform" aria-labelledby="cf-title">
  <div class="cform__left" data-head="light">
    <div>
      <p class="cform__en">CONSULTATION</p>
      <h1 class="cform__title" id="cf-title">궁금한 점을<br>편하게 남겨 주세요</h1>
      <p class="cform__desc">상담은 예약제로 진행합니다.<br>고민과 수술 이력을 남겨 주시면<br>상담 전에 미리 살펴보고 안내드립니다.</p>
    </div>
    <div class="cform__card">
      <p class="addr">${BRAND.addr}</p>
      <p class="tel">${BRAND.tel}</p>
      <dl>${BRAND.hours.map(([d, t]) => `<div><dt>${d}</dt><dd>${t}</dd></div>`).join("")}</dl>
      <a class="pill" href="${BRAND.telHref}">${ICON.call}<span>전화 예약</span></a>
    </div>
  </div>
  <div class="cform__right">
    <form id="consult-form" novalidate>
      <div class="field"><label class="field__title" for="cf-name">이름 <span class="req" aria-hidden="true">*</span></label><input class="input" id="cf-name" name="name" type="text" placeholder="이름을 입력해 주세요." maxlength="40" autocomplete="name" required></div>
      <div class="field"><label class="field__title" for="cf-tel">연락처 <span class="req" aria-hidden="true">*</span></label><input class="input" id="cf-tel" name="tel" type="tel" inputmode="tel" placeholder="연락처를 입력해 주세요. (예: 010-1234-5678)" maxlength="20" autocomplete="tel" required></div>
      <fieldset class="field"><legend class="field__title">현재 고민 (여러 개 선택 가능) <span class="req" aria-hidden="true">*</span></legend><div class="chips">${CONCERN.map((c, i) => `<label class="chip"><input type="checkbox" name="concern" value="${c}"${i === 0 ? " required" : ""}><span>${c}</span></label>`).join("")}</div></fieldset>
      <fieldset class="field"><legend class="field__title">원하는 상담 방법</legend><div class="chips"><label class="chip"><input type="radio" name="method" value="전화" checked><span>전화 상담</span></label><label class="chip"><input type="radio" name="method" value="문자"><span>문자 안내</span></label></div></fieldset>
      <div class="field field--area"><label class="field__title" for="cf-msg">상담 내용 <span class="req" aria-hidden="true">*</span></label><textarea class="textarea" id="cf-msg" name="msg" maxlength="2000" placeholder="궁금한 점이나 고민을 편하게 적어 주세요.&#10;수술 이력, 원하는 방향 등을 적어 주시면 더 정확하게 안내드릴 수 있습니다." required></textarea></div>
      <p class="agree"><input type="checkbox" id="cf-agree" name="agree" required><label for="cf-agree">개인정보 수집 및 이용 동의 <span class="req" aria-hidden="true">*</span></label><button type="button" data-modal="privacy-modal">자세히 보기</button></p>
      <div class="cform__bottom"><button class="cform__submit" type="submit">상담 신청하기 ${arrow("")}</button></div>
      <p class="cform__msg" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>
<div class="modal" id="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="pm-title" hidden>
  <div class="modal__dim" data-close></div>
  <div class="modal__box">
    <h2 id="pm-title">개인정보 수집 및 이용 안내</h2>
    <div class="modal__body">
      <p>수집 항목: 이름, 연락처, 상담 내용, 선택한 고민 항목</p>
      <p>이용 목적: 상담 신청 확인 및 회신</p>
      <p>보유 기간: 상담 완료 후 1년 또는 삭제 요청 시까지. 관계 법령에 따라 보관이 필요한 경우 그 기간 동안 보관합니다.</p>
      <p>동의를 거부할 권리가 있으며, 거부 시 온라인 상담 신청이 제한될 수 있습니다.</p>
      <p>※ 이 페이지는 홈페이지 제작 포트폴리오용 데모로, 입력한 내용은 어디에도 전송·저장되지 않습니다.</p>
    </div>
    <button class="modal__x" type="button" data-close aria-label="닫기">×</button>
  </div>
</div>`,
};
