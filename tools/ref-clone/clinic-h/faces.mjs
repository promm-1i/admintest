// 고민 고르기 카드의 얼굴 선화 — 레퍼런스는 PNG 일러스트, 우리는 SVG 로 직접 그린다.
// 얼굴 윤곽·코·입은 같고, 고민마다 눈매만 바꿔 그린다. 선 색은 currentColor.

const eye = (cx, cy, { w = 26, h = 9, tilt = 0, lid = 5, crease = true, creaseH = 6, creaseOp = 1, iris = 5.2, droop = 0, bag = false, creaseW = 1.1, inner = 0 }) => {
  const x0 = cx - w / 2, x1 = cx + w / 2;
  const t = tilt; // 바깥 눈꼬리 올라감(+) / 내려감(-)
  const side = cx < 100 ? -1 : 1; // 왼눈은 바깥이 왼쪽
  const ox = side < 0 ? x0 : x1, ix = side < 0 ? x1 : x0;
  const oy = cy - t, iy = cy + inner;
  const up = `M${ix} ${iy} Q${cx} ${cy - h - droop * 0.4} ${ox} ${oy}`;
  const low = `M${ix} ${iy} Q${cx} ${cy + h * 0.55} ${ox} ${oy}`;
  const cr = crease ? `<path d="M${ix + side * 2} ${iy - lid + 1} Q${cx} ${cy - h - creaseH - droop} ${ox} ${oy - lid + 1 + droop * 0.6}" stroke-width="${creaseW}" opacity="${creaseOp}"/>` : "";
  const hood = droop ? `<path d="M${ix} ${iy - lid - 2} Q${cx} ${cy - h - 3} ${ox + side * 3} ${oy + droop * 0.5}" opacity=".55"/>` : "";
  const bags = bag ? `<path d="M${ix} ${iy + 5} Q${cx} ${cy + h + 5} ${ox} ${oy + 5}" opacity=".5"/><path d="M${ix + side * 3} ${iy + 9} Q${cx} ${cy + h + 9} ${ox - side * 2} ${oy + 8}" opacity=".3"/>` : "";
  return `<path d="${up}"/><path d="${low}" opacity=".7"/>${cr}${hood}${bags}<circle cx="${cx}" cy="${cy - 1}" r="${iris}" fill="currentColor" stroke="none" opacity=".75"/>`;
};

const VARIANTS = {
  small: { l: { w: 22, h: 7, crease: false, iris: 4.4, inner: 1.5 }, r: { w: 22, h: 7, crease: false, iris: 4.4, inner: 1.5 } },
  balance: { l: { w: 24, h: 9, creaseH: 8 }, r: { w: 27, h: 8, creaseH: 4, tilt: -1 }, gap: 6 },
  sharp: { l: { w: 28, h: 7, tilt: 5, creaseH: 4 }, r: { w: 28, h: 7, tilt: 5, creaseH: 4 } },
  hood: { l: { w: 26, h: 7, droop: 4, creaseH: 3, tilt: -2 }, r: { w: 26, h: 7, droop: 4, creaseH: 3, tilt: -2 } },
  bag: { l: { w: 26, h: 8, bag: true }, r: { w: 26, h: 8, bag: true } },
  loose: { l: { w: 26, h: 8, creaseOp: 0.25 }, r: { w: 26, h: 8, creaseOp: 0.55, creaseH: 4 } },
  mismatch: { l: { w: 26, h: 9, creaseH: 9 }, r: { w: 26, h: 8, creaseH: 3 } },
  thick: { l: { w: 26, h: 7, creaseH: 11, creaseW: 2.4 }, r: { w: 26, h: 7, creaseH: 11, creaseW: 2.4 } },
  faded: { l: { w: 25, h: 8, creaseOp: 0.4, droop: 2 }, r: { w: 25, h: 8, creaseOp: 0.4, droop: 2 } },
  overall: { l: { w: 27, h: 8, tilt: 2, creaseH: 8 }, r: { w: 24, h: 9, tilt: -1, creaseH: 5 } },
};

export function face(kind, label) {
  const v = VARIANTS[kind];
  const g = v.gap || 0;
  return `<svg class="pick__face" viewBox="0 0 200 240" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${label}">
<path d="M100 22c-38 0-62 30-62 74 0 30 8 58 22 80 12 18 26 30 40 30s28-12 40-30c14-22 22-50 22-80 0-44-24-74-62-74z"/>
<path d="M40 88c6-34 30-58 60-58 34 0 58 26 62 60" opacity=".45"/>
<path d="M52 70c14-10 44-16 48 12M148 70c-14-10-44-16-48 12" opacity=".35"/>
<path d="M58 88q14-7 28-1M142 88q-14-7-28-1" stroke-width="1.6" opacity=".8"/>
${eye(72 - g / 2, 106, v.l)}${eye(128 + g / 2, 106, v.r)}
<path d="M100 112v26q-3 7-9 8M100 146q5 2 9 0" opacity=".7"/>
<path d="M86 170q14 8 28 0M89 170q11-5 22 0" opacity=".75"/>
</svg>`;
}
