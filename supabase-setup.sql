-- הרץ פעם אחת ב-Supabase: SQL Editor -> New query -> הדבק -> Run
-- יוצר טבלה מרכזית אחת שבה נשמר כל מצב הפלטפורמה.

create table if not exists public.app_state (
  k text primary key,
  v text,
  updated_at timestamptz default now()
);

-- מאפשר קריאה/כתיבה מהאפליקציה (אב-טיפוס/פיילוט).
alter table public.app_state enable row level security;

drop policy if exists "allow all app_state" on public.app_state;
create policy "allow all app_state" on public.app_state
  for all using (true) with check (true);
