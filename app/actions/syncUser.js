"use server";

import { currentUser } from "@clerk/nextjs/server";
import { upsertUser } from "@/lib/users";

// Identity comes from the Clerk session, never from client-supplied data.
export async function syncCurrentUser() {
  const user = await currentUser();
  if (!user) return { success: false, error: "Not signed in" };

  try {
    await upsertUser({
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      name: user.fullName,
      imageUrl: user.imageUrl,
    });
    return { success: true };
  } catch (error) {
    console.error("User sync failed:", error.message);
    return { success: false, error: "User sync failed" };
  }
}
