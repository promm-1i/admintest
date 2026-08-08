-- MintCL 초기 스키마: user_roles, notices(category/is_pinned 포함), reservations
-- Supabase 대시보드 SQL Editor에서 한 번 실행하세요.

create extension if not exists "pgcrypto";

create type public.app_role as enum ('admin', 'user');
create type public.reservation_status as enum ('received', 'reviewing', 'confirmed', 'cancelled');

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- user_roles ---------------------------------------------------------------

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can view their own roles"
  on public.user_roles for select
  using (auth.uid() = user_id);

create policy "Admins can view all roles"
  on public.user_roles for select
  using (public.has_role(auth.uid(), 'admin'));

-- notices --------------------------------------------------------------------

create table public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null default '',
  image_url text,
  category text,
  is_pinned boolean not null default false,
  published boolean not null default true,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.notices enable row level security;

create trigger notices_set_updated_at
  before update on public.notices
  for each row execute function public.update_updated_at_column();

create policy "Published notices are viewable by everyone"
  on public.notices for select
  using (published = true or public.has_role(auth.uid(), 'admin'));

create policy "Admins can insert notices"
  on public.notices for insert
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update notices"
  on public.notices for update
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete notices"
  on public.notices for delete
  using (public.has_role(auth.uid(), 'admin'));

-- reservations (제작 문의) ----------------------------------------------------

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  service text,
  preferred_at timestamptz,
  message text,
  status public.reservation_status not null default 'received',
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.reservations enable row level security;

create trigger reservations_set_updated_at
  before update on public.reservations
  for each row execute function public.update_updated_at_column();

create policy "Anyone can submit a reservation"
  on public.reservations for insert
  with check (true);

create policy "Admins can view reservations"
  on public.reservations for select
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update reservations"
  on public.reservations for update
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete reservations"
  on public.reservations for delete
  using (public.has_role(auth.uid(), 'admin'));

-- storage: notice-images -----------------------------------------------------

insert into storage.buckets (id, name, public)
values ('notice-images', 'notice-images', false)
on conflict (id) do nothing;

create policy "Notice images are viewable by everyone"
  on storage.objects for select
  using (bucket_id = 'notice-images');

create policy "Admins can upload notice images"
  on storage.objects for insert
  with check (bucket_id = 'notice-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can update notice images"
  on storage.objects for update
  using (bucket_id = 'notice-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete notice images"
  on storage.objects for delete
  using (bucket_id = 'notice-images' and public.has_role(auth.uid(), 'admin'));

-- 관리자 계정 부여 -------------------------------------------------------------
-- 1) 먼저 Authentication > Users > Add user 에서 이메일/비밀번호로 계정을 만드세요.
-- 2) 그 다음 아래 UPDATE의 이메일을 실제 계정 이메일로 바꿔서 실행하세요.

insert into public.user_roles (user_id, role)
select id, 'admin'
from auth.users
where email = 'gpdlaos88@gmail.com'
on conflict (user_id, role) do nothing;
