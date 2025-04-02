"use client";

import { memo, useCallback } from "react";
import { ConversationType } from "@/types";
import { useChatStore } from "@/store/chat-store";
import ChannelSection from "./channel-section";
import DirectMessageSection from "./direct-message-section";
import NavItem from "./nav-item";

const ConversationList = memo(function ConversationList() {
  const {
    conversations,
    selectedConversation,
    latestMessages,
    unreadCounts,
    selectConversation,
    isLoadingChannels,
    isLoadingDirectMessages,
  } = useChatStore();

  // Group conversations by type
  const channels = conversations.filter(
    (c) => c.type === ConversationType.CHANNEL
  );

  const directMessages = conversations.filter(
    (c) =>
      c.type === ConversationType.PRIVATE || c.type === ConversationType.GROUP
  );

  // Handle conversation selection
  const handleSelectConversation = useCallback(
    (conversationId: string) => {
      selectConversation(conversationId);
    },
    [selectConversation]
  );

  return (
    <div className="space-y-0">
      <div className="px-3 py-2 space-y-1">
        <NavItem icon="replies" label="Replies" />
        <NavItem icon="activity" label="Activity" />
        <NavItem icon="drafts" label="Drafts" />
        <NavItem icon="more" label="More" />
      </div>

      <div className="mt-2 border-t border-[#e9eaed]"></div>

      <ChannelSection
        channels={channels}
        selectedConversationId={selectedConversation?.id}
        latestMessages={latestMessages}
        unreadCounts={unreadCounts}
        onSelectConversation={handleSelectConversation}
        isLoading={isLoadingChannels}
      />

      <DirectMessageSection
        directMessages={directMessages}
        selectedConversationId={selectedConversation?.id}
        latestMessages={latestMessages}
        unreadCounts={unreadCounts}
        onSelectConversation={handleSelectConversation}
        isLoading={isLoadingDirectMessages}
      />
    </div>
  );
});

export default ConversationList;
