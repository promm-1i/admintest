import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import {
  Search,
  MapPin,
  Settings,
  Plus,
  Trash2,
  Check,
  LayoutDashboard,
  Building2,
  Compass,
  Users,
  Home,
  CalendarDays,
  Landmark,
  Mail,
  ShieldCheck,
  TrendingUp,
  Wallet,
  FileSignature,
  Newspaper,
  MoreHorizontal,
  Palette,
  Phone,
  Handshake,
  Sparkles,
  Bot,
  Menu,
  ChevronDown,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const PROPERTY_TYPES = ["아파트", "오피스텔", "원룸", "단독주택"];

type Listing = { id: number; title: string; region: string; type: string; price: string };
const INITIAL_LISTINGS: Listing[] = [
  { id: 1, title: "역세권 신축 아파트", region: "서울 강남구 대치동", type: "아파트", price: "매 9억" },
  { id: 2, title: "깨끗한 리모델링 오피스텔", region: "서울 마포구 합정동", type: "오피스텔", price: "전 3억" },
  { id: 3, title: "채광 좋은 원룸", region: "서울 광진구 능동", type: "원룸", price: "보 3천 / 월 50" },
  { id: 4, title: "마당 있는 단독주택", region: "경기 성남시 분당구", type: "단독주택", price: "매 12억" },
];
const EMPTY_LISTING_FORM = { title: "", region: "", type: PROPERTY_TYPES[0], price: "" };

type Inquiry = { id: number; name: string; phone: string; content: string; status: "상담중" | "완료" };
const INITIAL_INQUIRIES: Inquiry[] = [
  { id: 1, name: "김민수", phone: "010-****-1234", content: "대치동 아파트 매매 문의드립니다.", status: "상담중" },
  { id: 2, name: "이지은", phone: "010-****-5678", content: "합정동 오피스텔 전세 가능한가요?", status: "완료" },
  { id: 3, name: "박준영", phone: "010-****-9012", content: "능동 원룸 매물 더 있나요?", status: "상담중" },
];

type Schedule = { id: number; date: string; title: string; customer: string; done: boolean };
const INITIAL_SCHEDULES: Schedule[] = [
  { id: 1, date: "2026-09-02", title: "대치동 아파트 임장", customer: "김민수", done: false },
  { id: 2, date: "2026-09-03", title: "합정동 오피스텔 계약", customer: "이지은", done: false },
  { id: 3, date: "2026-08-27", title: "능동 원룸 안내", customer: "박준영", done: true },
];

type Staff = { id: number; name: string; role: "관리자" | "직원" };
const INITIAL_STAFF: Staff[] = [
  { id: 1, name: "설재성", role: "관리자" },
  { id: 2, name: "김공인", role: "직원" },
  { id: 3, name: "박대리", role: "직원" },
];

type Notice = { id: number; title: string; published: boolean };
const INITIAL_NOTICES: Notice[] = [
  { id: 1, title: "추석 연휴 임시 휴무 안내", published: true },
  { id: 2, title: "신규 매물 등록 이벤트", published: true },
  { id: 3, title: "시스템 점검 안내 (작성중)", published: false },
];

type ActivityLog = { id: number; time: string; action: string; target: string };

type MenuLeaf = { key: string; label: string; icon: LucideIcon; ready: boolean };
type MenuItem = MenuLeaf & { children?: MenuLeaf[] };

const MENU: MenuItem[] = [
  { key: "dashboard", label: "대시보드", icon: LayoutDashboard, ready: true },
  {
    key: "property",
    label: "매물 관리",
    icon: Building2,
    ready: true,
    children: [
      { key: "property-list", label: "매물 목록", icon: Building2, ready: true },
      { key: "property-register", label: "매물 등록", icon: Plus, ready: true },
      { key: "property-map", label: "지도", icon: MapPin, ready: true },
    ],
  },
  { key: "field-visit", label: "임장 관리", icon: Compass, ready: false },
  { key: "customer-inquiry", label: "고객·문의 관리", icon: Users, ready: true },
  { key: "home-request", label: "내 집 요청 관리", icon: Home, ready: false },
  { key: "schedule", label: "일정 관리", icon: CalendarDays, ready: true },
  { key: "data-search", label: "데이터 검색", icon: Search, ready: false },
  { key: "realestate-info", label: "부동산 정보", icon: Landmark, ready: false },
  { key: "memo", label: "쪽지 / 문의", icon: Mail, ready: false },
  {
    key: "staff",
    label: "관리자 / 직원 관리",
    icon: ShieldCheck,
    ready: true,
    children: [
      { key: "staff-role", label: "직원 권한", icon: ShieldCheck, ready: true },
      { key: "group-permission", label: "그룹별 권한 설정", icon: ShieldCheck, ready: false },
    ],
  },
  { key: "deal-case", label: "매매사례 관리", icon: TrendingUp, ready: false },
  { key: "payment-payroll", label: "입금 및 급여관리", icon: Wallet, ready: false },
  { key: "provisional-contract", label: "가계약 / 입실퇴거 관리", icon: FileSignature, ready: false },
  { key: "board", label: "게시판 관리", icon: Newspaper, ready: true },
  { key: "etc", label: "기타 기능", icon: MoreHorizontal, ready: false },
  {
    key: "site-settings",
    label: "홈페이지 설정",
    icon: Palette,
    ready: false,
    children: [
      { key: "site-screen", label: "화면 설정", icon: Palette, ready: false },
      { key: "site-advanced", label: "고급 설정", icon: Settings, ready: false },
      { key: "ai-settings", label: "AI 고급 설정", icon: Sparkles, ready: false },
    ],
  },
  { key: "zerocall", label: "제로콜 설정", icon: Phone, ready: false },
  { key: "partners", label: "제휴 업체", icon: Handshake, ready: false },
  { key: "ai-search", label: "AI 매물 탐색", icon: Sparkles, ready: false },
  { key: "chatbot", label: "매물 챗봇", icon: Bot, ready: false },
];

const FLAT_MENU: MenuLeaf[] = MENU.flatMap((item) => item.children ?? [item]);

function DashboardPanel({
  listings,
  inquiries,
  schedules,
  activityLog,
}: {
  listings: Listing[];
  inquiries: Inquiry[];
  schedules: Schedule[];
  activityLog: ActivityLog[];
}) {
  const stats = [
    { label: "전체 매물", value: listings.length, icon: Building2 },
    { label: "상담중 문의", value: inquiries.filter((i) => i.status === "상담중").length, icon: Users },
    { label: "예정 일정", value: schedules.filter((s) => !s.done).length, icon: CalendarDays },
    { label: "완료 일정", value: schedules.filter((s) => s.done).length, icon: Check },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground">대시보드</h2>
      <p className="mt-1 text-sm text-muted-foreground break-keep">
        매물·문의·일정 현황을 한눈에 확인합니다. 아래 숫자는 이 데모에서 실제로 조작한 데이터를
        기준으로 계산됩니다.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon className="h-3.5 w-3.5" />
                {s.label}
              </div>
              <p className="mt-2 text-2xl font-semibold text-foreground">{s.value}</p>
            </div>
          );
        })}
      </div>

      <h3 className="mt-8 text-sm font-semibold text-foreground">최근 작업 내역</h3>
      <div className="mt-3 space-y-2">
        {activityLog.length === 0 && (
          <p className="rounded-lg border border-dashed border-border bg-secondary/30 p-6 text-center text-xs text-muted-foreground break-keep">
            아직 작업 내역이 없습니다. 왼쪽 메뉴에서 매물을 등록하거나 상태를 변경해보면 여기에
            기록됩니다.
          </p>
        )}
        {activityLog.map((log) => (
          <div
            key={log.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 px-3 py-2 text-xs"
          >
            <span className="shrink-0 text-muted-foreground">{log.time}</span>
            <span className="shrink-0 font-medium text-foreground">{log.action}</span>
            <span className="min-w-0 flex-1 truncate text-muted-foreground">{log.target}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComingSoonPanel({ item }: { item: MenuLeaf }) {
  const Icon = item.icon;
  return (
    <div className="flex h-72 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-secondary/20 text-center">
      <Icon className="h-8 w-8 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium text-foreground">{item.label} — 데모 준비 중입니다</p>
        <p className="mt-1 max-w-sm text-xs text-muted-foreground break-keep">
          실제 구축 시 이 메뉴도 필요한 범위에 맞춰 실제 데이터와 연결하여 개발됩니다.
        </p>
      </div>
    </div>
  );
}

export function RealEstateAdminDemo() {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(["property"]));
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [listingForm, setListingForm] = useState(EMPTY_LISTING_FORM);

  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [schedules, setSchedules] = useState<Schedule[]>(INITIAL_SCHEDULES);
  const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF);

  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [noticeDraft, setNoticeDraft] = useState("");

  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);

  const logActivity = (action: string, target: string) => {
    setActivityLog((prev) =>
      [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
          action,
          target,
        },
        ...prev,
      ].slice(0, 15),
    );
  };

  const filteredListings = listings.filter((l) => {
    const matchesType = typeFilter === "전체" || l.type === typeFilter;
    const matchesQuery =
      query.trim() === "" || l.title.includes(query) || l.region.includes(query);
    return matchesType && matchesQuery;
  });

  const handleDeleteListing = (id: number) => {
    const target = listings.find((l) => l.id === id);
    setListings((prev) => prev.filter((l) => l.id !== id));
    toast.success("매물이 삭제되었습니다.");
    if (target) logActivity("매물 삭제", target.title);
  };

  const handleRegisterListing = (e: FormEvent) => {
    e.preventDefault();
    if (!listingForm.title.trim() || !listingForm.region.trim() || !listingForm.price.trim()) {
      toast.error("모든 항목을 입력해 주세요.");
      return;
    }
    setListings((prev) => [{ id: Date.now(), ...listingForm }, ...prev]);
    toast.success("매물이 등록되었습니다.");
    logActivity("매물 등록", listingForm.title);
    setListingForm(EMPTY_LISTING_FORM);
    setActiveKey("property-list");
  };

  const toggleInquiryStatus = (id: number) => {
    const target = inquiries.find((i) => i.id === id);
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: i.status === "상담중" ? "완료" : "상담중" } : i)),
    );
    toast.success("상담 상태가 변경되었습니다.");
    if (target) logActivity("문의 상태 변경", target.name);
  };

  const toggleScheduleDone = (id: number) => {
    const target = schedules.find((s) => s.id === id);
    setSchedules((prev) => prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
    if (target) logActivity(target.done ? "일정 완료 취소" : "일정 완료 처리", target.title);
  };

  const changeStaffRole = (id: number, role: string) => {
    const target = staff.find((s) => s.id === id);
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, role: role as Staff["role"] } : s)));
    toast.success("권한이 변경되었습니다.");
    if (target) logActivity("직원 권한 변경", `${target.name} → ${role}`);
  };

  const toggleNoticePublished = (id: number) => {
    const target = notices.find((n) => n.id === id);
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, published: !n.published } : n)));
    if (target) logActivity(target.published ? "공지 비공개 전환" : "공지 게시", target.title);
  };

  const addNotice = (e: FormEvent) => {
    e.preventDefault();
    if (!noticeDraft.trim()) return;
    setNotices((prev) => [{ id: Date.now(), title: noticeDraft.trim(), published: true }, ...prev]);
    toast.success("공지사항이 등록되었습니다.");
    logActivity("공지 등록", noticeDraft.trim());
    setNoticeDraft("");
  };

  const handleMapClick = () => {
    toast("데모 페이지입니다", {
      description: "실제 서비스에서는 지도 API가 연동되어 매물 위치가 표시됩니다.",
    });
  };

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
                        {!child.ready && (
                          <span className="shrink-0 rounded bg-secondary px-1.5 py-0.5 text-[9px] font-normal text-muted-foreground">
                            준비중
                          </span>
                        )}
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
              activeKey === item.key
                ? "bg-primary/10 text-primary"
                : "text-foreground hover:bg-secondary",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            {!item.ready && (
              <span className="shrink-0 rounded bg-secondary px-1.5 py-0.5 text-[9px] font-normal text-muted-foreground">
                준비중
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );

  let content: ReactNode;
  switch (activeKey) {
    case "dashboard":
      content = (
        <DashboardPanel
          listings={listings}
          inquiries={inquiries}
          schedules={schedules}
          activityLog={activityLog}
        />
      );
      break;
    case "property-list":
      content = (
        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="매물명 또는 지역으로 검색"
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["전체", ...PROPERTY_TYPES].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypeFilter(t)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    typeFilter === t
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {filteredListings.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                조건에 맞는 매물이 없습니다.
              </p>
            )}
            {filteredListings.map((l) => (
              <div
                key={l.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/30 p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{l.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {l.region} · {l.type} · {l.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteListing(l.id)}
                  className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  aria-label={`${l.title} 삭제`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
      break;
    case "property-register":
      content = (
        <form onSubmit={handleRegisterListing} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">매물명</label>
            <Input
              className="mt-1.5"
              value={listingForm.title}
              onChange={(e) => setListingForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="예: 역세권 신축 아파트"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">지역</label>
            <Input
              className="mt-1.5"
              value={listingForm.region}
              onChange={(e) => setListingForm((f) => ({ ...f, region: e.target.value }))}
              placeholder="예: 서울 강남구 대치동"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">매물 종류</label>
            <Select
              value={listingForm.type}
              onValueChange={(v) => setListingForm((f) => ({ ...f, type: v }))}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">가격</label>
            <Input
              className="mt-1.5"
              value={listingForm.price}
              onChange={(e) => setListingForm((f) => ({ ...f, price: e.target.value }))}
              placeholder="예: 매 9억, 전 3억, 보 3천 / 월 50"
            />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="gap-1.5 font-bold">
              <Plus className="h-3.5 w-3.5" />
              매물 등록하기
            </Button>
          </div>
        </form>
      );
      break;
    case "property-map":
      content = (
        <button
          type="button"
          onClick={handleMapClick}
          className="flex h-64 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-secondary/30 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <MapPin className="h-8 w-8" />
          <span className="text-sm">지도에서 매물 위치 보기</span>
        </button>
      );
      break;
    case "customer-inquiry":
      content = (
        <div className="space-y-2">
          {inquiries.map((i) => (
            <div
              key={i.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-border bg-secondary/30 p-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {i.name} <span className="font-normal text-muted-foreground">· {i.phone}</span>
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground break-keep">
                  {i.content}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleInquiryStatus(i.id)}
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                  i.status === "완료"
                    ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20",
                )}
              >
                {i.status}
              </button>
            </div>
          ))}
        </div>
      );
      break;
    case "schedule":
      content = (
        <div className="space-y-2">
          {schedules.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"
            >
              <button
                type="button"
                onClick={() => toggleScheduleDone(s.id)}
                aria-label={s.done ? "완료 취소" : "완료 처리"}
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                  s.done
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-transparent",
                )}
              >
                <Check className="h-3 w-3" />
              </button>
              <div className="min-w-0">
                <p
                  className={cn(
                    "truncate text-sm font-medium",
                    s.done ? "text-muted-foreground line-through" : "text-foreground",
                  )}
                >
                  {s.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {s.date} · {s.customer}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
      break;
    case "staff-role":
      content = (
        <div className="space-y-2">
          {staff.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/30 p-3"
            >
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <Select value={s.role} onValueChange={(v) => changeStaffRole(s.id, v)}>
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="관리자">관리자</SelectItem>
                  <SelectItem value="직원">직원</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      );
      break;
    case "board":
      content = (
        <div>
          <form onSubmit={addNotice} className="flex gap-2">
            <Input
              value={noticeDraft}
              onChange={(e) => setNoticeDraft(e.target.value)}
              placeholder="새 공지사항 제목"
              className="flex-1"
            />
            <Button type="submit" size="sm" className="shrink-0 gap-1.5 font-bold">
              <Plus className="h-3.5 w-3.5" />
              등록
            </Button>
          </form>
          <div className="mt-4 space-y-2">
            {notices.map((n) => (
              <div
                key={n.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/30 p-3"
              >
                <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                <button
                  type="button"
                  onClick={() => toggleNoticePublished(n.id)}
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                    n.published
                      ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/70",
                  )}
                >
                  {n.published ? "게시중" : "비공개"}
                </button>
              </div>
            ))}
          </div>
        </div>
      );
      break;
    default:
      content = <ComingSoonPanel item={activeItem} />;
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
