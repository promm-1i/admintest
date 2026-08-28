import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  Search,
  MapPin,
  Settings,
  Plus,
  Trash2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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

export function RealEstateAdminDemo() {
  const [tab, setTab] = useState("list");

  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [listingForm, setListingForm] = useState(EMPTY_LISTING_FORM);

  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [schedules, setSchedules] = useState<Schedule[]>(INITIAL_SCHEDULES);
  const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF);

  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [noticeDraft, setNoticeDraft] = useState("");

  const filteredListings = listings.filter((l) => {
    const matchesType = typeFilter === "전체" || l.type === typeFilter;
    const matchesQuery =
      query.trim() === "" || l.title.includes(query) || l.region.includes(query);
    return matchesType && matchesQuery;
  });

  const handleDeleteListing = (id: number) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    toast.success("매물이 삭제되었습니다.");
  };

  const handleRegisterListing = (e: FormEvent) => {
    e.preventDefault();
    if (!listingForm.title.trim() || !listingForm.region.trim() || !listingForm.price.trim()) {
      toast.error("모든 항목을 입력해 주세요.");
      return;
    }
    setListings((prev) => [{ id: Date.now(), ...listingForm }, ...prev]);
    toast.success("매물이 등록되었습니다.");
    setListingForm(EMPTY_LISTING_FORM);
    setTab("list");
  };

  const toggleInquiryStatus = (id: number) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: i.status === "상담중" ? "완료" : "상담중" } : i)),
    );
    toast.success("상담 상태가 변경되었습니다.");
  };

  const toggleScheduleDone = (id: number) => {
    setSchedules((prev) => prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
  };

  const changeStaffRole = (id: number, role: string) => {
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, role: role as Staff["role"] } : s)));
    toast.success("권한이 변경되었습니다.");
  };

  const toggleNoticePublished = (id: number) => {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, published: !n.published } : n)));
  };

  const addNotice = (e: FormEvent) => {
    e.preventDefault();
    if (!noticeDraft.trim()) return;
    setNotices((prev) => [{ id: Date.now(), title: noticeDraft.trim(), published: true }, ...prev]);
    setNoticeDraft("");
    toast.success("공지사항이 등록되었습니다.");
  };

  const handleMapClick = () => {
    toast("데모 페이지입니다", {
      description: "실제 서비스에서는 지도 API가 연동되어 매물 위치가 표시됩니다.",
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-end border-b border-border bg-secondary/50 px-4 py-3">
        <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-background px-3 py-1 text-[11px] font-mono text-muted-foreground">
          <Settings className="h-3 w-3 text-primary" />
          부동산 관리자 모드 (데모)
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="h-auto flex-wrap justify-start gap-1">
            <TabsTrigger value="list">매물 목록</TabsTrigger>
            <TabsTrigger value="register">매물 등록</TabsTrigger>
            <TabsTrigger value="inquiries">고객·문의</TabsTrigger>
            <TabsTrigger value="schedule">일정 관리</TabsTrigger>
            <TabsTrigger value="staff">직원 권한</TabsTrigger>
            <TabsTrigger value="notices">게시판</TabsTrigger>
            <TabsTrigger value="map">지도</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
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
          </TabsContent>

          <TabsContent value="register">
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
          </TabsContent>

          <TabsContent value="inquiries">
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
          </TabsContent>

          <TabsContent value="schedule">
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
          </TabsContent>

          <TabsContent value="staff">
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
          </TabsContent>

          <TabsContent value="notices">
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
          </TabsContent>

          <TabsContent value="map">
            <button
              type="button"
              onClick={handleMapClick}
              className="flex h-64 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-secondary/30 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <MapPin className="h-8 w-8" />
              <span className="text-sm">지도에서 매물 위치 보기</span>
            </button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
