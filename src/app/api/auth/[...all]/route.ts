import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// ✅ REQUIRED: BetterAuth does NOT work on Edge
export const runtime = "nodejs";

export const { GET, POST } = toNextJsHandler(auth);
