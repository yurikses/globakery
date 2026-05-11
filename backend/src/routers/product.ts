import { Hono } from "hono";


export const productRouter = new Hono();


productRouter.get("/", (c) => {
  return c.json({ message: "Get all products" });
});

productRouter.post("/", (c) => {
  return c.json({ message: "Create a new product" });
});

productRouter.get("/:id", (c) => {
  const { id } = c.req.param();
  return c.json({ message: `Get product with id ${id}` });
});

productRouter.put("/:id", (c) => {
  const { id } = c.req.param();
  return c.json({ message: `Update product with id ${id}` });
});

productRouter.delete("/:id", (c) => {
  const { id } = c.req.param();
  return c.json({ message: `Delete product with id ${id}` });
});
