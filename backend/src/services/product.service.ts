import { db } from "../lib/db";
import { product } from "../db/schema/product";
import { eq } from "drizzle-orm";

export async function GetFactoryProducts(factoryId: number) {
  return db.select().from(product).where(eq(product.factoryId, factoryId));
}

export async function GetProductById(id: number) {
  return db.query.product.findFirst({where: eq(product.id, id), with: {factory: true}});
}

export async function CreateProduct(
  factoryId: number,
  name: string,
  price: number,
  expDays: number,
  guantityType: string
) {
  return db.insert(product).values({
    factoryId,
    name,
    retailPrice: price,
    expDays,
    guantityType,
  });
}

export async function UpdateProduct(
  id: number,
  name?: string,
  price?: number,
  expDays?: number,
  guantityType?: string
) {
  return db
    .update(product)
    .set({
      name,
      retailPrice: price,
      expDays,
      guantityType,
    })
    .where(eq(product.id, id));
}

export async function DeleteProduct(id: number) {
  return db.delete(product).where(eq(product.id, id));
}
