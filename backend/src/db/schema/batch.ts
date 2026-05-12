import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { factory } from "./factory";
import { ingredient } from "./ingredient";
import { relations } from "drizzle-orm";

export const batch = pgTable("batch", {
  id: serial("id").primaryKey(),
  factoryId: integer("factory_id").references(() => factory.id),
  ingredientId: integer("product_id").references(() => ingredient.id),
  quantity: integer("quantity").notNull(),
  expDate: timestamp("exp_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const batchRelations = relations(batch, ({ one }) => ({
  factory: one(factory, {
    fields: [batch.factoryId],
    references: [factory.id],
  }),
  ingredient: one(ingredient, {
    fields: [batch.ingredientId],
    references: [ingredient.id],
  }),
}));


export const producedProduct = pgTable("produced_product", {
  id: serial("id").primaryKey(),
  factoryId: integer("factory_id").references(() => factory.id),
  productId: integer("product_id").references(() => ingredient.id),
  quantity: integer("quantity").notNull(),
  expDate: timestamp("exp_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});


export const producedProductRelations = relations(producedProduct, ({ one }) => ({
  factory: one(factory, {
    fields: [producedProduct.factoryId],
    references: [factory.id],
  }),
  product: one(ingredient, {
    fields: [producedProduct.productId],
    references: [ingredient.id],
  }),
}));