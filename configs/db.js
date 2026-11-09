import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Server-only: never use a NEXT_PUBLIC_ variable here, it would ship to the browser.
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. See .env.example.");
}

export const db = drizzle(neon(process.env.DATABASE_URL), { schema });
