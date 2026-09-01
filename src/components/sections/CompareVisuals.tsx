/**
 * "고르는 것과 설계하는 것" 비교 카드 상단에 들어가는 작은 모션 시각물.
 * 왼쪽은 완성된 시안 중 하나를 고르는 동작, 오른쪽은 화면을 다시 짜는 동작을 보여준다.
 * transform · opacity만 애니메이션하고, prefers-reduced-motion에서는 최종 상태로 멈춘다.
 */

const SHEET = (
  <style>{`
@keyframes cv-pick {
  0%, 14%   { transform: translateX(0) }
  22%, 36%  { transform: translateX(100%) }
  44%, 92%  { transform: translateX(200%) }
  100%      { transform: translateX(0) }
}
@keyframes cv-check {
  0%, 46%   { opacity: 0; transform: scale(.7) }
  54%, 90%  { opacity: 1; transform: scale(1) }
  100%      { opacity: 0; transform: scale(.7) }
}
@keyframes cv-lift {
  0%, 40%, 100% { transform: translateY(0) }
  52%, 88%      { transform: translateY(-3px) }
}
/* 완성된 상태를 오래 보여주고, 마지막 구간에서 처음 상태로 되돌아온다(끊기지 않게) */
@keyframes cv-wide  { 0%, 6% { transform: scaleX(.55) } 20%, 86% { transform: scaleX(1) } 96%, 100% { transform: scaleX(.55) } }
@keyframes cv-split { 0%, 20% { transform: scaleX(1) } 34%, 86% { transform: scaleX(.46) } 96%, 100% { transform: scaleX(1) } }
@keyframes cv-slide { 0%, 20% { opacity: 0 } 34%, 86% { opacity: 1 } 96%, 100% { opacity: 0 } }
@keyframes cv-drop  { 0%, 34% { transform: translateY(-10px); opacity: 0 } 48%, 86% { transform: none; opacity: 1 } 96%, 100% { transform: translateY(-10px); opacity: 0 } }
@keyframes cv-knob  { 0%, 100% { transform: translateX(0) } 50% { transform: translateX(14px) } }
@media (prefers-reduced-motion: reduce) {
  .cv-anim { animation: none !important }
  .cv-hide { opacity: 1 !important; transform: none !important }
}
`}</style>
);

/** 템플릿형 — 완성된 시안 셋 중 하나에 선택 테두리가 옮겨 다니다 멈춘다 */
export function TemplatePickVisual() {
  return (
    <div aria-hidden className="relative mb-5 select-none rounded-xl border border-border bg-background p-3">
      {SHEET}
      <div className="relative grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md bg-secondary/70 p-1.5">
            <div className="h-1.5 w-6 rounded-full bg-muted-foreground/30" />
            <div className="mt-1.5 h-5 rounded bg-muted-foreground/15" />
            <div className="mt-1.5 h-1 w-3/4 rounded-full bg-muted-foreground/20" />
          </div>
        ))}
        {/* 선택 테두리 */}
        <div
          className="cv-anim pointer-events-none absolute inset-y-0 left-0 w-[calc((100%-1rem)/3)] rounded-md ring-2 ring-primary"
          style={{ animation: "cv-pick 5.6s cubic-bezier(.32,.72,0,1) infinite" }}
        >
          <span
            className="cv-anim cv-hide absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground"
            style={{ animation: "cv-check 5.6s ease-out infinite" }}
          >
            ✓
          </span>
        </div>
      </div>
      <p className="mt-2.5 text-center text-[10px] font-medium tracking-wide text-muted-foreground">
        완성된 시안에서 고릅니다
      </p>
    </div>
  );
}

/** 커스텀 개발 — 빈 화면에 영역이 하나씩 놓이고 폭이 다시 짜인다 */
export function CustomBuildVisual() {
  return (
    <div aria-hidden className="relative mb-5 select-none rounded-xl border border-primary/30 bg-background p-3">
      {SHEET}
      <div className="space-y-1.5">
        {/* 헤더 영역이 좁았다가 넓어진다 */}
        <div
          className="cv-anim h-2.5 origin-left rounded bg-primary/25"
          style={{ animation: "cv-wide 5.6s cubic-bezier(.32,.72,0,1) infinite" }}
        />
        <div className="flex gap-1.5">
          {/* 본문이 갈라지며 오른쪽 패널이 생긴다 */}
          <div
            className="cv-anim h-10 flex-1 origin-left rounded bg-secondary"
            style={{ animation: "cv-split 5.6s cubic-bezier(.32,.72,0,1) infinite" }}
          />
          <div
            className="cv-anim cv-hide h-10 w-[46%] rounded border border-dashed border-primary/40 bg-primary/[0.06]"
            style={{ animation: "cv-slide 5.6s cubic-bezier(.32,.72,0,1) infinite" }}
          />
        </div>
        {/* 나중에 얹히는 기능 블록 */}
        <div
          className="cv-anim cv-hide flex items-center gap-1.5 rounded bg-secondary/70 px-1.5 py-1"
          style={{ animation: "cv-drop 5.6s cubic-bezier(.32,.72,0,1) infinite" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
          <span className="h-1.5 w-10 rounded-full bg-muted-foreground/25" />
          {/* 설정 토글 */}
          <span className="relative ml-auto inline-flex h-2.5 w-6 items-center rounded-full bg-muted-foreground/20">
            <span
              className="cv-anim absolute left-0.5 h-1.5 w-1.5 rounded-full bg-primary"
              style={{ animation: "cv-knob 5.6s ease-in-out infinite" }}
            />
          </span>
        </div>
      </div>
      <p className="mt-2.5 text-center text-[10px] font-medium tracking-wide text-primary">
        화면을 새로 짭니다
      </p>
    </div>
  );
}
