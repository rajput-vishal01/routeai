import { convertToModelMessages, streamText } from "ai";
import db from "@/lib/db";
import { MessageRole } from "@prisma/client";
import { CHAT_SYSTEM_PROMPT } from "@/lib/prompt";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

//initalize open router provider
const provider = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

//normalise messages
function convertStoredMessageToUI(msg: {
  id: string;
  content: string;
  messageRole: string;
  createdAt: Date;
}) {
  try {
    const parts = JSON.parse(msg.content);

    const validParts = parts.filter((part: { type: string }) => {
      return part.type === "text";
    });

    if (validParts.length === 0) {
      return null;
    }

    return {
      id: msg.id,
      role: msg.messageRole.toLowerCase(),
      parts: validParts,
      createdAt: msg.createdAt,
    };
  } catch (e) {
    return {
      id: msg.id,
      role: msg.messageRole.toLowerCase(),
      parts: [{ type: "text", text: msg.content }],
      createdAt: msg.createdAt,
    };
  }
}

function extractPartsAsJSON(message: {
  parts?: { type: string; text?: string }[];
  content?: string;
}) {
  if (message.parts && Array.isArray(message.parts)) {
    return JSON.stringify(message.parts);
  }

  const content = message.content || "";
  return JSON.stringify([{ type: "text", text: content }]);
}

export async function POST(req: Request): Promise<Response> {
  try {
    const {
      chatId,
      messages: newMessages,
      model,
      skipUserMessage,
    }: {
      chatId?: string;
      messages: any[] | any;
      model: string;
      skipUserMessage?: boolean;
    } = await req.json();

    const previousMessages = chatId
      ? await db.message.findMany({
          where: { chatId },
          orderBy: { createdAt: "asc" },
        })
      : [];

    const uiMessages = previousMessages
      .map(convertStoredMessageToUI)
      .filter((msg) => msg !== null); // Remove invalid messages

    const normalizedNewMessages = Array.isArray(newMessages)
      ? newMessages
      : [newMessages];

    console.log("📊 Previous messages:", uiMessages.length);
    console.log("📊 New messages:", normalizedNewMessages.length);

    // Combine messages properly
    const allUIMessages = [...uiMessages, ...normalizedNewMessages];

    // convertToModelMessages might fail with tool parts
    // We need to ensure only valid messages are converted
    let modelMessages;
    try {
      modelMessages = convertToModelMessages(allUIMessages);
      console.log("✅ Converted to model messages:", modelMessages.length);
    } catch (conversionError) {
      console.error("❌ Message conversion error:", conversionError);

      modelMessages = allUIMessages
        .map((msg: any) => ({
          role: msg.role,
          content: msg.parts
            .filter((p: any) => p.type === "text")
            .map((p: any) => p.text)
            .join("\n"),
        }))
        .filter((m: any) => m.content); // Remove empty messages

      console.log("⚠️ Using fallback conversion:", modelMessages.length);
    }

    console.log(
      "🤖 Final model messages:",
      JSON.stringify(modelMessages, null, 2)
    );

    //Proper streamText configuration
    const result = streamText({
      model: provider.chat(model),
      messages: modelMessages,
      system: CHAT_SYSTEM_PROMPT,
      // ❌ signal removed — not supported by streamText types
    });

    return result.toUIMessageStreamResponse({
      sendReasoning: true,
      originalMessages: allUIMessages,
      onFinish: async ({ responseMessage }) => {
        try {
          const messagesToSave: {
            chatId?: string;
            content: string;
            messageRole: MessageRole;
            model: string;
            messageType: string;
          }[] = [];

          if (!skipUserMessage) {
            const latestUserMessage =
              normalizedNewMessages[normalizedNewMessages.length - 1];

            if (latestUserMessage?.role === "user") {
              const userPartsJSON = extractPartsAsJSON(latestUserMessage);

              messagesToSave.push({
                chatId,
                content: userPartsJSON,
                messageRole: MessageRole.USER,
                model,
                messageType: "NORMAL",
              });
            }
          }

          // Save assistant response
          if (responseMessage?.parts && responseMessage.parts.length > 0) {
            const assistantPartsJSON = extractPartsAsJSON(responseMessage);

            messagesToSave.push({
              chatId,
              content: assistantPartsJSON,
              messageRole: MessageRole.ASSISTANT,
              model,
              messageType: "NORMAL",
            });
          }

          if (messagesToSave.length > 0) {
            await db.message.createMany({
              data: messagesToSave,
            });
          }
        } catch (error) {
          console.error("❌ Error saving messages:", error);
        }
      },
    });
  } catch (error: any) {
    console.error("❌ API Route Error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Internal server error",
        details: error.toString(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
