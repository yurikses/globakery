import { pgTable,serial, integer, pgEnum, varchar, text, timestamp } from "drizzle-orm/pg-core"
import { factory } from "./factory"

export const rolesEnum = pgEnum("role", ["admin", "director", "employee"])

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", {length: 30}).notNull(),
  email: varchar("email", {length: 50}).notNull(),
  password: text("password").notNull(),
  role: rolesEnum("role").notNull(),
  factoryId: integer("factory_id").references(() => factory.id),
  contacts_info: text("contacts_info"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(()=> new Date()),
})