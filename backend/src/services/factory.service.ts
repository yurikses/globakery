import { db } from "../lib/db";
import { factory } from "../db/schema/factory";
import { eq } from "drizzle-orm";

export async function GetAllFactories() {
  return db.query.factory.findMany();
}

export async function GetFactoryById(id: number) {
  return db.query.factory.findFirst({
    where: (factory, { eq }) => eq(factory.id, id),
  });
}

export async function CreateFactory(name: string, address: string) {
  return db.insert(factory).values({
    name,
    address,
    status: "active",
  });
}

export async function UpdateFactory(
  id: number,
  name?: string,
  address?: string,
  status?: typeof factory.status,
) {
  return db
    .update(factory)
    .set({
      name,
      address,
      status,
    })
    .where(eq(factory.id, id));
}

export async function DeleteFactory(id: number) {
  return db.delete(factory).where(eq(factory.id, id));
}
