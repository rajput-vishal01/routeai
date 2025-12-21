import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createChatWithMessage } from "../actions";
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
