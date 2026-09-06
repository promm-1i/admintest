/* 협력점 데이터 — 여기에만 추가하면 고객지원 페이지의 목록과 지도에 함께 표시됩니다.
 *   region : 서울 | 인천 | 경기 | 강원 | 충청 | 전라 | 경상 | 제주   (지역 필터 버튼과 같은 값)
 *   type   : "hq" = 본점 · 직영 (빨간 핀)   |  "dealer" = 협력점 (파란 핀)
 *   lat/lng: 위도 · 경도. 네이버지도/구글지도에서 장소를 찍고 좌표를 복사해 넣으세요. */
/* 카카오맵을 쓰려면 developers.kakao.com 의 JavaScript 키를 넣으세요. 비워 두면 OpenStreetMap 지도로 표시됩니다. */
window.KAKAO_APP_KEY = "";

window.DEALERS = [
  { name: "볼트라이드 성수 본점", region: "서울", type: "hq", addr: "서울 성동구 성수이로 00, 1층", tel: "1588-0000", lat: 37.5445, lng: 127.0560 },
  { name: "볼트라이드 수원 정비센터", region: "경기", type: "dealer", addr: "경기 수원시 팔달구 매산로 00", tel: "031-000-0000", lat: 37.2660, lng: 127.0010 },
  { name: "부산 해운대 협력점", region: "경상", type: "dealer", addr: "부산 해운대구 해운대로 000", tel: "051-000-0000", lat: 35.1631, lng: 129.1636 },
  { name: "대전 유성 협력점", region: "충청", type: "dealer", addr: "대전 유성구 대학로 00", tel: "042-000-0000", lat: 36.3620, lng: 127.3560 }
];
