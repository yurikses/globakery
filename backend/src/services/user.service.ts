import { db } from "../lib/db";
import { user } from "../db/schema/users";
import { eq } from "drizzle-orm";

export function GetUserById(id: number) {
  return db.select().from(user).where(eq(user.id, id));
}

export function GetUserByEmail(email: string) {
  return db.select().from(user).where(eq(user.email, email));
}

export function CreateUser(name: string, email: string, password: string) {
  return db.insert(user).values({
    name,
    email,
    password,
    role: "employee",
  });
}

export function GetAllUsers() {
  return db.select().from(user);
}

export function UpdateUser(id: number, name?: string, email?: string, password?: string, role?: typeof user.role ) {
  return db.update(user).set({
    name,
    email,
    password,
    role,
  }).where(eq(user.id, id));
}

export function DeleteUser(id: number) {
  return db.delete(user).where(eq(user.id, id));
}

