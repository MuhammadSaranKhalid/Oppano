"use client";

import { memo, useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChannelItemSkeleton } from "./skeletons/channel-item-skeleton";
import ChannelItem from "./channel-item";
import { ChannelSectionProps } from "./types";
import { getConversationLabel } from "./utils";
import { useChatStore } from "@/store/chat-store";
import { Spinner } from "../ui/spinner";

const ChannelSection = memo(function ChannelSection({
  channels,
  selectedConversationId,
  latestMessages,
  unreadCounts,
  onSelectConversation,
  isLoading,
}: ChannelSectionProps) {
  const { currentUser } = useChatStore();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
      <div className="flex items-center justify-between py-1 px-3">
        <CollapsibleTrigger className="flex items-center gap-1 text-sm font-medium">
          <ChevronDown className="h-4 w-4" />
          <span>Loopz</span>
        </CollapsibleTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 rounded-sm text-white bg-[#ff6a00]"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <CollapsibleContent>
        <div className="mt-1 space-y-0 pl-6 pr-3">
          {isLoading ? (
            // Show skeletons while loading
            // Array.from({ length: 3 }).map((_, index) => (
            //   <ChannelItemSkeleton key={index} />
            // ))

            <div className="flex items-center justify-center h-40">
              <Spinner size={32} />
            </div>
          ) : channels.length > 0 ? (
            // Show channels when loaded
            channels.map((channel) => {
              const { isGeneral, displayName } = getConversationLabel(
                channel,
                currentUser?.id ?? ""
              );
              const latestMessage = latestMessages[channel.id];
              const unreadCount = unreadCounts[channel.id] || 0;

              return (
                <ChannelItem
                  key={channel.id}
                  name={displayName}
                  conversationId={channel.id}
                  isPrivate={channel.title?.toLowerCase().includes("team")}
                  isActive={channel.id === selectedConversationId}
                  latestMessage={latestMessage}
                  unreadCount={unreadCount}
                  onClick={onSelectConversation}
                />
              );
            })
          ) : (
            // Show message when no channels
            <div className="text-xs text-muted-foreground p-2">
              No channels available
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
});

export default ChannelSection;
