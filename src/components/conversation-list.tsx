// // "use client";

// // import { useEffect } from "react";
// // import { ChevronDown, Plus, Hash, Lock } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Collapsible,
// //   CollapsibleContent,
// //   CollapsibleTrigger,
// // } from "@/components/ui/collapsible";
// // import { useChatStore } from "@/store/chat-store";
// // import { ConversationType } from "@/types";
// // import { cn } from "@/lib/utils";

// // export function ConversationList() {
// //   const {
// //     conversations,
// //     fetchConversations,
// //     selectConversation,
// //     selectedConversation,
// //     isLoadingConversations,
// //   } = useChatStore();

// //   useEffect(() => {
// //     fetchConversations();
// //   }, [fetchConversations]);

// //   // Group conversations by type
// //   const channels = conversations.filter(
// //     (c) => c.type === ConversationType.CHANNEL
// //   );
// //   const directMessages = conversations.filter(
// //     (c) =>
// //       c.type === ConversationType.PRIVATE || c.type === ConversationType.GROUP
// //   );

// //   // Helper function to identify special conversation types
// //   function getConversationLabel(conversation: any): {
// //     isGeneral: boolean;
// //     isSelfChat: boolean;
// //     displayName: string;
// //   } {
// //     const isGeneral =
// //       conversation.type === ConversationType.CHANNEL &&
// //       conversation.title?.toLowerCase() === "general";

// //     const isSelfChat =
// //       conversation.type === ConversationType.PRIVATE &&
// //       conversation.title?.toLowerCase() === "self chat";

// //     let displayName = conversation.title || "Untitled";

// //     if (isGeneral) {
// //       displayName = "# General";
// //     } else if (isSelfChat) {
// //       displayName = "Notes to self";
// //     }

// //     return { isGeneral, isSelfChat, displayName };
// //   }

// //   if (isLoadingConversations) {
// //     return <div className="p-4 text-center">Loading conversations...</div>;
// //   }

// //   return (
// //     <div className="space-y-4">
// //       <Collapsible defaultOpen>
// //         <div className="flex items-center justify-between py-1 px-3">
// //           <CollapsibleTrigger className="flex items-center gap-1 text-sm font-medium">
// //             <ChevronDown className="h-4 w-4" />
// //             <span>Channels</span>
// //           </CollapsibleTrigger>
// //           <Button
// //             variant="ghost"
// //             size="icon"
// //             className="h-5 w-5 rounded-sm text-white bg-[#ff6a00]"
// //           >
// //             <Plus className="h-3 w-3" />
// //           </Button>
// //         </div>
// //         <CollapsibleContent>
// //           <div className="mt-1 space-y-1 pl-4 px-3">
// //             {channels.map((channel) => {
// //               const { isGeneral, displayName } = getConversationLabel(channel);
// //               return (
// //                 <ChannelItem
// //                   key={channel.id}
// //                   name={displayName}
// //                   isPrivate={false}
// //                   active={channel.id === selectedConversation?.id}
// //                   onClick={() => selectConversation(channel.id)}
// //                   isHighlighted={isGeneral}
// //                 />
// //               );
// //             })}
// //             {channels.length === 0 && (
// //               <div className="text-xs text-muted-foreground p-2">
// //                 No channels available
// //               </div>
// //             )}
// //           </div>
// //         </CollapsibleContent>
// //       </Collapsible>

// //       <Collapsible defaultOpen>
// //         <div className="flex items-center justify-between py-1 px-3">
// //           <CollapsibleTrigger className="flex items-center gap-1 text-sm font-medium">
// //             <ChevronDown className="h-4 w-4" />
// //             <span>Direct Messages</span>
// //           </CollapsibleTrigger>
// //           <Button
// //             variant="ghost"
// //             size="icon"
// //             className="h-5 w-5 rounded-sm text-white bg-[#ff6a00]"
// //           >
// //             <Plus className="h-3 w-3" />
// //           </Button>
// //         </div>
// //         <CollapsibleContent>
// //           <div className="mt-1 space-y-0 px-3">
// //             {directMessages.map((dm) => {
// //               const { isSelfChat, displayName } = getConversationLabel(dm);
// //               return (
// //                 <DirectMessageItem
// //                   key={dm.id}
// //                   name={displayName}
// //                   status={isSelfChat ? "Your personal notes" : "Online"}
// //                   time="Now"
// //                   isActive={dm.id === selectedConversation?.id}
// //                   onClick={() => selectConversation(dm.id)}
// //                   isHighlighted={isSelfChat}
// //                 />
// //               );
// //             })}
// //             {directMessages.length === 0 && (
// //               <div className="text-xs text-muted-foreground p-2">
// //                 No direct messages
// //               </div>
// //             )}
// //           </div>
// //         </CollapsibleContent>
// //       </Collapsible>
// //     </div>
// //   );
// // }

