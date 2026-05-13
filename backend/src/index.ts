import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { apiReference } from "@scalar/hono-api-reference";

import { userRouter } from "./routers/user";
import { authRouter } from "./routers/auth";
import type { AuthType } from "./lib/auth";

const app = new OpenAPIHono<{ Variables: AuthType }>();

app.get("/", (c) => {
  return c.json({
    message: "Welcome to the Globakery API",
    version: "1.0.0",
  });
});

/* API config */
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Globakery API",
    description: "API Documentation for Globakery Backend",
  },
});

app.get("/swagger", swaggerUI({ url: "/doc" }));
app.get(
  "/ui",
  apiReference({
    pageTitle: "Globakery API Reference",
    spec: { url: "/doc" },
    theme: "kepler",
    layout: "modern",
  }),
);

/* Routes */
const routes = app
  .route("/api/user", userRouter)
  .route("/api/auth", authRouter);

export type AppType = typeof routes;

export default {
  port: 8080,
  fetch: app.fetch,
};
