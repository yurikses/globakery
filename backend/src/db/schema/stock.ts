import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core"
import { ingredient } from "./ingredient"
import { product } from "./product"
import { factory } from "./factory"
import { relations } from "drizzle-orm"


export const stock = pgTable("stock", {
  id: serial("id").primaryKey(),
  factoryId: integer("factory_id").references(() => factory.id),
  productId: integer("product_id").references(() => product.id),
  ingredientId: integer("ingredient_id").references(() => ingredient.id),
  quantity: integer("quantity").notNull(),
  expDate: timestamp("exp_date").notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
})

export const stockRelations = relations(stock, ({ one }) => ({
  factory: one(factory, {
    fields: [stock.factoryId],
    references: [factory.id],
  }),
  product: one(product, {
    fields: [stock.productId],
    references: [product.id],
  }),
  ingredient: one(ingredient, {
    fields: [stock.ingredientId],
    references: [ingredient.id],
  }),
}))