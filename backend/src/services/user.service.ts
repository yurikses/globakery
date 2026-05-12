import { db } from "../lib/db";
import { rolesEnum, user } from "../db/schema/user";
import { eq } from "drizzle-orm";

export function GetUserById(id: number) {
  return db.select().from(user).where(eq(user.id, id));
}

export function GetUserByEmail(email: string) {
  return db.select().from(user).where(eq(user.email, email));
}


export async function CreateUser(name: string, email: string, password: string) {
  const hash = await Bun.password.hash(password);
  
  return db.insert(user).values({
    name,
    email,
    password: hash,
    role: "employee",
  });
}

export function GetAllUsers() {
  return db.select().from(user);
}

// Извлекаем тип возможных значений из enum
type RoleType = (typeof rolesEnum.enumValues)[number];

export function UpdateUser(
  id: number,
  name?: string,
  email?: string,
  password?: string,
  role?: RoleType,
) {
  return db
    .update(user)
    .set({
      name,
      email,
      password,
      role,
    })
    .where(eq(user.id, id))
    .returning();
}

export function DeleteUser(id: number) {
  return db.delete(user).where(eq(user.id, id));
}
