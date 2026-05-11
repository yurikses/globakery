import { Hono } from "hono";


export const userRouter = new Hono();

userRouter.get("/", (c) => {
  return c.json({ message: "Get all users" });
});

userRouter.post("/", (c) => {
  return c.json({ message: "Create a new user" });
});

userRouter.get("/:id", (c) => {
  const { id } = c.req.param();
  return c.json({ message: `Get user with id ${id}` });
});

userRouter.put("/:id", (c) => {
  const { id } = c.req.param();
  return c.json({ message: `Update user with id ${id}` });
});

userRouter.delete("/:id", (c) => {
  const { id } = c.req.param();
  return c.json({ message: `Delete user with id ${id}` });
});

