import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://routeai.askvishal.in"
    : "http://localhost:3000";

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL,
});
