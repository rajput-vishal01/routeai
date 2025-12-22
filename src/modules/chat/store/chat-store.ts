import { create } from "zustand";

interface ChatStore {
  activeChatId: string | null;
  setActiveChatId: (chatId: string | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  activeChatId: null,
  setActiveChatId: (chatId) => set({ activeChatId: chatId }),
}));
