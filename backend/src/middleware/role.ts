import { createMiddleware } from "hono/factory";

export const requireRole = (allowedRoles: string[]) => {
  return createMiddleware(async (c, next) => {
    const user = c.get("user");
    
    if (!user) {
      return c.json({ error: "Нет доступа" }, 401);
    }

    if (!allowedRoles.includes(user.role)) {
      return c.json({ error: "Недостаточно прав" }, 403);
    }

    await next();
  });
};