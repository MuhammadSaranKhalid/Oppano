"use client";

import { Hash, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChannelItemProps {
  name: string;
  isPrivate?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export function ChannelItem({
  name,
  isPrivate = false,
  active,
  onClick,
}: ChannelItemProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 rounded-md py-1 text-sm",
        active ? "bg-muted" : "hover:bg-muted"
      )}
      onClick={onClick}
    >
      {isPrivate ? (
        <Lock className="h-4 w-4 text-muted-foreground" />
      ) : (
        <Hash className="h-4 w-4 text-muted-foreground" />
      )}
      <span>{name}</span>
    </button>
  );
}
