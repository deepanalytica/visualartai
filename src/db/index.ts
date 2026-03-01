import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Connection string from environment
const connectionString = process.env.DATABASE_URL!

// Disable prefetch for serverless (Vercel/Next.js)
const client = postgres(connectionString, { prepare: false })

export const db = drizzle(client, { schema })
export type Db = typeof db
