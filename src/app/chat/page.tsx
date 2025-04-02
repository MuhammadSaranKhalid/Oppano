"use client";

import { useEffect, useState } from "react";
import { useAuthenticated } from "@refinedev/core";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-mobile";
import { IconSidebar } from "@/components/icon-sidebar";
import { ProfileSection } from "@/components/profile-section";
import ConversationList from "@/components/chat/conversation-list";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useChatStore } from "@/store/chat-store";
import ChatArea from "@/components/chat/chat-area";

export default function Home() {
  const { isLoading: isAuthLoading } = useAuthenticated();
  const {
    fetchCurrentUser,
    selectedConversation,
    fetchConversations,
    setupConversationsListener,
    setupChatListener,
  } = useChatStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showProfile, setShowProfile] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);

  useEffect(() => {
    fetchCurrentUser();
    fetchConversations();
    // setupConversationsListener();
  }, [fetchCurrentUser, fetchConversations]);

  useEffect(() => {
    setupChatListener(selectedConversation);
  }, [setupChatListener, selectedConversation]);

  if (isAuthLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#ff6a00]" />
          <p className="text-lg text-muted-foreground">
            Loading your conversations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <IconSidebar />

      <div className="flex h-full w-64 flex-col border-r bg-white">
        <div className="flex items-center gap-2 p-3">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="w-full h-9 rounded-full border-none bg-[#f4f4f5] pl-9 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ConversationList />
        </div>
      </div>

      {/* Main content area */}
      <ChatArea />

      {/* Desktop profile section */}
      {!isMobile && showProfile && <ProfileSection />}

      {/* Mobile profile sheet */}
      {isMobile && (
        <Sheet open={isMobileProfileOpen} onOpenChange={setIsMobileProfileOpen}>
          <SheetContent side="right" className="w-full max-w-md p-0">
            <ProfileSection />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
