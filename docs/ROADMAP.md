# Roadmap

Status of each item: none are started unless noted.

## Product
- Script generation from a chosen topic
- Video rendering pipeline and storage (a worker and object storage; see ARCHITECTURE)
- Persist and list a user's videos (new `videos` table, dashboard list)
- Account page (Clerk `UserProfile`) and an upgrade flow (the `subscription` column exists and is unused)

## Engineering
- Regenerate `package-lock.json` and switch CI back to `npm ci`
- Content-Security-Policy with nonces
- Rate limiting for the webhook endpoint
- Dependency and secret scanning in CI
- Integration tests against a disposable PostgreSQL database
- TypeScript migration
- Drizzle migrations checked into the repository instead of `db:push` only
