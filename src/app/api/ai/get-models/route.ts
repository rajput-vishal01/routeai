import { NextResponse } from "next/server";

type OpenRouterModel = {
  id: string;
  name?: string;
  description?: string;
  context_length?: number;
  architecture?: unknown;
  pricing?: {
    prompt?: string;
    completion?: string;
  };
  top_provider?: unknown;
};

type OpenRouterResponse = {
  data: OpenRouterModel[];
};

export async function GET() {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY ?? ""}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();

    // filter free models
    const freeModels = data.data.filter((model) => {
      const promptPrice = Number(model.pricing?.prompt ?? 0);
      const completionPrice = Number(model.pricing?.completion ?? 0);
      return promptPrice === 0 && completionPrice === 0;
    });

    const formattedModels = freeModels.map((model) => ({
      id: model.id,
      name: model.name ?? "",
      description: model.description ?? "",
      context_length: model.context_length ?? 0,
      architecture: model.architecture ?? null,
      pricing: model.pricing ?? null,
      top_provider: model.top_provider ?? null,
    }));

    return NextResponse.json({ models: formattedModels });
  } catch (error: unknown) {
    console.error("Error fetching free models:", error);

    const message =
      error instanceof Error ? error.message : "Failed to fetch free models";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
