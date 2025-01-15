# Runstral 🏃‍♂️

A running companion powered by Mistral AI and Supabase. [Live Demo here](https://runstral.letoquart.com)



https://github.com/user-attachments/assets/4a898355-e62e-47a9-9f3e-66a00c7e7ebb



## Features

- AI-powered running session tracking
- Secure user authentication
- Data persistence with Supabase

## Prerequisites

Before you begin, ensure you have:
- Node.js
- pnpm or npm or yarn
- A Supabase account
- A Mistral AI API key

## Installation

1. Clone the repository
```bash
git clone git://github.com/PierreLouisLetoquart/runstral.git
cd runstral
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `MISTRAL_API_KEY`

## Database Setup

Execute the following SQL in your Supabase SQL editor:

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

## Usage

Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Mistral AI](https://mistral.ai) for the AI capabilities
- [Supabase](https://supabase.io) for the backend infrastructure

---

Note: This is a super quick prototype, so please be indulgent. ;) A lot more needs to be done to create an interesting POC.

<p align="center">
  Made with ❤️ by Pierre-Louis Létoquart
</p>
