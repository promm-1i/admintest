import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  createNotice,
  deleteNotice,
  listAllNotices,
  updateNotice,
  uploadNoticeImage,
  NOTICE_CATEGORIES,
  type Notice,
} from "@/lib/api/notices";

type Draft = {
  title: string;
  content: string;
  image_url: string | null;
  category: string | null;
  is_pinned: boolean;
  published: boolean;
};

const EMPTY: Draft = {
  title: "",
  content: "",
  image_url: null,
  category: null,
  is_pinned: false,
  published: true,
};

export function NoticeManager() {
  const qc = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [uploading, setUploading] = useState(false);

  const { data: notices, isLoading } = useQuery({
    queryKey: ["notices", "all"],
    queryFn: listAllNotices,
  });

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ["notices"] });
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!draft.title.trim()) throw new Error("제목을 입력해 주세요.");
      if (editingId) return updateNotice(editingId, draft);
      return createNotice(draft);
    },
    onSuccess: () => {
      reset();
      invalidate();
      toast.success("저장되었습니다.");
    },
    onError: (e: Error) => toast.error(e.message || "저장에 실패했습니다."),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNotice,
    onSuccess: () => {
      invalidate();
      toast.success("삭제되었습니다.");
    },
    onError: () => toast.error("삭제에 실패했습니다."),
  });

  const reset = () => {
    setEditingId(null);
    setDraft(EMPTY);
  };

  const startEdit = (notice: Notice) => {
    setEditingId(notice.id);
    setDraft({
      title: notice.title,
      content: notice.content,
      image_url: notice.image_url,
      category: notice.category,
      is_pinned: notice.is_pinned,
      published: notice.published,
    });
  };

  const onUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const path = await uploadNoticeImage(file);
      setDraft((prev) => ({ ...prev, image_url: path }));
      toast.success("이미지가 업로드되었습니다.");
    } catch {
      toast.error("이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">{editingId ? "공지 수정" : "공지 작성"}</h2>

        <div className="mt-5 space-y-4">
          <div className="space-y-2">
            <Label>제목</Label>
            <Input
              value={draft.title}
              maxLength={120}
              onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label>카테고리</Label>
            <Select
              value={draft.category ?? ""}
              onValueChange={(v) => setDraft((p) => ({ ...p, category: v || null }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="선택 안 함" />
              </SelectTrigger>
              <SelectContent>
                {NOTICE_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>내용</Label>
            <Textarea
              rows={8}
              value={draft.content}
              onChange={(e) => setDraft((p) => ({ ...p, content: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label>이미지</Label>
            <Input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => void onUpload(e.target.files?.[0])}
            />
            {draft.image_url && (
              <p className="text-xs text-muted-foreground">첨부됨: {draft.image_url}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="is_pinned">상단 고정</Label>
            <Switch
              id="is_pinned"
              checked={draft.is_pinned}
              onCheckedChange={(v) => setDraft((p) => ({ ...p, is_pinned: v }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="published">노출</Label>
            <Switch
              id="published"
              checked={draft.published}
              onCheckedChange={(v) => setDraft((p) => ({ ...p, published: v }))}
            />
          </div>
          <div className="flex gap-2">
            <Button
              className="flex-1"
              disabled={saveMutation.isPending}
              onClick={() => saveMutation.mutate()}
            >
              {editingId ? "수정 저장" : "등록"}
            </Button>
            {editingId && (
              <Button variant="outline" onClick={reset}>
                취소
              </Button>
            )}
          </div>
        </div>
      </section>

      <section>
        {isLoading && <p className="text-sm text-muted-foreground">불러오는 중…</p>}
        <ul className="divide-y divide-border rounded-lg border border-border bg-card">
          {(notices ?? []).map((notice) => (
            <li key={notice.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {notice.is_pinned && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      고정
                    </span>
                  )}
                  {notice.category && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                      {notice.category}
                    </span>
                  )}
                  <p className="truncate font-medium">{notice.title}</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(notice.created_at).toLocaleString("ko-KR")} ·{" "}
                  {notice.published ? "노출" : "비노출"}
                </p>
              </div>
              <Button size="sm" variant="outline" onClick={() => startEdit(notice)}>
                수정
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  if (confirm("이 공지사항을 삭제할까요?")) deleteMutation.mutate(notice.id);
                }}
              >
                삭제
              </Button>
            </li>
          ))}
          {!isLoading && (notices ?? []).length === 0 && (
            <li className="px-5 py-10 text-center text-sm text-muted-foreground">
              등록된 공지사항이 없습니다.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
