-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query)

create table if not exists peer_assessments (
  id uuid primary key default gen_random_uuid(),
  peer_id text not null,
  owner_session_id text not null,
  answers jsonb not null default '{}'::jsonb,
  question_order jsonb not null default '[]'::jsonb,
  current_index int not null default 0,
  round_completed int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (peer_id, owner_session_id)
);

create index if not exists peer_assessments_owner_idx on peer_assessments (owner_session_id);

alter table peer_assessments enable row level security;

-- Anonymous peers need to insert/update their own row and the owner needs to
-- read aggregate results. This mirrors the open policy already used by
-- user_sessions so the anon key can read/write directly from the client.
create policy "peer_assessments_insert" on peer_assessments
  for insert to anon with check (true);

create policy "peer_assessments_update" on peer_assessments
  for update to anon using (true) with check (true);

create policy "peer_assessments_select" on peer_assessments
  for select to anon using (true);
