import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    auth0Id: text("auth0_id").notNull().unique(),
    role: text("role", { enum: ["SCOUT", "GUARDIAN", "ARCHIVIST"] })
        .default("SCOUT")
        .notNull(),
    reputationScore: integer("reputation_score").default(0).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .default(sql`(unixepoch())`)
        .notNull(),
});