// // function ChannelItem({
// //   name,
// //   isPrivate = false,
// //   active,
// //   isHighlighted = false,
// //   onClick,
// // }: {
// //   name: string;
// //   isPrivate?: boolean;
// //   active?: boolean;
// //   isHighlighted?: boolean;
// //   onClick?: () => void;
// // }) {
// //   return (
// //     <button
// //       className={cn(
// //         "flex w-full items-center gap-2 rounded-md py-1 text-sm",
// //         active ? "bg-muted" : "hover:bg-muted",
// //         isHighlighted ? "font-medium text-[#ff6a00]" : ""
// //       )}
// //       onClick={onClick}
// //     >
// //       {isPrivate ? (
// //         <Lock
// //           className={cn(
// //             "h-4 w-4",
// //             isHighlighted ? "text-[#ff6a00]" : "text-muted-foreground"
// //           )}
// //         />
// //       ) : (
// //         <Hash
// //           className={cn(
// //             "h-4 w-4",
// //             isHighlighted ? "text-[#ff6a00]" : "text-muted-foreground"
// //           )}
// //         />
// //       )}
// //       <span>{name}</span>
// //     </button>
// //   );
// // }

// // function DirectMessageItem({
// //   name,
// //   status,
// //   time,
// //   isActive = false,
// //   isHighlighted = false,
// //   onClick,
// // }: {
// //   name: string;
// //   status: string;
// //   time: string;
// //   isActive?: boolean;
// //   isHighlighted?: boolean;
// //   onClick?: () => void;
// // }) {
// //   return (
// //     <button
// //       className={cn(
// //         "flex w-full items-center gap-2 px-2 py-2 text-sm",
// //         isActive ? "bg-[#fff9e5]" : "hover:bg-muted",
// //         isHighlighted ? "font-medium" : ""
// //       )}
// //       onClick={onClick}
// //     >
// //       <div
// //         className={cn(
// //           "h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center",
// //           isHighlighted ? "border-2 border-[#ff6a00]" : ""
// //         )}
// //       >
// //         <span>{name.charAt(0)}</span>
// //       </div>
// //       <div className="flex flex-1 flex-col items-start overflow-hidden">
// //         <div className="flex items-center gap-1 w-full">
// //           <span
// //             className={cn("truncate", isHighlighted ? "text-[#ff6a00]" : "")}
// //           >
// //             {name}
// //           </span>
// //         </div>
// //         <span className="text-xs text-muted-foreground truncate w-full">
// //           {status}
// //         </span>
// //       </div>
// //       <div className="flex flex-col items-end gap-1 ml-1 flex-shrink-0">
// //         <span className="text-xs text-muted-foreground whitespace-nowrap">
// //           {time}
// //         </span>
// //       </div>
// //     </button>
// //   );
// // }

// "use client";

// import { useEffect } from "react";
// import { ChevronDown, Plus, Hash, Lock } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { useChatStore } from "@/store/chat-store";
// import { ConversationType } from "@/types";
// import { cn } from "@/lib/utils";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// export function ConversationList() {
//   const {
//     currentUser, // make sure your store fetches and sets this

//     conversations,
//     fetchConversations,
//     selectConversation,
//     selectedConversation,
//     isLoadingConversations,
//     latestMessages,
//     unreadCounts,
//     setupConversationsListener,
//   } = useChatStore();

//   //   useEffect(() => {
//   //     fetchConversations();

//   //     // Set up listener for all conversations
//   //     const unsubscribe = setupConversationsListener();

//   //     return () => {
//   //       unsubscribe();
//   //     };
//   //   }, [fetchConversations, setupConversationsListener]);

//   useEffect(() => {
//     let unsubscribe = () => {};
//     fetchConversations();

