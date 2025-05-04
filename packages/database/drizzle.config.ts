import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: ["./src/schema/public.ts", "./src/schema/next-auth.ts"],
  out: "./migrations",
  dialect: "postgresql",
  schemaFilter: ["public", "next_auth"],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
