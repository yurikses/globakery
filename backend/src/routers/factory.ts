import { Hono } from "hono";
import { z } from '@hono/zod-openapi'

export const factoryRouter = new Hono();

factoryRouter.get("/", (c) => {
  return c.json({ message: "Get all factories" });
});

factoryRouter.post("/", (c) => {
  return c.json({ message: "Create a new factory" });
});

factoryRouter.get("/:id", (c) => {
  const { id } = c.req.param();
  return c.json({ message: `Get factory with id ${id}` });
});

factoryRouter.put("/:id", (c) => {
  const { id } = c.req.param();
  return c.json({ message: `Update factory with id ${id}` });
});

factoryRouter.delete("/:id", (c) => {
  const { id } = c.req.param();
  return c.json({ message: `Delete factory with id ${id}` });
});
