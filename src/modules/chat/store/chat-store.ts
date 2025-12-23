import { create } from "zustand";

type Chat = {
  id: string;
  title?: string | null;
  createdAt: string | Date;
};

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

interface ChatStore {
  chats: Chat[]; // all user's chat
  messages: Message[]; // messages for active chat
  activeChatId: string | null; // currently opened chat (optional, not route-driven)

  triggeredChats: Set<string>; // Track which chats have been auto-triggered

  setChats: (chats: Chat[]) => void;
  setMessages: (messages: Message[]) => void;
  setActiveChatId: (chatId: string | null) => void;

  // add new chat
  addChat: (chat: Chat) => void;

  // append new message
  addMessage: (message: Message) => void;

  // clear messages when switching chat
  clearMessages: () => void;

  markChatAsTriggered: (chatId: string) => void;
  hasChatBeenTriggered: (chatId: string) => boolean;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  messages: [],
  activeChatId: null,
  triggeredChats: new Set(), // Track which chats have been auto-triggered

  setChats: (chats) => set({ chats }),

  setMessages: (messages) => set({ messages }),

  setActiveChatId: (chatId) => set({ activeChatId: chatId }),

  // add new chat
  addChat: (chat) =>
    set({
      chats: [chat, ...get().chats],
    }),

  // append new message
  addMessage: (message) =>
    set({
      messages: [...get().messages, message],
    }),

  // clear messages when switching chat
  clearMessages: () => set({ messages: [] }),

  markChatAsTriggered: (chatId) => {
    const triggered = new Set(get().triggeredChats);
    triggered.add(chatId);
    set({ triggeredChats: triggered });
  },

  hasChatBeenTriggered: (chatId) => {
    return get().triggeredChats.has(chatId);
  },
}));
