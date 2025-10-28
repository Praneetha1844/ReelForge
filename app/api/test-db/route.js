import { db } from "@/configs/db";
import { users } from "@/configs/schema";

export async function GET() {
  try {
    console.log("Testing database connection...");
    
    // Test basic connection by trying to select from users table
    const result = await db.select().from(users).limit(5);
    
    console.log("Database connection successful!");
    console.log("Users found:", result.length);
    
    return Response.json({ 
      success: true, 
      message: "Database connection successful",
      usersCount: result.length,
      users: result,
      tableInfo: {
        name: "users",
        columns: Object.keys(users).map(key => ({
          name: key,
          type: typeof users[key]
        }))
      }
    });
    
  } catch (error) {
    console.error("Database connection failed:", error);
    
    return Response.json({ 
      success: false, 
      error: error.message,
      errorType: error.constructor.name,
      stack: error.stack,
      suggestions: [
        "Check if NEXT_PUBLIC_DRIZZLE_DATABASE_URL is set correctly",
        "Verify the database URL format ends with /shorts_generator",
        "Ensure the database user has proper permissions",
        "Check if the users table exists in the database"
      ]
    }, { status: 500 });
  }
}
