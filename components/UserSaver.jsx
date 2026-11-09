"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { syncCurrentUser } from "@/app/actions/syncUser";

// Mirrors the signed-in Clerk user into the application database.
export default function UserSaver() {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) syncCurrentUser();
  }, [isLoaded, isSignedIn]);

  return null;
}
