import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
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

export const media = sqliteTable("media", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    key: text("key").notNull().unique(),
    title: text("title").notNull(),
    description: text("description"),
    language: text("language"),
    locationLat: real("location_lat"),
    locationLng: real("location_lng"),
    createdAt: text("created_at").notNull(),
    processed: integer("processed", { mode: "boolean" }).default(false),
    userId: text("user_id"),
});
