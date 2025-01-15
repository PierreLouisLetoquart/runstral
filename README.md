### Required env vars:

Supabase related env vars are the Database URL and the Supabase Anon key, Create a project and go to the settings to find them.

Mistral API key is required to access the API, create an account and get the key from the dashboard.

```bash
cp .env.local.example .env.local
```

### Supabase table creation SQL:

```sql
CREATE TABLE public.running_sessions (
    id bigint primary key generated always as identity,
    user_id uuid references auth.users(id) on delete cascade,
    session_content text NOT NULL,
    completed boolean NOT NULL DEFAULT false
) WITH (OIDS=FALSE);

CREATE INDEX idx_running_sessions_user_id ON public.running_sessions(user_id);

ALTER TABLE public.running_sessions ENABLE ROW LEVEL SECURITY;
```
