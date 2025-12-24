"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface HeaderProps {
  user: {
    name?: string;
    email?: string;
    image?: string;
    createdAt: string | Date;
  } | null;
}

const Header = ({ user }: HeaderProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/home");
          },
        },
      });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="flex w-full flex-row justify-end items-center p-2 border-b border-border bg-sidebar">
      <div className="flex items-center gap-2">
        {user ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        ) : (
          <Button asChild size="sm">
            <Link href="/register">Register</Link>
          </Button>
        )}

        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
