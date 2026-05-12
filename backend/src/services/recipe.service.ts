import { db } from "../lib/db";
import { recipe } from "../db/schema/recipe";

export async function CreateRecipe(productId: number, version: number) {
  return db.insert(recipe).values({
    productId,
    is_active: true,
    version,
  });
}

export async function GetRecipeById(id: number) {
  return db.query.recipe.findFirst({
    where: (recipe, { eq }) => eq(recipe.id, id),
    with: { product: true, recipeIngredients: { with: { ingredient: true } } },
  });
}

export async function GetActiveRecipeByProductId(productId: number) {
  return db.query.recipe.findFirst({
    where: (recipe, { eq }) =>
      eq(recipe.productId, productId) && eq(recipe.is_active, true),
    with: { product: true, recipeIngredients: { with: { ingredient: true } } },
  });
}
