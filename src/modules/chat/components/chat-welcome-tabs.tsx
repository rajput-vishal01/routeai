"use client";

import { useState, ReactNode } from "react";
import { Sparkles, Newspaper, Code, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type ChatTab = {
  tabName: string;
  icon: ReactNode;
  messages: string[];
};

const CHAT_TAB_MESSAGE: ChatTab[] = [
  {
    tabName: "Create",
    icon: <Sparkles className="h-4 w-4" />,
    messages: [
      "Write a short story about a robot discovering emotions",
      "Help me outline a sci-fi novel set in a post-apocalyptic world",
      "Create a character profile for a complex villain with sympathetic motives",
      "Give me 5 creative writing prompts for flash fiction",
    ],
  },
  {
    tabName: "Explore",
    icon: <Newspaper className="h-4 w-4" />,
    messages: [
      "Good books for fans of Rick Rubin",
      "Countries ranked by number of corgis",
      "Most successful companies in the world",
      "How much does Claude cost?",
    ],
  },
  {
    tabName: "Code",
    icon: <Code className="h-4 w-4" />,
    messages: [
      "Write code to invert a binary search tree in Python",
      "What is the difference between Promise.all and Promise.allSettled?",
      "Explain React's useEffect cleanup function",
      "Best practices for error handling in async/await",
    ],
  },
  {
    tabName: "Learn",
    icon: <GraduationCap className="h-4 w-4" />,
    messages: [
      "Beginner's guide to TypeScript",
      "Explain the CAP theorem in distributed systems",
      "Why is AI so expensive?",
      "Are black holes real?",
    ],
  },
];

type ChatWelcomeTabsProps = {
  userName?: string;
  onMessageSelect: (message: string) => void;
};

function ChatWelcomeTabs({
  userName = "John Doe",
  onMessageSelect,
}: ChatWelcomeTabsProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const firstName = userName.slice(0, userName.indexOf(" ")) || userName;

  return (
    <div className="flex flex-col items-center justify-center px-4 text-base text-foreground">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-2xl font-semibold">
          How can I help you, {firstName}?
        </h1>

        <div className="flex w-full flex-wrap gap-2">
          {CHAT_TAB_MESSAGE.map((tab, index) => (
            <Button
              key={tab.tabName}
              variant={activeTab === index ? "default" : "secondary"}
              onClick={() => setActiveTab(index)}
              className="w-[110px] justify-start"
            >
              {tab.icon}
              <span className="ml-2">{tab.tabName}</span>
            </Button>
          ))}
        </div>

        <div className="w-full min-h-[240px] space-y-3">
          {CHAT_TAB_MESSAGE[activeTab].messages.map((message, index) => (
            <div key={index}>
              <button
                onClick={() => onMessageSelect(message)}
                className="w-full py-2 text-left text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {message}
              </button>
              {index < CHAT_TAB_MESSAGE[activeTab].messages.length - 1 && (
                <Separator />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatWelcomeTabs;
