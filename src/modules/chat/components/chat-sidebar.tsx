"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import UserButton from "@/modules/authentication/components/user-button";

import { PlusIcon, SearchIcon } from "lucide-react";

export function ChatSidebar({ user }) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex h-full w-60 flex-col border-r border-border bg-sidebar">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-sidebar-border p-1">
        <h1 className="text-3xl text-primary tracking-tighter">routeAI</h1>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Link href="/">
          <Button className="w-full">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search your threads..."
            className="pl-9 bg-sidebar-accent border-sidebar-border pr-8"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="py-8 text-center text-sm text-muted-foreground">
          No Chats Yet.
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 border-t border-sidebar-border p-4">
        <UserButton user={user} />
        <span className="flex-1 truncate text-sm text-sidebar-foreground">
          {user.email}
        </span>
      </div>
    </div>
  );
}
