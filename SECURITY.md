# Security policy

## Reporting a vulnerability

Please report suspected vulnerabilities privately through GitHub's
["Report a vulnerability"](https://github.com/Praneetha1844/ReelForge/security/advisories/new)
form on this repository, or by email to praneetha1844@gmail.com. Do not open a public issue for
security problems. This is a personal project maintained by one person; there is no formal
response-time guarantee.

## Scope

ReelForge is an early-stage application. The code in this repository is in scope; third-party
services (Clerk, Neon) are not.

## Threat model

| Asset | Threat | Mitigation in the code |
|---|---|---|
| Database credentials | Leak through the browser bundle or the repository | Read from `DATABASE_URL` on the server only; `.env*` is git-ignored except `.env.example`; no `NEXT_PUBLIC_` database variable |
| Webhook endpoint | Forged or replayed requests | Svix signature is verified against the raw body; missing secret or headers are rejected; the endpoint writes only a user row keyed by Clerk id |
| User identity | A client claiming to be another user | The sync server action takes identity from the Clerk session, never from client input |
| Dashboard pages | Unauthenticated access | Clerk middleware protects `/dashboard(.*)`; the matcher excludes only Next.js internals and static files |
| Error output | Leaking internals | Error pages are generic; server errors are logged, not returned |

## Known gaps

- No Content-Security-Policy header yet (see [roadmap](docs/ROADMAP.md)).
- No rate limiting on the webhook endpoint beyond signature verification.
- No automated dependency or secret scanning is configured.
- The code has not had an independent security review.

## Handling secrets

Credentials are supplied only through environment variables. If a credential is ever exposed,
treat it as compromised: rotate it with the provider and update the environment.
