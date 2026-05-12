import { relations } from "drizzle-orm";
import { serial, pgTable, varchar, pgEnum, timestamp } from "drizzle-orm/pg-core";
import { product } from "./product";
import { batch, producedProduct } from "./batch";

export const statusEnum = pgEnum("status", ["active", "inactive", "on_repair"]);

export const factory = pgTable("factory", {
  id: serial("id").primaryKey(),
  name: varchar("name", {length: 255}).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  status: statusEnum("status").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(()=> new Date()),
})

export const factoryRelations = relations(factory, ({ many }) => ({
  product: many(product),
  batch: many(batch),
  producedProduct: many(producedProduct),
}))

