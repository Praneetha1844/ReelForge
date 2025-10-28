"use server";

import { db } from "@/configs/db";
import { users } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function saveUser(userData) {
  try {
    console.log("saveUser called with:", userData);

    // Check if database connection works
    const testQuery = await db.select().from(users).limit(1);
   

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userData.clerkId));

    console.log("Existing user check result:", existing);

    if (!existing[0]) {
      const newUser = {
        clerkId: userData.clerkId,
        email: userData.email,
        name: userData.name,
        imageUrl: userData.imageUrl,
      };
      
      
      
      await db.insert(users).values(newUser);
     
      // Return plain user data instead of database result
      return {
        success: true,
        message: "User created successfully",
        user: newUser
      };
    } else {
      
      
      // Return plain user data from existing user
      const existingUser = {
        clerkId: existing[0].clerkId,
        email: existing[0].email,
        name: existing[0].name,
        imageUrl: existing[0].imageUrl,
        subscription: existing[0].subscription
      };
      
      return {
        success: true,
        message: "User already exists",
        user: existingUser
      };
    }
  } catch (error) {
    console.error("Error saving user:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    // Return error as plain object
    return {
      success: false,
      error: error.message
    };
  }
}
