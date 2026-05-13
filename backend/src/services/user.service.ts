import { db } from "../lib/db";
import { account, rolesEnum, user } from "../db/schema/user";
import { eq } from "drizzle-orm";
import { auth } from "../lib/auth";

export function GetUserById(id: string) {
  return db.select().from(user).where(eq(user.id, id));
}

export function GetUserByEmail(email: string) {
  return db.select().from(user).where(eq(user.email, email));
}


export function GetAllUsers() {
  return db.select().from(user);
}

// Извлекаем тип возможных значений из enum
type RoleType = (typeof rolesEnum.enumValues)[number];

export function UpdateUser(
  id: string,
  name?: string,
  email?: string,
  role?: RoleType,
) {
  return db
    .update(user)
    .set({
      name,
      email,
      role,
    })
    .where(eq(user.id, id))
    .returning();
}

export function UpdatePassword(currentPassword: string, newPassword: string) {
  return auth.api.changePassword({
    body: {
      currentPassword,
      newPassword,
    },
  });
}

export function DeleteUser(id: string) {
  return db.delete(user).where(eq(user.id, id));
}
