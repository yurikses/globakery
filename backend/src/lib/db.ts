import { drizzle } from "drizzle-orm/bun-sql";
import { SQL } from "bun";
import * as schema from "../db/schema";
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:password@localhost:5455/globakery";


const client = new SQL(connectionString);


export const db = drizzle({client, schema});
