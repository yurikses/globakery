import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"
import { factory } from "./factory"
import { relations } from "drizzle-orm"

export const product = pgTable("product", {
  id: serial("id").primaryKey(),
  factoryId: integer("factory_id").references(() => factory.id),
  name: varchar("name", { length: 50 }).notNull(),
  retailPrice: integer("retail_price").notNull(),
  expDays: integer("exp_days").notNull(),
  guantityType: varchar("guantity_type", { length: 20 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
})


export const productRelations = relations(product, ({ one }) => ({
  factory: one(factory, {
    fields: [product.factoryId],
    references: [factory.id],
  }),
}))

