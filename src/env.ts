import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // BetterAuth
    BETTER_AUTH_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
    // Database
    DATABASE_URL: z.string().min(1),
    // Google
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    // Github
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    // Polar.sh (optional for build)
    POLAR_API_KEY: z.string().optional(),
  },
  client: {
    // Polar.sh (optional for build)
    NEXT_PUBLIC_POLAR_PUBLIC_KEY: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_POLAR_PUBLIC_KEY: process.env.NEXT_PUBLIC_POLAR_PUBLIC_KEY,
  },
});
