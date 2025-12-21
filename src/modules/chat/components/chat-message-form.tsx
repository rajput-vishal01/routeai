"use client";

import {
  useState,
  useEffect,
  type FormEvent,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useAIModels } from "@/modules/ai-agent/hook/ai-agent";
import { ModelSelector } from "./model-selector";

interface ChatMessageFormProps {
  initialMessage?: string;
  onMessageChange?: (value: string) => void;
}

export default function ChatMessageForm({
  initialMessage,
  onMessageChange,
}: ChatMessageFormProps): JSX.Element {
  const [message, setMessage] = useState<string>("");

  const { data: models, isPending } = useAIModels();
  const [selectedModel, setSelectedModel] = useState<string | undefined>(
    undefined
  );

  // Set selected model when models are loaded
  useEffect(() => {
    if (models?.models && models.models.length > 0 && !selectedModel) {
      setSelectedModel(models.models[0].id);
    }
  }, [models, selectedModel]);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
      onMessageChange?.("");
    }
  }, [initialMessage, onMessageChange]);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    try {
      e.preventDefault();
      console.log("Message Sent");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6 text-base text-foreground">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative rounded-2xl border border-border shadow-sm transition-all">
          <Textarea
            value={message}
            onChange={handleTextareaChange}
            placeholder="Type your message here..."
            className="min-h-[60px] max-h-[200px] resize-none border-0 bg-transparent px-4 py-3 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            onKeyDown={handleKeyDown}
          />

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-2 px-3 py-2 border-t ">
            {/* Left side tools */}
            <div className="flex items-center gap-1">
              {isPending ? (
                <Spinner />
              ) : (
                <ModelSelector
                  models={models?.models || []}
                  selectedModelId={selectedModel}
                  onModelSelect={setSelectedModel}
                  className="ml-1"
                />
              )}
            </div>

            <Button
              type="submit"
              disabled={!message.trim()}
              size="sm"
              variant={message.trim() ? "default" : "ghost"}
              className="h-8 w-8 p-0 rounded-full"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send Message</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}