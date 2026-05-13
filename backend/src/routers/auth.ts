import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { auth } from "../lib/auth";

export const authRouter = new OpenAPIHono();

// --- ZOD SCHEMAS ---

const SignInSchema = z
  .object({
    email: z.string().email().openapi({ example: "user@example.com" }),
    password: z.string().min(6).openapi({ example: "secret123" }),
  })
  .openapi("SignInRequest");

const SignUpSchema = z
  .object({
    email: z.string().email().openapi({ example: "user@example.com" }),
    password: z.string().min(6).openapi({ example: "secret123" }),
    name: z.string().openapi({ example: "Иван Иванов" }),
  })
  .openapi("SignUpRequest");

// --- OPENAPI ROUTES DEFINITIONS ---

const signUpRoute = createRoute({
  method: "post",
  path: "/sign-up/email", // Исправлено: better-auth ожидает этот путь для регистрации по email
  tags: ["Auth (Better Auth)"],
  summary: "Регистрация нового пользователя",
  request: {
    body: { content: { "application/json": { schema: SignUpSchema } } },
  },
  responses: {
    200: { description: "Успешная регистрация и выдача сессии" },
    400: { description: "Ошибка валидации или пользователь уже существует" },
  },
});

const signInRoute = createRoute({
  method: "post",
  path: "/sign-in/email",
  tags: ["Auth (Better Auth)"],
  summary: "Вход по email и паролю",
  request: {
    body: { content: { "application/json": { schema: SignInSchema } } },
  },
  responses: {
    200: { description: "Успешный вход и выдача сессии" },
    400: { description: "Неверные учетные данные" },
  },
});

const signOutRoute = createRoute({
  method: "post",
  path: "/sign-out",
  tags: ["Auth (Better Auth)"],
  summary: "Выход из системы",
  responses: {
    200: { description: "Успешный выход (удаление куки)" },
  },
});

const getSessionRoute = createRoute({
  method: "get",
  path: "/get-session",
  tags: ["Auth (Better Auth)"],
  summary: "Получить текущую сессию",
  responses: {
    200: { description: "Данные текущего пользователя" },
  },
});

// --- HANDLERS ---

// Вспомогательная функция для пересборки Request (чтобы BetterAuth мог его прочитать после Hono)
function reconstructRequest(c: any, body?: any) {
  return new Request(c.req.raw.url, {
    method: c.req.raw.method,
    headers: c.req.raw.headers,
    body: body ? JSON.stringify(body) : undefined,
  });
}

authRouter.openapi(signUpRoute, async (c) => {
  const body = c.req.valid("json");
  const req = reconstructRequest(c, body);
  return auth.handler(req);
});

authRouter.openapi(signInRoute, async (c) => {
  const body = c.req.valid("json");
  const req = reconstructRequest(c, body);
  return auth.handler(req);
});

authRouter.openapi(signOutRoute, async (c) => {
  return auth.handler(c.req.raw); // Тут нет body, передаем как есть
});

authRouter.openapi(getSessionRoute, async (c) => {
  return auth.handler(c.req.raw); // Тут нет body, передаем как есть
});

// --- CATCH-ALL ДЛЯ ОСТАЛЬНЫХ ЭНДПОИНТОВ BETTER AUTH ---
// Если Better Auth использует другие внутренние роуты (например, сброс пароля),
// они будут работать, просто не появятся в Swagger.
authRouter.on(["POST", "GET"], "/*", (c) => {
  return auth.handler(c.req.raw);
});
