import { db } from "@/configs/db";
import { users } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    console.log("Verifying database schema...");
    
    // Get the expected schema structure
    const expectedSchema = {
      id: "serial",
      clerkId: "text", 
      name: "text",
      email: "text",
      imageUrl: "varchar",
      subscription: "boolean"
    };
    
    // Try to describe the table structure (this will fail if table doesn't exist)
    const tableExists = await db.select().from(users).limit(0);
    
    // If we get here, table exists, now let's check if we can insert a test record
    const testUser = {
      clerkId: "test-clerk-id",
      name: "Test User",
      email: "test@example.com",
      imageUrl: "https://example.com/image.jpg",
      subscription: false
    };
    
    // Try to insert (this will fail if schema doesn't match)
    const insertResult = await db.insert(users).values(testUser);
    
    // If insert succeeds, immediately delete the test record
    await db.delete(users).where(eq(users.clerkId, "test-clerk-id"));
    
    return Response.json({
      success: true,
      message: "Schema verification successful",
      tableExists: true,
      schemaMatches: true,
      expectedSchema,
      testInsert: "Successfully inserted and deleted test record"
    });
    
  } catch (error) {
    console.error("Schema verification failed:", error);
    
    return Response.json({
      success: false,
      error: error.message,
      errorType: error.constructor.name,
      suggestions: [
        "The users table might not exist",
        "The table structure might not match the expected schema",
        "Database permissions might be insufficient",
        "Check if the database migration was run successfully"
      ]
    }, { status: 500 });
  }
}