//     // Because setupConversationsListener is async, we need to await it
//     setupConversationsListener().then((fn) => {
//       if (typeof fn === "function") {
//         // Save the real cleanup function
//         unsubscribe = fn;
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [fetchConversations, setupConversationsListener]);

//   // Group conversations by type
//   const channels = conversations.filter(
//     (c) => c.type === ConversationType.CHANNEL
//   );
//   const directMessages = conversations.filter(
//     (c) =>
//       c.type === ConversationType.PRIVATE || c.type === ConversationType.GROUP
//   );

//   // Helper function to identify special conversation types
//   //   function getConversationLabel(conversation: any): {
//   //     isGeneral: boolean;
//   //     isSelfChat: boolean;
//   //     displayName: string;
//   //   } {
//   //     const isGeneral =
//   //       conversation.type === ConversationType.CHANNEL &&
//   //       conversation.title?.toLowerCase() === "general";

//   //     const isSelfChat =
//   //       conversation.type === ConversationType.PRIVATE &&
//   //       conversation.title?.toLowerCase() === "self chat";

//   //     let displayName = conversation.title || "Untitled";

//   //     if (isGeneral) {
//   //       displayName = "# General";
//   //     } else if (isSelfChat) {
//   //       displayName = "Notes to self";
//   //     }

//   //     return { isGeneral, isSelfChat, displayName };
//   //   }

//   // Suppose your ChatState includes currentUser
//   // or you pass currentUserId as a function param.

  // function getConversationLabel(
  //   conversation: any,
  //   currentUserId: string
  // ): {
  //   isGeneral: boolean;
  //   isSelfChat: boolean;
  //   displayName: string;
  // } {
  //   // For channels:
  //   const isGeneral =
  //     conversation.type === ConversationType.CHANNEL &&
  //     conversation.title?.toLowerCase() === "general";

  //   // For your own "notes to self" conversation:
  //   const isSelfChat =
  //     conversation.type === ConversationType.PRIVATE &&
  //     conversation.title?.toLowerCase() === "self chat";

  //   // Default to conversation.title
  //   let displayName = conversation.title || "Untitled";

  //   if (conversation.type === ConversationType.PRIVATE && !isSelfChat) {
  //     // For a private chat, show the other user's name
  //     // conversationParticipants is an array
  //     const otherParticipant = conversation.conversationParticipants?.find(
  //       (p: any) => p.userId !== currentUserId
  //     );
  //     // Use the other participant’s username if it exists
  //     if (otherParticipant?.user?.username) {
  //       displayName = otherParticipant.user.username;
  //     }
  //   }

  //   // If it's # General
  //   if (isGeneral) {
  //     displayName = "# General";
  //   } else if (isSelfChat) {
  //     displayName = "Notes to self";
  //   }

  //   return { isGeneral, isSelfChat, displayName };
  // }

//   // Helper function to format the latest message preview
//   function formatMessagePreview(message: any): string {
//     if (!message) return "No messages yet";

//     if (message.messageType === "TEXT") {
//       return message.content?.length > 25
//         ? message.content.substring(0, 25) + "..."
//         : message.content || "";
//     } else if (message.messageType === "IMAGE") {
//       return "Sent an image";
//     } else if (message.messageType === "FILE") {
//       return "Sent a file";
//     } else if (message.messageType === "VIDEO") {
//       return "Sent a video";
//     } else if (message.messageType === "AUDIO") {
//       return "Sent an audio message";
//     }

//     return "";
//   }

//   // Helper function to format time
//   function formatTime(dateString?: string): string {
//     if (!dateString) return "";

//     const date = new Date(dateString);
//     const now = new Date();

//     // If today, show time
//     if (date.toDateString() === now.toDateString()) {
//       return date.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     }

//     // If within the last week, show day name
//     const daysDiff = Math.floor(
//       (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
//     );
//     if (daysDiff < 7) {
//       return date.toLocaleDateString([], { weekday: "short" });
//     }

//     // Otherwise show date
//     return date.toLocaleDateString([], { month: "short", day: "numeric" });
//   }

//   if (isLoadingConversations) {
//     return <div className="p-4 text-center">Loading conversations...</div>;
//   }

