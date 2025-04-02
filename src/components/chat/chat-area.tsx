"use client";

import { memo, useCallback } from "react";

import ChatHeader from "./chat-header";
import MessageList from "./message-list";
import { useChatStore } from "@/store/chat-store";
import MessageInput from "./message-input";

const ChatArea = memo(function ChatArea() {
  const { selectedConversation, sendMessage, isLoadingMessages } =
    useChatStore();

  const handleSendMessage = useCallback(
    (content: string) => {
      if (selectedConversation) {
        sendMessage(content, selectedConversation.id);
      }
    },
    [selectedConversation, sendMessage]
  );

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden">
      <ChatHeader
        conversation={selectedConversation}
        isLoading={isLoadingMessages}
      />
      <MessageList />
      <MessageInput
        onSend={handleSendMessage}
        disabled={!selectedConversation}
      />
    </div>
  );
});

export default ChatArea;
