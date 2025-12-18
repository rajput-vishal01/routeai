"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

import { FaGithub, FaGoogle } from "react-icons/fa";

const RegisterPage = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-[380px] px-6 py-8 space-y-6 bg-card border border-border rounded-xl shadow-sm">
        <div className="flex flex-col items-center text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tighter text-foreground sm:text-3xl">
            Welcome to <span className="text-primary">routeAI</span>
          </h1>

          <p className="text-sm text-muted-foreground max-w-xs">
            Multi-Model AI Chat platform.
            <br />
            (We&apos;ll increase your message limits if you do 😉)
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            className="w-full h-10 font-medium"
            onClick={() =>
              signIn.social({
                provider: "github",
                callbackURL: "/",
              })
            }
          >
            <FaGithub className="mr-2 h-4 w-4" />
            Sign in with GitHub
          </Button>

          <Button
            variant="outline"
            className="w-full h-10 font-medium"
            onClick={() =>
              signIn.social({
                provider: "google",
                callbackURL: "/",
              })
            }
          >
            <FaGoogle className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
        </div>

        <p className="text-[10px] text-center text-muted-foreground px-4">
          This is an experimental platform. <span>Things may break.</span>{" "}
          <span>We’re building fast.</span>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