//   return (
//     <div className="space-y-4">
//       <Collapsible defaultOpen>
//         <div className="flex items-center justify-between py-1 px-3">
//           <CollapsibleTrigger className="flex items-center gap-1 text-sm font-medium">
//             <ChevronDown className="h-4 w-4" />
//             <span>Channels</span>
//           </CollapsibleTrigger>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-5 w-5 rounded-sm text-white bg-[#ff6a00]"
//           >
//             <Plus className="h-3 w-3" />
//           </Button>
//         </div>
//         <CollapsibleContent>
//           <div className="mt-1 space-y-1 pl-4 px-3">
//             {channels.map((channel) => {
//               const { isGeneral, displayName } = getConversationLabel(channel);
//               const latestMessage = latestMessages[channel.id];
//               const unreadCount = unreadCounts[channel.id] || 0;

//               return (
//                 <ChannelItem
//                   key={channel.id}
//                   name={displayName}
//                   isPrivate={false}
//                   active={channel.id === selectedConversation?.id}
//                   onClick={() => selectConversation(channel.id)}
//                   isHighlighted={isGeneral}
//                   latestMessage={formatMessagePreview(latestMessage)}
//                   time={formatTime(latestMessage?.createdAt)}
//                   unreadCount={unreadCount}
//                 />
//               );
//             })}
//             {channels.length === 0 && (
//               <div className="text-xs text-muted-foreground p-2">
//                 No channels available
//               </div>
//             )}
//           </div>
//         </CollapsibleContent>
//       </Collapsible>

//       <Collapsible defaultOpen>
//         <div className="flex items-center justify-between py-1 px-3">
//           <CollapsibleTrigger className="flex items-center gap-1 text-sm font-medium">
//             <ChevronDown className="h-4 w-4" />
//             <span>Direct Messages</span>
//           </CollapsibleTrigger>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-5 w-5 rounded-sm text-white bg-[#ff6a00]"
//           >
//             <Plus className="h-3 w-3" />
//           </Button>
//         </div>
//         <CollapsibleContent>
//           <div className="mt-1 space-y-0 px-3">
//             {directMessages.map((dm) => {
//               const { isSelfChat, displayName } = getConversationLabel(
//                 dm,
//                 currentUser?.id
//               );
//               const latestMessage = latestMessages[dm.id];
//               const unreadCount = unreadCounts[dm.id] || 0;

//               return (
//                 <DirectMessageItem
//                   key={dm.id}
//                   name={displayName}
//                   status={formatMessagePreview(latestMessage)}
//                   time={formatTime(latestMessage?.createdAt)}
//                   isActive={dm.id === selectedConversation?.id}
//                   onClick={() => selectConversation(dm.id)}
//                   isHighlighted={isSelfChat}
//                   unread={unreadCount}
//                 />
//               );
//             })}
//             {directMessages.length === 0 && (
//               <div className="text-xs text-muted-foreground p-2">
//                 No direct messages
//               </div>
//             )}
//           </div>
//         </CollapsibleContent>
//       </Collapsible>
//     </div>
//   );
// }

// function ChannelItem({
//   name,
//   isPrivate = false,
//   active,
//   isHighlighted = false,
//   onClick,
//   latestMessage,
//   time,
//   unreadCount = 0,
// }: {
//   name: string;
//   isPrivate?: boolean;
//   active?: boolean;
//   isHighlighted?: boolean;
//   onClick?: () => void;
//   latestMessage?: string;
//   time?: string;
//   unreadCount?: number;
// }) {
//   return (
//     <button
//       className={cn(
//         "flex w-full flex-col items-start gap-1 rounded-md py-2 px-2 text-sm",
//         active ? "bg-muted" : "hover:bg-muted",
//         isHighlighted ? "font-medium text-[#ff6a00]" : ""
//       )}
//       onClick={onClick}
//     >
//       <div className="flex w-full items-center gap-2">
//         {isPrivate ? (
//           <Lock
//             className={cn(
//               "h-4 w-4",
//               isHighlighted ? "text-[#ff6a00]" : "text-muted-foreground"
//             )}
//           />
//         ) : (
//           <Hash
//             className={cn(
//               "h-4 w-4",
//               isHighlighted ? "text-[#ff6a00]" : "text-muted-foreground"
//             )}
//           />
//         )}
//         <span className="flex-1 text-left">{name}</span>
//         {unreadCount > 0 && (
//           <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6a00] px-1 text-xs text-white">
//             {unreadCount}
//           </span>
//         )}
//       </div>
//       {latestMessage && (
//         <div className="flex w-full items-center justify-between pl-6 text-xs text-muted-foreground">
//           <span className="truncate">{latestMessage}</span>
//           {time && <span className="ml-2 flex-shrink-0">{time}</span>}
//         </div>
//       )}
//     </button>
//   );
// }

