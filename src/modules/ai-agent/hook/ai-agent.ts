import { useQuery } from "@tanstack/react-query";

type AIModel = {
  id: string;
  name: string;
  description: string;
  context_length: number;
  architecture: unknown;
  pricing: unknown;
  top_provider: unknown;
};

type AIModelsResponse = {
  models: AIModel[];
};

export const useAIModels = () => {
  return useQuery<AIModelsResponse>({
    queryKey: ["ai-models"],
    queryFn: async () => {
      const res = await fetch("/api/ai/get-models");

      if (!res.ok) {
        throw new Error("Failed to fetch AI models");
      }

      return res.json();
    },
  });
};
