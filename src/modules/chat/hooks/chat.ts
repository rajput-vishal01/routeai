import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createChatWithMessage, deleteChat, getChatById } from "../actions";
import { toast } from "sonner";

type CreateChatValues = {
  message: string;
  model: string;
};

type CreateChatResponse = {
  success: boolean;
  data?: {
    id: string;
  };
};

type ActionResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<CreateChatResponse, Error, CreateChatValues>({
    mutationFn: (values) => createChatWithMessage(values),
    onSuccess: (res) => {
      if (res.success && res.data) {
        const chat = res.data;

        queryClient.invalidateQueries({ queryKey: ["chats"] });

        router.push(`/chat/${chat.id}?autoTrigger=true`);
      }
    },
    onError: (error) => {
      console.error("Create chat error:", error);
      toast.error("Failed to create chat");
    },
  });
};

export const useGetChatById = (chatId: string) => {
  return useQuery<ActionResponse>({
    queryKey: ["chats", chatId],
    queryFn: () => getChatById(chatId),
    enabled: !!chatId,
  });
};

export const useDeleteChat = (chatId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error>({
    mutationFn: () => deleteChat(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to delete chat");
    },
  });
};
