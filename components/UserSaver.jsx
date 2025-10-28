"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { saveUser } from "@/app/actions/saveUser";

export default function UserSaver() {
  const { user, isLoaded } = useUser();
  const [status, setStatus] = useState("Waiting for user...");

  useEffect(() => {
    console.log("=== UserSaver Debug ===");
    console.log("isLoaded:", isLoaded);
    console.log("user:", user ? {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      name: user.fullName,
      imageUrl: user.profileImageUrl
    } : "No user");
    
    if (isLoaded && user) {
      setStatus("User loaded, saving to database...");
      console.log("User is loaded, attempting to save:", {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName
      });
      
      // Extract plain user data to pass to server action
      const userData = {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        imageUrl: user.profileImageUrl,
      };
      
      console.log("Extracted user data:", userData);
      
      // Save user to database when they sign in
      saveUser(userData)
        .then((result) => {
          console.log("✅ saveUser result:", result);
          
          if (result.success) {
            console.log("✅ User saved to database successfully:", result.message);
            setStatus(`✅ ${result.message}`);
          } else {
            console.error("❌ Failed to save user:", result.error);
            setStatus(`❌ Error: ${result.error}`);
          }
        })
        .catch((error) => {
          console.error("❌ Exception in saveUser:", error);
          setStatus(`❌ Exception: ${error.message}`);
        });
    } else if (isLoaded && !user) {
      setStatus("No user signed in");
      console.log("User not signed in");
    }
  }, [user, isLoaded]);

  // Show debug info in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-sm max-w-xs z-50">
        <div className="font-bold mb-1">UserSaver Debug:</div>
        <div>{status}</div>
        {user && (
          <div className="mt-2 text-xs opacity-75">
            ID: {user.id}<br/>
            Email: {user.primaryEmailAddress?.emailAddress}<br/>
            Name: {user.fullName}
          </div>
        )}
      </div>
    );
  }

  // In production, don't render anything visible
  return null;
}
