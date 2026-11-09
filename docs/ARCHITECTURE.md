# ReelForge architecture

## Request flow

1. **Routing and auth.** `middleware.js` runs Clerk middleware on all non-static routes and calls `auth.protect()` for `/dashboard(.*)`; unauthenticated visitors are redirected to sign-in.
2. **User sync (client-triggered).** `components/UserSaver.jsx` is mounted once in the root layout. When Clerk reports a signed-in user it calls the `syncCurrentUser` server action.
3. **Server action.** `app/actions/syncUser.js` resolves the user with `currentUser()` from the Clerk session. Identity is never taken from client-supplied fields. It then calls `upsertUser`.
4. **User sync (webhook).** Clerk sends `user.created` to `/api/webhooks/clerk`. The handler verifies the Svix signature against the **raw** request body, maps the payload to the table's columns and calls `upsertUser`.
5. **Persistence.** `lib/users.js` inserts into `users` with `ON CONFLICT DO NOTHING`, so repeated sign-ins and webhook retries are idempotent.

## Data model

`users`: `id` (serial PK), `clerk_id` (unique), `name`, `email` (unique), `image_url`, `subscription` (boolean, default false).

## Security notes

- The database URL is read from `DATABASE_URL` on the server only. It must never use a `NEXT_PUBLIC_` prefix, which would expose it to browsers.
- The webhook rejects requests without a configured secret, valid Svix headers and a valid signature.
- Secrets live in environment variables; `.env*` is git-ignored except `.env.example`.

## Extension points

Video generation would add tables (videos, jobs), a background worker and object storage; none exist yet. See the roadmap in the README.
