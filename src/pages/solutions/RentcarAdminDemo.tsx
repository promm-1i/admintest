import { useState, type ReactNode } from "react";
import { Menu, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MENU, FLAT_MENU } from "./rentcar-admin/menu";
import {
  DashboardView,
  VehicleListView,
  VehicleRegisterView,
  InquiryView,
  ReservationView,
  NoticeView,
  StaffView,
} from "./rentcar-admin/views/Views";

export function RentcarAdminDemo() {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(["vehicle"]));
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const selectItem = (key: string) => {
    setActiveKey(key);
    setMobileNavOpen(false);
  };

  const activeItem = FLAT_MENU.find((m) => m.key === activeKey) ?? FLAT_MENU[0];

  const renderNav = () => (
    <nav className="space-y-1 p-3">
      {MENU.map((item) => {
        const Icon = item.icon;
        if (item.children) {
          const isOpen = openGroups.has(item.key);
          return (
            <div key={item.key}>
              <button
                type="button"
                onClick={() => toggleGroup(item.key)}
                className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {item.label}
                </span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen && (
                <div className="ml-4 mt-0.5 space-y-0.5 border-l border-border pl-3">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    return (
                      <button
                        key={child.key}
                        type="button"
                        onClick={() => selectItem(child.key)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-left text-xs font-medium transition-colors",
                          activeKey === child.key
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        )}
                      >
                        <ChildIcon className="h-3.5 w-3.5 shrink-0" />
                        <span className="min-w-0 flex-1 truncate">{child.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => selectItem(item.key)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
              activeKey === item.key ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  let content: ReactNode;
  switch (activeKey) {
    case "dashboard":
      content = <DashboardView />;
      break;
    case "vehicle-list":
      content = <VehicleListView onNavigate={selectItem} />;
      break;
    case "vehicle-register":
      content = <VehicleRegisterView onNavigate={selectItem} />;
      break;
    case "inquiry":
      content = <InquiryView />;
      break;
    case "reservation":
      content = <ReservationView />;
      break;
    case "notice":
      content = <NoticeView />;
      break;
    case "staff":
      content = <StaffView />;
      break;
    default:
      content = null;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="hidden shrink-0 border-r border-border bg-card lg:sticky lg:top-[67px] lg:block lg:h-[calc(100vh-67px)] lg:w-64 lg:overflow-y-auto">
        {renderNav()}
      </aside>

      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="flex items-center gap-1.5 text-sm font-medium text-foreground"
        >
          <Menu className="h-4 w-4" />
          {activeItem.label}
        </button>
      </div>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileNavOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm font-semibold text-foreground">관리자 메뉴</span>
              <button type="button" onClick={() => setMobileNavOpen(false)} aria-label="메뉴 닫기">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            {renderNav()}
          </div>
        </div>
      )}

      <main className="min-w-0 flex-1 p-5 sm:p-6">{content}</main>
    </div>
  );
}
