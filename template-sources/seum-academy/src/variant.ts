/* ══════════════════════════════════════════════════════════════
   빌드 변형 (variant)

   landing … 애니메이션 포함. 기본값이며 개발 서버도 이쪽입니다.
             npm run build:landing
   basic   … 애니메이션 전무. 정적으로 즉시 표시됩니다.
             npm run build:basic

   MOTION 이 false 면 스크롤 등장·카운트업·탭 페이드가 모두 꺼지고,
   <html data-motion="off"> 가 붙어 CSS 전환·호버 효과까지 함께 차단됩니다.
   ══════════════════════════════════════════════════════════════ */
export const MOTION = import.meta.env.MODE !== 'basic'
