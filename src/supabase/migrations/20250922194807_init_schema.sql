-- Tables
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  term text,
  created_at timestamptz default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text,
  attributes jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

create table if not exists public.group_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade
);

-- RLS
alter table public.courses enable row level security;
alter table public.students enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;

-- Policies (owner-based access)
create policy "owner can read courses"
on public.courses for select
using (owner_id = auth.uid());

create policy "owner can insert courses"
on public.courses for insert
with check (owner_id = auth.uid());

create policy "owner can update courses"
on public.courses for update
using (owner_id = auth.uid());

create policy "owner can delete courses"
on public.courses for delete
using (owner_id = auth.uid());

create policy "owner can read students"
on public.students for select
using (
  exists (
    select 1 from public.courses c
    where c.id = students.course_id and c.owner_id = auth.uid()
  )
);

create policy "owner can write students"
on public.students for all
using (
  exists (
    select 1 from public.courses c
    where c.id = students.course_id and c.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.courses c
    where c.id = students.course_id and c.owner_id = auth.uid()
  )
);

create policy "owner read groups"
on public.groups for select
using (
  exists (
    select 1 from public.courses c
    where c.id = groups.course_id and c.owner_id = auth.uid()
  )
);

create policy "owner write groups"
on public.groups for all
using (
  exists (
    select 1 from public.courses c
    where c.id = groups.course_id and c.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.courses c
    where c.id = groups.course_id and c.owner_id = auth.uid()
  )
);

create policy "owner read members"
on public.group_members for select
using (
  exists (
    select 1 from public.groups g
    join public.courses c on c.id = g.course_id
    where g.id = group_members.group_id and c.owner_id = auth.uid()
  )
);

create policy "owner write members"
on public.group_members for all
using (
  exists (
    select 1 from public.groups g
    join public.courses c on c.id = g.course_id
    where g.id = group_members.group_id and c.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.groups g
    join public.courses c on c.id = g.course_id
    where g.id = group_members.group_id and c.owner_id = auth.uid()
  )
);
