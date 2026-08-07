import { usePageTitle } from "@/hooks/usePageTitle";

const TRUST_POINTS = [
  { k: "직접 소통", v: "제작 담당자와 직접 상담하며 진행 상황을 바로 확인할 수 있습니다." },
  { k: "실제 문의로 이어지는 구조", v: "복잡한 기능보다 방문객이 실제로 문의하게 만드는 구조를 우선합니다." },
  { k: "제작 후 관리", v: "배포 이후에도 문구 수정, 기능 추가 등 유지보수를 요청하실 수 있습니다." },
];

export default function About() {
  usePageTitle(
    "민트클 소개 — MINTCL",
    "민트클의 홈페이지 제작 철학과 신뢰 요소를 소개합니다.",
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-semibold">민트클 소개</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        민트클은 소상공인과 1인기업을 위한 홈페이지 제작 스튜디오입니다. 블로그만 운영 중이거나
        기존 홈페이지가 오래된 업체에 적합하며, 업종에 맞는 구성으로 상담부터 배포까지 함께
        진행합니다.
      </p>

      <div className="mt-10 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          홈페이지를 만들 때 가장 중요한 건 화려한 디자인이 아니라, 필요한 정보가 명확히 전달되고
          문의로 이어지는 구조라고 생각합니다. 그래서 매번 업종과 목적에 맞는 구성을 먼저
          고민합니다.
        </p>
        <p>
          제작 과정에서 어려운 용어나 불필요한 절차 없이, 상담 단계에서부터 예상 구성과 비용을
          투명하게 안내해 드립니다.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {TRUST_POINTS.map((item) => (
          <div key={item.k} className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm font-medium">{item.k}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
