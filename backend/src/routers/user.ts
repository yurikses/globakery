import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import {
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
  UpdatePassword,
} from "../services/user.service";
import { rolesEnum } from "../db/schema/user";
import { requireAuth } from "../middleware/auth";
import { PgRole } from "drizzle-orm/pg-core";

export const userRouter = new OpenAPIHono();

// --- ZOD SCHEMAS ---

const UserSchema = z
  .object({
    id: z.string().openapi({ example: 1 }),
    name: z.string().openapi({ example: "John Doe" }),
    email: z.string().email().openapi({ example: "john@example.com" }),
    role: z.enum(rolesEnum.enumValues).openapi({ example: "employee" }),
    factoryId: z.number().nullable().optional(),
    contacts_info: z.string().nullable().optional(),
  })
  .openapi("User");

const CreateUserSchema = z
  .object({
    name: z.string().max(30).openapi({ example: "John Doe" }),
    email: z.string().email().max(50).openapi({ example: "john@example.com" }),
    password: z.string().min(6).openapi({ example: "secret123" }),
  })
  .openapi("CreateUserRequest");

const UpdateUserSchema = z
  .object({
    name: z.string().max(30).optional().openapi({ example: "John Smith" }),
    email: z
      .string()
      .email()
      .max(50)
      .optional()
      .openapi({ example: "john.smith@example.com" }),
    role: z.enum(rolesEnum.enumValues).optional().openapi({ example: "admin" }),
  })
  .openapi("UpdateUserRequest");

const ParamsIdSchema = z.object({
  id: z.string().openapi({
    param: { name: "id", in: "path" },
    example: "1",
    description: "User ID",
  }),
});

// --- OPENAPI ROUTES DEFINITIONS ---

const getUsersRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Users"],
  summary: "Get all users",
  responses: {
    200: {
      content: { "application/json": { schema: z.array(UserSchema) } },
      description: "List of users",
    },
  },
});

const getUserByIdRoute = createRoute({
  method: "get",
  path: "/{id}",
  tags: ["Users"],
  summary: "Get a user by ID",
  request: {
    params: ParamsIdSchema,
  },
  responses: {
    200: {
      content: { "application/json": { schema: UserSchema } },
      description: "User found",
    },
    404: {
      description: "User not found",
    },
  },
});

const createUserRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Users"],
  summary: "Create a new user",
  request: {
    body: {
      content: { "application/json": { schema: CreateUserSchema } },
    },
  },
  responses: {
    201: {
      description: "User created successfully",
    },
    500: {
      description: "Internal server error",
    },
  },
});

const updateUserRoute = createRoute({
  method: "put",
  path: "/{id}",
  tags: ["Users"],
  summary: "Update user by ID",
  request: {
    params: ParamsIdSchema,
    body: {
      content: { "application/json": { schema: UpdateUserSchema } },
    },
  },
  responses: {
    200: {
      description: "User updated successfully",
    },
    404: {
      description: "User not found",
    },
  },
});

const deleteUserRoute = createRoute({
  method: "delete",
  path: "/{id}",
  tags: ["Users"],
  summary: "Delete user by ID",
  request: {
    params: ParamsIdSchema,
  },
  responses: {
    200: {
      description: "User deleted successfully",
    },
    404: {
      description: "User not found",
    },
  },
});

// --- HANDLERS ---

userRouter.openapi(getUsersRoute, async (c) => {
  const users = await GetAllUsers();
  return c.json(users, 200);
});

userRouter.openapi(getUserByIdRoute, async (c) => {
  const { id } = c.req.valid("param");
  const users = await GetUserById(id);

  if (!users.length) {
    return c.text("User not found", 404);
  }

  return c.json(users[0], 200);
});


// userRouter.openapi(createUserRoute, async (c) => {
//   const { name, email, password } = c.req.valid("json");

//   await CreateUser(name, email, password);
//   return c.text("User created", 201);
// });

userRouter.openapi(updateUserRoute, async (c) => {
  const { id } = c.req.valid("param");
  const { name, email, role } = c.req.valid("json");
  const result = await UpdateUser(id, name, email, role);

  return c.text("User updated", 200);
});

userRouter.openapi(deleteUserRoute, async (c) => {
  const { id } = c.req.valid("param");
  await DeleteUser(id);

  return c.text("User deleted", 200);
});
