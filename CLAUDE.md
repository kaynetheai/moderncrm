# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint
npm run start    # Start production server
```

No test framework is configured.

## Architecture

### API Pattern
All client-server communication goes through a single endpoint: `POST /api/processor` (`app/api/processor/route.ts`).

- Requests carry an `act_id` integer that identifies the action (defined in `types/api.ts` as `ACT_ID` constants)
- The route passes the full request body as JSON to Azure SQL stored procedure `crm_sp_processor`
- Response shape is always `{ code: number, message: string, data: T[] }` — `code: 0` means success
- Client-side: use `apiProcessor<T>(actId, data)` from `lib/api-client.ts` — never call `/api/processor` directly

Current `act_id` values: `LOGIN = 100`, `FORGOT_PASSWORD = 101`

### Route Groups
- `app/(auth)/` — unauthenticated pages (login, forgot-password)
- `app/(dashboard)/` — protected pages, guarded by `middleware.ts`

`middleware.ts` checks for the `crm_session` cookie and redirects accordingly (unauthenticated → `/login`, authenticated → away from auth pages).

### Authentication
Session is stored as a base64-encoded `UserSession` object in the `crm_session` HTTP-only cookie (24-hour expiry, SameSite=Lax). Cookie management is in `lib/auth.ts` (client-side only). `contexts/AuthContext.tsx` provides `{ user, isAuthenticated, logout }` via `useAuth()`.

### Database
`lib/db.ts` exports a singleton mssql connection pool to Azure SQL. Credentials come from env vars (`AZURE_SQL_SERVER`, `AZURE_SQL_DATABASE`, `AZURE_SQL_USER`, `AZURE_SQL_PASSWORD`). The API route executes `EXEC @ret = crm_sp_processor @input_json, @output_json OUTPUT` — business logic lives in the stored procedure, not in Next.js code.

### Key Conventions
- Path alias `@/*` maps to the project root
- Tailwind v4 — no `tailwind.config.ts`; configured via CSS `@import` in `globals.css`
- shadcn/ui components live in `components/ui/`; use `cn()` from `lib/utils.ts` for class merging
- Icons: Lucide React only
