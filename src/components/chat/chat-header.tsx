"use client";

import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video, Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { ChatHeaderProps } from "./types";
import { useChatStore } from "@/store/chat-store";

const ChatHeader = memo(function ChatHeader({
  conversation,
  isLoading,
}: ChatHeaderProps) {
  const { currentUser } = useChatStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium">Select a conversation</h2>
        </div>
      </div>
    );
  }

  // Default values for header (channels or groups)
  let headerTitle = conversation.title || "Untitled";
  let avatarSrc = `/placeholder.svg?height=32&width=32`;
  let subtitle = "";

  // For channels, display conversation title and "Channel" as subtitle.
  if (conversation.type === "CHANNEL") {
    headerTitle = conversation.title || "Untitled";
    subtitle = "Channel";
  }

  // For group chats, display the title (or a default) with "Group" as subtitle.
  if (conversation.type === "GROUP") {
    headerTitle = conversation.title || "Group Chat";
    subtitle = "Group";
  }

  // For private chats, display the other participant's username and profile picture.
  if (
    conversation.type === "PRIVATE" &&
    conversation.participants &&
    currentUser
  ) {
    const otherParticipant = conversation.participants.find(
      (participant: any) => participant.user.id !== currentUser.id
    );
    if (otherParticipant) {
      headerTitle = otherParticipant?.user?.username || headerTitle;
      if (otherParticipant?.user?.profilePicture) {
        avatarSrc = otherParticipant.user.profilePicture;
      }
    }
    subtitle = "Direct Message";
  }

  return (
    <div className="flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{headerTitle.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-sm font-medium">{headerTitle}</h2>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Info className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
});

export default ChatHeader;
