"use client";

import { useEffect } from "react";
import { useGetChatById } from "@/modules/chat/hooks/chat";
import { useChatStore } from "@/modules/chat/store/chat-store";

type ActiveChatLoaderProps = {
  chatId: string;
};

type ChatMessage = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

type Chat = {
  id: string;
  messages?: ChatMessage[];
};

export default function ActiveChatLoader({
  chatId,
}: ActiveChatLoaderProps): JSX.Element | null {
  const { setActiveChatId, setMessages, addChat, chats } = useChatStore();

  const { data, isLoading, isError } = useGetChatById(chatId);

  useEffect(() => {
    if (!chatId) return;
    setActiveChatId(chatId);
  }, [chatId, setActiveChatId]);

  useEffect(() => {
    if (!data || !data.success || !data.data) return;

    const chat: Chat = data.data;

    // populate messages
    setMessages(chat.messages || []);

    if (!chats?.some((c) => c.id === chat.id)) {
      addChat(chat);
    }
  }, [data, setMessages, addChat, chats]);

  return null;
}
