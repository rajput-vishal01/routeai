"use client";

import { useState, ChangeEvent, useMemo, MouseEvent, useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import UserButton from "@/modules/authentication/components/user-button";

import {
  EllipsisIcon,
  PlusIcon,
  SearchIcon,
  Trash,
  PanelLeft,
  X,
} from "lucide-react";
import { useChatStore } from "../store/chat-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import DeleteChatModal from "@/components/ui/delete-chat-modal";

import { useIsMobile } from "@/app/hooks/use-mobile";

type ChatMessage = {
  id: string;
  content?: string | null;
};

type Chat = {
  id: string;
  title?: string | null;
  createdAt: string | Date;
  messages?: ChatMessage[];
};

type User = {
  id: string;
  email: string;
};

interface ChatSidebarProps {
  user: User;
  chats: Chat[];
}

export function ChatSidebar({ user, chats }: ChatSidebarProps): JSX.Element {
  const activeChatId = useChatStore((state) => state.activeChatId);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth < 1024);
    };

    checkTablet();
    window.addEventListener("resize", checkTablet);
    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  useEffect(() => {
    if (isMobile || isTablet) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile, isTablet]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chats;

    const query = searchQuery.toLowerCase();
    return chats.filter(
      (chat) =>
        chat.title?.toLowerCase().includes(query) ||
        chat.messages?.some((msg) => msg.content?.toLowerCase().includes(query))
    );
  }, [chats, searchQuery]);

  const onDelete = (e: MouseEvent, chatId: string): void => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedChatId(chatId);
    setIsModalOpen(true);
  };

  const groupedChats = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const groups = {
      today: [] as Chat[],
      yesterday: [] as Chat[],
      lastWeek: [] as Chat[],
      older: [] as Chat[],
    };

    filteredChats.forEach((chat) => {
      const chatDate = new Date(chat.createdAt);
      if (chatDate >= today) groups.today.push(chat);
      else if (chatDate >= yesterday) groups.yesterday.push(chat);
      else if (chatDate >= lastWeek) groups.lastWeek.push(chat);
      else groups.older.push(chat);
    });

    return groups;
  }, [filteredChats]);

  const renderChatList = (chatList: Chat[]): JSX.Element[] | null => {
    if (chatList.length === 0) return null;

    return chatList.map((chat) => (
      <Link
        key={chat.id}
        href={`/chat/${chat.id}`}
        onClick={() => {
          if (isMobile || isTablet) setIsSidebarOpen(false);
        }}
        className={cn(
          "block rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
          chat.id === activeChatId && "bg-orange-100 dark:bg-orange-950/30"
        )}
      >
        <div className="flex flex-row justify-between items-center gap-2">
          <span className="truncate flex-1">{chat.title}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-sidebar-accent-foreground/10"
                onClick={(e) => e.preventDefault()}
              >
                <EllipsisIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex gap-2 cursor-pointer"
                onClick={(e) => onDelete(e, chat.id)}
              >
                <Trash className="h-4 w-4 text-red-500" />
                <span className="text-red-500">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Link>
    ));
  };

  const isSmallScreen = isMobile || isTablet;

  return (
    <>
      {isSmallScreen && !isSidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-3 left-3 z-50"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      )}

      {isSmallScreen && isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={cn(
          "flex h-full w-60 flex-col border-r border-border bg-sidebar",
          isSmallScreen && "fixed inset-y-0 left-0 z-40",
          isSmallScreen && "transition-transform duration-300 ease-in-out",
          isSmallScreen &&
            (isSidebarOpen ? "translate-x-0" : "-translate-x-full")
        )}
      >
        <div className="flex items-center justify-between border-b border-sidebar-border p-1">
          <h1 className="text-3xl text-primary tracking-tighter">routeAI</h1>

          {isSmallScreen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="p-4">
          <Link href="/">
            <Button className="w-full">
              <PlusIcon className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </Link>
        </div>

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

        <div className="flex-1 overflow-y-auto px-2">
          {filteredChats.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-8">
              {searchQuery ? "No chats found" : "No chats yet"}
            </div>
          ) : (
            <>
              {groupedChats.today.length > 0 && (
                <div className="mb-4">
                  <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                    Today
                  </div>
                  {renderChatList(groupedChats.today)}
                </div>
              )}

              {groupedChats.yesterday.length > 0 && (
                <div className="mb-4">
                  <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                    Yesterday
                  </div>
                  {renderChatList(groupedChats.yesterday)}
                </div>
              )}

              {groupedChats.lastWeek.length > 0 && (
                <div className="mb-4">
                  <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                    Last 7 Days
                  </div>
                  {renderChatList(groupedChats.lastWeek)}
                </div>
              )}

              {groupedChats.older.length > 0 && (
                <div className="mb-4">
                  <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                    Older
                  </div>
                  {renderChatList(groupedChats.older)}
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-4 flex items-center gap-3 border-t border-sidebar-border">
          <UserButton user={user} />
          <span className="flex-1 text-sm text-sidebar-foreground truncate">
            {user.email}
          </span>
        </div>

        <DeleteChatModal
          chatId={selectedChatId}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
}