"use client";

import { memo } from "react";
import { Hash, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChannelItemProps } from "./types";

const ChannelItem = memo(function ChannelItem({
  name,
  conversationId,
  isPrivate = false,
  isActive = false,
  latestMessage,
  unreadCount = 0,
  onClick,
}: ChannelItemProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 py-1 text-sm hover:bg-muted",
        isActive ? "bg-muted" : ""
      )}
      onClick={() => onClick(conversationId)}
      aria-selected={isActive}
    >
      <div className="flex items-center gap-2 w-full">
        {isPrivate ? (
          <Lock className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Hash className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="flex-1 text-left">{name}</span>
        {unreadCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6a00] px-1 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </div>
    </button>
  );
});

export default ChannelItem;
