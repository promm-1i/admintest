-- 0001_init.sql 실행 후 발생한 403(권한 없음) 문제 수정 + 관리자 권한 재부여
-- RLS 정책은 "어떤 행을 볼 수 있는지"만 제어하며, 테이블 자체에 대한 접근은
-- anon/authenticated 역할에 별도로 GRANT 해야 합니다. 0001에서 이 부분이 빠졌습니다.

grant usage on schema public to anon, authenticated;

grant select, insert, update, delete on public.notices to anon, authenticated;
grant select, insert, update, delete on public.reservations to anon, authenticated;
grant select on public.user_roles to authenticated;

-- 관리자 권한 부여 (계정 생성 이후 다시 실행)
insert into public.user_roles (user_id, role)
select id, 'admin'
from auth.users
where email = 'gpdlaos88@gmail.com'
on conflict (user_id, role) do nothing;
