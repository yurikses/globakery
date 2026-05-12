import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"
import { stock } from "./stock"
import { relations } from "drizzle-orm"
import { batch } from "./batch"
import { recipeIngredients } from "./recipe"


export const ingredient = pgTable("ingredient", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  value: integer("value").notNull(),
  guantityType: varchar("guantity_type", { length: 20 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
})

export const ingredientRelations = relations(ingredient, ({ many }) => ({
  stock: many(stock),
  batch: many(batch),
  recipeIngredients: many(recipeIngredients),
}))