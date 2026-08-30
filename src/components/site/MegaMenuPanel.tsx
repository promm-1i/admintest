import { Link } from "react-router-dom";
import type { NavDropdownEntry } from "./navData";

type Props = {
  entries: NavDropdownEntry[];
  onNavigate: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

/**
 * 헤더의 드롭다운 카테고리(홈페이지 제작 / 맞춤형 서비스 / 고객센터)를
 * 하나씩 따로 펼치지 않고, 전체를 한 번에 보여주는 통합 메가메뉴 패널.
 */
export function MegaMenuPanel({ entries, onNavigate, onMouseEnter, onMouseLeave }: Props) {
  return (
    <div
      role="region"
      aria-label="전체 메뉴"
      className="absolute inset-x-0 top-full z-50 bg-neutral-950 shadow-xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-16 gap-y-9 px-4 py-12 sm:px-6 lg:px-10">
        {entries.map((entry) => (
          <div key={entry.key} role="group" aria-label={entry.label}>
            <ul className="space-y-3.5">
              {entry.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={onNavigate}
                    className="block whitespace-nowrap text-base text-neutral-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
