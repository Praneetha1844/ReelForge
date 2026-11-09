import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { users } from "@/configs/schema";

/**
 * Create the user, or refresh name, email and avatar if the Clerk id exists.
 * Idempotent: a repeated sign-in or a webhook retry leaves the same row.
 */
export async function upsertUser({ clerkId, email, name, imageUrl }) {
  if (!clerkId || !email) {
    throw new Error("clerkId and email are required");
  }
  const values = { clerkId, email, name: name || email, imageUrl };
  await db
    .insert(users)
    .values(values)
    .onConflictDoUpdate({
      target: users.clerkId,
      set: { email: values.email, name: values.name, imageUrl: values.imageUrl },
    });
}

/** Remove the user row for a Clerk id. Deleting a missing user is a no-op. */
export async function deleteUserByClerkId(clerkId) {
  if (!clerkId) throw new Error("clerkId is required");
  await db.delete(users).where(eq(users.clerkId, clerkId));
}
