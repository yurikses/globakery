import { boolean, integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core"
import { ingredient } from "./ingredient"
import { product } from "./product"
import { relations } from "drizzle-orm"


export const recipe = pgTable("recipe", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => product.id),
  version: integer("version").notNull(),
  is_active: boolean("is_active").notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const recipeRelations = relations(recipe, ({ one, many }) => ({
  product: one(product, {
    fields: [recipe.productId],
    references: [product.id],
  }),
  recipeIngredients: many(recipeIngredients),
}))

export const recipeIngredients = pgTable("recipe_ingredient", {
  id: serial("id").primaryKey(),
  recipeId: integer("recipe_id").references(() => recipe.id),
  ingredientId: integer("ingredient_id").references(() => ingredient.id),
  quantityPerUnit: integer("quantity_per_unit").notNull(),
})

export const recipeIngredientRelations = relations(recipeIngredients, ({ one }) => ({
  recipe: one(recipe, {
    fields: [recipeIngredients.recipeId],
    references: [recipe.id],
  }),
  ingredient: one(ingredient, {
    fields: [recipeIngredients.ingredientId],
    references: [ingredient.id],
  }),
}))