// function DirectMessageItem({
//   name,
//   status,
//   time,
//   isActive = false,
//   isHighlighted = false,
//   unread = 0,
//   onClick,
// }: {
//   name: string;
//   status: string;
//   time: string;
//   isActive?: boolean;
//   isHighlighted?: boolean;
//   unread?: number;
//   onClick?: () => void;
// }) {
//   return (
//     <button
//       className={cn(
//         "flex w-full items-center gap-2 px-2 py-2 text-sm",
//         isActive ? "bg-[#fff9e5]" : "hover:bg-muted",
//         isHighlighted ? "font-medium" : ""
//       )}
//       onClick={onClick}
//     >
//       <Avatar
//         className={cn(
//           "h-8 w-8 rounded-full",
//           isHighlighted ? "border-2 border-[#ff6a00]" : ""
//         )}
//       >
//         <AvatarFallback>{name.charAt(0)}</AvatarFallback>
//       </Avatar>
//       <div className="flex flex-1 flex-col items-start overflow-hidden">
//         <div className="flex items-center gap-1 w-full">
//           <span
//             className={cn("truncate", isHighlighted ? "text-[#ff6a00]" : "")}
//           >
//             {name}
//           </span>
//         </div>
//         <span className="text-xs text-muted-foreground truncate w-full">
//           {status}
//         </span>
//       </div>
//       <div className="flex flex-col items-end gap-1 ml-1 flex-shrink-0">
//         <span className="text-xs text-muted-foreground whitespace-nowrap">
//           {time}
//         </span>
//         {unread > 0 && (
//           <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6a00] px-1 text-xs text-white">
//             {unread}
//           </span>
//         )}
//       </div>
//     </button>
//   );
// }

"use client";

