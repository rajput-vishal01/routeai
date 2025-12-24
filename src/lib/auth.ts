import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import db from "./db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  // ✅ REQUIRED for social auth to work in production
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://routeai.askvishal.in"
      : "http://localhost:3000",

  // ✅ REQUIRED to fix CORS + preview deployments
  trustedOrigins: [
    "http://localhost:3000",
    "https://routeai.askvishal.in",
    "https://*.vercel.app",
  ],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
