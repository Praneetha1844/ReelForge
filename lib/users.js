import { db } from "@/configs/db";
import { users } from "@/configs/schema";

// Idempotent: a repeated sign-in or webhook retry for the same user is a no-op.
export async function upsertUser({ clerkId, email, name, imageUrl }) {
  if (!clerkId || !email) {
    throw new Error("clerkId and email are required");
  }
  await db
    .insert(users)
    .values({ clerkId, email, name: name || email, imageUrl })
    .onConflictDoNothing();
}
