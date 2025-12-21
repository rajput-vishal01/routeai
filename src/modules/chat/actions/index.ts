"use server";

import db from "@/lib/db";
import { currentUser } from "@/modules/authentication/actions";
import { MessageRole, MessageType } from "@prisma/client";
import { revalidatePath } from "next/cache";

type CreateChatValues = {
  content: string;
  model: string;
};

type ActionResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

export const createChatWithMessage = async (
  values: CreateChatValues
): Promise<ActionResponse> => {
  try {
    const user = await currentUser();
    if (!user) return { success: false, message: "Unauthorized user" };

    const { content, model } = values;
    if (!content || !content.trim()) {
      return { success: false, message: "Message content is required" };
    }
    
    //name of the chat i.e title
    const title = content.slice(0, 50) + (content.length > 50 ? "..." : "");

    // Create chat WITH initial user message
    const chat = await db.chat.create({
      data: {
        title,
        model,
        userId: user.id,
        messages: {
          create: {
            content,
            messageRole: MessageRole.USER,
            messageType: MessageType.NORMAL,
            model,
          },
        },
      },
      include: { messages: true }, // Include messages in response
    });

    revalidatePath("/");
    return { success: true, message: "Chat created successfully", data: chat };
  } catch (error) {
    console.error("Error creating chat:", error);
    return { success: false, message: "Failed to create chat" };
  }
};
