import { defineConfig } from "drizzle-kit";


export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/db/schema",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5455/globakery",
  },
    
})