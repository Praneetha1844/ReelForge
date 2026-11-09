# HTTP interfaces

ReelForge has one HTTP endpoint and one server action.

## `POST /api/webhooks/clerk`

Receives Clerk user events. Public route (no session); authenticity comes from the Svix signature.

**Required headers:** `svix-id`, `svix-timestamp`, `svix-signature`.
**Body:** the raw JSON payload sent by Clerk. It is verified as raw text before it is parsed.

| Event type | Effect |
|---|---|
| `user.created`, `user.updated` | Upsert the row for the Clerk id (email = primary email address, name = first + last name, image URL) |
| `user.deleted` | Delete the row for the Clerk id |
| anything else | Acknowledged and ignored |

| Status | Meaning |
|---|---|
| 200 | Processed or ignored. Also returned when a user has no primary email, which is permanent and must not be retried |
| 400 | Missing Svix headers, or invalid signature |
| 500 | `CLERK_WEBHOOK_SECRET` not configured, or the database write failed (Clerk retries) |

## Server action `syncCurrentUser()`

Called by `components/UserSaver.jsx` after sign-in. Reads the user from the Clerk session
(`currentUser()`), upserts the row and returns `{ success: true }` or `{ success: false, error }`.
It accepts no arguments, so identity cannot be supplied by the client.