import { useEffect } from "react";
import { ChevronDown, Plus, Hash, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useChatStore } from "@/store/chat-store";
import { ConversationType } from "@/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ConversationList() {
  const {
    conversations,
    fetchConversations,
    selectConversation,
    selectedConversation,
    isLoadingConversations,
    latestMessages,
    unreadCounts,
    setupConversationsListener,
  } = useChatStore();

  useEffect(() => {
    fetchConversations();

    // Set up listener for all conversations
    // const unsubscribe = setupConversationsListener();

    // return () => {
    //   unsubscribe();
    // };
  }, [fetchConversations]);

  // Group conversations by type
  const channels = conversations.filter(
    (c) => c.type === ConversationType.CHANNEL
  );
  const directMessages = conversations.filter(
    (c) =>
      c.type === ConversationType.PRIVATE || c.type === ConversationType.GROUP
  );

  // Helper function to identify special conversation types
  function getConversationLabel(conversation: any): {
    isGeneral: boolean;
    isSelfChat: boolean;
    displayName: string;
  } {
    const isGeneral =
      conversation.type === ConversationType.CHANNEL &&
      conversation.title?.toLowerCase() === "general";

    const isSelfChat =
      conversation.type === ConversationType.PRIVATE &&
      conversation.title?.toLowerCase() === "self chat";

    let displayName = conversation.title || "Untitled";

    if (isGeneral) {
      displayName = "general";
    } else if (isSelfChat) {
      displayName = "Notes to self";
    }

    return { isGeneral, isSelfChat, displayName };
  }

  // Helper function to format the latest message preview
  function formatMessagePreview(message: any): string {
    if (!message) return "No messages yet";

    if (message.messageType === "TEXT") {
      return message.content?.length > 30
        ? message.content.substring(0, 30) + "..."
        : message.content || "";
    } else if (message.messageType === "IMAGE") {
      return "Sent an image";
    } else if (message.messageType === "FILE") {
      return "Sent a file";
    } else if (message.messageType === "VIDEO") {
      return "Sent a video";
    } else if (message.messageType === "AUDIO") {
      return "Sent an audio message";
    }

    return "";
  }

  // Helper function to format time
  function formatTime(dateString?: string): string {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();

    // If today, show time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // If within the last week, show day name
    const daysDiff = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysDiff < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    }

    // Otherwise show date MM/DD/YY format
    return date.toLocaleDateString([], {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    });
  }

  if (isLoadingConversations) {
    return <div className="p-4 text-center">Loading conversations...</div>;
  }

  return (
    <div className="space-y-0">
      <div className="px-3 py-2 space-y-1">
        <NavItem icon="replies" label="Replies" />
        <NavItem icon="activity" label="Activity" />
        <NavItem icon="drafts" label="Drafts" />
        <NavItem icon="more" label="More" />
      </div>

      <div className="mt-2 border-t border-[#e9eaed]"></div>

      <Collapsible defaultOpen className="mt-4">
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
            {channels.map((channel) => {
              const { isGeneral, displayName } = getConversationLabel(channel);

              return (
                <ChannelItem
                  key={channel.id}
                  name={displayName}
                  isPrivate={channel.title?.toLowerCase().includes("team")}
                  active={channel.id === selectedConversation?.id}
                  onClick={() => selectConversation(channel.id)}
                />
              );
            })}
            {channels.length === 0 && (
              <div className="text-xs text-muted-foreground p-2">
                No channels available
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen className="mt-4">
        <div className="flex items-center justify-between py-1 px-3">
          <CollapsibleTrigger className="flex items-center gap-1 text-sm font-medium">
            <ChevronDown className="h-4 w-4" />
            <span>Direct Messages</span>
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
          <div className="mt-1 space-y-0">
            {directMessages.map((dm) => {
              const { isSelfChat, displayName } = getConversationLabel(dm);
              const latestMessage = latestMessages[dm.id];
              const unreadCount = unreadCounts[dm.id] || 0;

              return (
                <DirectMessageItem
                  key={dm.id}
                  name={displayName}
                  status={formatMessagePreview(latestMessage)}
                  time={formatTime(latestMessage?.createdAt)}
                  isActive={dm.id === selectedConversation?.id}
                  onClick={() => selectConversation(dm.id)}
                  isYou={isSelfChat}
                  unread={unreadCount}
                />
              );
            })}
            {directMessages.length === 0 && (
              <div className="text-xs text-muted-foreground p-2">
                No direct messages
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

function NavItem({ icon, label }: { icon: string; label: string }) {
  const getIcon = () => {
    switch (icon) {
      case "replies":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 14L3.41421 12.5858C4.19526 11.8047 5.27043 11.3333 6.41421 11.3333H11C12.6569 11.3333 14 9.99022 14 8.33333V4.33333C14 2.67644 12.6569 1.33333 11 1.33333H5C3.34315 1.33333 2 2.67644 2 4.33333V14Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "activity":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.6667 8H12L10 13.3333L6 2.66667L4 8H1.33334"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "drafts":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3333 5.33333L8 2L2.66667 5.33333M13.3333 5.33333L8 8.66667M13.3333 5.33333V10.6667L8 14M8 8.66667L2.66667 5.33333M8 8.66667V14M2.66667 5.33333V10.6667L8 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "more":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.66667H8.00667M8 4.66667H8.00667M8 12.6667H8.00667M4 8.66667H4.00667M4 4.66667H4.00667M4 12.6667H4.00667M12 8.66667H12.0067M12 4.66667H12.0067M12 12.6667H12.0067"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-muted">
      <span className="text-gray-600">{getIcon()}</span>
      <span>{label}</span>
    </button>
  );
}

function ChannelItem({
  name,
  isPrivate = false,
  active = false,
  onClick,
}: {
  name: string;
  isPrivate?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 py-1 text-sm hover:bg-muted",
        active ? "bg-muted" : ""
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

function DirectMessageItem({
  name,
  status,
  time,
  isYou = false,
  isActive = false,
  unread = 0,
  onClick,
}: {
  name: string;
  status: string;
  time: string;
  isYou?: boolean;
  isActive?: boolean;
  unread?: number;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 px-3 py-2 text-sm",
        isActive ? "bg-[#fff9e5]" : "hover:bg-muted"
      )}
      onClick={onClick}
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
        <span className="text-xs text-muted-foreground truncate w-full">
          {status}
        </span>
      </div>
      <div className="flex flex-col items-end gap-1 ml-1 flex-shrink-0">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {time}
        </span>
        {unread > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6a00] px-1 text-xs text-white">
            {unread}
          </span>
        )}
      </div>
    </button>
  );
}
