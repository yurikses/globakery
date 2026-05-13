import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins:  ['http://localhost:3000', 'http://localhost:8080'],
  user: {
    additionalFields: {
      role: {
        type: "string", 
        required: true,
        defaultValue: "employee",
      },
      factoryId: {
        type: "number",
        required: false,
      },
      contacts_info: {
        type: "string",
        required: false,
      },
    },
  },
});

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null
  session: typeof auth.$Infer.Session.session | null
}
