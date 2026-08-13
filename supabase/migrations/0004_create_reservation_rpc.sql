-- 버그 수정: INSERT ... RETURNING은 RLS의 SELECT 정책도 함께 통과해야 하는데,
-- reservations는 SELECT가 관리자 전용이라 익명 사용자의 문의 등록이
-- "new row violates row-level security policy" 오류로 항상 실패하고 있었다.
-- (INSERT 정책 자체는 통과하지만, access_token을 돌려받는 RETURNING 단계에서 막힘)
--
-- 기존 access_token 조회/취소 함수와 동일하게 SECURITY DEFINER RPC로 우회한다:
-- 이 함수는 RLS를 무시하고 실행되며, 클라이언트에는 access_token만 돌려준다.

create or replace function public.create_reservation(
  _name text,
  _phone text,
  _email text,
  _service text,
  _preferred_at timestamptz,
  _message text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  result_token uuid;
begin
  insert into public.reservations (name, phone, email, service, preferred_at, message)
  values (_name, _phone, _email, _service, _preferred_at, _message)
  returning access_token into result_token;

  return result_token;
end;
$$;

grant execute on function public.create_reservation(text, text, text, text, timestamptz, text) to anon, authenticated;
