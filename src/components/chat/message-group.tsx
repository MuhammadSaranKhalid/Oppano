"use client";

import { memo } from "react";
import type { MessageGroupProps } from "./types";
import MessageItem from "./message-item";

const MessageGroup = memo(function MessageGroup({
  sender,
  messages,
  isUser,
}: MessageGroupProps) {
  return (
    <div className="space-y-2">
      {messages.map((message, index) => (
        
        <MessageItem
          key={message.id}
          message={message}
          isUser={isUser}
          showAvatar={index === 0}
          showName={index === 0 && isUser}
          isLastInGroup={index === messages.length - 1}
        />
      ))}
    </div>
  );
});

export default MessageGroup;
