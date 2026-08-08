-- 고객이 회원가입 없이 본인 문의를 조회/취소할 수 있도록 개인 조회 토큰을 추가한다.
-- 토큰은 추측 불가능한 UUID이며, 이 토큰을 아는 사람만 해당 문의 1건에 접근할 수 있다.
-- reservations 테이블 자체의 SELECT/UPDATE 권한은 여전히 관리자에게만 있고(RLS 유지),
-- 아래 두 함수(SECURITY DEFINER)를 통해서만 토큰 기반의 좁은 접근을 허용한다.

alter table public.reservations
  add column if not exists access_token uuid not null default gen_random_uuid();

create unique index if not exists reservations_access_token_key
  on public.reservations (access_token);

create or replace function public.get_reservation_by_token(_token uuid)
returns public.reservations
language sql
stable
security definer
set search_path = public
as $$
  select * from public.reservations where access_token = _token;
$$;

create or replace function public.cancel_reservation_by_token(_token uuid)
returns public.reservations
language plpgsql
security definer
set search_path = public
as $$
declare
  result public.reservations;
begin
  update public.reservations
  set status = 'cancelled'
  where access_token = _token
  returning * into result;

  return result;
end;
$$;

grant execute on function public.get_reservation_by_token(uuid) to anon, authenticated;
grant execute on function public.cancel_reservation_by_token(uuid) to anon, authenticated;
