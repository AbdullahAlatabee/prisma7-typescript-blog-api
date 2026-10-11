
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(3000),

//   DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required").startsWith("postgresql://"),
});

export const env = envSchema.parse(process.env);

