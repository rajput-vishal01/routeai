"use client";

import { useState } from "react";
import ChatWelcomeTabs from "./chat-welcome-tabs";
import ChatMessageForm from "./chat-message-form";

const ChatMessageView = ({ user }) => {
  const [selectedMessage, setSelectedMessage] = useState("");

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
  };

  const handleMessageChange = () => {
    setSelectedMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-6">
      <div className="w-full max-w-5xl space-y-10">
        <ChatWelcomeTabs
          userName={user?.name}
          onMessageSelect={handleMessageSelect}
        />

        <ChatMessageForm
          initialMessage={selectedMessage}
          onMessageChange={handleMessageChange}
        />
      </div>
    </div>
  );
};

export default ChatMessageView;
