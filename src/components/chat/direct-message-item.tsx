"use client";

import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { DirectMessageItemProps } from "./types";
import { formatMessagePreview, formatTime } from "./utils";

const DirectMessageItem = memo(function DirectMessageItem({
  name,
  conversationId,
  isYou = false,
  isActive = false,
  latestMessage,
  unreadCount = 0,
  onClick,
}: DirectMessageItemProps) {
  const status = latestMessage
    ? formatMessagePreview(latestMessage)
    : "No messages yet";
  const time = latestMessage ? formatTime(latestMessage.createdAt) : "";

  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 px-3 py-2 text-sm",
        isActive ? "bg-[#fff9e5]" : "hover:bg-muted"
      )}
      onClick={() => onClick(conversationId)}
      aria-selected={isActive}
    >
      <Avatar className="h-8 w-8 rounded-full">
        <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col items-start overflow-hidden">
        <div className="flex items-center gap-1 w-full">
          <span className="truncate font-medium">{name}</span>
          {isYou && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              (You)
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground truncate">
          {status}
        </span>
      </div>
      <div className="flex flex-col items-end gap-1 ml-1 flex-shrink-0">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {time}
        </span>
        {unreadCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6a00] px-1 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </div>
    </button>
  );
});

export default DirectMessageItem;
