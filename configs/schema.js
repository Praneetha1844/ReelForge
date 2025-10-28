import { boolean } from "drizzle-orm/pg-core";  // Fix: remove "gel-core"
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    clerkId: text("clerk_id").notNull().unique(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    imageUrl: varchar("image_url", { length: 2048 }),
    subscription: boolean("subscription").default(false).notNull(),
});