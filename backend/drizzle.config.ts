import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: [
    "./src/Database/schema/db_admin.ts",
    "./src/Database/schema/db_mahasiswa.ts",
  ],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});